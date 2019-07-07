module.exports = {


  friendlyName: 'Send HTML email',


  description: 'Send an automated HTML email.',


  extendedDescription: 'This implementation delivers the provided message using the Mailgun API.',


  moreInfoUrl: 'https://documentation.mailgun.com/en/latest/api-sending.html#sending',


  inputs: {

    to: {
      example: 'jane@example.com',
      description: 'Email address of the desired recipient.',
      required: true
    },

    subject: {
      description: 'Subject line for the email.',
      example: 'Welcome, Jane!',
      required: true
    },

    htmlMessage: {
      description: 'The html body of the email.',
      example: '<p>Jane,</p>\n<p>Thanks for joining our community.  If you have any questions, please don\'t hesitate to send them our way.  Feel free to reply to this email directly.</p>\n<br/>\n<p><em>Sincerely,</em></p>\n<p><em>The Management</em></p>',
      required: true
    },

    from: {
      description: 'The return email address of the sender.',
      example: 'noreply@sailsjs.com',
      required: true
    },

    fromName: {
      description: 'The display name of the sender, for display purposes in the inbox.',
      example: 'Sails Co.'
    },

    secret: require('../PARAMETERS').MAILGUN_SECRET,

    domain: require('../PARAMETERS').MAILGUN_DOMAIN,

    host: require('../PARAMETERS').MAILGUN_HOST,

    toName: {
      example: 'Jane Doe',
      description: 'Full name of the primary recipient.',
      extendedDescription: 'If left blank, defaults to the recipient\'s email address.'
    },

    textMessage: {
      description: 'The plaintext fallback for the email.',
      example: 'Jane,\nThanks for joining our community.  If you have any questions, please don\'t hesitate to send them our way.  Feel free to reply to this email directly.\n\nSincerely,\nThe Management'
    },

    testMode: {
      type: 'boolean',
      friendlyName: 'Test mode?',
      description: 'Whether to send this email using Mailgun\'s "test mode".',
      defaultsTo: false
    }

  },


  exits: {

    success: {
      description: 'The email was sent successfully.',
      extendedDescription: 'Note that this does not necessarily mean it was _delivered_ successfully.  If you are having issues with mail being delivered, check the Mailgun dashboard for delivery status, and be sure to verify that the email wasn\'t quarantined or flagged as spam by the recipient\'s email service (e.g. Gmail\'s "spam folder" or GSuite\'s "admin quarantine").'
    }

  },


  fn: async function({to, subject, htmlMessage, from, fromName, secret, domain, host, toName, textMessage, testMode}) {

    // Import dependencies.
    var Http = require('machinepack-http');


    var data = {
      from: (function º(){
        // e.g. 'John Doe <john@example.com>'
        if (!fromName) {
          return from;
        }
        return fromName+' <'+from+'>';
      })(),
      // Format recipients
      // e.g. 'Jane Doe <jane@example.com>,foo@example.com'.
      to: (function º(){
        var recipients = [
          { emailAddress: to, name: toName }
        ];
        return recipients.map(function(recipient) {
          if (recipient.name) {
            return recipient.name+' <'+recipient.emailAddress+'>';
          } else {
            return recipient.emailAddress;
          }
        }).join(',');
      })(),//º
      subject: subject,
      text: textMessage || '',
      html: htmlMessage || '',
    };

    if(testMode) {
      data['o:testmode'] = 'yes';
    }

    await Http.sendHttpRequest.with({
      method: 'POST',
      url: `/${domain}/messages`,
      baseUrl: `https://api:${secret}@${host || 'api.mailgun.net'}/v3`,
      body: data,
      enctype: 'multipart/form-data',
    });

  }

};
