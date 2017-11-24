module.exports = {


  friendlyName: 'Update customer',


  description: 'Update a customer\'s details.',


  sideEffects: 'idempotent',


  inputs: {

    apiKey: require('../PARAMETERS').STRIPE_SECRET,

    customer: {
      description: 'The ID of an existing customer to update.',
      example: 'cus_4kmLwU2PvQBeqq',
      required: true
    },

    email: {
      description: 'An email address to associate with the customer.',
      example: 'john.doe@somebody.com'
    },

    description: {
      description: 'Arbitrary string to attach to the customer.',
      example: 'sdjasnd928u8duasd'
    },

    source: {
      friendlyName: 'Default source',
      description: 'A token used to set the new customer\'s default card.',
      whereToGet: {
        url: 'https://stripe.com/docs/stripe.js',
        description: 'Use stripe.js to create a card token.'
      },
      example: 'tok_18epPlAE8iIXJx4mLWRYLRj6'
    },

    metadata: {
      description: 'Metadata to attach to the customer.',
      example: {}
    }

  },


  exits: {

    success: {

      outputFriendlyName: 'Updated Stripe customer',
      outputDescription: 'Details of the newly-updated Stripe customer.',
      outputExample: require('../TYPES').STRIPE_CUSTOMER
    }
  },


  fn: function (inputs, exits) {

    // Import `stripe`, and initialize it with the given API key.
    // (Or fall back to the cached API key, if available)
    var stripe = require('stripe')(inputs.apiKey);

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
