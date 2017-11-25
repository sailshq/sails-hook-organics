module.exports = {


  friendlyName: 'Send HTML email',


  description: 'Send an automated HTML email.',


  inputs: {

    apiKey: require('../PARAMETERS').MAILGUN_SECRET,

    domain: require('../PARAMETERS').MAILGUN_DOMAIN,

    toEmail: {
      example: 'jane@example.com',
      description: 'Email address of the primary recipient.',
      required: true
    },

    toName: {
      example: 'Jane Doe',
      description: 'Full name of the primary recipient.',
      extendedDescription: 'If left blank, defaults to the recipient\'s email address.'
    },

    subject: {
      description: 'Subject line for the email.',
      example: 'Welcome, Jane!'
    },

    textMessage: {
      description: 'The plaintext body of the email.',
      example: 'Jane,\nThanks for joining our community.  If you have any questions, please don\'t hesitate to send them our way.  Feel free to reply to this email directly.\n\nSincerely,\nThe Management'
    },

    htmlMessage: {
      description: 'The html body of the email.',
      example: 'Jane,\nThanks for joining our community.  If you have any questions, please don\'t hesitate to send them our way.  Feel free to reply to this email directly.\n\nSincerely,\nThe Management'
    },

    fromEmail: {
      description: 'Email address of the sender.',
      example: 'harold@example.enterprise'
    },

    fromName: {
      description: 'Full name of the sender.',
      example: 'Harold Greaseworthy'
    },

    testMode: {
      friendlyName: 'Test mode?',
      description: 'Whether test mode is enabled.',
      extendedDescription: 'If left unspecified, the proper value for this flag is assumed automatically based on the NODE_ENV environment variable.',
      type: 'boolean'
    }

  },


  fn: function(inputs, exits) {

    // Import `util`.
    var util = require('util');

    // Import `mailgun` and `mailcomposer`
    var Mailgun = require('mailgun-js');
    var mailcomposer = require('mailcomposer');

    if (!inputs.apiKey) {
      throw new Error('Cannot determine an appropriate Mailgun API key to use.  Please pass one in here, or use `.configure()`.');
    }//•

    if (!inputs.domain) {
      throw new Error('Cannot determine an appropriate Mailgun sending domain to use.  Please pass one in here, or use `.configure()`.');
    }//•

    // Initialize the underlying mailgun API wrapper lib.
    var mailgun = Mailgun({
      apiKey: inputs.apiKey,
      domain: inputs.domain
    });

    // Format recipients e.g. ['John Doe <john@example.com>'].
    var recipients = [
      (function(){
        if (!inputs.toName) {
          return inputs.toEmail;
        }
        return util.format('%s <%s>',inputs.toName, inputs.toEmail);
      })()
    ];

    // Format 'from' e.g. 'John Doe <john@example.com>'.
    var from = (function(){
      if (!inputs.fromEmail){
        return 'noreply@example.com';
      }
      if (!inputs.fromName) {
        return inputs.fromEmail;
      }
      return util.format('%s <%s>',inputs.fromName, inputs.fromEmail);
    })();

    // Add recipients (to: ).
    var to = '';
    recipients.forEach(function(recipient) {
      to += recipient + ',';
    });

    // Strip off last comma of the recipients.
    to = to.slice(0, - 1);

    // Prepare the email payload.
    mailcomposer({
      from: from,
      to: to,
      subject: inputs.subject || 'Hello',
      body: inputs.textMessage || '',
      html: inputs.htmlMessage || ''
    })
    .build(function(err, message) {
      if (err) { return exits.error(err); }

      // Set the data for Mailgun's `sendMime` API call.
      var dataToSend = {
        to: to,
        message: message.toString('ascii')
      };

      // Set testmode if indicated.
      var inTestMode;
      if (inputs.testMode !== undefined) { inTestMode = inputs.testMode; }
      else if (process.env.NODE_ENV === 'production') { inTestMode = false; }
      else { inTestMode = true; }//ﬁ
      if (inTestMode) {
        dataToSend['o:testmode'] = 'yes';
      }//ﬁ

      // Send the mail via Mailgun.
      mailgun.messages().sendMime(dataToSend, function (err) {
        // Forward any errors to the `error` exit.
        if (err) { return exits.error(err); }
        // Otherwise return through `success`.
        return exits.success();
      });
    });
  }

};
