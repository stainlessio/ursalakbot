'use strict';

const Transform = require('stream').Transform;

class NoReplies extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    if (Buffer.isBuffer(chunk)) {
      chunk = chunk.toString('utf-8');
    }

    if (chunk.indexOf('@') < 0) {
      callback(null, "");
      return;
    }

    callback(null, chunk);
  }
};

module.exports = NoReplies;
