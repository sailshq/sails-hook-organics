module.exports = {


  friendlyName: 'Simultaneously for each…',


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
      description: 'The function to run for each item/property in the array/dictionary.',
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
    },

    // FUTURE: maybe add support for `timeout`, for the iteratee

  },


  exits: {

    success: {
      outputFriendlyName: 'Array or dictionary of results',
      outputDescription: 'The combined result from running the iteratee function on each item/property.',
      extendedDescription: 'Array indices and dictionary key order are guaranteed to be the same as what was passed in.',
      outputType: 'ref',
    }

  },


  // Two simple examples:
  //sails.helpers.flow.simultaneouslyForEach(['google.com', 'facebook.com', 'linkedin.com'], async(url, idx)=>{ console.log(idx, url); var result = (await sails.helpers.http.get(url)).slice(0,15); return result; }).log()
  //sails.helpers.flow.simultaneouslyForEach({google:'google.com', facebook:'facebook.com', linkedin: 'linkedin.com'}, async(url, key)=>{ console.log(key, url); var result = (await sails.helpers.http.get(url)).slice(0,15); return result; }).log()
  fn: function({arrayOrDictionary, iteratee}, exits) {
    var _ = require('@sailshq/lodash');

    var result;
    if (_.isArray(arrayOrDictionary)) {
      result = [];
    } else {
      result = {};
    }

    if (iteratee.constructor.name !== 'AsyncFunction') {
      // SYNCHRONOUS procedural parameter
      _.each(arrayOrDictionary, (itemOrValue, idxOrKey)=>{
        var chunk = iteratee(itemOrValue, idxOrKey);
        result[idxOrKey] = chunk;
      });//∞
      return exits.success(result);
    } else {
      // ASYNCHRONOUS procedural parameter
      let promises = [];
      for (let idxOrKey in arrayOrDictionary) {
        promises.push(iteratee(arrayOrDictionary[idxOrKey], idxOrKey));
      }//∞
      Promise.all(promises)
      .then((chunks)=>{
        var chunkIdx = 0;
        _.each(arrayOrDictionary, (unused, idxOrKey)=>{
          result[idxOrKey] = chunks[chunkIdx];
          chunkIdx++;
        });//∞
        exits.success(result);
      })
      .catch((err)=>{
        exits.error(err);
      });//_∏_
    }//ﬁ
  }


};
