// var util = require('util');
// var request = require('request');
// var fs = require('fs');
// var path = require('path');
// var Q = require('q');
// var config = require("../services/ConfigService");
// //var mySqlPath =  'D:/项目/中交svn/ZJXT_OSS/Src/app/Maintenance/Server/node_modules/sails-mysql/node_modules/mysql';
// var mySqlPath = process.env.PWD + '/node_modules/sails-mysql/node_modules/mysql';
// var mysql = require(mySqlPath);
// var sailsMySqlConfig = sails.config.connections.maintenanceMysqlServer;
// var connection = mysql.createConnection({
//   host: sailsMySqlConfig.host,
//   user: sailsMySqlConfig.user,
//   password: sailsMySqlConfig.password,
//   database: sailsMySqlConfig.database,
//   multipleStatements: true,
// });
// function getWeChatToken(called) {
//   var url = util.format('https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=%s&corpsecret=%s',config.CORPID,config.CORPSECRET);
//   request(url, function(error, response, body) {
//     if (!error && response.statusCode == 200) {
//       var bodyData = JSON.parse(body);
//       if( bodyData && bodyData.access_token){
//         fs.writeFileSync(path.join(sails.config.appPath, 'ACCESS_TOKEN.json'), bodyData.access_token, 'utf8');
//         return true;
//       }
//     }
//   })
// };
// function sendMsgAsync(userName,msg,callback) {
//   var https = require('https');
//   var querystring = require('querystring');
//   var ACCESS_TOKEN = fs.readFileSync(path.join(sails.config.appPath, 'ACCESS_TOKEN.json'), 'utf8');
//   // var baseUrl = 'https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=' + ACCESS_TOKEN;
//
//   var usersId = "kunming0886|ZhaoBin|LiuJiaLiang|ZhuJianXiang|HeZhiHong|JiangChuan";
//   if(userName) {
//     usersId = userName;
//   }
//   // 调用发送消息接口地址
//   var baseUrl = util.format('https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=%s', ACCESS_TOKEN);
//   var data = {
//     "touser": usersId,
//     "toparty": "",
//     "msgtype": "text",
//     "agentid": config.AGENTID,
//     "text": {
//       "content": msg,
//     },
//     "safe": 0
//   }
//   //"content": "您的账号有抄送给您的集中监控故障工单。\n工单号：GZQX201708160944001；\n机房名称：阿房宫；\n故障网元：1166-归朝-OLA-云南；\n告警名称：测试1；\n告警级别：三级告警；\n告警发生时间：2017-08-16 07:49:15；\n告警定位信息：0-subrack-2-55NO2-3(IN3/OUT3)-OCh:1-OTU2:1。"
//   var obj = {
//     method: 'post',
//     url: baseUrl,
//     form: data,
//     rejectUnauthorized: false,
//     requestCert: true,
//   }
//   request({
//     url: baseUrl,
//     method: 'POST',
//     json: true,
//     headers: {
//       'Content-Type': 'Application/json'
//     },
//     body: data
//   },function (error, response, body) {
//     cd(error, response, body)
//     callback(error,body);
//   });
//   function cd(error, response, body) {
//     if(error) throw err
//     if(body.errcode == 42001){//
//       getWeChatToken();
//     }else if(body.errcode > 0){
//       //getWeChatToken();
//       sails.log.error("微信通知发送出错："+usersId +"；" +JSON.stringify(body));
//     }
//     if(body.errcode == 0) {
//       return true;
//     } else {
//       return false;
//     }
//   }
// }
// function getNotSendMsg(req,res) {
//   // var date = new Date();
//   // 第一步，执行查找事件；
//   var findSql = 'select * from t_sms_message where PLAN_SENDTIME <= NOW()';
//   connection.query(findSql,function(err,rows,fields){
//     if(err) {
//       throw err;
//     }
//     async.map(rows, function(item, callback) {
//       if(item.RECEIVE_TYPE == 3) {
//         sendMsgAsync(item.RECEIVE_NAME,item.MESSAGE,function(err,resultsData){
//           var updateSql;
//           if(err) {
//             sails.log.error("微信发送通知失败，工单号："+item.WORK_ID+"  ID: "+item.ID);
//             // updateSql = `insert into t_sms_sendmessage select *,NOW() as SEND_TIME,NULL as ERROR_FLAG,0 as SEND_STAT from t_sms_message ON DUPLICATE KEY update ERROR_FLAG=VALUES(b); `;
//           }
//           if(resultsData.errcode == 0) {
//             updateSql = `insert into t_sms_sendmessage select *,NOW() as SEND_TIME,NULL as ERROR_FLAG,1 as SEND_STAT from t_sms_message where ID='${item.ID}';delete from t_sms_message where ID = '${item.ID}'`;
//           }
//           if(updateSql) {
//             connection.query(updateSql,function(err1,row1,fields1){
//               callback(err1,item);
//             })
//           } else {
//             callback(null,item);
//           }
//         });
//       }
//
//     }, function(err,results) {
//       // connection.end();
//       // process.nextTick(function(){
//       //   getNotSendMsg();
//       // });
//       setTimeout(function(){
//         getNotSendMsg();
//       },5000)
//     });
//
//   })
// }
// getWeChatToken();
// // getNotSendMsg();
//
// module.exports = {
//   sendMsg:function (usersIdStr,msg,fixedDepartment) {
//     var https = require('https');
//     var querystring = require('querystring');
//     var ACCESS_TOKEN = fs.readFileSync(path.join(sails.config.appPath, 'ACCESS_TOKEN.json'), 'utf8');
//     // var baseUrl = 'https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=' + ACCESS_TOKEN;
//
//     var usersId = "kunming0886|ZhaoBin|LiuJiaLiang|ZhuJianXiang|HeZhiHong|JiangChuan";
//     if(usersIdStr) {
//       usersId = usersIdStr;
//     }
//     var departmentStr = '';
//     if(fixedDepartment) {
//       departmentStr = fixedDepartment;
//     }
//     // 调用发送消息接口地址
//     var baseUrl = util.format('https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=%s', ACCESS_TOKEN);
//     var data = {
//       "touser": usersId,
//       "toparty": departmentStr,
//       "msgtype": "text",
//       "agentid": config.AGENTID,
//       "text": {
//         "content": msg,
//       },
//       "safe": 0
//     }
//     //"content": "您的账号有抄送给您的集中监控故障工单。\n工单号：GZQX201708160944001；\n机房名称：阿房宫；\n故障网元：1166-归朝-OLA-云南；\n告警名称：测试1；\n告警级别：三级告警；\n告警发生时间：2017-08-16 07:49:15；\n告警定位信息：0-subrack-2-55NO2-3(IN3/OUT3)-OCh:1-OTU2:1。"
//     var obj = {
//       method: 'post',
//       url: baseUrl,
//       form: data,
//       rejectUnauthorized: false,
//       requestCert: true,
//     }
//     request({
//       url: baseUrl,
//       method: 'POST',
//       json: true,
//       headers: {
//         'Content-Type': 'Application/json'
//       },
//       body: data
//     }, function (error, response, body) {
//       sails.log.error("微信通知发送成功："+usersId +"；");
//       cb(error, response, body)
//     })
//     function cb(error, response, body) {
//       if(error) throw err
//       if(body.errcode == 42001){//
//         getWeChatToken();
//       }else if(body.errcode > 0){
//         //getWeChatToken();
//         sails.log.error("微信通知发送出错："+usersId +"；" +JSON.stringify(body));
//       }
//       if(body.errcode == 0) {
//         return true;
//       } else {
//         return false;
//       }
//     }
//   }
// }
