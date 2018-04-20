module.exports = {


  friendlyName: 'Build (synchronously)',


  description: 'Build a value by running some logic and using the return value.',


  extendedDescription: 'This can be used to do `reduce`, or even just as a tool for organizing your logic.',


  sync: true,


  inputs: {

    builder: {
      description: 'The function to run in order to build the result.',
      extendedDescription: 'i.e. `()=>{…}`',
      type: 'ref',
      required: true,
      custom: function(builder){
        var _ = require('@sailshq/lodash');
        if (!_.isFunction(builder)) {
          throw new Error('Must be provided as a function.');
        } else if (builder.constructor.name === 'AsyncFunction') {
          throw new Error('This method does not support async functions.  Please use `.build()` instead.');
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
    var result = inputs.builder();
    return exits.success(result);
  }


};
