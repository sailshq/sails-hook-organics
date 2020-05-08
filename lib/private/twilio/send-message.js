module.exports = {

  friendlyName: 'Send text message',


  description: 'Send a message using the Twilio SMS API.',


  moreInfoUrl: 'https://www.twilio.com/docs/sms',


  inputs: {

    accountSid: {
      type: 'string',
      example: 'DZe5eafd3c69b1e74example5852c04a9102',
      description: 'The "account SID" associated with your Twilio account.',
      whereToGet: {
        url: 'https://www.twilio.com/console',
      },
      required: true
    },

    secret: {
      type: 'string',
      example: 'Dafd4example5852c3c69bZe5e1e704a9102',
      description: 'The "auth token" associated with your Twilio account.',
      whereToGet: {
        url: 'https://www.twilio.com/console',
      },
      required: true
    },

    from: {
      type: 'string',
      example: '+16155551234',
      description: 'The Twilio phone number the SMS will be sent from.',
      extendedDescription: 'Must be a phone number associated with your Twilio account, in E.164 format, which consists of a + followed by the country code and subscriber number.',
      whereToGet: {
        url: 'https://www.twilio.com/console',
      },
      required: true
    },

    to: {
      type: 'string',
      example: '+16155556789',
      description: 'The recipient\'s phone number.',
      extendedDescription: 'In E.164 format, which consists of a + followed by the country code and subscriber number. (If using a trial Twilio account, must be a verified phone number.)',
      whereToGet: {
        url: 'https://www.twilio.com/docs/glossary/what-e164',
      },
      required: true
    },

    message: {
      type: 'string',
      example: 'Hey there friend!',
      description: 'The body of the message being sent',
      extendedDescription: 'Optional if a `mediaUrl` is specified.'
    },

    mediaUrl: {
      type: 'string',
      example: 'https://sailsjs.com/logo.png',
      description: 'The URL of a gif, png, or jpeg image to be included in the message.',
      extendedDescription: 'This is only supported in the US and Canada. If no `message` is provided, `mediaUrl` is required.',
    },

  },


  exits: {

    success: {
      outputType: 'string',
      outputDescription: 'Twilio message ID ("SID")',
      extendedDescription: 'Note that Twilio receiving the message does not necessarily mean the message was _delivered_ successfully to the recipient.'
    }

  },


  fn: async function ({accountSid, secret, from, to, message, mediaUrl}) {

    var Http = require('machinepack-http');

    // Either message or mediaUrl (or both) must be present
    if (!message && !mediaUrl) {
      throw new Error('A `message` or `mediaUrl` (or both) must be specified.');
    }

    var response = await Http.sendHttpRequest.with({
      method: 'POST',
      url: `/Accounts/${encodeURIComponent(accountSid)}/Messages.json`,
      baseUrl: `https://api.twilio.com/2010-04-01`,
      body: {
        From: from,
        To: to,
        Body: message,
        MediaUrl: mediaUrl
      },
      enctype: 'application/x-www-form-urlencoded',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${accountSid}:${secret}`).toString('base64')}`
      }
    });

    var responseBody = JSON.parse(response.body);
    return responseBody.sid;

  }

};
