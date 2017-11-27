module.exports = {


  friendlyName: 'Hash password',
  // (Branched from https://github.com/mikermcneil/machinepack-passwords/tree/62511d566ffc23ff7a7103fbde5a6a2ba55f97e5/lib)


  description: 'Hash a password (i.e. one-way encryption) using the BCrypt algorithm.',


  extendedDescription: 'The BCrypt algorithm is _one-way_-- in other words, passwords encrypted (aka "hashed") this way '+
  '_cannot be decrypted_.  This is ideal for encrypting user passwords before storing them in the database, for example '+
  'when a new user signs up for an account.  To _check_ a password attempt, for example when an existing user tries to '+
  'sign in, use **Check password**.',


  moreInfoUrl: 'https://en.wikipedia.org/wiki/Bcrypt',


  sideEffects: 'cacheable',


  inputs: {

    password: {
      type: 'string',
      description: 'The password to hash (in plain text).',
      example: 'k3yboard.cAt',
      required: true,
    },

    strength: {
      type: 'number',
      description: 'The hash strength.',
      example: 12,
      extendedDescription: 'Strength is measured in this case by the number of iterations it takes to generate the cryptographic key.  Hashes generated with a higher "strength" value will take longer to crack with brute force, but will also take longer to generate.  A minimum of 10 (the default) is recommended.',
      moreInfoUrl: 'https://en.wikipedia.org/wiki/Bcrypt',
      defaultsTo: 10
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Hashed password',
      outputExample: '$2a$10$VC.etVpgnfYrUt5/TW4ktOy91yv/gWC6c.XXeK7jx69ukP/4Ocgj2',
      outputDescription: 'The (irreversibly munged) password hash generated from the provided password.',
      extendedDescription:
      'Secure BCrypt hashes are already irreversibly munged, so they\'re safe to store at rest '+
      'in your database.'
    },

  },


  fn: function(inputs, exits) {

    // Import pure js `bcrypt` module.
    var bcrypt = require('bcryptjs');

    // Hash the plaintext password.
    // (https://www.npmjs.com/package/bcryptjs)
    bcrypt.hash(inputs.password, inputs.strength, function(err, hashed) {

      // Forward any errors to our `error` exit.
      if (err) {
        return exits.error(err);
      }

      // Return the hashed password through the `success` exit.
      return exits.success(hashed);

    });//_∏_

  }

};
