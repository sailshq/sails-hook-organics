module.exports = {


  // TODO: probably merge delete-source into here to match conventions in caviar
  // (and also potentially use https://stripe.com/docs/api#detach_source to retain
  // references to old sources rather than "delete card")
  friendlyName: 'Update Stripe customer',


  description: 'Update a customer\'s details in Stripe.',


  extendedDescription:
  'This allows you to update a customer\'s billing information, including (1) their '+
  'billing email address (for any automated receipts), (2) other metadata (for display '+
  'purposes in the Stripe dashboard) and above all, (3) the payment source ID -- '+
  'the representation of the customer\'s credit card number, expiration date, CCV, etc.)\n'+
  '\n'+
  'This is primarily useful when building a controller action that allows a user '+
  'to change their own payment source, but it also comes in handy any other time '+
  'a user\'s details might actually change in the database (such as during the last '+
  'step in most conventional "Change and re-verify your email address" flows).\n'+
  '\n'+
  'This method may also come in handy for integrating with any other Stripe-related '+
  'automation your team might be using.  But remember: it\'s always a good idea to '+
  'talk with stakeholders and other people working on your code base to understand '+
  '_exactly_ what actually needs to be synchronized with any 3rd party API.  It\'s '+
  'all too easy to get absorbed and burn a lot of hours on API integrations that '+
  'aren\'t actually necessary (particularly with a platform as feature-rich as Stripe!)',


  moreInfoUrl: 'https://stripe.com/docs/api#update_customer',


  sideEffects: 'idempotent',


  inputs: {

    customer: {
      description: 'The ID of an existing customer to update.',
      example: 'cus_4kmLwU2PvQBeqq',
      required: true
    },

    email: {
      description: 'An email address to associate with the customer.',
      example: 'john.doe@somebody.com'
    },

    source: {
      friendlyName: 'Default source',
      description: 'A token used to set the new customer\'s default card.',
      whereToGet: {
        url: 'https://stripe.com/docs/stripe.js',
        description: 'Use stripe.js in your client-side code to create a card token.'
      },
      example: 'tok_18epPlAE8iIXJx4mLWRYLRj6'
    },

    description: {
      description: 'Arbitrary string to attach to the customer.',
      example: 'sdjasnd928u8duasd'
    },

    metadata: {
      description: 'Metadata to attach to the customer.',
      example: {}
    },

    secret: require('../PARAMETERS').STRIPE_SECRET

  },


  exits: {

    success: {

      outputFriendlyName: 'Updated Stripe customer',
      outputDescription: 'Details of the newly-updated Stripe customer.',
      outputExample: require('../TYPES').STRIPE_CUSTOMER
    }
  },


  fn: function (inputs, exits) {

    // Import the official Stripe SDK (`stripe`), and initialize it with the given API secret.
    var stripe = require('stripe')(inputs.secret);

    // Get the base options.
    var options = {
      description: inputs.description
    };

    // Add the `email` option if provided.
    if (inputs.email) {
      options.email = inputs.email;
    }

    // Add the `source` option if provided.
    if (inputs.source) {
      options.source = inputs.source;
    }

    // Add the `metadata` option if provided.
    if (inputs.metadata) {
      options.metadata = inputs.metadata;
    }

    // Use the Stripe API to update the customer.
    stripe.customers.update(inputs.customer, options, function(err, customer) {
      if (err) {
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        // FUTURE: handle more specific exits (i.e. rate limit, customer does not
        // exist, etc.), possibly via a separate `negotiateError` machine.
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        return exits.error(err);
      }//•

      // Send information about the updated customer through the `success` exit.
      return exits.success(customer);
    });//_∏_
  }

};
