
module.exports = {

  /**
   * Call a cjdns admin function
   *
   * @param {Object}    cjdns-admin connection
   * @param {String}    method
   * @param {Functio}   callback
   */
  makeAdminCall: function(connection, method, callback) {
    var channel = connection[method]();
    connection.on(channel, callback);
  }

}
