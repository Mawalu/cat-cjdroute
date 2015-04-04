var hosts = require('../index').hosts,
  peers = require('../index').peers,
  async = require('async'),
  crypto = require('crypto'),
  should = require('should'),
  connection;

var toggleOnline = function(node, online, callback) {
  describe('Hosts', function() {
    describe('statusCallback', function() {
      it('should get called with the new online status', function(done) {
        node.cjdnsIp.should.equal(options.cjdnsIp);
        online.should.be.true;
        done();
        callback(null);
      });
    });
  });
};

var options = {
  cjdnsIp: process.env.CJDNS_IP,
  adminIp: process.env.ADMIN_IP,
  adminPort: process.env.ADMIN_PORT,
  adminPassword: process.env.ADMIN_PASSWORD
};

var testUser = {
  user: crypto.randomBytes(8).toString('hex'),
  password: crypto.randomBytes(16).toString('hex')
};

describe('Peers', function() {

  async.series([
      function(callback) {
        describe('#connect', function() {
          it('should connect to a cjdrouter admin api', function(done) {
            hosts.connect(options, toggleOnline, function(err, node) {
              connection = node.admin;
              done(err);
              callback(null);
            });
          });
        });
      },
      function(callback) {
        describe('#addInboundPeer', function() {
          it('should add the peer without error', function(done) {
            peers.addInboundPeer(connection, testUser, function(err) {
              done(err);
              callback(null);
            });
          });
        });
      },
      function(callback) {
        describe('#listPeers', function() {
          it('should return a list including the testUser', function(done) {
            peers.listPeers(connection, function(err, peers) {
              peers.should.containEql(testUser.user);
              done(err);
              callback(null);
            });
          });
        });
      },
      function(callback) {
        describe('#removeInboundPeer', function() {
          it('should remove the peer without error', function(done) {
            peers.removeInboundPeer(connection, testUser.user, function(err) {
              done(err);
              callback(null);
            });
          });
        });
      },
      function(callback) {
        describe('#listPeers', function() {
          it('should retunr a list not including the testUser', function(done) {
            peers.listPeers(connection, function(err, peers) {
              peers.should.not.containEql(testUser.user);
              done(err);
              callback(null);
            });
          });
        });
      }
    ],
    function(err) {
      if (err) throw err;
    });
});
