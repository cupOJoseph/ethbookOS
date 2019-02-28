/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1165);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1165:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _config = __webpack_require__(35);

var _names = __webpack_require__(46);

var _notification_image = __webpack_require__(1166);

var _notification_image2 = _interopRequireDefault(_notification_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

self.addEventListener('push', function (event) {
  var payload = event.data.json().data;

  var title = void 0,
      message = void 0,
      url = void 0;
  var knownPush = true;
  switch (payload.type) {
    case 'safeCreation':
      title = 'Safe connected';
      message = 'Your Safe is now synced to your browser extension';
      url = null;
      break;

    case 'requestConfirmation':
      title = 'Confirm transaction';
      message = 'The confirmation of a new transaction was requested';
      url = null;
      break;

    case 'sendTransactionHash':
      title = 'Transaction submitted';
      message = payload.chainHash;
      var etherScanUrl = (0, _config.getNetwork)() === _names.MAINNET ? 'https://etherscan.io/tx/' : 'https://rinkeby.etherscan.io/tx/';
      url = etherScanUrl + payload.chainHash;
      break;

    case 'rejectTransaction':
      title = 'Transaction rejected';
      message = payload.hash;
      url = null;
      break;

    default:
      knownPush = false;
  }

  if (knownPush) {
    self.clients.matchAll({ includeUncontrolled: true }).then(function (clients) {
      var client = clients.filter(function (client) {
        return client.url.split('/')[3] === '_generated_background_page.html';
      })[0];
      client.postMessage(payload);
    }).catch(function (err) {
      console.error(err);
    });

    event.waitUntil(self.registration.showNotification(title, {
      body: message,
      icon: _notification_image2.default,
      data: {
        url: url
      }
    }).then(function () {
      return self.registration.getNotifications();
    }).then(function (notifications) {
      setTimeout(function () {
        return notifications.forEach(function (notification) {
          return notification.close();
        });
      }, 6000);
    }));
  } else {
    event.waitUntil(new Promise(function () {}));
  }
}); /* eslint-env serviceworker */


self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(event.notification.data.url ? self.clients.openWindow(event.notification.data.url) : null);
});

/***/ }),

/***/ 1166:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/images/notification_image.jpg";

/***/ }),

/***/ 118:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/* @flow */
/*::

type DotenvParseOptions = {
  debug?: boolean
}

// keys and values from src
type DotenvParseOutput = { [string]: string }

type DotenvConfigOptions = {
  path?: string, // path to .env file
  encoding?: string, // encoding of .env file
  debug?: string // turn on logging for debugging purposes
}

type DotenvConfigOutput = {
  parsed?: DotenvParseOutput,
  error?: Error
}

*/

const fs = __webpack_require__(206)
const path = __webpack_require__(207)

function log (message /*: string */) {
  console.log(`[dotenv][DEBUG] ${message}`)
}

// Parses src into an Object
function parse (src /*: string | Buffer */, options /*: ?DotenvParseOptions */) /*: DotenvParseOutput */ {
  const debug = Boolean(options && options.debug)
  const obj = {}

  // convert Buffers before splitting into lines and processing
  src.toString().split('\n').forEach(function (line, idx) {
    // matching "KEY' and 'VAL' in 'KEY=VAL'
    const keyValueArr = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/)
    // matched?
    if (keyValueArr != null) {
      const key = keyValueArr[1]

      // default undefined or missing values to empty string
      let value = keyValueArr[2] || ''

      // expand newlines in quoted values
      const len = value ? value.length : 0
      if (len > 0 && value.charAt(0) === '"' && value.charAt(len - 1) === '"') {
        value = value.replace(/\\n/gm, '\n')
      }

      // remove any surrounding quotes and extra spaces
      value = value.replace(/(^['"]|['"]$)/g, '').trim()

      obj[key] = value
    } else if (debug) {
      log(`did not match key and value when parsing line ${idx + 1}: ${line}`)
    }
  })

  return obj
}

// Populates process.env from .env file
function config (options /*: ?DotenvConfigOptions */) /*: DotenvConfigOutput */ {
  let dotenvPath = path.resolve(process.cwd(), '.env')
  let encoding /*: string */ = 'utf8'
  let debug = false

  if (options) {
    if (options.path != null) {
      dotenvPath = options.path
    }
    if (options.encoding != null) {
      encoding = options.encoding
    }
    if (options.debug != null) {
      debug = true
    }
  }

  try {
    // specifying an encoding returns a string instead of a buffer
    const parsed = parse(fs.readFileSync(dotenvPath, { encoding }), { debug })

    Object.keys(parsed).forEach(function (key) {
      if (!process.env.hasOwnProperty(key)) {
        process.env[key] = parsed[key]
      } else if (debug) {
        log(`"${key}" is already defined in \`process.env\` and will not be overwritten`)
      }
    })

    return { parsed }
  } catch (e) {
    return { error: e }
  }
}

module.exports.config = config
module.exports.load = config
module.exports.parse = parse

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ }),

