var express = require('express'),
    routes = require('./api/routes/Route'),
    app = express(),
    port = 80;

routes(app);
app.listen(port);

console.log('slackbot RESTful API server started on: ' + port);
