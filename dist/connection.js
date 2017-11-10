"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var session_1 = require("./session");
var debug = require("debug");
var l = debug("fake-autobahnjs - connection");
var Connection = /** @class */ (function () {
    function Connection(options) {
        this.isConnected = false;
        this.onOpen = function (session, details) { };
        this.onClose = function (reason, message) { };
        l("construct");
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
        l("open");
        var that = this;
        setTimeout(function () {
            l("opening");
            var session = new session_1.Session();
            session.realm = that.realm;
            that.isConnected = true;
            if (that.onOpen) {
                that.onOpen(session, null);
            }
            l("opened");
        }, 10);
    };
    Connection.prototype.close = function (reason, message) {
        l("close");
        var that = this;
        setTimeout(function () {
            l("closing");
            that.isConnected = false;
            if (that.onClose) {
                that.onClose(reason, message);
            }
            l("closed");
        }, 10);
    };
    return Connection;
}());
exports.Connection = Connection;
