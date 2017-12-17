/**
 * Module dependencies
 */

var _ = require('@sailshq/lodash');
var dryPacksBySlug = require('../accessible/dry');


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
          /////////////////////////////////////////////////////////
          // FUTURE: use something like this:
          // ```
          // sails.furnishHelpers(dryPacksBySlug);
          // ```
          // instead of all this:
          /////////////////////////////////////////////////////////
          _.each(dryPacksBySlug, (dryPack, slug)=>{
            if (!sails.helpers[slug]) {
              sails.helpers[slug] = dryPack;//TODO: hydrate
              // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
              // FUTURE: If it becomes important to use a lazy getter....
              // > see: https://github.com/sailshq/sails-hook-organics/tree/b3369100b2a61d91aa6b7a9ad7c5a12f684d233f
              // > and: https://github.com/sailshq/sails-hook-organics/tree/13963c4f9573f6554a3ecf55cf9dadb6747b9ef9
              // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
              return;
            } else {
              _.each(dryPack.defs, (def, identity)=>{
                // As long as no helper by this name is already defined
                // in this Sails app, then set it.  (Otherwise, just skip
                // this one so that the helper in userland continues to
                // take precedence.)
                if (!sails.helpers[slug][identity]) {
                  sails.helpers[slug][identity] = def;//TODO: hydrate
                }
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
