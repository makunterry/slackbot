'use strict';

module.exports = function(app) {
    var cntrl = require('../controllers/Controller');

    app.route('/tr_enable')
        .post(cntrl.tr_enable);

    app.route('/tr_disable')
        .post(cntrl.tr_disable);

    app.route('/tr_status')
        .post(cntrl.tr_status);

    app.route('/')
        .get(cntrl.welcome);

    app.route('/botcallback')
        .get(cntrl.botcallback)
        .post(cntrl.botcallback);
};
