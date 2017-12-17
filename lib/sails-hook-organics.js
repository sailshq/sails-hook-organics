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

        /////////////////////////////////////////////////////////
        // FUTURE: use something like this:
        // ```
        // sails.furnishHelpers(dryPacksBySlug);
        // ```
        // instead of all this:
        /////////////////////////////////////////////////////////
        // for (let slug in dryPacksBySlug) {
        //   let dryPack = dryPacksBySlug[slug];
        _.each(dryPacksBySlug, (dryPack, slug)=>{

          if (!sails.helpers[slug]) {

            // FUTURE: If it becomes important to use a lazy getter, see:
            // > https://github.com/sailshq/sails-hook-organics/tree/13963c4f9573f6554a3ecf55cf9dadb6747b9ef9
            this[slug] = dryPack;//TODO: hydrate
            // sails.registerHelpers({
            //   [slug]: dryPack
            // });
            return;
          }//•

          console.log('made it here!');
          for (let identity in dryPack.defs) {
            let def = dryPack.defs[identity];
            if (sails.helpers[slug][identity]) {
              // (A helper by this name is already defined in
              // this Sails app, so just skip this one so that
              // the helper in userland continues to take precedence.)
              continue;
            }//•

            //TODO: hydrate
            sails.helpers[slug][identity] = def;
            // sails.registerHelpers({
            //   [slug]: {
            //     [identity]: def
            //   }
            // });

          }//∞
        });//∞
        /////////////////////////////////////////////////////////
        return done();
      });//_∏_

    }

  };
};
