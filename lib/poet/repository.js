'use strict'

var redis = require("redis"),
    client = redis.createClient({
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379
    });

module.exports = Repository;
function Repository() {}

Repository.prototype.findOne = function (slug, cb) {
  client.hget("blog-title:"+slug, "counter", (err, obj) => {
    cb(err, obj)
  })
}

Repository.prototype.add = function (slug, cb) {
  client.hmset("blog-title:"+slug, ["counter", 0, "date", Date.now()]);
}

Repository.prototype.increment = function (slug) {
  client.hincrby("blog-title:"+slug, "counter", 1);
}

Repository.prototype.keys = function(cb) {
  client.keys("blog-title:*", (err, replies) => {
    return cb(err, replies);
  });
}
