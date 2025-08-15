import osUtils from 'os-utils';
import fs from "fs";
const POLLING_INTERVAL = 500;
// Getting CPU Usage 
export function pollResource() {
    setInterval(async () => {
        const cpuUsage = await getCpuUsage();
        const ramUsage = await getRamUsage();
        const storageDate = getStorageData();
        console.log({ cpuUsage, ramUsage, storageUsage: storageDate.usage });
    }, POLLING_INTERVAL);
}
function getCpuUsage() {
    return new Promise((resolve) => {
        osUtils.cpuUsage(resolve);
    });
}
function getRamUsage() {
    return 1 - osUtils.freememPercentage();
}
function getStorageData() {
    // requires node 18
    const stats = fs.statfsSync(process.platform === 'win32' ? 'C://' : '/');
    const total = stats.bsize * stats.blocks;
    const free = stats.bsize * stats.bfree;
    return {
        total: Math.floor(total / 1_000_000_000),
        usage: 1 - free / total,
    };
}
