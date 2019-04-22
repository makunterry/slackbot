'use strict';

exports.command = function(req, res) {
    console.log('===================== params ============================');
    console.log(req.params);
    console.log('===================== query ============================');
    console.log(req.query);
    console.log('===================== ***** ============================');
    res.send('Hey');
};
