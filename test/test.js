require("should");
var _ = require("underscore");
var request = require('request');
var EventProxy = require('eventproxy');
var indexJS = require('../routes/index');

describe("Weather", function() {
    it('获取网络实时数据解析', function(){
        // var ep = EventProxy.create('requestWeatherDataOver', function(_data){
        //     getAllWeatherLevels(_data);
        // });
        // ep.fail(function(_err){
        //     console.log('some thing wrong');
        //     console.dir(_err);
        // });
        // request('http://m.weather.com.cn/data/101010100.html', ep.done('requestWeatherDataOver'));
        // request('http://m.weather.com.cn/data/101010100.html', function(_err, _data){
        //     console.dir(_data);
        //     getAllWeatherLevels(_data);
        // });

    });
    it("根据城市代码获取指定城市天气数据", function() {
        // return;
        var data = '{"weatherinfo":{"city":"北京","city_en":"beijing","date_y":"2013年12月22日","date":"","week":"星期日","fchh":"08","cityid":"101010100","temp1":"3℃~-7℃","temp2":"5℃~-6℃","temp3":"4℃~-5℃","temp4":"5℃~-6℃","temp5":"2℃~-7℃","temp6":"2℃~-8℃","tempF1":"37.4℉~19.4℉","tempF2":"41℉~21.2℉","tempF3":"39.2℉~23℉","tempF4":"41℉~21.2℉","tempF5":"35.6℉~19.4℉","tempF6":"35.6℉~17.6℉","weather1":"多云转晴","weather2":"晴","weather3":"晴转阴","weather4":"阴转晴","weather5":"晴转小雪","weather6":"晴","img1":"1","img2":"0","img3":"0","img4":"99","img5":"0","img6":"2","img7":"2","img8":"0","img9":"0","img10":"99","img11":"0","img12":"99","img_single":"1","img_title1":"多云","img_title2":"晴","img_title3":"晴","img_title4":"晴","img_title5":"晴","img_title6":"阴","img_title7":"阴","img_title8":"晴","img_title9":"晴","img_title10":"晴","img_title11":"晴","img_title12":"晴","img_title_single":"多云","wind1":"微风","wind2":"微风","wind3":"微风","wind4":"北风3-4级转4-5级","wind5":"北风3-4级","wind6":"北风3-5级转微风","fx1":"微风","fx2":"微风","fl1":"小于3级","fl2":"小于3级","fl3":"小于3级","fl4":"3-4级转4-5级","fl5":"3-4级","fl6":"3-4级转小于3级","index":"寒冷","index_d":"天气寒冷，建议着厚羽绒服、毛皮大衣加厚毛衣等隆冬服装。年老体弱者尤其要注意保暖防冻。","index48":"冷","index48_d":"天气冷，建议着棉服、羽绒服、皮夹克加羊毛衫等冬季服装。年老体弱者宜着厚棉衣、冬大衣或厚羽绒服。","index_uv":"最弱","index48_uv":"中等","index_xc":"适宜","index_tr":"较适宜","index_co":"较不舒适","st1":"3","st2":"-5","st3":"4","st4":"-4","st5":"3","st6":"-5","index_cl":"适宜","index_ls":"基本适宜","index_ag":"极不易发"}}';

        var levels = indexJS.getAllWeatherLevels(data);
        (_.size(levels) == 6).should.be.true;

        return;
        var info = JSON.parse(data);
        // console.dir(info);
        var weatherinfo = info.weatherinfo;
        (weatherinfo.city == "北京").should.be.true;
        (weatherinfo.temp1 == "3℃~-7℃").should.be.true;

        for(var i=1; i<=6; i++){
            var des = weatherinfo['weather'+i];
            var windDes = weatherinfo['wind'+i];
            console.dir(windDes);
            var level = parseWeatherLevel(des, windDes);
            console.log('第'+i+'天 '+ des + ', '+ windDes + ', ' + level.des);
        }

    });
    it('测试数字正则表达式', function(){
        return;
        var data = '3-4级转5小于3级';
        var matches = data.match(/[0-9]/g);
        (_.size(matches) == 4).should.be.true;
        (_.max(matches) == 5).should.be.true;
    });
    it('', function(){
        var codes = indexJS.getCitiesCode(['北京', '高密', '潍坊']);
        (_.size(codes) == 3).should.be.true;
        console.dir(codes);
    })
});

