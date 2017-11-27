module.exports = {


  friendlyName: 'Get avatar URL',


  description: 'Determine the source URL for the gravatar image belonging to a particular email address.',


  extendedDescription: 'This encrypts the provided email address and returns a properly formatted URL which points to an image on Gravatar.  This can then be used as the `src` in an `<img>` tag, etc.',


  moreInfoUrl: 'https://en.gravatar.com/site/implement',


  sync: true,


  sideEffects: 'cacheable',


  inputs: {

    emailAddress: {
      example: 'tom@github.com',
      description: 'The email address associated with the desired avatar image.',
      required: true
    },

    gravatarSize: {
      type: 'number',
      isInteger: true,
      min: 1,
      defaultsTo: 80,
      description: 'The desired height and width of the avatar image in pixels (between 1 and 2048).',
      extendedDescription:
      'By default, images are presented at 80px by 80px.  Otherwise, if a particular size is supplied, '+
      'it is used for both the height and the width (since Gravatar images are square.)',
      moreInfoUrl: 'https://en.gravatar.com/site/implement/images/#size'
    },

    defaultImage: {
      type: 'string',
      example: 'https://example.com/images/avatar.jpg',
      description: 'The backup image to use in case this email address has no matching avatar.',
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
      '• "robohash": robot cartoons\n'+
      '• "blank": a transparent PNG image (border added to HTML below for demonstration purposes)\n'+
      '\n'+
      'If an image URL is provided, it:\n'+
      '• MUST be publicly available (e.g. cannot be on an intranet, on a local development machine, behind HTTP Auth or some other firewall etc). Default images are passed through a security scan to avoid malicious content.\n'+
      '• MUST be accessible via HTTP or HTTPS on the standard ports, 80 and 443, respectively.\n'+
      '• MUST have a recognizable image extension (jpg, jpeg, gif, png)\n'+
      '• MUST NOT include a querystring (if it does, it will be ignored)',
      moreInfoUrl: 'https://en.gravatar.com/site/implement/images/#default-image',
      defaultsTo: 'identicon',
      custom: function(defaultImage){
        switch (defaultImage) {
          case '404':
          case 'mm':
          case 'identicon':
          case 'monsterid':
          case 'wavatar':
          case 'retro':
          case 'robohash':
          case 'blank':
            return true;
          default:
            return typeof defaultImage === 'string' && defaultImage.match(/(\.jpg|\.jpeg|\.gif|\.png)$/);
        }
      }
    },

    rating: {
      description: 'The most extreme rating level to consider "appropriate" for your audience ("G", "PG", "R", or "X".)',
      extendedDescription: 'By default, only G-rated images are displayed, since they are suitable for display on all websites with any audience type.  However, bear in mind that ratings are self-identified by users uploading images, and are based on whether they may contain rude gestures, illegal drugs, provacative dress, nudity, sexual imagery, or violence.',
      isIn: ['G','PG', 'R', 'X'],
      defaultsTo: 'G',
      moreInfoUrl: 'https://en.gravatar.com/site/implement/images/#rating'
    },

    useHttps: {
      type: 'boolean',
      description: 'Whether to build a secure avatar URL ("https://".)',
      extendedDescription: 'If `false` is explicitly specified, the resulting avatar source URL will start with "http://".  Otherwise it defaults to "https://", because that\'s the better choice 99.9% of the time.',
      defaultsTo: true
    }

  },

  exits: {

    success: {
      outputFriendlyName: 'Avatar source URL',
      outputDescription: 'The source URL of the avatar image, or a reasonable fallback. (e.g. for `<img src="…"/>`)',
      outputType: 'string',
      outputExample: 'https://www.gravatar.com/avatar/8b2bc8f26fdc417d40e4316f216da1b2?s=200&d=identicon&rating=g',
      extendedDescription: 'You can double-check a particular URL by visiting e.g. `https://en.gravatar.com/site/check/tom@github.com`.',
    }

  },


  fn: function(inputs, exits) {

    // Import Node.js core packages
    var crypto = require('crypto');
    var qs = require('querystring');

    // Format the querystring parameters into a nice little querystring
    // that will be sent to Gravatar's API servers.
    // > (Remember: If we include keys with undefined values, we'll
    // > confuse `qs.stringify`!  Be sure any undefined props are just
    // > completely absent.  Right now, all of the above qs params are
    // > guaranteed not to be `undefined`, so we're good-- but if that
    // > changes, be sure to also update this code to strip undefined
    // > keys first!)
    var formattedQsParams;
    try {
      formattedQsParams = qs.stringify({
        s: inputs.gravatarSize,
        d: inputs.defaultImage,
        rating: inputs.rating.toLowerCase()
      });
    } catch (err){
      throw new Error(
        'Could not format Gravatar-friendly querystring parameters from the ' +
        'provided data.  Please try again with different data.\n' +
        'Error details: '+err.message+'\n' +
        ' [?] If you\'re unsure, come by https://sailsjs.com/support'
      );
    }

    // Build the Gravatar hash from the provided email address.
    // > see https://en.gravatar.com/site/implement/hash
    var gravatarHash = crypto.createHash('md5')
    .update(inputs.emailAddress.toLowerCase().trim())
    .digest('hex');

    // Determine the final URL by slapping it all together and prepending
    // the desired protocol.
    var avatarSrcUrl = (
      (inputs.useHttps ? 'https://' : 'http://') +
      'www.gravatar.com/avatar/'+gravatarHash +
      '?' + formattedQsParams
    );

    // Return the final URL through the `success` exit.
    return exits.success(avatarSrcUrl);

  }


};
