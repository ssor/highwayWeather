
/*
 * GET users listing.
 */

// console.log('I am nodeMap');

var _ = require("underscore");

var nodeMap = [{mapID:1, nodeID:[32780, 32779, 32778, 32777, 32770, 32781], name: '科技楼'}, {mapID:2, nodeID:[32776], name:'学15楼'}, 
			   {mapID:3, nodeID:[32775], name:'英东楼'}, {mapID:4, nodeID:[32774], name:'东体育场'}, {mapID:5, nodeID:[32775], name:'信息学院外气象站'},
			   {mapID:6, nodeID:[32781], name:'办公室'}];

var nodeDesList = [{nodeID:32769, des:'node32769'}, {nodeID:32773, des:'node32773'}, {nodeID:32774, des:'node32774'},
                   {nodeID:32775, des:'信息学院外气象站'}, {nodeID:32777, des:'科技楼土壤湿度'},
                   {nodeID:32781, des:'node32781'}, {nodeID:32782, des:'node32782'}, {nodeID:32776, des:'学15楼天气传感器'},
                   {nodeID:32778, des:'科技楼土壤温度'}, {nodeID:32780, des:'科技楼土壤温度'}, {nodeID:32780, des:'实验室内温湿度'}, 
                   {nodeID:32779, des:'科技楼土壤湿度'}, {nodeID:32770, des:'科技楼气象站'}];

var sensorValueTypeList = [{typeName:'humidity', img: '湿度', name:'湿度', unit:'rh'}, {typeName:'temperature', img:'温度', name:'温度', unit:'摄氏度'}, 
							{typeName:'Temp', img:'温度', name:'温度', unit:'摄氏度'}, 
							{typeName:'Humidity', img:'湿度', name:'湿度', unit:'rh'}, {typeName:'Solar', img:'光照强度', name:'光照强度', unit:'w/m*m'}, 
							{typeName:'WindAvg', img:'平均风速', name:'平均风速', unit:'km/h'}, 
							{typeName:'WindMax', img:'最大风速', name:'最大风速', unit:'km/h'}, {typeName:'WindDirAvg', img:'平均风向', name:'平均风向', unit:'deg'}, 
							{typeName:'RainTotal', img:'雨量', name:'雨量', unit:'cm'}, {typeName:'BP', img:'气压', name:'气压', unit:'mbar'}, 
							{typeName:'soilMoisture', img:'土壤湿度', name:'土壤湿度', unit:'rh'}, {typeName:'soilTemperature', img:'土壤温度', name:'土壤温度', unit:'摄氏度'}];


var cameraList = [{id:10001, text:'环境科学楼'}, {id:10002, text:'科技楼'}, {id:10003, text:'学一宿舍楼'}, {id:10001, text:'环境科学楼'}];

exports.getNodeID = function(_mapID){
	return _.find(nodeMap, function(_node){
		return _node.mapID == _mapID;
	});	
};

exports.getNodeDes = function(_idlist){
	if(_idlist == null){
		return null;
	}
	return _.filter(nodeDesList, function(_value){
		return _.contains(_idlist, _value.nodeID);
	});	
};


exports.getSensorType = function(){
	return sensorValueTypeList;
};

exports.getCameraText = function(_id){
	return _.find(cameraList, function(_camera){
		return _camera.id == _id;
	}).text;
};




