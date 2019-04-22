'use strict';

module.exports = function(app) {
    var cntrl = require('../controllers/Controller');

    app.route('/command')
        .get(cntrl.command)
        .post(cntrl.command);
};
