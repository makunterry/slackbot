'use strict';

var fs = require('fs');
var logfile0 = './command.log';
var logfile1 = './botcallback.log';

function reqlog(filename, req) {
    fs.writeFileSync(filename,'===================== params ============================\n', {flag:'a+'});
    fs.writeFileSync(filename, JSON.stringify(req.params), {flag:'a+'});
    fs.writeFileSync(filename,'\n===================== query ============================\n', {flag:'a+'});
    fs.writeFileSync(filename, JSON.stringify(req.query), {flag:'a+'});
    fs.writeFileSync(filename,'\n===================== body ============================\n', {flag:'a+'});
    fs.writeFileSync(filename, JSON.stringify(req.body), {flag:'a+'});
    fs.writeFileSync(filename,"\n===================== ***** ============================\n\n", {flag:'a+'});
};

exports.command = function(req, res) {
    reqlog(logfile0, req);
    res.json(req.body);
};

exports.welcome = function(req, res) {
    res.send("Hello world!");
};

exports.botcallback = function(req, res) {
    reqlog(logfile1, req);
    res.send(req.body.challenge);
    //res.json(req.body);
};
