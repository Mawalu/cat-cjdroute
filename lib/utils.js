module.exports = {

  /**
   * Call a cjdns admin function
   *
   * @param {Object}    cjdns-admin connection
   * @param {String}    method
   * @param {Object}    options (optional)
   * @param {Function}  callback
   */
  makeAdminCall: function(connection, method, options, callback) {
    if (typeof options == 'function' && typeof callback == 'undefined') {
      callback = options;
      options = {};
    }

    var channel = connection[method](options);
    connection.on(channel, function(res) {
      if (res.errors.length > 0) {
        res.errors = new Error(res.errors[0]);
      } else if (res.data.error && res.data.error != 'none') {
        res.errors = new Error(res.data.error);
      } else {
        res.errors = null;
      }
      callback(res.errors, res.data);
    });
  }

};
