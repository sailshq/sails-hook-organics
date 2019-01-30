module.exports = {


  friendlyName: 'Iterate',


  description: 'Run a function every time the given wellspring tells us it is time to run it.',


  extendedDescription: 'In this definition, we define the noun "handle" to represent a moment in time where the wellspring invokes its "handler", with or without some value.  We also define a reflexive variation on the verb "handles" to mean that the wellspring has "handled" -- i.e. that it "emitted", or "notified".  (As in, "the wellspring handled, so the eachItem iteratee was called", or, "each time the wellspring handles, the eachItem iteratee is called".)',


  inputs: {

    wellspring: {
      description: 'The function that triggers a sequence of handles telling us when, how many times, and with what value, to run the given "eachItem" function.',
      extendedDescription: 'This is our stream-like iterator that will be run immediately as soon as .iterate() is called.  As soon as this function completes, so does .iterate().',
      moreInfoUrl: 'https://en.wikipedia.org/wiki/Iterator',
      type: 'ref',
      required: true,
      custom: function(wellspring){
        var _ = require('@sailshq/lodash');
        if (!_.isFunction(wellspring)) {
          throw new Error('Must be provided as a function that accepts a built-in "handler" function as its first and only argument; e.g. `(handler)=>{…}` or `async(handler)=>{…}.`');
        } else {
          return true;
        }
      }
    },

    eachItem: {
      description: 'A function to run each time the wellspring handles.',
      extendedDescription: 'e.g. `async (item)=>{ … }` or `(item)=>{ … }`',
      type: 'ref',
      custom: function(iteratee){
        var _ = require('@sailshq/lodash');
        if (!_.isFunction(iteratee)) {
          throw new Error('Must be provided as a function, like `(item)=>{…}` or `async(item)=>{…}.`');
        } else {
          return true;
        }
      }
    },

    eachBatch: {
      description: 'A function to run each time the current batch of items fills up, and if the wellspring finishes without filling up the very last batch.',
      extendedDescription: 'e.g. `async (items)=>{ … }` or `(items)=>{ … }`',
      type: 'ref',
      custom: function(iteratee){
        var _ = require('@sailshq/lodash');
        if (!_.isFunction(iteratee)) {
          throw new Error('Must be provided as a function, like `(items)=>{…}` or `async(items)=>{…}.`');
        } else {
          return true;
        }
      }
    },

    skipDuplicates: {
      description: 'Whether or not to skip handles that are invoked with a value we\'ve already seen before, according to a strict equality check (===).',
      extendedDescription: 'When a handle is considered a duplicate and thus automatically skipped, its value is not added to the current batch, and the "eachItem" iteratee is not invoked.',
      type: 'boolean',
      defaultsTo: false
    },

    batchSize: {
      description: 'The number of unskipped handles to receive from the wellspring before considering the batch full and invoking the "eachBatch" function with an array of all the values accumulated from the batch.',
      type: 'number',
      defaultsTo: 30
    }

  },


  exits: {

    success: {
      description: 'The wellspring finished successfully.'
    },

  },


  fn: function({}) {
    throw new Error('TODO');

    // Example usage from a real-world application:
    // -------------------------------------------------------------------------
    // ```
    // await sails.helpers.flow.iterate.with({
    //   wellspring: async (handler)=>{
    //     var alreadySeen = [];
    //     await Property.stream({
    //       titleCoBranch: {in: _.pluck(titleCo.branches, 'id')}
    //     })
    //     .select(['sellerAgent', 'buyerAgent'])
    //     .meta({batchSize: 500})
    //     .eachRecord((property)=>{
    //       if (property.buyerAgent && !_.contains(alreadySeen,property.buyerAgent)) {
    //         await handler(property.buyerAgent);
    //       }
    //       if (property.sellerAgent && !_.contains(alreadySeen,property.sellerAgent)) {
    //         await handler(property.sellerAgent);
    //       }
    //     });
    //   },
    //   eachBatch: async (contactIds)=>{
    //     var contacts = await Contact.find({
    //       id: {in: contactIds}
    //     });
    //     // …fetch more data, maybe…
    //     // …do stuff with it, possibly causing side-effects…
    //     // …etc.
    //     // …
    //   },
    //   skipDuplicates: true,
    //   batchSize: 200
    // });
    // // ```
    // -------------------------------------------------------------------------

  }


};
