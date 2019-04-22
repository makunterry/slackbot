'use strict';

var fs = require('fs');
var util = require('util');
var logfile0 = './command.log';
var logfile1 = './botcallback.log';

function reqlog(filename, req, title) {
    fs.writeFileSync(filename,util.format('*************************** Request to %s ***************************\n', title), {flag:'a+'});
    fs.writeFileSync(filename,'===================== params ============================\n', {flag:'a+'});
    fs.writeFileSync(filename, JSON.stringify(req.params), {flag:'a+'});
    fs.writeFileSync(filename,'\n===================== query ============================\n', {flag:'a+'});
    fs.writeFileSync(filename, JSON.stringify(req.query), {flag:'a+'});
    fs.writeFileSync(filename,'\n===================== body ============================\n', {flag:'a+'});
    fs.writeFileSync(filename, JSON.stringify(req.body), {flag:'a+'});
    fs.writeFileSync(filename,"\n******************************************************\n\n", {flag:'a+'});
};

exports.command = function(req, res) {
    reqlog(logfile0, req, 'command');
    res.sendStatus(200);
};

exports.welcome = function(req, res) {
    res.send("Hello world!");
};

exports.botcallback = function(req, res) {
    reqlog(logfile1, req, 'botcallback');
    res.send(req.body.challenge);
};
