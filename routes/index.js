/*
 * GET home page.
 */

var _ = require("underscore");
var request = require('request');
var EventProxy = require('eventproxy');
var cityCodeMap = require('./cityCodeMap').cityCodeMap();
//****************************************************

var citesCheck = ['北京', '高密', '潍坊'];

exports.index = function(req, res){
   //      var ep = EventProxy.create('requestWeatherDataOver', function(_data){
   //          // console.dir(_data.body);
   //          var levels = getAllWeatherLevels(_data.body);
   //          console.dir(levels);
			// res.render('index', { title: 'Express' });
   //      });
   //      ep.fail(function(_err){
   //          console.log('some thing wrong');
   //          console.dir(_err);
   //      });
   //      request('http://m.weather.com.cn/data/101010100.html', ep.done('requestWeatherDataOver'));
	// var cities = getCitiesCode(citesCheck);
	// _.each(cities, function(_city){
	// 	requestWeatherData(_city);
	// });
	// res.render('index', { title: 'Express' });
	res.render('map_location_all', { title: 'Express' });
};
exports.getAllWeatherLevels = function(_data){
	return getAllWeatherLevels(_data);
};
exports.parseWeatherLevel = function(_des, _windDes){
	return parseWeatherLevel(_des, _windDes);
};
exports.getCitiesCode = function(_cities){
	return getCitiesCode(_cities);
};
exports.geocode = function(req, res){
	res.render('geocode');
}
exports.getCityWeather = function(req, res){
	var body = req.rawBody;
	var cityObj = JSON.parse(body);
	var city = getCityCode(cityObj.cityName);
	requestWeatherData(city, function(_err, _levels){
		res.send(JSON.stringify(_levels));
	});
};

function requestWeatherData(_city, _callback){
        var ep = EventProxy.create('requestWeatherDataOver', function(_data){
            // console.dir(_data.body);
            var levels = getAllWeatherLevels(_data.body);
            console.dir(levels);
            if(_callback != null){
            	_callback(null, levels);
            }
        });
        ep.fail(function(_err){
            console.log('some thing wrong');
            console.dir(_err);
        });
        request('http://m.weather.com.cn/data/'+ _city.cityCode +'.html', ep.done('requestWeatherDataOver'));
}

function getCitiesCode(_cityNames){

	var codes = _.map(_cityNames, function(_cityName){
		return getCityCode(_cityName);
	});
	return codes;
}
function getCityCode(_cityName){
	var city = _.find(cityCodeMap, function(_map){
		return _map[0] == _cityName;
	});
	return {cityName: city[0], cityCode: city[1]};
}
function getAllWeatherLevels(_data){
	var levels = [];
    var info = JSON.parse(_data);
    // console.dir(info);
    var weatherinfo = info.weatherinfo;
    var city = weatherinfo.city;
    for(var i=1; i<=6; i++){
        var des = weatherinfo['weather'+i];
        var windDes = weatherinfo['wind'+i];
        // console.dir(windDes);
        var level = parseWeatherLevel(des, windDes);
        levels.push({city: city, day:i, level: level.level, des: level.des});
        console.log(city + ' 第'+i+'天 '+ des + ', '+ windDes + ', ' + level.des);
    }
    return levels;
}



//通过文字描述获取天气等级
//关键字采集：多云 晴 雨  雪 
//如果有阴、雨、雪等 等级为3
//有多云，等级为2
//剩余的等级为1
function parseWeatherLevel(_des, _windDes){
    if((_des.indexOf('阴') >= 0) || (_des.indexOf('雨') >= 0) || (_des.indexOf('雪') >= 0)){
        return {level:3, des:'天气恶劣'};
    }
    if((_windDes != null) && parseWindLevel(_windDes) > 1){
        return {level:3, des:'天气恶劣'};
    }
    if(_des.indexOf('多云') >= 0){
        return {level:2, des: '天气不错'};
    }
    return {level: 1, des: '天气很好'};
}
//通过文字获取风力适宜等级
// 大于4级认为不合适，返回2，否则返回1
function parseWindLevel(_des){
    if((_des == null) || (_des == '')){
        return 1;
    }
    var matches = _des.match(/[0-9]/g);
    if(_.size(matches) <= 0) return 1;
    if(_.max(matches) <=4 ) return 1;
    return 2;
}




exports.wsTest = function(req, res){
	// res.render('wsTest', {_nodeDes: JSON.stringify(nodeMap.getNodeDes([32778, 32775]))});
	var nodesDes = nodeMap.getNodeDes([32780, 32775, 32779, 32778, 32777]);
	console.log(nodesDes);
	res.render('wsTest', {_nodeDes: JSON.stringify(nodesDes)});
};

exports.wsTest_ie10 = function(req, res){
	// res.render('wsTest', {_nodeDes: JSON.stringify(nodeMap.getNodeDes([32778, 32775]))});
	var nodesDes = nodeMap.getNodeDes([32780, 32775, 32779, 32778, 32777, 32776, 32781]);
	console.log(nodesDes);
	console.dir(req.headers['user-agent']);
	var user_agent = req.headers['user-agent'];
	if(user_agent.search(/MSIE/) >= 0){
		console.log('this request from IE');
	}
	else{
		console.log('this request NOT from IE');
	}
	// Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)
	// Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.62 Safari/537.36
	res.render('wsTest_ie10', {_nodeDes: JSON.stringify(nodesDes)});
};

exports.map = function(req, res){
	res.render('map_location');
};
exports.allmap = function(req, res){
	res.render('map_location_all');
};
