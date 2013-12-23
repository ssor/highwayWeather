
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var path = require('path');
var http = require('http');

var app = express();

var	server = http.createServer(app);

// all environments
app.set('port', process.env.PORT || 9014);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(function(req, res, next) {
    var data = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk) {
        data += chunk;
    });
    req.on('end', function() {
        req.rawBody = data;
        // console.log(data);
        next();
    });
});

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/getCityWeather', routes.getCityWeather);
app.get('/geocode', routes.geocode);
// app.get('/wsTest', routes.wsTest);
// app.get('/wsTest_ie10', routes.wsTest_ie10);
// app.get('/map', routes.map);
// app.get('/allmap', routes.allmap);
// app.get('/index.php/Mobile/index_mobile_map', routes.allmap);


// app.get('/nodeInfo/:nodeID', routes.nodeInfo);
// app.get('/ajaxGetNodeInfo', routes.ajaxGetNodeInfo);
// app.get('/index_realtime_camera_full/:id', routes.realtime_camera_full);
// app.get('/getNewestPicName/:id', routes.getNewestPicName);
// // app.get('/users', user.list);
// app.get('/index', routes.eventInfoIndex);
// app.get('/eventInfo', routes.eventInfo);
// app.get('/ajaxGetEvents', routes.ajaxGetEvents);

server.listen(app.get('port'), function(){
  console.log('Highway Weather listening on port ' + app.get('port'));
});
