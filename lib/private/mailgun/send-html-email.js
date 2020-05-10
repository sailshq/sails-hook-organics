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

    secret: {
      type: 'string',
      required: true,
      friendlyName: 'Secret',
      description: 'The secret API key from a valid Mailgun developer account.',
      extendedDescription: 'Like any other input, this can be set globally using .configure().',
      example: 'key-3432afa32e9401482aba183c13f3',
      protect: true,
      whereToGet: {
        url: 'https://app.mailgun.com',
        description: 'Copy the "API Key" in your Mailgun dashboard.',
        extendedDescription: 'To retrieve your API key, you will first need to log in to your Mailgun account, or sign up for one if you have not already done so.'
      }
    },

    domain: {
      type: 'string',
      required: true,
      friendlyName: 'Mailgun domain',
      description: 'The Mailgun domain to use for sending emails.',
      extendedDescription: 'Like any other input, this can be set globally using .configure().',
      example: 'sandbox5f89931913a9ab31130131350101.mailgun.og',
      whereToGet: {
        url: 'https://app.mailgun.com',
        description: 'Copy a domain from either "Mailgun Subdomains" or "Custom Domains" in your Mailgun dashboard.',
        extendedDescription: 'You will first need to log in to your Mailgun account, or sign up for one if you have not already done so.'
      }
    },

    host: {
      type: 'string',
      required: false,
      friendlyName: 'Mailgun host',
      description: 'An override to the default Mailgun host to use for sending emails.',
      extendedDescription: 'Like any other input, this can be set globally using .configure(). If this is not set, this will use the default host as determined by Mailgun.',
      example: 'api.mailgun.net',
      whereToGet: {
        url: 'https://documentation.mailgun.com',
        description: 'Find the correct Mailgun host for your needs. EU-based accounts need to specify "api.eu.mailgun.net", while other accounts won\'t necessarily need to set this.',
        extendedDescription: 'You will first need to log in to your Mailgun account, or sign up for one if you have not already done so.'
      }
    },

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
