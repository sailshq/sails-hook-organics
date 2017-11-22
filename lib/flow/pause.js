module.exports = {


  friendlyName: 'Pause',


  description: 'Wait for at least the specified number of milliseconds, then proceed.',


  inputs: {

    ms: {
      friendlyName: 'Milliseconds',
      description: 'The number of milliseconds to pause.',
      defaultsTo: 0,
      custom: function(ms){
        return (
          ms >= 0 &&
          ms === Math.floor(ms)
        );
      }
    }

  },


  fn: async function(inputs, exits) {
    setTimeout(function (){
      return exits.success();
    }, inputs.ms||0);
  }


};
