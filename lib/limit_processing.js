'use strict';

const Transform = require('stream').Transform;
const Random = require('random-js');
const random = new Random(Random.engines.mt19937().autoSeed());

class LimitRequests extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    if (Buffer.isBuffer(chunk)) {
      chunk = chunk.toString('utf-8');
    }

    if (random.bool(process.env.FREQUENCY, 100)) {
      callback(null, chunk);
    } else {
      if (process.env.SHOW_DROPPED === 'true') {
        console.log(`Dropping ${chunk}`);
      }
      callback(null, "");
    }
  }
};

module.exports = LimitRequests;