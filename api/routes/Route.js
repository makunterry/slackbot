'use strict';

module.exports = function(app) {
    var cntrl = require('../controllers/Controller');

    app.route('/command')
        .get(cntrl.command)
        .post(cntrl.command);

    app.route('/')
        .get(cntrl.welcome);

    app.route('/botcallback')
        .get(cntrl.botcallback)
        .post(cntrl.botcallback);
};
