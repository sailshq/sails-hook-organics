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
        return done(new Error('Cannot load sails-hook-organics because the "helpers" hook is somehow missing...'));
      }

      sails.after('hook:helpers:loaded', function(){

        _.each(dryPacksBySlug, function(dryPack, slug){
          if (!sails.helpers[slug]) {
            sails.registerHelperPack(slug, dryPack);
          } else {
            _.each(dryPack.defs, function(def, identity){
              if (!sails.helpers[slug][identity]) {
                sails.registerHelper(slug+'.'+identity, def);
              }//ﬁ
              //(otherwise, a helper by this name is already defined in
              // this Sails app, so just do nothing so that it continues
              // to take precedence.)
            });//∞
          }//ﬁ
        });//∞

        return done();
      });//_∏_

    }

  };
};
