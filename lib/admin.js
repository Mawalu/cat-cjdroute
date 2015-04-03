
module.exports = {

  /**
   * Call a cjdns admin function and call a callback
   *
   * @param {Object}    connection
   * @param {String}    method
   * @param {Functio}   callback
   */
  makeAdminCall: function(connection, method, callback) {
    var channel = connection[method]();
    connection.on(channel, callback);
  }

}
