var utils = require('./utils');

module.exports = {
  /**
   * Add a new inbound peer to a cjdroute node
   *
   * @param {Object}    node
   * @param {Object}    credentials
   * @param {Function}  callback
   */
  addInboundPeer: function(node, credentials, callback) {
    
  },

  /**
   * Remove credentials for inbound peer
   *
   * @param {Object}    node
   * @param {String}    name
   * @param {Function}  callback
   */
  removeInboundPeer: function(node, name, callback) {

  },

  /**
   * Add new outbound peer / connection
   *
   * @param {Object}    node
   * @param {Object}    credentials
   * @param {Function}  Callback
   */
  addOutboundPeer: function(node, credentials, callback) {

  },

  /**
   * Disconnect from outbound peer / connectoin
   *
   * @param {Object}    node
   * @param {String}    address
   * @param {Function}  callback
   */
  removeOutboundPeer: function(node, credentails, callback) {

  }
}
