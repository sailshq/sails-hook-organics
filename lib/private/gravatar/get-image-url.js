module.exports = {

  friendlyName: 'Get image URL',


  description: 'Build the URL of a gravatar image for a particular email address.',


  extendedDescription: 'This encrypts the provided email address and returns a properly formatted URL which points to an image on Gravatar.  This can then be used as the `src` in an `<img>` tag, etc.',


  moreInfoUrl: 'https://en.gravatar.com/site/implement/',


  sync: true,


  sideEffects: 'cacheable',


  inputs: {

    emailAddress: {
      example: 'john@doe-enterprises.com',
      description: 'The email address of the desired gravatar image.',
      required: true
    },

    gravatarSize: {
      example: 400,
      description: 'The desired height and width of the gravatar image in pixels (between 1 and 2048).',
      extendedDescription:
      'By default, images are presented at 80px by 80px.  Otherwise, if a particular size is supplied, '+
      'it is used for both the height and the width (since Gravatar images are square.)',
      moreInfoUrl: 'https://en.gravatar.com/site/implement/images/#size'
    },

    defaultImage: {
      example: 'http://example.com/images/avatar.jpg',
      description: 'The image to use if a gravatar cannot be found.',
      extendedDescription:
      'This can be either an image URL, or one of a few different special keywords.\n'+
      '\n'+
      'The following keywords are supported:\n'+
      '• "404": do not load any image if none is associated with the email hash, instead return an HTTP 404 (File Not Found) response\n'+
      '• "mm": (mystery-man) a simple, cartoon-style silhouetted outline of a person (does not vary by email hash)\n'+
      '• "identicon": a geometric pattern based on an email hash\n'+
      '• "monsterid": a generated monster with different colors, faces, etc\n'+
      '• "wavatar": generated faces with differing features and backgrounds\n'+
      '• "retro": awesome generated, 8-bit arcade-style pixelated faces\n'+
      '• "blank": a transparent PNG image (border added to HTML below for demonstration purposes)\n'+
      '\n'+
      'If an image URL is provided, it:\n'+
      '• MUST be publicly available (e.g. cannot be on an intranet, on a local development machine, behind HTTP Auth or some other firewall etc). Default images are passed through a security scan to avoid malicious content.\n'+
      '• MUST be accessible via HTTP or HTTPS on the standard ports, 80 and 443, respectively.\n'+
      '• MUST have a recognizable image extension (jpg, jpeg, gif, png)\n'+
      '• MUST NOT include a querystring (if it does, it will be ignored)',
      moreInfoUrl: 'https://en.gravatar.com/site/implement/images/#default-image'
    },

    rating: {
      example: 'g',
      description: 'The rating level that\'s acceptable for the gravatar image ("G", "PG", "R", etc.)',
      moreInfoUrl: 'https://en.gravatar.com/site/implement/images/#rating'
    },

    useHttps: {
      example: true,
      defaultsTo: true,
      description: 'Whether to build a secure URL ("https://".)  If `false` is specified, the resulting gravatar URL will start with "http://".'
    }

  },

  exits: {

    success: {
      outputFriendlyName: 'Gravatar URL',
      outputDescription: 'The URL that can be used to display a gravatar.',
      outputExample: 'http://www.gravatar.com/avatar/f23423d234038345345sf84f7023421'
    }

  },


  fn: function(inputs, exits) {
    var Crypto = require('crypto');
    var qs = require('querystring');
    var _ = require('@sailshq/lodash');


    // Build querystring parameters for the Gravatar URL.
    //
    // (The _.pick() is to strip out any keys which don't have a truthy value
    //  so as not to confuse `qs.stringify`.)
    var qsParams = _.pick({

      // "s" stands for gravatar "size"
      // (cast to string, if provided).
      s: !_.isUndefined(inputs.gravatarSize) ? inputs.gravatarSize+'' : undefined,

      // "d" stands for "default image".
      // This can be either an image URL, or one of a few different special keywords.
      //
      // The following keywords are supported:
      // • '404': do not load any image if none is associated with the email hash, instead return an HTTP 404 (File Not Found) response
      // • 'mm': (mystery-man) a simple, cartoon-style silhouetted outline of a person (does not vary by email hash)
      // • 'identicon': a geometric pattern based on an email hash
      // • 'monsterid': a generated 'monster' with different colors, faces, etc
      // • 'wavatar': generated faces with differing features and backgrounds
      // • 'retro': awesome generated, 8-bit arcade-style pixelated faces
      // • 'blank': a transparent PNG image (border added to HTML below for demonstration purposes)
      //
      // If an image URL is provided, it:
      // • MUST be publicly available (e.g. cannot be on an intranet, on a local development machine, behind HTTP Auth or some other firewall etc). Default images are passed through a security scan to avoid malicious content.
      // • MUST be accessible via HTTP or HTTPS on the standard ports, 80 and 443, respectively.
      // • MUST have a recognizable image extension (jpg, jpeg, gif, png)
      // • MUST NOT include a querystring (if it does, it will be ignored)
      //
      // See https://en.gravatar.com/site/implement/images/#default-image for more info.
      d: !_.isUndefined(inputs.defaultImage) ? inputs.defaultImage : undefined,

      // "f" stands for "force default image".
      // Set up the "y" that Gravatar expects to indicate we're "forcing" the default image.
      // e.g. `f: inputs.forceDefaultImage ? 'y' : undefined`
      // --
      // Removed support for `f` (or "forceDefaultImage")
      // if this is important for some reason, it can be brought back.
      // However it seems more confusing than anything else.
      // --

      // "rating" refers to "G", "PG", "R", "X", etc.
      rating: inputs.rating || undefined
    }, function _isTruthy(val) { return !!val; });


    // Stringify the querystring parameters that will be sent to gravatar.
    var stringifiedQsParams;
    try {
      stringifiedQsParams = qs.stringify(qsParams);
    }
    catch (e){
      // If encoding fails, there's something wrong with the inputs, so return through the `error` exit.
      // through the `error` exit.
      return exits.error(new Error('Could not encode/stringify query parameters for the Gravatar URL.'));
    }

    // Build the gravatar hash from the provided email address and compute the base url.
    var gravatarHash = Crypto.createHash('md5').update(inputs.emailAddress.replace(/\s/,'').toLowerCase().trim()).digest('hex');
    var gravatarBaseUrl = 'www.gravatar.com/avatar/' + gravatarHash + '?' + stringifiedQsParams;

    // Determine the final URL by prepending the desired protocol.
    var finalUrl = inputs.useHttps ? 'https://'+gravatarBaseUrl : 'http://'+gravatarBaseUrl;

    // Return the final URL through the `success` exit.
    return exits.success(finalUrl);

  }

};
