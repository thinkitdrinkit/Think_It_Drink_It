﻿//! Copyright (c) Microsoft Corporation. All rights reserved.
(function (n) {
    function require(n) {
        var i, r;
        if (n && n.length > 2 && n[0] == "." && n[1] == "/" && (n = n.slice(2)), i = t[n], typeof i == "function") return r = {}, t[n] = r, i(r), r;
        if (typeof i == "object") return i;
        throw "Unknown module " + n;
    }
    var t = {}, i = "1.0.10613.0";
    t.Resources = {}, t.Resources["en-US"] = {
        Validate_NotNullError: "{0} cannot be null.",
        Validate_NotNullOrEmptyError: "{0} cannot be null or empty.",
        Validate_TypeCheckError: "{0} is expected to be a value of type {1}, not {2}.",
        Validate_LengthUnexpected: "{0} is expected to have length {1}, not {2}.",
        Validate_InvalidUserParameter: "{0} contains an invalid user-defined query string parameter: {1}. User-defined query string parameters must not begin with a '$'.",
        Extensions_DefaultErrorMessage: "Unexpected failure.",
        Extensions_ConnectionFailureMessage: "Unexpected connection failure.",
        MobileServiceTable_ReadMismatchedQueryTables: "Cannot get the results of a query for table '{1}' via table '{0}'.",
        MobileServiceTable_InsertIdAlreadySet: "Cannot insert if the {0} member is already set.",
        MobileServiceLogin_AuthenticationProviderNotSupported: "Unsupported authentication provider name. Please specify one of {0}.",
        MobileServiceLogin_LoginErrorResponse: "Cannot start a login operation because login is already in progress.",
        MobileServiceLogin_InvalidResponseFormat: "Invalid format of the authentication response.",
        MobileServiceLogin_InvalidProvider: "The first parameter must be the name of the autentication provider or a Microsoft Account authentication token.",
        MobileServiceTable_NotSingleObject: "Could not get object from response {0}."
    }, t.MobileServiceClient = function (n) {
        function MobileServiceClient(n, t) {
            i.isString(n, "applicationUrl"), i.notNullOrEmpty(n, "applicationUrl"), i.isString(t, "applicationKey"), this.applicationUrl = n, this.applicationKey = t || null;
            var e = r.getSdkInfo(),
                o = r.getOperatingSystemInfo(),
                s = e.fileVersion.split(".").slice(0, 2).join(".");
            this.version = "ZUMO/" + s + " (lang=" + e.language + "; os=" + o.name + "; os_version=" + o.version + "; arch=" + o.architecture + "; version=" + e.fileVersion + ")", this.currentUser = null, this._serviceFilter = null, this._login = new f(this), this.getTable = function (n) {
                return i.isString(n, "tableName"), i.notNullOrEmpty(n, "tableName"), new u(n, this)
            }
        }

        function getApplicationInstallationId() {
            var n = null,
                i = "MobileServices.Installation.config",
                u = r.readSetting(i),
                f, e;
            if (!t.isNull(u)) try {
                f = t.fromJson(u), n = f.applicationInstallationId
            } catch (o) { }
            return t.isNullOrEmpty(n) && (n = t.createUniqueInstallationId(), e = t.toJson({
                applicationInstallationId: n
            }), r.writeSetting(i, e)), n
        }
        var t = require("Extensions"),
            i = require("Validate"),
            r = require("Platform"),
            u = require("MobileServiceTable").MobileServiceTable,
            f = require("MobileServiceLogin").MobileServiceLogin;
        n.MobileServiceClient = MobileServiceClient, r.addToMobileServicesClientNamespace({
            MobileServiceClient: MobileServiceClient
        }), MobileServiceClient.prototype.withFilter = function (n) {
            var r, u;
            return i.notNull(n, "serviceFilter"), r = new MobileServiceClient(this.applicationUrl, this.applicationKey), r.currentUser = this.currentUser, u = this._serviceFilter, r._serviceFilter = t.isNull(u) ? n : function (t, i, r) {
                var f = function (n, t) {
                    u(n, i, t)
                };
                n(t, f, r)
            }, r
        }, MobileServiceClient.prototype._request = function (n, u, f, e, o, s) {
            var h, c;
            t.isNull(s) && typeof o == "function" && (s = o, o = null), t.isNull(s) && typeof e == "function" && (s = e, e = !1), i.isString(n, "method"), i.notNullOrEmpty(n, "method"), i.isString(u, "uriFragment"), i.notNull(u, "uriFragment"), i.notNull(s, "callback"), h = {
                type: n.toUpperCase()
            }, h.url = t.url.combinePathSegments(this.applicationUrl, u), h.headers = {}, t.isNull(o) || t.extend(h.headers, o), h.headers["X-ZUMO-INSTALLATION-ID"] = MobileServiceClient._applicationInstallationId, t.isNullOrEmpty(this.applicationKey) || (h.headers["X-ZUMO-APPLICATION"] = this.applicationKey), this.currentUser && !t.isNullOrEmpty(this.currentUser.mobileServiceAuthenticationToken) && (h.headers["X-ZUMO-AUTH"] = this.currentUser.mobileServiceAuthenticationToken), t.isNull(MobileServiceClient._userAgent) || (h.headers["User-Agent"] = MobileServiceClient._userAgent), t.isNullOrEmpty["X-ZUMO-VERSION"] || (h.headers["X-ZUMO-VERSION"] = this.version), t.isNull(f) ? h.data = null : t.hasProperty(h.headers, ["Content-Type", "content-type", "CONTENT-TYPE", "Content-type"]) ? h.data = f : (h.headers["Content-Type"] = "application/json", h.data = t.toJson(f)), c = function (n, i) {
                t.isNull(n) ? !t.isNull(i) && (i.status >= 400 || i.status === 0) && (n = t.createError(null, i), i = null) : n = t.createError(n), s(n, i)
            }, t.isNull(this._serviceFilter) || e ? r.webRequest(h, c) : this._serviceFilter(h, r.webRequest, c)
        }, MobileServiceClient.prototype.login = r.async(function (n, t, i, r) {
            this._login.login(n, t, i, r)
        }), MobileServiceClient.prototype.logout = function () {
            this.currentUser = null
        }, MobileServiceClient.prototype.invokeApi = r.async(function (n, r, u) {
            var f, e, s, h, o, c;
            i.isString(n, "apiName"), t.isNull(u) && typeof r == "function" && (u = r, r = null), i.notNull(u, "callback"), t.isNull(r) || (f = r.parameters, t.isNull(f) || i.isValidParametersObject(r.parameters), e = r.method, s = r.body, h = r.headers), t.isNull(e) && (e = "POST"), o = t.url.combinePathSegments("api", n), t.isNull(f) || (c = t.url.getQueryString(f), o = t.url.combinePathAndQuery(o, c)), this._request(e, o, s, null, h, function (n, i) {
                t.isNull(n) ? (i.getResponseHeader("Content-Type").toLowerCase().indexOf("json") != -1 && (i.result = t.fromJson(i.responseText)), u(null, i)) : u(n, null)
            })
        }), MobileServiceClient._applicationInstallationId = getApplicationInstallationId(), MobileServiceClient._userAgent = r.getUserAgent()
    }, t.MobileServiceTable = function (n) {
        function MobileServiceTable(n, t) {
            this.getTableName = function () {
                return n
            }, this.getMobileServiceClient = function () {
                return t
            }
        }
        var t = require("Extensions"),
            i = require("Validate"),
            r = require("Platform"),
            h = require("Query").Query,
            u = "id",
            f = "tables",
            o = ["ID", "Id", "id", "iD"];
        n.MobileServiceTable = MobileServiceTable, MobileServiceTable.prototype._read = function (n, u, e) {
            var s, v, y, a, h;
            t.isNull(e) && (t.isNull(u) && typeof n == "function" ? (e = n, n = null, u = null) : typeof u == "function" && (e = u, u = null, !t.isNull(n) && t.isObject(n) && !t.isString(n) && t.isNull(n.toOData) && (u = n, n = null))), n && t.isString(n) && i.notNullOrEmpty(n, "query"), t.isNull(u) || i.isValidParametersObject(u, "parameters"), i.notNull(e, "callback");
            var c = this.getTableName(),
                o = null,
                l = null;
            if (t.isString(n)) o = n;
            else if (t.isObject(n) && !t.isNull(n.toOData) && n.getComponents && (s = n.getComponents(), l = s.projection, s.table)) {
                if (c !== s.table) {
                    v = t.format(r.getResourceString("MobileServiceTable_ReadMismatchedQueryTables"), c, s.table), e(t.createError(v), null);
                    return
                }
                y = n.toOData(), o = y.replace(new RegExp("^/" + s.table), "")
            }
            t.isNull(u) || (a = t.url.getQueryString(u), t.isNullOrEmpty(o) ? o = a : o += "&" + a), h = t.url.combinePathSegments(f, c), t.isNull(o) || (h = t.url.combinePathAndQuery(h, o)), this.getMobileServiceClient()._request("GET", h, null, function (n, i) {
                var r = null,
                    u;
                if (t.isNull(n) && (r = t.fromJson(i.responseText), r && !Array.isArray(r) && typeof r.count != "undefined" && typeof r.results != "undefined" && (r.results.totalCount = r.count, r = r.results), l !== null))
                    for (u = 0, u = 0; u < r.length; u++) r[u] = l.call(r[u]);
                e(n, r)
            })
        }, MobileServiceTable.prototype.read = r.async(MobileServiceTable.prototype._read), MobileServiceTable.prototype.insert = r.async(function (n, e, s) {
            var c, h, l;
            t.isNull(s) && typeof e == "function" && (s = e, e = null), i.notNull(n, "instance"), t.isNull(e) || i.isValidParametersObject(e), i.notNull(s, "callback");
            for (c in o)
                if (!t.isNullOrZero(n[o[c]])) throw t.format(r.getResourceString("MobileServiceTable_InsertIdAlreadySet"), u);
            h = t.url.combinePathSegments(f, this.getTableName()), t.isNull(e) || (l = t.url.getQueryString(e), h = t.url.combinePathAndQuery(h, l)), this.getMobileServiceClient()._request("POST", h, n, function (i, u) {
                if (t.isNull(i)) {
                    var f = t.fromJson(u.responseText);
                    f = r.allowPlatformToMutateOriginal(n, f), s(null, f)
                } else s(i, null)
            })
        }), MobileServiceTable.prototype.update = r.async(function (n, e, o) {
            var s, h;
            t.isNull(o) && typeof e == "function" && (o = e, e = null), i.notNull(n, "instance"), i.notNullOrZero(n[u], "instance." + u), t.isNull(e) || i.isValidParametersObject(e, "parameters"), i.notNull(o, "callback"), s = t.url.combinePathSegments(f, this.getTableName(), n[u].toString()), t.isNull(e) || (h = t.url.getQueryString(e), s = t.url.combinePathAndQuery(s, h)), this.getMobileServiceClient()._request("PATCH", s, n, function (i, u) {
                if (t.isNull(i)) {
                    var f = t.fromJson(u.responseText);
                    f = r.allowPlatformToMutateOriginal(n, f), o(null, f)
                } else o(i, null)
            })
        }), MobileServiceTable.prototype.refresh = r.async(function (n, e, o) {
            var s, h;
            if (t.isNull(o) && typeof e == "function" && (o = e, e = null), i.notNull(n, "instance"), t.isNullOrZero(n[u])) {
                o(null, n);
                return
            }
            t.isNull(e) || i.isValidParametersObject(e, "parameters"), i.notNull(o, "callback"), s = t.url.combinePathSegments(f, this.getTableName()), s = t.url.combinePathAndQuery(s, "?$filter=id eq " + n[u].toString()), t.isNull(e) || (h = t.url.getQueryString(e), s = t.url.combinePathAndQuery(s, h)), this.getMobileServiceClient()._request("GET", s, n, function (i, f) {
                if (t.isNull(i)) {
                    var e = t.fromJson(f.responseText);
                    if (Array.isArray(e) && (e = e[0]), !e) throw t.format(r.getResourceString("MobileServiceTable_NotSingleObject"), u);
                    e = r.allowPlatformToMutateOriginal(n, e), o(null, e)
                } else o(i, null)
            })
        }), MobileServiceTable.prototype.lookup = r.async(function (n, r, e) {
            var o, s;
            t.isNull(e) && typeof r == "function" && (e = r, r = null), i.notNullOrZero(n, u), t.isNull(r) || i.isValidParametersObject(r), i.notNull(e, "callback"), o = t.url.combinePathSegments(f, this.getTableName(), n.toString()), t.isNull(r) || (s = t.url.getQueryString(r), o = t.url.combinePathAndQuery(o, s)), this.getMobileServiceClient()._request("GET", o, null, function (n, i) {
                if (t.isNull(n)) {
                    var r = t.fromJson(i.responseText);
                    e(null, r)
                } else e(n, null)
            })
        }), MobileServiceTable.prototype.del = r.async(function (n, r, e) {
            var o, s;
            t.isNull(e) && typeof r == "function" && (e = r, r = null), i.notNull(n, "instance"), i.notNullOrZero(n[u], "instance." + u), t.isNull(r) || i.isValidParametersObject(r), i.notNull(e, "callback"), o = t.url.combinePathSegments(f, this.getTableName(), n[u].toString()), t.isNull(r) || (s = t.url.getQueryString(r), o = t.url.combinePathAndQuery(o, s)), this.getMobileServiceClient()._request("DELETE", o, null, function (n) {
                e(n)
            })
        });
        for (var s = ["where", "select", "orderBy", "orderByDescending", "skip", "take", "includeTotalCount"], c = function (n) {
                MobileServiceTable.prototype[n] = function () {
                    var i = this,
                        t = new h(i.getTableName());
                    return t.read = r.async(function (n, r) {
                        i._read(t, n, r)
        }), t[n].apply(t, arguments)
        }
        }, e = 0; e < s.length; e++) c(s[e])
    }, t.MobileServiceLogin = function (n) {
        function MobileServiceLogin(n, r) {
            t.isNull(r) && (r = !0), i.notNull(n), i.isObject(n, "client"), this._loginState = {
                inProcess: !1,
                cancelCallback: null
            }, this.ignoreFilters = r, this.getMobileServiceClient = function () {
                return n
            }, this.getLoginInProcess = function () {
                return this._loginState.inProcess
            }
        }

        function isValidProvider(n) {
            for (var t = 0, i = f.length; t < i; t++)
                if (f[t] === n) return !0;
            return !1
        }

        function onLoginComplete(n, i, u, f) {
            var e = null;
            t.isNull(n) && (!t.isNull(i) && t.isObject(i) && t.isObject(i.user) && t.isString(i.authenticationToken) ? (u.currentUser = i.user, u.currentUser.mobileServiceAuthenticationToken = i.authenticationToken, e = u.currentUser) : n = r.getResourceString("MobileServiceLogin_InvalidResponseFormat")), t.isNull(f) || f(n, e)
        }

        function onLoginResponse(n, i, r, u) {
            var f = null;
            if (t.isNull(n)) try {
                f = t.fromJson(i.responseText)
            } catch (e) {
                n = e
            }
            onLoginComplete(n, f, r, u)
        }

        function loginWithProviderAndToken(n, t, i, r) {
            var f = n.getMobileServiceClient();
            n._loginState = {
                inProcess: !0,
                cancelCallback: null
            }, f._request("POST", u + "/" + t, i, n.ignoreFilters, function (t, i) {
                n._loginState = {
                    inProcess: !1,
                    cancelCallback: null
                }, onLoginResponse(t, i, f, r)
            })
        }

        function loginWithLoginControl(n, i, f, o) {
            var h = n.getMobileServiceClient(),
                l = t.url.combinePathSegments(h.applicationUrl, u, i),
                c = null,
                s;
            f || (c = t.url.combinePathSegments(h.applicationUrl, u, e)), n._loginState = {
                inProcess: !0,
                cancelCallback: null
            }, s = r.login(l, c, function (t, i) {
                n._loginState = {
                    inProcess: !1,
                    cancelCallback: null
                }, onLoginComplete(t, i, h, o)
            }), n._loginState.inProcess && s && s.cancelCallback && (n._loginState.cancelCallback = s.cancelCallback)
        }
        var t = require("Extensions"),
            i = require("Validate"),
            r = require("Platform"),
            f = ["facebook", "google", "twitter", "microsoftaccount"],
            u = "login",
            e = "done";
        n.MobileServiceLogin = MobileServiceLogin, r.addToMobileServicesClientNamespace({
            MobileServiceLogin: MobileServiceLogin
        }), MobileServiceLogin.prototype.login = function (n, u, f, e) {
            if (t.isNull(e) && (t.isNull(f) || typeof f != "function" ? t.isNull(u) || typeof u != "function" || (e = u, f = null, u = null) : (e = f, f = null)), t.isNull(f) && (t.isBool(u) ? (f = u, u = null) : f = !1), t.isNull(u) && t.isString(n) && n.split(".").length === 3 && (u = n, n = null), t.isNull(n) && (i.notNull(u), i.isString(u)), t.isNull(u) && (i.notNull(n), i.isString(n), n = n.toLowerCase(), !isValidProvider(n))) throw r.getResourceString("MobileServiceLogin_InvalidProvider");
            t.isNull(n) ? this.loginWithMobileServiceToken(u, e) : this.loginWithProvider(n, u, f, e)
        }, MobileServiceLogin.prototype.loginWithMobileServiceToken = function (n, t) {
            var r = this,
                f = r.getMobileServiceClient();
            i.isString(n, "authenticationToken"), i.notNullOrEmpty(n, "authenticationToken"), f._request("POST", u, {
                authenticationToken: n
            }, r.ignoreFilters, function (n, i) {
                onLoginResponse(n, i, f, t)
            })
        }, MobileServiceLogin.prototype.loginWithProvider = function (n, u, e, o) {
            if (t.isNull(o) && (t.isNull(e) && typeof u == "function" ? (o = u, u = null, e = !1) : typeof e == "function" && (o = e, e = !1, !t.isNull(u) && t.isBool(u) && (e = u, u = null))), i.isString(n, "provider"), t.isNull(u) || i.isObject(u, "token"), this._loginState.inProcess) {
                var s = this._loginState.cancelCallback && this._loginState.cancelCallback();
                if (!s) throw r.getResourceString("MobileServiceLogin_LoginErrorResponse");
            }
            if (n = n.toLowerCase(), !isValidProvider(n)) throw t.format(r.getResourceString("MobileServiceLogin_AuthenticationProviderNotSupported"), f.join(", "));
            t.isNull(u) ? loginWithLoginControl(this, n, e, o) : loginWithProviderAndToken(this, n, u, o)
        }
    }, t.Platform = function (t) {
        function getBestTransport() {
            return f || (f = getBestProvider(c)), f
        }

        function getBestProvider(n) {
            for (var t = 0; t < n.length; t++)
                if (n[t].supportsCurrentRuntime()) return n[t];
            throw new Error("Unsupported browser - no suitable providers are available.");
        }
        var r = require("Extensions"),
            o = require("Validate"),
            s = require("Promises"),
            h = require("Resources"),
            u = {};
        window.localStorage && (u = window.localStorage);
        var f = null,
            c = [require("DirectAjaxTransport"), require("IframeTransport")],
            l = [require("CordovaPopup"), require("BrowserPopup")],
            e = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})(?:\.(\d*))?Z$/,
            a = !JSON.stringify(new Date(100)).match(/\.100Z"$/);
        t.async = function (n) {
            return function () {
                var i = this,
                    t = arguments;
                return new s.Promise(function (u, f) {
                    var e = function (n) {
                        r.isNull(n) ? u.apply(null, Array.prototype.slice.call(arguments, 1)) : f(n)
                    };
                    Array.prototype.push.call(t, e);
                    try {
                        n.apply(i, t)
                    } catch (o) {
                        e(r.createError(o))
                    }
                })
            }
        }, t.addToMobileServicesClientNamespace = function (t) {
            var r = n.WindowsAzure = n.WindowsAzure || {}, i;
            for (i in t) t.hasOwnProperty(i) && (r[i] = t[i])
        }, t.readSetting = function (n) {
            return u[n]
        }, t.writeSetting = function (n, t) {
            u[n] = t
        }, t.webRequest = function (n, t) {
            return getBestTransport().performRequest(n, t)
        }, t.getUserAgent = function () {
            return null
        }, t.getOperatingSystemInfo = function () {
            return {
                name: "--",
                version: "--",
                architecture: "--"
            }
        }, t.getSdkInfo = function () {
            return {
                language: "Web",
                fileVersion: i
            }
        }, t.login = function (n, t, i) {
            var r = /^[a-z]+:/,
                u = "https:";
            return n = n.replace(r, u), t = t.replace(r, u), getBestProvider(l).login(n, t, i)
        }, t.toJson = function (n) {
            return JSON.stringify(n, function (n, t) {
                if (a && this && r.isDate(this[n])) {
                    var i = this[n].getMilliseconds(),
                        u = String(i + 1e3).substring(1);
                    return t.replace(e, function (n, t) {
                        return t + "." + u + "Z"
                    })
                }
                return t
            })
        }, t.tryParseIsoDateString = function (n) {
            var t, r;
            if (o.isString(n), t = e.exec(n), t) {
                var i = t[1],
                    u = t[2] || "0",
                    f = Math.round(1e3 * Number("0." + u));
                if (i = i.replace(/\-/g, "/").replace("T", " "), r = Date.parse(i + " UTC"), !isNaN(r)) return new Date(r + f)
            }
            return null
        }, t.getResourceString = function (n) {
            return h["en-US"][n]
        }, t.allowPlatformToMutateOriginal = function (n, t) {
            return t
        }
    }, t.DirectAjaxTransport = function (t) {
        t.name = "DirectAjaxTransport", t.supportsCurrentRuntime = function () {
            return typeof n.XMLHttpRequest != "undefined" && "withCredentials" in new n.XMLHttpRequest
        }, t.performRequest = function (t, i) {
            var f = t.headers || {}, e = t.url.replace(/#.*$/, ""),
                o = t.type ? t.type.toUpperCase() : "GET",
                r = new n.XMLHttpRequest,
                u;
            r.onreadystatechange = function () {
                r.readyState === 4 && i(null, r)
            }, r.open(o, e);
            for (u in f) t.headers.hasOwnProperty(u) && r.setRequestHeader(u, t.headers[u]);
            r.send(t.data)
        }
    }, t.IframeTransport = function (t) {
        function fixupAjax(n) {
            n && n.status === 1223 && (n.status = 204)
        }

        function whenBridgeLoaded(t, f) {
            var e = r[t];
            e || (e = r[t] = new u.Promise(function (r) {
                var u = document.createElement("iframe"),
                    e = i.getOriginRoot(window.location.href),
                    f = function () {
                        r(u)
                    };
                u.addEventListener ? u.addEventListener("load", f, !1) : u.attachEvent("onload", f), u.src = t + "/crossdomain/bridge?origin=" + encodeURIComponent(e), u.setAttribute("width", 0), u.setAttribute("height", 0), u.style.display = "none", n.document.body.appendChild(u)
            })), e.then(f)
        }
        var u = require("Promises"),
            i = require("PostMessageExchange"),
            r = [],
            f = i.instance;
        t.name = "IframeTransport", t.supportsCurrentRuntime = function () {
            return typeof n.postMessage != "undefined"
        }, t.performRequest = function (n, t) {
            var r = i.getOriginRoot(n.url);
            whenBridgeLoaded(r, function (i) {
                var u = {
                    type: n.type,
                    url: n.url,
                    headers: n.headers,
                    data: n.data
                };
                f.request(i.contentWindow, u, r).then(function (n) {
                    fixupAjax(n), t(null, n)
                }, function (n) {
                    t(n, null)
                })
            })
        }
    }, t.BrowserPopup = function (n) {
        function createIntermediateIframeForLogin(n, t) {
            var i = document.createElement("iframe");
            return i.name = "zumo-login-receiver", i.src = n + "/crossdomain/loginreceiver?completion_origin=" + encodeURIComponent(t), i.setAttribute("width", 0), i.setAttribute("height", 0), i.style.display = "none", document.body.appendChild(i), i
        }
        var t = require("PostMessageExchange");
        n.supportsCurrentRuntime = function () {
            return !0
        }, n.login = function (n, i, r) {
            var u = t.getOriginRoot(window.location.href),
                l = t.getOriginRoot(n),
                s = window.navigator.userAgent.indexOf("MSIE") >= 0,
                f = s && createIntermediateIframeForLogin(l, u),
                a = s ? "iframe" : "postMessage",
                c;
            if (n += "?completion_type=" + a + "&completion_origin=" + encodeURIComponent(u), !(u && (u.indexOf("http:") === 0 || u.indexOf("https:") === 0))) {
                c = "Login is only supported from http:// or https:// URLs. Please host your page in a web server.", r(c, null);
                return
            }
            var e = window.open(n, "_blank", "location=no"),
                h = function (n, t) {
                    window.clearInterval(v), e.close(), window.removeEventListener ? window.removeEventListener("message", o) : window.detachEvent("onmessage", o), f && f.parentNode.removeChild(f), r(n, t)
                }, o = function (n) {
                    var i = s ? f.contentWindow : e,
                        t;
                    if (n.source === i) {
                        try {
                            t = JSON.parse(n.data)
                        } catch (r) {
                            return
                        }
                        t && t.type === "LoginCompleted" && (t.oauth || t.error) && h(t.error, t.oauth)
                    }
                }, v = window.setInterval(function () {
                    e && e.closed === !0 && h("canceled", null)
                }, 250);
            return window.addEventListener ? window.addEventListener("message", o, !1) : window.attachEvent("onmessage", o), {
                cancelCallback: function () {
                    return h("canceled", null), !0
                }
            }
        }
    }, t.CordovaPopup = function (n) {
        function currentCordovaVersion() {
            return window.device && window.device.cordova
        }

        function isSupportedCordovaVersion() {
            var n = currentCordovaVersion().match(/^(\d+).(\d+)./);
            if (n) {
                var r = Number(n[1]),
                    u = Number(n[2]),
                    i = t;
                return r > i.major || r === i.major && u >= i.minor
            }
            return !1
        }

        function parseOAuthResultFromDoneUrl(n) {
            var t = extractMessageFromUrl(n, "#token="),
                i = extractMessageFromUrl(n, "#error=");
            return {
                oAuthToken: t ? JSON.parse(t) : null,
                error: i
            }
        }

        function extractMessageFromUrl(n, t) {
            var i = n.indexOf(t);
            return i < 0 ? null : decodeURIComponent(n.substring(i + t.length))
        }

        function getSpinnerMarkup() {
            for (var r = ("webkitTransform" in document.documentElement.style) ? "-webkit-" : "", t = 12, i = "", n = 0; n < t; n++) i += "<div style='-prefix-transform: rotateZ(" + (180 + n * 360 / t) + "deg);-prefix-animation-delay: " + .75 * n / t + "s;'><\/div>";
            return ["<!DOCTYPE html><html>", "<head><meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1'><\/head>", "<body><div id='spinner'>" + i + "<\/div>", "<style type='text/css'>", "    #spinner { position: absolute; top: 50%; left: 50%; -prefix-animation: spinner 10s linear infinite; }", "    #spinner > div {", "        background: #333; opacity: 0; position: absolute; top: 11px; left: -2px; width: 4px; height: 21px; border-radius: 2px;", "        -prefix-transform-origin: 50% -11px; -prefix-animation: spinner-spoke 0.75s linear infinite;", "    }", "    @-prefix-keyframes spinner { 0% { -prefix-transform: rotateZ(0deg); } 100% { -prefix-transform: rotateZ(-360deg); } }", "    @-prefix-keyframes spinner-spoke { 0% { opacity: 0; } 5% { opacity: 1; } 70% { opacity: 0; } 100% { opacity: 0; } }", "<\/style>", "<\/body><\/html>"].join("").replace(/-prefix-/g, r)
        }
        var t = {
            major: 2,
            minor: 3
        };
        n.supportsCurrentRuntime = function () {
            return !!currentCordovaVersion()
        }, n.login = function (n, i, r) {
            var e = currentCordovaVersion(),
                o;
            if (!isSupportedCordovaVersion(e)) {
                o = "Not a supported version of Cordova. Detected: " + e + ". Required: " + t.major + "." + t.minor;
                throw new Error(o);
            }
            var h = "<script>location.href = unescape('" + window.escape(n) + "')<\/script>",
                c = "data:text/html," + encodeURIComponent(getSpinnerMarkup() + h),
                u = window.open(c, "_blank", "location=no"),
                f = !1,
                s = function (n) {
                    if (!f && n.url.indexOf(i) === 0) {
                        f = !0, u.close();
                        var t = parseOAuthResultFromDoneUrl(n.url);
                        r(t.error, t.oAuthToken)
                    }
                };
            u.addEventListener("loadstart", s), u.addEventListener("loadstop", s), u.addEventListener("exit", function () {
                f || (f = !0, r("UserCancelled", null))
            })
        }
    }, t.Extensions = function (n) {
        function classOf(n) {
            return Object.prototype.toString.call(n).slice(8, -1).toLowerCase()
        }
        var i = require("Validate"),
            r = require("Platform"),
            t = n;
        n.isNull = function (n) {
            return n === null || n === undefined
        }, n.isNullOrZero = function (n) {
            return n === null || n === undefined || n === 0
        }, n.isNullOrEmpty = function (n) {
            return t.isNull(n) || n.length === 0
        }, n.format = function (n) {
            var r, u;
            if (i.isString(n, "message"), !t.isNullOrEmpty(n) && arguments.length > 1)
                for (r = 1; r < arguments.length; r++)
                    for (u = "{" + (r - 1) + "}"; n.indexOf(u) !== -1;) n = n.replace(u, arguments[r]);
            return n
        }, n.has = function (n, r) {
            return i.notNull(r, "key"), i.isString(r, "key"), !t.isNull(n) && n.hasOwnProperty(r)
        }, n.hasProperty = function (n, i) {
            for (var r = 0; r < i.length; r++)
                if (t.has(n, i[r])) return !0;
            return !1
        }, n.extend = function (n, t) {
            for (var i in t) t.hasOwnProperty(i) && (n[i] = t[i]);
            return n
        }, n.isObject = function (n) {
            return t.isNull(n) || typeof n == "object" && !t.isDate(n)
        }, n.isString = function (n) {
            return t.isNull(n) || typeof n == "string"
        }, n.isNumber = function (n) {
            return !t.isNull(n) && typeof n == "number"
        }, n.isBool = function (n) {
            return !t.isNull(n) && typeof n == "boolean"
        }, n.isDate = function (n) {
            return !t.isNull(n) && classOf(n) == "date"
        }, n.toJson = function (n) {
            return r.toJson(n)
        }, n.fromJson = function (r) {
            return i.isString(r, "value"), JSON.parse(r, function (i, r) {
                if (t.isString(r) && !t.isNullOrEmpty(r)) {
                    var u = n.tryParseIsoDateString(r);
                    if (!t.isNull(u)) return u
                }
                return r
            })
        }, n.createUniqueInstallationId = function () {
            var t = function (n) {
                return "0000".substring(n.length) + n
            }, n = function () {
                return t(Math.floor(Math.random() * 65536).toString(16))
            };
            return n() + n() + "-" + n() + "-" + n() + "-" + n() + "-" + n() + n() + n()
        }, n.mapProperties = function (n, i) {
            var u = [],
                r;
            if (!t.isNull(n)) {
                r = null;
                for (r in n) u.push(i(r, n[r]))
            }
            return u
        }, n.pad = function (n, t, r) {
            i.notNull(n, "value"), i.isInteger(t, "length"), i.isString(r, "ch"), i.notNullOrEmpty(r, "ch"), i.length(r, 1, "ch");
            for (var u = n.toString() ; u.length < t;) u = r + u;
            return u
        }, n.trimEnd = function (n, t) {
            i.isString(n, "text"), i.notNull(n, "text"), i.isString(t, "ch"), i.notNullOrEmpty("ch", "ch"), i.length(t, 1, "ch");
            for (var r = n.length - 1; r >= 0 && n[r] === t;) r--;
            return r >= 0 ? n.substr(0, r + 1) : ""
        }, n.trimStart = function (n, t) {
            i.isString(n, "text"), i.notNull(n, "text"), i.isString(t, "ch"), i.notNullOrEmpty(t, "ch"), i.length(t, 1, "ch");
            for (var r = 0; r < n.length && n[r] === t;) r++;
            return r < n.length ? n.substr(r, n.length - r) : ""
        }, n.compareCaseInsensitive = function (n, i) {
            return t.isString(n) && !t.isNullOrEmpty(n) && (n = n.toUpperCase()), t.isString(n) && !t.isNullOrEmpty(i) && (i = i.toUpperCase()), n === i
        }, n.url = {
            separator: "/",
            combinePathSegments: function () {
                var u = [],
                    n = 0,
                    r;
                for (i.notNullOrEmpty(arguments, "arguments"), n = 0; n < arguments.length; n++) r = arguments[n], i.isString(r, t.format("argument[{0}]", n)), n !== 0 && (r = t.trimStart(r || "", t.url.separator)), n < arguments.length - 1 && (r = t.trimEnd(r || "", t.url.separator)), u.push(r);
                return u.reduce(function (n, i) {
                    return n + t.url.separator + i
                })
            },
            getQueryString: function (t) {
                var u, f, r;
                i.notNull(t, "parameters"), i.isObject(t, "parameters"), u = [];
                for (f in t) r = t[f], n.isObject(r) && (r = n.toJson(r)), u.push(encodeURIComponent(f) + "=" + encodeURIComponent(r));
                return u.join("&")
            },
            combinePathAndQuery: function (r, u) {
                return (i.notNullOrEmpty(r, "path"), i.isString(r, "path"), t.isNullOrEmpty(u)) ? r : (i.isString(u, "queryString"), r.indexOf("?") >= 0 ? r + "&" + n.trimStart(u, "?") : r + "?" + n.trimStart(u, "?"))
            }
        }, n.tryParseIsoDateString = function (n) {
            return r.tryParseIsoDateString(n)
        }, n.createError = function (n, i) {
            var u = {
                message: r.getResourceString("Extensions_DefaultErrorMessage")
            }, f;
            if (u.toString = function () {
                return u.message
            }, i)
                if (u.request = i, i.status === 0) u.message = r.getResourceString("Extensions_ConnectionFailureMessage");
                else try {
                    f = JSON.parse(i.responseText), u.message = f.error || f.description || i.statusText || r.getResourceString("Extensions_DefaultErrorMessage")
                } catch (e) {
                    u.message = i.statusText || r.getResourceString("Extensions_DefaultErrorMessage")
                } else t.isString(n) && !t.isNullOrEmpty(n) ? u.message = n : t.isNull(n) || (u.exception = n);
            return u
        }
    }, t.PostMessageExchange = function (t) {
        function PostMessageExchange() {
            var n = this;
            n._lastMessageId = 0, n._hasListener = !1, n._pendingMessages = {}
        }

        function getOriginRoot(n) {
            var t = parseUrl(n),
                i = t.port ? t.port.toString() : null,
                r = t.protocol === "http:" && i === "80" || t.protocol === "https:" && i === "443",
                u = i && !r ? ":" + i : "";
            return t.protocol + "//" + t.hostname + u
        }

        function parseUrl(t) {
            var i = n.document.createElement("a");
            return i.href = t, i
        }
        var i = require("Promises"),
            r = 3e5;
        PostMessageExchange.prototype.request = function (t, u, f) {
            var e = this,
                o = ++e._lastMessageId,
                s = {
                    messageId: o,
                    contents: u
                };
            return e._ensureHasListener(), new i.Promise(function (i, u) {
                e._pendingMessages[o] = {
                    messageId: o,
                    complete: i,
                    error: u,
                    targetWindow: t,
                    origin: f
                }, e._pendingMessages[o].timeoutId = n.setTimeout(function () {
                    var n = e._pendingMessages[o];
                    n && (delete e._pendingMessages[o], n.error({
                        status: 0,
                        statusText: "Timeout",
                        responseText: null
                    }))
                }, r), t.postMessage(JSON.stringify(s), f)
            })
        }, PostMessageExchange.prototype._ensureHasListener = function () {
            if (!this._hasListener) {
                this._hasListener = !0;
                var n = this,
                    t = function () {
                        n._handleMessage.apply(n, arguments)
                    };
                window.addEventListener ? window.addEventListener("message", t, !1) : window.attachEvent("onmessage", t)
            }
        }, PostMessageExchange.prototype._handleMessage = function (t) {
            var r = this._tryDeserializeMessage(t.data),
                u = r && r.messageId,
                i = u && this._pendingMessages[u],
                f = i && i.targetWindow === t.source && i.origin === getOriginRoot(t.origin);
            f && (n.clearTimeout(i.timeoutId), delete this._pendingMessages[u], i.complete(r.contents))
        }, PostMessageExchange.prototype._tryDeserializeMessage = function (n) {
            if (!n || typeof n != "string") return null;
            try {
                return JSON.parse(n)
            } catch (t) {
                return null
            }
        }, t.instance = new PostMessageExchange, t.getOriginRoot = getOriginRoot
    }, t.Promises = function (n) {
        (function (n) {
            "use strict";

            function Promise(n) {
                this._callbackFrames = [], this._resolutionState = null, this._resolutionValueOrError = null, this._resolveSuccess = i(this._resolveSuccess, this), this._resolveError = i(this._resolveError, this), n && n(this._resolveSuccess, this._resolveError)
            }
            var t = {
                success: {},
                error: {}
            }, i = function (n, t) {
                return function () {
                    n.apply(t, arguments)
                }
            }, r = function (n) {
                return n && typeof n.then == "function"
            };
            Promise.prototype.then = function (n, t) {
                var i = {
                    success: n,
                    error: t,
                    chainedPromise: new Promise
                };
                return this._resolutionState ? this._invokeCallback(i) : this._callbackFrames.push(i), i.chainedPromise
            }, Promise.prototype._resolveSuccess = function (n) {
                this._resolve(t.success, n)
            }, Promise.prototype._resolveError = function (n) {
                this._resolve(t.error, n)
            }, Promise.prototype._resolve = function (n, t) {
                if (!this._resolutionState) {
                    this._resolutionState = n, this._resolutionValueOrError = t;
                    for (var i = 0, r = this._callbackFrames.length; i < r; i++) this._invokeCallback(this._callbackFrames[i])
                }
            }, Promise.prototype._invokeCallback = function (n) {
                var u = this._resolutionState === t.success ? n.success : n.error;
                typeof u == "function" ? setTimeout(i(function () {
                    var i, f, e = !0;
                    try {
                        i = u(this._resolutionValueOrError), f = t.success
                    } catch (o) {
                        e = !1, i = o, f = t.error
                    }
                    e && r(i) ? i.then(n.chainedPromise._resolveSuccess, n.chainedPromise._resolveError) : n.chainedPromise._resolve(f, i)
                }, this), 1) : n.chainedPromise._resolve(this._resolutionState, this._resolutionValueOrError)
            }, Promise.prototype.done = function (n, t) {
                return this.then(n, t).then(null, function (n) {
                    setTimeout(function () {
                        throw new Error(n);
                    }, 1)
                }), undefined
            }, n.Promise = Promise
        })(n)
    }, t.Validate = function (n) {
        var t = require("Extensions"),
            i = require("Platform");
        n.notNull = function (n, r) {
            if (t.isNull(n)) throw t.format(i.getResourceString("Validate_NotNullError"), r || "Value");
        }, n.notNullOrEmpty = function (n, r) {
            if (t.isNullOrEmpty(n)) throw t.format(i.getResourceString("Validate_NotNullOrEmptyError"), r || "Value");
        }, n.notNullOrZero = function (n, r) {
            if (t.isNullOrZero(n)) throw t.format(i.getResourceString("Validate_NotNullOrEmptyError"), r || "Value");
        }, n.isDate = function (r, u) {
            if (n.notNull(r, u), !t.isDate(r)) throw t.format(i.getResourceString("Validate_TypeCheckError"), u || "Value", "Date", typeof r);
        }, n.isNumber = function (r, u) {
            if (n.notNull(r, u), !t.isNumber(r)) throw t.format(i.getResourceString("Validate_TypeCheckError"), u || "Value", "Number", typeof r);
        }, n.isValidParametersObject = function (r, u) {
            n.notNull(r, u), n.isObject(r, u);
            for (var f in r)
                if (f.indexOf("$") === 0) throw t.format(i.getResourceString("Validate_InvalidUserParameter"), u, f);
        }, n.isInteger = function (r, u) {
            if (n.notNull(r, u), n.isNumber(r, u), parseInt(r, 10) !== parseFloat(r)) throw t.format(i.getResourceString("Validate_TypeCheck_Error"), u || "Value", "number", typeof r);
        }, n.isString = function (n, r) {
            if (!t.isString(n)) throw t.format(i.getResourceString("Validate_TypeCheckError"), r || "Value", "string", typeof n);
        }, n.isObject = function (n, r) {
            if (!t.isObject(n)) throw t.format(i.getResourceString("Validate_TypeCheckError"), r || "Value", "object", typeof n);
        }, n.length = function (r, u, f) {
            if (n.notNull(r, f), n.isInteger(u, "length"), r.length !== u) throw t.format(i.getResourceString("Validate_LengthUnexpected"), f || "Value", u, r.length);
        }
    }, t.JavaScript = function (n) {
        (function () {
            var u, f, t, i, r;
            r = require("esprima"), u = require("./JavaScriptNodes"), i = require("./PartialEvaluator").PartialEvaluator, t = require("./JavaScriptToQueryVisitor").JavaScriptToQueryVisitor, n.JavaScript = f = function () {
                function JavaScript() { }
                return JavaScript.transformConstraint = function (n, r) {
                    var u, f;
                    return u = JavaScript.getExpression(n, r), u.expression = i.evaluate(u), f = new t(u), f.visit(u.expression)
                }, JavaScript.getProjectedFields = function () {
                    return []
                }, JavaScript.getExpression = function (n, t) {
                    var e, o, f, c, u, i, s, h, l, a, v, y, p, w, b, k, d, g, nt, tt, it, rt, ut;
                    if (s = "var _$$_stmt_$$_ = " + n + ";", i = r.parse(s, {
                        range: !0
                    }), o = (i != null ? i.type : void 0) === "Program" && (i != null ? (a = i.body) != null ? a.length : void 0 : void 0) === 1 && ((v = i.body[0]) != null ? v.type : void 0) === "VariableDeclaration" && ((k = i.body[0]) != null ? (d = k.declarations) != null ? d.length : void 0 : void 0) === 1 && ((g = i.body[0].declarations[0]) != null ? g.type : void 0) === "VariableDeclarator" && ((nt = i.body[0].declarations[0]) != null ? (tt = nt.init) != null ? tt.type : void 0 : void 0) === "FunctionExpression" && ((it = i.body[0].declarations[0].init) != null ? (rt = it.body) != null ? rt.type : void 0 : void 0) === "BlockStatement" && ((ut = i.body[0].declarations[0].init.body) != null ? (y = ut.body) != null ? y.length : void 0 : void 0) === 1 && ((p = i.body[0].declarations[0].init.body.body[0]) != null ? p.type : void 0) === "ReturnStatement" && ((w = i.body[0].declarations[0].init.body.body[0]) != null ? w.argument : void 0), !o) throw "Expected a predicate with a single return statement, not " + n;
                    if (u = (b = i.body[0].declarations[0].init.params) != null ? b.map(function (n) {
                        return n.name
                    }) : void 0, u.length > t.length) throw "Expected value(s) for parameter(s) " + u.slice(t.length);
                    else if (t.length > u.length) throw "Expected parameter(s) for value(s) " + t.slice(u.length);
                    for (e = {}, f = h = 0, l = u.length; h < l; f = ++h) c = u[f], e[c] = t[f];
                    return {
                        source: s,
                        expression: o,
                        environment: e
                    }
                }, JavaScript
            }()
        }).call(this)
    }, t.JavaScriptNodes = function (n) {
        (function () {
            var l, a, v, y, p, w, b, k, d, g, nt, e, tt, it, u, rt, ut, ft, et, ot, st, ht, ct, f, i, lt, at, vt, yt, pt, h, wt, bt, o, kt, dt, gt, r, ni, ti, ii, ri, ui, fi, ei, oi, si, c, hi, ci, s, li = {}.hasOwnProperty,
                t = function (n, t) {
                    function ctor() {
                        this.constructor = n
                    }
                    for (var i in t) li.call(t, i) && (n[i] = t[i]);
                    return ctor.prototype = t.prototype, n.prototype = new ctor, n.__super__ = t.prototype, n
                };
            s = require("./Node"), h = s.Node, c = s.Visitor, n.JavaScriptNode = f = function (n) {
                function JavaScriptNode() {
                    JavaScriptNode.__super__.constructor.call(this)
                }
                return t(JavaScriptNode, n), JavaScriptNode
            }(h), n.JavaScriptVisitor = i = function (n) {
                function JavaScriptVisitor() {
                    JavaScriptVisitor.__super__.constructor.call(this)
                }
                return t(JavaScriptVisitor, n), JavaScriptVisitor.prototype.JavaScriptNode = function (n) {
                    return n
                }, JavaScriptVisitor
            }(c), n.Program = kt = function (n) {
                function Program(n) {
                    this.elements = n, Program.__super__.constructor.call(this)
                }
                return t(Program, n), Program
            }(f), i.prototype.Program = function (n) {
                return n = this.JavaScriptNode(n), n.elements = this.visit(n.elements), n
            }, n.Function = et = function (n) {
                function Function(n, t, i) {
                    this.id = n, this.params = t, this.body = i, Function.__super__.constructor.call(this)
                }
                return t(Function, n), Function
            }(f), i.prototype.Function = function (n) {
                return n = this.JavaScriptNode(n), n.id = this.visit(n.id), n.params = this.visit(n.params), n.body = this.visit(n.body), n
            }, n.Statement = r = function (n) {
                function Statement() {
                    Statement.__super__.constructor.call(this)
                }
                return t(Statement, n), Statement
            }(f), i.prototype.Statement = function (n) {
                return this.JavaScriptNode(n)
            }, n.EmptyStatement = it = function (n) {
                function EmptyStatement() {
                    EmptyStatement.__super__.constructor.call(this)
                }
                return t(EmptyStatement, n), EmptyStatement
            }(f), i.prototype.EmptyStatement = function (n) {
                return this.JavaScriptNode(n)
            }, n.BlockStatement = p = function (n) {
                function BlockStatement(n) {
                    this.body = n, BlockStatement.__super__.constructor.call(this)
                }
                return t(BlockStatement, n), BlockStatement
            }(r), i.prototype.BlockStatement = function (n) {
                return n = this.Statement(n), n.body = this.visit(n.body), n
            }, n.ExpressionStatement = rt = function (n) {
                function ExpressionStatement() {
                    ExpressionStatement.__super__.constructor.call(this)
                }
                return t(ExpressionStatement, n), ExpressionStatement
            }(r), i.prototype.ExpressionStatement = function (n) {
                return this.Statement(n)
            }, n.IfStatement = ct = function (n) {
                function IfStatement(n, t, i) {
                    this.test = n, this.consequent = t, this.alternate = i, IfStatement.__super__.constructor.call(this)
                }
                return t(IfStatement, n), IfStatement
            }(r), i.prototype.IfStatement = function (n) {
                return n = this.Statement(n), n.test = this.visit(n.test), n.consequent = this.visit(n.consequent), n.alternate = this.visit(n.alternate), n
            }, n.LabeledStatement = lt = function (n) {
                function LabeledStatement(n, t) {
                    this.label = n, this.body = t, LabeledStatement.__super__.constructor.call(this)
                }
                return t(LabeledStatement, n), LabeledStatement
            }(r), i.prototype.LabeledStatement = function (n) {
                return n = this.Statement(n), n.label = this.visit(n.label), n.body = this.visit(n.body), n
            }, n.BreakStatement = w = function (n) {
                function BreakStatement(n) {
                    this.label = n, BreakStatement.__super__.constructor.call(this)
                }
                return t(BreakStatement, n), BreakStatement
            }(r), i.prototype.BreakStatement = function (n) {
                return n = this.Statement(n), n.label = this.visit(n.label), n
            }, n.ContinueStatement = g = function (n) {
                function ContinueStatement(n) {
                    this.label = n, ContinueStatement.__super__.constructor.call(this)
                }
                return t(ContinueStatement, n), ContinueStatement
            }(r), i.prototype.ContinueStatement = function (n) {
                return n = this.Statement(n), n.label = this.visit(n.label), n
            }, n.WithStatement = ci = function (n) {
                function WithStatement(n, t) {
                    this.object = n, this.body = t, WithStatement.__super__.constructor.call(this)
                }
                return t(WithStatement, n), WithStatement
            }(r), i.prototype.WithStatement = function (n) {
                return n = this.Statement(n), n.object = this.visit(n.object), n.body = this.visit(n.body), n
            }, n.SwitchStatement = ti = function (n) {
                function SwitchStatement(n, t) {
                    this.discriminant = n, this.cases = t, SwitchStatement.__super__.constructor.call(this)
                }
                return t(SwitchStatement, n), SwitchStatement
            }(r), i.prototype.SwitchStatement = function (n) {
                return n = this.Statement(n), n.discriminant = this.visit(n.discriminant), n.cases = this.visit(n.cases), n
            }, n.ReturnStatement = dt = function (n) {
                function ReturnStatement(n) {
                    this.argument = n, ReturnStatement.__super__.constructor.call(this)
                }
                return t(ReturnStatement, n), ReturnStatement
            }(r), i.prototype.ReturnStatement = function (n) {
                return n = this.Statement(n), n.argument = this.visit(n.argument), n
            }, n.ThrowStatement = ri = function (n) {
                function ThrowStatement(n) {
                    this.argument = n, ThrowStatement.__super__.constructor.call(this)
                }
                return t(ThrowStatement, n), ThrowStatement
            }(r), i.prototype.ThrowStatement = function (n) {
                return n = this.Statement(n), n.argument = this.visit(n.argument), n
            }, n.TryStatement = ui = function (n) {
                function TryStatement(n, t, i) {
                    this.block = n, this.handlers = t, this.finalizer = i, TryStatement.__super__.constructor.call(this)
                }
                return t(TryStatement, n), TryStatement
            }(r), i.prototype.TryStatement = function (n) {
                return n = this.Statement(n), n.block = this.visit(n.block), n.handlers = this.visit(n.handlers), n.finalizer = this.visit(n.finalizer), n
            }, n.WhileStatement = hi = function (n) {
                function WhileStatement(n, t) {
                    this.test = n, this.body = t, WhileStatement.__super__.constructor.call(this)
                }
                return t(WhileStatement, n), WhileStatement
            }(r), i.prototype.WhileStatement = function (n) {
                return n = this.Statement(n), n.test = this.visit(n.test), n.body = this.visit(n.body), n
            }, n.DoWhileStatement = tt = function (n) {
                function DoWhileStatement(n, t) {
                    this.body = n, this.test = t, DoWhileStatement.__super__.constructor.call(this)
                }
                return t(DoWhileStatement, n), DoWhileStatement
            }(r), i.prototype.DoWhileStatement = function (n) {
                return n = this.Statement(n), n.body = this.visit(n.body), n.test = this.visit(n.test), n
            }, n.ForStatement = ft = function (n) {
                function ForStatement(n, t, i, r) {
                    this.init = n, this.test = t, this.update = i, this.body = r, ForStatement.__super__.constructor.call(this)
                }
                return t(ForStatement, n), ForStatement
            }(r), i.prototype.ForStatement = function (n) {
                return n = this.Statement(n), n.init = this.visit(n.init), n.test = this.visit(n.test), n.update = this.visit(n.update), n.body = this.visit(n.body), n
            }, n.ForInStatement = ut = function (n) {
                function ForInStatement(n, t, i) {
                    this.left = n, this.right = t, this.body = i, ForInStatement.__super__.constructor.call(this)
                }
                return t(ForInStatement, n), ForInStatement
            }(r), i.prototype.ForInStatement = function (n) {
                return n = this.Statement(n), n.left = this.visit(n.left), n.right = this.visit(n.right), n.body = this.visit(n.body), n
            }, n.DebuggerStatement = nt = function (n) {
                function DebuggerStatement() {
                    DebuggerStatement.__super__.constructor.call(this)
                }
                return t(DebuggerStatement, n), DebuggerStatement
            }(r), i.prototype.DebuggerStatement = function (n) {
                return this.Statement(n)
            }, n.Declaration = e = function (n) {
                function Declaration() {
                    Declaration.__super__.constructor.call(this)
                }
                return t(Declaration, n), Declaration
            }(r), i.prototype.Declaration = function (n) {
                return this.Statement(n)
            }, n.FunctionDeclaration = ot = function (n) {
                function FunctionDeclaration(n, t, i) {
                    this.id = n, this.params = t, this.body = i, FunctionDeclaration.__super__.constructor.call(this)
                }
                return t(FunctionDeclaration, n), FunctionDeclaration
            }(e), i.prototype.FunctionDeclaration = function (n) {
                return n = this.Declaration(n), n.id = this.visit(n.id), n.params = this.visit(n.params), n.body = this.visit(n.body), n
            }, n.VariableDeclaration = oi = function (n) {
                function VariableDeclaration(n, t) {
                    this.declarations = n, this.kind = t, VariableDeclaration.__super__.constructor.call(this)
                }
                return t(VariableDeclaration, n), VariableDeclaration
            }(e), i.prototype.VariableDeclaration = function (n) {
                return n = this.Declaration(n), n.declarations = this.visit(n.declarations), n
            }, n.VariableDeclarator = si = function (n) {
                function VariableDeclarator(n, t) {
                    this.id = n, this.init = t, VariableDeclarator.__super__.constructor.call(this)
                }
                return t(VariableDeclarator, n), VariableDeclarator
            }(f), i.prototype.VariableDeclarator = function (n) {
                return n = this.JavaScriptNode(n), n.id = this.visit(n.id), n.init = this.visit(n.init), n
            }, n.Expression = u = function (n) {
                function Expression() {
                    return Expression.__super__.constructor.apply(this, arguments)
                }
                return t(Expression, n), Expression.prototype.constuctor = function () {
                    return Expression.__super__.constuctor.call(this)
                }, Expression
            }(f), i.prototype.Expression = function (n) {
                return this.JavaScriptNode(n)
            }, n.ThisExpression = ii = function (n) {
                function ThisExpression() {
                    ThisExpression.__super__.constructor.call(this)
                }
                return t(ThisExpression, n), ThisExpression
            }(u), i.prototype.ThisExpression = function (n) {
                return this.Expression(n)
            }, n.ArrayExpression = l = function (n) {
                function ArrayExpression(n) {
                    this.elements = n, ArrayExpression.__super__.constructor.call(this)
                }
                return t(ArrayExpression, n), ArrayExpression
            }(u), i.prototype.ArrayExpression = function (n) {
                return n = this.Expression(n), n.elements = this.visit(n.elements), n
            }, n.ObjectExpression = wt = function (n) {
                function ObjectExpression(n) {
                    this.properties = n, ObjectExpression.__super__.constructor.call(this)
                }
                return t(ObjectExpression, n), ObjectExpression
            }(u), i.prototype.ObjectExpression = function (n) {
                var t, i, u, r;
                for (n = this.Expression(n), r = n.properties, i = 0, u = r.length; i < u; i++) t = r[i], t.key = this.visit(t.key), t.value = this.visit(t.value);
                return n
            }, n.FunctionExpression = st = function (n) {
                function FunctionExpression(n, t, i) {
                    this.id = n, this.params = t, this.body = i, FunctionExpression.__super__.constructor.call(this)
                }
                return t(FunctionExpression, n), FunctionExpression
            }(u), i.prototype.FunctionExpression = function (n) {
                return n = this.Expression(n), n.id = this.visit(n.id), n.params = this.visit(n.params), n.body = this.visit(n.body), n
            }, n.SequenceExpression = gt = function (n) {
                function SequenceExpression(n) {
                    this.expressions = n, SequenceExpression.__super__.constructor.call(this)
                }
                return t(SequenceExpression, n), SequenceExpression
            }(u), i.prototype.SequenceExpression = function (n) {
                return n = this.Expression(n), n.expressions = this.visit(n.expressions), n
            }, n.UnaryExpression = fi = function (n) {
                function UnaryExpression(n, t, i) {
                    this.operator = n, this.prefix = t, this.argument = i, UnaryExpression.__super__.constructor.call(this)
                }
                return t(UnaryExpression, n), UnaryExpression
            }(u), i.prototype.UnaryExpression = function (n) {
                return n = this.Expression(n), n.argument = this.visit(n.argument), n
            }, n.BinaryExpression = y = function (n) {
                function BinaryExpression(n, t, i) {
                    this.operator = n, this.left = t, this.right = i, BinaryExpression.__super__.constructor.call(this)
                }
                return t(BinaryExpression, n), BinaryExpression
            }(u), i.prototype.BinaryExpression = function (n) {
                return n = this.Expression(n), n.left = this.visit(n.left), n.right = this.visit(n.right), n
            }, n.AssignmentExpression = v = function (n) {
                function AssignmentExpression(n, t, i) {
                    this.operator = n, this.left = t, this.right = i, AssignmentExpression.__super__.constructor.call(this)
                }
                return t(AssignmentExpression, n), AssignmentExpression
            }(u), i.prototype.AssignmentExpression = function (n) {
                return n = this.Expression(n), n.left = this.visit(n.left), n.right = this.visit(n.right), n
            }, n.UpdateExpression = ei = function (n) {
                function UpdateExpression(n, t, i) {
                    this.operator = n, this.argument = t, this.prefix = i, UpdateExpression.__super__.constructor.call(this)
                }
                return t(UpdateExpression, n), UpdateExpression
            }(u), i.prototype.UpdateExpression = function (n) {
                return n = this.Expression(n), n.argument = this.visit(n.argument), n
            }, n.LogicalExpression = vt = function (n) {
                function LogicalExpression(n, t, i) {
                    this.operator = n, this.left = t, this.right = i, LogicalExpression.__super__.constructor.call(this)
                }
                return t(LogicalExpression, n), LogicalExpression
            }(u), i.prototype.LogicalExpression = function (n) {
                return n = this.Expression(n), n.left = this.visit(n.left), n.right = this.visit(n.right), n
            }, n.ConditionalExpression = d = function (n) {
                function ConditionalExpression(n, t, i) {
                    this.test = n, this.alternate = t, this.consequent = i, ConditionalExpression.__super__.constructor.call(this)
                }
                return t(ConditionalExpression, n), ConditionalExpression
            }(u), i.prototype.ConditionalExpression = function (n) {
                return n = this.Expression(n), n.test = this.visit(n.test), n.alternate = this.visit(n.alternate), n.consequent = this.visit(n.consequent), n
            }, n.NewExpression = pt = function (n) {
                function NewExpression(n, t) {
                    this.callee = n, this.arguments = t, NewExpression.__super__.constructor.call(this)
                }
                return t(NewExpression, n), NewExpression
            }(u), i.prototype.NewExpression = function (n) {
                return n = this.Expression(n), n.callee = this.visit(n.callee), n.arguments = this.visit(n.arguments), n
            }, n.CallExpression = b = function (n) {
                function CallExpression(n, t) {
                    this.callee = n, this.arguments = t, CallExpression.__super__.constructor.call(this)
                }
                return t(CallExpression, n), CallExpression
            }(u), i.prototype.CallExpression = function (n) {
                return n = this.Expression(n), n.callee = this.visit(n.callee), n.arguments = this.visit(n.arguments), n
            }, n.MemberExpression = yt = function (n) {
                function MemberExpression(n, t, i) {
                    this.object = n, this.property = t, this.computed = i, MemberExpression.__super__.constructor.call(this)
                }
                return t(MemberExpression, n), MemberExpression
            }(u), i.prototype.MemberExpression = function (n) {
                return n = this.Expression(n), n.object = this.visit(n.object), n.property = this.visit(n.property), n
            }, n.Pattern = o = function (n) {
                function Pattern() {
                    Pattern.__super__.constructor.call(this)
                }
                return t(Pattern, n), Pattern
            }(f), i.prototype.Pattern = function (n) {
                return this.JavaScriptNode(n)
            }, n.ObjectPattern = bt = function (n) {
                function ObjectPattern(n) {
                    this.properties = n, ObjectPattern.__super__.constructor.call(this)
                }
                return t(ObjectPattern, n), ObjectPattern
            }(o), i.prototype.ObjectPattern = function (n) {
                var t, i, u, r;
                for (n = this.Pattern(n), r = n.properties, i = 0, u = r.length; i < u; i++) t = r[i], t.key = this.visit(t.key), t.value = this.visit(t.value);
                return n
            }, n.ArrayPattern = a = function (n) {
                function ArrayPattern(n) {
                    this.elements = n, ArrayPattern.__super__.constructor.call(this)
                }
                return t(ArrayPattern, n), ArrayPattern
            }(o), i.prototype.ArrayPattern = function (n) {
                return n = this.Pattern(n), n.elements = this.visit(n.elements), n
            }, n.SwitchCase = ni = function (n) {
                function SwitchCase(n, t) {
                    this.test = n, this.consequent = t, SwitchCase.__super__.constructor.call(this)
                }
                return t(SwitchCase, n), SwitchCase
            }(f), i.prototype.SwitchCase = function (n) {
                return n = this.JavaScriptNode(n), n.test = this.visit(n.test), n.consequent = this.visit(n.consequent), n
            }, n.CatchClause = k = function (n) {
                function CatchClause(n, t) {
                    this.param = n, this.body = t, CatchClause.__super__.constructor.call(this)
                }
                return t(CatchClause, n), CatchClause
            }(f), i.prototype.CatchClause = function (n) {
                return n = this.JavaScriptNode(n), n.param = this.visit(n.param), n.body = this.visit(n.body), n
            }, n.Identifier = ht = function (n) {
                function Identifier(n) {
                    this.name = n, Identifier.__super__.constructor.call(this)
                }
                return t(Identifier, n), Identifier
            }(f), i.prototype.Identifier = function (n) {
                return this.JavaScriptNode(n)
            }, n.Literal = at = function (n) {
                function Literal(n) {
                    this.value = n, Literal.__super__.constructor.call(this)
                }
                return t(Literal, n), Literal
            }(u), i.prototype.Literal = function (n) {
                return this.Expression(n)
            }
        }).call(this)
    }, t.JavaScriptToQueryVisitor = function (n) {
        (function () {
            var r, u, t, i, f = {}.hasOwnProperty,
                e = function (n, t) {
                    function ctor() {
                        this.constructor = n
                    }
                    for (var i in t) f.call(t, i) && (n[i] = t[i]);
                    return ctor.prototype = t.prototype, n.prototype = new ctor, n.__super__ = t.prototype, n
                };
            i = require("./Utilities"), r = require("./JavaScriptNodes"), t = require("./QueryNodes"), n.JavaScriptToQueryVisitor = u = function (n) {
                function JavaScriptToQueryVisitor(n) {
                    this.context = n
                }
                return e(JavaScriptToQueryVisitor, n), JavaScriptToQueryVisitor.prototype.getSource = function (n) {
                    var t, i;
                    return this.context.source.slice(n != null ? (t = n.range) != null ? t[0] : void 0 : void 0, +((n != null ? (i = n.range) != null ? i[1] : void 0 : void 0) - 1) + 1 || 9e9)
                }, JavaScriptToQueryVisitor.prototype.invalid = function (n) {
                    throw "The expression '" + this.getSource(n) + "'' is not supported.";
                }, JavaScriptToQueryVisitor.prototype.translateUnary = function (n, i) {
                    var r, u;
                    return r = i[n.operator], r ? (u = this.visit(n.argument), new t.UnaryExpression(r, u)) : null
                }, JavaScriptToQueryVisitor.prototype.translateBinary = function (n, i) {
                    var u, r, f;
                    return r = i[n.operator], r ? (u = this.visit(n.left), f = this.visit(n.right), new t.BinaryExpression(r, u, f)) : null
                }, JavaScriptToQueryVisitor.prototype.visit = function (n) {
                    var t;
                    return t = JavaScriptToQueryVisitor.__super__.visit.call(this, n), n === t && this.invalid(n), t
                }, JavaScriptToQueryVisitor.prototype.MemberExpression = function (n) {
                    var i;
                    return i = function () {
                        var i, r, u, f;
                        return (n != null ? (i = n.object) != null ? i.type : void 0 : void 0) === "ThisExpression" && (n != null ? (r = n.property) != null ? r.type : void 0 : void 0) === "Identifier" ? new t.MemberExpression(n.property.name) : (n != null ? (u = n.object) != null ? u.type : void 0 : void 0) === "MemberExpression" && ((f = n.object.object) != null ? f.type : void 0) === "ThisExpression" && n.property.type === "Identifier" && n.property.name === "length" ? new t.InvocationExpression(t.Methods.Length, new t.MemberExpression(n.object.property.name)) : void 0
                    }(), i != null ? i : JavaScriptToQueryVisitor.__super__.MemberExpression.call(this, n)
                }, JavaScriptToQueryVisitor.prototype.Literal = function (n) {
                    return new t.ConstantExpression(n.value)
                }, JavaScriptToQueryVisitor.prototype.UnaryExpression = function (n) {
                    var i, r;
                    return n.operator === "+" ? this.visit(n.argument) : (i = {
                        "!": t.UnaryOperators.Not,
                        "-": t.UnaryOperators.Negate
                    }, (r = this.translateUnary(n, i)) != null ? r : JavaScriptToQueryVisitor.__super__.UnaryExpression.call(this, n))
                }, JavaScriptToQueryVisitor.prototype.UpdateExpression = function (n) {
                    var i, r;
                    return i = {
                        "++": t.UnaryOperators.Increment,
                        "--": t.UnaryOperators.Decrement
                    }, (r = this.translateUnary(n, i)) != null ? r : JavaScriptToQueryVisitor.__super__.UpdateExpression.call(this, n)
                }, JavaScriptToQueryVisitor.prototype.LogicalExpression = function (n) {
                    var i, r;
                    return i = {
                        "&&": t.BinaryOperators.And,
                        "||": t.BinaryOperators.Or
                    }, (r = this.translateBinary(n, i)) != null ? r : JavaScriptToQueryVisitor.__super__.LogicalExpression.call(this, n)
                }, JavaScriptToQueryVisitor.prototype.BinaryExpression = function (n) {
                    var f, e, o, u, s, r, h;
                    return o = {
                        "+": t.BinaryOperators.Add,
                        "-": t.BinaryOperators.Subtract,
                        "*": t.BinaryOperators.Multiply,
                        "/": t.BinaryOperators.Divide,
                        "%": t.BinaryOperators.Modulo,
                        ">": t.BinaryOperators.GreaterThan,
                        ">=": t.BinaryOperators.GreaterThanOrEqual,
                        "<": t.BinaryOperators.LessThan,
                        "<=": t.BinaryOperators.LessThanOrEqual,
                        "!=": t.BinaryOperators.NotEqual,
                        "!==": t.BinaryOperators.NotEqual,
                        "==": t.BinaryOperators.Equal,
                        "===": t.BinaryOperators.Equal
                    },
                    function () {
                        var c, l;
                        return (h = this.translateBinary(n, o)) != null ? h : n.operator === "in" && ((c = n.right) != null ? c.type : void 0) === "Literal" && i.isArray((l = n.right) != null ? l.value : void 0) ? n.right.value.length > 0 ? (e = this.visit(n.left), t.QueryExpression.groupClauses(t.BinaryOperators.Or, function () {
                            var o, l, h, c;
                            for (h = n.right.value, c = [], o = 0, l = h.length; o < l; o++) {
                                if (r = h[o], i.isObject(r)) {
                                    if (u = function () {
                                        var n = [];
                                        for (f in r) s = r[f], n.push(s);
                                        return n
                                    }(), (u != null ? u.length : void 0) !== 1) throw "in operator requires comparison objects with a single field, not " + r + " (" + JSON.stringify(r) + "), for expression '" + this.getSource(n) + "'";
                                    r = u[0]
                                }
                                c.push(new t.BinaryExpression(t.BinaryOperators.Equal, e, new t.ConstantExpression(r)))
                            }
                            return c
                        }.call(this))) : new t.BinaryExpression(t.BinaryOperators.Equal, new t.ConstantExpression(!0), new t.ConstantExpression(!1)) : JavaScriptToQueryVisitor.__super__.BinaryExpression.call(this, n)
                    }.call(this)
                }, JavaScriptToQueryVisitor.prototype.CallExpression = function (n) {
                    var o, e, u, s, r, i, h, f = this;
                    return u = function (t) {
                        var i;
                        if (((i = n.arguments) != null ? i.length : void 0) !== 1) throw "Function " + t + " expects one argument in expression '" + f.getSource(n) + "'";
                        return f.visit(n.arguments[0])
                    }, s = function (t, i) {
                        var r;
                        if (((r = n.arguments) != null ? r.length : void 0) !== 2) throw "Function " + i + " expects two arguments in expression '" + f.getSource(n) + "'";
                        return [t, f.visit(n.arguments[0]), f.visit(n.arguments[1])]
                    }, e = n != null ? (h = n.callee) != null ? h.value : void 0 : void 0, o = function () {
                        var f, o, h, c, l, a, v;
                        if (e === Math.floor) return new t.InvocationExpression(t.Methods.Floor, [u("floor")]);
                        if (e === Math.ceil) return new t.InvocationExpression(t.Methods.Ceiling, [u("ceil")]);
                        if (e === Math.round) return new t.InvocationExpression(t.Methods.Round, [u("round")]);
                        if (n.callee.type === "MemberExpression" && ((f = n.callee.object) != null ? f.__hasThisExp : void 0) === !0) {
                            if (r = (n != null ? (o = n.callee) != null ? (h = o.object) != null ? h.type : void 0 : void 0 : void 0) === "CallExpression" ? this.visit(n.callee.object) : new t.MemberExpression((c = n.callee.object) != null ? (l = c.property) != null ? l.name : void 0 : void 0), i = (a = n.callee) != null ? (v = a.property) != null ? v.name : void 0 : void 0, i === "toUpperCase") return new t.InvocationExpression(t.Methods.ToUpperCase, [r]);
                            if (i === "toLowerCase") return new t.InvocationExpression(t.Methods.ToLowerCase, [r]);
                            if (i === "trim") return new t.InvocationExpression(t.Methods.Trim, [r]);
                            if (i === "indexOf") return new t.InvocationExpression(t.Methods.IndexOf, [r, u("indexOf")]);
                            if (i === "concat") return new t.InvocationExpression(t.Methods.Concat, [r, u("concat")]);
                            if (i === "substring") return new t.InvocationExpression(t.Methods.Substring, s(r, "substring"));
                            if (i === "replace") return new t.InvocationExpression(t.Methods.Replace, s(r, "replace"));
                            if (i === "getFullYear" || i === "getUTCFullYear") return new t.InvocationExpression(t.Methods.Year, [r]);
                            if (i === "getYear") return new t.BinaryExpression(t.BinaryOperators.Subtract, new t.InvocationExpression(t.Methods.Year, [r]), new t.ConstantExpression(1900));
                            if (i === "getMonth" || i === "getUTCMonth") return new t.BinaryExpression(t.BinaryOperators.Subtract, new t.InvocationExpression(t.Methods.Month, [r]), new t.ConstantExpression(1));
                            if (i === "getDate" || i === "getUTCDate") return new t.InvocationExpression(t.Methods.Day, [r])
                        }
                    }.call(this), o != null ? o : JavaScriptToQueryVisitor.__super__.CallExpression.call(this, n)
                }, JavaScriptToQueryVisitor
            }(r.JavaScriptVisitor)
        }).call(this)
    }, t.Node = function (n) {
        (function () {
            var i, r, t;
            t = require("./Utilities"), n.Node = i = function () {
                function Node() {
                    this.type = t.functionName(this.constructor)
                }
                return Node.prototype.type = "Node", Node
            }(), n.Visitor = r = function () {
                function Visitor() { }
                return Visitor.prototype.visit = function (n) {
                    var u, i, f, r;
                    if (t.isArray(n)) {
                        for (r = [], i = 0, f = n.length; i < f; i++) u = n[i], r.push(this.visit(u));
                        return r
                    }
                    if (n != null ? n.type : void 0) {
                        if (t.isFunction(this[n.type])) return this[n.type](n);
                        throw "Unsupported expression " + this.getSource(n);
                    } else return n
                }, Visitor.prototype.getSource = function () {
                    return null
                }, Visitor
            }()
        }).call(this)
    }, t.ODataProvider = function (n) {
        (function () {
            var r, f, i, u, t, e = {}.hasOwnProperty,
                o = function (n, t) {
                    function ctor() {
                        this.constructor = n
                    }
                    for (var i in t) e.call(t, i) && (n[i] = t[i]);
                    return ctor.prototype = t.prototype, n.prototype = new ctor, n.__super__ = t.prototype, n
                };
            t = require("./Utilities"), i = require("./QueryNodes"), u = require("./Query").Query, n.ODataProvider = f = function () {
                function ODataProvider() { }
                return ODataProvider.prototype.toQuery = function (n) {
                    var t, i, r;
                    return t = this.toOData(n, !0), r = "/" + t.table, i = "?", t.filters && (r += "" + i + "$filter=" + t.filters, i = "&"), t.ordering && (r += "" + i + "$orderby=" + t.ordering, i = "&"), t.skip && (r += "" + i + "$skip=" + t.skip, i = "&"), (t.take || t.take === 0) && (r += "" + i + "$top=" + t.take, i = "&"), t.selections && (r += "" + i + "$select=" + t.selections, i = "&"), t.includeTotalCount && (r += "" + i + "$inlinecount=allpages"), r
                }, ODataProvider.prototype.toOData = function (n, t) {
                    var e, i, u, f, o, s;
                    return t != null || (t = !1), i = (o = n != null ? n.getComponents() : void 0) != null ? o : {}, f = function () {
                        var n, t;
                        n = i != null ? i.ordering : void 0, t = [];
                        for (u in n) e = n[u], t.push(e ? u : "" + u + " desc");
                        return t
                    }(), {
                        table: i != null ? i.table : void 0,
                        filters: r.convert(i.filters, t),
                        ordering: f != null ? f.toString() : void 0,
                        skip: i != null ? i.skip : void 0,
                        take: i != null ? i.take : void 0,
                        selections: i != null ? (s = i.selections) != null ? s.toString() : void 0 : void 0,
                        includeTotalCount: i != null ? i.includeTotalCount : void 0
                    }
                }, ODataProvider.prototype.fromOData = function (n, t, i, r, f, e, o) {
                    var a, h, w, s, c, l, b, k, d, v, y, p;
                    for (s = new u(n), t && s.where(t), (r || r === 0) && s.skip(r), (f || f === 0) && s.take(f), o && s.includeTotalCount(), v = (d = e != null ? e.split(",") : void 0) != null ? d : [], c = 0, b = v.length; c < b; c++) h = v[c], s.select(h.trim());
                    for (y = function () {
                        var n, u, f, t, r;
                        for (t = (f = i != null ? i.split(",") : void 0) != null ? f : [], r = [], n = 0, u = t.length; n < u; n++) w = t[n], r.push(w.trim().split(" "));
                        return r
                    }(), l = 0, k = y.length; l < k; l++) p = y[l], h = p[0], a = p[1], (a != null ? a.toUpperCase() : void 0) !== "DESC" ? s.orderBy(h) : s.orderByDescending(h);
                    return s
                }, ODataProvider
            }(), r = function (n) {
                function ODataFilterQueryVisitor(n) {
                    this.encodeForUri = n
                }
                return o(ODataFilterQueryVisitor, n), ODataFilterQueryVisitor.convert = function (n, t) {
                    var i, r;
                    return i = new ODataFilterQueryVisitor(t), (r = n ? i.visit(n) : void 0) != null ? r : null
                }, ODataFilterQueryVisitor.prototype.toOData = function (n) {
                    var i;
                    if (t.isNumber(n) || t.isBoolean(n)) return n.toString();
                    if (t.isString(n)) return n = n.replace(/'/g, "''"), this.encodeForUri != null && this.encodeForUri === !0 && (n = encodeURIComponent(n)), "'" + n + "'";
                    if (t.isDate(n)) return i = JSON.stringify(n), i.length > 2 && (i = i.slice(1, +(i.length - 2) + 1 || 9e9)), i = i.replace(/(T\d{2}:\d{2}:\d{2})Z$/, function (t, i) {
                        var r;
                        return r = String(n.getMilliseconds() + 1e3).substring(1), "" + i + "." + r + "Z"
                    }), "datetime'" + i + "'";
                    if (n) throw "Unsupported literal value " + n;
                    else return "null"
                }, ODataFilterQueryVisitor.prototype.ConstantExpression = function (n) {
                    return this.toOData(n.value)
                }, ODataFilterQueryVisitor.prototype.MemberExpression = function (n) {
                    return n.member
                }, ODataFilterQueryVisitor.prototype.UnaryExpression = function (n) {
                    if (n.operator === i.UnaryOperators.Not) return "not " + this.visit(n.operand);
                    if (n.operator === i.UnaryOperators.Negate) return "(0 sub " + this.visit(n.operand) + ")";
                    throw "Unsupported operator " + n.operator;
                }, ODataFilterQueryVisitor.prototype.BinaryExpression = function (n) {
                    var i, t;
                    if (i = {
                        And: "and",
                        Or: "or",
                        Add: "add",
                        Subtract: "sub",
                        Multiply: "mul",
                        Divide: "div",
                        Modulo: "mod",
                        GreaterThan: "gt",
                        GreaterThanOrEqual: "ge",
                        LessThan: "lt",
                        LessThanOrEqual: "le",
                        NotEqual: "ne",
                        Equal: "eq"
                    }, t = i[n.operator], t) return "(" + this.visit(n.left) + " " + t + " " + this.visit(n.right) + ")";
                    throw "Unsupported operator " + n.operator;
                }, ODataFilterQueryVisitor.prototype.InvocationExpression = function (n) {
                    var i, t;
                    if (i = {
                        Length: "length",
                        ToUpperCase: "toupper",
                        ToLowerCase: "tolower",
                        Trim: "trim",
                        IndexOf: "indexof",
                        Replace: "replace",
                        Substring: "substring",
                        Concat: "concat",
                        Day: "day",
                        Month: "month",
                        Year: "year",
                        Floor: "floor",
                        Ceiling: "ceiling",
                        Round: "round"
                    }, t = i[n.method], t) return "" + t + "(" + this.visit(n.args) + ")";
                    throw "Invocation of unsupported method " + n.method;
                }, ODataFilterQueryVisitor.prototype.LiteralExpression = function (n) {
                    var t, r, i, u, e, f;
                    for (i = "", r = !1, f = n.queryString, u = 0, e = f.length; u < e; u++)
                        if (t = f[u], r) i += t, r = t !== "'";
                        else if (t === "?") {
                            if (!n.args || n.args.length <= 0) throw "Too few arguments for " + n.queryString + ".";
                            i += this.toOData(n.args.shift())
                        } else t === "'" ? (i += t, r = !0) : i += t; if (n.args && n.args.length > 0) throw "Too many arguments for " + n.queryString;
                    return i
                }, ODataFilterQueryVisitor
            }(i.QueryExpressionVisitor)
        }).call(this)
    }, t.PartialEvaluator = function (n) {
        (function () {
            var r, t, f, i, e = {}.hasOwnProperty,
                u = function (n, t) {
                    function ctor() {
                        this.constructor = n
                    }
                    for (var i in t) e.call(t, i) && (n[i] = t[i]);
                    return ctor.prototype = t.prototype, n.prototype = new ctor, n.__super__ = t.prototype, n
                };
            i = require("./Utilities"), t = require("./JavaScriptNodes"), n.PartialEvaluator = f = function (n) {
                function PartialEvaluator(n) {
                    this.context = n
                }
                return u(PartialEvaluator, n), PartialEvaluator.prototype.visit = function (n) {
                    var i, u, f, e, r, o, s, h, c, l;
                    return n.__independent && n.type !== "Literal" && n.type ? n.type === "Identifier" && this.context.environment[n.name] ? new t.Literal(this.context.environment[n.name]) : (f = this.context.source.slice(n != null ? (s = n.range) != null ? s[0] : void 0 : void 0, +((n != null ? (h = n.range) != null ? h[1] : void 0 : void 0) - 1) + 1 || 9e9), u = (c = function () {
                        var n, t;
                        n = this.context.environment, t = [];
                        for (i in n) r = n[i], t.push(i);
                        return t
                    }.call(this)) != null ? c : [], o = (l = function () {
                        var n, t;
                        n = this.context.environment, t = [];
                        for (i in n) r = n[i], t.push(JSON.stringify(r));
                        return t
                    }.call(this)) != null ? l : [], e = "(function(" + u + ") { return " + f + "; })(" + o + ")", r = eval(e), new t.Literal(r)) : PartialEvaluator.__super__.visit.call(this, n)
                }, PartialEvaluator.evaluate = function (n) {
                    var t, i;
                    return i = new r(n), i.visit(n.expression), t = new PartialEvaluator(n), t.visit(n.expression)
                }, PartialEvaluator
            }(t.JavaScriptVisitor), n.IndependenceNominator = r = function (n) {
                function IndependenceNominator(n) {
                    this.context = n
                }
                return u(IndependenceNominator, n), IndependenceNominator.prototype.Literal = function (n) {
                    return IndependenceNominator.__super__.Literal.call(this, n), n.__independent = !0, n.__hasThisExp = !1, n
                }, IndependenceNominator.prototype.ThisExpression = function (n) {
                    return IndependenceNominator.__super__.ThisExpression.call(this, n), n.__independent = !1, n.__hasThisExp = !0, n
                }, IndependenceNominator.prototype.Identifier = function (n) {
                    return IndependenceNominator.__super__.Identifier.call(this, n), n.__independent = !0, n.__hasThisExp = !1, n
                }, IndependenceNominator.prototype.MemberExpression = function (n) {
                    var t;
                    return IndependenceNominator.__super__.MemberExpression.call(this, n), n.__hasThisExp = (t = n.object) != null ? t.__hasThisExp : void 0, n.__hasThisExp && (n.__independent = !1, n != null && (n.property.__independent = !1)), n
                }, IndependenceNominator.prototype.CallExpression = function (n) {
                    return IndependenceNominator.__super__.CallExpression.call(this, n), n.__hasThisExp = n.callee.__hasThisExp, n
                }, IndependenceNominator.prototype.ObjectExpression = function (n) {
                    var u, t, i, r, o, s, f, e;
                    for (IndependenceNominator.__super__.ObjectExpression.call(this, n), f = n.properties, i = 0, o = f.length; i < o; i++) t = f[i], t.key.__independent = !1;
                    for (u = !0, e = n.properties, r = 0, s = e.length; r < s; r++) t = e[r], u &= t.value.__independent;
                    return n.__independent = u ? !0 : !1, n
                }, IndependenceNominator.prototype.visit = function (n) {
                    var r, f, e, o, t, u, s;
                    if (IndependenceNominator.__super__.visit.call(this, n), !Object.prototype.hasOwnProperty.call(n, "__independent")) {
                        r = !0, f = function (n) {
                            var r;
                            return i.isObject(n) ? (r = t.__independent) != null ? r : !1 : !0
                        };
                        for (e in n)
                            if (t = n[e], i.isArray(t))
                                for (u = 0, s = t.length; u < s; u++) o = t[u], r &= f(o);
                            else i.isObject(t) && (r &= f(t));
                        n.__independent = r ? !0 : !1
                    }
                    return n
                }, IndependenceNominator
            }(t.JavaScriptVisitor)
        }).call(this)
    }, t.Query = function (n) {
        (function () {
            var u, f, i, e, t, r = [].slice;
            t = require("./Utilities"), i = require("./QueryNodes"), u = require("./JavaScript").JavaScript, n.Query = e = function () {
                function Query(n, f) {
                    var y, s, l, h, c, o, a, p, v, e;
                    if (!n || !t.isString(n)) throw "Expected the name of a table!";
                    p = n, y = f, s = null, c = null, o = [], h = {}, a = null, v = null, l = !1, e = 0, this.getComponents = function () {
                        return {
                            filters: s,
                            selections: o,
                            projection: c,
                            ordering: h,
                            skip: a,
                            take: v,
                            table: p,
                            context: y,
                            includeTotalCount: l,
                            version: e
                        }
                    }, this.setComponents = function (n) {
                        var t, i, r, u, f, w, b, k, d;
                        return e++, s = (t = n != null ? n.filters : void 0) != null ? t : null, o = (i = n != null ? n.selections : void 0) != null ? i : [], c = (r = n != null ? n.projection : void 0) != null ? r : null, h = (u = n != null ? n.ordering : void 0) != null ? u : {}, a = (f = n != null ? n.skip : void 0) != null ? f : null, v = (w = n != null ? n.take : void 0) != null ? w : null, l = (b = n != null ? n.includeTotalCount : void 0) != null ? b : !1, p = (k = n != null ? n.table : void 0) != null ? k : null, y = (d = n != null ? n.context : void 0) != null ? d : null, this
                    }, this.where = function () {
                        var f, n, o, h, c;
                        return n = arguments[0], f = 2 <= arguments.length ? r.call(arguments, 1) : [], e++, o = function () {
                            if (t.isFunction(n)) return u.transformConstraint(n, f);
                            if (t.isObject(n)) return i.QueryExpression.groupClauses(i.BinaryOperators.And, function () {
                                var t = [];
                                for (h in n) c = n[h], t.push(o = new i.BinaryExpression(i.BinaryOperators.Equal, new i.MemberExpression(h), new i.ConstantExpression(c)));
                                return t
                            }());
                            if (t.isString(n)) return new i.LiteralExpression(n, f);
                            throw "Expected a function, object, or string, not " + n;
                        }(), s = i.QueryExpression.groupClauses(i.BinaryOperators.And, [s, o]), this
                    }, this.select = function () {
                        var i, s, n, f, h;
                        if (n = arguments[0], s = 2 <= arguments.length ? r.call(arguments, 1) : [], e++, t.isString(n))
                            for (o.push(n), f = 0, h = s.length; f < h; f++) {
                                if (i = s[f], !t.isString(i)) throw "Expected string parameters, not " + i;
                                o.push(i)
                            } else if (t.isFunction(n)) c = n, o = u.getProjectedFields(c);
                            else throw "Expected a string or a function, not " + n;
                        return this
                    }, this.orderBy = function () {
                        var n, u, i, f;
                        for (u = 1 <= arguments.length ? r.call(arguments, 0) : [], e++, i = 0, f = u.length; i < f; i++) {
                            if (n = u[i], !t.isString(n)) throw "Expected string parameters, not " + n;
                            h[n] = !0
                        }
                        return this
                    }, this.orderByDescending = function () {
                        var n, u, i, f;
                        for (u = 1 <= arguments.length ? r.call(arguments, 0) : [], e++, i = 0, f = u.length; i < f; i++) {
                            if (n = u[i], !t.isString(n)) throw "Expected string parameters, not " + n;
                            h[n] = !1
                        }
                        return this
                    }, this.skip = function (n) {
                        if (e++, !t.isNumber(n)) throw "Expected a number, not " + n;
                        return a = n, this
                    }, this.take = function (n) {
                        if (e++, !t.isNumber(n)) throw "Expected a number, not " + n;
                        return v = n, this
                    }, this.includeTotalCount = function () {
                        return e++, l = !0, this
                    }
                }
                return Query.registerProvider = function (n, t) {
                    return Query.Providers[n] = t, Query.prototype["to" + n] = function () {
                        if (t != null) return typeof t.toQuery == "function" ? t.toQuery(this) : void 0
                    }
                }, Query.Providers = {}, Query.Expressions = i, Query
            }(), f = require("./ODataProvider").ODataProvider, e.registerProvider("OData", new f)
        }).call(this)
    }, t.QueryNodes = function (n) {
        (function () {
            var f, s, h, c, l, e, i, r, a, o, u, v = {}.hasOwnProperty,
                t = function (n, t) {
                    function ctor() {
                        this.constructor = n
                    }
                    for (var i in t) v.call(t, i) && (n[i] = t[i]);
                    return ctor.prototype = t.prototype, n.prototype = new ctor, n.__super__ = t.prototype, n
                };
            u = require("./Node"), e = u.Node, o = u.Visitor, n.QueryExpression = i = function (n) {
                function QueryExpression() {
                    QueryExpression.__super__.constructor.call(this)
                }
                return t(QueryExpression, n), QueryExpression.groupClauses = function (n, t) {
                    var i;
                    return i = function (t, i) {
                        return t ? i ? new f(n, t, i) : t : i
                    }, t.reduce(i, null)
                }, QueryExpression
            }(e), n.QueryExpressionVisitor = r = function (n) {
                function QueryExpressionVisitor() {
                    QueryExpressionVisitor.__super__.constructor.call(this)
                }
                return t(QueryExpressionVisitor, n), QueryExpressionVisitor.prototype.QueryExpression = function (n) {
                    return n
                }, QueryExpressionVisitor
            }(o), n.ConstantExpression = s = function (n) {
                function ConstantExpression(n) {
                    this.value = n, ConstantExpression.__super__.constructor.call(this)
                }
                return t(ConstantExpression, n), ConstantExpression
            }(i), r.prototype.ConstantExpression = function (n) {
                return this.QueryExpression(n)
            }, n.MemberExpression = l = function (n) {
                function MemberExpression(n) {
                    this.member = n, MemberExpression.__super__.constructor.call(this)
                }
                return t(MemberExpression, n), MemberExpression
            }(i), r.prototype.MemberExpression = function (n) {
                return this.QueryExpression(n)
            }, n.BinaryExpression = f = function (n) {
                function BinaryExpression(n, t, i) {
                    this.operator = n, this.left = t, this.right = i, BinaryExpression.__super__.constructor.call(this)
                }
                return t(BinaryExpression, n), BinaryExpression
            }(i), r.prototype.BinaryExpression = function (n) {
                return n = this.QueryExpression(n), n.left = this.visit(n.left), n.right = this.visit(n.right), n
            }, n.BinaryOperators = {
                And: "And",
                Or: "Or",
                Add: "Add",
                Subtract: "Subtract",
                Multiply: "Multiply",
                Divide: "Divide",
                Modulo: "Modulo",
                GreaterThan: "GreaterThan",
                GreaterThanOrEqual: "GreaterThanOrEqual",
                LessThan: "LessThan",
                LessThanOrEqual: "LessThanOrEqual",
                NotEqual: "NotEqual",
                Equal: "Equal"
            }, n.UnaryExpression = a = function (n) {
                function UnaryExpression(n, t) {
                    this.operator = n, this.operand = t, UnaryExpression.__super__.constructor.call(this)
                }
                return t(UnaryExpression, n), UnaryExpression
            }(i), r.prototype.UnaryExpression = function (n) {
                return n = this.QueryExpression(n), n.operand = this.visit(n.operand), n
            }, n.UnaryOperators = {
                Not: "Not",
                Negate: "Negate",
                Increment: "Increment",
                Decrement: "Decrement"
            }, n.InvocationExpression = h = function (n) {
                function InvocationExpression(n, t) {
                    this.method = n, this.args = t, InvocationExpression.__super__.constructor.call(this)
                }
                return t(InvocationExpression, n), InvocationExpression
            }(i), r.prototype.InvocationExpression = function (n) {
                return n = this.QueryExpression(n), n.args = this.visit(n.args), n
            }, n.Methods = {
                Length: "Length",
                ToUpperCase: "ToUpperCase",
                ToLowerCase: "ToLowerCase",
                Trim: "Trim",
                IndexOf: "IndexOf",
                Replace: "Replace",
                Substring: "Substring",
                Concat: "Concat",
                Day: "Day",
                Month: "Month",
                Year: "Year",
                Floor: "Floor",
                Ceiling: "Ceiling",
                Round: "Round"
            }, n.LiteralExpression = c = function (n) {
                function LiteralExpression(n, t) {
                    this.queryString = n, this.args = t != null ? t : [], LiteralExpression.__super__.constructor.call(this)
                }
                return t(LiteralExpression, n), LiteralExpression
            }(i), r.prototype.LiteralExpression = function (n) {
                return this.QueryExpression(n)
            }
        }).call(this)
    }, t.Utilities = function (n) {
        (function () {
            var t, i = [].slice;
            t = function (n) {
                return Object.prototype.toString.call(n).slice(8, -1).toLowerCase()
            }, Array.prototype.reduce != null || (Array.prototype.reduce = function () {
                var u, n, f, t, r, e;
                if (u = arguments[0], e = 2 <= arguments.length ? i.call(arguments, 1) : [], n = this, f = n.length, t = 0, r = void 0, !(n != null)) throw new TypeError("Object is null or undefined");
                if (typeof u != "function") throw new TypeError("First argument is not callable");
                if (e.length === 0)
                    if (f === 0) throw new TypeError("Array length is 0 and no second argument");
                    else r = n[0], t = 1;
                else r = e[0];
                while (t < f) t in n && (r = u.call(void 0, r, n[t], n)), ++t;
                return r
            }), Array.prototype.map != null || (Array.prototype.map = function (n, t) {
                var e, i, r, o, u, f, s;
                if (!(typeof this != "undefined" && this !== null)) throw new TypeError("this is null or not defined");
                if (typeof n != "function") throw new TypeError(n + " is not a function");
                for (t = t ? t : void 0, r = Object(this), o = r.length >>> 0, u = new Array(o), i = f = 0, s = r.length; f < s; i = ++f) e = r[i], i in r && (u[i] = n.call(t, e, i, r));
                return u
            }), Array.isArray != null || (Array.isArray = function (n) {
                return Object.prototype.toString.call(n) === "[object Array]"
            }), n.isObject = function (n) {
                return Object.prototype.toString.call(n).slice(8, -1).toLowerCase() === "object"
            }, n.isString = function (n) {
                return typeof n == "string"
            }, n.isFunction = function (n) {
                return typeof n == "function"
            }, n.isArray = Array.isArray, n.isNumber = function (n) {
                return typeof n == "number"
            }, n.isBoolean = function (n) {
                return typeof n == "boolean"
            }, n.isDate = function (n) {
                return t(n) === "date"
            }, n.functionName = function (n) {
                var r, t, i;
                return typeof Function.prototype.name == "function" ? Function.prototype.name.call(n) : (i = n.toString(), t = "function ", i.slice(0, +(t.length - 1) + 1 || 9e9) === t && (r = i.indexOf("(", t.length), r > t.length)) ? i.slice(t.length, +(r - 1) + 1 || 9e9) : null
            }
        }).call(this)
    }, t.esprima = function (n) {
        (function (n) {
            "use strict";

            function assert(n, t) {
                if (!n) throw new Error("ASSERT: " + t);
            }

            function sliceSource(n, t) {
                return e.slice(n, t)
            }

            function isDecimalDigit(n) {
                return "0123456789".indexOf(n) >= 0
            }

            function isHexDigit(n) {
                return "0123456789abcdefABCDEF".indexOf(n) >= 0
            }

            function isOctalDigit(n) {
                return "01234567".indexOf(n) >= 0
            }

            function isWhiteSpace(n) {
                return n === " " || n === "\t" || n === "\x0b" || n === "\f" || n === " " || n.charCodeAt(0) >= 5760 && " ᠎             　﻿".indexOf(n) >= 0
            }

            function isLineTerminator(n) {
                return n === "\n" || n === "\r" || n === "\u2028" || n === "\u2029"
            }

            function isIdentifierStart(n) {
                return n === "$" || n === "_" || n === "\\" || n >= "a" && n <= "z" || n >= "A" && n <= "Z" || n.charCodeAt(0) >= 128 && p.NonAsciiIdentifierStart.test(n)
            }

            function isIdentifierPart(n) {
                return n === "$" || n === "_" || n === "\\" || n >= "a" && n <= "z" || n >= "A" && n <= "Z" || n >= "0" && n <= "9" || n.charCodeAt(0) >= 128 && p.NonAsciiIdentifierPart.test(n)
            }

            function isFutureReservedWord(n) {
                switch (n) {
                    case "class":
                    case "enum":
                    case "export":
                    case "extends":
                    case "import":
                    case "super":
                        return !0
                }
                return !1
            }

            function isStrictModeReservedWord(n) {
                switch (n) {
                    case "implements":
                    case "interface":
                    case "package":
                    case "private":
                    case "protected":
                    case "public":
                    case "static":
                    case "yield":
                    case "let":
                        return !0
                }
                return !1
            }

            function isRestrictedWord(n) {
                return n === "eval" || n === "arguments"
            }

            function isKeyword(n) {
                var t = !1;
                switch (n.length) {
                    case 2:
                        t = n === "if" || n === "in" || n === "do";
                        break;
                    case 3:
                        t = n === "var" || n === "for" || n === "new" || n === "try";
                        break;
                    case 4:
                        t = n === "this" || n === "else" || n === "case" || n === "void" || n === "with";
                        break;
                    case 5:
                        t = n === "while" || n === "break" || n === "catch" || n === "throw";
                        break;
                    case 6:
                        t = n === "return" || n === "typeof" || n === "delete" || n === "switch";
                        break;
                    case 7:
                        t = n === "default" || n === "finally";
                        break;
                    case 8:
                        t = n === "function" || n === "continue" || n === "debugger";
                        break;
                    case 10:
                        t = n === "instanceof"
                }
                if (t) return !0;
                switch (n) {
                    case "const":
                        return !0;
                    case "yield":
                    case "let":
                        return !0
                }
                return l && isStrictModeReservedWord(n) ? !0 : isFutureReservedWord(n)
            }

            function nextChar() {
                return e[t++]
            }

            function skipComment() {
                for (var n, i = !1, r = !1; t < s;)
                    if (n = e[t], r) n = nextChar(), isLineTerminator(n) && (r = !1, n === "\r" && e[t] === "\n" && ++t, ++h, c = t);
                    else if (i) isLineTerminator(n) ? (n === "\r" && e[t + 1] === "\n" && ++t, ++h, ++t, c = t, t >= s && throwError({}, u.UnexpectedToken, "ILLEGAL")) : (n = nextChar(), t >= s && throwError({}, u.UnexpectedToken, "ILLEGAL"), n === "*" && (n = e[t], n === "/" && (++t, i = !1)));
                    else if (n === "/")
                        if (n = e[t + 1], n === "/") t += 2, r = !0;
                        else if (n === "*") t += 2, i = !0, t >= s && throwError({}, u.UnexpectedToken, "ILLEGAL");
                        else break;
                    else if (isWhiteSpace(n))++t;
                    else if (isLineTerminator(n))++t, n === "\r" && e[t] === "\n" && ++t, ++h, c = t;
                    else break
            }

            function scanHexEscape(n) {
                for (var f, r = 0, u = n === "u" ? 4 : 2, i = 0; i < u; ++i)
                    if (t < s && isHexDigit(e[t])) f = nextChar(), r = r * 16 + "0123456789abcdef".indexOf(f.toLowerCase());
                    else return "";
                return String.fromCharCode(r)
            }

            function scanIdentifier() {
                var n, r, i, u;
                if (n = e[t], isIdentifierStart(n)) {
                    if (r = t, n === "\\") {
                        if (++t, e[t] !== "u") return;
                        if (++t, u = t, n = scanHexEscape("u"), n) {
                            if (n === "\\" || !isIdentifierStart(n)) return;
                            i = n
                        } else t = u, i = "u"
                    } else i = nextChar();
                    while (t < s) {
                        if (n = e[t], !isIdentifierPart(n)) break;
                        if (n === "\\") {
                            if (++t, e[t] !== "u") return;
                            if (++t, u = t, n = scanHexEscape("u"), n) {
                                if (n === "\\" || !isIdentifierPart(n)) return;
                                i += n
                            } else t = u, i += "u"
                        } else i += nextChar()
                    }
                    return i.length === 1 ? {
                        type: f.Identifier,
                        value: i,
                        lineNumber: h,
                        lineStart: c,
                        range: [r, t]
                    } : isKeyword(i) ? {
                        type: f.Keyword,
                        value: i,
                        lineNumber: h,
                        lineStart: c,
                        range: [r, t]
                    } : i === "null" ? {
                        type: f.NullLiteral,
                        value: i,
                        lineNumber: h,
                        lineStart: c,
                        range: [r, t]
                    } : i === "true" || i === "false" ? {
                        type: f.BooleanLiteral,
                        value: i,
                        lineNumber: h,
                        lineStart: c,
                        range: [r, t]
                    } : {
                        type: f.Identifier,
                        value: i,
                        lineNumber: h,
                        lineStart: c,
                        range: [r, t]
                    }
                }
            }

            function scanPunctuator() {
                var r = t,
                    n = e[t],
                    i, u, o;
                return n === ";" || n === "{" || n === "}" ? (++t, {
                    type: f.Punctuator,
                    value: n,
                    lineNumber: h,
                    lineStart: c,
                    range: [r, t]
                }) : n === "," || n === "(" || n === ")" ? (++t, {
                    type: f.Punctuator,
                    value: n,
                    lineNumber: h,
                    lineStart: c,
                    range: [r, t]
                }) : (i = e[t + 1], n === "." && !isDecimalDigit(i)) ? {
                    type: f.Punctuator,
                    value: nextChar(),
                    lineNumber: h,
                    lineStart: c,
                    range: [r, t]
                } : (u = e[t + 2], o = e[t + 3], n === ">" && i === ">" && u === ">" && o === "=") ? (t += 4, {
                    type: f.Punctuator,
                    value: ">>>=",
                    lineNumber: h,
                    lineStart: c,
                    range: [r, t]
                }) : n === "=" && i === "=" && u === "=" ? (t += 3, {
                    type: f.Punctuator,
                    value: "===",
                    lineNumber: h,
                    lineStart: c,
                    range: [r, t]
                }) : n === "!" && i === "=" && u === "=" ? (t += 3, {
                    type: f.Punctuator,
                    value: "!==",
                    lineNumber: h,
                    lineStart: c,
                    range: [r, t]
                }) : n === ">" && i === ">" && u === ">" ? (t += 3, {
                    type: f.Punctuator,
                    value: ">>>",
                    lineNumber: h,
                    lineStart: c,
                    range: [r, t]
                }) : n === "<" && i === "<" && u === "=" ? (t += 3, {
                    type: f.Punctuator,
                    value: "<<=",
                    lineNumber: h,
                    lineStart: c,
                    range: [r, t]
                }) : n === ">" && i === ">" && u === "=" ? (t += 3, {
                    type: f.Punctuator,
                    value: ">>=",
                    lineNumber: h,
                    lineStart: c,
                    range: [r, t]
                }) : i === "=" && "<>=!+-*%&|^/".indexOf(n) >= 0 ? (t += 2, {
                    type: f.Punctuator,
                    value: n + i,
                    lineNumber: h,
                    lineStart: c,
                    range: [r, t]
                }) : n === i && "+-<>&|".indexOf(n) >= 0 && "+-<>&|".indexOf(i) >= 0 ? (t += 2, {
                    type: f.Punctuator,
                    value: n + i,
                    lineNumber: h,
                    lineStart: c,
                    range: [r, t]
                }) : "[]<>+-*%&|^!~?:=/".indexOf(n) >= 0 ? {
                    type: f.Punctuator,
                    value: nextChar(),
                    lineNumber: h,
                    lineStart: c,
                    range: [r, t]
                } : void 0
            }

            function scanNumericLiteral() {
                var i, r, n;
                if (n = e[t], assert(isDecimalDigit(n) || n === ".", "Numeric literal must start with a decimal digit or a decimal point"), r = t, i = "", n !== ".") {
                    if (i = nextChar(), n = e[t], i === "0") {
                        if (n === "x" || n === "X") {
                            for (i += nextChar() ; t < s;) {
                                if (n = e[t], !isHexDigit(n)) break;
                                i += nextChar()
                            }
                            return i.length <= 2 && throwError({}, u.UnexpectedToken, "ILLEGAL"), t < s && (n = e[t], isIdentifierStart(n) && throwError({}, u.UnexpectedToken, "ILLEGAL")), {
                                type: f.NumericLiteral,
                                value: parseInt(i, 16),
                                lineNumber: h,
                                lineStart: c,
                                range: [r, t]
                            }
                        }
                        if (isOctalDigit(n)) {
                            for (i += nextChar() ; t < s;) {
                                if (n = e[t], !isOctalDigit(n)) break;
                                i += nextChar()
                            }
                            return t < s && (n = e[t], (isIdentifierStart(n) || isDecimalDigit(n)) && throwError({}, u.UnexpectedToken, "ILLEGAL")), {
                                type: f.NumericLiteral,
                                value: parseInt(i, 8),
                                octal: !0,
                                lineNumber: h,
                                lineStart: c,
                                range: [r, t]
                            }
                        }
                        isDecimalDigit(n) && throwError({}, u.UnexpectedToken, "ILLEGAL")
                    }
                    while (t < s) {
                        if (n = e[t], !isDecimalDigit(n)) break;
                        i += nextChar()
                    }
                }
                if (n === ".")
                    for (i += nextChar() ; t < s;) {
                        if (n = e[t], !isDecimalDigit(n)) break;
                        i += nextChar()
                    }
                if (n === "e" || n === "E")
                    if (i += nextChar(), n = e[t], (n === "+" || n === "-") && (i += nextChar()), n = e[t], isDecimalDigit(n))
                        for (i += nextChar() ; t < s;) {
                            if (n = e[t], !isDecimalDigit(n)) break;
                            i += nextChar()
                        } else n = "character " + n, t >= s && (n = "<end>"), throwError({}, u.UnexpectedToken, "ILLEGAL");
                return t < s && (n = e[t], isIdentifierStart(n) && throwError({}, u.UnexpectedToken, "ILLEGAL")), {
                    type: f.NumericLiteral,
                    value: parseFloat(i),
                    lineNumber: h,
                    lineStart: c,
                    range: [r, t]
                }
            }

            function scanStringLiteral() {
                var i = "",
                    o, v, n, r, l, y, a = !1;
                for (o = e[t], assert(o === "'" || o === '"', "String literal must starts with a quote"), v = t, ++t; t < s;)
                    if (n = nextChar(), n === o) {
                        o = "";
                        break
                    } else if (n === "\\")
                        if (n = nextChar(), isLineTerminator(n))++h, n === "\r" && e[t] === "\n" && ++t;
                        else switch (n) {
                            case "n":
                                i += "\n";
                                break;
                            case "r":
                                i += "\r";
                                break;
                            case "t":
                                i += "\t";
                                break;
                            case "u":
                            case "x":
                                y = t, l = scanHexEscape(n), l ? i += l : (t = y, i += n);
                                break;
                            case "b":
                                i += "\b";
                                break;
                            case "f":
                                i += "\f";
                                break;
                            case "v":
                                i += '\v';
                                break;
                            default:
                                isOctalDigit(n) ? (r = "01234567".indexOf(n), r !== 0 && (a = !0), t < s && isOctalDigit(e[t]) && (a = !0, r = r * 8 + "01234567".indexOf(nextChar()), "0123".indexOf(n) >= 0 && t < s && isOctalDigit(e[t]) && (r = r * 8 + "01234567".indexOf(nextChar()))), i += String.fromCharCode(r)) : i += n
                        } else if (isLineTerminator(n)) break;
                        else i += n; return o !== "" && throwError({}, u.UnexpectedToken, "ILLEGAL"), {
                            type: f.StringLiteral,
                            value: i,
                            octal: a,
                            lineNumber: h,
                            lineStart: c,
                            range: [v, t]
                        }
            }

            function scanRegExp() {
                var i = "",
                    n, h, c, r, l, o = !1,
                    f;
                for (a = null, skipComment(), h = t, n = e[t], assert(n === "/", "Regular expression literal must start with a slash"), i = nextChar() ; t < s;)
                    if (n = nextChar(), i += n, o) n === "]" && (o = !1);
                    else if (n === "\\") n = nextChar(), isLineTerminator(n) && throwError({}, u.UnterminatedRegExp), i += n;
                    else if (n === "/") break;
                    else n === "[" ? o = !0 : isLineTerminator(n) && throwError({}, u.UnterminatedRegExp);
                for (i.length === 1 && throwError({}, u.UnterminatedRegExp), c = i.substr(1, i.length - 2), r = ""; t < s;) {
                    if (n = e[t], !isIdentifierPart(n)) break;
                    if (++t, n === "\\" && t < s)
                        if (n = e[t], n === "u")
                            if (++t, f = t, n = scanHexEscape("u"), n)
                                for (r += n, i += "\\u"; f < t; ++f) i += e[f];
                            else t = f, r += "u", i += "\\u";
                        else i += "\\";
                    else r += n, i += n
                }
                try {
                    l = new RegExp(c, r)
                } catch (v) {
                    throwError({}, u.InvalidRegExp)
                }
                return {
                    literal: i,
                    value: l,
                    range: [h, t]
                }
            }

            function isIdentifierName(n) {
                return n.type === f.Identifier || n.type === f.Keyword || n.type === f.BooleanLiteral || n.type === f.NullLiteral
            }

            function advance() {
                var i, n;
                if (skipComment(), t >= s) return {
                    type: f.EOF,
                    lineNumber: h,
                    lineStart: c,
                    range: [t, t]
                };
                if (n = scanPunctuator(), typeof n != "undefined") return n;
                if (i = e[t], i === "'" || i === '"') return scanStringLiteral();
                if (i === "." || isDecimalDigit(i)) return scanNumericLiteral();
                if (n = scanIdentifier(), typeof n != "undefined") return n;
                throwError({}, u.UnexpectedToken, "ILLEGAL")
            }

            function lex() {
                var n;
                return a ? (t = a.range[1], h = a.lineNumber, c = a.lineStart, n = a, a = null, n) : (a = null, advance())
            }

            function lookahead() {
                var n, i, r;
                return a !== null ? a : (n = t, i = h, r = c, a = advance(), t = n, h = i, c = r, a)
            }

            function peekLineTerminator() {
                var i, n, r, u;
                return i = t, n = h, r = c, skipComment(), u = h !== n, t = i, h = n, c = r, u
            }

            function throwError(n, i) {
                var r, f = Array.prototype.slice.call(arguments, 2),
                    u = i.replace(/%(\d)/g, function (n, t) {
                        return f[t] || ""
                    });
                typeof n.lineNumber == "number" ? (r = new Error("Line " + n.lineNumber + ": " + u), r.index = n.range[0], r.lineNumber = n.lineNumber, r.column = n.range[0] - c + 1) : (r = new Error("Line " + h + ": " + u), r.index = t, r.lineNumber = h, r.column = t - c + 1);
                throw r;
            }

            function throwErrorTolerant() {
                try {
                    throwError.apply(null, arguments)
                } catch (n) {
                    if (i.errors) i.errors.push(n);
                    else throw n;
                }
            }

            function throwUnexpected(n) {
                n.type === f.EOF && throwError(n, u.UnexpectedEOS), n.type === f.NumericLiteral && throwError(n, u.UnexpectedNumber), n.type === f.StringLiteral && throwError(n, u.UnexpectedString), n.type === f.Identifier && throwError(n, u.UnexpectedIdentifier), n.type === f.Keyword && (isFutureReservedWord(n.value) ? throwError(n, u.UnexpectedReserved) : l && isStrictModeReservedWord(n.value) && throwError(n, u.StrictReservedWord), throwError(n, u.UnexpectedToken, n.value)), throwError(n, u.UnexpectedToken, n.value)
            }

            function expect(n) {
                var t = lex();
                (t.type !== f.Punctuator || t.value !== n) && throwUnexpected(t)
            }

            function expectKeyword(n) {
                var t = lex();
                (t.type !== f.Keyword || t.value !== n) && throwUnexpected(t)
            }

            function match(n) {
                var t = lookahead();
                return t.type === f.Punctuator && t.value === n
            }

            function matchKeyword(n) {
                var t = lookahead();
                return t.type === f.Keyword && t.value === n
            }

            function matchAssign() {
                var t = lookahead(),
                    n = t.value;
                return t.type !== f.Punctuator ? !1 : n === "=" || n === "*=" || n === "/=" || n === "%=" || n === "+=" || n === "-=" || n === "<<=" || n === ">>=" || n === ">>>=" || n === "&=" || n === "^=" || n === "|="
            }

            function consumeSemicolon() {
                var n, i;
                if (e[t] === ";") {
                    lex();
                    return
                }
                if (i = h, skipComment(), h === i) {
                    if (match(";")) {
                        lex();
                        return
                    }
                    n = lookahead(), n.type === f.EOF || match("}") || throwUnexpected(n);
                    return
                }
            }

            function isLeftHandSide(n) {
                return n.type === r.Identifier || n.type === r.MemberExpression
            }

            function parseArrayInitialiser() {
                var n = [],
                    t;
                for (expect("[") ; !match("]") ;) match(",") ? (lex(), n.push(t)) : (n.push(parseAssignmentExpression()), match("]") || expect(","));
                return expect("]"), {
                    type: r.ArrayExpression,
                    elements: n
                }
            }

            function parsePropertyFunction(n, t) {
                var i, f;
                return i = l, f = parseFunctionSourceElements(), t && l && isRestrictedWord(n[0].name) && throwError(t, u.StrictParamName), l = i, {
                    type: r.FunctionExpression,
                    id: null,
                    params: n,
                    body: f
                }
            }

            function parseObjectPropertyKey() {
                var n = lex();
                return n.type === f.StringLiteral || n.type === f.NumericLiteral ? (l && n.octal && throwError(n, u.StrictOctalLiteral), createLiteral(n)) : {
                    type: r.Identifier,
                    name: n.value
                }
            }

            function parseObjectProperty() {
                var n, t, i, u;
                if (n = lookahead(), n.type === f.Identifier) return i = parseObjectPropertyKey(), n.value !== "get" || match(":") ? n.value !== "set" || match(":") ? (expect(":"), {
                    type: r.Property,
                    key: i,
                    value: parseAssignmentExpression(),
                    kind: "init"
                }) : (t = parseObjectPropertyKey(), expect("("), n = lookahead(), n.type !== f.Identifier && throwUnexpected(lex()), u = [parseVariableIdentifier()], expect(")"), {
                    type: r.Property,
                    key: t,
                    value: parsePropertyFunction(u, n),
                    kind: "set"
                }) : (t = parseObjectPropertyKey(), expect("("), expect(")"), {
                    type: r.Property,
                    key: t,
                    value: parsePropertyFunction([]),
                    kind: "get"
                });
                if (n.type === f.EOF || n.type === f.Punctuator) throwUnexpected(n);
                else return t = parseObjectPropertyKey(), expect(":"), {
                    type: r.Property,
                    key: t,
                    value: parseAssignmentExpression(),
                    kind: "init"
                }
            }

            function parseObjectInitialiser() {
                var e = [],
                    n, i, t, f = {}, o = String;
                for (expect("{") ; !match("}") ;) n = parseObjectProperty(), i = n.key.type === r.Identifier ? n.key.name : o(n.key.value), t = n.kind === "init" ? y.Data : n.kind === "get" ? y.Get : y.Set, Object.prototype.hasOwnProperty.call(f, i) ? (f[i] === y.Data ? l && t === y.Data ? throwErrorTolerant({}, u.StrictDuplicateProperty) : t !== y.Data && throwError({}, u.AccessorDataProperty) : t === y.Data ? throwError({}, u.AccessorDataProperty) : f[i] & t && throwError({}, u.AccessorGetSet), f[i] |= t) : f[i] = t, e.push(n), match("}") || expect(",");
                return expect("}"), {
                    type: r.ObjectExpression,
                    properties: e
                }
            }

            function parsePrimaryExpression() {
                var i, n = lookahead(),
                    t = n.type;
                if (t === f.Identifier) return {
                    type: r.Identifier,
                    name: lex().value
                };
                if (t === f.StringLiteral || t === f.NumericLiteral) return l && n.octal && throwErrorTolerant(n, u.StrictOctalLiteral), createLiteral(lex());
                if (t === f.Keyword) {
                    if (matchKeyword("this")) return lex(), {
                        type: r.ThisExpression
                    };
                    if (matchKeyword("function")) return parseFunctionExpression()
                }
                return t === f.BooleanLiteral ? (lex(), n.value = n.value === "true", createLiteral(n)) : t === f.NullLiteral ? (lex(), n.value = null, createLiteral(n)) : match("[") ? parseArrayInitialiser() : match("{") ? parseObjectInitialiser() : match("(") ? (lex(), o.lastParenthesized = i = parseExpression(), expect(")"), i) : match("/") || match("/=") ? createLiteral(scanRegExp()) : throwUnexpected(lex())
            }

            function parseArguments() {
                var n = [];
                if (expect("("), !match(")"))
                    while (t < s) {
                        if (n.push(parseAssignmentExpression()), match(")")) break;
                        expect(",")
                    }
                return expect(")"), n
            }

            function parseNonComputedProperty() {
                var n = lex();
                return isIdentifierName(n) || throwUnexpected(n), {
                    type: r.Identifier,
                    name: n.value
                }
            }

            function parseNonComputedMember(n) {
                return {
                    type: r.MemberExpression,
                    computed: !1,
                    object: n,
                    property: parseNonComputedProperty()
                }
            }

            function parseComputedMember(n) {
                var t, i;
                return expect("["), t = parseExpression(), i = {
                    type: r.MemberExpression,
                    computed: !0,
                    object: n,
                    property: t
                }, expect("]"), i
            }

            function parseCallMember(n) {
                return {
                    type: r.CallExpression,
                    callee: n,
                    arguments: parseArguments()
                }
            }

            function parseNewExpression() {
                var n;
                return expectKeyword("new"), n = {
                    type: r.NewExpression,
                    callee: parseLeftHandSideExpression(),
                    arguments: []
                }, match("(") && (n.arguments = parseArguments()), n
            }

            function parseLeftHandSideExpressionAllowCall() {
                for (var i = matchKeyword("new"), n = i ? parseNewExpression() : parsePrimaryExpression() ; t < s;)
                    if (match(".")) lex(), n = parseNonComputedMember(n);
                    else if (match("[")) n = parseComputedMember(n);
                    else if (match("(")) n = parseCallMember(n);
                    else break;
                return n
            }

            function parseLeftHandSideExpression() {
                for (var i = matchKeyword("new"), n = i ? parseNewExpression() : parsePrimaryExpression() ; t < s;)
                    if (match(".")) lex(), n = parseNonComputedMember(n);
                    else if (match("[")) n = parseComputedMember(n);
                    else break;
                return n
            }

            function parsePostfixExpression() {
                var n = parseLeftHandSideExpressionAllowCall();
                return (match("++") || match("--")) && !peekLineTerminator() && (l && n.type === r.Identifier && isRestrictedWord(n.name) && throwError({}, u.StrictLHSPostfix), isLeftHandSide(n) || throwError({}, u.InvalidLHSInAssignment), n = {
                    type: r.UpdateExpression,
                    operator: lex().value,
                    argument: n,
                    prefix: !1
                }), n
            }

            function parseUnaryExpression() {
                var t, n;
                return match("++") || match("--") ? (t = lex(), n = parseUnaryExpression(), l && n.type === r.Identifier && isRestrictedWord(n.name) && throwError({}, u.StrictLHSPrefix), isLeftHandSide(n) || throwError({}, u.InvalidLHSInAssignment), {
                    type: r.UpdateExpression,
                    operator: t.value,
                    argument: n,
                    prefix: !0
                }) : match("+") || match("-") || match("~") || match("!") ? {
                    type: r.UnaryExpression,
                    operator: lex().value,
                    argument: parseUnaryExpression()
                } : matchKeyword("delete") || matchKeyword("void") || matchKeyword("typeof") ? (n = {
                    type: r.UnaryExpression,
                    operator: lex().value,
                    argument: parseUnaryExpression()
                }, l && n.operator === "delete" && n.argument.type === r.Identifier && throwErrorTolerant({}, u.StrictDelete), n) : parsePostfixExpression()
            }

            function parseMultiplicativeExpression() {
                for (var n = parseUnaryExpression() ; match("*") || match("/") || match("%") ;) n = {
                    type: r.BinaryExpression,
                    operator: lex().value,
                    left: n,
                    right: parseUnaryExpression()
                };
                return n
            }

            function parseAdditiveExpression() {
                for (var n = parseMultiplicativeExpression() ; match("+") || match("-") ;) n = {
                    type: r.BinaryExpression,
                    operator: lex().value,
                    left: n,
                    right: parseMultiplicativeExpression()
                };
                return n
            }

            function parseShiftExpression() {
                for (var n = parseAdditiveExpression() ; match("<<") || match(">>") || match(">>>") ;) n = {
                    type: r.BinaryExpression,
                    operator: lex().value,
                    left: n,
                    right: parseAdditiveExpression()
                };
                return n
            }

            function parseRelationalExpression() {
                var n, t;
                return t = o.allowIn, o.allowIn = !0, n = parseShiftExpression(), o.allowIn = t, match("<") || match(">") || match("<=") || match(">=") ? n = {
                    type: r.BinaryExpression,
                    operator: lex().value,
                    left: n,
                    right: parseRelationalExpression()
                } : o.allowIn && matchKeyword("in") ? (lex(), n = {
                    type: r.BinaryExpression,
                    operator: "in",
                    left: n,
                    right: parseRelationalExpression()
                }) : matchKeyword("instanceof") && (lex(), n = {
                    type: r.BinaryExpression,
                    operator: "instanceof",
                    left: n,
                    right: parseRelationalExpression()
                }), n
            }

            function parseEqualityExpression() {
                for (var n = parseRelationalExpression() ; match("==") || match("!=") || match("===") || match("!==") ;) n = {
                    type: r.BinaryExpression,
                    operator: lex().value,
                    left: n,
                    right: parseRelationalExpression()
                };
                return n
            }

            function parseBitwiseANDExpression() {
                for (var n = parseEqualityExpression() ; match("&") ;) lex(), n = {
                    type: r.BinaryExpression,
                    operator: "&",
                    left: n,
                    right: parseEqualityExpression()
                };
                return n
            }

            function parseBitwiseXORExpression() {
                for (var n = parseBitwiseANDExpression() ; match("^") ;) lex(), n = {
                    type: r.BinaryExpression,
                    operator: "^",
                    left: n,
                    right: parseBitwiseANDExpression()
                };
                return n
            }

            function parseBitwiseORExpression() {
                for (var n = parseBitwiseXORExpression() ; match("|") ;) lex(), n = {
                    type: r.BinaryExpression,
                    operator: "|",
                    left: n,
                    right: parseBitwiseXORExpression()
                };
                return n
            }

            function parseLogicalANDExpression() {
                for (var n = parseBitwiseORExpression() ; match("&&") ;) lex(), n = {
                    type: r.LogicalExpression,
                    operator: "&&",
                    left: n,
                    right: parseBitwiseORExpression()
                };
                return n
            }

            function parseLogicalORExpression() {
                for (var n = parseLogicalANDExpression() ; match("||") ;) lex(), n = {
                    type: r.LogicalExpression,
                    operator: "||",
                    left: n,
                    right: parseLogicalANDExpression()
                };
                return n
            }

            function parseConditionalExpression() {
                var n, t, i;
                return n = parseLogicalORExpression(), match("?") && (lex(), t = o.allowIn, o.allowIn = !0, i = parseAssignmentExpression(), o.allowIn = t, expect(":"), n = {
                    type: r.ConditionalExpression,
                    test: n,
                    consequent: i,
                    alternate: parseAssignmentExpression()
                }), n
            }

            function parseAssignmentExpression() {
                var n;
                return n = parseConditionalExpression(), matchAssign() && (isLeftHandSide(n) || throwError({}, u.InvalidLHSInAssignment), l && n.type === r.Identifier && isRestrictedWord(n.name) && throwError({}, u.StrictLHSAssignment), n = {
                    type: r.AssignmentExpression,
                    operator: lex().value,
                    left: n,
                    right: parseAssignmentExpression()
                }), n
            }

            function parseExpression() {
                var n = parseAssignmentExpression();
                if (match(","))
                    for (n = {
                        type: r.SequenceExpression,
                        expressions: [n]
                    }; t < s;) {
                        if (!match(",")) break;
                        lex(), n.expressions.push(parseAssignmentExpression())
                    }
                return n
            }

            function parseStatementList() {
                for (var i = [], n; t < s;) {
                    if (match("}")) break;
                    if (n = parseSourceElement(), typeof n == "undefined") break;
                    i.push(n)
                }
                return i
            }

            function parseBlock() {
                var n;
                return expect("{"), n = parseStatementList(), expect("}"), {
                    type: r.BlockStatement,
                    body: n
                }
            }

            function parseVariableIdentifier() {
                var n = lex();
                return n.type !== f.Identifier && throwUnexpected(n), {
                    type: r.Identifier,
                    name: n.value
                }
            }

            function parseVariableDeclaration(n) {
                var i = parseVariableIdentifier(),
                    t = null;
                return l && isRestrictedWord(i.name) && throwErrorTolerant({}, u.StrictVarName), n === "const" ? (expect("="), t = parseAssignmentExpression()) : match("=") && (lex(), t = parseAssignmentExpression()), {
                    type: r.VariableDeclarator,
                    id: i,
                    init: t
                }
            }

            function parseVariableDeclarationList(n) {
                for (var i = []; t < s;) {
                    if (i.push(parseVariableDeclaration(n)), !match(",")) break;
                    lex()
                }
                return i
            }

            function parseVariableStatement() {
                var n;
                return expectKeyword("var"), n = parseVariableDeclarationList(), consumeSemicolon(), {
                    type: r.VariableDeclaration,
                    declarations: n,
                    kind: "var"
                }
            }

            function parseConstLetDeclaration(n) {
                var t;
                return expectKeyword(n), t = parseVariableDeclarationList(n), consumeSemicolon(), {
                    type: r.VariableDeclaration,
                    declarations: t,
                    kind: n
                }
            }

            function parseEmptyStatement() {
                return expect(";"), {
                    type: r.EmptyStatement
                }
            }

            function parseExpressionStatement() {
                var n = parseExpression();
                return consumeSemicolon(), {
                    type: r.ExpressionStatement,
                    expression: n
                }
            }

            function parseIfStatement() {
                var t, i, n;
                return expectKeyword("if"), expect("("), t = parseExpression(), expect(")"), i = parseStatement(), matchKeyword("else") ? (lex(), n = parseStatement()) : n = null, {
                    type: r.IfStatement,
                    test: t,
                    consequent: i,
                    alternate: n
                }
            }

            function parseDoWhileStatement() {
                var n, t, i;
                return expectKeyword("do"), i = o.inIteration, o.inIteration = !0, n = parseStatement(), o.inIteration = i, expectKeyword("while"), expect("("), t = parseExpression(), expect(")"), match(";") && lex(), {
                    type: r.DoWhileStatement,
                    body: n,
                    test: t
                }
            }

            function parseWhileStatement() {
                var n, t, i;
                return expectKeyword("while"), expect("("), n = parseExpression(), expect(")"), i = o.inIteration, o.inIteration = !0, t = parseStatement(), o.inIteration = i, {
                    type: r.WhileStatement,
                    test: n,
                    body: t
                }
            }

            function parseForVariableDeclaration() {
                var n = lex();
                return {
                    type: r.VariableDeclaration,
                    declarations: parseVariableDeclarationList(),
                    kind: n.value
                }
            }

            function parseForStatement() {
                var n, i, f, t, e, s, h;
                return (n = i = f = null, expectKeyword("for"), expect("("), match(";") ? lex() : (matchKeyword("var") || matchKeyword("let") ? (o.allowIn = !1, n = parseForVariableDeclaration(), o.allowIn = !0, n.declarations.length === 1 && matchKeyword("in") && (lex(), t = n, e = parseExpression(), n = null)) : (o.allowIn = !1, n = parseExpression(), o.allowIn = !0, matchKeyword("in") && (isLeftHandSide(n) || throwError({}, u.InvalidLHSInForIn), lex(), t = n, e = parseExpression(), n = null)), typeof t == "undefined" && expect(";")), typeof t == "undefined" && (match(";") || (i = parseExpression()), expect(";"), match(")") || (f = parseExpression())), expect(")"), h = o.inIteration, o.inIteration = !0, s = parseStatement(), o.inIteration = h, typeof t == "undefined") ? {
                    type: r.ForStatement,
                    init: n,
                    test: i,
                    update: f,
                    body: s
                } : {
                    type: r.ForInStatement,
                    left: t,
                    right: e,
                    body: s,
                    each: !1
                }
            }

            function parseContinueStatement() {
                var i, n = null;
                return (expectKeyword("continue"), e[t] === ";") ? (lex(), o.inIteration || throwError({}, u.IllegalContinue), {
                    type: r.ContinueStatement,
                    label: null
                }) : peekLineTerminator() ? (o.inIteration || throwError({}, u.IllegalContinue), {
                    type: r.ContinueStatement,
                    label: null
                }) : (i = lookahead(), i.type === f.Identifier && (n = parseVariableIdentifier(), Object.prototype.hasOwnProperty.call(o.labelSet, n.name) || throwError({}, u.UnknownLabel, n.name)), consumeSemicolon(), n !== null || o.inIteration || throwError({}, u.IllegalContinue), {
                    type: r.ContinueStatement,
                    label: n
                })
            }

            function parseBreakStatement() {
                var i, n = null;
                return (expectKeyword("break"), e[t] === ";") ? (lex(), o.inIteration || o.inSwitch || throwError({}, u.IllegalBreak), {
                    type: r.BreakStatement,
                    label: null
                }) : peekLineTerminator() ? (o.inIteration || o.inSwitch || throwError({}, u.IllegalBreak), {
                    type: r.BreakStatement,
                    label: null
                }) : (i = lookahead(), i.type === f.Identifier && (n = parseVariableIdentifier(), Object.prototype.hasOwnProperty.call(o.labelSet, n.name) || throwError({}, u.UnknownLabel, n.name)), consumeSemicolon(), n !== null || o.inIteration || o.inSwitch || throwError({}, u.IllegalBreak), {
                    type: r.BreakStatement,
                    label: n
                })
            }

            function parseReturnStatement() {
                var i, n = null;
                return (expectKeyword("return"), o.inFunctionBody || throwErrorTolerant({}, u.IllegalReturn), e[t] === " " && isIdentifierStart(e[t + 1])) ? (n = parseExpression(), consumeSemicolon(), {
                    type: r.ReturnStatement,
                    argument: n
                }) : peekLineTerminator() ? {
                    type: r.ReturnStatement,
                    argument: null
                } : (match(";") || (i = lookahead(), match("}") || i.type === f.EOF || (n = parseExpression())), consumeSemicolon(), {
                    type: r.ReturnStatement,
                    argument: n
                })
            }

            function parseWithStatement() {
                var n, t;
                return l && throwErrorTolerant({}, u.StrictModeWith), expectKeyword("with"), expect("("), n = parseExpression(), expect(")"), t = parseStatement(), {
                    type: r.WithStatement,
                    object: n,
                    body: t
                }
            }

            function parseSwitchCase() {
                var n, u = [],
                    i;
                for (matchKeyword("default") ? (lex(), n = null) : (expectKeyword("case"), n = parseExpression()), expect(":") ; t < s;) {
                    if (match("}") || matchKeyword("default") || matchKeyword("case")) break;
                    if (i = parseStatement(), typeof i == "undefined") break;
                    u.push(i)
                }
                return {
                    type: r.SwitchCase,
                    test: n,
                    consequent: u
                }
            }

            function parseSwitchStatement() {
                var n, i, u;
                if (expectKeyword("switch"), expect("("), n = parseExpression(), expect(")"), expect("{"), match("}")) return lex(), {
                    type: r.SwitchStatement,
                    discriminant: n
                };
                for (i = [], u = o.inSwitch, o.inSwitch = !0; t < s;) {
                    if (match("}")) break;
                    i.push(parseSwitchCase())
                }
                return o.inSwitch = u, expect("}"), {
                    type: r.SwitchStatement,
                    discriminant: n,
                    cases: i
                }
            }

            function parseThrowStatement() {
                var n;
                return expectKeyword("throw"), peekLineTerminator() && throwError({}, u.NewlineAfterThrow), n = parseExpression(), consumeSemicolon(), {
                    type: r.ThrowStatement,
                    argument: n
                }
            }

            function parseCatchClause() {
                var n;
                return expectKeyword("catch"), expect("("), match(")") || (n = parseExpression(), l && n.type === r.Identifier && isRestrictedWord(n.name) && throwErrorTolerant({}, u.StrictCatchVariable)), expect(")"), {
                    type: r.CatchClause,
                    param: n,
                    guard: null,
                    body: parseBlock()
                }
            }

            function parseTryStatement() {
                var i, n = [],
                    t = null;
                return expectKeyword("try"), i = parseBlock(), matchKeyword("catch") && n.push(parseCatchClause()), matchKeyword("finally") && (lex(), t = parseBlock()), n.length !== 0 || t || throwError({}, u.NoCatchOrFinally), {
                    type: r.TryStatement,
                    block: i,
                    handlers: n,
                    finalizer: t
                }
            }

            function parseDebuggerStatement() {
                return expectKeyword("debugger"), consumeSemicolon(), {
                    type: r.DebuggerStatement
                }
            }

            function parseStatement() {
                var t = lookahead(),
                    n, i;
                if (t.type === f.EOF && throwUnexpected(t), t.type === f.Punctuator) switch (t.value) {
                    case ";":
                        return parseEmptyStatement();
                    case "{":
                        return parseBlock();
                    case "(":
                        return parseExpressionStatement()
                }
                if (t.type === f.Keyword) switch (t.value) {
                    case "break":
                        return parseBreakStatement();
                    case "continue":
                        return parseContinueStatement();
                    case "debugger":
                        return parseDebuggerStatement();
                    case "do":
                        return parseDoWhileStatement();
                    case "for":
                        return parseForStatement();
                    case "function":
                        return parseFunctionDeclaration();
                    case "if":
                        return parseIfStatement();
                    case "return":
                        return parseReturnStatement();
                    case "switch":
                        return parseSwitchStatement();
                    case "throw":
                        return parseThrowStatement();
                    case "try":
                        return parseTryStatement();
                    case "var":
                        return parseVariableStatement();
                    case "while":
                        return parseWhileStatement();
                    case "with":
                        return parseWithStatement()
                }
                return (n = parseExpression(), n.type === r.Identifier && match(":")) ? (lex(), Object.prototype.hasOwnProperty.call(o.labelSet, n.name) && throwError({}, u.Redeclaration, "Label", n.name), o.labelSet[n.name] = !0, i = parseStatement(), delete o.labelSet[n.name], {
                    type: r.LabeledStatement,
                    label: n,
                    body: i
                }) : (consumeSemicolon(), {
                    type: r.ExpressionStatement,
                    expression: n
                })
            }

            function parseFunctionSourceElements() {
                var n, h = [],
                    i, c, e, a, v, y, p;
                for (expect("{") ; t < s;) {
                    if (i = lookahead(), i.type !== f.StringLiteral) break;
                    if (n = parseSourceElement(), h.push(n), n.expression.type !== r.Literal) break;
                    c = sliceSource(i.range[0] + 1, i.range[1] - 1), c === "use strict" ? (l = !0, e && throwError(e, u.StrictOctalLiteral)) : !e && i.octal && (e = i)
                }
                for (a = o.labelSet, v = o.inIteration, y = o.inSwitch, p = o.inFunctionBody, o.labelSet = {}, o.inIteration = !1, o.inSwitch = !1, o.inFunctionBody = !0; t < s;) {
                    if (match("}")) break;
                    if (n = parseSourceElement(), typeof n == "undefined") break;
                    h.push(n)
                }
                return expect("}"), o.labelSet = a, o.inIteration = v, o.inSwitch = y, o.inFunctionBody = p, {
                    type: r.BlockStatement,
                    body: h
                }
            }

            function parseFunctionDeclaration() {
                var h, o, c = [],
                    a, n, i, f, v, e;
                if (expectKeyword("function"), n = lookahead(), h = parseVariableIdentifier(), l ? isRestrictedWord(n.value) && throwError(n, u.StrictFunctionName) : isRestrictedWord(n.value) ? (i = n, f = u.StrictFunctionName) : isStrictModeReservedWord(n.value) && (i = n, f = u.StrictReservedWord), expect("("), !match(")"))
                    for (e = {}; t < s;) {
                        if (n = lookahead(), o = parseVariableIdentifier(), l ? (isRestrictedWord(n.value) && throwError(n, u.StrictParamName), Object.prototype.hasOwnProperty.call(e, n.value) && throwError(n, u.StrictParamDupe)) : i || (isRestrictedWord(n.value) ? (i = n, f = u.StrictParamName) : isStrictModeReservedWord(n.value) ? (i = n, f = u.StrictReservedWord) : Object.prototype.hasOwnProperty.call(e, n.value) && (i = n, f = u.StrictParamDupe)), c.push(o), e[o.name] = !0, match(")")) break;
                        expect(",")
                    }
                return expect(")"), v = l, a = parseFunctionSourceElements(), l && i && throwError(i, f), l = v, {
                    type: r.FunctionDeclaration,
                    id: h,
                    params: c,
                    body: a
                }
            }

            function parseFunctionExpression() {
                var n, h = null,
                    i, f, o, c = [],
                    a, v, e;
                if (expectKeyword("function"), match("(") || (n = lookahead(), h = parseVariableIdentifier(), l ? isRestrictedWord(n.value) && throwError(n, u.StrictFunctionName) : isRestrictedWord(n.value) ? (i = n, f = u.StrictFunctionName) : isStrictModeReservedWord(n.value) && (i = n, f = u.StrictReservedWord)), expect("("), !match(")"))
                    for (e = {}; t < s;) {
                        if (n = lookahead(), o = parseVariableIdentifier(), l ? (isRestrictedWord(n.value) && throwError(n, u.StrictParamName), Object.prototype.hasOwnProperty.call(e, n.value) && throwError(n, u.StrictParamDupe)) : i || (isRestrictedWord(n.value) ? (i = n, f = u.StrictParamName) : isStrictModeReservedWord(n.value) ? (i = n, f = u.StrictReservedWord) : Object.prototype.hasOwnProperty.call(e, n.value) && (i = n, f = u.StrictParamDupe)), c.push(o), e[o.name] = !0, match(")")) break;
                        expect(",")
                    }
                return expect(")"), v = l, a = parseFunctionSourceElements(), l && i && throwError(i, f), l = v, {
                    type: r.FunctionExpression,
                    id: h,
                    params: c,
                    body: a
                }
            }

            function parseSourceElement() {
                var n = lookahead();
                if (n.type === f.Keyword) switch (n.value) {
                    case "const":
                    case "let":
                        return parseConstLetDeclaration(n.value);
                    case "function":
                        return parseFunctionDeclaration();
                    default:
                        return parseStatement()
                }
                if (n.type !== f.EOF) return parseStatement()
            }

            function parseSourceElements() {
                for (var n, o = [], i, h, e; t < s;) {
                    if (i = lookahead(), i.type !== f.StringLiteral) break;
                    if (n = parseSourceElement(), o.push(n), n.expression.type !== r.Literal) break;
                    h = sliceSource(i.range[0] + 1, i.range[1] - 1), h === "use strict" ? (l = !0, e && throwError(e, u.StrictOctalLiteral)) : !e && i.octal && (e = i)
                }
                while (t < s) {
                    if (n = parseSourceElement(), typeof n == "undefined") break;
                    o.push(n)
                }
                return o
            }

            function parseProgram() {
                return l = !1, {
                    type: r.Program,
                    body: parseSourceElements()
                }
            }

            function addComment(n, t, r, u) {
                (assert(typeof n == "number", "Comment must have valid position"), i.comments.length > 0 && i.comments[i.comments.length - 1].range[1] > n) || i.comments.push({
                    range: [n, t],
                    type: r,
                    value: u
                })
            }

            function scanComment() {
                var i, n, r, o, f;
                for (i = "", o = !1, f = !1; t < s;)
                    if (n = e[t], f) n = nextChar(), t >= s ? (f = !1, i += n, addComment(r, t, "Line", i)) : isLineTerminator(n) ? (f = !1, addComment(r, t, "Line", i), n === "\r" && e[t] === "\n" && ++t, ++h, c = t, i = "") : i += n;
                    else if (o) isLineTerminator(n) ? (n === "\r" && e[t + 1] === "\n" ? (++t, i += "\r\n") : i += n, ++h, ++t, c = t, t >= s && throwError({}, u.UnexpectedToken, "ILLEGAL")) : (n = nextChar(), t >= s && throwError({}, u.UnexpectedToken, "ILLEGAL"), i += n, n === "*" && (n = e[t], n === "/" && (i = i.substr(0, i.length - 1), o = !1, ++t, addComment(r, t, "Block", i), i = "")));
                    else if (n === "/")
                        if (n = e[t + 1], n === "/") r = t, t += 2, f = !0;
                        else if (n === "*") r = t, t += 2, o = !0, t >= s && throwError({}, u.UnexpectedToken, "ILLEGAL");
                        else break;
                    else if (isWhiteSpace(n))++t;
                    else if (isLineTerminator(n))++t, n === "\r" && e[t] === "\n" && ++t, ++h, c = t;
                    else break
            }

            function collectToken() {
                var n = i.advance(),
                    t, r;
                return n.type !== f.EOF && (t = [n.range[0], n.range[1]], r = sliceSource(n.range[0], n.range[1]), i.tokens.push({
                    type: v[n.type],
                    value: r,
                    range: t
                })), n
            }

            function collectRegex() {
                var r, u, n;
                return skipComment(), r = t, u = i.scanRegExp(), i.tokens.length > 0 && (n = i.tokens[i.tokens.length - 1], n.range[0] === r && n.type === "Punctuator" && (n.value === "/" || n.value === "/=") && i.tokens.pop()), i.tokens.push({
                    type: "RegularExpression",
                    value: u.literal,
                    range: [r, t]
                }), u
            }

            function createLiteral(n) {
                return {
                    type: r.Literal,
                    value: n.value
                }
            }

            function createRawLiteral(n) {
                return {
                    type: r.Literal,
                    value: n.value,
                    raw: sliceSource(n.range[0], n.range[1])
                }
            }

            function wrapTrackingFunction(n, i) {
                return function (u) {
                    function isBinary(n) {
                        return n.type === r.LogicalExpression || n.type === r.BinaryExpression
                    }

                    function visit(t) {
                        isBinary(t.left) && visit(t.left), isBinary(t.right) && visit(t.right), n && typeof t.range == "undefined" && (t.range = [t.left.range[0], t.right.range[1]]), i && typeof t.loc == "undefined" && (t.loc = {
                            start: t.left.loc.start,
                            end: t.right.loc.end
                        })
                    }
                    return function () {
                        var f, e, o;
                        return skipComment(), e = [t, 0], o = {
                            start: {
                                line: h,
                                column: t - c
                            }
                        }, f = u.apply(null, arguments), typeof f != "undefined" ? (n && (e[1] = t, f.range = e), i && (o.end = {
                            line: h,
                            column: t - c
                        }, f.loc = o), isBinary(f) && visit(f), f.type === r.MemberExpression && (typeof f.object.range != "undefined" && (f.range[0] = f.object.range[0]), typeof f.object.loc != "undefined" && (f.loc.start = f.object.loc.start)), f.type === r.CallExpression && (typeof f.callee.range != "undefined" && (f.range[0] = f.callee.range[0]), typeof f.callee.loc != "undefined" && (f.loc.start = f.callee.loc.start)), f) : void 0
                    }
                }
            }

            function patch() {
                var n;
                i.comments && (i.skipComment = skipComment, skipComment = scanComment), i.raw && (i.createLiteral = createLiteral, createLiteral = createRawLiteral), (i.range || i.loc) && (n = wrapTrackingFunction(i.range, i.loc), i.parseAdditiveExpression = parseAdditiveExpression, i.parseAssignmentExpression = parseAssignmentExpression, i.parseBitwiseANDExpression = parseBitwiseANDExpression, i.parseBitwiseORExpression = parseBitwiseORExpression, i.parseBitwiseXORExpression = parseBitwiseXORExpression, i.parseBlock = parseBlock, i.parseFunctionSourceElements = parseFunctionSourceElements, i.parseCallMember = parseCallMember, i.parseCatchClause = parseCatchClause, i.parseComputedMember = parseComputedMember, i.parseConditionalExpression = parseConditionalExpression, i.parseConstLetDeclaration = parseConstLetDeclaration, i.parseEqualityExpression = parseEqualityExpression, i.parseExpression = parseExpression, i.parseForVariableDeclaration = parseForVariableDeclaration, i.parseFunctionDeclaration = parseFunctionDeclaration, i.parseFunctionExpression = parseFunctionExpression, i.parseLogicalANDExpression = parseLogicalANDExpression, i.parseLogicalORExpression = parseLogicalORExpression, i.parseMultiplicativeExpression = parseMultiplicativeExpression, i.parseNewExpression = parseNewExpression, i.parseNonComputedMember = parseNonComputedMember, i.parseNonComputedProperty = parseNonComputedProperty, i.parseObjectProperty = parseObjectProperty, i.parseObjectPropertyKey = parseObjectPropertyKey, i.parsePostfixExpression = parsePostfixExpression, i.parsePrimaryExpression = parsePrimaryExpression, i.parseProgram = parseProgram, i.parsePropertyFunction = parsePropertyFunction, i.parseRelationalExpression = parseRelationalExpression, i.parseStatement = parseStatement, i.parseShiftExpression = parseShiftExpression, i.parseSwitchCase = parseSwitchCase, i.parseUnaryExpression = parseUnaryExpression, i.parseVariableDeclaration = parseVariableDeclaration, i.parseVariableIdentifier = parseVariableIdentifier, parseAdditiveExpression = n(i.parseAdditiveExpression), parseAssignmentExpression = n(i.parseAssignmentExpression), parseBitwiseANDExpression = n(i.parseBitwiseANDExpression), parseBitwiseORExpression = n(i.parseBitwiseORExpression), parseBitwiseXORExpression = n(i.parseBitwiseXORExpression), parseBlock = n(i.parseBlock), parseFunctionSourceElements = n(i.parseFunctionSourceElements), parseCallMember = n(i.parseCallMember), parseCatchClause = n(i.parseCatchClause), parseComputedMember = n(i.parseComputedMember), parseConditionalExpression = n(i.parseConditionalExpression), parseConstLetDeclaration = n(i.parseConstLetDeclaration), parseEqualityExpression = n(i.parseEqualityExpression), parseExpression = n(i.parseExpression), parseForVariableDeclaration = n(i.parseForVariableDeclaration), parseFunctionDeclaration = n(i.parseFunctionDeclaration), parseFunctionExpression = n(i.parseFunctionExpression), parseLogicalANDExpression = n(i.parseLogicalANDExpression), parseLogicalORExpression = n(i.parseLogicalORExpression), parseMultiplicativeExpression = n(i.parseMultiplicativeExpression), parseNewExpression = n(i.parseNewExpression), parseNonComputedMember = n(i.parseNonComputedMember), parseNonComputedProperty = n(i.parseNonComputedProperty), parseObjectProperty = n(i.parseObjectProperty), parseObjectPropertyKey = n(i.parseObjectPropertyKey), parsePostfixExpression = n(i.parsePostfixExpression), parsePrimaryExpression = n(i.parsePrimaryExpression), parseProgram = n(i.parseProgram), parsePropertyFunction = n(i.parsePropertyFunction), parseRelationalExpression = n(i.parseRelationalExpression), parseStatement = n(i.parseStatement), parseShiftExpression = n(i.parseShiftExpression), parseSwitchCase = n(i.parseSwitchCase), parseUnaryExpression = n(i.parseUnaryExpression), parseVariableDeclaration = n(i.parseVariableDeclaration), parseVariableIdentifier = n(i.parseVariableIdentifier)), typeof i.tokens != "undefined" && (i.advance = advance, i.scanRegExp = scanRegExp, advance = collectToken, scanRegExp = collectRegex)
            }

            function unpatch() {
                typeof i.skipComment == "function" && (skipComment = i.skipComment), i.raw && (createLiteral = i.createLiteral), (i.range || i.loc) && (parseAdditiveExpression = i.parseAdditiveExpression, parseAssignmentExpression = i.parseAssignmentExpression, parseBitwiseANDExpression = i.parseBitwiseANDExpression, parseBitwiseORExpression = i.parseBitwiseORExpression, parseBitwiseXORExpression = i.parseBitwiseXORExpression, parseBlock = i.parseBlock, parseFunctionSourceElements = i.parseFunctionSourceElements, parseCallMember = i.parseCallMember, parseCatchClause = i.parseCatchClause, parseComputedMember = i.parseComputedMember, parseConditionalExpression = i.parseConditionalExpression, parseConstLetDeclaration = i.parseConstLetDeclaration, parseEqualityExpression = i.parseEqualityExpression, parseExpression = i.parseExpression, parseForVariableDeclaration = i.parseForVariableDeclaration, parseFunctionDeclaration = i.parseFunctionDeclaration, parseFunctionExpression = i.parseFunctionExpression, parseLogicalANDExpression = i.parseLogicalANDExpression, parseLogicalORExpression = i.parseLogicalORExpression, parseMultiplicativeExpression = i.parseMultiplicativeExpression, parseNewExpression = i.parseNewExpression, parseNonComputedMember = i.parseNonComputedMember, parseNonComputedProperty = i.parseNonComputedProperty, parseObjectProperty = i.parseObjectProperty, parseObjectPropertyKey = i.parseObjectPropertyKey, parsePrimaryExpression = i.parsePrimaryExpression, parsePostfixExpression = i.parsePostfixExpression, parseProgram = i.parseProgram, parsePropertyFunction = i.parsePropertyFunction, parseRelationalExpression = i.parseRelationalExpression, parseStatement = i.parseStatement, parseShiftExpression = i.parseShiftExpression, parseSwitchCase = i.parseSwitchCase, parseUnaryExpression = i.parseUnaryExpression, parseVariableDeclaration = i.parseVariableDeclaration, parseVariableIdentifier = i.parseVariableIdentifier), typeof i.scanRegExp == "function" && (advance = i.advance, scanRegExp = i.scanRegExp)
            }

            function stringToArray(n) {
                for (var r = n.length, i = [], t = 0; t < r; ++t) i[t] = n.charAt(t);
                return i
            }

            function parse(n, r) {
                var u, f;
                f = String, typeof n == "string" || n instanceof String || (n = f(n)), e = n, t = 0, h = e.length > 0 ? 1 : 0, c = 0, s = e.length, a = null, o = {
                    allowIn: !0,
                    labelSet: {},
                    lastParenthesized: null,
                    inFunctionBody: !1,
                    inIteration: !1,
                    inSwitch: !1
                }, i = {}, typeof r != "undefined" && (i.range = typeof r.range == "boolean" && r.range, i.loc = typeof r.loc == "boolean" && r.loc, i.raw = typeof r.raw == "boolean" && r.raw, typeof r.tokens == "boolean" && r.tokens && (i.tokens = []), typeof r.comment == "boolean" && r.comment && (i.comments = []), typeof r.tolerant == "boolean" && r.tolerant && (i.errors = [])), s > 0 && typeof e[0] == "undefined" && (n instanceof String && (e = n.valueOf()), typeof e[0] == "undefined" && (e = stringToArray(n))), patch();
                try {
                    u = parseProgram(), typeof i.comments != "undefined" && (u.comments = i.comments), typeof i.tokens != "undefined" && (u.tokens = i.tokens), typeof i.errors != "undefined" && (u.errors = i.errors)
                } catch (l) {
                    throw l;
                } finally {
                    unpatch(), i = {}
                }
                return u
            }
            var f, v, r, y, u, p, e, l, t, h, c, s, a, o, i;
            f = {
                BooleanLiteral: 1,
                EOF: 2,
                Identifier: 3,
                Keyword: 4,
                NullLiteral: 5,
                NumericLiteral: 6,
                Punctuator: 7,
                StringLiteral: 8
            }, v = {}, v[f.BooleanLiteral] = "Boolean", v[f.EOF] = "<end>", v[f.Identifier] = "Identifier", v[f.Keyword] = "Keyword", v[f.NullLiteral] = "Null", v[f.NumericLiteral] = "Numeric", v[f.Punctuator] = "Punctuator", v[f.StringLiteral] = "String", r = {
                AssignmentExpression: "AssignmentExpression",
                ArrayExpression: "ArrayExpression",
                BlockStatement: "BlockStatement",
                BinaryExpression: "BinaryExpression",
                BreakStatement: "BreakStatement",
                CallExpression: "CallExpression",
                CatchClause: "CatchClause",
                ConditionalExpression: "ConditionalExpression",
                ContinueStatement: "ContinueStatement",
                DoWhileStatement: "DoWhileStatement",
                DebuggerStatement: "DebuggerStatement",
                EmptyStatement: "EmptyStatement",
                ExpressionStatement: "ExpressionStatement",
                ForStatement: "ForStatement",
                ForInStatement: "ForInStatement",
                FunctionDeclaration: "FunctionDeclaration",
                FunctionExpression: "FunctionExpression",
                Identifier: "Identifier",
                IfStatement: "IfStatement",
                Literal: "Literal",
                LabeledStatement: "LabeledStatement",
                LogicalExpression: "LogicalExpression",
                MemberExpression: "MemberExpression",
                NewExpression: "NewExpression",
                ObjectExpression: "ObjectExpression",
                Program: "Program",
                Property: "Property",
                ReturnStatement: "ReturnStatement",
                SequenceExpression: "SequenceExpression",
                SwitchStatement: "SwitchStatement",
                SwitchCase: "SwitchCase",
                ThisExpression: "ThisExpression",
                ThrowStatement: "ThrowStatement",
                TryStatement: "TryStatement",
                UnaryExpression: "UnaryExpression",
                UpdateExpression: "UpdateExpression",
                VariableDeclaration: "VariableDeclaration",
                VariableDeclarator: "VariableDeclarator",
                WhileStatement: "WhileStatement",
                WithStatement: "WithStatement"
            }, y = {
                Data: 1,
                Get: 2,
                Set: 4
            }, u = {
                UnexpectedToken: "Unexpected token %0",
                UnexpectedNumber: "Unexpected number",
                UnexpectedString: "Unexpected string",
                UnexpectedIdentifier: "Unexpected identifier",
                UnexpectedReserved: "Unexpected reserved word",
                UnexpectedEOS: "Unexpected end of input",
                NewlineAfterThrow: "Illegal newline after throw",
                InvalidRegExp: "Invalid regular expression",
                UnterminatedRegExp: "Invalid regular expression: missing /",
                InvalidLHSInAssignment: "Invalid left-hand side in assignment",
                InvalidLHSInForIn: "Invalid left-hand side in for-in",
                NoCatchOrFinally: "Missing catch or finally after try",
                UnknownLabel: "Undefined label '%0'",
                Redeclaration: "%0 '%1' has already been declared",
                IllegalContinue: "Illegal continue statement",
                IllegalBreak: "Illegal break statement",
                IllegalReturn: "Illegal return statement",
                StrictModeWith: "Strict mode code may not include a with statement",
                StrictCatchVariable: "Catch variable may not be eval or arguments in strict mode",
                StrictVarName: "Variable name may not be eval or arguments in strict mode",
                StrictParamName: "Parameter name eval or arguments is not allowed in strict mode",
                StrictParamDupe: "Strict mode function may not have duplicate parameter names",
                StrictFunctionName: "Function name may not be eval or arguments in strict mode",
                StrictOctalLiteral: "Octal literals are not allowed in strict mode.",
                StrictDelete: "Delete of an unqualified identifier in strict mode.",
                StrictDuplicateProperty: "Duplicate data property in object literal not allowed in strict mode",
                AccessorDataProperty: "Object literal may not have data and accessor property with the same name",
                AccessorGetSet: "Object literal may not have multiple get/set accessors with the same name",
                StrictLHSAssignment: "Assignment to eval or arguments is not allowed in strict mode",
                StrictLHSPostfix: "Postfix increment/decrement may not have eval or arguments operand in strict mode",
                StrictLHSPrefix: "Prefix increment/decrement may not have eval or arguments operand in strict mode",
                StrictReservedWord: "Use of future reserved word in strict mode"
            }, p = {
                NonAsciiIdentifierStart: new RegExp("[ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԧԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠࢢ-ࢬऄ-हऽॐक़-ॡॱ-ॷॹ-ॿঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛰᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々-〇〡-〩〱-〵〸-〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚗꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꪀ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ]"),
                NonAsciiIdentifierPart: new RegExp("[ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮ̀-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁ҃-҇Ҋ-ԧԱ-Ֆՙա-և֑-ׇֽֿׁׂׅׄא-תװ-ײؐ-ؚؠ-٩ٮ-ۓە-ۜ۟-۪ۨ-ۼۿܐ-݊ݍ-ޱ߀-ߵߺࠀ-࠭ࡀ-࡛ࢠࢢ-ࢬࣤ-ࣾऀ-ॣ०-९ॱ-ॷॹ-ॿঁ-ঃঅ-ঌএঐও-নপ-রলশ-হ়-ৄেৈো-ৎৗড়ঢ়য়-ৣ০-ৱਁ-ਃਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹ਼ਾ-ੂੇੈੋ-੍ੑਖ਼-ੜਫ਼੦-ੵઁ-ઃઅ-ઍએ-ઑઓ-નપ-રલળવ-હ઼-ૅે-ૉો-્ૐૠ-ૣ૦-૯ଁ-ଃଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହ଼-ୄେୈୋ-୍ୖୗଡ଼ଢ଼ୟ-ୣ୦-୯ୱஂஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹா-ூெ-ைொ-்ௐௗ௦-௯ఁ-ఃఅ-ఌఎ-ఐఒ-నప-ళవ-హఽ-ౄె-ైొ-్ౕౖౘౙౠ-ౣ౦-౯ಂಃಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹ಼-ೄೆ-ೈೊ-್ೕೖೞೠ-ೣ೦-೯ೱೲംഃഅ-ഌഎ-ഐഒ-ഺഽ-ൄെ-ൈൊ-ൎൗൠ-ൣ൦-൯ൺ-ൿංඃඅ-ඖක-නඳ-රලව-ෆ්ා-ුූෘ-ෟෲෳก-ฺเ-๎๐-๙ກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ູົ-ຽເ-ໄໆ່-ໍ໐-໙ໜ-ໟༀ༘༙༠-༩༹༵༷༾-ཇཉ-ཬཱ-྄྆-ྗྙ-ྼ࿆က-၉ၐ-ႝႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚ፝-፟ᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛰᜀ-ᜌᜎ-᜔ᜠ-᜴ᝀ-ᝓᝠ-ᝬᝮ-ᝰᝲᝳក-៓ៗៜ៝០-៩᠋-᠍᠐-᠙ᠠ-ᡷᢀ-ᢪᢰ-ᣵᤀ-ᤜᤠ-ᤫᤰ-᤻᥆-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉ᧐-᧙ᨀ-ᨛᨠ-ᩞ᩠-᩿᩼-᪉᪐-᪙ᪧᬀ-ᭋ᭐-᭙᭫-᭳ᮀ-᯳ᰀ-᰷᱀-᱉ᱍ-ᱽ᳐-᳔᳒-ᳶᴀ-ᷦ᷼-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼ‌‍‿⁀⁔ⁱⁿₐ-ₜ⃐-⃥⃜⃡-⃰ℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯ⵿-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⷠ-ⷿⸯ々-〇〡-〯〱-〵〸-〼ぁ-ゖ゙゚ゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘫꙀ-꙯ꙴ-꙽ꙿ-ꚗꚟ-꛱ꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠧꡀ-ꡳꢀ-꣄꣐-꣙꣠-ꣷꣻ꤀-꤭ꤰ-꥓ꥠ-ꥼꦀ-꧀ꧏ-꧙ꨀ-ꨶꩀ-ꩍ꩐-꩙ꩠ-ꩶꩺꩻꪀ-ꫂꫛ-ꫝꫠ-ꫯꫲ-꫶ꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯪ꯬꯭꯰-꯹가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻ︀-️︠-︦︳︴﹍-﹏ﹰ-ﹴﹶ-ﻼ０-９Ａ-Ｚ＿ａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ]")
            }, typeof "esprima"[0] == "undefined" && (sliceSource = function (n, t) {
                return e.slice(n, t).join("")
            }), n.version = "1.0.0-dev", n.parse = parse, n.Syntax = function () {
                var n, t = {};
                typeof Object.create == "function" && (t = Object.create(null));
                for (n in r) r.hasOwnProperty(n) && (t[n] = r[n]);
                return typeof Object.freeze == "function" && Object.freeze(t), t
            }()
        })(typeof n == "undefined" ? esprima = {} : n)
    }, require("MobileServiceClient")
})(this || exports);