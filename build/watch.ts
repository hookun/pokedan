import * as path from 'path';
import * as rollup from 'rollup';
import {startServer} from './server';
import {FileChecker} from './server/FileChecker';
import {forwardSlash} from './forwardSlash';

export const watch = async (
    inputOptions: rollup.InputOptions,
    outputOptions: rollup.OutputOptions,
) => {
    const watcher = rollup.watch([{...inputOptions, output: outputOptions}]);
    await new Promise((resolve) => {
        const onEvent = (event: rollup.RollupWatcherEvent) => {
            console.log(event.code);
            if (event.code === 'ERROR') {
                console.error(event.error);
            } else if (event.code === 'END') {
                watcher.removeListener('event', onEvent);
                resolve();
            }
        };
        watcher.on('event', onEvent);
    });
    const fileChecker = new FileChecker((state) => state === 'change');
    const dest = outputOptions.dir;
    const [{clientList}] = await Promise.all([
        startServer(dest),
        fileChecker.checkDirectory(dest),
    ]);
    watcher.on('event', (event) => {
        console.log(event.code);
        if (event.code === 'ERROR') {
            console.error(event.error);
        } else if (event.code === 'END') {
            fileChecker.checkDirectory(dest)
            .then((list) => {
                for (const [file, state] of list) {
                    console.log(`${state}: ${file}`);
                    clientList.broadcast(`data: ${forwardSlash(path.relative(dest, file))}`);
                }
            })
            .catch((error) => console.error(error));
        }
    });
};
