module.exports = {


  friendlyName: 'For each…',


  description: 'Run some logic (the "iteratee") once for each item of an array, or each key/value pair in a dictionary (i.e. plain JavaScript object like `{}`).',


  inputs: {

    arrayOrDictionary: {
      description: 'The array or dictionary to loop over.',
      type: 'ref',
      required: true,
      custom: function(arrayOrDictionary) {
        var _ = require('@sailshq/lodash');
        return _.isObject(arrayOrDictionary) && !_.isFunction(arrayOrDictionary);
      }
    },

    iteratee: {
      description: 'The function to run for each item in the array.',
      extendedDescription: 'e.g. `async (item)=>{ … }`',
      type: 'ref',
      required: true,
      custom: function(iteratee){
        var _ = require('@sailshq/lodash');
        if (!_.isFunction(iteratee)) {
          throw new Error('Iteratee must be provided as a function, like `(item)=>{…}`, `async(item)=>{…}`, `(value, key)=>{…}`, etc.');
        } else {
          return true;
        }
      }
    }

  },


  /*
  await Flow.forEach(businesses, async(business, i)=>{
    console.log(`${business.name} seems like an OK business.`);
  });

  await Flow.forEach(businessesBySlug, async(business, slug)=>{
    console.log(`${business.name} seems like an OK business.`);
  });
  */
  fn: function(inputs, exits) {
    var _ = require('@sailshq/lodash');
    var async = require('async');

    if (inputs.iteratee.constructor.name !== 'AsyncFunction') {
      // SYNCHRONOUS
      _.each(inputs.arrayOrDictionary, function(itemOrValue, idxOrKey){
        inputs.iteratee(itemOrValue, idxOrKey);
      });//∞
    } else {
      // ASYNCHRONOUS
      var thingsToLoopOver = _.isArray(inputs.arrayOrDictionary)? inputs.arrayOrDictionary : _.keys(inputs.arrayOrDictionary);
      var idx = 0;
      async.eachSeries(thingsToLoopOver, function(itemOrKey, next){
        idx++;
        var promise;
        if (_.isArray(inputs.arrayOrDictionary)) {
          promise = inputs.iteratee(itemOrKey, idx);
        } else {
          promise = inputs.iteratee(inputs.arrayOrDictionary[itemOrKey], itemOrKey);
        }
        promise.then(function(){
          next();
        })
        .catch(function(err){
          next(err);
        });
      }, function(err){
        if (err) { return exits.error(err); }
        return exits.success();
      });//_∏_
    }//ﬁ
  }


};
