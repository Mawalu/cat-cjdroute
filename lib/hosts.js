var utils = require('./utils');

module.exports = {

  /**
   * Set the online status for a cjdroute node
   *
   * @param {Object}    node
   * @param {Boolean}   online
   * @param {Function}  callback
   */
  setOnlineStatus: function(node, online, callback) {

  },

  /**
   * Connection to a cjdrouter and return a node object
   *
   * @param {Object}    options
   * @param {Function}  callback
   */
  connect: function(options, callback) {
    var node = {
      cjdnsIp: options.cjdnsIp,
      admin: require('cjdns-admin').Admin({
               ip: options.adminIp,
               port: options.adminPort,
               password: options.adminPassword
             }),
      timer: setInterval(function(connection) {
               var online;

               if(new Date().getTime() - connection.lastPong.getTime() <= 20000) {
                 online = true;
               } else {
                 online = false;
               }

               this.setOnlineStatus(connection, status, function(err, r){
                 if(err) throw err;
               });

               cjdroute.callAdminWithCallback(connection.admin, 'ping', function(respons) {
                 if(respons.data.q == 'pong') {
                   cjdroute.connections[cjdnsIp].lastPong = new Date();
                 }
               });

             }, 10000, connection),
      online: false,
      lastPong: new Date()
    };

    callback(null, node);
  }
};
