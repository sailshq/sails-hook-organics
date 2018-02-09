/**
 * Common input definitions (i.e. parameter definitions) that are shared by multiple files.
 *
 * @type {Dictionary}
 * @constant
 */

module.exports = {

  //  ███████╗████████╗██████╗ ██╗██████╗ ███████╗
  //  ██╔════╝╚══██╔══╝██╔══██╗██║██╔══██╗██╔════╝██╗
  //  ███████╗   ██║   ██████╔╝██║██████╔╝█████╗  ╚═╝
  //  ╚════██║   ██║   ██╔══██╗██║██╔═══╝ ██╔══╝  ██╗
  //  ███████║   ██║   ██║  ██║██║██║     ███████╗╚═╝
  //  ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝     ╚══════╝
  //
  STRIPE_SECRET: {
    type: 'string',
    required: true,
    friendlyName: 'Secret',
    description: 'A valid Stripe "Secret key" (aka "secret API key", or "API secret").',
    extendedDescription: 'Like any other input, this can be set globally using .configure().',
    example: 'sk_2a0bf82118374f38e13f',
    protect: true,
    whereToGet: {
      url: 'https://dashboard.stripe.com/account/apikeys',
      description: 'Copy a "Secret key" from your Stripe dashboard.',
      extendedDescription: 'Make sure you are logged in to your Stripe account, or create an account if you have not already done so.'
    },
  },

  STRIPE_PAYMENT_SOURCE_TOKEN: {
    friendlyName: 'Payment source token',
    description: 'A one-time-use and ephemeral (temporary + short-lived) token string '+
    'representing a new payment source (credit card), or empty string (\'\') to detach '+
    'the existing default payment source (existing customers only).',
    extendedDescription:
    'Tokens should never be stored in your database (they\'ll just expire in a matter of minutes!)  '+
    'Instead, to keep a payment source on file, just create a Stripe customer entry '+
    'and store the Stripe customer ID from that.  (This also has the advantage of allowing you'+
    'to optionally take advantage of Stripe\'s built-in support for subscriptions, plans, and '+
    'recurring billing-- features that would present a major distraction if your team had to '+
    'implement them in-house.)\n'+
    '\n'+
    'For many apps, each of the customer entries in Stripe has only one payment source '+
    '(e.g. credit card).  This is called a Stripe customer\'s **default payment source**, '+
    'and it\'s probably all that you need.\n'+
    '\n'+
    'However, more rarely, for apps that support multiple payment sources per user '+
    'account (e.g. storing multiple credit cards on file), it is sometimes necessary '+
    'to deal with multiple payment sources per Stripe customer.  The good news is that '+
    'Stripe makes this relatively simple to do.  But since it creates more unavoidable '+
    'complexity, support for multiple payment sources is not bundled as part of this '+
    'library.  If you need a higher degree of flexibility, we recommend you `require(\'stripe\')` '+
    'and work with the underlying Stripe Node.js SDK directly.  (Feel free to mix and '+
    'match calls to the higher-level methods in this library with more-custom calls '+
    'the `stripe` package.)',
    moreInfoUrl: 'https://stripe.com/docs/api#tokens',
    whereToGet: {
      url: 'https://stripe.com/docs/stripe.js',
      description:
      'Use Stripe Checkout, Stripe Elements, or Stripe\'s official iOS/Android mobile '+
      'libraries to create a secure pay token from your client-side code.',
      extendedDescription:
      'This ensures that no sensitive card data touches your server and allows your '+
      'integration to operate in a PCI compliant way.\n'+
      '\n'+
      'To quickly obtain a fake payment source token just for testing purposes, check out:\n'+
      'https://stripe.com/docs/testing#cards'
    },
    example: 'tok_18epPlAE8iIXJx4mLWRYLRj6'
  },

  STRIPE_CUSTOMER_ID: {
    friendlyName: 'Stripe customer ID',
    description: 'The ID of an existing Stripe customer entry in Stripe.',
    whereToGet: {
      description:
      'Look up the Stripe customer ID associated with this user in your database, '+
      'or create a new Stripe customer entry and use the resulting ID.  '+
      '(If you create a new ID, be sure to save it in your database so you can look '+
      'it up again later!)'
    },
    example: 'cus_BqOHL219wFxKIJ'
  },

  STRIPE_CUSTOMER_EMAIL_ADDRESS: {
    friendlyName: 'Customer email address',
    description: 'A billing email address to associate with this person\'s Stripe customer entry, '+
    'allowing Stripe to send them important automated messages.',
    extendedDescription:
    'Depending on your settings, Stripe may use this email to send your users payment receipts, '+
    'refund confirmations, and notifications about failed payment attempts.  Plus, in addition '+
    'to its more practical uses, this email address will be displayed alongside its customer '+
    'entry in the Stripe dashboard-- so it\'s helpful if it\'s kept correct and up to date.\n'+
    '\n'+
    'Finally, if a customer email address is provided, it is even used to enable additional '+
    'features in the Stripe dashboard.  For example, it helps [streamline and standardize how '+
    'your team responds](https://stripe.com/docs/disputes#responding-to-a-dispute) to your '+
    'customers about fulfillment complaints, chargeback disputes, and fraud accusations.\n'+
    '\n'+
    'Set to empty string (\'\') to clear this customer entry\'s stored email address.',
    moreInfoUrl: 'https://stripe.com/docs/dashboard/receipts',
    example: 'john.doe@example.com'
  },

  STRIPE_PLAN_ID: {
    description: 'The ID of one of your recurring billing subscription plans, or empty '+
    'string (\'\') to unsubscribe (existing customers only.)',
    example: 'pro',
    whereToGet: {
      url: 'https://dashboard.stripe.com/plans',
      description: 'Come up with a computer-friendly ID string for your plan, then create '+
      'a new "plan" in the Stripe dashboard and type that ID in.'
    }
  },

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // FUTURE: Maybe bring these back eventually:
  // ```
  // STRIPE_CUSTOMER_DESCRIPTION: {
  //   type: 'string',
  //   description: 'Arbitrary string to attach to the customer entry in Stripe.',
  //   extendedDescription: 'This will be shown prominently in the Stripe dashboard.',
  //   example: 'John Doe (signed up after visiting our Black Friday 2021 promotional landing page)'
  // },
  // STRIPE_CUSTOMER_METADATA: {
  //   type: {},
  //   description: 'Additional arbitrary metadata to attach to the customer entry in Stripe.'
  // },
  // ```
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  //  ███╗   ███╗ █████╗ ██╗██╗      ██████╗ ██╗   ██╗███╗   ██╗
  //  ████╗ ████║██╔══██╗██║██║     ██╔════╝ ██║   ██║████╗  ██║██╗
  //  ██╔████╔██║███████║██║██║     ██║  ███╗██║   ██║██╔██╗ ██║╚═╝
  //  ██║╚██╔╝██║██╔══██║██║██║     ██║   ██║██║   ██║██║╚██╗██║██╗
  //  ██║ ╚═╝ ██║██║  ██║██║███████╗╚██████╔╝╚██████╔╝██║ ╚████║╚═╝
  //  ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝
  //
  MAILGUN_SECRET: {
    type: 'string',
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