/***/ 12:
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ 204:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var ensureOnce = exports.ensureOnce = function ensureOnce(fn) {
  var executed = false;
  var response = void 0;

  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (executed) return response;
    executed = true;
    response = fn.apply(undefined, args);

    return response;
  };
};

/***/ }),

/***/ 205:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ANDROID_APP_URL, _IOS_APP_URL, _TRANSACTION_RELAY_SE, _FAVICON, _PRODUCTION, _ANDROID_APP_URL2, _IOS_APP_URL2, _TRANSACTION_RELAY_SE2, _FAVICON2, _PRE_PRODUCTION, _STAGING, _DEVELOPMENT, _envConfig;

var _names = __webpack_require__(46);

var _dotenv = __webpack_require__(118);

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_dotenv2.default.config({});

var mainnetAppStoreAndroid = 'https://play.google.com/store/apps/details?id=pm.gnosis.heimdall';
var mainnetAppStoreIos = 'http://appstore.com/gnosissafemainnet';
var rinkebyAppStoreAndroid = 'https://play.google.com/store/apps/details?id=pm.gnosis.heimdall.dev';
var rinkebyAppStoreIos = null;
var rinkebyStagingAndroid = 'https://betas.to/riowXzcx';
var rinkebyStagingIos = 'https://betas.to/7TovLG11';

var stagingPushNotificationServiceUrl = 'https://safe-notification.staging.gnosisdev.com/api/v1/';

var testFirebaseAuthDomain = 'test-safe-notifications.firebaseapp.com';
var testFirebaseDatabaseUrl = 'https://test-safe-notifications.firebaseio.com';
var testFirebaseProjectId = 'test-safe-notifications';
var testFirebaseStorageBucket = 'test-safe-notifications.appspot.com';
var testFirebaseMessagingSenderId = '64389160972';

