/**
 * Module dependencies
 */

var _ = require('@sailshq/lodash');
var DRY_PACKS_BY_SLUG = require('../accessible/dry');


/**
 * sails-hook-organics
 *
 * > For past verisons of this implementation, including sails-stdlib, see:
 * > http://github.com/sailshq/sails-hook-organics/tree/v0.11.2
 */

module.exports = function(sails) {
  return {

    initialize: function(done){
      if (!sails.hooks.helpers) {
        return done(new Error('Cannot load sails-hook-organics without enabling the "helpers" hook!'));
      }

      sails.after('hook:helpers:loaded', function(){
        try {
          _.each(DRY_PACKS_BY_SLUG, (dryPack, slug)=>{
            if (!sails.helpers[slug]) {
              sails.hooks.helpers.furnishPack(slug, dryPack);
              // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
              // FUTURE: Maybe provide some way of including other pieces
              // of pack metadata here
              // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
              // FUTURE: If it becomes important to use a lazy getter....
              // > see: https://github.com/sailshq/sails-hook-organics/tree/b3369100b2a61d91aa6b7a9ad7c5a12f684d233f
              // > and: https://github.com/sailshq/sails-hook-organics/tree/13963c4f9573f6554a3ecf55cf9dadb6747b9ef9
              // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
              return;
            } else {
              _.each(dryPack.defs, (def, identity)=>{
                sails.hooks.helpers.furnishHelper(slug+'.'+identity, def);
              });//∞
            }//ﬁ
          });//∞
          /////////////////////////////////////////////////////////
        } catch (err) { return done(err); }
        return done();
      });//_∏_
    }//,
  };//•
};//ƒ
