'use strict';

const Transform = require('stream').Transform;



class DropLinks extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    if (Buffer.isBuffer(chunk)) {
      chunk = chunk.toString('utf-8');
    }

    if (chunk.match(/http(s)?:\/\//i) && !chunk.match(/t\.co/i)) {
      if (process.env.SHOW_DROPPED) {
        console.log(`Filtering for link ${chunk}`);
      }
      callback(null, "");
    } else {
      callback(null, chunk);
    }
  }
};

module.exports = DropLinks;