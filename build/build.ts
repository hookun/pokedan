import * as path from 'path';
import * as rollup from 'rollup';
import * as fg from 'fast-glob';
import {sucrase, nodeResolve, commonjs, replace, terser} from './plugins';
import {loadHTML} from './loadHTML';
import {removeSourceMapReference} from './removeSourceMapReference';
import {remove} from './remove';
import {forwardSlash} from './forwardSlash';
import {watch} from './watch';

export const build = async (
    options: {
        watch: boolean,
    },
) => {
    const srcDirectory = path.join(__dirname, '../src');
    const input = await fg(forwardSlash(path.join(srcDirectory, '**/*.html')));
    const inputOptions: rollup.InputOptions = {
        input,
        plugins: [
            replace(options.watch),
            loadHTML({baseDir: srcDirectory}),
            removeSourceMapReference({
                include: ['**/node_modules/typesafe-actions/**'],
            }),
            nodeResolve(),
            commonjs(),
            sucrase(),
            !options.watch && terser(),
        ],
    };
    const outputOptions: rollup.OutputOptions = {
        format: 'es',
        dir: path.join(__dirname, '../dist'),
    };
    await remove(outputOptions.dir);
    if (options.watch) {
        await watch(inputOptions, outputOptions);
    } else {
        const bundle = await rollup.rollup(inputOptions);
        await bundle.write(outputOptions);
    }
};
