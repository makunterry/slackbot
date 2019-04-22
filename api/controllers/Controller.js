'use strict';

var fs = require('fs');
var logfile = './console.log';

exports.command = function(req, res) {
    fs.writeFileSync(logfile,'===================== params ============================', {flag:'a+'});
    fs.writeFileSync(logfile, req.params, {flag:'a+'});
    fs.writeFileSync(logfile,'===================== query ============================', {flag:'a+'});
    fs.writeFileSync(logfile, req.query, {flag:'a+'});
    fs.writeFileSync(logfile,"===================== ***** ============================\n\n", {flag:'a+'});
    res.sendStatus(200);
};

exports.welcome = function(req, res) {
    res.send("Hello world!");
};
