'use strict';

var fs = require('fs');
var logfile = './log/console.log';

exports.command = function(req, res) {
    fs.writeFileSync(logfile,'===================== params ============================');
    fs.writeFileSync(logfile, req.params);
    fs.writeFileSync(logfile,'===================== query ============================');
    fs.writeFileSync(logfile, req.query);
    fs.writeFileSync(logfile,"===================== ***** ============================\n\n");
    res.sendStatus(200);
};

exports.welcome = function(req, res) {
    res.send("Hello world!");
};
