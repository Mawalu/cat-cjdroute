var utils = require('./utils');

module.exports = {

  /**
   * Connection to a cjdrouter and return a node object
   *
   * @param {Object}    options
   * @param {Function}  statusCallback
   * @param {Function}  callback
   */
  connect: function(options, statusCallback, callback) {
    var node = {
      cjdnsIp: options.cjdnsIp,
      admin: require('cjdns-admin').Admin({
        ip: options.adminIp,
        port: options.adminPort,
        password: options.adminPassword
      }),
      online: false,
      lastPong: new Date()
    };

    node.timer = setInterval(function(node) {
      var online;

      if (new Date().getTime() - node.lastPong.getTime() <= 20000) {
        online = true;
      } else {
        online = false;
      }

      if (online != node.online) {
        statusCallback(node, online);
        node.online = online;
      }

      utils.makeAdminCall(node.admin, 'ping', function(err, respons) {
        if (respons.q == 'pong') {
          node.lastPong = new Date();
        }
      });

    }, 10000, node);

    callback(null, node);
  }
};
