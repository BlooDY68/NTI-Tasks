const jwt = require('jsonwebtoken');

/**
 * Educational Callout (Session 10 & JWT Concept):
 * JSON Web Tokens (JWT) consist of Header, Payload, and Signature.
 * They allow stateless authentication by encoding user identity and permissions inside a cryptographically signed string.
 */
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

module.exports = generateToken;
