module.exports = {


  friendlyName: 'Check password attempt',
  // (Branched from https://github.com/mikermcneil/machinepack-passwords/tree/62511d566ffc23ff7a7103fbde5a6a2ba55f97e5/lib)


  description: 'Compare a plaintext password attempt against a Bcrypt hash (i.e. already-encrypted).',


  extendedDescription: 'Useful for checking a password attempt against the stored, already-encrypted BCrypt hash, '+
  'e.g. stored in your database.',


  sideEffects: 'cacheable',


  inputs: {

    passwordAttempt: {
      type: 'string',
      example: 'wh00ps.c4nt.rem3mb3r.my.k3yboard.cAt?',
      description: 'The new password attempt (unencrypted).',
      required: true,
    },

    hashedPassword: {
      type: 'string',
      example: '$2a$10$VC.etVpgnfYrUt5/TW4ktOy91yv/gWC6c.XXeK7jx69ukP/4Ocgj2',
      description: 'The existing, correct password hash to compare against.',
      whereToGet: {
        description: 'Look up the password hash stored for this user from your database.',
        extendedDescription: 'For example, when a user signs up, your route could use the "Hash password" machine '+
        'to perform one-way (irreversible) encryption on their password.  This uses the BCrypt algorithm to generate a '+
        'secure password hash, which you could then go on to include in a new record in your User model.  '+
        'This password hash is much safer to store in your database than a raw, unencrypted password would be.'
      },
      required: true,
    }

  },


  exits: {

    success: {
      description: 'Password attempt matched the already-encrypted version.'
    },

    incorrect: {
      description: 'Password attempt did not match already-encrypted version.'
    }

  },


  fn: function(inputs, exits) {

    // Import pure js `bcrypt` module.
    var bcrypt = require('bcryptjs');

    // Run `compare` to compare the plaintext password attempt vs. the
    // hashed (≈one-way encrypted) password.  (This does it in constant time,
    // using crypto magic that most folks don't care too enough to read more
    // about.  But if you do, check out https://www.npmjs.com/package/bcryptjs)
    bcrypt.compare(inputs.passwordAttempt, inputs.hashedPassword, function(err, ok) {

      // Forward any errors to our `error` exit.
      if (err) {
        return exits.error(err);
      }

      // If the passwords don't match, return through the `incorrect` exit.
      if (!ok) {
        return exits.incorrect();
      }

      // Otherwise return through the `success` exit.
      return exits.success();

    });//_∏_

  }

};
