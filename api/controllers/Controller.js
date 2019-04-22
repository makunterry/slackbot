'use strict';

var fs = require('fs');
var util = require('util');
var url = require('url');
var http = require('http');
var logfile = './log.log';

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
    reqlog(logfile, req, 'command');
    if (req.body.response_url != undefined) {
        var urlobject = url.parse(req.body.response_url);
        var contents = '{"text":"Command handled OK"}';
        var options = {
            host:urlobject.host,
            port:443,
            path:urlobject.path,
            method:'POST',
            headers:{
                'content-type':'application/json',
                'content-length':contents.length
            }
        };
        fs.writeFileSync(logfile, "\n------------------> options <-------------------------\n", {flag:'a+'});
        fs.writeFileSync(logfile, JSON.stringify(options), {flag:'a+'});
        fs.writeFileSync(logfile, "\n------------------> options end <-------------------------\n", {flag:'a+'});
        
        var newreq = http.request(options, function(res) {
            fs.writeFileSync(logfile, util.format("\n------------------> res status(%d)\n", res.statusCode), {flag:'a+'});

        });
        newreq.write(contents);
        newreq.end();
    }
    res.sendStatus(200);
};

exports.welcome = function(req, res) {
    res.send("Hello world!");
};

exports.botcallback = function(req, res) {
    reqlog(logfile, req, 'botcallback');
    res.send(req.body.challenge);
};
