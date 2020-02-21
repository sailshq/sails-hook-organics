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

    toName: {
      example: 'Anne M. Martin',
      description: 'Full name of the primary recipient.',
    },

    bcc: {
      description: 'A list of email addresses of recipients secretly copied on the email.',
      example: ['jahnna.n.malcolm@example.com'],
      defaultsTo: [],
    },

    attachments: {
      description: 'Attachments to include in the email, with the file content encoded as base64.',
      moreInfoUrl: 'https://sendgrid.com/docs/API_Reference/Web_API_v3/Mail/index.html',
      whereToGet: {
        url: 'https://npmjs.com/package/sails-hook-uploads',
        description: 'If you have `sails-hook-uploads` installed, you can use `sails.reservoir` to get an attachment into the expected format.',
      },
      example: [
        {
          contentBytes: 'iVBORw0KGgoAA…',
          name: 'sails.png',
          type: 'image/png',
        }
      ],
      defaultsTo: [],
    },

  },


  exits: {

    success: {
      outputType: 'string',
      outputDescription: 'SendGrid message ID',
      extendedDescription: 'Note that sending the email successfully does not necessarily mean the email was _delivered_ successfully.  If you are having issues with mail being delivered, check the SendGrid dashboard for delivery status, and be sure to verify that the email wasn\'t quarantined or flagged as spam by the recipient\'s email service (e.g. Gmail\'s "spam folder" or GSuite\'s "admin quarantine").'
    }

  },


  fn: async function({to, subject, htmlMessage, from, fromName, secret, toName, bcc, attachments}) {

    // Import dependencies.
    var _ = require('@sailshq/lodash');
    var Http = require('machinepack-http');

    var personalization = {
      subject: subject,
      to: [
        { email: to, name: toName }
      ],
    };
    if(bcc.length > 0) {
      _.extend(personalization, {
        bcc: bcc.map((emailAddress)=>{
          return {email: emailAddress};
        })
      });
    }

    var formattedAttachments;
    if(attachments.length > 0) {
      formattedAttachments = attachments.map((attachmentData)=>{
        return {
          content: attachmentData.contentBytes,
          filename: attachmentData.name,
          type: attachmentData.type,
        };
      });
    }

    var data = {
      from: {
        email: from,
        name: fromName
      },
      personalizations: [personalization],
      attachments: formattedAttachments,
      content: [{
        type: 'text/html',
        value: htmlMessage
      }]
    };


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
