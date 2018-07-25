/**
 * Created by kunming.zou on 2017-5-7.
 */
var formidable = require('formidable');
var http = require('http');
var util = require('util');
// var express = require('express');
var fs = require('fs');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
module.exports ={
  upload:function(req,res) {
    if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
      console.log(" ########## POST /upload ####### ");
      var fileTypeError = false;
      var target_path = __dirname+"/upload";
      var form = new formidable.IncomingForm();
      form.encoding = 'utf-8';
      form.keepExtensions = true;
      form.maxFieldsSize = 10 * 1024 * 1024;
      form.uploadDir = target_path;

      var fields = [];
      var files = [];

      form.on('field', function (field, value) {
        fields.push([field, value]);
      });
      form.on('file', function (field, file) {
        console.log('upload file: ' + file.name);
        //判断文件类型是否是xlsx
        if (file.type != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
          fileTypeError = true;
        }
        files.push([field, file]);
      });

      form.on('end', function () {

        //遍历上传文件
        var fileName = '';
        var obj = '';
        var folder_exists = fs.existsSync(target_path);
        if (folder_exists) {
          var dirList = fs.readdirSync(target_path);
          dirList.forEach(function (item) {
            if (!fs.statSync(target_path + '/' + item).isDirectory()) {
              console.log('parse item:' + target_path + '/' + item);
              fileName = target_path + '/' + item;
              if (!fileTypeError) {
                //解析excel
                obj = xlsx.parse(fileName);
                console.log(JSON.stringify(obj));
                //insert into DB
                //todo
                res.send({"rtnCode": "0", "rtnInfo": "成功导入数据"});
              } else {
                res.send({"rtnCode": "1", "rtnInfo": "文件格式不正确"});
              }
              //delete file
              fs.unlinkSync(fileName);

            }
          });
        }else{
          res.send({"rtnCode": "1", "rtnInfo": "系统错误"});
        }

      });
      form.on('error', function(err) {
        res.send({"rtnCode": "1", "rtnInfo": "上传出错"});
      });
      form.on('aborted', function() {
        res.send({"rtnCode": "1", "rtnInfo": "放弃上传"});
      });
      form.parse(req);

      //返回上传进度
      form.on('progress', function(bytesReceived, bytesExpected) {
        var progress = {
          type: 'progress',
          bytesReceived: bytesReceived,
          bytesExpected: bytesExpected
        };

        socket.broadcast(JSON.stringify(progress));
      });
      return;
    }

    // show a file upload form
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
      '<form action="/upload" enctype="multipart/form-data" method="post">'+
      '<input type="text" name="title"><br>'+
      '<input type="file" name="upload" multiple="multiple"><br>'+
      '<input type="submit" value="Upload">'+
      '</form>'
    );
  },
  download:function (url, dest, cb) {
    var file = fs.createWriteStream(dest);
    var request = http.get(url, function(response) {
      response.pipe(file);
      file.on('finish', function() {
        file.close(cb);  // close() is async, call cb after close completes.
      });
    }).on('error', function(err) { // Handle errors
      fs.unlink(dest); // Delete the file async. (But we don't check the result)
      if (cb) cb(err.message);
    });
  }
}
