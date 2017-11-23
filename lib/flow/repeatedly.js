module.exports = {


  friendlyName: 'Repeatedly…',


  description: 'Check a condition over and over again until it becomes true.',


  inputs: {

    checker: {
      description: 'A function that will be run again as soon as it returns, unless it returns `true`.',
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
