module.exports = {


  friendlyName: 'Dive',


  description: '',


  inputs: {

  },


  exits: {

  },


  /*
  var result = await Flow.dive({graph, depth: 0}, async(soFar, deeper)=>{
    return soFar;
  });
  */
  fn: function(inputs, exits) {
    return exits.error(new Error('Not implemented yet'));// TODO
  }


};
