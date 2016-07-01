var twitter = require('./twitter');
var input_stream = twitter.read();
var poster = twitter.post;
var sentiment = require('sentiment');
var Translate = require('./translate');
var Readable = require('stream').Readable;
var limit = require('./limit_processing');
var filterRetweets = require('./no_rt');
var filterTags = require('./no_tags');
var filterLinks = require('./drop_links');

var bridgeToStream = new Readable({read: function(size) {}});
var enToFr = new Translate('en', 'fr');
var frToEs = new Translate('fr', 'es');
var esToDe = new Translate('es', 'de');
var deToIt = new Translate('de', 'it');
var itToEn = new Translate('it', 'en');

module.exports = function () {
  input_stream.on('data', (tweet) => {
    if (!tweet.media_url) {
      bridgeToStream.push(tweet.text);
      // var score = sentiment(tweet.text);
      // if (score < 0) {
      //   input_stream.emit('anti', tweet.text);
      // } else {
      //   input_stream.emit('pro', tweet.text);
      // }
    }
  });

  input_stream.on(process.env.TWEET_TYPE, (text) => {
    bridgeToStream.push(text);
  });

  bridgeToStream
    .pipe(new filterRetweets())
    .pipe(new filterTags())
    .pipe(new filterLinks())
    .pipe(new limit())
    .pipe(enToFr).pipe(frToEs).pipe(esToDe).pipe(deToIt).pipe(itToEn)
    .pipe(poster);
};
