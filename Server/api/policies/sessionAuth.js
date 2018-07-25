/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
var request = require("request");
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
 var params = _.extend(req.query || {}, req.params || {}, req.body || {});
  // if (params.tokenID) {
  //   return next();
  // }
    if(params.tokenID){
      request({
        url: ConfigService.AuthorizeService+'/open/Oauth/Verify?token='+params.tokenID,
        method: 'GET',
        json: true,
        headers: {
          "content-type": "application/json",
        }
      }, function (error, response, body) {
        if(error){
            res.send(200,{Auth:false,msg:"您的登陆信息已失效，请重新登陆！"})
        }else {
          if(body){
            return next();
          }else{
            res.send(200,{Auth:false,msg:"您的登陆信息已失效，请重新登陆！"})
          }
        }
      });
    } else {
      res.send(200,{Auth:false,msg:"您的登陆信息已失效，请重新登陆！"})
    }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  //return res.redirect('http://www.baidu.com');
};
