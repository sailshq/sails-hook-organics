module.exports = {


  friendlyName: 'Delete source',


  description: 'Delete a customer\'s default payment source.',


  moreInfoUrl: 'https://stripe.com/docs/api#delete_card',


  sideEffects: 'idempotent',


  inputs: {

    apiKey: require('../PARAMETERS').STRIPE_SECRET,

    customer: {
      description: 'The ID of an existing customer whose card is being deleted.',
      example: 'cus_4kmLwU2PvQBeqq',
      required: true
    },

    source: {
      description: 'The Stripe ID of the source to delete.',
      example: 'card_14t5VD2eZvKYlo2CbhcljD3Y',
      required: true
    }

  },


  exits: {

    success: {
      description: 'The payment source has been deleted successfully.'
    }

  },


  fn: function (inputs, exits) {

    // Import `stripe`, and initialize it with the given API key.
    // (Or fall back to the cached API key, if available)
    var stripe = require('stripe')(inputs.apiKey);

    // Use the Stripe API to delete the source.
    stripe.customers.deleteCard(inputs.customer, inputs.source, function(err) {
      if (err) {
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        // FUTURE: handle more specific exits (i.e. rate limit, customer does not
        // exist, etc.), possibly via a separate `negotiateError` machine.
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        return exits.error(err);
      }//•

      // Return through the `success` exit.
      return exits.success();
    });//_∏_
  }

};
