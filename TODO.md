todo

• ~~Mailgun: change apiKey to secret~~
• ~~Mailgun: possibly change inputs:~~
  · ~~`to` instead of `toEmail`~~
  · ~~`from` instead of `fromEmail`~~
• ~~Stripe: change apiKey to secret~~
• Stripe: change the method names and their inputs and their outputs prbly
• Publish 0.11
• Publish a patch w/ the readme saying that further efforts are in "sails-hook-essentials" now, so the npmjs.com page gets updated
• Then make it sails-hook-essentials, add a note to the readme about the name change, and publish that as sails-hook-essentials@1.0.0-0.





// - - - - - - - - - - - - - - - - - - - - - - - -
var customerId = await stdlib('stripe').saveBillingInfo({
  paymentSource: 'agja8dsg8j28jeg2j',
  plan: 'pro',
  emailAddress: 'gaasddgs@example.com',
});

stdlib('stripe').saveBillingInfo({
  stripeCustomer: customerId,
  emailAddress: 'some.other.email@example.com'
});

stdlib('stripe').saveBillingInfo({
  stripeCustomer: customerId,
  paymentSource: 'a9d9hg1h3k13kad'
});

stdlib('stripe').saveBillingInfo({
  stripeCustomer: customerId,
  emailAddress: 'yet.another@example.com',
  plan: ''
});

stdlib('stripe').saveBillingInfo({
  stripeCustomer: customerId,
  paymentSource: ''
});
// - - - - - - - - - - - - - - - - - - - - - - - -





// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Other stuff to think about:
// ```
// billingIsAnnual: {
//   type: 'boolean',
//   defaultsTo: true
// },

// billingCardholderName: {
//   type: 'string'
// },

// billingCardBrand: {
//   type: 'string',
//   example: 'Visa'
// },

// billingCardLast4: {
//   type: 'string',
//   example: '4242'
// },

// billingCardExpMonth: {
//   type: 'number',
//   example: 11
// },

// billingCardExpYear: {
//   type: 'number',
//   example: 2023
// },

// stripeCustomerId: {
//   type: 'string'
// },
// ```
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
