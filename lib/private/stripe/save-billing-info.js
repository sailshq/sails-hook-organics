module.exports = {


  friendlyName: 'Save billing info',


  description: 'Save the latest billing details in Stripe for a new or existing customer, '+
  'including their default payment source, subscriptions, and their email address for '+
  'receiving receipts.',


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


  // moreInfoUrl: '…'
  // https://stripe.com/docs/api#update_customer
  // https://stripe.com/docs/api/node#retrieve_customer
  // https://stripe.com/docs/api/node#create_customer
  // https://stripe.com/docs/api#cancel_subscription
  // https://stripe.com/docs/api/node#detach_source


  sideEffects: 'idempotent',


  inputs: {

    stripeCustomerId: Object.assign({}, require('../PARAMETERS').STRIPE_CUSTOMER_ID, {
      description: 'The ID of an existing Stripe customer entry to update.  '+
      '(Or leave this unspecified to create a new customer entry in Stripe.)',
    }),

    token: require('../PARAMETERS').STRIPE_PAYMENT_SOURCE_TOKEN,

    emailAddress: require('../PARAMETERS').STRIPE_CUSTOMER_EMAIL_ADDRESS,

    plan: require('../PARAMETERS').STRIPE_PLAN_ID,

    secret: require('../PARAMETERS').STRIPE_SECRET

  },


  exits: {

    success: {
      outputFriendlyName: 'Stripe customer ID',
      outputDescription: 'The ID of the newly-created Stripe customer entry, or the ID of the existing entry that was updated.',
      outputType: 'string'
    },

    // FUTURE: couldNotSaveBillingInfo: {…} and:
    // ```
    // .intercept({type: 'StripeCardError'}, 'couldNotSaveBillingInfo');
    // ```

  },


  fn: async function (inputs, exits) {

    // Import the official Stripe SDK (`stripe`), and initialize it with the given API secret.
    var stripe = require('stripe')(inputs.secret);

    var stripeCustomerId = inputs.stripeCustomerId;
    if (!stripeCustomerId) {
      stripeCustomerId = (await stripe.customers.create({
        source: inputs.token === '' ? undefined : inputs.token,// ('' is same as the default here)
        plan: inputs.plan === '' ? undefined : inputs.plan,// ('' is same as the default here)
        email: inputs.emailAddress
      })).id;
    } else {

      // If the provided plan is '', then set any of this customer's subscriptions
      // to cancel at the end of the billing period.
      if (inputs.plan === '') {
        let subscriptions = (await stripe.customers.retrieve(stripeCustomerId)).subscriptions.data;
        for (let subscription of subscriptions) {
          await stripe.subscriptions.del(subscription.id, {
            at_period_end: true// eslint-disable-line camelcase
          });
        }//∞
      }//ﬁ

      // If the provided token is '', then detach the default payment source
      // before proceeding.
      if (inputs.token === '') {
        let defaultSourceId = (await stripe.customers.retrieve(stripeCustomerId)).default_source;
        if (defaultSourceId) {
          await stripe.customers.deleteSource(stripeCustomerId, defaultSourceId);
        }//ﬁ
      }//ﬁ

      // Use the Stripe API to update the customer.
      await stripe.customers.update(stripeCustomerId, {
        source: inputs.token === '' ? undefined : inputs.token,// ('' is same as the default here)
        plan: inputs.plan === '' ? undefined : inputs.plan,// ('' is same as the default here)
        email: inputs.emailAddress
      });
    }//ﬁ

    // Either way, send back the Stripe customer id
    return exits.success(stripeCustomerId);
  }

};
