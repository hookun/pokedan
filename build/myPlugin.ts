import * as path from 'path';
import * as fs from 'fs';
import * as rollup from 'rollup';
import * as cheerio from 'cheerio';
import {CSSProcessor} from './CSSProcessor';
import {HTMLProcessor} from './HTMLProcessor';
import {getHash} from './getHash';
import {forwardSlash} from './forwardSlash';

const emitCSS = (
    context: rollup.PluginContext,
    cssProcessor: CSSProcessor,
    prefix = 'style-',
) => {
    const css = cssProcessor.concatenate();
    const referenceId = context.emitFile({
        type: 'asset',
        source: css,
        fileName: `${prefix}${getHash(css, 8)}.css`,
    });
    return context.getFileName(referenceId);
};

const copyReferencedFiles = async (
    context: rollup.PluginContext,
    $: CheerioStatic,
    directory: string,
) => {
    await Promise.all(['href', 'src'].map(async (attr) => {
        await Promise.all($(`[${attr}^="."]`).toArray().map(async ({attribs}) => {
            const relativePath = attribs[attr];
            const filePath = path.join(directory, relativePath);
            const source = await fs.promises.readFile(filePath)
            .catch((error) => {
                if (error.code === 'ENOENT') {
                    return null;
                }
                throw error;
            });
            if (source) {
                const newPath = context.getFileName(context.emitFile({
                    type: 'asset',
                    source,
                    name: path.basename(relativePath),
                }));
                attribs[attr] = forwardSlash(path.relative(path.dirname(relativePath), newPath));
            }
        }));
    }));
};

export const myPlugin = (
    props: {
        baseDir: string,
    },
): rollup.Plugin => {
    const cssProcessor = new CSSProcessor();
    const htmlProcessor = new HTMLProcessor();
    return {
        name: 'MyPlugin',
        async load(id) {
            switch (path.extname(id)) {
                case '.html':
                    return await htmlProcessor.process(id);
                case '.css':
                    return await cssProcessor.process(id);
                default:
                    return null;
            }
        },
        async generateBundle(_options, bundle) {
            const cssFileName = emitCSS(this, cssProcessor);
            await Promise.all(Object.values(bundle).map(async (chunk) => {
                if (chunk.type !== 'chunk') {
                    return;
                }
                let $ = htmlProcessor.documents.get(chunk.facadeModuleId);
                chunk.fileName = forwardSlash(path.join(
                    path.dirname(chunk.fileName),
                    `${path.basename(chunk.fileName)}-${getHash(chunk.code)}.js`,
                ));
                $ = cheerio.load($.html());
                await copyReferencedFiles(this, $, path.dirname(chunk.facadeModuleId));
                this.emitFile({
                    type: 'asset',
                    source: [
                        '<!doctype html>',
                        $('head').html().trim(),
                        `<link rel="stylesheet" href="./${cssFileName}">`,
                        $('body').html().trim(),
                        `<script src="./${chunk.fileName}" defer></script>`,
                    ].join('\n'),
                    fileName: path.relative(props.baseDir, chunk.facadeModuleId),
                });
            }));
        },
    };
};
