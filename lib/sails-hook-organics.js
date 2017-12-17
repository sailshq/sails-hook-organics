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

        /////////////////////////////////////////////////////////
        // FUTURE: use something like this:
        // ```
        // sails.furnishHelpers(dryPacksBySlug);
        // ```
        // instead of all this:
        /////////////////////////////////////////////////////////
        for (let slug in dryPacksBySlug) {
          let dryPack = dryPacksBySlug[slug];

          if (!sails.helpers[slug]) {
            // Define a lazy getter to avoid loading files / requiring deps
            // until the first time a particular helper pack is being used.
            console.log('assigned getter for `'+slug+'`');
            Object.defineProperty(sails.helpers, slug, {
              get: function() {
                delete this[slug];
                // Note that this next line HAS to return and assign on the same
                // line of code-- otherwise instead of this working as expected,
                // you get a "maximum call stack exceeded" error!
                // > More about lazy getters:
                // > https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
                return this[slug] = dryPack;// eslint-disable-line no-return-assign
                //TODO: hydrate
              }
            });
            // sails.registerHelpers({
            //   [slug]: dryPack
            // });
            continue;
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
        }//∞
        /////////////////////////////////////////////////////////
        return done();
      });//_∏_

    }

  };
};
