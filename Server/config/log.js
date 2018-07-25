/**
 * Built-in Log Configuration
 * (sails.config.log)
 *
 * Configure the log level for your app, as well as the transport
 * (Underneath the covers, Sails uses Winston for logging, which
 * allows for some pretty neat custom transports/adapters for log messages)
 *
 * For more information on the Sails logger, check out:
 * http://sailsjs.org/#!/documentation/concepts/Logging
 */
var winston = require('winston');
var customLogger = new winston.Logger();

var twoDigit = '2-digit';
var options = {
  day: twoDigit,
  month: twoDigit,
  year: twoDigit,
  hour: twoDigit,
  minute: twoDigit,
  second: twoDigit
};

function formatter(args) {
  // var dateTimeComponents = new Date().Format('YYYY-MM-DD HH:mm:ss').toLocaleTimeString('en-us', options).split(',');
  var dateTimeComponents = new Date().Format('yyyy-MM-dd hh:mm:ss');
  var logMessage = dateTimeComponents + ' - ' + args.level + ': ' + args.message;
  console.log(logMessage);
  return logMessage;
}

// A console transport logging debug and above.
customLogger.add(winston.transports.Console, {
  timestamp:function(){
    return new Date().Format('yyyy-MM-dd hh:mm:ss');
  },
  colorize: true,
  level: 'debug',
  formatter:formatter,
});

// A file based transport logging only errors formatted as json.
// customLogger.add(winston.transports.File, {
//   level: 'debug',
//   filename: 'test.log',
//   json: true
// });
customLogger.add(winston.transports.DailyRotateFile, {
  timestamp:function(){
    return new Date().Format('yyyy-MM-dd hh:mm:ss');
  },
  level: 'debug',
  datePattern: 'yyyy-MM-dd.log',
  filename: '../Server/log/.',
  json: false,
  formatter:formatter,
});

module.exports.log = {

  /***************************************************************************
  *                                                                          *
  * Valid `level` configs: i.e. the minimum log level to capture with        *
  * sails.log.*()                                                            *
  *                                                                          *
  * The order of precedence for log levels from lowest to highest is:        *
  * silly, verbose, info, debug, warn, error                                 *
  *                                                                          *
  * You may also set the level to "silent" to suppress all logs.             *
  *                                                                          *
  ***************************************************************************/
  custom: customLogger,
  level: 'info',
  inspect: false

};
