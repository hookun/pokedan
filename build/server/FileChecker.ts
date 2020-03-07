import * as fs from 'fs';
import * as path from 'path';
import * as fg from 'fast-glob';
import {forwardSlash} from '../forwardSlash';
import {getHash} from '../getHash';

export type FileState = 'add' | 'change' | '';
export type FileStateFilter = (
    state: FileState,
    file: string,
) => boolean;

export class FileChecker {

    private readonly cache: Map<string, string>;

    public readonly filter: FileStateFilter;

    public constructor(
        filter: FileStateFilter = () => true,
    ) {
        this.cache = new Map();
        this.filter = filter;
    }

    public async checkFile(file: string): Promise<FileState> {
        const previous = this.cache.get(file);
        const hash = getHash(await fs.promises.readFile(file));
        this.cache.set(file, hash);
        if (!previous) {
            return 'add';
        }
        if (previous !== hash) {
            return 'change';
        }
        return '';
    }

    public async checkDirectory(
        directory: string,
        filter = this.filter,
    ): Promise<Map<string, string>> {
        const files = await fg(forwardSlash(path.join(directory, '**/*')));
        const states = await Promise.all(files.map(async (file) => this.checkFile(file)));
        return states.reduce(
            (result, state, index) => {
                const file = files[index];
                if (filter(state, file)) {
                    result.set(file, state);
                }
                return result;
            },
            new Map<string, string>(),
        );
    }

}