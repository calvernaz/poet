var reds = require('reds');

module.exports = Indexer;
function Indexer () {
  this.search = reds.createSearch('blog-index', {
    host: process.env.REDIS_HOST
  })
}

Indexer.prototype.put = function (key, value)
{
  this.log('indexing', key);
  this.search.index(value, key);
}

Indexer.prototype.get = function (key, cb)
{
  this.search.query(key).end(cb);
}

Indexer.prototype.remove = function (key)
{
  this.search.remove(key);
}

Indexer.prototype.log = function(operation, msg)
{
  console.log('  \033[90m%s \033[36m%s\033[0m', operation, msg);
}
