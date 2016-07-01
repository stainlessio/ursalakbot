'use strict';

const Transform = require('stream').Transform;



class NoTags extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    if (Buffer.isBuffer(chunk)) {
      chunk = chunk.toString('utf-8');
    }

    if (chunk.split('#').length > 4) {
      if (process.env.SHOW_DROPPED) {
        console.log(`Filtering for too many tags ${chunk}`);
      }
      callback(null, chunk);
    } else {
      callback(null, "");
    }
  }
};

module.exports = NoTags;