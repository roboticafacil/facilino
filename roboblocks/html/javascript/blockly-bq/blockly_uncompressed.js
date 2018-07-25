"use strict";
var COMPILED = !0,
    goog = goog || {};
goog.global = this, goog.isDef = function(e) {
    return void 0 !== e
}, goog.exportPath_ = function(e, o, t) {
    e = e.split("."), t = t || goog.global, e[0] in t || !t.execScript || t.execScript("var " + e[0]);
    for (var n; e.length && (n = e.shift());) !e.length && goog.isDef(o) ? t[n] = o : t = t[n] && t[n] !== Object.prototype[n] ? t[n] : t[n] = {}
}, goog.define = function(e, o) {
    var t = o;
    COMPILED || (goog.global.CLOSURE_UNCOMPILED_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_UNCOMPILED_DEFINES, e) ? t = goog.global.CLOSURE_UNCOMPILED_DEFINES[e] : goog.global.CLOSURE_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_DEFINES, e) && (t = goog.global.CLOSURE_DEFINES[e])), goog.exportPath_(e, t)
}, goog.DEBUG = !1, goog.LOCALE = "en", goog.TRUSTED_SITE = !0, goog.STRICT_MODE_COMPATIBLE = !1, goog.DISALLOW_TEST_ONLY_CODE = COMPILED && !goog.DEBUG, goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING = !1, goog.provide = function(e) {
    if (goog.isInModuleLoader_()) throw Error("goog.provide can not be used within a goog.module.");
    if (!COMPILED && goog.isProvided_(e)) throw Error('Namespace "' + e + '" already declared.');
    goog.constructNamespace_(e)
}, goog.constructNamespace_ = function(e, o) {
    if (!COMPILED) {
        delete goog.implicitNamespaces_[e];
        for (var t = e;
            (t = t.substring(0, t.lastIndexOf("."))) && !goog.getObjectByName(t);) goog.implicitNamespaces_[t] = !0
    }
    goog.exportPath_(e, o)
}, goog.VALID_MODULE_RE_ = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/, goog.module = function(e) {
    if (!goog.isString(e) || !e || -1 == e.search(goog.VALID_MODULE_RE_)) throw Error("Invalid module identifier");
    if (!goog.isInModuleLoader_()) throw Error("Module " + e + " has been loaded incorrectly. Note, modules cannot be loaded as normal scripts. They require some kind of pre-processing step. You're likely trying to load a module via a script tag or as a part of a concatenated bundle without rewriting the module. For more info see: https://github.com/google/closure-library/wiki/goog.module:-an-ES6-module-like-alternative-to-goog.provide.");
    if (goog.moduleLoaderState_.moduleName) throw Error("goog.module may only be called once per module.");
    if (goog.moduleLoaderState_.moduleName = e, !COMPILED) {
        if (goog.isProvided_(e)) throw Error('Namespace "' + e + '" already declared.');
        delete goog.implicitNamespaces_[e]
    }
}, goog.module.get = function(e) {
    return goog.module.getInternal_(e)
}, goog.module.getInternal_ = function(e) {
    if (!COMPILED) {
        if (e in goog.loadedModules_) return goog.loadedModules_[e];
        if (!goog.implicitNamespaces_[e]) return e = goog.getObjectByName(e), null != e ? e : null
    }
    return null
}, goog.moduleLoaderState_ = null, goog.isInModuleLoader_ = function() {
    return null != goog.moduleLoaderState_
}, goog.module.declareLegacyNamespace = function() {
    if (!COMPILED && !goog.isInModuleLoader_()) throw Error("goog.module.declareLegacyNamespace must be called from within a goog.module");
    if (!COMPILED && !goog.moduleLoaderState_.moduleName) throw Error("goog.module must be called prior to goog.module.declareLegacyNamespace.");
    goog.moduleLoaderState_.declareLegacyNamespace = !0
}, goog.setTestOnly = function(e) {
    if (goog.DISALLOW_TEST_ONLY_CODE) throw e = e || "", Error("Importing test-only code into non-debug environment" + (e ? ": " + e : "."))
}, goog.forwardDeclare = function(e) {}, COMPILED || (goog.isProvided_ = function(e) {
    return e in goog.loadedModules_ || !goog.implicitNamespaces_[e] && goog.isDefAndNotNull(goog.getObjectByName(e))
}, goog.implicitNamespaces_ = {
    "goog.module": !0
}), goog.getObjectByName = function(e, o) {
    for (var t, n = e.split("."), r = o || goog.global; t = n.shift();) {
        if (!goog.isDefAndNotNull(r[t])) return null;
        r = r[t]
    }
    return r
}, goog.globalize = function(e, o) {
    var t, n = o || goog.global;
    for (t in e) n[t] = e[t]
}, goog.addDependency = function(e, o, t, n) {
    if (goog.DEPENDENCIES_ENABLED) {
        var r;
        e = e.replace(/\\/g, "/");
        var i = goog.dependencies_;
        n && "boolean" != typeof n || (n = n ? {
            module: "goog"
        } : {});
        for (var s = 0; r = o[s]; s++) i.nameToPath[r] = e, i.loadFlags[e] = n;
        for (n = 0; o = t[n]; n++) e in i.requires || (i.requires[e] = {}), i.requires[e][o] = !0
    }
}, goog.ENABLE_DEBUG_LOADER = !0, goog.logToConsole_ = function(e) {
    goog.global.console && goog.global.console.error(e)
}, goog.require = function(e) {
    if (!COMPILED) {
        if (goog.ENABLE_DEBUG_LOADER && goog.IS_OLD_IE_ && goog.maybeProcessDeferredDep_(e), goog.isProvided_(e)) {
            if (goog.isInModuleLoader_()) return goog.module.getInternal_(e)
        } else if (goog.ENABLE_DEBUG_LOADER) {
            var o = goog.getPathFromDeps_(e);
            if (!o) throw e = "goog.require could not find: " + e, goog.logToConsole_(e), Error(e);
            goog.writeScripts_(o)
        }
        return null
    }
}, goog.basePath = "", goog.nullFunction = function() {}, goog.abstractMethod = function() {
    throw Error("unimplemented abstract method")
}, goog.addSingletonGetter = function(e) {
    e.instance_ = void 0, e.getInstance = function() {
        return e.instance_ ? e.instance_ : (goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = e), e.instance_ = new e)
    }
}, goog.instantiatedSingletons_ = [], goog.LOAD_MODULE_USING_EVAL = !0, goog.SEAL_MODULE_EXPORTS = goog.DEBUG, goog.loadedModules_ = {}, goog.DEPENDENCIES_ENABLED = !COMPILED && goog.ENABLE_DEBUG_LOADER, goog.TRANSPILE = "detect", goog.TRANSPILER = "transpile.js", goog.DEPENDENCIES_ENABLED && (goog.dependencies_ = {
    loadFlags: {},
    nameToPath: {},
    requires: {},
    visited: {},
    written: {},
    deferred: {}
}, goog.inHtmlDocument_ = function() {
    var e = goog.global.document;
    return null != e && "write" in e
}, goog.findBasePath_ = function() {
    if (goog.isDef(goog.global.CLOSURE_BASE_PATH)) goog.basePath = goog.global.CLOSURE_BASE_PATH;
    else if (goog.inHtmlDocument_())
        for (var e = goog.global.document.getElementsByTagName("SCRIPT"), o = e.length - 1; 0 <= o; --o) {
            var t = e[o].src,
                n = -1 == (n = t.lastIndexOf("?")) ? t.length : n;
            if ("base.js" == t.substr(n - 7, 7)) {
                goog.basePath = t.substr(0, n - 7);
                break
            }
        }
}, goog.importScript_ = function(e, o) {
    (goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_)(e, o) && (goog.dependencies_.written[e] = !0)
}, goog.IS_OLD_IE_ = !(goog.global.atob || !goog.global.document || !goog.global.document.all), goog.oldIeWaiting_ = !1, goog.importProcessedScript_ = function(e, o, t) {
    goog.importScript_("", 'goog.retrieveAndExec_("' + e + '", ' + o + ", " + t + ");")
}, goog.queuedModules_ = [], goog.wrapModule_ = function(e, o) {
    return goog.LOAD_MODULE_USING_EVAL && goog.isDef(goog.global.JSON) ? "goog.loadModule(" + goog.global.JSON.stringify(o + "\n//# sourceURL=" + e + "\n") + ");" : 'goog.loadModule(function(exports) {"use strict";' + o + "\n;return exports});\n//# sourceURL=" + e + "\n"
}, goog.loadQueuedModules_ = function() {
    var e = goog.queuedModules_.length;
    if (0 < e) {
        var o = goog.queuedModules_;
        goog.queuedModules_ = [];
        for (var t = 0; t < e; t++) goog.maybeProcessDeferredPath_(o[t])
    }
    goog.oldIeWaiting_ = !1
}, goog.maybeProcessDeferredDep_ = function(e) {
    goog.isDeferredModule_(e) && goog.allDepsAreAvailable_(e) && (e = goog.getPathFromDeps_(e), goog.maybeProcessDeferredPath_(goog.basePath + e))
}, goog.isDeferredModule_ = function(e) {
    var o = (e = goog.getPathFromDeps_(e)) && goog.dependencies_.loadFlags[e] || {},
        t = o.lang || "es3";
    return !(!e || "goog" != o.module && !goog.needsTranspile_(t)) && goog.basePath + e in goog.dependencies_.deferred
}, goog.allDepsAreAvailable_ = function(e) {
    if ((e = goog.getPathFromDeps_(e)) && e in goog.dependencies_.requires)
        for (var o in goog.dependencies_.requires[e])
            if (!goog.isProvided_(o) && !goog.isDeferredModule_(o)) return !1;
    return !0
}, goog.maybeProcessDeferredPath_ = function(e) {
    if (e in goog.dependencies_.deferred) {
        var o = goog.dependencies_.deferred[e];
        delete goog.dependencies_.deferred[e], goog.globalEval(o)
    }
}, goog.loadModuleFromUrl = function(e) {
    goog.retrieveAndExec_(e, !0, !1)
}, goog.writeScriptSrcNode_ = function(e) {
    goog.global.document.write('<script type="text/javascript" src="' + e + '"><\/script>')
}, goog.appendScriptSrcNode_ = function(e) {
    var o = goog.global.document,
        t = o.createElement("script");
    t.type = "text/javascript", t.src = e, t.defer = !1, t.async = !1, o.head.appendChild(t)
}, goog.writeScriptTag_ = function(e, o) {
    if (goog.inHtmlDocument_()) {
        var t = goog.global.document;
        if (!goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING && "complete" == t.readyState) {
            if (/\bdeps.js$/.test(e)) return !1;
            throw Error('Cannot write "' + e + '" after document load')
        }
        if (void 0 === o)
            if (goog.IS_OLD_IE_) {
                goog.oldIeWaiting_ = !0;
                var n = " onreadystatechange='goog.onScriptLoad_(this, " + ++goog.lastNonModuleScriptIndex_ + ")' ";
                t.write('<script type="text/javascript" src="' + e + '"' + n + "><\/script>")
            } else goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING ? goog.appendScriptSrcNode_(e) : goog.writeScriptSrcNode_(e);
        else t.write('<script type="text/javascript">' + goog.protectScriptTag_(o) + "<\/script>");
        return !0
    }
    return !1
}, goog.protectScriptTag_ = function(e) {
    return e.replace(/<\/(SCRIPT)/gi, "\\x3c/$1")
}, goog.needsTranspile_ = function(e) {
    if ("always" == goog.TRANSPILE) return !0;
    if ("never" == goog.TRANSPILE) return !1;
    if (goog.requiresTranspilation_ || (goog.requiresTranspilation_ = goog.createRequiresTranspilation_()), e in goog.requiresTranspilation_) return goog.requiresTranspilation_[e];
    throw Error("Unknown language mode: " + e)
}, goog.requiresTranspilation_ = null, goog.lastNonModuleScriptIndex_ = 0, goog.onScriptLoad_ = function(e, o) {
    return "complete" == e.readyState && goog.lastNonModuleScriptIndex_ == o && goog.loadQueuedModules_(), !0
}, goog.writeScripts_ = function(e) {
    function o(e) {
        if (!(e in r.written || e in r.visited)) {
            if (r.visited[e] = !0, e in r.requires)
                for (var i in r.requires[e])
                    if (!goog.isProvided_(i)) {
                        if (!(i in r.nameToPath)) throw Error("Undefined nameToPath for " + i);
                        o(r.nameToPath[i])
                    }
            e in n || (n[e] = !0, t.push(e))
        }
    }
    var t = [],
        n = {},
        r = goog.dependencies_;
    o(e);
    for (var i = 0; i < t.length; i++) e = t[i], goog.dependencies_.written[e] = !0;
    var s = goog.moduleLoaderState_;
    for (goog.moduleLoaderState_ = null, i = 0; i < t.length; i++) {
        if (!(e = t[i])) throw goog.moduleLoaderState_ = s, Error("Undefined script input");
        var l = r.loadFlags[e] || {},
            g = goog.needsTranspile_(l.lang || "es3");
        "goog" == l.module || g ? goog.importProcessedScript_(goog.basePath + e, "goog" == l.module, g) : goog.importScript_(goog.basePath + e)
    }
    goog.moduleLoaderState_ = s
}, goog.getPathFromDeps_ = function(e) {
    return e in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[e] : null
}, goog.findBasePath_(), goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js")), goog.hasBadLetScoping = null, goog.useSafari10Workaround = function() {
    if (null == goog.hasBadLetScoping) {
        try {
            var a = !eval('"use strict";let x = 1; function f() { return typeof x; };f() == "number";')
        } catch (e) {
            a = !1
        }
        goog.hasBadLetScoping = a
    }
    return goog.hasBadLetScoping
}, goog.workaroundSafari10EvalBug = function(e) {
    return "(function(){" + e + "\n;})();\n"
}, goog.loadModule = function(e) {
    var o = goog.moduleLoaderState_;
    try {
        if (goog.moduleLoaderState_ = {
                moduleName: void 0,
                declareLegacyNamespace: !1
            }, goog.isFunction(e)) var t = e.call(void 0, {});
        else {
            if (!goog.isString(e)) throw Error("Invalid module definition");
            goog.useSafari10Workaround() && (e = goog.workaroundSafari10EvalBug(e)), t = goog.loadModuleFromSource_.call(void 0, e)
        }
        var n = goog.moduleLoaderState_.moduleName;
        if (!goog.isString(n) || !n) throw Error('Invalid module name "' + n + '"');
        goog.moduleLoaderState_.declareLegacyNamespace ? goog.constructNamespace_(n, t) : goog.SEAL_MODULE_EXPORTS && Object.seal && "object" == typeof t && null != t && Object.seal(t), goog.loadedModules_[n] = t
    } finally {
        goog.moduleLoaderState_ = o
    }
}, goog.loadModuleFromSource_ = function(a) {
    return eval(a), {}
}, goog.normalizePath_ = function(e) {
    e = e.split("/");
    for (var o = 0; o < e.length;) "." == e[o] ? e.splice(o, 1) : o && ".." == e[o] && e[o - 1] && ".." != e[o - 1] ? e.splice(--o, 2) : o++;
    return e.join("/")
}, goog.loadFileSync_ = function(e) {
    if (goog.global.CLOSURE_LOAD_FILE_SYNC) return goog.global.CLOSURE_LOAD_FILE_SYNC(e);
    try {
        var o = new goog.global.XMLHttpRequest;
        return o.open("get", e, !1), o.send(), 0 == o.status || 200 == o.status ? o.responseText : null
    } catch (e) {
        return null
    }
}, goog.retrieveAndExec_ = function(e, o, t) {
    if (!COMPILED) {
        var n = e;
        e = goog.normalizePath_(e);
        var r = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_,
            i = goog.loadFileSync_(e);
        if (null == i) throw Error('Load of "' + e + '" failed');
        t && (i = goog.transpile_.call(goog.global, i, e)), i = o ? goog.wrapModule_(e, i) : i + "\n//# sourceURL=" + e, goog.IS_OLD_IE_ && goog.oldIeWaiting_ ? (goog.dependencies_.deferred[n] = i, goog.queuedModules_.push(n)) : r(e, i)
    }
}, goog.transpile_ = function(a, b) {
    var c = goog.global.$jscomp;
    c || (goog.global.$jscomp = c = {});
    var d = c.transpile;
    if (!d) {
        var e = goog.basePath + goog.TRANSPILER,
            f = goog.loadFileSync_(e);
        if (f) {
            if (eval(f + "\n//# sourceURL=" + e), goog.global.$gwtExport && goog.global.$gwtExport.$jscomp && !goog.global.$gwtExport.$jscomp.transpile) throw Error('The transpiler did not properly export the "transpile" method. $gwtExport: ' + JSON.stringify(goog.global.$gwtExport));
            goog.global.$jscomp.transpile = goog.global.$gwtExport.$jscomp.transpile, c = goog.global.$jscomp, d = c.transpile
        }
    }
    return d || (d = c.transpile = function(e, o) {
        return goog.logToConsole_(o + " requires transpilation but no transpiler was found."), e
    }), d(a, b)
}, goog.typeOf = function(e) {
    var o = typeof e;
    if ("object" == o) {
        if (!e) return "null";
        if (e instanceof Array) return "array";
        if (e instanceof Object) return o;
        var t = Object.prototype.toString.call(e);
        if ("[object Window]" == t) return "object";
        if ("[object Array]" == t || "number" == typeof e.length && void 0 !== e.splice && void 0 !== e.propertyIsEnumerable && !e.propertyIsEnumerable("splice")) return "array";
        if ("[object Function]" == t || void 0 !== e.call && void 0 !== e.propertyIsEnumerable && !e.propertyIsEnumerable("call")) return "function"
    } else if ("function" == o && void 0 === e.call) return "object";
    return o
}, goog.isNull = function(e) {
    return null === e
}, goog.isDefAndNotNull = function(e) {
    return null != e
}, goog.isArray = function(e) {
    return "array" == goog.typeOf(e)
}, goog.isArrayLike = function(e) {
    var o = goog.typeOf(e);
    return "array" == o || "object" == o && "number" == typeof e.length
}, goog.isDateLike = function(e) {
    return goog.isObject(e) && "function" == typeof e.getFullYear
}, goog.isString = function(e) {
    return "string" == typeof e
}, goog.isBoolean = function(e) {
    return "boolean" == typeof e
}, goog.isNumber = function(e) {
    return "number" == typeof e
}, goog.isFunction = function(e) {
    return "function" == goog.typeOf(e)
}, goog.isObject = function(e) {
    var o = typeof e;
    return "object" == o && null != e || "function" == o
}, goog.getUid = function(e) {
    return e[goog.UID_PROPERTY_] || (e[goog.UID_PROPERTY_] = ++goog.uidCounter_)
}, goog.hasUid = function(e) {
    return !!e[goog.UID_PROPERTY_]
}, goog.removeUid = function(e) {
    null !== e && "removeAttribute" in e && e.removeAttribute(goog.UID_PROPERTY_);
    try {
        delete e[goog.UID_PROPERTY_]
    } catch (e) {}
}, goog.UID_PROPERTY_ = "closure_uid_" + (1e9 * Math.random() >>> 0), goog.uidCounter_ = 0, goog.getHashCode = goog.getUid, goog.removeHashCode = goog.removeUid, goog.cloneObject = function(e) {
    if ("object" == (t = goog.typeOf(e)) || "array" == t) {
        if (e.clone) return e.clone();
        var o, t = "array" == t ? [] : {};
        for (o in e) t[o] = goog.cloneObject(e[o]);
        return t
    }
    return e
}, goog.bindNative_ = function(e, o, t) {
    return e.call.apply(e.bind, arguments)
}, goog.bindJs_ = function(e, o, t) {
    if (!e) throw Error();
    if (2 < arguments.length) {
        var n = Array.prototype.slice.call(arguments, 2);
        return function() {
            var t = Array.prototype.slice.call(arguments);
            return Array.prototype.unshift.apply(t, n), e.apply(o, t)
        }
    }
    return function() {
        return e.apply(o, arguments)
    }
}, goog.bind = function(e, o, t) {
    return Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bind = goog.bindNative_ : goog.bind = goog.bindJs_, goog.bind.apply(null, arguments)
}, goog.partial = function(e, o) {
    var t = Array.prototype.slice.call(arguments, 1);
    return function() {
        var o = t.slice();
        return o.push.apply(o, arguments), e.apply(this, o)
    }
}, goog.mixin = function(e, o) {
    for (var t in o) e[t] = o[t]
}, goog.now = goog.TRUSTED_SITE && Date.now || function() {
    return +new Date
}, goog.globalEval = function(e) {
    if (goog.global.execScript) goog.global.execScript(e, "JavaScript");
    else {
        if (!goog.global.eval) throw Error("goog.globalEval not available");
        if (null == goog.evalWorksForGlobals_)
            if (goog.global.eval("var _evalTest_ = 1;"), void 0 !== goog.global._evalTest_) {
                try {
                    delete goog.global._evalTest_
                } catch (e) {}
                goog.evalWorksForGlobals_ = !0
            } else goog.evalWorksForGlobals_ = !1;
        if (goog.evalWorksForGlobals_) goog.global.eval(e);
        else {
            var o = goog.global.document,
                t = o.createElement("SCRIPT");
            t.type = "text/javascript", t.defer = !1, t.appendChild(o.createTextNode(e)), o.body.appendChild(t), o.body.removeChild(t)
        }
    }
}, goog.evalWorksForGlobals_ = null, goog.getCssName = function(e, o) {
    if ("." == String(e).charAt(0)) throw Error('className passed in goog.getCssName must not start with ".". You passed: ' + e);
    var t = function(e) {
            return goog.cssNameMapping_[e] || e
        },
        n = function(e) {
            e = e.split("-");
            for (var o = [], n = 0; n < e.length; n++) o.push(t(e[n]));
            return o.join("-")
        },
        n = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? t : n : function(e) {
            return e
        },
        n = o ? e + "-" + n(o) : n(e);
    return goog.global.CLOSURE_CSS_NAME_MAP_FN ? goog.global.CLOSURE_CSS_NAME_MAP_FN(n) : n
}, goog.setCssNameMapping = function(e, o) {
    goog.cssNameMapping_ = e, goog.cssNameMappingStyle_ = o
}, !COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING), goog.getMsg = function(e, o) {
    return o && (e = e.replace(/\{\$([^}]+)}/g, function(e, t) {
        return null != o && t in o ? o[t] : e
    })), e
}, goog.getMsgWithFallback = function(e, o) {
    return e
}, goog.exportSymbol = function(e, o, t) {
    goog.exportPath_(e, o, t)
}, goog.exportProperty = function(e, o, t) {
    e[o] = t
}, goog.inherits = function(e, o) {
    function t() {}
    t.prototype = o.prototype, e.superClass_ = o.prototype, e.prototype = new t, e.prototype.constructor = e, e.base = function(e, t, n) {
        for (var r = Array(arguments.length - 2), i = 2; i < arguments.length; i++) r[i - 2] = arguments[i];
        return o.prototype[t].apply(e, r)
    }
}, goog.base = function(e, o, t) {
    var n = arguments.callee.caller;
    if (goog.STRICT_MODE_COMPATIBLE || goog.DEBUG && !n) throw Error("arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");
    if (n.superClass_) {
        for (var r = Array(arguments.length - 1), i = 1; i < arguments.length; i++) r[i - 1] = arguments[i];
        return n.superClass_.constructor.apply(e, r)
    }
    for (r = Array(arguments.length - 2), i = 2; i < arguments.length; i++) r[i - 2] = arguments[i];
    for (var i = !1, s = e.constructor; s; s = s.superClass_ && s.superClass_.constructor)
        if (s.prototype[o] === n) i = !0;
        else if (i) return s.prototype[o].apply(e, r);
    if (e[o] === n) return e.constructor.prototype[o].apply(e, r);
    throw Error("goog.base called from a method of one name to a method of a different name")
}, goog.scope = function(e) {
    if (goog.isInModuleLoader_()) throw Error("goog.scope is not supported within a goog.module.");
    e.call(goog.global)
}, COMPILED || (goog.global.COMPILED = COMPILED), goog.defineClass = function(e, o) {
    var t = o.constructor,
        n = o.statics;
    return t && t != Object.prototype.constructor || (t = function() {
        throw Error("cannot instantiate an interface (no constructor defined).")
    }), t = goog.defineClass.createSealingConstructor_(t, e), e && goog.inherits(t, e), delete o.constructor, delete o.statics, goog.defineClass.applyProperties_(t.prototype, o), null != n && (n instanceof Function ? n(t) : goog.defineClass.applyProperties_(t, n)), t
}, goog.defineClass.SEAL_CLASS_INSTANCES = goog.DEBUG, goog.defineClass.createSealingConstructor_ = function(e, o) {
    if (!goog.defineClass.SEAL_CLASS_INSTANCES) return e;
    var t = !goog.defineClass.isUnsealable_(o),
        n = function() {
            var o = e.apply(this, arguments) || this;
            return o[goog.UID_PROPERTY_] = o[goog.UID_PROPERTY_], this.constructor === n && t && Object.seal instanceof Function && Object.seal(o), o
        };
    return n
}, goog.defineClass.isUnsealable_ = function(e) {
    return e && e.prototype && e.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_]
}, goog.defineClass.OBJECT_PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "), goog.defineClass.applyProperties_ = function(e, o) {
    for (var t in o) Object.prototype.hasOwnProperty.call(o, t) && (e[t] = o[t]);
    for (var n = 0; n < goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length; n++) t = goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[n], Object.prototype.hasOwnProperty.call(o, t) && (e[t] = o[t])
}, goog.tagUnsealableClass = function(e) {
    !COMPILED && goog.defineClass.SEAL_CLASS_INSTANCES && (e.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_] = !0)
}, goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_ = "goog_defineClass_legacy_unsealable", goog.createRequiresTranspilation_ = function() {
    function a(e, o) {
        d ? c[e] = !0 : o() ? c[e] = !1 : d = c[e] = !0
    }

    function b(a) {
        try {
            return !!eval(a)
        } catch (e) {
            return !1
        }
    }
    var c = {
            es3: !1
        },
        d = !1,
        e = goog.global.navigator && goog.global.navigator.userAgent ? goog.global.navigator.userAgent : "";
    return a("es5", function() {
        return b("[1,].length==1")
    }), a("es6", function() {
        var o = e.match(/Edge\/(\d+)(\.\d)*/i);
        return !(o && 15 > Number(o[1])) && b('(()=>{"use strict";class X{constructor(){if(new.target!=String)throw 1;this.x=42}}let q=Reflect.construct(X,[],String);if(q.x!=42||!(q instanceof String))throw 1;for(const a of[2,3]){if(a==2)continue;function f(z={a}){let a=0;return z.a}{function f(){return 0;}}return f()==3}})()')
    }), a("es6-impl", function() {
        return !0
    }), a("es7", function() {
        return b("2 ** 2 == 4")
    }), a("es8", function() {
        return b("async () => 1, true")
    }), c
}, goog.debug = {}, goog.debug.Error = function(e) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, goog.debug.Error);
    else {
        var o = Error().stack;
        o && (this.stack = o)
    }
    e && (this.message = String(e)), this.reportErrorToServer = !0
}, goog.inherits(goog.debug.Error, Error), goog.debug.Error.prototype.name = "CustomError", goog.dom = {}, goog.dom.NodeType = {
    ELEMENT: 1,
    ATTRIBUTE: 2,
    TEXT: 3,
    CDATA_SECTION: 4,
    ENTITY_REFERENCE: 5,
    ENTITY: 6,
    PROCESSING_INSTRUCTION: 7,
    COMMENT: 8,
    DOCUMENT: 9,
    DOCUMENT_TYPE: 10,
    DOCUMENT_FRAGMENT: 11,
    NOTATION: 12
}, goog.string = {}, goog.string.DETECT_DOUBLE_ESCAPING = !1, goog.string.FORCE_NON_DOM_HTML_UNESCAPING = !1, goog.string.Unicode = {
    NBSP: " "
}, goog.string.startsWith = function(e, o) {
    return 0 == e.lastIndexOf(o, 0)
}, goog.string.endsWith = function(e, o) {
    var t = e.length - o.length;
    return 0 <= t && e.indexOf(o, t) == t
}, goog.string.caseInsensitiveStartsWith = function(e, o) {
    return 0 == goog.string.caseInsensitiveCompare(o, e.substr(0, o.length))
}, goog.string.caseInsensitiveEndsWith = function(e, o) {
    return 0 == goog.string.caseInsensitiveCompare(o, e.substr(e.length - o.length, o.length))
}, goog.string.caseInsensitiveEquals = function(e, o) {
    return e.toLowerCase() == o.toLowerCase()
}, goog.string.subs = function(e, o) {
    for (var t = e.split("%s"), n = "", r = Array.prototype.slice.call(arguments, 1); r.length && 1 < t.length;) n += t.shift() + r.shift();
    return n + t.join("%s")
}, goog.string.collapseWhitespace = function(e) {
    return e.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "")
}, goog.string.isEmptyOrWhitespace = function(e) {
    return /^[\s\xa0]*$/.test(e)
}, goog.string.isEmptyString = function(e) {
    return 0 == e.length
}, goog.string.isEmpty = goog.string.isEmptyOrWhitespace, goog.string.isEmptyOrWhitespaceSafe = function(e) {
    return goog.string.isEmptyOrWhitespace(goog.string.makeSafe(e))
}, goog.string.isEmptySafe = goog.string.isEmptyOrWhitespaceSafe, goog.string.isBreakingWhitespace = function(e) {
    return !/[^\t\n\r ]/.test(e)
}, goog.string.isAlpha = function(e) {
    return !/[^a-zA-Z]/.test(e)
}, goog.string.isNumeric = function(e) {
    return !/[^0-9]/.test(e)
}, goog.string.isAlphaNumeric = function(e) {
    return !/[^a-zA-Z0-9]/.test(e)
}, goog.string.isSpace = function(e) {
    return " " == e
}, goog.string.isUnicodeChar = function(e) {
    return 1 == e.length && " " <= e && "~" >= e || "" <= e && "�" >= e
}, goog.string.stripNewlines = function(e) {
    return e.replace(/(\r\n|\r|\n)+/g, " ")
}, goog.string.canonicalizeNewlines = function(e) {
    return e.replace(/(\r\n|\r|\n)/g, "\n")
}, goog.string.normalizeWhitespace = function(e) {
    return e.replace(/\xa0|\s/g, " ")
}, goog.string.normalizeSpaces = function(e) {
    return e.replace(/\xa0|[ \t]+/g, " ")
}, goog.string.collapseBreakingSpaces = function(e) {
    return e.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "")
}, goog.string.trim = goog.TRUSTED_SITE && String.prototype.trim ? function(e) {
    return e.trim()
} : function(e) {
    return e.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
}, goog.string.trimLeft = function(e) {
    return e.replace(/^[\s\xa0]+/, "")
}, goog.string.trimRight = function(e) {
    return e.replace(/[\s\xa0]+$/, "")
}, goog.string.caseInsensitiveCompare = function(e, o) {
    var t = String(e).toLowerCase(),
        n = String(o).toLowerCase();
    return t < n ? -1 : t == n ? 0 : 1
}, goog.string.numberAwareCompare_ = function(e, o, t) {
    if (e == o) return 0;
    if (!e) return -1;
    if (!o) return 1;
    for (var n = e.toLowerCase().match(t), r = o.toLowerCase().match(t), i = Math.min(n.length, r.length), s = 0; s < i; s++) {
        t = n[s];
        var l = r[s];
        if (t != l) return e = parseInt(t, 10), !isNaN(e) && (o = parseInt(l, 10), !isNaN(o) && e - o) ? e - o : t < l ? -1 : 1
    }
    return n.length != r.length ? n.length - r.length : e < o ? -1 : 1
}, goog.string.intAwareCompare = function(e, o) {
    return goog.string.numberAwareCompare_(e, o, /\d+|\D+/g)
}, goog.string.floatAwareCompare = function(e, o) {
    return goog.string.numberAwareCompare_(e, o, /\d+|\.\d+|\D+/g)
}, goog.string.numerateCompare = goog.string.floatAwareCompare, goog.string.urlEncode = function(e) {
    return encodeURIComponent(String(e))
}, goog.string.urlDecode = function(e) {
    return decodeURIComponent(e.replace(/\+/g, " "))
}, goog.string.newLineToBr = function(e, o) {
    return e.replace(/(\r\n|\r|\n)/g, o ? "<br />" : "<br>")
}, goog.string.htmlEscape = function(e, o) {
    if (o) e = e.replace(goog.string.AMP_RE_, "&amp;").replace(goog.string.LT_RE_, "&lt;").replace(goog.string.GT_RE_, "&gt;").replace(goog.string.QUOT_RE_, "&quot;").replace(goog.string.SINGLE_QUOTE_RE_, "&#39;").replace(goog.string.NULL_RE_, "&#0;"), goog.string.DETECT_DOUBLE_ESCAPING && (e = e.replace(goog.string.E_RE_, "&#101;"));
    else {
        if (!goog.string.ALL_RE_.test(e)) return e; - 1 != e.indexOf("&") && (e = e.replace(goog.string.AMP_RE_, "&amp;")), -1 != e.indexOf("<") && (e = e.replace(goog.string.LT_RE_, "&lt;")), -1 != e.indexOf(">") && (e = e.replace(goog.string.GT_RE_, "&gt;")), -1 != e.indexOf('"') && (e = e.replace(goog.string.QUOT_RE_, "&quot;")), -1 != e.indexOf("'") && (e = e.replace(goog.string.SINGLE_QUOTE_RE_, "&#39;")), -1 != e.indexOf("\0") && (e = e.replace(goog.string.NULL_RE_, "&#0;")), goog.string.DETECT_DOUBLE_ESCAPING && -1 != e.indexOf("e") && (e = e.replace(goog.string.E_RE_, "&#101;"))
    }
    return e
}, goog.string.AMP_RE_ = /&/g, goog.string.LT_RE_ = /</g, goog.string.GT_RE_ = />/g, goog.string.QUOT_RE_ = /"/g, goog.string.SINGLE_QUOTE_RE_ = /'/g, goog.string.NULL_RE_ = /\x00/g, goog.string.E_RE_ = /e/g, goog.string.ALL_RE_ = goog.string.DETECT_DOUBLE_ESCAPING ? /[\x00&<>"'e]/ : /[\x00&<>"']/, goog.string.unescapeEntities = function(e) {
    return goog.string.contains(e, "&") ? !goog.string.FORCE_NON_DOM_HTML_UNESCAPING && "document" in goog.global ? goog.string.unescapeEntitiesUsingDom_(e) : goog.string.unescapePureXmlEntities_(e) : e
}, goog.string.unescapeEntitiesWithDocument = function(e, o) {
    return goog.string.contains(e, "&") ? goog.string.unescapeEntitiesUsingDom_(e, o) : e
}, goog.string.unescapeEntitiesUsingDom_ = function(e, o) {
    var t = {
            "&amp;": "&",
            "&lt;": "<",
            "&gt;": ">",
            "&quot;": '"'
        },
        n = o ? o.createElement("div") : goog.global.document.createElement("div");
    return e.replace(goog.string.HTML_ENTITY_PATTERN_, function(e, o) {
        var r = t[e];
        if (r) return r;
        if ("#" == o.charAt(0)) {
            var i = Number("0" + o.substr(1));
            isNaN(i) || (r = String.fromCharCode(i))
        }
        return r || (n.innerHTML = e + " ", r = n.firstChild.nodeValue.slice(0, -1)), t[e] = r
    })
}, goog.string.unescapePureXmlEntities_ = function(e) {
    return e.replace(/&([^;]+);/g, function(e, o) {
        switch (o) {
            case "amp":
                return "&";
            case "lt":
                return "<";
            case "gt":
                return ">";
            case "quot":
                return '"';
            default:
                if ("#" == o.charAt(0)) {
                    var t = Number("0" + o.substr(1));
                    if (!isNaN(t)) return String.fromCharCode(t)
                }
                return e
        }
    })
}, goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g, goog.string.whitespaceEscape = function(e, o) {
    return goog.string.newLineToBr(e.replace(/  /g, " &#160;"), o)
}, goog.string.preserveSpaces = function(e) {
    return e.replace(/(^|[\n ]) /g, "$1" + goog.string.Unicode.NBSP)
}, goog.string.stripQuotes = function(e, o) {
    for (var t = o.length, n = 0; n < t; n++) {
        var r = 1 == t ? o : o.charAt(n);
        if (e.charAt(0) == r && e.charAt(e.length - 1) == r) return e.substring(1, e.length - 1)
    }
    return e
}, goog.string.truncate = function(e, o, t) {
    return t && (e = goog.string.unescapeEntities(e)), e.length > o && (e = e.substring(0, o - 3) + "..."), t && (e = goog.string.htmlEscape(e)), e
}, goog.string.truncateMiddle = function(e, o, t, n) {
    if (t && (e = goog.string.unescapeEntities(e)), n && e.length > o) {
        n > o && (n = o);
        var r = e.length - n;
        e = e.substring(0, o - n) + "..." + e.substring(r)
    } else e.length > o && (n = Math.floor(o / 2), r = e.length - n, e = e.substring(0, n + o % 2) + "..." + e.substring(r));
    return t && (e = goog.string.htmlEscape(e)), e
}, goog.string.specialEscapeChars_ = {
    "\0": "\\0",
    "\b": "\\b",
    "\f": "\\f",
    "\n": "\\n",
    "\r": "\\r",
    "\t": "\\t",
    "\v": "\\x0B",
    '"': '\\"',
    "\\": "\\\\",
    "<": "<"
}, goog.string.jsEscapeCache_ = {
    "'": "\\'"
}, goog.string.quote = function(e) {
    e = String(e);
    for (var o = ['"'], t = 0; t < e.length; t++) {
        var n = e.charAt(t),
            r = n.charCodeAt(0);
        o[t + 1] = goog.string.specialEscapeChars_[n] || (31 < r && 127 > r ? n : goog.string.escapeChar(n))
    }
    return o.push('"'), o.join("")
}, goog.string.escapeString = function(e) {
    for (var o = [], t = 0; t < e.length; t++) o[t] = goog.string.escapeChar(e.charAt(t));
    return o.join("")
}, goog.string.escapeChar = function(e) {
    if (e in goog.string.jsEscapeCache_) return goog.string.jsEscapeCache_[e];
    if (e in goog.string.specialEscapeChars_) return goog.string.jsEscapeCache_[e] = goog.string.specialEscapeChars_[e];
    var o = e.charCodeAt(0);
    if (31 < o && 127 > o) var t = e;
    else 256 > o ? (t = "\\x", (16 > o || 256 < o) && (t += "0")) : (t = "\\u", 4096 > o && (t += "0")), t += o.toString(16).toUpperCase();
    return goog.string.jsEscapeCache_[e] = t
}, goog.string.contains = function(e, o) {
    return -1 != e.indexOf(o)
}, goog.string.caseInsensitiveContains = function(e, o) {
    return goog.string.contains(e.toLowerCase(), o.toLowerCase())
}, goog.string.countOf = function(e, o) {
    return e && o ? e.split(o).length - 1 : 0
}, goog.string.removeAt = function(e, o, t) {
    var n = e;
    return 0 <= o && o < e.length && 0 < t && (n = e.substr(0, o) + e.substr(o + t, e.length - o - t)), n
}, goog.string.remove = function(e, o) {
    return e.replace(o, "")
}, goog.string.removeAll = function(e, o) {
    var t = new RegExp(goog.string.regExpEscape(o), "g");
    return e.replace(t, "")
}, goog.string.replaceAll = function(e, o, t) {
    return o = new RegExp(goog.string.regExpEscape(o), "g"), e.replace(o, t.replace(/\$/g, "$$$$"))
}, goog.string.regExpEscape = function(e) {
    return String(e).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
}, goog.string.repeat = String.prototype.repeat ? function(e, o) {
    return e.repeat(o)
} : function(e, o) {
    return Array(o + 1).join(e)
}, goog.string.padNumber = function(e, o, t) {
    return e = goog.isDef(t) ? e.toFixed(t) : String(e), -1 == (t = e.indexOf(".")) && (t = e.length), goog.string.repeat("0", Math.max(0, o - t)) + e
}, goog.string.makeSafe = function(e) {
    return null == e ? "" : String(e)
}, goog.string.buildString = function(e) {
    return Array.prototype.join.call(arguments, "")
}, goog.string.getRandomString = function() {
    return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ goog.now()).toString(36)
}, goog.string.compareVersions = function(e, o) {
    for (var t = 0, n = goog.string.trim(String(e)).split("."), r = goog.string.trim(String(o)).split("."), i = Math.max(n.length, r.length), s = 0; 0 == t && s < i; s++) {
        var l = n[s] || "",
            g = r[s] || "";
        do {
            if (l = /(\d*)(\D*)(.*)/.exec(l) || ["", "", "", ""], g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""], 0 == l[0].length && 0 == g[0].length) break;
            var t = 0 == l[1].length ? 0 : parseInt(l[1], 10),
                a = 0 == g[1].length ? 0 : parseInt(g[1], 10),
                t = goog.string.compareElements_(t, a) || goog.string.compareElements_(0 == l[2].length, 0 == g[2].length) || goog.string.compareElements_(l[2], g[2]),
                l = l[3],
                g = g[3]
        } while (0 == t)
    }
    return t
}, goog.string.compareElements_ = function(e, o) {
    return e < o ? -1 : e > o ? 1 : 0
}, goog.string.hashCode = function(e) {
    for (var o = 0, t = 0; t < e.length; ++t) o = 31 * o + e.charCodeAt(t) >>> 0;
    return o
}, goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0, goog.string.createUniqueString = function() {
    return "goog_" + goog.string.uniqueStringCounter_++
}, goog.string.toNumber = function(e) {
    var o = Number(e);
    return 0 == o && goog.string.isEmptyOrWhitespace(e) ? NaN : o
}, goog.string.isLowerCamelCase = function(e) {
    return /^[a-z]+([A-Z][a-z]*)*$/.test(e)
}, goog.string.isUpperCamelCase = function(e) {
    return /^([A-Z][a-z]*)+$/.test(e)
}, goog.string.toCamelCase = function(e) {
    return String(e).replace(/\-([a-z])/g, function(e, o) {
        return o.toUpperCase()
    })
}, goog.string.toSelectorCase = function(e) {
    return String(e).replace(/([A-Z])/g, "-$1").toLowerCase()
}, goog.string.toTitleCase = function(e, o) {
    var t = goog.isString(o) ? goog.string.regExpEscape(o) : "\\s";
    return e.replace(new RegExp("(^" + (t ? "|[" + t + "]+" : "") + ")([a-z])", "g"), function(e, o, t) {
        return o + t.toUpperCase()
    })
}, goog.string.capitalize = function(e) {
    return String(e.charAt(0)).toUpperCase() + String(e.substr(1)).toLowerCase()
}, goog.string.parseInt = function(e) {
    return isFinite(e) && (e = String(e)), goog.isString(e) ? /^\s*-?0x/i.test(e) ? parseInt(e, 16) : parseInt(e, 10) : NaN
}, goog.string.splitLimit = function(e, o, t) {
    e = e.split(o);
    for (var n = []; 0 < t && e.length;) n.push(e.shift()), t--;
    return e.length && n.push(e.join(o)), n
}, goog.string.lastComponent = function(e, o) {
    if (!o) return e;
    "string" == typeof o && (o = [o]);
    for (var t = -1, n = 0; n < o.length; n++)
        if ("" != o[n]) {
            var r = e.lastIndexOf(o[n]);
            r > t && (t = r)
        }
    return -1 == t ? e : e.slice(t + 1)
}, goog.string.editDistance = function(e, o) {
    var t = [],
        n = [];
    if (e == o) return 0;
    if (!e.length || !o.length) return Math.max(e.length, o.length);
    for (var r = 0; r < o.length + 1; r++) t[r] = r;
    for (r = 0; r < e.length; r++) {
        n[0] = r + 1;
        for (var i = 0; i < o.length; i++) n[i + 1] = Math.min(n[i] + 1, t[i + 1] + 1, t[i] + Number(e[r] != o[i]));
        for (i = 0; i < t.length; i++) t[i] = n[i]
    }
    return n[o.length]
}, goog.asserts = {}, goog.asserts.ENABLE_ASSERTS = goog.DEBUG, goog.asserts.AssertionError = function(e, o) {
    o.unshift(e), goog.debug.Error.call(this, goog.string.subs.apply(null, o)), o.shift(), this.messagePattern = e
}, goog.inherits(goog.asserts.AssertionError, goog.debug.Error), goog.asserts.AssertionError.prototype.name = "AssertionError", goog.asserts.DEFAULT_ERROR_HANDLER = function(e) {
    throw e
}, goog.asserts.errorHandler_ = goog.asserts.DEFAULT_ERROR_HANDLER, goog.asserts.doAssertFailure_ = function(e, o, t, n) {
    var r = "Assertion failed";
    if (t) {
        r += ": " + t;
        var i = n
    } else e && (r += ": " + e, i = o);
    e = new goog.asserts.AssertionError("" + r, i || []), goog.asserts.errorHandler_(e)
}, goog.asserts.setErrorHandler = function(e) {
    goog.asserts.ENABLE_ASSERTS && (goog.asserts.errorHandler_ = e)
}, goog.asserts.assert = function(e, o, t) {
    return goog.asserts.ENABLE_ASSERTS && !e && goog.asserts.doAssertFailure_("", null, o, Array.prototype.slice.call(arguments, 2)), e
}, goog.asserts.fail = function(e, o) {
    goog.asserts.ENABLE_ASSERTS && goog.asserts.errorHandler_(new goog.asserts.AssertionError("Failure" + (e ? ": " + e : ""), Array.prototype.slice.call(arguments, 1)))
}, goog.asserts.assertNumber = function(e, o, t) {
    return goog.asserts.ENABLE_ASSERTS && !goog.isNumber(e) && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(e), e], o, Array.prototype.slice.call(arguments, 2)), e
}, goog.asserts.assertString = function(e, o, t) {
    return goog.asserts.ENABLE_ASSERTS && !goog.isString(e) && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(e), e], o, Array.prototype.slice.call(arguments, 2)), e
}, goog.asserts.assertFunction = function(e, o, t) {
    return goog.asserts.ENABLE_ASSERTS && !goog.isFunction(e) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(e), e], o, Array.prototype.slice.call(arguments, 2)), e
}, goog.asserts.assertObject = function(e, o, t) {
    return goog.asserts.ENABLE_ASSERTS && !goog.isObject(e) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(e), e], o, Array.prototype.slice.call(arguments, 2)), e
}, goog.asserts.assertArray = function(e, o, t) {
    return goog.asserts.ENABLE_ASSERTS && !goog.isArray(e) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(e), e], o, Array.prototype.slice.call(arguments, 2)), e
}, goog.asserts.assertBoolean = function(e, o, t) {
    return goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(e) && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(e), e], o, Array.prototype.slice.call(arguments, 2)), e
}, goog.asserts.assertElement = function(e, o, t) {
    return !goog.asserts.ENABLE_ASSERTS || goog.isObject(e) && e.nodeType == goog.dom.NodeType.ELEMENT || goog.asserts.doAssertFailure_("Expected Element but got %s: %s.", [goog.typeOf(e), e], o, Array.prototype.slice.call(arguments, 2)), e
}, goog.asserts.assertInstanceof = function(e, o, t, n) {
    return !goog.asserts.ENABLE_ASSERTS || e instanceof o || goog.asserts.doAssertFailure_("Expected instanceof %s but got %s.", [goog.asserts.getType_(o), goog.asserts.getType_(e)], t, Array.prototype.slice.call(arguments, 3)), e
}, goog.asserts.assertObjectPrototypeIsIntact = function() {
    for (var e in Object.prototype) goog.asserts.fail(e + " should not be enumerable in Object.prototype.")
}, goog.asserts.getType_ = function(e) {
    return e instanceof Function ? e.displayName || e.name || "unknown type name" : e instanceof Object ? e.constructor.displayName || e.constructor.name || Object.prototype.toString.call(e) : null === e ? "null" : typeof e
}, goog.debug.entryPointRegistry = {}, goog.debug.EntryPointMonitor = function() {}, goog.debug.entryPointRegistry.refList_ = [], goog.debug.entryPointRegistry.monitors_ = [], goog.debug.entryPointRegistry.monitorsMayExist_ = !1, goog.debug.entryPointRegistry.register = function(e) {
    if (goog.debug.entryPointRegistry.refList_[goog.debug.entryPointRegistry.refList_.length] = e, goog.debug.entryPointRegistry.monitorsMayExist_)
        for (var o = goog.debug.entryPointRegistry.monitors_, t = 0; t < o.length; t++) e(goog.bind(o[t].wrap, o[t]))
}, goog.debug.entryPointRegistry.monitorAll = function(e) {
    goog.debug.entryPointRegistry.monitorsMayExist_ = !0;
    for (var o = goog.bind(e.wrap, e), t = 0; t < goog.debug.entryPointRegistry.refList_.length; t++) goog.debug.entryPointRegistry.refList_[t](o);
    goog.debug.entryPointRegistry.monitors_.push(e)
}, goog.debug.entryPointRegistry.unmonitorAllIfPossible = function(e) {
    var o = goog.debug.entryPointRegistry.monitors_;
    goog.asserts.assert(e == o[o.length - 1], "Only the most recent monitor can be unwrapped."), e = goog.bind(e.unwrap, e);
    for (var t = 0; t < goog.debug.entryPointRegistry.refList_.length; t++) goog.debug.entryPointRegistry.refList_[t](e);
    o.length--
}, goog.array = {}, goog.NATIVE_ARRAY_PROTOTYPES = goog.TRUSTED_SITE, goog.array.ASSUME_NATIVE_FUNCTIONS = !1, goog.array.peek = function(e) {
    return e[e.length - 1]
}, goog.array.last = goog.array.peek, goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.indexOf) ? function(e, o, t) {
    return goog.asserts.assert(null != e.length), Array.prototype.indexOf.call(e, o, t)
} : function(e, o, t) {
    if (t = null == t ? 0 : 0 > t ? Math.max(0, e.length + t) : t, goog.isString(e)) return goog.isString(o) && 1 == o.length ? e.indexOf(o, t) : -1;
    for (; t < e.length; t++)
        if (t in e && e[t] === o) return t;
    return -1
}, goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.lastIndexOf) ? function(e, o, t) {
    return goog.asserts.assert(null != e.length), Array.prototype.lastIndexOf.call(e, o, null == t ? e.length - 1 : t)
} : function(e, o, t) {
    if (0 > (t = null == t ? e.length - 1 : t) && (t = Math.max(0, e.length + t)), goog.isString(e)) return goog.isString(o) && 1 == o.length ? e.lastIndexOf(o, t) : -1;
    for (; 0 <= t; t--)
        if (t in e && e[t] === o) return t;
    return -1
}, goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.forEach) ? function(e, o, t) {
    goog.asserts.assert(null != e.length), Array.prototype.forEach.call(e, o, t)
} : function(e, o, t) {
    for (var n = e.length, r = goog.isString(e) ? e.split("") : e, i = 0; i < n; i++) i in r && o.call(t, r[i], i, e)
}, goog.array.forEachRight = function(e, o, t) {
    for (var n = e.length, r = goog.isString(e) ? e.split("") : e, n = n - 1; 0 <= n; --n) n in r && o.call(t, r[n], n, e)
}, goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.filter) ? function(e, o, t) {
    return goog.asserts.assert(null != e.length), Array.prototype.filter.call(e, o, t)
} : function(e, o, t) {
    for (var n = e.length, r = [], i = 0, s = goog.isString(e) ? e.split("") : e, l = 0; l < n; l++)
        if (l in s) {
            var g = s[l];
            o.call(t, g, l, e) && (r[i++] = g)
        }
    return r
}, goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.map) ? function(e, o, t) {
    return goog.asserts.assert(null != e.length), Array.prototype.map.call(e, o, t)
} : function(e, o, t) {
    for (var n = e.length, r = Array(n), i = goog.isString(e) ? e.split("") : e, s = 0; s < n; s++) s in i && (r[s] = o.call(t, i[s], s, e));
    return r
}, goog.array.reduce = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduce) ? function(e, o, t, n) {
    return goog.asserts.assert(null != e.length), n && (o = goog.bind(o, n)), Array.prototype.reduce.call(e, o, t)
} : function(e, o, t, n) {
    var r = t;
    return goog.array.forEach(e, function(t, i) {
        r = o.call(n, r, t, i, e)
    }), r
}, goog.array.reduceRight = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduceRight) ? function(e, o, t, n) {
    return goog.asserts.assert(null != e.length), goog.asserts.assert(null != o), n && (o = goog.bind(o, n)), Array.prototype.reduceRight.call(e, o, t)
} : function(e, o, t, n) {
    var r = t;
    return goog.array.forEachRight(e, function(t, i) {
        r = o.call(n, r, t, i, e)
    }), r
}, goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.some) ? function(e, o, t) {
    return goog.asserts.assert(null != e.length), Array.prototype.some.call(e, o, t)
} : function(e, o, t) {
    for (var n = e.length, r = goog.isString(e) ? e.split("") : e, i = 0; i < n; i++)
        if (i in r && o.call(t, r[i], i, e)) return !0;
    return !1
}, goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.every) ? function(e, o, t) {
    return goog.asserts.assert(null != e.length), Array.prototype.every.call(e, o, t)
} : function(e, o, t) {
    for (var n = e.length, r = goog.isString(e) ? e.split("") : e, i = 0; i < n; i++)
        if (i in r && !o.call(t, r[i], i, e)) return !1;
    return !0
}, goog.array.count = function(e, o, t) {
    var n = 0;
    return goog.array.forEach(e, function(e, r, i) {
        o.call(t, e, r, i) && ++n
    }, t), n
}, goog.array.find = function(e, o, t) {
    return o = goog.array.findIndex(e, o, t), 0 > o ? null : goog.isString(e) ? e.charAt(o) : e[o]
}, goog.array.findIndex = function(e, o, t) {
    for (var n = e.length, r = goog.isString(e) ? e.split("") : e, i = 0; i < n; i++)
        if (i in r && o.call(t, r[i], i, e)) return i;
    return -1
}, goog.array.findRight = function(e, o, t) {
    return o = goog.array.findIndexRight(e, o, t), 0 > o ? null : goog.isString(e) ? e.charAt(o) : e[o]
}, goog.array.findIndexRight = function(e, o, t) {
    for (var n = e.length, r = goog.isString(e) ? e.split("") : e, n = n - 1; 0 <= n; n--)
        if (n in r && o.call(t, r[n], n, e)) return n;
    return -1
}, goog.array.contains = function(e, o) {
    return 0 <= goog.array.indexOf(e, o)
}, goog.array.isEmpty = function(e) {
    return 0 == e.length
}, goog.array.clear = function(e) {
    if (!goog.isArray(e))
        for (var o = e.length - 1; 0 <= o; o--) delete e[o];
    e.length = 0
}, goog.array.insert = function(e, o) {
    goog.array.contains(e, o) || e.push(o)
}, goog.array.insertAt = function(e, o, t) {
    goog.array.splice(e, t, 0, o)
}, goog.array.insertArrayAt = function(e, o, t) {
    goog.partial(goog.array.splice, e, t, 0).apply(null, o)
}, goog.array.insertBefore = function(e, o, t) {
    var n;
    2 == arguments.length || 0 > (n = goog.array.indexOf(e, t)) ? e.push(o) : goog.array.insertAt(e, o, n)
}, goog.array.remove = function(e, o) {
    var t, n = goog.array.indexOf(e, o);
    return (t = 0 <= n) && goog.array.removeAt(e, n), t
}, goog.array.removeLast = function(e, o) {
    var t = goog.array.lastIndexOf(e, o);
    return 0 <= t && (goog.array.removeAt(e, t), !0)
}, goog.array.removeAt = function(e, o) {
    return goog.asserts.assert(null != e.length), 1 == Array.prototype.splice.call(e, o, 1).length
}, goog.array.removeIf = function(e, o, t) {
    return 0 <= (o = goog.array.findIndex(e, o, t)) && (goog.array.removeAt(e, o), !0)
}, goog.array.removeAllIf = function(e, o, t) {
    var n = 0;
    return goog.array.forEachRight(e, function(r, i) {
        o.call(t, r, i, e) && goog.array.removeAt(e, i) && n++
    }), n
}, goog.array.concat = function(e) {
    return Array.prototype.concat.apply([], arguments)
}, goog.array.join = function(e) {
    return Array.prototype.concat.apply([], arguments)
}, goog.array.toArray = function(e) {
    var o = e.length;
    if (0 < o) {
        for (var t = Array(o), n = 0; n < o; n++) t[n] = e[n];
        return t
    }
    return []
}, goog.array.clone = goog.array.toArray, goog.array.extend = function(e, o) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        if (goog.isArrayLike(n)) {
            var r = e.length || 0,
                i = n.length || 0;
            e.length = r + i;
            for (var s = 0; s < i; s++) e[r + s] = n[s]
        } else e.push(n)
    }
}, goog.array.splice = function(e, o, t, n) {
    return goog.asserts.assert(null != e.length), Array.prototype.splice.apply(e, goog.array.slice(arguments, 1))
}, goog.array.slice = function(e, o, t) {
    return goog.asserts.assert(null != e.length), 2 >= arguments.length ? Array.prototype.slice.call(e, o) : Array.prototype.slice.call(e, o, t)
}, goog.array.removeDuplicates = function(e, o, t) {
    o = o || e;
    n = function(e) {
        return goog.isObject(e) ? "o" + goog.getUid(e) : (typeof e).charAt(0) + e
    };
    t = t || n;
    for (var n = {}, r = 0, i = 0; i < e.length;) {
        var s = e[i++],
            l = t(s);
        Object.prototype.hasOwnProperty.call(n, l) || (n[l] = !0, o[r++] = s)
    }
    o.length = r
}, goog.array.binarySearch = function(e, o, t) {
    return goog.array.binarySearch_(e, t || goog.array.defaultCompare, !1, o)
}, goog.array.binarySelect = function(e, o, t) {
    return goog.array.binarySearch_(e, o, !0, void 0, t)
}, goog.array.binarySearch_ = function(e, o, t, n, r) {
    for (var i, s = 0, l = e.length; s < l;) {
        var g = s + l >> 1,
            a = t ? o.call(r, e[g], g, e) : o(n, e[g]);
        0 < a ? s = g + 1 : (l = g, i = !a)
    }
    return i ? s : ~s
}, goog.array.sort = function(e, o) {
    e.sort(o || goog.array.defaultCompare)
}, goog.array.stableSort = function(e, o) {
    for (var t = Array(e.length), n = 0; n < e.length; n++) t[n] = {
        index: n,
        value: e[n]
    };
    var r = o || goog.array.defaultCompare;
    for (goog.array.sort(t, function(e, o) {
            return r(e.value, o.value) || e.index - o.index
        }), n = 0; n < e.length; n++) e[n] = t[n].value
}, goog.array.sortByKey = function(e, o, t) {
    var n = t || goog.array.defaultCompare;
    goog.array.sort(e, function(e, t) {
        return n(o(e), o(t))
    })
}, goog.array.sortObjectsByKey = function(e, o, t) {
    goog.array.sortByKey(e, function(e) {
        return e[o]
    }, t)
}, goog.array.isSorted = function(e, o, t) {
    o = o || goog.array.defaultCompare;
    for (var n = 1; n < e.length; n++) {
        var r = o(e[n - 1], e[n]);
        if (0 < r || 0 == r && t) return !1
    }
    return !0
}, goog.array.equals = function(e, o, t) {
    if (!goog.isArrayLike(e) || !goog.isArrayLike(o) || e.length != o.length) return !1;
    var n = e.length;
    t = t || goog.array.defaultCompareEquality;
    for (var r = 0; r < n; r++)
        if (!t(e[r], o[r])) return !1;
    return !0
}, goog.array.compare3 = function(e, o, t) {
    t = t || goog.array.defaultCompare;
    for (var n = Math.min(e.length, o.length), r = 0; r < n; r++) {
        var i = t(e[r], o[r]);
        if (0 != i) return i
    }
    return goog.array.defaultCompare(e.length, o.length)
}, goog.array.defaultCompare = function(e, o) {
    return e > o ? 1 : e < o ? -1 : 0
}, goog.array.inverseDefaultCompare = function(e, o) {
    return -goog.array.defaultCompare(e, o)
}, goog.array.defaultCompareEquality = function(e, o) {
    return e === o
}, goog.array.binaryInsert = function(e, o, t) {
    return 0 > (t = goog.array.binarySearch(e, o, t)) && (goog.array.insertAt(e, o, -(t + 1)), !0)
}, goog.array.binaryRemove = function(e, o, t) {
    return 0 <= (o = goog.array.binarySearch(e, o, t)) && goog.array.removeAt(e, o)
}, goog.array.bucket = function(e, o, t) {
    for (var n = {}, r = 0; r < e.length; r++) {
        var i = e[r],
            s = o.call(t, i, r, e);
        goog.isDef(s) && (n[s] || (n[s] = [])).push(i)
    }
    return n
}, goog.array.toObject = function(e, o, t) {
    var n = {};
    return goog.array.forEach(e, function(r, i) {
        n[o.call(t, r, i, e)] = r
    }), n
}, goog.array.range = function(e, o, t) {
    var n = [],
        r = 0,
        i = e;
    if (t = t || 1, void 0 !== o && (r = e, i = o), 0 > t * (i - r)) return [];
    if (0 < t)
        for (e = r; e < i; e += t) n.push(e);
    else
        for (e = r; e > i; e += t) n.push(e);
    return n
}, goog.array.repeat = function(e, o) {
    for (var t = [], n = 0; n < o; n++) t[n] = e;
    return t
}, goog.array.flatten = function(e) {
    for (var o = [], t = 0; t < arguments.length; t++) {
        var n = arguments[t];
        if (goog.isArray(n))
            for (var r = 0; r < n.length; r += 8192)
                for (var i = goog.array.slice(n, r, r + 8192), i = goog.array.flatten.apply(null, i), s = 0; s < i.length; s++) o.push(i[s]);
        else o.push(n)
    }
    return o
}, goog.array.rotate = function(e, o) {
    return goog.asserts.assert(null != e.length), e.length && (o %= e.length, 0 < o ? Array.prototype.unshift.apply(e, e.splice(-o, o)) : 0 > o && Array.prototype.push.apply(e, e.splice(0, -o))), e
}, goog.array.moveItem = function(e, o, t) {
    goog.asserts.assert(0 <= o && o < e.length), goog.asserts.assert(0 <= t && t < e.length), o = Array.prototype.splice.call(e, o, 1), Array.prototype.splice.call(e, t, 0, o[0])
}, goog.array.zip = function(e) {
    if (!arguments.length) return [];
    for (var o = [], t = arguments[0].length, n = 1; n < arguments.length; n++) arguments[n].length < t && (t = arguments[n].length);
    for (n = 0; n < t; n++) {
        for (var r = [], i = 0; i < arguments.length; i++) r.push(arguments[i][n]);
        o.push(r)
    }
    return o
}, goog.array.shuffle = function(e, o) {
    for (var t = o || Math.random, n = e.length - 1; 0 < n; n--) {
        var r = Math.floor(t() * (n + 1)),
            i = e[n];
        e[n] = e[r], e[r] = i
    }
}, goog.array.copyByIndex = function(e, o) {
    var t = [];
    return goog.array.forEach(o, function(o) {
        t.push(e[o])
    }), t
}, goog.array.concatMap = function(e, o, t) {
    return goog.array.concat.apply([], goog.array.map(e, o, t))
}, goog.labs = {}, goog.labs.userAgent = {}, goog.labs.userAgent.util = {}, goog.labs.userAgent.util.getNativeUserAgentString_ = function() {
    var e = goog.labs.userAgent.util.getNavigator_();
    return e && (e = e.userAgent) ? e : ""
}, goog.labs.userAgent.util.getNavigator_ = function() {
    return goog.global.navigator
}, goog.labs.userAgent.util.userAgent_ = goog.labs.userAgent.util.getNativeUserAgentString_(), goog.labs.userAgent.util.setUserAgent = function(e) {
    goog.labs.userAgent.util.userAgent_ = e || goog.labs.userAgent.util.getNativeUserAgentString_()
}, goog.labs.userAgent.util.getUserAgent = function() {
    return goog.labs.userAgent.util.userAgent_
}, goog.labs.userAgent.util.matchUserAgent = function(e) {
    var o = goog.labs.userAgent.util.getUserAgent();
    return goog.string.contains(o, e)
}, goog.labs.userAgent.util.matchUserAgentIgnoreCase = function(e) {
    var o = goog.labs.userAgent.util.getUserAgent();
    return goog.string.caseInsensitiveContains(o, e)
}, goog.labs.userAgent.util.extractVersionTuples = function(e) {
    for (var o, t = RegExp("(\\w[\\w ]+)/([^\\s]+)\\s*(?:\\((.*?)\\))?", "g"), n = []; o = t.exec(e);) n.push([o[1], o[2], o[3] || void 0]);
    return n
}, goog.object = {}, goog.object.is = function(e, o) {
    return e === o ? 0 !== e || 1 / e == 1 / o : e !== e && o !== o
}, goog.object.forEach = function(e, o, t) {
    for (var n in e) o.call(t, e[n], n, e)
}, goog.object.filter = function(e, o, t) {
    var n, r = {};
    for (n in e) o.call(t, e[n], n, e) && (r[n] = e[n]);
    return r
}, goog.object.map = function(e, o, t) {
    var n, r = {};
    for (n in e) r[n] = o.call(t, e[n], n, e);
    return r
}, goog.object.some = function(e, o, t) {
    for (var n in e)
        if (o.call(t, e[n], n, e)) return !0;
    return !1
}, goog.object.every = function(e, o, t) {
    for (var n in e)
        if (!o.call(t, e[n], n, e)) return !1;
    return !0
}, goog.object.getCount = function(e) {
    var o, t = 0;
    for (o in e) t++;
    return t
}, goog.object.getAnyKey = function(e) {
    for (var o in e) return o
}, goog.object.getAnyValue = function(e) {
    for (var o in e) return e[o]
}, goog.object.contains = function(e, o) {
    return goog.object.containsValue(e, o)
}, goog.object.getValues = function(e) {
    var o, t = [],
        n = 0;
    for (o in e) t[n++] = e[o];
    return t
}, goog.object.getKeys = function(e) {
    var o, t = [],
        n = 0;
    for (o in e) t[n++] = o;
    return t
}, goog.object.getValueByKeys = function(e, o) {
    for (var t = (n = goog.isArrayLike(o)) ? o : arguments, n = n ? 0 : 1; n < t.length && (e = e[t[n]], goog.isDef(e)); n++);
    return e
}, goog.object.containsKey = function(e, o) {
    return null !== e && o in e
}, goog.object.containsValue = function(e, o) {
    for (var t in e)
        if (e[t] == o) return !0;
    return !1
}, goog.object.findKey = function(e, o, t) {
    for (var n in e)
        if (o.call(t, e[n], n, e)) return n
}, goog.object.findValue = function(e, o, t) {
    return (o = goog.object.findKey(e, o, t)) && e[o]
}, goog.object.isEmpty = function(e) {
    for (var o in e) return !1;
    return !0
}, goog.object.clear = function(e) {
    for (var o in e) delete e[o]
}, goog.object.remove = function(e, o) {
    var t;
    return (t = o in e) && delete e[o], t
}, goog.object.add = function(e, o, t) {
    if (null !== e && o in e) throw Error('The object already contains the key "' + o + '"');
    goog.object.set(e, o, t)
}, goog.object.get = function(e, o, t) {
    return null !== e && o in e ? e[o] : t
}, goog.object.set = function(e, o, t) {
    e[o] = t
}, goog.object.setIfUndefined = function(e, o, t) {
    return o in e ? e[o] : e[o] = t
}, goog.object.setWithReturnValueIfNotSet = function(e, o, t) {
    return o in e ? e[o] : (t = t(), e[o] = t)
}, goog.object.equals = function(e, o) {
    for (var t in e)
        if (!(t in o) || e[t] !== o[t]) return !1;
    for (t in o)
        if (!(t in e)) return !1;
    return !0
}, goog.object.clone = function(e) {
    var o, t = {};
    for (o in e) t[o] = e[o];
    return t
}, goog.object.unsafeClone = function(e) {
    if ("object" == (t = goog.typeOf(e)) || "array" == t) {
        if (goog.isFunction(e.clone)) return e.clone();
        var o, t = "array" == t ? [] : {};
        for (o in e) t[o] = goog.object.unsafeClone(e[o]);
        return t
    }
    return e
}, goog.object.transpose = function(e) {
    var o, t = {};
    for (o in e) t[e[o]] = o;
    return t
}, goog.object.PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "), goog.object.extend = function(e, o) {
    for (var t, n, r = 1; r < arguments.length; r++) {
        n = arguments[r];
        for (t in n) e[t] = n[t];
        for (var i = 0; i < goog.object.PROTOTYPE_FIELDS_.length; i++) t = goog.object.PROTOTYPE_FIELDS_[i], Object.prototype.hasOwnProperty.call(n, t) && (e[t] = n[t])
    }
}, goog.object.create = function(e) {
    var o = arguments.length;
    if (1 == o && goog.isArray(arguments[0])) return goog.object.create.apply(null, arguments[0]);
    if (o % 2) throw Error("Uneven number of arguments");
    for (var t = {}, n = 0; n < o; n += 2) t[arguments[n]] = arguments[n + 1];
    return t
}, goog.object.createSet = function(e) {
    var o = arguments.length;
    if (1 == o && goog.isArray(arguments[0])) return goog.object.createSet.apply(null, arguments[0]);
    for (var t = {}, n = 0; n < o; n++) t[arguments[n]] = !0;
    return t
}, goog.object.createImmutableView = function(e) {
    var o = e;
    return Object.isFrozen && !Object.isFrozen(e) && (o = Object.create(e), Object.freeze(o)), o
}, goog.object.isImmutableView = function(e) {
    return !!Object.isFrozen && Object.isFrozen(e)
}, goog.object.getAllPropertyNames = function(e, o, t) {
    if (!e) return [];
    if (!Object.getOwnPropertyNames || !Object.getPrototypeOf) return goog.object.getKeys(e);
    for (var n = {}; e && (e !== Object.prototype || o) && (e !== Function.prototype || t);) {
        for (var r = Object.getOwnPropertyNames(e), i = 0; i < r.length; i++) n[r[i]] = !0;
        e = Object.getPrototypeOf(e)
    }
    return goog.object.getKeys(n)
}, goog.labs.userAgent.browser = {}, goog.labs.userAgent.browser.matchOpera_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Opera")
}, goog.labs.userAgent.browser.matchIE_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE")
}, goog.labs.userAgent.browser.matchEdge_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Edge")
}, goog.labs.userAgent.browser.matchFirefox_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Firefox")
}, goog.labs.userAgent.browser.matchSafari_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Safari") && !(goog.labs.userAgent.browser.matchChrome_() || goog.labs.userAgent.browser.matchCoast_() || goog.labs.userAgent.browser.matchOpera_() || goog.labs.userAgent.browser.matchEdge_() || goog.labs.userAgent.browser.isSilk() || goog.labs.userAgent.util.matchUserAgent("Android"))
}, goog.labs.userAgent.browser.matchCoast_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Coast")
}, goog.labs.userAgent.browser.matchIosWebview_ = function() {
    return (goog.labs.userAgent.util.matchUserAgent("iPad") || goog.labs.userAgent.util.matchUserAgent("iPhone")) && !goog.labs.userAgent.browser.matchSafari_() && !goog.labs.userAgent.browser.matchChrome_() && !goog.labs.userAgent.browser.matchCoast_() && goog.labs.userAgent.util.matchUserAgent("AppleWebKit")
}, goog.labs.userAgent.browser.matchChrome_ = function() {
    return (goog.labs.userAgent.util.matchUserAgent("Chrome") || goog.labs.userAgent.util.matchUserAgent("CriOS")) && !goog.labs.userAgent.browser.matchEdge_()
}, goog.labs.userAgent.browser.matchAndroidBrowser_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Android") && !(goog.labs.userAgent.browser.isChrome() || goog.labs.userAgent.browser.isFirefox() || goog.labs.userAgent.browser.isOpera() || goog.labs.userAgent.browser.isSilk())
}, goog.labs.userAgent.browser.isOpera = goog.labs.userAgent.browser.matchOpera_, goog.labs.userAgent.browser.isIE = goog.labs.userAgent.browser.matchIE_, goog.labs.userAgent.browser.isEdge = goog.labs.userAgent.browser.matchEdge_, goog.labs.userAgent.browser.isFirefox = goog.labs.userAgent.browser.matchFirefox_, goog.labs.userAgent.browser.isSafari = goog.labs.userAgent.browser.matchSafari_, goog.labs.userAgent.browser.isCoast = goog.labs.userAgent.browser.matchCoast_, goog.labs.userAgent.browser.isIosWebview = goog.labs.userAgent.browser.matchIosWebview_, goog.labs.userAgent.browser.isChrome = goog.labs.userAgent.browser.matchChrome_, goog.labs.userAgent.browser.isAndroidBrowser = goog.labs.userAgent.browser.matchAndroidBrowser_, goog.labs.userAgent.browser.isSilk = function() {
    return goog.labs.userAgent.util.matchUserAgent("Silk")
}, goog.labs.userAgent.browser.getVersion = function() {
    function e(e) {
        return e = goog.array.find(e, n), t[e] || ""
    }
    o = goog.labs.userAgent.util.getUserAgent();
    if (goog.labs.userAgent.browser.isIE()) return goog.labs.userAgent.browser.getIEVersion_(o);
    var o = goog.labs.userAgent.util.extractVersionTuples(o),
        t = {};
    goog.array.forEach(o, function(e) {
        t[e[0]] = e[1]
    });
    var n = goog.partial(goog.object.containsKey, t);
    return goog.labs.userAgent.browser.isOpera() ? e(["Version", "Opera"]) : goog.labs.userAgent.browser.isEdge() ? e(["Edge"]) : goog.labs.userAgent.browser.isChrome() ? e(["Chrome", "CriOS"]) : (o = o[2]) && o[1] || ""
}, goog.labs.userAgent.browser.isVersionOrHigher = function(e) {
    return 0 <= goog.string.compareVersions(goog.labs.userAgent.browser.getVersion(), e)
}, goog.labs.userAgent.browser.getIEVersion_ = function(e) {
    if ((o = /rv: *([\d\.]*)/.exec(e)) && o[1]) return o[1];
    var o = "",
        t = /MSIE +([\d\.]+)/.exec(e);
    if (t && t[1])
        if (e = /Trident\/(\d.\d)/.exec(e), "7.0" == t[1])
            if (e && e[1]) switch (e[1]) {
                case "4.0":
                    o = "8.0";
                    break;
                case "5.0":
                    o = "9.0";
                    break;
                case "6.0":
                    o = "10.0";
                    break;
                case "7.0":
                    o = "11.0"
            } else o = "7.0";
            else o = t[1];
    return o
}, goog.labs.userAgent.engine = {}, goog.labs.userAgent.engine.isPresto = function() {
    return goog.labs.userAgent.util.matchUserAgent("Presto")
}, goog.labs.userAgent.engine.isTrident = function() {
    return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE")
}, goog.labs.userAgent.engine.isEdge = function() {
    return goog.labs.userAgent.util.matchUserAgent("Edge")
}, goog.labs.userAgent.engine.isWebKit = function() {
    return goog.labs.userAgent.util.matchUserAgentIgnoreCase("WebKit") && !goog.labs.userAgent.engine.isEdge()
}, goog.labs.userAgent.engine.isGecko = function() {
    return goog.labs.userAgent.util.matchUserAgent("Gecko") && !goog.labs.userAgent.engine.isWebKit() && !goog.labs.userAgent.engine.isTrident() && !goog.labs.userAgent.engine.isEdge()
}, goog.labs.userAgent.engine.getVersion = function() {
    if (e = goog.labs.userAgent.util.getUserAgent()) {
        var e = goog.labs.userAgent.util.extractVersionTuples(e),
            o = goog.labs.userAgent.engine.getEngineTuple_(e);
        if (o) return "Gecko" == o[0] ? goog.labs.userAgent.engine.getVersionForKey_(e, "Firefox") : o[1];
        var t;
        if ((e = e[0]) && (t = e[2]) && (t = /Trident\/([^\s;]+)/.exec(t))) return t[1]
    }
    return ""
}, goog.labs.userAgent.engine.getEngineTuple_ = function(e) {
    if (!goog.labs.userAgent.engine.isEdge()) return e[1];
    for (var o = 0; o < e.length; o++) {
        var t = e[o];
        if ("Edge" == t[0]) return t
    }
}, goog.labs.userAgent.engine.isVersionOrHigher = function(e) {
    return 0 <= goog.string.compareVersions(goog.labs.userAgent.engine.getVersion(), e)
}, goog.labs.userAgent.engine.getVersionForKey_ = function(e, o) {
    var t = goog.array.find(e, function(e) {
        return o == e[0]
    });
    return t && t[1] || ""
}, goog.labs.userAgent.platform = {}, goog.labs.userAgent.platform.isAndroid = function() {
    return goog.labs.userAgent.util.matchUserAgent("Android")
}, goog.labs.userAgent.platform.isIpod = function() {
    return goog.labs.userAgent.util.matchUserAgent("iPod")
}, goog.labs.userAgent.platform.isIphone = function() {
    return goog.labs.userAgent.util.matchUserAgent("iPhone") && !goog.labs.userAgent.util.matchUserAgent("iPod") && !goog.labs.userAgent.util.matchUserAgent("iPad")
}, goog.labs.userAgent.platform.isIpad = function() {
    return goog.labs.userAgent.util.matchUserAgent("iPad")
}, goog.labs.userAgent.platform.isIos = function() {
    return goog.labs.userAgent.platform.isIphone() || goog.labs.userAgent.platform.isIpad() || goog.labs.userAgent.platform.isIpod()
}, goog.labs.userAgent.platform.isMacintosh = function() {
    return goog.labs.userAgent.util.matchUserAgent("Macintosh")
}, goog.labs.userAgent.platform.isLinux = function() {
    return goog.labs.userAgent.util.matchUserAgent("Linux")
}, goog.labs.userAgent.platform.isWindows = function() {
    return goog.labs.userAgent.util.matchUserAgent("Windows")
}, goog.labs.userAgent.platform.isChromeOS = function() {
    return goog.labs.userAgent.util.matchUserAgent("CrOS")
}, goog.labs.userAgent.platform.getVersion = function() {
    var e = goog.labs.userAgent.util.getUserAgent(),
        o = "";
    return goog.labs.userAgent.platform.isWindows() ? (o = /Windows (?:NT|Phone) ([0-9.]+)/, o = (e = o.exec(e)) ? e[1] : "0.0") : goog.labs.userAgent.platform.isIos() ? (o = /(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/, o = (e = o.exec(e)) && e[1].replace(/_/g, ".")) : goog.labs.userAgent.platform.isMacintosh() ? (o = /Mac OS X ([0-9_.]+)/, o = (e = o.exec(e)) ? e[1].replace(/_/g, ".") : "10") : goog.labs.userAgent.platform.isAndroid() ? (o = /Android\s+([^\);]+)(\)|;)/, o = (e = o.exec(e)) && e[1]) : goog.labs.userAgent.platform.isChromeOS() && (o = /(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/, o = (e = o.exec(e)) && e[1]), o || ""
}, goog.labs.userAgent.platform.isVersionOrHigher = function(e) {
    return 0 <= goog.string.compareVersions(goog.labs.userAgent.platform.getVersion(), e)
}, goog.reflect = {}, goog.reflect.object = function(e, o) {
    return o
}, goog.reflect.objectProperty = function(e, o) {
    return e
}, goog.reflect.sinkValue = function(e) {
    return goog.reflect.sinkValue[" "](e), e
}, goog.reflect.sinkValue[" "] = goog.nullFunction, goog.reflect.canAccessProperty = function(e, o) {
    try {
        return goog.reflect.sinkValue(e[o]), !0
    } catch (e) {}
    return !1
}, goog.reflect.cache = function(e, o, t, n) {
    return n = n ? n(o) : o, Object.prototype.hasOwnProperty.call(e, n) ? e[n] : e[n] = t(o)
}, goog.userAgent = {}, goog.userAgent.ASSUME_IE = !1, goog.userAgent.ASSUME_EDGE = !1, goog.userAgent.ASSUME_GECKO = !1, goog.userAgent.ASSUME_WEBKIT = !1, goog.userAgent.ASSUME_MOBILE_WEBKIT = !1, goog.userAgent.ASSUME_OPERA = !1, goog.userAgent.ASSUME_ANY_VERSION = !1, goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_EDGE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA, goog.userAgent.getUserAgentString = function() {
    return goog.labs.userAgent.util.getUserAgent()
}, goog.userAgent.getNavigator = function() {
    return goog.global.navigator || null
}, goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA : goog.labs.userAgent.browser.isOpera(), goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : goog.labs.userAgent.browser.isIE(), goog.userAgent.EDGE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_EDGE : goog.labs.userAgent.engine.isEdge(), goog.userAgent.EDGE_OR_IE = goog.userAgent.EDGE || goog.userAgent.IE, goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO : goog.labs.userAgent.engine.isGecko(), goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : goog.labs.userAgent.engine.isWebKit(), goog.userAgent.isMobile_ = function() {
    return goog.userAgent.WEBKIT && goog.labs.userAgent.util.matchUserAgent("Mobile")
}, goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.isMobile_(), goog.userAgent.SAFARI = goog.userAgent.WEBKIT, goog.userAgent.determinePlatform_ = function() {
    var e = goog.userAgent.getNavigator();
    return e && e.platform || ""
}, goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_(), goog.userAgent.ASSUME_MAC = !1, goog.userAgent.ASSUME_WINDOWS = !1, goog.userAgent.ASSUME_LINUX = !1, goog.userAgent.ASSUME_X11 = !1, goog.userAgent.ASSUME_ANDROID = !1, goog.userAgent.ASSUME_IPHONE = !1, goog.userAgent.ASSUME_IPAD = !1, goog.userAgent.ASSUME_IPOD = !1, goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_X11 || goog.userAgent.ASSUME_ANDROID || goog.userAgent.ASSUME_IPHONE || goog.userAgent.ASSUME_IPAD || goog.userAgent.ASSUME_IPOD, goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : goog.labs.userAgent.platform.isMacintosh(), goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : goog.labs.userAgent.platform.isWindows(), goog.userAgent.isLegacyLinux_ = function() {
    return goog.labs.userAgent.platform.isLinux() || goog.labs.userAgent.platform.isChromeOS()
}, goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.isLegacyLinux_(), goog.userAgent.isX11_ = function() {
    var e = goog.userAgent.getNavigator();
    return !!e && goog.string.contains(e.appVersion || "", "X11")
}, goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_X11 : goog.userAgent.isX11_(), goog.userAgent.ANDROID = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_ANDROID : goog.labs.userAgent.platform.isAndroid(), goog.userAgent.IPHONE = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPHONE : goog.labs.userAgent.platform.isIphone(), goog.userAgent.IPAD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPAD : goog.labs.userAgent.platform.isIpad(), goog.userAgent.IPOD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPOD : goog.labs.userAgent.platform.isIpod(), goog.userAgent.IOS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPHONE || goog.userAgent.ASSUME_IPAD || goog.userAgent.ASSUME_IPOD : goog.labs.userAgent.platform.isIos(), goog.userAgent.determineVersion_ = function() {
    var e = "",
        o = goog.userAgent.getVersionRegexResult_();
    return o && (e = o ? o[1] : ""), goog.userAgent.IE && null != (o = goog.userAgent.getDocumentMode_()) && o > parseFloat(e) ? String(o) : e
}, goog.userAgent.getVersionRegexResult_ = function() {
    var e = goog.userAgent.getUserAgentString();
    return goog.userAgent.GECKO ? /rv\:([^\);]+)(\)|;)/.exec(e) : goog.userAgent.EDGE ? /Edge\/([\d\.]+)/.exec(e) : goog.userAgent.IE ? /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(e) : goog.userAgent.WEBKIT ? /WebKit\/(\S+)/.exec(e) : goog.userAgent.OPERA ? /(?:Version)[ \/]?(\S+)/.exec(e) : void 0
}, goog.userAgent.getDocumentMode_ = function() {
    var e = goog.global.document;
    return e ? e.documentMode : void 0
}, goog.userAgent.VERSION = goog.userAgent.determineVersion_(), goog.userAgent.compare = function(e, o) {
    return goog.string.compareVersions(e, o)
}, goog.userAgent.isVersionOrHigherCache_ = {}, goog.userAgent.isVersionOrHigher = function(e) {
    return goog.userAgent.ASSUME_ANY_VERSION || goog.reflect.cache(goog.userAgent.isVersionOrHigherCache_, e, function() {
        return 0 <= goog.string.compareVersions(goog.userAgent.VERSION, e)
    })
}, goog.userAgent.isVersion = goog.userAgent.isVersionOrHigher, goog.userAgent.isDocumentModeOrHigher = function(e) {
    return Number(goog.userAgent.DOCUMENT_MODE) >= e
}, goog.userAgent.isDocumentMode = goog.userAgent.isDocumentModeOrHigher, goog.userAgent.DOCUMENT_MODE = function() {
    var e = goog.global.document,
        o = goog.userAgent.getDocumentMode_();
    if (e && goog.userAgent.IE) return o || ("CSS1Compat" == e.compatMode ? parseInt(goog.userAgent.VERSION, 10) : 5)
}(), goog.events = {}, goog.events.BrowserFeature = {
    HAS_W3C_BUTTON: !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9),
    HAS_W3C_EVENT_SUPPORT: !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9),
    SET_KEY_CODE_TO_PREVENT_DEFAULT: goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"),
    HAS_NAVIGATOR_ONLINE_PROPERTY: !goog.userAgent.WEBKIT || goog.userAgent.isVersionOrHigher("528"),
    HAS_HTML5_NETWORK_EVENT_SUPPORT: goog.userAgent.GECKO && goog.userAgent.isVersionOrHigher("1.9b") || goog.userAgent.IE && goog.userAgent.isVersionOrHigher("8") || goog.userAgent.OPERA && goog.userAgent.isVersionOrHigher("9.5") || goog.userAgent.WEBKIT && goog.userAgent.isVersionOrHigher("528"),
    HTML5_NETWORK_EVENTS_FIRE_ON_BODY: goog.userAgent.GECKO && !goog.userAgent.isVersionOrHigher("8") || goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"),
    TOUCH_ENABLED: "ontouchstart" in goog.global || !!(goog.global.document && document.documentElement && "ontouchstart" in document.documentElement) || !(!goog.global.navigator || !goog.global.navigator.msMaxTouchPoints)
}, goog.disposable = {}, goog.disposable.IDisposable = function() {}, goog.disposable.IDisposable.prototype.dispose = goog.abstractMethod, goog.disposable.IDisposable.prototype.isDisposed = goog.abstractMethod, goog.Disposable = function() {
    goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF && (goog.Disposable.INCLUDE_STACK_ON_CREATION && (this.creationStack = Error().stack), goog.Disposable.instances_[goog.getUid(this)] = this), this.disposed_ = this.disposed_, this.onDisposeCallbacks_ = this.onDisposeCallbacks_
}, goog.Disposable.MonitoringMode = {
    OFF: 0,
    PERMANENT: 1,
    INTERACTIVE: 2
}, goog.Disposable.MONITORING_MODE = 0, goog.Disposable.INCLUDE_STACK_ON_CREATION = !0, goog.Disposable.instances_ = {}, goog.Disposable.getUndisposedObjects = function() {
    var e, o = [];
    for (e in goog.Disposable.instances_) goog.Disposable.instances_.hasOwnProperty(e) && o.push(goog.Disposable.instances_[Number(e)]);
    return o
}, goog.Disposable.clearUndisposedObjects = function() {
    goog.Disposable.instances_ = {}
}, goog.Disposable.prototype.disposed_ = !1, goog.Disposable.prototype.isDisposed = function() {
    return this.disposed_
}, goog.Disposable.prototype.getDisposed = goog.Disposable.prototype.isDisposed, goog.Disposable.prototype.dispose = function() {
    if (!this.disposed_ && (this.disposed_ = !0, this.disposeInternal(), goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF)) {
        var e = goog.getUid(this);
        if (goog.Disposable.MONITORING_MODE == goog.Disposable.MonitoringMode.PERMANENT && !goog.Disposable.instances_.hasOwnProperty(e)) throw Error(this + " did not call the goog.Disposable base constructor or was disposed of after a clearUndisposedObjects call");
        delete goog.Disposable.instances_[e]
    }
}, goog.Disposable.prototype.registerDisposable = function(e) {
    this.addOnDisposeCallback(goog.partial(goog.dispose, e))
}, goog.Disposable.prototype.addOnDisposeCallback = function(e, o) {
    this.disposed_ ? goog.isDef(o) ? e.call(o) : e() : (this.onDisposeCallbacks_ || (this.onDisposeCallbacks_ = []), this.onDisposeCallbacks_.push(goog.isDef(o) ? goog.bind(e, o) : e))
}, goog.Disposable.prototype.disposeInternal = function() {
    if (this.onDisposeCallbacks_)
        for (; this.onDisposeCallbacks_.length;) this.onDisposeCallbacks_.shift()()
}, goog.Disposable.isDisposed = function(e) {
    return !(!e || "function" != typeof e.isDisposed) && e.isDisposed()
}, goog.dispose = function(e) {
    e && "function" == typeof e.dispose && e.dispose()
}, goog.disposeAll = function(e) {
    for (var o = 0, t = arguments.length; o < t; ++o) {
        var n = arguments[o];
        goog.isArrayLike(n) ? goog.disposeAll.apply(null, n) : goog.dispose(n)
    }
}, goog.events.EventId = function(e) {
    this.id = e
}, goog.events.EventId.prototype.toString = function() {
    return this.id
}, goog.events.Event = function(e, o) {
    this.type = e instanceof goog.events.EventId ? String(e) : e, this.currentTarget = this.target = o, this.defaultPrevented = this.propagationStopped_ = !1, this.returnValue_ = !0
}, goog.events.Event.prototype.stopPropagation = function() {
    this.propagationStopped_ = !0
}, goog.events.Event.prototype.preventDefault = function() {
    this.defaultPrevented = !0, this.returnValue_ = !1
}, goog.events.Event.stopPropagation = function(e) {
    e.stopPropagation()
}, goog.events.Event.preventDefault = function(e) {
    e.preventDefault()
}, goog.events.getVendorPrefixedName_ = function(e) {
    return goog.userAgent.WEBKIT ? "webkit" + e : goog.userAgent.OPERA ? "o" + e.toLowerCase() : e.toLowerCase()
}, goog.events.EventType = {
    CLICK: "click",
    RIGHTCLICK: "rightclick",
    DBLCLICK: "dblclick",
    MOUSEDOWN: "mousedown",
    MOUSEUP: "mouseup",
    MOUSEOVER: "mouseover",
    MOUSEOUT: "mouseout",
    MOUSEMOVE: "mousemove",
    MOUSEENTER: "mouseenter",
    MOUSELEAVE: "mouseleave",
    SELECTIONCHANGE: "selectionchange",
    SELECTSTART: "selectstart",
    WHEEL: "wheel",
    KEYPRESS: "keypress",
    KEYDOWN: "keydown",
    KEYUP: "keyup",
    BLUR: "blur",
    FOCUS: "focus",
    DEACTIVATE: "deactivate",
    FOCUSIN: goog.userAgent.IE ? "focusin" : "DOMFocusIn",
    FOCUSOUT: goog.userAgent.IE ? "focusout" : "DOMFocusOut",
    CHANGE: "change",
    RESET: "reset",
    SELECT: "select",
    SUBMIT: "submit",
    INPUT: "input",
    PROPERTYCHANGE: "propertychange",
    DRAGSTART: "dragstart",
    DRAG: "drag",
    DRAGENTER: "dragenter",
    DRAGOVER: "dragover",
    DRAGLEAVE: "dragleave",
    DROP: "drop",
    DRAGEND: "dragend",
    TOUCHSTART: "touchstart",
    TOUCHMOVE: "touchmove",
    TOUCHEND: "touchend",
    TOUCHCANCEL: "touchcancel",
    BEFOREUNLOAD: "beforeunload",
    CONSOLEMESSAGE: "consolemessage",
    CONTEXTMENU: "contextmenu",
    DEVICEMOTION: "devicemotion",
    DEVICEORIENTATION: "deviceorientation",
    DOMCONTENTLOADED: "DOMContentLoaded",
    ERROR: "error",
    HELP: "help",
    LOAD: "load",
    LOSECAPTURE: "losecapture",
    ORIENTATIONCHANGE: "orientationchange",
    READYSTATECHANGE: "readystatechange",
    RESIZE: "resize",
    SCROLL: "scroll",
    UNLOAD: "unload",
    CANPLAY: "canplay",
    CANPLAYTHROUGH: "canplaythrough",
    DURATIONCHANGE: "durationchange",
    EMPTIED: "emptied",
    ENDED: "ended",
    LOADEDDATA: "loadeddata",
    LOADEDMETADATA: "loadedmetadata",
    PAUSE: "pause",
    PLAY: "play",
    PLAYING: "playing",
    RATECHANGE: "ratechange",
    SEEKED: "seeked",
    SEEKING: "seeking",
    STALLED: "stalled",
    SUSPEND: "suspend",
    TIMEUPDATE: "timeupdate",
    VOLUMECHANGE: "volumechange",
    WAITING: "waiting",
    SOURCEOPEN: "sourceopen",
    SOURCEENDED: "sourceended",
    SOURCECLOSED: "sourceclosed",
    ABORT: "abort",
    UPDATE: "update",
    UPDATESTART: "updatestart",
    UPDATEEND: "updateend",
    HASHCHANGE: "hashchange",
    PAGEHIDE: "pagehide",
    PAGESHOW: "pageshow",
    POPSTATE: "popstate",
    COPY: "copy",
    PASTE: "paste",
    CUT: "cut",
    BEFORECOPY: "beforecopy",
    BEFORECUT: "beforecut",
    BEFOREPASTE: "beforepaste",
    ONLINE: "online",
    OFFLINE: "offline",
    MESSAGE: "message",
    CONNECT: "connect",
    ANIMATIONSTART: goog.events.getVendorPrefixedName_("AnimationStart"),
    ANIMATIONEND: goog.events.getVendorPrefixedName_("AnimationEnd"),
    ANIMATIONITERATION: goog.events.getVendorPrefixedName_("AnimationIteration"),
    TRANSITIONEND: goog.events.getVendorPrefixedName_("TransitionEnd"),
    POINTERDOWN: "pointerdown",
    POINTERUP: "pointerup",
    POINTERCANCEL: "pointercancel",
    POINTERMOVE: "pointermove",
    POINTEROVER: "pointerover",
    POINTEROUT: "pointerout",
    POINTERENTER: "pointerenter",
    POINTERLEAVE: "pointerleave",
    GOTPOINTERCAPTURE: "gotpointercapture",
    LOSTPOINTERCAPTURE: "lostpointercapture",
    MSGESTURECHANGE: "MSGestureChange",
    MSGESTUREEND: "MSGestureEnd",
    MSGESTUREHOLD: "MSGestureHold",
    MSGESTURESTART: "MSGestureStart",
    MSGESTURETAP: "MSGestureTap",
    MSGOTPOINTERCAPTURE: "MSGotPointerCapture",
    MSINERTIASTART: "MSInertiaStart",
    MSLOSTPOINTERCAPTURE: "MSLostPointerCapture",
    MSPOINTERCANCEL: "MSPointerCancel",
    MSPOINTERDOWN: "MSPointerDown",
    MSPOINTERENTER: "MSPointerEnter",
    MSPOINTERHOVER: "MSPointerHover",
    MSPOINTERLEAVE: "MSPointerLeave",
    MSPOINTERMOVE: "MSPointerMove",
    MSPOINTEROUT: "MSPointerOut",
    MSPOINTEROVER: "MSPointerOver",
    MSPOINTERUP: "MSPointerUp",
    TEXT: "text",
    TEXTINPUT: goog.userAgent.IE ? "textinput" : "textInput",
    COMPOSITIONSTART: "compositionstart",
    COMPOSITIONUPDATE: "compositionupdate",
    COMPOSITIONEND: "compositionend",
    BEFOREINPUT: "beforeinput",
    EXIT: "exit",
    LOADABORT: "loadabort",
    LOADCOMMIT: "loadcommit",
    LOADREDIRECT: "loadredirect",
    LOADSTART: "loadstart",
    LOADSTOP: "loadstop",
    RESPONSIVE: "responsive",
    SIZECHANGED: "sizechanged",
    UNRESPONSIVE: "unresponsive",
    VISIBILITYCHANGE: "visibilitychange",
    STORAGE: "storage",
    DOMSUBTREEMODIFIED: "DOMSubtreeModified",
    DOMNODEINSERTED: "DOMNodeInserted",
    DOMNODEREMOVED: "DOMNodeRemoved",
    DOMNODEREMOVEDFROMDOCUMENT: "DOMNodeRemovedFromDocument",
    DOMNODEINSERTEDINTODOCUMENT: "DOMNodeInsertedIntoDocument",
    DOMATTRMODIFIED: "DOMAttrModified",
    DOMCHARACTERDATAMODIFIED: "DOMCharacterDataModified",
    BEFOREPRINT: "beforeprint",
    AFTERPRINT: "afterprint"
}, goog.events.BrowserEvent = function(e, o) {
    goog.events.Event.call(this, e ? e.type : ""), this.relatedTarget = this.currentTarget = this.target = null, this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0, this.key = "", this.charCode = this.keyCode = 0, this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1, this.state = null, this.platformModifierKey = !1, this.event_ = null, e && this.init(e, o)
}, goog.inherits(goog.events.BrowserEvent, goog.events.Event), goog.events.BrowserEvent.MouseButton = {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2
}, goog.events.BrowserEvent.IEButtonMap = [1, 4, 2], goog.events.BrowserEvent.prototype.init = function(e, o) {
    var t = this.type = e.type,
        n = e.changedTouches ? e.changedTouches[0] : null;
    this.target = e.target || e.srcElement, this.currentTarget = o;
    var r = e.relatedTarget;
    r ? goog.userAgent.GECKO && (goog.reflect.canAccessProperty(r, "nodeName") || (r = null)) : t == goog.events.EventType.MOUSEOVER ? r = e.fromElement : t == goog.events.EventType.MOUSEOUT && (r = e.toElement), this.relatedTarget = r, goog.isNull(n) ? (this.offsetX = goog.userAgent.WEBKIT || void 0 !== e.offsetX ? e.offsetX : e.layerX, this.offsetY = goog.userAgent.WEBKIT || void 0 !== e.offsetY ? e.offsetY : e.layerY, this.clientX = void 0 !== e.clientX ? e.clientX : e.pageX, this.clientY = void 0 !== e.clientY ? e.clientY : e.pageY, this.screenX = e.screenX || 0, this.screenY = e.screenY || 0) : (this.clientX = void 0 !== n.clientX ? n.clientX : n.pageX, this.clientY = void 0 !== n.clientY ? n.clientY : n.pageY, this.screenX = n.screenX || 0, this.screenY = n.screenY || 0), this.button = e.button, this.keyCode = e.keyCode || 0, this.key = e.key || "", this.charCode = e.charCode || ("keypress" == t ? e.keyCode : 0), this.ctrlKey = e.ctrlKey, this.altKey = e.altKey, this.shiftKey = e.shiftKey, this.metaKey = e.metaKey, this.platformModifierKey = goog.userAgent.MAC ? e.metaKey : e.ctrlKey, this.state = e.state, this.event_ = e, e.defaultPrevented && this.preventDefault()
}, goog.events.BrowserEvent.prototype.isButton = function(e) {
    return goog.events.BrowserFeature.HAS_W3C_BUTTON ? this.event_.button == e : "click" == this.type ? e == goog.events.BrowserEvent.MouseButton.LEFT : !!(this.event_.button & goog.events.BrowserEvent.IEButtonMap[e])
}, goog.events.BrowserEvent.prototype.isMouseActionButton = function() {
    return this.isButton(goog.events.BrowserEvent.MouseButton.LEFT) && !(goog.userAgent.WEBKIT && goog.userAgent.MAC && this.ctrlKey)
}, goog.events.BrowserEvent.prototype.stopPropagation = function() {
    goog.events.BrowserEvent.superClass_.stopPropagation.call(this), this.event_.stopPropagation ? this.event_.stopPropagation() : this.event_.cancelBubble = !0
}, goog.events.BrowserEvent.prototype.preventDefault = function() {
    goog.events.BrowserEvent.superClass_.preventDefault.call(this);
    var e = this.event_;
    if (e.preventDefault) e.preventDefault();
    else if (e.returnValue = !1, goog.events.BrowserFeature.SET_KEY_CODE_TO_PREVENT_DEFAULT) try {
        (e.ctrlKey || 112 <= e.keyCode && 123 >= e.keyCode) && (e.keyCode = -1)
    } catch (e) {}
}, goog.events.BrowserEvent.prototype.getBrowserEvent = function() {
    return this.event_
}, goog.events.Listenable = function() {}, goog.events.Listenable.IMPLEMENTED_BY_PROP = "closure_listenable_" + (1e6 * Math.random() | 0), goog.events.Listenable.addImplementation = function(e) {
    e.prototype[goog.events.Listenable.IMPLEMENTED_BY_PROP] = !0
}, goog.events.Listenable.isImplementedBy = function(e) {
    return !(!e || !e[goog.events.Listenable.IMPLEMENTED_BY_PROP])
}, goog.events.ListenableKey = function() {}, goog.events.ListenableKey.counter_ = 0, goog.events.ListenableKey.reserveKey = function() {
    return ++goog.events.ListenableKey.counter_
}, goog.events.Listener = function(e, o, t, n, r, i) {
    goog.events.Listener.ENABLE_MONITORING && (this.creationStack = Error().stack), this.listener = e, this.proxy = o, this.src = t, this.type = n, this.capture = !!r, this.handler = i, this.key = goog.events.ListenableKey.reserveKey(), this.removed = this.callOnce = !1
}, goog.events.Listener.ENABLE_MONITORING = !1, goog.events.Listener.prototype.markAsRemoved = function() {
    this.removed = !0, this.handler = this.src = this.proxy = this.listener = null
}, goog.events.ListenerMap = function(e) {
    this.src = e, this.listeners = {}, this.typeCount_ = 0
}, goog.events.ListenerMap.prototype.getTypeCount = function() {
    return this.typeCount_
}, goog.events.ListenerMap.prototype.getListenerCount = function() {
    var e, o = 0;
    for (e in this.listeners) o += this.listeners[e].length;
    return o
}, goog.events.ListenerMap.prototype.add = function(e, o, t, n, r) {
    var i = e.toString();
    (e = this.listeners[i]) || (e = this.listeners[i] = [], this.typeCount_++);
    var s = goog.events.ListenerMap.findListenerIndex_(e, o, n, r);
    return -1 < s ? (o = e[s], t || (o.callOnce = !1)) : (o = new goog.events.Listener(o, null, this.src, i, !!n, r), o.callOnce = t, e.push(o)), o
}, goog.events.ListenerMap.prototype.remove = function(e, o, t, n) {
    if (!((e = e.toString()) in this.listeners)) return !1;
    var r = this.listeners[e];
    return -1 < (o = goog.events.ListenerMap.findListenerIndex_(r, o, t, n)) && (r[o].markAsRemoved(), goog.array.removeAt(r, o), 0 == r.length && (delete this.listeners[e], this.typeCount_--), !0)
}, goog.events.ListenerMap.prototype.removeByKey = function(e) {
    var o = e.type;
    if (!(o in this.listeners)) return !1;
    var t = goog.array.remove(this.listeners[o], e);
    return t && (e.markAsRemoved(), 0 == this.listeners[o].length && (delete this.listeners[o], this.typeCount_--)), t
}, goog.events.ListenerMap.prototype.removeAll = function(e) {
    e = e && e.toString();
    var o, t = 0;
    for (o in this.listeners)
        if (!e || o == e) {
            for (var n = this.listeners[o], r = 0; r < n.length; r++) ++t, n[r].markAsRemoved();
            delete this.listeners[o], this.typeCount_--
        }
    return t
}, goog.events.ListenerMap.prototype.getListeners = function(e, o) {
    var t = this.listeners[e.toString()],
        n = [];
    if (t)
        for (var r = 0; r < t.length; ++r) {
            var i = t[r];
            i.capture == o && n.push(i)
        }
    return n
}, goog.events.ListenerMap.prototype.getListener = function(e, o, t, n) {
    var r = -1;
    return (e = this.listeners[e.toString()]) && (r = goog.events.ListenerMap.findListenerIndex_(e, o, t, n)), -1 < r ? e[r] : null
}, goog.events.ListenerMap.prototype.hasListener = function(e, o) {
    var t = goog.isDef(e),
        n = t ? e.toString() : "",
        r = goog.isDef(o);
    return goog.object.some(this.listeners, function(e, i) {
        for (var s = 0; s < e.length; ++s)
            if (!(t && e[s].type != n || r && e[s].capture != o)) return !0;
        return !1
    })
}, goog.events.ListenerMap.findListenerIndex_ = function(e, o, t, n) {
    for (var r = 0; r < e.length; ++r) {
        var i = e[r];
        if (!i.removed && i.listener == o && i.capture == !!t && i.handler == n) return r
    }
    return -1
}, goog.events.LISTENER_MAP_PROP_ = "closure_lm_" + (1e6 * Math.random() | 0), goog.events.onString_ = "on", goog.events.onStringMap_ = {}, goog.events.CaptureSimulationMode = {
    OFF_AND_FAIL: 0,
    OFF_AND_SILENT: 1,
    ON: 2
}, goog.events.CAPTURE_SIMULATION_MODE = 2, goog.events.listenerCountEstimate_ = 0, goog.events.listen = function(e, o, t, n, r) {
    if (goog.isArray(o)) {
        for (var i = 0; i < o.length; i++) goog.events.listen(e, o[i], t, n, r);
        return null
    }
    return t = goog.events.wrapListener(t), goog.events.Listenable.isImplementedBy(e) ? e.listen(o, t, n, r) : goog.events.listen_(e, o, t, !1, n, r)
}, goog.events.listen_ = function(e, o, t, n, r, i) {
    if (!o) throw Error("Invalid event type");
    var s = !!r;
    if (s && !goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT) {
        if (goog.events.CAPTURE_SIMULATION_MODE == goog.events.CaptureSimulationMode.OFF_AND_FAIL) return goog.asserts.fail("Can not register capture listener in IE8-."), null;
        if (goog.events.CAPTURE_SIMULATION_MODE == goog.events.CaptureSimulationMode.OFF_AND_SILENT) return null
    }
    var l = goog.events.getListenerMap_(e);
    if (l || (e[goog.events.LISTENER_MAP_PROP_] = l = new goog.events.ListenerMap(e)), (t = l.add(o, t, n, r, i)).proxy) return t;
    if (n = goog.events.getProxy(), t.proxy = n, n.src = e, n.listener = t, e.addEventListener) e.addEventListener(o.toString(), n, s);
    else {
        if (!e.attachEvent) throw Error("addEventListener and attachEvent are unavailable.");
        e.attachEvent(goog.events.getOnString_(o.toString()), n)
    }
    return goog.events.listenerCountEstimate_++, t
}, goog.events.getProxy = function() {
    var e = goog.events.handleBrowserEvent_,
        o = goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT ? function(t) {
            return e.call(o.src, o.listener, t)
        } : function(t) {
            if (!(t = e.call(o.src, o.listener, t))) return t
        };
    return o
}, goog.events.listenOnce = function(e, o, t, n, r) {
    if (goog.isArray(o)) {
        for (var i = 0; i < o.length; i++) goog.events.listenOnce(e, o[i], t, n, r);
        return null
    }
    return t = goog.events.wrapListener(t), goog.events.Listenable.isImplementedBy(e) ? e.listenOnce(o, t, n, r) : goog.events.listen_(e, o, t, !0, n, r)
}, goog.events.listenWithWrapper = function(e, o, t, n, r) {
    o.listen(e, t, n, r)
}, goog.events.unlisten = function(e, o, t, n, r) {
    if (goog.isArray(o)) {
        for (var i = 0; i < o.length; i++) goog.events.unlisten(e, o[i], t, n, r);
        return null
    }
    return t = goog.events.wrapListener(t), goog.events.Listenable.isImplementedBy(e) ? e.unlisten(o, t, n, r) : !!e && (n = !!n, !(!(e = goog.events.getListenerMap_(e)) || !(o = e.getListener(o, t, n, r))) && goog.events.unlistenByKey(o))
}, goog.events.unlistenByKey = function(e) {
    if (goog.isNumber(e) || !e || e.removed) return !1;
    var o = e.src;
    if (goog.events.Listenable.isImplementedBy(o)) return o.unlistenByKey(e);
    var t = e.type,
        n = e.proxy;
    return o.removeEventListener ? o.removeEventListener(t, n, e.capture) : o.detachEvent && o.detachEvent(goog.events.getOnString_(t), n), goog.events.listenerCountEstimate_--, (t = goog.events.getListenerMap_(o)) ? (t.removeByKey(e), 0 == t.getTypeCount() && (t.src = null, o[goog.events.LISTENER_MAP_PROP_] = null)) : e.markAsRemoved(), !0
}, goog.events.unlistenWithWrapper = function(e, o, t, n, r) {
    o.unlisten(e, t, n, r)
}, goog.events.removeAll = function(e, o) {
    if (!e) return 0;
    if (goog.events.Listenable.isImplementedBy(e)) return e.removeAllListeners(o);
    var t = goog.events.getListenerMap_(e);
    if (!t) return 0;
    var n, r = 0,
        i = o && o.toString();
    for (n in t.listeners)
        if (!i || n == i)
            for (var s = t.listeners[n].concat(), l = 0; l < s.length; ++l) goog.events.unlistenByKey(s[l]) && ++r;
    return r
}, goog.events.getListeners = function(e, o, t) {
    return goog.events.Listenable.isImplementedBy(e) ? e.getListeners(o, t) : e && (e = goog.events.getListenerMap_(e)) ? e.getListeners(o, t) : []
}, goog.events.getListener = function(e, o, t, n, r) {
    return t = goog.events.wrapListener(t), n = !!n, goog.events.Listenable.isImplementedBy(e) ? e.getListener(o, t, n, r) : e && (e = goog.events.getListenerMap_(e)) ? e.getListener(o, t, n, r) : null
}, goog.events.hasListener = function(e, o, t) {
    return goog.events.Listenable.isImplementedBy(e) ? e.hasListener(o, t) : !!(e = goog.events.getListenerMap_(e)) && e.hasListener(o, t)
}, goog.events.expose = function(e) {
    var o, t = [];
    for (o in e) e[o] && e[o].id ? t.push(o + " = " + e[o] + " (" + e[o].id + ")") : t.push(o + " = " + e[o]);
    return t.join("\n")
}, goog.events.getOnString_ = function(e) {
    return e in goog.events.onStringMap_ ? goog.events.onStringMap_[e] : goog.events.onStringMap_[e] = goog.events.onString_ + e
}, goog.events.fireListeners = function(e, o, t, n) {
    return goog.events.Listenable.isImplementedBy(e) ? e.fireListeners(o, t, n) : goog.events.fireListeners_(e, o, t, n)
}, goog.events.fireListeners_ = function(e, o, t, n) {
    var r = !0;
    if ((e = goog.events.getListenerMap_(e)) && (o = e.listeners[o.toString()]))
        for (o = o.concat(), e = 0; e < o.length; e++) {
            var i = o[e];
            i && i.capture == t && !i.removed && (i = goog.events.fireListener(i, n), r = r && !1 !== i)
        }
    return r
}, goog.events.fireListener = function(e, o) {
    var t = e.listener,
        n = e.handler || e.src;
    return e.callOnce && goog.events.unlistenByKey(e), t.call(n, o)
}, goog.events.getTotalListenerCount = function() {
    return goog.events.listenerCountEstimate_
}, goog.events.dispatchEvent = function(e, o) {
    return goog.asserts.assert(goog.events.Listenable.isImplementedBy(e), "Can not use goog.events.dispatchEvent with non-goog.events.Listenable instance."), e.dispatchEvent(o)
}, goog.events.protectBrowserEventEntryPoint = function(e) {
    goog.events.handleBrowserEvent_ = e.protectEntryPoint(goog.events.handleBrowserEvent_)
}, goog.events.handleBrowserEvent_ = function(e, o) {
    var t;
    if (e.removed) return !0;
    if (!goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT) {
        var n = o || goog.getObjectByName("window.event"),
            r = new goog.events.BrowserEvent(n, this),
            i = !0;
        if (goog.events.CAPTURE_SIMULATION_MODE == goog.events.CaptureSimulationMode.ON) {
            if (!goog.events.isMarkedIeEvent_(n)) {
                for (goog.events.markIeEvent_(n), n = [], t = r.currentTarget; t; t = t.parentNode) n.push(t);
                t = e.type;
                for (var s = n.length - 1; !r.propagationStopped_ && 0 <= s; s--) {
                    r.currentTarget = n[s];
                    var l = goog.events.fireListeners_(n[s], t, !0, r);
                    i = i && l
                }
                for (s = 0; !r.propagationStopped_ && s < n.length; s++) r.currentTarget = n[s], l = goog.events.fireListeners_(n[s], t, !1, r), i = i && l
            }
        } else i = goog.events.fireListener(e, r);
        return i
    }
    return goog.events.fireListener(e, new goog.events.BrowserEvent(o, this))
}, goog.events.markIeEvent_ = function(e) {
    var o = !1;
    if (0 == e.keyCode) try {
        return void(e.keyCode = -1)
    } catch (e) {
        o = !0
    }(o || void 0 == e.returnValue) && (e.returnValue = !0)
}, goog.events.isMarkedIeEvent_ = function(e) {
    return 0 > e.keyCode || void 0 != e.returnValue
}, goog.events.uniqueIdCounter_ = 0, goog.events.getUniqueId = function(e) {
    return e + "_" + goog.events.uniqueIdCounter_++
}, goog.events.getListenerMap_ = function(e) {
    return e = e[goog.events.LISTENER_MAP_PROP_], e instanceof goog.events.ListenerMap ? e : null
}, goog.events.LISTENER_WRAPPER_PROP_ = "__closure_events_fn_" + (1e9 * Math.random() >>> 0), goog.events.wrapListener = function(e) {
    return goog.asserts.assert(e, "Listener can not be null."), goog.isFunction(e) ? e : (goog.asserts.assert(e.handleEvent, "An object listener must have handleEvent method."), e[goog.events.LISTENER_WRAPPER_PROP_] || (e[goog.events.LISTENER_WRAPPER_PROP_] = function(o) {
        return e.handleEvent(o)
    }), e[goog.events.LISTENER_WRAPPER_PROP_])
}, goog.debug.entryPointRegistry.register(function(e) {
    goog.events.handleBrowserEvent_ = e(goog.events.handleBrowserEvent_)
}), goog.math = {}, goog.math.randomInt = function(e) {
    return Math.floor(Math.random() * e)
}, goog.math.uniformRandom = function(e, o) {
    return e + Math.random() * (o - e)
}, goog.math.clamp = function(e, o, t) {
    return Math.min(Math.max(e, o), t)
}, goog.math.modulo = function(e, o) {
    var t = e % o;
    return 0 > t * o ? t + o : t
}, goog.math.lerp = function(e, o, t) {
    return e + t * (o - e)
}, goog.math.nearlyEquals = function(e, o, t) {
    return Math.abs(e - o) <= (t || 1e-6)
}, goog.math.standardAngle = function(e) {
    return goog.math.modulo(e, 360)
}, goog.math.standardAngleInRadians = function(e) {
    return goog.math.modulo(e, 2 * Math.PI)
}, goog.math.toRadians = function(e) {
    return e * Math.PI / 180
}, goog.math.toDegrees = function(e) {
    return 180 * e / Math.PI
}, goog.math.angleDx = function(e, o) {
    return o * Math.cos(goog.math.toRadians(e))
}, goog.math.angleDy = function(e, o) {
    return o * Math.sin(goog.math.toRadians(e))
}, goog.math.angle = function(e, o, t, n) {
    return goog.math.standardAngle(goog.math.toDegrees(Math.atan2(n - o, t - e)))
}, goog.math.angleDifference = function(e, o) {
    var t = goog.math.standardAngle(o) - goog.math.standardAngle(e);
    return 180 < t ? t -= 360 : -180 >= t && (t = 360 + t), t
}, goog.math.sign = function(e) {
    return 0 < e ? 1 : 0 > e ? -1 : e
}, goog.math.longestCommonSubsequence = function(e, o, t, n) {
    t = t || function(e, o) {
        return e == o
    }, n = n || function(o, t) {
        return e[o]
    };
    for (var r = e.length, i = o.length, s = [], l = 0; l < r + 1; l++) s[l] = [], s[l][0] = 0;
    for (a = 0; a < i + 1; a++) s[0][a] = 0;
    for (l = 1; l <= r; l++)
        for (a = 1; a <= i; a++) t(e[l - 1], o[a - 1]) ? s[l][a] = s[l - 1][a - 1] + 1 : s[l][a] = Math.max(s[l - 1][a], s[l][a - 1]);
    for (var g = [], l = r, a = i; 0 < l && 0 < a;) t(e[l - 1], o[a - 1]) ? (g.unshift(n(l - 1, a - 1)), l--, a--) : s[l - 1][a] > s[l][a - 1] ? l-- : a--;
    return g
}, goog.math.sum = function(e) {
    return goog.array.reduce(arguments, function(e, o) {
        return e + o
    }, 0)
}, goog.math.average = function(e) {
    return goog.math.sum.apply(null, arguments) / arguments.length
}, goog.math.sampleVariance = function(e) {
    var o = arguments.length;
    if (2 > o) return 0;
    var t = goog.math.average.apply(null, arguments);
    return goog.math.sum.apply(null, goog.array.map(arguments, function(e) {
        return Math.pow(e - t, 2)
    })) / (o - 1)
}, goog.math.standardDeviation = function(e) {
    return Math.sqrt(goog.math.sampleVariance.apply(null, arguments))
}, goog.math.isInt = function(e) {
    return isFinite(e) && 0 == e % 1
}, goog.math.isFiniteNumber = function(e) {
    return isFinite(e)
}, goog.math.isNegativeZero = function(e) {
    return 0 == e && 0 > 1 / e
}, goog.math.log10Floor = function(e) {
    if (0 < e) {
        var o = Math.round(Math.log(e) * Math.LOG10E);
        return o - (parseFloat("1e" + o) > e ? 1 : 0)
    }
    return 0 == e ? -1 / 0 : NaN
}, goog.math.safeFloor = function(e, o) {
    return goog.asserts.assert(!goog.isDef(o) || 0 < o), Math.floor(e + (o || 2e-15))
}, goog.math.safeCeil = function(e, o) {
    return goog.asserts.assert(!goog.isDef(o) || 0 < o), Math.ceil(e - (o || 2e-15))
}, goog.dom.BrowserFeature = {
    CAN_ADD_NAME_OR_TYPE_ATTRIBUTES: !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9),
    CAN_USE_CHILDREN_ATTRIBUTE: !goog.userAgent.GECKO && !goog.userAgent.IE || goog.userAgent.IE && goog.userAgent.isDocumentModeOrHigher(9) || goog.userAgent.GECKO && goog.userAgent.isVersionOrHigher("1.9.1"),
    CAN_USE_INNER_TEXT: goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"),
    CAN_USE_PARENT_ELEMENT_PROPERTY: goog.userAgent.IE || goog.userAgent.OPERA || goog.userAgent.WEBKIT,
    INNER_HTML_NEEDS_SCOPED_ELEMENT: goog.userAgent.IE,
    LEGACY_IE_RANGES: goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)
}, goog.dom.TagName = function(e) {
    this.tagName_ = e
}, goog.dom.TagName.prototype.toString = function() {
    return this.tagName_
}, goog.dom.TagName.A = new goog.dom.TagName("A"), goog.dom.TagName.ABBR = new goog.dom.TagName("ABBR"), goog.dom.TagName.ACRONYM = new goog.dom.TagName("ACRONYM"), goog.dom.TagName.ADDRESS = new goog.dom.TagName("ADDRESS"), goog.dom.TagName.APPLET = new goog.dom.TagName("APPLET"), goog.dom.TagName.AREA = new goog.dom.TagName("AREA"), goog.dom.TagName.ARTICLE = new goog.dom.TagName("ARTICLE"), goog.dom.TagName.ASIDE = new goog.dom.TagName("ASIDE"), goog.dom.TagName.AUDIO = new goog.dom.TagName("AUDIO"), goog.dom.TagName.B = new goog.dom.TagName("B"), goog.dom.TagName.BASE = new goog.dom.TagName("BASE"), goog.dom.TagName.BASEFONT = new goog.dom.TagName("BASEFONT"), goog.dom.TagName.BDI = new goog.dom.TagName("BDI"), goog.dom.TagName.BDO = new goog.dom.TagName("BDO"), goog.dom.TagName.BIG = new goog.dom.TagName("BIG"), goog.dom.TagName.BLOCKQUOTE = new goog.dom.TagName("BLOCKQUOTE"), goog.dom.TagName.BODY = new goog.dom.TagName("BODY"), goog.dom.TagName.BR = new goog.dom.TagName("BR"), goog.dom.TagName.BUTTON = new goog.dom.TagName("BUTTON"), goog.dom.TagName.CANVAS = new goog.dom.TagName("CANVAS"), goog.dom.TagName.CAPTION = new goog.dom.TagName("CAPTION"), goog.dom.TagName.CENTER = new goog.dom.TagName("CENTER"), goog.dom.TagName.CITE = new goog.dom.TagName("CITE"), goog.dom.TagName.CODE = new goog.dom.TagName("CODE"), goog.dom.TagName.COL = new goog.dom.TagName("COL"), goog.dom.TagName.COLGROUP = new goog.dom.TagName("COLGROUP"), goog.dom.TagName.COMMAND = new goog.dom.TagName("COMMAND"), goog.dom.TagName.DATA = new goog.dom.TagName("DATA"), goog.dom.TagName.DATALIST = new goog.dom.TagName("DATALIST"), goog.dom.TagName.DD = new goog.dom.TagName("DD"), goog.dom.TagName.DEL = new goog.dom.TagName("DEL"), goog.dom.TagName.DETAILS = new goog.dom.TagName("DETAILS"), goog.dom.TagName.DFN = new goog.dom.TagName("DFN"), goog.dom.TagName.DIALOG = new goog.dom.TagName("DIALOG"), goog.dom.TagName.DIR = new goog.dom.TagName("DIR"), goog.dom.TagName.DIV = new goog.dom.TagName("DIV"), goog.dom.TagName.DL = new goog.dom.TagName("DL"), goog.dom.TagName.DT = new goog.dom.TagName("DT"), goog.dom.TagName.EM = new goog.dom.TagName("EM"), goog.dom.TagName.EMBED = new goog.dom.TagName("EMBED"), goog.dom.TagName.FIELDSET = new goog.dom.TagName("FIELDSET"), goog.dom.TagName.FIGCAPTION = new goog.dom.TagName("FIGCAPTION"), goog.dom.TagName.FIGURE = new goog.dom.TagName("FIGURE"), goog.dom.TagName.FONT = new goog.dom.TagName("FONT"), goog.dom.TagName.FOOTER = new goog.dom.TagName("FOOTER"), goog.dom.TagName.FORM = new goog.dom.TagName("FORM"), goog.dom.TagName.FRAME = new goog.dom.TagName("FRAME"), goog.dom.TagName.FRAMESET = new goog.dom.TagName("FRAMESET"), goog.dom.TagName.H1 = new goog.dom.TagName("H1"), goog.dom.TagName.H2 = new goog.dom.TagName("H2"), goog.dom.TagName.H3 = new goog.dom.TagName("H3"), goog.dom.TagName.H4 = new goog.dom.TagName("H4"), goog.dom.TagName.H5 = new goog.dom.TagName("H5"), goog.dom.TagName.H6 = new goog.dom.TagName("H6"), goog.dom.TagName.HEAD = new goog.dom.TagName("HEAD"), goog.dom.TagName.HEADER = new goog.dom.TagName("HEADER"), goog.dom.TagName.HGROUP = new goog.dom.TagName("HGROUP"), goog.dom.TagName.HR = new goog.dom.TagName("HR"), goog.dom.TagName.HTML = new goog.dom.TagName("HTML"), goog.dom.TagName.I = new goog.dom.TagName("I"), goog.dom.TagName.IFRAME = new goog.dom.TagName("IFRAME"), goog.dom.TagName.IMG = new goog.dom.TagName("IMG"), goog.dom.TagName.INPUT = new goog.dom.TagName("INPUT"), goog.dom.TagName.INS = new goog.dom.TagName("INS"), goog.dom.TagName.ISINDEX = new goog.dom.TagName("ISINDEX"), goog.dom.TagName.KBD = new goog.dom.TagName("KBD"), goog.dom.TagName.KEYGEN = new goog.dom.TagName("KEYGEN"), goog.dom.TagName.LABEL = new goog.dom.TagName("LABEL"), goog.dom.TagName.LEGEND = new goog.dom.TagName("LEGEND"), goog.dom.TagName.LI = new goog.dom.TagName("LI"), goog.dom.TagName.LINK = new goog.dom.TagName("LINK"), goog.dom.TagName.MAP = new goog.dom.TagName("MAP"), goog.dom.TagName.MARK = new goog.dom.TagName("MARK"), goog.dom.TagName.MATH = new goog.dom.TagName("MATH"), goog.dom.TagName.MENU = new goog.dom.TagName("MENU"), goog.dom.TagName.META = new goog.dom.TagName("META"), goog.dom.TagName.METER = new goog.dom.TagName("METER"), goog.dom.TagName.NAV = new goog.dom.TagName("NAV"), goog.dom.TagName.NOFRAMES = new goog.dom.TagName("NOFRAMES"), goog.dom.TagName.NOSCRIPT = new goog.dom.TagName("NOSCRIPT"), goog.dom.TagName.OBJECT = new goog.dom.TagName("OBJECT"), goog.dom.TagName.OL = new goog.dom.TagName("OL"), goog.dom.TagName.OPTGROUP = new goog.dom.TagName("OPTGROUP"), goog.dom.TagName.OPTION = new goog.dom.TagName("OPTION"), goog.dom.TagName.OUTPUT = new goog.dom.TagName("OUTPUT"), goog.dom.TagName.P = new goog.dom.TagName("P"), goog.dom.TagName.PARAM = new goog.dom.TagName("PARAM"), goog.dom.TagName.PRE = new goog.dom.TagName("PRE"), goog.dom.TagName.PROGRESS = new goog.dom.TagName("PROGRESS"), goog.dom.TagName.Q = new goog.dom.TagName("Q"), goog.dom.TagName.RP = new goog.dom.TagName("RP"), goog.dom.TagName.RT = new goog.dom.TagName("RT"), goog.dom.TagName.RUBY = new goog.dom.TagName("RUBY"), goog.dom.TagName.S = new goog.dom.TagName("S"), goog.dom.TagName.SAMP = new goog.dom.TagName("SAMP"), goog.dom.TagName.SCRIPT = new goog.dom.TagName("SCRIPT"), goog.dom.TagName.SECTION = new goog.dom.TagName("SECTION"), goog.dom.TagName.SELECT = new goog.dom.TagName("SELECT"), goog.dom.TagName.SMALL = new goog.dom.TagName("SMALL"), goog.dom.TagName.SOURCE = new goog.dom.TagName("SOURCE"), goog.dom.TagName.SPAN = new goog.dom.TagName("SPAN"), goog.dom.TagName.STRIKE = new goog.dom.TagName("STRIKE"), goog.dom.TagName.STRONG = new goog.dom.TagName("STRONG"), goog.dom.TagName.STYLE = new goog.dom.TagName("STYLE"), goog.dom.TagName.SUB = new goog.dom.TagName("SUB"), goog.dom.TagName.SUMMARY = new goog.dom.TagName("SUMMARY"), goog.dom.TagName.SUP = new goog.dom.TagName("SUP"), goog.dom.TagName.SVG = new goog.dom.TagName("SVG"), goog.dom.TagName.TABLE = new goog.dom.TagName("TABLE"), goog.dom.TagName.TBODY = new goog.dom.TagName("TBODY"), goog.dom.TagName.TD = new goog.dom.TagName("TD"), goog.dom.TagName.TEMPLATE = new goog.dom.TagName("TEMPLATE"), goog.dom.TagName.TEXTAREA = new goog.dom.TagName("TEXTAREA"), goog.dom.TagName.TFOOT = new goog.dom.TagName("TFOOT"), goog.dom.TagName.TH = new goog.dom.TagName("TH"), goog.dom.TagName.THEAD = new goog.dom.TagName("THEAD"), goog.dom.TagName.TIME = new goog.dom.TagName("TIME"), goog.dom.TagName.TITLE = new goog.dom.TagName("TITLE"), goog.dom.TagName.TR = new goog.dom.TagName("TR"), goog.dom.TagName.TRACK = new goog.dom.TagName("TRACK"), goog.dom.TagName.TT = new goog.dom.TagName("TT"), goog.dom.TagName.U = new goog.dom.TagName("U"), goog.dom.TagName.UL = new goog.dom.TagName("UL"), goog.dom.TagName.VAR = new goog.dom.TagName("VAR"), goog.dom.TagName.VIDEO = new goog.dom.TagName("VIDEO"), goog.dom.TagName.WBR = new goog.dom.TagName("WBR"), goog.dom.tags = {}, goog.dom.tags.VOID_TAGS_ = {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    command: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
}, goog.dom.tags.isVoidTag = function(e) {
    return !0 === goog.dom.tags.VOID_TAGS_[e]
}, goog.string.TypedString = function() {}, goog.string.Const = function() {
    this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ = "", this.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ = goog.string.Const.TYPE_MARKER_
}, goog.string.Const.prototype.implementsGoogStringTypedString = !0, goog.string.Const.prototype.getTypedStringValue = function() {
    return this.stringConstValueWithSecurityContract__googStringSecurityPrivate_
}, goog.string.Const.prototype.toString = function() {
    return "Const{" + this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ + "}"
}, goog.string.Const.unwrap = function(e) {
    return e instanceof goog.string.Const && e.constructor === goog.string.Const && e.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ === goog.string.Const.TYPE_MARKER_ ? e.stringConstValueWithSecurityContract__googStringSecurityPrivate_ : (goog.asserts.fail("expected object of type Const, got '" + e + "'"), "type_error:Const")
}, goog.string.Const.from = function(e) {
    return goog.string.Const.create__googStringSecurityPrivate_(e)
}, goog.string.Const.TYPE_MARKER_ = {}, goog.string.Const.create__googStringSecurityPrivate_ = function(e) {
    var o = new goog.string.Const;
    return o.stringConstValueWithSecurityContract__googStringSecurityPrivate_ = e, o
}, goog.string.Const.EMPTY = goog.string.Const.from(""), goog.html = {}, goog.html.SafeScript = function() {
    this.privateDoNotAccessOrElseSafeScriptWrappedValue_ = "", this.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
}, goog.html.SafeScript.prototype.implementsGoogStringTypedString = !0, goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {}, goog.html.SafeScript.fromConstant = function(e) {
    return e = goog.string.Const.unwrap(e), 0 === e.length ? goog.html.SafeScript.EMPTY : goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(e)
}, goog.html.SafeScript.prototype.getTypedStringValue = function() {
    return this.privateDoNotAccessOrElseSafeScriptWrappedValue_
}, goog.DEBUG && (goog.html.SafeScript.prototype.toString = function() {
    return "SafeScript{" + this.privateDoNotAccessOrElseSafeScriptWrappedValue_ + "}"
}), goog.html.SafeScript.unwrap = function(e) {
    return e instanceof goog.html.SafeScript && e.constructor === goog.html.SafeScript && e.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ ? e.privateDoNotAccessOrElseSafeScriptWrappedValue_ : (goog.asserts.fail("expected object of type SafeScript, got '" + e + "' of type " + goog.typeOf(e)), "type_error:SafeScript")
}, goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse = function(e) {
    return (new goog.html.SafeScript).initSecurityPrivateDoNotAccessOrElse_(e)
}, goog.html.SafeScript.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(e) {
    return this.privateDoNotAccessOrElseSafeScriptWrappedValue_ = e, this
}, goog.html.SafeScript.EMPTY = goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(""), goog.html.SafeStyle = function() {
    this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = "", this.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
}, goog.html.SafeStyle.prototype.implementsGoogStringTypedString = !0, goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {}, goog.html.SafeStyle.fromConstant = function(e) {
    return 0 === (e = goog.string.Const.unwrap(e)).length ? goog.html.SafeStyle.EMPTY : (goog.html.SafeStyle.checkStyle_(e), goog.asserts.assert(goog.string.endsWith(e, ";"), "Last character of style string is not ';': " + e), goog.asserts.assert(goog.string.contains(e, ":"), "Style string must contain at least one ':', to specify a \"name: value\" pair: " + e), goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(e))
}, goog.html.SafeStyle.checkStyle_ = function(e) {
    goog.asserts.assert(!/[<>]/.test(e), "Forbidden characters in style string: " + e)
}, goog.html.SafeStyle.prototype.getTypedStringValue = function() {
    return this.privateDoNotAccessOrElseSafeStyleWrappedValue_
}, goog.DEBUG && (goog.html.SafeStyle.prototype.toString = function() {
    return "SafeStyle{" + this.privateDoNotAccessOrElseSafeStyleWrappedValue_ + "}"
}), goog.html.SafeStyle.unwrap = function(e) {
    return e instanceof goog.html.SafeStyle && e.constructor === goog.html.SafeStyle && e.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ ? e.privateDoNotAccessOrElseSafeStyleWrappedValue_ : (goog.asserts.fail("expected object of type SafeStyle, got '" + e + "' of type " + goog.typeOf(e)), "type_error:SafeStyle")
}, goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse = function(e) {
    return (new goog.html.SafeStyle).initSecurityPrivateDoNotAccessOrElse_(e)
}, goog.html.SafeStyle.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(e) {
    return this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = e, this
}, goog.html.SafeStyle.EMPTY = goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(""), goog.html.SafeStyle.INNOCUOUS_STRING = "zClosurez", goog.html.SafeStyle.create = function(e) {
    var o, t = "";
    for (o in e) {
        if (!/^[-_a-zA-Z0-9]+$/.test(o)) throw Error("Name allows only [-_a-zA-Z0-9], got: " + o);
        var n = e[o];
        null != n && (n instanceof goog.string.Const ? (n = goog.string.Const.unwrap(n), goog.asserts.assert(!/[{;}]/.test(n), "Value does not allow [{;}].")) : goog.html.SafeStyle.VALUE_RE_.test(n) ? goog.html.SafeStyle.hasBalancedQuotes_(n) || (goog.asserts.fail("String value requires balanced quotes, got: " + n), n = goog.html.SafeStyle.INNOCUOUS_STRING) : (goog.asserts.fail("String value allows only [-,.\"'%_!# a-zA-Z0-9], rgb() and rgba(), got: " + n), n = goog.html.SafeStyle.INNOCUOUS_STRING), t += o + ":" + n + ";")
    }
    return t ? (goog.html.SafeStyle.checkStyle_(t), goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(t)) : goog.html.SafeStyle.EMPTY
}, goog.html.SafeStyle.hasBalancedQuotes_ = function(e) {
    for (var o = !0, t = !0, n = 0; n < e.length; n++) {
        var r = e.charAt(n);
        "'" == r && t ? o = !o : '"' == r && o && (t = !t)
    }
    return o && t
}, goog.html.SafeStyle.VALUE_RE_ = /^([-,."'%_!# a-zA-Z0-9]+|(?:rgb|hsl)a?\([0-9.%, ]+\))$/, goog.html.SafeStyle.concat = function(e) {
    var o = "",
        t = function(e) {
            goog.isArray(e) ? goog.array.forEach(e, t) : o += goog.html.SafeStyle.unwrap(e)
        };
    return goog.array.forEach(arguments, t), o ? goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(o) : goog.html.SafeStyle.EMPTY
}, goog.html.SafeStyleSheet = function() {
    this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ = "", this.SAFE_STYLE_SHEET_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
}, goog.html.SafeStyleSheet.prototype.implementsGoogStringTypedString = !0, goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {}, goog.html.SafeStyleSheet.concat = function(e) {
    var o = "",
        t = function(e) {
            goog.isArray(e) ? goog.array.forEach(e, t) : o += goog.html.SafeStyleSheet.unwrap(e)
        };
    return goog.array.forEach(arguments, t), goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(o)
}, goog.html.SafeStyleSheet.fromConstant = function(e) {
    return 0 === (e = goog.string.Const.unwrap(e)).length ? goog.html.SafeStyleSheet.EMPTY : (goog.asserts.assert(!goog.string.contains(e, "<"), "Forbidden '<' character in style sheet string: " + e), goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(e))
}, goog.html.SafeStyleSheet.prototype.getTypedStringValue = function() {
    return this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_
}, goog.DEBUG && (goog.html.SafeStyleSheet.prototype.toString = function() {
    return "SafeStyleSheet{" + this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ + "}"
}), goog.html.SafeStyleSheet.unwrap = function(e) {
    return e instanceof goog.html.SafeStyleSheet && e.constructor === goog.html.SafeStyleSheet && e.SAFE_STYLE_SHEET_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ ? e.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ : (goog.asserts.fail("expected object of type SafeStyleSheet, got '" + e + "' of type " + goog.typeOf(e)), "type_error:SafeStyleSheet")
}, goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse = function(e) {
    return (new goog.html.SafeStyleSheet).initSecurityPrivateDoNotAccessOrElse_(e)
}, goog.html.SafeStyleSheet.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(e) {
    return this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ = e, this
}, goog.html.SafeStyleSheet.EMPTY = goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(""), goog.fs = {}, goog.fs.url = {}, goog.fs.url.createObjectUrl = function(e) {
    return goog.fs.url.getUrlObject_().createObjectURL(e)
}, goog.fs.url.revokeObjectUrl = function(e) {
    goog.fs.url.getUrlObject_().revokeObjectURL(e)
}, goog.fs.url.getUrlObject_ = function() {
    var e = goog.fs.url.findUrlObject_();
    if (null != e) return e;
    throw Error("This browser doesn't seem to support blob URLs")
}, goog.fs.url.findUrlObject_ = function() {
    return goog.isDef(goog.global.URL) && goog.isDef(goog.global.URL.createObjectURL) ? goog.global.URL : goog.isDef(goog.global.webkitURL) && goog.isDef(goog.global.webkitURL.createObjectURL) ? goog.global.webkitURL : goog.isDef(goog.global.createObjectURL) ? goog.global : null
}, goog.fs.url.browserSupportsObjectUrls = function() {
    return null != goog.fs.url.findUrlObject_()
}, goog.i18n = {}, goog.i18n.bidi = {}, goog.i18n.bidi.FORCE_RTL = !1, goog.i18n.bidi.IS_RTL = goog.i18n.bidi.FORCE_RTL || ("ar" == goog.LOCALE.substring(0, 2).toLowerCase() || "fa" == goog.LOCALE.substring(0, 2).toLowerCase() || "he" == goog.LOCALE.substring(0, 2).toLowerCase() || "iw" == goog.LOCALE.substring(0, 2).toLowerCase() || "ps" == goog.LOCALE.substring(0, 2).toLowerCase() || "sd" == goog.LOCALE.substring(0, 2).toLowerCase() || "ug" == goog.LOCALE.substring(0, 2).toLowerCase() || "ur" == goog.LOCALE.substring(0, 2).toLowerCase() || "yi" == goog.LOCALE.substring(0, 2).toLowerCase()) && (2 == goog.LOCALE.length || "-" == goog.LOCALE.substring(2, 3) || "_" == goog.LOCALE.substring(2, 3)) || 3 <= goog.LOCALE.length && "ckb" == goog.LOCALE.substring(0, 3).toLowerCase() && (3 == goog.LOCALE.length || "-" == goog.LOCALE.substring(3, 4) || "_" == goog.LOCALE.substring(3, 4)), goog.i18n.bidi.Format = {
    LRE: "‪",
    RLE: "‫",
    PDF: "‬",
    LRM: "‎",
    RLM: "‏"
}, goog.i18n.bidi.Dir = {
    LTR: 1,
    RTL: -1,
    NEUTRAL: 0
}, goog.i18n.bidi.RIGHT = "right", goog.i18n.bidi.LEFT = "left", goog.i18n.bidi.I18N_RIGHT = goog.i18n.bidi.IS_RTL ? goog.i18n.bidi.LEFT : goog.i18n.bidi.RIGHT, goog.i18n.bidi.I18N_LEFT = goog.i18n.bidi.IS_RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT, goog.i18n.bidi.toDir = function(e, o) {
    return "number" == typeof e ? 0 < e ? goog.i18n.bidi.Dir.LTR : 0 > e ? goog.i18n.bidi.Dir.RTL : o ? null : goog.i18n.bidi.Dir.NEUTRAL : null == e ? null : e ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR
}, goog.i18n.bidi.ltrChars_ = "A-Za-zÀ-ÖØ-öø-ʸ̀-֐ࠀ-῿‎Ⰰ-﬜︀-﹯﻽-￿", goog.i18n.bidi.rtlChars_ = "֑-ۯۺ-߿‏יִ-﷿ﹰ-ﻼ", goog.i18n.bidi.htmlSkipReg_ = /<[^>]*>|&[^;]+;/g, goog.i18n.bidi.stripHtmlIfNeeded_ = function(e, o) {
    return o ? e.replace(goog.i18n.bidi.htmlSkipReg_, "") : e
}, goog.i18n.bidi.rtlCharReg_ = new RegExp("[" + goog.i18n.bidi.rtlChars_ + "]"), goog.i18n.bidi.ltrCharReg_ = new RegExp("[" + goog.i18n.bidi.ltrChars_ + "]"), goog.i18n.bidi.hasAnyRtl = function(e, o) {
    return goog.i18n.bidi.rtlCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(e, o))
}, goog.i18n.bidi.hasRtlChar = goog.i18n.bidi.hasAnyRtl, goog.i18n.bidi.hasAnyLtr = function(e, o) {
    return goog.i18n.bidi.ltrCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(e, o))
}, goog.i18n.bidi.ltrRe_ = new RegExp("^[" + goog.i18n.bidi.ltrChars_ + "]"), goog.i18n.bidi.rtlRe_ = new RegExp("^[" + goog.i18n.bidi.rtlChars_ + "]"), goog.i18n.bidi.isRtlChar = function(e) {
    return goog.i18n.bidi.rtlRe_.test(e)
}, goog.i18n.bidi.isLtrChar = function(e) {
    return goog.i18n.bidi.ltrRe_.test(e)
}, goog.i18n.bidi.isNeutralChar = function(e) {
    return !goog.i18n.bidi.isLtrChar(e) && !goog.i18n.bidi.isRtlChar(e)
}, goog.i18n.bidi.ltrDirCheckRe_ = new RegExp("^[^" + goog.i18n.bidi.rtlChars_ + "]*[" + goog.i18n.bidi.ltrChars_ + "]"), goog.i18n.bidi.rtlDirCheckRe_ = new RegExp("^[^" + goog.i18n.bidi.ltrChars_ + "]*[" + goog.i18n.bidi.rtlChars_ + "]"), goog.i18n.bidi.startsWithRtl = function(e, o) {
    return goog.i18n.bidi.rtlDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(e, o))
}, goog.i18n.bidi.isRtlText = goog.i18n.bidi.startsWithRtl, goog.i18n.bidi.startsWithLtr = function(e, o) {
    return goog.i18n.bidi.ltrDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(e, o))
}, goog.i18n.bidi.isLtrText = goog.i18n.bidi.startsWithLtr, goog.i18n.bidi.isRequiredLtrRe_ = /^http:\/\/.*/, goog.i18n.bidi.isNeutralText = function(e, o) {
    return e = goog.i18n.bidi.stripHtmlIfNeeded_(e, o), goog.i18n.bidi.isRequiredLtrRe_.test(e) || !goog.i18n.bidi.hasAnyLtr(e) && !goog.i18n.bidi.hasAnyRtl(e)
}, goog.i18n.bidi.ltrExitDirCheckRe_ = new RegExp("[" + goog.i18n.bidi.ltrChars_ + "][^" + goog.i18n.bidi.rtlChars_ + "]*$"), goog.i18n.bidi.rtlExitDirCheckRe_ = new RegExp("[" + goog.i18n.bidi.rtlChars_ + "][^" + goog.i18n.bidi.ltrChars_ + "]*$"), goog.i18n.bidi.endsWithLtr = function(e, o) {
    return goog.i18n.bidi.ltrExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(e, o))
}, goog.i18n.bidi.isLtrExitText = goog.i18n.bidi.endsWithLtr, goog.i18n.bidi.endsWithRtl = function(e, o) {
    return goog.i18n.bidi.rtlExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(e, o))
}, goog.i18n.bidi.isRtlExitText = goog.i18n.bidi.endsWithRtl, goog.i18n.bidi.rtlLocalesRe_ = /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Arab|Hebr|Thaa|Nkoo|Tfng))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i, goog.i18n.bidi.isRtlLanguage = function(e) {
    return goog.i18n.bidi.rtlLocalesRe_.test(e)
}, goog.i18n.bidi.bracketGuardTextRe_ = /(\(.*?\)+)|(\[.*?\]+)|(\{.*?\}+)|(<.*?>+)/g, goog.i18n.bidi.guardBracketInText = function(e, o) {
    var t = (void 0 === o ? goog.i18n.bidi.hasAnyRtl(e) : o) ? goog.i18n.bidi.Format.RLM : goog.i18n.bidi.Format.LRM;
    return e.replace(goog.i18n.bidi.bracketGuardTextRe_, t + "$&" + t)
}, goog.i18n.bidi.enforceRtlInHtml = function(e) {
    return "<" == e.charAt(0) ? e.replace(/<\w+/, "$& dir=rtl") : "\n<span dir=rtl>" + e + "</span>"
}, goog.i18n.bidi.enforceRtlInText = function(e) {
    return goog.i18n.bidi.Format.RLE + e + goog.i18n.bidi.Format.PDF
}, goog.i18n.bidi.enforceLtrInHtml = function(e) {
    return "<" == e.charAt(0) ? e.replace(/<\w+/, "$& dir=ltr") : "\n<span dir=ltr>" + e + "</span>"
}, goog.i18n.bidi.enforceLtrInText = function(e) {
    return goog.i18n.bidi.Format.LRE + e + goog.i18n.bidi.Format.PDF
};
goog.i18n.bidi.dimensionsRe_ = /:\s*([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)/g, goog.i18n.bidi.leftRe_ = /left/gi, goog.i18n.bidi.rightRe_ = /right/gi, goog.i18n.bidi.tempRe_ = /%%%%/g, goog.i18n.bidi.mirrorCSS = function(e) {
    return e.replace(goog.i18n.bidi.dimensionsRe_, ":$1 $4 $3 $2").replace(goog.i18n.bidi.leftRe_, "%%%%").replace(goog.i18n.bidi.rightRe_, goog.i18n.bidi.LEFT).replace(goog.i18n.bidi.tempRe_, goog.i18n.bidi.RIGHT)
}, goog.i18n.bidi.doubleQuoteSubstituteRe_ = /([\u0591-\u05f2])"/g, goog.i18n.bidi.singleQuoteSubstituteRe_ = /([\u0591-\u05f2])'/g, goog.i18n.bidi.normalizeHebrewQuote = function(e) {
    return e.replace(goog.i18n.bidi.doubleQuoteSubstituteRe_, "$1״").replace(goog.i18n.bidi.singleQuoteSubstituteRe_, "$1׳")
}, goog.i18n.bidi.wordSeparatorRe_ = /\s+/, goog.i18n.bidi.hasNumeralsRe_ = /[\d\u06f0-\u06f9]/, goog.i18n.bidi.rtlDetectionThreshold_ = .4, goog.i18n.bidi.estimateDirection = function(e, o) {
    for (var t = 0, n = 0, r = !1, i = goog.i18n.bidi.stripHtmlIfNeeded_(e, o).split(goog.i18n.bidi.wordSeparatorRe_), s = 0; s < i.length; s++) {
        var l = i[s];
        goog.i18n.bidi.startsWithRtl(l) ? (t++, n++) : goog.i18n.bidi.isRequiredLtrRe_.test(l) ? r = !0 : goog.i18n.bidi.hasAnyLtr(l) ? n++ : goog.i18n.bidi.hasNumeralsRe_.test(l) && (r = !0)
    }
    return 0 == n ? r ? goog.i18n.bidi.Dir.LTR : goog.i18n.bidi.Dir.NEUTRAL : t / n > goog.i18n.bidi.rtlDetectionThreshold_ ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR
}, goog.i18n.bidi.detectRtlDirectionality = function(e, o) {
    return goog.i18n.bidi.estimateDirection(e, o) == goog.i18n.bidi.Dir.RTL
}, goog.i18n.bidi.setElementDirAndAlign = function(e, o) {
    e && (o = goog.i18n.bidi.toDir(o)) && (e.style.textAlign = o == goog.i18n.bidi.Dir.RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT, e.dir = o == goog.i18n.bidi.Dir.RTL ? "rtl" : "ltr")
}, goog.i18n.bidi.setElementDirByTextDirectionality = function(e, o) {
    switch (goog.i18n.bidi.estimateDirection(o)) {
        case goog.i18n.bidi.Dir.LTR:
            e.dir = "ltr";
            break;
        case goog.i18n.bidi.Dir.RTL:
            e.dir = "rtl";
            break;
        default:
            e.removeAttribute("dir")
    }
}, goog.i18n.bidi.DirectionalString = function() {}, goog.html.TrustedResourceUrl = function() {
    this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ = "", this.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
}, goog.html.TrustedResourceUrl.prototype.implementsGoogStringTypedString = !0, goog.html.TrustedResourceUrl.prototype.getTypedStringValue = function() {
    return this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_
}, goog.html.TrustedResourceUrl.prototype.implementsGoogI18nBidiDirectionalString = !0, goog.html.TrustedResourceUrl.prototype.getDirection = function() {
    return goog.i18n.bidi.Dir.LTR
}, goog.DEBUG && (goog.html.TrustedResourceUrl.prototype.toString = function() {
    return "TrustedResourceUrl{" + this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ + "}"
}), goog.html.TrustedResourceUrl.unwrap = function(e) {
    return e instanceof goog.html.TrustedResourceUrl && e.constructor === goog.html.TrustedResourceUrl && e.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ ? e.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ : (goog.asserts.fail("expected object of type TrustedResourceUrl, got '" + e + "' of type " + goog.typeOf(e)), "type_error:TrustedResourceUrl")
}, goog.html.TrustedResourceUrl.format = function(e, o) {
    var t = goog.string.Const.unwrap(e);
    if (!goog.html.TrustedResourceUrl.BASE_URL_.test(t)) throw Error("Invalid TrustedResourceUrl format: " + t);
    var n = t.replace(goog.html.TrustedResourceUrl.FORMAT_MARKER_, function(e, n) {
        if (!Object.prototype.hasOwnProperty.call(o, n)) throw Error('Found marker, "' + n + '", in format string, "' + t + '", but no valid label mapping found in args: ' + JSON.stringify(o));
        var r = o[n];
        return r instanceof goog.string.Const ? goog.string.Const.unwrap(r) : encodeURIComponent(String(r))
    });
    return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(n)
}, goog.html.TrustedResourceUrl.FORMAT_MARKER_ = /%{(\w+)}/g, goog.html.TrustedResourceUrl.BASE_URL_ = /^(?:https:)?\/\/[0-9a-z.:[\]-]+\/|^\/[^\/\\]/i, goog.html.TrustedResourceUrl.fromConstant = function(e) {
    return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(goog.string.Const.unwrap(e))
}, goog.html.TrustedResourceUrl.fromConstants = function(e) {
    for (var o = "", t = 0; t < e.length; t++) o += goog.string.Const.unwrap(e[t]);
    return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(o)
}, goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {}, goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse = function(e) {
    var o = new goog.html.TrustedResourceUrl;
    return o.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ = e, o
}, goog.html.SafeUrl = function() {
    this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = "", this.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
}, goog.html.SafeUrl.INNOCUOUS_STRING = "about:invalid#zClosurez", goog.html.SafeUrl.prototype.implementsGoogStringTypedString = !0, goog.html.SafeUrl.prototype.getTypedStringValue = function() {
    return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_
}, goog.html.SafeUrl.prototype.implementsGoogI18nBidiDirectionalString = !0, goog.html.SafeUrl.prototype.getDirection = function() {
    return goog.i18n.bidi.Dir.LTR
}, goog.DEBUG && (goog.html.SafeUrl.prototype.toString = function() {
    return "SafeUrl{" + this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ + "}"
}), goog.html.SafeUrl.unwrap = function(e) {
    return e instanceof goog.html.SafeUrl && e.constructor === goog.html.SafeUrl && e.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ ? e.privateDoNotAccessOrElseSafeHtmlWrappedValue_ : (goog.asserts.fail("expected object of type SafeUrl, got '" + e + "' of type " + goog.typeOf(e)), "type_error:SafeUrl")
}, goog.html.SafeUrl.fromConstant = function(e) {
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(goog.string.Const.unwrap(e))
}, goog.html.SAFE_MIME_TYPE_PATTERN_ = /^(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm))$/i, goog.html.SafeUrl.fromBlob = function(e) {
    return e = goog.html.SAFE_MIME_TYPE_PATTERN_.test(e.type) ? goog.fs.url.createObjectUrl(e) : goog.html.SafeUrl.INNOCUOUS_STRING, goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(e)
}, goog.html.DATA_URL_PATTERN_ = /^data:([^;,]*);base64,[a-z0-9+\/]+=*$/i, goog.html.SafeUrl.fromDataUrl = function(e) {
    var o = (o = e.match(goog.html.DATA_URL_PATTERN_)) && goog.html.SAFE_MIME_TYPE_PATTERN_.test(o[1]);
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(o ? e : goog.html.SafeUrl.INNOCUOUS_STRING)
}, goog.html.SafeUrl.fromTelUrl = function(e) {
    return goog.string.caseInsensitiveStartsWith(e, "tel:") || (e = goog.html.SafeUrl.INNOCUOUS_STRING), goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(e)
}, goog.html.SafeUrl.fromTrustedResourceUrl = function(e) {
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(goog.html.TrustedResourceUrl.unwrap(e))
}, goog.html.SAFE_URL_PATTERN_ = /^(?:(?:https?|mailto|ftp):|[^&:/?#]*(?:[/?#]|$))/i, goog.html.SafeUrl.sanitize = function(e) {
    return e instanceof goog.html.SafeUrl ? e : (e = e.implementsGoogStringTypedString ? e.getTypedStringValue() : String(e), goog.html.SAFE_URL_PATTERN_.test(e) || (e = goog.html.SafeUrl.INNOCUOUS_STRING), goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(e))
}, goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {}, goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse = function(e) {
    var o = new goog.html.SafeUrl;
    return o.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = e, o
}, goog.html.SafeUrl.ABOUT_BLANK = goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse("about:blank"), goog.html.SafeHtml = function() {
    this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = "", this.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_, this.dir_ = null
}, goog.html.SafeHtml.prototype.implementsGoogI18nBidiDirectionalString = !0, goog.html.SafeHtml.prototype.getDirection = function() {
    return this.dir_
}, goog.html.SafeHtml.prototype.implementsGoogStringTypedString = !0, goog.html.SafeHtml.prototype.getTypedStringValue = function() {
    return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_
}, goog.DEBUG && (goog.html.SafeHtml.prototype.toString = function() {
    return "SafeHtml{" + this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ + "}"
}), goog.html.SafeHtml.unwrap = function(e) {
    return e instanceof goog.html.SafeHtml && e.constructor === goog.html.SafeHtml && e.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ ? e.privateDoNotAccessOrElseSafeHtmlWrappedValue_ : (goog.asserts.fail("expected object of type SafeHtml, got '" + e + "' of type " + goog.typeOf(e)), "type_error:SafeHtml")
}, goog.html.SafeHtml.htmlEscape = function(e) {
    if (e instanceof goog.html.SafeHtml) return e;
    var o = null;
    return e.implementsGoogI18nBidiDirectionalString && (o = e.getDirection()), e = e.implementsGoogStringTypedString ? e.getTypedStringValue() : String(e), goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.htmlEscape(e), o)
}, goog.html.SafeHtml.htmlEscapePreservingNewlines = function(e) {
    return e instanceof goog.html.SafeHtml ? e : (e = goog.html.SafeHtml.htmlEscape(e), goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.newLineToBr(goog.html.SafeHtml.unwrap(e)), e.getDirection()))
}, goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces = function(e) {
    return e instanceof goog.html.SafeHtml ? e : (e = goog.html.SafeHtml.htmlEscape(e), goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.whitespaceEscape(goog.html.SafeHtml.unwrap(e)), e.getDirection()))
}, goog.html.SafeHtml.from = goog.html.SafeHtml.htmlEscape, goog.html.SafeHtml.VALID_NAMES_IN_TAG_ = /^[a-zA-Z0-9-]+$/, goog.html.SafeHtml.URL_ATTRIBUTES_ = {
    action: !0,
    cite: !0,
    data: !0,
    formaction: !0,
    href: !0,
    manifest: !0,
    poster: !0,
    src: !0
}, goog.html.SafeHtml.NOT_ALLOWED_TAG_NAMES_ = {
    APPLET: !0,
    BASE: !0,
    EMBED: !0,
    IFRAME: !0,
    LINK: !0,
    MATH: !0,
    META: !0,
    OBJECT: !0,
    SCRIPT: !0,
    STYLE: !0,
    SVG: !0,
    TEMPLATE: !0
}, goog.html.SafeHtml.create = function(e, o, t) {
    return goog.html.SafeHtml.verifyTagName(String(e)), goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse(String(e), o, t)
}, goog.html.SafeHtml.verifyTagName = function(e) {
    if (!goog.html.SafeHtml.VALID_NAMES_IN_TAG_.test(e)) throw Error("Invalid tag name <" + e + ">.");
    if (e.toUpperCase() in goog.html.SafeHtml.NOT_ALLOWED_TAG_NAMES_) throw Error("Tag name <" + e + "> is not allowed for SafeHtml.")
}, goog.html.SafeHtml.createIframe = function(e, o, t, n) {
    e && goog.html.TrustedResourceUrl.unwrap(e);
    var r = {};
    return r.src = e || null, r.srcdoc = o && goog.html.SafeHtml.unwrap(o), e = goog.html.SafeHtml.combineAttributes(r, {
        sandbox: ""
    }, t), goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("iframe", e, n)
}, goog.html.SafeHtml.createSandboxIframe = function(e, o, t, n) {
    if (!goog.html.SafeHtml.canUseSandboxIframe()) throw Error("The browser does not support sandboxed iframes.");
    var r = {};
    return r.src = e ? goog.html.SafeUrl.unwrap(goog.html.SafeUrl.sanitize(e)) : null, r.srcdoc = o || null, r.sandbox = "", e = goog.html.SafeHtml.combineAttributes(r, {}, t), goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("iframe", e, n)
}, goog.html.SafeHtml.canUseSandboxIframe = function() {
    return goog.global.HTMLIFrameElement && "sandbox" in goog.global.HTMLIFrameElement.prototype
}, goog.html.SafeHtml.createScriptSrc = function(e, o) {
    goog.html.TrustedResourceUrl.unwrap(e);
    var t = goog.html.SafeHtml.combineAttributes({
        src: e
    }, {}, o);
    return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("script", t)
}, goog.html.SafeHtml.createScript = function(e, o) {
    for (var t in o) {
        var n = t.toLowerCase();
        if ("language" == n || "src" == n || "text" == n || "type" == n) throw Error('Cannot set "' + n + '" attribute')
    }
    for (t = "", e = goog.array.concat(e), n = 0; n < e.length; n++) t += goog.html.SafeScript.unwrap(e[n]);
    return t = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(t, goog.i18n.bidi.Dir.NEUTRAL), goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("script", o, t)
}, goog.html.SafeHtml.createStyle = function(e, o) {
    var t = goog.html.SafeHtml.combineAttributes({
            type: "text/css"
        }, {}, o),
        n = "";
    e = goog.array.concat(e);
    for (var r = 0; r < e.length; r++) n += goog.html.SafeStyleSheet.unwrap(e[r]);
    return n = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(n, goog.i18n.bidi.Dir.NEUTRAL), goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("style", t, n)
}, goog.html.SafeHtml.createMetaRefresh = function(e, o) {
    var t = goog.html.SafeUrl.unwrap(goog.html.SafeUrl.sanitize(e));
    return (goog.labs.userAgent.browser.isIE() || goog.labs.userAgent.browser.isEdge()) && goog.string.contains(t, ";") && (t = "'" + t.replace(/'/g, "%27") + "'"), goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("meta", {
        "http-equiv": "refresh",
        content: (o || 0) + "; url=" + t
    })
}, goog.html.SafeHtml.getAttrNameAndValue_ = function(e, o, t) {
    if (t instanceof goog.string.Const) t = goog.string.Const.unwrap(t);
    else if ("style" == o.toLowerCase()) t = goog.html.SafeHtml.getStyleValue_(t);
    else {
        if (/^on/i.test(o)) throw Error('Attribute "' + o + '" requires goog.string.Const value, "' + t + '" given.');
        if (o.toLowerCase() in goog.html.SafeHtml.URL_ATTRIBUTES_)
            if (t instanceof goog.html.TrustedResourceUrl) t = goog.html.TrustedResourceUrl.unwrap(t);
            else if (t instanceof goog.html.SafeUrl) t = goog.html.SafeUrl.unwrap(t);
        else {
            if (!goog.isString(t)) throw Error('Attribute "' + o + '" on tag "' + e + '" requires goog.html.SafeUrl, goog.string.Const, or string, value "' + t + '" given.');
            t = goog.html.SafeUrl.sanitize(t).getTypedStringValue()
        }
    }
    return t.implementsGoogStringTypedString && (t = t.getTypedStringValue()), goog.asserts.assert(goog.isString(t) || goog.isNumber(t), "String or number value expected, got " + typeof t + " with value: " + t), o + '="' + goog.string.htmlEscape(String(t)) + '"'
}, goog.html.SafeHtml.getStyleValue_ = function(e) {
    if (!goog.isObject(e)) throw Error('The "style" attribute requires goog.html.SafeStyle or map of style properties, ' + typeof e + " given: " + e);
    return e instanceof goog.html.SafeStyle || (e = goog.html.SafeStyle.create(e)), goog.html.SafeStyle.unwrap(e)
}, goog.html.SafeHtml.createWithDir = function(e, o, t, n) {
    return o = goog.html.SafeHtml.create(o, t, n), o.dir_ = e, o
}, goog.html.SafeHtml.concat = function(e) {
    var o = goog.i18n.bidi.Dir.NEUTRAL,
        t = "",
        n = function(e) {
            goog.isArray(e) ? goog.array.forEach(e, n) : (e = goog.html.SafeHtml.htmlEscape(e), t += goog.html.SafeHtml.unwrap(e), e = e.getDirection(), o == goog.i18n.bidi.Dir.NEUTRAL ? o = e : e != goog.i18n.bidi.Dir.NEUTRAL && o != e && (o = null))
        };
    return goog.array.forEach(arguments, n), goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(t, o)
}, goog.html.SafeHtml.concatWithDir = function(e, o) {
    var t = goog.html.SafeHtml.concat(goog.array.slice(arguments, 1));
    return t.dir_ = e, t
}, goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {}, goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse = function(e, o) {
    return (new goog.html.SafeHtml).initSecurityPrivateDoNotAccessOrElse_(e, o)
}, goog.html.SafeHtml.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(e, o) {
    return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = e, this.dir_ = o, this
}, goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse = function(e, o, t) {
    var n = null,
        r = "<" + e + goog.html.SafeHtml.stringifyAttributes(e, o);
    return goog.isDefAndNotNull(t) ? goog.isArray(t) || (t = [t]) : t = [], goog.dom.tags.isVoidTag(e.toLowerCase()) ? (goog.asserts.assert(!t.length, "Void tag <" + e + "> does not allow content."), r += ">") : (n = goog.html.SafeHtml.concat(t), r += ">" + goog.html.SafeHtml.unwrap(n) + "</" + e + ">", n = n.getDirection()), (e = o && o.dir) && (n = /^(ltr|rtl|auto)$/i.test(e) ? goog.i18n.bidi.Dir.NEUTRAL : null), goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(r, n)
}, goog.html.SafeHtml.stringifyAttributes = function(e, o) {
    var t = "";
    if (o)
        for (var n in o) {
            if (!goog.html.SafeHtml.VALID_NAMES_IN_TAG_.test(n)) throw Error('Invalid attribute name "' + n + '".');
            var r = o[n];
            goog.isDefAndNotNull(r) && (t += " " + goog.html.SafeHtml.getAttrNameAndValue_(e, n, r))
        }
    return t
}, goog.html.SafeHtml.combineAttributes = function(e, o, t) {
    var n, r = {};
    for (n in e) goog.asserts.assert(n.toLowerCase() == n, "Must be lower case"), r[n] = e[n];
    for (n in o) goog.asserts.assert(n.toLowerCase() == n, "Must be lower case"), r[n] = o[n];
    for (n in t) {
        var i = n.toLowerCase();
        if (i in e) throw Error('Cannot override "' + i + '" attribute, got "' + n + '" with value "' + t[n] + '"');
        i in o && delete r[i], r[n] = t[n]
    }
    return r
}, goog.html.SafeHtml.DOCTYPE_HTML = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("<!DOCTYPE html>", goog.i18n.bidi.Dir.NEUTRAL), goog.html.SafeHtml.EMPTY = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("", goog.i18n.bidi.Dir.NEUTRAL), goog.html.SafeHtml.BR = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("<br>", goog.i18n.bidi.Dir.NEUTRAL), goog.dom.safe = {}, goog.dom.safe.InsertAdjacentHtmlPosition = {
    AFTERBEGIN: "afterbegin",
    AFTEREND: "afterend",
    BEFOREBEGIN: "beforebegin",
    BEFOREEND: "beforeend"
}, goog.dom.safe.insertAdjacentHtml = function(e, o, t) {
    e.insertAdjacentHTML(o, goog.html.SafeHtml.unwrap(t))
}, goog.dom.safe.SET_INNER_HTML_DISALLOWED_TAGS_ = {
    MATH: !0,
    SCRIPT: !0,
    STYLE: !0,
    SVG: !0,
    TEMPLATE: !0
}, goog.dom.safe.setInnerHtml = function(e, o) {
    if (goog.asserts.ENABLE_ASSERTS) {
        var t = e.tagName.toUpperCase();
        if (goog.dom.safe.SET_INNER_HTML_DISALLOWED_TAGS_[t]) throw Error("goog.dom.safe.setInnerHtml cannot be used to set content of " + e.tagName + ".")
    }
    e.innerHTML = goog.html.SafeHtml.unwrap(o)
}, goog.dom.safe.setOuterHtml = function(e, o) {
    e.outerHTML = goog.html.SafeHtml.unwrap(o)
}, goog.dom.safe.setStyle = function(e, o) {
    e.style.cssText = goog.html.SafeStyle.unwrap(o)
}, goog.dom.safe.documentWrite = function(e, o) {
    e.write(goog.html.SafeHtml.unwrap(o))
}, goog.dom.safe.setAnchorHref = function(e, o) {
    goog.dom.safe.assertIsHTMLAnchorElement_(e);
    var t = o instanceof goog.html.SafeUrl ? o : goog.html.SafeUrl.sanitize(o);
    e.href = goog.html.SafeUrl.unwrap(t)
}, goog.dom.safe.setImageSrc = function(e, o) {
    goog.dom.safe.assertIsHTMLImageElement_(e);
    var t = o instanceof goog.html.SafeUrl ? o : goog.html.SafeUrl.sanitize(o);
    e.src = goog.html.SafeUrl.unwrap(t)
}, goog.dom.safe.setEmbedSrc = function(e, o) {
    goog.dom.safe.assertIsHTMLEmbedElement_(e), e.src = goog.html.TrustedResourceUrl.unwrap(o)
}, goog.dom.safe.setFrameSrc = function(e, o) {
    goog.dom.safe.assertIsHTMLFrameElement_(e), e.src = goog.html.TrustedResourceUrl.unwrap(o)
}, goog.dom.safe.setIframeSrc = function(e, o) {
    goog.dom.safe.assertIsHTMLIFrameElement_(e), e.src = goog.html.TrustedResourceUrl.unwrap(o)
}, goog.dom.safe.setIframeSrcdoc = function(e, o) {
    goog.dom.safe.assertIsHTMLIFrameElement_(e), e.srcdoc = goog.html.SafeHtml.unwrap(o)
}, goog.dom.safe.setLinkHrefAndRel = function(e, o, t) {
    goog.dom.safe.assertIsHTMLLinkElement_(e), e.rel = t, goog.string.caseInsensitiveContains(t, "stylesheet") ? (goog.asserts.assert(o instanceof goog.html.TrustedResourceUrl, 'URL must be TrustedResourceUrl because "rel" contains "stylesheet"'), e.href = goog.html.TrustedResourceUrl.unwrap(o)) : e.href = o instanceof goog.html.TrustedResourceUrl ? goog.html.TrustedResourceUrl.unwrap(o) : o instanceof goog.html.SafeUrl ? goog.html.SafeUrl.unwrap(o) : goog.html.SafeUrl.sanitize(o).getTypedStringValue()
}, goog.dom.safe.setObjectData = function(e, o) {
    goog.dom.safe.assertIsHTMLObjectElement_(e), e.data = goog.html.TrustedResourceUrl.unwrap(o)
}, goog.dom.safe.setScriptSrc = function(e, o) {
    goog.dom.safe.assertIsHTMLScriptElement_(e), e.src = goog.html.TrustedResourceUrl.unwrap(o)
}, goog.dom.safe.setLocationHref = function(e, o) {
    goog.dom.safe.assertIsLocation_(e);
    var t = o instanceof goog.html.SafeUrl ? o : goog.html.SafeUrl.sanitize(o);
    e.href = goog.html.SafeUrl.unwrap(t)
}, goog.dom.safe.openInWindow = function(e, o, t, n, r) {
    return e = e instanceof goog.html.SafeUrl ? e : goog.html.SafeUrl.sanitize(e), (o || window).open(goog.html.SafeUrl.unwrap(e), t ? goog.string.Const.unwrap(t) : "", n, r)
}, goog.dom.safe.assertIsLocation_ = function(e) {
    return goog.asserts.ENABLE_ASSERTS && "undefined" != typeof Location && "undefined" != typeof Element && goog.asserts.assert(e && (e instanceof Location || !(e instanceof Element)), "Argument is not a Location (or a non-Element mock); got: %s", goog.dom.safe.debugStringForType_(e)), e
}, goog.dom.safe.assertIsHTMLAnchorElement_ = function(e) {
    return goog.asserts.ENABLE_ASSERTS && "undefined" != typeof HTMLAnchorElement && "undefined" != typeof Location && "undefined" != typeof Element && goog.asserts.assert(e && (e instanceof HTMLAnchorElement || !(e instanceof Location || e instanceof Element)), "Argument is not a HTMLAnchorElement (or a non-Element mock); got: %s", goog.dom.safe.debugStringForType_(e)), e
}, goog.dom.safe.assertIsHTMLLinkElement_ = function(e) {
    return goog.asserts.ENABLE_ASSERTS && "undefined" != typeof HTMLLinkElement && "undefined" != typeof Location && "undefined" != typeof Element && goog.asserts.assert(e && (e instanceof HTMLLinkElement || !(e instanceof Location || e instanceof Element)), "Argument is not a HTMLLinkElement (or a non-Element mock); got: %s", goog.dom.safe.debugStringForType_(e)), e
}, goog.dom.safe.assertIsHTMLImageElement_ = function(e) {
    return goog.asserts.ENABLE_ASSERTS && "undefined" != typeof HTMLImageElement && "undefined" != typeof Element && goog.asserts.assert(e && (e instanceof HTMLImageElement || !(e instanceof Element)), "Argument is not a HTMLImageElement (or a non-Element mock); got: %s", goog.dom.safe.debugStringForType_(e)), e
}, goog.dom.safe.assertIsHTMLEmbedElement_ = function(e) {
    return goog.asserts.ENABLE_ASSERTS && "undefined" != typeof HTMLEmbedElement && "undefined" != typeof Element && goog.asserts.assert(e && (e instanceof HTMLEmbedElement || !(e instanceof Element)), "Argument is not a HTMLEmbedElement (or a non-Element mock); got: %s", goog.dom.safe.debugStringForType_(e)), e
}, goog.dom.safe.assertIsHTMLFrameElement_ = function(e) {
    return goog.asserts.ENABLE_ASSERTS && "undefined" != typeof HTMLFrameElement && "undefined" != typeof Element && goog.asserts.assert(e && (e instanceof HTMLFrameElement || !(e instanceof Element)), "Argument is not a HTMLFrameElement (or a non-Element mock); got: %s", goog.dom.safe.debugStringForType_(e)), e
}, goog.dom.safe.assertIsHTMLIFrameElement_ = function(e) {
    return goog.asserts.ENABLE_ASSERTS && "undefined" != typeof HTMLIFrameElement && "undefined" != typeof Element && goog.asserts.assert(e && (e instanceof HTMLIFrameElement || !(e instanceof Element)), "Argument is not a HTMLIFrameElement (or a non-Element mock); got: %s", goog.dom.safe.debugStringForType_(e)), e
}, goog.dom.safe.assertIsHTMLObjectElement_ = function(e) {
    return goog.asserts.ENABLE_ASSERTS && "undefined" != typeof HTMLObjectElement && "undefined" != typeof Element && goog.asserts.assert(e && (e instanceof HTMLObjectElement || !(e instanceof Element)), "Argument is not a HTMLObjectElement (or a non-Element mock); got: %s", goog.dom.safe.debugStringForType_(e)), e
}, goog.dom.safe.assertIsHTMLScriptElement_ = function(e) {
    return goog.asserts.ENABLE_ASSERTS && "undefined" != typeof HTMLScriptElement && "undefined" != typeof Element && goog.asserts.assert(e && (e instanceof HTMLScriptElement || !(e instanceof Element)), "Argument is not a HTMLScriptElement (or a non-Element mock); got: %s", goog.dom.safe.debugStringForType_(e)), e
}, goog.dom.safe.debugStringForType_ = function(e) {
    return goog.isObject(e) ? e.constructor.displayName || e.constructor.name || Object.prototype.toString.call(e) : void 0 === e ? "undefined" : null === e ? "null" : typeof e
}, goog.html.uncheckedconversions = {}, goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract = function(e, o, t) {
    return goog.asserts.assertString(goog.string.Const.unwrap(e), "must provide justification"), goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(e)), "must provide non-empty justification"), goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(o, t || null)
}, goog.html.uncheckedconversions.safeScriptFromStringKnownToSatisfyTypeContract = function(e, o) {
    return goog.asserts.assertString(goog.string.Const.unwrap(e), "must provide justification"), goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(e)), "must provide non-empty justification"), goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(o)
}, goog.html.uncheckedconversions.safeStyleFromStringKnownToSatisfyTypeContract = function(e, o) {
    return goog.asserts.assertString(goog.string.Const.unwrap(e), "must provide justification"), goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(e)), "must provide non-empty justification"), goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(o)
}, goog.html.uncheckedconversions.safeStyleSheetFromStringKnownToSatisfyTypeContract = function(e, o) {
    return goog.asserts.assertString(goog.string.Const.unwrap(e), "must provide justification"), goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(e)), "must provide non-empty justification"), goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(o)
}, goog.html.uncheckedconversions.safeUrlFromStringKnownToSatisfyTypeContract = function(e, o) {
    return goog.asserts.assertString(goog.string.Const.unwrap(e), "must provide justification"), goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(e)), "must provide non-empty justification"), goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(o)
}, goog.html.uncheckedconversions.trustedResourceUrlFromStringKnownToSatisfyTypeContract = function(e, o) {
    return goog.asserts.assertString(goog.string.Const.unwrap(e), "must provide justification"), goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(e)), "must provide non-empty justification"), goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(o)
}, goog.math.Coordinate = function(e, o) {
    this.x = goog.isDef(e) ? e : 0, this.y = goog.isDef(o) ? o : 0
}, goog.math.Coordinate.prototype.clone = function() {
    return new goog.math.Coordinate(this.x, this.y)
}, goog.DEBUG && (goog.math.Coordinate.prototype.toString = function() {
    return "(" + this.x + ", " + this.y + ")"
}), goog.math.Coordinate.prototype.equals = function(e) {
    return e instanceof goog.math.Coordinate && goog.math.Coordinate.equals(this, e)
}, goog.math.Coordinate.equals = function(e, o) {
    return e == o || !(!e || !o) && (e.x == o.x && e.y == o.y)
}, goog.math.Coordinate.distance = function(e, o) {
    var t = e.x - o.x,
        n = e.y - o.y;
    return Math.sqrt(t * t + n * n)
}, goog.math.Coordinate.magnitude = function(e) {
    return Math.sqrt(e.x * e.x + e.y * e.y)
}, goog.math.Coordinate.azimuth = function(e) {
    return goog.math.angle(0, 0, e.x, e.y)
}, goog.math.Coordinate.squaredDistance = function(e, o) {
    var t = e.x - o.x,
        n = e.y - o.y;
    return t * t + n * n
}, goog.math.Coordinate.difference = function(e, o) {
    return new goog.math.Coordinate(e.x - o.x, e.y - o.y)
}, goog.math.Coordinate.sum = function(e, o) {
    return new goog.math.Coordinate(e.x + o.x, e.y + o.y)
}, goog.math.Coordinate.prototype.ceil = function() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this
}, goog.math.Coordinate.prototype.floor = function() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
}, goog.math.Coordinate.prototype.round = function() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this
}, goog.math.Coordinate.prototype.translate = function(e, o) {
    return e instanceof goog.math.Coordinate ? (this.x += e.x, this.y += e.y) : (this.x += Number(e), goog.isNumber(o) && (this.y += o)), this
}, goog.math.Coordinate.prototype.scale = function(e, o) {
    var t = goog.isNumber(o) ? o : e;
    return this.x *= e, this.y *= t, this
}, goog.math.Coordinate.prototype.rotateRadians = function(e, o) {
    var t = o || new goog.math.Coordinate(0, 0),
        n = this.x,
        r = this.y,
        i = Math.cos(e),
        s = Math.sin(e);
    this.x = (n - t.x) * i - (r - t.y) * s + t.x, this.y = (n - t.x) * s + (r - t.y) * i + t.y
}, goog.math.Coordinate.prototype.rotateDegrees = function(e, o) {
    this.rotateRadians(goog.math.toRadians(e), o)
}, goog.math.Size = function(e, o) {
    this.width = e, this.height = o
}, goog.math.Size.equals = function(e, o) {
    return e == o || !(!e || !o) && (e.width == o.width && e.height == o.height)
}, goog.math.Size.prototype.clone = function() {
    return new goog.math.Size(this.width, this.height)
}, goog.DEBUG && (goog.math.Size.prototype.toString = function() {
    return "(" + this.width + " x " + this.height + ")"
}), goog.math.Size.prototype.getLongest = function() {
    return Math.max(this.width, this.height)
}, goog.math.Size.prototype.getShortest = function() {
    return Math.min(this.width, this.height)
}, goog.math.Size.prototype.area = function() {
    return this.width * this.height
}, goog.math.Size.prototype.perimeter = function() {
    return 2 * (this.width + this.height)
}, goog.math.Size.prototype.aspectRatio = function() {
    return this.width / this.height
}, goog.math.Size.prototype.isEmpty = function() {
    return !this.area()
}, goog.math.Size.prototype.ceil = function() {
    return this.width = Math.ceil(this.width), this.height = Math.ceil(this.height), this
}, goog.math.Size.prototype.fitsInside = function(e) {
    return this.width <= e.width && this.height <= e.height
}, goog.math.Size.prototype.floor = function() {
    return this.width = Math.floor(this.width), this.height = Math.floor(this.height), this
}, goog.math.Size.prototype.round = function() {
    return this.width = Math.round(this.width), this.height = Math.round(this.height), this
}, goog.math.Size.prototype.scale = function(e, o) {
    var t = goog.isNumber(o) ? o : e;
    return this.width *= e, this.height *= t, this
}, goog.math.Size.prototype.scaleToCover = function(e) {
    return e = this.aspectRatio() <= e.aspectRatio() ? e.width / this.width : e.height / this.height, this.scale(e)
}, goog.math.Size.prototype.scaleToFit = function(e) {
    return e = this.aspectRatio() > e.aspectRatio() ? e.width / this.width : e.height / this.height, this.scale(e)
}, goog.dom.ASSUME_QUIRKS_MODE = !1, goog.dom.ASSUME_STANDARDS_MODE = !1, goog.dom.COMPAT_MODE_KNOWN_ = goog.dom.ASSUME_QUIRKS_MODE || goog.dom.ASSUME_STANDARDS_MODE, goog.dom.getDomHelper = function(e) {
    return e ? new goog.dom.DomHelper(goog.dom.getOwnerDocument(e)) : goog.dom.defaultDomHelper_ || (goog.dom.defaultDomHelper_ = new goog.dom.DomHelper)
}, goog.dom.getDocument = function() {
    return document
}, goog.dom.getElement = function(e) {
    return goog.dom.getElementHelper_(document, e)
}, goog.dom.getElementHelper_ = function(e, o) {
    return goog.isString(o) ? e.getElementById(o) : o
}, goog.dom.getRequiredElement = function(e) {
    return goog.dom.getRequiredElementHelper_(document, e)
}, goog.dom.getRequiredElementHelper_ = function(e, o) {
    goog.asserts.assertString(o);
    var t = goog.dom.getElementHelper_(e, o);
    return t = goog.asserts.assertElement(t, "No element found with id: " + o)
}, goog.dom.$ = goog.dom.getElement, goog.dom.getElementsByTagName = function(e, o) {
    return (o || document).getElementsByTagName(String(e))
}, goog.dom.getElementsByTagNameAndClass = function(e, o, t) {
    return goog.dom.getElementsByTagNameAndClass_(document, e, o, t)
}, goog.dom.getElementsByClass = function(e, o) {
    var t = o || document;
    return goog.dom.canUseQuerySelector_(t) ? t.querySelectorAll("." + e) : goog.dom.getElementsByTagNameAndClass_(document, "*", e, o)
}, goog.dom.getElementByClass = function(e, o) {
    var t = o || document;
    return (t.getElementsByClassName ? t.getElementsByClassName(e)[0] : goog.dom.canUseQuerySelector_(t) ? t.querySelector("." + e) : goog.dom.getElementsByTagNameAndClass_(document, "*", e, o)[0]) || null
}, goog.dom.getRequiredElementByClass = function(e, o) {
    var t = goog.dom.getElementByClass(e, o);
    return goog.asserts.assert(t, "No element found with className: " + e)
}, goog.dom.canUseQuerySelector_ = function(e) {
    return !(!e.querySelectorAll || !e.querySelector)
}, goog.dom.getElementsByTagNameAndClass_ = function(e, o, t, n) {
    e = n || e;
    var r = o && "*" != o ? String(o).toUpperCase() : "";
    if (goog.dom.canUseQuerySelector_(e) && (r || t)) return e.querySelectorAll(r + (t ? "." + t : ""));
    if (t && e.getElementsByClassName) {
        if (n = e.getElementsByClassName(t), r) {
            e = {};
            for (var i, s = o = 0; i = n[s]; s++) r == i.nodeName && (e[o++] = i);
            return e.length = o, e
        }
        return n
    }
    if (n = e.getElementsByTagName(r || "*"), t) {
        for (e = {}, s = o = 0; i = n[s]; s++) "function" == typeof(r = i.className).split && goog.array.contains(r.split(/\s+/), t) && (e[o++] = i);
        return e.length = o, e
    }
    return n
}, goog.dom.$$ = goog.dom.getElementsByTagNameAndClass, goog.dom.setProperties = function(e, o) {
    goog.object.forEach(o, function(o, t) {
        o && o.implementsGoogStringTypedString && (o = o.getTypedStringValue()), "style" == t ? e.style.cssText = o : "class" == t ? e.className = o : "for" == t ? e.htmlFor = o : goog.dom.DIRECT_ATTRIBUTE_MAP_.hasOwnProperty(t) ? e.setAttribute(goog.dom.DIRECT_ATTRIBUTE_MAP_[t], o) : goog.string.startsWith(t, "aria-") || goog.string.startsWith(t, "data-") ? e.setAttribute(t, o) : e[t] = o
    })
}, goog.dom.DIRECT_ATTRIBUTE_MAP_ = {
    cellpadding: "cellPadding",
    cellspacing: "cellSpacing",
    colspan: "colSpan",
    frameborder: "frameBorder",
    height: "height",
    maxlength: "maxLength",
    nonce: "nonce",
    role: "role",
    rowspan: "rowSpan",
    type: "type",
    usemap: "useMap",
    valign: "vAlign",
    width: "width"
}, goog.dom.getViewportSize = function(e) {
    return goog.dom.getViewportSize_(e || window)
}, goog.dom.getViewportSize_ = function(e) {
    return e = e.document, e = goog.dom.isCss1CompatMode_(e) ? e.documentElement : e.body, new goog.math.Size(e.clientWidth, e.clientHeight)
}, goog.dom.getDocumentHeight = function() {
    return goog.dom.getDocumentHeight_(window)
}, goog.dom.getDocumentHeightForWindow = function(e) {
    return goog.dom.getDocumentHeight_(e)
}, goog.dom.getDocumentHeight_ = function(e) {
    o = 0;
    if (n = e.document) {
        var o = n.body,
            t = n.documentElement;
        if (!t || !o) return 0;
        if (e = goog.dom.getViewportSize_(e).height, goog.dom.isCss1CompatMode_(n) && t.scrollHeight) o = t.scrollHeight != e ? t.scrollHeight : t.offsetHeight;
        else {
            var n = t.scrollHeight,
                r = t.offsetHeight;
            t.clientHeight != r && (n = o.scrollHeight, r = o.offsetHeight), o = n > e ? n > r ? n : r : n < r ? n : r
        }
    }
    return o
}, goog.dom.getPageScroll = function(e) {
    return goog.dom.getDomHelper((e || goog.global || window).document).getDocumentScroll()
}, goog.dom.getDocumentScroll = function() {
    return goog.dom.getDocumentScroll_(document)
}, goog.dom.getDocumentScroll_ = function(e) {
    var o = goog.dom.getDocumentScrollElement_(e);
    return e = goog.dom.getWindow_(e), goog.userAgent.IE && goog.userAgent.isVersionOrHigher("10") && e.pageYOffset != o.scrollTop ? new goog.math.Coordinate(o.scrollLeft, o.scrollTop) : new goog.math.Coordinate(e.pageXOffset || o.scrollLeft, e.pageYOffset || o.scrollTop)
}, goog.dom.getDocumentScrollElement = function() {
    return goog.dom.getDocumentScrollElement_(document)
}, goog.dom.getDocumentScrollElement_ = function(e) {
    return e.scrollingElement ? e.scrollingElement : !goog.userAgent.WEBKIT && goog.dom.isCss1CompatMode_(e) ? e.documentElement : e.body || e.documentElement
}, goog.dom.getWindow = function(e) {
    return e ? goog.dom.getWindow_(e) : window
}, goog.dom.getWindow_ = function(e) {
    return e.parentWindow || e.defaultView
}, goog.dom.createDom = function(e, o, t) {
    return goog.dom.createDom_(document, arguments)
}, goog.dom.createDom_ = function(e, o) {
    var t = String(o[0]),
        n = o[1];
    if (!goog.dom.BrowserFeature.CAN_ADD_NAME_OR_TYPE_ATTRIBUTES && n && (n.name || n.type)) {
        if (t = ["<", t], n.name && t.push(' name="', goog.string.htmlEscape(n.name), '"'), n.type) {
            t.push(' type="', goog.string.htmlEscape(n.type), '"');
            var r = {};
            goog.object.extend(r, n), delete r.type, n = r
        }
        t.push(">"), t = t.join("")
    }
    return t = e.createElement(t), n && (goog.isString(n) ? t.className = n : goog.isArray(n) ? t.className = n.join(" ") : goog.dom.setProperties(t, n)), 2 < o.length && goog.dom.append_(e, t, o, 2), t
}, goog.dom.append_ = function(e, o, t, n) {
    function r(t) {
        t && o.appendChild(goog.isString(t) ? e.createTextNode(t) : t)
    }
    for (; n < t.length; n++) {
        var i = t[n];
        goog.isArrayLike(i) && !goog.dom.isNodeLike(i) ? goog.array.forEach(goog.dom.isNodeList(i) ? goog.array.toArray(i) : i, r) : r(i)
    }
}, goog.dom.$dom = goog.dom.createDom, goog.dom.createElement = function(e) {
    return goog.dom.createElement_(document, e)
}, goog.dom.createElement_ = function(e, o) {
    return e.createElement(String(o))
}, goog.dom.createTextNode = function(e) {
    return document.createTextNode(String(e))
}, goog.dom.createTable = function(e, o, t) {
    return goog.dom.createTable_(document, e, o, !!t)
}, goog.dom.createTable_ = function(e, o, t, n) {
    for (var r = goog.dom.createElement_(e, "TABLE"), i = r.appendChild(goog.dom.createElement_(e, "TBODY")), s = 0; s < o; s++) {
        for (var l = goog.dom.createElement_(e, "TR"), g = 0; g < t; g++) {
            var a = goog.dom.createElement_(e, "TD");
            n && goog.dom.setTextContent(a, goog.string.Unicode.NBSP), l.appendChild(a)
        }
        i.appendChild(l)
    }
    return r
}, goog.dom.constHtmlToNode = function(e) {
    var o = goog.array.map(arguments, goog.string.Const.unwrap),
        o = goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract(goog.string.Const.from("Constant HTML string, that gets turned into a Node later, so it will be automatically balanced."), o.join(""));
    return goog.dom.safeHtmlToNode(o)
}, goog.dom.safeHtmlToNode = function(e) {
    return goog.dom.safeHtmlToNode_(document, e)
}, goog.dom.safeHtmlToNode_ = function(e, o) {
    var t = goog.dom.createElement_(e, "DIV");
    return goog.dom.BrowserFeature.INNER_HTML_NEEDS_SCOPED_ELEMENT ? (goog.dom.safe.setInnerHtml(t, goog.html.SafeHtml.concat(goog.html.SafeHtml.BR, o)), t.removeChild(t.firstChild)) : goog.dom.safe.setInnerHtml(t, o), goog.dom.childrenToNode_(e, t)
}, goog.dom.childrenToNode_ = function(e, o) {
    if (1 == o.childNodes.length) return o.removeChild(o.firstChild);
    for (var t = e.createDocumentFragment(); o.firstChild;) t.appendChild(o.firstChild);
    return t
}, goog.dom.isCss1CompatMode = function() {
    return goog.dom.isCss1CompatMode_(document)
}, goog.dom.isCss1CompatMode_ = function(e) {
    return goog.dom.COMPAT_MODE_KNOWN_ ? goog.dom.ASSUME_STANDARDS_MODE : "CSS1Compat" == e.compatMode
}, goog.dom.canHaveChildren = function(e) {
    if (e.nodeType != goog.dom.NodeType.ELEMENT) return !1;
    switch (e.tagName) {
        case "APPLET":
        case "AREA":
        case "BASE":
        case "BR":
        case "COL":
        case "COMMAND":
        case "EMBED":
        case "FRAME":
        case "HR":
        case "IMG":
        case "INPUT":
        case "IFRAME":
        case "ISINDEX":
        case "KEYGEN":
        case "LINK":
        case "NOFRAMES":
        case "NOSCRIPT":
        case "META":
        case "OBJECT":
        case "PARAM":
        case "SCRIPT":
        case "SOURCE":
        case "STYLE":
        case "TRACK":
        case "WBR":
            return !1
    }
    return !0
}, goog.dom.appendChild = function(e, o) {
    e.appendChild(o)
}, goog.dom.append = function(e, o) {
    goog.dom.append_(goog.dom.getOwnerDocument(e), e, arguments, 1)
}, goog.dom.removeChildren = function(e) {
    for (var o; o = e.firstChild;) e.removeChild(o)
}, goog.dom.insertSiblingBefore = function(e, o) {
    o.parentNode && o.parentNode.insertBefore(e, o)
}, goog.dom.insertSiblingAfter = function(e, o) {
    o.parentNode && o.parentNode.insertBefore(e, o.nextSibling)
}, goog.dom.insertChildAt = function(e, o, t) {
    e.insertBefore(o, e.childNodes[t] || null)
}, goog.dom.removeNode = function(e) {
    return e && e.parentNode ? e.parentNode.removeChild(e) : null
}, goog.dom.replaceNode = function(e, o) {
    var t = o.parentNode;
    t && t.replaceChild(e, o)
}, goog.dom.flattenElement = function(e) {
    var o, t = e.parentNode;
    if (t && t.nodeType != goog.dom.NodeType.DOCUMENT_FRAGMENT) {
        if (e.removeNode) return e.removeNode(!1);
        for (; o = e.firstChild;) t.insertBefore(o, e);
        return goog.dom.removeNode(e)
    }
}, goog.dom.getChildren = function(e) {
    return goog.dom.BrowserFeature.CAN_USE_CHILDREN_ATTRIBUTE && void 0 != e.children ? e.children : goog.array.filter(e.childNodes, function(e) {
        return e.nodeType == goog.dom.NodeType.ELEMENT
    })
}, goog.dom.getFirstElementChild = function(e) {
    return goog.isDef(e.firstElementChild) ? e.firstElementChild : goog.dom.getNextElementNode_(e.firstChild, !0)
}, goog.dom.getLastElementChild = function(e) {
    return goog.isDef(e.lastElementChild) ? e.lastElementChild : goog.dom.getNextElementNode_(e.lastChild, !1)
}, goog.dom.getNextElementSibling = function(e) {
    return goog.isDef(e.nextElementSibling) ? e.nextElementSibling : goog.dom.getNextElementNode_(e.nextSibling, !0)
}, goog.dom.getPreviousElementSibling = function(e) {
    return goog.isDef(e.previousElementSibling) ? e.previousElementSibling : goog.dom.getNextElementNode_(e.previousSibling, !1)
}, goog.dom.getNextElementNode_ = function(e, o) {
    for (; e && e.nodeType != goog.dom.NodeType.ELEMENT;) e = o ? e.nextSibling : e.previousSibling;
    return e
}, goog.dom.getNextNode = function(e) {
    if (!e) return null;
    if (e.firstChild) return e.firstChild;
    for (; e && !e.nextSibling;) e = e.parentNode;
    return e ? e.nextSibling : null
}, goog.dom.getPreviousNode = function(e) {
    if (!e) return null;
    if (!e.previousSibling) return e.parentNode;
    for (e = e.previousSibling; e && e.lastChild;) e = e.lastChild;
    return e
}, goog.dom.isNodeLike = function(e) {
    return goog.isObject(e) && 0 < e.nodeType
}, goog.dom.isElement = function(e) {
    return goog.isObject(e) && e.nodeType == goog.dom.NodeType.ELEMENT
}, goog.dom.isWindow = function(e) {
    return goog.isObject(e) && e.window == e
}, goog.dom.getParentElement = function(e) {
    var o;
    return !goog.dom.BrowserFeature.CAN_USE_PARENT_ELEMENT_PROPERTY || goog.userAgent.IE && goog.userAgent.isVersionOrHigher("9") && !goog.userAgent.isVersionOrHigher("10") && goog.global.SVGElement && e instanceof goog.global.SVGElement || !(o = e.parentElement) ? (o = e.parentNode, goog.dom.isElement(o) ? o : null) : o
}, goog.dom.contains = function(e, o) {
    if (!e || !o) return !1;
    if (e.contains && o.nodeType == goog.dom.NodeType.ELEMENT) return e == o || e.contains(o);
    if (void 0 !== e.compareDocumentPosition) return e == o || !!(16 & e.compareDocumentPosition(o));
    for (; o && e != o;) o = o.parentNode;
    return o == e
}, goog.dom.compareNodeOrder = function(e, o) {
    if (e == o) return 0;
    if (e.compareDocumentPosition) return 2 & e.compareDocumentPosition(o) ? 1 : -1;
    if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)) {
        if (e.nodeType == goog.dom.NodeType.DOCUMENT) return -1;
        if (o.nodeType == goog.dom.NodeType.DOCUMENT) return 1
    }
    if ("sourceIndex" in e || e.parentNode && "sourceIndex" in e.parentNode) {
        var t = e.nodeType == goog.dom.NodeType.ELEMENT,
            n = o.nodeType == goog.dom.NodeType.ELEMENT;
        if (t && n) return e.sourceIndex - o.sourceIndex;
        var r = e.parentNode,
            i = o.parentNode;
        return r == i ? goog.dom.compareSiblingOrder_(e, o) : !t && goog.dom.contains(r, o) ? -1 * goog.dom.compareParentsDescendantNodeIe_(e, o) : !n && goog.dom.contains(i, e) ? goog.dom.compareParentsDescendantNodeIe_(o, e) : (t ? e.sourceIndex : r.sourceIndex) - (n ? o.sourceIndex : i.sourceIndex)
    }
    return n = goog.dom.getOwnerDocument(e), (t = n.createRange()).selectNode(e), t.collapse(!0), (n = n.createRange()).selectNode(o), n.collapse(!0), t.compareBoundaryPoints(goog.global.Range.START_TO_END, n)
}, goog.dom.compareParentsDescendantNodeIe_ = function(e, o) {
    var t = e.parentNode;
    if (t == o) return -1;
    for (var n = o; n.parentNode != t;) n = n.parentNode;
    return goog.dom.compareSiblingOrder_(n, e)
}, goog.dom.compareSiblingOrder_ = function(e, o) {
    for (var t = o; t = t.previousSibling;)
        if (t == e) return -1;
    return 1
}, goog.dom.findCommonAncestor = function(e) {
    var o, t = arguments.length;
    if (!t) return null;
    if (1 == t) return arguments[0];
    var n = [],
        r = 1 / 0;
    for (o = 0; o < t; o++) {
        for (var i = [], s = arguments[o]; s;) i.unshift(s), s = s.parentNode;
        n.push(i), r = Math.min(r, i.length)
    }
    for (i = null, o = 0; o < r; o++) {
        for (var s = n[0][o], l = 1; l < t; l++)
            if (s != n[l][o]) return i;
        i = s
    }
    return i
}, goog.dom.getOwnerDocument = function(e) {
    return goog.asserts.assert(e, "Node cannot be null or undefined."), e.nodeType == goog.dom.NodeType.DOCUMENT ? e : e.ownerDocument || e.document
}, goog.dom.getFrameContentDocument = function(e) {
    return e.contentDocument || e.contentWindow.document
}, goog.dom.getFrameContentWindow = function(e) {
    try {
        return e.contentWindow || (e.contentDocument ? goog.dom.getWindow(e.contentDocument) : null)
    } catch (e) {}
    return null
}, goog.dom.setTextContent = function(e, o) {
    if (goog.asserts.assert(null != e, "goog.dom.setTextContent expects a non-null value for node"), "textContent" in e) e.textContent = o;
    else if (e.nodeType == goog.dom.NodeType.TEXT) e.data = o;
    else if (e.firstChild && e.firstChild.nodeType == goog.dom.NodeType.TEXT) {
        for (; e.lastChild != e.firstChild;) e.removeChild(e.lastChild);
        e.firstChild.data = o
    } else {
        goog.dom.removeChildren(e);
        var t = goog.dom.getOwnerDocument(e);
        e.appendChild(t.createTextNode(String(o)))
    }
}, goog.dom.getOuterHtml = function(e) {
    if (goog.asserts.assert(null !== e, "goog.dom.getOuterHtml expects a non-null value for element"), "outerHTML" in e) return e.outerHTML;
    var o = goog.dom.getOwnerDocument(e);
    return (o = goog.dom.createElement_(o, "DIV")).appendChild(e.cloneNode(!0)), o.innerHTML
}, goog.dom.findNode = function(e, o) {
    var t = [];
    return goog.dom.findNodes_(e, o, t, !0) ? t[0] : void 0
}, goog.dom.findNodes = function(e, o) {
    var t = [];
    return goog.dom.findNodes_(e, o, t, !1), t
}, goog.dom.findNodes_ = function(e, o, t, n) {
    if (null != e)
        for (e = e.firstChild; e;) {
            if (o(e) && (t.push(e), n) || goog.dom.findNodes_(e, o, t, n)) return !0;
            e = e.nextSibling
        }
    return !1
}, goog.dom.TAGS_TO_IGNORE_ = {
    SCRIPT: 1,
    STYLE: 1,
    HEAD: 1,
    IFRAME: 1,
    OBJECT: 1
}, goog.dom.PREDEFINED_TAG_VALUES_ = {
    IMG: " ",
    BR: "\n"
}, goog.dom.isFocusableTabIndex = function(e) {
    return goog.dom.hasSpecifiedTabIndex_(e) && goog.dom.isTabIndexFocusable_(e)
}, goog.dom.setFocusableTabIndex = function(e, o) {
    o ? e.tabIndex = 0 : (e.tabIndex = -1, e.removeAttribute("tabIndex"))
}, goog.dom.isFocusable = function(e) {
    var o;
    return (o = goog.dom.nativelySupportsFocus_(e) ? !e.disabled && (!goog.dom.hasSpecifiedTabIndex_(e) || goog.dom.isTabIndexFocusable_(e)) : goog.dom.isFocusableTabIndex(e)) && goog.userAgent.IE ? goog.dom.hasNonZeroBoundingRect_(e) : o
}, goog.dom.hasSpecifiedTabIndex_ = function(e) {
    return goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9") ? (e = e.getAttributeNode("tabindex"), goog.isDefAndNotNull(e) && e.specified) : e.hasAttribute("tabindex")
}, goog.dom.isTabIndexFocusable_ = function(e) {
    return e = e.tabIndex, goog.isNumber(e) && 0 <= e && 32768 > e
}, goog.dom.nativelySupportsFocus_ = function(e) {
    return "A" == e.tagName || "INPUT" == e.tagName || "TEXTAREA" == e.tagName || "SELECT" == e.tagName || "BUTTON" == e.tagName
}, goog.dom.hasNonZeroBoundingRect_ = function(e) {
    return e = !goog.isFunction(e.getBoundingClientRect) || goog.userAgent.IE && null == e.parentElement ? {
        height: e.offsetHeight,
        width: e.offsetWidth
    } : e.getBoundingClientRect(), goog.isDefAndNotNull(e) && 0 < e.height && 0 < e.width
}, goog.dom.getTextContent = function(e) {
    if (goog.dom.BrowserFeature.CAN_USE_INNER_TEXT && null !== e && "innerText" in e) e = goog.string.canonicalizeNewlines(e.innerText);
    else {
        var o = [];
        goog.dom.getTextContent_(e, o, !0), e = o.join("")
    }
    return e = e.replace(/ \xAD /g, " ").replace(/\xAD/g, ""), e = e.replace(/\u200B/g, ""), goog.dom.BrowserFeature.CAN_USE_INNER_TEXT || (e = e.replace(/ +/g, " ")), " " != e && (e = e.replace(/^\s*/, "")), e
}, goog.dom.getRawTextContent = function(e) {
    var o = [];
    return goog.dom.getTextContent_(e, o, !1), o.join("")
}, goog.dom.getTextContent_ = function(e, o, t) {
    if (!(e.nodeName in goog.dom.TAGS_TO_IGNORE_))
        if (e.nodeType == goog.dom.NodeType.TEXT) t ? o.push(String(e.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : o.push(e.nodeValue);
        else if (e.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) o.push(goog.dom.PREDEFINED_TAG_VALUES_[e.nodeName]);
    else
        for (e = e.firstChild; e;) goog.dom.getTextContent_(e, o, t), e = e.nextSibling
}, goog.dom.getNodeTextLength = function(e) {
    return goog.dom.getTextContent(e).length
}, goog.dom.getNodeTextOffset = function(e, o) {
    for (var t = o || goog.dom.getOwnerDocument(e).body, n = []; e && e != t;) {
        for (var r = e; r = r.previousSibling;) n.unshift(goog.dom.getTextContent(r));
        e = e.parentNode
    }
    return goog.string.trimLeft(n.join("")).replace(/ +/g, " ").length
}, goog.dom.getNodeAtOffset = function(e, o, t) {
    e = [e];
    for (var n = 0, r = null; 0 < e.length && n < o;)
        if (!((r = e.pop()).nodeName in goog.dom.TAGS_TO_IGNORE_))
            if (r.nodeType == goog.dom.NodeType.TEXT) var i = r.nodeValue.replace(/(\r\n|\r|\n)/g, "").replace(/ +/g, " "),
                n = n + i.length;
            else if (r.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) n += goog.dom.PREDEFINED_TAG_VALUES_[r.nodeName].length;
    else
        for (i = r.childNodes.length - 1; 0 <= i; i--) e.push(r.childNodes[i]);
    return goog.isObject(t) && (t.remainder = r ? r.nodeValue.length + o - n - 1 : 0, t.node = r), r
}, goog.dom.isNodeList = function(e) {
    if (e && "number" == typeof e.length) {
        if (goog.isObject(e)) return "function" == typeof e.item || "string" == typeof e.item;
        if (goog.isFunction(e)) return "function" == typeof e.item
    }
    return !1
}, goog.dom.getAncestorByTagNameAndClass = function(e, o, t, n) {
    if (!o && !t) return null;
    var r = o ? String(o).toUpperCase() : null;
    return goog.dom.getAncestor(e, function(e) {
        return (!r || e.nodeName == r) && (!t || goog.isString(e.className) && goog.array.contains(e.className.split(/\s+/), t))
    }, !0, n)
}, goog.dom.getAncestorByClass = function(e, o, t) {
    return goog.dom.getAncestorByTagNameAndClass(e, null, o, t)
}, goog.dom.getAncestor = function(e, o, t, n) {
    for (e && !t && (e = e.parentNode), t = 0; e && (null == n || t <= n);) {
        if (goog.asserts.assert("parentNode" != e.name), o(e)) return e;
        e = e.parentNode, t++
    }
    return null
}, goog.dom.getActiveElement = function(e) {
    try {
        return e && e.activeElement
    } catch (e) {}
    return null
}, goog.dom.getPixelRatio = function() {
    var e = goog.dom.getWindow();
    return goog.isDef(e.devicePixelRatio) ? e.devicePixelRatio : e.matchMedia ? goog.dom.matchesPixelRatio_(3) || goog.dom.matchesPixelRatio_(2) || goog.dom.matchesPixelRatio_(1.5) || goog.dom.matchesPixelRatio_(1) || .75 : 1
}, goog.dom.matchesPixelRatio_ = function(e) {
    return goog.dom.getWindow().matchMedia("(min-resolution: " + e + "dppx),(min--moz-device-pixel-ratio: " + e + "),(min-resolution: " + 96 * e + "dpi)").matches ? e : 0
}, goog.dom.getCanvasContext2D = function(e) {
    return e.getContext("2d")
}, goog.dom.DomHelper = function(e) {
    this.document_ = e || goog.global.document || document
}, goog.dom.DomHelper.prototype.getDomHelper = goog.dom.getDomHelper, goog.dom.DomHelper.prototype.setDocument = function(e) {
    this.document_ = e
}, goog.dom.DomHelper.prototype.getDocument = function() {
    return this.document_
}, goog.dom.DomHelper.prototype.getElement = function(e) {
    return goog.dom.getElementHelper_(this.document_, e)
}, goog.dom.DomHelper.prototype.getRequiredElement = function(e) {
    return goog.dom.getRequiredElementHelper_(this.document_, e)
}, goog.dom.DomHelper.prototype.$ = goog.dom.DomHelper.prototype.getElement, goog.dom.DomHelper.prototype.getElementsByTagName = function(e, o) {
    return (o || this.document_).getElementsByTagName(String(e))
}, goog.dom.DomHelper.prototype.getElementsByTagNameAndClass = function(e, o, t) {
    return goog.dom.getElementsByTagNameAndClass_(this.document_, e, o, t)
}, goog.dom.DomHelper.prototype.getElementsByClass = function(e, o) {
    return goog.dom.getElementsByClass(e, o || this.document_)
}, goog.dom.DomHelper.prototype.getElementByClass = function(e, o) {
    return goog.dom.getElementByClass(e, o || this.document_)
}, goog.dom.DomHelper.prototype.getRequiredElementByClass = function(e, o) {
    return goog.dom.getRequiredElementByClass(e, o || this.document_)
}, goog.dom.DomHelper.prototype.$$ = goog.dom.DomHelper.prototype.getElementsByTagNameAndClass, goog.dom.DomHelper.prototype.setProperties = goog.dom.setProperties, goog.dom.DomHelper.prototype.getViewportSize = function(e) {
    return goog.dom.getViewportSize(e || this.getWindow())
}, goog.dom.DomHelper.prototype.getDocumentHeight = function() {
    return goog.dom.getDocumentHeight_(this.getWindow())
}, goog.dom.DomHelper.prototype.createDom = function(e, o, t) {
    return goog.dom.createDom_(this.document_, arguments)
}, goog.dom.DomHelper.prototype.$dom = goog.dom.DomHelper.prototype.createDom, goog.dom.DomHelper.prototype.createElement = function(e) {
    return goog.dom.createElement_(this.document_, e)
}, goog.dom.DomHelper.prototype.createTextNode = function(e) {
    return this.document_.createTextNode(String(e))
}, goog.dom.DomHelper.prototype.createTable = function(e, o, t) {
    return goog.dom.createTable_(this.document_, e, o, !!t)
}, goog.dom.DomHelper.prototype.safeHtmlToNode = function(e) {
    return goog.dom.safeHtmlToNode_(this.document_, e)
}, goog.dom.DomHelper.prototype.isCss1CompatMode = function() {
    return goog.dom.isCss1CompatMode_(this.document_)
}, goog.dom.DomHelper.prototype.getWindow = function() {
    return goog.dom.getWindow_(this.document_)
}, goog.dom.DomHelper.prototype.getDocumentScrollElement = function() {
    return goog.dom.getDocumentScrollElement_(this.document_)
}, goog.dom.DomHelper.prototype.getDocumentScroll = function() {
    return goog.dom.getDocumentScroll_(this.document_)
}, goog.dom.DomHelper.prototype.getActiveElement = function(e) {
    return goog.dom.getActiveElement(e || this.document_)
}, goog.dom.DomHelper.prototype.appendChild = goog.dom.appendChild, goog.dom.DomHelper.prototype.append = goog.dom.append, goog.dom.DomHelper.prototype.canHaveChildren = goog.dom.canHaveChildren, goog.dom.DomHelper.prototype.removeChildren = goog.dom.removeChildren, goog.dom.DomHelper.prototype.insertSiblingBefore = goog.dom.insertSiblingBefore, goog.dom.DomHelper.prototype.insertSiblingAfter = goog.dom.insertSiblingAfter, goog.dom.DomHelper.prototype.insertChildAt = goog.dom.insertChildAt, goog.dom.DomHelper.prototype.removeNode = goog.dom.removeNode, goog.dom.DomHelper.prototype.replaceNode = goog.dom.replaceNode, goog.dom.DomHelper.prototype.flattenElement = goog.dom.flattenElement, goog.dom.DomHelper.prototype.getChildren = goog.dom.getChildren, goog.dom.DomHelper.prototype.getFirstElementChild = goog.dom.getFirstElementChild, goog.dom.DomHelper.prototype.getLastElementChild = goog.dom.getLastElementChild, goog.dom.DomHelper.prototype.getNextElementSibling = goog.dom.getNextElementSibling, goog.dom.DomHelper.prototype.getPreviousElementSibling = goog.dom.getPreviousElementSibling, goog.dom.DomHelper.prototype.getNextNode = goog.dom.getNextNode, goog.dom.DomHelper.prototype.getPreviousNode = goog.dom.getPreviousNode, goog.dom.DomHelper.prototype.isNodeLike = goog.dom.isNodeLike, goog.dom.DomHelper.prototype.isElement = goog.dom.isElement, goog.dom.DomHelper.prototype.isWindow = goog.dom.isWindow, goog.dom.DomHelper.prototype.getParentElement = goog.dom.getParentElement, goog.dom.DomHelper.prototype.contains = goog.dom.contains, goog.dom.DomHelper.prototype.compareNodeOrder = goog.dom.compareNodeOrder, goog.dom.DomHelper.prototype.findCommonAncestor = goog.dom.findCommonAncestor, goog.dom.DomHelper.prototype.getOwnerDocument = goog.dom.getOwnerDocument, goog.dom.DomHelper.prototype.getFrameContentDocument = goog.dom.getFrameContentDocument, goog.dom.DomHelper.prototype.getFrameContentWindow = goog.dom.getFrameContentWindow, goog.dom.DomHelper.prototype.setTextContent = goog.dom.setTextContent, goog.dom.DomHelper.prototype.getOuterHtml = goog.dom.getOuterHtml, goog.dom.DomHelper.prototype.findNode = goog.dom.findNode, goog.dom.DomHelper.prototype.findNodes = goog.dom.findNodes, goog.dom.DomHelper.prototype.isFocusableTabIndex = goog.dom.isFocusableTabIndex, goog.dom.DomHelper.prototype.setFocusableTabIndex = goog.dom.setFocusableTabIndex, goog.dom.DomHelper.prototype.isFocusable = goog.dom.isFocusable, goog.dom.DomHelper.prototype.getTextContent = goog.dom.getTextContent, goog.dom.DomHelper.prototype.getNodeTextLength = goog.dom.getNodeTextLength, goog.dom.DomHelper.prototype.getNodeTextOffset = goog.dom.getNodeTextOffset, goog.dom.DomHelper.prototype.getNodeAtOffset = goog.dom.getNodeAtOffset, goog.dom.DomHelper.prototype.isNodeList = goog.dom.isNodeList, goog.dom.DomHelper.prototype.getAncestorByTagNameAndClass = goog.dom.getAncestorByTagNameAndClass, goog.dom.DomHelper.prototype.getAncestorByClass = goog.dom.getAncestorByClass, goog.dom.DomHelper.prototype.getAncestor = goog.dom.getAncestor, goog.dom.DomHelper.prototype.getCanvasContext2D = goog.dom.getCanvasContext2D, goog.dom.vendor = {}, goog.dom.vendor.getVendorJsPrefix = function() {
    return goog.userAgent.WEBKIT ? "Webkit" : goog.userAgent.GECKO ? "Moz" : goog.userAgent.IE ? "ms" : goog.userAgent.OPERA ? "O" : null
}, goog.dom.vendor.getVendorPrefix = function() {
    return goog.userAgent.WEBKIT ? "-webkit" : goog.userAgent.GECKO ? "-moz" : goog.userAgent.IE ? "-ms" : goog.userAgent.OPERA ? "-o" : null
}, goog.dom.vendor.getPrefixedPropertyName = function(e, o) {
    if (o && e in o) return e;
    var t = goog.dom.vendor.getVendorJsPrefix();
    return t ? (t = t.toLowerCase(), t += goog.string.toTitleCase(e), !goog.isDef(o) || t in o ? t : null) : null
}, goog.dom.vendor.getPrefixedEventType = function(e) {
    return ((goog.dom.vendor.getVendorJsPrefix() || "") + e).toLowerCase()
}, goog.html.legacyconversions = {}, goog.html.legacyconversions.safeHtmlFromString = function(e) {
    return goog.html.legacyconversions.reportCallback_(), goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(e, null)
}, goog.html.legacyconversions.safeStyleFromString = function(e) {
    return goog.html.legacyconversions.reportCallback_(), goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(e)
}, goog.html.legacyconversions.safeStyleSheetFromString = function(e) {
    return goog.html.legacyconversions.reportCallback_(), goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(e)
}, goog.html.legacyconversions.safeUrlFromString = function(e) {
    return goog.html.legacyconversions.reportCallback_(), goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(e)
}, goog.html.legacyconversions.trustedResourceUrlFromString = function(e) {
    return goog.html.legacyconversions.reportCallback_(), goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(e)
}, goog.html.legacyconversions.reportCallback_ = goog.nullFunction, goog.html.legacyconversions.setReportCallback = function(e) {
    goog.html.legacyconversions.reportCallback_ = e
}, goog.math.Box = function(e, o, t, n) {
    this.top = e, this.right = o, this.bottom = t, this.left = n
}, goog.math.Box.boundingBox = function(e) {
    for (var o = new goog.math.Box(arguments[0].y, arguments[0].x, arguments[0].y, arguments[0].x), t = 1; t < arguments.length; t++) o.expandToIncludeCoordinate(arguments[t]);
    return o
}, goog.math.Box.prototype.getWidth = function() {
    return this.right - this.left
}, goog.math.Box.prototype.getHeight = function() {
    return this.bottom - this.top
}, goog.math.Box.prototype.clone = function() {
    return new goog.math.Box(this.top, this.right, this.bottom, this.left)
}, goog.DEBUG && (goog.math.Box.prototype.toString = function() {
    return "(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)"
}), goog.math.Box.prototype.contains = function(e) {
    return goog.math.Box.contains(this, e)
}, goog.math.Box.prototype.expand = function(e, o, t, n) {
    return goog.isObject(e) ? (this.top -= e.top, this.right += e.right, this.bottom += e.bottom, this.left -= e.left) : (this.top -= e, this.right += Number(o), this.bottom += Number(t), this.left -= Number(n)), this
}, goog.math.Box.prototype.expandToInclude = function(e) {
    this.left = Math.min(this.left, e.left), this.top = Math.min(this.top, e.top), this.right = Math.max(this.right, e.right), this.bottom = Math.max(this.bottom, e.bottom)
}, goog.math.Box.prototype.expandToIncludeCoordinate = function(e) {
    this.top = Math.min(this.top, e.y), this.right = Math.max(this.right, e.x), this.bottom = Math.max(this.bottom, e.y), this.left = Math.min(this.left, e.x)
}, goog.math.Box.equals = function(e, o) {
    return e == o || !(!e || !o) && (e.top == o.top && e.right == o.right && e.bottom == o.bottom && e.left == o.left)
}, goog.math.Box.contains = function(e, o) {
    return !(!e || !o) && (o instanceof goog.math.Box ? o.left >= e.left && o.right <= e.right && o.top >= e.top && o.bottom <= e.bottom : o.x >= e.left && o.x <= e.right && o.y >= e.top && o.y <= e.bottom)
}, goog.math.Box.relativePositionX = function(e, o) {
    return o.x < e.left ? o.x - e.left : o.x > e.right ? o.x - e.right : 0
}, goog.math.Box.relativePositionY = function(e, o) {
    return o.y < e.top ? o.y - e.top : o.y > e.bottom ? o.y - e.bottom : 0
}, goog.math.Box.distance = function(e, o) {
    var t = goog.math.Box.relativePositionX(e, o),
        n = goog.math.Box.relativePositionY(e, o);
    return Math.sqrt(t * t + n * n)
}, goog.math.Box.intersects = function(e, o) {
    return e.left <= o.right && o.left <= e.right && e.top <= o.bottom && o.top <= e.bottom
}, goog.math.Box.intersectsWithPadding = function(e, o, t) {
    return e.left <= o.right + t && o.left <= e.right + t && e.top <= o.bottom + t && o.top <= e.bottom + t
}, goog.math.Box.prototype.ceil = function() {
    return this.top = Math.ceil(this.top), this.right = Math.ceil(this.right), this.bottom = Math.ceil(this.bottom), this.left = Math.ceil(this.left), this
}, goog.math.Box.prototype.floor = function() {
    return this.top = Math.floor(this.top), this.right = Math.floor(this.right), this.bottom = Math.floor(this.bottom), this.left = Math.floor(this.left), this
}, goog.math.Box.prototype.round = function() {
    return this.top = Math.round(this.top), this.right = Math.round(this.right), this.bottom = Math.round(this.bottom), this.left = Math.round(this.left), this
}, goog.math.Box.prototype.translate = function(e, o) {
    return e instanceof goog.math.Coordinate ? (this.left += e.x, this.right += e.x, this.top += e.y, this.bottom += e.y) : (goog.asserts.assertNumber(e), this.left += e, this.right += e, goog.isNumber(o) && (this.top += o, this.bottom += o)), this
}, goog.math.Box.prototype.scale = function(e, o) {
    var t = goog.isNumber(o) ? o : e;
    return this.left *= e, this.right *= e, this.top *= t, this.bottom *= t, this
}, goog.math.IRect = function() {}, goog.math.Rect = function(e, o, t, n) {
    this.left = e, this.top = o, this.width = t, this.height = n
}, goog.math.Rect.prototype.clone = function() {
    return new goog.math.Rect(this.left, this.top, this.width, this.height)
}, goog.math.Rect.prototype.toBox = function() {
    return new goog.math.Box(this.top, this.left + this.width, this.top + this.height, this.left)
}, goog.math.Rect.createFromPositionAndSize = function(e, o) {
    return new goog.math.Rect(e.x, e.y, o.width, o.height)
}, goog.math.Rect.createFromBox = function(e) {
    return new goog.math.Rect(e.left, e.top, e.right - e.left, e.bottom - e.top)
}, goog.DEBUG && (goog.math.Rect.prototype.toString = function() {
    return "(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)"
}), goog.math.Rect.equals = function(e, o) {
    return e == o || !(!e || !o) && (e.left == o.left && e.width == o.width && e.top == o.top && e.height == o.height)
}, goog.math.Rect.prototype.intersection = function(e) {
    var o = Math.max(this.left, e.left),
        t = Math.min(this.left + this.width, e.left + e.width);
    if (o <= t) {
        var n = Math.max(this.top, e.top);
        if (e = Math.min(this.top + this.height, e.top + e.height), n <= e) return this.left = o, this.top = n, this.width = t - o, this.height = e - n, !0
    }
    return !1
}, goog.math.Rect.intersection = function(e, o) {
    var t = Math.max(e.left, o.left),
        n = Math.min(e.left + e.width, o.left + o.width);
    if (t <= n) {
        var r = Math.max(e.top, o.top),
            i = Math.min(e.top + e.height, o.top + o.height);
        if (r <= i) return new goog.math.Rect(t, r, n - t, i - r)
    }
    return null
}, goog.math.Rect.intersects = function(e, o) {
    return e.left <= o.left + o.width && o.left <= e.left + e.width && e.top <= o.top + o.height && o.top <= e.top + e.height
}, goog.math.Rect.prototype.intersects = function(e) {
    return goog.math.Rect.intersects(this, e)
}, goog.math.Rect.difference = function(e, o) {
    if (!(t = goog.math.Rect.intersection(e, o)) || !t.height || !t.width) return [e.clone()];
    var t = [],
        n = e.top,
        r = e.height,
        i = e.left + e.width,
        s = e.top + e.height,
        l = o.left + o.width,
        g = o.top + o.height;
    return o.top > e.top && (t.push(new goog.math.Rect(e.left, e.top, e.width, o.top - e.top)), n = o.top, r -= o.top - e.top), g < s && (t.push(new goog.math.Rect(e.left, g, e.width, s - g)), r = g - n), o.left > e.left && t.push(new goog.math.Rect(e.left, n, o.left - e.left, r)), l < i && t.push(new goog.math.Rect(l, n, i - l, r)), t
}, goog.math.Rect.prototype.difference = function(e) {
    return goog.math.Rect.difference(this, e)
}, goog.math.Rect.prototype.boundingRect = function(e) {
    var o = Math.max(this.left + this.width, e.left + e.width),
        t = Math.max(this.top + this.height, e.top + e.height);
    this.left = Math.min(this.left, e.left), this.top = Math.min(this.top, e.top), this.width = o - this.left, this.height = t - this.top
}, goog.math.Rect.boundingRect = function(e, o) {
    if (!e || !o) return null;
    var t = new goog.math.Rect(e.left, e.top, e.width, e.height);
    return t.boundingRect(o), t
}, goog.math.Rect.prototype.contains = function(e) {
    return e instanceof goog.math.Coordinate ? e.x >= this.left && e.x <= this.left + this.width && e.y >= this.top && e.y <= this.top + this.height : this.left <= e.left && this.left + this.width >= e.left + e.width && this.top <= e.top && this.top + this.height >= e.top + e.height
}, goog.math.Rect.prototype.squaredDistance = function(e) {
    var o = e.x < this.left ? this.left - e.x : Math.max(e.x - (this.left + this.width), 0);
    return e = e.y < this.top ? this.top - e.y : Math.max(e.y - (this.top + this.height), 0), o * o + e * e
}, goog.math.Rect.prototype.distance = function(e) {
    return Math.sqrt(this.squaredDistance(e))
}, goog.math.Rect.prototype.getSize = function() {
    return new goog.math.Size(this.width, this.height)
}, goog.math.Rect.prototype.getTopLeft = function() {
    return new goog.math.Coordinate(this.left, this.top)
}, goog.math.Rect.prototype.getCenter = function() {
    return new goog.math.Coordinate(this.left + this.width / 2, this.top + this.height / 2)
}, goog.math.Rect.prototype.getBottomRight = function() {
    return new goog.math.Coordinate(this.left + this.width, this.top + this.height)
}, goog.math.Rect.prototype.ceil = function() {
    return this.left = Math.ceil(this.left), this.top = Math.ceil(this.top), this.width = Math.ceil(this.width), this.height = Math.ceil(this.height), this
}, goog.math.Rect.prototype.floor = function() {
    return this.left = Math.floor(this.left), this.top = Math.floor(this.top), this.width = Math.floor(this.width), this.height = Math.floor(this.height), this
}, goog.math.Rect.prototype.round = function() {
    return this.left = Math.round(this.left), this.top = Math.round(this.top), this.width = Math.round(this.width), this.height = Math.round(this.height), this
}, goog.math.Rect.prototype.translate = function(e, o) {
    return e instanceof goog.math.Coordinate ? (this.left += e.x, this.top += e.y) : (this.left += goog.asserts.assertNumber(e), goog.isNumber(o) && (this.top += o)), this
}, goog.math.Rect.prototype.scale = function(e, o) {
    var t = goog.isNumber(o) ? o : e;
    return this.left *= e, this.width *= e, this.top *= t, this.height *= t, this
}, goog.style = {}, goog.style.setStyle = function(e, o, t) {
    if (goog.isString(o)) goog.style.setStyle_(e, t, o);
    else
        for (var n in o) goog.style.setStyle_(e, o[n], n)
}, goog.style.setStyle_ = function(e, o, t) {
    (t = goog.style.getVendorJsStyleName_(e, t)) && (e.style[t] = o)
}, goog.style.styleNameCache_ = {}, goog.style.getVendorJsStyleName_ = function(e, o) {
    if (!(n = goog.style.styleNameCache_[o])) {
        var t = goog.string.toCamelCase(o),
            n = t;
        void 0 === e.style[t] && (t = goog.dom.vendor.getVendorJsPrefix() + goog.string.toTitleCase(t), void 0 !== e.style[t] && (n = t)), goog.style.styleNameCache_[o] = n
    }
    return n
}, goog.style.getVendorStyleName_ = function(e, o) {
    var t = goog.string.toCamelCase(o);
    return void 0 === e.style[t] && (t = goog.dom.vendor.getVendorJsPrefix() + goog.string.toTitleCase(t), void 0 !== e.style[t]) ? goog.dom.vendor.getVendorPrefix() + "-" + o : o
}, goog.style.getStyle = function(e, o) {
    var t = e.style[goog.string.toCamelCase(o)];
    return void 0 !== t ? t : e.style[goog.style.getVendorJsStyleName_(e, o)] || ""
}, goog.style.getComputedStyle = function(e, o) {
    var t = goog.dom.getOwnerDocument(e);
    return t.defaultView && t.defaultView.getComputedStyle && (t = t.defaultView.getComputedStyle(e, null)) ? t[o] || t.getPropertyValue(o) || "" : ""
}, goog.style.getCascadedStyle = function(e, o) {
    return e.currentStyle ? e.currentStyle[o] : null
}, goog.style.getStyle_ = function(e, o) {
    return goog.style.getComputedStyle(e, o) || goog.style.getCascadedStyle(e, o) || e.style && e.style[o]
}, goog.style.getComputedBoxSizing = function(e) {
    return goog.style.getStyle_(e, "boxSizing") || goog.style.getStyle_(e, "MozBoxSizing") || goog.style.getStyle_(e, "WebkitBoxSizing") || null
}, goog.style.getComputedPosition = function(e) {
    return goog.style.getStyle_(e, "position")
}, goog.style.getBackgroundColor = function(e) {
    return goog.style.getStyle_(e, "backgroundColor")
}, goog.style.getComputedOverflowX = function(e) {
    return goog.style.getStyle_(e, "overflowX")
}, goog.style.getComputedOverflowY = function(e) {
    return goog.style.getStyle_(e, "overflowY")
}, goog.style.getComputedZIndex = function(e) {
    return goog.style.getStyle_(e, "zIndex")
}, goog.style.getComputedTextAlign = function(e) {
    return goog.style.getStyle_(e, "textAlign")
}, goog.style.getComputedCursor = function(e) {
    return goog.style.getStyle_(e, "cursor")
}, goog.style.getComputedTransform = function(e) {
    var o = goog.style.getVendorStyleName_(e, "transform");
    return goog.style.getStyle_(e, o) || goog.style.getStyle_(e, "transform")
}, goog.style.setPosition = function(e, o, t) {
    if (o instanceof goog.math.Coordinate) {
        var n = o.x;
        o = o.y
    } else n = o, o = t;
    e.style.left = goog.style.getPixelStyleValue_(n, !1), e.style.top = goog.style.getPixelStyleValue_(o, !1)
}, goog.style.getPosition = function(e) {
    return new goog.math.Coordinate(e.offsetLeft, e.offsetTop)
}, goog.style.getClientViewportElement = function(e) {
    return e = e ? goog.dom.getOwnerDocument(e) : goog.dom.getDocument(), !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9) || goog.dom.getDomHelper(e).isCss1CompatMode() ? e.documentElement : e.body
}, goog.style.getViewportPageOffset = function(e) {
    var o = e.body;
    return e = e.documentElement, new goog.math.Coordinate(o.scrollLeft || e.scrollLeft, o.scrollTop || e.scrollTop)
}, goog.style.getBoundingClientRect_ = function(e) {
    try {
        var o = e.getBoundingClientRect()
    } catch (e) {
        return {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        }
    }
    return goog.userAgent.IE && e.ownerDocument.body && (e = e.ownerDocument, o.left -= e.documentElement.clientLeft + e.body.clientLeft, o.top -= e.documentElement.clientTop + e.body.clientTop), o
}, goog.style.getOffsetParent = function(e) {
    if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(8)) return goog.asserts.assert(e && "offsetParent" in e), e.offsetParent;
    var o = goog.dom.getOwnerDocument(e),
        t = goog.style.getStyle_(e, "position"),
        n = "fixed" == t || "absolute" == t;
    for (e = e.parentNode; e && e != o; e = e.parentNode)
        if (e.nodeType == goog.dom.NodeType.DOCUMENT_FRAGMENT && e.host && (e = e.host), t = goog.style.getStyle_(e, "position"), !(n = n && "static" == t && e != o.documentElement && e != o.body) && (e.scrollWidth > e.clientWidth || e.scrollHeight > e.clientHeight || "fixed" == t || "absolute" == t || "relative" == t)) return e;
    return null
}, goog.style.getVisibleRectForElement = function(e) {
    for (var o = new goog.math.Box(0, 1 / 0, 1 / 0, 0), t = goog.dom.getDomHelper(e), n = t.getDocument().body, r = t.getDocument().documentElement, i = t.getDocumentScrollElement(); e = goog.style.getOffsetParent(e);)
        if (!(goog.userAgent.IE && 0 == e.clientWidth || goog.userAgent.WEBKIT && 0 == e.clientHeight && e == n) && e != n && e != r && "visible" != goog.style.getStyle_(e, "overflow")) {
            var s = goog.style.getPageOffset(e),
                l = goog.style.getClientLeftTop(e);
            s.x += l.x, s.y += l.y, o.top = Math.max(o.top, s.y), o.right = Math.min(o.right, s.x + e.clientWidth), o.bottom = Math.min(o.bottom, s.y + e.clientHeight), o.left = Math.max(o.left, s.x)
        }
    return n = i.scrollLeft, i = i.scrollTop, o.left = Math.max(o.left, n), o.top = Math.max(o.top, i), t = t.getViewportSize(), o.right = Math.min(o.right, n + t.width), o.bottom = Math.min(o.bottom, i + t.height), 0 <= o.top && 0 <= o.left && o.bottom > o.top && o.right > o.left ? o : null
}, goog.style.getContainerOffsetToScrollInto = function(e, o, t) {
    var n = o || goog.dom.getDocumentScrollElement(),
        r = goog.style.getPageOffset(e),
        i = goog.style.getPageOffset(n),
        s = goog.style.getBorderBox(n);
    return n == goog.dom.getDocumentScrollElement() ? (o = r.x - n.scrollLeft, r = r.y - n.scrollTop, goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(10) && (o += s.left, r += s.top)) : (o = r.x - i.x - s.left, r = r.y - i.y - s.top), s = goog.style.getSizeWithDisplay_(e), e = n.clientWidth - s.width, s = n.clientHeight - s.height, i = n.scrollLeft, n = n.scrollTop, t ? (i += o - e / 2, n += r - s / 2) : (i += Math.min(o, Math.max(o - e, 0)), n += Math.min(r, Math.max(r - s, 0))), new goog.math.Coordinate(i, n)
}, goog.style.scrollIntoContainerView = function(e, o, t) {
    o = o || goog.dom.getDocumentScrollElement(), e = goog.style.getContainerOffsetToScrollInto(e, o, t), o.scrollLeft = e.x, o.scrollTop = e.y
}, goog.style.getClientLeftTop = function(e) {
    return new goog.math.Coordinate(e.clientLeft, e.clientTop)
}, goog.style.getPageOffset = function(e) {
    var o = goog.dom.getOwnerDocument(e);
    goog.asserts.assertObject(e, "Parameter is required");
    var t = new goog.math.Coordinate(0, 0);
    return e == goog.style.getClientViewportElement(o) ? t : (e = goog.style.getBoundingClientRect_(e), o = goog.dom.getDomHelper(o).getDocumentScroll(), t.x = e.left + o.x, t.y = e.top + o.y, t)
}, goog.style.getPageOffsetLeft = function(e) {
    return goog.style.getPageOffset(e).x
}, goog.style.getPageOffsetTop = function(e) {
    return goog.style.getPageOffset(e).y
}, goog.style.getFramedPageOffset = function(e, o) {
    var t = new goog.math.Coordinate(0, 0),
        n = goog.dom.getWindow(goog.dom.getOwnerDocument(e));
    if (!goog.reflect.canAccessProperty(n, "parent")) return t;
    var r = e;
    do {
        var i = n == o ? goog.style.getPageOffset(r) : goog.style.getClientPositionForElement_(goog.asserts.assert(r));
        t.x += i.x, t.y += i.y
    } while (n && n != o && n != n.parent && (r = n.frameElement) && (n = n.parent));
    return t
}, goog.style.translateRectForAnotherFrame = function(e, o, t) {
    if (o.getDocument() != t.getDocument()) {
        var n = o.getDocument().body;
        t = goog.style.getFramedPageOffset(n, t.getWindow()), t = goog.math.Coordinate.difference(t, goog.style.getPageOffset(n)), !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9) || o.isCss1CompatMode() || (t = goog.math.Coordinate.difference(t, o.getDocumentScroll())), e.left += t.x, e.top += t.y
    }
}, goog.style.getRelativePosition = function(e, o) {
    var t = goog.style.getClientPosition(e),
        n = goog.style.getClientPosition(o);
    return new goog.math.Coordinate(t.x - n.x, t.y - n.y)
}, goog.style.getClientPositionForElement_ = function(e) {
    return e = goog.style.getBoundingClientRect_(e), new goog.math.Coordinate(e.left, e.top)
}, goog.style.getClientPosition = function(e) {
    return goog.asserts.assert(e), e.nodeType == goog.dom.NodeType.ELEMENT ? goog.style.getClientPositionForElement_(e) : (e = e.changedTouches ? e.changedTouches[0] : e, new goog.math.Coordinate(e.clientX, e.clientY))
}, goog.style.setPageOffset = function(e, o, t) {
    var n = goog.style.getPageOffset(e);
    o instanceof goog.math.Coordinate && (t = o.y, o = o.x), o = goog.asserts.assertNumber(o) - n.x, goog.style.setPosition(e, e.offsetLeft + o, e.offsetTop + (Number(t) - n.y))
}, goog.style.setSize = function(e, o, t) {
    if (o instanceof goog.math.Size) t = o.height, o = o.width;
    else if (void 0 == t) throw Error("missing height argument");
    goog.style.setWidth(e, o), goog.style.setHeight(e, t)
}, goog.style.getPixelStyleValue_ = function(e, o) {
    return "number" == typeof e && (e = (o ? Math.round(e) : e) + "px"), e
}, goog.style.setHeight = function(e, o) {
    e.style.height = goog.style.getPixelStyleValue_(o, !0)
}, goog.style.setWidth = function(e, o) {
    e.style.width = goog.style.getPixelStyleValue_(o, !0)
}, goog.style.getSize = function(e) {
    return goog.style.evaluateWithTemporaryDisplay_(goog.style.getSizeWithDisplay_, e)
}, goog.style.evaluateWithTemporaryDisplay_ = function(e, o) {
    if ("none" != goog.style.getStyle_(o, "display")) return e(o);
    var t = o.style,
        n = t.display,
        r = t.visibility,
        i = t.position;
    t.visibility = "hidden", t.position = "absolute", t.display = "inline";
    var s = e(o);
    return t.display = n, t.position = i, t.visibility = r, s
}, goog.style.getSizeWithDisplay_ = function(e) {
    var o = e.offsetWidth,
        t = e.offsetHeight,
        n = goog.userAgent.WEBKIT && !o && !t;
    return goog.isDef(o) && !n || !e.getBoundingClientRect ? new goog.math.Size(o, t) : (e = goog.style.getBoundingClientRect_(e), new goog.math.Size(e.right - e.left, e.bottom - e.top))
}, goog.style.getTransformedSize = function(e) {
    return e.getBoundingClientRect ? (e = goog.style.evaluateWithTemporaryDisplay_(goog.style.getBoundingClientRect_, e), new goog.math.Size(e.right - e.left, e.bottom - e.top)) : null
}, goog.style.getBounds = function(e) {
    var o = goog.style.getPageOffset(e);
    return e = goog.style.getSize(e), new goog.math.Rect(o.x, o.y, e.width, e.height)
}, goog.style.toCamelCase = function(e) {
    return goog.string.toCamelCase(String(e))
}, goog.style.toSelectorCase = function(e) {
    return goog.string.toSelectorCase(e)
}, goog.style.getOpacity = function(e) {
    goog.asserts.assert(e);
    var o = e.style;
    return e = "", "opacity" in o ? e = o.opacity : "MozOpacity" in o ? e = o.MozOpacity : "filter" in o && (o = o.filter.match(/alpha\(opacity=([\d.]+)\)/)) && (e = String(o[1] / 100)), "" == e ? e : Number(e)
}, goog.style.setOpacity = function(e, o) {
    goog.asserts.assert(e);
    var t = e.style;
    "opacity" in t ? t.opacity = o : "MozOpacity" in t ? t.MozOpacity = o : "filter" in t && (t.filter = "" === o ? "" : "alpha(opacity=" + 100 * Number(o) + ")")
}, goog.style.setTransparentBackgroundImage = function(e, o) {
    var t = e.style;
    goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("8") ? t.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + o + '", sizingMethod="crop")' : (t.backgroundImage = "url(" + o + ")", t.backgroundPosition = "top left", t.backgroundRepeat = "no-repeat")
}, goog.style.clearTransparentBackgroundImage = function(e) {
    "filter" in (e = e.style) ? e.filter = "": e.backgroundImage = "none"
}, goog.style.showElement = function(e, o) {
    goog.style.setElementShown(e, o)
}, goog.style.setElementShown = function(e, o) {
    e.style.display = o ? "" : "none"
}, goog.style.isElementShown = function(e) {
    return "none" != e.style.display
}, goog.style.installStyles = function(e, o) {
    return goog.style.installSafeStyleSheet(goog.html.legacyconversions.safeStyleSheetFromString(e), o)
}, goog.style.installSafeStyleSheet = function(e, o) {
    var t = goog.dom.getDomHelper(o),
        n = t.getDocument();
    if (goog.userAgent.IE && n.createStyleSheet) {
        var r = n.createStyleSheet();
        goog.style.setSafeStyleSheet(r, e)
    } else(n = t.getElementsByTagNameAndClass("HEAD")[0]) || (r = t.getElementsByTagNameAndClass("BODY")[0], n = t.createDom("HEAD"), r.parentNode.insertBefore(n, r)), r = t.createDom("STYLE"), goog.style.setSafeStyleSheet(r, e), t.appendChild(n, r);
    return r
}, goog.style.uninstallStyles = function(e) {
    goog.dom.removeNode(e.ownerNode || e.owningElement || e)
}, goog.style.setStyles = function(e, o) {
    goog.style.setSafeStyleSheet(e, goog.html.legacyconversions.safeStyleSheetFromString(o))
}, goog.style.setSafeStyleSheet = function(e, o) {
    var t = goog.html.SafeStyleSheet.unwrap(o);
    goog.userAgent.IE && goog.isDef(e.cssText) ? e.cssText = t : e.innerHTML = t
}, goog.style.setPreWrap = function(e) {
    e = e.style, goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("8") ? (e.whiteSpace = "pre", e.wordWrap = "break-word") : e.whiteSpace = goog.userAgent.GECKO ? "-moz-pre-wrap" : "pre-wrap"
}, goog.style.setInlineBlock = function(e) {
    (e = e.style).position = "relative", goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("8") ? (e.zoom = "1", e.display = "inline") : e.display = "inline-block"
}, goog.style.isRightToLeft = function(e) {
    return "rtl" == goog.style.getStyle_(e, "direction")
}, goog.style.unselectableStyle_ = goog.userAgent.GECKO ? "MozUserSelect" : goog.userAgent.WEBKIT || goog.userAgent.EDGE ? "WebkitUserSelect" : null, goog.style.isUnselectable = function(e) {
    return goog.style.unselectableStyle_ ? "none" == e.style[goog.style.unselectableStyle_].toLowerCase() : !(!goog.userAgent.IE && !goog.userAgent.OPERA) && "on" == e.getAttribute("unselectable")
}, goog.style.setUnselectable = function(e, o, t) {
    t = t ? null : e.getElementsByTagName("*");
    var n = goog.style.unselectableStyle_;
    if (n) {
        if (o = o ? "none" : "", e.style && (e.style[n] = o), t) {
            e = 0;
            for (var r; r = t[e]; e++) r.style && (r.style[n] = o)
        }
    } else if ((goog.userAgent.IE || goog.userAgent.OPERA) && (o = o ? "on" : "", e.setAttribute("unselectable", o), t))
        for (e = 0; r = t[e]; e++) r.setAttribute("unselectable", o)
}, goog.style.getBorderBoxSize = function(e) {
    return new goog.math.Size(e.offsetWidth, e.offsetHeight)
}, goog.style.setBorderBoxSize = function(e, o) {
    var t = goog.dom.getOwnerDocument(e),
        n = goog.dom.getDomHelper(t).isCss1CompatMode();
    if (!goog.userAgent.IE || goog.userAgent.isVersionOrHigher("10") || n && goog.userAgent.isVersionOrHigher("8")) goog.style.setBoxSizingSize_(e, o, "border-box");
    else if (t = e.style, n) {
        var n = goog.style.getPaddingBox(e),
            r = goog.style.getBorderBox(e);
        t.pixelWidth = o.width - r.left - n.left - n.right - r.right, t.pixelHeight = o.height - r.top - n.top - n.bottom - r.bottom
    } else t.pixelWidth = o.width, t.pixelHeight = o.height
}, goog.style.getContentBoxSize = function(e) {
    var o = goog.dom.getOwnerDocument(e),
        t = goog.userAgent.IE && e.currentStyle;
    return t && goog.dom.getDomHelper(o).isCss1CompatMode() && "auto" != t.width && "auto" != t.height && !t.boxSizing ? (o = goog.style.getIePixelValue_(e, t.width, "width", "pixelWidth"), e = goog.style.getIePixelValue_(e, t.height, "height", "pixelHeight"), new goog.math.Size(o, e)) : (t = goog.style.getBorderBoxSize(e), o = goog.style.getPaddingBox(e), e = goog.style.getBorderBox(e), new goog.math.Size(t.width - e.left - o.left - o.right - e.right, t.height - e.top - o.top - o.bottom - e.bottom))
}, goog.style.setContentBoxSize = function(e, o) {
    var t = goog.dom.getOwnerDocument(e),
        n = goog.dom.getDomHelper(t).isCss1CompatMode();
    if (!goog.userAgent.IE || goog.userAgent.isVersionOrHigher("10") || n && goog.userAgent.isVersionOrHigher("8")) goog.style.setBoxSizingSize_(e, o, "content-box");
    else if (t = e.style, n) t.pixelWidth = o.width, t.pixelHeight = o.height;
    else {
        var n = goog.style.getPaddingBox(e),
            r = goog.style.getBorderBox(e);
        t.pixelWidth = o.width + r.left + n.left + n.right + r.right, t.pixelHeight = o.height + r.top + n.top + n.bottom + r.bottom
    }
}, goog.style.setBoxSizingSize_ = function(e, o, t) {
    e = e.style, goog.userAgent.GECKO ? e.MozBoxSizing = t : goog.userAgent.WEBKIT ? e.WebkitBoxSizing = t : e.boxSizing = t, e.width = Math.max(o.width, 0) + "px", e.height = Math.max(o.height, 0) + "px"
}, goog.style.getIePixelValue_ = function(e, o, t, n) {
    if (/^\d+px?$/.test(o)) return parseInt(o, 10);
    var r = e.style[t],
        i = e.runtimeStyle[t];
    return e.runtimeStyle[t] = e.currentStyle[t], e.style[t] = o, o = e.style[n], e.style[t] = r, e.runtimeStyle[t] = i, +o
}, goog.style.getIePixelDistance_ = function(e, o) {
    var t = goog.style.getCascadedStyle(e, o);
    return t ? goog.style.getIePixelValue_(e, t, "left", "pixelLeft") : 0
}, goog.style.getBox_ = function(e, o) {
    if (goog.userAgent.IE) {
        var t = goog.style.getIePixelDistance_(e, o + "Left"),
            n = goog.style.getIePixelDistance_(e, o + "Right"),
            r = goog.style.getIePixelDistance_(e, o + "Top"),
            i = goog.style.getIePixelDistance_(e, o + "Bottom");
        return new goog.math.Box(r, n, i, t)
    }
    return t = goog.style.getComputedStyle(e, o + "Left"), n = goog.style.getComputedStyle(e, o + "Right"), r = goog.style.getComputedStyle(e, o + "Top"), i = goog.style.getComputedStyle(e, o + "Bottom"), new goog.math.Box(parseFloat(r), parseFloat(n), parseFloat(i), parseFloat(t))
}, goog.style.getPaddingBox = function(e) {
    return goog.style.getBox_(e, "padding")
}, goog.style.getMarginBox = function(e) {
    return goog.style.getBox_(e, "margin")
}, goog.style.ieBorderWidthKeywords_ = {
    thin: 2,
    medium: 4,
    thick: 6
}, goog.style.getIePixelBorder_ = function(e, o) {
    if ("none" == goog.style.getCascadedStyle(e, o + "Style")) return 0;
    var t = goog.style.getCascadedStyle(e, o + "Width");
    return t in goog.style.ieBorderWidthKeywords_ ? goog.style.ieBorderWidthKeywords_[t] : goog.style.getIePixelValue_(e, t, "left", "pixelLeft")
}, goog.style.getBorderBox = function(e) {
    if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)) {
        var o = goog.style.getIePixelBorder_(e, "borderLeft"),
            t = goog.style.getIePixelBorder_(e, "borderRight"),
            n = goog.style.getIePixelBorder_(e, "borderTop");
        return e = goog.style.getIePixelBorder_(e, "borderBottom"), new goog.math.Box(n, t, e, o)
    }
    return o = goog.style.getComputedStyle(e, "borderLeftWidth"), t = goog.style.getComputedStyle(e, "borderRightWidth"), n = goog.style.getComputedStyle(e, "borderTopWidth"), e = goog.style.getComputedStyle(e, "borderBottomWidth"), new goog.math.Box(parseFloat(n), parseFloat(t), parseFloat(e), parseFloat(o))
}, goog.style.getFontFamily = function(e) {
    var o = goog.dom.getOwnerDocument(e),
        t = "";
    if (o.body.createTextRange && goog.dom.contains(o, e)) {
        (o = o.body.createTextRange()).moveToElementText(e);
        try {
            t = o.queryCommandValue("FontName")
        } catch (e) {
            t = ""
        }
    }
    return t || (t = goog.style.getStyle_(e, "fontFamily")), 1 < (e = t.split(",")).length && (t = e[0]), goog.string.stripQuotes(t, "\"'")
}, goog.style.lengthUnitRegex_ = /[^\d]+$/, goog.style.getLengthUnits = function(e) {
    return (e = e.match(goog.style.lengthUnitRegex_)) && e[0] || null
}, goog.style.ABSOLUTE_CSS_LENGTH_UNITS_ = {
    cm: 1,
    in: 1,
    mm: 1,
    pc: 1,
    pt: 1
}, goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_ = {
    em: 1,
    ex: 1
}, goog.style.getFontSize = function(e) {
    var o = goog.style.getStyle_(e, "fontSize"),
        t = goog.style.getLengthUnits(o);
    if (o && "px" == t) return parseInt(o, 10);
    if (goog.userAgent.IE) {
        if (String(t) in goog.style.ABSOLUTE_CSS_LENGTH_UNITS_) return goog.style.getIePixelValue_(e, o, "left", "pixelLeft");
        if (e.parentNode && e.parentNode.nodeType == goog.dom.NodeType.ELEMENT && String(t) in goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_) return e = e.parentNode, t = goog.style.getStyle_(e, "fontSize"), goog.style.getIePixelValue_(e, o == t ? "1em" : o, "left", "pixelLeft")
    }
    return t = goog.dom.createDom("SPAN", {
        style: "visibility:hidden;position:absolute;line-height:0;padding:0;margin:0;border:0;height:1em;"
    }), goog.dom.appendChild(e, t), o = t.offsetHeight, goog.dom.removeNode(t), o
}, goog.style.parseStyleAttribute = function(e) {
    var o = {};
    return goog.array.forEach(e.split(/\s*;\s*/), function(e) {
        var t = e.match(/\s*([\w-]+)\s*\:(.+)/);
        t && (e = t[1], t = goog.string.trim(t[2]), o[goog.string.toCamelCase(e.toLowerCase())] = t)
    }), o
}, goog.style.toStyleAttribute = function(e) {
    var o = [];
    return goog.object.forEach(e, function(e, t) {
        o.push(goog.string.toSelectorCase(t), ":", e, ";")
    }), o.join("")
}, goog.style.setFloat = function(e, o) {
    e.style[goog.userAgent.IE ? "styleFloat" : "cssFloat"] = o
}, goog.style.getFloat = function(e) {
    return e.style[goog.userAgent.IE ? "styleFloat" : "cssFloat"] || ""
}, goog.style.getScrollbarWidth = function(e) {
    var o = goog.dom.createElement("DIV");
    return e && (o.className = e), o.style.cssText = "overflow:auto;position:absolute;top:0;width:100px;height:100px", e = goog.dom.createElement("DIV"), goog.style.setSize(e, "200px", "200px"), o.appendChild(e), goog.dom.appendChild(goog.dom.getDocument().body, o), e = o.offsetWidth - o.clientWidth, goog.dom.removeNode(o), e
}, goog.style.MATRIX_TRANSLATION_REGEX_ = /matrix\([0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, ([0-9\.\-]+)p?x?, ([0-9\.\-]+)p?x?\)/, goog.style.getCssTranslation = function(e) {
    return e = goog.style.getComputedTransform(e), e && (e = e.match(goog.style.MATRIX_TRANSLATION_REGEX_)) ? new goog.math.Coordinate(parseFloat(e[1]), parseFloat(e[2])) : new goog.math.Coordinate(0, 0)
}, goog.Thenable = function() {}, goog.Thenable.prototype.then = function(e, o, t) {}, goog.Thenable.IMPLEMENTED_BY_PROP = "$goog_Thenable", goog.Thenable.addImplementation = function(e) {
    e.prototype.then = e.prototype.then, COMPILED ? e.prototype[goog.Thenable.IMPLEMENTED_BY_PROP] = !0 : e.prototype.$goog_Thenable = !0
}, goog.Thenable.isImplementedBy = function(e) {
    if (!e) return !1;
    try {
        return COMPILED ? !!e[goog.Thenable.IMPLEMENTED_BY_PROP] : !!e.$goog_Thenable
    } catch (e) {
        return !1
    }
}, goog.async = {}, goog.async.FreeList = function(e, o, t) {
    this.limit_ = t, this.create_ = e, this.reset_ = o, this.occupants_ = 0, this.head_ = null
}, goog.async.FreeList.prototype.get = function() {
    if (0 < this.occupants_) {
        this.occupants_--;
        var e = this.head_;
        this.head_ = e.next, e.next = null
    } else e = this.create_();
    return e
}, goog.async.FreeList.prototype.put = function(e) {
    this.reset_(e), this.occupants_ < this.limit_ && (this.occupants_++, e.next = this.head_, this.head_ = e)
}, goog.async.FreeList.prototype.occupants = function() {
    return this.occupants_
}, goog.async.WorkQueue = function() {
    this.workTail_ = this.workHead_ = null
}, goog.async.WorkQueue.DEFAULT_MAX_UNUSED = 100, goog.async.WorkQueue.freelist_ = new goog.async.FreeList(function() {
    return new goog.async.WorkItem
}, function(e) {
    e.reset()
}, goog.async.WorkQueue.DEFAULT_MAX_UNUSED), goog.async.WorkQueue.prototype.add = function(e, o) {
    var t = this.getUnusedItem_();
    t.set(e, o), this.workTail_ ? this.workTail_.next = t : (goog.asserts.assert(!this.workHead_), this.workHead_ = t), this.workTail_ = t
}, goog.async.WorkQueue.prototype.remove = function() {
    var e = null;
    return this.workHead_ && (e = this.workHead_, this.workHead_ = this.workHead_.next, this.workHead_ || (this.workTail_ = null), e.next = null), e
}, goog.async.WorkQueue.prototype.returnUnused = function(e) {
    goog.async.WorkQueue.freelist_.put(e)
}, goog.async.WorkQueue.prototype.getUnusedItem_ = function() {
    return goog.async.WorkQueue.freelist_.get()
}, goog.async.WorkItem = function() {
    this.next = this.scope = this.fn = null
}, goog.async.WorkItem.prototype.set = function(e, o) {
    this.fn = e, this.scope = o, this.next = null
}, goog.async.WorkItem.prototype.reset = function() {
    this.next = this.scope = this.fn = null
}, goog.functions = {}, goog.functions.constant = function(e) {
    return function() {
        return e
    }
}, goog.functions.FALSE = goog.functions.constant(!1), goog.functions.TRUE = goog.functions.constant(!0), goog.functions.NULL = goog.functions.constant(null), goog.functions.identity = function(e, o) {
    return e
}, goog.functions.error = function(e) {
    return function() {
        throw Error(e)
    }
}, goog.functions.fail = function(e) {
    return function() {
        throw e
    }
}, goog.functions.lock = function(e, o) {
    return o = o || 0,
        function() {
            return e.apply(this, Array.prototype.slice.call(arguments, 0, o))
        }
}, goog.functions.nth = function(e) {
    return function() {
        return arguments[e]
    }
}, goog.functions.partialRight = function(e, o) {
    var t = Array.prototype.slice.call(arguments, 1);
    return function() {
        var o = Array.prototype.slice.call(arguments);
        return o.push.apply(o, t), e.apply(this, o)
    }
}, goog.functions.withReturnValue = function(e, o) {
    return goog.functions.sequence(e, goog.functions.constant(o))
}, goog.functions.equalTo = function(e, o) {
    return function(t) {
        return o ? e == t : e === t
    }
}, goog.functions.compose = function(e, o) {
    var t = arguments,
        n = t.length;
    return function() {
        var e;
        n && (e = t[n - 1].apply(this, arguments));
        for (var o = n - 2; 0 <= o; o--) e = t[o].call(this, e);
        return e
    }
}, goog.functions.sequence = function(e) {
    var o = arguments,
        t = o.length;
    return function() {
        for (var e, n = 0; n < t; n++) e = o[n].apply(this, arguments);
        return e
    }
}, goog.functions.and = function(e) {
    var o = arguments,
        t = o.length;
    return function() {
        for (var e = 0; e < t; e++)
            if (!o[e].apply(this, arguments)) return !1;
        return !0
    }
}, goog.functions.or = function(e) {
    var o = arguments,
        t = o.length;
    return function() {
        for (var e = 0; e < t; e++)
            if (o[e].apply(this, arguments)) return !0;
        return !1
    }
}, goog.functions.not = function(e) {
    return function() {
        return !e.apply(this, arguments)
    }
}, goog.functions.create = function(e, o) {
    var t = function() {};
    return t.prototype = e.prototype, t = new t, e.apply(t, Array.prototype.slice.call(arguments, 1)), t
}, goog.functions.CACHE_RETURN_VALUE = !0, goog.functions.cacheReturnValue = function(e) {
    var o, t = !1;
    return function() {
        return goog.functions.CACHE_RETURN_VALUE ? (t || (o = e(), t = !0), o) : e()
    }
}, goog.functions.once = function(e) {
    var o = e;
    return function() {
        if (o) {
            var e = o;
            o = null, e()
        }
    }
}, goog.functions.debounce = function(e, o, t) {
    var n = 0;
    return function(r) {
        goog.global.clearTimeout(n);
        var i = arguments;
        n = goog.global.setTimeout(function() {
            e.apply(t, i)
        }, o)
    }
}, goog.functions.throttle = function(e, o, t) {
    var n = 0,
        r = !1,
        i = [],
        s = function() {
            n = 0, r && (r = !1, l())
        },
        l = function() {
            n = goog.global.setTimeout(s, o), e.apply(t, i)
        };
    return function(e) {
        i = arguments, n ? r = !0 : l()
    }
}, goog.functions.rateLimit = function(e, o, t) {
    var n = 0,
        r = function() {
            n = 0
        };
    return function(i) {
        n || (n = goog.global.setTimeout(r, o), e.apply(t, arguments))
    }
}, goog.async.throwException = function(e) {
    goog.global.setTimeout(function() {
        throw e
    }, 0)
}, goog.async.nextTick = function(e, o, t) {
    var n = e;
    o && (n = goog.bind(e, o)), n = goog.async.nextTick.wrapCallback_(n), goog.isFunction(goog.global.setImmediate) && (t || goog.async.nextTick.useSetImmediate_()) ? goog.global.setImmediate(n) : (goog.async.nextTick.setImmediate_ || (goog.async.nextTick.setImmediate_ = goog.async.nextTick.getSetImmediateEmulator_()), goog.async.nextTick.setImmediate_(n))
}, goog.async.nextTick.useSetImmediate_ = function() {
    return !(goog.global.Window && goog.global.Window.prototype && !goog.labs.userAgent.browser.isEdge() && goog.global.Window.prototype.setImmediate == goog.global.setImmediate)
}, goog.async.nextTick.getSetImmediateEmulator_ = function() {
    var e = goog.global.MessageChannel;
    if (void 0 === e && "undefined" != typeof window && window.postMessage && window.addEventListener && !goog.labs.userAgent.engine.isPresto() && (e = function() {
            (n = document.createElement("IFRAME")).style.display = "none", n.src = "", document.documentElement.appendChild(n);
            var e = n.contentWindow;
            (n = e.document).open(), n.write(""), n.close();
            var o = "callImmediate" + Math.random(),
                t = "file:" == e.location.protocol ? "*" : e.location.protocol + "//" + e.location.host,
                n = goog.bind(function(e) {
                    "*" != t && e.origin != t || e.data != o || this.port1.onmessage()
                }, this);
            e.addEventListener("message", n, !1), this.port1 = {}, this.port2 = {
                postMessage: function() {
                    e.postMessage(o, t)
                }
            }
        }), void 0 !== e && !goog.labs.userAgent.browser.isIE()) {
        var o = new e,
            t = {},
            n = t;
        return o.port1.onmessage = function() {
                if (goog.isDef(t.next)) {
                    var e = (t = t.next).cb;
                    t.cb = null, e()
                }
            },
            function(e) {
                n.next = {
                    cb: e
                }, n = n.next, o.port2.postMessage(0)
            }
    }
    return "undefined" != typeof document && "onreadystatechange" in document.createElement("SCRIPT") ? function(e) {
        var o = document.createElement("SCRIPT");
        o.onreadystatechange = function() {
            o.onreadystatechange = null, o.parentNode.removeChild(o), o = null, e(), e = null
        }, document.documentElement.appendChild(o)
    } : function(e) {
        goog.global.setTimeout(e, 0)
    }
}, goog.async.nextTick.wrapCallback_ = goog.functions.identity, goog.debug.entryPointRegistry.register(function(e) {
    goog.async.nextTick.wrapCallback_ = e
}), goog.async.run = function(e, o) {
    goog.async.run.schedule_ || goog.async.run.initializeRunner_(), goog.async.run.workQueueScheduled_ || (goog.async.run.schedule_(), goog.async.run.workQueueScheduled_ = !0), goog.async.run.workQueue_.add(e, o)
}, goog.async.run.initializeRunner_ = function() {
    if (-1 != String(goog.global.Promise).indexOf("[native code]")) {
        var e = goog.global.Promise.resolve(void 0);
        goog.async.run.schedule_ = function() {
            e.then(goog.async.run.processWorkQueue)
        }
    } else goog.async.run.schedule_ = function() {
        goog.async.nextTick(goog.async.run.processWorkQueue)
    }
}, goog.async.run.forceNextTick = function(e) {
    goog.async.run.schedule_ = function() {
        goog.async.nextTick(goog.async.run.processWorkQueue), e && e(goog.async.run.processWorkQueue)
    }
}, goog.async.run.workQueueScheduled_ = !1, goog.async.run.workQueue_ = new goog.async.WorkQueue, goog.DEBUG && (goog.async.run.resetQueue = function() {
    goog.async.run.workQueueScheduled_ = !1, goog.async.run.workQueue_ = new goog.async.WorkQueue
}), goog.async.run.processWorkQueue = function() {
    for (var e; e = goog.async.run.workQueue_.remove();) {
        try {
            e.fn.call(e.scope)
        } catch (e) {
            goog.async.throwException(e)
        }
        goog.async.run.workQueue_.returnUnused(e)
    }
    goog.async.run.workQueueScheduled_ = !1
}, goog.promise = {}, goog.promise.Resolver = function() {}, goog.Promise = function(e, o) {
    if (this.state_ = goog.Promise.State_.PENDING, this.result_ = void 0, this.callbackEntriesTail_ = this.callbackEntries_ = this.parent_ = null, this.executing_ = !1, 0 < goog.Promise.UNHANDLED_REJECTION_DELAY ? this.unhandledRejectionId_ = 0 : 0 == goog.Promise.UNHANDLED_REJECTION_DELAY && (this.hadUnhandledRejection_ = !1), goog.Promise.LONG_STACK_TRACES && (this.stack_ = [], this.addStackTrace_(Error("created")), this.currentStep_ = 0), e != goog.nullFunction) try {
        var t = this;
        e.call(o, function(e) {
            t.resolve_(goog.Promise.State_.FULFILLED, e)
        }, function(e) {
            if (goog.DEBUG && !(e instanceof goog.Promise.CancellationError)) try {
                if (e instanceof Error) throw e;
                throw Error("Promise rejected.")
            } catch (e) {}
            t.resolve_(goog.Promise.State_.REJECTED, e)
        })
    } catch (e) {
        this.resolve_(goog.Promise.State_.REJECTED, e)
    }
}, goog.Promise.LONG_STACK_TRACES = !1, goog.Promise.UNHANDLED_REJECTION_DELAY = 0, goog.Promise.State_ = {
    PENDING: 0,
    BLOCKED: 1,
    FULFILLED: 2,
    REJECTED: 3
}, goog.Promise.CallbackEntry_ = function() {
    this.next = this.context = this.onRejected = this.onFulfilled = this.child = null, this.always = !1
}, goog.Promise.CallbackEntry_.prototype.reset = function() {
    this.context = this.onRejected = this.onFulfilled = this.child = null, this.always = !1
}, goog.Promise.DEFAULT_MAX_UNUSED = 100, goog.Promise.freelist_ = new goog.async.FreeList(function() {
    return new goog.Promise.CallbackEntry_
}, function(e) {
    e.reset()
}, goog.Promise.DEFAULT_MAX_UNUSED), goog.Promise.getCallbackEntry_ = function(e, o, t) {
    var n = goog.Promise.freelist_.get();
    return n.onFulfilled = e, n.onRejected = o, n.context = t, n
}, goog.Promise.returnEntry_ = function(e) {
    goog.Promise.freelist_.put(e)
}, goog.Promise.resolve = function(e) {
    if (e instanceof goog.Promise) return e;
    var o = new goog.Promise(goog.nullFunction);
    return o.resolve_(goog.Promise.State_.FULFILLED, e), o
}, goog.Promise.reject = function(e) {
    return new goog.Promise(function(o, t) {
        t(e)
    })
}, goog.Promise.resolveThen_ = function(e, o, t) {
    goog.Promise.maybeThen_(e, o, t, null) || goog.async.run(goog.partial(o, e))
}, goog.Promise.race = function(e) {
    return new goog.Promise(function(o, t) {
        e.length || o(void 0);
        for (var n, r = 0; r < e.length; r++) n = e[r], goog.Promise.resolveThen_(n, o, t)
    })
}, goog.Promise.all = function(e) {
    return new goog.Promise(function(o, t) {
        var n = e.length,
            r = [];
        if (n)
            for (var i, s = function(e, t) {
                    n--, r[e] = t, 0 == n && o(r)
                }, l = function(e) {
                    t(e)
                }, g = 0; g < e.length; g++) i = e[g], goog.Promise.resolveThen_(i, goog.partial(s, g), l);
        else o(r)
    })
}, goog.Promise.allSettled = function(e) {
    return new goog.Promise(function(o, t) {
        var n = e.length,
            r = [];
        if (n)
            for (var i, s = function(e, t, i) {
                    n--, r[e] = t ? {
                        fulfilled: !0,
                        value: i
                    } : {
                        fulfilled: !1,
                        reason: i
                    }, 0 == n && o(r)
                }, l = 0; l < e.length; l++) i = e[l], goog.Promise.resolveThen_(i, goog.partial(s, l, !0), goog.partial(s, l, !1));
        else o(r)
    })
}, goog.Promise.firstFulfilled = function(e) {
    return new goog.Promise(function(o, t) {
        var n = e.length,
            r = [];
        if (n)
            for (var i, s = function(e) {
                    o(e)
                }, l = function(e, o) {
                    n--, r[e] = o, 0 == n && t(r)
                }, g = 0; g < e.length; g++) i = e[g], goog.Promise.resolveThen_(i, s, goog.partial(l, g));
        else o(void 0)
    })
}, goog.Promise.withResolver = function() {
    var e, o, t = new goog.Promise(function(t, n) {
        e = t, o = n
    });
    return new goog.Promise.Resolver_(t, e, o)
}, goog.Promise.prototype.then = function(e, o, t) {
    return null != e && goog.asserts.assertFunction(e, "opt_onFulfilled should be a function."), null != o && goog.asserts.assertFunction(o, "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?"), goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(Error("then")), this.addChildPromise_(goog.isFunction(e) ? e : null, goog.isFunction(o) ? o : null, t)
}, goog.Thenable.addImplementation(goog.Promise), goog.Promise.prototype.thenVoid = function(e, o, t) {
    null != e && goog.asserts.assertFunction(e, "opt_onFulfilled should be a function."), null != o && goog.asserts.assertFunction(o, "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?"), goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(Error("then")), this.addCallbackEntry_(goog.Promise.getCallbackEntry_(e || goog.nullFunction, o || null, t))
}, goog.Promise.prototype.thenAlways = function(e, o) {
    goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(Error("thenAlways"));
    var t = goog.Promise.getCallbackEntry_(e, e, o);
    return t.always = !0, this.addCallbackEntry_(t), this
}, goog.Promise.prototype.thenCatch = function(e, o) {
    return goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(Error("thenCatch")), this.addChildPromise_(null, e, o)
}, goog.Promise.prototype.cancel = function(e) {
    this.state_ == goog.Promise.State_.PENDING && goog.async.run(function() {
        var o = new goog.Promise.CancellationError(e);
        this.cancelInternal_(o)
    }, this)
}, goog.Promise.prototype.cancelInternal_ = function(e) {
    this.state_ == goog.Promise.State_.PENDING && (this.parent_ ? (this.parent_.cancelChild_(this, e), this.parent_ = null) : this.resolve_(goog.Promise.State_.REJECTED, e))
}, goog.Promise.prototype.cancelChild_ = function(e, o) {
    if (this.callbackEntries_) {
        for (var t = 0, n = null, r = null, i = this.callbackEntries_; i && (i.always || (t++, i.child == e && (n = i), !(n && 1 < t))); i = i.next) n || (r = i);
        n && (this.state_ == goog.Promise.State_.PENDING && 1 == t ? this.cancelInternal_(o) : (r ? this.removeEntryAfter_(r) : this.popEntry_(), this.executeCallback_(n, goog.Promise.State_.REJECTED, o)))
    }
}, goog.Promise.prototype.addCallbackEntry_ = function(e) {
    this.hasEntry_() || this.state_ != goog.Promise.State_.FULFILLED && this.state_ != goog.Promise.State_.REJECTED || this.scheduleCallbacks_(), this.queueEntry_(e)
}, goog.Promise.prototype.addChildPromise_ = function(e, o, t) {
    var n = goog.Promise.getCallbackEntry_(null, null, null);
    return n.child = new goog.Promise(function(r, i) {
        n.onFulfilled = e ? function(o) {
            try {
                var n = e.call(t, o);
                r(n)
            } catch (e) {
                i(e)
            }
        } : r, n.onRejected = o ? function(e) {
            try {
                var n = o.call(t, e);
                !goog.isDef(n) && e instanceof goog.Promise.CancellationError ? i(e) : r(n)
            } catch (e) {
                i(e)
            }
        } : i
    }), n.child.parent_ = this, this.addCallbackEntry_(n), n.child
}, goog.Promise.prototype.unblockAndFulfill_ = function(e) {
    goog.asserts.assert(this.state_ == goog.Promise.State_.BLOCKED), this.state_ = goog.Promise.State_.PENDING, this.resolve_(goog.Promise.State_.FULFILLED, e)
}, goog.Promise.prototype.unblockAndReject_ = function(e) {
    goog.asserts.assert(this.state_ == goog.Promise.State_.BLOCKED), this.state_ = goog.Promise.State_.PENDING, this.resolve_(goog.Promise.State_.REJECTED, e)
}, goog.Promise.prototype.resolve_ = function(e, o) {
    this.state_ == goog.Promise.State_.PENDING && (this === o && (e = goog.Promise.State_.REJECTED, o = new TypeError("Promise cannot resolve to itself")), this.state_ = goog.Promise.State_.BLOCKED, goog.Promise.maybeThen_(o, this.unblockAndFulfill_, this.unblockAndReject_, this) || (this.result_ = o, this.state_ = e, this.parent_ = null, this.scheduleCallbacks_(), e != goog.Promise.State_.REJECTED || o instanceof goog.Promise.CancellationError || goog.Promise.addUnhandledRejection_(this, o)))
}, goog.Promise.maybeThen_ = function(e, o, t, n) {
    if (e instanceof goog.Promise) return e.thenVoid(o, t, n), !0;
    if (goog.Thenable.isImplementedBy(e)) return e.then(o, t, n), !0;
    if (goog.isObject(e)) try {
        var r = e.then;
        if (goog.isFunction(r)) return goog.Promise.tryThen_(e, r, o, t, n), !0
    } catch (e) {
        return t.call(n, e), !0
    }
    return !1
}, goog.Promise.tryThen_ = function(e, o, t, n, r) {
    var i = !1,
        s = function(e) {
            i || (i = !0, t.call(r, e))
        },
        l = function(e) {
            i || (i = !0, n.call(r, e))
        };
    try {
        o.call(e, s, l)
    } catch (e) {
        l(e)
    }
}, goog.Promise.prototype.scheduleCallbacks_ = function() {
    this.executing_ || (this.executing_ = !0, goog.async.run(this.executeCallbacks_, this))
}, goog.Promise.prototype.hasEntry_ = function() {
    return !!this.callbackEntries_
}, goog.Promise.prototype.queueEntry_ = function(e) {
    goog.asserts.assert(null != e.onFulfilled), this.callbackEntriesTail_ ? this.callbackEntriesTail_.next = e : this.callbackEntries_ = e, this.callbackEntriesTail_ = e
}, goog.Promise.prototype.popEntry_ = function() {
    var e = null;
    return this.callbackEntries_ && (e = this.callbackEntries_, this.callbackEntries_ = e.next, e.next = null), this.callbackEntries_ || (this.callbackEntriesTail_ = null), null != e && goog.asserts.assert(null != e.onFulfilled), e
}, goog.Promise.prototype.removeEntryAfter_ = function(e) {
    goog.asserts.assert(this.callbackEntries_), goog.asserts.assert(null != e), e.next == this.callbackEntriesTail_ && (this.callbackEntriesTail_ = e), e.next = e.next.next
}, goog.Promise.prototype.executeCallbacks_ = function() {
    for (var e; e = this.popEntry_();) goog.Promise.LONG_STACK_TRACES && this.currentStep_++, this.executeCallback_(e, this.state_, this.result_);
    this.executing_ = !1
}, goog.Promise.prototype.executeCallback_ = function(e, o, t) {
    if (o == goog.Promise.State_.REJECTED && e.onRejected && !e.always && this.removeUnhandledRejection_(), e.child) e.child.parent_ = null, goog.Promise.invokeCallback_(e, o, t);
    else try {
        e.always ? e.onFulfilled.call(e.context) : goog.Promise.invokeCallback_(e, o, t)
    } catch (e) {
        goog.Promise.handleRejection_.call(null, e)
    }
    goog.Promise.returnEntry_(e)
}, goog.Promise.invokeCallback_ = function(e, o, t) {
    o == goog.Promise.State_.FULFILLED ? e.onFulfilled.call(e.context, t) : e.onRejected && e.onRejected.call(e.context, t)
}, goog.Promise.prototype.addStackTrace_ = function(e) {
    if (goog.Promise.LONG_STACK_TRACES && goog.isString(e.stack)) {
        var o = e.stack.split("\n", 4)[3];
        e = e.message, e += Array(11 - e.length).join(" "), this.stack_.push(e + o)
    }
}, goog.Promise.prototype.appendLongStack_ = function(e) {
    if (goog.Promise.LONG_STACK_TRACES && e && goog.isString(e.stack) && this.stack_.length) {
        for (var o = ["Promise trace:"], t = this; t; t = t.parent_) {
            for (var n = this.currentStep_; 0 <= n; n--) o.push(t.stack_[n]);
            o.push("Value: [" + (t.state_ == goog.Promise.State_.REJECTED ? "REJECTED" : "FULFILLED") + "] <" + String(t.result_) + ">")
        }
        e.stack += "\n\n" + o.join("\n")
    }
}, goog.Promise.prototype.removeUnhandledRejection_ = function() {
    if (0 < goog.Promise.UNHANDLED_REJECTION_DELAY)
        for (var e = this; e && e.unhandledRejectionId_; e = e.parent_) goog.global.clearTimeout(e.unhandledRejectionId_), e.unhandledRejectionId_ = 0;
    else if (0 == goog.Promise.UNHANDLED_REJECTION_DELAY)
        for (e = this; e && e.hadUnhandledRejection_; e = e.parent_) e.hadUnhandledRejection_ = !1
}, goog.Promise.addUnhandledRejection_ = function(e, o) {
    0 < goog.Promise.UNHANDLED_REJECTION_DELAY ? e.unhandledRejectionId_ = goog.global.setTimeout(function() {
        e.appendLongStack_(o), goog.Promise.handleRejection_.call(null, o)
    }, goog.Promise.UNHANDLED_REJECTION_DELAY) : 0 == goog.Promise.UNHANDLED_REJECTION_DELAY && (e.hadUnhandledRejection_ = !0, goog.async.run(function() {
        e.hadUnhandledRejection_ && (e.appendLongStack_(o), goog.Promise.handleRejection_.call(null, o))
    }))
}, goog.Promise.handleRejection_ = goog.async.throwException, goog.Promise.setUnhandledRejectionHandler = function(e) {
    goog.Promise.handleRejection_ = e
}, goog.Promise.CancellationError = function(e) {
    goog.debug.Error.call(this, e)
}, goog.inherits(goog.Promise.CancellationError, goog.debug.Error), goog.Promise.CancellationError.prototype.name = "cancel", goog.Promise.Resolver_ = function(e, o, t) {
    this.promise = e, this.resolve = o, this.reject = t
}, goog.events.EventTarget = function() {
    goog.Disposable.call(this), this.eventTargetListeners_ = new goog.events.ListenerMap(this), this.actualEventTarget_ = this, this.parentEventTarget_ = null
}, goog.inherits(goog.events.EventTarget, goog.Disposable), goog.events.Listenable.addImplementation(goog.events.EventTarget), goog.events.EventTarget.MAX_ANCESTORS_ = 1e3, goog.events.EventTarget.prototype.getParentEventTarget = function() {
    return this.parentEventTarget_
}, goog.events.EventTarget.prototype.setParentEventTarget = function(e) {
    this.parentEventTarget_ = e
}, goog.events.EventTarget.prototype.addEventListener = function(e, o, t, n) {
    goog.events.listen(this, e, o, t, n)
}, goog.events.EventTarget.prototype.removeEventListener = function(e, o, t, n) {
    goog.events.unlisten(this, e, o, t, n)
}, goog.events.EventTarget.prototype.dispatchEvent = function(e) {
    this.assertInitialized_();
    var o = this.getParentEventTarget();
    if (o)
        for (var t = [], n = 1; o; o = o.getParentEventTarget()) t.push(o), goog.asserts.assert(++n < goog.events.EventTarget.MAX_ANCESTORS_, "infinite loop");
    return goog.events.EventTarget.dispatchEventInternal_(this.actualEventTarget_, e, t)
}, goog.events.EventTarget.prototype.disposeInternal = function() {
    goog.events.EventTarget.superClass_.disposeInternal.call(this), this.removeAllListeners(), this.parentEventTarget_ = null
}, goog.events.EventTarget.prototype.listen = function(e, o, t, n) {
    return this.assertInitialized_(), this.eventTargetListeners_.add(String(e), o, !1, t, n)
}, goog.events.EventTarget.prototype.listenOnce = function(e, o, t, n) {
    return this.eventTargetListeners_.add(String(e), o, !0, t, n)
}, goog.events.EventTarget.prototype.unlisten = function(e, o, t, n) {
    return this.eventTargetListeners_.remove(String(e), o, t, n)
}, goog.events.EventTarget.prototype.unlistenByKey = function(e) {
    return this.eventTargetListeners_.removeByKey(e)
}, goog.events.EventTarget.prototype.removeAllListeners = function(e) {
    return this.eventTargetListeners_ ? this.eventTargetListeners_.removeAll(e) : 0
}, goog.events.EventTarget.prototype.fireListeners = function(e, o, t) {
    if (!(e = this.eventTargetListeners_.listeners[String(e)])) return !0;
    e = e.concat();
    for (var n = !0, r = 0; r < e.length; ++r) {
        var i = e[r];
        if (i && !i.removed && i.capture == o) {
            var s = i.listener,
                l = i.handler || i.src;
            i.callOnce && this.unlistenByKey(i), n = !1 !== s.call(l, t) && n
        }
    }
    return n && 0 != t.returnValue_
}, goog.events.EventTarget.prototype.getListeners = function(e, o) {
    return this.eventTargetListeners_.getListeners(String(e), o)
}, goog.events.EventTarget.prototype.getListener = function(e, o, t, n) {
    return this.eventTargetListeners_.getListener(String(e), o, t, n)
}, goog.events.EventTarget.prototype.hasListener = function(e, o) {
    var t = goog.isDef(e) ? String(e) : void 0;
    return this.eventTargetListeners_.hasListener(t, o)
}, goog.events.EventTarget.prototype.setTargetForTesting = function(e) {
    this.actualEventTarget_ = e
}, goog.events.EventTarget.prototype.assertInitialized_ = function() {
    goog.asserts.assert(this.eventTargetListeners_, "Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")
}, goog.events.EventTarget.dispatchEventInternal_ = function(e, o, t) {
    var n = o.type || o;
    if (goog.isString(o)) o = new goog.events.Event(o, e);
    else if (o instanceof goog.events.Event) o.target = o.target || e;
    else {
        r = o;
        o = new goog.events.Event(n, e), goog.object.extend(o, r)
    }
    var r = !0;
    if (t)
        for (var i = t.length - 1; !o.propagationStopped_ && 0 <= i; i--) {
            var s = o.currentTarget = t[i];
            r = s.fireListeners(n, !0, o) && r
        }
    if (o.propagationStopped_ || (s = o.currentTarget = e, r = s.fireListeners(n, !0, o) && r, o.propagationStopped_ || (r = s.fireListeners(n, !1, o) && r)), t)
        for (i = 0; !o.propagationStopped_ && i < t.length; i++) s = o.currentTarget = t[i], r = s.fireListeners(n, !1, o) && r;
    return r
}, goog.Timer = function(e, o) {
    goog.events.EventTarget.call(this), this.interval_ = e || 1, this.timerObject_ = o || goog.Timer.defaultTimerObject, this.boundTick_ = goog.bind(this.tick_, this), this.last_ = goog.now()
}, goog.inherits(goog.Timer, goog.events.EventTarget), goog.Timer.MAX_TIMEOUT_ = 2147483647, goog.Timer.INVALID_TIMEOUT_ID_ = -1, goog.Timer.prototype.enabled = !1, goog.Timer.defaultTimerObject = goog.global, goog.Timer.intervalScale = .8, goog.Timer.prototype.timer_ = null, goog.Timer.prototype.getInterval = function() {
    return this.interval_
}, goog.Timer.prototype.setInterval = function(e) {
    this.interval_ = e, this.timer_ && this.enabled ? (this.stop(), this.start()) : this.timer_ && this.stop()
}, goog.Timer.prototype.tick_ = function() {
    if (this.enabled) {
        var e = goog.now() - this.last_;
        0 < e && e < this.interval_ * goog.Timer.intervalScale ? this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_ - e) : (this.timer_ && (this.timerObject_.clearTimeout(this.timer_), this.timer_ = null), this.dispatchTick(), this.enabled && (this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_), this.last_ = goog.now()))
    }
}, goog.Timer.prototype.dispatchTick = function() {
    this.dispatchEvent(goog.Timer.TICK)
}, goog.Timer.prototype.start = function() {
    this.enabled = !0, this.timer_ || (this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_), this.last_ = goog.now())
}, goog.Timer.prototype.stop = function() {
    this.enabled = !1, this.timer_ && (this.timerObject_.clearTimeout(this.timer_), this.timer_ = null)
}, goog.Timer.prototype.disposeInternal = function() {
    goog.Timer.superClass_.disposeInternal.call(this), this.stop(), delete this.timerObject_
}, goog.Timer.TICK = "tick", goog.Timer.callOnce = function(e, o, t) {
    if (goog.isFunction(e)) t && (e = goog.bind(e, t));
    else {
        if (!e || "function" != typeof e.handleEvent) throw Error("Invalid listener argument");
        e = goog.bind(e.handleEvent, e)
    }
    return Number(o) > goog.Timer.MAX_TIMEOUT_ ? goog.Timer.INVALID_TIMEOUT_ID_ : goog.Timer.defaultTimerObject.setTimeout(e, o || 0)
}, goog.Timer.clear = function(e) {
    goog.Timer.defaultTimerObject.clearTimeout(e)
}, goog.Timer.promise = function(e, o) {
    var t = null;
    return new goog.Promise(function(n, r) {
        (t = goog.Timer.callOnce(function() {
            n(o)
        }, e)) == goog.Timer.INVALID_TIMEOUT_ID_ && r(Error("Failed to schedule timer."))
    }).thenCatch(function(e) {
        throw goog.Timer.clear(t), e
    })
}, goog.events.EventHandler = function(e) {
    goog.Disposable.call(this), this.handler_ = e, this.keys_ = {}
}, goog.inherits(goog.events.EventHandler, goog.Disposable), goog.events.EventHandler.typeArray_ = [], goog.events.EventHandler.prototype.listen = function(e, o, t, n) {
    return this.listen_(e, o, t, n)
}, goog.events.EventHandler.prototype.listenWithScope = function(e, o, t, n, r) {
    return this.listen_(e, o, t, n, r)
}, goog.events.EventHandler.prototype.listen_ = function(e, o, t, n, r) {
    goog.isArray(o) || (o && (goog.events.EventHandler.typeArray_[0] = o.toString()), o = goog.events.EventHandler.typeArray_);
    for (var i = 0; i < o.length; i++) {
        var s = goog.events.listen(e, o[i], t || this.handleEvent, n || !1, r || this.handler_ || this);
        if (!s) break;
        this.keys_[s.key] = s
    }
    return this
}, goog.events.EventHandler.prototype.listenOnce = function(e, o, t, n) {
    return this.listenOnce_(e, o, t, n)
}, goog.events.EventHandler.prototype.listenOnceWithScope = function(e, o, t, n, r) {
    return this.listenOnce_(e, o, t, n, r)
}, goog.events.EventHandler.prototype.listenOnce_ = function(e, o, t, n, r) {
    if (goog.isArray(o))
        for (var i = 0; i < o.length; i++) this.listenOnce_(e, o[i], t, n, r);
    else {
        if (!(e = goog.events.listenOnce(e, o, t || this.handleEvent, n, r || this.handler_ || this))) return this;
        this.keys_[e.key] = e
    }
    return this
}, goog.events.EventHandler.prototype.listenWithWrapper = function(e, o, t, n) {
    return this.listenWithWrapper_(e, o, t, n)
}, goog.events.EventHandler.prototype.listenWithWrapperAndScope = function(e, o, t, n, r) {
    return this.listenWithWrapper_(e, o, t, n, r)
}, goog.events.EventHandler.prototype.listenWithWrapper_ = function(e, o, t, n, r) {
    return o.listen(e, t, n, r || this.handler_ || this, this), this
}, goog.events.EventHandler.prototype.getListenerCount = function() {
    var e, o = 0;
    for (e in this.keys_) Object.prototype.hasOwnProperty.call(this.keys_, e) && o++;
    return o
}, goog.events.EventHandler.prototype.unlisten = function(e, o, t, n, r) {
    if (goog.isArray(o))
        for (var i = 0; i < o.length; i++) this.unlisten(e, o[i], t, n, r);
    else(e = goog.events.getListener(e, o, t || this.handleEvent, n, r || this.handler_ || this)) && (goog.events.unlistenByKey(e), delete this.keys_[e.key]);
    return this
}, goog.events.EventHandler.prototype.unlistenWithWrapper = function(e, o, t, n, r) {
    return o.unlisten(e, t, n, r || this.handler_ || this, this), this
}, goog.events.EventHandler.prototype.removeAll = function() {
    goog.object.forEach(this.keys_, function(e, o) {
        this.keys_.hasOwnProperty(o) && goog.events.unlistenByKey(e)
    }, this), this.keys_ = {}
}, goog.events.EventHandler.prototype.disposeInternal = function() {
    goog.events.EventHandler.superClass_.disposeInternal.call(this), this.removeAll()
}, goog.events.EventHandler.prototype.handleEvent = function(e) {
    throw Error("EventHandler.handleEvent not implemented")
}, goog.ui = {}, goog.ui.IdGenerator = function() {}, goog.addSingletonGetter(goog.ui.IdGenerator), goog.ui.IdGenerator.prototype.nextId_ = 0, goog.ui.IdGenerator.prototype.getNextUniqueId = function() {
    return ":" + (this.nextId_++).toString(36)
}, goog.ui.Component = function(e) {
    goog.events.EventTarget.call(this), this.dom_ = e || goog.dom.getDomHelper(), this.rightToLeft_ = goog.ui.Component.defaultRightToLeft_, this.id_ = null, this.inDocument_ = !1, this.element_ = null, this.googUiComponentHandler_ = void 0, this.childIndex_ = this.children_ = this.parent_ = this.model_ = null, this.wasDecorated_ = !1
}, goog.inherits(goog.ui.Component, goog.events.EventTarget), goog.ui.Component.ALLOW_DETACHED_DECORATION = !1, goog.ui.Component.prototype.idGenerator_ = goog.ui.IdGenerator.getInstance(), goog.ui.Component.DEFAULT_BIDI_DIR = 0, goog.ui.Component.defaultRightToLeft_ = 1 != goog.ui.Component.DEFAULT_BIDI_DIR && (-1 == goog.ui.Component.DEFAULT_BIDI_DIR || null), goog.ui.Component.EventType = {
    BEFORE_SHOW: "beforeshow",
    SHOW: "show",
    HIDE: "hide",
    DISABLE: "disable",
    ENABLE: "enable",
    HIGHLIGHT: "highlight",
    UNHIGHLIGHT: "unhighlight",
    ACTIVATE: "activate",
    DEACTIVATE: "deactivate",
    SELECT: "select",
    UNSELECT: "unselect",
    CHECK: "check",
    UNCHECK: "uncheck",
    FOCUS: "focus",
    BLUR: "blur",
    OPEN: "open",
    CLOSE: "close",
    ENTER: "enter",
    LEAVE: "leave",
    ACTION: "action",
    CHANGE: "change"
}, goog.ui.Component.Error = {
    NOT_SUPPORTED: "Method not supported",
    DECORATE_INVALID: "Invalid element to decorate",
    ALREADY_RENDERED: "Component already rendered",
    PARENT_UNABLE_TO_BE_SET: "Unable to set parent component",
    CHILD_INDEX_OUT_OF_BOUNDS: "Child component index out of bounds",
    NOT_OUR_CHILD: "Child is not in parent component",
    NOT_IN_DOCUMENT: "Operation not supported while component is not in document",
    STATE_INVALID: "Invalid component state"
}, goog.ui.Component.State = {
    ALL: 255,
    DISABLED: 1,
    HOVER: 2,
    ACTIVE: 4,
    SELECTED: 8,
    CHECKED: 16,
    FOCUSED: 32,
    OPENED: 64
}, goog.ui.Component.getStateTransitionEvent = function(e, o) {
    switch (e) {
        case goog.ui.Component.State.DISABLED:
            return o ? goog.ui.Component.EventType.DISABLE : goog.ui.Component.EventType.ENABLE;
        case goog.ui.Component.State.HOVER:
            return o ? goog.ui.Component.EventType.HIGHLIGHT : goog.ui.Component.EventType.UNHIGHLIGHT;
        case goog.ui.Component.State.ACTIVE:
            return o ? goog.ui.Component.EventType.ACTIVATE : goog.ui.Component.EventType.DEACTIVATE;
        case goog.ui.Component.State.SELECTED:
            return o ? goog.ui.Component.EventType.SELECT : goog.ui.Component.EventType.UNSELECT;
        case goog.ui.Component.State.CHECKED:
            return o ? goog.ui.Component.EventType.CHECK : goog.ui.Component.EventType.UNCHECK;
        case goog.ui.Component.State.FOCUSED:
            return o ? goog.ui.Component.EventType.FOCUS : goog.ui.Component.EventType.BLUR;
        case goog.ui.Component.State.OPENED:
            return o ? goog.ui.Component.EventType.OPEN : goog.ui.Component.EventType.CLOSE
    }
    throw Error(goog.ui.Component.Error.STATE_INVALID)
}, goog.ui.Component.setDefaultRightToLeft = function(e) {
    goog.ui.Component.defaultRightToLeft_ = e
}, goog.ui.Component.prototype.getId = function() {
    return this.id_ || (this.id_ = this.idGenerator_.getNextUniqueId())
}, goog.ui.Component.prototype.setId = function(e) {
    this.parent_ && this.parent_.childIndex_ && (goog.object.remove(this.parent_.childIndex_, this.id_), goog.object.add(this.parent_.childIndex_, e, this)), this.id_ = e
}, goog.ui.Component.prototype.getElement = function() {
    return this.element_
}, goog.ui.Component.prototype.getElementStrict = function() {
    var e = this.element_;
    return goog.asserts.assert(e, "Can not call getElementStrict before rendering/decorating."), e
}, goog.ui.Component.prototype.setElementInternal = function(e) {
    this.element_ = e
}, goog.ui.Component.prototype.getElementsByClass = function(e) {
    return this.element_ ? this.dom_.getElementsByClass(e, this.element_) : []
}, goog.ui.Component.prototype.getElementByClass = function(e) {
    return this.element_ ? this.dom_.getElementByClass(e, this.element_) : null
}, goog.ui.Component.prototype.getRequiredElementByClass = function(e) {
    var o = this.getElementByClass(e);
    return goog.asserts.assert(o, "Expected element in component with class: %s", e), o
}, goog.ui.Component.prototype.getHandler = function() {
    return this.googUiComponentHandler_ || (this.googUiComponentHandler_ = new goog.events.EventHandler(this)), this.googUiComponentHandler_
}, goog.ui.Component.prototype.setParent = function(e) {
    if (this == e) throw Error(goog.ui.Component.Error.PARENT_UNABLE_TO_BE_SET);
    if (e && this.parent_ && this.id_ && this.parent_.getChild(this.id_) && this.parent_ != e) throw Error(goog.ui.Component.Error.PARENT_UNABLE_TO_BE_SET);
    this.parent_ = e, goog.ui.Component.superClass_.setParentEventTarget.call(this, e)
}, goog.ui.Component.prototype.getParent = function() {
    return this.parent_
}, goog.ui.Component.prototype.setParentEventTarget = function(e) {
    if (this.parent_ && this.parent_ != e) throw Error(goog.ui.Component.Error.NOT_SUPPORTED);
    goog.ui.Component.superClass_.setParentEventTarget.call(this, e)
}, goog.ui.Component.prototype.getDomHelper = function() {
    return this.dom_
}, goog.ui.Component.prototype.isInDocument = function() {
    return this.inDocument_
}, goog.ui.Component.prototype.createDom = function() {
    this.element_ = this.dom_.createElement("DIV")
}, goog.ui.Component.prototype.render = function(e) {
    this.render_(e)
}, goog.ui.Component.prototype.renderBefore = function(e) {
    this.render_(e.parentNode, e)
}, goog.ui.Component.prototype.render_ = function(e, o) {
    if (this.inDocument_) throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
    this.element_ || this.createDom(), e ? e.insertBefore(this.element_, o || null) : this.dom_.getDocument().body.appendChild(this.element_), this.parent_ && !this.parent_.isInDocument() || this.enterDocument()
}, goog.ui.Component.prototype.decorate = function(e) {
    if (this.inDocument_) throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
    if (!e || !this.canDecorate(e)) throw Error(goog.ui.Component.Error.DECORATE_INVALID);
    this.wasDecorated_ = !0;
    var o = goog.dom.getOwnerDocument(e);
    this.dom_ && this.dom_.getDocument() == o || (this.dom_ = goog.dom.getDomHelper(e)), this.decorateInternal(e), goog.ui.Component.ALLOW_DETACHED_DECORATION && !goog.dom.contains(o, e) || this.enterDocument()
}, goog.ui.Component.prototype.canDecorate = function(e) {
    return !0
}, goog.ui.Component.prototype.wasDecorated = function() {
    return this.wasDecorated_
}, goog.ui.Component.prototype.decorateInternal = function(e) {
    this.element_ = e
}, goog.ui.Component.prototype.enterDocument = function() {
    this.inDocument_ = !0, this.forEachChild(function(e) {
        !e.isInDocument() && e.getElement() && e.enterDocument()
    })
}, goog.ui.Component.prototype.exitDocument = function() {
    this.forEachChild(function(e) {
        e.isInDocument() && e.exitDocument()
    }), this.googUiComponentHandler_ && this.googUiComponentHandler_.removeAll(), this.inDocument_ = !1
}, goog.ui.Component.prototype.disposeInternal = function() {
    this.inDocument_ && this.exitDocument(), this.googUiComponentHandler_ && (this.googUiComponentHandler_.dispose(), delete this.googUiComponentHandler_), this.forEachChild(function(e) {
        e.dispose()
    }), !this.wasDecorated_ && this.element_ && goog.dom.removeNode(this.element_), this.parent_ = this.model_ = this.element_ = this.childIndex_ = this.children_ = null, goog.ui.Component.superClass_.disposeInternal.call(this)
}, goog.ui.Component.prototype.makeId = function(e) {
    return this.getId() + "." + e
}, goog.ui.Component.prototype.makeIds = function(e) {
    var o, t = {};
    for (o in e) t[o] = this.makeId(e[o]);
    return t
}, goog.ui.Component.prototype.getModel = function() {
    return this.model_
}, goog.ui.Component.prototype.setModel = function(e) {
    this.model_ = e
}, goog.ui.Component.prototype.getFragmentFromId = function(e) {
    return e.substring(this.getId().length + 1)
}, goog.ui.Component.prototype.getElementByFragment = function(e) {
    if (!this.inDocument_) throw Error(goog.ui.Component.Error.NOT_IN_DOCUMENT);
    return this.dom_.getElement(this.makeId(e))
}, goog.ui.Component.prototype.addChild = function(e, o) {
    this.addChildAt(e, this.getChildCount(), o)
}, goog.ui.Component.prototype.addChildAt = function(e, o, t) {
    if (goog.asserts.assert(!!e, "Provided element must not be null."), e.inDocument_ && (t || !this.inDocument_)) throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
    if (0 > o || o > this.getChildCount()) throw Error(goog.ui.Component.Error.CHILD_INDEX_OUT_OF_BOUNDS);
    this.childIndex_ && this.children_ || (this.childIndex_ = {}, this.children_ = []), e.getParent() == this ? (goog.object.set(this.childIndex_, e.getId(), e), goog.array.remove(this.children_, e)) : goog.object.add(this.childIndex_, e.getId(), e), e.setParent(this), goog.array.insertAt(this.children_, e, o), e.inDocument_ && this.inDocument_ && e.getParent() == this ? (t = this.getContentElement(), (o = t.childNodes[o] || null) != e.getElement() && t.insertBefore(e.getElement(), o)) : t ? (this.element_ || this.createDom(), o = this.getChildAt(o + 1), e.render_(this.getContentElement(), o ? o.element_ : null)) : this.inDocument_ && !e.inDocument_ && e.element_ && e.element_.parentNode && e.element_.parentNode.nodeType == goog.dom.NodeType.ELEMENT && e.enterDocument()
}, goog.ui.Component.prototype.getContentElement = function() {
    return this.element_
}, goog.ui.Component.prototype.isRightToLeft = function() {
    return null == this.rightToLeft_ && (this.rightToLeft_ = goog.style.isRightToLeft(this.inDocument_ ? this.element_ : this.dom_.getDocument().body)), this.rightToLeft_
}, goog.ui.Component.prototype.setRightToLeft = function(e) {
    if (this.inDocument_) throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
    this.rightToLeft_ = e
}, goog.ui.Component.prototype.hasChildren = function() {
    return !!this.children_ && 0 != this.children_.length
}, goog.ui.Component.prototype.getChildCount = function() {
    return this.children_ ? this.children_.length : 0
}, goog.ui.Component.prototype.getChildIds = function() {
    var e = [];
    return this.forEachChild(function(o) {
        e.push(o.getId())
    }), e
}, goog.ui.Component.prototype.getChild = function(e) {
    return this.childIndex_ && e ? goog.object.get(this.childIndex_, e) || null : null
}, goog.ui.Component.prototype.getChildAt = function(e) {
    return this.children_ ? this.children_[e] || null : null
}, goog.ui.Component.prototype.forEachChild = function(e, o) {
    this.children_ && goog.array.forEach(this.children_, e, o)
}, goog.ui.Component.prototype.indexOfChild = function(e) {
    return this.children_ && e ? goog.array.indexOf(this.children_, e) : -1
}, goog.ui.Component.prototype.removeChild = function(e, o) {
    if (e) {
        var t = goog.isString(e) ? e : e.getId();
        e = this.getChild(t), t && e && (goog.object.remove(this.childIndex_, t), goog.array.remove(this.children_, e), o && (e.exitDocument(), e.element_ && goog.dom.removeNode(e.element_)), e.setParent(null))
    }
    if (!e) throw Error(goog.ui.Component.Error.NOT_OUR_CHILD);
    return e
}, goog.ui.Component.prototype.removeChildAt = function(e, o) {
    return this.removeChild(this.getChildAt(e), o)
}, goog.ui.Component.prototype.removeChildren = function(e) {
    for (var o = []; this.hasChildren();) o.push(this.removeChildAt(0, e));
    return o
}, goog.a11y = {}, goog.a11y.aria = {}, goog.a11y.aria.Role = {
    ALERT: "alert",
    ALERTDIALOG: "alertdialog",
    APPLICATION: "application",
    ARTICLE: "article",
    BANNER: "banner",
    BUTTON: "button",
    CHECKBOX: "checkbox",
    COLUMNHEADER: "columnheader",
    COMBOBOX: "combobox",
    COMPLEMENTARY: "complementary",
    CONTENTINFO: "contentinfo",
    DEFINITION: "definition",
    DIALOG: "dialog",
    DIRECTORY: "directory",
    DOCUMENT: "document",
    FORM: "form",
    GRID: "grid",
    GRIDCELL: "gridcell",
    GROUP: "group",
    HEADING: "heading",
    IMG: "img",
    LINK: "link",
    LIST: "list",
    LISTBOX: "listbox",
    LISTITEM: "listitem",
    LOG: "log",
    MAIN: "main",
    MARQUEE: "marquee",
    MATH: "math",
    MENU: "menu",
    MENUBAR: "menubar",
    MENU_ITEM: "menuitem",
    MENU_ITEM_CHECKBOX: "menuitemcheckbox",
    MENU_ITEM_RADIO: "menuitemradio",
    NAVIGATION: "navigation",
    NOTE: "note",
    OPTION: "option",
    PRESENTATION: "presentation",
    PROGRESSBAR: "progressbar",
    RADIO: "radio",
    RADIOGROUP: "radiogroup",
    REGION: "region",
    ROW: "row",
    ROWGROUP: "rowgroup",
    ROWHEADER: "rowheader",
    SCROLLBAR: "scrollbar",
    SEARCH: "search",
    SEPARATOR: "separator",
    SLIDER: "slider",
    SPINBUTTON: "spinbutton",
    STATUS: "status",
    TAB: "tab",
    TAB_LIST: "tablist",
    TAB_PANEL: "tabpanel",
    TEXTBOX: "textbox",
    TEXTINFO: "textinfo",
    TIMER: "timer",
    TOOLBAR: "toolbar",
    TOOLTIP: "tooltip",
    TREE: "tree",
    TREEGRID: "treegrid",
    TREEITEM: "treeitem"
}, goog.a11y.aria.State = {
    ACTIVEDESCENDANT: "activedescendant",
    ATOMIC: "atomic",
    AUTOCOMPLETE: "autocomplete",
    BUSY: "busy",
    CHECKED: "checked",
    CONTROLS: "controls",
    DESCRIBEDBY: "describedby",
    DISABLED: "disabled",
    DROPEFFECT: "dropeffect",
    EXPANDED: "expanded",
    FLOWTO: "flowto",
    GRABBED: "grabbed",
    HASPOPUP: "haspopup",
    HIDDEN: "hidden",
    INVALID: "invalid",
    LABEL: "label",
    LABELLEDBY: "labelledby",
    LEVEL: "level",
    LIVE: "live",
    MULTILINE: "multiline",
    MULTISELECTABLE: "multiselectable",
    ORIENTATION: "orientation",
    OWNS: "owns",
    POSINSET: "posinset",
    PRESSED: "pressed",
    READONLY: "readonly",
    RELEVANT: "relevant",
    REQUIRED: "required",
    SELECTED: "selected",
    SETSIZE: "setsize",
    SORT: "sort",
    VALUEMAX: "valuemax",
    VALUEMIN: "valuemin",
    VALUENOW: "valuenow",
    VALUETEXT: "valuetext"
}, goog.a11y.aria.AutoCompleteValues = {
    INLINE: "inline",
    LIST: "list",
    BOTH: "both",
    NONE: "none"
}, goog.a11y.aria.DropEffectValues = {
    COPY: "copy",
    MOVE: "move",
    LINK: "link",
    EXECUTE: "execute",
    POPUP: "popup",
    NONE: "none"
}, goog.a11y.aria.LivePriority = {
    OFF: "off",
    POLITE: "polite",
    ASSERTIVE: "assertive"
}, goog.a11y.aria.OrientationValues = {
    VERTICAL: "vertical",
    HORIZONTAL: "horizontal"
}, goog.a11y.aria.RelevantValues = {
    ADDITIONS: "additions",
    REMOVALS: "removals",
    TEXT: "text",
    ALL: "all"
}, goog.a11y.aria.SortValues = {
    ASCENDING: "ascending",
    DESCENDING: "descending",
    NONE: "none",
    OTHER: "other"
}, goog.a11y.aria.CheckedValues = {
    TRUE: "true",
    FALSE: "false",
    MIXED: "mixed",
    UNDEFINED: "undefined"
}, goog.a11y.aria.ExpandedValues = {
    TRUE: "true",
    FALSE: "false",
    UNDEFINED: "undefined"
}, goog.a11y.aria.GrabbedValues = {
    TRUE: "true",
    FALSE: "false",
    UNDEFINED: "undefined"
}, goog.a11y.aria.InvalidValues = {
    FALSE: "false",
    TRUE: "true",
    GRAMMAR: "grammar",
    SPELLING: "spelling"
}, goog.a11y.aria.PressedValues = {
    TRUE: "true",
    FALSE: "false",
    MIXED: "mixed",
    UNDEFINED: "undefined"
}, goog.a11y.aria.SelectedValues = {
    TRUE: "true",
    FALSE: "false",
    UNDEFINED: "undefined"
}, goog.a11y.aria.datatables = {}, goog.a11y.aria.datatables.getDefaultValuesMap = function() {
    return goog.a11y.aria.DefaultStateValueMap_ || (goog.a11y.aria.DefaultStateValueMap_ = goog.object.create(goog.a11y.aria.State.ATOMIC, !1, goog.a11y.aria.State.AUTOCOMPLETE, "none", goog.a11y.aria.State.DROPEFFECT, "none", goog.a11y.aria.State.HASPOPUP, !1, goog.a11y.aria.State.LIVE, "off", goog.a11y.aria.State.MULTILINE, !1, goog.a11y.aria.State.MULTISELECTABLE, !1, goog.a11y.aria.State.ORIENTATION, "vertical", goog.a11y.aria.State.READONLY, !1, goog.a11y.aria.State.RELEVANT, "additions text", goog.a11y.aria.State.REQUIRED, !1, goog.a11y.aria.State.SORT, "none", goog.a11y.aria.State.BUSY, !1, goog.a11y.aria.State.DISABLED, !1, goog.a11y.aria.State.HIDDEN, !1, goog.a11y.aria.State.INVALID, "false")), goog.a11y.aria.DefaultStateValueMap_
}, goog.a11y.aria.ARIA_PREFIX_ = "aria-", goog.a11y.aria.ROLE_ATTRIBUTE_ = "role", goog.a11y.aria.TAGS_WITH_ASSUMED_ROLES_ = goog.object.createSet("A AREA BUTTON HEAD INPUT LINK MENU META OPTGROUP OPTION PROGRESS STYLE SELECT SOURCE TEXTAREA TITLE TRACK".split(" ")), goog.a11y.aria.CONTAINER_ROLES_ = [goog.a11y.aria.Role.COMBOBOX, goog.a11y.aria.Role.GRID, goog.a11y.aria.Role.GROUP, goog.a11y.aria.Role.LISTBOX, goog.a11y.aria.Role.MENU, goog.a11y.aria.Role.MENUBAR, goog.a11y.aria.Role.RADIOGROUP, goog.a11y.aria.Role.ROW, goog.a11y.aria.Role.ROWGROUP, goog.a11y.aria.Role.TAB_LIST, goog.a11y.aria.Role.TEXTBOX, goog.a11y.aria.Role.TOOLBAR, goog.a11y.aria.Role.TREE, goog.a11y.aria.Role.TREEGRID], goog.a11y.aria.setRole = function(e, o) {
    o ? (goog.asserts.ENABLE_ASSERTS && goog.asserts.assert(goog.object.containsValue(goog.a11y.aria.Role, o), "No such ARIA role " + o), e.setAttribute(goog.a11y.aria.ROLE_ATTRIBUTE_, o)) : goog.a11y.aria.removeRole(e)
}, goog.a11y.aria.getRole = function(e) {
    return e.getAttribute(goog.a11y.aria.ROLE_ATTRIBUTE_) || null
}, goog.a11y.aria.removeRole = function(e) {
    e.removeAttribute(goog.a11y.aria.ROLE_ATTRIBUTE_)
}, goog.a11y.aria.setState = function(e, o, t) {
    goog.isArray(t) && (t = t.join(" "));
    var n = goog.a11y.aria.getAriaAttributeName_(o);
    "" === t || void 0 == t ? (t = goog.a11y.aria.datatables.getDefaultValuesMap(), o in t ? e.setAttribute(n, t[o]) : e.removeAttribute(n)) : e.setAttribute(n, t)
}, goog.a11y.aria.toggleState = function(e, o) {
    var t = goog.a11y.aria.getState(e, o);
    goog.string.isEmptyOrWhitespace(goog.string.makeSafe(t)) || "true" == t || "false" == t ? goog.a11y.aria.setState(e, o, "true" == t ? "false" : "true") : goog.a11y.aria.removeState(e, o)
}, goog.a11y.aria.removeState = function(e, o) {
    e.removeAttribute(goog.a11y.aria.getAriaAttributeName_(o))
}, goog.a11y.aria.getState = function(e, o) {
    var t = e.getAttribute(goog.a11y.aria.getAriaAttributeName_(o));
    return null == t || void 0 == t ? "" : String(t)
}, goog.a11y.aria.getActiveDescendant = function(e) {
    var o = goog.a11y.aria.getState(e, goog.a11y.aria.State.ACTIVEDESCENDANT);
    return goog.dom.getOwnerDocument(e).getElementById(o)
}, goog.a11y.aria.setActiveDescendant = function(e, o) {
    var t = "";
    o && (t = o.id, goog.asserts.assert(t, "The active element should have an id.")), goog.a11y.aria.setState(e, goog.a11y.aria.State.ACTIVEDESCENDANT, t)
}, goog.a11y.aria.getLabel = function(e) {
    return goog.a11y.aria.getState(e, goog.a11y.aria.State.LABEL)
}, goog.a11y.aria.setLabel = function(e, o) {
    goog.a11y.aria.setState(e, goog.a11y.aria.State.LABEL, o)
}, goog.a11y.aria.assertRoleIsSetInternalUtil = function(e, o) {
    if (!goog.a11y.aria.TAGS_WITH_ASSUMED_ROLES_[e.tagName]) {
        var t = goog.a11y.aria.getRole(e);
        goog.asserts.assert(null != t, "The element ARIA role cannot be null."), goog.asserts.assert(goog.array.contains(o, t), 'Non existing or incorrect role set for element.The role set is "' + t + '". The role should be any of "' + o + '". Check the ARIA specification for more details http://www.w3.org/TR/wai-aria/roles.')
    }
}, goog.a11y.aria.getStateBoolean = function(e, o) {
    var t = e.getAttribute(goog.a11y.aria.getAriaAttributeName_(o));
    return goog.asserts.assert(goog.isBoolean(t) || null == t || "true" == t || "false" == t), null == t ? t : goog.isBoolean(t) ? t : "true" == t
}, goog.a11y.aria.getStateNumber = function(e, o) {
    var t = e.getAttribute(goog.a11y.aria.getAriaAttributeName_(o));
    return goog.asserts.assert(!(null != t && isNaN(Number(t)) || goog.isBoolean(t))), null == t ? null : Number(t)
}, goog.a11y.aria.getStateString = function(e, o) {
    var t = e.getAttribute(goog.a11y.aria.getAriaAttributeName_(o));
    return goog.asserts.assert((null == t || goog.isString(t)) && ("" == t || isNaN(Number(t))) && "true" != t && "false" != t), null == t || "" == t ? null : t
}, goog.a11y.aria.getStringArrayStateInternalUtil = function(e, o) {
    var t = e.getAttribute(goog.a11y.aria.getAriaAttributeName_(o));
    return goog.a11y.aria.splitStringOnWhitespace_(t)
}, goog.a11y.aria.hasState = function(e, o) {
    return e.hasAttribute(goog.a11y.aria.getAriaAttributeName_(o))
}, goog.a11y.aria.isContainerRole = function(e) {
    return e = goog.a11y.aria.getRole(e), goog.array.contains(goog.a11y.aria.CONTAINER_ROLES_, e)
}, goog.a11y.aria.splitStringOnWhitespace_ = function(e) {
    return e ? e.split(/\s+/) : []
}, goog.a11y.aria.getAriaAttributeName_ = function(e) {
    return goog.asserts.ENABLE_ASSERTS && (goog.asserts.assert(e, "ARIA attribute cannot be empty."), goog.asserts.assert(goog.object.containsValue(goog.a11y.aria.State, e), "No such ARIA attribute " + e)), goog.a11y.aria.ARIA_PREFIX_ + e
}, goog.events.KeyCodes = {
    WIN_KEY_FF_LINUX: 0,
    MAC_ENTER: 3,
    BACKSPACE: 8,
    TAB: 9,
    NUM_CENTER: 12,
    ENTER: 13,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    PAUSE: 19,
    CAPS_LOCK: 20,
    ESC: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    PLUS_SIGN: 43,
    PRINT_SCREEN: 44,
    INSERT: 45,
    DELETE: 46,
    ZERO: 48,
    ONE: 49,
    TWO: 50,
    THREE: 51,
    FOUR: 52,
    FIVE: 53,
    SIX: 54,
    SEVEN: 55,
    EIGHT: 56,
    NINE: 57,
    FF_SEMICOLON: 59,
    FF_EQUALS: 61,
    FF_DASH: 173,
    QUESTION_MARK: 63,
    AT_SIGN: 64,
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,
    META: 91,
    WIN_KEY_RIGHT: 92,
    CONTEXT_MENU: 93,
    NUM_ZERO: 96,
    NUM_ONE: 97,
    NUM_TWO: 98,
    NUM_THREE: 99,
    NUM_FOUR: 100,
    NUM_FIVE: 101,
    NUM_SIX: 102,
    NUM_SEVEN: 103,
    NUM_EIGHT: 104,
    NUM_NINE: 105,
    NUM_MULTIPLY: 106,
    NUM_PLUS: 107,
    NUM_MINUS: 109,
    NUM_PERIOD: 110,
    NUM_DIVISION: 111,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    NUMLOCK: 144,
    SCROLL_LOCK: 145,
    FIRST_MEDIA_KEY: 166,
    LAST_MEDIA_KEY: 183,
    SEMICOLON: 186,
    DASH: 189,
    EQUALS: 187,
    COMMA: 188,
    PERIOD: 190,
    SLASH: 191,
    APOSTROPHE: 192,
    TILDE: 192,
    SINGLE_QUOTE: 222,
    OPEN_SQUARE_BRACKET: 219,
    BACKSLASH: 220,
    CLOSE_SQUARE_BRACKET: 221,
    WIN_KEY: 224,
    MAC_FF_META: 224,
    MAC_WK_CMD_LEFT: 91,
    MAC_WK_CMD_RIGHT: 93,
    WIN_IME: 229,
    VK_NONAME: 252,
    PHANTOM: 255
}, goog.events.KeyCodes.isTextModifyingKeyEvent = function(e) {
    if (e.altKey && !e.ctrlKey || e.metaKey || e.keyCode >= goog.events.KeyCodes.F1 && e.keyCode <= goog.events.KeyCodes.F12) return !1;
    switch (e.keyCode) {
        case goog.events.KeyCodes.ALT:
        case goog.events.KeyCodes.CAPS_LOCK:
        case goog.events.KeyCodes.CONTEXT_MENU:
        case goog.events.KeyCodes.CTRL:
        case goog.events.KeyCodes.DOWN:
        case goog.events.KeyCodes.END:
        case goog.events.KeyCodes.ESC:
        case goog.events.KeyCodes.HOME:
        case goog.events.KeyCodes.INSERT:
        case goog.events.KeyCodes.LEFT:
        case goog.events.KeyCodes.MAC_FF_META:
        case goog.events.KeyCodes.META:
        case goog.events.KeyCodes.NUMLOCK:
        case goog.events.KeyCodes.NUM_CENTER:
        case goog.events.KeyCodes.PAGE_DOWN:
        case goog.events.KeyCodes.PAGE_UP:
        case goog.events.KeyCodes.PAUSE:
        case goog.events.KeyCodes.PHANTOM:
        case goog.events.KeyCodes.PRINT_SCREEN:
        case goog.events.KeyCodes.RIGHT:
        case goog.events.KeyCodes.SCROLL_LOCK:
        case goog.events.KeyCodes.SHIFT:
        case goog.events.KeyCodes.UP:
        case goog.events.KeyCodes.VK_NONAME:
        case goog.events.KeyCodes.WIN_KEY:
        case goog.events.KeyCodes.WIN_KEY_RIGHT:
            return !1;
        case goog.events.KeyCodes.WIN_KEY_FF_LINUX:
            return !goog.userAgent.GECKO;
        default:
            return e.keyCode < goog.events.KeyCodes.FIRST_MEDIA_KEY || e.keyCode > goog.events.KeyCodes.LAST_MEDIA_KEY
    }
}, goog.events.KeyCodes.firesKeyPressEvent = function(e, o, t, n, r, i) {
    if (!(goog.userAgent.IE || goog.userAgent.EDGE || goog.userAgent.WEBKIT && goog.userAgent.isVersionOrHigher("525"))) return !0;
    if (goog.userAgent.MAC && r) return goog.events.KeyCodes.isCharacterKey(e);
    if (r && !n) return !1;
    if (goog.isNumber(o) && (o = goog.events.KeyCodes.normalizeKeyCode(o)), r = o == goog.events.KeyCodes.CTRL || o == goog.events.KeyCodes.ALT || goog.userAgent.MAC && o == goog.events.KeyCodes.META, i = o == goog.events.KeyCodes.SHIFT && (n || i), (!t || goog.userAgent.MAC) && r || goog.userAgent.MAC && i) return !1;
    if ((goog.userAgent.WEBKIT || goog.userAgent.EDGE) && n && t) switch (e) {
        case goog.events.KeyCodes.BACKSLASH:
        case goog.events.KeyCodes.OPEN_SQUARE_BRACKET:
        case goog.events.KeyCodes.CLOSE_SQUARE_BRACKET:
        case goog.events.KeyCodes.TILDE:
        case goog.events.KeyCodes.SEMICOLON:
        case goog.events.KeyCodes.DASH:
        case goog.events.KeyCodes.EQUALS:
        case goog.events.KeyCodes.COMMA:
        case goog.events.KeyCodes.PERIOD:
        case goog.events.KeyCodes.SLASH:
        case goog.events.KeyCodes.APOSTROPHE:
        case goog.events.KeyCodes.SINGLE_QUOTE:
            return !1
    }
    if (goog.userAgent.IE && n && o == e) return !1;
    switch (e) {
        case goog.events.KeyCodes.ENTER:
            return !0;
        case goog.events.KeyCodes.ESC:
            return !(goog.userAgent.WEBKIT || goog.userAgent.EDGE)
    }
    return goog.events.KeyCodes.isCharacterKey(e)
}, goog.events.KeyCodes.isCharacterKey = function(e) {
    if (e >= goog.events.KeyCodes.ZERO && e <= goog.events.KeyCodes.NINE || e >= goog.events.KeyCodes.NUM_ZERO && e <= goog.events.KeyCodes.NUM_MULTIPLY || e >= goog.events.KeyCodes.A && e <= goog.events.KeyCodes.Z || (goog.userAgent.WEBKIT || goog.userAgent.EDGE) && 0 == e) return !0;
    switch (e) {
        case goog.events.KeyCodes.SPACE:
        case goog.events.KeyCodes.PLUS_SIGN:
        case goog.events.KeyCodes.QUESTION_MARK:
        case goog.events.KeyCodes.AT_SIGN:
        case goog.events.KeyCodes.NUM_PLUS:
        case goog.events.KeyCodes.NUM_MINUS:
        case goog.events.KeyCodes.NUM_PERIOD:
        case goog.events.KeyCodes.NUM_DIVISION:
        case goog.events.KeyCodes.SEMICOLON:
        case goog.events.KeyCodes.FF_SEMICOLON:
        case goog.events.KeyCodes.DASH:
        case goog.events.KeyCodes.EQUALS:
        case goog.events.KeyCodes.FF_EQUALS:
        case goog.events.KeyCodes.COMMA:
        case goog.events.KeyCodes.PERIOD:
        case goog.events.KeyCodes.SLASH:
        case goog.events.KeyCodes.APOSTROPHE:
        case goog.events.KeyCodes.SINGLE_QUOTE:
        case goog.events.KeyCodes.OPEN_SQUARE_BRACKET:
        case goog.events.KeyCodes.BACKSLASH:
        case goog.events.KeyCodes.CLOSE_SQUARE_BRACKET:
            return !0;
        default:
            return !1
    }
}, goog.events.KeyCodes.normalizeKeyCode = function(e) {
    return goog.userAgent.GECKO ? goog.events.KeyCodes.normalizeGeckoKeyCode(e) : goog.userAgent.MAC && goog.userAgent.WEBKIT ? goog.events.KeyCodes.normalizeMacWebKitKeyCode(e) : e
}, goog.events.KeyCodes.normalizeGeckoKeyCode = function(e) {
    switch (e) {
        case goog.events.KeyCodes.FF_EQUALS:
            return goog.events.KeyCodes.EQUALS;
        case goog.events.KeyCodes.FF_SEMICOLON:
            return goog.events.KeyCodes.SEMICOLON;
        case goog.events.KeyCodes.FF_DASH:
            return goog.events.KeyCodes.DASH;
        case goog.events.KeyCodes.MAC_FF_META:
            return goog.events.KeyCodes.META;
        case goog.events.KeyCodes.WIN_KEY_FF_LINUX:
            return goog.events.KeyCodes.WIN_KEY;
        default:
            return e
    }
}, goog.events.KeyCodes.normalizeMacWebKitKeyCode = function(e) {
    switch (e) {
        case goog.events.KeyCodes.MAC_WK_CMD_RIGHT:
            return goog.events.KeyCodes.META;
        default:
            return e
    }
}, goog.events.KeyHandler = function(e, o) {
    goog.events.EventTarget.call(this), e && this.attach(e, o)
}, goog.inherits(goog.events.KeyHandler, goog.events.EventTarget), goog.events.KeyHandler.prototype.element_ = null, goog.events.KeyHandler.prototype.keyPressKey_ = null, goog.events.KeyHandler.prototype.keyDownKey_ = null, goog.events.KeyHandler.prototype.keyUpKey_ = null, goog.events.KeyHandler.prototype.lastKey_ = -1, goog.events.KeyHandler.prototype.keyCode_ = -1, goog.events.KeyHandler.prototype.altKey_ = !1, goog.events.KeyHandler.EventType = {
    KEY: "key"
}, goog.events.KeyHandler.safariKey_ = {
    3: goog.events.KeyCodes.ENTER,
    12: goog.events.KeyCodes.NUMLOCK,
    63232: goog.events.KeyCodes.UP,
    63233: goog.events.KeyCodes.DOWN,
    63234: goog.events.KeyCodes.LEFT,
    63235: goog.events.KeyCodes.RIGHT,
    63236: goog.events.KeyCodes.F1,
    63237: goog.events.KeyCodes.F2,
    63238: goog.events.KeyCodes.F3,
    63239: goog.events.KeyCodes.F4,
    63240: goog.events.KeyCodes.F5,
    63241: goog.events.KeyCodes.F6,
    63242: goog.events.KeyCodes.F7,
    63243: goog.events.KeyCodes.F8,
    63244: goog.events.KeyCodes.F9,
    63245: goog.events.KeyCodes.F10,
    63246: goog.events.KeyCodes.F11,
    63247: goog.events.KeyCodes.F12,
    63248: goog.events.KeyCodes.PRINT_SCREEN,
    63272: goog.events.KeyCodes.DELETE,
    63273: goog.events.KeyCodes.HOME,
    63275: goog.events.KeyCodes.END,
    63276: goog.events.KeyCodes.PAGE_UP,
    63277: goog.events.KeyCodes.PAGE_DOWN,
    63289: goog.events.KeyCodes.NUMLOCK,
    63302: goog.events.KeyCodes.INSERT
}, goog.events.KeyHandler.keyIdentifier_ = {
    Up: goog.events.KeyCodes.UP,
    Down: goog.events.KeyCodes.DOWN,
    Left: goog.events.KeyCodes.LEFT,
    Right: goog.events.KeyCodes.RIGHT,
    Enter: goog.events.KeyCodes.ENTER,
    F1: goog.events.KeyCodes.F1,
    F2: goog.events.KeyCodes.F2,
    F3: goog.events.KeyCodes.F3,
    F4: goog.events.KeyCodes.F4,
    F5: goog.events.KeyCodes.F5,
    F6: goog.events.KeyCodes.F6,
    F7: goog.events.KeyCodes.F7,
    F8: goog.events.KeyCodes.F8,
    F9: goog.events.KeyCodes.F9,
    F10: goog.events.KeyCodes.F10,
    F11: goog.events.KeyCodes.F11,
    F12: goog.events.KeyCodes.F12,
    "U+007F": goog.events.KeyCodes.DELETE,
    Home: goog.events.KeyCodes.HOME,
    End: goog.events.KeyCodes.END,
    PageUp: goog.events.KeyCodes.PAGE_UP,
    PageDown: goog.events.KeyCodes.PAGE_DOWN,
    Insert: goog.events.KeyCodes.INSERT
}, goog.events.KeyHandler.USES_KEYDOWN_ = goog.userAgent.IE || goog.userAgent.EDGE || goog.userAgent.WEBKIT && goog.userAgent.isVersionOrHigher("525"), goog.events.KeyHandler.SAVE_ALT_FOR_KEYPRESS_ = goog.userAgent.MAC && goog.userAgent.GECKO, goog.events.KeyHandler.prototype.handleKeyDown_ = function(e) {
    (goog.userAgent.WEBKIT || goog.userAgent.EDGE) && (this.lastKey_ == goog.events.KeyCodes.CTRL && !e.ctrlKey || this.lastKey_ == goog.events.KeyCodes.ALT && !e.altKey || goog.userAgent.MAC && this.lastKey_ == goog.events.KeyCodes.META && !e.metaKey) && this.resetState(), -1 == this.lastKey_ && (e.ctrlKey && e.keyCode != goog.events.KeyCodes.CTRL ? this.lastKey_ = goog.events.KeyCodes.CTRL : e.altKey && e.keyCode != goog.events.KeyCodes.ALT ? this.lastKey_ = goog.events.KeyCodes.ALT : e.metaKey && e.keyCode != goog.events.KeyCodes.META && (this.lastKey_ = goog.events.KeyCodes.META)), goog.events.KeyHandler.USES_KEYDOWN_ && !goog.events.KeyCodes.firesKeyPressEvent(e.keyCode, this.lastKey_, e.shiftKey, e.ctrlKey, e.altKey, e.metaKey) ? this.handleEvent(e) : (this.keyCode_ = goog.events.KeyCodes.normalizeKeyCode(e.keyCode), goog.events.KeyHandler.SAVE_ALT_FOR_KEYPRESS_ && (this.altKey_ = e.altKey))
}, goog.events.KeyHandler.prototype.resetState = function() {
    this.keyCode_ = this.lastKey_ = -1
}, goog.events.KeyHandler.prototype.handleKeyup_ = function(e) {
    this.resetState(), this.altKey_ = e.altKey
}, goog.events.KeyHandler.prototype.handleEvent = function(e) {
    var o = e.getBrowserEvent(),
        t = o.altKey;
    if (goog.userAgent.IE && e.type == goog.events.EventType.KEYPRESS) var n = this.keyCode_,
        r = n != goog.events.KeyCodes.ENTER && n != goog.events.KeyCodes.ESC ? o.keyCode : 0;
    else(goog.userAgent.WEBKIT || goog.userAgent.EDGE) && e.type == goog.events.EventType.KEYPRESS ? (n = this.keyCode_, r = 0 <= o.charCode && 63232 > o.charCode && goog.events.KeyCodes.isCharacterKey(n) ? o.charCode : 0) : goog.userAgent.OPERA && !goog.userAgent.WEBKIT ? (n = this.keyCode_, r = goog.events.KeyCodes.isCharacterKey(n) ? o.keyCode : 0) : (n = o.keyCode || this.keyCode_, r = o.charCode || 0, goog.events.KeyHandler.SAVE_ALT_FOR_KEYPRESS_ && (t = this.altKey_), goog.userAgent.MAC && r == goog.events.KeyCodes.QUESTION_MARK && n == goog.events.KeyCodes.WIN_KEY && (n = goog.events.KeyCodes.SLASH));
    var i = n = goog.events.KeyCodes.normalizeKeyCode(n);
    n ? 63232 <= n && n in goog.events.KeyHandler.safariKey_ ? i = goog.events.KeyHandler.safariKey_[n] : 25 == n && e.shiftKey && (i = 9) : o.keyIdentifier && o.keyIdentifier in goog.events.KeyHandler.keyIdentifier_ && (i = goog.events.KeyHandler.keyIdentifier_[o.keyIdentifier]), e = i == this.lastKey_, this.lastKey_ = i, (o = new goog.events.KeyEvent(i, r, e, o)).altKey = t, this.dispatchEvent(o)
}, goog.events.KeyHandler.prototype.getElement = function() {
    return this.element_
}, goog.events.KeyHandler.prototype.attach = function(e, o) {
    this.keyUpKey_ && this.detach(), this.element_ = e, this.keyPressKey_ = goog.events.listen(this.element_, goog.events.EventType.KEYPRESS, this, o), this.keyDownKey_ = goog.events.listen(this.element_, goog.events.EventType.KEYDOWN, this.handleKeyDown_, o, this), this.keyUpKey_ = goog.events.listen(this.element_, goog.events.EventType.KEYUP, this.handleKeyup_, o, this)
}, goog.events.KeyHandler.prototype.detach = function() {
    this.keyPressKey_ && (goog.events.unlistenByKey(this.keyPressKey_), goog.events.unlistenByKey(this.keyDownKey_), goog.events.unlistenByKey(this.keyUpKey_), this.keyUpKey_ = this.keyDownKey_ = this.keyPressKey_ = null), this.element_ = null, this.keyCode_ = this.lastKey_ = -1
}, goog.events.KeyHandler.prototype.disposeInternal = function() {
    goog.events.KeyHandler.superClass_.disposeInternal.call(this), this.detach()
}, goog.events.KeyEvent = function(e, o, t, n) {
    goog.events.BrowserEvent.call(this, n), this.type = goog.events.KeyHandler.EventType.KEY, this.keyCode = e, this.charCode = o, this.repeat = t
}, goog.inherits(goog.events.KeyEvent, goog.events.BrowserEvent), goog.dom.classlist = {}, goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST = !1, goog.dom.classlist.get = function(e) {
    return goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || e.classList ? e.classList : (e = e.className, goog.isString(e) && e.match(/\S+/g) || [])
}, goog.dom.classlist.set = function(e, o) {
    e.className = o
}, goog.dom.classlist.contains = function(e, o) {
    return goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || e.classList ? e.classList.contains(o) : goog.array.contains(goog.dom.classlist.get(e), o)
}, goog.dom.classlist.add = function(e, o) {
    goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || e.classList ? e.classList.add(o) : goog.dom.classlist.contains(e, o) || (e.className += 0 < e.className.length ? " " + o : o)
};
goog.dom.classlist.addAll = function(e, o) {
    if (goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || e.classList) goog.array.forEach(o, function(o) {
        goog.dom.classlist.add(e, o)
    });
    else {
        var t = {};
        goog.array.forEach(goog.dom.classlist.get(e), function(e) {
            t[e] = !0
        }), goog.array.forEach(o, function(e) {
            t[e] = !0
        }), e.className = "";
        for (var n in t) e.className += 0 < e.className.length ? " " + n : n
    }
}, goog.dom.classlist.remove = function(e, o) {
    goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || e.classList ? e.classList.remove(o) : goog.dom.classlist.contains(e, o) && (e.className = goog.array.filter(goog.dom.classlist.get(e), function(e) {
        return e != o
    }).join(" "))
}, goog.dom.classlist.removeAll = function(e, o) {
    goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || e.classList ? goog.array.forEach(o, function(o) {
        goog.dom.classlist.remove(e, o)
    }) : e.className = goog.array.filter(goog.dom.classlist.get(e), function(e) {
        return !goog.array.contains(o, e)
    }).join(" ")
}, goog.dom.classlist.enable = function(e, o, t) {
    t ? goog.dom.classlist.add(e, o) : goog.dom.classlist.remove(e, o)
}, goog.dom.classlist.enableAll = function(e, o, t) {
    (t ? goog.dom.classlist.addAll : goog.dom.classlist.removeAll)(e, o)
}, goog.dom.classlist.swap = function(e, o, t) {
    return !!goog.dom.classlist.contains(e, o) && (goog.dom.classlist.remove(e, o), goog.dom.classlist.add(e, t), !0)
}, goog.dom.classlist.toggle = function(e, o) {
    var t = !goog.dom.classlist.contains(e, o);
    return goog.dom.classlist.enable(e, o, t), t
}, goog.dom.classlist.addRemove = function(e, o, t) {
    goog.dom.classlist.remove(e, o), goog.dom.classlist.add(e, t)
}, goog.ui.registry = {}, goog.ui.registry.getDefaultRenderer = function(e) {
    for (var o; e && (o = goog.getUid(e), !(o = goog.ui.registry.defaultRenderers_[o]));) e = e.superClass_ ? e.superClass_.constructor : null;
    return o ? goog.isFunction(o.getInstance) ? o.getInstance() : new o : null
}, goog.ui.registry.setDefaultRenderer = function(e, o) {
    if (!goog.isFunction(e)) throw Error("Invalid component class " + e);
    if (!goog.isFunction(o)) throw Error("Invalid renderer class " + o);
    var t = goog.getUid(e);
    goog.ui.registry.defaultRenderers_[t] = o
}, goog.ui.registry.getDecoratorByClassName = function(e) {
    return e in goog.ui.registry.decoratorFunctions_ ? goog.ui.registry.decoratorFunctions_[e]() : null
}, goog.ui.registry.setDecoratorByClassName = function(e, o) {
    if (!e) throw Error("Invalid class name " + e);
    if (!goog.isFunction(o)) throw Error("Invalid decorator function " + o);
    goog.ui.registry.decoratorFunctions_[e] = o
}, goog.ui.registry.getDecorator = function(e) {
    goog.asserts.assert(e);
    for (var o = goog.dom.classlist.get(e), t = 0, n = o.length; t < n; t++)
        if (e = goog.ui.registry.getDecoratorByClassName(o[t])) return e;
    return null
}, goog.ui.registry.reset = function() {
    goog.ui.registry.defaultRenderers_ = {}, goog.ui.registry.decoratorFunctions_ = {}
}, goog.ui.registry.defaultRenderers_ = {}, goog.ui.registry.decoratorFunctions_ = {}, goog.ui.ContainerRenderer = function(e) {
    this.ariaRole_ = e
}, goog.addSingletonGetter(goog.ui.ContainerRenderer), goog.ui.ContainerRenderer.getCustomRenderer = function(e, o) {
    var t = new e;
    return t.getCssClass = function() {
        return o
    }, t
}, goog.ui.ContainerRenderer.CSS_CLASS = "goog-container", goog.ui.ContainerRenderer.prototype.getAriaRole = function() {
    return this.ariaRole_
}, goog.ui.ContainerRenderer.prototype.enableTabIndex = function(e, o) {
    e && (e.tabIndex = o ? 0 : -1)
}, goog.ui.ContainerRenderer.prototype.createDom = function(e) {
    return e.getDomHelper().createDom("DIV", this.getClassNames(e).join(" "))
}, goog.ui.ContainerRenderer.prototype.getContentElement = function(e) {
    return e
}, goog.ui.ContainerRenderer.prototype.canDecorate = function(e) {
    return "DIV" == e.tagName
}, goog.ui.ContainerRenderer.prototype.decorate = function(e, o) {
    o.id && e.setId(o.id);
    var t = this.getCssClass(),
        n = !1,
        r = goog.dom.classlist.get(o);
    return r && goog.array.forEach(r, function(o) {
        o == t ? n = !0 : o && this.setStateFromClassName(e, o, t)
    }, this), n || goog.dom.classlist.add(o, t), this.decorateChildren(e, this.getContentElement(o)), o
}, goog.ui.ContainerRenderer.prototype.setStateFromClassName = function(e, o, t) {
    o == t + "-disabled" ? e.setEnabled(!1) : o == t + "-horizontal" ? e.setOrientation(goog.ui.Container.Orientation.HORIZONTAL) : o == t + "-vertical" && e.setOrientation(goog.ui.Container.Orientation.VERTICAL)
}, goog.ui.ContainerRenderer.prototype.decorateChildren = function(e, o, t) {
    if (o) {
        t = t || o.firstChild;
        for (var n; t && t.parentNode == o;) {
            if (n = t.nextSibling, t.nodeType == goog.dom.NodeType.ELEMENT) {
                var r = this.getDecoratorForChild(t);
                r && (r.setElementInternal(t), e.isEnabled() || r.setEnabled(!1), e.addChild(r), r.decorate(t))
            } else t.nodeValue && "" != goog.string.trim(t.nodeValue) || o.removeChild(t);
            t = n
        }
    }
}, goog.ui.ContainerRenderer.prototype.getDecoratorForChild = function(e) {
    return goog.ui.registry.getDecorator(e)
}, goog.ui.ContainerRenderer.prototype.initializeDom = function(e) {
    e = e.getElement(), goog.asserts.assert(e, "The container DOM element cannot be null."), goog.style.setUnselectable(e, !0, goog.userAgent.GECKO), goog.userAgent.IE && (e.hideFocus = !0);
    var o = this.getAriaRole();
    o && goog.a11y.aria.setRole(e, o)
}, goog.ui.ContainerRenderer.prototype.getKeyEventTarget = function(e) {
    return e.getElement()
}, goog.ui.ContainerRenderer.prototype.getCssClass = function() {
    return goog.ui.ContainerRenderer.CSS_CLASS
}, goog.ui.ContainerRenderer.prototype.getClassNames = function(e) {
    var o = this.getCssClass(),
        t = [o, (t = e.getOrientation() == goog.ui.Container.Orientation.HORIZONTAL) ? o + "-horizontal" : o + "-vertical"];
    return e.isEnabled() || t.push(o + "-disabled"), t
}, goog.ui.ContainerRenderer.prototype.getDefaultOrientation = function() {
    return goog.ui.Container.Orientation.VERTICAL
}, goog.ui.ControlRenderer = function() {}, goog.addSingletonGetter(goog.ui.ControlRenderer), goog.tagUnsealableClass(goog.ui.ControlRenderer), goog.ui.ControlRenderer.getCustomRenderer = function(e, o) {
    var t = new e;
    return t.getCssClass = function() {
        return o
    }, t
}, goog.ui.ControlRenderer.CSS_CLASS = "goog-control", goog.ui.ControlRenderer.IE6_CLASS_COMBINATIONS = [], goog.ui.ControlRenderer.TOGGLE_ARIA_STATE_MAP_ = goog.object.create(goog.a11y.aria.Role.BUTTON, goog.a11y.aria.State.PRESSED, goog.a11y.aria.Role.CHECKBOX, goog.a11y.aria.State.CHECKED, goog.a11y.aria.Role.MENU_ITEM, goog.a11y.aria.State.SELECTED, goog.a11y.aria.Role.MENU_ITEM_CHECKBOX, goog.a11y.aria.State.CHECKED, goog.a11y.aria.Role.MENU_ITEM_RADIO, goog.a11y.aria.State.CHECKED, goog.a11y.aria.Role.RADIO, goog.a11y.aria.State.CHECKED, goog.a11y.aria.Role.TAB, goog.a11y.aria.State.SELECTED, goog.a11y.aria.Role.TREEITEM, goog.a11y.aria.State.SELECTED), goog.ui.ControlRenderer.prototype.getAriaRole = function() {}, goog.ui.ControlRenderer.prototype.createDom = function(e) {
    return e.getDomHelper().createDom("DIV", this.getClassNames(e).join(" "), e.getContent())
}, goog.ui.ControlRenderer.prototype.getContentElement = function(e) {
    return e
}, goog.ui.ControlRenderer.prototype.enableClassName = function(e, o, t) {
    if (e = e.getElement ? e.getElement() : e) {
        var n = [o];
        goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("7") && (n = this.getAppliedCombinedClassNames_(goog.dom.classlist.get(e), o)).push(o), goog.dom.classlist.enableAll(e, n, t)
    }
}, goog.ui.ControlRenderer.prototype.enableExtraClassName = function(e, o, t) {
    this.enableClassName(e, o, t)
}, goog.ui.ControlRenderer.prototype.canDecorate = function(e) {
    return !0
}, goog.ui.ControlRenderer.prototype.decorate = function(e, o) {
    o.id && e.setId(o.id);
    var t = this.getContentElement(o);
    t && t.firstChild ? e.setContentInternal(t.firstChild.nextSibling ? goog.array.clone(t.childNodes) : t.firstChild) : e.setContentInternal(null);
    var n = 0,
        r = this.getCssClass(),
        i = this.getStructuralCssClass(),
        s = !1,
        l = !1,
        g = !1,
        a = goog.array.toArray(goog.dom.classlist.get(o));
    goog.array.forEach(a, function(e) {
        s || e != r ? l || e != i ? n |= this.getStateFromClass(e) : l = !0 : (s = !0, i == r && (l = !0)), this.getStateFromClass(e) == goog.ui.Component.State.DISABLED && (goog.asserts.assertElement(t), goog.dom.isFocusableTabIndex(t) && goog.dom.setFocusableTabIndex(t, !1))
    }, this), e.setStateInternal(n), s || (a.push(r), i == r && (l = !0)), l || a.push(i);
    var c = e.getExtraClassNames();
    if (c && a.push.apply(a, c), goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("7")) {
        var u = this.getAppliedCombinedClassNames_(a);
        0 < u.length && (a.push.apply(a, u), g = !0)
    }
    return s && l && !c && !g || goog.dom.classlist.set(o, a.join(" ")), o
}, goog.ui.ControlRenderer.prototype.initializeDom = function(e) {
    e.isRightToLeft() && this.setRightToLeft(e.getElement(), !0), e.isEnabled() && this.setFocusable(e, e.isVisible())
}, goog.ui.ControlRenderer.prototype.setAriaRole = function(e, o) {
    var t = o || this.getAriaRole();
    t && (goog.asserts.assert(e, "The element passed as a first parameter cannot be null."), t != goog.a11y.aria.getRole(e) && goog.a11y.aria.setRole(e, t))
}, goog.ui.ControlRenderer.prototype.setAriaStates = function(e, o) {
    goog.asserts.assert(e), goog.asserts.assert(o);
    var t = e.getAriaLabel();
    goog.isDefAndNotNull(t) && this.setAriaLabel(o, t), e.isVisible() || goog.a11y.aria.setState(o, goog.a11y.aria.State.HIDDEN, !e.isVisible()), e.isEnabled() || this.updateAriaState(o, goog.ui.Component.State.DISABLED, !e.isEnabled()), e.isSupportedState(goog.ui.Component.State.SELECTED) && this.updateAriaState(o, goog.ui.Component.State.SELECTED, e.isSelected()), e.isSupportedState(goog.ui.Component.State.CHECKED) && this.updateAriaState(o, goog.ui.Component.State.CHECKED, e.isChecked()), e.isSupportedState(goog.ui.Component.State.OPENED) && this.updateAriaState(o, goog.ui.Component.State.OPENED, e.isOpen())
}, goog.ui.ControlRenderer.prototype.setAriaLabel = function(e, o) {
    goog.a11y.aria.setLabel(e, o)
}, goog.ui.ControlRenderer.prototype.setAllowTextSelection = function(e, o) {
    goog.style.setUnselectable(e, !o, !goog.userAgent.IE && !goog.userAgent.OPERA)
}, goog.ui.ControlRenderer.prototype.setRightToLeft = function(e, o) {
    this.enableClassName(e, this.getStructuralCssClass() + "-rtl", o)
}, goog.ui.ControlRenderer.prototype.isFocusable = function(e) {
    var o;
    return !(!e.isSupportedState(goog.ui.Component.State.FOCUSED) || !(o = e.getKeyEventTarget())) && goog.dom.isFocusableTabIndex(o)
}, goog.ui.ControlRenderer.prototype.setFocusable = function(e, o) {
    var t;
    if (e.isSupportedState(goog.ui.Component.State.FOCUSED) && (t = e.getKeyEventTarget())) {
        if (!o && e.isFocused()) {
            try {
                t.blur()
            } catch (e) {}
            e.isFocused() && e.handleBlur(null)
        }
        goog.dom.isFocusableTabIndex(t) != o && goog.dom.setFocusableTabIndex(t, o)
    }
}, goog.ui.ControlRenderer.prototype.setVisible = function(e, o) {
    goog.style.setElementShown(e, o), e && goog.a11y.aria.setState(e, goog.a11y.aria.State.HIDDEN, !o)
}, goog.ui.ControlRenderer.prototype.setState = function(e, o, t) {
    var n = e.getElement();
    if (n) {
        var r = this.getClassForState(o);
        r && this.enableClassName(e, r, t), this.updateAriaState(n, o, t)
    }
}, goog.ui.ControlRenderer.prototype.updateAriaState = function(e, o, t) {
    goog.ui.ControlRenderer.ariaAttributeMap_ || (goog.ui.ControlRenderer.ariaAttributeMap_ = goog.object.create(goog.ui.Component.State.DISABLED, goog.a11y.aria.State.DISABLED, goog.ui.Component.State.SELECTED, goog.a11y.aria.State.SELECTED, goog.ui.Component.State.CHECKED, goog.a11y.aria.State.CHECKED, goog.ui.Component.State.OPENED, goog.a11y.aria.State.EXPANDED)), goog.asserts.assert(e, "The element passed as a first parameter cannot be null."), (o = goog.ui.ControlRenderer.getAriaStateForAriaRole_(e, goog.ui.ControlRenderer.ariaAttributeMap_[o])) && goog.a11y.aria.setState(e, o, t)
}, goog.ui.ControlRenderer.getAriaStateForAriaRole_ = function(e, o) {
    var t = goog.a11y.aria.getRole(e);
    return t ? (t = goog.ui.ControlRenderer.TOGGLE_ARIA_STATE_MAP_[t] || o, goog.ui.ControlRenderer.isAriaState_(o) ? t : o) : o
}, goog.ui.ControlRenderer.isAriaState_ = function(e) {
    return e == goog.a11y.aria.State.CHECKED || e == goog.a11y.aria.State.SELECTED
}, goog.ui.ControlRenderer.prototype.setContent = function(e, o) {
    var t = this.getContentElement(e);
    if (t && (goog.dom.removeChildren(t), o))
        if (goog.isString(o)) goog.dom.setTextContent(t, o);
        else {
            var n = function(e) {
                if (e) {
                    var o = goog.dom.getOwnerDocument(t);
                    t.appendChild(goog.isString(e) ? o.createTextNode(e) : e)
                }
            };
            goog.isArray(o) ? goog.array.forEach(o, n) : !goog.isArrayLike(o) || "nodeType" in o ? n(o) : goog.array.forEach(goog.array.clone(o), n)
        }
}, goog.ui.ControlRenderer.prototype.getKeyEventTarget = function(e) {
    return e.getElement()
}, goog.ui.ControlRenderer.prototype.getCssClass = function() {
    return goog.ui.ControlRenderer.CSS_CLASS
}, goog.ui.ControlRenderer.prototype.getIe6ClassCombinations = function() {
    return []
}, goog.ui.ControlRenderer.prototype.getStructuralCssClass = function() {
    return this.getCssClass()
}, goog.ui.ControlRenderer.prototype.getClassNames = function(e) {
    var o = this.getCssClass(),
        t = [o],
        n = this.getStructuralCssClass();
    return n != o && t.push(n), o = this.getClassNamesForState(e.getState()), t.push.apply(t, o), (e = e.getExtraClassNames()) && t.push.apply(t, e), goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("7") && t.push.apply(t, this.getAppliedCombinedClassNames_(t)), t
}, goog.ui.ControlRenderer.prototype.getAppliedCombinedClassNames_ = function(e, o) {
    var t = [];
    return o && (e = goog.array.concat(e, [o])), goog.array.forEach(this.getIe6ClassCombinations(), function(n) {
        !goog.array.every(n, goog.partial(goog.array.contains, e)) || o && !goog.array.contains(n, o) || t.push(n.join("_"))
    }), t
}, goog.ui.ControlRenderer.prototype.getClassNamesForState = function(e) {
    for (var o = []; e;) {
        var t = e & -e;
        o.push(this.getClassForState(t)), e &= ~t
    }
    return o
}, goog.ui.ControlRenderer.prototype.getClassForState = function(e) {
    return this.classByState_ || this.createClassByStateMap_(), this.classByState_[e]
}, goog.ui.ControlRenderer.prototype.getStateFromClass = function(e) {
    return this.stateByClass_ || this.createStateByClassMap_(), e = parseInt(this.stateByClass_[e], 10), isNaN(e) ? 0 : e
}, goog.ui.ControlRenderer.prototype.createClassByStateMap_ = function() {
    var e = this.getStructuralCssClass(),
        o = !goog.string.contains(goog.string.normalizeWhitespace(e), " ");
    goog.asserts.assert(o, "ControlRenderer has an invalid css class: '" + e + "'"), this.classByState_ = goog.object.create(goog.ui.Component.State.DISABLED, e + "-disabled", goog.ui.Component.State.HOVER, e + "-hover", goog.ui.Component.State.ACTIVE, e + "-active", goog.ui.Component.State.SELECTED, e + "-selected", goog.ui.Component.State.CHECKED, e + "-checked", goog.ui.Component.State.FOCUSED, e + "-focused", goog.ui.Component.State.OPENED, e + "-open")
}, goog.ui.ControlRenderer.prototype.createStateByClassMap_ = function() {
    this.classByState_ || this.createClassByStateMap_(), this.stateByClass_ = goog.object.transpose(this.classByState_)
}, goog.ui.Control = function(e, o, t) {
    goog.ui.Component.call(this, t), this.renderer_ = o || goog.ui.registry.getDefaultRenderer(this.constructor), this.setContentInternal(goog.isDef(e) ? e : null), this.ariaLabel_ = null
}, goog.inherits(goog.ui.Control, goog.ui.Component), goog.tagUnsealableClass(goog.ui.Control), goog.ui.Control.registerDecorator = goog.ui.registry.setDecoratorByClassName, goog.ui.Control.getDecorator = goog.ui.registry.getDecorator, goog.ui.Control.prototype.content_ = null, goog.ui.Control.prototype.state_ = 0, goog.ui.Control.prototype.supportedStates_ = goog.ui.Component.State.DISABLED | goog.ui.Component.State.HOVER | goog.ui.Component.State.ACTIVE | goog.ui.Component.State.FOCUSED, goog.ui.Control.prototype.autoStates_ = goog.ui.Component.State.ALL, goog.ui.Control.prototype.statesWithTransitionEvents_ = 0, goog.ui.Control.prototype.visible_ = !0, goog.ui.Control.prototype.extraClassNames_ = null, goog.ui.Control.prototype.handleMouseEvents_ = !0, goog.ui.Control.prototype.allowTextSelection_ = !1, goog.ui.Control.prototype.preferredAriaRole_ = null, goog.ui.Control.prototype.isHandleMouseEvents = function() {
    return this.handleMouseEvents_
}, goog.ui.Control.prototype.setHandleMouseEvents = function(e) {
    this.isInDocument() && e != this.handleMouseEvents_ && this.enableMouseEventHandling_(e), this.handleMouseEvents_ = e
}, goog.ui.Control.prototype.getKeyEventTarget = function() {
    return this.renderer_.getKeyEventTarget(this)
}, goog.ui.Control.prototype.getKeyHandler = function() {
    return this.keyHandler_ || (this.keyHandler_ = new goog.events.KeyHandler)
}, goog.ui.Control.prototype.getRenderer = function() {
    return this.renderer_
}, goog.ui.Control.prototype.setRenderer = function(e) {
    if (this.isInDocument()) throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
    this.getElement() && this.setElementInternal(null), this.renderer_ = e
}, goog.ui.Control.prototype.getExtraClassNames = function() {
    return this.extraClassNames_
}, goog.ui.Control.prototype.addClassName = function(e) {
    e && (this.extraClassNames_ ? goog.array.contains(this.extraClassNames_, e) || this.extraClassNames_.push(e) : this.extraClassNames_ = [e], this.renderer_.enableExtraClassName(this, e, !0))
}, goog.ui.Control.prototype.removeClassName = function(e) {
    e && this.extraClassNames_ && goog.array.remove(this.extraClassNames_, e) && (0 == this.extraClassNames_.length && (this.extraClassNames_ = null), this.renderer_.enableExtraClassName(this, e, !1))
}, goog.ui.Control.prototype.enableClassName = function(e, o) {
    o ? this.addClassName(e) : this.removeClassName(e)
}, goog.ui.Control.prototype.createDom = function() {
    var e = this.renderer_.createDom(this);
    this.setElementInternal(e), this.renderer_.setAriaRole(e, this.getPreferredAriaRole()), this.isAllowTextSelection() || this.renderer_.setAllowTextSelection(e, !1), this.isVisible() || this.renderer_.setVisible(e, !1)
}, goog.ui.Control.prototype.getPreferredAriaRole = function() {
    return this.preferredAriaRole_
}, goog.ui.Control.prototype.setPreferredAriaRole = function(e) {
    this.preferredAriaRole_ = e
}, goog.ui.Control.prototype.getAriaLabel = function() {
    return this.ariaLabel_
}, goog.ui.Control.prototype.setAriaLabel = function(e) {
    this.ariaLabel_ = e;
    var o = this.getElement();
    o && this.renderer_.setAriaLabel(o, e)
}, goog.ui.Control.prototype.getContentElement = function() {
    return this.renderer_.getContentElement(this.getElement())
}, goog.ui.Control.prototype.canDecorate = function(e) {
    return this.renderer_.canDecorate(e)
}, goog.ui.Control.prototype.decorateInternal = function(e) {
    e = this.renderer_.decorate(this, e), this.setElementInternal(e), this.renderer_.setAriaRole(e, this.getPreferredAriaRole()), this.isAllowTextSelection() || this.renderer_.setAllowTextSelection(e, !1), this.visible_ = "none" != e.style.display
}, goog.ui.Control.prototype.enterDocument = function() {
    if (goog.ui.Control.superClass_.enterDocument.call(this), this.renderer_.setAriaStates(this, this.getElementStrict()), this.renderer_.initializeDom(this), this.supportedStates_ & ~goog.ui.Component.State.DISABLED && (this.isHandleMouseEvents() && this.enableMouseEventHandling_(!0), this.isSupportedState(goog.ui.Component.State.FOCUSED))) {
        var e = this.getKeyEventTarget();
        if (e) {
            var o = this.getKeyHandler();
            o.attach(e), this.getHandler().listen(o, goog.events.KeyHandler.EventType.KEY, this.handleKeyEvent).listen(e, goog.events.EventType.FOCUS, this.handleFocus).listen(e, goog.events.EventType.BLUR, this.handleBlur)
        }
    }
}, goog.ui.Control.prototype.enableMouseEventHandling_ = function(e) {
    var o = this.getHandler(),
        t = this.getElement();
    e ? (o.listen(t, goog.events.EventType.MOUSEOVER, this.handleMouseOver).listen(t, goog.events.EventType.MOUSEDOWN, this.handleMouseDown).listen(t, goog.events.EventType.MOUSEUP, this.handleMouseUp).listen(t, goog.events.EventType.MOUSEOUT, this.handleMouseOut), this.handleContextMenu != goog.nullFunction && o.listen(t, goog.events.EventType.CONTEXTMENU, this.handleContextMenu), goog.userAgent.IE && (goog.userAgent.isVersionOrHigher(9) || o.listen(t, goog.events.EventType.DBLCLICK, this.handleDblClick), this.ieMouseEventSequenceSimulator_ || (this.ieMouseEventSequenceSimulator_ = new goog.ui.Control.IeMouseEventSequenceSimulator_(this), this.registerDisposable(this.ieMouseEventSequenceSimulator_)))) : (o.unlisten(t, goog.events.EventType.MOUSEOVER, this.handleMouseOver).unlisten(t, goog.events.EventType.MOUSEDOWN, this.handleMouseDown).unlisten(t, goog.events.EventType.MOUSEUP, this.handleMouseUp).unlisten(t, goog.events.EventType.MOUSEOUT, this.handleMouseOut), this.handleContextMenu != goog.nullFunction && o.unlisten(t, goog.events.EventType.CONTEXTMENU, this.handleContextMenu), goog.userAgent.IE && (goog.userAgent.isVersionOrHigher(9) || o.unlisten(t, goog.events.EventType.DBLCLICK, this.handleDblClick), goog.dispose(this.ieMouseEventSequenceSimulator_), this.ieMouseEventSequenceSimulator_ = null))
}, goog.ui.Control.prototype.exitDocument = function() {
    goog.ui.Control.superClass_.exitDocument.call(this), this.keyHandler_ && this.keyHandler_.detach(), this.isVisible() && this.isEnabled() && this.renderer_.setFocusable(this, !1)
}, goog.ui.Control.prototype.disposeInternal = function() {
    goog.ui.Control.superClass_.disposeInternal.call(this), this.keyHandler_ && (this.keyHandler_.dispose(), delete this.keyHandler_), delete this.renderer_, this.ieMouseEventSequenceSimulator_ = this.extraClassNames_ = this.content_ = null
}, goog.ui.Control.prototype.getContent = function() {
    return this.content_
}, goog.ui.Control.prototype.setContent = function(e) {
    this.renderer_.setContent(this.getElement(), e), this.setContentInternal(e)
}, goog.ui.Control.prototype.setContentInternal = function(e) {
    this.content_ = e
}, goog.ui.Control.prototype.getCaption = function() {
    var e = this.getContent();
    return e ? (e = goog.isString(e) ? e : goog.isArray(e) ? goog.array.map(e, goog.dom.getRawTextContent).join("") : goog.dom.getTextContent(e), goog.string.collapseBreakingSpaces(e)) : ""
}, goog.ui.Control.prototype.setCaption = function(e) {
    this.setContent(e)
}, goog.ui.Control.prototype.setRightToLeft = function(e) {
    goog.ui.Control.superClass_.setRightToLeft.call(this, e);
    var o = this.getElement();
    o && this.renderer_.setRightToLeft(o, e)
}, goog.ui.Control.prototype.isAllowTextSelection = function() {
    return this.allowTextSelection_
}, goog.ui.Control.prototype.setAllowTextSelection = function(e) {
    this.allowTextSelection_ = e;
    var o = this.getElement();
    o && this.renderer_.setAllowTextSelection(o, e)
}, goog.ui.Control.prototype.isVisible = function() {
    return this.visible_
}, goog.ui.Control.prototype.setVisible = function(e, o) {
    if (o || this.visible_ != e && this.dispatchEvent(e ? goog.ui.Component.EventType.SHOW : goog.ui.Component.EventType.HIDE)) {
        var t = this.getElement();
        return t && this.renderer_.setVisible(t, e), this.isEnabled() && this.renderer_.setFocusable(this, e), this.visible_ = e, !0
    }
    return !1
}, goog.ui.Control.prototype.isEnabled = function() {
    return !this.hasState(goog.ui.Component.State.DISABLED)
}, goog.ui.Control.prototype.isParentDisabled_ = function() {
    var e = this.getParent();
    return !!e && "function" == typeof e.isEnabled && !e.isEnabled()
}, goog.ui.Control.prototype.setEnabled = function(e) {
    !this.isParentDisabled_() && this.isTransitionAllowed(goog.ui.Component.State.DISABLED, !e) && (e || (this.setActive(!1), this.setHighlighted(!1)), this.isVisible() && this.renderer_.setFocusable(this, e), this.setState(goog.ui.Component.State.DISABLED, !e, !0))
}, goog.ui.Control.prototype.isHighlighted = function() {
    return this.hasState(goog.ui.Component.State.HOVER)
}, goog.ui.Control.prototype.setHighlighted = function(e) {
    this.isTransitionAllowed(goog.ui.Component.State.HOVER, e) && this.setState(goog.ui.Component.State.HOVER, e)
}, goog.ui.Control.prototype.isActive = function() {
    return this.hasState(goog.ui.Component.State.ACTIVE)
}, goog.ui.Control.prototype.setActive = function(e) {
    this.isTransitionAllowed(goog.ui.Component.State.ACTIVE, e) && this.setState(goog.ui.Component.State.ACTIVE, e)
}, goog.ui.Control.prototype.isSelected = function() {
    return this.hasState(goog.ui.Component.State.SELECTED)
}, goog.ui.Control.prototype.setSelected = function(e) {
    this.isTransitionAllowed(goog.ui.Component.State.SELECTED, e) && this.setState(goog.ui.Component.State.SELECTED, e)
}, goog.ui.Control.prototype.isChecked = function() {
    return this.hasState(goog.ui.Component.State.CHECKED)
}, goog.ui.Control.prototype.setChecked = function(e) {
    this.isTransitionAllowed(goog.ui.Component.State.CHECKED, e) && this.setState(goog.ui.Component.State.CHECKED, e)
}, goog.ui.Control.prototype.isFocused = function() {
    return this.hasState(goog.ui.Component.State.FOCUSED)
}, goog.ui.Control.prototype.setFocused = function(e) {
    this.isTransitionAllowed(goog.ui.Component.State.FOCUSED, e) && this.setState(goog.ui.Component.State.FOCUSED, e)
}, goog.ui.Control.prototype.isOpen = function() {
    return this.hasState(goog.ui.Component.State.OPENED)
}, goog.ui.Control.prototype.setOpen = function(e) {
    this.isTransitionAllowed(goog.ui.Component.State.OPENED, e) && this.setState(goog.ui.Component.State.OPENED, e)
}, goog.ui.Control.prototype.getState = function() {
    return this.state_
}, goog.ui.Control.prototype.hasState = function(e) {
    return !!(this.state_ & e)
}, goog.ui.Control.prototype.setState = function(e, o, t) {
    t || e != goog.ui.Component.State.DISABLED ? this.isSupportedState(e) && o != this.hasState(e) && (this.renderer_.setState(this, e, o), this.state_ = o ? this.state_ | e : this.state_ & ~e) : this.setEnabled(!o)
}, goog.ui.Control.prototype.setStateInternal = function(e) {
    this.state_ = e
}, goog.ui.Control.prototype.isSupportedState = function(e) {
    return !!(this.supportedStates_ & e)
}, goog.ui.Control.prototype.setSupportedState = function(e, o) {
    if (this.isInDocument() && this.hasState(e) && !o) throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
    !o && this.hasState(e) && this.setState(e, !1), this.supportedStates_ = o ? this.supportedStates_ | e : this.supportedStates_ & ~e
}, goog.ui.Control.prototype.isAutoState = function(e) {
    return !!(this.autoStates_ & e) && this.isSupportedState(e)
}, goog.ui.Control.prototype.setAutoStates = function(e, o) {
    this.autoStates_ = o ? this.autoStates_ | e : this.autoStates_ & ~e
}, goog.ui.Control.prototype.isDispatchTransitionEvents = function(e) {
    return !!(this.statesWithTransitionEvents_ & e) && this.isSupportedState(e)
}, goog.ui.Control.prototype.setDispatchTransitionEvents = function(e, o) {
    this.statesWithTransitionEvents_ = o ? this.statesWithTransitionEvents_ | e : this.statesWithTransitionEvents_ & ~e
}, goog.ui.Control.prototype.isTransitionAllowed = function(e, o) {
    return this.isSupportedState(e) && this.hasState(e) != o && (!(this.statesWithTransitionEvents_ & e) || this.dispatchEvent(goog.ui.Component.getStateTransitionEvent(e, o))) && !this.isDisposed()
}, goog.ui.Control.prototype.handleMouseOver = function(e) {
    !goog.ui.Control.isMouseEventWithinElement_(e, this.getElement()) && this.dispatchEvent(goog.ui.Component.EventType.ENTER) && this.isEnabled() && this.isAutoState(goog.ui.Component.State.HOVER) && this.setHighlighted(!0)
}, goog.ui.Control.prototype.handleMouseOut = function(e) {
    !goog.ui.Control.isMouseEventWithinElement_(e, this.getElement()) && this.dispatchEvent(goog.ui.Component.EventType.LEAVE) && (this.isAutoState(goog.ui.Component.State.ACTIVE) && this.setActive(!1), this.isAutoState(goog.ui.Component.State.HOVER) && this.setHighlighted(!1))
}, goog.ui.Control.prototype.handleContextMenu = goog.nullFunction, goog.ui.Control.isMouseEventWithinElement_ = function(e, o) {
    return !!e.relatedTarget && goog.dom.contains(o, e.relatedTarget)
}, goog.ui.Control.prototype.handleMouseDown = function(e) {
    this.isEnabled() && (this.isAutoState(goog.ui.Component.State.HOVER) && this.setHighlighted(!0), e.isMouseActionButton() && (this.isAutoState(goog.ui.Component.State.ACTIVE) && this.setActive(!0), this.renderer_ && this.renderer_.isFocusable(this) && this.getKeyEventTarget().focus())), !this.isAllowTextSelection() && e.isMouseActionButton() && e.preventDefault()
}, goog.ui.Control.prototype.handleMouseUp = function(e) {
    this.isEnabled() && (this.isAutoState(goog.ui.Component.State.HOVER) && this.setHighlighted(!0), this.isActive() && this.performActionInternal(e) && this.isAutoState(goog.ui.Component.State.ACTIVE) && this.setActive(!1))
}, goog.ui.Control.prototype.handleDblClick = function(e) {
    this.isEnabled() && this.performActionInternal(e)
}, goog.ui.Control.prototype.performActionInternal = function(e) {
    this.isAutoState(goog.ui.Component.State.CHECKED) && this.setChecked(!this.isChecked()), this.isAutoState(goog.ui.Component.State.SELECTED) && this.setSelected(!0), this.isAutoState(goog.ui.Component.State.OPENED) && this.setOpen(!this.isOpen());
    var o = new goog.events.Event(goog.ui.Component.EventType.ACTION, this);
    return e && (o.altKey = e.altKey, o.ctrlKey = e.ctrlKey, o.metaKey = e.metaKey, o.shiftKey = e.shiftKey, o.platformModifierKey = e.platformModifierKey), this.dispatchEvent(o)
}, goog.ui.Control.prototype.handleFocus = function(e) {
    this.isAutoState(goog.ui.Component.State.FOCUSED) && this.setFocused(!0)
}, goog.ui.Control.prototype.handleBlur = function(e) {
    this.isAutoState(goog.ui.Component.State.ACTIVE) && this.setActive(!1), this.isAutoState(goog.ui.Component.State.FOCUSED) && this.setFocused(!1)
}, goog.ui.Control.prototype.handleKeyEvent = function(e) {
    return !!(this.isVisible() && this.isEnabled() && this.handleKeyEventInternal(e)) && (e.preventDefault(), e.stopPropagation(), !0)
}, goog.ui.Control.prototype.handleKeyEventInternal = function(e) {
    return e.keyCode == goog.events.KeyCodes.ENTER && this.performActionInternal(e)
}, goog.ui.registry.setDefaultRenderer(goog.ui.Control, goog.ui.ControlRenderer), goog.ui.registry.setDecoratorByClassName(goog.ui.ControlRenderer.CSS_CLASS, function() {
    return new goog.ui.Control(null)
}), goog.ui.Control.IeMouseEventSequenceSimulator_ = function(e) {
    goog.Disposable.call(this), this.control_ = e, this.clickExpected_ = !1, this.handler_ = new goog.events.EventHandler(this), this.registerDisposable(this.handler_), e = this.control_.getElementStrict(), this.handler_.listen(e, goog.events.EventType.MOUSEDOWN, this.handleMouseDown_).listen(e, goog.events.EventType.MOUSEUP, this.handleMouseUp_).listen(e, goog.events.EventType.CLICK, this.handleClick_)
}, goog.inherits(goog.ui.Control.IeMouseEventSequenceSimulator_, goog.Disposable), goog.ui.Control.IeMouseEventSequenceSimulator_.SYNTHETIC_EVENTS_ = !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9), goog.ui.Control.IeMouseEventSequenceSimulator_.prototype.handleMouseDown_ = function() {
    this.clickExpected_ = !1
}, goog.ui.Control.IeMouseEventSequenceSimulator_.prototype.handleMouseUp_ = function() {
    this.clickExpected_ = !0
}, goog.ui.Control.IeMouseEventSequenceSimulator_.makeLeftMouseEvent_ = function(e, o) {
    if (!goog.ui.Control.IeMouseEventSequenceSimulator_.SYNTHETIC_EVENTS_) return e.button = goog.events.BrowserEvent.MouseButton.LEFT, e.type = o, e;
    var t = document.createEvent("MouseEvents");
    return t.initMouseEvent(o, e.bubbles, e.cancelable, e.view || null, e.detail, e.screenX, e.screenY, e.clientX, e.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, goog.events.BrowserEvent.MouseButton.LEFT, e.relatedTarget || null), t
}, goog.ui.Control.IeMouseEventSequenceSimulator_.prototype.handleClick_ = function(e) {
    if (this.clickExpected_) this.clickExpected_ = !1;
    else {
        var o = e.getBrowserEvent(),
            t = o.button,
            n = o.type,
            r = goog.ui.Control.IeMouseEventSequenceSimulator_.makeLeftMouseEvent_(o, goog.events.EventType.MOUSEDOWN);
        this.control_.handleMouseDown(new goog.events.BrowserEvent(r, e.currentTarget)), r = goog.ui.Control.IeMouseEventSequenceSimulator_.makeLeftMouseEvent_(o, goog.events.EventType.MOUSEUP), this.control_.handleMouseUp(new goog.events.BrowserEvent(r, e.currentTarget)), goog.ui.Control.IeMouseEventSequenceSimulator_.SYNTHETIC_EVENTS_ || (o.button = t, o.type = n)
    }
}, goog.ui.Control.IeMouseEventSequenceSimulator_.prototype.disposeInternal = function() {
    this.control_ = null, goog.ui.Control.IeMouseEventSequenceSimulator_.superClass_.disposeInternal.call(this)
}, goog.ui.Container = function(e, o, t) {
    goog.ui.Component.call(this, t), this.renderer_ = o || goog.ui.ContainerRenderer.getInstance(), this.orientation_ = e || this.renderer_.getDefaultOrientation()
}, goog.inherits(goog.ui.Container, goog.ui.Component), goog.tagUnsealableClass(goog.ui.Container), goog.ui.Container.EventType = {
    AFTER_SHOW: "aftershow",
    AFTER_HIDE: "afterhide"
}, goog.ui.Container.Orientation = {
    HORIZONTAL: "horizontal",
    VERTICAL: "vertical"
}, goog.ui.Container.prototype.keyEventTarget_ = null, goog.ui.Container.prototype.keyHandler_ = null, goog.ui.Container.prototype.renderer_ = null, goog.ui.Container.prototype.orientation_ = null, goog.ui.Container.prototype.visible_ = !0, goog.ui.Container.prototype.enabled_ = !0, goog.ui.Container.prototype.focusable_ = !0, goog.ui.Container.prototype.highlightedIndex_ = -1, goog.ui.Container.prototype.openItem_ = null, goog.ui.Container.prototype.mouseButtonPressed_ = !1, goog.ui.Container.prototype.allowFocusableChildren_ = !1, goog.ui.Container.prototype.openFollowsHighlight_ = !0, goog.ui.Container.prototype.childElementIdMap_ = null, goog.ui.Container.prototype.getKeyEventTarget = function() {
    return this.keyEventTarget_ || this.renderer_.getKeyEventTarget(this)
}, goog.ui.Container.prototype.setKeyEventTarget = function(e) {
    if (!this.focusable_) throw Error("Can't set key event target for container that doesn't support keyboard focus!");
    var o = this.getKeyEventTarget(),
        t = this.isInDocument();
    this.keyEventTarget_ = e;
    var n = this.getKeyEventTarget();
    t && (this.keyEventTarget_ = o, this.enableFocusHandling_(!1), this.keyEventTarget_ = e, this.getKeyHandler().attach(n), this.enableFocusHandling_(!0))
}, goog.ui.Container.prototype.getKeyHandler = function() {
    return this.keyHandler_ || (this.keyHandler_ = new goog.events.KeyHandler(this.getKeyEventTarget()))
}, goog.ui.Container.prototype.getRenderer = function() {
    return this.renderer_
}, goog.ui.Container.prototype.setRenderer = function(e) {
    if (this.getElement()) throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
    this.renderer_ = e
}, goog.ui.Container.prototype.createDom = function() {
    this.setElementInternal(this.renderer_.createDom(this))
}, goog.ui.Container.prototype.getContentElement = function() {
    return this.renderer_.getContentElement(this.getElement())
}, goog.ui.Container.prototype.canDecorate = function(e) {
    return this.renderer_.canDecorate(e)
}, goog.ui.Container.prototype.decorateInternal = function(e) {
    this.setElementInternal(this.renderer_.decorate(this, e)), "none" == e.style.display && (this.visible_ = !1)
}, goog.ui.Container.prototype.enterDocument = function() {
    goog.ui.Container.superClass_.enterDocument.call(this), this.forEachChild(function(e) {
        e.isInDocument() && this.registerChildId_(e)
    }, this);
    var e = this.getElement();
    this.renderer_.initializeDom(this), this.setVisible(this.visible_, !0), this.getHandler().listen(this, goog.ui.Component.EventType.ENTER, this.handleEnterItem).listen(this, goog.ui.Component.EventType.HIGHLIGHT, this.handleHighlightItem).listen(this, goog.ui.Component.EventType.UNHIGHLIGHT, this.handleUnHighlightItem).listen(this, goog.ui.Component.EventType.OPEN, this.handleOpenItem).listen(this, goog.ui.Component.EventType.CLOSE, this.handleCloseItem).listen(e, goog.events.EventType.MOUSEDOWN, this.handleMouseDown).listen(goog.dom.getOwnerDocument(e), goog.events.EventType.MOUSEUP, this.handleDocumentMouseUp).listen(e, [goog.events.EventType.MOUSEDOWN, goog.events.EventType.MOUSEUP, goog.events.EventType.MOUSEOVER, goog.events.EventType.MOUSEOUT, goog.events.EventType.CONTEXTMENU], this.handleChildMouseEvents), this.isFocusable() && this.enableFocusHandling_(!0)
}, goog.ui.Container.prototype.enableFocusHandling_ = function(e) {
    var o = this.getHandler(),
        t = this.getKeyEventTarget();
    e ? o.listen(t, goog.events.EventType.FOCUS, this.handleFocus).listen(t, goog.events.EventType.BLUR, this.handleBlur).listen(this.getKeyHandler(), goog.events.KeyHandler.EventType.KEY, this.handleKeyEvent) : o.unlisten(t, goog.events.EventType.FOCUS, this.handleFocus).unlisten(t, goog.events.EventType.BLUR, this.handleBlur).unlisten(this.getKeyHandler(), goog.events.KeyHandler.EventType.KEY, this.handleKeyEvent)
}, goog.ui.Container.prototype.exitDocument = function() {
    this.setHighlightedIndex(-1), this.openItem_ && this.openItem_.setOpen(!1), this.mouseButtonPressed_ = !1, goog.ui.Container.superClass_.exitDocument.call(this)
}, goog.ui.Container.prototype.disposeInternal = function() {
    goog.ui.Container.superClass_.disposeInternal.call(this), this.keyHandler_ && (this.keyHandler_.dispose(), this.keyHandler_ = null), this.renderer_ = this.openItem_ = this.childElementIdMap_ = this.keyEventTarget_ = null
}, goog.ui.Container.prototype.handleEnterItem = function(e) {
    return !0
}, goog.ui.Container.prototype.handleHighlightItem = function(e) {
    var o = this.indexOfChild(e.target);
    if (-1 < o && o != this.highlightedIndex_) {
        var t = this.getHighlighted();
        t && t.setHighlighted(!1), this.highlightedIndex_ = o, t = this.getHighlighted(), this.isMouseButtonPressed() && t.setActive(!0), this.openFollowsHighlight_ && this.openItem_ && t != this.openItem_ && (t.isSupportedState(goog.ui.Component.State.OPENED) ? t.setOpen(!0) : this.openItem_.setOpen(!1))
    }
    o = this.getElement(), goog.asserts.assert(o, "The DOM element for the container cannot be null."), null != e.target.getElement() && goog.a11y.aria.setState(o, goog.a11y.aria.State.ACTIVEDESCENDANT, e.target.getElement().id)
}, goog.ui.Container.prototype.handleUnHighlightItem = function(e) {
    e.target == this.getHighlighted() && (this.highlightedIndex_ = -1), e = this.getElement(), goog.asserts.assert(e, "The DOM element for the container cannot be null."), goog.a11y.aria.removeState(e, goog.a11y.aria.State.ACTIVEDESCENDANT)
}, goog.ui.Container.prototype.handleOpenItem = function(e) {
    (e = e.target) && e != this.openItem_ && e.getParent() == this && (this.openItem_ && this.openItem_.setOpen(!1), this.openItem_ = e)
}, goog.ui.Container.prototype.handleCloseItem = function(e) {
    e.target == this.openItem_ && (this.openItem_ = null);
    var o = this.getElement(),
        t = e.target.getElement();
    o && e.target.isHighlighted() && t && goog.a11y.aria.setActiveDescendant(o, t)
}, goog.ui.Container.prototype.handleMouseDown = function(e) {
    this.enabled_ && this.setMouseButtonPressed(!0);
    var o = this.getKeyEventTarget();
    o && goog.dom.isFocusableTabIndex(o) ? o.focus() : e.preventDefault()
}, goog.ui.Container.prototype.handleDocumentMouseUp = function(e) {
    this.setMouseButtonPressed(!1)
}, goog.ui.Container.prototype.handleChildMouseEvents = function(e) {
    var o = this.getOwnerControl(e.target);
    if (o) switch (e.type) {
        case goog.events.EventType.MOUSEDOWN:
            o.handleMouseDown(e);
            break;
        case goog.events.EventType.MOUSEUP:
            o.handleMouseUp(e);
            break;
        case goog.events.EventType.MOUSEOVER:
            o.handleMouseOver(e);
            break;
        case goog.events.EventType.MOUSEOUT:
            o.handleMouseOut(e);
            break;
        case goog.events.EventType.CONTEXTMENU:
            o.handleContextMenu(e)
    }
}, goog.ui.Container.prototype.getOwnerControl = function(e) {
    if (this.childElementIdMap_)
        for (var o = this.getElement(); e && e !== o;) {
            var t = e.id;
            if (t in this.childElementIdMap_) return this.childElementIdMap_[t];
            e = e.parentNode
        }
    return null
}, goog.ui.Container.prototype.handleFocus = function(e) {}, goog.ui.Container.prototype.handleBlur = function(e) {
    this.setHighlightedIndex(-1), this.setMouseButtonPressed(!1), this.openItem_ && this.openItem_.setOpen(!1)
}, goog.ui.Container.prototype.handleKeyEvent = function(e) {
    return !(!this.isEnabled() || !this.isVisible() || 0 == this.getChildCount() && !this.keyEventTarget_ || !this.handleKeyEventInternal(e)) && (e.preventDefault(), e.stopPropagation(), !0)
}, goog.ui.Container.prototype.handleKeyEventInternal = function(e) {
    var o = this.getHighlighted();
    if (o && "function" == typeof o.handleKeyEvent && o.handleKeyEvent(e) || this.openItem_ && this.openItem_ != o && "function" == typeof this.openItem_.handleKeyEvent && this.openItem_.handleKeyEvent(e)) return !0;
    if (e.shiftKey || e.ctrlKey || e.metaKey || e.altKey) return !1;
    switch (e.keyCode) {
        case goog.events.KeyCodes.ESC:
            if (!this.isFocusable()) return !1;
            this.getKeyEventTarget().blur();
            break;
        case goog.events.KeyCodes.HOME:
            this.highlightFirst();
            break;
        case goog.events.KeyCodes.END:
            this.highlightLast();
            break;
        case goog.events.KeyCodes.UP:
            if (this.orientation_ != goog.ui.Container.Orientation.VERTICAL) return !1;
            this.highlightPrevious();
            break;
        case goog.events.KeyCodes.LEFT:
            if (this.orientation_ != goog.ui.Container.Orientation.HORIZONTAL) return !1;
            this.isRightToLeft() ? this.highlightNext() : this.highlightPrevious();
            break;
        case goog.events.KeyCodes.DOWN:
            if (this.orientation_ != goog.ui.Container.Orientation.VERTICAL) return !1;
            this.highlightNext();
            break;
        case goog.events.KeyCodes.RIGHT:
            if (this.orientation_ != goog.ui.Container.Orientation.HORIZONTAL) return !1;
            this.isRightToLeft() ? this.highlightPrevious() : this.highlightNext();
            break;
        default:
            return !1
    }
    return !0
}, goog.ui.Container.prototype.registerChildId_ = function(e) {
    var o = (o = e.getElement()).id || (o.id = e.getId());
    this.childElementIdMap_ || (this.childElementIdMap_ = {}), this.childElementIdMap_[o] = e
}, goog.ui.Container.prototype.addChild = function(e, o) {
    goog.asserts.assertInstanceof(e, goog.ui.Control, "The child of a container must be a control"), goog.ui.Container.superClass_.addChild.call(this, e, o)
}, goog.ui.Container.prototype.addChildAt = function(e, o, t) {
    goog.asserts.assertInstanceof(e, goog.ui.Control), e.setDispatchTransitionEvents(goog.ui.Component.State.HOVER, !0), e.setDispatchTransitionEvents(goog.ui.Component.State.OPENED, !0), !this.isFocusable() && this.isFocusableChildrenAllowed() || e.setSupportedState(goog.ui.Component.State.FOCUSED, !1), e.setHandleMouseEvents(!1);
    var n = e.getParent() == this ? this.indexOfChild(e) : -1;
    goog.ui.Container.superClass_.addChildAt.call(this, e, o, t), e.isInDocument() && this.isInDocument() && this.registerChildId_(e), this.updateHighlightedIndex_(n, o)
}, goog.ui.Container.prototype.updateHighlightedIndex_ = function(e, o) {
    -1 == e && (e = this.getChildCount()), e == this.highlightedIndex_ ? this.highlightedIndex_ = Math.min(this.getChildCount() - 1, o) : e > this.highlightedIndex_ && o <= this.highlightedIndex_ ? this.highlightedIndex_++ : e < this.highlightedIndex_ && o > this.highlightedIndex_ && this.highlightedIndex_--
}, goog.ui.Container.prototype.removeChild = function(e, o) {
    if (e = goog.isString(e) ? this.getChild(e) : e, goog.asserts.assertInstanceof(e, goog.ui.Control), e) {
        var t = this.indexOfChild(e); - 1 != t && (t == this.highlightedIndex_ ? (e.setHighlighted(!1), this.highlightedIndex_ = -1) : t < this.highlightedIndex_ && this.highlightedIndex_--), (t = e.getElement()) && t.id && this.childElementIdMap_ && goog.object.remove(this.childElementIdMap_, t.id)
    }
    return (e = goog.ui.Container.superClass_.removeChild.call(this, e, o)).setHandleMouseEvents(!0), e
}, goog.ui.Container.prototype.getOrientation = function() {
    return this.orientation_
}, goog.ui.Container.prototype.setOrientation = function(e) {
    if (this.getElement()) throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
    this.orientation_ = e
}, goog.ui.Container.prototype.isVisible = function() {
    return this.visible_
}, goog.ui.Container.prototype.setVisible = function(e, o) {
    if (o || this.visible_ != e && this.dispatchEvent(e ? goog.ui.Component.EventType.SHOW : goog.ui.Component.EventType.HIDE)) {
        this.visible_ = e;
        var t = this.getElement();
        return t && (goog.style.setElementShown(t, e), this.isFocusable() && this.renderer_.enableTabIndex(this.getKeyEventTarget(), this.enabled_ && this.visible_), o || this.dispatchEvent(this.visible_ ? goog.ui.Container.EventType.AFTER_SHOW : goog.ui.Container.EventType.AFTER_HIDE)), !0
    }
    return !1
}, goog.ui.Container.prototype.isEnabled = function() {
    return this.enabled_
}, goog.ui.Container.prototype.setEnabled = function(e) {
    this.enabled_ != e && this.dispatchEvent(e ? goog.ui.Component.EventType.ENABLE : goog.ui.Component.EventType.DISABLE) && (e ? (this.enabled_ = !0, this.forEachChild(function(e) {
        e.wasDisabled ? delete e.wasDisabled : e.setEnabled(!0)
    })) : (this.forEachChild(function(e) {
        e.isEnabled() ? e.setEnabled(!1) : e.wasDisabled = !0
    }), this.enabled_ = !1, this.setMouseButtonPressed(!1)), this.isFocusable() && this.renderer_.enableTabIndex(this.getKeyEventTarget(), e && this.visible_))
}, goog.ui.Container.prototype.isFocusable = function() {
    return this.focusable_
}, goog.ui.Container.prototype.setFocusable = function(e) {
    e != this.focusable_ && this.isInDocument() && this.enableFocusHandling_(e), this.focusable_ = e, this.enabled_ && this.visible_ && this.renderer_.enableTabIndex(this.getKeyEventTarget(), e)
}, goog.ui.Container.prototype.isFocusableChildrenAllowed = function() {
    return this.allowFocusableChildren_
}, goog.ui.Container.prototype.setFocusableChildrenAllowed = function(e) {
    this.allowFocusableChildren_ = e
}, goog.ui.Container.prototype.isOpenFollowsHighlight = function() {
    return this.openFollowsHighlight_
}, goog.ui.Container.prototype.setOpenFollowsHighlight = function(e) {
    this.openFollowsHighlight_ = e
}, goog.ui.Container.prototype.getHighlightedIndex = function() {
    return this.highlightedIndex_
}, goog.ui.Container.prototype.setHighlightedIndex = function(e) {
    (e = this.getChildAt(e)) ? e.setHighlighted(!0): -1 < this.highlightedIndex_ && this.getHighlighted().setHighlighted(!1)
}, goog.ui.Container.prototype.setHighlighted = function(e) {
    this.setHighlightedIndex(this.indexOfChild(e))
}, goog.ui.Container.prototype.getHighlighted = function() {
    return this.getChildAt(this.highlightedIndex_)
}, goog.ui.Container.prototype.highlightFirst = function() {
    this.highlightHelper(function(e, o) {
        return (e + 1) % o
    }, this.getChildCount() - 1)
}, goog.ui.Container.prototype.highlightLast = function() {
    this.highlightHelper(function(e, o) {
        return e--, 0 > e ? o - 1 : e
    }, 0)
}, goog.ui.Container.prototype.highlightNext = function() {
    this.highlightHelper(function(e, o) {
        return (e + 1) % o
    }, this.highlightedIndex_)
}, goog.ui.Container.prototype.highlightPrevious = function() {
    this.highlightHelper(function(e, o) {
        return e--, 0 > e ? o - 1 : e
    }, this.highlightedIndex_)
}, goog.ui.Container.prototype.highlightHelper = function(e, o) {
    for (var t = 0 > o ? this.indexOfChild(this.openItem_) : o, n = this.getChildCount(), t = e.call(this, t, n), r = 0; r <= n;) {
        var i = this.getChildAt(t);
        if (i && this.canHighlightItem(i)) return this.setHighlightedIndexFromKeyEvent(t), !0;
        r++, t = e.call(this, t, n)
    }
    return !1
}, goog.ui.Container.prototype.canHighlightItem = function(e) {
    return e.isVisible() && e.isEnabled() && e.isSupportedState(goog.ui.Component.State.HOVER)
}, goog.ui.Container.prototype.setHighlightedIndexFromKeyEvent = function(e) {
    this.setHighlightedIndex(e)
}, goog.ui.Container.prototype.getOpenItem = function() {
    return this.openItem_
}, goog.ui.Container.prototype.isMouseButtonPressed = function() {
    return this.mouseButtonPressed_
}, goog.ui.Container.prototype.setMouseButtonPressed = function(e) {
    this.mouseButtonPressed_ = e
}, goog.ui.MenuHeaderRenderer = function() {
    goog.ui.ControlRenderer.call(this)
}, goog.inherits(goog.ui.MenuHeaderRenderer, goog.ui.ControlRenderer), goog.addSingletonGetter(goog.ui.MenuHeaderRenderer), goog.ui.MenuHeaderRenderer.CSS_CLASS = "goog-menuheader", goog.ui.MenuHeaderRenderer.prototype.getCssClass = function() {
    return goog.ui.MenuHeaderRenderer.CSS_CLASS
}, goog.ui.MenuHeader = function(e, o, t) {
    goog.ui.Control.call(this, e, t || goog.ui.MenuHeaderRenderer.getInstance(), o), this.setSupportedState(goog.ui.Component.State.DISABLED, !1), this.setSupportedState(goog.ui.Component.State.HOVER, !1), this.setSupportedState(goog.ui.Component.State.ACTIVE, !1), this.setSupportedState(goog.ui.Component.State.FOCUSED, !1), this.setStateInternal(goog.ui.Component.State.DISABLED)
}, goog.inherits(goog.ui.MenuHeader, goog.ui.Control), goog.ui.registry.setDecoratorByClassName(goog.ui.MenuHeaderRenderer.CSS_CLASS, function() {
    return new goog.ui.MenuHeader(null)
}), goog.ui.MenuItemRenderer = function() {
    goog.ui.ControlRenderer.call(this), this.classNameCache_ = []
}, goog.inherits(goog.ui.MenuItemRenderer, goog.ui.ControlRenderer), goog.addSingletonGetter(goog.ui.MenuItemRenderer), goog.ui.MenuItemRenderer.CSS_CLASS = "goog-menuitem", goog.ui.MenuItemRenderer.CompositeCssClassIndex_ = {
    HOVER: 0,
    CHECKBOX: 1,
    CONTENT: 2
}, goog.ui.MenuItemRenderer.prototype.getCompositeCssClass_ = function(e) {
    var o = this.classNameCache_[e];
    if (!o) {
        switch (e) {
            case goog.ui.MenuItemRenderer.CompositeCssClassIndex_.HOVER:
                o = this.getStructuralCssClass() + "-highlight";
                break;
            case goog.ui.MenuItemRenderer.CompositeCssClassIndex_.CHECKBOX:
                o = this.getStructuralCssClass() + "-checkbox";
                break;
            case goog.ui.MenuItemRenderer.CompositeCssClassIndex_.CONTENT:
                o = this.getStructuralCssClass() + "-content"
        }
        this.classNameCache_[e] = o
    }
    return o
}, goog.ui.MenuItemRenderer.prototype.getAriaRole = function() {
    return goog.a11y.aria.Role.MENU_ITEM
}, goog.ui.MenuItemRenderer.prototype.createDom = function(e) {
    var o = e.getDomHelper().createDom("DIV", this.getClassNames(e).join(" "), this.createContent(e.getContent(), e.getDomHelper()));
    return this.setEnableCheckBoxStructure(e, o, e.isSupportedState(goog.ui.Component.State.SELECTED) || e.isSupportedState(goog.ui.Component.State.CHECKED)), o
}, goog.ui.MenuItemRenderer.prototype.getContentElement = function(e) {
    return e && e.firstChild
}, goog.ui.MenuItemRenderer.prototype.decorate = function(e, o) {
    return goog.asserts.assert(o), this.hasContentStructure(o) || o.appendChild(this.createContent(o.childNodes, e.getDomHelper())), goog.dom.classlist.contains(o, "goog-option") && (e.setCheckable(!0), this.setCheckable(e, o, !0)), goog.ui.MenuItemRenderer.superClass_.decorate.call(this, e, o)
}, goog.ui.MenuItemRenderer.prototype.setContent = function(e, o) {
    var t = this.getContentElement(e),
        n = this.hasCheckBoxStructure(e) ? t.firstChild : null;
    goog.ui.MenuItemRenderer.superClass_.setContent.call(this, e, o), n && !this.hasCheckBoxStructure(e) && t.insertBefore(n, t.firstChild || null)
}, goog.ui.MenuItemRenderer.prototype.hasContentStructure = function(e) {
    e = goog.dom.getFirstElementChild(e);
    var o = this.getCompositeCssClass_(goog.ui.MenuItemRenderer.CompositeCssClassIndex_.CONTENT);
    return !!e && goog.dom.classlist.contains(e, o)
}, goog.ui.MenuItemRenderer.prototype.createContent = function(e, o) {
    var t = this.getCompositeCssClass_(goog.ui.MenuItemRenderer.CompositeCssClassIndex_.CONTENT);
    return o.createDom("DIV", t, e)
}, goog.ui.MenuItemRenderer.prototype.setSelectable = function(e, o, t) {
    e && o && this.setEnableCheckBoxStructure(e, o, t)
}, goog.ui.MenuItemRenderer.prototype.setCheckable = function(e, o, t) {
    e && o && this.setEnableCheckBoxStructure(e, o, t)
}, goog.ui.MenuItemRenderer.prototype.hasCheckBoxStructure = function(e) {
    if (e = this.getContentElement(e)) {
        e = e.firstChild;
        var o = this.getCompositeCssClass_(goog.ui.MenuItemRenderer.CompositeCssClassIndex_.CHECKBOX);
        return !!e && goog.dom.isElement(e) && goog.dom.classlist.contains(e, o)
    }
    return !1
}, goog.ui.MenuItemRenderer.prototype.setEnableCheckBoxStructure = function(e, o, t) {
    this.setAriaRole(o, e.getPreferredAriaRole()), this.setAriaStates(e, o), t != this.hasCheckBoxStructure(o) && (goog.dom.classlist.enable(o, "goog-option", t), o = this.getContentElement(o), t ? (t = this.getCompositeCssClass_(goog.ui.MenuItemRenderer.CompositeCssClassIndex_.CHECKBOX), o.insertBefore(e.getDomHelper().createDom("DIV", t), o.firstChild || null)) : o.removeChild(o.firstChild))
}, goog.ui.MenuItemRenderer.prototype.getClassForState = function(e) {
    switch (e) {
        case goog.ui.Component.State.HOVER:
            return this.getCompositeCssClass_(goog.ui.MenuItemRenderer.CompositeCssClassIndex_.HOVER);
        case goog.ui.Component.State.CHECKED:
        case goog.ui.Component.State.SELECTED:
            return "goog-option-selected";
        default:
            return goog.ui.MenuItemRenderer.superClass_.getClassForState.call(this, e)
    }
}, goog.ui.MenuItemRenderer.prototype.getStateFromClass = function(e) {
    var o = this.getCompositeCssClass_(goog.ui.MenuItemRenderer.CompositeCssClassIndex_.HOVER);
    switch (e) {
        case "goog-option-selected":
            return goog.ui.Component.State.CHECKED;
        case o:
            return goog.ui.Component.State.HOVER;
        default:
            return goog.ui.MenuItemRenderer.superClass_.getStateFromClass.call(this, e)
    }
}, goog.ui.MenuItemRenderer.prototype.getCssClass = function() {
    return goog.ui.MenuItemRenderer.CSS_CLASS
}, goog.ui.MenuItem = function(e, o, t, n) {
    goog.ui.Control.call(this, e, n || goog.ui.MenuItemRenderer.getInstance(), t), this.setValue(o)
}, goog.inherits(goog.ui.MenuItem, goog.ui.Control), goog.tagUnsealableClass(goog.ui.MenuItem), goog.ui.MenuItem.MNEMONIC_WRAPPER_CLASS_ = "goog-menuitem-mnemonic-separator", goog.ui.MenuItem.ACCELERATOR_CLASS = "goog-menuitem-accel", goog.ui.MenuItem.prototype.getValue = function() {
    var e = this.getModel();
    return null != e ? e : this.getCaption()
}, goog.ui.MenuItem.prototype.setValue = function(e) {
    this.setModel(e)
}, goog.ui.MenuItem.prototype.setSupportedState = function(e, o) {
    switch (goog.ui.MenuItem.superClass_.setSupportedState.call(this, e, o), e) {
        case goog.ui.Component.State.SELECTED:
            this.setSelectableInternal_(o);
            break;
        case goog.ui.Component.State.CHECKED:
            this.setCheckableInternal_(o)
    }
}, goog.ui.MenuItem.prototype.setSelectable = function(e) {
    this.setSupportedState(goog.ui.Component.State.SELECTED, e)
}, goog.ui.MenuItem.prototype.setSelectableInternal_ = function(e) {
    this.isChecked() && !e && this.setChecked(!1);
    var o = this.getElement();
    o && this.getRenderer().setSelectable(this, o, e)
}, goog.ui.MenuItem.prototype.setCheckable = function(e) {
    this.setSupportedState(goog.ui.Component.State.CHECKED, e)
}, goog.ui.MenuItem.prototype.setCheckableInternal_ = function(e) {
    var o = this.getElement();
    o && this.getRenderer().setCheckable(this, o, e)
}, goog.ui.MenuItem.prototype.getCaption = function() {
    t = this.getContent();
    if (goog.isArray(t)) {
        var e = goog.ui.MenuItem.ACCELERATOR_CLASS,
            o = goog.ui.MenuItem.MNEMONIC_WRAPPER_CLASS_,
            t = goog.array.map(t, function(t) {
                return goog.dom.isElement(t) && (goog.dom.classlist.contains(t, e) || goog.dom.classlist.contains(t, o)) ? "" : goog.dom.getRawTextContent(t)
            }).join("");
        return goog.string.collapseBreakingSpaces(t)
    }
    return goog.ui.MenuItem.superClass_.getCaption.call(this)
}, goog.ui.MenuItem.prototype.getAccelerator = function() {
    var e = this.getDomHelper(),
        o = this.getContent();
    return goog.isArray(o) && (o = goog.array.find(o, function(e) {
        return goog.dom.classlist.contains(e, goog.ui.MenuItem.ACCELERATOR_CLASS)
    })) ? e.getTextContent(o) : null
}, goog.ui.MenuItem.prototype.handleMouseUp = function(e) {
    var o = this.getParent();
    if (o) {
        var t = o.openingCoords;
        if (o.openingCoords = null, t && goog.isNumber(e.clientX) && (o = new goog.math.Coordinate(e.clientX, e.clientY), goog.math.Coordinate.equals(t, o))) return
    }
    goog.ui.MenuItem.superClass_.handleMouseUp.call(this, e)
}, goog.ui.MenuItem.prototype.handleKeyEventInternal = function(e) {
    return !(e.keyCode != this.getMnemonic() || !this.performActionInternal(e)) || goog.ui.MenuItem.superClass_.handleKeyEventInternal.call(this, e)
}, goog.ui.MenuItem.prototype.setMnemonic = function(e) {
    this.mnemonicKey_ = e
}, goog.ui.MenuItem.prototype.getMnemonic = function() {
    return this.mnemonicKey_
}, goog.ui.registry.setDecoratorByClassName(goog.ui.MenuItemRenderer.CSS_CLASS, function() {
    return new goog.ui.MenuItem(null)
}), goog.ui.MenuItem.prototype.getPreferredAriaRole = function() {
    return this.isSupportedState(goog.ui.Component.State.CHECKED) ? goog.a11y.aria.Role.MENU_ITEM_CHECKBOX : this.isSupportedState(goog.ui.Component.State.SELECTED) ? goog.a11y.aria.Role.MENU_ITEM_RADIO : goog.ui.MenuItem.superClass_.getPreferredAriaRole.call(this)
}, goog.ui.MenuItem.prototype.getParent = function() {
    return goog.ui.Control.prototype.getParent.call(this)
}, goog.ui.MenuItem.prototype.getParentEventTarget = function() {
    return goog.ui.Control.prototype.getParentEventTarget.call(this)
}, goog.ui.MenuSeparatorRenderer = function() {
    goog.ui.ControlRenderer.call(this)
}, goog.inherits(goog.ui.MenuSeparatorRenderer, goog.ui.ControlRenderer), goog.addSingletonGetter(goog.ui.MenuSeparatorRenderer), goog.ui.MenuSeparatorRenderer.CSS_CLASS = "goog-menuseparator", goog.ui.MenuSeparatorRenderer.prototype.createDom = function(e) {
    return e.getDomHelper().createDom("DIV", this.getCssClass())
}, goog.ui.MenuSeparatorRenderer.prototype.decorate = function(e, o) {
    if (o.id && e.setId(o.id), "HR" == o.tagName) {
        var t = o;
        o = this.createDom(e), goog.dom.insertSiblingBefore(o, t), goog.dom.removeNode(t)
    } else goog.dom.classlist.add(o, this.getCssClass());
    return o
}, goog.ui.MenuSeparatorRenderer.prototype.setContent = function(e, o) {}, goog.ui.MenuSeparatorRenderer.prototype.getCssClass = function() {
    return goog.ui.MenuSeparatorRenderer.CSS_CLASS
}, goog.ui.Separator = function(e, o) {
    goog.ui.Control.call(this, null, e || goog.ui.MenuSeparatorRenderer.getInstance(), o), this.setSupportedState(goog.ui.Component.State.DISABLED, !1), this.setSupportedState(goog.ui.Component.State.HOVER, !1), this.setSupportedState(goog.ui.Component.State.ACTIVE, !1), this.setSupportedState(goog.ui.Component.State.FOCUSED, !1), this.setStateInternal(goog.ui.Component.State.DISABLED)
}, goog.inherits(goog.ui.Separator, goog.ui.Control), goog.ui.Separator.prototype.enterDocument = function() {
    goog.ui.Separator.superClass_.enterDocument.call(this);
    var e = this.getElement();
    goog.asserts.assert(e, "The DOM element for the separator cannot be null."), goog.a11y.aria.setRole(e, "separator")
}, goog.ui.registry.setDecoratorByClassName(goog.ui.MenuSeparatorRenderer.CSS_CLASS, function() {
    return new goog.ui.Separator
}), goog.ui.MenuRenderer = function(e) {
    goog.ui.ContainerRenderer.call(this, e || goog.a11y.aria.Role.MENU)
}, goog.inherits(goog.ui.MenuRenderer, goog.ui.ContainerRenderer), goog.addSingletonGetter(goog.ui.MenuRenderer), goog.ui.MenuRenderer.CSS_CLASS = "goog-menu", goog.ui.MenuRenderer.prototype.canDecorate = function(e) {
    return "UL" == e.tagName || goog.ui.MenuRenderer.superClass_.canDecorate.call(this, e)
}, goog.ui.MenuRenderer.prototype.getDecoratorForChild = function(e) {
    return "HR" == e.tagName ? new goog.ui.Separator : goog.ui.MenuRenderer.superClass_.getDecoratorForChild.call(this, e)
}, goog.ui.MenuRenderer.prototype.containsElement = function(e, o) {
    return goog.dom.contains(e.getElement(), o)
}, goog.ui.MenuRenderer.prototype.getCssClass = function() {
    return goog.ui.MenuRenderer.CSS_CLASS
}, goog.ui.MenuRenderer.prototype.initializeDom = function(e) {
    goog.ui.MenuRenderer.superClass_.initializeDom.call(this, e), e = e.getElement(), goog.asserts.assert(e, "The menu DOM element cannot be null."), goog.a11y.aria.setState(e, goog.a11y.aria.State.HASPOPUP, "true")
}, goog.ui.MenuSeparator = function(e) {
    goog.ui.Separator.call(this, goog.ui.MenuSeparatorRenderer.getInstance(), e)
}, goog.inherits(goog.ui.MenuSeparator, goog.ui.Separator), goog.ui.registry.setDecoratorByClassName(goog.ui.MenuSeparatorRenderer.CSS_CLASS, function() {
    return new goog.ui.Separator
}), goog.ui.Menu = function(e, o) {
    goog.ui.Container.call(this, goog.ui.Container.Orientation.VERTICAL, o || goog.ui.MenuRenderer.getInstance(), e), this.setFocusable(!1)
}, goog.inherits(goog.ui.Menu, goog.ui.Container), goog.tagUnsealableClass(goog.ui.Menu), goog.ui.Menu.EventType = {
    BEFORE_SHOW: goog.ui.Component.EventType.BEFORE_SHOW,
    SHOW: goog.ui.Component.EventType.SHOW,
    BEFORE_HIDE: goog.ui.Component.EventType.HIDE,
    HIDE: goog.ui.Component.EventType.HIDE
}, goog.ui.Menu.CSS_CLASS = goog.ui.MenuRenderer.CSS_CLASS, goog.ui.Menu.prototype.allowAutoFocus_ = !0, goog.ui.Menu.prototype.allowHighlightDisabled_ = !1, goog.ui.Menu.prototype.getCssClass = function() {
    return this.getRenderer().getCssClass()
}, goog.ui.Menu.prototype.containsElement = function(e) {
    if (this.getRenderer().containsElement(this, e)) return !0;
    for (var o = 0, t = this.getChildCount(); o < t; o++) {
        var n = this.getChildAt(o);
        if ("function" == typeof n.containsElement && n.containsElement(e)) return !0
    }
    return !1
}, goog.ui.Menu.prototype.addItem = function(e) {
    this.addChild(e, !0)
}, goog.ui.Menu.prototype.addItemAt = function(e, o) {
    this.addChildAt(e, o, !0)
}, goog.ui.Menu.prototype.removeItem = function(e) {
    (e = this.removeChild(e, !0)) && e.dispose()
}, goog.ui.Menu.prototype.removeItemAt = function(e) {
    (e = this.removeChildAt(e, !0)) && e.dispose()
}, goog.ui.Menu.prototype.getItemAt = function(e) {
    return this.getChildAt(e)
}, goog.ui.Menu.prototype.getItemCount = function() {
    return this.getChildCount()
}, goog.ui.Menu.prototype.getItems = function() {
    var e = [];
    return this.forEachChild(function(o) {
        e.push(o)
    }), e
}, goog.ui.Menu.prototype.setPosition = function(e, o) {
    var t = this.isVisible();
    t || goog.style.setElementShown(this.getElement(), !0), goog.style.setPageOffset(this.getElement(), e, o), t || goog.style.setElementShown(this.getElement(), !1)
}, goog.ui.Menu.prototype.getPosition = function() {
    return this.isVisible() ? goog.style.getPageOffset(this.getElement()) : null
}, goog.ui.Menu.prototype.setAllowAutoFocus = function(e) {
    (this.allowAutoFocus_ = e) && this.setFocusable(!0)
}, goog.ui.Menu.prototype.getAllowAutoFocus = function() {
    return this.allowAutoFocus_
}, goog.ui.Menu.prototype.setAllowHighlightDisabled = function(e) {
    this.allowHighlightDisabled_ = e
}, goog.ui.Menu.prototype.getAllowHighlightDisabled = function() {
    return this.allowHighlightDisabled_
}, goog.ui.Menu.prototype.setVisible = function(e, o, t) {
    return (o = goog.ui.Menu.superClass_.setVisible.call(this, e, o)) && e && this.isInDocument() && this.allowAutoFocus_ && this.getKeyEventTarget().focus(), e && t && goog.isNumber(t.clientX) ? this.openingCoords = new goog.math.Coordinate(t.clientX, t.clientY) : this.openingCoords = null, o
}, goog.ui.Menu.prototype.handleEnterItem = function(e) {
    return this.allowAutoFocus_ && this.getKeyEventTarget().focus(), goog.ui.Menu.superClass_.handleEnterItem.call(this, e)
}, goog.ui.Menu.prototype.highlightNextPrefix = function(e) {
    var o = new RegExp("^" + goog.string.regExpEscape(e), "i");
    return this.highlightHelper(function(e, t) {
        var n = 0 > e ? 0 : e,
            r = !1;
        do {
            ++e == t && (e = 0, r = !0);
            var i = this.getChildAt(e).getCaption();
            if (i && i.match(o)) return e
        } while (!r || e != n);
        return this.getHighlightedIndex()
    }, this.getHighlightedIndex())
}, goog.ui.Menu.prototype.canHighlightItem = function(e) {
    return (this.allowHighlightDisabled_ || e.isEnabled()) && e.isVisible() && e.isSupportedState(goog.ui.Component.State.HOVER)
}, goog.ui.Menu.prototype.decorateInternal = function(e) {
    this.decorateContent(e), goog.ui.Menu.superClass_.decorateInternal.call(this, e)
}, goog.ui.Menu.prototype.handleKeyEventInternal = function(e) {
    var o = goog.ui.Menu.superClass_.handleKeyEventInternal.call(this, e);
    return o || this.forEachChild(function(t) {
        !o && t.getMnemonic && t.getMnemonic() == e.keyCode && (this.isEnabled() && this.setHighlighted(t), o = t.handleKeyEvent(e))
    }, this), o
}, goog.ui.Menu.prototype.setHighlightedIndex = function(e) {
    goog.ui.Menu.superClass_.setHighlightedIndex.call(this, e), (e = this.getChildAt(e)) && goog.style.scrollIntoContainerView(e.getElement(), this.getElement())
}, goog.ui.Menu.prototype.decorateContent = function(e) {
    for (var o = this.getRenderer(), t = (e = this.getDomHelper().getElementsByTagNameAndClass("DIV", o.getCssClass() + "-content", e)).length, n = 0; n < t; n++) o.decorateChildren(this, e[n])
}, goog.color = {}, goog.color.names = {
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aqua: "#00ffff",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    black: "#000000",
    blanchedalmond: "#ffebcd",
    blue: "#0000ff",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkgrey: "#a9a9a9",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkslategrey: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dimgrey: "#696969",
    dodgerblue: "#1e90ff",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    fuchsia: "#ff00ff",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    gold: "#ffd700",
    goldenrod: "#daa520",
    gray: "#808080",
    green: "#008000",
    greenyellow: "#adff2f",
    grey: "#808080",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    indianred: "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    lavender: "#e6e6fa",
    lavenderblush: "#fff0f5",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgray: "#d3d3d3",
    lightgreen: "#90ee90",
    lightgrey: "#d3d3d3",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslategray: "#778899",
    lightslategrey: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    maroon: "#800000",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370db",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    navy: "#000080",
    oldlace: "#fdf5e6",
    olive: "#808000",
    olivedrab: "#6b8e23",
    orange: "#ffa500",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#db7093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    purple: "#800080",
    red: "#ff0000",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    silver: "#c0c0c0",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    slategrey: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    steelblue: "#4682b4",
    tan: "#d2b48c",
    teal: "#008080",
    thistle: "#d8bfd8",
    tomato: "#ff6347",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    wheat: "#f5deb3",
    white: "#ffffff",
    whitesmoke: "#f5f5f5",
    yellow: "#ffff00",
    yellowgreen: "#9acd32"
}, goog.color.parse = function(e) {
    var o = {};
    e = String(e);
    var t = goog.color.prependHashIfNecessaryHelper(e);
    if (goog.color.isValidHexColor_(t)) return o.hex = goog.color.normalizeHex(t), o.type = "hex", o;
    if ((t = goog.color.isValidRgbColor_(e)).length) return o.hex = goog.color.rgbArrayToHex(t), o.type = "rgb", o;
    if (goog.color.names && (t = goog.color.names[e.toLowerCase()])) return o.hex = t, o.type = "named", o;
    throw Error(e + " is not a valid color string")
}, goog.color.isValidColor = function(e) {
    var o = goog.color.prependHashIfNecessaryHelper(e);
    return !!(goog.color.isValidHexColor_(o) || goog.color.isValidRgbColor_(e).length || goog.color.names && goog.color.names[e.toLowerCase()])
}, goog.color.parseRgb = function(e) {
    var o = goog.color.isValidRgbColor_(e);
    if (!o.length) throw Error(e + " is not a valid RGB color");
    return o
}, goog.color.hexToRgbStyle = function(e) {
    return goog.color.rgbStyle_(goog.color.hexToRgb(e))
}, goog.color.hexTripletRe_ = /#(.)(.)(.)/, goog.color.normalizeHex = function(e) {
    if (!goog.color.isValidHexColor_(e)) throw Error("'" + e + "' is not a valid hex color");
    return 4 == e.length && (e = e.replace(goog.color.hexTripletRe_, "#$1$1$2$2$3$3")), e.toLowerCase()
}, goog.color.hexToRgb = function(e) {
    e = goog.color.normalizeHex(e);
    var o = parseInt(e.substr(1, 2), 16),
        t = parseInt(e.substr(3, 2), 16);
    return e = parseInt(e.substr(5, 2), 16), [o, t, e]
}, goog.color.rgbToHex = function(e, o, t) {
    if (e = Number(e), o = Number(o), t = Number(t), e != (255 & e) || o != (255 & o) || t != (255 & t)) throw Error('"(' + e + "," + o + "," + t + '") is not a valid RGB color');
    return e = goog.color.prependZeroIfNecessaryHelper(e.toString(16)), o = goog.color.prependZeroIfNecessaryHelper(o.toString(16)), t = goog.color.prependZeroIfNecessaryHelper(t.toString(16)), "#" + e + o + t
}, goog.color.rgbArrayToHex = function(e) {
    return goog.color.rgbToHex(e[0], e[1], e[2])
}, goog.color.rgbToHsl = function(e, o, t) {
    e /= 255, o /= 255, t /= 255;
    var n = Math.max(e, o, t),
        r = Math.min(e, o, t),
        i = 0,
        s = 0,
        l = .5 * (n + r);
    return n != r && (n == e ? i = 60 * (o - t) / (n - r) : n == o ? i = 60 * (t - e) / (n - r) + 120 : n == t && (i = 60 * (e - o) / (n - r) + 240), s = 0 < l && .5 >= l ? (n - r) / (2 * l) : (n - r) / (2 - 2 * l)), [Math.round(i + 360) % 360, s, l]
}, goog.color.rgbArrayToHsl = function(e) {
    return goog.color.rgbToHsl(e[0], e[1], e[2])
}, goog.color.hueToRgb_ = function(e, o, t) {
    return 0 > t ? t += 1 : 1 < t && --t, 1 > 6 * t ? e + 6 * (o - e) * t : 1 > 2 * t ? o : 2 > 3 * t ? e + (o - e) * (2 / 3 - t) * 6 : e
}, goog.color.hslToRgb = function(e, o, t) {
    if (e /= 360, 0 == o) t = o = e = 255 * t;
    else {
        var n = .5 > t ? t * (1 + o) : t + o - o * t,
            r = 2 * t - n;
        t = 255 * goog.color.hueToRgb_(r, n, e + 1 / 3), o = 255 * goog.color.hueToRgb_(r, n, e), e = 255 * goog.color.hueToRgb_(r, n, e - 1 / 3)
    }
    return [Math.round(t), Math.round(o), Math.round(e)]
}, goog.color.hslArrayToRgb = function(e) {
    return goog.color.hslToRgb(e[0], e[1], e[2])
}, goog.color.validHexColorRe_ = /^#(?:[0-9a-f]{3}){1,2}$/i, goog.color.isValidHexColor_ = function(e) {
    return goog.color.validHexColorRe_.test(e)
}, goog.color.normalizedHexColorRe_ = /^#[0-9a-f]{6}$/, goog.color.isNormalizedHexColor_ = function(e) {
    return goog.color.normalizedHexColorRe_.test(e)
}, goog.color.rgbColorRe_ = /^(?:rgb)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2})\)$/i, goog.color.isValidRgbColor_ = function(e) {
    if (t = e.match(goog.color.rgbColorRe_)) {
        e = Number(t[1]);
        var o = Number(t[2]),
            t = Number(t[3]);
        if (0 <= e && 255 >= e && 0 <= o && 255 >= o && 0 <= t && 255 >= t) return [e, o, t]
    }
    return []
}, goog.color.prependZeroIfNecessaryHelper = function(e) {
    return 1 == e.length ? "0" + e : e
}, goog.color.prependHashIfNecessaryHelper = function(e) {
    return "#" == e.charAt(0) ? e : "#" + e
}, goog.color.rgbStyle_ = function(e) {
    return "rgb(" + e.join(",") + ")"
}, goog.color.hsvToRgb = function(e, o, t) {
    var n = 0,
        r = 0,
        i = 0;
    if (0 == o) i = r = n = t;
    else {
        var s = Math.floor(e / 60),
            l = e / 60 - s;
        e = t * (1 - o);
        var g = t * (1 - o * l);
        switch (o = t * (1 - o * (1 - l)), s) {
            case 1:
                n = g, r = t, i = e;
                break;
            case 2:
                n = e, r = t, i = o;
                break;
            case 3:
                n = e, r = g, i = t;
                break;
            case 4:
                n = o, r = e, i = t;
                break;
            case 5:
                n = t, r = e, i = g;
                break;
            case 6:
            case 0:
                n = t, r = o, i = e
        }
    }
    return [Math.floor(n), Math.floor(r), Math.floor(i)]
}, goog.color.rgbToHsv = function(e, o, t) {
    var n = Math.max(Math.max(e, o), t);
    if ((i = Math.min(Math.min(e, o), t)) == n) i = e = 0;
    else {
        var r = n - i,
            i = r / n;
        0 > (e = 60 * (e == n ? (o - t) / r : o == n ? 2 + (t - e) / r : 4 + (e - o) / r)) && (e += 360), 360 < e && (e -= 360)
    }
    return [e, i, n]
}, goog.color.rgbArrayToHsv = function(e) {
    return goog.color.rgbToHsv(e[0], e[1], e[2])
}, goog.color.hsvArrayToRgb = function(e) {
    return goog.color.hsvToRgb(e[0], e[1], e[2])
}, goog.color.hexToHsl = function(e) {
    return e = goog.color.hexToRgb(e), goog.color.rgbToHsl(e[0], e[1], e[2])
}, goog.color.hslToHex = function(e, o, t) {
    return goog.color.rgbArrayToHex(goog.color.hslToRgb(e, o, t))
}, goog.color.hslArrayToHex = function(e) {
    return goog.color.rgbArrayToHex(goog.color.hslToRgb(e[0], e[1], e[2]))
}, goog.color.hexToHsv = function(e) {
    return goog.color.rgbArrayToHsv(goog.color.hexToRgb(e))
}, goog.color.hsvToHex = function(e, o, t) {
    return goog.color.rgbArrayToHex(goog.color.hsvToRgb(e, o, t))
}, goog.color.hsvArrayToHex = function(e) {
    return goog.color.hsvToHex(e[0], e[1], e[2])
}, goog.color.hslDistance = function(e, o) {
    var t = .5 >= e[2] ? e[1] * e[2] : e[1] * (1 - e[2]),
        n = .5 >= o[2] ? o[1] * o[2] : o[1] * (1 - o[2]);
    return (e[2] - o[2]) * (e[2] - o[2]) + t * t + n * n - 2 * t * n * Math.cos(2 * (e[0] / 360 - o[0] / 360) * Math.PI)
}, goog.color.blend = function(e, o, t) {
    return t = goog.math.clamp(t, 0, 1), [Math.round(t * e[0] + (1 - t) * o[0]), Math.round(t * e[1] + (1 - t) * o[1]), Math.round(t * e[2] + (1 - t) * o[2])]
}, goog.color.darken = function(e, o) {
    return goog.color.blend([0, 0, 0], e, o)
}, goog.color.lighten = function(e, o) {
    return goog.color.blend([255, 255, 255], e, o)
}, goog.color.highContrast = function(e, o) {
    for (var t = [], n = 0; n < o.length; n++) t.push({
        color: o[n],
        diff: goog.color.yiqBrightnessDiff_(o[n], e) + goog.color.colorDiff_(o[n], e)
    });
    return t.sort(function(e, o) {
        return o.diff - e.diff
    }), t[0].color
}, goog.color.yiqBrightness_ = function(e) {
    return Math.round((299 * e[0] + 587 * e[1] + 114 * e[2]) / 1e3)
}, goog.color.yiqBrightnessDiff_ = function(e, o) {
    return Math.abs(goog.color.yiqBrightness_(e) - goog.color.yiqBrightness_(o))
}, goog.color.colorDiff_ = function(e, o) {
    return Math.abs(e[0] - o[0]) + Math.abs(e[1] - o[1]) + Math.abs(e[2] - o[2])
}, goog.iter = {}, goog.iter.StopIteration = "StopIteration" in goog.global ? goog.global.StopIteration : {
    message: "StopIteration",
    stack: ""
}, goog.iter.Iterator = function() {}, goog.iter.Iterator.prototype.next = function() {
    throw goog.iter.StopIteration
}, goog.iter.Iterator.prototype.__iterator__ = function(e) {
    return this
}, goog.iter.toIterator = function(e) {
    if (e instanceof goog.iter.Iterator) return e;
    if ("function" == typeof e.__iterator__) return e.__iterator__(!1);
    if (goog.isArrayLike(e)) {
        var o = 0,
            t = new goog.iter.Iterator;
        return t.next = function() {
            for (;;) {
                if (o >= e.length) throw goog.iter.StopIteration;
                if (o in e) return e[o++];
                o++
            }
        }, t
    }
    throw Error("Not implemented")
}, goog.iter.forEach = function(e, o, t) {
    if (goog.isArrayLike(e)) try {
        goog.array.forEach(e, o, t)
    } catch (e) {
        if (e !== goog.iter.StopIteration) throw e
    } else {
        e = goog.iter.toIterator(e);
        try {
            for (;;) o.call(t, e.next(), void 0, e)
        } catch (e) {
            if (e !== goog.iter.StopIteration) throw e
        }
    }
}, goog.iter.filter = function(e, o, t) {
    var n = goog.iter.toIterator(e);
    return e = new goog.iter.Iterator, e.next = function() {
        for (;;) {
            var e = n.next();
            if (o.call(t, e, void 0, n)) return e
        }
    }, e
}, goog.iter.filterFalse = function(e, o, t) {
    return goog.iter.filter(e, goog.functions.not(o), t)
}, goog.iter.range = function(e, o, t) {
    var n = 0,
        r = e,
        i = t || 1;
    if (1 < arguments.length && (n = e, r = o), 0 == i) throw Error("Range step argument must not be zero");
    var s = new goog.iter.Iterator;
    return s.next = function() {
        if (0 < i && n >= r || 0 > i && n <= r) throw goog.iter.StopIteration;
        var e = n;
        return n += i, e
    }, s
}, goog.iter.join = function(e, o) {
    return goog.iter.toArray(e).join(o)
}, goog.iter.map = function(e, o, t) {
    var n = goog.iter.toIterator(e);
    return e = new goog.iter.Iterator, e.next = function() {
        var e = n.next();
        return o.call(t, e, void 0, n)
    }, e
}, goog.iter.reduce = function(e, o, t, n) {
    var r = t;
    return goog.iter.forEach(e, function(e) {
        r = o.call(n, r, e)
    }), r
}, goog.iter.some = function(e, o, t) {
    e = goog.iter.toIterator(e);
    try {
        for (;;)
            if (o.call(t, e.next(), void 0, e)) return !0
    } catch (e) {
        if (e !== goog.iter.StopIteration) throw e
    }
    return !1
}, goog.iter.every = function(e, o, t) {
    e = goog.iter.toIterator(e);
    try {
        for (;;)
            if (!o.call(t, e.next(), void 0, e)) return !1
    } catch (e) {
        if (e !== goog.iter.StopIteration) throw e
    }
    return !0
}, goog.iter.chain = function(e) {
    return goog.iter.chainFromIterable(arguments)
}, goog.iter.chainFromIterable = function(e) {
    var o = goog.iter.toIterator(e),
        t = null;
    return (e = new goog.iter.Iterator).next = function() {
        for (;;) {
            if (null == t) {
                var e = o.next();
                t = goog.iter.toIterator(e)
            }
            try {
                return t.next()
            } catch (e) {
                if (e !== goog.iter.StopIteration) throw e;
                t = null
            }
        }
    }, e
}, goog.iter.dropWhile = function(e, o, t) {
    var n = goog.iter.toIterator(e),
        r = !0;
    return (e = new goog.iter.Iterator).next = function() {
        for (;;) {
            var e = n.next();
            if (!r || !o.call(t, e, void 0, n)) return r = !1, e
        }
    }, e
}, goog.iter.takeWhile = function(e, o, t) {
    var n = goog.iter.toIterator(e);
    return e = new goog.iter.Iterator, e.next = function() {
        var e = n.next();
        if (o.call(t, e, void 0, n)) return e;
        throw goog.iter.StopIteration
    }, e
}, goog.iter.toArray = function(e) {
    if (goog.isArrayLike(e)) return goog.array.toArray(e);
    e = goog.iter.toIterator(e);
    var o = [];
    return goog.iter.forEach(e, function(e) {
        o.push(e)
    }), o
}, goog.iter.equals = function(e, o, t) {
    e = goog.iter.zipLongest({}, e, o);
    var n = t || goog.array.defaultCompareEquality;
    return goog.iter.every(e, function(e) {
        return n(e[0], e[1])
    })
}, goog.iter.nextOrValue = function(e, o) {
    try {
        return goog.iter.toIterator(e).next()
    } catch (e) {
        if (e != goog.iter.StopIteration) throw e;
        return o
    }
}, goog.iter.product = function(e) {
    if (goog.array.some(arguments, function(e) {
            return !e.length
        }) || !arguments.length) return new goog.iter.Iterator;
    var o = new goog.iter.Iterator,
        t = arguments,
        n = goog.array.repeat(0, t.length);
    return o.next = function() {
        if (n) {
            for (var e = goog.array.map(n, function(e, o) {
                    return t[o][e]
                }), o = n.length - 1; 0 <= o; o--) {
                if (goog.asserts.assert(n), n[o] < t[o].length - 1) {
                    n[o]++;
                    break
                }
                if (0 == o) {
                    n = null;
                    break
                }
                n[o] = 0
            }
            return e
        }
        throw goog.iter.StopIteration
    }, o
}, goog.iter.cycle = function(e) {
    var o = goog.iter.toIterator(e),
        t = [],
        n = 0,
        r = !1;
    return (e = new goog.iter.Iterator).next = function() {
        var e = null;
        if (!r) try {
            return e = o.next(), t.push(e), e
        } catch (e) {
            if (e != goog.iter.StopIteration || goog.array.isEmpty(t)) throw e;
            r = !0
        }
        return e = t[n], n = (n + 1) % t.length, e
    }, e
}, goog.iter.count = function(e, o) {
    var t = e || 0,
        n = goog.isDef(o) ? o : 1,
        r = new goog.iter.Iterator;
    return r.next = function() {
        var e = t;
        return t += n, e
    }, r
}, goog.iter.repeat = function(e) {
    var o = new goog.iter.Iterator;
    return o.next = goog.functions.constant(e), o
}, goog.iter.accumulate = function(e) {
    var o = goog.iter.toIterator(e),
        t = 0;
    return e = new goog.iter.Iterator, e.next = function() {
        return t += o.next()
    }, e
}, goog.iter.zip = function(e) {
    var o = arguments,
        t = new goog.iter.Iterator;
    if (0 < o.length) {
        var n = goog.array.map(o, goog.iter.toIterator);
        t.next = function() {
            return goog.array.map(n, function(e) {
                return e.next()
            })
        }
    }
    return t
}, goog.iter.zipLongest = function(e, o) {
    var t = goog.array.slice(arguments, 1),
        n = new goog.iter.Iterator;
    if (0 < t.length) {
        var r = goog.array.map(t, goog.iter.toIterator);
        n.next = function() {
            var o = !1,
                t = goog.array.map(r, function(t) {
                    try {
                        var n = t.next();
                        o = !0
                    } catch (o) {
                        if (o !== goog.iter.StopIteration) throw o;
                        n = e
                    }
                    return n
                });
            if (!o) throw goog.iter.StopIteration;
            return t
        }
    }
    return n
}, goog.iter.compress = function(e, o) {
    var t = goog.iter.toIterator(o);
    return goog.iter.filter(e, function() {
        return !!t.next()
    })
}, goog.iter.GroupByIterator_ = function(e, o) {
    this.iterator = goog.iter.toIterator(e), this.keyFunc = o || goog.functions.identity
}, goog.inherits(goog.iter.GroupByIterator_, goog.iter.Iterator), goog.iter.GroupByIterator_.prototype.next = function() {
    for (; this.currentKey == this.targetKey;) this.currentValue = this.iterator.next(), this.currentKey = this.keyFunc(this.currentValue);
    return this.targetKey = this.currentKey, [this.currentKey, this.groupItems_(this.targetKey)]
}, goog.iter.GroupByIterator_.prototype.groupItems_ = function(e) {
    for (var o = []; this.currentKey == e;) {
        o.push(this.currentValue);
        try {
            this.currentValue = this.iterator.next()
        } catch (e) {
            if (e !== goog.iter.StopIteration) throw e;
            break
        }
        this.currentKey = this.keyFunc(this.currentValue)
    }
    return o
}, goog.iter.groupBy = function(e, o) {
    return new goog.iter.GroupByIterator_(e, o)
}, goog.iter.starMap = function(e, o, t) {
    var n = goog.iter.toIterator(e);
    return e = new goog.iter.Iterator, e.next = function() {
        var e = goog.iter.toArray(n.next());
        return o.apply(t, goog.array.concat(e, void 0, n))
    }, e
}, goog.iter.tee = function(e, o) {
    var t = goog.iter.toIterator(e),
        n = goog.isNumber(o) ? o : 2,
        r = goog.array.map(goog.array.range(n), function() {
            return []
        }),
        i = function() {
            var e = t.next();
            goog.array.forEach(r, function(o) {
                o.push(e)
            })
        };
    return goog.array.map(r, function(e) {
        var o = new goog.iter.Iterator;
        return o.next = function() {
            return goog.array.isEmpty(e) && i(), goog.asserts.assert(!goog.array.isEmpty(e)), e.shift()
        }, o
    })
}, goog.iter.enumerate = function(e, o) {
    return goog.iter.zip(goog.iter.count(o), e)
}, goog.iter.limit = function(e, o) {
    goog.asserts.assert(goog.math.isInt(o) && 0 <= o);
    var t = goog.iter.toIterator(e),
        n = new goog.iter.Iterator,
        r = o;
    return n.next = function() {
        if (0 < r--) return t.next();
        throw goog.iter.StopIteration
    }, n
}, goog.iter.consume = function(e, o) {
    goog.asserts.assert(goog.math.isInt(o) && 0 <= o);
    for (var t = goog.iter.toIterator(e); 0 < o--;) goog.iter.nextOrValue(t, null);
    return t
}, goog.iter.slice = function(e, o, t) {
    return goog.asserts.assert(goog.math.isInt(o) && 0 <= o), e = goog.iter.consume(e, o), goog.isNumber(t) && (goog.asserts.assert(goog.math.isInt(t) && t >= o), e = goog.iter.limit(e, t - o)), e
}, goog.iter.hasDuplicates_ = function(e) {
    var o = [];
    return goog.array.removeDuplicates(e, o), e.length != o.length
}, goog.iter.permutations = function(e, o) {
    var t = goog.iter.toArray(e),
        n = goog.isNumber(o) ? o : t.length,
        t = goog.array.repeat(t, n),
        t = goog.iter.product.apply(void 0, t);
    return goog.iter.filter(t, function(e) {
        return !goog.iter.hasDuplicates_(e)
    })
}, goog.iter.combinations = function(e, o) {
    function t(e) {
        return n[e]
    }
    var n = goog.iter.toArray(e),
        r = goog.iter.range(n.length),
        r = goog.iter.permutations(r, o),
        i = goog.iter.filter(r, function(e) {
            return goog.array.isSorted(e)
        });
    return (r = new goog.iter.Iterator).next = function() {
        return goog.array.map(i.next(), t)
    }, r
}, goog.iter.combinationsWithReplacement = function(e, o) {
    function t(e) {
        return n[e]
    }
    var n = goog.iter.toArray(e),
        r = goog.array.range(n.length),
        r = goog.array.repeat(r, o),
        r = goog.iter.product.apply(void 0, r),
        i = goog.iter.filter(r, function(e) {
            return goog.array.isSorted(e)
        });
    return (r = new goog.iter.Iterator).next = function() {
        return goog.array.map(i.next(), t)
    }, r
}, goog.dom.TagWalkType = {
    START_TAG: 1,
    OTHER: 0,
    END_TAG: -1
}, goog.dom.TagIterator = function(e, o, t, n, r) {
    this.reversed = !!o, this.node = null, this.tagType = goog.dom.TagWalkType.OTHER, this.started_ = !1, this.constrained = !t, e && this.setPosition(e, n), this.depth = void 0 != r ? r : this.tagType || 0, this.reversed && (this.depth *= -1)
}, goog.inherits(goog.dom.TagIterator, goog.iter.Iterator), goog.dom.TagIterator.prototype.setPosition = function(e, o, t) {
    (this.node = e) && (goog.isNumber(o) ? this.tagType = o : this.tagType = this.node.nodeType != goog.dom.NodeType.ELEMENT ? goog.dom.TagWalkType.OTHER : this.reversed ? goog.dom.TagWalkType.END_TAG : goog.dom.TagWalkType.START_TAG), goog.isNumber(t) && (this.depth = t)
}, goog.dom.TagIterator.prototype.copyFrom = function(e) {
    this.node = e.node, this.tagType = e.tagType, this.depth = e.depth, this.reversed = e.reversed, this.constrained = e.constrained
}, goog.dom.TagIterator.prototype.clone = function() {
    return new goog.dom.TagIterator(this.node, this.reversed, !this.constrained, this.tagType, this.depth)
}, goog.dom.TagIterator.prototype.skipTag = function() {
    var e = this.reversed ? goog.dom.TagWalkType.END_TAG : goog.dom.TagWalkType.START_TAG;
    this.tagType == e && (this.tagType = -1 * e, this.depth += this.tagType * (this.reversed ? -1 : 1))
}, goog.dom.TagIterator.prototype.restartTag = function() {
    var e = this.reversed ? goog.dom.TagWalkType.START_TAG : goog.dom.TagWalkType.END_TAG;
    this.tagType == e && (this.tagType = -1 * e, this.depth += this.tagType * (this.reversed ? -1 : 1))
}, goog.dom.TagIterator.prototype.next = function() {
    if (this.started_) {
        if (!this.node || this.constrained && 0 == this.depth) throw goog.iter.StopIteration;
        var e = this.node,
            o = this.reversed ? goog.dom.TagWalkType.END_TAG : goog.dom.TagWalkType.START_TAG;
        if (this.tagType == o) {
            var t = this.reversed ? e.lastChild : e.firstChild;
            t ? this.setPosition(t) : this.setPosition(e, -1 * o)
        } else(t = this.reversed ? e.previousSibling : e.nextSibling) ? this.setPosition(t) : this.setPosition(e.parentNode, -1 * o);
        this.depth += this.tagType * (this.reversed ? -1 : 1)
    } else this.started_ = !0;
    if (e = this.node, !this.node) throw goog.iter.StopIteration;
    return e
}, goog.dom.TagIterator.prototype.isStarted = function() {
    return this.started_
}, goog.dom.TagIterator.prototype.isStartTag = function() {
    return this.tagType == goog.dom.TagWalkType.START_TAG
}, goog.dom.TagIterator.prototype.isEndTag = function() {
    return this.tagType == goog.dom.TagWalkType.END_TAG
}, goog.dom.TagIterator.prototype.isNonElement = function() {
    return this.tagType == goog.dom.TagWalkType.OTHER
}, goog.dom.TagIterator.prototype.equals = function(e) {
    return e.node == this.node && (!this.node || e.tagType == this.tagType)
}, goog.dom.TagIterator.prototype.splice = function(e) {
    var o = this.node;
    this.restartTag(), this.reversed = !this.reversed, goog.dom.TagIterator.prototype.next.call(this), this.reversed = !this.reversed;
    for (var t = goog.isArrayLike(arguments[0]) ? arguments[0] : arguments, n = t.length - 1; 0 <= n; n--) goog.dom.insertSiblingAfter(t[n], o);
    goog.dom.removeNode(o)
}, goog.dom.NodeIterator = function(e, o, t, n) {
    goog.dom.TagIterator.call(this, e, o, t, null, n)
}, goog.inherits(goog.dom.NodeIterator, goog.dom.TagIterator), goog.dom.NodeIterator.prototype.next = function() {
    do {
        goog.dom.NodeIterator.superClass_.next.call(this)
    } while (this.isEndTag());
    return this.node
}, goog.ui.PaletteRenderer = function() {
    goog.ui.ControlRenderer.call(this)
}, goog.inherits(goog.ui.PaletteRenderer, goog.ui.ControlRenderer), goog.addSingletonGetter(goog.ui.PaletteRenderer), goog.ui.PaletteRenderer.cellId_ = 0, goog.ui.PaletteRenderer.CSS_CLASS = "goog-palette", goog.ui.PaletteRenderer.prototype.createDom = function(e) {
    var o = this.getClassNames(e);
    return e = e.getDomHelper().createDom("DIV", o ? o.join(" ") : null, this.createGrid(e.getContent(), e.getSize(), e.getDomHelper())), goog.a11y.aria.setRole(e, goog.a11y.aria.Role.GRID), e
}, goog.ui.PaletteRenderer.prototype.createGrid = function(e, o, t) {
    for (var n = [], r = 0, i = 0; r < o.height; r++) {
        for (var s = [], l = 0; l < o.width; l++) {
            var g = e && e[i++];
            s.push(this.createCell(g, t))
        }
        n.push(this.createRow(s, t))
    }
    return this.createTable(n, t)
}, goog.ui.PaletteRenderer.prototype.createTable = function(e, o) {
    var t = o.createDom("TABLE", this.getCssClass() + "-table", o.createDom("TBODY", this.getCssClass() + "-body", e));
    return t.cellSpacing = "0", t.cellPadding = "0", t
}, goog.ui.PaletteRenderer.prototype.createRow = function(e, o) {
    var t = o.createDom("TR", this.getCssClass() + "-row", e);
    return goog.a11y.aria.setRole(t, goog.a11y.aria.Role.ROW), t
}, goog.ui.PaletteRenderer.prototype.createCell = function(e, o) {
    var t = o.createDom("TD", {
        class: this.getCssClass() + "-cell",
        id: this.getCssClass() + "-cell-" + goog.ui.PaletteRenderer.cellId_++
    }, e);
    if (goog.a11y.aria.setRole(t, goog.a11y.aria.Role.GRIDCELL), goog.a11y.aria.setState(t, goog.a11y.aria.State.SELECTED, !1), !goog.dom.getTextContent(t) && !goog.a11y.aria.getLabel(t)) {
        var n = this.findAriaLabelForCell_(t);
        n && goog.a11y.aria.setLabel(t, n)
    }
    return t
}, goog.ui.PaletteRenderer.prototype.findAriaLabelForCell_ = function(e) {
    e = new goog.dom.NodeIterator(e);
    for (var o, t = ""; !t && (o = goog.iter.nextOrValue(e, null));) o.nodeType == goog.dom.NodeType.ELEMENT && (t = goog.a11y.aria.getLabel(o) || o.title);
    return t
}, goog.ui.PaletteRenderer.prototype.canDecorate = function(e) {
    return !1
}, goog.ui.PaletteRenderer.prototype.decorate = function(e, o) {
    return null
}, goog.ui.PaletteRenderer.prototype.setContent = function(e, o) {
    if (e) {
        var t = goog.dom.getElementsByTagNameAndClass("TBODY", this.getCssClass() + "-body", e)[0];
        if (t) {
            var n = 0;
            if (goog.array.forEach(t.rows, function(e) {
                    goog.array.forEach(e.cells, function(e) {
                        if (goog.dom.removeChildren(e), o) {
                            var t = o[n++];
                            t && goog.dom.appendChild(e, t)
                        }
                    })
                }), n < o.length) {
                for (var r = [], i = goog.dom.getDomHelper(e), s = t.rows[0].cells.length; n < o.length;) {
                    var l = o[n++];
                    r.push(this.createCell(l, i)), r.length == s && (l = this.createRow(r, i), goog.dom.appendChild(t, l), r.length = 0)
                }
                if (0 < r.length) {
                    for (; r.length < s;) r.push(this.createCell("", i));
                    l = this.createRow(r, i), goog.dom.appendChild(t, l)
                }
            }
        }
        goog.style.setUnselectable(e, !0, goog.userAgent.GECKO)
    }
}, goog.ui.PaletteRenderer.prototype.getContainingItem = function(e, o) {
    for (var t = e.getElement(); o && o.nodeType == goog.dom.NodeType.ELEMENT && o != t;) {
        if ("TD" == o.tagName && goog.dom.classlist.contains(o, this.getCssClass() + "-cell")) return o.firstChild;
        o = o.parentNode
    }
    return null
}, goog.ui.PaletteRenderer.prototype.highlightCell = function(e, o, t) {
    o && (o = this.getCellForItem(o), goog.asserts.assert(o), goog.dom.classlist.enable(o, this.getCssClass() + "-cell-hover", t), t ? goog.a11y.aria.setState(e.getElementStrict(), goog.a11y.aria.State.ACTIVEDESCENDANT, o.id) : o.id == goog.a11y.aria.getState(e.getElementStrict(), goog.a11y.aria.State.ACTIVEDESCENDANT) && goog.a11y.aria.removeState(e.getElementStrict(), goog.a11y.aria.State.ACTIVEDESCENDANT))
}, goog.ui.PaletteRenderer.prototype.getCellForItem = function(e) {
    return e ? e.parentNode : null
}, goog.ui.PaletteRenderer.prototype.selectCell = function(e, o, t) {
    o && (e = o.parentNode, goog.dom.classlist.enable(e, this.getCssClass() + "-cell-selected", t), goog.a11y.aria.setState(e, goog.a11y.aria.State.SELECTED, t))
}, goog.ui.PaletteRenderer.prototype.getCssClass = function() {
    return goog.ui.PaletteRenderer.CSS_CLASS
}, goog.ui.SelectionModel = function(e) {
    goog.events.EventTarget.call(this), this.items_ = [], this.addItems(e)
}, goog.inherits(goog.ui.SelectionModel, goog.events.EventTarget), goog.tagUnsealableClass(goog.ui.SelectionModel), goog.ui.SelectionModel.prototype.selectedItem_ = null, goog.ui.SelectionModel.prototype.selectionHandler_ = null, goog.ui.SelectionModel.prototype.getSelectionHandler = function() {
    return this.selectionHandler_
}, goog.ui.SelectionModel.prototype.setSelectionHandler = function(e) {
    this.selectionHandler_ = e
}, goog.ui.SelectionModel.prototype.getItemCount = function() {
    return this.items_.length
}, goog.ui.SelectionModel.prototype.indexOfItem = function(e) {
    return e ? goog.array.indexOf(this.items_, e) : -1
}, goog.ui.SelectionModel.prototype.getFirst = function() {
    return this.items_[0]
}, goog.ui.SelectionModel.prototype.getLast = function() {
    return this.items_[this.items_.length - 1]
}, goog.ui.SelectionModel.prototype.getItemAt = function(e) {
    return this.items_[e] || null
}, goog.ui.SelectionModel.prototype.addItems = function(e) {
    e && (goog.array.forEach(e, function(e) {
        this.selectItem_(e, !1)
    }, this), goog.array.extend(this.items_, e))
}, goog.ui.SelectionModel.prototype.addItem = function(e) {
    this.addItemAt(e, this.getItemCount())
}, goog.ui.SelectionModel.prototype.addItemAt = function(e, o) {
    e && (this.selectItem_(e, !1), goog.array.insertAt(this.items_, e, o))
}, goog.ui.SelectionModel.prototype.removeItem = function(e) {
    e && goog.array.remove(this.items_, e) && e == this.selectedItem_ && (this.selectedItem_ = null, this.dispatchEvent(goog.events.EventType.SELECT))
}, goog.ui.SelectionModel.prototype.removeItemAt = function(e) {
    this.removeItem(this.getItemAt(e))
}, goog.ui.SelectionModel.prototype.getSelectedItem = function() {
    return this.selectedItem_
}, goog.ui.SelectionModel.prototype.getItems = function() {
    return goog.array.clone(this.items_)
}, goog.ui.SelectionModel.prototype.setSelectedItem = function(e) {
    e != this.selectedItem_ && (this.selectItem_(this.selectedItem_, !1), this.selectedItem_ = e, this.selectItem_(e, !0)), this.dispatchEvent(goog.events.EventType.SELECT)
}, goog.ui.SelectionModel.prototype.getSelectedIndex = function() {
    return this.indexOfItem(this.selectedItem_)
}, goog.ui.SelectionModel.prototype.setSelectedIndex = function(e) {
    this.setSelectedItem(this.getItemAt(e))
}, goog.ui.SelectionModel.prototype.clear = function() {
    goog.array.clear(this.items_), this.selectedItem_ = null
}, goog.ui.SelectionModel.prototype.disposeInternal = function() {
    goog.ui.SelectionModel.superClass_.disposeInternal.call(this), delete this.items_, this.selectedItem_ = null
}, goog.ui.SelectionModel.prototype.selectItem_ = function(e, o) {
    e && ("function" == typeof this.selectionHandler_ ? this.selectionHandler_(e, o) : "function" == typeof e.setSelected && e.setSelected(o))
}, goog.ui.Palette = function(e, o, t) {
    goog.ui.Control.call(this, e, o || goog.ui.PaletteRenderer.getInstance(), t), this.setAutoStates(goog.ui.Component.State.CHECKED | goog.ui.Component.State.SELECTED | goog.ui.Component.State.OPENED, !1), this.currentCellControl_ = new goog.ui.Palette.CurrentCell_, this.currentCellControl_.setParentEventTarget(this), this.lastHighlightedIndex_ = -1
}, goog.inherits(goog.ui.Palette, goog.ui.Control), goog.tagUnsealableClass(goog.ui.Palette), goog.ui.Palette.EventType = {
    AFTER_HIGHLIGHT: goog.events.getUniqueId("afterhighlight")
}, goog.ui.Palette.prototype.size_ = null, goog.ui.Palette.prototype.highlightedIndex_ = -1, goog.ui.Palette.prototype.selectionModel_ = null, goog.ui.Palette.prototype.disposeInternal = function() {
    goog.ui.Palette.superClass_.disposeInternal.call(this), this.selectionModel_ && (this.selectionModel_.dispose(), this.selectionModel_ = null), this.size_ = null, this.currentCellControl_.dispose()
}, goog.ui.Palette.prototype.setContentInternal = function(e) {
    goog.ui.Palette.superClass_.setContentInternal.call(this, e), this.adjustSize_(), this.selectionModel_ ? (this.selectionModel_.clear(), this.selectionModel_.addItems(e)) : (this.selectionModel_ = new goog.ui.SelectionModel(e), this.selectionModel_.setSelectionHandler(goog.bind(this.selectItem_, this)), this.getHandler().listen(this.selectionModel_, goog.events.EventType.SELECT, this.handleSelectionChange)), this.highlightedIndex_ = -1
}, goog.ui.Palette.prototype.getCaption = function() {
    return ""
}, goog.ui.Palette.prototype.setCaption = function(e) {}, goog.ui.Palette.prototype.handleMouseOver = function(e) {
    goog.ui.Palette.superClass_.handleMouseOver.call(this, e);
    var o = this.getRenderer().getContainingItem(this, e.target);
    o && e.relatedTarget && goog.dom.contains(o, e.relatedTarget) || o != this.getHighlightedItem() && this.setHighlightedItem(o)
}, goog.ui.Palette.prototype.handleMouseDown = function(e) {
    goog.ui.Palette.superClass_.handleMouseDown.call(this, e), this.isActive() && (e = this.getRenderer().getContainingItem(this, e.target)) != this.getHighlightedItem() && this.setHighlightedItem(e)
}, goog.ui.Palette.prototype.performActionInternal = function(e) {
    var o = this.getHighlightedItem();
    return !!o && (e && this.shouldSelectHighlightedItem_(e) && this.setSelectedItem(o), goog.ui.Palette.superClass_.performActionInternal.call(this, e))
}, goog.ui.Palette.prototype.shouldSelectHighlightedItem_ = function(e) {
    return !this.getSelectedItem() || ("mouseup" != e.type || !!this.getRenderer().getContainingItem(this, e.target))
}, goog.ui.Palette.prototype.handleKeyEvent = function(e) {
    var o = (o = this.getContent()) ? o.length : 0,
        t = this.size_.width;
    if (0 == o || !this.isEnabled()) return !1;
    if (e.keyCode == goog.events.KeyCodes.ENTER || e.keyCode == goog.events.KeyCodes.SPACE) return this.performActionInternal(e);
    if (e.keyCode == goog.events.KeyCodes.HOME) return this.setHighlightedIndex(0), !0;
    if (e.keyCode == goog.events.KeyCodes.END) return this.setHighlightedIndex(o - 1), !0;
    var n = 0 > this.highlightedIndex_ ? this.getSelectedIndex() : this.highlightedIndex_;
    switch (e.keyCode) {
        case goog.events.KeyCodes.LEFT:
            return -1 != n && 0 != n || (n = o), this.setHighlightedIndex(n - 1), e.preventDefault(), !0;
        case goog.events.KeyCodes.RIGHT:
            return n == o - 1 && (n = -1), this.setHighlightedIndex(n + 1), e.preventDefault(), !0;
        case goog.events.KeyCodes.UP:
            if (-1 == n && (n = o + t - 1), n >= t) return this.setHighlightedIndex(n - t), e.preventDefault(), !0;
            break;
        case goog.events.KeyCodes.DOWN:
            if (-1 == n && (n = -t), n < o - t) return this.setHighlightedIndex(n + t), e.preventDefault(), !0
    }
    return !1
}, goog.ui.Palette.prototype.handleSelectionChange = function(e) {}, goog.ui.Palette.prototype.getSize = function() {
    return this.size_
}, goog.ui.Palette.prototype.setSize = function(e, o) {
    if (this.getElement()) throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
    this.size_ = goog.isNumber(e) ? new goog.math.Size(e, o) : e, this.adjustSize_()
}, goog.ui.Palette.prototype.getHighlightedIndex = function() {
    return this.highlightedIndex_
}, goog.ui.Palette.prototype.getHighlightedItem = function() {
    var e = this.getContent();
    return e && e[this.highlightedIndex_]
}, goog.ui.Palette.prototype.getHighlightedCellElement_ = function() {
    return this.getRenderer().getCellForItem(this.getHighlightedItem())
}, goog.ui.Palette.prototype.setHighlightedIndex = function(e) {
    e != this.highlightedIndex_ && (this.highlightIndex_(this.highlightedIndex_, !1), this.lastHighlightedIndex_ = this.highlightedIndex_, this.highlightedIndex_ = e, this.highlightIndex_(e, !0), this.dispatchEvent(goog.ui.Palette.EventType.AFTER_HIGHLIGHT))
}, goog.ui.Palette.prototype.setHighlightedItem = function(e) {
    var o = this.getContent();
    this.setHighlightedIndex(o && e ? goog.array.indexOf(o, e) : -1)
}, goog.ui.Palette.prototype.getSelectedIndex = function() {
    return this.selectionModel_ ? this.selectionModel_.getSelectedIndex() : -1
}, goog.ui.Palette.prototype.getSelectedItem = function() {
    return this.selectionModel_ ? this.selectionModel_.getSelectedItem() : null
}, goog.ui.Palette.prototype.setSelectedIndex = function(e) {
    this.selectionModel_ && this.selectionModel_.setSelectedIndex(e)
}, goog.ui.Palette.prototype.setSelectedItem = function(e) {
    this.selectionModel_ && this.selectionModel_.setSelectedItem(e)
}, goog.ui.Palette.prototype.highlightIndex_ = function(e, o) {
    if (this.getElement()) {
        var t = this.getContent();
        if (t && 0 <= e && e < t.length) {
            var n = this.getHighlightedCellElement_();
            this.currentCellControl_.getElement() != n && this.currentCellControl_.setElementInternal(n), this.currentCellControl_.tryHighlight(o) && this.getRenderer().highlightCell(this, t[e], o)
        }
    }
}, goog.ui.Palette.prototype.setHighlighted = function(e) {
    e && -1 == this.highlightedIndex_ ? this.setHighlightedIndex(-1 < this.lastHighlightedIndex_ ? this.lastHighlightedIndex_ : 0) : e || this.setHighlightedIndex(-1), goog.ui.Palette.superClass_.setHighlighted.call(this, e)
}, goog.ui.Palette.prototype.selectItem_ = function(e, o) {
    this.getElement() && this.getRenderer().selectCell(this, e, o)
}, goog.ui.Palette.prototype.adjustSize_ = function() {
    var e = this.getContent();
    e ? this.size_ && this.size_.width ? (e = Math.ceil(e.length / this.size_.width), (!goog.isNumber(this.size_.height) || this.size_.height < e) && (this.size_.height = e)) : (e = Math.ceil(Math.sqrt(e.length)), this.size_ = new goog.math.Size(e, e)) : this.size_ = new goog.math.Size(0, 0)
}, goog.ui.Palette.CurrentCell_ = function() {
    goog.ui.Control.call(this, null), this.setDispatchTransitionEvents(goog.ui.Component.State.HOVER, !0)
}, goog.inherits(goog.ui.Palette.CurrentCell_, goog.ui.Control), goog.ui.Palette.CurrentCell_.prototype.tryHighlight = function(e) {
    return this.setHighlighted(e), this.isHighlighted() == e
}, goog.ui.ColorPalette = function(e, o, t) {
    this.colors_ = e || [], goog.ui.Palette.call(this, null, o || goog.ui.PaletteRenderer.getInstance(), t), this.setColors(this.colors_)
}, goog.inherits(goog.ui.ColorPalette, goog.ui.Palette), goog.tagUnsealableClass(goog.ui.ColorPalette), goog.ui.ColorPalette.prototype.normalizedColors_ = null, goog.ui.ColorPalette.prototype.labels_ = null, goog.ui.ColorPalette.prototype.getColors = function() {
    return this.colors_
}, goog.ui.ColorPalette.prototype.setColors = function(e, o) {
    this.colors_ = e, this.labels_ = o || null, this.normalizedColors_ = null, this.setContent(this.createColorNodes())
}, goog.ui.ColorPalette.prototype.getSelectedColor = function() {
    var e = this.getSelectedItem();
    return e ? (e = goog.style.getStyle(e, "background-color"), goog.ui.ColorPalette.parseColor_(e)) : null
}, goog.ui.ColorPalette.prototype.setSelectedColor = function(e) {
    e = goog.ui.ColorPalette.parseColor_(e), this.normalizedColors_ || (this.normalizedColors_ = goog.array.map(this.colors_, function(e) {
        return goog.ui.ColorPalette.parseColor_(e)
    })), this.setSelectedIndex(e ? goog.array.indexOf(this.normalizedColors_, e) : -1)
}, goog.ui.ColorPalette.prototype.createColorNodes = function() {
    return goog.array.map(this.colors_, function(e, o) {
        var t = this.getDomHelper().createDom("DIV", {
            class: this.getRenderer().getCssClass() + "-colorswatch",
            style: "background-color:" + e
        });
        return t.title = this.labels_ && this.labels_[o] ? this.labels_[o] : "#" == e.charAt(0) ? "RGB (" + goog.color.hexToRgb(e).join(", ") + ")" : e, t
    }, this)
}, goog.ui.ColorPalette.parseColor_ = function(e) {
    if (e) try {
        return goog.color.parse(e).hex
    } catch (e) {}
    return null
}, goog.ui.ColorPicker = function(e, o) {
    goog.ui.Component.call(this, e), this.colorPalette_ = o || null, this.getHandler().listen(this, goog.ui.Component.EventType.ACTION, this.onColorPaletteAction_)
}, goog.inherits(goog.ui.ColorPicker, goog.ui.Component), goog.ui.ColorPicker.DEFAULT_NUM_COLS = 5, goog.ui.ColorPicker.EventType = {
    CHANGE: "change"
}, goog.ui.ColorPicker.prototype.focusable_ = !0, goog.ui.ColorPicker.prototype.getColors = function() {
    return this.colorPalette_ ? this.colorPalette_.getColors() : null
}, goog.ui.ColorPicker.prototype.setColors = function(e) {
    this.colorPalette_ ? this.colorPalette_.setColors(e) : this.createColorPalette_(e)
}, goog.ui.ColorPicker.prototype.addColors = function(e) {
    this.setColors(e)
}, goog.ui.ColorPicker.prototype.setSize = function(e) {
    this.colorPalette_ || this.createColorPalette_([]), this.colorPalette_.setSize(e)
}, goog.ui.ColorPicker.prototype.getSize = function() {
    return this.colorPalette_ ? this.colorPalette_.getSize() : null
}, goog.ui.ColorPicker.prototype.setColumnCount = function(e) {
    this.setSize(e)
}, goog.ui.ColorPicker.prototype.getSelectedIndex = function() {
    return this.colorPalette_ ? this.colorPalette_.getSelectedIndex() : -1
}, goog.ui.ColorPicker.prototype.setSelectedIndex = function(e) {
    this.colorPalette_ && this.colorPalette_.setSelectedIndex(e)
}, goog.ui.ColorPicker.prototype.getSelectedColor = function() {
    return this.colorPalette_ ? this.colorPalette_.getSelectedColor() : null
}, goog.ui.ColorPicker.prototype.setSelectedColor = function(e) {
    this.colorPalette_ && this.colorPalette_.setSelectedColor(e)
}, goog.ui.ColorPicker.prototype.isFocusable = function() {
    return this.focusable_
}, goog.ui.ColorPicker.prototype.setFocusable = function(e) {
    this.focusable_ = e, this.colorPalette_ && this.colorPalette_.setSupportedState(goog.ui.Component.State.FOCUSED, e)
}, goog.ui.ColorPicker.prototype.canDecorate = function(e) {
    return !1
}, goog.ui.ColorPicker.prototype.enterDocument = function() {
    goog.ui.ColorPicker.superClass_.enterDocument.call(this), this.colorPalette_ && this.colorPalette_.render(this.getElement()), this.getElement().unselectable = "on"
}, goog.ui.ColorPicker.prototype.disposeInternal = function() {
    goog.ui.ColorPicker.superClass_.disposeInternal.call(this), this.colorPalette_ && (this.colorPalette_.dispose(), this.colorPalette_ = null)
}, goog.ui.ColorPicker.prototype.focus = function() {
    this.colorPalette_ && this.colorPalette_.getElement().focus()
}, goog.ui.ColorPicker.prototype.onColorPaletteAction_ = function(e) {
    e.stopPropagation(), this.dispatchEvent(goog.ui.ColorPicker.EventType.CHANGE)
}, goog.ui.ColorPicker.prototype.createColorPalette_ = function(e) {
    (e = new goog.ui.ColorPalette(e, null, this.getDomHelper())).setSize(goog.ui.ColorPicker.DEFAULT_NUM_COLS), e.setSupportedState(goog.ui.Component.State.FOCUSED, this.focusable_), this.addChild(e), this.colorPalette_ = e, this.isInDocument() && this.colorPalette_.render(this.getElement())
}, goog.ui.ColorPicker.createSimpleColorGrid = function(e) {
    return (e = new goog.ui.ColorPicker(e)).setSize(7), e.setColors(goog.ui.ColorPicker.SIMPLE_GRID_COLORS), e
}, goog.ui.ColorPicker.SIMPLE_GRID_COLORS = "#ffffff #cccccc #c0c0c0 #999999 #666666 #333333 #000000 #ffcccc #ff6666 #ff0000 #cc0000 #990000 #660000 #330000 #ffcc99 #ff9966 #ff9900 #ff6600 #cc6600 #993300 #663300 #ffff99 #ffff66 #ffcc66 #ffcc33 #cc9933 #996633 #663333 #ffffcc #ffff33 #ffff00 #ffcc00 #999900 #666600 #333300 #99ff99 #66ff99 #33ff33 #33cc00 #009900 #006600 #003300 #99ffff #33ffff #66cccc #00cccc #339999 #336666 #003333 #ccffff #66ffff #33ccff #3366ff #3333ff #000099 #000066 #ccccff #9999ff #6666cc #6633ff #6600cc #333399 #330099 #ffccff #ff99ff #cc66cc #cc33cc #993399 #663366 #330033".split(" "), goog.events.FocusHandler = function(e) {
    goog.events.EventTarget.call(this), this.element_ = e, e = goog.userAgent.IE ? "focusout" : "blur", this.listenKeyIn_ = goog.events.listen(this.element_, goog.userAgent.IE ? "focusin" : "focus", this, !goog.userAgent.IE), this.listenKeyOut_ = goog.events.listen(this.element_, e, this, !goog.userAgent.IE)
}, goog.inherits(goog.events.FocusHandler, goog.events.EventTarget), goog.events.FocusHandler.EventType = {
    FOCUSIN: "focusin",
    FOCUSOUT: "focusout"
}, goog.events.FocusHandler.prototype.handleEvent = function(e) {
    var o = e.getBrowserEvent();
    (o = new goog.events.BrowserEvent(o)).type = "focusin" == e.type || "focus" == e.type ? goog.events.FocusHandler.EventType.FOCUSIN : goog.events.FocusHandler.EventType.FOCUSOUT, this.dispatchEvent(o)
}, goog.events.FocusHandler.prototype.disposeInternal = function() {
    goog.events.FocusHandler.superClass_.disposeInternal.call(this), goog.events.unlistenByKey(this.listenKeyIn_), goog.events.unlistenByKey(this.listenKeyOut_), delete this.element_
}, goog.structs = {}, goog.structs.getCount = function(e) {
    return e.getCount && "function" == typeof e.getCount ? e.getCount() : goog.isArrayLike(e) || goog.isString(e) ? e.length : goog.object.getCount(e)
}, goog.structs.getValues = function(e) {
    if (e.getValues && "function" == typeof e.getValues) return e.getValues();
    if (goog.isString(e)) return e.split("");
    if (goog.isArrayLike(e)) {
        for (var o = [], t = e.length, n = 0; n < t; n++) o.push(e[n]);
        return o
    }
    return goog.object.getValues(e)
}, goog.structs.getKeys = function(e) {
    if (e.getKeys && "function" == typeof e.getKeys) return e.getKeys();
    if (!e.getValues || "function" != typeof e.getValues) {
        if (goog.isArrayLike(e) || goog.isString(e)) {
            var o = [];
            e = e.length;
            for (var t = 0; t < e; t++) o.push(t);
            return o
        }
        return goog.object.getKeys(e)
    }
}, goog.structs.contains = function(e, o) {
    return e.contains && "function" == typeof e.contains ? e.contains(o) : e.containsValue && "function" == typeof e.containsValue ? e.containsValue(o) : goog.isArrayLike(e) || goog.isString(e) ? goog.array.contains(e, o) : goog.object.containsValue(e, o)
}, goog.structs.isEmpty = function(e) {
    return e.isEmpty && "function" == typeof e.isEmpty ? e.isEmpty() : goog.isArrayLike(e) || goog.isString(e) ? goog.array.isEmpty(e) : goog.object.isEmpty(e)
}, goog.structs.clear = function(e) {
    e.clear && "function" == typeof e.clear ? e.clear() : goog.isArrayLike(e) ? goog.array.clear(e) : goog.object.clear(e)
}, goog.structs.forEach = function(e, o, t) {
    if (e.forEach && "function" == typeof e.forEach) e.forEach(o, t);
    else if (goog.isArrayLike(e) || goog.isString(e)) goog.array.forEach(e, o, t);
    else
        for (var n = goog.structs.getKeys(e), r = goog.structs.getValues(e), i = r.length, s = 0; s < i; s++) o.call(t, r[s], n && n[s], e)
}, goog.structs.filter = function(e, o, t) {
    if ("function" == typeof e.filter) return e.filter(o, t);
    if (goog.isArrayLike(e) || goog.isString(e)) return goog.array.filter(e, o, t);
    var n = goog.structs.getKeys(e),
        r = goog.structs.getValues(e),
        i = r.length;
    if (n)
        for (var s = {}, l = 0; l < i; l++) o.call(t, r[l], n[l], e) && (s[n[l]] = r[l]);
    else
        for (s = [], l = 0; l < i; l++) o.call(t, r[l], void 0, e) && s.push(r[l]);
    return s
}, goog.structs.map = function(e, o, t) {
    if ("function" == typeof e.map) return e.map(o, t);
    if (goog.isArrayLike(e) || goog.isString(e)) return goog.array.map(e, o, t);
    var n = goog.structs.getKeys(e),
        r = goog.structs.getValues(e),
        i = r.length;
    if (n)
        for (var s = {}, l = 0; l < i; l++) s[n[l]] = o.call(t, r[l], n[l], e);
    else
        for (s = [], l = 0; l < i; l++) s[l] = o.call(t, r[l], void 0, e);
    return s
}, goog.structs.some = function(e, o, t) {
    if ("function" == typeof e.some) return e.some(o, t);
    if (goog.isArrayLike(e) || goog.isString(e)) return goog.array.some(e, o, t);
    for (var n = goog.structs.getKeys(e), r = goog.structs.getValues(e), i = r.length, s = 0; s < i; s++)
        if (o.call(t, r[s], n && n[s], e)) return !0;
    return !1
}, goog.structs.every = function(e, o, t) {
    if ("function" == typeof e.every) return e.every(o, t);
    if (goog.isArrayLike(e) || goog.isString(e)) return goog.array.every(e, o, t);
    for (var n = goog.structs.getKeys(e), r = goog.structs.getValues(e), i = r.length, s = 0; s < i; s++)
        if (!o.call(t, r[s], n && n[s], e)) return !1;
    return !0
}, goog.structs.Collection = function() {}, goog.structs.Map = function(e, o) {
    this.map_ = {}, this.keys_ = [], this.version_ = this.count_ = 0;
    var t = arguments.length;
    if (1 < t) {
        if (t % 2) throw Error("Uneven number of arguments");
        for (var n = 0; n < t; n += 2) this.set(arguments[n], arguments[n + 1])
    } else e && this.addAll(e)
}, goog.structs.Map.prototype.getCount = function() {
    return this.count_
}, goog.structs.Map.prototype.getValues = function() {
    this.cleanupKeysArray_();
    for (var e = [], o = 0; o < this.keys_.length; o++) e.push(this.map_[this.keys_[o]]);
    return e
}, goog.structs.Map.prototype.getKeys = function() {
    return this.cleanupKeysArray_(), this.keys_.concat()
}, goog.structs.Map.prototype.containsKey = function(e) {
    return goog.structs.Map.hasKey_(this.map_, e)
}, goog.structs.Map.prototype.containsValue = function(e) {
    for (var o = 0; o < this.keys_.length; o++) {
        var t = this.keys_[o];
        if (goog.structs.Map.hasKey_(this.map_, t) && this.map_[t] == e) return !0
    }
    return !1
}, goog.structs.Map.prototype.equals = function(e, o) {
    if (this === e) return !0;
    if (this.count_ != e.getCount()) return !1;
    var t = o || goog.structs.Map.defaultEquals;
    this.cleanupKeysArray_();
    for (var n, r = 0; n = this.keys_[r]; r++)
        if (!t(this.get(n), e.get(n))) return !1;
    return !0
}, goog.structs.Map.defaultEquals = function(e, o) {
    return e === o
}, goog.structs.Map.prototype.isEmpty = function() {
    return 0 == this.count_
}, goog.structs.Map.prototype.clear = function() {
    this.map_ = {}, this.version_ = this.count_ = this.keys_.length = 0
}, goog.structs.Map.prototype.remove = function(e) {
    return !!goog.structs.Map.hasKey_(this.map_, e) && (delete this.map_[e], this.count_--, this.version_++, this.keys_.length > 2 * this.count_ && this.cleanupKeysArray_(), !0)
}, goog.structs.Map.prototype.cleanupKeysArray_ = function() {
    var e, o;
    if (this.count_ != this.keys_.length) {
        for (e = o = 0; o < this.keys_.length;) {
            var t = this.keys_[o];
            goog.structs.Map.hasKey_(this.map_, t) && (this.keys_[e++] = t), o++
        }
        this.keys_.length = e
    }
    if (this.count_ != this.keys_.length) {
        var n = {};
        for (e = o = 0; o < this.keys_.length;) t = this.keys_[o], goog.structs.Map.hasKey_(n, t) || (this.keys_[e++] = t, n[t] = 1), o++;
        this.keys_.length = e
    }
}, goog.structs.Map.prototype.get = function(e, o) {
    return goog.structs.Map.hasKey_(this.map_, e) ? this.map_[e] : o
}, goog.structs.Map.prototype.set = function(e, o) {
    goog.structs.Map.hasKey_(this.map_, e) || (this.count_++, this.keys_.push(e), this.version_++), this.map_[e] = o
}, goog.structs.Map.prototype.addAll = function(e) {
    if (e instanceof goog.structs.Map) {
        var o = e.getKeys();
        e = e.getValues()
    } else o = goog.object.getKeys(e), e = goog.object.getValues(e);
    for (var t = 0; t < o.length; t++) this.set(o[t], e[t])
}, goog.structs.Map.prototype.forEach = function(e, o) {
    for (var t = this.getKeys(), n = 0; n < t.length; n++) {
        var r = t[n],
            i = this.get(r);
        e.call(o, i, r, this)
    }
}, goog.structs.Map.prototype.clone = function() {
    return new goog.structs.Map(this)
}, goog.structs.Map.prototype.transpose = function() {
    for (var e = new goog.structs.Map, o = 0; o < this.keys_.length; o++) {
        var t = this.keys_[o];
        e.set(this.map_[t], t)
    }
    return e
}, goog.structs.Map.prototype.toObject = function() {
    this.cleanupKeysArray_();
    for (var e = {}, o = 0; o < this.keys_.length; o++) {
        var t = this.keys_[o];
        e[t] = this.map_[t]
    }
    return e
}, goog.structs.Map.prototype.getKeyIterator = function() {
    return this.__iterator__(!0)
}, goog.structs.Map.prototype.getValueIterator = function() {
    return this.__iterator__(!1)
}, goog.structs.Map.prototype.__iterator__ = function(e) {
    this.cleanupKeysArray_();
    var o = 0,
        t = this.version_,
        n = this,
        r = new goog.iter.Iterator;
    return r.next = function() {
        if (t != n.version_) throw Error("The map has changed since the iterator was created");
        if (o >= n.keys_.length) throw goog.iter.StopIteration;
        var r = n.keys_[o++];
        return e ? r : n.map_[r]
    }, r
}, goog.structs.Map.hasKey_ = function(e, o) {
    return Object.prototype.hasOwnProperty.call(e, o)
}, goog.structs.Set = function(e) {
    this.map_ = new goog.structs.Map, e && this.addAll(e)
}, goog.structs.Set.getKey_ = function(e) {
    var o = typeof e;
    return "object" == o && e || "function" == o ? "o" + goog.getUid(e) : o.substr(0, 1) + e
}, goog.structs.Set.prototype.getCount = function() {
    return this.map_.getCount()
}, goog.structs.Set.prototype.add = function(e) {
    this.map_.set(goog.structs.Set.getKey_(e), e)
}, goog.structs.Set.prototype.addAll = function(e) {
    for (var o = (e = goog.structs.getValues(e)).length, t = 0; t < o; t++) this.add(e[t])
}, goog.structs.Set.prototype.removeAll = function(e) {
    for (var o = (e = goog.structs.getValues(e)).length, t = 0; t < o; t++) this.remove(e[t])
}, goog.structs.Set.prototype.remove = function(e) {
    return this.map_.remove(goog.structs.Set.getKey_(e))
}, goog.structs.Set.prototype.clear = function() {
    this.map_.clear()
}, goog.structs.Set.prototype.isEmpty = function() {
    return this.map_.isEmpty()
}, goog.structs.Set.prototype.contains = function(e) {
    return this.map_.containsKey(goog.structs.Set.getKey_(e))
}, goog.structs.Set.prototype.containsAll = function(e) {
    return goog.structs.every(e, this.contains, this)
}, goog.structs.Set.prototype.intersection = function(e) {
    var o = new goog.structs.Set;
    e = goog.structs.getValues(e);
    for (var t = 0; t < e.length; t++) {
        var n = e[t];
        this.contains(n) && o.add(n)
    }
    return o
}, goog.structs.Set.prototype.difference = function(e) {
    var o = this.clone();
    return o.removeAll(e), o
}, goog.structs.Set.prototype.getValues = function() {
    return this.map_.getValues()
}, goog.structs.Set.prototype.clone = function() {
    return new goog.structs.Set(this)
}, goog.structs.Set.prototype.equals = function(e) {
    return this.getCount() == goog.structs.getCount(e) && this.isSubsetOf(e)
}, goog.structs.Set.prototype.isSubsetOf = function(e) {
    var o = goog.structs.getCount(e);
    return !(this.getCount() > o) && (!(e instanceof goog.structs.Set) && 5 < o && (e = new goog.structs.Set(e)), goog.structs.every(this, function(o) {
        return goog.structs.contains(e, o)
    }))
}, goog.structs.Set.prototype.__iterator__ = function(e) {
    return this.map_.__iterator__(!1)
}, goog.debug.LOGGING_ENABLED = goog.DEBUG, goog.debug.FORCE_SLOPPY_STACKS = !1, goog.debug.catchErrors = function(e, o, t) {
    var n = (t = t || goog.global).onerror,
        r = !!o;
    goog.userAgent.WEBKIT && !goog.userAgent.isVersionOrHigher("535.3") && (r = !r), t.onerror = function(o, t, i, s, l) {
        return n && n(o, t, i, s, l), e({
            message: o,
            fileName: t,
            line: i,
            col: s,
            error: l
        }), r
    }
}, goog.debug.expose = function(e, o) {
    if (void 0 === e) return "undefined";
    if (null == e) return "NULL";
    var t, n = [];
    for (t in e)
        if (o || !goog.isFunction(e[t])) {
            var r = t + " = ";
            try {
                r += e[t]
            } catch (e) {
                r += "*** " + e + " ***"
            }
            n.push(r)
        }
    return n.join("\n")
}, goog.debug.deepExpose = function(e, o) {
    var t = [],
        n = [],
        r = {},
        i = function(e, s) {
            var l = s + "  ";
            try {
                if (goog.isDef(e))
                    if (goog.isNull(e)) t.push("NULL");
                    else if (goog.isString(e)) t.push('"' + e.replace(/\n/g, "\n" + s) + '"');
                else if (goog.isFunction(e)) t.push(String(e).replace(/\n/g, "\n" + s));
                else if (goog.isObject(e)) {
                    goog.hasUid(e) || n.push(e);
                    var g = goog.getUid(e);
                    if (r[g]) t.push("*** reference loop detected (id=" + g + ") ***");
                    else {
                        r[g] = !0, t.push("{");
                        for (var a in e) !o && goog.isFunction(e[a]) || (t.push("\n"), t.push(l), t.push(a + " = "), i(e[a], l));
                        t.push("\n" + s + "}"), delete r[g]
                    }
                } else t.push(e);
                else t.push("undefined")
            } catch (e) {
                t.push("*** " + e + " ***")
            }
        };
    i(e, "");
    for (var s = 0; s < n.length; s++) goog.removeUid(n[s]);
    return t.join("")
}, goog.debug.exposeArray = function(e) {
    for (var o = [], t = 0; t < e.length; t++) goog.isArray(e[t]) ? o.push(goog.debug.exposeArray(e[t])) : o.push(e[t]);
    return "[ " + o.join(", ") + " ]"
}, goog.debug.normalizeErrorObject = function(e) {
    var o = goog.getObjectByName("window.location.href");
    if (goog.isString(e)) return {
        message: e,
        name: "Unknown error",
        lineNumber: "Not available",
        fileName: o,
        stack: "Not available"
    };
    var t = !1;
    try {
        var n = e.lineNumber || e.line || "Not available"
    } catch (e) {
        n = "Not available", t = !0
    }
    try {
        var r = e.fileName || e.filename || e.sourceURL || goog.global.$googDebugFname || o
    } catch (e) {
        r = "Not available", t = !0
    }
    return !t && e.lineNumber && e.fileName && e.stack && e.message && e.name ? e : {
        message: e.message || "Not available",
        name: e.name || "UnknownError",
        lineNumber: n,
        fileName: r,
        stack: e.stack || "Not available"
    }
}, goog.debug.enhanceError = function(e, o) {
    if (e instanceof Error) var t = e;
    else t = Error(e), Error.captureStackTrace && Error.captureStackTrace(t, goog.debug.enhanceError);
    if (t.stack || (t.stack = goog.debug.getStacktrace(goog.debug.enhanceError)), o) {
        for (var n = 0; t["message" + n];) ++n;
        t["message" + n] = String(o)
    }
    return t
}, goog.debug.getStacktraceSimple = function(e) {
    if (!goog.debug.FORCE_SLOPPY_STACKS && (o = goog.debug.getNativeStackTrace_(goog.debug.getStacktraceSimple))) return o;
    for (var o = [], t = arguments.callee.caller, n = 0; t && (!e || n < e);) {
        o.push(goog.debug.getFunctionName(t)), o.push("()\n");
        try {
            t = t.caller
        } catch (e) {
            o.push("[exception trying to get caller]\n");
            break
        }
        if (++n >= goog.debug.MAX_STACK_DEPTH) {
            o.push("[...long stack...]");
            break
        }
    }
    return e && n >= e ? o.push("[...reached max depth limit...]") : o.push("[end]"), o.join("")
}, goog.debug.MAX_STACK_DEPTH = 50, goog.debug.getNativeStackTrace_ = function(e) {
    var o = Error();
    if (Error.captureStackTrace) return Error.captureStackTrace(o, e), String(o.stack);
    try {
        throw o
    } catch (e) {
        o = e
    }
    return (e = o.stack) ? String(e) : null
}, goog.debug.getStacktrace = function(e) {
    var o;
    return goog.debug.FORCE_SLOPPY_STACKS || (o = goog.debug.getNativeStackTrace_(e || goog.debug.getStacktrace)), o || (o = goog.debug.getStacktraceHelper_(e || arguments.callee.caller, [])), o
}, goog.debug.getStacktraceHelper_ = function(e, o) {
    var t = [];
    if (goog.array.contains(o, e)) t.push("[...circular reference...]");
    else if (e && o.length < goog.debug.MAX_STACK_DEPTH) {
        t.push(goog.debug.getFunctionName(e) + "(");
        for (var n = e.arguments, r = 0; n && r < n.length; r++) {
            0 < r && t.push(", ");
            var i = n[r];
            switch (typeof i) {
                case "object":
                    i = i ? "object" : "null";
                    break;
                case "string":
                    break;
                case "number":
                    i = String(i);
                    break;
                case "boolean":
                    i = i ? "true" : "false";
                    break;
                case "function":
                    i = (i = goog.debug.getFunctionName(i)) ? i : "[fn]";
                    break;
                default:
                    i = typeof i
            }
            40 < i.length && (i = i.substr(0, 40) + "..."), t.push(i)
        }
        o.push(e), t.push(")\n");
        try {
            t.push(goog.debug.getStacktraceHelper_(e.caller, o))
        } catch (e) {
            t.push("[exception trying to get caller]\n")
        }
    } else e ? t.push("[...long stack...]") : t.push("[end]");
    return t.join("")
}, goog.debug.setFunctionResolver = function(e) {
    goog.debug.fnNameResolver_ = e
}, goog.debug.getFunctionName = function(e) {
    if (goog.debug.fnNameCache_[e]) return goog.debug.fnNameCache_[e];
    if (goog.debug.fnNameResolver_) {
        var o = goog.debug.fnNameResolver_(e);
        if (o) return goog.debug.fnNameCache_[e] = o
    }
    return e = String(e), goog.debug.fnNameCache_[e] || (o = /function ([^\(]+)/.exec(e), goog.debug.fnNameCache_[e] = o ? o[1] : "[Anonymous]"), goog.debug.fnNameCache_[e]
}, goog.debug.makeWhitespaceVisible = function(e) {
    return e.replace(/ /g, "[_]").replace(/\f/g, "[f]").replace(/\n/g, "[n]\n").replace(/\r/g, "[r]").replace(/\t/g, "[t]")
}, goog.debug.runtimeType = function(e) {
    return e instanceof Function ? e.displayName || e.name || "unknown type name" : e instanceof Object ? e.constructor.displayName || e.constructor.name || Object.prototype.toString.call(e) : null === e ? "null" : typeof e
}, goog.debug.fnNameCache_ = {}, goog.debug.LogRecord = function(e, o, t, n, r) {
    this.reset(e, o, t, n, r)
}, goog.debug.LogRecord.prototype.sequenceNumber_ = 0, goog.debug.LogRecord.prototype.exception_ = null, goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS = !0, goog.debug.LogRecord.nextSequenceNumber_ = 0, goog.debug.LogRecord.prototype.reset = function(e, o, t, n, r) {
    goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS && (this.sequenceNumber_ = "number" == typeof r ? r : goog.debug.LogRecord.nextSequenceNumber_++), this.time_ = n || goog.now(), this.level_ = e, this.msg_ = o, this.loggerName_ = t, delete this.exception_
}, goog.debug.LogRecord.prototype.getLoggerName = function() {
    return this.loggerName_
}, goog.debug.LogRecord.prototype.getException = function() {
    return this.exception_
}, goog.debug.LogRecord.prototype.setException = function(e) {
    this.exception_ = e
}, goog.debug.LogRecord.prototype.setLoggerName = function(e) {
    this.loggerName_ = e
}, goog.debug.LogRecord.prototype.getLevel = function() {
    return this.level_
}, goog.debug.LogRecord.prototype.setLevel = function(e) {
    this.level_ = e
}, goog.debug.LogRecord.prototype.getMessage = function() {
    return this.msg_
}, goog.debug.LogRecord.prototype.setMessage = function(e) {
    this.msg_ = e
}, goog.debug.LogRecord.prototype.getMillis = function() {
    return this.time_
}, goog.debug.LogRecord.prototype.setMillis = function(e) {
    this.time_ = e
}, goog.debug.LogRecord.prototype.getSequenceNumber = function() {
    return this.sequenceNumber_
}, goog.debug.LogBuffer = function() {
    goog.asserts.assert(goog.debug.LogBuffer.isBufferingEnabled(), "Cannot use goog.debug.LogBuffer without defining goog.debug.LogBuffer.CAPACITY."), this.clear()
}, goog.debug.LogBuffer.getInstance = function() {
    return goog.debug.LogBuffer.instance_ || (goog.debug.LogBuffer.instance_ = new goog.debug.LogBuffer), goog.debug.LogBuffer.instance_
}, goog.debug.LogBuffer.CAPACITY = 0, goog.debug.LogBuffer.prototype.addRecord = function(e, o, t) {
    var n = (this.curIndex_ + 1) % goog.debug.LogBuffer.CAPACITY;
    return this.curIndex_ = n, this.isFull_ ? ((n = this.buffer_[n]).reset(e, o, t), n) : (this.isFull_ = n == goog.debug.LogBuffer.CAPACITY - 1, this.buffer_[n] = new goog.debug.LogRecord(e, o, t))
}, goog.debug.LogBuffer.isBufferingEnabled = function() {
    return 0 < goog.debug.LogBuffer.CAPACITY
}, goog.debug.LogBuffer.prototype.clear = function() {
    this.buffer_ = Array(goog.debug.LogBuffer.CAPACITY), this.curIndex_ = -1, this.isFull_ = !1
}, goog.debug.LogBuffer.prototype.forEachRecord = function(e) {
    var o = this.buffer_;
    if (o[0]) {
        var t = this.curIndex_,
            n = this.isFull_ ? t : -1;
        do {
            n = (n + 1) % goog.debug.LogBuffer.CAPACITY, e(o[n])
        } while (n != t)
    }
}, goog.debug.Logger = function(e) {
    this.name_ = e, this.handlers_ = this.children_ = this.level_ = this.parent_ = null
}, goog.debug.Logger.ROOT_LOGGER_NAME = "", goog.debug.Logger.ENABLE_HIERARCHY = !0, goog.debug.Logger.ENABLE_HIERARCHY || (goog.debug.Logger.rootHandlers_ = []), goog.debug.Logger.Level = function(e, o) {
    this.name = e, this.value = o
}, goog.debug.Logger.Level.prototype.toString = function() {
    return this.name
}, goog.debug.Logger.Level.OFF = new goog.debug.Logger.Level("OFF", 1 / 0), goog.debug.Logger.Level.SHOUT = new goog.debug.Logger.Level("SHOUT", 1200), goog.debug.Logger.Level.SEVERE = new goog.debug.Logger.Level("SEVERE", 1e3), goog.debug.Logger.Level.WARNING = new goog.debug.Logger.Level("WARNING", 900), goog.debug.Logger.Level.INFO = new goog.debug.Logger.Level("INFO", 800), goog.debug.Logger.Level.CONFIG = new goog.debug.Logger.Level("CONFIG", 700), goog.debug.Logger.Level.FINE = new goog.debug.Logger.Level("FINE", 500), goog.debug.Logger.Level.FINER = new goog.debug.Logger.Level("FINER", 400), goog.debug.Logger.Level.FINEST = new goog.debug.Logger.Level("FINEST", 300), goog.debug.Logger.Level.ALL = new goog.debug.Logger.Level("ALL", 0), goog.debug.Logger.Level.PREDEFINED_LEVELS = [goog.debug.Logger.Level.OFF, goog.debug.Logger.Level.SHOUT, goog.debug.Logger.Level.SEVERE, goog.debug.Logger.Level.WARNING, goog.debug.Logger.Level.INFO, goog.debug.Logger.Level.CONFIG, goog.debug.Logger.Level.FINE, goog.debug.Logger.Level.FINER, goog.debug.Logger.Level.FINEST, goog.debug.Logger.Level.ALL], goog.debug.Logger.Level.predefinedLevelsCache_ = null, goog.debug.Logger.Level.createPredefinedLevelsCache_ = function() {
    goog.debug.Logger.Level.predefinedLevelsCache_ = {};
    for (var e, o = 0; e = goog.debug.Logger.Level.PREDEFINED_LEVELS[o]; o++) goog.debug.Logger.Level.predefinedLevelsCache_[e.value] = e, goog.debug.Logger.Level.predefinedLevelsCache_[e.name] = e
}, goog.debug.Logger.Level.getPredefinedLevel = function(e) {
    return goog.debug.Logger.Level.predefinedLevelsCache_ || goog.debug.Logger.Level.createPredefinedLevelsCache_(), goog.debug.Logger.Level.predefinedLevelsCache_[e] || null
}, goog.debug.Logger.Level.getPredefinedLevelByValue = function(e) {
    if (goog.debug.Logger.Level.predefinedLevelsCache_ || goog.debug.Logger.Level.createPredefinedLevelsCache_(), e in goog.debug.Logger.Level.predefinedLevelsCache_) return goog.debug.Logger.Level.predefinedLevelsCache_[e];
    for (var o = 0; o < goog.debug.Logger.Level.PREDEFINED_LEVELS.length; ++o) {
        var t = goog.debug.Logger.Level.PREDEFINED_LEVELS[o];
        if (t.value <= e) return t
    }
    return null
}, goog.debug.Logger.getLogger = function(e) {
    return goog.debug.LogManager.getLogger(e)
}, goog.debug.Logger.logToProfilers = function(e) {
    goog.global.console && (goog.global.console.timeStamp ? goog.global.console.timeStamp(e) : goog.global.console.markTimeline && goog.global.console.markTimeline(e)), goog.global.msWriteProfilerMark && goog.global.msWriteProfilerMark(e)
}, goog.debug.Logger.prototype.getName = function() {
    return this.name_
}, goog.debug.Logger.prototype.addHandler = function(e) {
    goog.debug.LOGGING_ENABLED && (goog.debug.Logger.ENABLE_HIERARCHY ? (this.handlers_ || (this.handlers_ = []), this.handlers_.push(e)) : (goog.asserts.assert(!this.name_, "Cannot call addHandler on a non-root logger when goog.debug.Logger.ENABLE_HIERARCHY is false."), goog.debug.Logger.rootHandlers_.push(e)))
}, goog.debug.Logger.prototype.removeHandler = function(e) {
    if (goog.debug.LOGGING_ENABLED) {
        var o = goog.debug.Logger.ENABLE_HIERARCHY ? this.handlers_ : goog.debug.Logger.rootHandlers_;
        return !!o && goog.array.remove(o, e)
    }
    return !1
}, goog.debug.Logger.prototype.getParent = function() {
    return this.parent_
}, goog.debug.Logger.prototype.getChildren = function() {
    return this.children_ || (this.children_ = {}), this.children_
}, goog.debug.Logger.prototype.setLevel = function(e) {
    goog.debug.LOGGING_ENABLED && (goog.debug.Logger.ENABLE_HIERARCHY ? this.level_ = e : (goog.asserts.assert(!this.name_, "Cannot call setLevel() on a non-root logger when goog.debug.Logger.ENABLE_HIERARCHY is false."), goog.debug.Logger.rootLevel_ = e))
}, goog.debug.Logger.prototype.getLevel = function() {
    return goog.debug.LOGGING_ENABLED ? this.level_ : goog.debug.Logger.Level.OFF
}, goog.debug.Logger.prototype.getEffectiveLevel = function() {
    return goog.debug.LOGGING_ENABLED ? goog.debug.Logger.ENABLE_HIERARCHY ? this.level_ ? this.level_ : this.parent_ ? this.parent_.getEffectiveLevel() : (goog.asserts.fail("Root logger has no level set."), null) : goog.debug.Logger.rootLevel_ : goog.debug.Logger.Level.OFF
}, goog.debug.Logger.prototype.isLoggable = function(e) {
    return goog.debug.LOGGING_ENABLED && e.value >= this.getEffectiveLevel().value
}, goog.debug.Logger.prototype.log = function(e, o, t) {
    goog.debug.LOGGING_ENABLED && this.isLoggable(e) && (goog.isFunction(o) && (o = o()), this.doLogRecord_(this.getLogRecord(e, o, t)))
}, goog.debug.Logger.prototype.getLogRecord = function(e, o, t) {
    return e = goog.debug.LogBuffer.isBufferingEnabled() ? goog.debug.LogBuffer.getInstance().addRecord(e, o, this.name_) : new goog.debug.LogRecord(e, String(o), this.name_), t && e.setException(t), e
}, goog.debug.Logger.prototype.shout = function(e, o) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.SHOUT, e, o)
}, goog.debug.Logger.prototype.severe = function(e, o) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.SEVERE, e, o)
}, goog.debug.Logger.prototype.warning = function(e, o) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.WARNING, e, o)
}, goog.debug.Logger.prototype.info = function(e, o) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.INFO, e, o)
}, goog.debug.Logger.prototype.config = function(e, o) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.CONFIG, e, o)
}, goog.debug.Logger.prototype.fine = function(e, o) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.FINE, e, o)
}, goog.debug.Logger.prototype.finer = function(e, o) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.FINER, e, o)
}, goog.debug.Logger.prototype.finest = function(e, o) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.FINEST, e, o)
}, goog.debug.Logger.prototype.logRecord = function(e) {
    goog.debug.LOGGING_ENABLED && this.isLoggable(e.getLevel()) && this.doLogRecord_(e)
}, goog.debug.Logger.prototype.doLogRecord_ = function(e) {
    if (goog.debug.Logger.logToProfilers("log:" + e.getMessage()), goog.debug.Logger.ENABLE_HIERARCHY)
        for (t = this; t;) t.callPublish_(e), t = t.getParent();
    else
        for (var o, t = 0; o = goog.debug.Logger.rootHandlers_[t++];) o(e)
}, goog.debug.Logger.prototype.callPublish_ = function(e) {
    if (this.handlers_)
        for (var o, t = 0; o = this.handlers_[t]; t++) o(e)
}, goog.debug.Logger.prototype.setParent_ = function(e) {
    this.parent_ = e
}, goog.debug.Logger.prototype.addChild_ = function(e, o) {
    this.getChildren()[e] = o
}, goog.debug.LogManager = {}, goog.debug.LogManager.loggers_ = {}, goog.debug.LogManager.rootLogger_ = null, goog.debug.LogManager.initialize = function() {
    goog.debug.LogManager.rootLogger_ || (goog.debug.LogManager.rootLogger_ = new goog.debug.Logger(goog.debug.Logger.ROOT_LOGGER_NAME), goog.debug.LogManager.loggers_[goog.debug.Logger.ROOT_LOGGER_NAME] = goog.debug.LogManager.rootLogger_, goog.debug.LogManager.rootLogger_.setLevel(goog.debug.Logger.Level.CONFIG))
}, goog.debug.LogManager.getLoggers = function() {
    return goog.debug.LogManager.loggers_
}, goog.debug.LogManager.getRoot = function() {
    return goog.debug.LogManager.initialize(), goog.debug.LogManager.rootLogger_
}, goog.debug.LogManager.getLogger = function(e) {
    return goog.debug.LogManager.initialize(), goog.debug.LogManager.loggers_[e] || goog.debug.LogManager.createLogger_(e)
}, goog.debug.LogManager.createFunctionForCatchErrors = function(e) {
    return function(o) {
        (e || goog.debug.LogManager.getRoot()).severe("Error: " + o.message + " (" + o.fileName + " @ Line: " + o.line + ")")
    }
}, goog.debug.LogManager.createLogger_ = function(e) {
    var o = new goog.debug.Logger(e);
    if (goog.debug.Logger.ENABLE_HIERARCHY) {
        var t = e.lastIndexOf("."),
            n = e.substr(0, t),
            t = e.substr(t + 1);
        (n = goog.debug.LogManager.getLogger(n)).addChild_(t, o), o.setParent_(n)
    }
    return goog.debug.LogManager.loggers_[e] = o
}, goog.log = {}, goog.log.ENABLED = goog.debug.LOGGING_ENABLED, goog.log.ROOT_LOGGER_NAME = goog.debug.Logger.ROOT_LOGGER_NAME, goog.log.Logger = goog.debug.Logger, goog.log.Level = goog.debug.Logger.Level, goog.log.LogRecord = goog.debug.LogRecord, goog.log.getLogger = function(e, o) {
    if (goog.log.ENABLED) {
        var t = goog.debug.LogManager.getLogger(e);
        return o && t && t.setLevel(o), t
    }
    return null
}, goog.log.addHandler = function(e, o) {
    goog.log.ENABLED && e && e.addHandler(o)
}, goog.log.removeHandler = function(e, o) {
    return !(!goog.log.ENABLED || !e) && e.removeHandler(o)
}, goog.log.log = function(e, o, t, n) {
    goog.log.ENABLED && e && e.log(o, t, n)
}, goog.log.error = function(e, o, t) {
    goog.log.ENABLED && e && e.severe(o, t)
}, goog.log.warning = function(e, o, t) {
    goog.log.ENABLED && e && e.warning(o, t)
}, goog.log.info = function(e, o, t) {
    goog.log.ENABLED && e && e.info(o, t)
}, goog.log.fine = function(e, o, t) {
    goog.log.ENABLED && e && e.fine(o, t)
}, goog.string.StringBuffer = function(e, o) {
    null != e && this.append.apply(this, arguments)
}, goog.string.StringBuffer.prototype.buffer_ = "", goog.string.StringBuffer.prototype.set = function(e) {
    this.buffer_ = "" + e
}, goog.string.StringBuffer.prototype.append = function(e, o, t) {
    if (this.buffer_ += String(e), null != o)
        for (var n = 1; n < arguments.length; n++) this.buffer_ += arguments[n];
    return this
}, goog.string.StringBuffer.prototype.clear = function() {
    this.buffer_ = ""
}, goog.string.StringBuffer.prototype.getLength = function() {
    return this.buffer_.length
}, goog.string.StringBuffer.prototype.toString = function() {
    return this.buffer_
}, goog.ui.tree = {}, goog.ui.tree.BaseNode = function(e, o, t) {
    goog.ui.Component.call(this, t), this.config_ = o || goog.ui.tree.BaseNode.defaultConfig, this.html_ = goog.html.SafeHtml.htmlEscapePreservingNewlines(e), this.expanded_ = this.selected_ = !1, this.toolTip_ = null, this.afterLabelHtml_ = goog.html.SafeHtml.EMPTY, this.isUserCollapsible_ = !0, this.depth_ = -1
}, goog.inherits(goog.ui.tree.BaseNode, goog.ui.Component), goog.ui.tree.BaseNode.EventType = {
    BEFORE_EXPAND: "beforeexpand",
    EXPAND: "expand",
    BEFORE_COLLAPSE: "beforecollapse",
    COLLAPSE: "collapse"
}, goog.ui.tree.BaseNode.allNodes = {}, goog.ui.tree.BaseNode.prototype.disposeInternal = function() {
    goog.ui.tree.BaseNode.superClass_.disposeInternal.call(this), this.tree && (this.tree.removeNode(this), this.tree = null), this.setElementInternal(null)
}, goog.ui.tree.BaseNode.prototype.initAccessibility = function() {
    var e = this.getElement();
    if (e) {
        var o = this.getLabelElement();
        if (o && !o.id && (o.id = this.getId() + ".label"), goog.a11y.aria.setRole(e, "treeitem"), goog.a11y.aria.setState(e, "selected", !1), goog.a11y.aria.setState(e, "level", this.getDepth()), o && goog.a11y.aria.setState(e, "labelledby", o.id), (o = this.getIconElement()) && goog.a11y.aria.setRole(o, "presentation"), (o = this.getExpandIconElement()) && goog.a11y.aria.setRole(o, "presentation"), (o = this.getChildrenElement()) && (goog.a11y.aria.setRole(o, "group"), o.hasChildNodes()))
            for (goog.a11y.aria.setState(e, goog.a11y.aria.State.EXPANDED, !1), e = this.getChildCount(), o = 1; o <= e; o++) {
                var t = this.getChildAt(o - 1).getElement();
                goog.asserts.assert(t, "The child element cannot be null"), goog.a11y.aria.setState(t, "setsize", e), goog.a11y.aria.setState(t, "posinset", o)
            }
    }
}, goog.ui.tree.BaseNode.prototype.createDom = function() {
    var e = this.getDomHelper().safeHtmlToNode(this.toSafeHtml());
    this.setElementInternal(e)
}, goog.ui.tree.BaseNode.prototype.enterDocument = function() {
    goog.ui.tree.BaseNode.superClass_.enterDocument.call(this), goog.ui.tree.BaseNode.allNodes[this.getId()] = this, this.initAccessibility()
}, goog.ui.tree.BaseNode.prototype.exitDocument = function() {
    goog.ui.tree.BaseNode.superClass_.exitDocument.call(this), delete goog.ui.tree.BaseNode.allNodes[this.getId()]
}, goog.ui.tree.BaseNode.prototype.addChildAt = function(e, o, t) {
    goog.asserts.assert(!e.getParent()), goog.asserts.assertInstanceof(e, goog.ui.tree.BaseNode), t = this.getChildAt(o - 1);
    var n = this.getChildAt(o);
    if (goog.ui.tree.BaseNode.superClass_.addChildAt.call(this, e, o), e.previousSibling_ = t, e.nextSibling_ = n, t ? t.nextSibling_ = e : this.firstChild_ = e, n ? n.previousSibling_ = e : this.lastChild_ = e, (o = this.getTree()) && e.setTreeInternal(o), e.setDepth_(this.getDepth() + 1), (o = this.getElement()) && (this.updateExpandIcon(), goog.a11y.aria.setState(o, goog.a11y.aria.State.EXPANDED, this.getExpanded()), this.getExpanded())) {
        o = this.getChildrenElement(), e.getElement() || e.createDom();
        var r = e.getElement(),
            i = n && n.getElement();
        o.insertBefore(r, i), this.isInDocument() && e.enterDocument(), n || (t ? t.updateExpandIcon() : (goog.style.setElementShown(o, !0), this.setExpanded(this.getExpanded())))
    }
}, goog.ui.tree.BaseNode.prototype.add = function(e, o) {
    return goog.asserts.assert(!o || o.getParent() == this, "Can only add nodes before siblings"), e.getParent() && e.getParent().removeChild(e), this.addChildAt(e, o ? this.indexOfChild(o) : this.getChildCount()), e
}, goog.ui.tree.BaseNode.prototype.removeChild = function(e, o) {
    var t = this.getTree(),
        n = t ? t.getSelectedItem() : null;
    if ((n == e || e.contains(n)) && (t.hasFocus() ? (this.select(), goog.Timer.callOnce(this.onTimeoutSelect_, 10, this)) : this.select()), goog.ui.tree.BaseNode.superClass_.removeChild.call(this, e), this.lastChild_ == e && (this.lastChild_ = e.previousSibling_), this.firstChild_ == e && (this.firstChild_ = e.nextSibling_), e.previousSibling_ && (e.previousSibling_.nextSibling_ = e.nextSibling_), e.nextSibling_ && (e.nextSibling_.previousSibling_ = e.previousSibling_), n = e.isLastSibling(), e.tree = null, e.depth_ = -1, t && (t.removeNode(e), this.isInDocument())) {
        if (t = this.getChildrenElement(), e.isInDocument()) {
            var r = e.getElement();
            t.removeChild(r), e.exitDocument()
        }
        n && (n = this.getLastChild()) && n.updateExpandIcon(), this.hasChildren() || (t.style.display = "none", this.updateExpandIcon(), this.updateIcon_(), (n = this.getElement()) && goog.a11y.aria.removeState(n, goog.a11y.aria.State.EXPANDED))
    }
    return e
}, goog.ui.tree.BaseNode.prototype.remove = goog.ui.tree.BaseNode.prototype.removeChild, goog.ui.tree.BaseNode.prototype.onTimeoutSelect_ = function() {
    this.select()
}, goog.ui.tree.BaseNode.prototype.getTree = goog.abstractMethod, goog.ui.tree.BaseNode.prototype.getDepth = function() {
    var e = this.depth_;
    return 0 > e && (e = this.computeDepth_(), this.setDepth_(e)), e
}, goog.ui.tree.BaseNode.prototype.computeDepth_ = function() {
    var e = this.getParent();
    return e ? e.getDepth() + 1 : 0
}, goog.ui.tree.BaseNode.prototype.setDepth_ = function(e) {
    if (e != this.depth_) {
        this.depth_ = e;
        var o = this.getRowElement();
        if (o) {
            var t = this.getPixelIndent_() + "px";
            this.isRightToLeft() ? o.style.paddingRight = t : o.style.paddingLeft = t
        }
        this.forEachChild(function(o) {
            o.setDepth_(e + 1)
        })
    }
}, goog.ui.tree.BaseNode.prototype.contains = function(e) {
    for (; e;) {
        if (e == this) return !0;
        e = e.getParent()
    }
    return !1
}, goog.ui.tree.BaseNode.EMPTY_CHILDREN_ = [], goog.ui.tree.BaseNode.prototype.getChildren = function() {
    var e = [];
    return this.forEachChild(function(o) {
        e.push(o)
    }), e
}, goog.ui.tree.BaseNode.prototype.getFirstChild = function() {
    return this.getChildAt(0)
}, goog.ui.tree.BaseNode.prototype.getLastChild = function() {
    return this.getChildAt(this.getChildCount() - 1)
}, goog.ui.tree.BaseNode.prototype.getPreviousSibling = function() {
    return this.previousSibling_
}, goog.ui.tree.BaseNode.prototype.getNextSibling = function() {
    return this.nextSibling_
}, goog.ui.tree.BaseNode.prototype.isLastSibling = function() {
    return !this.nextSibling_
}, goog.ui.tree.BaseNode.prototype.isSelected = function() {
    return this.selected_
}, goog.ui.tree.BaseNode.prototype.select = function() {
    var e = this.getTree();
    e && e.setSelectedItem(this)
}, goog.ui.tree.BaseNode.prototype.deselect = goog.nullFunction, goog.ui.tree.BaseNode.prototype.setSelectedInternal = function(e) {
    if (this.selected_ != e) {
        this.selected_ = e, this.updateRow();
        var o = this.getElement();
        o && (goog.a11y.aria.setState(o, "selected", e), e && (e = this.getTree().getElement(), goog.asserts.assert(e, "The DOM element for the tree cannot be null"), goog.a11y.aria.setState(e, "activedescendant", this.getId())))
    }
}, goog.ui.tree.BaseNode.prototype.getExpanded = function() {
    return this.expanded_
}, goog.ui.tree.BaseNode.prototype.setExpandedInternal = function(e) {
    this.expanded_ = e
}, goog.ui.tree.BaseNode.prototype.setExpanded = function(e) {
    var o = e != this.expanded_;
    if (!o || this.dispatchEvent(e ? goog.ui.tree.BaseNode.EventType.BEFORE_EXPAND : goog.ui.tree.BaseNode.EventType.BEFORE_COLLAPSE)) {
        this.expanded_ = e;
        var t = this.getTree(),
            n = this.getElement();
        if (this.hasChildren()) {
            if (!e && t && this.contains(t.getSelectedItem()) && this.select(), n) {
                if ((t = this.getChildrenElement()) && (goog.style.setElementShown(t, e), goog.a11y.aria.setState(n, goog.a11y.aria.State.EXPANDED, e), e && this.isInDocument() && !t.hasChildNodes())) {
                    var r = [];
                    this.forEachChild(function(e) {
                        r.push(e.toSafeHtml())
                    }), goog.dom.safe.setInnerHtml(t, goog.html.SafeHtml.concat(r)), this.forEachChild(function(e) {
                        e.enterDocument()
                    })
                }
                this.updateExpandIcon()
            }
        } else(t = this.getChildrenElement()) && goog.style.setElementShown(t, !1);
        n && this.updateIcon_(), o && this.dispatchEvent(e ? goog.ui.tree.BaseNode.EventType.EXPAND : goog.ui.tree.BaseNode.EventType.COLLAPSE)
    }
}, goog.ui.tree.BaseNode.prototype.toggle = function() {
    this.setExpanded(!this.getExpanded())
}, goog.ui.tree.BaseNode.prototype.expand = function() {
    this.setExpanded(!0)
}, goog.ui.tree.BaseNode.prototype.collapse = function() {
    this.setExpanded(!1)
}, goog.ui.tree.BaseNode.prototype.collapseChildren = function() {
    this.forEachChild(function(e) {
        e.collapseAll()
    })
}, goog.ui.tree.BaseNode.prototype.collapseAll = function() {
    this.collapseChildren(), this.collapse()
}, goog.ui.tree.BaseNode.prototype.expandChildren = function() {
    this.forEachChild(function(e) {
        e.expandAll()
    })
}, goog.ui.tree.BaseNode.prototype.expandAll = function() {
    this.expandChildren(), this.expand()
}, goog.ui.tree.BaseNode.prototype.reveal = function() {
    var e = this.getParent();
    e && (e.setExpanded(!0), e.reveal())
}, goog.ui.tree.BaseNode.prototype.setIsUserCollapsible = function(e) {
    (this.isUserCollapsible_ = e) || this.expand(), this.getElement() && this.updateExpandIcon()
}, goog.ui.tree.BaseNode.prototype.isUserCollapsible = function() {
    return this.isUserCollapsible_
}, goog.ui.tree.BaseNode.prototype.toSafeHtml = function() {
    var e = !(o = this.getTree()).getShowLines() || o == this.getParent() && !o.getShowRootLines() ? this.config_.cssChildrenNoLines : this.config_.cssChildren,
        o = this.getExpanded() && this.hasChildren(),
        e = {
            class: e,
            style: this.getLineStyle()
        },
        t = [];
    return o && this.forEachChild(function(e) {
        t.push(e.toSafeHtml())
    }), o = goog.html.SafeHtml.create("div", e, t), goog.html.SafeHtml.create("div", {
        class: this.config_.cssItem,
        id: this.getId()
    }, [this.getRowSafeHtml(), o])
}, goog.ui.tree.BaseNode.prototype.getPixelIndent_ = function() {
    return Math.max(0, (this.getDepth() - 1) * this.config_.indentWidth)
}, goog.ui.tree.BaseNode.prototype.getRowSafeHtml = function() {
    (e = {})["padding-" + (this.isRightToLeft() ? "right" : "left")] = this.getPixelIndent_() + "px";
    var e = {
            class: this.getRowClassName(),
            style: e
        },
        o = [this.getExpandIconSafeHtml(), this.getIconSafeHtml(), this.getLabelSafeHtml()];
    return goog.html.SafeHtml.create("div", e, o)
}, goog.ui.tree.BaseNode.prototype.getRowClassName = function() {
    var e = this.isSelected() ? " " + this.config_.cssSelectedRow : "";
    return this.config_.cssTreeRow + e
}, goog.ui.tree.BaseNode.prototype.getLabelSafeHtml = function() {
    var e = goog.html.SafeHtml.create("span", {
        class: this.config_.cssItemLabel,
        title: this.getToolTip() || null
    }, this.getSafeHtml());
    return goog.html.SafeHtml.concat(e, goog.html.SafeHtml.create("span", {}, this.getAfterLabelSafeHtml()))
}, goog.ui.tree.BaseNode.prototype.getAfterLabelHtml = function() {
    return goog.html.SafeHtml.unwrap(this.getAfterLabelSafeHtml())
}, goog.ui.tree.BaseNode.prototype.getAfterLabelSafeHtml = function() {
    return this.afterLabelHtml_
}, goog.ui.tree.BaseNode.prototype.setAfterLabelSafeHtml = function(e) {
    this.afterLabelHtml_ = e;
    var o = this.getAfterLabelElement();
    o && goog.dom.safe.setInnerHtml(o, e)
}, goog.ui.tree.BaseNode.prototype.getIconSafeHtml = function() {
    return goog.html.SafeHtml.create("span", {
        style: {
            display: "inline-block"
        },
        class: this.getCalculatedIconClass()
    })
};
goog.ui.tree.BaseNode.prototype.getCalculatedIconClass = goog.abstractMethod, goog.ui.tree.BaseNode.prototype.getExpandIconSafeHtml = function() {
    return goog.html.SafeHtml.create("span", {
        type: "expand",
        style: {
            display: "inline-block"
        },
        class: this.getExpandIconClass()
    })
}, goog.ui.tree.BaseNode.prototype.getExpandIconClass = function() {
    var e = this.getTree(),
        o = !e.getShowLines() || e == this.getParent() && !e.getShowRootLines(),
        t = this.config_,
        n = new goog.string.StringBuffer;
    if (n.append(t.cssTreeIcon, " ", t.cssExpandTreeIcon, " "), this.hasChildren()) {
        var r = 0;
        switch (e.getShowExpandIcons() && this.isUserCollapsible_ && (r = this.getExpanded() ? 2 : 1), o || (r = this.isLastSibling() ? r + 4 : r + 8), r) {
            case 1:
                n.append(t.cssExpandTreeIconPlus);
                break;
            case 2:
                n.append(t.cssExpandTreeIconMinus);
                break;
            case 4:
                n.append(t.cssExpandTreeIconL);
                break;
            case 5:
                n.append(t.cssExpandTreeIconLPlus);
                break;
            case 6:
                n.append(t.cssExpandTreeIconLMinus);
                break;
            case 8:
                n.append(t.cssExpandTreeIconT);
                break;
            case 9:
                n.append(t.cssExpandTreeIconTPlus);
                break;
            case 10:
                n.append(t.cssExpandTreeIconTMinus);
                break;
            default:
                n.append(t.cssExpandTreeIconBlank)
        }
    } else o ? n.append(t.cssExpandTreeIconBlank) : this.isLastSibling() ? n.append(t.cssExpandTreeIconL) : n.append(t.cssExpandTreeIconT);
    return n.toString()
}, goog.ui.tree.BaseNode.prototype.getLineStyle = function() {
    var e = this.getExpanded() && this.hasChildren();
    return goog.html.SafeStyle.create({
        "background-position": this.getBackgroundPosition(),
        display: e ? null : "none"
    })
}, goog.ui.tree.BaseNode.prototype.getBackgroundPosition = function() {
    return (this.isLastSibling() ? "-100" : (this.getDepth() - 1) * this.config_.indentWidth) + "px 0"
}, goog.ui.tree.BaseNode.prototype.getElement = function() {
    var e = goog.ui.tree.BaseNode.superClass_.getElement.call(this);
    return e || (e = this.getDomHelper().getElement(this.getId()), this.setElementInternal(e)), e
}, goog.ui.tree.BaseNode.prototype.getRowElement = function() {
    var e = this.getElement();
    return e ? e.firstChild : null
}, goog.ui.tree.BaseNode.prototype.getExpandIconElement = function() {
    var e = this.getRowElement();
    return e ? e.firstChild : null
}, goog.ui.tree.BaseNode.prototype.getIconElement = function() {
    var e = this.getRowElement();
    return e ? e.childNodes[1] : null
}, goog.ui.tree.BaseNode.prototype.getLabelElement = function() {
    var e = this.getRowElement();
    return e && e.lastChild ? e.lastChild.previousSibling : null
}, goog.ui.tree.BaseNode.prototype.getAfterLabelElement = function() {
    var e = this.getRowElement();
    return e ? e.lastChild : null
}, goog.ui.tree.BaseNode.prototype.getChildrenElement = function() {
    var e = this.getElement();
    return e ? e.lastChild : null
}, goog.ui.tree.BaseNode.prototype.setIconClass = function(e) {
    this.iconClass_ = e, this.isInDocument() && this.updateIcon_()
}, goog.ui.tree.BaseNode.prototype.getIconClass = function() {
    return this.iconClass_
}, goog.ui.tree.BaseNode.prototype.setExpandedIconClass = function(e) {
    this.expandedIconClass_ = e, this.isInDocument() && this.updateIcon_()
}, goog.ui.tree.BaseNode.prototype.getExpandedIconClass = function() {
    return this.expandedIconClass_
}, goog.ui.tree.BaseNode.prototype.setText = function(e) {
    this.setSafeHtml(goog.html.SafeHtml.htmlEscape(e))
}, goog.ui.tree.BaseNode.prototype.getText = function() {
    return goog.string.unescapeEntities(goog.html.SafeHtml.unwrap(this.html_))
}, goog.ui.tree.BaseNode.prototype.setSafeHtml = function(e) {
    this.html_ = e;
    var o = this.getLabelElement();
    o && goog.dom.safe.setInnerHtml(o, e), (e = this.getTree()) && e.setNode(this)
}, goog.ui.tree.BaseNode.prototype.getHtml = function() {
    return goog.html.SafeHtml.unwrap(this.getSafeHtml())
}, goog.ui.tree.BaseNode.prototype.getSafeHtml = function() {
    return this.html_
}, goog.ui.tree.BaseNode.prototype.setToolTip = function(e) {
    this.toolTip_ = e;
    var o = this.getLabelElement();
    o && (o.title = e)
}, goog.ui.tree.BaseNode.prototype.getToolTip = function() {
    return this.toolTip_
}, goog.ui.tree.BaseNode.prototype.updateRow = function() {
    var e = this.getRowElement();
    e && (e.className = this.getRowClassName())
}, goog.ui.tree.BaseNode.prototype.updateExpandIcon = function() {
    var e = this.getExpandIconElement();
    e && (e.className = this.getExpandIconClass()), (e = this.getChildrenElement()) && (e.style.backgroundPosition = this.getBackgroundPosition())
}, goog.ui.tree.BaseNode.prototype.updateIcon_ = function() {
    this.getIconElement().className = this.getCalculatedIconClass()
}, goog.ui.tree.BaseNode.prototype.onMouseDown = function(e) {
    "expand" == e.target.getAttribute("type") && this.hasChildren() ? this.isUserCollapsible_ && this.toggle() : (this.select(), this.updateRow())
}, goog.ui.tree.BaseNode.prototype.onClick_ = goog.events.Event.preventDefault, goog.ui.tree.BaseNode.prototype.onDoubleClick_ = function(e) {
    "expand" == e.target.getAttribute("type") && this.hasChildren() || this.isUserCollapsible_ && this.toggle()
}, goog.ui.tree.BaseNode.prototype.onKeyDown = function(e) {
    var o = !0;
    switch (e.keyCode) {
        case goog.events.KeyCodes.RIGHT:
            if (e.altKey) break;
            this.hasChildren() && (this.getExpanded() ? this.getFirstChild().select() : this.setExpanded(!0));
            break;
        case goog.events.KeyCodes.LEFT:
            if (e.altKey) break;
            if (this.hasChildren() && this.getExpanded() && this.isUserCollapsible_) this.setExpanded(!1);
            else {
                var t = this.getParent(),
                    n = this.getTree();
                t && (n.getShowRootNode() || t != n) && t.select()
            }
            break;
        case goog.events.KeyCodes.DOWN:
            (n = this.getNextShownNode()) && n.select();
            break;
        case goog.events.KeyCodes.UP:
            (n = this.getPreviousShownNode()) && n.select();
            break;
        default:
            o = !1
    }
    return o && (e.preventDefault(), (n = this.getTree()) && n.clearTypeAhead()), o
}, goog.ui.tree.BaseNode.prototype.getLastShownDescendant = function() {
    return this.getExpanded() && this.hasChildren() ? this.getLastChild().getLastShownDescendant() : this
}, goog.ui.tree.BaseNode.prototype.getNextShownNode = function() {
    if (this.hasChildren() && this.getExpanded()) return this.getFirstChild();
    for (var e, o = this; o != this.getTree();) {
        if (null != (e = o.getNextSibling())) return e;
        o = o.getParent()
    }
    return null
}, goog.ui.tree.BaseNode.prototype.getPreviousShownNode = function() {
    if (null != (e = this.getPreviousSibling())) return e.getLastShownDescendant();
    var e = this.getParent(),
        o = this.getTree();
    return !o.getShowRootNode() && e == o || this == o ? null : e
}, goog.ui.tree.BaseNode.prototype.getClientData = goog.ui.tree.BaseNode.prototype.getModel, goog.ui.tree.BaseNode.prototype.setClientData = goog.ui.tree.BaseNode.prototype.setModel, goog.ui.tree.BaseNode.prototype.getConfig = function() {
    return this.config_
}, goog.ui.tree.BaseNode.prototype.setTreeInternal = function(e) {
    this.tree != e && (this.tree = e, e.setNode(this), this.forEachChild(function(o) {
        o.setTreeInternal(e)
    }))
}, goog.ui.tree.BaseNode.defaultConfig = {
    indentWidth: 19,
    cssRoot: "goog-tree-root goog-tree-item",
    cssHideRoot: "goog-tree-hide-root",
    cssItem: "goog-tree-item",
    cssChildren: "goog-tree-children",
    cssChildrenNoLines: "goog-tree-children-nolines",
    cssTreeRow: "goog-tree-row",
    cssItemLabel: "goog-tree-item-label",
    cssTreeIcon: "goog-tree-icon",
    cssExpandTreeIcon: "goog-tree-expand-icon",
    cssExpandTreeIconPlus: "goog-tree-expand-icon-plus",
    cssExpandTreeIconMinus: "goog-tree-expand-icon-minus",
    cssExpandTreeIconTPlus: "goog-tree-expand-icon-tplus",
    cssExpandTreeIconTMinus: "goog-tree-expand-icon-tminus",
    cssExpandTreeIconLPlus: "goog-tree-expand-icon-lplus",
    cssExpandTreeIconLMinus: "goog-tree-expand-icon-lminus",
    cssExpandTreeIconT: "goog-tree-expand-icon-t",
    cssExpandTreeIconL: "goog-tree-expand-icon-l",
    cssExpandTreeIconBlank: "goog-tree-expand-icon-blank",
    cssExpandedFolderIcon: "goog-tree-expanded-folder-icon",
    cssCollapsedFolderIcon: "goog-tree-collapsed-folder-icon",
    cssFileIcon: "goog-tree-file-icon",
    cssExpandedRootIcon: "goog-tree-expanded-folder-icon",
    cssCollapsedRootIcon: "goog-tree-collapsed-folder-icon",
    cssSelectedRow: "selected"
}, goog.ui.tree.TreeNode = function(e, o, t) {
    goog.ui.tree.BaseNode.call(this, e, o, t)
}, goog.inherits(goog.ui.tree.TreeNode, goog.ui.tree.BaseNode), goog.ui.tree.TreeNode.prototype.getTree = function() {
    if (this.tree) return this.tree;
    var e = this.getParent();
    return e && (e = e.getTree()) ? (this.setTreeInternal(e), e) : null
}, goog.ui.tree.TreeNode.prototype.getCalculatedIconClass = function() {
    var e = this.getExpanded(),
        o = this.getExpandedIconClass();
    if (e && o) return o;
    if (o = this.getIconClass(), !e && o) return o;
    if (o = this.getConfig(), this.hasChildren()) {
        if (e && o.cssExpandedFolderIcon) return o.cssTreeIcon + " " + o.cssExpandedFolderIcon;
        if (!e && o.cssCollapsedFolderIcon) return o.cssTreeIcon + " " + o.cssCollapsedFolderIcon
    } else if (o.cssFileIcon) return o.cssTreeIcon + " " + o.cssFileIcon;
    return ""
}, goog.structs.Trie = function(e) {
    this.value_ = void 0, this.childNodes_ = {}, e && this.setAll(e)
}, goog.structs.Trie.prototype.set = function(e, o) {
    this.setOrAdd_(e, o, !1)
}, goog.structs.Trie.prototype.add = function(e, o) {
    this.setOrAdd_(e, o, !0)
}, goog.structs.Trie.prototype.setOrAdd_ = function(e, o, t) {
    for (var n = this, r = 0; r < e.length; r++) {
        var i = e.charAt(r);
        n.childNodes_[i] || (n.childNodes_[i] = new goog.structs.Trie), n = n.childNodes_[i]
    }
    if (t && void 0 !== n.value_) throw Error('The collection already contains the key "' + e + '"');
    n.value_ = o
}, goog.structs.Trie.prototype.setAll = function(e) {
    var o = goog.structs.getKeys(e);
    e = goog.structs.getValues(e);
    for (var t = 0; t < o.length; t++) this.set(o[t], e[t])
}, goog.structs.Trie.prototype.getChildNode_ = function(e) {
    for (var o = this, t = 0; t < e.length; t++) {
        var n = e.charAt(t);
        if (!(o = o.childNodes_[n])) return
    }
    return o
}, goog.structs.Trie.prototype.get = function(e) {
    return (e = this.getChildNode_(e)) ? e.value_ : void 0
}, goog.structs.Trie.prototype.getKeyAndPrefixes = function(e, o) {
    var t = this,
        n = {},
        r = o || 0;
    for (void 0 !== t.value_ && (n[r] = t.value_); r < e.length; r++) {
        var i = e.charAt(r);
        if (!(i in t.childNodes_)) break;
        void 0 !== (t = t.childNodes_[i]).value_ && (n[r] = t.value_)
    }
    return n
}, goog.structs.Trie.prototype.getValues = function() {
    var e = [];
    return this.getValuesInternal_(e), e
}, goog.structs.Trie.prototype.getValuesInternal_ = function(e) {
    void 0 !== this.value_ && e.push(this.value_);
    for (var o in this.childNodes_) this.childNodes_[o].getValuesInternal_(e)
}, goog.structs.Trie.prototype.getKeys = function(e) {
    var o = [];
    if (e) {
        for (var t = this, n = 0; n < e.length; n++) {
            var r = e.charAt(n);
            if (!t.childNodes_[r]) return [];
            t = t.childNodes_[r]
        }
        t.getKeysInternal_(e, o)
    } else this.getKeysInternal_("", o);
    return o
}, goog.structs.Trie.prototype.getKeysInternal_ = function(e, o) {
    void 0 !== this.value_ && o.push(e);
    for (var t in this.childNodes_) this.childNodes_[t].getKeysInternal_(e + t, o)
}, goog.structs.Trie.prototype.containsKey = function(e) {
    return void 0 !== this.get(e)
}, goog.structs.Trie.prototype.containsPrefix = function(e) {
    return 0 == e.length ? !this.isEmpty() : !!this.getChildNode_(e)
}, goog.structs.Trie.prototype.containsValue = function(e) {
    if (this.value_ === e) return !0;
    for (var o in this.childNodes_)
        if (this.childNodes_[o].containsValue(e)) return !0;
    return !1
}, goog.structs.Trie.prototype.clear = function() {
    this.childNodes_ = {}, this.value_ = void 0
}, goog.structs.Trie.prototype.remove = function(e) {
    for (var o, t = this, n = [], r = 0; r < e.length; r++) {
        if (o = e.charAt(r), !t.childNodes_[o]) throw Error('The collection does not have the key "' + e + '"');
        n.push([t, o]), t = t.childNodes_[o]
    }
    for (e = t.value_, delete t.value_; 0 < n.length && (o = n.pop(), t = o[0], o = o[1], t.childNodes_[o].isEmpty());) delete t.childNodes_[o];
    return e
}, goog.structs.Trie.prototype.clone = function() {
    return new goog.structs.Trie(this)
}, goog.structs.Trie.prototype.getCount = function() {
    return goog.structs.getCount(this.getValues())
}, goog.structs.Trie.prototype.isEmpty = function() {
    return void 0 === this.value_ && goog.object.isEmpty(this.childNodes_)
}, goog.ui.tree.TypeAhead = function() {
    this.nodeMap_ = new goog.structs.Trie, this.buffer_ = "", this.matchingNodes_ = this.matchingLabels_ = null, this.matchingNodeIndex_ = this.matchingLabelIndex_ = 0
}, goog.ui.tree.TypeAhead.Offset = {
    DOWN: 1,
    UP: -1
}, goog.ui.tree.TypeAhead.prototype.handleNavigation = function(e) {
    var o = !1;
    switch (e.keyCode) {
        case goog.events.KeyCodes.DOWN:
        case goog.events.KeyCodes.UP:
            e.ctrlKey && (this.jumpTo_(e.keyCode == goog.events.KeyCodes.DOWN ? goog.ui.tree.TypeAhead.Offset.DOWN : goog.ui.tree.TypeAhead.Offset.UP), o = !0);
            break;
        case goog.events.KeyCodes.BACKSPACE:
            o = !0, 0 < (e = this.buffer_.length - 1) ? (this.buffer_ = this.buffer_.substring(0, e), this.jumpToLabel_(this.buffer_)) : 0 == e ? this.buffer_ = "" : o = !1;
            break;
        case goog.events.KeyCodes.ESC:
            this.buffer_ = "", o = !0
    }
    return o
}, goog.ui.tree.TypeAhead.prototype.handleTypeAheadChar = function(e) {
    var o = !1;
    return e.ctrlKey || e.altKey || (e = String.fromCharCode(e.charCode || e.keyCode).toLowerCase(), goog.string.isUnicodeChar(e) && (" " != e || this.buffer_) && (this.buffer_ += e, o = this.jumpToLabel_(this.buffer_))), o
}, goog.ui.tree.TypeAhead.prototype.setNodeInMap = function(e) {
    if ((o = e.getText()) && !goog.string.isEmptyOrWhitespace(goog.string.makeSafe(o))) {
        var o = o.toLowerCase(),
            t = this.nodeMap_.get(o);
        t ? t.push(e) : this.nodeMap_.set(o, [e])
    }
}, goog.ui.tree.TypeAhead.prototype.removeNodeFromMap = function(e) {
    if ((o = e.getText()) && !goog.string.isEmptyOrWhitespace(goog.string.makeSafe(o))) {
        var o = o.toLowerCase(),
            t = this.nodeMap_.get(o);
        if (t) {
            for (var n = e.getChildCount(), r = 0; r < n; r++) this.removeNodeFromMap(e.getChildAt(r));
            goog.array.remove(t, e), t.length || this.nodeMap_.remove(o)
        }
    }
}, goog.ui.tree.TypeAhead.prototype.jumpToLabel_ = function(e) {
    var o = !1;
    return (e = this.nodeMap_.getKeys(e)) && e.length && (this.matchingLabelIndex_ = this.matchingNodeIndex_ = 0, o = this.nodeMap_.get(e[0]), o = this.selectMatchingNode_(o)) && (this.matchingLabels_ = e), o
}, goog.ui.tree.TypeAhead.prototype.jumpTo_ = function(e) {
    var o = !1,
        t = this.matchingLabels_;
    if (t) {
        var o = null,
            n = !1;
        if (this.matchingNodes_) {
            var r = this.matchingNodeIndex_ + e;
            0 <= r && r < this.matchingNodes_.length ? (this.matchingNodeIndex_ = r, o = this.matchingNodes_) : n = !0
        }
        o || (0 <= (r = this.matchingLabelIndex_ + e) && r < t.length && (this.matchingLabelIndex_ = r), t.length > this.matchingLabelIndex_ && (o = this.nodeMap_.get(t[this.matchingLabelIndex_])), o && o.length && n && (this.matchingNodeIndex_ = e == goog.ui.tree.TypeAhead.Offset.UP ? o.length - 1 : 0)), (o = this.selectMatchingNode_(o)) && (this.matchingLabels_ = t)
    }
    return o
}, goog.ui.tree.TypeAhead.prototype.selectMatchingNode_ = function(e) {
    if (e) {
        if (this.matchingNodeIndex_ < e.length) {
            var o = e[this.matchingNodeIndex_];
            this.matchingNodes_ = e
        }
        o && (o.reveal(), o.select())
    }
    return !!o
}, goog.ui.tree.TypeAhead.prototype.clear = function() {
    this.buffer_ = ""
}, goog.ui.tree.TreeControl = function(e, o, t) {
    if (goog.ui.tree.BaseNode.call(this, e, o, t), this.setExpandedInternal(!0), this.setSelectedInternal(!0), this.selectedItem_ = this, this.typeAhead_ = new goog.ui.tree.TypeAhead, this.focusHandler_ = this.keyHandler_ = null, this.logger_ = goog.log.getLogger("this"), this.focused_ = !1, this.focusedNode_ = null, this.showRootLines_ = this.showRootNode_ = this.showExpandIcons_ = this.showLines_ = !0, goog.userAgent.IE) try {
        document.execCommand("BackgroundImageCache", !1, !0)
    } catch (e) {
        goog.log.warning(this.logger_, "Failed to enable background image cache")
    }
}, goog.inherits(goog.ui.tree.TreeControl, goog.ui.tree.BaseNode), goog.ui.tree.TreeControl.prototype.getTree = function() {
    return this
}, goog.ui.tree.TreeControl.prototype.getDepth = function() {
    return 0
}, goog.ui.tree.TreeControl.prototype.reveal = function() {}, goog.ui.tree.TreeControl.prototype.handleFocus_ = function(e) {
    this.focused_ = !0, goog.dom.classlist.add(goog.asserts.assert(this.getElement()), "focused"), this.selectedItem_ && this.selectedItem_.select()
}, goog.ui.tree.TreeControl.prototype.handleBlur_ = function(e) {
    this.focused_ = !1, goog.dom.classlist.remove(goog.asserts.assert(this.getElement()), "focused")
}, goog.ui.tree.TreeControl.prototype.hasFocus = function() {
    return this.focused_
}, goog.ui.tree.TreeControl.prototype.getExpanded = function() {
    return !this.showRootNode_ || goog.ui.tree.TreeControl.superClass_.getExpanded.call(this)
}, goog.ui.tree.TreeControl.prototype.setExpanded = function(e) {
    this.showRootNode_ ? goog.ui.tree.TreeControl.superClass_.setExpanded.call(this, e) : this.setExpandedInternal(e)
}, goog.ui.tree.TreeControl.prototype.getExpandIconSafeHtml = function() {
    return goog.html.SafeHtml.EMPTY
}, goog.ui.tree.TreeControl.prototype.getIconElement = function() {
    var e = this.getRowElement();
    return e ? e.firstChild : null
}, goog.ui.tree.TreeControl.prototype.getExpandIconElement = function() {
    return null
}, goog.ui.tree.TreeControl.prototype.updateExpandIcon = function() {}, goog.ui.tree.TreeControl.prototype.getRowClassName = function() {
    return goog.ui.tree.TreeControl.superClass_.getRowClassName.call(this) + (this.showRootNode_ ? "" : " " + this.getConfig().cssHideRoot)
}, goog.ui.tree.TreeControl.prototype.getCalculatedIconClass = function() {
    var e = this.getExpanded(),
        o = this.getExpandedIconClass();
    return e && o ? o : (o = this.getIconClass(), !e && o ? o : (o = this.getConfig(), e && o.cssExpandedRootIcon ? o.cssTreeIcon + " " + o.cssExpandedRootIcon : !e && o.cssCollapsedRootIcon ? o.cssTreeIcon + " " + o.cssCollapsedRootIcon : ""))
}, goog.ui.tree.TreeControl.prototype.setSelectedItem = function(e) {
    if (this.selectedItem_ != e) {
        var o = !1;
        this.selectedItem_ && (o = this.selectedItem_ == this.focusedNode_, this.selectedItem_.setSelectedInternal(!1)), (this.selectedItem_ = e) && (e.setSelectedInternal(!0), o && e.select()), this.dispatchEvent(goog.events.EventType.CHANGE)
    }
}, goog.ui.tree.TreeControl.prototype.getSelectedItem = function() {
    return this.selectedItem_
}, goog.ui.tree.TreeControl.prototype.setShowLines = function(e) {
    this.showLines_ != e && (this.showLines_ = e, this.isInDocument() && this.updateLinesAndExpandIcons_())
}, goog.ui.tree.TreeControl.prototype.getShowLines = function() {
    return this.showLines_
}, goog.ui.tree.TreeControl.prototype.updateLinesAndExpandIcons_ = function() {
    function e(r) {
        var i = r.getChildrenElement();
        if (i) {
            var s = !t || o == r.getParent() && !n ? r.getConfig().cssChildrenNoLines : r.getConfig().cssChildren;
            i.className = s, (i = r.getExpandIconElement()) && (i.className = r.getExpandIconClass())
        }
        r.forEachChild(e)
    }
    var o = this,
        t = o.getShowLines(),
        n = o.getShowRootLines();
    e(this)
}, goog.ui.tree.TreeControl.prototype.setShowRootLines = function(e) {
    this.showRootLines_ != e && (this.showRootLines_ = e, this.isInDocument() && this.updateLinesAndExpandIcons_())
}, goog.ui.tree.TreeControl.prototype.getShowRootLines = function() {
    return this.showRootLines_
}, goog.ui.tree.TreeControl.prototype.setShowExpandIcons = function(e) {
    this.showExpandIcons_ != e && (this.showExpandIcons_ = e, this.isInDocument() && this.updateLinesAndExpandIcons_())
}, goog.ui.tree.TreeControl.prototype.getShowExpandIcons = function() {
    return this.showExpandIcons_
}, goog.ui.tree.TreeControl.prototype.setShowRootNode = function(e) {
    if (this.showRootNode_ != e) {
        if (this.showRootNode_ = e, this.isInDocument()) {
            var o = this.getRowElement();
            o && (o.className = this.getRowClassName())
        }!e && this.getSelectedItem() == this && this.getFirstChild() && this.setSelectedItem(this.getFirstChild())
    }
}, goog.ui.tree.TreeControl.prototype.getShowRootNode = function() {
    return this.showRootNode_
}, goog.ui.tree.TreeControl.prototype.initAccessibility = function() {
    goog.ui.tree.TreeControl.superClass_.initAccessibility.call(this);
    var e = this.getElement();
    goog.asserts.assert(e, "The DOM element for the tree cannot be null."), goog.a11y.aria.setRole(e, "tree"), goog.a11y.aria.setState(e, "labelledby", this.getLabelElement().id)
}, goog.ui.tree.TreeControl.prototype.enterDocument = function() {
    goog.ui.tree.TreeControl.superClass_.enterDocument.call(this);
    var e = this.getElement();
    e.className = this.getConfig().cssRoot, e.setAttribute("hideFocus", "true"), this.attachEvents_(), this.initAccessibility()
}, goog.ui.tree.TreeControl.prototype.exitDocument = function() {
    goog.ui.tree.TreeControl.superClass_.exitDocument.call(this), this.detachEvents_()
}, goog.ui.tree.TreeControl.prototype.attachEvents_ = function() {
    var e = this.getElement();
    e.tabIndex = 0;
    var o = this.keyHandler_ = new goog.events.KeyHandler(e),
        t = this.focusHandler_ = new goog.events.FocusHandler(e);
    this.getHandler().listen(t, goog.events.FocusHandler.EventType.FOCUSOUT, this.handleBlur_).listen(t, goog.events.FocusHandler.EventType.FOCUSIN, this.handleFocus_).listen(o, goog.events.KeyHandler.EventType.KEY, this.handleKeyEvent).listen(e, goog.events.EventType.MOUSEDOWN, this.handleMouseEvent_).listen(e, goog.events.EventType.CLICK, this.handleMouseEvent_).listen(e, goog.events.EventType.DBLCLICK, this.handleMouseEvent_)
}, goog.ui.tree.TreeControl.prototype.detachEvents_ = function() {
    this.keyHandler_.dispose(), this.keyHandler_ = null, this.focusHandler_.dispose(), this.focusHandler_ = null
}, goog.ui.tree.TreeControl.prototype.handleMouseEvent_ = function(e) {
    goog.log.fine(this.logger_, "Received event " + e.type);
    var o = this.getNodeFromEvent_(e);
    if (o) switch (e.type) {
        case goog.events.EventType.MOUSEDOWN:
            o.onMouseDown(e);
            break;
        case goog.events.EventType.CLICK:
            o.onClick_(e);
            break;
        case goog.events.EventType.DBLCLICK:
            o.onDoubleClick_(e)
    }
}, goog.ui.tree.TreeControl.prototype.handleKeyEvent = function(e) {
    var o;
    return (o = this.typeAhead_.handleNavigation(e) || this.selectedItem_ && this.selectedItem_.onKeyDown(e) || this.typeAhead_.handleTypeAheadChar(e)) && e.preventDefault(), o
}, goog.ui.tree.TreeControl.prototype.getNodeFromEvent_ = function(e) {
    for (var o = e.target; null != o;) {
        if (e = goog.ui.tree.BaseNode.allNodes[o.id]) return e;
        if (o == this.getElement()) break;
        o = o.parentNode
    }
    return null
}, goog.ui.tree.TreeControl.prototype.createNode = function(e) {
    return new goog.ui.tree.TreeNode(e || goog.html.SafeHtml.EMPTY, this.getConfig(), this.getDomHelper())
}, goog.ui.tree.TreeControl.prototype.setNode = function(e) {
    this.typeAhead_.setNodeInMap(e)
}, goog.ui.tree.TreeControl.prototype.removeNode = function(e) {
    this.typeAhead_.removeNodeFromMap(e)
}, goog.ui.tree.TreeControl.prototype.clearTypeAhead = function() {
    this.typeAhead_.clear()
}, goog.ui.tree.TreeControl.defaultConfig = goog.ui.tree.BaseNode.defaultConfig;
var Blockly = {};
Blockly.Blocks = Object(null), Blockly.Touch = {}, Blockly.Touch.touchIdentifier_ = null, Blockly.Touch.onTouchUpWrapper_ = null, Blockly.Touch.TOUCH_MAP = {}, goog.events.BrowserFeature.TOUCH_ENABLED && (Blockly.Touch.TOUCH_MAP = {
    mousedown: ["touchstart"],
    mousemove: ["touchmove"],
    mouseup: ["touchend", "touchcancel"]
}), Blockly.longPid_ = 0, Blockly.longStart_ = function(e, o) {
    Blockly.longStop_(), 1 == e.changedTouches.length && (Blockly.longPid_ = setTimeout(function() {
        e.button = 2, e.clientX = e.changedTouches[0].clientX, e.clientY = e.changedTouches[0].clientY, o.onMouseDown_(e)
    }, Blockly.LONGPRESS))
}, Blockly.longStop_ = function() {
    Blockly.longPid_ && (clearTimeout(Blockly.longPid_), Blockly.longPid_ = 0)
}, Blockly.onMouseUp_ = function(e) {
    (e = Blockly.getMainWorkspace()).dragMode_ != Blockly.DRAG_NONE && (Blockly.Touch.clearTouchIdentifier(), e.resetDragSurface(), e.dragMode_ = Blockly.DRAG_NONE, Blockly.Touch.onTouchUpWrapper_ && (Blockly.unbindEvent_(Blockly.Touch.onTouchUpWrapper_), Blockly.Touch.onTouchUpWrapper_ = null), Blockly.onMouseMoveWrapper_ && (Blockly.unbindEvent_(Blockly.onMouseMoveWrapper_), Blockly.onMouseMoveWrapper_ = null))
}, Blockly.onMouseMove_ = function(e) {
    var o = Blockly.getMainWorkspace();
    if (o.dragMode_ != Blockly.DRAG_NONE) {
        var t = e.clientX - o.startDragMouseX,
            n = e.clientY - o.startDragMouseY,
            r = o.startDragMetrics,
            i = o.startScrollX + t,
            s = o.startScrollY + n,
            i = Math.min(i, -r.contentLeft),
            s = Math.min(s, -r.contentTop),
            i = Math.max(i, r.viewWidth - r.contentLeft - r.contentWidth),
            s = Math.max(s, r.viewHeight - r.contentTop - r.contentHeight);
        o.scrollbar.set(-i - r.contentLeft, -s - r.contentTop), Math.sqrt(t * t + n * n) > Blockly.DRAG_RADIUS && (Blockly.longStop_(), o.dragMode_ = Blockly.DRAG_FREE), e.stopPropagation(), e.preventDefault()
    }
}, Blockly.Touch.clearTouchIdentifier = function() {
    Blockly.Touch.touchIdentifier_ = null
}, Blockly.Touch.shouldHandleEvent = function(e) {
    return !Blockly.Touch.isMouseOrTouchEvent(e) || Blockly.Touch.checkTouchIdentifier(e)
}, Blockly.Touch.getTouchIdentifierFromEvent = function(e) {
    return e.changedTouches && e.changedTouches[0] && void 0 != e.changedTouches[0].identifier && null != e.changedTouches[0].identifier ? e.changedTouches[0].identifier : "mouse"
}, Blockly.Touch.checkTouchIdentifier = function(e) {
    var o = Blockly.Touch.getTouchIdentifierFromEvent(e);
    return void 0 != Blockly.Touch.touchIdentifier_ && null != Blockly.Touch.touchIdentifier_ ? Blockly.Touch.touchIdentifier_ == o : ("mousedown" == e.type || "touchstart" == e.type) && (Blockly.Touch.touchIdentifier_ = o, !0)
}, Blockly.Touch.setClientFromTouch = function(e) {
    if (goog.string.startsWith(e.type, "touch")) {
        var o = e.changedTouches[0];
        e.clientX = o.clientX, e.clientY = o.clientY
    }
}, Blockly.Touch.isMouseOrTouchEvent = function(e) {
    return goog.string.startsWith(e.type, "touch") || goog.string.startsWith(e.type, "mouse")
}, Blockly.Touch.splitEventByTouches = function(e) {
    var o = [];
    if (e.changedTouches)
        for (var t = 0; t < e.changedTouches.length; t++) o[t] = {
            type: e.type,
            changedTouches: [e.changedTouches[t]],
            target: e.target,
            stopPropagation: function() {
                e.stopPropagation()
            },
            preventDefault: function() {
                e.preventDefault()
            }
        };
    else o.push(e);
    return o
}, Blockly.Workspace = function(e) {
    this.id = Blockly.utils.genUid(), Blockly.Workspace.WorkspaceDB_[this.id] = this, this.options = e || {}, this.RTL = !!this.options.RTL, this.horizontalLayout = !!this.options.horizontalLayout, this.toolboxPosition = this.options.toolboxPosition, this.topBlocks_ = [], this.listeners_ = [], this.undoStack_ = [], this.redoStack_ = [], this.blockDB_ = Object.create(null), this.variableList = []
}, Blockly.Workspace.prototype.rendered = !1, Blockly.Workspace.prototype.MAX_UNDO = 1024, Blockly.Workspace.prototype.dispose = function() {
    this.listeners_.length = 0, this.clear(), delete Blockly.Workspace.WorkspaceDB_[this.id]
}, Blockly.Workspace.SCAN_ANGLE = 3, Blockly.Workspace.prototype.addTopBlock = function(e) {
    if (this.topBlocks_.push(e), this.isFlyout) {
        e = Blockly.Variables.allUsedVariables(e);
        for (var o = 0; o < e.length; o++) - 1 == this.variableList.indexOf(e[o]) && this.variableList.push(e[o])
    }
}, Blockly.Workspace.prototype.removeTopBlock = function(e) {
    if (!goog.array.remove(this.topBlocks_, e)) throw "Block not present in workspace's list of top-most blocks."
}, Blockly.Workspace.prototype.getTopBlocks = function(e) {
    var o = [].concat(this.topBlocks_);
    if (e && 1 < o.length) {
        var t = Math.sin(goog.math.toRadians(Blockly.Workspace.SCAN_ANGLE));
        this.RTL && (t *= -1), o.sort(function(e, o) {
            var n = e.getRelativeToSurfaceXY(),
                r = o.getRelativeToSurfaceXY();
            return n.y + t * n.x - (r.y + t * r.x)
        })
    }
    return o
}, Blockly.Workspace.prototype.getAllBlocks = function() {
    for (var e = this.getTopBlocks(!1), o = 0; o < e.length; o++) e.push.apply(e, e[o].getChildren());
    return e
}, Blockly.Workspace.prototype.clear = function() {
    var e = Blockly.Events.getGroup();
    for (e || Blockly.Events.setGroup(!0); this.topBlocks_.length;) this.topBlocks_[0].dispose();
    e || Blockly.Events.setGroup(!1), this.variableList.length = 0
}, Blockly.Workspace.prototype.updateVariableList = function(e) {
    if (!this.isFlyout) {
        e && (this.variableList.length = 0), e = Blockly.Variables.allUsedVariables(this);
        for (var o = 0; o < e.length; o++) this.createVariable(e[o])
    }
}, Blockly.Workspace.prototype.renameVariable = function(e, o) {
    var t, n = this.variableIndexOf(e),
        r = this.variableIndexOf(o); - 1 != r && this.variableList[r] != o && (t = this.variableList[r]), Blockly.Events.setGroup(!0);
    for (var i = this.getAllBlocks(), s = 0; s < i.length; s++) i[s].renameVar(e, o), t && i[s].renameVar(t, o);
    Blockly.Events.setGroup(!1), n == r || -1 != n && -1 == r ? this.variableList[n] = o : -1 != n && -1 != r ? (this.variableList[r] = o, this.variableList.splice(n, 1)) : (this.variableList.push(o), console.log("Tried to rename an non-existent variable."))
}, Blockly.Workspace.prototype.createVariable = function(e) {
    -1 == this.variableIndexOf(e) && this.variableList.push(e)
}, Blockly.Workspace.prototype.getVariableUses = function(e) {
    for (var o = [], t = this.getAllBlocks(), n = 0; n < t.length; n++) {
        var r = t[n].getVars();
        if (r)
            for (var i = 0; i < r.length; i++) {
                var s = r[i];
                s && Blockly.Names.equals(s, e) && o.push(t[n])
            }
    }
    return o
}, Blockly.Workspace.prototype.deleteVariable = function(e) {
    if (-1 != this.variableIndexOf(e)) {
        for (var o, t = this.getVariableUses(e), n = 0; o = t[n]; n++)
            if ("procedures_defnoreturn" == o.type || "procedures_defreturn" == o.type) return t = o.getFieldValue("NAME"), void Blockly.alert(Blockly.Msg.CANNOT_DELETE_VARIABLE_PROCEDURE.replace("%1", e).replace("%2", t));
        var r = this;
        1 < t.length ? Blockly.confirm(Blockly.Msg.DELETE_VARIABLE_CONFIRMATION.replace("%1", t.length).replace("%2", e), function(o) {
            o && r.deleteVariableInternal_(e)
        }) : this.deleteVariableInternal_(e)
    }
}, Blockly.Workspace.prototype.deleteVariableInternal_ = function(e) {
    var o = this.getVariableUses(e);
    e = this.variableIndexOf(e), Blockly.Events.setGroup(!0);
    for (var t = 0; t < o.length; t++) o[t].dispose(!0, !1);
    Blockly.Events.setGroup(!1), this.variableList.splice(e, 1)
}, Blockly.Workspace.prototype.variableIndexOf = function(e) {
    for (var o, t = 0; o = this.variableList[t]; t++)
        if (Blockly.Names.equals(o, e)) return t;
    return -1
}, Blockly.Workspace.prototype.getWidth = function() {
    return 0
}, Blockly.Workspace.prototype.newBlock = function(e, o) {
    return new Blockly.Block(this, e, o)
}, Blockly.Workspace.prototype.remainingCapacity = function() {
    return isNaN(this.options.maxBlocks) ? 1 / 0 : this.options.maxBlocks - this.getAllBlocks().length
}, Blockly.Workspace.prototype.undo = function(e) {
    var o = e ? this.redoStack_ : this.undoStack_,
        t = e ? this.undoStack_ : this.redoStack_,
        n = o.pop();
    if (n) {
        for (var r = [n]; o.length && n.group && n.group == o[o.length - 1].group;) r.push(o.pop());
        for (o = 0; n = r[o]; o++) t.push(n);
        for (r = Blockly.Events.filter(r, e), Blockly.Events.recordUndo = !1, o = 0; n = r[o]; o++) n.run(e);
        Blockly.Events.recordUndo = !0
    }
}, Blockly.Workspace.prototype.clearUndo = function() {
    this.undoStack_.length = 0, this.redoStack_.length = 0, Blockly.Events.clearPendingUndo()
}, Blockly.Workspace.prototype.addChangeListener = function(e) {
    return this.listeners_.push(e), e
}, Blockly.Workspace.prototype.removeChangeListener = function(e) {
    goog.array.remove(this.listeners_, e)
}, Blockly.Workspace.prototype.fireChangeListener = function(e) {
    e.recordUndo && (this.undoStack_.push(e), this.redoStack_.length = 0, this.undoStack_.length > this.MAX_UNDO && this.undoStack_.unshift());
    for (var o, t = 0; o = this.listeners_[t]; t++) o(e)
}, Blockly.Workspace.prototype.getBlockById = function(e) {
    return this.blockDB_[e] || null
}, Blockly.Workspace.prototype.allInputsFilled = function(e) {
    for (var o, t = this.getTopBlocks(!1), n = 0; o = t[n]; n++)
        if (!o.allInputsFilled(e)) return !1;
    return !0
}, Blockly.Workspace.WorkspaceDB_ = Object.create(null), Blockly.Workspace.getById = function(e) {
    return Blockly.Workspace.WorkspaceDB_[e] || null
}, Blockly.Workspace.prototype.clear = Blockly.Workspace.prototype.clear, Blockly.Workspace.prototype.clearUndo = Blockly.Workspace.prototype.clearUndo, Blockly.Workspace.prototype.addChangeListener = Blockly.Workspace.prototype.addChangeListener, Blockly.Workspace.prototype.removeChangeListener = Blockly.Workspace.prototype.removeChangeListener, Blockly.Bubble = function(e, o, t, n, r, i) {
    this.workspace_ = e, this.content_ = o, this.shape_ = t, t = Blockly.Bubble.ARROW_ANGLE, this.workspace_.RTL && (t = -t), this.arrow_radians_ = goog.math.toRadians(t), e.getBubbleCanvas().appendChild(this.createDom_(o, !(!r || !i))), this.setAnchorLocation(n), r && i || (o = this.content_.getBBox(), r = o.width + 2 * Blockly.Bubble.BORDER_WIDTH, i = o.height + 2 * Blockly.Bubble.BORDER_WIDTH), this.setBubbleSize(r, i), this.positionBubble_(), this.renderArrow_(), this.rendered_ = !0, e.options.readOnly || (Blockly.bindEventWithChecks_(this.bubbleBack_, "mousedown", this, this.bubbleMouseDown_), this.resizeGroup_ && Blockly.bindEventWithChecks_(this.resizeGroup_, "mousedown", this, this.resizeMouseDown_))
}, Blockly.Bubble.BORDER_WIDTH = 6, Blockly.Bubble.ARROW_THICKNESS = 5, Blockly.Bubble.ARROW_ANGLE = 20, Blockly.Bubble.ARROW_BEND = 4, Blockly.Bubble.ANCHOR_RADIUS = 8, Blockly.Bubble.onMouseUpWrapper_ = null, Blockly.Bubble.onMouseMoveWrapper_ = null, Blockly.Bubble.prototype.resizeCallback_ = null, Blockly.Bubble.unbindDragEvents_ = function() {
    Blockly.Bubble.onMouseUpWrapper_ && (Blockly.unbindEvent_(Blockly.Bubble.onMouseUpWrapper_), Blockly.Bubble.onMouseUpWrapper_ = null), Blockly.Bubble.onMouseMoveWrapper_ && (Blockly.unbindEvent_(Blockly.Bubble.onMouseMoveWrapper_), Blockly.Bubble.onMouseMoveWrapper_ = null)
}, Blockly.Bubble.bubbleMouseUp_ = function() {
    Blockly.Touch.clearTouchIdentifier(), Blockly.Bubble.unbindDragEvents_()
}, Blockly.Bubble.prototype.rendered_ = !1, Blockly.Bubble.prototype.anchorXY_ = null, Blockly.Bubble.prototype.relativeLeft_ = 0, Blockly.Bubble.prototype.relativeTop_ = 0, Blockly.Bubble.prototype.width_ = 0, Blockly.Bubble.prototype.height_ = 0, Blockly.Bubble.prototype.autoLayout_ = !0, Blockly.Bubble.prototype.createDom_ = function(e, o) {
    this.bubbleGroup_ = Blockly.utils.createSvgElement("g", {}, null);
    var t = {
        filter: "url(#" + this.workspace_.options.embossFilterId + ")"
    };
    return -1 != goog.userAgent.getUserAgentString().indexOf("JavaFX") && (t = {}), t = Blockly.utils.createSvgElement("g", t, this.bubbleGroup_), this.bubbleArrow_ = Blockly.utils.createSvgElement("path", {}, t), this.bubbleBack_ = Blockly.utils.createSvgElement("rect", {
        class: "blocklyDraggable",
        x: 0,
        y: 0,
        rx: Blockly.Bubble.BORDER_WIDTH,
        ry: Blockly.Bubble.BORDER_WIDTH
    }, t), o ? (this.resizeGroup_ = Blockly.utils.createSvgElement("g", {
        class: this.workspace_.RTL ? "blocklyResizeSW" : "blocklyResizeSE"
    }, this.bubbleGroup_), t = 2 * Blockly.Bubble.BORDER_WIDTH, Blockly.utils.createSvgElement("polygon", {
        points: "0,x x,x x,0".replace(/x/g, t.toString())
    }, this.resizeGroup_), Blockly.utils.createSvgElement("line", {
        class: "blocklyResizeLine",
        x1: t / 3,
        y1: t - 1,
        x2: t - 1,
        y2: t / 3
    }, this.resizeGroup_), Blockly.utils.createSvgElement("line", {
        class: "blocklyResizeLine",
        x1: 2 * t / 3,
        y1: t - 1,
        x2: t - 1,
        y2: 2 * t / 3
    }, this.resizeGroup_)) : this.resizeGroup_ = null, this.bubbleGroup_.appendChild(e), this.bubbleGroup_
}, Blockly.Bubble.prototype.bubbleMouseDown_ = function(e) {
    this.promote_(), Blockly.Bubble.unbindDragEvents_(), Blockly.utils.isRightButton(e) ? e.stopPropagation() : Blockly.utils.isTargetInput(e) || (this.workspace_.startDrag(e, new goog.math.Coordinate(this.workspace_.RTL ? -this.relativeLeft_ : this.relativeLeft_, this.relativeTop_)), Blockly.Bubble.onMouseUpWrapper_ = Blockly.bindEventWithChecks_(document, "mouseup", this, Blockly.Bubble.bubbleMouseUp_), Blockly.Bubble.onMouseMoveWrapper_ = Blockly.bindEventWithChecks_(document, "mousemove", this, this.bubbleMouseMove_), Blockly.hideChaff(), e.stopPropagation())
}, Blockly.Bubble.prototype.bubbleMouseMove_ = function(e) {
    this.autoLayout_ = !1, e = this.workspace_.moveDrag(e), this.relativeLeft_ = this.workspace_.RTL ? -e.x : e.x, this.relativeTop_ = e.y, this.positionBubble_(), this.renderArrow_()
}, Blockly.Bubble.prototype.resizeMouseDown_ = function(e) {
    this.promote_(), Blockly.Bubble.unbindDragEvents_(), Blockly.utils.isRightButton(e) || (this.workspace_.startDrag(e, new goog.math.Coordinate(this.workspace_.RTL ? -this.width_ : this.width_, this.height_)), Blockly.Bubble.onMouseUpWrapper_ = Blockly.bindEventWithChecks_(document, "mouseup", this, Blockly.Bubble.bubbleMouseUp_), Blockly.Bubble.onMouseMoveWrapper_ = Blockly.bindEventWithChecks_(document, "mousemove", this, this.resizeMouseMove_), Blockly.hideChaff()), e.stopPropagation()
}, Blockly.Bubble.prototype.resizeMouseMove_ = function(e) {
    this.autoLayout_ = !1, e = this.workspace_.moveDrag(e), this.setBubbleSize(this.workspace_.RTL ? -e.x : e.x, e.y), this.workspace_.RTL && this.positionBubble_()
}, Blockly.Bubble.prototype.registerResizeEvent = function(e) {
    this.resizeCallback_ = e
}, Blockly.Bubble.prototype.promote_ = function() {
    this.bubbleGroup_.parentNode.appendChild(this.bubbleGroup_)
}, Blockly.Bubble.prototype.setAnchorLocation = function(e) {
    this.anchorXY_ = e, this.rendered_ && this.positionBubble_()
}, Blockly.Bubble.prototype.layoutBubble_ = function() {
    var e = -this.width_ / 4,
        o = -this.height_ - Blockly.BlockSvg.MIN_BLOCK_Y,
        t = this.workspace_.getMetrics();
    t.viewWidth /= this.workspace_.scale, t.viewLeft /= this.workspace_.scale;
    var n = this.anchorXY_.x;
    this.workspace_.RTL ? n - t.viewLeft - e - this.width_ < Blockly.Scrollbar.scrollbarThickness ? e = n - t.viewLeft - this.width_ - Blockly.Scrollbar.scrollbarThickness : n - t.viewLeft - e > t.viewWidth && (e = n - t.viewLeft - t.viewWidth) : n + e < t.viewLeft ? e = t.viewLeft - n : t.viewLeft + t.viewWidth < n + e + this.width_ + Blockly.BlockSvg.SEP_SPACE_X + Blockly.Scrollbar.scrollbarThickness && (e = t.viewLeft + t.viewWidth - n - this.width_ - Blockly.Scrollbar.scrollbarThickness), this.anchorXY_.y + o < t.viewTop && (o = this.shape_.getBBox().height), this.relativeLeft_ = e, this.relativeTop_ = o
}, Blockly.Bubble.prototype.positionBubble_ = function() {
    var e = this.anchorXY_.x,
        e = this.workspace_.RTL ? e - (this.relativeLeft_ + this.width_) : e + this.relativeLeft_;
    this.bubbleGroup_.setAttribute("transform", "translate(" + e + "," + (this.relativeTop_ + this.anchorXY_.y) + ")")
}, Blockly.Bubble.prototype.getBubbleSize = function() {
    return {
        width: this.width_,
        height: this.height_
    }
}, Blockly.Bubble.prototype.setBubbleSize = function(e, o) {
    var t = 2 * Blockly.Bubble.BORDER_WIDTH;
    e = Math.max(e, t + 45), o = Math.max(o, t + 20), this.width_ = e, this.height_ = o, this.bubbleBack_.setAttribute("width", e), this.bubbleBack_.setAttribute("height", o), this.resizeGroup_ && (this.workspace_.RTL ? this.resizeGroup_.setAttribute("transform", "translate(" + 2 * Blockly.Bubble.BORDER_WIDTH + "," + (o - t) + ") scale(-1 1)") : this.resizeGroup_.setAttribute("transform", "translate(" + (e - t) + "," + (o - t) + ")")), this.rendered_ && (this.autoLayout_ && this.layoutBubble_(), this.positionBubble_(), this.renderArrow_()), this.resizeCallback_ && this.resizeCallback_()
}, Blockly.Bubble.prototype.renderArrow_ = function() {
    var e = [],
        o = this.width_ / 2,
        t = this.height_ / 2,
        n = -this.relativeLeft_,
        r = -this.relativeTop_;
    if (o == n && t == r) e.push("M " + o + "," + t);
    else {
        r -= t, n -= o, this.workspace_.RTL && (n *= -1);
        var i = Math.sqrt(r * r + n * n),
            s = Math.acos(n / i);
        0 > r && (s = 2 * Math.PI - s), (a = s + Math.PI / 2) > 2 * Math.PI && (a -= 2 * Math.PI);
        var l = Math.sin(a),
            g = Math.cos(a),
            a = ((c = this.getBubbleSize()).width + c.height) / Blockly.Bubble.ARROW_THICKNESS,
            a = Math.min(a, c.width, c.height) / 4,
            n = o + (c = 1 - Blockly.Bubble.ANCHOR_RADIUS / i) * n,
            r = t + c * r,
            c = o + a * g,
            u = t + a * l,
            o = o - a * g,
            t = t - a * l;
        (l = s + this.arrow_radians_) > 2 * Math.PI && (l -= 2 * Math.PI), s = Math.sin(l) * i / Blockly.Bubble.ARROW_BEND, i = Math.cos(l) * i / Blockly.Bubble.ARROW_BEND, e.push("M" + c + "," + u), e.push("C" + (c + i) + "," + (u + s) + " " + n + "," + r + " " + n + "," + r), e.push("C" + n + "," + r + " " + (o + i) + "," + (t + s) + " " + o + "," + t)
    }
    e.push("z"), this.bubbleArrow_.setAttribute("d", e.join(" "))
}, Blockly.Bubble.prototype.setColour = function(e) {
    this.bubbleBack_.setAttribute("fill", e), this.bubbleArrow_.setAttribute("fill", e)
}, Blockly.Bubble.prototype.dispose = function() {
    Blockly.Bubble.unbindDragEvents_(), goog.dom.removeNode(this.bubbleGroup_), this.shape_ = this.content_ = this.workspace_ = this.resizeGroup_ = this.bubbleBack_ = this.bubbleArrow_ = this.bubbleGroup_ = null
}, Blockly.Icon = function(e) {
    this.block_ = e
}, Blockly.Icon.prototype.collapseHidden = !0, Blockly.Icon.prototype.SIZE = 17, Blockly.Icon.prototype.bubble_ = null, Blockly.Icon.prototype.iconXY_ = null, Blockly.Icon.prototype.createIcon = function() {
    this.iconGroup_ || (this.iconGroup_ = Blockly.utils.createSvgElement("g", {
        class: "blocklyIconGroup"
    }, null), this.block_.isInFlyout && Blockly.utils.addClass(this.iconGroup_, "blocklyIconGroupReadonly"), this.drawIcon_(this.iconGroup_), this.block_.getSvgRoot().appendChild(this.iconGroup_), Blockly.bindEventWithChecks_(this.iconGroup_, "mouseup", this, this.iconClick_), this.updateEditable())
}, Blockly.Icon.prototype.dispose = function() {
    goog.dom.removeNode(this.iconGroup_), this.iconGroup_ = null, this.setVisible(!1), this.block_ = null
}, Blockly.Icon.prototype.updateEditable = function() {}, Blockly.Icon.prototype.isVisible = function() {
    return !!this.bubble_
}, Blockly.Icon.prototype.iconClick_ = function(e) {
    this.block_.workspace.isDragging() || this.block_.isInFlyout || Blockly.utils.isRightButton(e) || this.setVisible(!this.isVisible())
}, Blockly.Icon.prototype.updateColour = function() {
    this.isVisible() && this.bubble_.setColour(this.block_.getColour())
}, Blockly.Icon.prototype.renderIcon = function(e) {
    if (this.collapseHidden && this.block_.isCollapsed()) return this.iconGroup_.setAttribute("display", "none"), e;
    this.iconGroup_.setAttribute("display", "block");
    var o = this.SIZE;
    return this.block_.RTL && (e -= o), this.iconGroup_.setAttribute("transform", "translate(" + e + ",5)"), this.computeIconLocation(), e = this.block_.RTL ? e - Blockly.BlockSvg.SEP_SPACE_X : e + (o + Blockly.BlockSvg.SEP_SPACE_X)
}, Blockly.Icon.prototype.setIconLocation = function(e) {
    this.iconXY_ = e, this.isVisible() && this.bubble_.setAnchorLocation(e)
}, Blockly.Icon.prototype.computeIconLocation = function() {
    var e = this.block_.getRelativeToSurfaceXY(),
        o = Blockly.utils.getRelativeXY(this.iconGroup_),
        e = new goog.math.Coordinate(e.x + o.x + this.SIZE / 2, e.y + o.y + this.SIZE / 2);
    goog.math.Coordinate.equals(this.getIconLocation(), e) || this.setIconLocation(e)
}, Blockly.Icon.prototype.getIconLocation = function() {
    return this.iconXY_
}, Blockly.Comment = function(e) {
    Blockly.Comment.superClass_.constructor.call(this, e), this.createIcon()
}, goog.inherits(Blockly.Comment, Blockly.Icon), Blockly.Comment.prototype.text_ = "", Blockly.Comment.prototype.width_ = 160, Blockly.Comment.prototype.height_ = 80, Blockly.Comment.prototype.drawIcon_ = function(e) {
    Blockly.utils.createSvgElement("circle", {
        class: "blocklyIconShape",
        r: "8",
        cx: "8",
        cy: "8"
    }, e), Blockly.utils.createSvgElement("path", {
        class: "blocklyIconSymbol",
        d: "m6.8,10h2c0.003,-0.617 0.271,-0.962 0.633,-1.266 2.875,-2.405 0.607,-5.534 -3.765,-3.874v1.7c3.12,-1.657 3.698,0.118 2.336,1.25 -1.201,0.998 -1.201,1.528 -1.204,2.19z"
    }, e), Blockly.utils.createSvgElement("rect", {
        class: "blocklyIconSymbol",
        x: "6.8",
        y: "10.78",
        height: "2",
        width: "2"
    }, e)
}, Blockly.Comment.prototype.createEditor_ = function() {
    this.foreignObject_ = Blockly.utils.createSvgElement("foreignObject", {
        x: Blockly.Bubble.BORDER_WIDTH,
        y: Blockly.Bubble.BORDER_WIDTH
    }, null);
    var e = document.createElementNS(Blockly.HTML_NS, "body");
    e.setAttribute("xmlns", Blockly.HTML_NS), e.className = "blocklyMinimalBody";
    var o = document.createElementNS(Blockly.HTML_NS, "textarea");
    return o.className = "blocklyCommentTextarea", o.setAttribute("dir", this.block_.RTL ? "RTL" : "LTR"), e.appendChild(o), this.textarea_ = o, this.foreignObject_.appendChild(e), Blockly.bindEventWithChecks_(o, "mouseup", this, this.textareaFocus_), Blockly.bindEventWithChecks_(o, "wheel", this, function(e) {
        e.stopPropagation()
    }), Blockly.bindEventWithChecks_(o, "change", this, function(e) {
        this.text_ != o.value && (Blockly.Events.fire(new Blockly.Events.Change(this.block_, "comment", null, this.text_, o.value)), this.text_ = o.value)
    }), setTimeout(function() {
        o.focus()
    }, 0), this.foreignObject_
}, Blockly.Comment.prototype.updateEditable = function() {
    this.isVisible() && (this.setVisible(!1), this.setVisible(!0)), Blockly.Icon.prototype.updateEditable.call(this)
}, Blockly.Comment.prototype.resizeBubble_ = function() {
    if (this.isVisible()) {
        var e = this.bubble_.getBubbleSize(),
            o = 2 * Blockly.Bubble.BORDER_WIDTH;
        this.foreignObject_.setAttribute("width", e.width - o), this.foreignObject_.setAttribute("height", e.height - o), this.textarea_.style.width = e.width - o - 4 + "px", this.textarea_.style.height = e.height - o - 4 + "px"
    }
}, Blockly.Comment.prototype.setVisible = function(e) {
    if (e != this.isVisible())
        if (Blockly.Events.fire(new Blockly.Events.Ui(this.block_, "commentOpen", !e, e)), !this.block_.isEditable() && !this.textarea_ || goog.userAgent.IE) Blockly.Warning.prototype.setVisible.call(this, e);
        else {
            var o = this.getText(),
                t = this.getBubbleSize();
            e ? (this.bubble_ = new Blockly.Bubble(this.block_.workspace, this.createEditor_(), this.block_.svgPath_, this.iconXY_, this.width_, this.height_), this.bubble_.registerResizeEvent(this.resizeBubble_.bind(this)), this.updateColour()) : (this.bubble_.dispose(), this.foreignObject_ = this.textarea_ = this.bubble_ = null), this.setText(o), this.setBubbleSize(t.width, t.height)
        }
}, Blockly.Comment.prototype.textareaFocus_ = function(e) {
    this.bubble_.promote_(), this.textarea_.focus()
}, Blockly.Comment.prototype.getBubbleSize = function() {
    return this.isVisible() ? this.bubble_.getBubbleSize() : {
        width: this.width_,
        height: this.height_
    }
}, Blockly.Comment.prototype.setBubbleSize = function(e, o) {
    this.textarea_ ? this.bubble_.setBubbleSize(e, o) : (this.width_ = e, this.height_ = o)
}, Blockly.Comment.prototype.getText = function() {
    return this.textarea_ ? this.textarea_.value : this.text_
}, Blockly.Comment.prototype.setText = function(e) {
    this.text_ != e && (Blockly.Events.fire(new Blockly.Events.Change(this.block_, "comment", null, this.text_, e)), this.text_ = e), this.textarea_ && (this.textarea_.value = e)
}, Blockly.Comment.prototype.dispose = function() {
    Blockly.Events.isEnabled() && this.setText(""), this.block_.comment = null, Blockly.Icon.prototype.dispose.call(this)
}, Blockly.Connection = function(e, o) {
    this.sourceBlock_ = e, this.type = o, e.workspace.connectionDBList && (this.db_ = e.workspace.connectionDBList[o], this.dbOpposite_ = e.workspace.connectionDBList[Blockly.OPPOSITE_TYPE[o]], this.hidden_ = !this.db_)
}, Blockly.Connection.CAN_CONNECT = 0, Blockly.Connection.REASON_SELF_CONNECTION = 1, Blockly.Connection.REASON_WRONG_TYPE = 2, Blockly.Connection.REASON_TARGET_NULL = 3, Blockly.Connection.REASON_CHECKS_FAILED = 4, Blockly.Connection.REASON_DIFFERENT_WORKSPACES = 5, Blockly.Connection.REASON_SHADOW_PARENT = 6, Blockly.Connection.prototype.targetConnection = null, Blockly.Connection.prototype.check_ = null, Blockly.Connection.prototype.shadowDom_ = null, Blockly.Connection.prototype.x_ = 0, Blockly.Connection.prototype.y_ = 0, Blockly.Connection.prototype.inDB_ = !1, Blockly.Connection.prototype.db_ = null, Blockly.Connection.prototype.dbOpposite_ = null, Blockly.Connection.prototype.hidden_ = null, Blockly.Connection.prototype.connect_ = function(e) {
    var o = this,
        t = o.getSourceBlock(),
        n = e.getSourceBlock();
    if (e.isConnected() && e.disconnect(), o.isConnected()) {
        var r = o.targetBlock(),
            i = o.getShadowDom();
        if (o.setShadowDom(null), r.isShadow()) i = Blockly.Xml.blockToDom(r), r.dispose(), r = null;
        else if (o.type == Blockly.INPUT_VALUE) {
            if (!r.outputConnection) throw "Orphan block does not have an output connection.";
            var s = Blockly.Connection.lastConnectionInRow_(n, r);
            s && (r.outputConnection.connect(s), r = null)
        } else if (o.type == Blockly.NEXT_STATEMENT) {
            if (!r.previousConnection) throw "Orphan block does not have a previous connection.";
            for (s = n; s.nextConnection;) {
                var l = s.getNextBlock();
                if (!l || l.isShadow()) {
                    r.previousConnection.checkType_(s.nextConnection) && (s.nextConnection.connect(r.previousConnection), r = null);
                    break
                }
                s = l
            }
        }
        if (r && (o.disconnect(), Blockly.Events.recordUndo)) {
            var g = Blockly.Events.getGroup();
            setTimeout(function() {
                r.workspace && !r.getParent() && (Blockly.Events.setGroup(g), r.outputConnection ? r.outputConnection.bumpAwayFrom_(o) : r.previousConnection && r.previousConnection.bumpAwayFrom_(o), Blockly.Events.setGroup(!1))
            }, Blockly.BUMP_DELAY)
        }
        o.setShadowDom(i)
    }
    var a;
    Blockly.Events.isEnabled() && (a = new Blockly.Events.Move(n)), Blockly.Connection.connectReciprocally_(o, e), n.setParent(t), a && (a.recordNew(), Blockly.Events.fire(a))
}, Blockly.Connection.prototype.dispose = function() {
    if (this.isConnected()) throw "Disconnect connection before disposing of it.";
    this.inDB_ && this.db_.removeConnection_(this), Blockly.highlightedConnection_ == this && (Blockly.highlightedConnection_ = null), Blockly.localConnection_ == this && (Blockly.localConnection_ = null), this.dbOpposite_ = this.db_ = null
}, Blockly.Connection.prototype.getSourceBlock = function() {
    return this.sourceBlock_
}, Blockly.Connection.prototype.isSuperior = function() {
    return this.type == Blockly.INPUT_VALUE || this.type == Blockly.NEXT_STATEMENT
}, Blockly.Connection.prototype.isConnected = function() {
    return !!this.targetConnection
}, Blockly.Connection.prototype.canConnectWithReason_ = function(e) {
    if (!e) return Blockly.Connection.REASON_TARGET_NULL;
    if (this.isSuperior()) var o = this.sourceBlock_,
        t = e.getSourceBlock();
    else t = this.sourceBlock_, o = e.getSourceBlock();
    return o && o == t ? Blockly.Connection.REASON_SELF_CONNECTION : e.type != Blockly.OPPOSITE_TYPE[this.type] ? Blockly.Connection.REASON_WRONG_TYPE : o && t && o.workspace !== t.workspace ? Blockly.Connection.REASON_DIFFERENT_WORKSPACES : this.checkType_(e) ? o.isShadow() && !t.isShadow() ? Blockly.Connection.REASON_SHADOW_PARENT : Blockly.Connection.CAN_CONNECT : Blockly.Connection.REASON_CHECKS_FAILED
}, Blockly.Connection.prototype.checkConnection_ = function(e) {
    switch (this.canConnectWithReason_(e)) {
        case Blockly.Connection.CAN_CONNECT:
            break;
        case Blockly.Connection.REASON_SELF_CONNECTION:
            throw "Attempted to connect a block to itself.";
        case Blockly.Connection.REASON_DIFFERENT_WORKSPACES:
            throw "Blocks not on same workspace.";
        case Blockly.Connection.REASON_WRONG_TYPE:
            throw "Attempt to connect incompatible types.";
        case Blockly.Connection.REASON_TARGET_NULL:
            throw "Target connection is null.";
        case Blockly.Connection.REASON_CHECKS_FAILED:
            throw "Connection checks failed. " + this + " expected " + this.check_ + ", found " + e.check_;
        case Blockly.Connection.REASON_SHADOW_PARENT:
            throw "Connecting non-shadow to shadow block.";
        default:
            throw "Unknown connection failure: this should never happen!"
    }
}, Blockly.Connection.prototype.isConnectionAllowed = function(e) {
    return this.canConnectWithReason_(e) == Blockly.Connection.CAN_CONNECT && ((e.type != Blockly.OUTPUT_VALUE && e.type != Blockly.PREVIOUS_STATEMENT || !e.isConnected() && !this.isConnected()) && !(e.type == Blockly.INPUT_VALUE && e.isConnected() && !e.targetBlock().isMovable() && !e.targetBlock().isShadow() || this.type == Blockly.PREVIOUS_STATEMENT && e.isConnected() && !this.sourceBlock_.nextConnection && !e.targetBlock().isShadow() && e.targetBlock().nextConnection || -1 != Blockly.draggingConnections_.indexOf(e)))
}, Blockly.Connection.prototype.connect = function(e) {
    this.targetConnection != e && (this.checkConnection_(e), this.isSuperior() ? this.connect_(e) : e.connect_(this))
}, Blockly.Connection.connectReciprocally_ = function(e, o) {
    goog.asserts.assert(e && o, "Cannot connect null connections."), e.targetConnection = o, o.targetConnection = e
}, Blockly.Connection.singleConnection_ = function(e, o) {
    for (var t = !1, n = 0; n < e.inputList.length; n++) {
        var r = e.inputList[n].connection;
        if (r && r.type == Blockly.INPUT_VALUE && o.outputConnection.checkType_(r)) {
            if (t) return null;
            t = r
        }
    }
    return t
}, Blockly.Connection.lastConnectionInRow_ = function(e, o) {
    for (var t, n = e; t = Blockly.Connection.singleConnection_(n, o);)
        if (!(n = t.targetBlock()) || n.isShadow()) return t;
    return null
}, Blockly.Connection.prototype.disconnect = function() {
    var e = this.targetConnection;
    if (goog.asserts.assert(e, "Source connection not connected."), goog.asserts.assert(e.targetConnection == this, "Target connection not connected to source connection."), this.isSuperior()) {
        var o = this.sourceBlock_,
            t = e.getSourceBlock();
        e = this
    } else o = e.getSourceBlock(), t = this.sourceBlock_;
    this.disconnectInternal_(o, t), e.respawnShadow_()
}, Blockly.Connection.prototype.disconnectInternal_ = function(e, o) {
    var t;
    Blockly.Events.isEnabled() && (t = new Blockly.Events.Move(o)), this.targetConnection = this.targetConnection.targetConnection = null, o.setParent(null), t && (t.recordNew(), Blockly.Events.fire(t))
}, Blockly.Connection.prototype.respawnShadow_ = function() {
    var e = this.getSourceBlock(),
        o = this.getShadowDom();
    if (e.workspace && o && Blockly.Events.recordUndo)
        if ((e = Blockly.Xml.domToBlock(o, e.workspace)).outputConnection) this.connect(e.outputConnection);
        else {
            if (!e.previousConnection) throw "Child block does not have output or previous statement.";
            this.connect(e.previousConnection)
        }
}, Blockly.Connection.prototype.targetBlock = function() {
    return this.isConnected() ? this.targetConnection.getSourceBlock() : null
}, Blockly.Connection.prototype.checkType_ = function(e) {
    if (!this.check_ || !e.check_) return !0;
    for (var o = 0; o < this.check_.length; o++)
        if (-1 != e.check_.indexOf(this.check_[o])) return !0;
    return !1
}, Blockly.Connection.prototype.onCheckChanged_ = function() {
    this.isConnected() && !this.checkType_(this.targetConnection) && (this.isSuperior() ? this.targetBlock() : this.sourceBlock_).unplug()
}, Blockly.Connection.prototype.setCheck = function(e) {
    return e ? (goog.isArray(e) || (e = [e]), this.check_ = e, this.onCheckChanged_()) : this.check_ = null, this
}, Blockly.Connection.prototype.setShadowDom = function(e) {
    this.shadowDom_ = e
}, Blockly.Connection.prototype.getShadowDom = function() {
    return this.shadowDom_
}, Blockly.Connection.prototype.neighbours_ = function() {
    return []
}, Blockly.Connection.prototype.toString = function() {
    var e = this.sourceBlock_;
    if (!e) return "Orphan Connection";
    if (e.outputConnection == this) var o = "Output Connection of ";
    else if (e.previousConnection == this) o = "Previous Connection of ";
    else if (e.nextConnection == this) o = "Next Connection of ";
    else {
        if (!(o = goog.array.find(e.inputList, function(e) {
                return e.connection == this
            }, this))) return console.warn("Connection not actually connected to sourceBlock_"), "Orphan Connection";
        o = 'Input "' + o.name + '" connection on '
    }
    return o + e.toDevString()
}, Blockly.Extensions = {}, Blockly.Extensions.ALL_ = {}, Blockly.Extensions.MUTATOR_PROPERTIES_ = ["domToMutation", "mutationToDom", "compose", "decompose"], Blockly.Extensions.register = function(e, o) {
    if (!goog.isString(e) || goog.string.isEmptyOrWhitespace(e)) throw Error('Error: Invalid extension name "' + e + '"');
    if (Blockly.Extensions.ALL_[e]) throw Error('Error: Extension "' + e + '" is already registered.');
    if (!goog.isFunction(o)) throw Error('Error: Extension "' + e + '" must be a function');
    Blockly.Extensions.ALL_[e] = o
}, Blockly.Extensions.registerMixin = function(e, o) {
    Blockly.Extensions.register(e, function() {
        this.mixin(o)
    })
}, Blockly.Extensions.registerMutator = function(e, o, t, n) {
    var r = 'Error when registering mutator "' + e + '": ';
    Blockly.Extensions.checkHasFunction_(r, o, "domToMutation"), Blockly.Extensions.checkHasFunction_(r, o, "mutationToDom");
    var i = Blockly.Extensions.checkMutatorDialog_(o, r);
    if (t && !goog.isFunction(t)) throw Error('Extension "' + e + '" is not a function');
    Blockly.Extensions.register(e, function() {
        i && this.setMutator(new Blockly.Mutator(n)), this.mixin(o), t && t.apply(this)
    })
}, Blockly.Extensions.apply = function(e, o, t) {
    var n, r = Blockly.Extensions.ALL_[e];
    if (!goog.isFunction(r)) throw Error('Error: Extension "' + e + '" not found.');
    if (t ? Blockly.Extensions.checkNoMutatorProperties_(e, o) : n = Blockly.Extensions.getMutatorProperties_(o), r.apply(o), t) Blockly.Extensions.checkBlockHasMutatorProperties_(e, o, 'Error after applying mutator "' + e + '": ');
    else if (!Blockly.Extensions.mutatorPropertiesMatch_(n, o)) throw Error('Error when applying extension "' + e + '": mutation properties changed when applying a non-mutator extension.')
}, Blockly.Extensions.checkHasFunction_ = function(e, o, t) {
    if (!o.hasOwnProperty(t)) throw Error(e + 'missing required property "' + t + '"');
    if ("function" != typeof o[t]) throw Error(e + '" required property "' + t + '" must be a function')
}, Blockly.Extensions.checkNoMutatorProperties_ = function(e, o) {
    for (var t = 0; t < Blockly.Extensions.MUTATOR_PROPERTIES_.length; t++) {
        var n = Blockly.Extensions.MUTATOR_PROPERTIES_[t];
        if (o.hasOwnProperty(n)) throw Error('Error: tried to apply mutation "' + e + '" to a block that already has a "' + n + '" function.  Block id: ' + o.id)
    }
}, Blockly.Extensions.checkMutatorDialog_ = function(e, o) {
    var t = e.hasOwnProperty("compose"),
        n = e.hasOwnProperty("decompose");
    if (t && n) {
        if ("function" != typeof e.compose) throw Error(o + "compose must be a function.");
        if ("function" != typeof e.decompose) throw Error(o + "decompose must be a function.");
        return !0
    }
    if (t || n) throw Error(o + 'Must have both or neither of "compose" and "decompose"');
    return !1
}, Blockly.Extensions.checkBlockHasMutatorProperties_ = function(e, o) {
    if (!o.hasOwnProperty("domToMutation")) throw Error(e + 'Applying a mutator didn\'t add "domToMutation"');
    if (!o.hasOwnProperty("mutationToDom")) throw Error(e + 'Applying a mutator didn\'t add "mutationToDom"');
    Blockly.Extensions.checkMutatorDialog_(o, e)
}, Blockly.Extensions.getMutatorProperties_ = function(e) {
    for (var o = [], t = 0; t < Blockly.Extensions.MUTATOR_PROPERTIES_.length; t++) o.push(e[Blockly.Extensions.MUTATOR_PROPERTIES_[t]]);
    return o
}, Blockly.Extensions.mutatorPropertiesMatch_ = function(e, o) {
    var t = !0,
        n = Blockly.Extensions.getMutatorProperties_(o);
    if (n.length != e.length) t = !1;
    else
        for (var r = 0; r < n.length; r++) e[r] != n[r] && (t = !1);
    return t
}, Blockly.Extensions.buildTooltipForDropdown = function(e, o) {
    var t = [];
    return document && Blockly.utils.runAfterPageLoad(function() {
            for (var e in o) Blockly.utils.checkMessageReferences(o[e])
        }),
        function() {
            this.type && -1 === t.indexOf(this.type) && (Blockly.Extensions.checkDropdownOptionsInTable_(this, e, o), t.push(this.type)), this.setTooltip(function() {
                var n = this.getFieldValue(e),
                    r = o[n];
                return null == r ? -1 === t.indexOf(this.type) && (n = "No tooltip mapping for value " + n + " of field " + e, null != this.type && (n += " of block type " + this.type), console.warn(n + ".")) : r = Blockly.utils.replaceMessageReferences(r), r
            }.bind(this))
        }
}, Blockly.Extensions.checkDropdownOptionsInTable_ = function(e, o, t) {
    if (!(n = e.getField(o)).isOptionListDynamic())
        for (var n = n.getOptions(), r = 0; r < n.length; ++r) {
            var i = n[r][1];
            null == t[i] && console.warn("No tooltip mapping for value " + i + " of field " + o + " of block type " + e.type)
        }
}, Blockly.Extensions.buildTooltipWithFieldValue = function(e, o) {
    return document && Blockly.utils.runAfterPageLoad(function() {
            Blockly.utils.checkMessageReferences(e)
        }),
        function() {
            this.setTooltip(function() {
                return Blockly.utils.replaceMessageReferences(e).replace("%1", this.getFieldValue(o))
            }.bind(this))
        }
}, Blockly.Extensions.extensionParentTooltip_ = function() {
    this.tooltipWhenNotConnected_ = this.tooltip, this.setTooltip(function() {
        var e = this.getParent();
        return e && e.getInputsInline() && e.tooltip || this.tooltipWhenNotConnected_
    }.bind(this))
}, Blockly.Extensions.register("parent_tooltip_when_inline", Blockly.Extensions.extensionParentTooltip_), Blockly.Field = function(e, o) {
    this.size_ = new goog.math.Size(0, Blockly.BlockSvg.MIN_BLOCK_Y), this.setValue(e), this.setValidator(o)
}, Blockly.Field.cacheWidths_ = null, Blockly.Field.cacheReference_ = 0, Blockly.Field.prototype.name = void 0, Blockly.Field.prototype.maxDisplayLength = 50, Blockly.Field.prototype.text_ = "", Blockly.Field.prototype.sourceBlock_ = null, Blockly.Field.prototype.visible_ = !0, Blockly.Field.prototype.validator_ = null, Blockly.Field.NBSP = " ", Blockly.Field.prototype.EDITABLE = !0, Blockly.Field.prototype.setSourceBlock = function(e) {
    goog.asserts.assert(!this.sourceBlock_, "Field already bound to a block."), this.sourceBlock_ = e
}, Blockly.Field.prototype.init = function() {
    this.fieldGroup_ || (this.fieldGroup_ = Blockly.utils.createSvgElement("g", {}, null), this.visible_ || (this.fieldGroup_.style.display = "none"), this.borderRect_ = Blockly.utils.createSvgElement("rect", {
        rx: 4,
        ry: 4,
        x: -Blockly.BlockSvg.SEP_SPACE_X / 2,
        y: 0,
        height: 16
    }, this.fieldGroup_, this.sourceBlock_.workspace), this.textElement_ = Blockly.utils.createSvgElement("text", {
        class: "blocklyText",
        y: this.size_.height - 12.5
    }, this.fieldGroup_), this.updateEditable(), this.sourceBlock_.getSvgRoot().appendChild(this.fieldGroup_), this.mouseUpWrapper_ = Blockly.bindEventWithChecks_(this.fieldGroup_, "mouseup", this, this.onMouseUp_), this.render_())
}, Blockly.Field.prototype.initModel = function() {}, Blockly.Field.prototype.dispose = function() {
    this.mouseUpWrapper_ && (Blockly.unbindEvent_(this.mouseUpWrapper_), this.mouseUpWrapper_ = null), this.sourceBlock_ = null, goog.dom.removeNode(this.fieldGroup_), this.validator_ = this.borderRect_ = this.textElement_ = this.fieldGroup_ = null
}, Blockly.Field.prototype.updateEditable = function() {
    var e = this.fieldGroup_;
    this.EDITABLE && e && (this.sourceBlock_.isEditable() ? (Blockly.utils.addClass(e, "blocklyEditableText"), Blockly.utils.removeClass(e, "blocklyNonEditableText"), this.fieldGroup_.style.cursor = this.CURSOR) : (Blockly.utils.addClass(e, "blocklyNonEditableText"), Blockly.utils.removeClass(e, "blocklyEditableText"), this.fieldGroup_.style.cursor = ""))
}, Blockly.Field.prototype.isCurrentlyEditable = function() {
    return this.EDITABLE && !!this.sourceBlock_ && this.sourceBlock_.isEditable()
}, Blockly.Field.prototype.isVisible = function() {
    return this.visible_
}, Blockly.Field.prototype.setVisible = function(e) {
    if (this.visible_ != e) {
        this.visible_ = e;
        var o = this.getSvgRoot();
        o && (o.style.display = e ? "block" : "none", this.render_())
    }
}, Blockly.Field.prototype.setValidator = function(e) {
    this.validator_ = e
}, Blockly.Field.prototype.getValidator = function() {
    return this.validator_
}, Blockly.Field.prototype.classValidator = function(e) {
    return e
}, Blockly.Field.prototype.callValidator = function(e) {
    var o = this.classValidator(e);
    if (null === o) return null;
    if (void 0 !== o && (e = o), o = this.getValidator()) {
        if (null === (o = o.call(this, e))) return null;
        void 0 !== o && (e = o)
    }
    return e
}, Blockly.Field.prototype.getSvgRoot = function() {
    return this.fieldGroup_
}, Blockly.Field.prototype.render_ = function() {
    if (this.visible_) {
        goog.dom.removeChildren(this.textElement_);
        var e = document.createTextNode(this.getDisplayText_());
        this.textElement_.appendChild(e), this.updateWidth()
    } else this.size_.width = 0
}, Blockly.Field.prototype.updateWidth = function() {
    var e = Blockly.Field.getCachedWidth(this.textElement_);
    this.borderRect_ && this.borderRect_.setAttribute("width", e + Blockly.BlockSvg.SEP_SPACE_X), this.size_.width = e
}, Blockly.Field.getCachedWidth = function(e) {
    var o, t = e.textContent + "\n" + e.className.baseVal;
    if (Blockly.Field.cacheWidths_ && (o = Blockly.Field.cacheWidths_[t])) return o;
    try {
        o = e.getComputedTextLength()
    } catch (o) {
        return 8 * e.textContent.length
    }
    return Blockly.Field.cacheWidths_ && (Blockly.Field.cacheWidths_[t] = o), o
}, Blockly.Field.startCache = function() {
    Blockly.Field.cacheReference_++, Blockly.Field.cacheWidths_ || (Blockly.Field.cacheWidths_ = {})
}, Blockly.Field.stopCache = function() {
    --Blockly.Field.cacheReference_ || (Blockly.Field.cacheWidths_ = null)
}, Blockly.Field.prototype.getSize = function() {
    return this.size_.width || this.render_(), this.size_
}, Blockly.Field.prototype.getScaledBBox_ = function() {
    var e = this.borderRect_.getBBox();
    return new goog.math.Size(e.width * this.sourceBlock_.workspace.scale, e.height * this.sourceBlock_.workspace.scale)
}, Blockly.Field.prototype.getDisplayText_ = function() {
    var e = this.text_;
    return e ? (e.length > this.maxDisplayLength && (e = e.substring(0, this.maxDisplayLength - 2) + "…"), e = e.replace(/\s/g, Blockly.Field.NBSP), this.sourceBlock_.RTL && (e += "‏"), e) : Blockly.Field.NBSP
}, Blockly.Field.prototype.getText = function() {
    return this.text_
}, Blockly.Field.prototype.setText = function(e) {
    null !== e && (e = String(e)) !== this.text_ && (this.text_ = e, this.size_.width = 0, this.sourceBlock_ && this.sourceBlock_.rendered && (this.sourceBlock_.render(), this.sourceBlock_.bumpNeighbours_()))
}, Blockly.Field.prototype.getValue = function() {
    return this.getText()
}, Blockly.Field.prototype.setValue = function(e) {
    if (null !== e) {
        var o = this.getValue();
        o != e && (this.sourceBlock_ && Blockly.Events.isEnabled() && Blockly.Events.fire(new Blockly.Events.Change(this.sourceBlock_, "field", this.name, o, e)), this.setText(e))
    }
}, Blockly.Field.prototype.onMouseUp_ = function(e) {
    (!goog.userAgent.IPHONE && !goog.userAgent.IPAD || goog.userAgent.isVersionOrHigher("537.51.2") || 0 === e.layerX || 0 === e.layerY) && (Blockly.utils.isRightButton(e) || this.sourceBlock_.workspace.isDragging() || this.sourceBlock_.isEditable() && this.showEditor_())
}, Blockly.Field.prototype.setTooltip = function(e) {}, Blockly.Field.prototype.getAbsoluteXY_ = function() {
    return goog.style.getPageOffset(this.borderRect_)
}, 


Blockly.Field1 = function(e, o) {
    this.size_ = new goog.math.Size(0, Blockly.BlockSvg.MIN_BLOCK_Y), this.setValue(e), this.setValidator(o)
}, Blockly.Field1.cacheWidths_ = null, Blockly.Field1.cacheReference_ = 0, Blockly.Field1.prototype.name = void 0, Blockly.Field1.prototype.maxDisplayLength = 50, Blockly.Field1.prototype.text_ = "", Blockly.Field1.prototype.sourceBlock_ = null, Blockly.Field1.prototype.visible_ = !0, Blockly.Field1.prototype.validator_ = null, Blockly.Field1.NBSP = " ", Blockly.Field1.prototype.EDITABLE = !0, Blockly.Field1.prototype.setSourceBlock = function(e) {
    goog.asserts.assert(!this.sourceBlock_, "Field1 already bound to a block."), this.sourceBlock_ = e
}, Blockly.Field1.prototype.init = function() {
    this.fieldGroup_ || (this.fieldGroup_ = Blockly.utils.createSvgElement("g", {}, null), this.visible_ || (this.fieldGroup_.style.display = "none"), this.borderRect_ = Blockly.utils.createSvgElement("rect", {
        rx: 4,
        ry: 4,
        x: -Blockly.BlockSvg.SEP_SPACE_X / 2,
        y: 0,
        height: 16
    }, this.fieldGroup_, this.sourceBlock_.workspace), this.textElement_ = Blockly.utils.createSvgElement("text", {
        class: "blocklyText",
        y: this.size_.height - 12.5
    }, this.fieldGroup_), this.updateEditable(), this.sourceBlock_.getSvgRoot().appendChild(this.fieldGroup_), this.mouseUpWrapper_ = Blockly.bindEventWithChecks_(this.fieldGroup_, "mouseup", this, this.onMouseUp_), this.render_())
}, Blockly.Field1.prototype.initModel = function() {}, Blockly.Field1.prototype.dispose = function() {
    this.mouseUpWrapper_ && (Blockly.unbindEvent_(this.mouseUpWrapper_), this.mouseUpWrapper_ = null), this.sourceBlock_ = null, goog.dom.removeNode(this.fieldGroup_), this.validator_ = this.borderRect_ = this.textElement_ = this.fieldGroup_ = null
}, Blockly.Field1.prototype.updateEditable = function() {
    var e = this.fieldGroup_;
    this.EDITABLE && e && (this.sourceBlock_.isEditable() ? (Blockly.utils.addClass(e, "blocklyEditableText"), Blockly.utils.removeClass(e, "blocklyNonEditableText"), this.fieldGroup_.style.cursor = this.CURSOR) : (Blockly.utils.addClass(e, "blocklyNonEditableText"), Blockly.utils.removeClass(e, "blocklyEditableText"), this.fieldGroup_.style.cursor = ""))
}, Blockly.Field1.prototype.isCurrentlyEditable = function() {
    return this.EDITABLE && !!this.sourceBlock_ && this.sourceBlock_.isEditable()
}, Blockly.Field1.prototype.isVisible = function() {
    return this.visible_
}, Blockly.Field1.prototype.setVisible = function(e) {
    if (this.visible_ != e) {
        this.visible_ = e;
        var o = this.getSvgRoot();
        o && (o.style.display = e ? "block" : "none", this.render_())
    }
}, Blockly.Field1.prototype.setValidator = function(e) {
    this.validator_ = e
}, Blockly.Field1.prototype.getValidator = function() {
    return this.validator_
}, Blockly.Field1.prototype.classValidator = function(e) {
    return e
}, Blockly.Field1.prototype.callValidator = function(e) {
    var o = this.classValidator(e);
    if (null === o) return null;
    if (void 0 !== o && (e = o), o = this.getValidator()) {
        if (null === (o = o.call(this, e))) return null;
        void 0 !== o && (e = o)
    }
    return e
}, Blockly.Field1.prototype.getSvgRoot = function() {
    return this.fieldGroup_
}, Blockly.Field1.prototype.render_ = function() {
    if (this.visible_) {
        goog.dom.removeChildren(this.textElement_);
        var e = document.createTextNode(this.getDisplayText_());
        this.textElement_.appendChild(e), this.updateWidth()
    } else this.size_.width = 0
}, Blockly.Field1.prototype.updateWidth = function() {
    var e = Blockly.Field1.getCachedWidth(this.textElement_);
    this.borderRect_ && this.borderRect_.setAttribute("width", e + Blockly.BlockSvg.SEP_SPACE_X), this.size_.width = e
}, Blockly.Field1.getCachedWidth = function(e) {
    var o, t = e.textContent + "\n" + e.className.baseVal;
    if (Blockly.Field1.cacheWidths_ && (o = Blockly.Field1.cacheWidths_[t])) return o;
    try {
        o = e.getComputedTextLength()
    } catch (o) {
        return 8 * e.textContent.length
    }
    return Blockly.Field1.cacheWidths_ && (Blockly.Field1.cacheWidths_[t] = o), o
}, Blockly.Field1.startCache = function() {
    Blockly.Field1.cacheReference_++, Blockly.Field1.cacheWidths_ || (Blockly.Field1.cacheWidths_ = {})
}, Blockly.Field1.stopCache = function() {
    --Blockly.Field1.cacheReference_ || (Blockly.Field1.cacheWidths_ = null)
}, Blockly.Field1.prototype.getSize = function() {
    return this.size_.width || this.render_(), this.size_
}, Blockly.Field1.prototype.getScaledBBox_ = function() {
    var e = this.borderRect_.getBBox();
    return new goog.math.Size(e.width * this.sourceBlock_.workspace.scale, e.height * this.sourceBlock_.workspace.scale)
}, Blockly.Field1.prototype.getDisplayText_ = function() {
    var e = this.text_;
    return e ? (e.length > this.maxDisplayLength && (e = e.substring(0, this.maxDisplayLength - 2) + "…"), e = e.replace(/\s/g, Blockly.Field1.NBSP), this.sourceBlock_.RTL && (e += "‏"), e) : Blockly.Field1.NBSP
}, Blockly.Field1.prototype.getText = function() {
    return this.text_
}, Blockly.Field1.prototype.setText = function(e) {
    null !== e && (e = String(e)) !== this.text_ && (this.text_ = e, this.size_.width = 0, this.sourceBlock_ && this.sourceBlock_.rendered && (this.sourceBlock_.render(), this.sourceBlock_.bumpNeighbours_()))
}, Blockly.Field1.prototype.getValue = function() {
    return this.getText()
}, Blockly.Field1.prototype.setValue = function(e) {
    if (null !== e) {
        var o = this.getValue();
        o != e && (this.sourceBlock_ && Blockly.Events.isEnabled() && Blockly.Events.fire(new Blockly.Events.Change(this.sourceBlock_, "field", this.name, o, e)), this.setText(e))
    }
}, Blockly.Field1.prototype.onMouseUp_ = function(e) {
    (!goog.userAgent.IPHONE && !goog.userAgent.IPAD || goog.userAgent.isVersionOrHigher("537.51.2") || 0 === e.layerX || 0 === e.layerY) && (Blockly.utils.isRightButton(e) || this.sourceBlock_.workspace.isDragging() || this.sourceBlock_.isEditable() && this.showEditor_())
}, Blockly.Field1.prototype.setTooltip = function(e) {}, Blockly.Field1.prototype.getAbsoluteXY_ = function() {
    return goog.style.getPageOffset(this.borderRect_)
}, 



Blockly.Tooltip = {}, Blockly.Tooltip.visible = !1, Blockly.Tooltip.LIMIT = 50, Blockly.Tooltip.mouseOutPid_ = 0, Blockly.Tooltip.showPid_ = 0, Blockly.Tooltip.lastX_ = 0, Blockly.Tooltip.lastY_ = 0, Blockly.Tooltip.element_ = null, Blockly.Tooltip.poisonedElement_ = null, Blockly.Tooltip.OFFSET_X = 0, Blockly.Tooltip.OFFSET_Y = 10, Blockly.Tooltip.RADIUS_OK = 10, Blockly.Tooltip.HOVER_MS = 750, Blockly.Tooltip.MARGINS = 5, Blockly.Tooltip.DIV = null, Blockly.Tooltip.createDom = function() {
    Blockly.Tooltip.DIV || (Blockly.Tooltip.DIV = goog.dom.createDom("DIV", "blocklyTooltipDiv"), document.body.appendChild(Blockly.Tooltip.DIV))
}, Blockly.Tooltip.bindMouseEvents = function(e) {
    Blockly.bindEvent_(e, "mouseover", null, Blockly.Tooltip.onMouseOver_), Blockly.bindEvent_(e, "mouseout", null, Blockly.Tooltip.onMouseOut_), e.addEventListener("mousemove", Blockly.Tooltip.onMouseMove_, !1)
}, Blockly.Tooltip.onMouseOver_ = function(e) {
    for (e = e.target; !goog.isString(e.tooltip) && !goog.isFunction(e.tooltip);) e = e.tooltip;
    Blockly.Tooltip.element_ != e && (Blockly.Tooltip.hide(), Blockly.Tooltip.poisonedElement_ = null, Blockly.Tooltip.element_ = e), clearTimeout(Blockly.Tooltip.mouseOutPid_)
}, Blockly.Tooltip.onMouseOut_ = function(e) {
    Blockly.Tooltip.mouseOutPid_ = setTimeout(function() {
        Blockly.Tooltip.element_ = null, Blockly.Tooltip.poisonedElement_ = null, Blockly.Tooltip.hide()
    }, 1), clearTimeout(Blockly.Tooltip.showPid_)
}, Blockly.Tooltip.onMouseMove_ = function(e) {
    if (Blockly.Tooltip.element_ && Blockly.Tooltip.element_.tooltip && Blockly.dragMode_ == Blockly.DRAG_NONE && !Blockly.WidgetDiv.isVisible())
        if (Blockly.Tooltip.visible) {
            var o = Blockly.Tooltip.lastX_ - e.pageX;
            e = Blockly.Tooltip.lastY_ - e.pageY, Math.sqrt(o * o + e * e) > Blockly.Tooltip.RADIUS_OK && Blockly.Tooltip.hide()
        } else Blockly.Tooltip.poisonedElement_ != Blockly.Tooltip.element_ && (clearTimeout(Blockly.Tooltip.showPid_), Blockly.Tooltip.lastX_ = e.pageX, Blockly.Tooltip.lastY_ = e.pageY, Blockly.Tooltip.showPid_ = setTimeout(Blockly.Tooltip.show_, Blockly.Tooltip.HOVER_MS))
}, Blockly.Tooltip.hide = function() {
    Blockly.Tooltip.visible && (Blockly.Tooltip.visible = !1, Blockly.Tooltip.DIV && (Blockly.Tooltip.DIV.style.display = "none")), clearTimeout(Blockly.Tooltip.showPid_)
}, Blockly.Tooltip.show_ = function() {
    if (Blockly.Tooltip.poisonedElement_ = Blockly.Tooltip.element_, Blockly.Tooltip.DIV) {
        goog.dom.removeChildren(Blockly.Tooltip.DIV);
        for (e = Blockly.Tooltip.element_.tooltip; goog.isFunction(e);) e = e();
        for (var e = (e = Blockly.utils.wrap(e, Blockly.Tooltip.LIMIT)).split("\n"), o = 0; o < e.length; o++)(t = document.createElement("div")).appendChild(document.createTextNode(e[o])), Blockly.Tooltip.DIV.appendChild(t);
        e = Blockly.Tooltip.element_.RTL, o = goog.dom.getViewportSize(), Blockly.Tooltip.DIV.style.direction = e ? "rtl" : "ltr", Blockly.Tooltip.DIV.style.display = "block", Blockly.Tooltip.visible = !0;
        var t = Blockly.Tooltip.lastX_,
            t = e ? t - (Blockly.Tooltip.OFFSET_X + Blockly.Tooltip.DIV.offsetWidth) : t + Blockly.Tooltip.OFFSET_X,
            n = Blockly.Tooltip.lastY_ + Blockly.Tooltip.OFFSET_Y;
        n + Blockly.Tooltip.DIV.offsetHeight > o.height + window.scrollY && (n -= Blockly.Tooltip.DIV.offsetHeight + 2 * Blockly.Tooltip.OFFSET_Y), e ? t = Math.max(Blockly.Tooltip.MARGINS - window.scrollX, t) : t + Blockly.Tooltip.DIV.offsetWidth > o.width + window.scrollX - 2 * Blockly.Tooltip.MARGINS && (t = o.width - Blockly.Tooltip.DIV.offsetWidth - 2 * Blockly.Tooltip.MARGINS), Blockly.Tooltip.DIV.style.top = n + "px", Blockly.Tooltip.DIV.style.left = t + "px"
    }
}, Blockly.FieldLabel = function(e, o) {
    this.size_ = new goog.math.Size(0, 17.5), this.class_ = o, this.setValue(e)
}, goog.inherits(Blockly.FieldLabel, Blockly.Field), Blockly.FieldLabel.prototype.EDITABLE = !1, Blockly.FieldLabel.prototype.init = function() {
    this.textElement_ || (this.textElement_ = Blockly.utils.createSvgElement("text", {
        class: "blocklyText",
        y: this.size_.height - 5
    }, null), this.class_ && Blockly.utils.addClass(this.textElement_, this.class_), this.visible_ || (this.textElement_.style.display = "none"), this.sourceBlock_.getSvgRoot().appendChild(this.textElement_), this.textElement_.tooltip = this.sourceBlock_, Blockly.Tooltip.bindMouseEvents(this.textElement_), this.render_())
}, Blockly.FieldLabel.prototype.dispose = function() {
    goog.dom.removeNode(this.textElement_), this.textElement_ = null
}, Blockly.FieldLabel.prototype.getSvgRoot = function() {
    return this.textElement_
}, Blockly.FieldLabel.prototype.setTooltip = function(e) {
    this.textElement_.tooltip = e
}, Blockly.Input = function(e, o, t, n) {
    if (e != Blockly.DUMMY_INPUT && !o) throw "Value inputs and statement inputs must have non-empty name.";
    this.type = e, this.name = o, this.sourceBlock_ = t, this.connection = n, this.fieldRow = []
}, Blockly.Input.prototype.align = Blockly.ALIGN_LEFT, Blockly.Input.prototype.visible_ = !0, Blockly.Input.prototype.appendField = function(e, o) {
    return this.insertFieldAt(this.fieldRow.length, e, o), this
}, Blockly.Input.prototype.insertFieldAt = function(e, o, t) {
    if (0 > e || e > this.fieldRow.length) throw Error("index " + e + " out of bounds.");
    return o || t ? (goog.isString(o) && (o = new Blockly.FieldLabel(o)), o.setSourceBlock(this.sourceBlock_), this.sourceBlock_.rendered && o.init(), o.name = t, o.prefixField && (e = this.insertFieldAt(e, o.prefixField)), this.fieldRow.splice(e, 0, o), ++e, o.suffixField && (e = this.insertFieldAt(e, o.suffixField)), this.sourceBlock_.rendered && (this.sourceBlock_.render(), this.sourceBlock_.bumpNeighbours_()), e) : this
}, Blockly.Input.prototype.removeField = function(e) {
    for (var o, t = 0; o = this.fieldRow[t]; t++)
        if (o.name === e) return o.dispose(), this.fieldRow.splice(t, 1), void(this.sourceBlock_.rendered && (this.sourceBlock_.render(), this.sourceBlock_.bumpNeighbours_()));
    goog.asserts.fail('Field1 "%s" not found.', e)
}, Blockly.Input.prototype.isVisible = function() {
    return this.visible_
}, Blockly.Input.prototype.setVisible = function(e) {
    var o = [];
    if (this.visible_ == e) return o;
    for (var t, n = (this.visible_ = e) ? "block" : "none", r = 0; t = this.fieldRow[r]; r++) t.setVisible(e);
    return this.connection && (e ? o = this.connection.unhideAll() : this.connection.hideAll(), r = this.connection.targetBlock()) && (r.getSvgRoot().style.display = n, e || (r.rendered = !1)), o
}, Blockly.Input.prototype.setCheck = function(e) {
    if (!this.connection) throw "This input does not have a connection.";
    return this.connection.setCheck(e), this
}, Blockly.Input.prototype.setAlign = function(e) {
    return this.align = e, this.sourceBlock_.rendered && this.sourceBlock_.render(), this
}, Blockly.Input.prototype.init = function() {
    if (this.sourceBlock_.workspace.rendered)
        for (var e = 0; e < this.fieldRow.length; e++) this.fieldRow[e].init()
}, Blockly.Input.prototype.dispose = function() {
    for (var e, o = 0; e = this.fieldRow[o]; o++) e.dispose();
    this.connection && this.connection.dispose(), this.sourceBlock_ = null
}, Blockly.ConnectionDB = function() {}, Blockly.ConnectionDB.prototype = [], Blockly.ConnectionDB.constructor = Blockly.ConnectionDB, Blockly.ConnectionDB.prototype.addConnection = function(e) {
    if (e.inDB_) throw "Connection already in database.";
    if (!e.getSourceBlock().isInFlyout) {
        var o = this.findPositionForConnection_(e);
        this.splice(o, 0, e), e.inDB_ = !0
    }
}, Blockly.ConnectionDB.prototype.findConnection = function(e) {
    if (!this.length) return -1;
    var o = this.findPositionForConnection_(e);
    if (o >= this.length) return -1;
    for (var t = e.y_, n = o; 0 <= n && this[n].y_ == t;) {
        if (this[n] == e) return n;
        n--
    }
    for (; o < this.length && this[o].y_ == t;) {
        if (this[o] == e) return o;
        o++
    }
    return -1
}, Blockly.ConnectionDB.prototype.findPositionForConnection_ = function(e) {
    if (!this.length) return 0;
    for (var o = 0, t = this.length; o < t;) {
        var n = Math.floor((o + t) / 2);
        if (this[n].y_ < e.y_) o = n + 1;
        else {
            if (!(this[n].y_ > e.y_)) {
                o = n;
                break
            }
            t = n
        }
    }
    return o
}, Blockly.ConnectionDB.prototype.removeConnection_ = function(e) {
    if (!e.inDB_) throw "Connection not in database.";
    var o = this.findConnection(e);
    if (-1 == o) throw "Unable to find connection in connectionDB.";
    e.inDB_ = !1, this.splice(o, 1)
}, Blockly.ConnectionDB.prototype.getNeighbours = function(e, o) {
    function t(e) {
        var t = r - n[e].x_,
            s = i - n[e].y_;
        return Math.sqrt(t * t + s * s) <= o && g.push(n[e]), s < o
    }
    for (var n = this, r = e.x_, i = e.y_, s = 0, l = a = n.length - 2; s < l;) n[l].y_ < i ? s = l : a = l, l = Math.floor((s + a) / 2);
    var g = [],
        a = s = l;
    if (n.length) {
        for (; 0 <= s && t(s);) s--;
        do {
            a++
        } while (a < n.length && t(a))
    }
    return g
}, Blockly.ConnectionDB.prototype.isInYRange_ = function(e, o, t) {
    return Math.abs(this[e].y_ - o) <= t
}, Blockly.ConnectionDB.prototype.searchForClosest = function(e, o, t) {
    if (!this.length) return {
        connection: null,
        radius: o
    };
    var n = e.y_,
        r = e.x_;
    e.x_ = r + t.x, e.y_ = n + t.y;
    var i = this.findPositionForConnection_(e);
    t = null;
    for (var s, l = o, g = i - 1; 0 <= g && this.isInYRange_(g, e.y_, o);) s = this[g], e.isConnectionAllowed(s, l) && (t = s, l = s.distanceFrom(e)), g--;
    for (; i < this.length && this.isInYRange_(i, e.y_, o);) s = this[i], e.isConnectionAllowed(s, l) && (t = s, l = s.distanceFrom(e)), i++;
    return e.x_ = r, e.y_ = n, {
        connection: t,
        radius: l
    }
}, Blockly.ConnectionDB.init = function(e) {
    var o = [];
    o[Blockly.INPUT_VALUE] = new Blockly.ConnectionDB, o[Blockly.OUTPUT_VALUE] = new Blockly.ConnectionDB, o[Blockly.NEXT_STATEMENT] = new Blockly.ConnectionDB, o[Blockly.PREVIOUS_STATEMENT] = new Blockly.ConnectionDB, e.connectionDBList = o
}, Blockly.constants = {}, Blockly.DRAG_RADIUS = 5, Blockly.SNAP_RADIUS = 20, Blockly.BUMP_DELAY = 250, Blockly.COLLAPSE_CHARS = 30, Blockly.LONGPRESS = 750, Blockly.SOUND_LIMIT = 100, Blockly.DRAG_STACK = !0, Blockly.HSV_SATURATION = .45, Blockly.HSV_VALUE = .65, Blockly.SPRITE = {
    width: 64,
    height: 9,
    url: "sprites.png"
}, Blockly.SVG_NS = "http://www.w3.org/2000/svg", Blockly.HTML_NS = "http://www.w3.org/1999/xhtml", Blockly.INPUT_VALUE = 1, Blockly.OUTPUT_VALUE = 2, Blockly.NEXT_STATEMENT = 3, Blockly.PREVIOUS_STATEMENT = 4, Blockly.DUMMY_INPUT = 5, Blockly.ALIGN_LEFT = -1, Blockly.ALIGN_CENTRE = 0, Blockly.ALIGN_RIGHT = 1, Blockly.DRAG_NONE = 0, Blockly.DRAG_STICKY = 1, Blockly.DRAG_BEGIN = 1, Blockly.DRAG_FREE = 2, Blockly.OPPOSITE_TYPE = [], Blockly.OPPOSITE_TYPE[Blockly.INPUT_VALUE] = Blockly.OUTPUT_VALUE, Blockly.OPPOSITE_TYPE[Blockly.OUTPUT_VALUE] = Blockly.INPUT_VALUE, Blockly.OPPOSITE_TYPE[Blockly.NEXT_STATEMENT] = Blockly.PREVIOUS_STATEMENT, Blockly.OPPOSITE_TYPE[Blockly.PREVIOUS_STATEMENT] = Blockly.NEXT_STATEMENT, Blockly.TOOLBOX_AT_TOP = 0, Blockly.TOOLBOX_AT_BOTTOM = 1, Blockly.TOOLBOX_AT_LEFT = 2, Blockly.TOOLBOX_AT_RIGHT = 3, Blockly.DELETE_AREA_TRASH = 1, Blockly.DELETE_AREA_TOOLBOX = 2, Blockly.VARIABLE_CATEGORY_NAME = "VARIABLE", Blockly.PROCEDURE_CATEGORY_NAME = "PROCEDURE", Blockly.Options = function(e) {
    var o, t, n, r, i, s = !!e.readOnly;
    if (s) var l = null,
        g = o = t = n = r = i = !1;
    else l = Blockly.Options.parseToolboxTree(e.toolbox), i = !(!l || !l.getElementsByTagName("category").length), void 0 === (r = e.trashcan) && (r = i), void 0 === (n = e.collapse) && (n = i), void 0 === (t = e.comments) && (t = i), void 0 === (o = e.disable) && (o = i), void 0 === (g = e.sounds) && (g = !0);
    var a = !!e.rtl,
        c = e.horizontalLayout;
    void 0 === c && (c = !1);
    var u = e.toolboxPosition;
    u = "end" !== u;
    var h = c ? u ? Blockly.TOOLBOX_AT_TOP : Blockly.TOOLBOX_AT_BOTTOM : u == a ? Blockly.TOOLBOX_AT_RIGHT : Blockly.TOOLBOX_AT_LEFT,
        p = e.scrollbars;
    void 0 === p && (p = i);
    var d = e.css;
    void 0 === d && (d = !0);
    var y = "https://blockly-demo.appspot.com/static/media/";
    e.media ? y = e.media : e.path && (y = e.path + "media/"), u = void 0 === e.oneBasedIndex || !!e.oneBasedIndex, this.RTL = a, this.oneBasedIndex = u, this.collapse = n, this.comments = t, this.disable = o, this.readOnly = s, this.maxBlocks = e.maxBlocks || 1 / 0, this.pathToMedia = y, this.hasCategories = i, this.hasScrollbars = p, this.hasTrashcan = r, this.hasSounds = g, this.hasCss = d, this.horizontalLayout = c, this.languageTree = l, this.gridOptions = Blockly.Options.parseGridOptions_(e), this.zoomOptions = Blockly.Options.parseZoomOptions_(e), this.toolboxPosition = h
}, Blockly.Options.prototype.parentWorkspace = null, Blockly.Options.prototype.setMetrics = null, Blockly.Options.prototype.getMetrics = null, Blockly.Options.parseZoomOptions_ = function(e) {
    e = e.zoom || {};
    var o = {};
    return o.controls = void 0 !== e.controls && !!e.controls, o.wheel = void 0 !== e.wheel && !!e.wheel, o.startScale = void 0 === e.startScale ? 1 : parseFloat(e.startScale), o.maxScale = void 0 === e.maxScale ? 3 : parseFloat(e.maxScale), o.minScale = void 0 === e.minScale ? .3 : parseFloat(e.minScale), o.scaleSpeed = void 0 === e.scaleSpeed ? 1.2 : parseFloat(e.scaleSpeed), o
}, Blockly.Options.parseGridOptions_ = function(e) {
    e = e.grid || {};
    var o = {};
    return o.spacing = parseFloat(e.spacing) || 0, o.colour = e.colour || "#888", o.length = parseFloat(e.length) || 1, o.snap = 0 < o.spacing && !!e.snap, o
}, Blockly.Options.parseToolboxTree = function(e) {
    return e ? ("string" != typeof e && ("undefined" == typeof XSLTProcessor && e.outerHTML ? e = e.outerHTML : e instanceof Element || (e = null)), "string" == typeof e && (e = Blockly.Xml.textToDom(e))) : e = null, e
}, Blockly.ScrollbarPair = function(e) {
    this.workspace_ = e, this.hScroll = new Blockly.Scrollbar(e, !0, !0, "blocklyMainWorkspaceScrollbar"), this.vScroll = new Blockly.Scrollbar(e, !1, !0, "blocklyMainWorkspaceScrollbar"), this.corner_ = Blockly.utils.createSvgElement("rect", {
        height: Blockly.Scrollbar.scrollbarThickness,
        width: Blockly.Scrollbar.scrollbarThickness,
        class: "blocklyScrollbarBackground"
    }, null), Blockly.utils.insertAfter_(this.corner_, e.getBubbleCanvas())
}, Blockly.ScrollbarPair.prototype.oldHostMetrics_ = null, Blockly.ScrollbarPair.prototype.dispose = function() {
    goog.dom.removeNode(this.corner_), this.oldHostMetrics_ = this.workspace_ = this.corner_ = null, this.hScroll.dispose(), this.hScroll = null, this.vScroll.dispose(), this.vScroll = null
}, Blockly.ScrollbarPair.prototype.resize = function() {
    var e = this.workspace_.getMetrics();
    if (e) {
        var o = !1,
            t = !1;
        this.oldHostMetrics_ && this.oldHostMetrics_.viewWidth == e.viewWidth && this.oldHostMetrics_.viewHeight == e.viewHeight && this.oldHostMetrics_.absoluteTop == e.absoluteTop && this.oldHostMetrics_.absoluteLeft == e.absoluteLeft ? (this.oldHostMetrics_ && this.oldHostMetrics_.contentWidth == e.contentWidth && this.oldHostMetrics_.viewLeft == e.viewLeft && this.oldHostMetrics_.contentLeft == e.contentLeft || (o = !0), this.oldHostMetrics_ && this.oldHostMetrics_.contentHeight == e.contentHeight && this.oldHostMetrics_.viewTop == e.viewTop && this.oldHostMetrics_.contentTop == e.contentTop || (t = !0)) : t = o = !0, o && this.hScroll.resize(e), t && this.vScroll.resize(e), this.oldHostMetrics_ && this.oldHostMetrics_.viewWidth == e.viewWidth && this.oldHostMetrics_.absoluteLeft == e.absoluteLeft || this.corner_.setAttribute("x", this.vScroll.position_.x), this.oldHostMetrics_ && this.oldHostMetrics_.viewHeight == e.viewHeight && this.oldHostMetrics_.absoluteTop == e.absoluteTop || this.corner_.setAttribute("y", this.hScroll.position_.y), this.oldHostMetrics_ = e
    }
}, Blockly.ScrollbarPair.prototype.set = function(e, o) {
    var t = {},
        n = e * this.hScroll.ratio_,
        r = o * this.vScroll.ratio_,
        i = this.vScroll.scrollViewSize_;
    t.x = this.getRatio_(n, this.hScroll.scrollViewSize_), t.y = this.getRatio_(r, i), this.workspace_.setMetrics(t), this.hScroll.setHandlePosition(n), this.vScroll.setHandlePosition(r)
}, Blockly.ScrollbarPair.prototype.getRatio_ = function(e, o) {
    var t = e / o;
    return isNaN(t) ? 0 : t
}, Blockly.Scrollbar = function(e, o, t, n) {
    this.workspace_ = e, this.pair_ = t || !1, this.horizontal_ = o, this.oldHostMetrics_ = null, this.createDom_(n), this.position_ = new goog.math.Coordinate(0, 0), o ? (this.svgBackground_.setAttribute("height", Blockly.Scrollbar.scrollbarThickness), this.outerSvg_.setAttribute("height", Blockly.Scrollbar.scrollbarThickness), this.svgHandle_.setAttribute("height", Blockly.Scrollbar.scrollbarThickness - 5), this.svgHandle_.setAttribute("y", 2.5), this.lengthAttribute_ = "width", this.positionAttribute_ = "x") : (this.svgBackground_.setAttribute("width", Blockly.Scrollbar.scrollbarThickness), this.outerSvg_.setAttribute("width", Blockly.Scrollbar.scrollbarThickness), this.svgHandle_.setAttribute("width", Blockly.Scrollbar.scrollbarThickness - 5), this.svgHandle_.setAttribute("x", 2.5), this.lengthAttribute_ = "height", this.positionAttribute_ = "y"), this.onMouseDownBarWrapper_ = Blockly.bindEventWithChecks_(this.svgBackground_, "mousedown", this, this.onMouseDownBar_), this.onMouseDownHandleWrapper_ = Blockly.bindEventWithChecks_(this.svgHandle_, "mousedown", this, this.onMouseDownHandle_)
}, Blockly.Scrollbar.prototype.origin_ = new goog.math.Coordinate(0, 0), Blockly.Scrollbar.prototype.scrollViewSize_ = 0, Blockly.Scrollbar.prototype.handleLength_ = 0, Blockly.Scrollbar.prototype.handlePosition_ = 0, Blockly.Scrollbar.prototype.isVisible_ = !0, Blockly.Scrollbar.prototype.containerVisible_ = !0, Blockly.Scrollbar.scrollbarThickness = 15, goog.events.BrowserFeature.TOUCH_ENABLED && (Blockly.Scrollbar.scrollbarThickness = 25), Blockly.Scrollbar.metricsAreEquivalent_ = function(e, o) {
    return !(!e || !o || e.viewWidth != o.viewWidth || e.viewHeight != o.viewHeight || e.viewLeft != o.viewLeft || e.viewTop != o.viewTop || e.absoluteTop != o.absoluteTop || e.absoluteLeft != o.absoluteLeft || e.contentWidth != o.contentWidth || e.contentHeight != o.contentHeight || e.contentLeft != o.contentLeft || e.contentTop != o.contentTop)
}, Blockly.Scrollbar.prototype.dispose = function() {
    this.cleanUp_(), Blockly.unbindEvent_(this.onMouseDownBarWrapper_), this.onMouseDownBarWrapper_ = null, Blockly.unbindEvent_(this.onMouseDownHandleWrapper_), this.onMouseDownHandleWrapper_ = null, goog.dom.removeNode(this.outerSvg_), this.workspace_ = this.svgHandle_ = this.svgBackground_ = this.svgGroup_ = this.outerSvg_ = null
}, Blockly.Scrollbar.prototype.setHandleLength_ = function(e) {
    this.handleLength_ = e, this.svgHandle_.setAttribute(this.lengthAttribute_, this.handleLength_)
}, Blockly.Scrollbar.prototype.setHandlePosition = function(e) {
    this.handlePosition_ = e, this.svgHandle_.setAttribute(this.positionAttribute_, this.handlePosition_)
}, Blockly.Scrollbar.prototype.setScrollViewSize_ = function(e) {
    this.scrollViewSize_ = e, this.outerSvg_.setAttribute(this.lengthAttribute_, this.scrollViewSize_), this.svgBackground_.setAttribute(this.lengthAttribute_, this.scrollViewSize_)
}, Blockly.ScrollbarPair.prototype.setContainerVisible = function(e) {
    this.hScroll.setContainerVisible(e), this.vScroll.setContainerVisible(e)
}, Blockly.Scrollbar.prototype.setPosition = function(e, o) {
    this.position_.x = e, this.position_.y = o, Blockly.utils.setCssTransform(this.outerSvg_, "translate(" + (this.position_.x + this.origin_.x) + "px," + (this.position_.y + this.origin_.y) + "px)")
}, Blockly.Scrollbar.prototype.resize = function(e) {
    (e || (e = this.workspace_.getMetrics())) && (Blockly.Scrollbar.metricsAreEquivalent_(e, this.oldHostMetrics_) || (this.oldHostMetrics_ = e, this.horizontal_ ? this.resizeHorizontal_(e) : this.resizeVertical_(e), this.onScroll_()))
}, Blockly.Scrollbar.prototype.resizeHorizontal_ = function(e) {
    this.resizeViewHorizontal(e)
}, Blockly.Scrollbar.prototype.resizeViewHorizontal = function(e) {
    var o = e.viewWidth - 1;
    this.pair_ && (o -= Blockly.Scrollbar.scrollbarThickness), this.setScrollViewSize_(Math.max(0, o)), o = e.absoluteLeft + .5, this.pair_ && this.workspace_.RTL && (o += Blockly.Scrollbar.scrollbarThickness), this.setPosition(o, e.absoluteTop + e.viewHeight - Blockly.Scrollbar.scrollbarThickness - .5), this.resizeContentHorizontal(e)
}, Blockly.Scrollbar.prototype.resizeContentHorizontal = function(e) {
    this.pair_ || this.setVisible(this.scrollViewSize_ < e.contentWidth), this.ratio_ = this.scrollViewSize_ / e.contentWidth, (-1 / 0 == this.ratio_ || 1 / 0 == this.ratio_ || isNaN(this.ratio_)) && (this.ratio_ = 0), this.setHandleLength_(Math.max(0, e.viewWidth * this.ratio_)), this.setHandlePosition(this.constrainHandle_((e.viewLeft - e.contentLeft) * this.ratio_))
}, Blockly.Scrollbar.prototype.resizeVertical_ = function(e) {
    this.resizeViewVertical(e)
}, Blockly.Scrollbar.prototype.resizeViewVertical = function(e) {
    var o = e.viewHeight - 1;
    this.pair_ && (o -= Blockly.Scrollbar.scrollbarThickness), this.setScrollViewSize_(Math.max(0, o)), o = e.absoluteLeft + .5, this.workspace_.RTL || (o += e.viewWidth - Blockly.Scrollbar.scrollbarThickness - 1), this.setPosition(o, e.absoluteTop + .5), this.resizeContentVertical(e)
}, Blockly.Scrollbar.prototype.resizeContentVertical = function(e) {
    this.pair_ || this.setVisible(this.scrollViewSize_ < e.contentHeight), this.ratio_ = this.scrollViewSize_ / e.contentHeight, (-1 / 0 == this.ratio_ || 1 / 0 == this.ratio_ || isNaN(this.ratio_)) && (this.ratio_ = 0), this.setHandleLength_(Math.max(0, e.viewHeight * this.ratio_)), this.setHandlePosition(this.constrainHandle_((e.viewTop - e.contentTop) * this.ratio_))
}, Blockly.Scrollbar.prototype.createDom_ = function(e) {
    var o = "blocklyScrollbar" + (this.horizontal_ ? "Horizontal" : "Vertical");
    e && (o += " " + e), this.outerSvg_ = Blockly.utils.createSvgElement("svg", {
        class: o
    }, null), this.svgGroup_ = Blockly.utils.createSvgElement("g", {}, this.outerSvg_), this.svgBackground_ = Blockly.utils.createSvgElement("rect", {
        class: "blocklyScrollbarBackground"
    }, this.svgGroup_), e = Math.floor((Blockly.Scrollbar.scrollbarThickness - 5) / 2), this.svgHandle_ = Blockly.utils.createSvgElement("rect", {
        class: "blocklyScrollbarHandle",
        rx: e,
        ry: e
    }, this.svgGroup_), Blockly.utils.insertAfter_(this.outerSvg_, this.workspace_.getParentSvg())
}, Blockly.Scrollbar.prototype.isVisible = function() {
    return this.isVisible_
}, Blockly.Scrollbar.prototype.setContainerVisible = function(e) {
    var o = e != this.containerVisible_;
    this.containerVisible_ = e, o && this.updateDisplay_()
}, Blockly.Scrollbar.prototype.setVisible = function(e) {
    var o = e != this.isVisible();
    if (this.pair_) throw "Unable to toggle visibility of paired scrollbars.";
    this.isVisible_ = e, o && this.updateDisplay_()
}, Blockly.Scrollbar.prototype.updateDisplay_ = function() {
    this.containerVisible_ && this.isVisible() ? this.outerSvg_.setAttribute("display", "block") : this.outerSvg_.setAttribute("display", "none")
}, Blockly.Scrollbar.prototype.onMouseDownBar_ = function(e) {
    if (this.workspace_.markFocused(), Blockly.Touch.clearTouchIdentifier(), this.cleanUp_(), Blockly.utils.isRightButton(e)) e.stopPropagation();
    else {
        var o = Blockly.utils.mouseToSvg(e, this.workspace_.getParentSvg(), this.workspace_.getInverseScreenCTM()),
            o = this.horizontal_ ? o.x : o.y,
            t = Blockly.utils.getInjectionDivXY_(this.svgHandle_),
            t = this.horizontal_ ? t.x : t.y,
            n = this.handlePosition_,
            r = .95 * this.handleLength_;
        o <= t ? n -= r : o >= t + this.handleLength_ && (n += r), this.setHandlePosition(this.constrainHandle_(n)), this.onScroll_(), e.stopPropagation(), e.preventDefault()
    }
}, Blockly.Scrollbar.prototype.onMouseDownHandle_ = function(e) {
    this.workspace_.markFocused(), this.cleanUp_(), Blockly.utils.isRightButton(e) ? e.stopPropagation() : (this.startDragHandle = this.handlePosition_, this.workspace_.setupDragSurface(), this.startDragMouse = this.horizontal_ ? e.clientX : e.clientY, Blockly.Scrollbar.onMouseUpWrapper_ = Blockly.bindEventWithChecks_(document, "mouseup", this, this.onMouseUpHandle_), Blockly.Scrollbar.onMouseMoveWrapper_ = Blockly.bindEventWithChecks_(document, "mousemove", this, this.onMouseMoveHandle_), e.stopPropagation(), e.preventDefault())
}, Blockly.Scrollbar.prototype.onMouseMoveHandle_ = function(e) {
    this.setHandlePosition(this.constrainHandle_(this.startDragHandle + ((this.horizontal_ ? e.clientX : e.clientY) - this.startDragMouse))), this.onScroll_()
}, Blockly.Scrollbar.prototype.onMouseUpHandle_ = function() {
    this.workspace_.resetDragSurface(), Blockly.Touch.clearTouchIdentifier(), this.cleanUp_()
}, Blockly.Scrollbar.prototype.cleanUp_ = function() {
    Blockly.hideChaff(!0), Blockly.Scrollbar.onMouseUpWrapper_ && (Blockly.unbindEvent_(Blockly.Scrollbar.onMouseUpWrapper_), Blockly.Scrollbar.onMouseUpWrapper_ = null), Blockly.Scrollbar.onMouseMoveWrapper_ && (Blockly.unbindEvent_(Blockly.Scrollbar.onMouseMoveWrapper_), Blockly.Scrollbar.onMouseMoveWrapper_ = null)
}, Blockly.Scrollbar.prototype.constrainHandle_ = function(e) {
    return e = 0 >= e || isNaN(e) || this.scrollViewSize_ < this.handleLength_ ? 0 : Math.min(e, this.scrollViewSize_ - this.handleLength_)
}, Blockly.Scrollbar.prototype.onScroll_ = function() {
    var e = this.handlePosition_ / this.scrollViewSize_;
    isNaN(e) && (e = 0);
    var o = {};
    this.horizontal_ ? o.x = e : o.y = e, this.workspace_.setMetrics(o)
}, Blockly.Scrollbar.prototype.set = function(e) {
    this.setHandlePosition(this.constrainHandle_(e * this.ratio_)), this.onScroll_()
}, Blockly.Scrollbar.prototype.setOrigin = function(e, o) {
    this.origin_ = new goog.math.Coordinate(e, o)
}, Blockly.Trashcan = function(e) {
    this.workspace_ = e
}, Blockly.Trashcan.prototype.WIDTH_ = 47, Blockly.Trashcan.prototype.BODY_HEIGHT_ = 45, Blockly.Trashcan.prototype.LID_HEIGHT_ = 15, Blockly.Trashcan.prototype.MARGIN_BOTTOM_ = 35, Blockly.Trashcan.prototype.MARGIN_SIDE_ = 35, Blockly.Trashcan.prototype.MARGIN_HOTSPOT_ = 25, Blockly.Trashcan.prototype.SPRITE_LEFT_ = 0, Blockly.Trashcan.prototype.SPRITE_TOP_ = 32, Blockly.Trashcan.prototype.isOpen = !1, Blockly.Trashcan.prototype.svgGroup_ = null, Blockly.Trashcan.prototype.svgLid_ = null, Blockly.Trashcan.prototype.lidTask_ = 0, Blockly.Trashcan.prototype.lidOpen_ = 0, Blockly.Trashcan.prototype.left_ = 0, Blockly.Trashcan.prototype.top_ = 0, Blockly.Trashcan.prototype.createDom = function() {
    this.svgGroup_ = Blockly.utils.createSvgElement("g", {
        class: "blocklyTrash"
    }, null);
    var e = String(Math.random()).substring(2),
        o = Blockly.utils.createSvgElement("clipPath", {
            id: "blocklyTrashBodyClipPath" + e
        }, this.svgGroup_);
    return Blockly.utils.createSvgElement("rect", {
        width: this.WIDTH_,
        height: this.BODY_HEIGHT_,
        y: this.LID_HEIGHT_
    }, o), Blockly.utils.createSvgElement("image", {
        width: 24,
        x: -this.SPRITE_LEFT_,
        height: Blockly.SPRITE.height,
        y: -this.SPRITE_TOP_,
        "clip-path": "url(#blocklyTrashBodyClipPath" + e + ")"
    }, this.svgGroup_).setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "./media/sprites.png"), o = Blockly.utils.createSvgElement("clipPath", {
        id: "blocklyTrashLidClipPath" + e
    }, this.svgGroup_), Blockly.utils.createSvgElement("rect", {
        width: this.WIDTH_,
        height: this.LID_HEIGHT_
    }, o), this.svgLid_ = Blockly.utils.createSvgElement("image", {
        width: Blockly.SPRITE.width,
        x: -this.SPRITE_LEFT_,
        height: Blockly.SPRITE.height,
        y: -this.SPRITE_TOP_,
        "clip-path": "url(#blocklyTrashLidClipPath" + e + ")"
    }, this.svgGroup_), this.svgLid_.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "./media/sprites.png"), Blockly.bindEventWithChecks_(this.svgGroup_, "mouseup", this, this.click), this.animateLid_(), this.svgGroup_
}, Blockly.Trashcan.prototype.init = function(e) {
    return this.bottom_ = this.MARGIN_BOTTOM_ + e, this.setOpen_(!1), this.bottom_ + this.BODY_HEIGHT_ + this.LID_HEIGHT_
}, Blockly.Trashcan.prototype.dispose = function() {
    this.svgGroup_ && (goog.dom.removeNode(this.svgGroup_), this.svgGroup_ = null), this.workspace_ = this.svgLid_ = null, goog.Timer.clear(this.lidTask_)
}, Blockly.Trashcan.prototype.position = function() {
    var e = this.workspace_.getMetrics();
    e && (this.workspace_.RTL ? (this.left_ = this.MARGIN_SIDE_ + Blockly.Scrollbar.scrollbarThickness, e.toolboxPosition == Blockly.TOOLBOX_AT_LEFT && (this.left_ += e.flyoutWidth, this.workspace_.toolbox_ && (this.left_ += e.absoluteLeft))) : (this.left_ = e.viewWidth + e.absoluteLeft - this.WIDTH_ - this.MARGIN_SIDE_ - Blockly.Scrollbar.scrollbarThickness, e.toolboxPosition == Blockly.TOOLBOX_AT_RIGHT && (this.left_ -= e.flyoutWidth)), this.top_ = e.viewHeight + e.absoluteTop - (this.BODY_HEIGHT_ + this.LID_HEIGHT_) - this.bottom_, e.toolboxPosition == Blockly.TOOLBOX_AT_BOTTOM && (this.top_ -= e.flyoutHeight), this.svgGroup_.setAttribute("transform", "translate(" + this.left_ + "," + this.top_ + ")"))
}, Blockly.Trashcan.prototype.getClientRect = function() {
    if (!this.svgGroup_) return null;
    var e = this.svgGroup_.getBoundingClientRect();
    return new goog.math.Rect(e.left + this.SPRITE_LEFT_ - this.MARGIN_HOTSPOT_, e.top + this.SPRITE_TOP_ - this.MARGIN_HOTSPOT_, this.WIDTH_ + 2 * this.MARGIN_HOTSPOT_, this.LID_HEIGHT_ + this.BODY_HEIGHT_ + 2 * this.MARGIN_HOTSPOT_)
}, Blockly.Trashcan.prototype.setOpen_ = function(e) {
    this.isOpen != e && (goog.Timer.clear(this.lidTask_), this.isOpen = e, this.animateLid_())
}, Blockly.Trashcan.prototype.animateLid_ = function() {
    this.lidOpen_ += this.isOpen ? .2 : -.2, this.lidOpen_ = goog.math.clamp(this.lidOpen_, 0, 1);
    var e = 45 * this.lidOpen_;
    this.svgLid_.setAttribute("transform", "rotate(" + (this.workspace_.RTL ? -e : e) + "," + (this.workspace_.RTL ? 4 : this.WIDTH_ - 4) + "," + (this.LID_HEIGHT_ - 2) + ")"), e = goog.math.lerp(.4, .8, this.lidOpen_), this.svgGroup_.style.opacity = e, 0 < this.lidOpen_ && 1 > this.lidOpen_ && (this.lidTask_ = goog.Timer.callOnce(this.animateLid_, 20, this))
}, Blockly.Trashcan.prototype.close = function() {
    this.setOpen_(!1)
}, Blockly.Trashcan.prototype.click = function() {
    var e = this.workspace_.startScrollX - this.workspace_.scrollX,
        o = this.workspace_.startScrollY - this.workspace_.scrollY;
    Math.sqrt(e * e + o * o) > Blockly.DRAG_RADIUS || console.log("TODO: Inspect trash.")
}, Blockly.utils = {}, Blockly.utils.removeAttribute = function(e, o) {
    goog.userAgent.IE && goog.userAgent.isVersion("10.0") ? e.setAttribute(o, null) : e.removeAttribute(o)
}, Blockly.utils.addClass = function(e, o) {
    var t = e.getAttribute("class") || "";
    return -1 == (" " + t + " ").indexOf(" " + o + " ") && (t && (t += " "), e.setAttribute("class", t + o), !0)
}, Blockly.utils.removeClass = function(e, o) {
    if (-1 == (" " + (t = e.getAttribute("class")) + " ").indexOf(" " + o + " ")) return !1;
    for (var t = t.split(/\s+/), n = 0; n < t.length; n++) t[n] && t[n] != o || (t.splice(n, 1), n--);
    return t.length ? e.setAttribute("class", t.join(" ")) : Blockly.utils.removeAttribute(e, "class"), !0
}, Blockly.utils.hasClass = function(e, o) {
    return -1 != (" " + e.getAttribute("class") + " ").indexOf(" " + o + " ")
}, Blockly.utils.noEvent = function(e) {
    e.preventDefault(), e.stopPropagation()
}, Blockly.utils.isTargetInput = function(e) {
    return "textarea" == e.target.type || "text" == e.target.type || "number" == e.target.type || "email" == e.target.type || "password" == e.target.type || "search" == e.target.type || "tel" == e.target.type || "url" == e.target.type || e.target.isContentEditable
}, Blockly.utils.getRelativeXY = function(e) {
    var o = new goog.math.Coordinate(0, 0),
        t = e.getAttribute("x");
    return t && (o.x = parseInt(t, 10)), (t = e.getAttribute("y")) && (o.y = parseInt(t, 10)), (t = (t = e.getAttribute("transform")) && t.match(Blockly.utils.getRelativeXY.XY_REGEX_)) && (o.x += parseFloat(t[1]), t[3] && (o.y += parseFloat(t[3]))), (e = e.getAttribute("style")) && -1 < e.indexOf("translate") && ((t = e.match(Blockly.utils.getRelativeXY.XY_2D_REGEX_)) || (t = e.match(Blockly.utils.getRelativeXY.XY_3D_REGEX_)), t && (o.x += parseFloat(t[1]), t[3] && (o.y += parseFloat(t[3])))), o
}, Blockly.utils.getInjectionDivXY_ = function(e) {
    for (var o, t = 0, n = 0; e;) {
        var r = Blockly.utils.getRelativeXY(e);
        if (o = Blockly.utils.getScale_(e), t = t * o + r.x, n = n * o + r.y, -1 != (" " + (e.getAttribute("class") || "") + " ").indexOf(" injectionDiv ")) break;
        e = e.parentNode
    }
    return new goog.math.Coordinate(t, n)
}, Blockly.utils.getScale_ = function(e) {
    var o = 1;
    return (e = e.getAttribute("transform")) && (e = e.match(Blockly.utils.getScale_.REGEXP_)) && e[0] && (o = parseFloat(e[0])), o
}, Blockly.utils.getRelativeXY.XY_REGEX_ = /translate\(\s*([-+\d.e]+)([ ,]\s*([-+\d.e]+)\s*\))?/, Blockly.utils.getScale_REGEXP_ = /scale\(\s*([-+\d.e]+)\s*\)/, Blockly.utils.getRelativeXY.XY_3D_REGEX_ = /transform:\s*translate3d\(\s*([-+\d.e]+)px([ ,]\s*([-+\d.e]+)\s*)px([ ,]\s*([-+\d.e]+)\s*)px\)?/, Blockly.utils.getRelativeXY.XY_2D_REGEX_ = /transform:\s*translate\(\s*([-+\d.e]+)px([ ,]\s*([-+\d.e]+)\s*)px\)?/, Blockly.utils.createSvgElement = function(e, o, t) {
    e = document.createElementNS(Blockly.SVG_NS, e);
    for (var n in o) e.setAttribute(n, o[n]);
    return document.body.runtimeStyle && (e.runtimeStyle = e.currentStyle = e.style), t && t.appendChild(e), e
}, Blockly.utils.isRightButton = function(e) {
    return !(!e.ctrlKey || !goog.userAgent.MAC) || 2 == e.button
}, Blockly.utils.mouseToSvg = function(e, o, t) {
    var n = o.createSVGPoint();
    return n.x = e.clientX, n.y = e.clientY, t || (t = o.getScreenCTM().inverse()), n.matrixTransform(t)
}, Blockly.utils.shortestStringLength = function(e) {
    return e.length ? e.reduce(function(e, o) {
        return e.length < o.length ? e : o
    }).length : 0
}, Blockly.utils.commonWordPrefix = function(e, o) {
    if (!e.length) return 0;
    if (1 == e.length) return e[0].length;
    for (var t = 0, n = o || Blockly.utils.shortestStringLength(e), r = 0; r < n; r++) {
        for (var i = e[0][r], s = 1; s < e.length; s++)
            if (i != e[s][r]) return t;
        " " == i && (t = r + 1)
    }
    for (s = 1; s < e.length; s++)
        if ((i = e[s][r]) && " " != i) return t;
    return n
}, Blockly.utils.commonWordSuffix = function(e, o) {
    if (!e.length) return 0;
    if (1 == e.length) return e[0].length;
    for (var t = 0, n = o || Blockly.utils.shortestStringLength(e), r = 0; r < n; r++) {
        for (var i = e[0].substr(-r - 1, 1), s = 1; s < e.length; s++)
            if (i != e[s].substr(-r - 1, 1)) return t;
        " " == i && (t = r + 1)
    }
    for (s = 1; s < e.length; s++)
        if ((i = e[s].charAt(e[s].length - r - 1)) && " " != i) return t;
    return n
}, Blockly.utils.tokenizeInterpolation = function(e) {
    return Blockly.utils.tokenizeInterpolation_(e, !0)
}, Blockly.utils.replaceMessageReferences = function(e) {
    return goog.isString(e) ? (e = Blockly.utils.tokenizeInterpolation_(e, !1), e.length ? e[0] : "") : e
}, Blockly.utils.checkMessageReferences = function(e) {
    for (var o = !0, t = /%{BKY_([a-zA-Z][a-zA-Z0-9_]*)}/g, n = t.exec(e); null != n;) {
        var r = n[1];
        null == Blockly.Msg[r] && (console.log("WARNING: No message string for %{BKY_" + r + "}."), o = !1), e = e.substring(n.index + r.length + 1), n = t.exec(e)
    }
    return o
}, Blockly.utils.tokenizeInterpolation_ = function(e, o) {
    var t = [],
        n = e.split("");
    n.push("");
    for (var r = 0, i = [], s = null, l = 0; l < n.length; l++) {
        var g = n[l];
        0 == r ? "%" == g ? ((g = i.join("")) && t.push(g), i.length = 0, r = 1) : i.push(g) : 1 == r ? "%" == g ? (i.push(g), r = 0) : o && "0" <= g && "9" >= g ? (r = 2, s = g, (g = i.join("")) && t.push(g), i.length = 0) : "{" == g ? r = 3 : (i.push("%", g), r = 0) : 2 == r ? "0" <= g && "9" >= g ? s += g : (t.push(parseInt(s, 10)), l--, r = 0) : 3 == r && ("" == g ? (i.splice(0, 0, "%{"), l--, r = 0) : "}" != g ? i.push(g) : (g = i.join(""), /[a-zA-Z][a-zA-Z0-9_]*/.test(g) ? (r = g.toUpperCase(), (r = goog.string.startsWith(r, "BKY_") ? r.substring(4) : null) && r in Blockly.Msg ? (g = Blockly.Msg[r], goog.isString(g) ? Array.prototype.push.apply(t, Blockly.utils.tokenizeInterpolation(g)) : o ? t.push(String(g)) : t.push(g)) : t.push("%{" + g + "}")) : t.push("%{" + g + "}"), r = i.length = 0))
    }
    for ((g = i.join("")) && t.push(g), n = [], l = i.length = 0; l < t.length; ++l) "string" == typeof t[l] ? i.push(t[l]) : ((g = i.join("")) && n.push(g), i.length = 0, n.push(t[l]));
    return (g = i.join("")) && n.push(g), i.length = 0, n
}, Blockly.utils.genUid = function() {
    for (var e = Blockly.utils.genUid.soup_.length, o = [], t = 0; 20 > t; t++) o[t] = Blockly.utils.genUid.soup_.charAt(Math.random() * e);
    return o.join("")
}, Blockly.utils.genUid.soup_ = "!#$%()*+,-./:;=?@[]^_`{|}~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", Blockly.utils.wrap = function(e, o) {
    for (var t = e.split("\n"), n = 0; n < t.length; n++) t[n] = Blockly.utils.wrapLine_(t[n], o);
    return t.join("\n")
}, Blockly.utils.wrapLine_ = function(e, o) {
    if (e.length <= o) return e;
    for (var t = e.trim().split(/\s+/), n = 0; n < t.length; n++) t[n].length > o && (o = t[n].length);
    var n = -1 / 0,
        r = 1;
    do {
        for (var i = n, s = e, l = [], g = t.length / r, a = 1, n = 0; n < t.length - 1; n++) a < (n + 1.5) / g ? (a++, l[n] = !0) : l[n] = !1;
        l = Blockly.utils.wrapMutate_(t, l, o), n = Blockly.utils.wrapScore_(t, l, o), e = Blockly.utils.wrapToText_(t, l), r++
    } while (n > i);
    return s
}, Blockly.utils.wrapScore_ = function(e, o, t) {
    for (var n = [0], r = [], i = 0; i < e.length; i++) n[n.length - 1] += e[i].length, !0 === o[i] ? (n.push(0), r.push(e[i].charAt(e[i].length - 1))) : !1 === o[i] && n[n.length - 1]++;
    for (e = Math.max.apply(Math, n), i = o = 0; i < n.length; i++) o -= 2 * Math.pow(Math.abs(t - n[i]), 1.5), o -= Math.pow(e - n[i], 1.5), -1 != ".?!".indexOf(r[i]) ? o += t / 3 : -1 != ",;)]}".indexOf(r[i]) && (o += t / 4);
    return 1 < n.length && n[n.length - 1] <= n[n.length - 2] && (o += .5), o
}, Blockly.utils.wrapMutate_ = function(e, o, t) {
    for (var n, r = Blockly.utils.wrapScore_(e, o, t), i = 0; i < o.length - 1; i++)
        if (o[i] != o[i + 1]) {
            var s = [].concat(o);
            s[i] = !s[i], s[i + 1] = !s[i + 1];
            var l = Blockly.utils.wrapScore_(e, s, t);
            l > r && (r = l, n = s)
        }
    return n ? Blockly.utils.wrapMutate_(e, n, t) : o
}, Blockly.utils.wrapToText_ = function(e, o) {
    for (var t = [], n = 0; n < e.length; n++) t.push(e[n]), void 0 !== o[n] && t.push(o[n] ? "\n" : " ");
    return t.join("")
}, Blockly.utils.is3dSupported = function() {
    if (void 0 !== Blockly.utils.is3dSupported.cached_) return Blockly.utils.is3dSupported.cached_;
    if (!goog.global.getComputedStyle) return !1;
    var e = document.createElement("p"),
        o = "none",
        t = {
            webkitTransform: "-webkit-transform",
            OTransform: "-o-transform",
            msTransform: "-ms-transform",
            MozTransform: "-moz-transform",
            transform: "transform"
        };
    document.body.insertBefore(e, null);
    for (var n in t)
        if (void 0 !== e.style[n]) {
            if (e.style[n] = "translate3d(1px,1px,1px)", !(o = goog.global.getComputedStyle(e))) return document.body.removeChild(e), !1;
            o = o.getPropertyValue(t[n])
        }
    return document.body.removeChild(e), Blockly.utils.is3dSupported.cached_ = "none" !== o, Blockly.utils.is3dSupported.cached_
}, Blockly.utils.insertAfter_ = function(e, o) {
    var t = o.nextSibling,
        n = o.parentNode;
    if (!n) throw "Reference node has no parent.";
    t ? n.insertBefore(e, t) : n.appendChild(e)
}, Blockly.utils.runAfterPageLoad = function(e) {
    if (!document) throw Error("Blockly.utils.runAfterPageLoad() requires browser document.");
    if ("complete" === document.readyState) e();
    else var o = setInterval(function() {
        "complete" === document.readyState && (clearInterval(o), e())
    }, 10)
}, Blockly.utils.setCssTransform = function(e, o) {
    e.style.transform = o, e.style["-webkit-transform"] = o
}, Blockly.WorkspaceDragSurfaceSvg = function(e) {
    this.container_ = e, this.createDom()
}, Blockly.WorkspaceDragSurfaceSvg.prototype.SVG_ = null, Blockly.WorkspaceDragSurfaceSvg.prototype.dragGroup_ = null, Blockly.WorkspaceDragSurfaceSvg.prototype.container_ = null, Blockly.WorkspaceDragSurfaceSvg.prototype.createDom = function() {
    this.SVG_ || (this.SVG_ = Blockly.utils.createSvgElement("svg", {
        xmlns: Blockly.SVG_NS,
        "xmlns:html": Blockly.HTML_NS,
        "xmlns:xlink": "http://www.w3.org/1999/xlink",
        version: "1.1",
        class: "blocklyWsDragSurface"
    }, null), this.container_.appendChild(this.SVG_))
}, Blockly.WorkspaceDragSurfaceSvg.prototype.translateSurface = function(e, o) {
    e = e.toFixed(0), o = o.toFixed(0), this.SVG_.style.display = "block", Blockly.utils.setCssTransform(this.SVG_, "translate3d(" + e + "px, " + o + "px, 0px)")
}, Blockly.WorkspaceDragSurfaceSvg.prototype.getSurfaceTranslation = function() {
    return Blockly.utils.getRelativeXY(this.SVG_)
}, Blockly.WorkspaceDragSurfaceSvg.prototype.clearAndHide = function(e) {
    var o = this.SVG_.childNodes[0],
        t = this.SVG_.childNodes[1];
    if (!(o && t && Blockly.utils.hasClass(o, "blocklyBlockCanvas") && Blockly.utils.hasClass(t, "blocklyBubbleCanvas"))) throw "Couldn't clear and hide the drag surface.  A node was missing.";
    null != this.previousSibling_ ? Blockly.utils.insertAfter_(o, this.previousSibling_) : e.insertBefore(o, e.firstChild), Blockly.utils.insertAfter_(t, o), this.SVG_.style.display = "none", goog.asserts.assert(0 == this.SVG_.childNodes.length, "Drag surface was not cleared."), Blockly.utils.setCssTransform(this.SVG_, ""), this.previousSibling_ = null
}, Blockly.WorkspaceDragSurfaceSvg.prototype.setContentsAndShow = function(e, o, t, n, r, i) {
    goog.asserts.assert(0 == this.SVG_.childNodes.length, "Already dragging a block."), this.previousSibling_ = t, e.setAttribute("transform", "translate(0, 0) scale(" + i + ")"), o.setAttribute("transform", "translate(0, 0) scale(" + i + ")"), this.SVG_.setAttribute("width", n), this.SVG_.setAttribute("height", r), this.SVG_.appendChild(e), this.SVG_.appendChild(o), this.SVG_.style.display = "block"
}, Blockly.Xml = {}, Blockly.Xml.workspaceToDom = function(e, o) {
    for (var t, n = goog.dom.createDom("xml"), r = e.getTopBlocks(!0), i = 0; t = r[i]; i++) n.appendChild(Blockly.Xml.blockToDomWithXY(t, o));
    return n
}, Blockly.Xml.blockToDomWithXY = function(e, o) {
    var t;
    e.workspace.RTL && (t = e.workspace.getWidth());
    var n = Blockly.Xml.blockToDom(e, o),
        r = e.getRelativeToSurfaceXY();
    return n.setAttribute("x", Math.round(e.workspace.RTL ? t - r.x : r.x)), n.setAttribute("y", Math.round(r.y)), n
}, Blockly.Xml.blockToDom = function(e, o) {
    var t, n = goog.dom.createDom(e.isShadow() ? "shadow" : "block");
    n.setAttribute("type", e.type), o || n.setAttribute("id", e.id), e.mutationToDom && (i = e.mutationToDom()) && (i.hasChildNodes() || i.hasAttributes()) && n.appendChild(i);
    for (var r, i = 0; r = e.inputList[i]; i++)
        for (var s, l = 0; s = r.fieldRow[l]; l++)
            if (s.name && s.EDITABLE) {
                var g = goog.dom.createDom("field", null, s.getValue());
                g.setAttribute("name", s.name), n.appendChild(g)
            }
    for ((i = e.getCommentText()) && (i = goog.dom.createDom("comment", null, i), "object" == typeof e.comment && (i.setAttribute("pinned", e.comment.isVisible()), r = e.comment.getBubbleSize(), i.setAttribute("h", r.height), i.setAttribute("w", r.width)), n.appendChild(i)), e.data && (i = goog.dom.createDom("data", null, e.data), n.appendChild(i)), i = 0; r = e.inputList[i]; i++) s = !0, r.type != Blockly.DUMMY_INPUT && (g = r.connection.targetBlock(), r.type == Blockly.INPUT_VALUE ? t = goog.dom.createDom("value") : r.type == Blockly.NEXT_STATEMENT && (t = goog.dom.createDom("statement")), !(l = r.connection.getShadowDom()) || g && g.isShadow() || t.appendChild(Blockly.Xml.cloneShadow_(l)), g && (t.appendChild(Blockly.Xml.blockToDom(g, o)), s = !1), t.setAttribute("name", r.name), s || n.appendChild(t));
    return e.inputsInlineDefault != e.inputsInline && n.setAttribute("inline", e.inputsInline), e.isCollapsed() && n.setAttribute("collapsed", !0), e.disabled && n.setAttribute("disabled", !0), e.isDeletable() || e.isShadow() || n.setAttribute("deletable", !1), e.isMovable() || e.isShadow() || n.setAttribute("movable", !1), e.isEditable() || n.setAttribute("editable", !1), (i = e.getNextBlock()) && (t = goog.dom.createDom("next", null, Blockly.Xml.blockToDom(i, o)), n.appendChild(t)), !(l = e.nextConnection && e.nextConnection.getShadowDom()) || i && i.isShadow() || t.appendChild(Blockly.Xml.cloneShadow_(l)), n
}, Blockly.Xml.cloneShadow_ = function(e) {
    for (var o, t = e = e.cloneNode(!0); t;)
        if (t.firstChild) t = t.firstChild;
        else {
            for (; t && !t.nextSibling;) o = t, t = t.parentNode, 3 == o.nodeType && "" == o.data.trim() && t.firstChild != o && goog.dom.removeNode(o);
            t && (o = t, t = t.nextSibling, 3 == o.nodeType && "" == o.data.trim() && goog.dom.removeNode(o))
        }
    return e
}, Blockly.Xml.domToText = function(e) {
    return (new XMLSerializer).serializeToString(e)
}, Blockly.Xml.domToPrettyText = function(e) {
    e = Blockly.Xml.domToText(e).split("<");
    for (var o = "", t = 1; t < e.length; t++) {
        var n = e[t];
        "/" == n[0] && (o = o.substring(2)), e[t] = o + "<" + n, "/" != n[0] && "/>" != n.slice(-2) && (o += "  ")
    }
    return e = e.join("\n"), (e = e.replace(/(<(\w+)\b[^>]*>[^\n]*)\n *<\/\2>/g, "$1</$2>")).replace(/^\n/, "")
}, Blockly.Xml.textToDom = function(e) {
    return (e = (new DOMParser).parseFromString(e, "text/xml")) && e.firstChild && "xml" == e.firstChild.nodeName.toLowerCase() && e.firstChild === e.lastChild || goog.asserts.fail("Blockly.Xml.textToDom did not obtain a valid XML tree."), e.firstChild
}, Blockly.Xml.domToWorkspace = function(e, o) {
    if (e instanceof Blockly.Workspace) {
        var t = e;
        e = o, o = t, console.warn("Deprecated call to Blockly.Xml.domToWorkspace, swap the arguments.")
    }
    var n;
    o.RTL && (n = o.getWidth()), t = [], Blockly.Field.startCache();
    var r = e.childNodes.length,
        i = Blockly.Events.getGroup();
    i || Blockly.Events.setGroup(!0), o.setResizesEnabled && o.setResizesEnabled(!1);
    for (var s = 0; s < r; s++) {
        var l = (a = e.childNodes[s]).nodeName.toLowerCase();
        if ("block" == l || "shadow" == l && !Blockly.Events.recordUndo) {
            l = Blockly.Xml.domToBlock(a, o), t.push(l.id);
            var g = parseInt(a.getAttribute("x"), 10),
                a = parseInt(a.getAttribute("y"), 10);
            isNaN(g) || isNaN(a) || l.moveBy(o.RTL ? n - g : g, a)
        } else "shadow" == l && goog.asserts.fail("Shadow block cannot be a top-level block.")
    }
    return i || Blockly.Events.setGroup(!1), Blockly.Field.stopCache(), o.updateVariableList(!1), o.setResizesEnabled && o.setResizesEnabled(!0), t
}, Blockly.Xml.appendDomToWorkspace = function(e, o) {
    if (o.hasOwnProperty("scale")) {
        var t = Blockly.BlockSvg.TAB_WIDTH;
        try {
            Blockly.BlockSvg.TAB_WIDTH = 0;
            var n = o.getBlocksBoundingBox()
        } finally {
            Blockly.BlockSvg.TAB_WIDTH = t
        }
    }
    if (t = Blockly.Xml.domToWorkspace(e, o), n && n.height) {
        var r = n.y + n.height,
            i = n.x,
            s = 1 / 0,
            l = 1 / 0;
        for (n = 0; n < t.length; n++) {
            var g = o.getBlockById(t[n]).getRelativeToSurfaceXY();
            g.y < l && (l = g.y), g.x < s && (s = g.x)
        }
        r = r - l + Blockly.BlockSvg.SEP_SPACE_Y, i -= s;
        var a;
        for (o.RTL && (a = o.getWidth()), n = 0; n < t.length; n++) o.getBlockById(t[n]).moveBy(o.RTL ? a - i : i, r)
    }
    return t
}, Blockly.Xml.domToBlock = function(e, o) {
    if (e instanceof Blockly.Workspace) {
        var t = e;
        e = o, o = t, console.warn("Deprecated call to Blockly.Xml.domToBlock, swap the arguments.")
    }
    Blockly.Events.disable();
    try {
        var n = Blockly.Xml.domToBlockHeadless_(e, o);
        if (o.rendered) {
            n.setConnectionsHidden(!0);
            for (var r = n.getDescendants(), i = r.length - 1; 0 <= i; i--) r[i].initSvg();
            for (i = r.length - 1; 0 <= i; i--) r[i].render(!1);
            setTimeout(function() {
                n.workspace && n.setConnectionsHidden(!1)
            }, 1), n.updateDisabled(), o.resizeContents()
        }
    } finally {
        Blockly.Events.enable()
    }
    return Blockly.Events.isEnabled() && Blockly.Events.fire(new Blockly.Events.Create(n)), n
}, Blockly.Xml.domToBlockHeadless_ = function(e, o) {
    var t = null,
        n = e.getAttribute("type");
    goog.asserts.assert(n, "Block type unspecified: %s", e.outerHTML);
    for (var r, i = e.getAttribute("id"), t = o.newBlock(n, i), s = null, i = 0; r = e.childNodes[i]; i++)
        if (3 != r.nodeType) {
            for (var l, g = s = null, a = 0; l = r.childNodes[a]; a++) 1 == l.nodeType && ("block" == l.nodeName.toLowerCase() ? s = l : "shadow" == l.nodeName.toLowerCase() && (g = l));
            switch (!s && g && (s = g), a = r.getAttribute("name"), r.nodeName.toLowerCase()) {
                case "mutation":
                    t.domToMutation && (t.domToMutation(r), t.initSvg && t.initSvg());
                    break;
                case "comment":
                    t.setCommentText(r.textContent);
                    var c = r.getAttribute("pinned");
                    c && !t.isInFlyout && setTimeout(function() {
                        t.comment && t.comment.setVisible && t.comment.setVisible("true" == c)
                    }, 1), s = parseInt(r.getAttribute("w"), 10), r = parseInt(r.getAttribute("h"), 10), !isNaN(s) && !isNaN(r) && t.comment && t.comment.setVisible && t.comment.setBubbleSize(s, r);
                    break;
                case "data":
                    t.data = r.textContent;
                    break;
                case "title":
                case "field":
                    if (!(s = t.getField(a))) {
                        console.warn("Ignoring non-existent field " + a + " in block " + n);
                        break
                    }
                    s.setValue(r.textContent);
                    break;
                case "value":
                case "statement":
                    if (!(r = t.getInput(a))) {
                        console.warn("Ignoring non-existent input " + a + " in block " + n);
                        break
                    }
                    g && r.connection.setShadowDom(g), s && (s = Blockly.Xml.domToBlockHeadless_(s, o), s.outputConnection ? r.connection.connect(s.outputConnection) : s.previousConnection ? r.connection.connect(s.previousConnection) : goog.asserts.fail("Child block does not have output or previous statement."));
                    break;
                case "next":
                    g && t.nextConnection && t.nextConnection.setShadowDom(g), s && (goog.asserts.assert(t.nextConnection, "Next statement does not exist."), goog.asserts.assert(!t.nextConnection.isConnected(), "Next statement is already connected."), s = Blockly.Xml.domToBlockHeadless_(s, o), goog.asserts.assert(s.previousConnection, "Next block does not have previous statement."), t.nextConnection.connect(s.previousConnection));
                    break;
                default:
                    console.warn("Ignoring unknown tag: " + r.nodeName)
            }
        }
    if ((i = e.getAttribute("inline")) && t.setInputsInline("true" == i), (i = e.getAttribute("disabled")) && t.setDisabled("true" == i), (i = e.getAttribute("deletable")) && t.setDeletable("true" == i), (i = e.getAttribute("movable")) && t.setMovable("true" == i), (i = e.getAttribute("editable")) && t.setEditable("true" == i), (i = e.getAttribute("collapsed")) && t.setCollapsed("true" == i), "shadow" == e.nodeName.toLowerCase()) {
        for (n = t.getChildren(), i = 0; r = n[i]; i++) goog.asserts.assert(r.isShadow(), "Shadow block not allowed non-shadow child.");
        goog.asserts.assert(0 == t.getVars().length, "Shadow blocks cannot have variable fields."), t.setShadow(!0)
    }
    return t
}, Blockly.Xml.deleteNext = function(e) {
    for (var o, t = 0; o = e.childNodes[t]; t++)
        if ("next" == o.nodeName.toLowerCase()) {
            e.removeChild(o);
            break
        }
}, goog.global.Blockly || (goog.global.Blockly = {}), goog.global.Blockly.Xml || (goog.global.Blockly.Xml = {}), goog.global.Blockly.Xml.domToText = Blockly.Xml.domToText, goog.global.Blockly.Xml.domToWorkspace = Blockly.Xml.domToWorkspace, goog.global.Blockly.Xml.textToDom = Blockly.Xml.textToDom, goog.global.Blockly.Xml.workspaceToDom = Blockly.Xml.workspaceToDom, Blockly.ZoomControls = function(e) {
    this.workspace_ = e
}, Blockly.ZoomControls.prototype.WIDTH_ = 32, Blockly.ZoomControls.prototype.HEIGHT_ = 110, Blockly.ZoomControls.prototype.MARGIN_BOTTOM_ = 20, Blockly.ZoomControls.prototype.MARGIN_SIDE_ = 20, Blockly.ZoomControls.prototype.svgGroup_ = null, Blockly.ZoomControls.prototype.left_ = 0, Blockly.ZoomControls.prototype.top_ = 0, Blockly.ZoomControls.prototype.createDom = function() {
    var e = this.workspace_;
	this.svgGroup_ = Blockly.utils.createSvgElement("g", {
        class: "blocklyZoom"
    }, null);
	//console.log(this.svgGroup_);
    var o = String(Math.random()).substring(2),
        t = Blockly.utils.createSvgElement("clipPath", {
            id: "blocklyZoomoutClipPath" + o
        }, this.svgGroup_);
    Blockly.utils.createSvgElement("rect", {
        width: 32,
        height: 32,
        y: 77
    }, t);
    var n = Blockly.utils.createSvgElement("image", {
        width: Blockly.SPRITE.width,
        height: Blockly.SPRITE.height,
        x: -64,
        y: -15,
        "clip-path": "url(#blocklyZoomoutClipPath" + o + ")"
    }, this.svgGroup_);
    n.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", e.options.pathToMedia + Blockly.SPRITE.url), t = Blockly.utils.createSvgElement("clipPath", {
        id: "blocklyZoominClipPath" + o
    }, this.svgGroup_), Blockly.utils.createSvgElement("rect", {
        width: 32,
        height: 32,
        y: 43
    }, t);
    var r = Blockly.utils.createSvgElement("image", {
        width: Blockly.SPRITE.width,
        height: Blockly.SPRITE.height,
        x: -32,
        y: -49,
        "clip-path": "url(#blocklyZoominClipPath" + o + ")"
    }, this.svgGroup_);
    return r.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", e.options.pathToMedia + Blockly.SPRITE.url), t = Blockly.utils.createSvgElement("clipPath", {
        id: "blocklyZoomresetClipPath" + o
    }, this.svgGroup_), Blockly.utils.createSvgElement("rect", {
        width: 32,
        height: 32
    }, t), (o = Blockly.utils.createSvgElement("image", {
        width: Blockly.SPRITE.width,
        height: Blockly.SPRITE.height,
        y: -92,
        "clip-path": "url(#blocklyZoomresetClipPath" + o + ")"
    }, this.svgGroup_)).setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", e.options.pathToMedia + Blockly.SPRITE.url), Blockly.bindEventWithChecks_(o, "mousedown", null, function(o) {
        e.markFocused(), e.setScale(e.options.zoomOptions.startScale), e.scrollCenter(), Blockly.Touch.clearTouchIdentifier(), o.stopPropagation(), o.preventDefault()
    }), Blockly.bindEventWithChecks_(r, "mousedown", null, function(o) {
        e.markFocused(), e.zoomCenter(1), Blockly.Touch.clearTouchIdentifier(), o.stopPropagation(), o.preventDefault()
    }), Blockly.bindEventWithChecks_(n, "mousedown", null, function(o) {
        e.markFocused(), e.zoomCenter(-1), Blockly.Touch.clearTouchIdentifier(), o.stopPropagation(), o.preventDefault()
    }), this.svgGroup_
}, Blockly.ZoomControls.prototype.init = function(e) {
    return this.bottom_ = this.MARGIN_BOTTOM_ + e, this.bottom_ + this.HEIGHT_
}, Blockly.ZoomControls.prototype.dispose = function() {
    this.svgGroup_ && (goog.dom.removeNode(this.svgGroup_), this.svgGroup_ = null), this.workspace_ = null
}, Blockly.ZoomControls.prototype.position = function() {
    var e = this.workspace_.getMetrics();
    e && (this.workspace_.RTL ? (this.left_ = this.MARGIN_SIDE_ + Blockly.Scrollbar.scrollbarThickness, e.toolboxPosition == Blockly.TOOLBOX_AT_LEFT && (this.left_ += e.flyoutWidth, this.workspace_.toolbox_ && (this.left_ += e.absoluteLeft))) : (this.left_ = e.viewWidth + e.absoluteLeft - this.WIDTH_ - this.MARGIN_SIDE_ - Blockly.Scrollbar.scrollbarThickness, e.toolboxPosition == Blockly.TOOLBOX_AT_RIGHT && (this.left_ -= e.flyoutWidth)), this.top_ = e.viewHeight + e.absoluteTop - this.HEIGHT_ - this.bottom_, e.toolboxPosition == Blockly.TOOLBOX_AT_BOTTOM && (this.top_ -= e.flyoutHeight), this.svgGroup_.setAttribute("transform", "translate(" + this.left_ + "," + this.top_ + ")"))
}, Blockly.WorkspaceSvg = function(e, o, t) {
    Blockly.WorkspaceSvg.superClass_.constructor.call(this, e), this.getMetrics = e.getMetrics || Blockly.WorkspaceSvg.getTopLevelWorkspaceMetrics_, this.setMetrics = e.setMetrics || Blockly.WorkspaceSvg.setTopLevelWorkspaceMetrics_, Blockly.ConnectionDB.init(this), o && (this.blockDragSurface_ = o), t && (this.workspaceDragSurface_ = t), this.useWorkspaceDragSurface_ = this.workspaceDragSurface_ && Blockly.utils.is3dSupported(), this.SOUNDS_ = Object.create(null), this.highlightedBlocks_ = [], this.registerToolboxCategoryCallback(Blockly.PROCEDURE_CATEGORY_NAME, Blockly.Procedures.flyoutCategory)
}, goog.inherits(Blockly.WorkspaceSvg, Blockly.Workspace), Blockly.WorkspaceSvg.prototype.resizeHandlerWrapper_ = null, Blockly.WorkspaceSvg.prototype.rendered = !0, Blockly.WorkspaceSvg.prototype.isFlyout = !1, Blockly.WorkspaceSvg.prototype.isMutator = !1, Blockly.WorkspaceSvg.prototype.dragMode_ = Blockly.DRAG_NONE, Blockly.WorkspaceSvg.prototype.resizesEnabled_ = !0, Blockly.WorkspaceSvg.prototype.scrollX = 0, Blockly.WorkspaceSvg.prototype.scrollY = 0, Blockly.WorkspaceSvg.prototype.startScrollX = 0, Blockly.WorkspaceSvg.prototype.startScrollY = 0, Blockly.WorkspaceSvg.prototype.dragDeltaXY_ = null, Blockly.WorkspaceSvg.prototype.scale = 1, Blockly.WorkspaceSvg.prototype.trashcan = null, Blockly.WorkspaceSvg.prototype.scrollbar = null, Blockly.WorkspaceSvg.prototype.blockDragSurface_ = null, Blockly.WorkspaceSvg.prototype.workspaceDragSurface_ = null, Blockly.WorkspaceSvg.prototype.useWorkspaceDragSurface_ = !1, Blockly.WorkspaceSvg.prototype.isDragSurfaceActive_ = !1, Blockly.WorkspaceSvg.prototype.lastSound_ = null, Blockly.WorkspaceSvg.prototype.lastRecordedPageScroll_ = null, Blockly.WorkspaceSvg.prototype.flyoutButtonCallbacks_ = {}, Blockly.WorkspaceSvg.prototype.toolboxCategoryCallbacks_ = {}, Blockly.WorkspaceSvg.prototype.inverseScreenCTM_ = null, Blockly.WorkspaceSvg.prototype.getInverseScreenCTM = function() {
    return this.inverseScreenCTM_
}, Blockly.WorkspaceSvg.prototype.updateInverseScreenCTM = function() {
    var e = this.getParentSvg().getScreenCTM();
    e && (this.inverseScreenCTM_ = e.inverse())
}, Blockly.WorkspaceSvg.prototype.getSvgXY = function(e) {
    var o = 0,
        t = 0,
        n = 1;
    (goog.dom.contains(this.getCanvas(), e) || goog.dom.contains(this.getBubbleCanvas(), e)) && (n = this.scale);
    do {
        var r = Blockly.utils.getRelativeXY(e);
        e != this.getCanvas() && e != this.getBubbleCanvas() || (n = 1), o += r.x * n, t += r.y * n, e = e.parentNode
    } while (e && e != this.getParentSvg());
    return new goog.math.Coordinate(o, t)
}, Blockly.WorkspaceSvg.prototype.setResizeHandlerWrapper = function(e) {
    this.resizeHandlerWrapper_ = e
}, Blockly.WorkspaceSvg.prototype.createDom = function(e) {
    if (this.svgGroup_ = Blockly.utils.createSvgElement("g", {
            class: "blocklyWorkspace"
        }, null), e && (this.svgBackground_ = Blockly.utils.createSvgElement("rect", {
            height: "100%",
            width: "100%",
            class: e
        }, this.svgGroup_), "blocklyMainBackground" == e && (this.svgBackground_.style.fill = "url(#" + this.options.gridPattern.id + ")")), this.svgBlockCanvas_ = Blockly.utils.createSvgElement("g", {
            class: "blocklyBlockCanvas"
        }, this.svgGroup_, this), this.svgBubbleCanvas_ = Blockly.utils.createSvgElement("g", {
            class: "blocklyBubbleCanvas"
        }, this.svgGroup_, this), e = Blockly.Scrollbar.scrollbarThickness, this.options.hasTrashcan && (e = this.addTrashcan_(e)), this.options.zoomOptions && this.options.zoomOptions.controls && (e = this.addZoomControls_(e)), !this.isFlyout) {
        Blockly.bindEventWithChecks_(this.svgGroup_, "mousedown", this, this.onMouseDown_);
        var o = this;
        Blockly.bindEvent_(this.svgGroup_, "touchstart", null, function(e) {
            Blockly.longStart_(e, o)
        }), this.options.zoomOptions && this.options.zoomOptions.wheel && Blockly.bindEventWithChecks_(this.svgGroup_, "wheel", this, this.onMouseWheel_)
    }
    return this.options.hasCategories && (this.toolbox_ = new Blockly.Toolbox(this)), this.updateGridPattern_(), this.recordDeleteAreas(), this.svgGroup_
}, Blockly.WorkspaceSvg.prototype.dispose = function() {
    this.rendered = !1, Blockly.WorkspaceSvg.superClass_.dispose.call(this), this.svgGroup_ && (goog.dom.removeNode(this.svgGroup_), this.svgGroup_ = null), this.svgBubbleCanvas_ = this.svgBlockCanvas_ = null, this.toolbox_ && (this.toolbox_.dispose(), this.toolbox_ = null), this.flyout_ && (this.flyout_.dispose(), this.flyout_ = null), this.trashcan && (this.trashcan.dispose(), this.trashcan = null), this.scrollbar && (this.scrollbar.dispose(), this.scrollbar = null), this.zoomControls_ && (this.zoomControls_.dispose(), this.zoomControls_ = null), this.toolboxCategoryCallbacks_ && (this.toolboxCategoryCallbacks_ = null), this.flyoutButtonCallbacks_ && (this.flyoutButtonCallbacks_ = null), this.options.parentWorkspace || goog.dom.removeNode(this.getParentSvg().parentNode), this.resizeHandlerWrapper_ && (Blockly.unbindEvent_(this.resizeHandlerWrapper_), this.resizeHandlerWrapper_ = null)
}, Blockly.WorkspaceSvg.prototype.newBlock = function(e, o) {
    return new Blockly.BlockSvg(this, e, o)
}, Blockly.WorkspaceSvg.prototype.addTrashcan_ = function(e) {
    this.trashcan = new Blockly.Trashcan(this);
    var o = this.trashcan.createDom();
    return this.svgGroup_.insertBefore(o, this.svgBlockCanvas_), this.trashcan.init(e)
}, Blockly.WorkspaceSvg.prototype.addZoomControls_ = function(e) {
    this.zoomControls_ = new Blockly.ZoomControls(this);
    var o = this.zoomControls_.createDom();
    return this.svgGroup_.appendChild(o), this.zoomControls_.init(e)
}, Blockly.WorkspaceSvg.prototype.addFlyout_ = function(e) {
    return this.flyout_ = new Blockly.Flyout({
        disabledPatternId: this.options.disabledPatternId,
        parentWorkspace: this,
        RTL: this.RTL,
        oneBasedIndex: this.options.oneBasedIndex,
        horizontalLayout: this.horizontalLayout,
        toolboxPosition: this.options.toolboxPosition
    }), this.flyout_.autoClose = !1, this.flyout_.createDom(e)
}, Blockly.WorkspaceSvg.prototype.getFlyout_ = function() {
    return this.flyout_ ? this.flyout_ : this.toolbox_ ? this.toolbox_.flyout_ : null
}, Blockly.WorkspaceSvg.prototype.updateScreenCalculations_ = function() {
    this.updateInverseScreenCTM(), this.recordDeleteAreas()
}, Blockly.WorkspaceSvg.prototype.resizeContents = function() {
    this.resizesEnabled_ && this.rendered && (this.scrollbar && this.scrollbar.resize(), this.updateInverseScreenCTM())
}, Blockly.WorkspaceSvg.prototype.resize = function() {
    this.toolbox_ && this.toolbox_.position(), this.flyout_ && this.flyout_.position(), this.trashcan && this.trashcan.position(), this.zoomControls_ && this.zoomControls_.position(), this.scrollbar && this.scrollbar.resize(), this.updateScreenCalculations_()
}, Blockly.WorkspaceSvg.prototype.updateScreenCalculationsIfScrolled = function() {
    var e = goog.dom.getDocumentScroll();
    goog.math.Coordinate.equals(this.lastRecordedPageScroll_, e) || (this.lastRecordedPageScroll_ = e, this.updateScreenCalculations_())
}, Blockly.WorkspaceSvg.prototype.getCanvas = function() {
    return this.svgBlockCanvas_
}, Blockly.WorkspaceSvg.prototype.getBubbleCanvas = function() {
    return this.svgBubbleCanvas_
}, Blockly.WorkspaceSvg.prototype.getParentSvg = function() {
    if (this.cachedParentSvg_) return this.cachedParentSvg_;
    for (var e = this.svgGroup_; e;) {
        if ("svg" == e.tagName) return this.cachedParentSvg_ = e;
        e = e.parentNode
    }
    return null
}, Blockly.WorkspaceSvg.prototype.translate = function(e, o) {
    if (this.useWorkspaceDragSurface_ && this.isDragSurfaceActive_) this.workspaceDragSurface_.translateSurface(e, o);
    else {
        var t = "translate(" + e + "," + o + ") scale(" + this.scale + ")";
        this.svgBlockCanvas_.setAttribute("transform", t), this.svgBubbleCanvas_.setAttribute("transform", t)
    }
    this.blockDragSurface_ && this.blockDragSurface_.translateAndScaleGroup(e, o, this.scale)
}, Blockly.WorkspaceSvg.prototype.resetDragSurface = function() {
    if (this.useWorkspaceDragSurface_) {
        this.isDragSurfaceActive_ = !1;
        var e = this.workspaceDragSurface_.getSurfaceTranslation();
        this.workspaceDragSurface_.clearAndHide(this.svgGroup_), e = "translate(" + e.x + "," + e.y + ") scale(" + this.scale + ")", this.svgBlockCanvas_.setAttribute("transform", e), this.svgBubbleCanvas_.setAttribute("transform", e)
    }
}, Blockly.WorkspaceSvg.prototype.setupDragSurface = function() {
    if (this.useWorkspaceDragSurface_ && !this.isDragSurfaceActive_) {
        this.isDragSurfaceActive_ = !0;
        var e = this.svgBlockCanvas_.previousSibling,
            o = this.getParentSvg().getAttribute("width"),
            t = this.getParentSvg().getAttribute("height"),
            n = Blockly.utils.getRelativeXY(this.svgBlockCanvas_);
        this.workspaceDragSurface_.setContentsAndShow(this.svgBlockCanvas_, this.svgBubbleCanvas_, e, o, t, this.scale), this.workspaceDragSurface_.translateSurface(n.x, n.y)
    }
}, Blockly.WorkspaceSvg.prototype.getWidth = function() {
    var e = this.getMetrics();
    return e ? e.viewWidth / this.scale : 0
}, Blockly.WorkspaceSvg.prototype.setVisible = function(e) {
    this.scrollbar && this.scrollbar.setContainerVisible(e), this.getFlyout_() && this.getFlyout_().setContainerVisible(e), this.getParentSvg().style.display = e ? "block" : "none", this.toolbox_ && (this.toolbox_.HtmlDiv.style.display = e ? "block" : "none"), e ? (this.render(), this.toolbox_ && this.toolbox_.position()) : Blockly.hideChaff(!0)
}, Blockly.WorkspaceSvg.prototype.render = function() {
    for (var e = this.getAllBlocks(), o = e.length - 1; 0 <= o; o--) e[o].render(!1)
}, Blockly.WorkspaceSvg.prototype.traceOn = function() {
    console.warn("Deprecated call to traceOn, delete this.")
}, Blockly.WorkspaceSvg.prototype.highlightBlock = function(e, o) {
    if (void 0 === o) {
        for (var t, n = 0; t = this.highlightedBlocks_[n]; n++) t.setHighlighted(!1);
        this.highlightedBlocks_.length = 0
    }(t = e ? this.getBlockById(e) : null) && ((n = void 0 === o || o) ? -1 == this.highlightedBlocks_.indexOf(t) && this.highlightedBlocks_.push(t) : goog.array.remove(this.highlightedBlocks_, t), t.setHighlighted(n))
}, Blockly.WorkspaceSvg.prototype.paste = function(e) {
    if (this.rendered && !(e.getElementsByTagName("block").length >= this.remainingCapacity())) {
        Blockly.terminateDrag_(), Blockly.Events.disable();
        try {
            var o = Blockly.Xml.domToBlock(e, this),
                t = parseInt(e.getAttribute("x"), 10),
                n = parseInt(e.getAttribute("y"), 10);
            if (!isNaN(t) && !isNaN(n)) {
                this.RTL && (t = -t);
                do {
                    var r = !1,
                        i = this.getAllBlocks();
                    e = 0;
                    for (var s; s = i[e]; e++) {
                        var l = s.getRelativeToSurfaceXY();
                        if (1 >= Math.abs(t - l.x) && 1 >= Math.abs(n - l.y)) {
                            r = !0;
                            break
                        }
                    }
                    if (!r) {
                        var g = o.getConnections_(!1);
                        e = 0;
                        for (var a; a = g[e]; e++)
                            if (a.closest(Blockly.SNAP_RADIUS, new goog.math.Coordinate(t, n)).connection) {
                                r = !0;
                                break
                            }
                    }
                    r && (t = this.RTL ? t - Blockly.SNAP_RADIUS : t + Blockly.SNAP_RADIUS, n += 2 * Blockly.SNAP_RADIUS)
                } while (r);
                o.moveBy(t, n)
            }
        } finally {
            Blockly.Events.enable()
        }
        Blockly.Events.isEnabled() && !o.isShadow() && Blockly.Events.fire(new Blockly.Events.Create(o)), o.select()
    }
}, Blockly.WorkspaceSvg.prototype.createVariable = function(e) {
    Blockly.WorkspaceSvg.superClass_.createVariable.call(this, e), this.toolbox_ && this.toolbox_.flyout_ && !Blockly.Flyout.startFlyout_ && this.toolbox_.refreshSelection()
}, Blockly.WorkspaceSvg.prototype.recordDeleteAreas = function() {
    this.deleteAreaTrash_ = this.trashcan ? this.trashcan.getClientRect() : null, this.deleteAreaToolbox_ = this.flyout_ ? this.flyout_.getClientRect() : this.toolbox_ ? this.toolbox_.getClientRect() : null
}, Blockly.WorkspaceSvg.prototype.isDeleteArea = function(e) {
    return e = new goog.math.Coordinate(e.clientX, e.clientY), this.deleteAreaTrash_ && this.deleteAreaTrash_.contains(e) ? Blockly.DELETE_AREA_TRASH : this.deleteAreaToolbox_ && this.deleteAreaToolbox_.contains(e) ? Blockly.DELETE_AREA_TOOLBOX : null
}, Blockly.WorkspaceSvg.prototype.onMouseDown_ = function(e) {
    this.markFocused(), Blockly.utils.isTargetInput(e) ? Blockly.Touch.clearTouchIdentifier() : (Blockly.terminateDrag_(), Blockly.hideChaff(), e.target && e.target.nodeName && ("svg" == e.target.nodeName.toLowerCase() || e.target == this.svgBackground_) && Blockly.selected && !this.options.readOnly && Blockly.selected.unselect(), Blockly.utils.isRightButton(e) ? (this.showContextMenu_(e), Blockly.onMouseUp_(e), Blockly.Touch.clearTouchIdentifier()) : this.scrollbar ? (this.dragMode_ = Blockly.DRAG_BEGIN, this.startDragMouseX = e.clientX, this.startDragMouseY = e.clientY, this.startDragMetrics = this.getMetrics(), this.startScrollX = this.scrollX, this.startScrollY = this.scrollY, this.setupDragSurface(), "mouseup" in Blockly.Touch.TOUCH_MAP && (Blockly.Touch.onTouchUpWrapper_ = Blockly.Touch.onTouchUpWrapper_ || [], Blockly.Touch.onTouchUpWrapper_ = Blockly.Touch.onTouchUpWrapper_.concat(Blockly.bindEventWithChecks_(document, "mouseup", null, Blockly.onMouseUp_))), Blockly.onMouseMoveWrapper_ = Blockly.onMouseMoveWrapper_ || [], Blockly.onMouseMoveWrapper_ = Blockly.onMouseMoveWrapper_.concat(Blockly.bindEventWithChecks_(document, "mousemove", null, Blockly.onMouseMove_))) : Blockly.Touch.clearTouchIdentifier(), e.stopPropagation(), e.preventDefault())
}, Blockly.WorkspaceSvg.prototype.startDrag = function(e, o) {
    var t = Blockly.utils.mouseToSvg(e, this.getParentSvg(), this.getInverseScreenCTM());
    t.x /= this.scale, t.y /= this.scale, this.dragDeltaXY_ = goog.math.Coordinate.difference(o, t)
}, Blockly.WorkspaceSvg.prototype.moveDrag = function(e) {
    return e = Blockly.utils.mouseToSvg(e, this.getParentSvg(), this.getInverseScreenCTM()), e.x /= this.scale, e.y /= this.scale, goog.math.Coordinate.sum(this.dragDeltaXY_, e)
}, Blockly.WorkspaceSvg.prototype.isDragging = function() {
    return Blockly.dragMode_ == Blockly.DRAG_FREE || Blockly.Flyout.startFlyout_ && Blockly.Flyout.startFlyout_.dragMode_ == Blockly.DRAG_FREE || this.dragMode_ == Blockly.DRAG_FREE
}, Blockly.WorkspaceSvg.prototype.isDraggable = function() {
    return !!this.scrollbar
}, Blockly.WorkspaceSvg.prototype.onMouseWheel_ = function(e) {
    Blockly.terminateDrag_();
    var o = -e.deltaY / 50,
        t = Blockly.utils.mouseToSvg(e, this.getParentSvg(), this.getInverseScreenCTM());
    this.zoom(t.x, t.y, o), e.preventDefault()
}, Blockly.WorkspaceSvg.prototype.getBlocksBoundingBox = function() {
    var e = this.getTopBlocks(!1);
    if (!e.length) return {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    };
    for (var o = e[0].getBoundingRectangle(), t = 1; t < e.length; t++) {
        var n = e[t].getBoundingRectangle();
        n.topLeft.x < o.topLeft.x && (o.topLeft.x = n.topLeft.x), n.bottomRight.x > o.bottomRight.x && (o.bottomRight.x = n.bottomRight.x), n.topLeft.y < o.topLeft.y && (o.topLeft.y = n.topLeft.y), n.bottomRight.y > o.bottomRight.y && (o.bottomRight.y = n.bottomRight.y)
    }
    return {
        x: o.topLeft.x,
        y: o.topLeft.y,
        width: o.bottomRight.x - o.topLeft.x,
        height: o.bottomRight.y - o.topLeft.y
    }
}, Blockly.WorkspaceSvg.prototype.cleanUp = function() {
    Blockly.Events.setGroup(!0);
    for (var e, o = this.getTopBlocks(!0), t = 0, n = 0; e = o[n]; n++) {
        var r = e.getRelativeToSurfaceXY();
        e.moveBy(-r.x, t - r.y), e.snapToGrid(), t = e.getRelativeToSurfaceXY().y + e.getHeightWidth().height + Blockly.BlockSvg.MIN_BLOCK_Y
    }
    Blockly.Events.setGroup(!1), this.resizeContents()
}, Blockly.WorkspaceSvg.prototype.showContextMenu_ = function(e) {
    function o(e) {
        if (e.isDeletable()) u = u.concat(e.getDescendants());
        else {
            e = e.getChildren();
            for (var t = 0; t < e.length; t++) o(e[t])
        }
    }

    function t() {
        Blockly.Events.setGroup(i);
        var e = u.shift();
        e && (e.workspace ? (e.dispose(!1, !0), setTimeout(t, 10)) : t()), Blockly.Events.setGroup(!1)
    }
    if (!this.options.readOnly && !this.isFlyout) {
        var n = [],
            r = this.getTopBlocks(!0),
            i = Blockly.utils.genUid(),
            s = {};
        if (s.text = Blockly.Msg.UNDO, s.enabled = 0 < this.undoStack_.length, s.callback = this.undo.bind(this, !1), n.push(s), s = {}, s.text = Blockly.Msg.REDO, s.enabled = 0 < this.redoStack_.length, s.callback = this.undo.bind(this, !0), n.push(s), this.scrollbar && (s = {}, s.text = Blockly.Msg.CLEAN_UP, s.enabled = 1 < r.length, s.callback = this.cleanUp.bind(this), n.push(s)), this.options.collapse) {
            for (var l = s = !1, g = 0; g < r.length; g++)
                for (var a = r[g]; a;) a.isCollapsed() ? s = !0 : l = !0, a = a.getNextBlock();
            var c = function(e) {
                for (var o = 0, t = 0; t < r.length; t++)
                    for (var n = r[t]; n;) setTimeout(n.setCollapsed.bind(n, e), o), n = n.getNextBlock(), o += 10
            };
            (l = {
                enabled: l
            }).text = Blockly.Msg.COLLAPSE_ALL, l.callback = function() {
                c(!0)
            }, n.push(l), (s = {
                enabled: s
            }).text = Blockly.Msg.EXPAND_ALL, s.callback = function() {
                c(!1)
            }, n.push(s)
        }
        for (var u = [], g = 0; g < r.length; g++) o(r[g]);
        s = {
            text: 1 == u.length ? Blockly.Msg.DELETE_BLOCK : Blockly.Msg.DELETE_X_BLOCKS.replace("%1", String(u.length)),
            enabled: 0 < u.length,
            callback: function() {
                2 > u.length ? t() : Blockly.confirm(Blockly.Msg.DELETE_ALL_BLOCKS.replace("%1", u.length), function(e) {
                    e && t()
                })
            }
        }, n.push(s), Blockly.ContextMenu.show(e, n, this.RTL)
    }
}, Blockly.WorkspaceSvg.prototype.loadAudio_ = function(e, o) {
    if (e.length) {
        try {
            var t = new window.Audio
        } catch (e) {
            return
        }
        for (var n, r = 0; r < e.length; r++) {
            var i = e[r],
                s = i.match(/\.(\w+)$/);
            if (s && t.canPlayType("audio/" + s[1])) {
                n = new window.Audio(i);
                break
            }
        }
        n && n.play && (this.SOUNDS_[o] = n)
    }
}, Blockly.WorkspaceSvg.prototype.preloadAudio_ = function() {
    for (var e in this.SOUNDS_) {
        var o = this.SOUNDS_[e];
        if (o.volume = .01, o.play(), o.pause(), goog.userAgent.IPAD || goog.userAgent.IPHONE) break
    }
}, Blockly.WorkspaceSvg.prototype.playAudio = function(e, o) {
    var t = this.SOUNDS_[e];
    if (t) {
        var n = new Date;
        n - this.lastSound_ < Blockly.SOUND_LIMIT || (this.lastSound_ = n, t = goog.userAgent.DOCUMENT_MODE && 9 === goog.userAgent.DOCUMENT_MODE || goog.userAgent.IPAD || goog.userAgent.ANDROID ? t : t.cloneNode(), t.volume = void 0 === o ? 1 : o, t.play())
    } else this.options.parentWorkspace && this.options.parentWorkspace.playAudio(e, o)
}, Blockly.WorkspaceSvg.prototype.updateToolbox = function(e) {
    if (e = Blockly.Options.parseToolboxTree(e)) {
        if (!this.options.languageTree) throw "Existing toolbox is null.  Can't create new toolbox.";
        if (e.getElementsByTagName("category").length) {
            if (!this.toolbox_) throw "Existing toolbox has no categories.  Can't change mode.";
            this.options.languageTree = e, this.toolbox_.populate_(e), this.toolbox_.addColour_()
        } else {
            if (!this.flyout_) throw "Existing toolbox has categories.  Can't change mode.";
            this.options.languageTree = e, this.flyout_.show(e.childNodes)
        }
    } else if (this.options.languageTree) throw "Can't nullify an existing toolbox."
}, Blockly.WorkspaceSvg.prototype.markFocused = function() {
    this.options.parentWorkspace ? this.options.parentWorkspace.markFocused() : (Blockly.mainWorkspace = this, this.setBrowserFocus())
}, Blockly.WorkspaceSvg.prototype.setBrowserFocus = function() {
    document.activeElement && document.activeElement.blur();
    try {
        this.getParentSvg().focus()
    } catch (e) {
        try {
            this.getParentSvg().parentNode.setActive()
        } catch (e) {
            this.getParentSvg().parentNode.focus()
        }
    }
}, Blockly.WorkspaceSvg.prototype.zoom = function(e, o, t) {
    var n = this.options.zoomOptions.scaleSpeed,
        r = this.getMetrics(),
        i = this.getParentSvg().createSVGPoint();
    i.x = e, i.y = o, e = (i = i.matrixTransform(this.getCanvas().getCTM().inverse())).x, o = i.y, i = this.getCanvas(), n = Math.pow(n, t), (t = this.scale * n) > this.options.zoomOptions.maxScale ? n = this.options.zoomOptions.maxScale / this.scale : t < this.options.zoomOptions.minScale && (n = this.options.zoomOptions.minScale / this.scale), this.scale != t && (this.scrollbar && (e = i.getCTM().translate(e * (1 - n), o * (1 - n)).scale(n), this.scrollX = e.e - r.absoluteLeft, this.scrollY = e.f - r.absoluteTop), this.setScale(t))
}, Blockly.WorkspaceSvg.prototype.zoomCenter = function(e) {
    var o = this.getMetrics();
    this.zoom(o.viewWidth / 2, o.viewHeight / 2, e)
}, Blockly.WorkspaceSvg.prototype.zoomToFit = function() {
    var e = this.getMetrics(),
        o = (t = this.getBlocksBoundingBox()).width,
        t = t.height;
    if (o) {
        var n = e.viewWidth,
            r = e.viewHeight;
        this.flyout_ && (n -= this.flyout_.width_), this.scrollbar || (o += e.contentLeft, t += e.contentTop), this.setScale(Math.min(n / o, r / t)), this.scrollCenter()
    }
}, Blockly.WorkspaceSvg.prototype.scrollCenter = function() {
    if (this.scrollbar) {
        var e = this.getMetrics(),
            o = (e.contentWidth - e.viewWidth) / 2;
        this.flyout_ && (o -= this.flyout_.width_ / 2), this.scrollbar.set(o, (e.contentHeight - e.viewHeight) / 2)
    }
}, Blockly.WorkspaceSvg.prototype.setScale = function(e) {
    this.options.zoomOptions.maxScale && e > this.options.zoomOptions.maxScale ? e = this.options.zoomOptions.maxScale : this.options.zoomOptions.minScale && e < this.options.zoomOptions.minScale && (e = this.options.zoomOptions.minScale), this.scale = e, this.updateGridPattern_(), this.scrollbar ? this.scrollbar.resize() : this.translate(this.scrollX, this.scrollY), Blockly.hideChaff(!1), this.flyout_ && this.flyout_.reflow()
}, Blockly.WorkspaceSvg.prototype.updateGridPattern_ = function() {
    if (this.options.gridPattern) {
        r = this.options.gridOptions.spacing * this.scale || 100;
        this.options.gridPattern.setAttribute("width", r), this.options.gridPattern.setAttribute("height", r);
        var e = (r = Math.floor(this.options.gridOptions.spacing / 2) + .5) - this.options.gridOptions.length / 2,
            o = r + this.options.gridOptions.length / 2,
            t = this.options.gridPattern.firstChild,
            n = t && t.nextSibling,
            r = r * this.scale,
            e = e * this.scale,
            o = o * this.scale;
        t && (t.setAttribute("stroke-width", this.scale), t.setAttribute("x1", e), t.setAttribute("y1", r), t.setAttribute("x2", o), t.setAttribute("y2", r)), n && (n.setAttribute("stroke-width", this.scale), n.setAttribute("x1", r), n.setAttribute("y1", e), n.setAttribute("x2", r), n.setAttribute("y2", o))
    }
}, Blockly.WorkspaceSvg.getTopLevelWorkspaceMetrics_ = function() {
    var e = Blockly.svgSize(this.getParentSvg());
    this.toolbox_ && (this.toolboxPosition == Blockly.TOOLBOX_AT_TOP || this.toolboxPosition == Blockly.TOOLBOX_AT_BOTTOM ? e.height -= this.toolbox_.getHeight() : this.toolboxPosition != Blockly.TOOLBOX_AT_LEFT && this.toolboxPosition != Blockly.TOOLBOX_AT_RIGHT || (e.width -= this.toolbox_.getWidth()));
    var o = Blockly.Flyout.prototype.CORNER_RADIUS - 1,
        t = e.width - o,
        n = e.height - o,
        r = this.getBlocksBoundingBox(),
        i = r.width * this.scale,
        s = r.height * this.scale,
        l = r.x * this.scale,
        g = r.y * this.scale;
    return this.scrollbar ? (o = Math.min(l - t / 2, l + i - t), i = Math.max(l + i + t / 2, l + t), t = Math.min(g - n / 2, g + s - n), n = Math.max(g + s + n / 2, g + n)) : (o = r.x, i = o + r.width, t = r.y, n = t + r.height), r = 0, this.toolbox_ && this.toolboxPosition == Blockly.TOOLBOX_AT_LEFT && (r = this.toolbox_.getWidth()), s = 0, this.toolbox_ && this.toolboxPosition == Blockly.TOOLBOX_AT_TOP && (s = this.toolbox_.getHeight()), {
        viewHeight: e.height,
        viewWidth: e.width,
        contentHeight: n - t,
        contentWidth: i - o,
        viewTop: -this.scrollY,
        viewLeft: -this.scrollX,
        contentTop: t,
        contentLeft: o,
        absoluteTop: s,
        absoluteLeft: r,
        toolboxWidth: this.toolbox_ ? this.toolbox_.getWidth() : 0,
        toolboxHeight: this.toolbox_ ? this.toolbox_.getHeight() : 0,
        flyoutWidth: this.flyout_ ? this.flyout_.getWidth() : 0,
        flyoutHeight: this.flyout_ ? this.flyout_.getHeight() : 0,
        toolboxPosition: this.toolboxPosition
    }
}, Blockly.WorkspaceSvg.setTopLevelWorkspaceMetrics_ = function(e) {
    if (!this.scrollbar) throw "Attempt to set top level workspace scroll without scrollbars.";
    var o = this.getMetrics();
    goog.isNumber(e.x) && (this.scrollX = -o.contentWidth * e.x - o.contentLeft), goog.isNumber(e.y) && (this.scrollY = -o.contentHeight * e.y - o.contentTop), e = this.scrollX + o.absoluteLeft, o = this.scrollY + o.absoluteTop, this.translate(e, o), this.options.gridPattern && (this.options.gridPattern.setAttribute("x", e), this.options.gridPattern.setAttribute("y", o), (goog.userAgent.IE || goog.userAgent.EDGE) && this.updateGridPattern_())
}, Blockly.WorkspaceSvg.prototype.setResizesEnabled = function(e) {
    var o = !this.resizesEnabled_ && e;
    this.resizesEnabled_ = e, o && this.resizeContents()
}, Blockly.WorkspaceSvg.prototype.clear = function() {
    this.setResizesEnabled(!1), Blockly.WorkspaceSvg.superClass_.clear.call(this), this.setResizesEnabled(!0)
}, Blockly.WorkspaceSvg.prototype.registerButtonCallback = function(e, o) {
    goog.asserts.assert(goog.isFunction(o), "Button callbacks must be functions."), this.flyoutButtonCallbacks_[e] = o
}, Blockly.WorkspaceSvg.prototype.getButtonCallback = function(e) {
    return (e = this.flyoutButtonCallbacks_[e]) ? e : null
}, Blockly.WorkspaceSvg.prototype.removeButtonCallback = function(e) {
    this.flyoutButtonCallbacks_[e] = null
}, Blockly.WorkspaceSvg.prototype.registerToolboxCategoryCallback = function(e, o) {
    goog.asserts.assert(goog.isFunction(o), "Toolbox category callbacks must be functions."), this.toolboxCategoryCallbacks_[e] = o
}, Blockly.WorkspaceSvg.prototype.getToolboxCategoryCallback = function(e) {
    return (e = this.toolboxCategoryCallbacks_[e]) ? e : null
}, Blockly.WorkspaceSvg.prototype.removeToolboxCategoryCallback = function(e) {
    this.toolboxCategoryCallbacks_[e] = null
}, Blockly.WorkspaceSvg.prototype.setVisible = Blockly.WorkspaceSvg.prototype.setVisible, Blockly.Mutator = function(e) {
    Blockly.Mutator.superClass_.constructor.call(this, null), this.quarkNames_ = e
}, goog.inherits(Blockly.Mutator, Blockly.Icon), Blockly.Mutator.prototype.workspaceWidth_ = 0, Blockly.Mutator.prototype.workspaceHeight_ = 0, Blockly.Mutator.prototype.drawIcon_ = function(e) {
    Blockly.utils.createSvgElement("rect", {
        class: "blocklyIconShape",
        rx: "4",
        ry: "4",
        height: "16",
        width: "16"
    }, e), Blockly.utils.createSvgElement("path", {
        class: "blocklyIconSymbol",
        d: "m4.203,7.296 0,1.368 -0.92,0.677 -0.11,0.41 0.9,1.559 0.41,0.11 1.043,-0.457 1.187,0.683 0.127,1.134 0.3,0.3 1.8,0 0.3,-0.299 0.127,-1.138 1.185,-0.682 1.046,0.458 0.409,-0.11 0.9,-1.559 -0.11,-0.41 -0.92,-0.677 0,-1.366 0.92,-0.677 0.11,-0.41 -0.9,-1.559 -0.409,-0.109 -1.046,0.458 -1.185,-0.682 -0.127,-1.138 -0.3,-0.299 -1.8,0 -0.3,0.3 -0.126,1.135 -1.187,0.682 -1.043,-0.457 -0.41,0.11 -0.899,1.559 0.108,0.409z"
    }, e), Blockly.utils.createSvgElement("circle", {
        class: "blocklyIconShape",
        r: "2.7",
        cx: "8",
        cy: "8"
    }, e)
}, Blockly.Mutator.prototype.iconClick_ = function(e) {
    this.block_.isEditable() && Blockly.Icon.prototype.iconClick_.call(this, e)
}, Blockly.Mutator.prototype.createEditor_ = function() {
    if (this.svgDialog_ = Blockly.utils.createSvgElement("svg", {
            x: Blockly.Bubble.BORDER_WIDTH,
            y: Blockly.Bubble.BORDER_WIDTH
        }, null), this.quarkNames_.length)
        for (var e, o = goog.dom.createDom("xml"), t = 0; e = this.quarkNames_[t]; t++) o.appendChild(goog.dom.createDom("block", {
            type: e
        }));
    else o = null;
    return o = {
        languageTree: o,
        parentWorkspace: this.block_.workspace,
        pathToMedia: this.block_.workspace.options.pathToMedia,
        RTL: this.block_.RTL,
        toolboxPosition: this.block_.RTL ? Blockly.TOOLBOX_AT_RIGHT : Blockly.TOOLBOX_AT_LEFT,
        horizontalLayout: !1,
        getMetrics: this.getFlyoutMetrics_.bind(this),
        setMetrics: null
    }, this.workspace_ = new Blockly.WorkspaceSvg(o), this.workspace_.isMutator = !0, o = this.workspace_.addFlyout_("g"), (t = this.workspace_.createDom("blocklyMutatorBackground")).insertBefore(o, this.workspace_.svgBlockCanvas_), this.svgDialog_.appendChild(t), this.svgDialog_
}, Blockly.Mutator.prototype.updateEditable = function() {
    this.block_.isInFlyout || (this.block_.isEditable() ? this.iconGroup_ && Blockly.utils.removeClass(this.iconGroup_, "blocklyIconGroupReadonly") : (this.setVisible(!1), this.iconGroup_ && Blockly.utils.addClass(this.iconGroup_, "blocklyIconGroupReadonly"))), Blockly.Icon.prototype.updateEditable.call(this)
}, Blockly.Mutator.prototype.resizeBubble_ = function() {
    var e = 2 * Blockly.Bubble.BORDER_WIDTH,
        o = this.workspace_.getCanvas().getBBox(),
        t = this.block_.RTL ? -o.x : o.width + o.x;
    if (o = o.height + 3 * e, this.workspace_.flyout_) var n = this.workspace_.flyout_.getMetrics_(),
        o = Math.max(o, n.contentHeight + 20);
    t += 3 * e, (Math.abs(this.workspaceWidth_ - t) > e || Math.abs(this.workspaceHeight_ - o) > e) && (this.workspaceWidth_ = t, this.workspaceHeight_ = o, this.bubble_.setBubbleSize(t + e, o + e), this.svgDialog_.setAttribute("width", this.workspaceWidth_), this.svgDialog_.setAttribute("height", this.workspaceHeight_)), this.block_.RTL && (e = "translate(" + this.workspaceWidth_ + ",0)", this.workspace_.getCanvas().setAttribute("transform", e)), this.workspace_.resize()
}, Blockly.Mutator.prototype.setVisible = function(e) {
    if (e != this.isVisible())
        if (Blockly.Events.fire(new Blockly.Events.Ui(this.block_, "mutatorOpen", !e, e)), e) {
            this.bubble_ = new Blockly.Bubble(this.block_.workspace, this.createEditor_(), this.block_.svgPath_, this.iconXY_, null, null), (e = this.workspace_.options.languageTree) && (this.workspace_.flyout_.init(this.workspace_), this.workspace_.flyout_.show(e.childNodes)), this.rootBlock_ = this.block_.decompose(this.workspace_), e = this.rootBlock_.getDescendants();
            for (var o, t = 0; o = e[t]; t++) o.render();
            if (this.rootBlock_.setMovable(!1), this.rootBlock_.setDeletable(!1), this.workspace_.flyout_ ? (t = 2 * this.workspace_.flyout_.CORNER_RADIUS, e = this.workspace_.flyout_.width_ + t) : e = t = 16, this.block_.RTL && (e = -e), this.rootBlock_.moveBy(e, t), this.block_.saveConnections) {
                var n = this;
                this.block_.saveConnections(this.rootBlock_), this.sourceListener_ = function() {
                    n.block_.saveConnections(n.rootBlock_)
                }, this.block_.workspace.addChangeListener(this.sourceListener_)
            }
            this.resizeBubble_(), this.workspace_.addChangeListener(this.workspaceChanged_.bind(this)), this.updateColour()
        } else this.svgDialog_ = null, this.workspace_.dispose(), this.rootBlock_ = this.workspace_ = null, this.bubble_.dispose(), this.bubble_ = null, this.workspaceHeight_ = this.workspaceWidth_ = 0, this.sourceListener_ && (this.block_.workspace.removeChangeListener(this.sourceListener_), this.sourceListener_ = null)
}, Blockly.Mutator.prototype.workspaceChanged_ = function() {
    var e;
    if (Blockly.dragMode_ == Blockly.DRAG_NONE)
        for (var o = this.workspace_.getTopBlocks(!1), t = 0; e = o[t]; t++) {
            var n = e.getRelativeToSurfaceXY(),
                r = e.getHeightWidth();
            20 > n.y + r.height && e.moveBy(0, 20 - r.height - n.y)
        }
    if (this.rootBlock_.workspace == this.workspace_) {
        if (Blockly.Events.setGroup(!0), e = this.block_, o = (o = e.mutationToDom()) && Blockly.Xml.domToText(o), t = e.rendered, e.rendered = !1, e.compose(this.rootBlock_), e.rendered = t, e.initSvg(), t = (t = e.mutationToDom()) && Blockly.Xml.domToText(t), o != t) {
            Blockly.Events.fire(new Blockly.Events.Change(e, "mutation", null, o, t));
            var i = Blockly.Events.getGroup();
            setTimeout(function() {
                Blockly.Events.setGroup(i), e.bumpNeighbours_(), Blockly.Events.setGroup(!1)
            }, Blockly.BUMP_DELAY)
        }
        e.rendered && e.render(), this.resizeBubble_(), Blockly.Events.setGroup(!1)
    }
}, Blockly.Mutator.prototype.getFlyoutMetrics_ = function() {
    return {
        viewHeight: this.workspaceHeight_,
        viewWidth: this.workspaceWidth_,
        absoluteTop: 0,
        absoluteLeft: 0
    }
}, Blockly.Mutator.prototype.dispose = function() {
    this.block_.mutator = null, Blockly.Icon.prototype.dispose.call(this)
}, Blockly.Mutator.reconnect = function(e, o, t) {
    if (!e || !e.getSourceBlock().workspace) return !1;
    t = o.getInput(t).connection;
    var n = e.targetBlock();
    return !(n && n != o || t.targetConnection == e) && (t.isConnected() && t.disconnect(), t.connect(e), !0)
}, goog.global.Blockly || (goog.global.Blockly = {}), goog.global.Blockly.Mutator || (goog.global.Blockly.Mutator = {}), goog.global.Blockly.Mutator.reconnect = Blockly.Mutator.reconnect, Blockly.Warning = function(e) {
    Blockly.Warning.superClass_.constructor.call(this, e), this.createIcon(), this.text_ = {}
}, goog.inherits(Blockly.Warning, Blockly.Icon), Blockly.Warning.prototype.collapseHidden = !1, Blockly.Warning.prototype.drawIcon_ = function(e) {
    Blockly.utils.createSvgElement("path", {
        class: "blocklyIconShape",
        d: "M2,15Q-1,15 0.5,12L6.5,1.7Q8,-1 9.5,1.7L15.5,12Q17,15 14,15z"
    }, e), Blockly.utils.createSvgElement("path", {
        class: "blocklyIconSymbol",
        d: "m7,4.8v3.16l0.27,2.27h1.46l0.27,-2.27v-3.16z"
    }, e), Blockly.utils.createSvgElement("rect", {
        class: "blocklyIconSymbol",
        x: "7",
        y: "11",
        height: "2",
        width: "2"
    }, e)
}, Blockly.Warning.textToDom_ = function(e) {
    var o = Blockly.utils.createSvgElement("text", {
        class: "blocklyText blocklyBubbleText",
        y: Blockly.Bubble.BORDER_WIDTH
    }, null);
    e = e.split("\n");
    for (var t = 0; t < e.length; t++) {
        var n = Blockly.utils.createSvgElement("tspan", {
                dy: "1em",
                x: Blockly.Bubble.BORDER_WIDTH
            }, o),
            r = document.createTextNode(e[t]);
        n.appendChild(r)
    }
    return o
}, Blockly.Warning.prototype.setVisible = function(e) {
    if (e != this.isVisible())
        if (Blockly.Events.fire(new Blockly.Events.Ui(this.block_, "warningOpen", !e, e)), e) {
            if (e = Blockly.Warning.textToDom_(this.getText()), this.bubble_ = new Blockly.Bubble(this.block_.workspace, e, this.block_.svgPath_, this.iconXY_, null, null), this.block_.RTL)
                for (var o, t = e.getBBox().width, n = 0; o = e.childNodes[n]; n++) o.setAttribute("text-anchor", "end"), o.setAttribute("x", t + Blockly.Bubble.BORDER_WIDTH);
            this.updateColour(), e = this.bubble_.getBubbleSize(), this.bubble_.setBubbleSize(e.width, e.height)
        } else this.bubble_.dispose(), this.body_ = this.bubble_ = null
}, Blockly.Warning.prototype.bodyFocus_ = function(e) {
    this.bubble_.promote_()
}, Blockly.Warning.prototype.setText = function(e, o) {
    this.text_[o] != e && (e ? this.text_[o] = e : delete this.text_[o], this.isVisible() && (this.setVisible(!1), this.setVisible(!0)))
}, Blockly.Warning.prototype.getText = function() {
    var e, o = [];
    for (e in this.text_) o.push(this.text_[e]);
    return o.join("\n")
}, Blockly.Warning.prototype.dispose = function() {
    this.block_.warning = null, Blockly.Icon.prototype.dispose.call(this)
}, Blockly.Block = function(e, o, t) {
    this.id = t && !e.getBlockById(t) ? t : Blockly.utils.genUid(), e.blockDB_[this.id] = this, this.previousConnection = this.nextConnection = this.outputConnection = null, this.inputList = [], this.inputsInline = void 0, this.disabled = !1, this.tooltip = "", this.contextMenu = !0, this.parentBlock_ = null, this.childBlocks_ = [], this.editable_ = this.movable_ = this.deletable_ = !0, this.collapsed_ = this.isShadow_ = !1, this.comment = null, this.xy_ = new goog.math.Coordinate(0, 0), this.workspace = e, this.isInFlyout = e.isFlyout, this.isInMutator = e.isMutator, this.RTL = e.RTL, o && (this.type = o, t = Blockly.Blocks[o], goog.asserts.assertObject(t, 'Error: Unknown block type "%s".', o), goog.mixin(this, t)), e.addTopBlock(this), goog.isFunction(this.init) && this.init(), this.inputsInlineDefault = this.inputsInline, Blockly.Events.isEnabled() && Blockly.Events.fire(new Blockly.Events.Create(this)), goog.isFunction(this.onchange) && this.setOnChange(this.onchange)
}, Blockly.Block.obtain = function(e, o) {
    return console.warn("Deprecated call to Blockly.Block.obtain, use workspace.newBlock instead."), e.newBlock(o)
}, Blockly.Block.prototype.data = null, Blockly.Block.prototype.colour_ = "#000000", Blockly.Block.prototype.dispose = function(e) {
    if (this.workspace) {
        this.onchangeWrapper_ && this.workspace.removeChangeListener(this.onchangeWrapper_), this.unplug(e), Blockly.Events.isEnabled() && Blockly.Events.fire(new Blockly.Events.Delete(this)), Blockly.Events.disable();
        try {
            this.workspace && (this.workspace.removeTopBlock(this), delete this.workspace.blockDB_[this.id], this.workspace = null);
            for (t = this.childBlocks_.length - 1; 0 <= t; t--) this.childBlocks_[t].dispose(!1);
            for (var o, t = 0; o = this.inputList[t]; t++) o.dispose();
            this.inputList.length = 0;
            for (var n = this.getConnections_(!0), t = 0; t < n.length; t++) {
                var r = n[t];
                r.isConnected() && r.disconnect(), n[t].dispose()
            }
        } finally {
            Blockly.Events.enable()
        }
    }
}, Blockly.Block.prototype.unplug = function(e) {
    if (this.outputConnection) this.outputConnection.isConnected() && this.outputConnection.disconnect();
    else if (this.previousConnection) {
        var o = null;
        this.previousConnection.isConnected() && (o = this.previousConnection.targetConnection, this.previousConnection.disconnect());
        var t = this.getNextBlock();
        e && t && ((e = this.nextConnection.targetConnection).disconnect(), o && o.checkType_(e) && o.connect(e))
    }
}, Blockly.Block.prototype.getConnections_ = function() {
    var e = [];
    this.outputConnection && e.push(this.outputConnection), this.previousConnection && e.push(this.previousConnection), this.nextConnection && e.push(this.nextConnection);
    for (var o, t = 0; o = this.inputList[t]; t++) o.connection && e.push(o.connection);
    return e
}, Blockly.Block.prototype.lastConnectionInStack_ = function() {
    for (var e = this.nextConnection; e;) {
        var o = e.targetBlock();
        if (!o) return e;
        e = o.nextConnection
    }
    return null
}, Blockly.Block.prototype.bumpNeighbours_ = function() {
    console.warn("Not expected to reach this bumpNeighbours_ function. The BlockSvg function for bumpNeighbours_ was expected to be called instead.")
}, Blockly.Block.prototype.getParent = function() {
    return this.parentBlock_
}, Blockly.Block.prototype.getInputWithBlock = function(e) {
    for (var o, t = 0; o = this.inputList[t]; t++)
        if (o.connection && o.connection.targetBlock() == e) return o;
    return null
}, Blockly.Block.prototype.getSurroundParent = function() {
    var e = this;
    do {
        var o = e;
        if (!(e = e.getParent())) return null
    } while (e.getNextBlock() == o);
    return e
}, Blockly.Block.prototype.getNextBlock = function() {
    return this.nextConnection && this.nextConnection.targetBlock()
}, Blockly.Block.prototype.getRootBlock = function() {
    var e = this;
    do {
        var o = e;
        e = o.parentBlock_
    } while (e);
    return o
}, Blockly.Block.prototype.getChildren = function() {
    return this.childBlocks_
}, Blockly.Block.prototype.setParent = function(e) {
    if (e != this.parentBlock_) {
        if (this.parentBlock_) {
            if (goog.array.remove(this.parentBlock_.childBlocks_, this), this.previousConnection && this.previousConnection.isConnected()) throw "Still connected to previous block.";
            if (this.outputConnection && this.outputConnection.isConnected()) throw "Still connected to parent block.";
            this.parentBlock_ = null
        } else this.workspace.removeTopBlock(this);
        (this.parentBlock_ = e) ? e.childBlocks_.push(this): this.workspace.addTopBlock(this)
    }
}, Blockly.Block.prototype.getDescendants = function() {
    for (var e, o = [this], t = 0; e = this.childBlocks_[t]; t++) o.push.apply(o, e.getDescendants());
    return o
}, Blockly.Block.prototype.isDeletable = function() {
    return this.deletable_ && !this.isShadow_ && !(this.workspace && this.workspace.options.readOnly)
}, Blockly.Block.prototype.setDeletable = function(e) {
    this.deletable_ = e
}, Blockly.Block.prototype.isMovable = function() {
    return this.movable_ && !this.isShadow_ && !(this.workspace && this.workspace.options.readOnly)
}, Blockly.Block.prototype.setMovable = function(e) {
    this.movable_ = e
}, Blockly.Block.prototype.isShadow = function() {
    return this.isShadow_
}, Blockly.Block.prototype.setShadow = function(e) {
    this.isShadow_ = e
}, Blockly.Block.prototype.isEditable = function() {
    return this.editable_ && !(this.workspace && this.workspace.options.readOnly)
}, Blockly.Block.prototype.setEditable = function(e) {
    this.editable_ = e, e = 0;
    for (var o; o = this.inputList[e]; e++)
        for (var t, n = 0; t = o.fieldRow[n]; n++) t.updateEditable()
}, Blockly.Block.prototype.setConnectionsHidden = function(e) {
    var o;
    if (!e && this.isCollapsed()) this.outputConnection && this.outputConnection.setHidden(e), this.previousConnection && this.previousConnection.setHidden(e), this.nextConnection && (this.nextConnection.setHidden(e), (o = this.nextConnection.targetBlock()) && o.setConnectionsHidden(e));
    else
        for (var t = this.getConnections_(!0), n = 0; o = t[n]; n++) o.setHidden(e), o.isSuperior() && (o = o.targetBlock()) && o.setConnectionsHidden(e)
}, Blockly.Block.prototype.setHelpUrl = function(e) {
    this.helpUrl = e
}, Blockly.Block.prototype.setTooltip = function(e) {
    this.tooltip = e
}, Blockly.Block.prototype.getColour = function() {
    return this.colour_
}, Blockly.Block.prototype.setColour = function(e) {
    var o = Number(e);
    if (isNaN(o)) {
        if (!goog.isString(e) || !e.match(/^#[0-9a-fA-F]{6}$/)) throw "Invalid colour: " + e;
        this.colour_ = e
    } else this.colour_ = Blockly.hueToRgb(o)
}, Blockly.Block.prototype.setOnChange = function(e) {
    if (e && !goog.isFunction(e)) throw Error("onchange must be a function.");
    this.onchangeWrapper_ && this.workspace.removeChangeListener(this.onchangeWrapper_), (this.onchange = e) && (this.onchangeWrapper_ = e.bind(this), this.workspace.addChangeListener(this.onchangeWrapper_))
}, Blockly.Block.prototype.getField = function(e) {
    for (var o, t = 0; o = this.inputList[t]; t++)
        for (var n, r = 0; n = o.fieldRow[r]; r++)
            if (n.name === e) return n;
    return null
}, Blockly.Block.prototype.getVars = function() {
    for (var e, o = [], t = 0; e = this.inputList[t]; t++)
        for (var n, r = 0; n = e.fieldRow[r]; r++) n instanceof Blockly.FieldVariable && o.push(n.getValue());
    return o
}, Blockly.Block.prototype.renameVar = function(e, o) {
    for (var t, n = 0; t = this.inputList[n]; n++)
        for (var r, i = 0; r = t.fieldRow[i]; i++) r instanceof Blockly.FieldVariable && Blockly.Names.equals(e, r.getValue()) && r.setValue(o)
}, Blockly.Block.prototype.getFieldValue = function(e) {
    return (e = this.getField(e)) ? e.getValue() : null
}, Blockly.Block.prototype.setFieldValue = function(e, o) {
    var t = this.getField(o);
    goog.asserts.assertObject(t, 'Field "%s" not found.', o), t.setValue(e)
}, Blockly.Block.prototype.setPreviousStatement = function(e, o) {
    e ? (void 0 === o && (o = null), this.previousConnection || (goog.asserts.assert(!this.outputConnection, "Remove output connection prior to adding previous connection."), this.previousConnection = this.makeConnection_(Blockly.PREVIOUS_STATEMENT)), this.previousConnection.setCheck(o)) : this.previousConnection && (goog.asserts.assert(!this.previousConnection.isConnected(), "Must disconnect previous statement before removing connection."), this.previousConnection.dispose(), this.previousConnection = null)
}, Blockly.Block.prototype.setNextStatement = function(e, o) {
    e ? (void 0 === o && (o = null), this.nextConnection || (this.nextConnection = this.makeConnection_(Blockly.NEXT_STATEMENT)), this.nextConnection.setCheck(o)) : this.nextConnection && (goog.asserts.assert(!this.nextConnection.isConnected(), "Must disconnect next statement before removing connection."), this.nextConnection.dispose(), this.nextConnection = null)
}, Blockly.Block.prototype.setOutput = function(e, o) {
    e ? (void 0 === o && (o = null), this.outputConnection || (goog.asserts.assert(!this.previousConnection, "Remove previous connection prior to adding output connection."), this.outputConnection = this.makeConnection_(Blockly.OUTPUT_VALUE)), this.outputConnection.setCheck(o)) : this.outputConnection && (goog.asserts.assert(!this.outputConnection.isConnected(), "Must disconnect output value before removing connection."), this.outputConnection.dispose(), this.outputConnection = null)
}, Blockly.Block.prototype.setInputsInline = function(e) {
    this.inputsInline != e && (Blockly.Events.fire(new Blockly.Events.Change(this, "inline", null, this.inputsInline, e)), this.inputsInline = e)
}, Blockly.Block.prototype.getInputsInline = function() {
    if (void 0 != this.inputsInline) return this.inputsInline;
    for (var e = 1; e < this.inputList.length; e++)
        if (this.inputList[e - 1].type == Blockly.DUMMY_INPUT && this.inputList[e].type == Blockly.DUMMY_INPUT) return !1;
    for (e = 1; e < this.inputList.length; e++)
        if (this.inputList[e - 1].type == Blockly.INPUT_VALUE && this.inputList[e].type == Blockly.DUMMY_INPUT) return !0;
    return !1
}, Blockly.Block.prototype.setDisabled = function(e) {
    this.disabled != e && (Blockly.Events.fire(new Blockly.Events.Change(this, "disabled", null, this.disabled, e)), this.disabled = e)
}, Blockly.Block.prototype.getInheritedDisabled = function() {
    for (var e = this.getSurroundParent(); e;) {
        if (e.disabled) return !0;
        e = e.getSurroundParent()
    }
    return !1
}, Blockly.Block.prototype.isCollapsed = function() {
    return this.collapsed_
}, Blockly.Block.prototype.setCollapsed = function(e) {
    this.collapsed_ != e && (Blockly.Events.fire(new Blockly.Events.Change(this, "collapsed", null, this.collapsed_, e)), this.collapsed_ = e)
}, Blockly.Block.prototype.toString = function(e, o) {
    var t = [],
        n = o || "?";
    if (this.collapsed_) t.push(this.getInput("_TEMP_COLLAPSED_INPUT").fieldRow[0].text_);
    else
        for (var r, i = 0; r = this.inputList[i]; i++) {
            for (var s, l = 0; s = r.fieldRow[l]; l++) s instanceof Blockly.FieldDropdown && !s.getValue() ? t.push(n) : t.push(s.getText());
            r.connection && ((r = r.connection.targetBlock()) ? t.push(r.toString(void 0, o)) : t.push(n))
        }
    return t = goog.string.trim(t.join(" ")) || "???", e && (t = goog.string.truncate(t, e)), t
}, Blockly.Block.prototype.appendValueInput = function(e) {
    return this.appendInput_(Blockly.INPUT_VALUE, e)
}, Blockly.Block.prototype.appendStatementInput = function(e) {
    return this.appendInput_(Blockly.NEXT_STATEMENT, e)
}, Blockly.Block.prototype.appendDummyInput = function(e) {
    return this.appendInput_(Blockly.DUMMY_INPUT, e || "")
}, Blockly.Block.prototype.jsonInit = function(e) {
    if (goog.asserts.assert(void 0 == e.output || void 0 == e.previousStatement, "Must not have both an output and a previousStatement."), void 0 !== e.colour) {
        var o = e.colour;
        o = goog.isString(o) ? Blockly.utils.replaceMessageReferences(o) : o, this.setColour(o)
    }
    for (o = 0; void 0 !== e["message" + o];) this.interpolate_(e["message" + o], e["args" + o] || [], e["lastDummyAlign" + o]), o++;
    if (void 0 !== e.inputsInline && this.setInputsInline(e.inputsInline), void 0 !== e.output && this.setOutput(!0, e.output), void 0 !== e.previousStatement && this.setPreviousStatement(!0, e.previousStatement), void 0 !== e.nextStatement && this.setNextStatement(!0, e.nextStatement), void 0 !== e.tooltip && (o = e.tooltip, o = Blockly.utils.replaceMessageReferences(o), this.setTooltip(o)), void 0 !== e.enableContextMenu && (o = e.enableContextMenu, this.contextMenu = !!o), void 0 !== e.helpUrl && (o = e.helpUrl, o = Blockly.utils.replaceMessageReferences(o), this.setHelpUrl(o)), goog.isString(e.extensions) && (console.warn("JSON attribute 'extensions' should be an array of strings. Found raw string in JSON for '" + e.type + "' block."), e.extensions = [e.extensions]), void 0 !== e.mutator && Blockly.Extensions.apply(e.mutator, this, !0), Array.isArray(e.extensions))
        for (e = e.extensions, o = 0; o < e.length; ++o) Blockly.Extensions.apply(e[o], this, !1)
}, Blockly.Block.prototype.mixin = function(e, o) {
    if (goog.isDef(o) && !goog.isBoolean(o)) throw Error("opt_disableCheck must be a boolean if provided");
    if (!o) {
        var t, n = [];
        for (t in e) void 0 !== this[t] && n.push(t);
        if (n.length) throw Error("Mixin will overwrite block members: " + JSON.stringify(n))
    }
    goog.mixin(this, e)
}, Blockly.Block.prototype.interpolate_ = function(e, o, t) {
    var n = Blockly.utils.tokenizeInterpolation(e),
        r = [],
        i = 0;
    e = [];
    for (var s = 0; s < n.length; s++) {
        var l = n[s];
        "number" == typeof l ? (goog.asserts.assert(0 < l && l <= o.length, "Message index %%s out of range.", l), goog.asserts.assert(!r[l], "Message index %%s duplicated.", l), r[l] = !0, i++, e.push(o[l - 1])) : (l = l.trim()) && e.push(l)
    }
    for (goog.asserts.assert(i == o.length, 'block "%s": Message does not reference all %s arg(s).', this.type, o.length), e.length && ("string" == typeof e[e.length - 1] || goog.string.startsWith(e[e.length - 1].type, "field_")) && (s = {
            type: "input_dummy"
        }, t && (s.align = t), e.push(s)), t = {
            LEFT: Blockly.ALIGN_LEFT,
            RIGHT: Blockly.ALIGN_RIGHT,
            CENTRE: Blockly.ALIGN_CENTRE
        }, o = [], s = 0; s < e.length; s++)
        if ("string" == typeof(i = e[s])) o.push([i, void 0]);
        else {
            n = l = null;
            do {
                if (r = !1, "string" == typeof i) l = new Blockly.FieldLabel(i);
                else switch (i.type) {
                    case "input_value":
                        n = this.appendValueInput(i.name);
                        break;
                    case "input_statement":
                        n = this.appendStatementInput(i.name);
                        break;
                    case "input_dummy":
                        n = this.appendDummyInput(i.name);
                        break;
                    case "field_label":
                        l = Blockly.Block.newFieldLabelFromJson_(i);
                        break;
                    case "field_input":
                        l = Blockly.Block.newFieldTextInputFromJson_(i);
                        break;
                    case "field_angle":
                        l = new Blockly.FieldAngle(i.angle);
                        break;
                    case "field_checkbox":
                        l = new Blockly.FieldCheckbox(i.checked ? "TRUE" : "FALSE");
                        break;
                    case "field_colour":
                        l = new Blockly.FieldColour(i.colour);
                        break;
                    case "field_variable":
                        l = Blockly.Block.newFieldVariableFromJson_(i);
                        break;
                    case "field_dropdown":
                        l = new Blockly.FieldDropdown(i.options);
                        break;
                    case "field_image":
                        l = Blockly.Block.newFieldImageFromJson_(i);
                        break;
                    case "field_number":
                        l = new Blockly.FieldNumber(i.value, i.min, i.max, i.precision);
                        break;
                    case "field_date":
                        if (Blockly.FieldDate) {
                            l = new Blockly.FieldDate(i.date);
                            break
                        }
                    default:
                        i.alt && (i = i.alt, r = !0)
                }
            } while (r);
            if (l) o.push([l, i.name]);
            else if (n) {
                for (i.check && n.setCheck(i.check), i.align && n.setAlign(t[i.align]), r = 0; r < o.length; r++) n.appendField(o[r][0], o[r][1]);
                o.length = 0
            }
        }
}, Blockly.Block.newFieldImageFromJson_ = function(e) {
    var o = Blockly.utils.replaceMessageReferences(e.src),
        t = Number(Blockly.utils.replaceMessageReferences(e.width)),
        n = Number(Blockly.utils.replaceMessageReferences(e.height));
    return e = Blockly.utils.replaceMessageReferences(e.alt), new Blockly.FieldImage(o, t, n, e)
}, Blockly.Block.newFieldLabelFromJson_ = function(e) {
    var o = Blockly.utils.replaceMessageReferences(e.text);
    return new Blockly.FieldLabel(o, e.class)
}, Blockly.Block.newFieldTextInputFromJson_ = function(e) {
    var o = Blockly.utils.replaceMessageReferences(e.text),
        o = new Blockly.FieldTextInput(o, e.class);
    return "boolean" == typeof e.spellcheck && o.setSpellcheck(e.spellcheck), o
}, Blockly.Block.newFieldVariableFromJson_ = function(e) {
    return e = Blockly.utils.replaceMessageReferences(e.variable), new Blockly.FieldVariable(e)
}, Blockly.Block.prototype.appendInput_ = function(e, o) {
    var t = null;
    return e != Blockly.INPUT_VALUE && e != Blockly.NEXT_STATEMENT || (t = this.makeConnection_(e)), t = new Blockly.Input(e, o, this, t), this.inputList.push(t), t
}, Blockly.Block.prototype.moveInputBefore = function(e, o) {
    if (e != o) {
        for (var t, n = -1, r = o ? -1 : this.inputList.length, i = 0; t = this.inputList[i]; i++)
            if (t.name == e) {
                if (n = i, -1 != r) break
            } else if (o && t.name == o && (r = i, -1 != n)) break;
        goog.asserts.assert(-1 != n, 'Named input "%s" not found.', e), goog.asserts.assert(-1 != r, 'Reference input "%s" not found.', o), this.moveNumberedInputBefore(n, r)
    }
}, Blockly.Block.prototype.moveNumberedInputBefore = function(e, o) {
    goog.asserts.assert(e != o, "Can't move input to itself."), goog.asserts.assert(e < this.inputList.length, "Input index " + e + " out of bounds."), goog.asserts.assert(o <= this.inputList.length, "Reference input " + o + " out of bounds.");
    var t = this.inputList[e];
    this.inputList.splice(e, 1), e < o && o--, this.inputList.splice(o, 0, t)
}, Blockly.Block.prototype.removeInput = function(e, o) {
    for (var t, n = 0; t = this.inputList[n]; n++)
        if (t.name == e) {
            if (t.connection && t.connection.isConnected()) {
                t.connection.setShadowDom(null);
                var r = t.connection.targetBlock();
                r.isShadow() ? r.dispose() : r.unplug()
            }
            return t.dispose(), void this.inputList.splice(n, 1)
        }
    o || goog.asserts.fail('Input "%s" not found.', e)
}, Blockly.Block.prototype.getInput = function(e) {
    for (var o, t = 0; o = this.inputList[t]; t++)
        if (o.name == e) return o;
    return null
}, Blockly.Block.prototype.getInputTargetBlock = function(e) {
    return (e = this.getInput(e)) && e.connection && e.connection.targetBlock()
}, Blockly.Block.prototype.getCommentText = function() {
    return this.comment || ""
}, Blockly.Block.prototype.setCommentText = function(e) {
    this.comment != e && (Blockly.Events.fire(new Blockly.Events.Change(this, "comment", null, this.comment, e || "")), this.comment = e)
}, Blockly.Block.prototype.setWarningText = function() {}, Blockly.Block.prototype.setMutator = function() {}, Blockly.Block.prototype.getRelativeToSurfaceXY = function() {
    return this.xy_
}, Blockly.Block.prototype.moveBy = function(e, o) {
    goog.asserts.assert(!this.parentBlock_, "Block has parent.");
    var t = new Blockly.Events.Move(this);
    this.xy_.translate(e, o), t.recordNew(), Blockly.Events.fire(t)
}, Blockly.Block.prototype.makeConnection_ = function(e) {
    return new Blockly.Connection(this, e)
}, Blockly.Block.prototype.allInputsFilled = function(e) {
    if (void 0 === e && (e = !0), !e && this.isShadow()) return !1;
    for (var o, t = 0; o = this.inputList[t]; t++)
        if (o.connection && (!(o = o.connection.targetBlock()) || !o.allInputsFilled(e))) return !1;
    return !(t = this.getNextBlock()) || t.allInputsFilled(e)
}, Blockly.Block.prototype.toDevString = function() {
    var e = this.type ? '"' + this.type + '" block' : "Block";
    return this.id && (e += ' (id="' + this.id + '")'), e
}, Blockly.ContextMenu = {}, Blockly.ContextMenu.currentBlock = null, Blockly.ContextMenu.show = function(e, o, t) {
    if (Blockly.WidgetDiv.show(Blockly.ContextMenu, t, null), o.length) {
        var n = new goog.ui.Menu;
        n.setRightToLeft(t);
        for (var r, i = 0; r = o[i]; i++)(l = new goog.ui.MenuItem(r.text)).setRightToLeft(t), n.addChild(l, !0), l.setEnabled(r.enabled), r.enabled && (goog.events.listen(l, goog.ui.Component.EventType.ACTION, r.callback), l.handleContextMenu = function(e) {
            goog.events.dispatchEvent(this, goog.ui.Component.EventType.ACTION)
        });
        goog.events.listen(n, goog.ui.Component.EventType.ACTION, Blockly.ContextMenu.hide), o = goog.dom.getViewportSize(), i = goog.style.getViewportPageOffset(document), n.render(Blockly.WidgetDiv.DIV);
        var s = n.getElement();
        Blockly.utils.addClass(s, "blocklyContextMenu"), Blockly.bindEventWithChecks_(s, "contextmenu", null, Blockly.utils.noEvent), r = goog.style.getSize(s);
        var l = e.clientX + i.x,
            g = e.clientY + i.y;
        e.clientY + r.height >= o.height && (g -= r.height), t ? r.width >= e.clientX && (l += r.width) : e.clientX + r.width >= o.width && (l -= r.width), Blockly.WidgetDiv.position(l, g, o, i, t), n.setAllowAutoFocus(!0), setTimeout(function() {
            s.focus()
        }, 1), Blockly.ContextMenu.currentBlock = null
    } else Blockly.ContextMenu.hide()
}, Blockly.ContextMenu.hide = function() {
    Blockly.WidgetDiv.hideIfOwner(Blockly.ContextMenu), Blockly.ContextMenu.currentBlock = null
}, Blockly.ContextMenu.callbackFactory = function(e, o) {
    return function() {
        Blockly.Events.disable();
        try {
            var t = Blockly.Xml.domToBlock(o, e.workspace),
                n = e.getRelativeToSurfaceXY();
            n.x = e.RTL ? n.x - Blockly.SNAP_RADIUS : n.x + Blockly.SNAP_RADIUS, n.y += 2 * Blockly.SNAP_RADIUS, t.moveBy(n.x, n.y)
        } finally {
            Blockly.Events.enable()
        }
        Blockly.Events.isEnabled() && !t.isShadow() && Blockly.Events.fire(new Blockly.Events.Create(t)), t.select()
    }
}, Blockly.RenderedConnection = function(e, o) {
    Blockly.RenderedConnection.superClass_.constructor.call(this, e, o), this.offsetInBlock_ = new goog.math.Coordinate(0, 0)
}, goog.inherits(Blockly.RenderedConnection, Blockly.Connection), Blockly.RenderedConnection.prototype.distanceFrom = function(e) {
    var o = this.x_ - e.x_;
    return e = this.y_ - e.y_, Math.sqrt(o * o + e * e)
}, Blockly.RenderedConnection.prototype.bumpAwayFrom_ = function(e) {
    if (Blockly.dragMode_ == Blockly.DRAG_NONE) {
        var o = this.sourceBlock_.getRootBlock();
        if (!o.isInFlyout) {
            var t = !1;
            if (!o.isMovable()) {
                if (!(o = e.getSourceBlock().getRootBlock()).isMovable()) return;
                e = this, t = !0
            }
            var n = Blockly.selected == o;
            n || o.addSelect();
            var r = e.x_ + Blockly.SNAP_RADIUS - this.x_;
            e = e.y_ + Blockly.SNAP_RADIUS - this.y_, t && (e = -e), o.RTL && (r = -r), o.moveBy(r, e), n || o.removeSelect()
        }
    }
}, Blockly.RenderedConnection.prototype.moveTo = function(e, o) {
    this.inDB_ && this.db_.removeConnection_(this), this.x_ = e, this.y_ = o, this.hidden_ || this.db_.addConnection(this)
}, Blockly.RenderedConnection.prototype.moveBy = function(e, o) {
    this.moveTo(this.x_ + e, this.y_ + o)
}, Blockly.RenderedConnection.prototype.moveToOffset = function(e) {
    this.moveTo(e.x + this.offsetInBlock_.x, e.y + this.offsetInBlock_.y)
}, Blockly.RenderedConnection.prototype.setOffsetInBlock = function(e, o) {
    this.offsetInBlock_.x = e, this.offsetInBlock_.y = o
}, Blockly.RenderedConnection.prototype.tighten_ = function() {
    var e = this.targetConnection.x_ - this.x_,
        o = this.targetConnection.y_ - this.y_;
    if (0 != e || 0 != o) {
        var t = this.targetBlock(),
            n = t.getSvgRoot();
        if (!n) throw "block is not rendered.";
        n = Blockly.utils.getRelativeXY(n), t.getSvgRoot().setAttribute("transform", "translate(" + (n.x - e) + "," + (n.y - o) + ")"), t.moveConnections_(-e, -o)
    }
}, Blockly.RenderedConnection.prototype.closest = function(e, o, t) {
    return this.dbOpposite_.searchForClosest(this, e, o, t)
}, Blockly.RenderedConnection.prototype.highlight = function() {
    var e = this.type == Blockly.INPUT_VALUE || this.type == Blockly.OUTPUT_VALUE ? "m 0,0 " + Blockly.BlockSvg.TAB_PATH_DOWN + " v 5" : "m -20,0 h 5 " + Blockly.BlockSvg.NOTCH_PATH_LEFT + " h 5",
        o = this.sourceBlock_.getRelativeToSurfaceXY();
    Blockly.Connection.highlightedPath_ = Blockly.utils.createSvgElement("path", {
        class: "blocklyHighlightedConnectionPath",
        d: e,
        transform: "translate(" + (this.x_ - o.x) + "," + (this.y_ - o.y) + ")" + (this.sourceBlock_.RTL ? " scale(-1 1)" : "")
    }, this.sourceBlock_.getSvgRoot())
}, Blockly.RenderedConnection.prototype.unhideAll = function() {
    this.setHidden(!1);
    var e = [];
    if (this.type != Blockly.INPUT_VALUE && this.type != Blockly.NEXT_STATEMENT) return e;
    var o = this.targetBlock();
    if (o) {
        if (o.isCollapsed()) {
            var t = [];
            o.outputConnection && t.push(o.outputConnection), o.nextConnection && t.push(o.nextConnection), o.previousConnection && t.push(o.previousConnection)
        } else t = o.getConnections_(!0);
        for (var n = 0; n < t.length; n++) e.push.apply(e, t[n].unhideAll());
        e.length || (e[0] = o)
    }
    return e
}, Blockly.RenderedConnection.prototype.unhighlight = function() {
    goog.dom.removeNode(Blockly.Connection.highlightedPath_), delete Blockly.Connection.highlightedPath_
}, Blockly.RenderedConnection.prototype.setHidden = function(e) {
    (this.hidden_ = e) && this.inDB_ ? this.db_.removeConnection_(this) : e || this.inDB_ || this.db_.addConnection(this)
}, Blockly.RenderedConnection.prototype.hideAll = function() {
    if (this.setHidden(!0), this.targetConnection)
        for (var e = this.targetBlock().getDescendants(), o = 0; o < e.length; o++) {
            for (var t = e[o], n = t.getConnections_(!0), r = 0; r < n.length; r++) n[r].setHidden(!0);
            for (t = t.getIcons(), r = 0; r < t.length; r++) t[r].setVisible(!1)
        }
}, Blockly.RenderedConnection.prototype.isConnectionAllowed = function(e, o) {
    return !(this.distanceFrom(e) > o) && Blockly.RenderedConnection.superClass_.isConnectionAllowed.call(this, e)
}, Blockly.RenderedConnection.prototype.disconnectInternal_ = function(e, o) {
    Blockly.RenderedConnection.superClass_.disconnectInternal_.call(this, e, o), e.rendered && e.render(), o.rendered && (o.updateDisabled(), o.render())
}, Blockly.RenderedConnection.prototype.respawnShadow_ = function() {
    var e = this.getSourceBlock(),
        o = this.getShadowDom();
    if (e.workspace && o && Blockly.Events.recordUndo) {
        if (Blockly.RenderedConnection.superClass_.respawnShadow_.call(this), !(o = this.targetBlock())) throw "Couldn't respawn the shadow block that should exist here.";
        o.initSvg(), o.render(!1), e.rendered && e.render()
    }
}, Blockly.RenderedConnection.prototype.neighbours_ = function(e) {
    return this.dbOpposite_.getNeighbours(this, e)
}, Blockly.RenderedConnection.prototype.connect_ = function(e) {
    Blockly.RenderedConnection.superClass_.connect_.call(this, e);
    var o = this.getSourceBlock();
    e = e.getSourceBlock(), o.rendered && o.updateDisabled(), e.rendered && e.updateDisabled(), o.rendered && e.rendered && (this.type == Blockly.NEXT_STATEMENT || this.type == Blockly.PREVIOUS_STATEMENT ? e.render() : o.render())
}, Blockly.RenderedConnection.prototype.onCheckChanged_ = function() {
    this.isConnected() && !this.checkType_(this.targetConnection) && ((this.isSuperior() ? this.targetBlock() : this.sourceBlock_).unplug(), this.sourceBlock_.bumpNeighbours_())
}, Blockly.BlockSvg = function(e, o, t) {
    this.svgGroup_ = Blockly.utils.createSvgElement("g", {}, null), this.svgPathDark_ = Blockly.utils.createSvgElement("path", {
        class: "blocklyPathDark",
        transform: "translate(1,1)"
    }, this.svgGroup_), this.svgPath_ = Blockly.utils.createSvgElement("path", {
        class: "blocklyPath"
    }, this.svgGroup_), this.svgPathLight_ = Blockly.utils.createSvgElement("path", {
        class: "blocklyPathLight"
    }, this.svgGroup_), this.svgPath_.tooltip = this, this.rendered = !1, this.useDragSurface_ = Blockly.utils.is3dSupported() && !!e.blockDragSurface_, Blockly.Tooltip.bindMouseEvents(this.svgPath_), Blockly.BlockSvg.superClass_.constructor.call(this, e, o, t)
}, goog.inherits(Blockly.BlockSvg, Blockly.Block), Blockly.BlockSvg.prototype.height = 0, Blockly.BlockSvg.prototype.width = 0, Blockly.BlockSvg.prototype.dragStartXY_ = null, Blockly.BlockSvg.INLINE = -1, Blockly.BlockSvg.prototype.initSvg = function() {
    goog.asserts.assert(this.workspace.rendered, "Workspace is headless.");
    for (var e, o = 0; e = this.inputList[o]; o++) e.init();
    for (e = this.getIcons(), o = 0; o < e.length; o++) e[o].createIcon();
    if (this.updateColour(), this.updateMovable(), !this.workspace.options.readOnly && !this.eventsInit_) {
        Blockly.bindEventWithChecks_(this.getSvgRoot(), "mousedown", this, this.onMouseDown_);
        var t = this;
        Blockly.bindEvent_(this.getSvgRoot(), "touchstart", null, function(e) {
            Blockly.longStart_(e, t)
        })
    }
    this.eventsInit_ = !0, this.getSvgRoot().parentNode || this.workspace.getCanvas().appendChild(this.getSvgRoot())
}, Blockly.BlockSvg.prototype.select = function() {
    if (this.isShadow() && this.getParent()) this.getParent().select();
    else if (Blockly.selected != this) {
        var e = null;
        if (Blockly.selected) {
            e = Blockly.selected.id, Blockly.Events.disable();
            try {
                Blockly.selected.unselect()
            } finally {
                Blockly.Events.enable()
            }
        }(e = new Blockly.Events.Ui(null, "selected", e, this.id)).workspaceId = this.workspace.id, Blockly.Events.fire(e), Blockly.selected = this, this.addSelect()
    }
}, Blockly.BlockSvg.prototype.unselect = function() {
    if (Blockly.selected == this) {
        var e = new Blockly.Events.Ui(null, "selected", this.id, null);
        e.workspaceId = this.workspace.id, Blockly.Events.fire(e), Blockly.selected = null, this.removeSelect()
    }
}, Blockly.BlockSvg.prototype.mutator = null, Blockly.BlockSvg.prototype.comment = null, Blockly.BlockSvg.prototype.warning = null, Blockly.BlockSvg.prototype.getIcons = function() {
    var e = [];
    return this.mutator && e.push(this.mutator), this.comment && e.push(this.comment), this.warning && e.push(this.warning), e
}, Blockly.BlockSvg.onMouseUpWrapper_ = null, Blockly.BlockSvg.onMouseMoveWrapper_ = null, Blockly.BlockSvg.terminateDrag = function() {
    Blockly.BlockSvg.disconnectUiStop_(), Blockly.BlockSvg.onMouseUpWrapper_ && (Blockly.unbindEvent_(Blockly.BlockSvg.onMouseUpWrapper_), Blockly.BlockSvg.onMouseUpWrapper_ = null), Blockly.BlockSvg.onMouseMoveWrapper_ && (Blockly.unbindEvent_(Blockly.BlockSvg.onMouseMoveWrapper_), Blockly.BlockSvg.onMouseMoveWrapper_ = null);
    var e = Blockly.selected;
    if (Blockly.dragMode_ == Blockly.DRAG_FREE && e) {
        var o = e.getRelativeToSurfaceXY(),
            o = goog.math.Coordinate.difference(o, e.dragStartXY_),
            t = new Blockly.Events.Move(e);
        t.oldCoordinate = e.dragStartXY_, t.recordNew(), Blockly.Events.fire(t), e.moveConnections_(o.x, o.y), delete e.draggedBubbles_, e.setDragging_(!1), e.moveOffDragSurface_(), e.render(), e.workspace.setResizesEnabled(!0);
        var n = Blockly.Events.getGroup();
        setTimeout(function() {
            Blockly.Events.setGroup(n), e.snapToGrid(), Blockly.Events.setGroup(!1)
        }, Blockly.BUMP_DELAY / 2), setTimeout(function() {
            Blockly.Events.setGroup(n), e.bumpNeighbours_(), Blockly.Events.setGroup(!1)
        }, Blockly.BUMP_DELAY)
    }
    Blockly.dragMode_ = Blockly.DRAG_NONE
}, Blockly.BlockSvg.prototype.setParent = function(e) {
    if (e != this.parentBlock_) {
        var o = this.getSvgRoot();
        if (this.parentBlock_ && o) {
            var t = this.getRelativeToSurfaceXY();
            this.workspace.getCanvas().appendChild(o), o.setAttribute("transform", "translate(" + t.x + "," + t.y + ")")
        }
        Blockly.Field.startCache(), Blockly.BlockSvg.superClass_.setParent.call(this, e), Blockly.Field.stopCache(), e && (t = this.getRelativeToSurfaceXY(), e.getSvgRoot().appendChild(o), e = this.getRelativeToSurfaceXY(), this.moveConnections_(e.x - t.x, e.y - t.y))
    }
}, Blockly.BlockSvg.prototype.getRelativeToSurfaceXY = function() {
    var e = 0,
        o = 0,
        t = this.useDragSurface_ ? this.workspace.blockDragSurface_.getGroup() : null,
        n = this.getSvgRoot();
    if (n)
        do {
            var r = Blockly.utils.getRelativeXY(n),
                e = e + r.x,
                o = o + r.y;
            this.useDragSurface_ && this.workspace.blockDragSurface_.getCurrentBlock() == n && (r = this.workspace.blockDragSurface_.getSurfaceTranslation(), e += r.x, o += r.y), n = n.parentNode
        } while (n && n != this.workspace.getCanvas() && n != t);
    return new goog.math.Coordinate(e, o)
}, Blockly.BlockSvg.prototype.moveBy = function(e, o) {
    goog.asserts.assert(!this.parentBlock_, "Block has parent.");
    var t = new Blockly.Events.Move(this),
        n = this.getRelativeToSurfaceXY();
    this.translate(n.x + e, n.y + o), this.moveConnections_(e, o), t.recordNew(), this.workspace.resizeContents(), Blockly.Events.fire(t)
}, Blockly.BlockSvg.prototype.translate = function(e, o) {
    this.getSvgRoot().setAttribute("transform", "translate(" + e + "," + o + ")")
}, Blockly.BlockSvg.prototype.moveToDragSurface_ = function() {
    if (this.useDragSurface_) {
        var e = this.getRelativeToSurfaceXY();
        this.clearTransformAttributes_(), this.workspace.blockDragSurface_.translateSurface(e.x, e.y), this.workspace.blockDragSurface_.setBlocksAndShow(this.getSvgRoot())
    }
}, Blockly.BlockSvg.prototype.moveOffDragSurface_ = function() {
    if (this.useDragSurface_) {
        var e = this.getRelativeToSurfaceXY();
        this.clearTransformAttributes_(), this.translate(e.x, e.y), this.workspace.blockDragSurface_.clearAndHide(this.workspace.getCanvas())
    }
}, Blockly.BlockSvg.prototype.clearTransformAttributes_ = function() {
    Blockly.utils.removeAttribute(this.getSvgRoot(), "transform")
}, Blockly.BlockSvg.prototype.snapToGrid = function() {
    if (this.workspace && Blockly.dragMode_ == Blockly.DRAG_NONE && !this.getParent() && !this.isInFlyout && this.workspace.options.gridOptions && this.workspace.options.gridOptions.snap) {
        var e = (n = this.workspace.options.gridOptions.spacing) / 2,
            o = this.getRelativeToSurfaceXY(),
            t = Math.round((o.x - e) / n) * n + e - o.x,
            n = Math.round((o.y - e) / n) * n + e - o.y,
            t = Math.round(t),
            n = Math.round(n);
        0 == t && 0 == n || this.moveBy(t, n)
    }
}, Blockly.BlockSvg.prototype.getHeightWidth = function() {
    var e = this.height,
        o = this.width,
        t = this.getNextBlock();
    return t ? (t = t.getHeightWidth(), e += t.height - 4, o = Math.max(o, t.width)) : this.nextConnection || this.outputConnection || (e += 2), {
        height: e,
        width: o
    }
}, Blockly.BlockSvg.prototype.getBoundingRectangle = function() {
    var e = this.getRelativeToSurfaceXY(this),
        o = this.outputConnection ? Blockly.BlockSvg.TAB_WIDTH : 0,
        t = this.getHeightWidth();
    if (this.RTL) {
        var n = new goog.math.Coordinate(e.x - (t.width - o), e.y);
        e = new goog.math.Coordinate(e.x + o, e.y + t.height)
    } else n = new goog.math.Coordinate(e.x - o, e.y), e = new goog.math.Coordinate(e.x + t.width - o, e.y + t.height);
    return {
        topLeft: n,
        bottomRight: e
    }
}, Blockly.BlockSvg.prototype.setCollapsed = function(e) {
    if (this.collapsed_ != e) {
        for (var o, t = [], n = 0; o = this.inputList[n]; n++) t.push.apply(t, o.setVisible(!e));
        if (e) {
            for (o = this.getIcons(), n = 0; n < o.length; n++) o[n].setVisible(!1);
            n = this.toString(Blockly.COLLAPSE_CHARS), this.appendDummyInput("_TEMP_COLLAPSED_INPUT").appendField(n).init()
        } else this.removeInput("_TEMP_COLLAPSED_INPUT"), this.setWarningText(null);
        if (Blockly.BlockSvg.superClass_.setCollapsed.call(this, e), t.length || (t[0] = this), this.rendered)
            for (n = 0; e = t[n]; n++) e.render()
    }
}, Blockly.BlockSvg.prototype.tab = function(e, o) {
    for (var t, n = [], r = 0; t = this.inputList[r]; r++) {
        for (var i, s = 0; i = t.fieldRow[s]; s++) i instanceof Blockly.FieldTextInput && n.push(i);
        t.connection && (t = t.connection.targetBlock()) && n.push(t)
    } - 1 == (r = n.indexOf(e)) && (r = o ? -1 : n.length), (n = n[o ? r + 1 : r - 1]) ? n instanceof Blockly.Field ? n.showEditor_() : n.tab(null, o) : (n = this.getParent()) && n.tab(this, o)
}, Blockly.BlockSvg.prototype.onMouseDown_ = function(e) {
    if (!this.workspace.options.readOnly)
        if (this.isInFlyout) "touchstart" == e.type && Blockly.utils.isRightButton(e) && (Blockly.Flyout.blockRightClick_(e, this), e.stopPropagation(), e.preventDefault());
        else {
            if (this.isInMutator && this.workspace.resize(), this.workspace.updateScreenCalculationsIfScrolled(), this.workspace.markFocused(), Blockly.terminateDrag_(), this.select(), Blockly.hideChaff(), Blockly.utils.isRightButton(e)) this.showContextMenu_(e), Blockly.Touch.clearTouchIdentifier();
            else {
                if (!this.isMovable()) return;
                Blockly.Events.getGroup() || Blockly.Events.setGroup(!0), this.dragStartXY_ = this.getRelativeToSurfaceXY(), this.workspace.startDrag(e, this.dragStartXY_), Blockly.dragMode_ = Blockly.DRAG_STICKY, Blockly.BlockSvg.onMouseUpWrapper_ = Blockly.bindEventWithChecks_(document, "mouseup", this, this.onMouseUp_), Blockly.BlockSvg.onMouseMoveWrapper_ = Blockly.bindEventWithChecks_(document, "mousemove", this, this.onMouseMove_), this.draggedBubbles_ = [];
                for (var o, t = this.getDescendants(), n = 0; o = t[n]; n++) {
                    o = o.getIcons();
                    for (var r = 0; r < o.length; r++) {
                        var i = o[r].getIconLocation();
                        i.bubble = o[r], this.draggedBubbles_.push(i)
                    }
                }
            }
            e.stopPropagation(), e.preventDefault()
        }
}, Blockly.BlockSvg.prototype.onMouseUp_ = function(e) {
    Blockly.Touch.clearTouchIdentifier(), Blockly.dragMode_ == Blockly.DRAG_FREE || Blockly.WidgetDiv.isVisible() || (this.bringToFront_(), Blockly.Events.fire(new Blockly.Events.Ui(this, "click", void 0, void 0))), Blockly.terminateDrag_(), e = this.workspace.isDeleteArea(e), Blockly.selected && Blockly.highlightedConnection_ && e != Blockly.DELETE_AREA_TOOLBOX ? (Blockly.localConnection_.connect(Blockly.highlightedConnection_), this.rendered && (Blockly.localConnection_.isSuperior() ? Blockly.highlightedConnection_ : Blockly.localConnection_).getSourceBlock().connectionUiEffect(), this.workspace.trashcan && this.workspace.trashcan.close()) : e && !this.getParent() && Blockly.selected.isDeletable() && ((e = this.workspace.trashcan) && goog.Timer.callOnce(e.close, 100, e), this.workspace.toolbox_ && this.workspace.toolbox_.removeDeleteStyle(), Blockly.selected.dispose(!1, !0)), Blockly.highlightedConnection_ && (Blockly.highlightedConnection_.unhighlight(), Blockly.highlightedConnection_ = null), Blockly.WidgetDiv.isVisible() || Blockly.Events.setGroup(!1)
}, Blockly.BlockSvg.prototype.showHelp_ = function() {
    var e = goog.isFunction(this.helpUrl) ? this.helpUrl() : this.helpUrl;
    e && $('#doc').html(e);
}, Blockly.BlockSvg.prototype.showContextMenu_ = function(e) {
    if (!this.workspace.options.readOnly && this.contextMenu) {
        var o = this,
            t = [];
        if (this.isDeletable() && this.isMovable() && !o.isInFlyout) {
            n = {
                text: Blockly.Msg.DUPLICATE_BLOCK,
                enabled: !0,
                callback: function() {
                    Blockly.duplicate_(o)
                }
            };
            if (this.getDescendants().length > this.workspace.remainingCapacity() && (n.enabled = !1), t.push(n), this.isEditable() && !this.collapsed_ && this.workspace.options.comments && (n = {
                    enabled: !goog.userAgent.IE
                }, this.comment ? (n.text = Blockly.Msg.REMOVE_COMMENT, n.callback = function() {
                    o.setCommentText(null)
                }) : (n.text = Blockly.Msg.ADD_COMMENT, n.callback = function() {
                    o.setCommentText("")
                }), t.push(n)), !this.collapsed_)
                for (n = 1; n < this.inputList.length; n++)
                    if (this.inputList[n - 1].type != Blockly.NEXT_STATEMENT && this.inputList[n].type != Blockly.NEXT_STATEMENT) {
                        var n = {
                                enabled: !0
                            },
                            r = this.getInputsInline();
                        n.text = r ? Blockly.Msg.EXTERNAL_INPUTS : Blockly.Msg.INLINE_INPUTS, n.callback = function() {
                            o.setInputsInline(!r)
                        }, t.push(n);
                        break
                    }
            this.workspace.options.collapse && (this.collapsed_ ? (n = {
                enabled: !0
            }, n.text = Blockly.Msg.EXPAND_BLOCK, n.callback = function() {
                o.setCollapsed(!1)
            }) : (n = {
                enabled: !0
            }, n.text = Blockly.Msg.COLLAPSE_BLOCK, n.callback = function() {
                o.setCollapsed(!0)
            }), t.push(n)), this.workspace.options.disable && (n = {
                text: this.disabled ? Blockly.Msg.ENABLE_BLOCK : Blockly.Msg.DISABLE_BLOCK,
                enabled: !this.getInheritedDisabled(),
                callback: function() {
                    o.setDisabled(!o.disabled)
                }
            }, t.push(n));
            var n = this.getDescendants().length,
                i = this.getNextBlock();
            i && (n -= i.getDescendants().length), n = {
                text: 1 == n ? Blockly.Msg.DELETE_BLOCK : Blockly.Msg.DELETE_X_BLOCKS.replace("%1", String(n)),
                enabled: !0,
                callback: function() {
                    Blockly.Events.setGroup(!0), o.dispose(!0, !0), Blockly.Events.setGroup(!1)
                }
            }, t.push(n)
        }(n = {
            enabled: !(goog.isFunction(this.helpUrl) ? !this.helpUrl() : !this.helpUrl)
        }).text = Blockly.Msg.HELP, n.callback = function() {
            o.showHelp_()
        }, t.push(n), this.customContextMenu && !o.isInFlyout && this.customContextMenu(t), Blockly.ContextMenu.show(e, t, this.RTL), Blockly.ContextMenu.currentBlock = this
    }
}, Blockly.BlockSvg.prototype.moveConnections_ = function(e, o) {
    if (this.rendered) {
        for (var t = this.getConnections_(!1), n = 0; n < t.length; n++) t[n].moveBy(e, o);
        for (t = this.getIcons(), n = 0; n < t.length; n++) t[n].computeIconLocation();
        for (n = 0; n < this.childBlocks_.length; n++) this.childBlocks_[n].moveConnections_(e, o)
    }
}, Blockly.BlockSvg.prototype.setDragging_ = function(e) {
    if (e) {
        var o = this.getSvgRoot();
        o.translate_ = "", o.skew_ = "", Blockly.draggingConnections_ = Blockly.draggingConnections_.concat(this.getConnections_(!0)), Blockly.utils.addClass(this.svgGroup_, "blocklyDragging")
    } else Blockly.draggingConnections_ = [], Blockly.utils.removeClass(this.svgGroup_, "blocklyDragging");
    for (o = 0; o < this.childBlocks_.length; o++) this.childBlocks_[o].setDragging_(e)
}, Blockly.BlockSvg.prototype.onMouseMove_ = function(e) {
    if ("mousemove" == e.type && 1 >= e.clientX && 0 == e.clientY && 0 == e.button) e.stopPropagation();
    else {
        var o = this.getRelativeToSurfaceXY(),
            t = this.workspace.moveDrag(e);
        if (Blockly.dragMode_ == Blockly.DRAG_STICKY && goog.math.Coordinate.distance(o, t) * this.workspace.scale > Blockly.DRAG_RADIUS) {
            Blockly.dragMode_ = Blockly.DRAG_FREE, Blockly.longStop_(), this.workspace.setResizesEnabled(!1);
            var n = !!this.parentBlock_,
                r = !Blockly.DRAG_STACK;
            (e.altKey || e.ctrlKey || e.metaKey) && (r = !r), this.unplug(r), n && (n = this.getSvgRoot(), n.translate_ = "translate(" + t.x + "," + t.y + ")", this.disconnectUiEffect()), this.setDragging_(!0), this.moveToDragSurface_()
        }
        if (Blockly.dragMode_ == Blockly.DRAG_FREE) {
            for (o = goog.math.Coordinate.difference(o, this.dragStartXY_), n = this.getSvgRoot(), this.useDragSurface_ ? this.workspace.blockDragSurface_.translateSurface(t.x, t.y) : (n.translate_ = "translate(" + t.x + "," + t.y + ")", n.setAttribute("transform", n.translate_ + n.skew_)), t = 0; t < this.draggedBubbles_.length; t++)(n = this.draggedBubbles_[t]).bubble.setIconLocation(goog.math.Coordinate.sum(n, o));
            n = this.getConnections_(!1), (t = this.lastConnectionInStack_()) && t != this.nextConnection && n.push(t);
            for (var i = r = null, s = Blockly.SNAP_RADIUS, t = 0; t < n.length; t++) {
                var l = n[t],
                    g = l.closest(s, o);
                g.connection && (r = g.connection, i = l, s = g.radius)
            }
            Blockly.highlightedConnection_ && Blockly.highlightedConnection_ != r && (Blockly.highlightedConnection_.unhighlight(), Blockly.highlightedConnection_ = null, Blockly.localConnection_ = null), !this.updateCursor_(e, r) && r && r != Blockly.highlightedConnection_ && (r.highlight(), Blockly.highlightedConnection_ = r, Blockly.localConnection_ = i)
        }
        e.stopPropagation(), e.preventDefault()
    }
}, Blockly.BlockSvg.prototype.updateCursor_ = function(e, o) {
    var t = this.workspace.isDeleteArea(e),
        n = Blockly.selected && o && t != Blockly.DELETE_AREA_TOOLBOX;
    return t && !this.getParent() && Blockly.selected.isDeletable() && !n ? (Blockly.utils.addClass(this.svgGroup_, "blocklyDraggingDelete"), this.workspace.toolbox_ && this.workspace.toolbox_.addDeleteStyle(), t == Blockly.DELETE_AREA_TRASH && this.workspace.trashcan && this.workspace.trashcan.setOpen_(!0), !0) : (this.workspace.trashcan && this.workspace.trashcan.setOpen_(!1), Blockly.utils.removeClass(this.svgGroup_, "blocklyDraggingDelete"), this.workspace.toolbox_ && this.workspace.toolbox_.removeDeleteStyle(), !1)
}, Blockly.BlockSvg.prototype.updateMovable = function() {
    this.isMovable() ? Blockly.utils.addClass(this.svgGroup_, "blocklyDraggable") : Blockly.utils.removeClass(this.svgGroup_, "blocklyDraggable")
}, Blockly.BlockSvg.prototype.setMovable = function(e) {
    Blockly.BlockSvg.superClass_.setMovable.call(this, e), this.updateMovable()
}, Blockly.BlockSvg.prototype.setEditable = function(e) {
    Blockly.BlockSvg.superClass_.setEditable.call(this, e), e = this.getIcons();
    for (var o = 0; o < e.length; o++) e[o].updateEditable()
}, Blockly.BlockSvg.prototype.setShadow = function(e) {
    Blockly.BlockSvg.superClass_.setShadow.call(this, e), this.updateColour()
}, Blockly.BlockSvg.prototype.getSvgRoot = function() {
    return this.svgGroup_
}, Blockly.BlockSvg.prototype.dispose = function(e, o) {
    if (this.workspace) {
        Blockly.Tooltip.hide(), Blockly.Field.startCache();
        var t = this.workspace;
        Blockly.selected == this && (this.unselect(), Blockly.terminateDrag_()), Blockly.ContextMenu.currentBlock == this && Blockly.ContextMenu.hide(), o && this.rendered && (this.unplug(e), this.disposeUiEffect()), this.rendered = !1, Blockly.Events.disable();
        try {
            for (var n = this.getIcons(), r = 0; r < n.length; r++) n[r].dispose()
        } finally {
            Blockly.Events.enable()
        }
        Blockly.BlockSvg.superClass_.dispose.call(this, e), goog.dom.removeNode(this.svgGroup_), t.resizeContents(), this.svgPathDark_ = this.svgPathLight_ = this.svgPath_ = this.svgGroup_ = null, Blockly.Field.stopCache()
    }
}, Blockly.BlockSvg.prototype.disposeUiEffect = function() {
    this.workspace.playAudio("delete");
    var e = this.workspace.getSvgXY(this.svgGroup_),
        o = this.svgGroup_.cloneNode(!0);
    o.translateX_ = e.x, o.translateY_ = e.y, o.setAttribute("transform", "translate(" + o.translateX_ + "," + o.translateY_ + ")"), this.workspace.getParentSvg().appendChild(o), o.bBox_ = o.getBBox(), Blockly.BlockSvg.disposeUiStep_(o, this.RTL, new Date, this.workspace.scale)
}, Blockly.BlockSvg.disposeUiStep_ = function(e, o, t, n) {
    var r = (new Date - t) / 150;
    1 < r ? goog.dom.removeNode(e) : (e.setAttribute("transform", "translate(" + (e.translateX_ + (o ? -1 : 1) * e.bBox_.width * n / 2 * r) + "," + (e.translateY_ + e.bBox_.height * n * r) + ") scale(" + (1 - r) * n + ")"), setTimeout(function() {
        Blockly.BlockSvg.disposeUiStep_(e, o, t, n)
    }, 10))
}, Blockly.BlockSvg.prototype.connectionUiEffect = function() {
    if (this.workspace.playAudio("click"), !(1 > this.workspace.scale)) {
        var e = this.workspace.getSvgXY(this.svgGroup_);
        this.outputConnection ? (e.x += (this.RTL ? 3 : -3) * this.workspace.scale, e.y += 13 * this.workspace.scale) : this.previousConnection && (e.x += (this.RTL ? -23 : 23) * this.workspace.scale, e.y += 3 * this.workspace.scale), e = Blockly.utils.createSvgElement("circle", {
            cx: e.x,
            cy: e.y,
            r: 0,
            fill: "none",
            stroke: "#888",
            "stroke-width": 10
        }, this.workspace.getParentSvg()), Blockly.BlockSvg.connectionUiStep_(e, new Date, this.workspace.scale)
    }
}, Blockly.BlockSvg.connectionUiStep_ = function(e, o, t) {
    var n = (new Date - o) / 150;
    1 < n ? goog.dom.removeNode(e) : (e.setAttribute("r", 25 * n * t), e.style.opacity = 1 - n, Blockly.BlockSvg.disconnectUiStop_.pid_ = setTimeout(function() {
        Blockly.BlockSvg.connectionUiStep_(e, o, t)
    }, 10))
}, Blockly.BlockSvg.prototype.disconnectUiEffect = function() {
    if (this.workspace.playAudio("disconnect"), !(1 > this.workspace.scale)) {
        var e = this.getHeightWidth().height,
            e = Math.atan(10 / e) / Math.PI * 180;
        this.RTL || (e *= -1), Blockly.BlockSvg.disconnectUiStep_(this.svgGroup_, e, new Date)
    }
}, Blockly.BlockSvg.disconnectUiStep_ = function(e, o, t) {
    var n = (new Date - t) / 200;
    1 < n ? e.skew_ = "" : (e.skew_ = "skewX(" + Math.round(Math.sin(n * Math.PI * 3) * (1 - n) * o) + ")", Blockly.BlockSvg.disconnectUiStop_.group = e, Blockly.BlockSvg.disconnectUiStop_.pid = setTimeout(function() {
        Blockly.BlockSvg.disconnectUiStep_(e, o, t)
    }, 10)), e.setAttribute("transform", e.translate_ + e.skew_)
}, Blockly.BlockSvg.disconnectUiStop_ = function() {
    if (Blockly.BlockSvg.disconnectUiStop_.group) {
        clearTimeout(Blockly.BlockSvg.disconnectUiStop_.pid);
        var e = Blockly.BlockSvg.disconnectUiStop_.group;
        e.skew_ = "", e.setAttribute("transform", e.translate_), Blockly.BlockSvg.disconnectUiStop_.group = null
    }
}, Blockly.BlockSvg.disconnectUiStop_.pid = 0, Blockly.BlockSvg.disconnectUiStop_.group = null, Blockly.BlockSvg.prototype.updateColour = function() {
    if (!this.disabled) {
        var e = this.getColour(),
            o = goog.color.hexToRgb(e);
        if (this.isShadow()) o = goog.color.lighten(o, .6), e = goog.color.rgbArrayToHex(o), this.svgPathLight_.style.display = "none", this.svgPathDark_.setAttribute("fill", e);
        else {
            this.svgPathLight_.style.display = "";
            var t = goog.color.rgbArrayToHex(goog.color.lighten(o, .3)),
                o = goog.color.rgbArrayToHex(goog.color.darken(o, .2));
            this.svgPathLight_.setAttribute("stroke", t), this.svgPathDark_.setAttribute("fill", o)
        }
        for (this.svgPath_.setAttribute("fill", e), e = this.getIcons(), t = 0; t < e.length; t++) e[t].updateColour();
        for (e = 0; t = this.inputList[e]; e++)
            for (var n, o = 0; n = t.fieldRow[o]; o++) n.setText(null)
    }
}, Blockly.BlockSvg.prototype.updateDisabled = function() {
    this.disabled || this.getInheritedDisabled() ? Blockly.utils.addClass(this.svgGroup_, "blocklyDisabled") && this.svgPath_.setAttribute("fill", "url(#" + this.workspace.options.disabledPatternId + ")") : Blockly.utils.removeClass(this.svgGroup_, "blocklyDisabled") && this.updateColour();
    for (var e, o = this.getChildren(), t = 0; e = o[t]; t++) e.updateDisabled()
}, Blockly.BlockSvg.prototype.getCommentText = function() {
    return this.comment ? this.comment.getText().replace(/\s+$/, "").replace(/ +\n/g, "\n") : ""
}, Blockly.BlockSvg.prototype.setCommentText = function(e) {
    var o = !1;
    goog.isString(e) ? (this.comment || (this.comment = new Blockly.Comment(this), o = !0), this.comment.setText(e)) : this.comment && (this.comment.dispose(), o = !0), o && this.rendered && (this.render(), this.bumpNeighbours_())
}, Blockly.BlockSvg.prototype.setWarningText = function(e, o) {
    this.setWarningText.pid_ || (this.setWarningText.pid_ = Object.create(null));
    var t = o || "";
    if (t) this.setWarningText.pid_[t] && (clearTimeout(this.setWarningText.pid_[t]), delete this.setWarningText.pid_[t]);
    else
        for (var n in this.setWarningText.pid_) clearTimeout(this.setWarningText.pid_[n]), delete this.setWarningText.pid_[n];
    if (Blockly.dragMode_ == Blockly.DRAG_FREE) {
        var r = this;
        this.setWarningText.pid_[t] = setTimeout(function() {
            r.workspace && (delete r.setWarningText.pid_[t], r.setWarningText(e, t))
        }, 100)
    } else {
        this.isInFlyout && (e = null), n = this.getSurroundParent();
        for (var i = null; n;) n.isCollapsed() && (i = n), n = n.getSurroundParent();
        i && i.setWarningText(e, "collapsed " + this.id + " " + t), n = !1, goog.isString(e) ? (this.warning || (this.warning = new Blockly.Warning(this), n = !0), this.warning.setText(e, t)) : this.warning && !t ? (this.warning.dispose(), n = !0) : this.warning && (n = this.warning.getText(), this.warning.setText("", t), (i = this.warning.getText()) || this.warning.dispose(), n = n != i), n && this.rendered && (this.render(), this.bumpNeighbours_())
    }
}, Blockly.BlockSvg.prototype.setMutator = function(e) {
    this.mutator && this.mutator !== e && this.mutator.dispose(), e && (e.block_ = this, this.mutator = e, e.createIcon())
}, Blockly.BlockSvg.prototype.setDisabled = function(e) {
    this.disabled != e && (Blockly.BlockSvg.superClass_.setDisabled.call(this, e), this.rendered && this.updateDisabled())
}, Blockly.BlockSvg.prototype.setHighlighted = function(e) {
    this.rendered && (e ? (this.svgPath_.setAttribute("filter", "url(#" + this.workspace.options.embossFilterId + ")"), this.svgPathLight_.style.display = "none") : (Blockly.utils.removeAttribute(this.svgPath_, "filter"), delete this.svgPathLight_.style.display))
}, Blockly.BlockSvg.prototype.addSelect = function() {
    Blockly.utils.addClass(this.svgGroup_, "blocklySelected")
}, Blockly.BlockSvg.prototype.removeSelect = function() {
    Blockly.utils.removeClass(this.svgGroup_, "blocklySelected")
}, Blockly.BlockSvg.prototype.setColour = function(e) {
    Blockly.BlockSvg.superClass_.setColour.call(this, e), this.rendered && this.updateColour()
}, Blockly.BlockSvg.prototype.bringToFront_ = function() {
    var e = this;
    do {
        var o = e.getSvgRoot();
        o.parentNode.appendChild(o), e = e.getParent()
    } while (e)
}, Blockly.BlockSvg.prototype.setPreviousStatement = function(e, o) {
    Blockly.BlockSvg.superClass_.setPreviousStatement.call(this, e, o), this.rendered && (this.render(), this.bumpNeighbours_())
}, Blockly.BlockSvg.prototype.setNextStatement = function(e, o) {
    Blockly.BlockSvg.superClass_.setNextStatement.call(this, e, o), this.rendered && (this.render(), this.bumpNeighbours_())
}, Blockly.BlockSvg.prototype.setOutput = function(e, o) {
    Blockly.BlockSvg.superClass_.setOutput.call(this, e, o), this.rendered && (this.render(), this.bumpNeighbours_())
}, Blockly.BlockSvg.prototype.setInputsInline = function(e) {
    Blockly.BlockSvg.superClass_.setInputsInline.call(this, e), this.rendered && (this.render(), this.bumpNeighbours_())
}, Blockly.BlockSvg.prototype.removeInput = function(e, o) {
    Blockly.BlockSvg.superClass_.removeInput.call(this, e, o), this.rendered && (this.render(), this.bumpNeighbours_())
}, Blockly.BlockSvg.prototype.moveNumberedInputBefore = function(e, o) {
    Blockly.BlockSvg.superClass_.moveNumberedInputBefore.call(this, e, o), this.rendered && (this.render(), this.bumpNeighbours_())
}, Blockly.BlockSvg.prototype.appendInput_ = function(e, o) {
    var t = Blockly.BlockSvg.superClass_.appendInput_.call(this, e, o);
    return this.rendered && (this.render(), this.bumpNeighbours_()), t
}, Blockly.BlockSvg.prototype.getConnections_ = function(e) {
    var o = [];
    if ((e || this.rendered) && (this.outputConnection && o.push(this.outputConnection), this.previousConnection && o.push(this.previousConnection), this.nextConnection && o.push(this.nextConnection), e || !this.collapsed_)) {
        e = 0;
        for (var t; t = this.inputList[e]; e++) t.connection && o.push(t.connection)
    }
    return o
}, Blockly.BlockSvg.prototype.makeConnection_ = function(e) {
    return new Blockly.RenderedConnection(this, e)
}, Blockly.BlockSvg.prototype.bumpNeighbours_ = function() {
    if (this.workspace && Blockly.dragMode_ == Blockly.DRAG_NONE) {
        var e = this.getRootBlock();
        if (!e.isInFlyout)
            for (var o, t = this.getConnections_(!1), n = 0; o = t[n]; n++) {
                o.isConnected() && o.isSuperior() && o.targetBlock().bumpNeighbours_();
                for (var r, i = o.neighbours_(Blockly.SNAP_RADIUS), s = 0; r = i[s]; s++) o.isConnected() && r.isConnected() || r.getSourceBlock().getRootBlock() != e && (o.isSuperior() ? r.bumpAwayFrom_(o) : o.bumpAwayFrom_(r))
            }
    }
}, Blockly.BlockSvg.render = {}, Blockly.BlockSvg.SEP_SPACE_X = 10, Blockly.BlockSvg.SEP_SPACE_Y = 10, Blockly.BlockSvg.INLINE_PADDING_Y = 5, Blockly.BlockSvg.MIN_BLOCK_Y = 25, Blockly.BlockSvg.TAB_HEIGHT = 20, Blockly.BlockSvg.TAB_WIDTH = 8, Blockly.BlockSvg.NOTCH_WIDTH = 30, Blockly.BlockSvg.CORNER_RADIUS = 8, Blockly.BlockSvg.START_HAT = !1, Blockly.BlockSvg.START_HAT_HEIGHT = 15, Blockly.BlockSvg.START_HAT_PATH = "c 30,-" + Blockly.BlockSvg.START_HAT_HEIGHT + " 70,-" + Blockly.BlockSvg.START_HAT_HEIGHT + " 100,0", Blockly.BlockSvg.START_HAT_HIGHLIGHT_LTR = "c 17.8,-9.2 45.3,-14.9 75,-8.7 M 100.5,0.5", Blockly.BlockSvg.START_HAT_HIGHLIGHT_RTL = "m 25,-8.7 c 29.7,-6.2 57.2,-0.5 75,8.7", Blockly.BlockSvg.DISTANCE_45_INSIDE = (1 - Math.SQRT1_2) * (Blockly.BlockSvg.CORNER_RADIUS - .5) + .5, Blockly.BlockSvg.DISTANCE_45_OUTSIDE = (1 - Math.SQRT1_2) * (Blockly.BlockSvg.CORNER_RADIUS + .5) - .5, Blockly.BlockSvg.NOTCH_PATH_LEFT = "l 6,4 3,0 6,-4", Blockly.BlockSvg.NOTCH_PATH_LEFT_HIGHLIGHT = "l 6,4 3,0 6,-4", Blockly.BlockSvg.NOTCH_PATH_RIGHT = "l -6,4 -3,0 -6,-4", Blockly.BlockSvg.JAGGED_TEETH = "l 8,0 0,4 8,4 -16,8 8,4", Blockly.BlockSvg.JAGGED_TEETH_HEIGHT = 20, Blockly.BlockSvg.JAGGED_TEETH_WIDTH = 15, Blockly.BlockSvg.TAB_PATH_DOWN = "v 5 c 0,10 -" + Blockly.BlockSvg.TAB_WIDTH + ",-8 -" + Blockly.BlockSvg.TAB_WIDTH + ",7.5 s " + Blockly.BlockSvg.TAB_WIDTH + ",-2.5 " + Blockly.BlockSvg.TAB_WIDTH + ",7.5", Blockly.BlockSvg.TAB_PATH_DOWN_HIGHLIGHT_RTL = "v 6.5 m -" + .97 * Blockly.BlockSvg.TAB_WIDTH + ",3 q -" + .05 * Blockly.BlockSvg.TAB_WIDTH + ",10 " + .3 * Blockly.BlockSvg.TAB_WIDTH + ",9.5 m " + .67 * Blockly.BlockSvg.TAB_WIDTH + ",-1.9 v 1.4", Blockly.BlockSvg.TOP_LEFT_CORNER_START = "m 0," + Blockly.BlockSvg.CORNER_RADIUS, Blockly.BlockSvg.TOP_LEFT_CORNER_START_HIGHLIGHT_RTL = "m " + Blockly.BlockSvg.DISTANCE_45_INSIDE + "," + Blockly.BlockSvg.DISTANCE_45_INSIDE, Blockly.BlockSvg.TOP_LEFT_CORNER_START_HIGHLIGHT_LTR = "m 0.5," + (Blockly.BlockSvg.CORNER_RADIUS - .5), Blockly.BlockSvg.TOP_LEFT_CORNER = "A " + Blockly.BlockSvg.CORNER_RADIUS + "," + Blockly.BlockSvg.CORNER_RADIUS + " 0 0,1 " + Blockly.BlockSvg.CORNER_RADIUS + ",0", Blockly.BlockSvg.TOP_LEFT_CORNER_HIGHLIGHT = "A " + (Blockly.BlockSvg.CORNER_RADIUS - .5) + "," + (Blockly.BlockSvg.CORNER_RADIUS - .5) + " 0 0,1 " + Blockly.BlockSvg.CORNER_RADIUS + ",0.5", Blockly.BlockSvg.INNER_TOP_LEFT_CORNER = Blockly.BlockSvg.NOTCH_PATH_RIGHT + " h -" + (Blockly.BlockSvg.NOTCH_WIDTH - 15 - Blockly.BlockSvg.CORNER_RADIUS) + " a " + Blockly.BlockSvg.CORNER_RADIUS + "," + Blockly.BlockSvg.CORNER_RADIUS + " 0 0,0 -" + Blockly.BlockSvg.CORNER_RADIUS + "," + Blockly.BlockSvg.CORNER_RADIUS, Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER = "a " + Blockly.BlockSvg.CORNER_RADIUS + "," + Blockly.BlockSvg.CORNER_RADIUS + " 0 0,0 " + Blockly.BlockSvg.CORNER_RADIUS + "," + Blockly.BlockSvg.CORNER_RADIUS, Blockly.BlockSvg.INNER_TOP_LEFT_CORNER_HIGHLIGHT_RTL = "a " + Blockly.BlockSvg.CORNER_RADIUS + "," + Blockly.BlockSvg.CORNER_RADIUS + " 0 0,0 " + (-Blockly.BlockSvg.DISTANCE_45_OUTSIDE - .5) + "," + (Blockly.BlockSvg.CORNER_RADIUS - Blockly.BlockSvg.DISTANCE_45_OUTSIDE), Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER_HIGHLIGHT_RTL = "a " + (Blockly.BlockSvg.CORNER_RADIUS + .5) + "," + (Blockly.BlockSvg.CORNER_RADIUS + .5) + " 0 0,0 " + (Blockly.BlockSvg.CORNER_RADIUS + .5) + "," + (Blockly.BlockSvg.CORNER_RADIUS + .5), Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER_HIGHLIGHT_LTR = "a " + (Blockly.BlockSvg.CORNER_RADIUS + .5) + "," + (Blockly.BlockSvg.CORNER_RADIUS + .5) + " 0 0,0 " + (Blockly.BlockSvg.CORNER_RADIUS - Blockly.BlockSvg.DISTANCE_45_OUTSIDE) + "," + (Blockly.BlockSvg.DISTANCE_45_OUTSIDE + .5), Blockly.BlockSvg.prototype.render = function(e) {
    Blockly.Field.startCache(), this.rendered = !0;
    var o = Blockly.BlockSvg.SEP_SPACE_X;
    this.RTL && (o = -o);
    for (var t = this.getIcons(), n = 0; n < t.length; n++) o = t[n].renderIcon(o);
    o += this.RTL ? Blockly.BlockSvg.SEP_SPACE_X : -Blockly.BlockSvg.SEP_SPACE_X, t = this.renderCompute_(o), this.renderDraw_(o, t), this.renderMoveConnections_(), !1 !== e && ((e = this.getParent()) ? e.render(!0) : this.workspace.resizeContents()), Blockly.Field.stopCache()
}, Blockly.BlockSvg.prototype.renderFields_ = function(e, o, t) {
    t += Blockly.BlockSvg.INLINE_PADDING_Y, this.RTL && (o = -o);
    for (var n, r = 0; n = e[r]; r++) {
        var i = n.getSvgRoot();
        i && ((goog.userAgent.IE || goog.userAgent.EDGE) && n.updateWidth(), this.RTL ? (o -= n.renderSep + n.renderWidth, i.setAttribute("transform", "translate(" + o + "," + t + ")"), n.renderWidth && (o -= Blockly.BlockSvg.SEP_SPACE_X)) : (i.setAttribute("transform", "translate(" + (o + n.renderSep) + "," + t + ")"), n.renderWidth && (o += n.renderSep + n.renderWidth + Blockly.BlockSvg.SEP_SPACE_X)))
    }
    return this.RTL ? -o : o
}, Blockly.BlockSvg.prototype.renderCompute_ = function(e) {
    var o = this.inputList,
        t = [];
    t.rightEdge = e + 2 * Blockly.BlockSvg.SEP_SPACE_X, (this.previousConnection || this.nextConnection) && (t.rightEdge = Math.max(t.rightEdge, Blockly.BlockSvg.NOTCH_WIDTH + Blockly.BlockSvg.SEP_SPACE_X));
    for (var n, r = 0, i = 0, s = !1, l = !1, g = !1, a = void 0, c = this.getInputsInline() && !this.isCollapsed(), u = 0; n = o[u]; u++)
        if (n.isVisible()) {
            if (c && a && a != Blockly.NEXT_STATEMENT && n.type != Blockly.NEXT_STATEMENT) var h = t[t.length - 1];
            else a = n.type, h = [], h.type = c && n.type != Blockly.NEXT_STATEMENT ? Blockly.BlockSvg.INLINE : n.type, h.height = 0, t.push(h);
            if (h.push(n), n.renderHeight = Blockly.BlockSvg.MIN_BLOCK_Y, n.renderWidth = c && n.type == Blockly.INPUT_VALUE ? Blockly.BlockSvg.TAB_WIDTH + 1.25 * Blockly.BlockSvg.SEP_SPACE_X : 0, n.connection && n.connection.isConnected()) {
                d = n.connection.targetBlock().getHeightWidth();
                n.renderHeight = Math.max(n.renderHeight, d.height), n.renderWidth = Math.max(n.renderWidth, d.width)
            }
            c || u != o.length - 1 ? !c && n.type == Blockly.INPUT_VALUE && o[u + 1] && o[u + 1].type == Blockly.NEXT_STATEMENT && n.renderHeight-- : n.renderHeight--, h.height = Math.max(h.height, n.renderHeight), n.fieldWidth = 0, 1 == t.length && (n.fieldWidth += this.RTL ? -e : e);
            for (var p, d = !1, y = 0; p = n.fieldRow[y]; y++) {
                0 != y && (n.fieldWidth += Blockly.BlockSvg.SEP_SPACE_X);
                var f = p.getSize();
                p.renderWidth = f.width, p.renderSep = d && p.EDITABLE ? Blockly.BlockSvg.SEP_SPACE_X : 0, n.fieldWidth += p.renderWidth + p.renderSep, h.height = Math.max(h.height, f.height), d = p.EDITABLE
            }
            h.type != Blockly.BlockSvg.INLINE && (h.type == Blockly.NEXT_STATEMENT ? (l = !0, i = Math.max(i, n.fieldWidth)) : (h.type == Blockly.INPUT_VALUE ? s = !0 : h.type == Blockly.DUMMY_INPUT && (g = !0), r = Math.max(r, n.fieldWidth)))
        }
    for (e = 0; h = t[e]; e++)
        if (h.thicker = !1, h.type == Blockly.BlockSvg.INLINE)
            for (o = 0; n = h[o]; o++)
                if (n.type == Blockly.INPUT_VALUE) {
                    h.height += 2 * Blockly.BlockSvg.INLINE_PADDING_Y, h.thicker = !0;
                    break
                }
    return t.statementEdge = 2 * Blockly.BlockSvg.SEP_SPACE_X + i, l && (t.rightEdge = Math.max(t.rightEdge, t.statementEdge + Blockly.BlockSvg.NOTCH_WIDTH)), s ? t.rightEdge = Math.max(t.rightEdge, r + 2 * Blockly.BlockSvg.SEP_SPACE_X + Blockly.BlockSvg.TAB_WIDTH) : g && (t.rightEdge = Math.max(t.rightEdge, r + 2 * Blockly.BlockSvg.SEP_SPACE_X)), t.hasValue = s, t.hasStatement = l, t.hasDummy = g, t
}, Blockly.BlockSvg.prototype.renderDraw_ = function(e, o) {
    this.startHat_ = !1, this.height = 0, this.outputConnection ? this.squareBottomLeftCorner_ = this.squareTopLeftCorner_ = !0 : (this.squareBottomLeftCorner_ = this.squareTopLeftCorner_ = !1, this.previousConnection ? (r = this.previousConnection.targetBlock()) && r.getNextBlock() == this && (this.squareTopLeftCorner_ = !0) : Blockly.BlockSvg.START_HAT && (this.startHat_ = this.squareTopLeftCorner_ = !0, this.height += Blockly.BlockSvg.START_HAT_HEIGHT, o.rightEdge = Math.max(o.rightEdge, 100)), this.getNextBlock() && (this.squareBottomLeftCorner_ = !0));
    var t = [],
        n = [],
        r = [],
        i = [];
    this.renderDrawTop_(t, r, o.rightEdge);
    var s = this.renderDrawRight_(t, r, n, i, o, e);
    this.renderDrawBottom_(t, r, s), this.renderDrawLeft_(t, r), t = t.join(" ") + "\n" + n.join(" "), this.svgPath_.setAttribute("d", t), this.svgPathDark_.setAttribute("d", t), t = r.join(" ") + "\n" + i.join(" "), this.svgPathLight_.setAttribute("d", t), this.RTL && (this.svgPath_.setAttribute("transform", "scale(-1 1)"), this.svgPathLight_.setAttribute("transform", "scale(-1 1)"), this.svgPathDark_.setAttribute("transform", "translate(1,1) scale(-1 1)"))
}, Blockly.BlockSvg.prototype.renderMoveConnections_ = function() {
    var e = this.getRelativeToSurfaceXY();
    this.previousConnection && this.previousConnection.moveToOffset(e), this.outputConnection && this.outputConnection.moveToOffset(e);
    for (var o = 0; o < this.inputList.length; o++) {
        var t = this.inputList[o].connection;
        t && (t.moveToOffset(e), t.isConnected() && t.tighten_())
    }
    this.nextConnection && (this.nextConnection.moveToOffset(e), this.nextConnection.isConnected() && this.nextConnection.tighten_())
}, Blockly.BlockSvg.prototype.renderDrawTop_ = function(e, o, t) {
    this.squareTopLeftCorner_ ? (e.push("m 0,0"), o.push("m 0.5,0.5"), this.startHat_ && (e.push(Blockly.BlockSvg.START_HAT_PATH), o.push(this.RTL ? Blockly.BlockSvg.START_HAT_HIGHLIGHT_RTL : Blockly.BlockSvg.START_HAT_HIGHLIGHT_LTR))) : (e.push(Blockly.BlockSvg.TOP_LEFT_CORNER_START), o.push(this.RTL ? Blockly.BlockSvg.TOP_LEFT_CORNER_START_HIGHLIGHT_RTL : Blockly.BlockSvg.TOP_LEFT_CORNER_START_HIGHLIGHT_LTR), e.push(Blockly.BlockSvg.TOP_LEFT_CORNER), o.push(Blockly.BlockSvg.TOP_LEFT_CORNER_HIGHLIGHT)), this.previousConnection && (e.push("H", Blockly.BlockSvg.NOTCH_WIDTH - 15), o.push("H", Blockly.BlockSvg.NOTCH_WIDTH - 15), e.push(Blockly.BlockSvg.NOTCH_PATH_LEFT), o.push(Blockly.BlockSvg.NOTCH_PATH_LEFT_HIGHLIGHT), this.previousConnection.setOffsetInBlock(this.RTL ? -Blockly.BlockSvg.NOTCH_WIDTH : Blockly.BlockSvg.NOTCH_WIDTH, 0)), e.push("H", t), o.push("H", t - .5), this.width = t
}, Blockly.BlockSvg.prototype.renderDrawRight_ = function(e, o, t, n, r, i) {
    for (var s, l, g, a, c, u, h = 0, p = 0; u = r[p]; p++) {
        if (l = Blockly.BlockSvg.SEP_SPACE_X, 0 == p && (l += this.RTL ? -i : i), o.push("M", r.rightEdge - .5 + "," + (h + .5)), this.isCollapsed()) a = u[0], g = l, l = h, this.renderFields_(a.fieldRow, g, l), e.push(Blockly.BlockSvg.JAGGED_TEETH), o.push("h 8"), a = u.height - Blockly.BlockSvg.JAGGED_TEETH_HEIGHT, e.push("v", a), this.RTL && (o.push("v 3.9 l 7.2,3.4 m -14.5,8.9 l 7.3,3.5"), o.push("v", a - .7)), this.width += Blockly.BlockSvg.JAGGED_TEETH_WIDTH;
        else if (u.type == Blockly.BlockSvg.INLINE) {
            for (s = 0; a = u[s]; s++) g = l, l = h, u.thicker && (l += Blockly.BlockSvg.INLINE_PADDING_Y), l = this.renderFields_(a.fieldRow, g, l), a.type != Blockly.DUMMY_INPUT && (l += a.renderWidth + Blockly.BlockSvg.SEP_SPACE_X), a.type == Blockly.INPUT_VALUE && (t.push("M", l - Blockly.BlockSvg.SEP_SPACE_X + "," + (h + Blockly.BlockSvg.INLINE_PADDING_Y)), t.push("h", Blockly.BlockSvg.TAB_WIDTH - 2 - a.renderWidth), t.push(Blockly.BlockSvg.TAB_PATH_DOWN), t.push("v", a.renderHeight + 1 - Blockly.BlockSvg.TAB_HEIGHT), t.push("h", a.renderWidth + 2 - Blockly.BlockSvg.TAB_WIDTH), t.push("z"), this.RTL ? (n.push("M", l - Blockly.BlockSvg.SEP_SPACE_X - 2.5 + Blockly.BlockSvg.TAB_WIDTH - a.renderWidth + "," + (h + Blockly.BlockSvg.INLINE_PADDING_Y + .5)), n.push(Blockly.BlockSvg.TAB_PATH_DOWN_HIGHLIGHT_RTL), n.push("v", a.renderHeight - Blockly.BlockSvg.TAB_HEIGHT + 2.5), n.push("h", a.renderWidth - Blockly.BlockSvg.TAB_WIDTH + 2)) : (n.push("M", l - Blockly.BlockSvg.SEP_SPACE_X + .5 + "," + (h + Blockly.BlockSvg.INLINE_PADDING_Y + .5)), n.push("v", a.renderHeight + 1), n.push("h", Blockly.BlockSvg.TAB_WIDTH - 2 - a.renderWidth), n.push("M", l - a.renderWidth - Blockly.BlockSvg.SEP_SPACE_X + .9 + "," + (h + Blockly.BlockSvg.INLINE_PADDING_Y + Blockly.BlockSvg.TAB_HEIGHT - .7)), n.push("l", .46 * Blockly.BlockSvg.TAB_WIDTH + ",-2.1")), g = this.RTL ? -l - Blockly.BlockSvg.TAB_WIDTH + Blockly.BlockSvg.SEP_SPACE_X + a.renderWidth + 1 : l + Blockly.BlockSvg.TAB_WIDTH - Blockly.BlockSvg.SEP_SPACE_X - a.renderWidth - 1, c = h + Blockly.BlockSvg.INLINE_PADDING_Y + 1, a.connection.setOffsetInBlock(g, c));
            l = Math.max(l, r.rightEdge), this.width = Math.max(this.width, l), e.push("H", l), o.push("H", l - .5), e.push("v", u.height), this.RTL && o.push("v", u.height - 1)
        } else u.type == Blockly.INPUT_VALUE ? (a = u[0], g = l, l = h, a.align != Blockly.ALIGN_LEFT && (s = r.rightEdge - a.fieldWidth - Blockly.BlockSvg.TAB_WIDTH - 2 * Blockly.BlockSvg.SEP_SPACE_X, a.align == Blockly.ALIGN_RIGHT ? g += s : a.align == Blockly.ALIGN_CENTRE && (g += s / 2)), this.renderFields_(a.fieldRow, g, l), e.push(Blockly.BlockSvg.TAB_PATH_DOWN), s = u.height - Blockly.BlockSvg.TAB_HEIGHT, e.push("v", s), this.RTL ? (o.push(Blockly.BlockSvg.TAB_PATH_DOWN_HIGHLIGHT_RTL), o.push("v", s + .5)) : (o.push("M", r.rightEdge - 5 + "," + (h + Blockly.BlockSvg.TAB_HEIGHT - .7)), o.push("l", .46 * Blockly.BlockSvg.TAB_WIDTH + ",-2.1")), g = this.RTL ? -r.rightEdge - 1 : r.rightEdge + 1, a.connection.setOffsetInBlock(g, h), a.connection.isConnected() && (this.width = Math.max(this.width, r.rightEdge + a.connection.targetBlock().getHeightWidth().width - Blockly.BlockSvg.TAB_WIDTH + 1))) : u.type == Blockly.DUMMY_INPUT ? (a = u[0], g = l, l = h, a.align != Blockly.ALIGN_LEFT && (s = r.rightEdge - a.fieldWidth - 2 * Blockly.BlockSvg.SEP_SPACE_X, r.hasValue && (s -= Blockly.BlockSvg.TAB_WIDTH), a.align == Blockly.ALIGN_RIGHT ? g += s : a.align == Blockly.ALIGN_CENTRE && (g += s / 2)), this.renderFields_(a.fieldRow, g, l), e.push("v", u.height), this.RTL && o.push("v", u.height - 1)) : u.type == Blockly.NEXT_STATEMENT && (a = u[0], 0 == p && (e.push("v", Blockly.BlockSvg.SEP_SPACE_Y), this.RTL && o.push("v", Blockly.BlockSvg.SEP_SPACE_Y - 1), h += Blockly.BlockSvg.SEP_SPACE_Y), g = l, l = h, a.align != Blockly.ALIGN_LEFT && (s = r.statementEdge - a.fieldWidth - 2 * Blockly.BlockSvg.SEP_SPACE_X, a.align == Blockly.ALIGN_RIGHT ? g += s : a.align == Blockly.ALIGN_CENTRE && (g += s / 2)), this.renderFields_(a.fieldRow, g, l), l = r.statementEdge + Blockly.BlockSvg.NOTCH_WIDTH, e.push("H", l), e.push(Blockly.BlockSvg.INNER_TOP_LEFT_CORNER), e.push("v", u.height - 2 * Blockly.BlockSvg.CORNER_RADIUS), e.push(Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER), e.push("H", r.rightEdge), this.RTL ? (o.push("M", l - Blockly.BlockSvg.NOTCH_WIDTH + Blockly.BlockSvg.DISTANCE_45_OUTSIDE + "," + (h + Blockly.BlockSvg.DISTANCE_45_OUTSIDE)), o.push(Blockly.BlockSvg.INNER_TOP_LEFT_CORNER_HIGHLIGHT_RTL), o.push("v", u.height - 2 * Blockly.BlockSvg.CORNER_RADIUS), o.push(Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER_HIGHLIGHT_RTL)) : (o.push("M", l - Blockly.BlockSvg.NOTCH_WIDTH + Blockly.BlockSvg.DISTANCE_45_OUTSIDE + "," + (h + u.height - Blockly.BlockSvg.DISTANCE_45_OUTSIDE)), o.push(Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER_HIGHLIGHT_LTR)), o.push("H", r.rightEdge - .5), g = this.RTL ? -l : l + 1, a.connection.setOffsetInBlock(g, h + 1), a.connection.isConnected() && (this.width = Math.max(this.width, r.statementEdge + a.connection.targetBlock().getHeightWidth().width)), p == r.length - 1 || r[p + 1].type == Blockly.NEXT_STATEMENT) && (e.push("v", Blockly.BlockSvg.SEP_SPACE_Y), this.RTL && o.push("v", Blockly.BlockSvg.SEP_SPACE_Y - 1), h += Blockly.BlockSvg.SEP_SPACE_Y);
        h += u.height
    }
    return r.length || (h = Blockly.BlockSvg.MIN_BLOCK_Y, e.push("V", h), this.RTL && o.push("V", h - 1)), h
}, Blockly.BlockSvg.prototype.renderDrawBottom_ = function(e, o, t) {
    this.height += t + 1, this.nextConnection && (e.push("H", Blockly.BlockSvg.NOTCH_WIDTH + (this.RTL ? .5 : -.5) + " " + Blockly.BlockSvg.NOTCH_PATH_RIGHT), this.nextConnection.setOffsetInBlock(this.RTL ? -Blockly.BlockSvg.NOTCH_WIDTH : Blockly.BlockSvg.NOTCH_WIDTH, t + 1), this.height += 4), this.squareBottomLeftCorner_ ? (e.push("H 0"), this.RTL || o.push("M", "0.5," + (t - .5))) : (e.push("H", Blockly.BlockSvg.CORNER_RADIUS), e.push("a", Blockly.BlockSvg.CORNER_RADIUS + "," + Blockly.BlockSvg.CORNER_RADIUS + " 0 0,1 -" + Blockly.BlockSvg.CORNER_RADIUS + ",-" + Blockly.BlockSvg.CORNER_RADIUS), this.RTL || (o.push("M", Blockly.BlockSvg.DISTANCE_45_INSIDE + "," + (t - Blockly.BlockSvg.DISTANCE_45_INSIDE)), o.push("A", Blockly.BlockSvg.CORNER_RADIUS - .5 + "," + (Blockly.BlockSvg.CORNER_RADIUS - .5) + " 0 0,1 0.5," + (t - Blockly.BlockSvg.CORNER_RADIUS))))
}, Blockly.BlockSvg.prototype.renderDrawLeft_ = function(e, o) {
    this.outputConnection ? (this.outputConnection.setOffsetInBlock(0, 0), e.push("V", Blockly.BlockSvg.TAB_HEIGHT), e.push("c 0,-10 -" + Blockly.BlockSvg.TAB_WIDTH + ",8 -" + Blockly.BlockSvg.TAB_WIDTH + ",-7.5 s " + Blockly.BlockSvg.TAB_WIDTH + ",2.5 " + Blockly.BlockSvg.TAB_WIDTH + ",-7.5"), this.RTL ? (o.push("M", -.25 * Blockly.BlockSvg.TAB_WIDTH + ",8.4"), o.push("l", -.45 * Blockly.BlockSvg.TAB_WIDTH + ",-2.1")) : (o.push("V", Blockly.BlockSvg.TAB_HEIGHT - 1.5), o.push("m", -.92 * Blockly.BlockSvg.TAB_WIDTH + ",-0.5 q " + -.19 * Blockly.BlockSvg.TAB_WIDTH + ",-5.5 0,-11"), o.push("m", .92 * Blockly.BlockSvg.TAB_WIDTH + ",1 V 0.5 H 1")), this.width += Blockly.BlockSvg.TAB_WIDTH) : this.RTL || (this.squareTopLeftCorner_ ? o.push("V", .5) : o.push("V", Blockly.BlockSvg.CORNER_RADIUS)), e.push("z")
}, Blockly.Events = {}, Blockly.Events.group_ = "", Blockly.Events.recordUndo = !0, Blockly.Events.disabled_ = 0, Blockly.Events.CREATE = "create", Blockly.Events.DELETE = "delete", Blockly.Events.CHANGE = "change", Blockly.Events.MOVE = "move", Blockly.Events.UI = "ui", Blockly.Events.FIRE_QUEUE_ = [], Blockly.Events.fire = function(e) {
    Blockly.Events.isEnabled() && (Blockly.Events.FIRE_QUEUE_.length || setTimeout(Blockly.Events.fireNow_, 0), Blockly.Events.FIRE_QUEUE_.push(e))
}, Blockly.Events.fireNow_ = function() {
    for (var e, o = Blockly.Events.filter(Blockly.Events.FIRE_QUEUE_, !0), t = Blockly.Events.FIRE_QUEUE_.length = 0; e = o[t]; t++) {
        var n = Blockly.Workspace.getById(e.workspaceId);
        n && n.fireChangeListener(e)
    }
}, Blockly.Events.filter = function(e, o) {
    var t = goog.array.clone(e);
    o || t.reverse();
    for (var n, r = 0; n = t[r]; r++)
        for (var i, s = r + 1; i = t[s]; s++) n.type == i.type && n.blockId == i.blockId && n.workspaceId == i.workspaceId && (n.type == Blockly.Events.MOVE ? (n.newParentId = i.newParentId, n.newInputName = i.newInputName, n.newCoordinate = i.newCoordinate, t.splice(s, 1), s--) : n.type == Blockly.Events.CHANGE && n.element == i.element && n.name == i.name ? (n.newValue = i.newValue, t.splice(s, 1), s--) : n.type != Blockly.Events.UI || "click" != i.element || "commentOpen" != n.element && "mutatorOpen" != n.element && "warningOpen" != n.element || (n.newValue = i.newValue, t.splice(s, 1), s--));
    for (r = t.length - 1; 0 <= r; r--) t[r].isNull() && t.splice(r, 1);
    for (o || t.reverse(), r = 1; n = t[r]; r++) n.type == Blockly.Events.CHANGE && "mutation" == n.element && t.unshift(t.splice(r, 1)[0]);
    return t
}, Blockly.Events.clearPendingUndo = function() {
    for (var e, o = 0; e = Blockly.Events.FIRE_QUEUE_[o]; o++) e.recordUndo = !1
}, Blockly.Events.disable = function() {
    Blockly.Events.disabled_++
}, Blockly.Events.enable = function() {
    Blockly.Events.disabled_--
}, Blockly.Events.isEnabled = function() {
    return 0 == Blockly.Events.disabled_
}, Blockly.Events.getGroup = function() {
    return Blockly.Events.group_
}, Blockly.Events.setGroup = function(e) {
    Blockly.Events.group_ = "boolean" == typeof e ? e ? Blockly.utils.genUid() : "" : e
}, Blockly.Events.getDescendantIds_ = function(e) {
    var o = [];
    e = e.getDescendants();
    for (var t, n = 0; t = e[n]; n++) o[n] = t.id;
    return o
}, Blockly.Events.fromJson = function(e, o) {
    switch (e.type) {
        case Blockly.Events.CREATE:
            var t = new Blockly.Events.Create(null);
            break;
        case Blockly.Events.DELETE:
            t = new Blockly.Events.Delete(null);
            break;
        case Blockly.Events.CHANGE:
            t = new Blockly.Events.Change(null);
            break;
        case Blockly.Events.MOVE:
            t = new Blockly.Events.Move(null);
            break;
        case Blockly.Events.UI:
            t = new Blockly.Events.Ui(null);
            break;
        default:
            throw "Unknown event type."
    }
    return t.fromJson(e), t.workspaceId = o.id, t
};
Blockly.Events.Abstract = function(e) {
    e && (this.blockId = e.id, this.workspaceId = e.workspace.id), this.group = Blockly.Events.group_, this.recordUndo = Blockly.Events.recordUndo
}, Blockly.Events.Abstract.prototype.toJson = function() {
    var e = {
        type: this.type
    };
    return this.blockId && (e.blockId = this.blockId), this.group && (e.group = this.group), e
}, Blockly.Events.Abstract.prototype.fromJson = function(e) {
    this.blockId = e.blockId, this.group = e.group
}, Blockly.Events.Abstract.prototype.isNull = function() {
    return !1
}, Blockly.Events.Abstract.prototype.run = function(e) {}, Blockly.Events.Create = function(e) {
    e && (Blockly.Events.Create.superClass_.constructor.call(this, e), this.xml = e.workspace.rendered ? Blockly.Xml.blockToDomWithXY(e) : Blockly.Xml.blockToDom(e), this.ids = Blockly.Events.getDescendantIds_(e))
}, goog.inherits(Blockly.Events.Create, Blockly.Events.Abstract), Blockly.Events.Create.prototype.type = Blockly.Events.CREATE, Blockly.Events.Create.prototype.toJson = function() {
    var e = Blockly.Events.Create.superClass_.toJson.call(this);
    return e.xml = Blockly.Xml.domToText(this.xml), e.ids = this.ids, e
}, Blockly.Events.Create.prototype.fromJson = function(e) {
    Blockly.Events.Create.superClass_.fromJson.call(this, e), this.xml = Blockly.Xml.textToDom("<xml>" + e.xml + "</xml>").firstChild, this.ids = e.ids
}, Blockly.Events.Create.prototype.run = function(e) {
    var o = Blockly.Workspace.getById(this.workspaceId);
    if (e)(e = goog.dom.createDom("xml")).appendChild(this.xml), Blockly.Xml.domToWorkspace(e, o);
    else {
        e = 0;
        for (var t; t = this.ids[e]; e++) {
            var n = o.getBlockById(t);
            n ? n.dispose(!1, !1) : t == this.blockId && console.warn("Can't uncreate non-existant block: " + t)
        }
    }
}, Blockly.Events.Delete = function(e) {
    if (e) {
        if (e.getParent()) throw "Connected blocks cannot be deleted.";
        Blockly.Events.Delete.superClass_.constructor.call(this, e), this.oldXml = e.workspace.rendered ? Blockly.Xml.blockToDomWithXY(e) : Blockly.Xml.blockToDom(e), this.ids = Blockly.Events.getDescendantIds_(e)
    }
}, goog.inherits(Blockly.Events.Delete, Blockly.Events.Abstract), Blockly.Events.Delete.prototype.type = Blockly.Events.DELETE, Blockly.Events.Delete.prototype.toJson = function() {
    var e = Blockly.Events.Delete.superClass_.toJson.call(this);
    return e.ids = this.ids, e
}, Blockly.Events.Delete.prototype.fromJson = function(e) {
    Blockly.Events.Delete.superClass_.fromJson.call(this, e), this.ids = e.ids
}, Blockly.Events.Delete.prototype.run = function(e) {
    var o = Blockly.Workspace.getById(this.workspaceId);
    if (e) {
        e = 0;
        for (var t; t = this.ids[e]; e++) {
            var n = o.getBlockById(t);
            n ? n.dispose(!1, !1) : t == this.blockId && console.warn("Can't delete non-existant block: " + t)
        }
    } else(e = goog.dom.createDom("xml")).appendChild(this.oldXml), Blockly.Xml.domToWorkspace(e, o)
}, Blockly.Events.Change = function(e, o, t, n, r) {
    e && (Blockly.Events.Change.superClass_.constructor.call(this, e), this.element = o, this.name = t, this.oldValue = n, this.newValue = r)
}, goog.inherits(Blockly.Events.Change, Blockly.Events.Abstract), Blockly.Events.Change.prototype.type = Blockly.Events.CHANGE, Blockly.Events.Change.prototype.toJson = function() {
    var e = Blockly.Events.Change.superClass_.toJson.call(this);
    return e.element = this.element, this.name && (e.name = this.name), e.newValue = this.newValue, e
}, Blockly.Events.Change.prototype.fromJson = function(e) {
    Blockly.Events.Change.superClass_.fromJson.call(this, e), this.element = e.element, this.name = e.name, this.newValue = e.newValue
}, Blockly.Events.Change.prototype.isNull = function() {
    return this.oldValue == this.newValue
}, Blockly.Events.Change.prototype.run = function(e) {
    var o = Blockly.Workspace.getById(this.workspaceId).getBlockById(this.blockId);
    if (o) switch (o.mutator && o.mutator.setVisible(!1), e = e ? this.newValue : this.oldValue, this.element) {
        case "field":
            (o = o.getField(this.name)) ? (o.callValidator(e), o.setValue(e)) : console.warn("Can't set non-existant field: " + this.name);
            break;
        case "comment":
            o.setCommentText(e || null);
            break;
        case "collapsed":
            o.setCollapsed(e);
            break;
        case "disabled":
            o.setDisabled(e);
            break;
        case "inline":
            o.setInputsInline(e);
            break;
        case "mutation":
            var t = "";
            if (o.mutationToDom && (t = (t = o.mutationToDom()) && Blockly.Xml.domToText(t)), o.domToMutation) {
                e = e || "<mutation></mutation>";
                var n = Blockly.Xml.textToDom("<xml>" + e + "</xml>");
                o.domToMutation(n.firstChild)
            }
            Blockly.Events.fire(new Blockly.Events.Change(o, "mutation", null, t, e));
            break;
        default:
            console.warn("Unknown change type: " + this.element)
    } else console.warn("Can't change non-existant block: " + this.blockId)
}, Blockly.Events.Move = function(e) {
    e && (Blockly.Events.Move.superClass_.constructor.call(this, e), e = this.currentLocation_(), this.oldParentId = e.parentId, this.oldInputName = e.inputName, this.oldCoordinate = e.coordinate)
}, goog.inherits(Blockly.Events.Move, Blockly.Events.Abstract), Blockly.Events.Move.prototype.type = Blockly.Events.MOVE, Blockly.Events.Move.prototype.toJson = function() {
    var e = Blockly.Events.Move.superClass_.toJson.call(this);
    return this.newParentId && (e.newParentId = this.newParentId), this.newInputName && (e.newInputName = this.newInputName), this.newCoordinate && (e.newCoordinate = Math.round(this.newCoordinate.x) + "," + Math.round(this.newCoordinate.y)), e
}, Blockly.Events.Move.prototype.fromJson = function(e) {
    Blockly.Events.Move.superClass_.fromJson.call(this, e), this.newParentId = e.newParentId, this.newInputName = e.newInputName, e.newCoordinate && (e = e.newCoordinate.split(","), this.newCoordinate = new goog.math.Coordinate(parseFloat(e[0]), parseFloat(e[1])))
}, Blockly.Events.Move.prototype.recordNew = function() {
    var e = this.currentLocation_();
    this.newParentId = e.parentId, this.newInputName = e.inputName, this.newCoordinate = e.coordinate
}, Blockly.Events.Move.prototype.currentLocation_ = function() {
    var e = Blockly.Workspace.getById(this.workspaceId).getBlockById(this.blockId),
        o = {},
        t = e.getParent();
    return t ? (o.parentId = t.id, (e = t.getInputWithBlock(e)) && (o.inputName = e.name)) : o.coordinate = e.getRelativeToSurfaceXY(), o
}, Blockly.Events.Move.prototype.isNull = function() {
    return this.oldParentId == this.newParentId && this.oldInputName == this.newInputName && goog.math.Coordinate.equals(this.oldCoordinate, this.newCoordinate)
}, Blockly.Events.Move.prototype.run = function(e) {
    var o = Blockly.Workspace.getById(this.workspaceId);
    if (i = o.getBlockById(this.blockId)) {
        var t = e ? this.newParentId : this.oldParentId,
            n = e ? this.newInputName : this.oldInputName;
        e = e ? this.newCoordinate : this.oldCoordinate;
        var r = null;
        if (t && !(r = o.getBlockById(t))) return void console.warn("Can't connect to non-existant block: " + t);
        if (i.getParent() && i.unplug(), e) n = i.getRelativeToSurfaceXY(), i.moveBy(e.x - n.x, e.y - n.y);
        else {
            var i = i.outputConnection || i.previousConnection;
            if (n) {
                if (o = r.getInput(n)) var s = o.connection
            } else i.type == Blockly.PREVIOUS_STATEMENT && (s = r.nextConnection);
            s ? i.connect(s) : console.warn("Can't connect to non-existant input: " + n)
        }
    } else console.warn("Can't move non-existant block: " + this.blockId)
}, Blockly.Events.Ui = function(e, o, t, n) {
    Blockly.Events.Ui.superClass_.constructor.call(this, e), this.element = o, this.oldValue = t, this.newValue = n, this.recordUndo = !1
}, goog.inherits(Blockly.Events.Ui, Blockly.Events.Abstract), Blockly.Events.Ui.prototype.type = Blockly.Events.UI, Blockly.Events.Ui.prototype.toJson = function() {
    var e = Blockly.Events.Ui.superClass_.toJson.call(this);
    return e.element = this.element, void 0 !== this.newValue && (e.newValue = this.newValue), e
}, Blockly.Events.Ui.prototype.fromJson = function(e) {
    Blockly.Events.Ui.superClass_.fromJson.call(this, e), this.element = e.element, this.newValue = e.newValue
}, Blockly.Events.disableOrphans = function(e) {
    if (e.type == Blockly.Events.MOVE || e.type == Blockly.Events.CREATE) {
        if (Blockly.Events.disable(), e = Blockly.Workspace.getById(e.workspaceId).getBlockById(e.blockId))
            if (e.getParent() && !e.getParent().disabled) {
                e = e.getDescendants();
                for (var o, t = 0; o = e[t]; t++) o.setDisabled(!1)
            } else if ((e.outputConnection || e.previousConnection) && Blockly.dragMode_ == Blockly.DRAG_NONE)
            do {
                e.setDisabled(!0), e = e.getNextBlock()
            } while (e);
        Blockly.Events.enable()
    }
}, Blockly.Msg = {}, goog.getMsgOrig = goog.getMsg, goog.getMsg = function(e, o) {
    var t = goog.getMsg.blocklyMsgMap[e];
    return t && (e = Blockly.Msg[t]), goog.getMsgOrig(e, o)
}, goog.getMsg.blocklyMsgMap = {
    Today: "TODAY"
}, Blockly.FieldTextInput = function(e, o) {
    Blockly.FieldTextInput.superClass_.constructor.call(this, e, o)
}, goog.inherits(Blockly.FieldTextInput, Blockly.Field), Blockly.FieldTextInput.FONTSIZE = 11, Blockly.FieldTextInput.prototype.CURSOR = "text", Blockly.FieldTextInput.prototype.spellcheck_ = !0, Blockly.FieldTextInput.prototype.dispose = function() {
    Blockly.WidgetDiv.hideIfOwner(this), Blockly.FieldTextInput.superClass_.dispose.call(this)
}, Blockly.FieldTextInput.prototype.setValue = function(e) {
    if (null !== e) {
        if (this.sourceBlock_) {
            var o = this.callValidator(e);
            null !== o && (e = o)
        }
        Blockly.Field.prototype.setValue.call(this, e)
    }
}, Blockly.FieldTextInput.prototype.setText = function(e) {
    null !== e && (e = String(e)) !== this.text_ && (this.sourceBlock_ && Blockly.Events.isEnabled() && Blockly.Events.fire(new Blockly.Events.Change(this.sourceBlock_, "field", this.name, this.text_, e)), Blockly.Field.prototype.setText.call(this, e))
}, Blockly.FieldTextInput.prototype.setSpellcheck = function(e) {
    this.spellcheck_ = e
}, Blockly.FieldTextInput.prototype.showEditor_ = function(e) {
    if (this.workspace_ = this.sourceBlock_.workspace, !(e = e || !1) && (goog.userAgent.MOBILE || goog.userAgent.ANDROID || goog.userAgent.IPAD)) {
        var o = this;
        Blockly.prompt(Blockly.Msg.CHANGE_VALUE_TITLE, this.text_, function(e) {
            o.sourceBlock_ && (e = o.callValidator(e)), o.setValue(e)
        })
    } else {
        Blockly.WidgetDiv.show(this, this.sourceBlock_.RTL, this.widgetDispose_());
        var t = Blockly.WidgetDiv.DIV,
            n = goog.dom.createDom("INPUT", "blocklyHtmlInput");
        n.setAttribute("spellcheck", this.spellcheck_);
        var r = Blockly.FieldTextInput.FONTSIZE * this.workspace_.scale + "pt";
        t.style.fontSize = r, n.style.fontSize = r, Blockly.FieldTextInput.htmlInput_ = n, t.appendChild(n), n.value = n.defaultValue = this.text_, n.oldValue_ = null, this.validate_(), this.resizeEditor_(), e || (n.focus(), n.select()), n.onKeyDownWrapper_ = Blockly.bindEventWithChecks_(n, "keydown", this, this.onHtmlInputKeyDown_), n.onKeyUpWrapper_ = Blockly.bindEventWithChecks_(n, "keyup", this, this.onHtmlInputChange_), n.onKeyPressWrapper_ = Blockly.bindEventWithChecks_(n, "keypress", this, this.onHtmlInputChange_), n.onWorkspaceChangeWrapper_ = this.resizeEditor_.bind(this), this.workspace_.addChangeListener(n.onWorkspaceChangeWrapper_)
    }
}, Blockly.FieldTextInput.prototype.onHtmlInputKeyDown_ = function(e) {
    var o = Blockly.FieldTextInput.htmlInput_;
    13 == e.keyCode ? Blockly.WidgetDiv.hide() : 27 == e.keyCode ? (o.value = o.defaultValue, Blockly.WidgetDiv.hide()) : 9 == e.keyCode && (Blockly.WidgetDiv.hide(), this.sourceBlock_.tab(this, !e.shiftKey), e.preventDefault())
}, Blockly.FieldTextInput.prototype.onHtmlInputChange_ = function(e) {
    var o = (e = Blockly.FieldTextInput.htmlInput_).value;
    o !== e.oldValue_ ? (e.oldValue_ = o, this.setValue(o), this.validate_()) : goog.userAgent.WEBKIT && this.sourceBlock_.render(), this.resizeEditor_(), Blockly.svgResize(this.sourceBlock_.workspace)
}, Blockly.FieldTextInput.prototype.validate_ = function() {
    var e = !0;
    goog.asserts.assertObject(Blockly.FieldTextInput.htmlInput_);
    var o = Blockly.FieldTextInput.htmlInput_;
    this.sourceBlock_ && (e = this.callValidator(o.value)), null === e ? Blockly.utils.addClass(o, "blocklyInvalidInput") : Blockly.utils.removeClass(o, "blocklyInvalidInput")
}, Blockly.FieldTextInput.prototype.resizeEditor_ = function() {
    var e = Blockly.WidgetDiv.DIV,
        o = this.fieldGroup_.getBBox();
    if (e.style.width = o.width * this.workspace_.scale + "px", e.style.height = o.height * this.workspace_.scale + "px", o = this.getAbsoluteXY_(), this.sourceBlock_.RTL) {
        var t = this.getScaledBBox_();
        o.x += t.width, o.x -= e.offsetWidth
    }
    o.y += 1, goog.userAgent.GECKO && Blockly.WidgetDiv.DIV.style.top && (--o.x, --o.y), goog.userAgent.WEBKIT && (o.y -= 3), e.style.left = o.x + "px", e.style.top = o.y + "px"
}, Blockly.FieldTextInput.prototype.widgetDispose_ = function() {
    var e = this;
    return function() {
        var o = Blockly.FieldTextInput.htmlInput_,
            t = o.value;
        e.sourceBlock_ && (null === (t = e.callValidator(t)) ? t = o.defaultValue : e.onFinishEditing_ && e.onFinishEditing_(t)), e.setText(t), e.sourceBlock_.rendered && e.sourceBlock_.render(), Blockly.unbindEvent_(o.onKeyDownWrapper_), Blockly.unbindEvent_(o.onKeyUpWrapper_), Blockly.unbindEvent_(o.onKeyPressWrapper_), e.workspace_.removeChangeListener(o.onWorkspaceChangeWrapper_), Blockly.FieldTextInput.htmlInput_ = null, Blockly.Events.setGroup(!1), (o = Blockly.WidgetDiv.DIV.style).width = "auto", o.height = "auto", o.fontSize = ""
    }
}, Blockly.FieldTextInput.numberValidator = function(e) {
    return console.warn("Blockly.FieldTextInput.numberValidator is deprecated. Use Blockly.FieldNumber instead."), null === e ? null : (e = String(e), e = e.replace(/O/gi, "0"), e = e.replace(/,/g, ""), e = parseFloat(e || 0), isNaN(e) ? null : String(e))
}, Blockly.FieldTextInput.nonnegativeIntegerValidator = function(e) {
    return (e = Blockly.FieldTextInput.numberValidator(e)) && (e = String(Math.max(0, Math.floor(e)))), e
}, Blockly.FieldAngle = function(e, o) {
    this.symbol_ = Blockly.utils.createSvgElement("tspan", {}, null), this.symbol_.appendChild(document.createTextNode("°")), e = e && !isNaN(e) ? String(e) : "0", Blockly.FieldAngle.superClass_.constructor.call(this, e, o)
}, goog.inherits(Blockly.FieldAngle, Blockly.FieldTextInput), Blockly.FieldAngle.ROUND = 15, Blockly.FieldAngle.HALF = 50, Blockly.FieldAngle.CLOCKWISE = !1, Blockly.FieldAngle.OFFSET = 0, Blockly.FieldAngle.WRAP = 360, Blockly.FieldAngle.RADIUS = Blockly.FieldAngle.HALF - 1, Blockly.FieldAngle.prototype.render_ = function() {
    this.visible_ ? (this.textElement_.textContent = this.getDisplayText_(), this.sourceBlock_.RTL ? this.textElement_.insertBefore(this.symbol_, this.textElement_.firstChild) : this.textElement_.appendChild(this.symbol_), this.updateWidth()) : this.size_.width = 0
}, Blockly.FieldAngle.prototype.dispose_ = function() {
    var e = this;
    return function() {
        Blockly.FieldAngle.superClass_.dispose_.call(e)(), e.gauge_ = null, e.clickWrapper_ && Blockly.unbindEvent_(e.clickWrapper_), e.moveWrapper1_ && Blockly.unbindEvent_(e.moveWrapper1_), e.moveWrapper2_ && Blockly.unbindEvent_(e.moveWrapper2_)
    }
}, Blockly.FieldAngle.prototype.showEditor_ = function() {
    if (Blockly.FieldAngle.superClass_.showEditor_.call(this, goog.userAgent.MOBILE || goog.userAgent.ANDROID || goog.userAgent.IPAD), (e = Blockly.WidgetDiv.DIV).firstChild) {
        var e = Blockly.utils.createSvgElement("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                "xmlns:html": "http://www.w3.org/1999/xhtml",
                "xmlns:xlink": "http://www.w3.org/1999/xlink",
                version: "1.1",
                height: 2 * Blockly.FieldAngle.HALF + "px",
                width: 2 * Blockly.FieldAngle.HALF + "px"
            }, e),
            o = Blockly.utils.createSvgElement("circle", {
                cx: Blockly.FieldAngle.HALF,
                cy: Blockly.FieldAngle.HALF,
                r: Blockly.FieldAngle.RADIUS,
                class: "blocklyAngleCircle"
            }, e);
        this.gauge_ = Blockly.utils.createSvgElement("path", {
            class: "blocklyAngleGauge"
        }, e), this.line_ = Blockly.utils.createSvgElement("line", {
            x1: Blockly.FieldAngle.HALF,
            y1: Blockly.FieldAngle.HALF,
            class: "blocklyAngleLine"
        }, e);
        for (var t = 0; 360 > t; t += 15) Blockly.utils.createSvgElement("line", {
            x1: Blockly.FieldAngle.HALF + Blockly.FieldAngle.RADIUS,
            y1: Blockly.FieldAngle.HALF,
            x2: Blockly.FieldAngle.HALF + Blockly.FieldAngle.RADIUS - (0 == t % 45 ? 10 : 5),
            y2: Blockly.FieldAngle.HALF,
            class: "blocklyAngleMarks",
            transform: "rotate(" + t + "," + Blockly.FieldAngle.HALF + "," + Blockly.FieldAngle.HALF + ")"
        }, e);
        e.style.marginLeft = 15 - Blockly.FieldAngle.RADIUS + "px", this.clickWrapper_ = Blockly.bindEvent_(e, "click", this, Blockly.WidgetDiv.hide), this.moveWrapper1_ = Blockly.bindEvent_(o, "mousemove", this, this.onMouseMove), this.moveWrapper2_ = Blockly.bindEvent_(this.gauge_, "mousemove", this, this.onMouseMove), this.updateGraph_()
    }
}, Blockly.FieldAngle.prototype.onMouseMove = function(e) {
    var o = this.gauge_.ownerSVGElement.getBoundingClientRect(),
        t = e.clientX - o.left - Blockly.FieldAngle.HALF;
    e = e.clientY - o.top - Blockly.FieldAngle.HALF, o = Math.atan(-e / t), isNaN(o) || (o = goog.math.toDegrees(o), 0 > t ? o += 180 : 0 < e && (o += 360), o = Blockly.FieldAngle.CLOCKWISE ? Blockly.FieldAngle.OFFSET + 360 - o : o - Blockly.FieldAngle.OFFSET, Blockly.FieldAngle.ROUND && (o = Math.round(o / Blockly.FieldAngle.ROUND) * Blockly.FieldAngle.ROUND), o = this.callValidator(o), Blockly.FieldTextInput.htmlInput_.value = o, this.setValue(o), this.validate_(), this.resizeEditor_())
}, Blockly.FieldAngle.prototype.setText = function(e) {
    Blockly.FieldAngle.superClass_.setText.call(this, e), this.textElement_ && (this.updateGraph_(), this.size_.width = 0)
}, Blockly.FieldAngle.prototype.updateGraph_ = function() {
    if (this.gauge_) {
        var e = Number(this.getText()) + Blockly.FieldAngle.OFFSET,
            o = goog.math.toRadians(e),
            e = ["M ", Blockly.FieldAngle.HALF, ",", Blockly.FieldAngle.HALF],
            t = Blockly.FieldAngle.HALF,
            n = Blockly.FieldAngle.HALF;
        if (!isNaN(o)) {
            var r = goog.math.toRadians(Blockly.FieldAngle.OFFSET),
                i = Math.cos(r) * Blockly.FieldAngle.RADIUS,
                s = Math.sin(r) * -Blockly.FieldAngle.RADIUS;
            Blockly.FieldAngle.CLOCKWISE && (o = 2 * r - o), t += Math.cos(o) * Blockly.FieldAngle.RADIUS, n -= Math.sin(o) * Blockly.FieldAngle.RADIUS, o = Math.abs(Math.floor((o - r) / Math.PI) % 2), Blockly.FieldAngle.CLOCKWISE && (o = 1 - o), e.push(" l ", i, ",", s, " A ", Blockly.FieldAngle.RADIUS, ",", Blockly.FieldAngle.RADIUS, " 0 ", o, " ", Number(Blockly.FieldAngle.CLOCKWISE), " ", t, ",", n, " z")
        }
        this.gauge_.setAttribute("d", e.join("")), this.line_.setAttribute("x2", t), this.line_.setAttribute("y2", n)
    }
}, Blockly.FieldAngle.prototype.classValidator = function(e) {
    return null === e ? null : (e = parseFloat(e || 0), isNaN(e) ? null : (0 > (e %= 360) && (e += 360), e > Blockly.FieldAngle.WRAP && (e -= 360), String(e)))
}, Blockly.FieldCheckbox = function(e, o) {
    Blockly.FieldCheckbox.superClass_.constructor.call(this, "", o), this.setValue(e)
}, goog.inherits(Blockly.FieldCheckbox, Blockly.Field), Blockly.FieldCheckbox.CHECK_CHAR = "✓", Blockly.FieldCheckbox.prototype.CURSOR = "default", Blockly.FieldCheckbox.prototype.init = function() {
    if (!this.fieldGroup_) {
        Blockly.FieldCheckbox.superClass_.init.call(this), this.checkElement_ = Blockly.utils.createSvgElement("text", {
            class: "blocklyText blocklyCheckbox",
            x: -3,
            y: 14
        }, this.fieldGroup_);
        var e = document.createTextNode(Blockly.FieldCheckbox.CHECK_CHAR);
        this.checkElement_.appendChild(e), this.checkElement_.style.display = this.state_ ? "block" : "none"
    }
}, Blockly.FieldCheckbox.prototype.getValue = function() {
    return String(this.state_).toUpperCase()
}, Blockly.FieldCheckbox.prototype.setValue = function(e) {
    e = "string" == typeof e ? "TRUE" == e.toUpperCase() : !!e, this.state_ !== e && (this.sourceBlock_ && Blockly.Events.isEnabled() && Blockly.Events.fire(new Blockly.Events.Change(this.sourceBlock_, "field", this.name, this.state_, e)), this.state_ = e, this.checkElement_ && (this.checkElement_.style.display = e ? "block" : "none"))
}, Blockly.FieldCheckbox.prototype.showEditor_ = function() {
    var e = !this.state_;
    this.sourceBlock_ && (e = this.callValidator(e)), null !== e && this.setValue(String(e).toUpperCase())
}, Blockly.FieldColour = function(e, o) {
    Blockly.FieldColour.superClass_.constructor.call(this, e, o), this.setText(Blockly.Field.NBSP + Blockly.Field.NBSP + Blockly.Field.NBSP)
}, goog.inherits(Blockly.FieldColour, Blockly.Field), Blockly.FieldColour.prototype.colours_ = null, Blockly.FieldColour.prototype.columns_ = 0, Blockly.FieldColour.prototype.init = function() {
    Blockly.FieldColour.superClass_.init.call(this), this.borderRect_.style.fillOpacity = 1, this.setValue(this.getValue())
}, Blockly.FieldColour.prototype.CURSOR = "default", Blockly.FieldColour.prototype.dispose = function() {
    Blockly.WidgetDiv.hideIfOwner(this), Blockly.FieldColour.superClass_.dispose.call(this)
}, Blockly.FieldColour.prototype.getValue = function() {
    return this.colour_
}, Blockly.FieldColour.prototype.setValue = function(e) {
    this.sourceBlock_ && Blockly.Events.isEnabled() && this.colour_ != e && Blockly.Events.fire(new Blockly.Events.Change(this.sourceBlock_, "field", this.name, this.colour_, e)), this.colour_ = e, this.borderRect_ && (this.borderRect_.style.fill = e)
}, Blockly.FieldColour.prototype.getText = function() {
    var e = this.colour_,
        o = e.match(/^#(.)\1(.)\2(.)\3$/);
    return o && (e = "#" + o[1] + o[2] + o[3]), e
}, Blockly.FieldColour.COLOURS = goog.ui.ColorPicker.SIMPLE_GRID_COLORS, Blockly.FieldColour.COLUMNS = 7, Blockly.FieldColour.prototype.setColours = function(e) {
    return this.colours_ = e, this
}, Blockly.FieldColour.prototype.setColumns = function(e) {
    return this.columns_ = e, this
}, Blockly.FieldColour.prototype.showEditor_ = function() {
    Blockly.WidgetDiv.show(this, this.sourceBlock_.RTL, Blockly.FieldColour.widgetDispose_);
    var e = new goog.ui.ColorPicker;
    e.setSize(this.columns_ || Blockly.FieldColour.COLUMNS), e.setColors(this.colours_ || Blockly.FieldColour.COLOURS);
    var o = goog.dom.getViewportSize(),
        t = goog.style.getViewportPageOffset(document),
        n = this.getAbsoluteXY_(),
        r = this.getScaledBBox_();
    e.render(Blockly.WidgetDiv.DIV), e.setSelectedColor(this.getValue());
    var i = goog.style.getSize(e.getElement());
    n.y = n.y + i.height + r.height >= o.height + t.y ? n.y - (i.height - 1) : n.y + (r.height - 1), this.sourceBlock_.RTL ? (n.x += r.width, n.x -= i.width, n.x < t.x && (n.x = t.x)) : n.x > o.width + t.x - i.width && (n.x = o.width + t.x - i.width), Blockly.WidgetDiv.position(n.x, n.y, o, t, this.sourceBlock_.RTL);
    var s = this;
    Blockly.FieldColour.changeEventKey_ = goog.events.listen(e, goog.ui.ColorPicker.EventType.CHANGE, function(e) {
        e = e.target.getSelectedColor() || "#000000", Blockly.WidgetDiv.hide(), s.sourceBlock_ && (e = s.callValidator(e)), null !== e && s.setValue(e)
    })
}, Blockly.FieldColour.widgetDispose_ = function() {
    Blockly.FieldColour.changeEventKey_ && goog.events.unlistenByKey(Blockly.FieldColour.changeEventKey_), Blockly.Events.setGroup(!1)
}, Blockly.FieldDropdown = function(e, o) {
    this.menuGenerator_ = e, this.trimOptions_();
    var t = this.getOptions()[0];
    Blockly.FieldDropdown.superClass_.constructor.call(this, t[1], o)
}, goog.inherits(Blockly.FieldDropdown, Blockly.Field), Blockly.FieldDropdown.CHECKMARK_OVERHANG = 25, Blockly.FieldDropdown.ARROW_CHAR = goog.userAgent.ANDROID ? "▼" : "▾", Blockly.FieldDropdown.prototype.CURSOR = "default", Blockly.FieldDropdown.prototype.value_ = "", Blockly.FieldDropdown.prototype.imageElement_ = null, Blockly.FieldDropdown.prototype.imageJson_ = null, Blockly.FieldDropdown.prototype.init = function() {
    if (!this.fieldGroup_) {
        this.arrow_ = Blockly.utils.createSvgElement("tspan", {}, null), this.arrow_.appendChild(document.createTextNode(this.sourceBlock_.RTL ? Blockly.FieldDropdown.ARROW_CHAR + " " : " " + Blockly.FieldDropdown.ARROW_CHAR)), Blockly.FieldDropdown.superClass_.init.call(this);
        var e = this.text_;
        this.text_ = null, this.setText(e)
    }
}, Blockly.FieldDropdown.prototype.showEditor_ = function() {
    Blockly.WidgetDiv.show(this, this.sourceBlock_.RTL, null);
    var e = this,
        o = new goog.ui.Menu;
    o.setRightToLeft(this.sourceBlock_.RTL);
    for (var t = this.getOptions(), n = 0; n < t.length; n++) {
        var r = t[n][0],
            i = t[n][1];
        if ("object" == typeof r) {
            var s = new Image(r.width, r.height);
            s.src = r.src, s.alt = r.alt || "", r = s
        }(r = new goog.ui.MenuItem(r)).setRightToLeft(this.sourceBlock_.RTL), r.setValue(i), r.setCheckable(!0), o.addChild(r, !0), r.setChecked(i == this.value_)
    }
    goog.events.listen(o, goog.ui.Component.EventType.ACTION, function(o) {
        (o = o.target) && e.onItemSelected(this, o), Blockly.WidgetDiv.hideIfOwner(e), Blockly.Events.setGroup(!1)
    }), o.getHandler().listen(o.getElement(), goog.events.EventType.TOUCHSTART, function(e) {
        this.getOwnerControl(e.target).handleMouseDown(e)
    }), o.getHandler().listen(o.getElement(), goog.events.EventType.TOUCHEND, function(e) {
        this.getOwnerControl(e.target).performActionInternal(e)
    }), t = goog.dom.getViewportSize(), n = goog.style.getViewportPageOffset(document), i = this.getAbsoluteXY_(), r = this.getScaledBBox_(), o.render(Blockly.WidgetDiv.DIV), s = o.getElement(), Blockly.utils.addClass(s, "blocklyDropdownMenu");
    var l = goog.style.getSize(s);
    l.height = s.scrollHeight, i.y = i.y + l.height + r.height >= t.height + n.y ? i.y - (l.height + 2) : i.y + r.height, this.sourceBlock_.RTL ? (i.x += r.width, i.x += Blockly.FieldDropdown.CHECKMARK_OVERHANG, i.x < n.x + l.width && (i.x = n.x + l.width)) : (i.x -= Blockly.FieldDropdown.CHECKMARK_OVERHANG, i.x > t.width + n.x - l.width && (i.x = t.width + n.x - l.width)), Blockly.WidgetDiv.position(i.x, i.y, t, n, this.sourceBlock_.RTL), o.setAllowAutoFocus(!0), s.focus()
}, Blockly.FieldDropdown.prototype.onItemSelected = function(e, o) {
    var t = o.getValue();
    this.sourceBlock_ && (t = this.callValidator(t)), null !== t && this.setValue(t)
}, Blockly.FieldDropdown.prototype.trimOptions_ = function() {
    this.suffixField = this.prefixField = null;
    var e = this.menuGenerator_;
    if (goog.isArray(e)) {
        for (var o = !1, t = 0; t < e.length; t++) {
            var n = e[t][0];
            "string" == typeof n ? e[t][0] = Blockly.utils.replaceMessageReferences(n) : (null != n.alt && (e[t][0].alt = Blockly.utils.replaceMessageReferences(n.alt)), o = !0)
        }
        if (!(o || 2 > e.length)) {
            for (var r = [], t = 0; t < e.length; t++) r.push(e[t][0]);
            if (t = Blockly.utils.shortestStringLength(r), o = Blockly.utils.commonWordPrefix(r, t), n = Blockly.utils.commonWordSuffix(r, t), (o || n) && !(t <= o + n)) {
                for (o && (this.prefixField = r[0].substring(0, o - 1)), n && (this.suffixField = r[0].substr(1 - n)), r = [], t = 0; t < e.length; t++) {
                    var i = e[t][0],
                        s = e[t][1],
                        i = i.substring(o, i.length - n);
                    r[t] = [i, s]
                }
                this.menuGenerator_ = r
            }
        }
    }
}, Blockly.FieldDropdown.prototype.isOptionListDynamic = function() {
    return goog.isFunction(this.menuGenerator_)
}, Blockly.FieldDropdown.prototype.getOptions = function() {
    return goog.isFunction(this.menuGenerator_) ? this.menuGenerator_.call(this) : this.menuGenerator_
}, Blockly.FieldDropdown.prototype.getValue = function() {
    return this.value_
}, Blockly.FieldDropdown.prototype.setValue = function(e) {
    if (null !== e && e !== this.value_) {
        this.sourceBlock_ && Blockly.Events.isEnabled() && Blockly.Events.fire(new Blockly.Events.Change(this.sourceBlock_, "field", this.name, this.value_, e)), this.value_ = e;
        for (var o = this.getOptions(), t = 0; t < o.length; t++)
            if (o[t][1] == e) return e = o[t][0], void("object" == typeof e ? (this.imageJson_ = e, this.setText(e.alt)) : (this.imageJson_ = null, this.setText(e)));
        this.setText(e)
    }
}, Blockly.FieldDropdown.prototype.render_ = function() {
    if (this.visible_) {
        if (this.sourceBlock_ && this.arrow_ && (this.arrow_.style.fill = this.sourceBlock_.getColour()), goog.dom.removeChildren(this.textElement_), goog.dom.removeNode(this.imageElement_), this.imageElement_ = null, this.imageJson_) {
            this.imageElement_ = Blockly.utils.createSvgElement("image", {
                y: 5,
                height: this.imageJson_.height + "px",
                width: this.imageJson_.width + "px"
            }, this.fieldGroup_), this.imageElement_.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", this.imageJson_.src), this.textElement_.appendChild(this.arrow_);
            var e = Blockly.Field.getCachedWidth(this.arrow_);
            this.size_.height = Number(this.imageJson_.height) + 19, this.size_.width = Number(this.imageJson_.width) + e, this.sourceBlock_.RTL ? (this.imageElement_.setAttribute("x", e), this.textElement_.setAttribute("x", -1)) : (this.textElement_.setAttribute("text-anchor", "end"), this.textElement_.setAttribute("x", this.size_.width + 1))
        } else e = document.createTextNode(this.getDisplayText_()), this.textElement_.appendChild(e), this.sourceBlock_.RTL ? this.textElement_.insertBefore(this.arrow_, this.textElement_.firstChild) : this.textElement_.appendChild(this.arrow_), this.textElement_.setAttribute("text-anchor", "start"), this.textElement_.setAttribute("x", 0), this.size_.height = Blockly.BlockSvg.MIN_BLOCK_Y, this.size_.width = Blockly.Field.getCachedWidth(this.textElement_);
        this.borderRect_.setAttribute("height", this.size_.height - 9), this.borderRect_.setAttribute("width", this.size_.width + Blockly.BlockSvg.SEP_SPACE_X)
    } else this.size_.width = 0
}, Blockly.FieldDropdown.prototype.dispose = function() {
    Blockly.WidgetDiv.hideIfOwner(this), Blockly.FieldDropdown.superClass_.dispose.call(this)
}, Blockly.FieldImage = function(e, o, t, n) {
    this.sourceBlock_ = null, this.height_ = Number(t), this.width_ = Number(o), this.size_ = new goog.math.Size(this.width_, this.height_ + 2 * Blockly.BlockSvg.INLINE_PADDING_Y), this.text_ = n || "", this.setValue(e)
}, goog.inherits(Blockly.FieldImage, Blockly.Field), Blockly.FieldImage.prototype.EDITABLE = !1, Blockly.FieldImage.prototype.init = function() {
    this.fieldGroup_ || (this.fieldGroup_ = Blockly.utils.createSvgElement("g", {}, null), this.visible_ || (this.fieldGroup_.style.display = "none"), this.imageElement_ = Blockly.utils.createSvgElement("image", {
        height: this.height_ + "px",
        width: this.width_ + "px"
    }, this.fieldGroup_), this.setValue(this.src_), this.sourceBlock_.getSvgRoot().appendChild(this.fieldGroup_), this.setTooltip(this.sourceBlock_), Blockly.Tooltip.bindMouseEvents(this.imageElement_))
}, Blockly.FieldImage.prototype.dispose = function() {
    goog.dom.removeNode(this.fieldGroup_), this.imageElement_ = this.fieldGroup_ = null
}, Blockly.FieldImage.prototype.setTooltip = function(e) {
    this.imageElement_.tooltip = e
}, Blockly.FieldImage.prototype.getValue = function() {
    return this.src_
}, Blockly.FieldImage.prototype.setValue = function(e) {
    null !== e && (this.src_ = e, this.imageElement_ && this.imageElement_.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", e || ""))
}, Blockly.FieldImage.prototype.setText = function(e) {
    null !== e && (this.text_ = e)
}, Blockly.FieldImage.prototype.render_ = function() {}, Blockly.FieldImage.prototype.updateWidth = function() {}, Blockly.FieldNumber = function(e, o, t, n, r) {
    e = e && !isNaN(e) ? String(e) : "0", Blockly.FieldNumber.superClass_.constructor.call(this, e, r), this.setConstraints(o, t, n)
}, goog.inherits(Blockly.FieldNumber, Blockly.FieldTextInput), Blockly.FieldNumber.prototype.setConstraints = function(e, o, t) {
    t = parseFloat(t), this.precision_ = isNaN(t) ? 0 : t, e = parseFloat(e), this.min_ = isNaN(e) ? -1 / 0 : e, o = parseFloat(o), this.max_ = isNaN(o) ? 1 / 0 : o, this.setValue(this.callValidator(this.getValue()))
}, Blockly.FieldNumber.prototype.classValidator = function(e) {
    return null === e ? null : (e = String(e), e = e.replace(/O/gi, "0"), e = e.replace(/,/g, ""), e = parseFloat(e || 0), isNaN(e) ? null : (this.precision_ && isFinite(e) && (e = Math.round(e / this.precision_) * this.precision_), e = goog.math.clamp(e, this.min_, this.max_), String(e)))
}, Blockly.Variables = {}, Blockly.Variables.NAME_TYPE = Blockly.VARIABLE_CATEGORY_NAME, Blockly.Variables.allUsedVariables = function(e) {
    if (e instanceof Blockly.Block) var o = e.getDescendants();
    else {
        if (!e.getAllBlocks) throw "Not Block or Workspace: " + e;
        o = e.getAllBlocks()
    }
    e = Object.create(null);
    for (var t = 0; t < o.length; t++) {
        var n = o[t].getVars();
        if (n)
            for (var r = 0; r < n.length; r++) {
                var i = n[r];
                i && (e[i.toLowerCase()] = i)
            }
    }
    o = [];
    for (var s in e) o.push(e[s]);
    return o
}, Blockly.Variables.allVariables = function(e) {
    var o;
    o = e ? e.getDescendants() : Blockly.mainWorkspace.getAllBlocks(), e = Object.create(null);
    for (var t = 0; t < o.length; t++)
        if (n = o[t].getVars)
            for (var n = n.call(o[t]), r = 0; r < n.length; r++) {
                var i = n[r];
                i && (e[i.toLowerCase()] = i)
            }
    o = [];
    for (var s in e) o.push(e[s]);
    return o
}, Blockly.Variables.flyoutCategory = function(e) {
    var o = e.variableList;
    o.sort(goog.string.caseInsensitiveCompare);
    var t = [],
        n = goog.dom.createDom("button");
    if (n.setAttribute("text", Blockly.Msg.NEW_VARIABLE), n.setAttribute("callbackKey", "CREATE_VARIABLE"), e.registerButtonCallback("CREATE_VARIABLE", function(e) {
            Blockly.Variables.createVariable(e.getTargetWorkspace())
        }), t.push(n), 0 < o.length)
        for (Blockly.Blocks.variables_set && (e = Blockly.Blocks.math_change ? 8 : 24, n = '<xml><block type="variables_set" gap="' + e + '"><field name="VAR">' + o[0] + "</field></block></xml>", n = Blockly.Xml.textToDom(n).firstChild, t.push(n)), Blockly.Blocks.math_change && (e = Blockly.Blocks.variables_get ? 20 : 8, n = '<xml><block type="math_change" gap="' + e + '"><field name="VAR">' + o[0] + '</field><value name="DELTA"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block></xml>', n = Blockly.Xml.textToDom(n).firstChild, t.push(n)), e = 0; e < o.length; e++) Blockly.Blocks.variables_get && (n = '<xml><block type="variables_get" gap="8"><field name="VAR">' + o[e] + "</field></block></xml>", n = Blockly.Xml.textToDom(n).firstChild, t.push(n));
    return t
}, Blockly.Variables.generateUniqueName = function(e) {
    var o = "";
    if ((e = e.variableList).length)
        for (var t = 1, n = 0, r = "ijkmnopqrstuvwxyzabcdefgh".charAt(n); !o;) {
            for (var i = !1, s = 0; s < e.length; s++)
                if (e[s].toLowerCase() == r) {
                    i = !0;
                    break
                }
            i ? (25 == ++n && (n = 0, t++), r = "ijkmnopqrstuvwxyzabcdefgh".charAt(n), 1 < t && (r += t)) : o = r
        } else o = "i";
    return o
}, Blockly.Variables.createVariable = function(e, o) {
    var t = function(n) {
        Blockly.Variables.promptName(Blockly.Msg.NEW_VARIABLE_TITLE, n, function(n) {
            n ? -1 != e.variableIndexOf(n) ? Blockly.alert(Blockly.Msg.VARIABLE_ALREADY_EXISTS.replace("%1", n.toLowerCase()), function() {
                t(n)
            }) : (e.createVariable(n), o && o(n)) : o && o(null)
        })
    };
    t("")
}, Blockly.Variables.promptName = function(e, o, t) {
    Blockly.prompt(e, o, function(e) {
        e && ((e = e.replace(/[\s\xa0]+/g, " ").replace(/^ | $/g, "")) == Blockly.Msg.RENAME_VARIABLE || e == Blockly.Msg.NEW_VARIABLE) && (e = null), t(e)
    })
}, Blockly.FieldVariable = function(e, o) {
    Blockly.FieldVariable.superClass_.constructor.call(this, Blockly.FieldVariable.dropdownCreate, o), this.setValue(e || "")
}, goog.inherits(Blockly.FieldVariable, Blockly.FieldDropdown), Blockly.FieldVariable.prototype.renameVarItemIndex_ = -1, Blockly.FieldVariable.prototype.deleteVarItemIndex_ = -1, Blockly.FieldVariable.prototype.init = function() {
    this.fieldGroup_ || (Blockly.FieldVariable.superClass_.init.call(this), this.initModel())
}, Blockly.FieldVariable.prototype.initModel = function() {
    this.getValue() || this.setValue(Blockly.Variables.generateUniqueName(this.sourceBlock_.isInFlyout ? this.sourceBlock_.workspace.targetWorkspace : this.sourceBlock_.workspace)), this.sourceBlock_.isInFlyout || this.sourceBlock_.workspace.createVariable(this.getValue())
}, Blockly.FieldVariable.prototype.setSourceBlock = function(e) {
    goog.asserts.assert(!e.isShadow(), "Variable fields are not allowed to exist on shadow blocks."), Blockly.FieldVariable.superClass_.setSourceBlock.call(this, e)
}, Blockly.FieldVariable.prototype.getValue = function() {
    return this.getText()
}, Blockly.FieldVariable.prototype.setValue = function(e) {
    this.sourceBlock_ && Blockly.Events.isEnabled() && Blockly.Events.fire(new Blockly.Events.Change(this.sourceBlock_, "field", this.name, this.value_, e)), this.value_ = e, this.setText(e)
}, Blockly.FieldVariable.dropdownCreate = function() {
    var e = this.sourceBlock_ && this.sourceBlock_.workspace ? this.sourceBlock_.workspace.variableList.slice(0) : [];
    (o = this.getText()) && -1 == e.indexOf(o) && e.push(o), e.sort(goog.string.caseInsensitiveCompare), 0 >= e.length && e.push(" ");
    for (var o = [], t = 0; t < e.length; t++) o[t] = [e[t], e[t]];
    return o
}, Blockly.FieldVariable.prototype.onItemSelected = function(e, o) {
    var t = o.getValue();
    if (this.sourceBlock_) {
        var n = this.sourceBlock_.workspace;
        if (0 <= this.renameVarItemIndex_ && e.getChildAt(this.renameVarItemIndex_) === o) {
            var r = this.getText();
            return Blockly.hideChaff(), void Blockly.Variables.promptName(Blockly.Msg.RENAME_VARIABLE_TITLE.replace("%1", r), r, function(e) {
                e && n.renameVariable(r, e)
            })
        }
        if (0 <= this.deleteVarItemIndex_ && e.getChildAt(this.deleteVarItemIndex_) === o) return void n.deleteVariable(this.getText());
        t = this.callValidator(t)
    }
    null !== t && this.setValue(t)
}, Blockly.Generator = function(e) {
    this.name_ = e, this.FUNCTION_NAME_PLACEHOLDER_REGEXP_ = new RegExp(this.FUNCTION_NAME_PLACEHOLDER_, "g")
}, Blockly.Generator.NAME_TYPE = "generated_function", Blockly.Generator.prototype.INFINITE_LOOP_TRAP = null, Blockly.Generator.prototype.STATEMENT_PREFIX = null, Blockly.Generator.prototype.INDENT = "  ", Blockly.Generator.prototype.COMMENT_WRAP = 60, Blockly.Generator.prototype.ORDER_OVERRIDES = [], Blockly.Generator.prototype.workspaceToCode = function(e) {
    e || (console.warn("No workspace specified in workspaceToCode call.  Guessing."), e = Blockly.getMainWorkspace());
    var o = [];
    this.init(e), e = e.getTopBlocks(!0);
    for (var t, n = 0; t = e[n]; n++) {
        var r = this.blockToCode(t);
        goog.isArray(r) && (r = r[0]), r && (t.outputConnection && this.scrubNakedValue && (r = this.scrubNakedValue(r)), o.push(r))
    }
    return o = o.join("\n"), o = this.finish(o), o = o.replace(/^\s+\n/, ""), o = o.replace(/\n\s+$/, "\n"), o = o.replace(/[ \t]+\n/g, "\n")
}, Blockly.Generator.prototype.prefixLines = function(e, o) {
    return o + e.replace(/(?!\n$)\n/g, "\n" + o)
}, Blockly.Generator.prototype.allNestedComments = function(e) {
    var o = [];
    e = e.getDescendants();
    for (var t = 0; t < e.length; t++) {
        var n = e[t].getCommentText();
        n && o.push(n)
    }
    return o.length && o.push(""), o.join("\n")
}, Blockly.Generator.prototype.blockToCode = function(e) {
    if (!e) return "";
    if (e.disabled) return this.blockToCode(e.getNextBlock());
    var o = this[e.type];
    if (goog.asserts.assertFunction(o, 'Language "%s" does not know how to generate code for block type "%s".', this.name_, e.type), o = o.call(e, e), goog.isArray(o)) return goog.asserts.assert(e.outputConnection, 'Expecting string from statement block "%s".', e.type), [this.scrub_(e, o[0]), o[1]];
    if (goog.isString(o)) {
        var t = e.id.replace(/\$/g, "$$$$");
        return this.STATEMENT_PREFIX && (o = this.STATEMENT_PREFIX.replace(/%1/g, "'" + t + "'") + o), this.scrub_(e, o)
    }
    if (null === o) return "";
    goog.asserts.fail("Invalid code generated: %s", o)
}, Blockly.Generator.prototype.valueToCode = function(e, o, t) {
    if (isNaN(t) && goog.asserts.fail('Expecting valid order from block "%s".', e.type), !(n = e.getInputTargetBlock(o))) return "";
    if ("" === (o = this.blockToCode(n))) return "";
    if (goog.asserts.assertArray(o, 'Expecting tuple from value block "%s".', n.type), e = o[0], o = o[1], isNaN(o) && goog.asserts.fail('Expecting valid order from value block "%s".', n.type), !e) return "";
    var n = !1,
        r = Math.floor(t),
        i = Math.floor(o);
    if (r <= i && (r != i || 0 != r && 99 != r))
        for (n = !0, r = 0; r < this.ORDER_OVERRIDES.length; r++)
            if (this.ORDER_OVERRIDES[r][0] == t && this.ORDER_OVERRIDES[r][1] == o) {
                n = !1;
                break
            }
    return n && (e = "(" + e + ")"), e
}, Blockly.Generator.prototype.statementToCode = function(e, o) {
    var t = e.getInputTargetBlock(o),
        n = this.blockToCode(t);
    return goog.asserts.assertString(n, 'Expecting code from statement block "%s".', t && t.type), n && (n = this.prefixLines(n, this.INDENT)), n
}, Blockly.Generator.prototype.addLoopTrap = function(e, o) {
    return o = o.replace(/\$/g, "$$$$"), this.INFINITE_LOOP_TRAP && (e = this.INFINITE_LOOP_TRAP.replace(/%1/g, "'" + o + "'") + e), this.STATEMENT_PREFIX && (e += this.prefixLines(this.STATEMENT_PREFIX.replace(/%1/g, "'" + o + "'"), this.INDENT)), e
}, Blockly.Generator.prototype.RESERVED_WORDS_ = "", Blockly.Generator.prototype.addReservedWords = function(e) {
    this.RESERVED_WORDS_ += e + ","
}, Blockly.Generator.prototype.FUNCTION_NAME_PLACEHOLDER_ = "{leCUI8hutHZI4480Dc}", Blockly.Generator.prototype.provideFunction_ = function(e, o) {
    if (!this.definitions_[e]) {
        n = this.variableDB_.getDistinctName(e, Blockly.Procedures.NAME_TYPE);
        this.functionNames_[e] = n;
        for (var t, n = o.join("\n").replace(this.FUNCTION_NAME_PLACEHOLDER_REGEXP_, n); t != n;) t = n, n = n.replace(/^((  )*)  /gm, "$1\0");
        n = n.replace(/\0/g, this.INDENT), this.definitions_[e] = n
    }
    return this.functionNames_[e]
}, Blockly.Generator.prototype.init = void 0, Blockly.Generator.prototype.scrub_ = void 0, Blockly.Generator.prototype.finish = void 0, Blockly.Generator.prototype.scrubNakedValue = void 0, Blockly.Names = function(e, o) {
    if (this.variablePrefix_ = o || "", this.reservedDict_ = Object.create(null), e)
        for (var t = e.split(","), n = 0; n < t.length; n++) this.reservedDict_[t[n]] = !0;
    this.reset()
}, Blockly.Names.prototype.reset = function() {
    this.db_ = Object.create(null), this.dbReverse_ = Object.create(null)
}, Blockly.Names.prototype.getName = function(e, o) {
    var t = e.toLowerCase() + "_" + o,
        n = o == Blockly.Variables.NAME_TYPE ? this.variablePrefix_ : "";
    if (t in this.db_) return n + this.db_[t];
    var r = this.getDistinctName(e, o);
    return this.db_[t] = r.substr(n.length), r
}, Blockly.Names.prototype.getDistinctName = function(e, o) {
    for (var t = this.safeName_(e), n = ""; this.dbReverse_[t + n] || t + n in this.reservedDict_;) n = n ? n + 1 : 2;
    return t += n, this.dbReverse_[t] = !0, (o == Blockly.Variables.NAME_TYPE ? this.variablePrefix_ : "") + t
}, Blockly.Names.prototype.safeName_ = function(e) {
    return e ? (e = encodeURI(e.replace(/ /g, "_")).replace(/[^\w]/g, "_"), -1 != "0123456789".indexOf(e[0]) && (e = "my_" + e)) : e = "unnamed", e
}, Blockly.Names.equals = function(e, o) {
    return e.toLowerCase() == o.toLowerCase()
}, Blockly.Procedures = {}, Blockly.Procedures.NAME_TYPE = Blockly.PROCEDURE_CATEOGORY_NAME, Blockly.Procedures.allProcedures = function(e) {
    e = e.getAllBlocks();
    for (var o = [], t = [], n = 0; n < e.length; n++)
        if (e[n].getProcedureDef) {
            var r = e[n].getProcedureDef();
            r && (r[2] ? o.push(r) : t.push(r))
        }
    return t.sort(Blockly.Procedures.procTupleComparator_), o.sort(Blockly.Procedures.procTupleComparator_), [t, o]
}, Blockly.Procedures.procTupleComparator_ = function(e, o) {
    return e[0].toLowerCase().localeCompare(o[0].toLowerCase())
}, Blockly.Procedures.findLegalName = function(e, o) {
    if (o.isInFlyout) return e;
    for (; !Blockly.Procedures.isLegalName_(e, o.workspace, o);) {
        var t = e.match(/^(.*?)(\d+)$/);
        e = t ? t[1] + (parseInt(t[2], 10) + 1) : e + "2"
    }
    return e
}, Blockly.Procedures.isLegalName_ = function(e, o, t) {
    o = o.getAllBlocks();
    for (var n = 0; n < o.length; n++)
        if (o[n] != t && o[n].getProcedureDef) {
            var r = o[n].getProcedureDef();
            if (Blockly.Names.equals(r[0], e)) return !1
        }
    return !0
}, Blockly.Procedures.rename = function(e) {
    e = e.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
    var o = Blockly.Procedures.findLegalName(e, this.sourceBlock_),
        t = this.text_;
    if (t != e && t != o) {
        e = this.sourceBlock_.workspace.getAllBlocks();
        for (var n = 0; n < e.length; n++) e[n].renameProcedure && e[n].renameProcedure(t, o)
    }
    return o
}, Blockly.Procedures.flyoutCategory = function(e) {
    function o(e, o) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n][0],
                i = e[n][1],
                s = goog.dom.createDom("block");
            s.setAttribute("type", o), s.setAttribute("gap", 16);
            var l = goog.dom.createDom("mutation");
            for (l.setAttribute("name", r), s.appendChild(l), r = 0; r < i.length; r++) {
                var g = goog.dom.createDom("arg");
                g.setAttribute("name", i[r]), l.appendChild(g)
            }
            t.push(s)
        }
    }
    var t = [];
    if (Blockly.Blocks.procedures_defnoreturn) {
        var n = goog.dom.createDom("block");
        n.setAttribute("type", "procedures_defnoreturn"), n.setAttribute("gap", 16);
        var r = goog.dom.createDom("field", null, Blockly.Msg.PROCEDURES_DEFNORETURN_PROCEDURE);
        r.setAttribute("name", "NAME"), n.appendChild(r), t.push(n)
    }
    return Blockly.Blocks.procedures_defreturn && ((n = goog.dom.createDom("block")).setAttribute("type", "procedures_defreturn"), n.setAttribute("gap", 16), (r = goog.dom.createDom("field", null, Blockly.Msg.PROCEDURES_DEFRETURN_PROCEDURE)).setAttribute("name", "NAME"), n.appendChild(r), t.push(n)), 
	Blockly.Blocks.procedures_ifreturn && ((n = goog.dom.createDom("block")).setAttribute("type", "procedures_ifreturn"), n.setAttribute("gap", 16), t.push(n)), t.length && t[t.length - 1].setAttribute("gap", 24), e = Blockly.Procedures.allProcedures(e), o(e[0], "procedures_callnoreturn"), o(e[1], "procedures_callreturn"), t
}, Blockly.Procedures.getCallers = function(e, o) {
    for (var t = [], n = o.getAllBlocks(), r = 0; r < n.length; r++)
        if (n[r].getProcedureCall) {
            var i = n[r].getProcedureCall();
            i && Blockly.Names.equals(i, e) && t.push(n[r])
        }
    return t
}, Blockly.Procedures.mutateCallers = function(e) {
    var o = Blockly.Events.recordUndo,
        t = e.getProcedureDef()[0],
        n = e.mutationToDom(!0);
    e = Blockly.Procedures.getCallers(t, e.workspace);
    for (var r, t = 0; r = e[t]; t++) {
        var i = (i = r.mutationToDom()) && Blockly.Xml.domToText(i);
        r.domToMutation(n);
        var s = r.mutationToDom();
        i != (s = s && Blockly.Xml.domToText(s)) && (Blockly.Events.recordUndo = !1, Blockly.Events.fire(new Blockly.Events.Change(r, "mutation", null, i, s)), Blockly.Events.recordUndo = o)
    }
}, Blockly.Procedures.getDefinition = function(e, o) {
    for (var t = o.getTopBlocks(!1), n = 0; n < t.length; n++)
        if (t[n].getProcedureDef) {
            var r = t[n].getProcedureDef();
            if (r && Blockly.Names.equals(r[0], e)) return t[n]
        }
    return null
}, Blockly.FlyoutButton = function(e, o, t, n) {
    this.workspace_ = e, this.targetWorkspace_ = o, this.text_ = t.getAttribute("text"), this.position_ = new goog.math.Coordinate(0, 0), this.isLabel_ = n, this.callback_ = null, e = t.getAttribute("callbackKey"), this.isLabel_ && e ? console.warn("Labels should not have callbacks. Label text: " + this.text_) : this.isLabel_ || e && o.getButtonCallback(e) ? this.callback_ = o.getButtonCallback(e) : console.warn("Buttons should have callbacks. Button text: " + this.text_), this.cssClass_ = t.getAttribute("web-class") || null
}, Blockly.FlyoutButton.MARGIN = 5, Blockly.FlyoutButton.prototype.width = 0, Blockly.FlyoutButton.prototype.height = 0, Blockly.FlyoutButton.prototype.createDom = function() {
    var e, o = this.isLabel_ ? "blocklyFlyoutLabel" : "blocklyFlyoutButton";
    this.cssClass_ && (o += " " + this.cssClass_), this.svgGroup_ = Blockly.utils.createSvgElement("g", {
        class: o
    }, this.workspace_.getCanvas()), this.isLabel_ || (e = Blockly.utils.createSvgElement("rect", {
        class: "blocklyFlyoutButtonShadow",
        rx: 4,
        ry: 4,
        x: 1,
        y: 1
    }, this.svgGroup_));
    var o = Blockly.utils.createSvgElement("rect", {
            class: this.isLabel_ ? "blocklyFlyoutLabelBackground" : "blocklyFlyoutButtonBackground",
            rx: 4,
            ry: 4
        }, this.svgGroup_),
        t = Blockly.utils.createSvgElement("text", {
            class: this.isLabel_ ? "blocklyFlyoutLabelText" : "blocklyText",
            x: 0,
            y: 0,
            "text-anchor": "middle"
        }, this.svgGroup_);
    return t.textContent = this.text_, this.width = t.getComputedTextLength() + 2 * Blockly.FlyoutButton.MARGIN, this.height = 20, this.isLabel_ || (e.setAttribute("width", this.width), e.setAttribute("height", this.height)), o.setAttribute("width", this.width), o.setAttribute("height", this.height), t.setAttribute("x", this.width / 2), t.setAttribute("y", this.height - Blockly.FlyoutButton.MARGIN), this.updateTransform_(), this.svgGroup_
}, Blockly.FlyoutButton.prototype.show = function() {
    this.updateTransform_(), this.svgGroup_.setAttribute("display", "block")
}, Blockly.FlyoutButton.prototype.updateTransform_ = function() {
    this.svgGroup_.setAttribute("transform", "translate(" + this.position_.x + "," + this.position_.y + ")")
}, Blockly.FlyoutButton.prototype.moveTo = function(e, o) {
    this.position_.x = e, this.position_.y = o, this.updateTransform_()
}, Blockly.FlyoutButton.prototype.getTargetWorkspace = function() {
    return this.targetWorkspace_
}, Blockly.FlyoutButton.prototype.dispose = function() {
    this.svgGroup_ && (goog.dom.removeNode(this.svgGroup_), this.svgGroup_ = null), this.targetWorkspace_ = this.workspace_ = null
}, Blockly.FlyoutButton.prototype.onMouseUp = function(e) {
    e.preventDefault(), e.stopPropagation(), Blockly.Flyout.terminateDrag_(), this.callback_ && this.callback_(this)
}, Blockly.Flyout = function(e) {
    e.getMetrics = this.getMetrics_.bind(this), e.setMetrics = this.setMetrics_.bind(this), this.workspace_ = new Blockly.WorkspaceSvg(e), this.workspace_.isFlyout = !0, this.RTL = !!e.RTL, this.horizontalLayout_ = e.horizontalLayout, this.toolboxPosition_ = e.toolboxPosition, this.eventWrappers_ = [], this.backgroundButtons_ = [], this.buttons_ = [], this.listeners_ = [], this.permanentlyDisabled_ = [], this.startDragMouseX_ = this.startDragMouseY_ = 0
}, Blockly.Flyout.startFlyout_ = null, Blockly.Flyout.startDownEvent_ = null, Blockly.Flyout.startBlock_ = null, Blockly.Flyout.onMouseUpWrapper_ = null, Blockly.Flyout.onMouseMoveWrapper_ = null, Blockly.Flyout.onMouseMoveBlockWrapper_ = null, Blockly.Flyout.prototype.autoClose = !0, Blockly.Flyout.prototype.isVisible_ = !1, Blockly.Flyout.prototype.containerVisible_ = !0, Blockly.Flyout.prototype.CORNER_RADIUS = 8, Blockly.Flyout.prototype.DRAG_RADIUS = 10, Blockly.Flyout.prototype.MARGIN = Blockly.Flyout.prototype.CORNER_RADIUS, Blockly.Flyout.prototype.GAP_X = 3 * Blockly.Flyout.prototype.MARGIN, Blockly.Flyout.prototype.GAP_Y = 3 * Blockly.Flyout.prototype.MARGIN, Blockly.Flyout.prototype.SCROLLBAR_PADDING = 2, Blockly.Flyout.prototype.width_ = 0, Blockly.Flyout.prototype.height_ = 0, Blockly.Flyout.prototype.dragMode_ = Blockly.DRAG_NONE, Blockly.Flyout.prototype.dragAngleRange_ = 70, Blockly.Flyout.prototype.createDom = function(e) {
    return this.svgGroup_ = Blockly.utils.createSvgElement(e, {
        class: "blocklyFlyout",
        style: "display: none"
    }, null), this.svgBackground_ = Blockly.utils.createSvgElement("path", {
        class: "blocklyFlyoutBackground"
    }, this.svgGroup_), this.svgGroup_.appendChild(this.workspace_.createDom()), this.svgGroup_
}, Blockly.Flyout.prototype.init = function(e) {
    this.targetWorkspace_ = e, this.workspace_.targetWorkspace = e, this.scrollbar_ = new Blockly.Scrollbar(this.workspace_, this.horizontalLayout_, !1, "blocklyFlyoutScrollbar"), this.hide(), Array.prototype.push.apply(this.eventWrappers_, Blockly.bindEventWithChecks_(this.svgGroup_, "wheel", this, this.wheel_)), this.autoClose || (this.filterWrapper_ = this.filterForCapacity_.bind(this), this.targetWorkspace_.addChangeListener(this.filterWrapper_)), Array.prototype.push.apply(this.eventWrappers_, Blockly.bindEventWithChecks_(this.svgGroup_, "mousedown", this, this.onMouseDown_))
}, Blockly.Flyout.prototype.dispose = function() {
    this.hide(), Blockly.unbindEvent_(this.eventWrappers_), this.filterWrapper_ && (this.targetWorkspace_.removeChangeListener(this.filterWrapper_), this.filterWrapper_ = null), this.scrollbar_ && (this.scrollbar_.dispose(), this.scrollbar_ = null), this.workspace_ && (this.workspace_.targetWorkspace = null, this.workspace_.dispose(), this.workspace_ = null), this.svgGroup_ && (goog.dom.removeNode(this.svgGroup_), this.svgGroup_ = null), this.targetWorkspace_ = this.svgBackground_ = null
}, Blockly.Flyout.prototype.getWidth = function() {
    return this.width_
}, Blockly.Flyout.prototype.getHeight = function() {
    return this.height_
}, Blockly.Flyout.prototype.getMetrics_ = function() {
    if (!this.isVisible()) return null;
    try {
        var e = this.workspace_.getCanvas().getBBox()
    } catch (o) {
        e = {
            height: 0,
            y: 0,
            width: 0,
            x: 0
        }
    }
    var o = this.SCROLLBAR_PADDING,
        t = this.SCROLLBAR_PADDING;
    if (this.horizontalLayout_) {
        this.toolboxPosition_ == Blockly.TOOLBOX_AT_BOTTOM && (o = 0);
        var n = this.height_;
        this.toolboxPosition_ == Blockly.TOOLBOX_AT_TOP && (n -= this.SCROLLBAR_PADDING);
        var r = this.width_ - 2 * this.SCROLLBAR_PADDING
    } else t = 0, n = this.height_ - 2 * this.SCROLLBAR_PADDING, r = this.width_, this.RTL || (r -= this.SCROLLBAR_PADDING);
    return {
        viewHeight: n,
        viewWidth: r,
        contentHeight: (e.height + 2 * this.MARGIN) * this.workspace_.scale,
        contentWidth: (e.width + 2 * this.MARGIN) * this.workspace_.scale,
        viewTop: -this.workspace_.scrollY,
        viewLeft: -this.workspace_.scrollX,
        contentTop: e.y,
        contentLeft: e.x,
        absoluteTop: o,
        absoluteLeft: t
    }
}, Blockly.Flyout.prototype.setMetrics_ = function(e) {
    var o = this.getMetrics_();
    o && (!this.horizontalLayout_ && goog.isNumber(e.y) ? this.workspace_.scrollY = -o.contentHeight * e.y : this.horizontalLayout_ && goog.isNumber(e.x) && (this.workspace_.scrollX = -o.contentWidth * e.x), this.workspace_.translate(this.workspace_.scrollX + o.absoluteLeft, this.workspace_.scrollY + o.absoluteTop))
}, Blockly.Flyout.prototype.position = function() {
    if (this.isVisible()) {
        var e = this.targetWorkspace_.getMetrics();
        if (e) {
            this.setBackgroundPath_(this.horizontalLayout_ ? e.viewWidth - 2 * this.CORNER_RADIUS : this.width_ - this.CORNER_RADIUS, this.horizontalLayout_ ? this.height_ - this.CORNER_RADIUS : e.viewHeight - 2 * this.CORNER_RADIUS);
            var o = e.absoluteLeft;
            this.toolboxPosition_ == Blockly.TOOLBOX_AT_RIGHT && (o += e.viewWidth, o -= this.width_);
            var t = e.absoluteTop;
            this.toolboxPosition_ == Blockly.TOOLBOX_AT_BOTTOM && (t += e.viewHeight, t -= this.height_), this.horizontalLayout_ ? this.width_ = e.viewWidth : this.height_ = e.viewHeight, this.svgGroup_.setAttribute("width", this.width_), this.svgGroup_.setAttribute("height", this.height_), Blockly.utils.setCssTransform(this.svgGroup_, "translate(" + o + "px," + t + "px)"), this.scrollbar_ && (this.scrollbar_.setOrigin(o, t), this.scrollbar_.resize())
        }
    }
}, Blockly.Flyout.prototype.setBackgroundPath_ = function(e, o) {
    this.horizontalLayout_ ? this.setBackgroundPathHorizontal_(e, o) : this.setBackgroundPathVertical_(e, o)
}, Blockly.Flyout.prototype.setBackgroundPathVertical_ = function(e, o) {
    var t = this.toolboxPosition_ == Blockly.TOOLBOX_AT_RIGHT,
        n = e + this.CORNER_RADIUS;
    (n = ["M " + (t ? n : 0) + ",0"]).push("h", t ? -e : e), n.push("a", this.CORNER_RADIUS, this.CORNER_RADIUS, 0, 0, t ? 0 : 1, t ? -this.CORNER_RADIUS : this.CORNER_RADIUS, this.CORNER_RADIUS), n.push("v", Math.max(0, o)), n.push("a", this.CORNER_RADIUS, this.CORNER_RADIUS, 0, 0, t ? 0 : 1, t ? this.CORNER_RADIUS : -this.CORNER_RADIUS, this.CORNER_RADIUS), n.push("h", t ? e : -e), n.push("z"), this.svgBackground_.setAttribute("d", n.join(" "))
}, Blockly.Flyout.prototype.setBackgroundPathHorizontal_ = function(e, o) {
    var t = this.toolboxPosition_ == Blockly.TOOLBOX_AT_TOP,
        n = ["M 0," + (t ? 0 : this.CORNER_RADIUS)];
    t ? (n.push("h", e + 2 * this.CORNER_RADIUS), n.push("v", o), n.push("a", this.CORNER_RADIUS, this.CORNER_RADIUS, 0, 0, 1, -this.CORNER_RADIUS, this.CORNER_RADIUS), n.push("h", -1 * e), n.push("a", this.CORNER_RADIUS, this.CORNER_RADIUS, 0, 0, 1, -this.CORNER_RADIUS, -this.CORNER_RADIUS)) : (n.push("a", this.CORNER_RADIUS, this.CORNER_RADIUS, 0, 0, 1, this.CORNER_RADIUS, -this.CORNER_RADIUS), n.push("h", e), n.push("a", this.CORNER_RADIUS, this.CORNER_RADIUS, 0, 0, 1, this.CORNER_RADIUS, this.CORNER_RADIUS), n.push("v", o), n.push("h", -e - 2 * this.CORNER_RADIUS)), n.push("z"), this.svgBackground_.setAttribute("d", n.join(" "))
}, Blockly.Flyout.prototype.scrollToStart = function() {
    this.scrollbar_.set(this.horizontalLayout_ && this.RTL ? 1 / 0 : 0)
}, Blockly.Flyout.prototype.wheel_ = function(e) {
    if (t = this.horizontalLayout_ ? e.deltaX : e.deltaY) {
        goog.userAgent.GECKO && (t *= 10);
        var o = this.getMetrics_(),
            t = this.horizontalLayout_ ? o.viewLeft + t : o.viewTop + t,
            t = Math.min(t, this.horizontalLayout_ ? o.contentWidth - o.viewWidth : o.contentHeight - o.viewHeight),
            t = Math.max(t, 0);
        this.scrollbar_.set(t)
    }
    e.preventDefault(), e.stopPropagation()
}, Blockly.Flyout.prototype.isVisible = function() {
    return this.isVisible_
}, Blockly.Flyout.prototype.setVisible = function(e) {
    var o = e != this.isVisible();
    this.isVisible_ = e, o && this.updateDisplay_()
}, Blockly.Flyout.prototype.setContainerVisible = function(e) {
    var o = e != this.containerVisible_;
    this.containerVisible_ = e, o && this.updateDisplay_()
}, Blockly.Flyout.prototype.updateDisplay_ = function() {
    var e = !!this.containerVisible_ && this.isVisible();
    this.svgGroup_.style.display = e ? "block" : "none", this.scrollbar_.setContainerVisible(e)
}, Blockly.Flyout.prototype.hide = function() {
    if (this.isVisible()) {
        this.setVisible(!1);
        for (var e, o = 0; e = this.listeners_[o]; o++) Blockly.unbindEvent_(e);
        this.listeners_.length = 0, this.reflowWrapper_ && (this.workspace_.removeChangeListener(this.reflowWrapper_), this.reflowWrapper_ = null)
    }
}, Blockly.Flyout.prototype.show = function(e) {
    this.workspace_.setResizesEnabled(!1), this.hide(), this.clearOldBlocks_(), "string" == typeof e && (e = this.workspace_.targetWorkspace.getToolboxCategoryCallback(e), goog.asserts.assert(goog.isFunction(e), "Couldn't find a callback function when opening a toolbox category."), e = e(this.workspace_.targetWorkspace), goog.asserts.assert(goog.isArray(e), "The result of a toolbox category callback must be an array.")), this.setVisible(!0);
    for (var o, t = [], n = [], r = this.permanentlyDisabled_.length = 0; o = e[r]; r++)
        if (o.tagName) {
            var i = o.tagName.toUpperCase(),
                s = this.horizontalLayout_ ? this.GAP_X : this.GAP_Y;
            "BLOCK" == i ? ((i = Blockly.Xml.domToBlock(o, this.workspace_)).disabled && this.permanentlyDisabled_.push(i), t.push({
                type: "block",
                block: i
            }), o = parseInt(o.getAttribute("gap"), 10), n.push(isNaN(o) ? s : o)) : "SEP" == o.tagName.toUpperCase() ? (o = parseInt(o.getAttribute("gap"), 10), !isNaN(o) && 0 < n.length ? n[n.length - 1] = o : n.push(s)) : "BUTTON" != i && "LABEL" != i || (o = new Blockly.FlyoutButton(this.workspace_, this.targetWorkspace_, o, "LABEL" == i), t.push({
                type: "button",
                button: o
            }), n.push(s))
        }
    this.layout_(t, n), this.listeners_.push(Blockly.bindEventWithChecks_(this.svgBackground_, "mouseover", this, function() {
        for (var e, o = this.workspace_.getTopBlocks(!1), t = 0; e = o[t]; t++) e.removeSelect()
    })), this.horizontalLayout_ ? this.height_ = 0 : this.width_ = 0, this.workspace_.setResizesEnabled(!0), this.reflow(), this.filterForCapacity_(), this.position(), this.reflowWrapper_ = this.reflow.bind(this), this.workspace_.addChangeListener(this.reflowWrapper_)
}, Blockly.Flyout.prototype.layout_ = function(e, o) {
    this.workspace_.scale = this.targetWorkspace_.scale;
    var t = this.MARGIN,
        n = this.RTL ? t : t + Blockly.BlockSvg.TAB_WIDTH;
    this.horizontalLayout_ && this.RTL && (e = e.reverse());
    for (var r, i = 0; r = e[i]; i++)
        if ("block" == r.type) {
            for (var s, l = (r = r.block).getDescendants(), g = 0; s = l[g]; g++) s.isInFlyout = !0;
            r.render(), l = r.getSvgRoot(), g = r.getHeightWidth(), s = r.outputConnection ? Blockly.BlockSvg.TAB_WIDTH : 0, this.horizontalLayout_ && (n += s), r.moveBy(this.horizontalLayout_ && this.RTL ? n + g.width - s : n, t), this.horizontalLayout_ ? n += g.width + o[i] - s : t += g.height + o[i], (g = Blockly.utils.createSvgElement("rect", {
                "fill-opacity": 0
            }, null)).tooltip = r, Blockly.Tooltip.bindMouseEvents(g), this.workspace_.getCanvas().insertBefore(g, r.getSvgRoot()), r.flyoutRect_ = g, this.backgroundButtons_[i] = g, this.addBlockListeners_(l, r, g)
        } else "button" == r.type && (r = r.button, l = r.createDom(), r.moveTo(n, t), r.show(), Blockly.bindEventWithChecks_(l, "mouseup", r, r.onMouseUp), this.buttons_.push(r), this.horizontalLayout_ ? n += r.width + o[i] : t += r.height + o[i])
}, Blockly.Flyout.prototype.clearOldBlocks_ = function() {
    for (var e, o = this.workspace_.getTopBlocks(!1), t = 0; e = o[t]; t++) e.workspace == this.workspace_ && e.dispose(!1, !1);
    for (t = 0; o = this.backgroundButtons_[t]; t++) goog.dom.removeNode(o);
    for (t = this.backgroundButtons_.length = 0; o = this.buttons_[t]; t++) o.dispose();
    this.buttons_.length = 0
}, Blockly.Flyout.prototype.addBlockListeners_ = function(e, o, t) {
    this.listeners_.push(Blockly.bindEventWithChecks_(e, "mousedown", null, this.blockMouseDown_(o))), this.listeners_.push(Blockly.bindEventWithChecks_(t, "mousedown", null, this.blockMouseDown_(o))), this.listeners_.push(Blockly.bindEvent_(e, "mouseover", o, o.addSelect)), this.listeners_.push(Blockly.bindEvent_(e, "mouseout", o, o.removeSelect)), this.listeners_.push(Blockly.bindEvent_(t, "mouseover", o, o.addSelect)), this.listeners_.push(Blockly.bindEvent_(t, "mouseout", o, o.removeSelect))
}, Blockly.Flyout.blockRightClick_ = function(e, o) {
    Blockly.terminateDrag_(), Blockly.hideChaff(!0), o.showContextMenu_(e), Blockly.Touch.clearTouchIdentifier()
}, Blockly.Flyout.prototype.blockMouseDown_ = function(e) {
    var o = this;
    return function(t) {
        Blockly.utils.isRightButton(t) ? Blockly.Flyout.blockRightClick_(t, e) : (Blockly.terminateDrag_(), Blockly.hideChaff(!0), o.startDragMouseY_ = t.clientY, o.startDragMouseX_ = t.clientX, Blockly.Flyout.startDownEvent_ = t, Blockly.Flyout.startBlock_ = e, Blockly.Flyout.startFlyout_ = o, Blockly.Flyout.onMouseUpWrapper_ = Blockly.bindEventWithChecks_(document, "mouseup", o, o.onMouseUp_), Blockly.Flyout.onMouseMoveBlockWrapper_ = Blockly.bindEventWithChecks_(document, "mousemove", o, o.onMouseMoveBlock_)), t.stopPropagation(), t.preventDefault()
    }
}, Blockly.Flyout.prototype.onMouseDown_ = function(e) {
    Blockly.utils.isRightButton(e) ? Blockly.Touch.clearTouchIdentifier() : (Blockly.hideChaff(!0), this.dragMode_ = Blockly.DRAG_FREE, this.startDragMouseY_ = e.clientY, this.startDragMouseX_ = e.clientX, Blockly.Flyout.startFlyout_ = this, Blockly.Flyout.onMouseMoveWrapper_ = Blockly.bindEventWithChecks_(document, "mousemove", this, this.onMouseMove_), Blockly.Flyout.onMouseUpWrapper_ = Blockly.bindEventWithChecks_(document, "mouseup", this, Blockly.Flyout.terminateDrag_), e.preventDefault(), e.stopPropagation())
}, Blockly.Flyout.prototype.onMouseUp_ = function(e) {
    this.workspace_.isDragging() || (Blockly.Touch.clearTouchIdentifier(), this.autoClose ? this.createBlockFunc_(Blockly.Flyout.startBlock_)(Blockly.Flyout.startDownEvent_) : Blockly.WidgetDiv.isVisible() || Blockly.Events.fire(new Blockly.Events.Ui(Blockly.Flyout.startBlock_, "click", void 0, void 0))), Blockly.terminateDrag_()
}, Blockly.Flyout.prototype.onMouseMove_ = function(e) {
    var o = this.getMetrics_();
    if (this.horizontalLayout_) {
        if (!(0 > o.contentWidth - o.viewWidth)) {
            var t = e.clientX - this.startDragMouseX_;
            this.startDragMouseX_ = e.clientX, e = o.viewLeft - t, e = goog.math.clamp(e, 0, o.contentWidth - o.viewWidth), this.scrollbar_.set(e)
        }
    } else 0 > o.contentHeight - o.viewHeight || (t = e.clientY - this.startDragMouseY_, this.startDragMouseY_ = e.clientY, e = o.viewTop - t, e = goog.math.clamp(e, 0, o.contentHeight - o.viewHeight), this.scrollbar_.set(e))
}, Blockly.Flyout.prototype.onMouseMoveBlock_ = function(e) {
    "mousemove" == e.type && 1 >= e.clientX && 0 == e.clientY && 0 == e.button || (this.determineDragIntention_(e.clientX - Blockly.Flyout.startDownEvent_.clientX, e.clientY - Blockly.Flyout.startDownEvent_.clientY) ? (Blockly.longStop_(), this.createBlockFunc_(Blockly.Flyout.startBlock_)(Blockly.Flyout.startDownEvent_)) : this.dragMode_ == Blockly.DRAG_FREE && (Blockly.longStop_(), this.onMouseMove_(e))), e.stopPropagation()
}, Blockly.Flyout.prototype.determineDragIntention_ = function(e, o) {
    return this.dragMode_ != Blockly.DRAG_FREE && (Math.sqrt(e * e + o * o) < this.DRAG_RADIUS ? (this.dragMode_ = Blockly.DRAG_STICKY, !1) : !(!this.isDragTowardWorkspace_(e, o) && this.scrollbar_.isVisible()) || (this.dragMode_ = Blockly.DRAG_FREE, !1))
}, Blockly.Flyout.prototype.isDragTowardWorkspace_ = function(e, o) {
    var t = Math.atan2(o, e) / Math.PI * 180,
        n = this.dragAngleRange_;
    if (this.horizontalLayout_) {
        if (t < 90 + n && t > 90 - n || t > -90 - n && t < -90 + n) return !0
    } else if (t < n && t > -n || t < -180 + n || t > 180 - n) return !0;
    return !1
}, Blockly.Flyout.prototype.createBlockFunc_ = function(e) {
    var o = this;
    return function(t) {
        if (!Blockly.utils.isRightButton(t) && !e.disabled) {
            Blockly.Events.disable(), o.targetWorkspace_.setResizesEnabled(!1);
            try {
                var n = o.placeNewBlock_(e)
            } finally {
                Blockly.Events.enable()
            }
            if (Blockly.Events.isEnabled() && (Blockly.Events.setGroup(!0), Blockly.Events.fire(new Blockly.Events.Create(n))), o.autoClose ? o.hide() : o.filterForCapacity_(), goog.userAgent.IE || goog.userAgent.EDGE)
                for (var r = n.getDescendants(), i = r.length - 1; 0 <= i; i--) r[i].render(!1);
            n.onMouseDown_(t), Blockly.dragMode_ = Blockly.DRAG_FREE, n.setDragging_(!0), n.moveToDragSurface_()
        }
    }
}, Blockly.Flyout.prototype.placeNewBlock_ = function(e) {
    var o = this.targetWorkspace_,
        t = e.getSvgRoot();
    if (!t) throw "originBlock is not rendered.";
    t = o.isMutator ? this.workspace_.getSvgXY(t) : Blockly.utils.getInjectionDivXY_(t);
    var n = this.workspace_.scrollX,
        r = this.workspace_.scale;
    if (t.x += n / r - n, this.toolboxPosition_ == Blockly.TOOLBOX_AT_RIGHT && (n = o.getMetrics().viewWidth - this.width_, r = o.scale, t.x += n / r - n), n = this.workspace_.scrollY, r = this.workspace_.scale, t.y += n / r - n, this.toolboxPosition_ == Blockly.TOOLBOX_AT_BOTTOM && (n = o.getMetrics().viewHeight - this.height_, r = o.scale, t.y += n / r - n), e = Blockly.Xml.blockToDom(e), e = Blockly.Xml.domToBlock(e, o), !(r = e.getSvgRoot())) throw "block is not rendered.";
    return r = o.isMutator ? o.getSvgXY(r) : Blockly.utils.getInjectionDivXY_(r), r.x += o.scrollX / o.scale - o.scrollX, r.y += o.scrollY / o.scale - o.scrollY, o.toolbox_ && !o.scrollbar && (r.x += o.toolbox_.getWidth() / o.scale, r.y += o.toolbox_.getHeight() / o.scale), e.moveBy(t.x - r.x, t.y - r.y), e
}, Blockly.Flyout.prototype.filterForCapacity_ = function() {
    for (var e, o = this.targetWorkspace_.remainingCapacity(), t = this.workspace_.getTopBlocks(!1), n = 0; e = t[n]; n++)
        if (-1 == this.permanentlyDisabled_.indexOf(e)) {
            var r = e.getDescendants();
            e.setDisabled(r.length > o)
        }
}, Blockly.Flyout.prototype.getClientRect = function() {
    if (!this.svgGroup_) return null;
    var e = (n = this.svgGroup_.getBoundingClientRect()).left,
        o = n.top,
        t = n.width,
        n = n.height;
    return this.toolboxPosition_ == Blockly.TOOLBOX_AT_TOP ? new goog.math.Rect(-1e9, o - 1e9, 2e9, 1e9 + n) : this.toolboxPosition_ == Blockly.TOOLBOX_AT_BOTTOM ? new goog.math.Rect(-1e9, o, 2e9, 1e9 + n) : this.toolboxPosition_ == Blockly.TOOLBOX_AT_LEFT ? new goog.math.Rect(e - 1e9, -1e9, 1e9 + t, 2e9) : new goog.math.Rect(e, -1e9, 1e9 + t, 2e9)
}, Blockly.Flyout.terminateDrag_ = function() {
    Blockly.Flyout.startFlyout_ && (Blockly.Flyout.startFlyout_.dragMode_ == Blockly.DRAG_FREE && Blockly.Touch.clearTouchIdentifier(), Blockly.Flyout.startFlyout_.dragMode_ = Blockly.DRAG_NONE, Blockly.Flyout.startFlyout_ = null), Blockly.Flyout.onMouseUpWrapper_ && (Blockly.unbindEvent_(Blockly.Flyout.onMouseUpWrapper_), Blockly.Flyout.onMouseUpWrapper_ = null), Blockly.Flyout.onMouseMoveBlockWrapper_ && (Blockly.unbindEvent_(Blockly.Flyout.onMouseMoveBlockWrapper_), Blockly.Flyout.onMouseMoveBlockWrapper_ = null), Blockly.Flyout.onMouseMoveWrapper_ && (Blockly.unbindEvent_(Blockly.Flyout.onMouseMoveWrapper_), Blockly.Flyout.onMouseMoveWrapper_ = null), Blockly.Flyout.startDownEvent_ = null, Blockly.Flyout.startBlock_ = null
}, Blockly.Flyout.prototype.reflowHorizontal = function(e) {
    this.workspace_.scale = this.targetWorkspace_.scale;
    for (var o, t = 0, n = 0; o = e[n]; n++) t = Math.max(t, o.getHeightWidth().height);
    if (t += 1.5 * this.MARGIN, t *= this.workspace_.scale, t += Blockly.Scrollbar.scrollbarThickness, this.height_ != t) {
        for (n = 0; o = e[n]; n++) {
            var r = o.getHeightWidth();
            if (o.flyoutRect_) {
                o.flyoutRect_.setAttribute("width", r.width), o.flyoutRect_.setAttribute("height", r.height);
                var i = o.outputConnection ? Blockly.BlockSvg.TAB_WIDTH : 0,
                    s = o.getRelativeToSurfaceXY();
                o.flyoutRect_.setAttribute("y", s.y), o.flyoutRect_.setAttribute("x", this.RTL ? s.x - r.width + i : s.x - i), (r = o.startHat_ ? Blockly.BlockSvg.START_HAT_HEIGHT : 0) && o.moveBy(0, r), o.flyoutRect_.setAttribute("y", s.y)
            }
        }
        this.height_ = t, this.targetWorkspace_.resize()
    }
}, Blockly.Flyout.prototype.reflowVertical = function(e) {
    this.workspace_.scale = this.targetWorkspace_.scale;
    for (var o, t = 0, n = 0; o = e[n]; n++) {
        var r = o.getHeightWidth().width;
        o.outputConnection && (r -= Blockly.BlockSvg.TAB_WIDTH), t = Math.max(t, r)
    }
    for (n = 0; o = this.buttons_[n]; n++) t = Math.max(t, o.width);
    if (t += 1.5 * this.MARGIN + Blockly.BlockSvg.TAB_WIDTH, t *= this.workspace_.scale, t += Blockly.Scrollbar.scrollbarThickness, this.width_ != t) {
        for (n = 0; o = e[n]; n++) {
            if (r = o.getHeightWidth(), this.RTL) {
                var i = o.getRelativeToSurfaceXY().x,
                    s = (s = t / this.workspace_.scale - this.MARGIN) - Blockly.BlockSvg.TAB_WIDTH;
                o.moveBy(s - i, 0)
            }
            o.flyoutRect_ && (o.flyoutRect_.setAttribute("width", r.width), o.flyoutRect_.setAttribute("height", r.height), s = o.outputConnection ? Blockly.BlockSvg.TAB_WIDTH : 0, i = o.getRelativeToSurfaceXY(), o.flyoutRect_.setAttribute("x", this.RTL ? i.x - r.width + s : i.x - s), (r = o.startHat_ ? Blockly.BlockSvg.START_HAT_HEIGHT : 0) && o.moveBy(0, r), o.flyoutRect_.setAttribute("y", i.y))
        }
        this.width_ = t, this.targetWorkspace_.resize()
    }
}, Blockly.Flyout.prototype.reflow = function() {
    this.reflowWrapper_ && this.workspace_.removeChangeListener(this.reflowWrapper_);
    var e = this.workspace_.getTopBlocks(!1);
    this.horizontalLayout_ ? this.reflowHorizontal(e) : this.reflowVertical(e), this.reflowWrapper_ && this.workspace_.addChangeListener(this.reflowWrapper_)
}, Blockly.Toolbox = function(e) {
    this.workspace_ = e, this.RTL = e.options.RTL, this.horizontalLayout_ = e.options.horizontalLayout, this.toolboxPosition = e.options.toolboxPosition, this.config_ = {
        indentWidth: 19,
        cssRoot: "blocklyTreeRoot",
        cssHideRoot: "blocklyHidden",
        cssItem: "",
        cssTreeRow: "blocklyTreeRow",
        cssItemLabel: "blocklyTreeLabel",
        cssTreeIcon: "blocklyTreeIcon",
        cssExpandedFolderIcon: "blocklyTreeIconOpen",
        cssFileIcon: "blocklyTreeIconNone",
        cssSelectedRow: "blocklyTreeSelected"
    }, this.treeSeparatorConfig_ = {
        cssTreeRow: "blocklyTreeSeparator"
    }, this.horizontalLayout_ && (this.config_.cssTreeRow += e.RTL ? " blocklyHorizontalTreeRtl" : " blocklyHorizontalTree", this.treeSeparatorConfig_.cssTreeRow = "blocklyTreeSeparatorHorizontal " + (e.RTL ? "blocklyHorizontalTreeRtl" : "blocklyHorizontalTree"), this.config_.cssTreeIcon = "")
}, Blockly.Toolbox.prototype.width = 0, Blockly.Toolbox.prototype.height = 0, Blockly.Toolbox.prototype.selectedOption_ = null, Blockly.Toolbox.prototype.lastCategory_ = null, Blockly.Toolbox.prototype.init = function() {
    var e = this.workspace_,
        o = this.workspace_.getParentSvg();
    this.HtmlDiv = goog.dom.createDom("DIV", "blocklyToolboxDiv"), this.HtmlDiv.setAttribute("dir", e.RTL ? "RTL" : "LTR"), o.parentNode.insertBefore(this.HtmlDiv, o), Blockly.bindEventWithChecks_(this.HtmlDiv, "mousedown", this, function(e) {
        Blockly.utils.isRightButton(e) || e.target == this.HtmlDiv ? Blockly.hideChaff(!1) : Blockly.hideChaff(!0), Blockly.Touch.clearTouchIdentifier()
    }), this.flyout_ = new Blockly.Flyout({
        disabledPatternId: e.options.disabledPatternId,
        parentWorkspace: e,
        RTL: e.RTL,
        oneBasedIndex: e.options.oneBasedIndex,
        horizontalLayout: e.horizontalLayout,
        toolboxPosition: e.options.toolboxPosition
    }), goog.dom.insertSiblingAfter(this.flyout_.createDom("svg"), this.workspace_.getParentSvg()), this.flyout_.init(e), this.config_.cleardotPath = e.options.pathToMedia + "1x1.gif", this.config_.cssCollapsedFolderIcon = "blocklyTreeIconClosed" + (e.RTL ? "Rtl" : "Ltr"), this.tree_ = o = new Blockly.Toolbox.TreeControl(this, this.config_), o.setShowRootNode(!1), o.setShowLines(!1), o.setShowExpandIcons(!1), o.setSelectedItem(null), e = this.populate_(e.options.languageTree), o.render(this.HtmlDiv), e && o.setSelectedItem(e), this.addColour_(), this.position()
}, Blockly.Toolbox.prototype.dispose = function() {
    this.flyout_.dispose(), this.tree_.dispose(), goog.dom.removeNode(this.HtmlDiv), this.lastCategory_ = this.workspace_ = null
}, Blockly.Toolbox.prototype.getWidth = function() {
    return this.width
}, Blockly.Toolbox.prototype.getHeight = function() {
    return this.height
}, Blockly.Toolbox.prototype.position = function() {
    var e = this.HtmlDiv;
    if (e) {
        var o = this.workspace_.getParentSvg(),
            o = Blockly.svgSize(o);
        this.horizontalLayout_ ? (e.style.left = "0", e.style.height = "auto", e.style.width = o.width + "px", this.height = e.offsetHeight, this.toolboxPosition == Blockly.TOOLBOX_AT_TOP ? e.style.top = "0" : e.style.bottom = "0") : (this.toolboxPosition == Blockly.TOOLBOX_AT_RIGHT ? e.style.right = "0" : e.style.left = "0", e.style.height = o.height + "px", this.width = e.offsetWidth), this.flyout_.position()
    }
}, Blockly.Toolbox.prototype.populate_ = function(e) {
    if (this.tree_.removeChildren(), this.tree_.blocks = [], this.hasColours_ = !1, e = this.syncTrees_(e, this.tree_, this.workspace_.options.pathToMedia), this.tree_.blocks.length) throw "Toolbox cannot have both blocks and categories in the root level.";
    return this.workspace_.resizeContents(), e
}, Blockly.Toolbox.prototype.syncTrees_ = function(e, o, t) {
    for (var n, r = null, i = null, s = 0; n = e.childNodes[s]; s++)
        if (n.tagName) switch (n.tagName.toUpperCase()) {
            case "CATEGORY":
                i = Blockly.utils.replaceMessageReferences(n.getAttribute("name")), (i = this.tree_.createNode(i)).blocks = [], o.add(i);
                var l = n.getAttribute("custom");
                l ? i.blocks = l : (l = this.syncTrees_(n, i, t)) && (r = l), l = Blockly.utils.replaceMessageReferences(n.getAttribute("colour")), goog.isString(l) ? (l.match(/^#[0-9a-fA-F]{6}$/) ? i.hexColour = l : i.hexColour = Blockly.hueToRgb(l), this.hasColours_ = !0) : i.hexColour = "", "true" == n.getAttribute("expanded") ? (i.blocks.length && (r = i), i.setExpanded(!0)) : i.setExpanded(!1), i = n;
                break;
            case "SEP":
                i && ("CATEGORY" == i.tagName.toUpperCase() ? o.add(new Blockly.Toolbox.TreeSeparator(this.treeSeparatorConfig_)) : (n = parseFloat(n.getAttribute("gap")), !isNaN(n) && i && i.setAttribute("gap", n)));
                break;
            case "BLOCK":
            case "SHADOW":
            case "LABEL":
            case "BUTTON":
                o.blocks.push(n), i = n
        }
    return r
}, Blockly.Toolbox.prototype.addColour_ = function(e) {
    for (var o, t = (e || this.tree_).getChildren(), n = 0; o = t[n]; n++) {
        var r = o.getRowElement();
        r && (e = this.hasColours_ ? "8px solid " + (o.hexColour || "#ddd") : "none", this.workspace_.RTL ? r.style.borderRight = e : r.style.borderLeft = e), this.addColour_(o)
    }
}, Blockly.Toolbox.prototype.clearSelection = function() {
    this.tree_.setSelectedItem(null)
}, Blockly.Toolbox.prototype.addDeleteStyle = function() {
    Blockly.utils.addClass(this.HtmlDiv, "blocklyToolboxDelete")
}, Blockly.Toolbox.prototype.removeDeleteStyle = function() {
    Blockly.utils.removeClass(this.HtmlDiv, "blocklyToolboxDelete")
}, Blockly.Toolbox.prototype.getClientRect = function() {
    if (!this.HtmlDiv) return null;
    var e = (n = this.HtmlDiv.getBoundingClientRect()).left,
        o = n.top,
        t = n.width,
        n = n.height;
    return this.toolboxPosition == Blockly.TOOLBOX_AT_LEFT ? new goog.math.Rect(-1e7, -1e7, 1e7 + e + t, 2e7) : this.toolboxPosition == Blockly.TOOLBOX_AT_RIGHT ? new goog.math.Rect(e, -1e7, 1e7 + t, 2e7) : this.toolboxPosition == Blockly.TOOLBOX_AT_TOP ? new goog.math.Rect(-1e7, -1e7, 2e7, 1e7 + o + n) : new goog.math.Rect(0, o, 2e7, 1e7 + t)
}, Blockly.Toolbox.prototype.refreshSelection = function() {
    var e = this.tree_.getSelectedItem();
    e && e.blocks && this.flyout_.show(e.blocks)
}, Blockly.Toolbox.TreeControl = function(e, o) {
    this.toolbox_ = e, goog.ui.tree.TreeControl.call(this, goog.html.SafeHtml.EMPTY, o)
}, goog.inherits(Blockly.Toolbox.TreeControl, goog.ui.tree.TreeControl), Blockly.Toolbox.TreeControl.prototype.enterDocument = function() {
    if (Blockly.Toolbox.TreeControl.superClass_.enterDocument.call(this), goog.events.BrowserFeature.TOUCH_ENABLED) {
        var e = this.getElement();
        Blockly.bindEventWithChecks_(e, goog.events.EventType.TOUCHSTART, this, this.handleTouchEvent_)
    }
}, Blockly.Toolbox.TreeControl.prototype.handleTouchEvent_ = function(e) {
    e.preventDefault();
    var o = this.getNodeFromEvent_(e);
    o && e.type === goog.events.EventType.TOUCHSTART && setTimeout(function() {
        o.onMouseDown(e)
    }, 1)
}, Blockly.Toolbox.TreeControl.prototype.createNode = function(e) {
    return new Blockly.Toolbox.TreeNode(this.toolbox_, e ? goog.html.SafeHtml.htmlEscape(e) : goog.html.SafeHtml.EMPTY, this.getConfig(), this.getDomHelper())
}, Blockly.Toolbox.TreeControl.prototype.setSelectedItem = function(e) {
    var o = this.toolbox_;
    if (e != this.selectedItem_ && e != o.tree_) {
        if (o.lastCategory_ && (o.lastCategory_.getRowElement().style.backgroundColor = ""), e) {
            var t = e.hexColour || "#57e";
            e.getRowElement().style.backgroundColor = t, o.addColour_(e)
        }
        t = this.getSelectedItem(), goog.ui.tree.TreeControl.prototype.setSelectedItem.call(this, e), e && e.blocks && e.blocks.length ? (o.flyout_.show(e.blocks), o.lastCategory_ != e && o.flyout_.scrollToStart()) : o.flyout_.hide(), t != e && t != this && (t = new Blockly.Events.Ui(null, "category", t && t.getHtml(), e && e.getHtml()), t.workspaceId = o.workspace_.id, Blockly.Events.fire(t)), e && (o.lastCategory_ = e)
    }
}, Blockly.Toolbox.TreeNode = function(e, o, t, n) {
    goog.ui.tree.TreeNode.call(this, o, t, n), e && (o = function() {
        Blockly.svgResize(e.workspace_)
    }, goog.events.listen(e.tree_, goog.ui.tree.BaseNode.EventType.EXPAND, o), goog.events.listen(e.tree_, goog.ui.tree.BaseNode.EventType.COLLAPSE, o))
}, goog.inherits(Blockly.Toolbox.TreeNode, goog.ui.tree.TreeNode), Blockly.Toolbox.TreeNode.prototype.getExpandIconSafeHtml = function() {
    return goog.html.SafeHtml.create("span")
}, Blockly.Toolbox.TreeNode.prototype.onMouseDown = function(e) {
    this.hasChildren() && this.isUserCollapsible_ ? (this.toggle(), this.select()) : this.isSelected() ? this.getTree().setSelectedItem(null) : this.select(), this.updateRow()
}, Blockly.Toolbox.TreeNode.prototype.onDoubleClick_ = function(e) {}, Blockly.Toolbox.TreeNode.prototype.onKeyDown = function(e) {
    if (this.tree.toolbox_.horizontalLayout_) {
        var o = {},
            t = goog.events.KeyCodes.DOWN,
            n = goog.events.KeyCodes.UP;
        o[goog.events.KeyCodes.RIGHT] = this.rightToLeft_ ? n : t, o[goog.events.KeyCodes.LEFT] = this.rightToLeft_ ? t : n, o[goog.events.KeyCodes.UP] = goog.events.KeyCodes.LEFT, o[goog.events.KeyCodes.DOWN] = goog.events.KeyCodes.RIGHT, e.keyCode = o[e.keyCode] || e.keyCode
    }
    return Blockly.Toolbox.TreeNode.superClass_.onKeyDown.call(this, e)
}, Blockly.Toolbox.TreeSeparator = function(e) {
    Blockly.Toolbox.TreeNode.call(this, null, "", e)
}, goog.inherits(Blockly.Toolbox.TreeSeparator, Blockly.Toolbox.TreeNode), Blockly.Css = {}, Blockly.Css.Cursor = {
    OPEN: "handopen",
    CLOSED: "handclosed",
    DELETE: "handdelete"
}, Blockly.Css.currentCursor_ = "", Blockly.Css.styleSheet_ = null, Blockly.Css.mediaPath_ = "", Blockly.Css.inject = function(e, o) {
    if (!Blockly.Css.styleSheet_) {
        t = ".blocklyDraggable {}\n";
        e && (t += Blockly.Css.CONTENT.join("\n"), Blockly.FieldDate && (t += Blockly.FieldDate.CSS.join("\n"))), Blockly.Css.mediaPath_ = o.replace(/[\\\/]$/, "");
        var t = t.replace(/<<<PATH>>>/g, Blockly.Css.mediaPath_),
            n = document.createElement("style");
        document.head.insertBefore(n, document.head.firstChild), t = document.createTextNode(t), n.appendChild(t), Blockly.Css.styleSheet_ = n.sheet
    }
}, Blockly.Css.setCursor = function(e) {
    console.warn("Deprecated call to Blockly.Css.setCursor.See https://github.com/google/blockly/issues/981 for context")
}, 
//Blockly.Css.CONTENT = [".blocklySvg {", "background-color: #fff;", "outline: none;", "overflow: hidden;", "position: absolute;", "display: block; border: 1px solid #ddd;", "}", ".blocklyWidgetDiv {", "display: none;", "position: absolute;", "z-index: 99999;", "}", ".injectionDiv {", "height: 100%;", "position: relative;", "overflow: hidden;", "}", ".blocklyNonSelectable {", "user-select: none;", "-moz-user-select: none;", "-webkit-user-select: none;", "-ms-user-select: none;", "}", ".blocklyWsDragSurface {", "display: none;", "position: absolute;", "overflow: visible;", "top: 0;", "left: 0;", "}", ".blocklyBlockDragSurface {", "display: none;", "position: absolute;", "top: 0;", "left: 0;", "right: 0;", "bottom: 0;", "overflow: visible !important;", "z-index: 50;", "}", ".blocklyTooltipDiv {", "background-color: #ffffc7;", "border: 1px solid #ddc;", "box-shadow: 4px 4px 20px 1px rgba(0,0,0,.15);", "color: #000;", "display: none;", "font-family: sans-serif;", "font-size: 9pt;", "opacity: 0.9;", "padding: 2px;", "position: absolute;", "z-index: 100000;", "}", ".blocklyResizeSE {", "cursor: se-resize;", "fill: #aaa;", "}", ".blocklyResizeSW {", "cursor: sw-resize;", "fill: #aaa;", "}", ".blocklyResizeLine {", "stroke: #888;", "stroke-width: 1;", "}", ".blocklyHighlightedConnectionPath {", "fill: none;", "stroke: #fc3;", "stroke-width: 4px;", "}", ".blocklyPathLight {", "fill: none;", "stroke-linecap: round;", "stroke-width: 2;", "}", ".blocklySelected>.blocklyPath {", "stroke: #fc3;", "stroke-width: 3px;", "}", ".blocklySelected>.blocklyPathLight {", "display: none;", "}", ".blocklyDraggable {", "cursor: url(./media/handopen.cur), auto;", "cursor: grab;", "cursor: -webkit-grab;", "cursor: -moz-grab;", "}", ".blocklyDragging {", "cursor: url(./media/handclosed.cur), auto;", "cursor: grabbing;", "cursor: -webkit-grabbing;", "cursor: -moz-grabbing;", "}", ".blocklyDraggable:active {", "cursor: url(./media/handclosed.cur), auto;", "cursor: grabbing;", "cursor: -webkit-grabbing;", "cursor: -moz-grabbing;", "}", ".blocklyBlockDragSurface .blocklyDraggable {", "cursor: url(./media/handclosed.cur), auto;", "cursor: grabbing;", "cursor: -webkit-grabbing;", "cursor: -moz-grabbing;", "}", ".blocklyDragging.blocklyDraggingDelete {", "cursor: url(./media/handdelete.cur), auto;", "}", ".blocklyToolboxDelete {", "cursor: url(./media/handdelete.cur), auto;", "}", ".blocklyDragging>.blocklyPath,", ".blocklyDragging>.blocklyPathLight {", "fill-opacity: .8;", "stroke-opacity: .8;", "}", ".blocklyDragging>.blocklyPathDark {", "display: none;", "}", ".blocklyDisabled>.blocklyPath {", "fill-opacity: .5;", "stroke-opacity: .5;", "}", ".blocklyDisabled>.blocklyPathLight,", ".blocklyDisabled>.blocklyPathDark {", "display: none;", "}", ".blocklyText {", "cursor: default;", "fill: #fff;", "font-family: sans-serif;", "font-size: 11pt;", "}", ".blocklyNonEditableText>text {", "pointer-events: none;", "}", ".blocklyNonEditableText>rect,", ".blocklyEditableText>rect {", "fill: #fff;", "fill-opacity: .6;", "}", ".blocklyNonEditableText>text,", ".blocklyEditableText>text {", "fill: #000;", "}", ".blocklyEditableText:hover>rect {", "stroke: #fff;", "stroke-width: 2;", "}", ".blocklyBubbleText {", "fill: #000;", "}", ".blocklyFlyout {", "position: absolute;", "z-index: 20;", "}", ".blocklyFlyoutButton {", "fill: #888;", "cursor: default;", "}", ".blocklyFlyoutButtonShadow {", "fill: #666;", "}", ".blocklyFlyoutButton:hover {", "fill: #aaa;", "}", ".blocklyFlyoutLabel {", "cursor: default;", "}", ".blocklyFlyoutLabelBackground {", "opacity: 0;", "}", ".blocklyFlyoutLabelText {", "fill: #000;", "}", ".blocklySvg text, .blocklyBlockDragSurface text {", "user-select: none;", "-moz-user-select: none;", "-webkit-user-select: none;", "cursor: inherit;", "}", ".blocklyHidden {", "display: none;", "}", ".blocklyFieldDropdown:not(.blocklyHidden) {", "display: block;", "}", ".blocklyIconGroup {", "cursor: default;", "}", ".blocklyIconGroup:not(:hover),", ".blocklyIconGroupReadonly {", "opacity: .6;", "}", ".blocklyIconShape {", "fill: #00f;", "stroke: #fff;", "stroke-width: 1px;", "}", ".blocklyIconSymbol {", "fill: #fff;", "}", ".blocklyMinimalBody {", "margin: 0;", "padding: 0;", "}", ".blocklyCommentTextarea {", "background-color: #ffc;", "border: 0;", "margin: 0;", "padding: 2px;", "resize: none;", "}", ".blocklyHtmlInput {", "border: none;", "border-radius: 4px;", "font-family: sans-serif;", "height: 100%;", "margin: 0;", "outline: none;", "padding: 0 1px;", "width: 100%", "}", ".blocklyMainBackground {", "stroke-width: 1;", "stroke: #c6c6c6;", "}", ".blocklyMutatorBackground {", "fill: #fff;", "stroke: #ddd;", "stroke-width: 1;", "}", ".blocklyFlyoutBackground {", "fill: #ddd;", "fill-opacity: .8;", "}", ".blocklyMainWorkspaceScrollbar {", "z-index: 20;", "}", ".blocklyFlyoutScrollbar {", "z-index: 30;", "}", ".blocklyScrollbarHorizontal, .blocklyScrollbarVertical {", "position: absolute;", "outline: none;", "}", ".blocklyScrollbarBackground {", "opacity: 0;", "}", ".blocklyScrollbarHandle {", "fill: #ccc;", "}", ".blocklyScrollbarBackground:hover+.blocklyScrollbarHandle,", ".blocklyScrollbarHandle:hover {", "fill: #bbb;", "}", ".blocklyZoom>image {", "opacity: .4;", "}", ".blocklyZoom>image:hover {", "opacity: .6;", "}", ".blocklyZoom>image:active {", "opacity: .8;", "}", ".blocklyFlyout .blocklyScrollbarHandle {", "fill: #bbb;", "}", ".blocklyFlyout .blocklyScrollbarBackground:hover+.blocklyScrollbarHandle,", ".blocklyFlyout .blocklyScrollbarHandle:hover {", "fill: #aaa;", "}", ".blocklyInvalidInput {", "background: #faa;", "}", ".blocklyAngleCircle {", "stroke: #444;", "stroke-width: 1;", "fill: #ddd;", "fill-opacity: .8;", "}", ".blocklyAngleMarks {", "stroke: #444;", "stroke-width: 1;", "}", ".blocklyAngleGauge {", "fill: #f88;", "fill-opacity: .8;", "}", ".blocklyAngleLine {", "stroke: #f00;", "stroke-width: 2;", "stroke-linecap: round;", "pointer-events: none;", "}", ".blocklyContextMenu {", "border-radius: 4px;", "}", ".blocklyDropdownMenu {", "padding: 0 !important;", "}", ".blocklyWidgetDiv .goog-option-selected .goog-menuitem-checkbox,", ".blocklyWidgetDiv .goog-option-selected .goog-menuitem-icon {", "background: url(./media/sprites.png) no-repeat -48px -16px !important;", "}", ".blocklyToolboxDiv {", "background-color: #62aeb2;", "color: #ffffff;", "overflow-x: visible;", "overflow-y: auto;", "position: absolute;", "z-index: 70;", "}", ".blocklyTreeRoot {", "padding: 4px 0;", "}", ".blocklyTreeRoot:focus {", "outline: none;", "}", ".blocklyTreeRow {", "height: 22px;", "line-height: 22px;", "margin-bottom: 3px;", "padding-right: 8px;", "white-space: nowrap;", "}", ".blocklyHorizontalTree {", "float: left;", "margin: 1px 5px 8px 0;", "}", ".blocklyHorizontalTreeRtl {", "float: right;", "margin: 1px 0 8px 5px;", "}", '.blocklyToolboxDiv[dir="RTL"] .blocklyTreeRow {', "margin-left: 8px;", "}", ".blocklyTreeRow:not(.blocklyTreeSelected):hover {", "background-color: #00878f;", "}", ".blocklyTreeSeparator {", "border-bottom: solid #e5e5e5 1px;", "height: 0;", "margin: 5px 0;", "}", ".blocklyTreeSeparatorHorizontal {", "border-right: solid #e5e5e5 1px;", "width: 0;", "padding: 5px 0;", "margin: 0 5px;", "}", ".blocklyTreeIcon {", "height: 16px;", "vertical-align: middle;", "width: 16px;", "}", ".blocklyTreeIconClosedLtr {", "background-position: -32px -1px;", "}", ".blocklyTreeIconClosedRtl {", "background-position: 0px -1px;", "}", ".blocklyTreeIconOpen {", "background-position: -16px -1px;", "}", ".blocklyTreeSelected>.blocklyTreeIconClosedLtr {", "background-position: -32px -17px;", "}", ".blocklyTreeSelected>.blocklyTreeIconClosedRtl {", "background-position: 0px -17px;", "}", ".blocklyTreeSelected>.blocklyTreeIconOpen {", "background-position: -16px -17px;", "}", ".blocklyTreeIconNone,", ".blocklyTreeSelected>.blocklyTreeIconNone {", "background-position: -48px -1px;", "}", ".blocklyTreeLabel {", "cursor: default;", "font-family: sans-serif;", "font-size: 16px;", "padding: 0 3px;", "vertical-align: middle;", "}", ".blocklyTreeSelected .blocklyTreeLabel {", "color: #fff;", "}", ".blocklyWidgetDiv .goog-palette {", "outline: none;", "cursor: default;", "}", ".blocklyWidgetDiv .goog-palette-table {", "border: 1px solid #666;", "border-collapse: collapse;", "}", ".blocklyWidgetDiv .goog-palette-cell {", "height: 13px;", "width: 15px;", "margin: 0;", "border: 0;", "text-align: center;", "vertical-align: middle;", "border-right: 1px solid #666;", "font-size: 1px;", "}", ".blocklyWidgetDiv .goog-palette-colorswatch {", "position: relative;", "height: 13px;", "width: 15px;", "border: 1px solid #666;", "}", ".blocklyWidgetDiv .goog-palette-cell-hover .goog-palette-colorswatch {", "border: 1px solid #FFF;", "}", ".blocklyWidgetDiv .goog-palette-cell-selected .goog-palette-colorswatch {", "border: 1px solid #000;", "color: #fff;", "}", ".blocklyWidgetDiv .goog-menu {", "background: #fff;", "border-color: #ccc #666 #666 #ccc;", "border-style: solid;", "border-width: 1px;", "cursor: default;", "font: normal 13px Arial, sans-serif;", "margin: 0;", "outline: none;", "padding: 4px 0;", "position: absolute;", "overflow-y: auto;", "overflow-x: hidden;", "max-height: 100%;", "z-index: 20000;", "}", ".blocklyWidgetDiv .goog-menuitem {", "color: #000;", "font: normal 13px Arial, sans-serif;", "list-style: none;", "margin: 0;", "padding: 4px 7em 4px 28px;", "white-space: nowrap;", "}", ".blocklyWidgetDiv .goog-menuitem.goog-menuitem-rtl {", "padding-left: 7em;", "padding-right: 28px;", "}", ".blocklyWidgetDiv .goog-menu-nocheckbox .goog-menuitem,", ".blocklyWidgetDiv .goog-menu-noicon .goog-menuitem {", "padding-left: 12px;", "}", ".blocklyWidgetDiv .goog-menu-noaccel .goog-menuitem {", "padding-right: 20px;", "}", ".blocklyWidgetDiv .goog-menuitem-content {", "color: #000;", "font: normal 13px Arial, sans-serif;", "}", ".blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-accel,", ".blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-content {", "color: #ccc !important;", "}", ".blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-icon {", "opacity: 0.3;", "-moz-opacity: 0.3;", "filter: alpha(opacity=30);", "}", ".blocklyWidgetDiv .goog-menuitem-highlight,", ".blocklyWidgetDiv .goog-menuitem-hover {", "background-color: #d6e9f8;", "border-color: #d6e9f8;", "border-style: dotted;", "border-width: 1px 0;", "padding-bottom: 3px;", "padding-top: 3px;", "}", ".blocklyWidgetDiv .goog-menuitem-checkbox,", ".blocklyWidgetDiv .goog-menuitem-icon {", "background-repeat: no-repeat;", "height: 16px;", "left: 6px;", "position: absolute;", "right: auto;", "vertical-align: middle;", "width: 16px;", "}", ".blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-checkbox,", ".blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-icon {", "left: auto;", "right: 6px;", "}", ".blocklyWidgetDiv .goog-option-selected .goog-menuitem-checkbox,", ".blocklyWidgetDiv .goog-option-selected .goog-menuitem-icon {", "background: 'img/gstatic/editor/editortoolbar.png' no-repeat -512px 0;", "}", ".blocklyWidgetDiv .goog-menuitem-accel {", "color: #999;", "direction: ltr;", "left: auto;", "padding: 0 6px;", "position: absolute;", "right: 0;", "text-align: right;", "}", ".blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-accel {", "left: 0;", "right: auto;", "text-align: left;", "}", ".blocklyWidgetDiv .goog-menuitem-mnemonic-hint {", "text-decoration: underline;", "}", ".blocklyWidgetDiv .goog-menuitem-mnemonic-separator {", "color: #999;", "font-size: 12px;", "padding-left: 4px;", "}", ".blocklyWidgetDiv .goog-menuseparator {", "border-top: 1px solid #ccc;", "margin: 4px 0;", "padding: 0;", "}", ""]
Blockly.Css.CONTENT=[".blocklySvg {","background-color: #fff;","outline: none;","overflow: hidden;","position: absolute;","display: block;","}",".blocklyWidgetDiv {","display: none;","position: absolute;","z-index: 99999;","}",".injectionDiv {","height: 100%;","position: relative;","overflow: hidden;","touch-action: none","}",".blocklyNonSelectable {","user-select: none;","-moz-user-select: none;","-webkit-user-select: none;","-ms-user-select: none;","}",".blocklyWsDragSurface {","display: none;",
"position: absolute;","top: 0;","left: 0;","}",".blocklyWsDragSurface.blocklyOverflowVisible {","overflow: visible;","}",".blocklyBlockDragSurface {","display: none;","position: absolute;","top: 0;","left: 0;","right: 0;","bottom: 0;","overflow: visible !important;","z-index: 50;","}",".blocklyTooltipDiv {","background-color: #ffffc7;","border: 1px solid #ddc;","box-shadow: 4px 4px 20px 1px rgba(0,0,0,.15);","color: #000;","display: none;","font-family: sans-serif;","font-size: 9pt;","opacity: 0.9;",
"padding: 2px;","position: absolute;","z-index: 100000;","}",".blocklyResizeSE {","cursor: se-resize;","fill: #aaa;","}",".blocklyResizeSW {","cursor: sw-resize;","fill: #aaa;","}",".blocklyResizeLine {","stroke: #888;","stroke-width: 1;","}",".blocklyHighlightedConnectionPath {","fill: none;","stroke: #fc3;","stroke-width: 4px;","}",".blocklyPathLight {","fill: none;","stroke-linecap: round;","stroke-width: 1;","}",".blocklySelected>.blocklyPath {","stroke: #fc3;","stroke-width: 3px;","}",".blocklySelected>.blocklyPathLight {",
"display: none;","}",".blocklyDraggable {",'cursor: url("<<<PATH>>>/handopen.cur"), auto;',"cursor: grab;","cursor: -webkit-grab;","cursor: -moz-grab;","}",".blocklyDragging {",'cursor: url("<<<PATH>>>/handclosed.cur"), auto;',"cursor: grabbing;","cursor: -webkit-grabbing;","cursor: -moz-grabbing;","}",".blocklyDraggable:active {",'cursor: url("<<<PATH>>>/handclosed.cur"), auto;',"cursor: grabbing;","cursor: -webkit-grabbing;","cursor: -moz-grabbing;","}",".blocklyBlockDragSurface .blocklyDraggable {",
'cursor: url("<<<PATH>>>/handclosed.cur"), auto;',"cursor: grabbing;","cursor: -webkit-grabbing;","cursor: -moz-grabbing;","}",".blocklyDragging.blocklyDraggingDelete {",'cursor: url("<<<PATH>>>/handdelete.cur"), auto;',"}",".blocklyToolboxDelete {",'cursor: url("<<<PATH>>>/handdelete.cur"), auto;',"}",".blocklyDragging>.blocklyPath,",".blocklyDragging>.blocklyPathLight {","fill-opacity: .8;","stroke-opacity: .8;","}",".blocklyDragging>.blocklyPathDark {","display: none;","}",".blocklyDisabled>.blocklyPath {",
"fill-opacity: .5;","stroke-opacity: .5;","}",".blocklyDisabled>.blocklyPathLight,",".blocklyDisabled>.blocklyPathDark {","display: none;","}",".blocklyText {","cursor: default;","fill: #fff;","font-family: sans-serif;","font-size: 11pt;","}",".blocklyNonEditableText>text {","pointer-events: none;","}",".blocklyNonEditableText>rect,",".blocklyEditableText>rect {","fill: #fff;","fill-opacity: .6;","}",".blocklyNonEditableText>text,",".blocklyEditableText>text {","fill: #000;","}",".blocklyEditableText:hover>rect {",
"stroke: #fff;","stroke-width: 2;","}",".blocklyBubbleText {","fill: #000;","}",".blocklyFlyout {","position: absolute;","z-index: 20;","}",".blocklyFlyoutButton {","fill: #888;","cursor: default;","}",".blocklyFlyoutButtonShadow {","fill: #666;","}",".blocklyFlyoutButton:hover {","fill: #aaa;","}",".blocklyFlyoutLabel {","cursor: default;","}",".blocklyFlyoutLabelBackground {","opacity: 0;","}",".blocklyFlyoutLabelText {","fill: #000;","}",".blocklySvg text, .blocklyBlockDragSurface text {","user-select: none;",
"-moz-user-select: none;","-webkit-user-select: none;","cursor: inherit;","}",".blocklyHidden {","display: none;","}",".blocklyFieldDropdown:not(.blocklyHidden) {","display: block;","}",".blocklyIconGroup {","cursor: default;","}",".blocklyIconGroup:not(:hover),",".blocklyIconGroupReadonly {","opacity: .6;","}",".blocklyIconShape {","fill: #00f;","stroke: #fff;","stroke-width: 1px;","}",".blocklyIconSymbol {","fill: #fff;","}",".blocklyMinimalBody {","margin: 0;","padding: 0;","}",".blocklyCommentTextarea {",
"background-color: #ffc;","border: 0;","margin: 0;","padding: 2px;","resize: none;","}",".blocklyHtmlInput {","border: none;","border-radius: 4px;","font-family: sans-serif;","height: 100%;","margin: 0;","outline: none;","padding: 0 1px;","width: 100%","}",".blocklyMainBackground {","stroke-width: 1;","stroke: #c6c6c6;","}",".blocklyMutatorBackground {","fill: #fff;","stroke: #ddd;","stroke-width: 1;","}",".blocklyFlyoutBackground {","fill: #ddd;","fill-opacity: .8;","}",".blocklyTransparentBackground {",
"opacity: 0;","}",".blocklyMainWorkspaceScrollbar {","z-index: 20;","}",".blocklyFlyoutScrollbar {","z-index: 30;","}",".blocklyScrollbarHorizontal, .blocklyScrollbarVertical {","position: absolute;","outline: none;","}",".blocklyScrollbarBackground {","opacity: 0;","}",".blocklyScrollbarHandle {","fill: #ccc;","}",".blocklyScrollbarBackground:hover+.blocklyScrollbarHandle,",".blocklyScrollbarHandle:hover {","fill: #bbb;","}",".blocklyZoom>image {","opacity: .4;","}",".blocklyZoom>image:hover {",
"opacity: .6;","}",".blocklyZoom>image:active {","opacity: .8;","}",".blocklyFlyout .blocklyScrollbarHandle {","fill: #bbb;","}",".blocklyFlyout .blocklyScrollbarBackground:hover+.blocklyScrollbarHandle,",".blocklyFlyout .blocklyScrollbarHandle:hover {","fill: #aaa;","}",".blocklyInvalidInput {","background: #faa;","}",".blocklyAngleCircle {","stroke: #444;","stroke-width: 1;","fill: #ddd;","fill-opacity: .8;","}",".blocklyAngleMarks {","stroke: #444;","stroke-width: 1;","}",".blocklyAngleGauge {",
"fill: #f88;","fill-opacity: .8;","}",".blocklyAngleLine {","stroke: #f00;","stroke-width: 2;","stroke-linecap: round;","pointer-events: none;","}",".blocklyContextMenu {","border-radius: 4px;","}",".blocklyDropdownMenu {","padding: 0 !important;","}",".blocklyWidgetDiv .goog-option-selected .goog-menuitem-checkbox,",".blocklyWidgetDiv .goog-option-selected .goog-menuitem-icon {","background: url(<<<PATH>>>/sprites.png) no-repeat -48px -16px !important;","}",".blocklyToolboxDiv {","background-color: #ddd;",
"overflow-x: visible;","overflow-y: auto;","position: absolute;","z-index: 70;","-webkit-tap-highlight-color: transparent;","}",".blocklyTreeRoot {","padding: 4px 0;","}",".blocklyTreeRoot:focus {","outline: none;","}",".blocklyTreeRow {","height: 22px;","line-height: 22px;","margin-bottom: 3px;","padding-right: 8px;","white-space: nowrap;","}",".blocklyHorizontalTree {","float: left;","margin: 1px 5px 8px 0;","}",".blocklyHorizontalTreeRtl {","float: right;","margin: 1px 0 8px 5px;","}",'.blocklyToolboxDiv[dir="RTL"] .blocklyTreeRow {',
"margin-left: 8px;","}",".blocklyTreeRow:not(.blocklyTreeSelected):hover {","background-color: #e4e4e4;","}",".blocklyTreeSeparator {","border-bottom: solid #e5e5e5 1px;","height: 0;","margin: 5px 0;","}",".blocklyTreeSeparatorHorizontal {","border-right: solid #e5e5e5 1px;","width: 0;","padding: 5px 0;","margin: 0 5px;","}",".blocklyTreeIcon {","background-image: url(<<<PATH>>>/sprites.png);","height: 16px;","vertical-align: middle;","width: 16px;","}",".blocklyTreeIconClosedLtr {","background-position: -32px -1px;",
"}",".blocklyTreeIconClosedRtl {","background-position: 0px -1px;","}",".blocklyTreeIconOpen {","background-position: -16px -1px;","}",".blocklyTreeSelected>.blocklyTreeIconClosedLtr {","background-position: -32px -17px;","}",".blocklyTreeSelected>.blocklyTreeIconClosedRtl {","background-position: 0px -17px;","}",".blocklyTreeSelected>.blocklyTreeIconOpen {","background-position: -16px -17px;","}",".blocklyTreeIconNone,",".blocklyTreeSelected>.blocklyTreeIconNone {","background-position: -48px -1px;",
"}",".blocklyTreeLabel {","cursor: default;","font-family: sans-serif;","font-size: 16px;","padding: 0 3px;","vertical-align: middle;","}",".blocklyToolboxDelete .blocklyTreeLabel {",'cursor: url("<<<PATH>>>/handdelete.cur"), auto;',"}",".blocklyTreeSelected .blocklyTreeLabel {","color: #fff;","}",".blocklyWidgetDiv .goog-palette {","outline: none;","cursor: default;","}",".blocklyWidgetDiv .goog-palette-table {","border: 1px solid #666;","border-collapse: collapse;","}",".blocklyWidgetDiv .goog-palette-cell {",
"height: 13px;","width: 15px;","margin: 0;","border: 0;","text-align: center;","vertical-align: middle;","border-right: 1px solid #666;","font-size: 1px;","}",".blocklyWidgetDiv .goog-palette-colorswatch {","position: relative;","height: 13px;","width: 15px;","border: 1px solid #666;","}",".blocklyWidgetDiv .goog-palette-cell-hover .goog-palette-colorswatch {","border: 1px solid #FFF;","}",".blocklyWidgetDiv .goog-palette-cell-selected .goog-palette-colorswatch {","border: 1px solid #000;","color: #fff;",
"}",".blocklyWidgetDiv .goog-menu {","background: #fff;","border-color: #ccc #666 #666 #ccc;","border-style: solid;","border-width: 1px;","cursor: default;","font: normal 13px Arial, sans-serif;","margin: 0;","outline: none;","padding: 4px 0;","position: absolute;","overflow-y: auto;","overflow-x: hidden;","max-height: 100%;","z-index: 20000;","}",".blocklyWidgetDiv .goog-menuitem {","color: #000;","font: normal 13px Arial, sans-serif;","list-style: none;","margin: 0;","padding: 4px 7em 4px 28px;",
"white-space: nowrap;","}",".blocklyWidgetDiv .goog-menuitem.goog-menuitem-rtl {","padding-left: 7em;","padding-right: 28px;","}",".blocklyWidgetDiv .goog-menu-nocheckbox .goog-menuitem,",".blocklyWidgetDiv .goog-menu-noicon .goog-menuitem {","padding-left: 12px;","}",".blocklyWidgetDiv .goog-menu-noaccel .goog-menuitem {","padding-right: 20px;","}",".blocklyWidgetDiv .goog-menuitem-content {","color: #000;","font: normal 13px Arial, sans-serif;","}",".blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-accel,",
".blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-content {","color: #ccc !important;","}",".blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-icon {","opacity: 0.3;","-moz-opacity: 0.3;","filter: alpha(opacity=30);","}",".blocklyWidgetDiv .goog-menuitem-highlight,",".blocklyWidgetDiv .goog-menuitem-hover {","background-color: #d6e9f8;","border-color: #d6e9f8;","border-style: dotted;","border-width: 1px 0;","padding-bottom: 3px;","padding-top: 3px;","}",".blocklyWidgetDiv .goog-menuitem-checkbox,",
".blocklyWidgetDiv .goog-menuitem-icon {","background-repeat: no-repeat;","height: 16px;","left: 6px;","position: absolute;","right: auto;","vertical-align: middle;","width: 16px;","}",".blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-checkbox,",".blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-icon {","left: auto;","right: 6px;","}",".blocklyWidgetDiv .goog-option-selected .goog-menuitem-checkbox,",".blocklyWidgetDiv .goog-option-selected .goog-menuitem-icon {","background: url(//ssl.gstatic.com/editor/editortoolbar.png) no-repeat -512px 0;",
"}",".blocklyWidgetDiv .goog-menuitem-accel {","color: #999;","direction: ltr;","left: auto;","padding: 0 6px;","position: absolute;","right: 0;","text-align: right;","}",".blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-accel {","left: 0;","right: auto;","text-align: left;","}",".blocklyWidgetDiv .goog-menuitem-mnemonic-hint {","text-decoration: underline;","}",".blocklyWidgetDiv .goog-menuitem-mnemonic-separator {","color: #999;","font-size: 12px;","padding-left: 4px;","}",".blocklyWidgetDiv .goog-menuseparator {",
"border-top: 1px solid #ccc;","margin: 4px 0;","padding: 0;","}",""]
, Blockly.WidgetDiv = {}, Blockly.WidgetDiv.DIV = null, Blockly.WidgetDiv.owner_ = null, Blockly.WidgetDiv.dispose_ = null, Blockly.WidgetDiv.createDom = function() {
    Blockly.WidgetDiv.DIV || (Blockly.WidgetDiv.DIV = goog.dom.createDom("DIV", "blocklyWidgetDiv"), document.body.appendChild(Blockly.WidgetDiv.DIV))
}, Blockly.WidgetDiv.show = function(e, o, t) {
    Blockly.WidgetDiv.hide(), Blockly.WidgetDiv.owner_ = e, Blockly.WidgetDiv.dispose_ = t, e = goog.style.getViewportPageOffset(document), Blockly.WidgetDiv.DIV.style.top = e.y + "px", Blockly.WidgetDiv.DIV.style.direction = o ? "rtl" : "ltr", Blockly.WidgetDiv.DIV.style.display = "block"
}, Blockly.WidgetDiv.hide = function() {
    Blockly.WidgetDiv.owner_ && (Blockly.WidgetDiv.owner_ = null, Blockly.WidgetDiv.DIV.style.display = "none", Blockly.WidgetDiv.DIV.style.left = "", Blockly.WidgetDiv.DIV.style.top = "", Blockly.WidgetDiv.dispose_ && Blockly.WidgetDiv.dispose_(), Blockly.WidgetDiv.dispose_ = null, goog.dom.removeChildren(Blockly.WidgetDiv.DIV))
}, Blockly.WidgetDiv.isVisible = function() {
    return !!Blockly.WidgetDiv.owner_
}, Blockly.WidgetDiv.hideIfOwner = function(e) {
    Blockly.WidgetDiv.owner_ == e && Blockly.WidgetDiv.hide()
}, Blockly.WidgetDiv.position = function(e, o, t, n, r) {
    o < n.y && (o = n.y), r ? e > t.width + n.x && (e = t.width + n.x) : e < n.x && (e = n.x), Blockly.WidgetDiv.DIV.style.left = e + "px", Blockly.WidgetDiv.DIV.style.top = o + "px", Blockly.WidgetDiv.DIV.style.height = t.height + "px"
}, Blockly.BlockDragSurfaceSvg = function(e) {
    this.container_ = e, this.createDom()
}, Blockly.BlockDragSurfaceSvg.prototype.SVG_ = null, Blockly.BlockDragSurfaceSvg.prototype.dragGroup_ = null, Blockly.BlockDragSurfaceSvg.prototype.container_ = null, Blockly.BlockDragSurfaceSvg.prototype.scale_ = 1, Blockly.BlockDragSurfaceSvg.prototype.createDom = function() {
    this.SVG_ || (this.SVG_ = Blockly.utils.createSvgElement("svg", {
        xmlns: Blockly.SVG_NS,
        "xmlns:html": Blockly.HTML_NS,
        "xmlns:xlink": "http://www.w3.org/1999/xlink",
        version: "1.1",
        class: "blocklyBlockDragSurface"
    }, this.container_), this.dragGroup_ = Blockly.utils.createSvgElement("g", {}, this.SVG_))
}, Blockly.BlockDragSurfaceSvg.prototype.setBlocksAndShow = function(e) {
    goog.asserts.assert(0 == this.dragGroup_.childNodes.length, "Already dragging a block."), this.dragGroup_.appendChild(e), this.SVG_.style.display = "block"
}, Blockly.BlockDragSurfaceSvg.prototype.translateAndScaleGroup = function(e, o, t) {
    this.scale_ = t, e = e.toFixed(0), o = o.toFixed(0), this.dragGroup_.setAttribute("transform", "translate(" + e + "," + o + ") scale(" + t + ")")
}, Blockly.BlockDragSurfaceSvg.prototype.translateSurface = function(e, o) {
    e *= this.scale_, o *= this.scale_, e = e.toFixed(0), o = o.toFixed(0), this.SVG_.style.display = "block", Blockly.utils.setCssTransform(this.SVG_, "translate3d(" + e + "px, " + o + "px, 0px)")
}, Blockly.BlockDragSurfaceSvg.prototype.getSurfaceTranslation = function() {
    var e = Blockly.utils.getRelativeXY(this.SVG_);
    return new goog.math.Coordinate(e.x / this.scale_, e.y / this.scale_)
}, Blockly.BlockDragSurfaceSvg.prototype.getGroup = function() {
    return this.dragGroup_
}, Blockly.BlockDragSurfaceSvg.prototype.getCurrentBlock = function() {
    return this.dragGroup_.firstChild
}, Blockly.BlockDragSurfaceSvg.prototype.clearAndHide = function(e) {
    e.appendChild(this.getCurrentBlock()), this.SVG_.style.display = "none", goog.asserts.assert(0 == this.dragGroup_.childNodes.length, "Drag group was not cleared.")
}, Blockly.inject = function(e, o) {
    if (goog.isString(e) && (e = document.getElementById(e) || document.querySelector(e)), !goog.dom.contains(document, e)) throw "Error: container is not in current document.";
    var t = new Blockly.Options(o || {}),
        n = goog.dom.createDom("div", "injectionDiv");
    e.appendChild(n);
    var r = Blockly.createDom_(n, t),
        i = new Blockly.BlockDragSurfaceSvg(n),
        n = new Blockly.WorkspaceDragSurfaceSvg(n),
        t = Blockly.createMainWorkspace_(r, t, i, n);
    return Blockly.init_(t), Blockly.mainWorkspace = t, Blockly.svgResize(t), t
}, Blockly.createDom_ = function(e, o) {
    e.setAttribute("dir", "LTR"), goog.ui.Component.setDefaultRightToLeft(o.RTL), Blockly.Css.inject(o.hasCss, o.pathToMedia);
    var t = Blockly.utils.createSvgElement("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            "xmlns:html": "http://www.w3.org/1999/xhtml",
            "xmlns:xlink": "http://www.w3.org/1999/xlink",
            version: "1.1",
            class: "blocklySvg"
        }, e),
        n = Blockly.utils.createSvgElement("defs", {}, t),
        r = String(Math.random()).substring(2),
        i = Blockly.utils.createSvgElement("filter", {
            id: "blocklyEmbossFilter" + r
        }, n);
    Blockly.utils.createSvgElement("feGaussianBlur", { in: "SourceAlpha",
        stdDeviation: 1,
        result: "blur"
    }, i);
    var s = Blockly.utils.createSvgElement("feSpecularLighting", { in: "blur",
        surfaceScale: 1,
        specularConstant: .5,
        specularExponent: 10,
        "lighting-color": "white",
        result: "specOut"
    }, i);
    return Blockly.utils.createSvgElement("fePointLight", {
        x: -5e3,
        y: -1e4,
        z: 2e4
    }, s), Blockly.utils.createSvgElement("feComposite", { in: "specOut",
        in2: "SourceAlpha",
        operator: "in",
        result: "specOut"
    }, i), Blockly.utils.createSvgElement("feComposite", { in: "SourceGraphic",
        in2: "specOut",
        operator: "arithmetic",
        k1: 0,
        k2: 1,
        k3: 1,
        k4: 0
    }, i), o.embossFilterId = i.id, i = Blockly.utils.createSvgElement("pattern", {
        id: "blocklyDisabledPattern" + r,
        patternUnits: "userSpaceOnUse",
        width: 10,
        height: 10
    }, n), Blockly.utils.createSvgElement("rect", {
        width: 10,
        height: 10,
        fill: "#aaa"
    }, i), Blockly.utils.createSvgElement("path", {
        d: "M 0 0 L 10 10 M 10 0 L 0 10",
        stroke: "#cc0"
    }, i), o.disabledPatternId = i.id, n = Blockly.utils.createSvgElement("pattern", {
        id: "blocklyGridPattern" + r,
        patternUnits: "userSpaceOnUse"
    }, n), 0 < o.gridOptions.length && 0 < o.gridOptions.spacing && (Blockly.utils.createSvgElement("line", {
        stroke: o.gridOptions.colour
    }, n), 1 < o.gridOptions.length && Blockly.utils.createSvgElement("line", {
        stroke: o.gridOptions.colour
    }, n)), o.gridPattern = n, t
}, Blockly.createMainWorkspace_ = function(e, o, t, n) {
    o.parentWorkspace = null;
    var r = new Blockly.WorkspaceSvg(o, t, n);
    return r.scale = o.zoomOptions.startScale, e.appendChild(r.createDom("blocklyMainBackground")), !o.hasCategories && o.languageTree && (t = r.addFlyout_("svg"), Blockly.utils.insertAfter_(t, e)), r.translate(0, 0), Blockly.mainWorkspace = r, o.readOnly || o.hasScrollbars || r.addChangeListener(function() {
        if (Blockly.dragMode_ == Blockly.DRAG_NONE) {
            var e = r.getMetrics(),
                t = e.viewLeft + e.absoluteLeft,
                n = e.viewTop + e.absoluteTop;
            if (e.contentTop < n || e.contentTop + e.contentHeight > e.viewHeight + n || e.contentLeft < (o.RTL ? e.viewLeft : t) || e.contentLeft + e.contentWidth > (o.RTL ? e.viewWidth : e.viewWidth + t))
                for (var i, s = r.getTopBlocks(!1), l = 0; i = s[l]; l++) {
                    var g = i.getRelativeToSurfaceXY(),
                        a = i.getHeightWidth(),
                        c = n + 25 - a.height - g.y;
                    0 < c && i.moveBy(0, c), 0 > (c = n + e.viewHeight - 25 - g.y) && i.moveBy(0, c), 0 < (c = 25 + t - g.x - (o.RTL ? 0 : a.width)) && i.moveBy(c, 0), 0 > (g = t + e.viewWidth - 25 - g.x + (o.RTL ? a.width : 0)) && i.moveBy(g, 0)
                }
        }
    }), Blockly.svgResize(r), Blockly.WidgetDiv.createDom(), Blockly.Tooltip.createDom(), r
}, Blockly.init_ = function(e) {
    var o = e.options,
        t = e.getParentSvg();
    Blockly.bindEventWithChecks_(t.parentNode, "contextmenu", null, function(e) {
        Blockly.utils.isTargetInput(e) || e.preventDefault()
    }), t = Blockly.bindEventWithChecks_(window, "resize", null, function() {
        Blockly.hideChaff(!0), Blockly.svgResize(e)
    }), e.setResizeHandlerWrapper(t), Blockly.inject.bindDocumentEvents_(), o.languageTree && (e.toolbox_ ? e.toolbox_.init(e) : e.flyout_ && (e.flyout_.init(e), e.flyout_.show(o.languageTree.childNodes), e.flyout_.scrollToStart(), e.scrollX = e.flyout_.width_, o.toolboxPosition == Blockly.TOOLBOX_AT_RIGHT && (e.scrollX *= -1), e.translate(e.scrollX, 0))), o.hasScrollbars && (e.scrollbar = new Blockly.ScrollbarPair(e), e.scrollbar.resize()), o.hasSounds && Blockly.inject.loadSounds_(o.pathToMedia, e)
}, Blockly.inject.bindDocumentEvents_ = function() {
    Blockly.documentEventsBound_ || (Blockly.bindEventWithChecks_(document, "keydown", null, Blockly.onKeyDown_), Blockly.bindEvent_(document, "touchend", null, Blockly.longStop_), Blockly.bindEvent_(document, "touchcancel", null, Blockly.longStop_), document.addEventListener("mouseup", Blockly.onMouseUp_, !1), goog.userAgent.IPAD && Blockly.bindEventWithChecks_(window, "orientationchange", document, function() {
        Blockly.svgResize(Blockly.getMainWorkspace())
    })), Blockly.documentEventsBound_ = !0
}, Blockly.inject.loadSounds_ = function(e, o) {
    o.loadAudio_([e + "click.mp3", e + "click.wav", e + "click.ogg"], "click"), o.loadAudio_([e + "disconnect.wav", e + "disconnect.mp3", e + "disconnect.ogg"], "disconnect"), o.loadAudio_([e + "delete.mp3", e + "delete.ogg", e + "delete.wav"], "delete");
    var t = [],
        n = function() {
            for (; t.length;) Blockly.unbindEvent_(t.pop());
            o.preloadAudio_()
        };
    t.push(Blockly.bindEventWithChecks_(document, "mousemove", null, n, !0)), t.push(Blockly.bindEventWithChecks_(document, "touchstart", null, n, !0))
}, Blockly.updateToolbox = function(e) {
    console.warn("Deprecated call to Blockly.updateToolbox, use workspace.updateToolbox instead."), Blockly.getMainWorkspace().updateToolbox(e)
};
var CLOSURE_DEFINES = {
    "goog.DEBUG": !1
};
Blockly.mainWorkspace = null, Blockly.selected = null, Blockly.highlightedConnection_ = null, Blockly.localConnection_ = null, Blockly.draggingConnections_ = [], Blockly.clipboardXml_ = null, Blockly.clipboardSource_ = null, Blockly.dragMode_ = Blockly.DRAG_NONE, Blockly.cache3dSupported_ = null, Blockly.hueToRgb = function(e) {
    return goog.color.hsvToHex(e, Blockly.HSV_SATURATION, 255 * Blockly.HSV_VALUE)
}, Blockly.svgSize = function(e) {
    return {
        width: e.cachedWidth_,
        height: e.cachedHeight_
    }
}, Blockly.resizeSvgContents = function(e) {
    e.resizeContents()
}, Blockly.svgResize = function(e) {
    for (; e.options.parentWorkspace;) e = e.options.parentWorkspace;
    var o = e.getParentSvg();
    if (n = o.parentNode) {
        var t = n.offsetWidth,
            n = n.offsetHeight;
        o.cachedWidth_ != t && (o.setAttribute("width", t + "px"), o.cachedWidth_ = t), o.cachedHeight_ != n && (o.setAttribute("height", n + "px"), o.cachedHeight_ = n), e.resize()
    }
}, Blockly.onKeyDown_ = function(e) {
    if (!Blockly.mainWorkspace.options.readOnly && !Blockly.utils.isTargetInput(e)) {
        var o = !1;
        27 == e.keyCode ? Blockly.hideChaff() : 8 == e.keyCode || 46 == e.keyCode ? (e.preventDefault(), Blockly.selected && Blockly.selected.isDeletable() && (o = !0)) : (e.altKey || e.ctrlKey || e.metaKey) && (Blockly.selected && Blockly.selected.isDeletable() && Blockly.selected.isMovable() && (67 == e.keyCode ? (Blockly.hideChaff(), Blockly.copy_(Blockly.selected)) : 88 == e.keyCode && (Blockly.copy_(Blockly.selected), o = !0)), 86 == e.keyCode ? Blockly.clipboardXml_ && (Blockly.Events.setGroup(!0), Blockly.clipboardSource_.paste(Blockly.clipboardXml_), Blockly.Events.setGroup(!1)) : 90 == e.keyCode && (Blockly.hideChaff(), Blockly.mainWorkspace.undo(e.shiftKey))), o && (Blockly.Events.setGroup(!0), Blockly.hideChaff(), Blockly.selected.dispose(Blockly.dragMode_ != Blockly.DRAG_FREE, !0), Blockly.highlightedConnection_ && (Blockly.highlightedConnection_.unhighlight(), Blockly.highlightedConnection_ = null), Blockly.Events.setGroup(!1))
    }
}, Blockly.terminateDrag_ = function() {
    Blockly.BlockSvg.terminateDrag(), Blockly.Flyout.terminateDrag_()
}, Blockly.copy_ = function(e) {
    var o = Blockly.Xml.blockToDom(e);
    Blockly.dragMode_ != Blockly.DRAG_FREE && Blockly.Xml.deleteNext(o);
    var t = e.getRelativeToSurfaceXY();
    o.setAttribute("x", e.RTL ? -t.x : t.x), o.setAttribute("y", t.y), Blockly.clipboardXml_ = o, Blockly.clipboardSource_ = e.workspace
}, Blockly.duplicate_ = function(e) {
    var o = Blockly.clipboardXml_,
        t = Blockly.clipboardSource_;
    Blockly.copy_(e), e.workspace.paste(Blockly.clipboardXml_), Blockly.clipboardXml_ = o, Blockly.clipboardSource_ = t
}, Blockly.onContextMenu_ = function(e) {
    Blockly.utils.isTargetInput(e) || e.preventDefault()
}, Blockly.hideChaff = function(e) {
    Blockly.Tooltip.hide(), Blockly.WidgetDiv.hide(), e || (e = Blockly.getMainWorkspace()).toolbox_ && e.toolbox_.flyout_ && e.toolbox_.flyout_.autoClose && e.toolbox_.clearSelection()
}, Blockly.addChangeListener = function(e) {
    return console.warn("Deprecated call to Blockly.addChangeListener, use workspace.addChangeListener instead."), Blockly.getMainWorkspace().addChangeListener(e)
}, Blockly.getMainWorkspace = function() {
    return Blockly.mainWorkspace
}, Blockly.alert = function(e, o) {
    window.alert(e), o && o()
}, Blockly.confirm = function(e, o) {
    o(window.confirm(e))
}, Blockly.prompt = function(e, o, t) {
    t(window.prompt(e, o))
}, Blockly.jsonInitFactory_ = function(e) {
    return function() {
        this.jsonInit(e)
    }
}, Blockly.defineBlocksWithJsonArray = function(e) {
    for (var o, t = 0; o = e[t]; t++) {
        var n = o.type;
        null == n || "" === n ? console.warn("Block definition #" + t + " in JSON array is missing a type attribute. Skipping.") : (Blockly.Blocks[n] && console.warn("Block definition #" + t + ' in JSON array overwrites prior definition of "' + n + '".'), Blockly.Blocks[n] = {
            init: Blockly.jsonInitFactory_(o)
        })
    }
}, Blockly.bindEventWithChecks_ = function(e, o, t, n, r) {
    var i = !1,
        s = function(e) {
            var o = !r;
            e = Blockly.Touch.splitEventByTouches(e);
            for (var s, l = 0; s = e[l]; l++) o && !Blockly.Touch.shouldHandleEvent(s) || (Blockly.Touch.setClientFromTouch(s), t ? n.call(t, s) : n(s), i = !0)
        };
    e.addEventListener(o, s, !1);
    var l = [
        [e, o, s]
    ];
    if (o in Blockly.Touch.TOUCH_MAP)
        for (var g, a = function(e) {
                s(e), i && e.preventDefault()
            }, c = 0; g = Blockly.Touch.TOUCH_MAP[o][c]; c++) e.addEventListener(g, a, !1), l.push([e, g, a]);
    return l
}, Blockly.bindEvent_ = function(e, o, t, n) {
    var r = function(e) {
        t ? n.call(t, e) : n(e)
    };
    e.addEventListener(o, r, !1);
    var i = [
        [e, o, r]
    ];
    if (o in Blockly.Touch.TOUCH_MAP)
        for (var s, l = function(e) {
                if (1 == e.changedTouches.length) {
                    var o = e.changedTouches[0];
                    e.clientX = o.clientX, e.clientY = o.clientY
                }
                r(e), e.preventDefault()
            }, g = 0; s = Blockly.Touch.TOUCH_MAP[o][g]; g++) e.addEventListener(s, l, !1), i.push([e, s, l]);
    return i
}, Blockly.unbindEvent_ = function(e) {
    for (var o; e.length;) {
        var t = (o = e.pop())[0],
            n = o[1];
        o = o[2], t.removeEventListener(n, o, !1)
    }
    return o
}, Blockly.isNumber = function(e) {
    return !!e.match(/^\s*-?\d+(\.\d+)?\s*$/)
}, goog.global.console || (goog.global.console = {
    log: function() {},
    warn: function() {}
}), goog.global.Blockly || (goog.global.Blockly = {}), goog.global.Blockly.getMainWorkspace = Blockly.getMainWorkspace, goog.global.Blockly.addChangeListener = Blockly.addChangeListener;