"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron = require('electron');
electron.contextBridge.exposeInMainWorld('electron', {
    subscribeStatistics: (callback) => {
        // @ts-ignore
        electron.ipcRenderer.on('statistics', (_, stats) => {
            callback(stats);
        });
    },
    getStaticData: () => console.log("static"),
});
