'use strict';

const Transform = require('stream').Transform;
const mstranslator = require('mstranslator');

const translator = new mstranslator({
  client_id: process.env.TRANSLATE_CLIENT_ID,
  client_secret: process.env.TRANSLATE_CLIENT_SECRET
}, true);

class Translator extends Transform {
  constructor(from_lang, to_lang, options) {
    super(options);
    this.from_lang = from_lang;
    this.to_lang = to_lang;
  }

  _transform(chunk, encoding, callback) {
    if (Buffer.isBuffer(chunk)) {
      chunk = chunk.toString('utf-8');
    }

    translator.translate({
      text: chunk,
      from: this.from_lang,
      to: this.to_lang
    }, callback);
  }
};

module.exports = Translator;