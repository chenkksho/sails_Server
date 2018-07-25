/**
 * Created by wingzero on 2017/3/26.
 */
module.exports = {
  getDictsByQuery: function (scookie, done) {
    'use strict';
    var rreq = {
      url: '101.201.107.141',
      method: 'post',
      headers: '',
      data: ''
    };
    // sails.request(rreq,function (req,res) {
    //   var rs = req;
    // });
    var http = require('http');
    require('buffer');
    var postData = require('querystring').stringify({
      //dicType: 'HOUSE_TYPE'
      dicType: 'HOUSE_TYPE',
      appId: 'TIOSS'
    });
    var options = {
      port: 18005,
      hostname: '101.201.107.141',
      method: 'post',
      path: '/Open/OAuth/VerfityUserInfo',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Content-Length': Buffer.byteLength(postData),
        'Connection': 'keep-alive',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'X-Requested-With': 'XMLHttpRequest',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.8',
        'Cookie':['Manage_TSESSION_ID=e521917833ef476ebfe5c705d7924197','Tescomm_Access_Token=2B67A82DC242A46D57B65E33A2634C47']
      }
    };
    var req = http.request(options, function (res) {
      var statusCode = res.statusCode;
      var contentType = res.headers['content-type'];

      let error;
      if (statusCode !== 200) {
        error = new Error('Request Failed.\n' + 'Status Code: ${statusCode}');
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error('Invalid content-type.\n' + 'Expected application/json but received ${contentType}');
      }
      if (error) {
        console.log(error.message);
        // consume response data to free up memory
        res.resume();
        done(error.message);
        return;
      }

      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', function (chunk) {
        rawData += chunk;
      });
      res.on('end', function () {
        try {
          let parsedData = JSON.parse(rawData);
          console.log(parsedData);
          done(parsedData);
        } catch (e) {
          console.log(e.message);
        }
      });
    }).on('error', function (e) {
      console.log('Got error: ${e.message}');
    });

    // write data to request body
    req.write(postData);
    req.end();
  },
  leftZeroPad:function (val, minLength) {
    'use strict'
    var MANY_ZEROS = "000000000000000000";
    if (typeof(val) !== "string"){
      val = String(val);
    }
    return (MANY_ZEROS.substring(0, minLength - val.length)) + val;
  }
};
Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
Array.prototype.contains = function ( needle ) {
  for (i in this) {
    if (this[i] == needle) return true;
  }
  return false;
}
String.prototype.trim = function (char, type) {
  if (char) {
    if (type == 'left') {
      return this.replace(new RegExp('^\\'+char+'+', 'g'), '');
    } else if (type == 'right') {
      return this.replace(new RegExp('\\'+char+'+$', 'g'), '');
    }
    return this.replace(new RegExp('^\\'+char+'+|\\'+char+'+$', 'g'), '');
  }
  return this.replace(/^\s+|\s+$/g, '');
};

