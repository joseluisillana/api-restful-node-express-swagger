'use strict';

var SwaggerExpress = require('swagger-express-mw');
var cors = require('cors')
var app = require('express')();

var corsOptions = {
    credentials: true,
    origin: function(origin,callback) {
        if(origin===undefined) {
            callback(null,false);
        } else {
            // change wordnik.com to your allowed domain.
            var match = origin.match("^(.*)?\\\w(\:[0-9]+)?");
            var allowed = (match!==null && match.length > 0);
            callback(null,allowed);
        }
    }
};

app.use(cors(corsOptions));


module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { console.log("ERROR: " + err); throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
  if (swaggerExpress.runner.swagger.paths['/asset']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/asset?type=pruebaTest&source=OrigenTest');
  }
});
