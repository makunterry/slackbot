'use strict';

var fs = require('fs');
var logfile = './console.log';

exports.command = function(req, res) {
    fs.writeFileSync(logfile,'===================== params ============================\n', {flag:'a+'});
    fs.writeFileSync(logfile, JSON.stringify(req.params), {flag:'a+'});
    fs.writeFileSync(logfile,'===================== query ============================\n', {flag:'a+'});
    fs.writeFileSync(logfile, JSON.stringify(req.query), {flag:'a+'});
    fs.writeFileSync(logfile,"===================== ***** ============================\n\n", {flag:'a+'});
    res.json(req.body);
};

exports.welcome = function(req, res) {
    res.send("Hello world!");
};

exports.botcallback = function(req, res) {
    res.send(req.body.challenge);
};
