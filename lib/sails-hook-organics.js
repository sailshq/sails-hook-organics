/**
 * Module dependencies
 */

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

        for (let slug in dryPacksBySlug) {
          let dryPack = dryPacksBySlug[slug];

          if (!sails.helpers[slug]) {
            sails.registerHelpers({
              [slug]: dryPack
            });
            continue;
          }//•

          for (let identity in dryPack.defs) {
            let def = dryPack.defs[identity];
            if (sails.helpers[slug][identity]) {
              // (A helper by this name is already defined in
              // this Sails app, so just skip this one so that
              // the helper in userland continues to take precedence.)
              continue;
            }//•

            sails.registerHelpers({
              [slug]: {
                [identity]: def
              }
            });

          }//∞
        }//∞

        return done();
      });//_∏_

    }

  };
};
