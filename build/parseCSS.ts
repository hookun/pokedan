import * as fs from 'fs';
import * as postcss from 'postcss';
import * as cssnano from 'cssnano';

export const parseCSS = async (
    cssFilePath: string,
): Promise<postcss.Root> => {
    const css = await fs.promises.readFile(cssFilePath, 'utf8');
    const result = await postcss([cssnano()]).process(css, {from: cssFilePath});
    return result.root;
};
