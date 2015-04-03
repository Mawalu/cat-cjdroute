
module.exports = {

  /**
   * Call a cjdns admin function
   *
   * @param {Object}    cjdns-admin connection
   * @param {String}    method
   * @param {Object}    options (optional)
   * @param {Functio}   callback
   */
  makeAdminCall: function(connection, method, options, callback) {
    if(typeof options == 'function') {
      var callback = options;
      var options = {};
    }

    var channel = connection[method](options);
    connection.on(channel, function(res) {
      callback(res.errors, res,data);
    });
  }

}
