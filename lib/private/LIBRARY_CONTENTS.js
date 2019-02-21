/**
 * LIBRARY_CONTENTS
 *
 * @type {Dictionary}
 */

module.exports = {

  // for...
  // Any Occasion
  strings: {
    methodIdts: [
      'ensure-uniq',
      'random',
      'template',
      'to-stream',
      'uuid'
    ]
  },
  flow: {
    description: 'Utilities for asynchronous flow control.',
    methodIdts: [
      'build',
      'dive',
      'for-each',
      'simultaneously',
      'simultaneously-for-each',
      'pause',
      'until'
    ]
  },

  // for...
  // Scripts and NPM Packages
  fs: {
    methodIdts: [
      'cp',
      'ensure-dir',
      'exists',
      'ls',
      'mkdir',
      'mv',
      'read-json',
      'read-stream',
      'read',
      'rmrf',
      'write-json',
      'write-stream',
      'write'
    ]
  },
  http: {
    methodIdts: [
      'del',
      'get',
      'get-stream',
      'patch',
      'post',
      'put',
      'send-http-request'
    ]
  },
  process: {
    methodIdts: [
      'execute-command',
      'kill-child-process'
    ]
  },

  // for...
  // App Servers & Web APIs
  gravatar: {
    description: 'Look up the avatar image associated with a particular email address.',
    methodIdts: [
      'get-avatar-url'
    ]
  },
  passwords: {
    description: 'It\'s password time, and you\'re invited.',
    methodIdts: [
      'check-password',
      'hash-password'
    ]
  },
  mailgun: {
    description: 'Communicate with the Mailgun API to send automated emails.',
    methodIdts: [
      'send-html-email'
    ]
  },
  stripe: {
    description: 'Communicate with the Stripe API to charge credit cards, etc.',
    methodIdts: [
      'save-billing-info',
      'charge-customer'
    ]
  },
};
