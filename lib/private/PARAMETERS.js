/**
 * Common input definitions (i.e. parameter definitions) that are shared by multiple files.
 *
 * @type {Dictionary}
 * @constant
 */

module.exports = {

  STRIPE_SECRET: {
    type: 'string',
    required: true,
    friendlyName: 'Secret',
    description: 'A valid Stripe "Secret Key" (aka "secret API key", or "API secret").',
    extendedDescription: 'Like any other input, this can be set globally using .configure().',
    example: 'sk_2a0bf82118374f38e13f',
    protect: true,
    whereToGet: {
      url: 'https://dashboard.stripe.com/account/apikeys',
      description: 'Copy either "Test Secret Key" or "Live Secret Key" from your Stripe dashboard.',
      extendedDescription: 'Make sure you are logged in to your Stripe account, or create an account if you have not already done so.'
    },
  },

  MAILGUN_SECRET: {
    type: 'string'
    required: true,
    friendlyName: 'Secret',
    description: 'The secret API key from a valid Mailgun developer account.',
    extendedDescription: 'Like any other input, this can be set globally using .configure().',
    example: 'key-3432afa32e9401482aba183c13f3',
    protect: true,
    whereToGet: {
      url: 'https://mailgun.com/cp',
      description: 'Copy the "API Key" in your Mailgun dashboard.',
      extendedDescription: 'To retrieve your API key, you will first need to log in to your Mailgun account, or sign up for one if you have not already done so.'
    }
  },

  MAILGUN_DOMAIN: {
    type: 'string',
    required: true,
    friendlyName: 'Mailgun domain',
    description: 'The Mailgun domain to use for sending emails.',
    extendedDescription: 'Like any other input, this can be set globally using .configure().',
    example: 'sandbox5f89931913a9ab31130131350101.mailgun.og',
    whereToGet: {
      url: 'https://mailgun.com/cp',
      description: 'Copy a domain from either "Mailgun Subdomains" or "Custom Domains" in your Mailgun dashboard.',
      extendedDescription: 'You will first need to log in to your Mailgun account, or sign up for one if you have not already done so.'
    }
  }

};
