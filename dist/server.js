"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var debug = require("debug");
var l = debug("fake-autobahnjs - server");
var Server = /** @class */ (function () {
    function Server() {
        this.realms = {};
        this.rpcs = {};
    }
    Server.prototype.reset = function () {
        l("reset");
        this.realms = {};
        this.rpcs = {};
    };
    Server.prototype.subscribe = function (subscription) {
        l("subscribe", subscription.topic);
        var realmName = subscription.session.realm;
        this.realms[realmName] = this.realms[realmName] || {
            topics: {}
        };
        var realm = this.realms[realmName];
        var topicName = subscription.topic;
        realm.topics[topicName] = realm.topics[topicName] || [];
        realm.topics[topicName].push(subscription.handler);
    };
    Server.prototype.unsubscribe = function (subscription) {
        l("unsubscribe", subscription.topic);
        var realmName = subscription.session.realm;
        if (!this.realms[realmName]) {
            return;
        }
        var realm = this.realms[realmName];
        var topicName = subscription.topic;
        if (!realm.topics[topicName]) {
            return;
        }
        var index = realm.topics[topicName].indexOf(subscription.handler);
        if (index !== -1) {
            realm.topics[topicName].splice(index, 1);
        }
    };
    Server.prototype.clientCall = function (procedure, args) {
        l("client call", procedure);
        if (this.rpcs[procedure]) {
            this.rpcs[procedure].forEach(function (h) { return h(args); });
        }
    };
    Server.prototype.call = function (realmName, topicName, data) {
        l("call", realmName, topicName);
        var realm = this.realms[realmName];
        if (realm) {
            var topic = realm.topics[topicName];
            if (topic) {
                topic.forEach(function (h) { return h([data]); });
            }
        }
    };
    Server.prototype.onCall = function (procedure, fn) {
        l("on rpc call", procedure);
        this.rpcs[procedure] = this.rpcs[procedure] || [];
        this.rpcs[procedure].push(fn);
    };
    return Server;
}());
exports.Server = Server;
exports.server = new Server();
