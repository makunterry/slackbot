'use strict';

var fs = require('fs');
var util = require('util');
var url = require('url');
var https = require('https');
var logfile = './log.log';

var wemreq_template = '{"State": 0,"Type": 0,"IdItem": 40,"IdSite": 1,"RevisionId": 1,"Name": "IsKioskEnabled","Value": "%d","Reserved01": ""}';
var wemreq_url = 'https://sq3uvba45hso63vk6n332ds7tu3mdqun.wem.cloudburrito.com/api/v1.0/kiosk-settings';

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

function wemtransformer(enable, f) {
    var wemreq_urlobject = url.parse(wemreq_url);
    var wemreq_options = {
            host:wemreq_urlobject.host,
            path:wemreq_urlobject.path,
            method:'PUT',
            headers:{
                "Content-Type": "application/json"
            }
    };
    var wemreq = https.request(wemreq_options, function(res) {
        if (f != undefined) {
            f(res);
        }
    });
    wemreq.write(util.format(wemreq_template, enable));
    wemreq.end();
}

exports.tr_enable = function(req, res) {
    reqlog(logfile, req, 'tr_enable');
    res.sendStatus(200);

    wemtransformer(1, function(res) {
        if (req.body.response_url != undefined) {
            var urlobject = url.parse(req.body.response_url);
            var contents = '{"text":"Transformer Enabled OK"}';
            if (res.statusCode != 200) {
               contents = '{"text":"Transformer Enabled failed"}'; 
            }
            var options = {
                host:urlobject.host,
                path:urlobject.path,
                method:'POST',
                headers:{
                    "Content-Type": "application/json"
                }
            };
            fs.writeFileSync(logfile, "\n------------------> options <-------------------------\n", {flag:'a+'});
            fs.writeFileSync(logfile, JSON.stringify(options), {flag:'a+'});
            fs.writeFileSync(logfile, "\n------------------> options end <-------------------------\n", {flag:'a+'});
            
            var newreq = https.request(options, function(res) {
                fs.writeFileSync(logfile, util.format("\n------------------> res status(%d)\n", res.statusCode), {flag:'a+'});

            });
            newreq.write(contents);
            newreq.end();
        }
    });

};

exports.tr_disable = function(req, res) {
    reqlog(logfile, req, 'tr_disable');
    res.sendStatus(200);

    wemtransformer(0, function(res) {
        if (req.body.response_url != undefined) {
            var urlobject = url.parse(req.body.response_url);
            var contents = '{"text":"Transformer Disabled OK"}';
            if (res.statusCode != 200) {
               contents = '{"text":"Transformer Disabled failed"}'; 
            }
            var options = {
                host:urlobject.host,
                path:urlobject.path,
                method:'POST',
                headers:{
                    "Content-Type": "application/json"
                }
            };
            fs.writeFileSync(logfile, "\n------------------> options <-------------------------\n", {flag:'a+'});
            fs.writeFileSync(logfile, JSON.stringify(options), {flag:'a+'});
            fs.writeFileSync(logfile, "\n------------------> options end <-------------------------\n", {flag:'a+'});
            
            var newreq = https.request(options, function(res) {
                fs.writeFileSync(logfile, util.format("\n------------------> res status(%d)\n", res.statusCode), {flag:'a+'});

            });
            newreq.write(contents);
            newreq.end();
        }
    });
};

exports.tr_status = function(req, res) {
    reqlog(logfile, req, 'Get transformer status');
    res.sendStatus(200);

    https.get(wemreq_url, function(res) {
        fs.writeFileSync(logfile, "\n------------------> tr_status res.statuscode <-------------------------\n", {flag:'a+'});
        fs.writeFileSync(logfile, util.format("res.statusCode %s\n", res.statusCode), {flag:'a+'});
        fs.writeFileSync(logfile, "\n------------------> tr_status res.statuscode end <-------------------------\n", {flag:'a+'});

        let a = "";
        res.on('data', (d) => {
            const temp  = String.fromCharCode.apply(null, d);
            a += temp;
            try {
                const v = JSON.parse(a).Results;
                const r = v.filter(function(x) { return x.IdItem === 40 })[0].Value;
                // console.log(r);

                if (req.body.response_url != undefined) {
                    let urlobject = url.parse(req.body.response_url);
                    let contents = '{"text":":\'ml:Transformer Status","attachments":[{"text":"Enabled"}]}';
                    if (r === '0') {
                        contents = '{"text":":\'ml:Transformer Status","attachments":[{"text":"Disabled"}]}';
                    }

                    let options = {
                        host:urlobject.host,
                        path:urlobject.path,
                        method:'POST',
                        headers:{
                            "Content-Type": "application/json"
                        }
                    };
                    fs.writeFileSync(logfile, "\n------------------> options <-------------------------\n", {flag:'a+'});
                    fs.writeFileSync(logfile, JSON.stringify(options), {flag:'a+'});
                    fs.writeFileSync(logfile, "\n------------------> options end <-------------------------\n", {flag:'a+'});

                    var newreq = https.request(options, function(res) {
                        fs.writeFileSync(logfile, util.format("\n------------------> res status(%d)\n", res.statusCode), {flag:'a+'});

                    });
                    newreq.write(contents);
                    newreq.end();
                }
            } catch(e) {
                // console.error(e);
            }
        });

    });
}

exports.welcome = function(req, res) {
    res.send("Hello world!");
};

exports.botcallback = function(req, res) {
    reqlog(logfile, req, 'botcallback');
    res.send(req.body.challenge);
};
