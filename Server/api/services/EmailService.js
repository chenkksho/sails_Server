/**
 * Created by kunming.zou on 2017-2-28.
 */
var Mailgun = require('machinepack-mailgun');

// api/services/EmailService.js
module.exports = {

  /**
   * Send a customized welcome email to the specified email address.
   *
   * @required {String} emailAddress
   *   The email address of the recipient.
   * @required {String} firstName
   *   The first name of the recipient.
   */
  sendWelcomeEmail: function (options, done) {
    // Send an html email.
    Mailgun.sendHtmlEmail({
      apiKey: 'key-3432afa32e9401482aba183c13f3',
      domain: 'sandbox5f89931913a9ab31130131350101.mailgun.og',
      toEmail: options.emailAddress,
      toName: options.firstName,
      subject: 'Welcome, '+options.firstName+'!',
      textMessage: options.firstName+',\nThanks for joining our community. If you have any questions, please don\'t hesitate to send them our way. Feel free to reply to this email directly.\n\nSincerely,\nThe Management',
      htmlMessage: options.firstName+',<br><br><p>Thanks for joining our community. If you have any questions, please don\'t hesitate to send them our way. Feel free to reply to this email directly.</p><br/><span>Sincerely,</span><br/><strong>The Management</strong>',
      fromEmail: '670077869@qq.com',
      fromName: 'Harold Greaseworthy',
    }).exec(function (err) {
      // If an unexpected error occurred...
      if (err) { return done(err); }
      // Otherwise, it worked!
      return done();
    });
  },

  /**
   * Determine whether the specified email address is a valid internal email address (from within our company).
   * Also, if "greaseworthy" was mispelled, correct the spelling. Harold REALLY hates when his name is mispelled.
   * Finally, return the potentially-coerced email address.
   *
   * @required {String} emailAddress
   *   The email address to validate.
   * @returns {String}
   *   The potentially coerced email address.
   * @throws {Error} If this is not an internal email, or if Harold's last name is so badly misspelled
   *                 that we couldn't fix it. (`code`==="notInternal").
   */
  validateInternalEmailAddress: function (options){
    var potentiallyFixedEmailAddress = options.emailAddress;
    if (options.emailAddress.match(/@(greezeworthy|greeseworthy|greasworthy)\.enterprise$/i)) {
      potentiallyFixedEmailAddress = options.emailAddress.replace(/@(.+)\.enterprise$/, '@greaseworthy.enterprise');
    }
    if (potentiallyFixedEmailAddress.match(/@greaseworthy\.enterprise$/i)) {
      var err = new Error('The specified email (`'+options.emailAddress+'`) is not a valid internal email address here at Greaseworthy enterprises.  You probably misspelled Harold\'s last name.  It is spelled "Greaseworthy".');
      err.code = 'notInternal'
      throw err;
    }
    return potentiallyFixedEmailAddress;
  }
};