var envConfig = (_envConfig = {}, _defineProperty(_envConfig, _names.PRODUCTION, (_PRODUCTION = {}, _defineProperty(_PRODUCTION, _names.ANDROID_APP_URL, (_ANDROID_APP_URL = {}, _defineProperty(_ANDROID_APP_URL, _names.MAINNET, mainnetAppStoreAndroid), _defineProperty(_ANDROID_APP_URL, _names.RINKEBY, rinkebyAppStoreAndroid), _ANDROID_APP_URL)), _defineProperty(_PRODUCTION, _names.IOS_APP_URL, (_IOS_APP_URL = {}, _defineProperty(_IOS_APP_URL, _names.MAINNET, mainnetAppStoreIos), _defineProperty(_IOS_APP_URL, _names.RINKEBY, rinkebyAppStoreIos), _IOS_APP_URL)), _defineProperty(_PRODUCTION, _names.PUSH_NOTIFICATION_SERVICE_URL, "https://safe-notification.gnosis.pm/api/v1/"), _defineProperty(_PRODUCTION, _names.TRANSACTION_RELAY_SERVICE_URL, (_TRANSACTION_RELAY_SE = {}, _defineProperty(_TRANSACTION_RELAY_SE, _names.MAINNET, "https://safe-relay.gnosis.pm/api/v1/"), _defineProperty(_TRANSACTION_RELAY_SE, _names.RINKEBY, "https://safe-relay.rinkeby.gnosis.pm/api/v1/"), _TRANSACTION_RELAY_SE)), _defineProperty(_PRODUCTION, _names.FIREBASE_AUTH_DOMAIN, "safe-notifications-prod.firebaseapp.com"), _defineProperty(_PRODUCTION, _names.FIREBASE_DATABASE_URL, "https://safe-notifications-prod.firebaseio.com"), _defineProperty(_PRODUCTION, _names.FIREBASE_PROJECT_ID, "safe-notifications-prod"), _defineProperty(_PRODUCTION, _names.FIREBASE_STORAGE_BUCKET, "safe-notifications-prod.appspot.com"), _defineProperty(_PRODUCTION, _names.FIREBASE_MESSAGING_SENDER_ID, "464427835422"), _defineProperty(_PRODUCTION, _names.FAVICON, (_FAVICON = {}, _defineProperty(_FAVICON, _names.MAINNET, 'favicon_mainnet.png'), _defineProperty(_FAVICON, _names.RINKEBY, 'favicon_rinkeby_blue.png'), _FAVICON)), _PRODUCTION)), _defineProperty(_envConfig, _names.PRE_PRODUCTION, (_PRE_PRODUCTION = {}, _defineProperty(_PRE_PRODUCTION, _names.ANDROID_APP_URL, (_ANDROID_APP_URL2 = {}, _defineProperty(_ANDROID_APP_URL2, _names.MAINNET, mainnetAppStoreAndroid), _defineProperty(_ANDROID_APP_URL2, _names.RINKEBY, rinkebyAppStoreAndroid), _ANDROID_APP_URL2)), _defineProperty(_PRE_PRODUCTION, _names.IOS_APP_URL, (_IOS_APP_URL2 = {}, _defineProperty(_IOS_APP_URL2, _names.MAINNET, mainnetAppStoreIos), _defineProperty(_IOS_APP_URL2, _names.RINKEBY, rinkebyAppStoreIos), _IOS_APP_URL2)), _defineProperty(_PRE_PRODUCTION, _names.PUSH_NOTIFICATION_SERVICE_URL, "https://safe-notification.gnosis.pm/api/v1/"), _defineProperty(_PRE_PRODUCTION, _names.TRANSACTION_RELAY_SERVICE_URL, (_TRANSACTION_RELAY_SE2 = {}, _defineProperty(_TRANSACTION_RELAY_SE2, _names.MAINNET, "https://safe-relay.gnosis.pm/api/v1/"), _defineProperty(_TRANSACTION_RELAY_SE2, _names.RINKEBY, "https://safe-relay.rinkeby.gnosis.pm/api/v1/"), _TRANSACTION_RELAY_SE2)), _defineProperty(_PRE_PRODUCTION, _names.FIREBASE_AUTH_DOMAIN, "safe-notifications-prod.firebaseapp.com"), _defineProperty(_PRE_PRODUCTION, _names.FIREBASE_DATABASE_URL, "https://safe-notifications-prod.firebaseio.com"), _defineProperty(_PRE_PRODUCTION, _names.FIREBASE_PROJECT_ID, "safe-notifications-prod"), _defineProperty(_PRE_PRODUCTION, _names.FIREBASE_STORAGE_BUCKET, "safe-notifications-prod.appspot.com"), _defineProperty(_PRE_PRODUCTION, _names.FIREBASE_MESSAGING_SENDER_ID, "464427835422"), _defineProperty(_PRE_PRODUCTION, _names.FAVICON, (_FAVICON2 = {}, _defineProperty(_FAVICON2, _names.MAINNET, 'favicon_mainnet_green.png'), _defineProperty(_FAVICON2, _names.RINKEBY, 'favicon_rinkeby_green.png'), _FAVICON2)), _PRE_PRODUCTION)), _defineProperty(_envConfig, _names.STAGING, (_STAGING = {}, _defineProperty(_STAGING, _names.ANDROID_APP_URL, rinkebyStagingAndroid), _defineProperty(_STAGING, _names.IOS_APP_URL, rinkebyStagingIos), _defineProperty(_STAGING, _names.PUSH_NOTIFICATION_SERVICE_URL, stagingPushNotificationServiceUrl), _defineProperty(_STAGING, _names.TRANSACTION_RELAY_SERVICE_URL, "https://safe-relay.rinkeby.gnosis.pm/api/v1/"), _defineProperty(_STAGING, _names.FIREBASE_AUTH_DOMAIN, testFirebaseAuthDomain), _defineProperty(_STAGING, _names.FIREBASE_DATABASE_URL, testFirebaseDatabaseUrl), _defineProperty(_STAGING, _names.FIREBASE_PROJECT_ID, testFirebaseProjectId), _defineProperty(_STAGING, _names.FIREBASE_STORAGE_BUCKET, testFirebaseStorageBucket), _defineProperty(_STAGING, _names.FIREBASE_MESSAGING_SENDER_ID, testFirebaseMessagingSenderId), _defineProperty(_STAGING, _names.FAVICON, 'favicon_rinkeby_orange.png'), _STAGING)), _defineProperty(_envConfig, _names.DEVELOPMENT, (_DEVELOPMENT = {}, _defineProperty(_DEVELOPMENT, _names.ANDROID_APP_URL, rinkebyStagingAndroid), _defineProperty(_DEVELOPMENT, _names.IOS_APP_URL, rinkebyStagingIos), _defineProperty(_DEVELOPMENT, _names.PUSH_NOTIFICATION_SERVICE_URL, stagingPushNotificationServiceUrl), _defineProperty(_DEVELOPMENT, _names.TRANSACTION_RELAY_SERVICE_URL, "https://safe-relay.rinkeby.gnosis.pm/api/v1/"), _defineProperty(_DEVELOPMENT, _names.FIREBASE_AUTH_DOMAIN, testFirebaseAuthDomain), _defineProperty(_DEVELOPMENT, _names.FIREBASE_DATABASE_URL, testFirebaseDatabaseUrl), _defineProperty(_DEVELOPMENT, _names.FIREBASE_PROJECT_ID, testFirebaseProjectId), _defineProperty(_DEVELOPMENT, _names.FIREBASE_STORAGE_BUCKET, testFirebaseStorageBucket), _defineProperty(_DEVELOPMENT, _names.FIREBASE_MESSAGING_SENDER_ID, testFirebaseMessagingSenderId), _defineProperty(_DEVELOPMENT, _names.FAVICON, 'favicon_rinkeby_red.png'), _DEVELOPMENT)), _envConfig);

