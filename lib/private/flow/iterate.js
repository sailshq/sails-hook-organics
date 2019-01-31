module.exports = {


  friendlyName: 'Iterate',


  description: 'Run a function every time the given wellspring tells us it is time to run it.',


  extendedDescription: 'In this ontology, we define the noun "splash" to represent a moment in time where the wellspring invokes its "splasher", passing in a value.  We define "splashes" to mean that the wellspring has "splashed" -- i.e. that it "emitted", or "notified", or "handled".  (As in, "the wellspring splashed, so the eachSplash iteratee was called", or, "each time the wellspring splashes, the eachSplash iteratee is called".)',


  inputs: {

    wellspring: {
      description: 'The function that triggers a sequence of splashes, telling us when, how many times, and with what value, to run the given "eachSplash" function.',
      extendedDescription: 'This is our stream-like iterator that starts running immediately as soon as .iterate() is called.  As soon as this function returns or throws, so does .iterate().',
      moreInfoUrl: 'https://en.wikipedia.org/wiki/Iterator',
      type: 'ref',
      required: true,
      custom: function(wellspring){
        var _ = require('@sailshq/lodash');
        if (!_.isFunction(wellspring)) {
          throw new Error('Must be provided as a function that accepts a built-in "splasher" function as its first and only argument; e.g. `(splasher)=>{…}` or `async(splasher)=>{…}.`');
        } else {
          return true;
        }
      }
    },

    eachSplash: {
      description: 'A function to run each time the wellspring splashes out a value.',
      extendedDescription: 'e.g. `async (value)=>{ … }` or `(value)=>{ … }`',
      type: 'ref',
      custom: function(iteratee){
        var _ = require('@sailshq/lodash');
        if (!_.isFunction(iteratee)) {
          throw new Error('Must be provided as a function, like `(value)=>{…}` or `async(value)=>{…}.`');
        } else {
          return true;
        }
      }
    },

    eachBatch: {
      description: 'A function to run each time the current batch of values fills up, and if the wellspring finishes without filling up the very last batch.',
      extendedDescription: 'e.g. `async (values)=>{ … }` or `(values)=>{ … }`',
      type: 'ref',
      custom: function(iteratee){
        var _ = require('@sailshq/lodash');
        if (!_.isFunction(iteratee)) {
          throw new Error('Must be provided as a function, like `(values)=>{…}` or `async(values)=>{…}.`');
        } else {
          return true;
        }
      }
    },

    skipDuplicates: {
      description: 'Whether or not to skip splashes that are invoked with a value we\'ve already seen before, according to a strict equality check (===).',
      extendedDescription: 'When a splash is considered a duplicate and thus automatically skipped, its value is not added to the current batch, and the "eachSplash" iteratee is not invoked.',
      type: 'boolean',
      defaultsTo: false
    },

    batchSize: {
      description: 'The number of unskipped splashes to receive from the wellspring before considering the batch full and invoking the "eachBatch" function with an array of all the values accumulated from the batch.',
      type: 'number',
      defaultsTo: 30
    }

  },


  exits: {

    success: {
      description: 'The wellspring finished successfully.'
    },

  },


  fn: function({wellspring, eachSplash, eachBatch, skipDuplicates, batchSize}) {
    if (!eachSplash && !eachBatch) {
      throw new Error('Neither an eachSplash function nor an eachBatch function was specified-- but at least one of the two must be provided.');
    }

    console.log('All the stuff:',wellspring, eachSplash, eachBatch, skipDuplicates, batchSize);
    throw new Error('TODO');

    // Example usage from a real-world application:
    // -------------------------------------------------------------------------
    // ```
    // await sails.helpers.flow.iterate.with({
    //   wellspring: async (splasher)=>{
    //     await Property.stream({
    //       titleCoBranch: {in: _.pluck(titleCo.branches, 'id')}
    //     })
    //     .select(['sellerAgent', 'buyerAgent'])
    //     .meta({batchSize: 500})
    //     .eachRecord((property)=>{
    //       if (property.buyerAgent) {
    //         await splasher(property.buyerAgent);
    //       }
    //       if (property.sellerAgent) {
    //         await splasher(property.sellerAgent);
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
    // ```
    // -------------------------------------------------------------------------

  }


};
