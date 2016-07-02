'use strict';

const Transform = require('stream').Transform;

const DisallowedWords = [
  /savage/i,
  /nigger/i,
  /k[iy]ke/i,
  /fag/i,
  /towel.*head/i,
];

function _is_blocked_word(str, word) {
  return word.test(str);
}

class BlockWords extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    if (Buffer.isBuffer(chunk)) {
      chunk = chunk.toString('utf-8');
    }

    if (DisallowedWords.some((word) => {
      return _is_blocked_word(chunk, word);
    })) {
      callback(null, "");
      return;
    }

    callback(null, chunk);
  }
};

module.exports = BlockWords;
