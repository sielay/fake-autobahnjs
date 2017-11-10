"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Server = /** @class */ (function () {
    function Server() {
        this.realms = {};
        this.rpcs = {};
    }
    Server.prototype.reset = function () {
        this.realms = {};
        this.rpcs = {};
    };
    Server.prototype.subscribe = function (subscription) {
        var realmName = subscription.session.realm;
        this.realms[realmName] = this.realms[realmName] || {
            topics: {}
        };
        var realm = this.realms[realmName];
        var topicName = subscription.topic;
        realm.topics[topicName] = realm.topics[topicName] || [];
        realm.topics[topicName].push(subscription.handler);
    };
    Server.prototype.clientCall = function (procedure, args) {
        if (this.rpcs[procedure]) {
            this.rpcs[procedure].forEach(function (h) { return h(args); });
        }
    };
    Server.prototype.call = function (realmName, topicName, data) {
        var realm = this.realms[realmName];
        if (realm) {
            var topic = realm.topics[topicName];
            if (topic) {
                topic.forEach(function (h) { return h([data]); });
            }
        }
    };
    Server.prototype.onCall = function (procedure, fn) {
        this.rpcs[procedure] = this.rpcs[procedure] || [];
        this.rpcs[procedure].push(fn);
    };
    return Server;
}());
exports.Server = Server;
exports.server = new Server();
