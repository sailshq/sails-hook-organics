module.exports = {


  friendlyName: 'Dive',


  description: 'Dive into some recursive logic.',


  inputs: {

    initialValue: {
      description: 'An optional initial value to start off with.',
      type: 'ref'
    },

    recursee: {
      description: 'The recursive logic to run.',
      extendedDescription: 'i.e. `async (initialValue)=>{…}` or `(initialValue)=>{…}` or `()=>{…}` or `async()=>{…}`',
      type: 'ref',
      required: true,
      custom: function(recursee){
        var _ = require('@sailshq/lodash');
        if (!_.isFunction(recursee)) {
          throw new Error('Must be provided as a function.');
        } else {
          return true;
        }
      }
    },

    maxDepth: {
      description: 'An optional maximum depth.  (Zero-indexed; the first recursive call sets depth to 1, and so on.)',
      extendedDescription: 'If specified, an Error will be thrown if/when this depth is reached and the algorithm attempts to dive further (i.e. recurse again).',
      type: 'number',
      min: 1,
      isInteger: true
    }

  },


  exits: {

    success: {},
    exceededMaxDepth: {
      description: 'Exceeded max depth for recursion.'
    }
  },


  /*
  var result = await Flow.dive(acyclicGraph, async(acyclicGraph, dive)=>{
    return Object.keys(acyclicGraph).length + dive(acyclicGraph);
  });
  */
  fn: function(inputs, exits) {

    var depth = 0;
    if (inputs.recursee.constructor.name !== 'AsyncFunction') {
      // SYNCHRONOUS procedural parameter
      var result = (function $recurse(){
        var resultFromBelow = inputs.recursee(inputs.initialValue||undefined, function _preparingToDive(snowball){
          if (inputs.maxDepth && depth === inputs.maxDepth){
            throw new Error('Exceeded max depth for recursion ('+inputs.maxDepth+').');
          }
          return inputs.recursee(snowball);
        });
      })(inputs.initialValue);//‰
      return exits.success(result);
    } else {
      // ASYNCHRONOUS procedural parameter
      var promise = inputs.recursee(inputs.initialValue||undefined);
      promise.then(function(result){
        exits.success(result);
      })
      .catch(function(err) {
        exits.error(err);
      });//_∏_
    }//ﬁ
  }


};