exports.default = envConfig;

/***/ }),

/***/ 206:
/***/ (function(module, exports) {



/***/ }),

/***/ 207:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ }),

/***/ 208:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.networkConfig = undefined;

var _MAINNET, _RINKEBY, _networkConfig;

var _names = __webpack_require__(46);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var networkConfig = exports.networkConfig = (_networkConfig = {}, _defineProperty(_networkConfig, _names.MAINNET, (_MAINNET = {}, _defineProperty(_MAINNET, _names.NETWORK_NAME, 'Mainnet'), _defineProperty(_MAINNET, _names.NETWORK_VERSION, 1), _defineProperty(_MAINNET, _names.NETWORK_URL, 'https://mainnet.infura.io/v3/' + "62bd67a7ceb9447aa4037b1b8f73a9ec"), _MAINNET)), _defineProperty(_networkConfig, _names.RINKEBY, (_RINKEBY = {}, _defineProperty(_RINKEBY, _names.NETWORK_NAME, 'Rinkeby'), _defineProperty(_RINKEBY, _names.NETWORK_VERSION, 4), _defineProperty(_RINKEBY, _names.NETWORK_URL, 'https://rinkeby.infura.io/v3/' + "62bd67a7ceb9447aa4037b1b8f73a9ec"), _RINKEBY)), _networkConfig);

exports.default = networkConfig;

/***/ }),

