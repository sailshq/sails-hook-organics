module.exports = {


  friendlyName: 'Until…',


  description: 'Run a function over and over again until it returns true.',


  inputs: {

    checker: {
      description: 'A function that will be run, then as soon as it returns, run again, and again, and so on... until it returns `true`.',
      extendedDescription: 'If `true`, then this stops.',
      type: 'ref',
      required: true,
      custom: function(checker){
        var _ = require('@sailshq/lodash');
        if (!_.isFunction(checker)) {
          throw new Error('Must be provided as a function.');
        } else {
          return true;
        }
      }
    },

    timeout: {
      description: 'An optional timeout, in milliseconds.',
      extendedDescription: 'If more than this number of milliseconds elapses before the checker returns true (regardless how many times the checker has returned already), then the algorithm will halt early and give up with an exception.',
      //TODO
    }

  },


  exits: {
    // TODO
  },


  /*

  */
  fn: function(inputs, exits) {
    return exits.error(new Error('Not implemented yet'));// TODO
  }


};
