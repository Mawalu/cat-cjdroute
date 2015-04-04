var utils = require('./utils');

module.exports = {

  /*
   * List all peers
   *
   * @param {Object}    adminConnection
   * @param {Function}  callback
   */
  listPeers: function(adminConnection, callback) {
    utils.makeAdminCall(adminConnection,
      'AuthorizedPasswords_list',
      function(err, data) {
        if (err) return callback(err);
        callback(null, data.users);
      });
  },

  /**
   * Add a new inbound peer
   *
   * @param {Object}    adminConnection
   * @param {Object}    credentials
   * @param {Function}  callback
   */
  addInboundPeer: function(adminConnection, credentials, callback) {
    utils.makeAdminCall(adminConnection,
      'AuthorizedPasswords_add', {
        password: credentials.password,
        user: credentials.user,
      },
      function(err, data) {
        if (err) return callback(err);
        callback(null, data);
      });
  },

  /**
   * Remove credentials for inbound peer
   *
   * @param {Object}    adminConnection
   * @param {String}    name
   * @param {Function}  callback
   */

  /**
   * WARNING:
   * We only remove the credentials of the specified peer. We do not terminate any connections
   */
  removeInboundPeer: function(adminConnection, name, callback) {
    utils.makeAdminCall(adminConnection,
      'AuthorizedPasswords_remove', {
        user: name
      },
      function(err, data) {
        if (err) return callback(err);
        callback(null, data);
      });
  },

  /**
   * Add new outbound peer / connection
   *
   * @param {Object}    adminConnection
   * @param {Object}    credentials
   * @param {Function}  Callback
   */
  addOutboundPeer: function(adminConnection, credentials, callback) {
    utils.makeAdminCall(adminConnection,
      'UDPInterface_beginConnection', {
        address: credentials.address,
        password: credentials.password,
        publicKey: credentials.publicKey
      },
      function(err, data) {
        if (err) return callback(err);
        callback(null, data);
      });
  },

  /**
   * Disconnect from outbound peer / connectoin
   *
   * @param {Object}    adminConnection
   * @param {String}    pubkey
   * @param {Function}  callback
   */
  removeOutboundPeer: function(adminConnection, pubkey, callback) {
    utils.makeAdminCall(adminConnection,
      'InterfaceController_disconnectPeer', {
        pubkey: pubkey
      },
      function(err, data) {
        if (err) return callback(err);
        callback(null, data);
      });
  }
};
