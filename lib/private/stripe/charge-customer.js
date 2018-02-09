module.exports = {


  friendlyName: 'Charge customer',


  description: 'Create a charge of the specified amount for one of your customers '+
  'in Stripe.',


  extendedDescription:  '',


  // moreInfoUrl: '…'
  // https://stripe.com/docs/api#update_customer
  // https://stripe.com/docs/api/node#retrieve_customer
  // https://stripe.com/docs/api/node#create_customer
  // https://stripe.com/docs/api#cancel_subscription
  // https://stripe.com/docs/api/node#detach_source


  inputs: {

    // stripeCustomerId: {
    //   description: 'The ID of an existing Stripe customer entry to update.',
    //   whereToGet: {
    //     description:
    //     'Look up the Stripe customer ID associated with this user in your database, '+
    //     'or create a new Stripe customer entry and use the resulting ID.  '+
    //     '(If you create a new ID, be sure to save it in your database so you can look '+
    //     'it up again later!)'
    //   },
    //   example: 'cus_BqOHL219wFxKIJ'
    // },

    // token: require('../PARAMETERS').STRIPE_PAYMENT_SOURCE_TOKEN,

    // emailAddress: require('../PARAMETERS').STRIPE_CUSTOMER_EMAIL_ADDRESS,

    // plan: require('../PARAMETERS').STRIPE_PLAN_ID,

    // secret: require('../PARAMETERS').STRIPE_SECRET

  },


  exits: {

    // success: {
    //   outputFriendlyName: 'Stripe customer ID',
    //   outputDescription: 'The ID of the newly-created Stripe customer entry, or the ID of the existing entry that was updated.',
    //   outputType: 'string'
    // }

  },


  fn: async function (inputs, exits) {

    // // Import the official Stripe SDK (`stripe`), and initialize it with the given API secret.
    // var stripe = require('stripe')(inputs.secret);

    // var stripeCustomerId = inputs.stripeCustomerId;
    // if (!stripeCustomerId) {
    //   stripeCustomerId = (await stripe.customers.create({
    //     source: inputs.token === '' ? undefined : inputs.token,// ('' is same as the default here)
    //     plan: inputs.plan === '' ? undefined : inputs.plan,// ('' is same as the default here)
    //     email: inputs.emailAddress
    //   })).id;
    // } else {

    //   // If the provided plan is '', then set any of this customer's subscriptions
    //   // to cancel at the end of the billing period.
    //   if (inputs.plan === '') {
    //     let subscriptions = (await stripe.customers.retrieve(stripeCustomerId)).subscriptions.data;
    //     for (let subscription of subscriptions) {
    //       await stripe.subscriptions.del(subscription.id, {
    //         at_period_end: true// eslint-disable-line camelcase
    //       });
    //     }//∞
    //   }//ﬁ

    //   // If the provided token is '', then detach the default payment source
    //   // before proceeding.
    //   if (inputs.token === '') {
    //     let defaultSourceId = (await stripe.customers.retrieve(stripeCustomerId)).default_source;
    //     if (defaultSourceId) {
    //       await stripe.customers.deleteSource(stripeCustomerId, defaultSourceId);
    //     }//ﬁ
    //   }//ﬁ

    //   // Use the Stripe API to update the customer.
    //   await stripe.customers.update(stripeCustomerId, {
    //     source: inputs.token === '' ? undefined : inputs.token,// ('' is same as the default here)
    //     plan: inputs.plan === '' ? undefined : inputs.plan,// ('' is same as the default here)
    //     email: inputs.emailAddress
    //   });
    // }//ﬁ

    // // Either way, send back the Stripe customer id
    // return exits.success(stripeCustomerId);
  }

};
