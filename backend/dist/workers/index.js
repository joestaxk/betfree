"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workers = void 0;
const { Worker, setEnvironmentData, MessageChannel } = require('node:worker_threads');
const path = require('path');
function Workers(script, filename, cb) {
    return new Promise((resolve, reject) => {
        let worker = new Worker(path.resolve(__dirname + filename + '.js'));
        const { port1, port2 } = new MessageChannel();
        worker.postMessage({ port1, script }, [port1]);
        port2.on("message", cb);
        port2.on("error", reject);
        setEnvironmentData('Hello', 'World!');
        port2.on("exit", (code) => {
            if (code != 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
        });
    });
}
exports.Workers = Workers;
