module.exports = {


  friendlyName: 'Create customer',


  description: 'Create a new customer in Stripe.',


  inputs: {

    apiKey: require('../PARAMETERS').STRIPE_SECRET,

    email: {
      description: 'An email address to associate with the customer.',
      type: 'string',
      example: 'john.doe@somebody.com'
    },

    description: {
      description: 'Arbitrary string to attach to the customer in Stripe.',
      type: 'string',
      example: 'sdjasnd928u8duasd'
    },

    source: {
      type: 'string',
      example: 'tok_18epPlAE8iIXJx4mLWRYLRj6',
      description: 'A token used to set the new customer\'s default charging source.',
      whereToGet: {
        url: 'https://stripe.com/docs/stripe.js',
        description: 'Use stripe.js to create a source token.'
      }
    },

    plan: {
      description: 'The identifier of a plan to subscribe the customer to.',
      example: 'pro'
    },

    metadata: {
      description: 'Arbitrary metadata to attach to the new customer.',
      example: {}
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'New Stripe customer',
      outputDescription: 'Details of the newly-created Stripe customer, including payment sources and subscriptions.',
      outputType: {/*…Stripe "customer"*/},
      outputExample: require('../EXAMPLES').STRIPE_CUSTOMER
    }

  },


  fn: function (inputs, exits) {

    // Import `stripe`, and initialize it with the given API key.
    // (Or fall back to the cached API key, if available)
    var stripe = require('stripe')(inputs.apiKey);

    // Declare a var to hold options for the API call.
    var options = {};

    // Add the `email` option if provided.
    if (inputs.email) {
      options.email = inputs.email;
    }

    // Add the `description` option if provided.
    if (inputs.description) {
      options.description = inputs.description;
    }

    // Add the `plan` option if provided.
    if (inputs.plan) {
      options.plan = inputs.plan;
    }

    // Add the `source` option if provided.
    if (inputs.source) {
      options.source = inputs.source;
    }

    // Add the `metadata` option if provided.
    if (inputs.metadata) {
      options.metadata = inputs.metadata;
    }

    // Use the Stripe API to create the new customer.
    stripe.customers.create(options, function(err, customer) {
      if (err) {
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        // FUTURE: handle more specific exits (i.e. rate limit, customer does not
        // exist, etc.), possibly via a separate `negotiateError` machine.
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        return exits.error(err);
      }//•

      // Send the new customer object through the `success` exit.
      return exits.success(customer);

    });//_∏_
  }

};
