"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var session_1 = require("./session");
var Connection = /** @class */ (function () {
    function Connection(options) {
        this.isConnected = false;
        this.onOpen = function (session, details) { };
        this.onClose = function (reason, message) { };
        options = options || {};
        this.url = options.url;
        this.realm = options.realm;
    }
    Object.defineProperty(Connection.prototype, "onopen", {
        get: function () {
            return this.onOpen;
        },
        set: function (fn) {
            this.onOpen = fn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Connection.prototype, "onclose", {
        get: function () {
            return this.onClose;
        },
        set: function (fn) {
            this.onClose = fn;
        },
        enumerable: true,
        configurable: true
    });
    Connection.prototype.open = function () {
        var session = new session_1.Session();
        session.realm = this.realm;
        this.isConnected = true;
        if (this.onOpen) {
            this.onOpen(session, null);
        }
    };
    Connection.prototype.close = function (reason, message) {
        this.isConnected = false;
        if (this.onClose) {
            this.onClose(reason, message);
        }
    };
    return Connection;
}());
exports.Connection = Connection;
