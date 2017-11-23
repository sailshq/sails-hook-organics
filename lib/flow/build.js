module.exports = {


  friendlyName: 'Build',


  description: 'Build a value by running some logic and using the return value.',


  extendedDescription: 'This can be used to do `reduce`, or even just as a tool for organizing your logic.',


  inputs: {

    initialValue: {
      description: 'An optional initial value to start off with.',
      type: 'ref'
    },

    procedure: {
      description: 'The function to run in order to build the result.',
      extendedDescription: 'i.e. `async (initialValue)=>{…}` or `(initialValue)=>{…}` or `()=>{…}` or `async()=>{…}`',
      type: 'ref',
      required: true,
      custom: function(procedure){
        var _ = require('@sailshq/lodash');
        if (!_.isFunction(procedure)) {
          throw new Error('Must be provided as a function.');
        } else {
          return true;
        }
      }
    }

  },


  /*
  var result = await Flow.build(async()=>{
    return 'foo';
  });

  var result = await Flow.build('baz', async(val)=>{
    return val+'foo';
  });
  */
  fn: function(inputs, exits) {
    if (inputs.procedure.constructor.name !== 'AsyncFunction') {
      // SYNCHRONOUS procedural parameter
      var result = inputs.procedure(inputs.initialValue||undefined);
      return exits.success(result);
    } else {
      // ASYNCHRONOUS procedural parameter
      var promise = inputs.procedure(inputs.initialValue||undefined);
      promise.then(function(result){
        exits.success(result);
      })
      .catch(function(err) {
        exits.error(err);
      });//_∏_
    }//ﬁ
  }


};