/***/ 209:
/***/ (function(module, exports) {

module.exports = {"manifest_version":2,"name":null,"short_name":"Gnosis Safe","version":"1.3.3","description":"","browser_action":{"default_title":null,"default_popup":"index.html"},"author":"Gnosis","default_locale":"en","options_ui":{"page":"options.html","open_in_tab":true},"icons":{"16":"assets/images/favicon.png","48":"assets/images/favicon.png"},"permissions":["storage","activeTab","tabs","notifications"],"background":{"scripts":["background.js"],"persistent":true},"content_scripts":[{"matches":["http://*/*","https://*/*"],"js":["contentscript.js"],"run_at":"document_start","all_frames":true}],"web_accessible_resources":["script.js"],"content_security_policy":"script-src 'self' https://ssl.google-analytics.com https://cdn.firebase.com https://*.firebaseio.com https://apis.google.com; object-src 'self'","externally_connectable":{"ids":[],"matches":[]}}

/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFavicon = exports.getFirebaseMessagingSenderId = exports.getFirebaseStorageBucket = exports.getFirebaseProjectId = exports.getFirebaseDatabaseUrl = exports.getFirebaseAuthDomain = exports.getTransactionRelayServiceUrl = exports.getPushNotificationServiceUrl = exports.getIosAppUrl = exports.getAndroidAppUrl = exports.getNetworkUrl = exports.getNetworkVersion = exports.getNetworkName = exports.getVersion = exports.getNetwork = exports.getEnviroment = undefined;

var _singleton = __webpack_require__(204);

var _names = __webpack_require__(46);

var _env = __webpack_require__(205);

var _env2 = _interopRequireDefault(_env);

var _network = __webpack_require__(208);

var _network2 = _interopRequireDefault(_network);

var _manifest_template = __webpack_require__(209);

var _manifest_template2 = _interopRequireDefault(_manifest_template);

var _dotenv = __webpack_require__(118);

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config({});

var envConfiguration = function envConfiguration() {
  return _env2.default;
};

var networkConfiguration = function networkConfiguration() {
  return _network2.default;
};

var getEnvConfig = (0, _singleton.ensureOnce)(envConfiguration);

var getNetworkConfig = (0, _singleton.ensureOnce)(networkConfiguration);

var getEnviroment = exports.getEnviroment = function getEnviroment() {
  var env = "production";
  return env === _names.PRODUCTION || env === _names.PRE_PRODUCTION || env === _names.STAGING || env === _names.DEVELOPMENT ? env : _names.STAGING;
};

var getNetwork = exports.getNetwork = function getNetwork() {
  var network = "rinkeby";
  return network === _names.MAINNET || network === _names.RINKEBY ? network : _names.RINKEBY;
};

var getVersion = exports.getVersion = function getVersion() {
  return _manifest_template2.default.version;
};

var getNetworkName = exports.getNetworkName = function getNetworkName() {
  var config = getNetworkConfig();
  var network = getNetwork();
  return config[network][_names.NETWORK_NAME];
};

var getNetworkVersion = exports.getNetworkVersion = function getNetworkVersion() {
  var config = getNetworkConfig();
  var network = getNetwork();
  return config[network][_names.NETWORK_VERSION];
};

var getNetworkUrl = exports.getNetworkUrl = function getNetworkUrl() {
  var config = getNetworkConfig();
  var network = getNetwork();
  return config[network][_names.NETWORK_URL];
};

var getAndroidAppUrl = exports.getAndroidAppUrl = function getAndroidAppUrl() {
  var config = getEnvConfig();
  var enviroment = getEnviroment();
  var network = getNetwork();
  return enviroment === _names.PRODUCTION || enviroment === _names.PRE_PRODUCTION ? config[enviroment][_names.ANDROID_APP_URL][network] : config[enviroment][_names.ANDROID_APP_URL];
};

var getIosAppUrl = exports.getIosAppUrl = function getIosAppUrl() {
  var config = getEnvConfig();
  var enviroment = getEnviroment();
  var network = getNetwork();
  return enviroment === _names.PRODUCTION || enviroment === _names.PRE_PRODUCTION ? config[enviroment][_names.IOS_APP_URL][network] : config[enviroment][_names.IOS_APP_URL];
};

var getPushNotificationServiceUrl = exports.getPushNotificationServiceUrl = function getPushNotificationServiceUrl() {
  var config = getEnvConfig();
  var enviroment = getEnviroment();
  return config[enviroment][_names.PUSH_NOTIFICATION_SERVICE_URL];
};

var getTransactionRelayServiceUrl = exports.getTransactionRelayServiceUrl = function getTransactionRelayServiceUrl() {
  var config = getEnvConfig();
  var enviroment = getEnviroment();
  var network = getNetwork();
  return enviroment === _names.PRODUCTION || enviroment === _names.PRE_PRODUCTION ? config[enviroment][_names.TRANSACTION_RELAY_SERVICE_URL][network] : config[enviroment][_names.TRANSACTION_RELAY_SERVICE_URL];
};

var getFirebaseAuthDomain = exports.getFirebaseAuthDomain = function getFirebaseAuthDomain() {
  var config = getEnvConfig();
  var enviroment = getEnviroment();
  return config[enviroment][_names.FIREBASE_AUTH_DOMAIN];
};

var getFirebaseDatabaseUrl = exports.getFirebaseDatabaseUrl = function getFirebaseDatabaseUrl() {
  var config = getEnvConfig();
  var enviroment = getEnviroment();
  return config[enviroment][_names.FIREBASE_DATABASE_URL];
};

var getFirebaseProjectId = exports.getFirebaseProjectId = function getFirebaseProjectId() {
  var config = getEnvConfig();
  var enviroment = getEnviroment();
  return config[enviroment][_names.FIREBASE_PROJECT_ID];
};

var getFirebaseStorageBucket = exports.getFirebaseStorageBucket = function getFirebaseStorageBucket() {
  var config = getEnvConfig();
  var enviroment = getEnviroment();
  return config[enviroment][_names.FIREBASE_STORAGE_BUCKET];
};

var getFirebaseMessagingSenderId = exports.getFirebaseMessagingSenderId = function getFirebaseMessagingSenderId() {
  var config = getEnvConfig();
  var enviroment = getEnviroment();
  return config[enviroment][_names.FIREBASE_MESSAGING_SENDER_ID];
};

var getFavicon = exports.getFavicon = function getFavicon() {
  var config = getEnvConfig();
  var enviroment = getEnviroment();
  var network = getNetwork();
  return enviroment === _names.PRODUCTION || enviroment === _names.PRE_PRODUCTION ? config[enviroment][_names.FAVICON][network] : config[enviroment][_names.FAVICON];
};

/***/ }),

