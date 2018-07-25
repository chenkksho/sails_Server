/**
 * Created by cuishiyong on 2017/3/22.
 */
var nodeExcel = require('excel-export');
var fs = require('fs');
var xlsx = require('node-xlsx');
module.exports = {
    exportExcel:function(req,res,options){
        var  rows = [];
        var columns = options.columns.split(",");
        var captions = options.captions.split(",");
        var types = options.types.split(",");
        var conf = {};
        for(var i= 0;i<options.data.length;i++){
            var row = [];
            var _index = i+1;
            row.push(_index+"")
            for(var j = 0;j<columns.length;j++){
                row.push(options.data[i][columns[j]]+"");
            }
            rows.push(row);
        }
        var cols = [];
        for(var j=0;j<captions.length;j++){
            var obj = {};
            obj.caption = captions[j];
            obj.type = types[j];
            cols.push(obj);
        }
        cols.unshift({
            caption:"序号",
            type:'string'
        });
        conf.cols = cols;
        conf.rows = rows;
        var result = nodeExcel.execute(conf);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats');
        var userAgent = (req.headers['user-agent']||'').toLowerCase();
        if(userAgent.indexOf('msie') >= 0 || userAgent.indexOf('chrome') >= 0) {
            res.setHeader('Content-Disposition', 'attachment; filename=' + encodeURIComponent(options.fileName+ ".xlsx"));
        } else if(userAgent.indexOf('firefox') >= 0) {
            res.setHeader('Content-Disposition', 'attachment; filename*="utf8\'\'' + encodeURIComponent(options.fileName+ ".xlsx")+'"');
        } else {
            /* safari等其他非主流浏览器只能自求多福了 */
            res.setHeader('Content-Disposition', 'attachment; filename=' + new Buffer(options.fileName+ ".xlsx").toString('binary'));
        }
        res.end(result, 'binary');

        /*//另外一种导出方式
        // write
        var data = [[1,2,3],[true, false, null, 'sheetjs'],['foo','bar',new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
        var buffer = xlsx.build([{name: "mySheetName", data: data}]);
        fs.writeFileSync('b.xlsx', buffer, 'binary');
        res.send('export successfully!');*/
    },
    importExcel:function (req,res,options) {
      var params = req.allParams();
      //遍历上传文件
      var fileName =  params.fileName;
      var obj = '';
      var target_path = require('path').resolve(sails.config.appPath, params.path,fileName);
      var folder_exists = fs.existsSync(target_path);
      if (folder_exists) {
        fileName = target_path;
        if (!fs.statSync(fileName).isDirectory()) {
            //解析excel
           obj = xlsx.parse(fileName);
          //delete file
          fs.unlinkSync(fileName);
          return obj;
        }
      }else{
        var result = { success:false,msg:'系统错误',data:[] };
        return res.send(result,200);
      }
    }
}
