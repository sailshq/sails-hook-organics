/**
 * Module dependencies
 */

var OUR_PACKAGE_JSON = require('../../package.json');


/**
 * getInspectFn()
 *
 * Get an override for the inspect function, with language/examples
 * that vary slightly depending on the provided custom usage opts.
 *
 * @param  {Dictionary?} customUsageOpts
 * @return {Function}
 */
module.exports = function getInspectFn(customUsageOpts){

  var opts = customUsageOpts||{};
  opts.arginStyle = opts.arginStyle||'named';
  opts.execStyle = opts.execStyle||'deferred';

  // Async example:
  var example1 = (function(){
    var exampleArginPhrase = '';
    if (opts.arginStyle === 'named') {
      exampleArginPhrase = '{dir: \'./colorado/\'}';
    } else if (opts.arginStyle === 'serial') {
      exampleArginPhrase = '\'./colorado/\'';
    }

    return 'var contents = await stdlib(\'fs\').ls('+exampleArginPhrase+');';
  })();//†

  // Synchronous example:
  var example2 = (function(){
    var exampleArginPhrase = '';
    if (opts.arginStyle === 'named') {
      exampleArginPhrase = '{string: \'hank\'}';
    } else if (opts.arginStyle === 'serial') {
      exampleArginPhrase = '\'hank\'';
    }

    if (opts.execStyle === 'deferred') {
      return 'var name = stdlib(\'strings\').capitalize('+exampleArginPhrase+').now();';
    } else if (opts.execStyle === 'immediate' || opts.execStyle === 'natural') {
      return 'var name = stdlib(\'strings\').capitalize('+exampleArginPhrase+');';
    }
    throw new Error('Consistency violation: Unrecognized usage opts.  (This should never happen, since it should have already been validated and prevented from being built- please report at https://sailsjs.com/bugs)');
  })();//†


  // Tree diagram:
  var treeDiagram = (function(){
    // FUTURE: use real methods instead of hard-coding
    return ''+
    '   .\n'+
    '   ├── flow\n'+
    '   │   ├── build\n'+
    '   │   ├── dive\n'+
    '   │   ├── each\n'+
    '   │   ├── map\n'+
    '   │   ├── simultaneously\n'+
    '   │   ├── pause\n'+
    '   │   └── whilst\n'+
    '   │\n'+
    '   ├── strings\n'+
    '   │   ├── ensureUniq\n'+
    '   │   ├── random\n'+
    '   │   ├── toStream\n'+
    '   │   └── uuid\n'+
    '   │\n'+
    '   ├── fs\n'+
    '   │   ├── cp\n'+
    '   │   ├── ensureDir\n'+
    '   │   ├── exists\n'+
    '   │   ├── ls\n'+
    '   │   ├── mkdir\n'+
    '   │   ├── mv\n'+
    '   │   ├── readJson\n'+
    '   │   ├── readStream\n'+
    '   │   ├── read\n'+
    '   │   ├── rmrf\n'+
    '   │   ├── template\n'+
    '   │   ├── writeJson\n'+
    '   │   ├── writeStream\n'+
    '   │   └── write\n'+
    '   │\n'+
    '   ├── http\n'+
    '   │   ├── del\n'+
    '   │   ├── getStream\n'+
    '   │   ├── get\n'+
    '   │   ├── patch\n'+
    '   │   ├── post\n'+
    '   │   ├── put\n'+
    '   │   └── sendHttpRequest\n'+
    '   │\n'+
    '   ├── process\n'+
    '   │   └── executeCommand\n'+
    '   │\n'+
    '   ├── gravatar\n'+
    '   │   └── getImageUrl\n'+
    '   │\n'+
    '   ├── mailgun\n'+
    '   │   └── sendHtmlEmail\n'+
    '   │\n'+
    '   ├── passwords\n'+
    '   │   ├── checkPassword\n'+
    '   │   └── hashPassword\n'+
    '   │\n'+
    '   └── stripe\n'+
    '       ├── createCustomer\n'+
    '       ├── deleteSource\n'+
    '       ├── retrieveCustomerDetails\n'+
    '       └── updateCustomer';
  })();//†

  return function inspect(){
    return ''+
    '-------------------------------------------------------\n'+
    ' '+OUR_PACKAGE_JSON.name+'\n'+
    ' v'+OUR_PACKAGE_JSON.version+'\n'+
    '\n'+
    ' Available methods:\n'+
    treeDiagram+'\n'+
    '\n'+
    '\n'+
    ' Example usage:\n'+
    '   '+example1+'\n'+
    '   '+example2+'\n'+
    '\n'+
    ' More info:\n'+
    '   https://npmjs.com/package/'+OUR_PACKAGE_JSON.name+'\n'+
    '-------------------------------------------------------\n';
  };//ƒ
};
