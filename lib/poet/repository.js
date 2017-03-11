'use strict'

var redis = require("redis");

module.exports = Repository;
function Repository() {
  this.client = redis.createClient({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST
  });
}

Repository.prototype.findOne = function (slug, cb) {
  this.client.hget("blog-title:"+slug, "counter", function(err, obj) {
    return cb(err, obj)
  });
}

Repository.prototype.add = function (slug, cb) {
  this.client.hmset("blog-title:"+slug, ["counter", 0, "date", Date.now()]);
}

Repository.prototype.increment = function (slug) {
  this.client.hincrby("blog-title:"+slug, "counter", 1);
}

Repository.prototype.keys = function(cb) {
  this.client.keys("blog-title:*", function(err, replies) {
    return cb(err, replies);
  });
}
