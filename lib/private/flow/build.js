module.exports = {


  friendlyName: 'Build',


  description: 'Build a value by running some logic and using the return value.',


  extendedDescription: 'This can be used to do a simple `reduce`, or even just as a tool for organizing your logic (although it\'s a good idea to avoid doing anything that causes side effects in your "builder" function).  One useful strategy is to declare a dummy argument in your "builder" function, and to give it a default value.  This lets you set up an initial value for convenience; for example, `async (memo=[])=>{…}` or `(memo=[])=>{…}`',


  inputs: {

    builder: {
      description: 'The function to run in order to build the result.',
      extendedDescription: 'Running this function should be more or less "pure" -- i.e. not cause any side effects.  It may be asynchronous or synchronous; e.g. `async (memo=[])=>{ return memo; }` or `(memo=[])=>{ return memo; }`',
      type: 'ref',
      required: true,
      custom: function(builder){
        var _ = require('@sailshq/lodash');
        if (!_.isFunction(builder)) {
          throw new Error('Must be provided as a function.');
        } else {
          return true;
        }
      }
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Value',
      outputDescription: 'The value returned from the builder function.',
      outputType: 'ref'
    }

  },


  fn: function(inputs, exits) {
    if (inputs.builder.constructor.name !== 'AsyncFunction') {
      // SYNCHRONOUS procedural parameter
      var result = inputs.builder();
      return exits.success(result);
    } else {
      // ASYNCHRONOUS procedural parameter
      var promise = inputs.builder();
      promise.then(function(result){
        exits.success(result);
      })
      .catch(function(err) {
        exits.error(err);
      });//_∏_
    }//ﬁ
  }


};
