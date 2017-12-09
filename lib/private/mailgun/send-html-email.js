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


  fn: function(inputs, exits) {

    // Import dependencies.
    var Mailgun = require('mailgun-js');
    var mailcomposer = require('mailcomposer');

    // Initialize the underlying mailgun API wrapper lib.
    var mailgun = Mailgun({
      apiKey: inputs.secret,
      domain: inputs.domain
    });

    // Format recipients
    // e.g. 'Jane Doe <jane@example.com>,foo@example.com'.
    var formattedRecipients = (function º(){
      var recipients = [
        { emailAddress: inputs.to, name: inputs.toName }
      ];
      return recipients.map(function(recipient) {
        if (recipient.name) {
          return recipient.name+' <'+recipient.emailAddress+'>';
        } else {
          return recipient.emailAddress;
        }
      }).join(',');
    })();//º

    // Prepare the email payload.
    mailcomposer({
      to: formattedRecipients,
      subject: inputs.subject,
      body: inputs.textMessage || '',
      html: inputs.htmlMessage || '',
      from: (function º(){
        // e.g. 'John Doe <john@example.com>'
        if (!inputs.fromName) {
          return inputs.from;
        }
        return inputs.fromName+' <'+inputs.from+'>';
      })()//º
    })
    .build(function(err, message) {
      if (err) { return exits.error(err); }

      // Note: The old approach of using NODE_ENV was removed deliberately
      // to avoid unexpected behavior in userland.
      // ```
      // var inTestMode;
      // if (inputs.testMode !== undefined) { inTestMode = inputs.testMode; }
      // else if (process.env.NODE_ENV === 'production') { inTestMode = false; }
      // else { inTestMode = true; }//ﬁ
      // ```

      // Send the mail via Mailgun's `sendMime` API call.
      mailgun.messages().sendMime({
        to: formattedRecipients,
        message: message.toString('ascii'),
        'o:testmode': inputs.testMode? 'yes' : undefined
      }, function (err) {
        if (err) { return exits.error(err); }
        return exits.success();
      });//_∏_   </ mailgun…sendMime() >
    });//_∏_   </ mailcomposer…build() >
  }

};
