var express = require('express'),
    routes = require('./api/routes/Route'),
    app = express(),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);
app.listen(port);

console.log('slackbot RESTful API server started on: ' + port);
