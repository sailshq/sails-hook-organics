module.exports = {


  friendlyName: 'Send HTML email',


  description: 'Send an automated HTML email.',


  extendedDescription: 'This implementation delivers the provided message using the SendGrid API.',


  moreInfoUrl: 'https://sendgrid.com/docs/api-reference/',


  inputs: {

    to: {
      example: 'anne.m.martin@example.com',
      description: 'Email address of the desired recipient.',
      required: true,
      isEmail: true,
    },

    toName: {
      example: 'Anne M. Martin',
      description: 'Full name of the primary recipient.',
    },

    subject: {
      description: 'Subject line for the email.',
      example: 'Welcome, Anne!',
      required: true
    },

    htmlMessage: {
      description: 'The html body of the email.',
      example: '<p>Anne,</p>\n<p>Thanks for joining our community.  If you have any questions, please don\'t hesitate to send them our way.  Feel free to reply to this email directly.</p>\n<br/>\n<p><em>Sincerely,</em></p>\n<p><em>The Management</em></p>',
      required: true
    },

    from: {
      description: 'The email address of the sender.',
      example: 'noreply@sailsjs.com',
      required: true
    },

    fromName: {
      description: 'The display name of the sender, for display purposes in the inbox.',
      example: 'Sails Co.'
    },

    secret: {
      type: 'string',
      required: true,
      description: 'The secret API key from a valid SendGrid developer account.',
      extendedDescription: 'Like any other input, this can be set globally using .configure().',
      example: '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',
      protect: true,
      whereToGet: {
        url: 'https://app.sendgrid.com/settings/api_keys',
        description: 'Generate an API key in your SendGrid dashbaord.',
        extendedDescription: 'To generate an API key, you will first need to log in to your SendGrid account, or sign up for one if you have not already done so.'
      }
    },

    cc: {
      description: 'The email address of a recipient copied on the email.',
      example: 'sweetpete@example.com',
      isEmail: true,
    },

    ccName: {
      description: 'Full name of the cc recipient.',
      example: 'Peter Lerangis',
    },

    bcc: {
      description: 'The email address of a recipient secretly copied on the email.',
      example: 'jahnna.n.malcolm@example.com',
      isEmail: true,
    },

    bccName: {
      description: 'Full name of the bcc recipient.',
      example: 'Jahnna N. Malcolm',
    },

    replyTo: {
      description: 'The email address for replies to this email.',
      example: 'legal@sailsjs.com',
      isEmail: true,
    },

    attachments: {
      description: 'Attachments to include in the email, with the content encoded as base64.',
      moreInfoUrl: 'https://sendgrid.com/docs/API_Reference/Web_API_v3/Mail/index.html',
      type: [{}],
    },

  },


  exits: {

    success: {
      outputType: 'string',
      outputDescription: 'SendGrid message ID',
      extendedDescription: 'Note that sending the email successfully does not necessarily mean the email was _delivered_ successfully.  If you are having issues with mail being delivered, check the SendGrid dashboard for delivery status, and be sure to verify that the email wasn\'t quarantined or flagged as spam by the recipient\'s email service (e.g. Gmail\'s "spam folder" or GSuite\'s "admin quarantine").'
    }

  },


  fn: async function({to, subject, htmlMessage, from, fromName, secret, toName, cc, ccName, bcc, bccName, replyTo, attachments}) {

    // Import dependencies.
    var _ = require('@sailshq/lodash');
    var Http = require('machinepack-http');

    var personalization = {
      subject: subject,
      to: [
        { email: to, name: toName }
      ],
    };
    if(cc) {
      _.extend(personalization, {
        cc: [{
          email: cc,
          name: ccName ? ccName : undefined,
        }]
      });
    }
    if(bcc) {
      _.extend(personalization, {
        bcc: [{
          email: bcc,
          name: bccName ? bccName : undefined,
        }]
      });
    }

    var data = {
      from: {
        email: from,
        name: fromName
      },
      personalizations: [personalization],
      attachments,
      content: [{
        type: 'text/html',
        value: htmlMessage || ''
      }]
    };
    if(replyTo) {
      _.extend(data, {
        'reply_to': {
          email: replyTo
        }
      });
    }


    var response = await Http.sendHttpRequest.with({
      method: 'POST',
      url: `/mail/send`,
      baseUrl: `https://api.sendgrid.com/v3`,
      body: data,
      enctype: 'application/json',
      headers: {
        'Authorization': `Bearer ${secret}`
      }
    });

    var messageId = response.headers['x-message-id'];
    return messageId;

  }

};
