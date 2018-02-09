module.exports = {


  friendlyName: 'Charge customer',


  description: 'Create a charge of the specified amount against the saved default '+
  'payment source of one of your customers in Stripe.',


  extendedDescription:
`If you would like to make an ad hoc charge against a payment source that is not
saved under a customer entry in Stripe, use saveBillingInfo() to save it first,
then call chargeCustomer().`,


  moreInfoUrl: 'https://stripe.com/docs/api/node#create_charge',


  inputs: {

    stripeCustomerId: {...require('../PARAMETERS').STRIPE_CUSTOMER_ID,
      description: 'The ID of the Stripe customer to charge.',
      extendedDescription: 'Must have a saved default payment source.',
      required: true
    },

    amount: {
      description: 'The amount of currency to charge, expressed in the smallest currency unit.',
      extendedDescription: 'For example, if this amount is in USD, then express this amount in cents (¢).',
      moreInfoUrl: 'https://stripe.com/docs/currencies#zero-decimal',
      isInteger: true,
      min: 1,
      max: 99999999
    },

    currency: {
      description: 'The currency for this charge.',
      extendedDescription: 'Use the 3-letter ISO code for the currency.',
      moreInfoUrl: 'https://stripe.com/docs/currencies#presentment-currencies',
      defaultsTo: 'usd'
    },

    chargeDescription: {
      description: 'The '
    },

    secret: require('../PARAMETERS').STRIPE_SECRET

  },


  exits: {

    success: {
      description: 'The charge was successfully created and captured.'
    }

    // noSuchCustomer: {
    //   description: 'No customer with that ID exists in Stripe.',
    // },// ^^FUTURE: maybe actually use this exit

    // noPaymentSource: {
    //   description: 'Customer has no default saved payment source.'
    // },// ^^FUTURE: maybe actually use this exit

    // cannotChargePaymentSource: {
    //   description: 'Failed to charge the saved default payment source.'
    // },// ^^FUTURE: maybe actually use this exit

  },


  fn: async function ({stripeCustomerId, amount, currency, chargeDescription, secret}, exits) {

    // Import the official Stripe SDK (`stripe`), and initialize it with the given API secret.
    var stripe = require('stripe')(secret);

    // Tolerate upper-cased ISO currency code.
    currency = currency.toLowerCase();

    // Use the Stripe API to charge the card.
    var charge = await stripe.charges.create({
      amount,
      currency,
      customer: stripeCustomerId,
      description: chargeDescription
    });

    console.log(charge);//todo: remove

    return exits.success();

  }

};
