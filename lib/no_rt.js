'use strict';

const Transform = require('stream').Transform;

class NoRetweets extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    if (Buffer.isBuffer(chunk)) {
      chunk = chunk.toString('utf-8');
    }

    if (chunk.startsWith('RT') || chunk.startsWith('@')) {
      callback(null, "");
      return;
    }

    callback(null, chunk);
  }
};

module.exports = NoRetweets;