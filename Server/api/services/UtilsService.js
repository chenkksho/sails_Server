/**
 * Created by cuishiyong on 2017/3/22.
 */
var request = require("request");
var opt = {
  //host:'http://10.4.0.33',
   host:'http://123.56.192.2',
  //host:'http://124.207.149.242',
// host:'http://10.95.3.152',
  // host:'http://10.4.0.139',
  port:'8080',
  method:'GET'
}

module.exports = {
  GetGuid: function () {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  },
  isArray:function(ary,e){
    for(var i=0;i<ary.length;i++){
        if(ary[i]==e)return true;
    }
    return false;
  },
  send: function (options, cb) {
    opt.data = null;
    opt.method = 'GET';
    var optData = _.extend(opt || {}, options || {});
    var data = "";
    if (!optData.data) {
      optData.data = {};
      data = "";
    } else {
      if (optData.method == "GET" || optData.method == "get")
        data = JSON.stringify(optData.data);
      else
        data = optData.data;
    }
    var url = optData.host + ":" + optData.port + optData.url;
    console.log(url);
    if (optData.method == "GET" || optData.method == "get") {
      if (data != "") {
        data = encodeURIComponent(data);
        url += "/" + data;
      }
    }
    //url = encodeURIComponent(url);
    request({
      url: url,
      method: optData.method,
      json: true,
      headers: {
        "content-type": "application/json",
      },
      body: data
    }, function (error, response, body) {
      //console.log('----------------error--------------');
      //console.log(error);
      //console.log('----------------response--------------');
      //console.log(response);
      //console.log('----------------body--------------');
      //console.log(body);
      if(body!=null&&body.sucess){
        if(body.data==null){

          cb(error, {success:true,data:"操作成功"});
        }else{
          cb(error, body.data);
        }
      }else{
        if(error==null)error=response;
        cb(error, null);
      }
    });
  },
  get:function(options, cb){
    opt.data = null;
    var optData = _.extend(opt || {}, options || {});
    var url = optData.host + ":" + optData.port + optData.url;
    var data = "";
    if (!optData.data) {
        optData.data = {};
        data = "";
    } else {
      data = JSON.stringify(optData.data);
    }
    if (data != "") {
      data = encodeURIComponent(data);
      url += "/" + data;
    }
    request({
      url: url,
      method: 'GET',
      json: true,
      headers: {
        "content-type": "application/json",
      },
      body: data
    }, function (error, response, body) {
      cb(error, response, body);
    });
  },
  post:function(options, cb){
    opt.data = null;
    var optData = _.extend(opt || {}, options || {});
    var url = optData.host + ":" + optData.port + optData.url;

    request({
      url: url,
      method: 'POST',
      json: true,
      headers: {
        "content-type": "application/json",
      },
      body: optData.data
    }, function (error, response, body) {
      cb(error, response, body);
    });
  },
  put:function(options, cb){
    opt.data = null;
    var optData = _.extend(opt || {}, options || {});
    var url = optData.host + ":" + optData.port + optData.url;

    request({
      url: url,
      method: 'PUT',
      json: true,
      headers: {
        "content-type": "application/json",
      },
      body: optData.data
    }, function (error, response, body) {
      cb(error, response, body);
    });
  },
  delete:function(options, cb){
    opt.data = null;
    var optData = _.extend(opt || {}, options || {});
    var url = optData.host + ":" + optData.port + optData.url;

    request({
      url: url,
      method: 'DELETE',
      json: true,
      headers: {
        "content-type": "application/json",
      },
      body: optData.data
    }, function (error, response, body) {
      cb(error, response, body);
    });
  }
}
