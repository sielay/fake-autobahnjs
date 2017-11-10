"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WPromiseFactory = require("when");
var server_1 = require("./server");
var Session = /** @class */ (function () {
    // constructor(transport: ITransport, defer: DeferFactory, challenge: OnChallengeHandler);
    function Session() {
    }
    Session.prototype.join = function (realm, authmethods, authid) {
        // TBD
    };
    Session.prototype.leave = function (reason, message) {
        // TBD
    };
    Session.prototype.call = function (procedure, args, kwargs, options) {
        server_1.server.clientCall(procedure, args);
    };
    Session.prototype.publish = function (topic, args, kwargs, options) {
        return null;
    };
    Session.prototype.subscribe = function (topic, handler, options) {
        var ref = this;
        var subscription = {
            topic: topic,
            handler: handler,
            options: options,
            session: ref,
            id: Date.now() + Math.round(Math.random() * 100000),
            active: true,
            unsubscribe: function () { return ref.unsubscribe(subscription); },
        };
        server_1.server.subscribe(subscription);
        return WPromiseFactory(subscription);
    };
    Session.prototype.register = function (procedure, endpoint, options) {
        return null;
    };
    Session.prototype.unsubscribe = function (subscription) {
        return null;
    };
    Session.prototype.unregister = function (registration) {
        return null;
    };
    Session.prototype.prefix = function (prefix, uri) {
        // TBD
    };
    Session.prototype.resolve = function (curie) {
        return null;
    };
    Session.prototype.onjoin = function (roleFeatures) {
        // TBD
    };
    Session.prototype.onleave = function (reason, details) {
        // TBD
    };
    return Session;
}());
exports.Session = Session;
