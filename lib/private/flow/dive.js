module.exports = {


  friendlyName: 'Dive',


  description: 'Dive into some recursive logic.',


  inputs: {

    initialValue: {
      description: 'The initial value to start off with.',
      type: 'ref'
    },

    recursee: {
      description: 'The recursive logic to run.',
      extendedDescription: 'i.e. `async (initialValue, dive)=>{…}` or `(initialValue, dive)=>{…}`',
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
    },

    // FUTURE: maybe add support for `timeout`, for the iteratee

  },


  exits: {

    success: {
      outputFriendlyName: 'Result',
      outputDescription: 'The (optional) result from performing this recursive dive.',
      outputType: 'ref'
    },

    exceededMaxDepth: {
      description: 'Exceeded max depth for recursion.'
    }

  },


  fn: function(inputs, exits) {

    var depth = 0;
    if (inputs.recursee.constructor.name !== 'AsyncFunction') {
      // SYNCHRONOUS procedural parameter
      var result = (function $diveDeeperSync(snowballFromAbove){
        var resultFromBelow = inputs.recursee(snowballFromAbove, function _preparingToDiveAgainSync(downwardSnowball){
          if (inputs.maxDepth && depth === inputs.maxDepth){
            throw 'exceededMaxDepth';
          } else {
            return $diveDeeperSync(downwardSnowball);
          }
        });
        return resultFromBelow;
      })(inputs.initialValue);//‰
      return exits.success(result);
    } else {
      // ASYNCHRONOUS procedural parameter
      (function $diveDeeper(snowballFromAbove, proceed){
        var promise = inputs.recursee(snowballFromAbove, function _preparingToDiveAgain(downwardSnowball){
          var thenableForNextRecursiveStep = new Promise(function (resolve, reject){
            if (inputs.maxDepth && depth === inputs.maxDepth){
              var err = new Error();
              err.name = 'MaxDepthExceededError';
              reject(err);
            } else {
              $diveDeeper(downwardSnowball, function(err, resultFromWayBelow) {
                if (err) {
                  reject(err);
                } else {
                  resolve(resultFromWayBelow);
                }
              });//_∏_
            }//ﬁ
          });
          return thenableForNextRecursiveStep;
        });
        promise.then(function(resultFromBelow){
          proceed(undefined, resultFromBelow);
        })
        .catch(function(err) {
          proceed(err);
        });//_∏_
      })(inputs.initialValue, function(err, result) {
        if (err && err.name === 'ExceededMaxDepthError') {
          return exits.exceededMaxDepth();
        } else if (err) {
          return exits.error(err);
        } else {
          return exits.success(result);
        }
      });//_∏_  (‰)
    }//ﬁ
  }


};