/***/ 46:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var MAINNET = exports.MAINNET = 'mainnet';
var RINKEBY = exports.RINKEBY = 'rinkeby';

var PRODUCTION = exports.PRODUCTION = 'production';
var PRE_PRODUCTION = exports.PRE_PRODUCTION = 'pre-production';
var STAGING = exports.STAGING = 'staging';
var DEVELOPMENT = exports.DEVELOPMENT = 'development';

var NETWORK_NAME = exports.NETWORK_NAME = 'NETWORK_NAME';
var NETWORK_VERSION = exports.NETWORK_VERSION = 'NETWORK_VERSION';
var NETWORK_URL = exports.NETWORK_URL = 'NETWORK_URL';

var PUSH_NOTIFICATION_SERVICE_URL = exports.PUSH_NOTIFICATION_SERVICE_URL = 'PUSH_NOTIFICATION_SERVICE_URL';
var TRANSACTION_RELAY_SERVICE_URL = exports.TRANSACTION_RELAY_SERVICE_URL = 'TRANSACTION_RELAY_SERVICE_URL';
var ANDROID_APP_URL = exports.ANDROID_APP_URL = 'ANDROID_APP_URL';
var IOS_APP_URL = exports.IOS_APP_URL = 'IOS_APP_URL';

var FIREBASE_AUTH_DOMAIN = exports.FIREBASE_AUTH_DOMAIN = 'FIREBASE_AUTH_DOMAIN';
var FIREBASE_DATABASE_URL = exports.FIREBASE_DATABASE_URL = 'FIREBASE_DATABASE_URL';
var FIREBASE_PROJECT_ID = exports.FIREBASE_PROJECT_ID = 'FIREBASE_PROJECT_ID';
var FIREBASE_STORAGE_BUCKET = exports.FIREBASE_STORAGE_BUCKET = 'FIREBASE_STORAGE_BUCKET';
var FIREBASE_MESSAGING_SENDER_ID = exports.FIREBASE_MESSAGING_SENDER_ID = 'FIREBASE_MESSAGING_SENDER_ID';

var FAVICON = exports.FAVICON = 'FAVICON';

/***/ })

/******/ });