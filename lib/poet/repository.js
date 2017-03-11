'use strict'

var redis = require("redis");

module.exports = Repository;
function Repository() {
  console.log('Connecting to ' + process.env.REDIS_HOST)
  this.client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  });
}

Repository.prototype.findOne = function (slug, cb) {
  this.client.hget("blog-title:"+slug, "counter", (err, obj) => {
    cb(err, obj)
  })
}

Repository.prototype.add = function (slug, cb) {
  this.client.hmset("blog-title:"+slug, ["counter", 0, "date", Date.now()]);
}

Repository.prototype.increment = function (slug) {
  this.client.hincrby("blog-title:"+slug, "counter", 1);
}

Repository.prototype.keys = function(cb) {
  this.client.keys("blog-title:*", (err, replies) => {
    return cb(err, replies);
  });
}
