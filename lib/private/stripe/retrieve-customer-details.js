module.exports = {


  friendlyName: 'Get Stripe customer',


  description: 'Retrieve details from Stripe about the customer entry with the specified id.',


  extendedDescription: 'Retrieves the details of an existing customer. You need only supply the unique customer identifier that was returned upon customer creation.',


  sideEffects: 'cacheable',


  inputs: {

    customer: {
      description: 'The identifier of the customer to be retrieved.',
      type: 'string',
      example: 'cus_4kmLwU2PvQBeqq',
      required: true
    },

    apiKey: require('../PARAMETERS').STRIPE_SECRET,

  },


  exits: {

    success: {
      outputFriendlyName: 'Stripe customer details',
      outputDescription: 'The details of a Stripe customer, including payment sources and subscriptions.',
      outputType: {/*…Stripe "customer"*/},
      outputExample: require('../EXAMPLES').STRIPE_CUSTOMER
    },

    notFound: {
      description: 'No Stripe customer could be found with the specified ID.'
    }

  },


  fn: function (inputs, exits) {

    // Import `stripe`, and initialize it with the given API key.
    // (Or fall back to the cached API key, if available)
    var stripe = require('stripe')(inputs.apiKey);

    // Use the Stripe API to retrieve the customer's details.
    stripe.customers.retrieve(inputs.customer, function(err, customerDetails) {
      // If we got a 404, return through the `notFound` exit.
      if (err && err.statusCode === 404) {
        return exits.notFound();
      } else if (err) {
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        // FUTURE: handle more specific exits (i.e. rate limit, customer does not
        // exist, etc.), possibly via a separate `negotiateError` machine.
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        return exits.error(err);
      }//•

      // Return the customer details through the `success` exit.
      return exits.success(customerDetails);
    });//_∏_
  }

};
