
module.exports = {

  /**
   * Sync the cjdroute instances with the data from our database
   *
   * This gets called every time a connection is add / removed / modified
   *
   * @param {Function}  callback
   */
  syncAuthorizedPasswords: function(callback) {
    Host.find({adapter: 'cjdroute'}).populateAll().exec(function(err,result) {
      if(err) throw err;
      async.each(result, function(host, cb) {
        async.parallel([
          function(callback) {
            cjdroute.callAdminWithCallback(cjdroute.connections[host.cjdnsIp].admin,
                'AuthorizedPasswords_list',
                function(res) {
                    sails.log.info(res);
                    cb(null, res);
                });
          },
          function(callback) {
            Connections.find({node: host.id, status: {'not': 'disabled'}}).exec(function(err,result) {
              if(err) return callback(err);
              callback(null, result);
            });
          }
        ], function(err, result) {
          if(err) return callback(err);
          async,parallel([
            function(callback) {
              async.each(result[0], function(credentials, callback) {
                if(!_.contains(result[1], credentials)) {
                  cjdrtoue.callAdminWithCallback(cjdrtoue.connections[host.cjdnsIp].admin,
                  'AuthorizedPasswords_remove',
                  function(res) {
                    sails.log.verbose(res);
                    callback(null, res);
                  });
                }
              });
        });
      }, function(err) {
        if(err) callback(err);
        callback(null);
      });
    });
  }
}
