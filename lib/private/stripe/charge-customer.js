module.exports = {


  friendlyName: 'Charge customer',


  description: 'Create and capture a charge for the specified amount using '+
  'the saved default payment source of one of your customers in Stripe.',


  extendedDescription:
`If you would like to make an ad hoc charge against a payment source that is not
saved under a customer entry in Stripe, use saveBillingInfo() to save it first,
then call chargeCustomer().`,


  moreInfoUrl: 'https://stripe.com/docs/api/node#create_charge',


  inputs: {

    stripeCustomerId: Object.assign({}, require('../PARAMETERS').STRIPE_CUSTOMER_ID, {
      description: 'The ID of the Stripe customer to charge.',
      extendedDescription: 'This customer must have a saved default payment source in Stripe.',
      required: true
    }),

    amount: {
      description: 'The amount of currency to charge, expressed in the smallest currency unit.',
      extendedDescription: 'For example, if this amount is in USD, then express this amount in cents (¢).',
      moreInfoUrl: 'https://stripe.com/docs/currencies#zero-decimal',
      isInteger: true,
      min: 1,
      max: 99999999,
      required: true
    },

    chargeDescription: {
      description: 'Arbitrary text to include in automatic email receipts (if in use), '+
      'and to display in the Stripe web interface alongside this charge.',
      moreInfoUrl: 'https://stripe.com/docs/api/node#create_charge-description',
      type: 'string'
    },

    statementDescriptor: {
      description: 'An arbitrary string to be displayed on your customer\'s credit card statement.',
      moreInfoUrl: 'https://stripe.com/docs/api/node#create_charge-statement_descriptor',
      type: 'string',
      regex: /^[\x00-\x21\x23-\x26\x28\x3B\x3D\x3F-\x60\x7B\x7F]*[A-Z][\x00-\x21\x23-\x26\x28\x3B\x3D\x3F-\x60\x7B\x7F]*$/,
      maxLength: 22
    },

    currency: {
      description: 'The currency for this charge.',
      extendedDescription: 'Use the 3-letter ISO code for the currency.',
      moreInfoUrl: 'https://stripe.com/docs/currencies#presentment-currencies',
      type: 'string',
      defaultsTo: 'usd'
    },

    secret: require('../PARAMETERS').STRIPE_SECRET

  },


  exits: {

    success: {
      description: 'The charge was successfully created and captured.',
      outputDescription: 'The Stripe charge ID (e.g. for use in handling future "on refund" webhook messages).',
      outputExample: 'ch_1BzsLq2eZvKYlo2C2s3COIpP',
      moreInfoUrl: 'https://stripe.com/docs/api#charge_object-id'
    },

    couldNotCharge: {
      description: 'The provided card could not be charged.',
      extendedDescription: 'This indicates that a Stripe card error (type: "card_error") was encountered.',
      moreInfoUrl: 'https://stripe.com/docs/api#errors',
      outputFriendlyName: 'Stripe card error report',
      outputType: {
        code: 'string',
        message: 'string'
      }
    }

  },


  fn: async function ({stripeCustomerId, amount, chargeDescription, statementDescriptor, currency, secret}, exits) {

    // Import the official Stripe SDK (`stripe`), and initialize it with the given API secret.
    var stripe = require('stripe')(secret);

    // Tolerate upper-cased ISO currency code.
    currency = currency.toLowerCase();

    // Use the Stripe API to charge the card.
    var charge;
    try {
      charge = await stripe.charges.create({
        amount,
        currency,
        customer: stripeCustomerId,
        description: chargeDescription,
        statement_descriptor: statementDescriptor// eslint-disable-line camelcase
      });
    } catch (err) {
      switch (err.type) {
        case 'StripeCardError': throw {couldNotCharge:{code: err.code, message: err.message}};
        default: throw err;
      }
    }

    return exits.success(charge.id);

  }

};
