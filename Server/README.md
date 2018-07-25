1、日志记录
  sails.log.info("msg");
  sails.log.error("msg");

2、目录获取
  process.env.PWD = process.cwd();//设置环境变量
  process.cwd()//获取当前目录
  __dirname//当前目录
  sails.config.appPath//获取服务根目录

3、控制台输出查询sql
  app.js 设置
  process.env.LOG_QUERIES = 'true';

4、生成models、controllers
  需要先安装npm install sails-generate-models -g
  进入到server目录然后运行下面命令
  sails-generate-models --connection=maintenanceMysqlServer --table=alarm_work --database=zjxt_maintenance

5、路径拼接
  var path = require("path");
  var filePath1 = path.join(dirStore, fileName);//__dirname 推荐使用join
  var filePath2 = path.resolve(sails.config.appPath, dirStore);//join更安全
  var filePath3 = path.resolve(sails.config.appPath,'../')

6、关于policies
  (1)、 module.exports.policies = {
           *: true   // 代表对所有controller的action都不执行策略
        }
  （2）、 module.exports.policies = {
             *: 'sessionAuth'   // 代表对所有controller的action都执行 api/policies/sessionAuth.js的策略
             'AlarmManage/Alarm_workController': {
             		'find': true,  // 代表对controller/AlarmManage/Alarm_workController.js 里面的find方法不执行策略
             	}
          }
