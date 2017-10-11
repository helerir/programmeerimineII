const express = require('express');
const router = express.Router();
const os = require('os');

// https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript#answer-18650828
function formatBytes(a,b){if(0==a)return"0 Bytes";var c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]}

router.get('/', (req, res) => {
    let info = {};

    // Serveri protsessori(te) / tuumade info
    let cpus = os.cpus();
    let cpusToClient = [];
    cpus.forEach((cpu, idx) => {
        let newCpu = {};
        newCpu.model = cpu.model;
        newCpu.speed = cpu.speed;
        cpusToClient.push(newCpu);
    });
    info.cpus = cpusToClient;

    // OS
    let uptime = os.uptime();
    let days = Math.floor(uptime / 86400);
    uptime -= days * 86400;

    let hours = Math.floor(uptime / 3600) % 24;
    uptime -= hours * 3600;

    let minutes = Math.floor(uptime / 60) % 60;
    uptime -= minutes * 60;

    let seconds = Math.floor(uptime % 60);
    
    info.uptime = {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    }

    let serverOs = {
        platform: os.platform(),
        arch: os.arch()
    }
    info.os = serverOs;

    // Memory
    info.memory = {
        free: formatBytes(os.freemem()),
        used: formatBytes(os.totalmem() - os.freemem()),
        total: formatBytes(os.totalmem()),
        percentage: ((os.totalmem() - os.freemem()) / os.totalmem()) * 100
    }

    res.locals.info = info; // edasta muutuja "info" ejs vaatesse
    res.render('pages/info');
});

module.exports = router;