/**
 * Module dependencies
 */

var _ = require('@sailshq/lodash');
var LIBRARY_CONTENTS = require('../lib/private/LIBRARY_CONTENTS');
// Also note that all defs are dynamically required below, either from where
// they are defined inline in this repo, or from the appropriate dependency.


/**
 * accessible/dry
 *
 * @type {Dictionary}
 */

module.exports = _.reduce(LIBRARY_CONTENTS, function(expandedPgInfoBySlug, pgInfo, pgSlug){

  // If this pack ends up being external, this variable will be used
  // to hold the toJSON-ed dry data from that pack (to avoid unnecessarily
  // running that extraction logic over and over again)
  var externalPackDryData;

  expandedPgInfoBySlug[pgSlug] = _.extend({}, _.omit(pgInfo, 'methodIdts'), {
    name: pgInfo.name || '.'+pgSlug,
    defs: _.reduce(LIBRARY_CONTENTS[pgSlug].methodIdts, function(helpersByIdentity, helperIdentity){

      switch (pgSlug) {

        // for...
        // Things Defined In Dependencies
        case 'strings':
        case 'fs':
        case 'http':
        case 'process':
          if (!externalPackDryData) {
            externalPackDryData = require('machinepack-'+pgSlug).toJSON();
          }
          helpersByIdentity[helperIdentity] = externalPackDryData.defs[helperIdentity];
          break;

        // for...
        // Things Defined In This Repo
        case 'flow':
        case 'gravatar':
        case 'passwords':
        case 'mailgun':
        case 'stripe':
          helpersByIdentity[helperIdentity] = require('../lib/private/'+pgSlug+'/'+helperIdentity);
          break;

        // for...
        // Miscreants
        default:
          throw new Error('Consistency violation: Encountered unrecognized pack/category: `'+pgSlug+'`.  Please choose from the list of packs/categories listed at https://npmjs.com/package/sails-hook-organics');
      }

      return helpersByIdentity;
    }, {})//∞
  });//</ _.extend() >

  return expandedPgInfoBySlug;
}, {});//∞
