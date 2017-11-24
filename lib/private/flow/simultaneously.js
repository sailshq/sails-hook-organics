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
        }//ﬁ
        return true;
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

    // Build arg to pass into either async.parallel or async.auto below.
    var modifiedStencil = _.reduce(inputs.stencil, function(memo, builder, idxOrKey){

      var modifiedBuilder = function(done){
        if (builder.constructor.name !== 'AsyncFunction') {
          // SYNCHRONOUS procedural parameter
          var result;
          try {
            result = builder();
          } catch (err) {
            return done(err);
          }
          return done(undefined, result);
        } else {
          // ASYNCHRONOUS procedural parameter
          var promise = builder();
          promise.then(function(result){
            done(undefined, result);
          })
          .catch(function(err) {
            done(err);
          });//_∏_
        }
      };//ƒ

      if (_.isArray(inputs.stencil)) {
        memo.push(modifiedBuilder);
      } else {
        memo[idxOrKey] = modifiedBuilder;
      }

      return memo;

    }, _.isArray(inputs.stencil)?[]:{});


    // Call either async.parallel or async.auto.
    (function(proceed){
      if (_.isEqual(modifiedStencil, {})) {
        // (special case for empty dictionary since async.auto squashes it otherwise)
        return proceed(undefined, {});
      } else if (_.isArray(inputs.stencil)) {
        async.parallel(modifiedStencil, proceed);
      } else {
        async.auto(modifiedStencil, proceed);
      }
    })(function(err, result) {
      if (err) { return exits.error(err); }

      // Strip any props that came back undefined.
      // (But only for dictionaries-- not for arrays.
      // If we did it for arrays it could mess up
      // expectations about indices.)
      if (!_.isArray(result)) {
        _.each(_.keys(result), function(key){
          if (result[key] === undefined) {
            delete result[key];
          }
        });
      }//ﬁ

      return exits.success(result);
    });//_∏_  (†)

  }


};
