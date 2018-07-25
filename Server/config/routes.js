/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/
  'GET /rest/zjxt/dictionaries' : 'Common/Dim_d_dictionaryController.find',
  'post /api/UploadManage/Upload':'UploadManage/UploadController.upload',
  'get /api/UploadManage/Upload':'UploadManage/UploadController.upload',
  'post /api/UploadManage/Remove':'UploadManage/UploadController.remove',
  'get /api/UploadManage/Remove':'UploadManage/UploadController.remove',
  'post /api/UploadManage/download':'UploadManage/UploadController.download',
  'get /api/UploadManage/download':'UploadManage/UploadController.download',
  'post /zjxtoss/interSwitchAlarm/newAlarm':'TransAlarm/T_inmonitor_transalarmController.newAlarm',
  'post /zjxtoss/interSwitchAlarm/syncAlarm':'TransAlarm/T_inmonitor_transalarmController.syncAlarm',
  'post /zjxtoss/interSwitchAlarm/addAlarm':'TransAlarm/T_inmonitor_transalarmController.addAlarm',

  'post /AlarmManage/Alarm_work/appFindFaultWork':'AlarmManage/Alarm_workController.appFindFaultWork',
  'post /AlarmManage/Alarm_work/find':'AlarmManage/Alarm_workController.find',
  'post /AlarmManage/Alarm_receive_group/accept':'AlarmManage/Alarm_receive_groupController.accept',
  'post /AlarmManage/Alarm_receive_group/find':'AlarmManage/Alarm_receive_groupController.find',
  'post /AlarmManage/Alarm_work/receipt':'AlarmManage/Alarm_workController.receipt',
  'post /AlarmManage/Alarm_work/receiptByTransfer':'AlarmManage/Alarm_workController.receiptByTransfer',
  'post /AlarmManage/Alarm_feedback/find':'AlarmManage/Alarm_feedbackController.find',
  'post /AlarmManage/Alarm_feedback/feedback':'AlarmManage/Alarm_feedbackController.feedback',
  'post /AlarmManage/Alarm_feedback/transferOrder':'AlarmManage/Alarm_feedbackController.transferOrder',
  'post /AlarmManage/T_inmonitor_transalarm/find':'AlarmManage/T_inmonitor_transalarmController.find',
  'post /Common/Work_attachment/find':'Common/Work_attachmentController.find',
  'post /Common/Dim_d_dictionary/find' : 'Common/Dim_d_dictionaryController.find',
};
