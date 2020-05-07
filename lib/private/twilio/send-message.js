module.exports = {


  friendlyName: 'Send message',


  description: 'Send a message using the Twilio SMS API',


  moreInfoUrl: 'https://www.twilio.com/docs/sms',


  inputs: {

    accountSid: {
      example: 'DZe5eafd3c69b1e74example5852c04a9102',
      description: 'The "account sid" associated with your Twilio account.',
      whereToGet: {
        url: 'https://www.twilio.com/console',
      },
      required: true
    },

    authToken: {
      example: 'Dafd4example5852c3c69bZe5e1e704a9102',
      description: 'The "auth token" associated with your Twilio account.',
      whereToGet: {
        url: 'https://www.twilio.com/console',
      },
      required: true
    },

    from: {
      example: '+16155551234',
      description: 'The \'From\' phone number you\'d like to use to send the SMS.',
      extendedDescription: 'This phone number is assigned to you by Twilio. If omitted, the first available number will be used.',
      required: true
    },

    to: {
      example: '+16155556789',
      description: 'The \'To\' phone number the message is sending to.',
      required: true
    },

    message: {
      example: 'Hey there friend!',
      description: 'The body of the message being sent',
      extendedDescription: 'Optional if a `mediaUrl` is specified.'
    },

    mediaUrl: {
      example: 'https://sailsjs.com/logo.png',
      description: 'The URL of a gif, png, or jpeg image.',
      extendedDescription: 'An alternative to `message`.'
    },

  },


  exits: {

    success: {
      outputType: 'string',
      outputDescription: 'Twilio message ID',
      extendedDescription: 'Note that sending the message does not necessarily mean the message was _delivered_ successfully.'
    }

  },


  fn: async function ({accountSid, authToken, from, to, message, mediaUrl}) {

    var Http = require('machinepack-http');

    // Either message or mediaUrl (or both) must be present
    if (!message && !mediaUrl) {
      throw new Error('Either a `message` or `mediaUrl` (or both) must be specified.');
    }

    // Encode our credentials.
    var credentials = Buffer.from(`${accountSid}:${authToken}`).toString('base64');

    var response = await Http.sendHttpRequest.with({
      method: 'POST',
      url: `Accounts/${accountSid}/Messages.json`,
      baseUrl: `https://api.twilio.com/2010-04-01`,
      body: {
        'From': from,
        'To': to,
        'Body': message,
        'MediaUrl': mediaUrl
      },
      enctype: 'application/x-www-form-urlencoded',
      headers: {
        'Authorization': `Basic ${credentials}`
      }
    });

    var responseBody = JSON.parse(response.body);
    return responseBody.sid;

  }

};
