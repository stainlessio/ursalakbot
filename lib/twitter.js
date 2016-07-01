var Twitter = require('twitter');
var Writable = require('stream').Writable;



var client = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token_key: process.env.TWITTER_TOKEN,
  access_token_secret: process.env.TWITTER_TOKEN_SECRET
});

module.exports = {
  read: function () {
    return client.stream('statuses/filter', {
      track: process.env.TWITTER_KEYWORD
    })
  },
  post: new Writable({
    write(chunk, encoding, callback) {
      if (Buffer.isBuffer(chunk)) {
        chunk = chunk.toString('utf-8');
      }

      client.post('statuses/update', {status: chunk}, function(err, tweet) {
        if (!err) {
          console.log(`posted: ${chunk}`);
        }
        callback(null, "");
      });
    }
  })
};
