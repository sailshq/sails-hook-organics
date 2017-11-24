module.exports = {


  friendlyName: 'Pause',


  description: 'Wait for at least the specified number of milliseconds, then proceed.',


  sideEffects: 'cacheable',


  inputs: {

    ms: {
      friendlyName: 'Milliseconds',
      description: 'The number of milliseconds to pause.',
      type: 'number',
      min: 0,
      isInteger: true,
      defaultsTo: 0
    }

  },


  fn: function(inputs, exits) {
    setTimeout(function (){
      return exits.success();
    }, inputs.ms);
  }


};
