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
      example: 'l0lcatzz',
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
      outputExample: '2$a492.abc3fadifhoi3hesdqd',
      outputDescription: 'The (irreversibly encrypted) password hash generated from the provided password.'
    },

  },


  fn: function(inputs, exits) {

    // Import pure js `bcrypt` module.
    var bcrypt = require('bcryptjs');

    // Hash the plaintext password.
    bcrypt.hash(inputs.password, inputs.strength, function(err, hash) {

      // Forward any errors to our `error` exit.
      if (err) {
        return exits.error(err);
      }

      // Return the hashed password through the `success` exit.
      return exits.success(hash);

    });

  }

};
