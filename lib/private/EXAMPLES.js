/**
 * Common examples (usually expressed as exemplar schemas) that are shared by multiple things.
 *
 * @type {Dictionary}
 * @constant
 */

module.exports = {

  // Stripe API customer object -- see https://stripe.com/docs/api#customers for full documentation.
  // This is used in the output from `createCustomer`, `retrieveCustomerDetails` and `updateCustomer`.
  STRIPE_CUSTOMER: {
    id: 'cus_92418YMzH9wiaI',
    object: 'customer',
    account_balance: 0,//eslint-disable-line camelcase
    created: 1471562736,
    currency: 'usd',
    default_source: '',//eslint-disable-line camelcase
    delinquent: false,
    description: 'Stripe Test Customer #5',
    discount: 0,
    email: 'somebody@email.com',
    livemode: false,
    metadata: {},
    shipping: 0,
    sources: {
      object: 'list',
      has_more: false,//eslint-disable-line camelcase
      total_count: 0,//eslint-disable-line camelcase
      url: '/v1/customers/cus_92418YMzH9wiaI/sources',
      data: [
        {/*
        Stripe API payment source object.
        Note -- this is a superset of all fields in the card, bank_account and bitcoint_receiver objects.
        See https://stripe.com/docs/api#cards, https://stripe.com/docs/api#bitcoin_receivers and
        https://stripe.com/docs/api#bank_accounts for full documentation.

        > And for history, see:
        > https://github.com/particlebanana/machinepack-stripe/blob/f7940965d7b7378c5c7174a07fd17745b5919d3f/constants/source.schema.js
        */}
      ]
    },
    subscriptions: {
      object: 'list',
      has_more: false,//eslint-disable-line camelcase
      total_count: 0,//eslint-disable-line camelcase
      url: '/v1/customers/cus_92418YMzH9wiaI/subscriptions',
      data: [
        {/*
        Stripe API subscription object -- see https://stripe.com/docs/api#subscriptions for full documentation.

        > And for history, see:
        > https://raw.githubusercontent.com/particlebanana/machinepack-stripe/f7940965d7b7378c5c7174a07fd17745b5919d3f/constants/subscription.schema.js
        */}
      ]
    }
  },

};
