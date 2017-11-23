module.exports = {


  friendlyName: 'Simultaneously…',


  description: 'Run multiple functions at the same time (or as close to that as is possible) and assemble their return values into the structure indicated by the provided "stencil".',


  extendedDescription: 'Note the behavior of this method is somewhat similar to .auto(), from caolan\'s `async` library.',


  inputs: {

    stencil: {
      description: 'A 1-dimensional array or dictionary, consisting of functions to run in parallel.',
      extendedDescription: 'Remember: A dictionary is just a plain old JavaScript object, like `{}`.  And "1-dimensional" just means that it is only one level deep.',
      type: 'ref',
      required: true,
      custom: function(stencil){
        var _ = require('@sailshq/lodash');
        if (_.isArray(stencil)) {
          _.each(stencil, function(item){
            if (!_.isFunction(item)) {
              throw new Error('Every item in the stencil array must be a function.');
            }
          });
        } else if (_.isObject(stencil) && !_.isFunction(stencil)) {
          _.each(stencil, function(rv, key){
            if (!_.isFunction(rv, key)) {
              throw new Error('Every value in the stencil dictionary must be a function.');
            }
          });
        } else {
          throw new Error('Must be provided as a 1-dimensional structure (array or dictionary) of functions.');
        }
      }
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Result',
      outputDescription: 'The result data assembled from the return values of all the simultaneously-run functions.',
      outputType: 'ref'
    }

  },


  fn: function(inputs, exits) {
    var _ = require('@sailshq/lodash');
    var async = require('async');

    if (inputs.iteratee.constructor.name !== 'AsyncFunction') {
      // SYNCHRONOUS procedural parameter
      return exits.error('TODO');
    } else {
      // ASYNCHRONOUS procedural parameter
      return exits.error('TODO');
    }//ﬁ
  }


};
