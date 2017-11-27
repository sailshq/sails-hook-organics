module.exports = {


  // TODO: probably delete this (see update-customer)
  friendlyName: 'Delete Stripe payment source',


  description: 'Delete a Stripe customer\'s saved payment source (for example, details for a particular credit card.)',


  moreInfoUrl: 'https://stripe.com/docs/api#delete_card',


  sideEffects: 'idempotent',


  inputs: {

    customer: {
      description: 'The ID of the Stripe customer entry this payment source belongs to.',
      example: 'cus_4kmLwU2PvQBeqq',
      required: true
    },

    source: {
      description: 'The ID of the Stripe payment source to delete.',
      example: 'card_14t5VD2eZvKYlo2CbhcljD3Y',
      required: true// TODO: maybe this should be optional (i.e. use default)
    },

    secret: require('../PARAMETERS').STRIPE_SECRET,

  },


  exits: {

    success: {
      description: 'The payment source has been successfully deleted in Stripe.'
    }

  },


  fn: function (inputs, exits) {

    // Import the official Stripe SDK (`stripe`), and initialize it with the given API secret.
    var stripe = require('stripe')(inputs.secret);

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
