module.exports = {


  friendlyName: 'Until…',


  description: 'Run a function over and over again until it returns true.',


  extendedDescription: 'Use this to perform a `while` loop, or to roll your own `setInterval()`.',


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
      type: 'number',
      isInteger: true,
      min: 1
    }

  },


  exits: {

    success: {
      description: 'The checker returned `true`.'
    },

    tookTooLong: {
      description: 'Exceeded specified time limit before checker ever returned `true`.'
    }

  },


  fn: function(inputs, exits) {
    var async = require('async');

    var hasTimedOut;
    var timeoutId;
    if (inputs.timeout) {
      timeoutId = setTimeout(function(){
        hasTimedOut = true;
        return exits.tookTooLong();
      }, inputs.timeout);//_∏_
    }//ﬁ

    var hasCheckerReturnedTrue;
    async.doUntil(
      function _doing(proceed){

        if (inputs.checker.constructor.name !== 'AsyncFunction') {
          // SYNCHRONOUS procedural parameter
          var result;
          try {
            result = inputs.checker();
          } catch (err) {
            return proceed(err);
          }
          if (result === true) {
            hasCheckerReturnedTrue = true;
          }
          return proceed();
        } else {
          // ASYNCHRONOUS procedural parameter
          var promise = inputs.checker();
          promise.then(function(result){
            if (result === true) {
              hasCheckerReturnedTrue = true;
            }

            if (hasTimedOut) {
              var err = new Error();
              err.name = 'AlreadyTimedOutSoIgnoreMe';
              return proceed(err);
            }//•

            proceed();
          })
          .catch(function(err) {
            proceed(err);
          });//_∏_
        }//ﬁ
      },
      function _checking(){
        return hasCheckerReturnedTrue;
      },
      function (err) {
        clearTimeout(timeoutId);
        if (err && err.name === 'AlreadyTimedOutSoIgnoreMe') {
          // IWMIH, then do nothing.
          // (We'll have already exited!)
        } else if (err) {
          return exits.error(err);
        } else {
          return exits.success();
        }
      }
    );//_∏_

  }


};
