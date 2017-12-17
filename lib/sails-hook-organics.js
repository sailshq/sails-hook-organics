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
            // Define a lazy getter to avoid loading files until the first time
            // a particular helper pack is being used.
            //
            // > More about lazy getters:
            // > https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
            // > Note that, if you do this as documented on MDN (as of Dec 2017 anyway)
            // > then you get a "maximum call stack exceeded" error.  Instead, I found
            // > you have to add another defineProperty call, like I did below.
            Object.defineProperty(sails.helpers, slug, {
              configurable: true,
              get: function() {
                var value = dryPack;//TODO: hydrate
                delete this[slug];
                Object.defineProperty(this, slug, { value: value });
                return value;
              }
            });
            // console.log('assigned getter for `'+slug+'`');
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
