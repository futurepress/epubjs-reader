/*!
 * @overview RSVP - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2016 Yehuda Katz, Tom Dale, Stefan Penner and contributors
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/tildeio/rsvp.js/master/LICENSE
 * @version   4.8.4+ff10049b
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.RSVP = {})));
}(this, (function (exports) { 'use strict';

  function callbacksFor(object) {
    var callbacks = object._promiseCallbacks;

    if (!callbacks) {
      callbacks = object._promiseCallbacks = {};
    }

    return callbacks;
  }

  /**
    @class EventTarget
    @for rsvp
    @public
  */
  var EventTarget = {

    /**
      `EventTarget.mixin` extends an object with EventTarget methods. For
      Example:
       ```javascript
      import EventTarget from 'rsvp';
       let object = {};
       EventTarget.mixin(object);
       object.on('finished', function(event) {
        // handle event
      });
       object.trigger('finished', { detail: value });
      ```
       `EventTarget.mixin` also works with prototypes:
       ```javascript
      import EventTarget from 'rsvp';
       let Person = function() {};
      EventTarget.mixin(Person.prototype);
       let yehuda = new Person();
      let tom = new Person();
       yehuda.on('poke', function(event) {
        console.log('Yehuda says OW');
      });
       tom.on('poke', function(event) {
        console.log('Tom says OW');
      });
       yehuda.trigger('poke');
      tom.trigger('poke');
      ```
       @method mixin
      @for rsvp
      @private
      @param {Object} object object to extend with EventTarget methods
    */
    mixin: function (object) {
      object.on = this.on;
      object.off = this.off;
      object.trigger = this.trigger;
      object._promiseCallbacks = undefined;
      return object;
    },


    /**
      Registers a callback to be executed when `eventName` is triggered
       ```javascript
      object.on('event', function(eventInfo){
        // handle the event
      });
       object.trigger('event');
      ```
       @method on
      @for EventTarget
      @private
      @param {String} eventName name of the event to listen for
      @param {Function} callback function to be called when the event is triggered.
    */
    on: function (eventName, callback) {
      if (typeof callback !== 'function') {
        throw new TypeError('Callback must be a function');
      }

      var allCallbacks = callbacksFor(this);
      var callbacks = allCallbacks[eventName];

      if (!callbacks) {
        callbacks = allCallbacks[eventName] = [];
      }

      if (callbacks.indexOf(callback) === -1) {
        callbacks.push(callback);
      }
    },


    /**
      You can use `off` to stop firing a particular callback for an event:
       ```javascript
      function doStuff() { // do stuff! }
      object.on('stuff', doStuff);
       object.trigger('stuff'); // doStuff will be called
       // Unregister ONLY the doStuff callback
      object.off('stuff', doStuff);
      object.trigger('stuff'); // doStuff will NOT be called
      ```
       If you don't pass a `callback` argument to `off`, ALL callbacks for the
      event will not be executed when the event fires. For example:
       ```javascript
      let callback1 = function(){};
      let callback2 = function(){};
       object.on('stuff', callback1);
      object.on('stuff', callback2);
       object.trigger('stuff'); // callback1 and callback2 will be executed.
       object.off('stuff');
      object.trigger('stuff'); // callback1 and callback2 will not be executed!
      ```
       @method off
      @for rsvp
      @private
      @param {String} eventName event to stop listening to
      @param {Function} [callback] optional argument. If given, only the function
      given will be removed from the event's callback queue. If no `callback`
      argument is given, all callbacks will be removed from the event's callback
      queue.
    */
    off: function (eventName, callback) {
      var allCallbacks = callbacksFor(this);

      if (!callback) {
        allCallbacks[eventName] = [];
        return;
      }

      var callbacks = allCallbacks[eventName];
      var index = callbacks.indexOf(callback);

      if (index !== -1) {
        callbacks.splice(index, 1);
      }
    },


    /**
      Use `trigger` to fire custom events. For example:
       ```javascript
      object.on('foo', function(){
        console.log('foo event happened!');
      });
      object.trigger('foo');
      // 'foo event happened!' logged to the console
      ```
       You can also pass a value as a second argument to `trigger` that will be
      passed as an argument to all event listeners for the event:
       ```javascript
      object.on('foo', function(value){
        console.log(value.name);
      });
       object.trigger('foo', { name: 'bar' });
      // 'bar' logged to the console
      ```
       @method trigger
      @for rsvp
      @private
      @param {String} eventName name of the event to be triggered
      @param {*} [options] optional value to be passed to any event handlers for
      the given `eventName`
    */
    trigger: function (eventName, options, label) {
      var allCallbacks = callbacksFor(this);

      var callbacks = allCallbacks[eventName];
      if (callbacks) {
        // Don't cache the callbacks.length since it may grow
        var callback = void 0;
        for (var i = 0; i < callbacks.length; i++) {
          callback = callbacks[i];
          callback(options, label);
        }
      }
    }
  };

  var config = {
    instrument: false
  };

  EventTarget['mixin'](config);

  function configure(name, value) {
    if (arguments.length === 2) {
      config[name] = value;
    } else {
      return config[name];
    }
  }

  var queue = [];

  function scheduleFlush() {
    setTimeout(function () {
      for (var i = 0; i < queue.length; i++) {
        var entry = queue[i];

        var payload = entry.payload;

        payload.guid = payload.key + payload.id;
        payload.childGuid = payload.key + payload.childId;
        if (payload.error) {
          payload.stack = payload.error.stack;
        }

        config['trigger'](entry.name, entry.payload);
      }
      queue.length = 0;
    }, 50);
  }

  function instrument(eventName, promise, child) {
    if (1 === queue.push({
      name: eventName,
      payload: {
        key: promise._guidKey,
        id: promise._id,
        eventName: eventName,
        detail: promise._result,
        childId: child && child._id,
        label: promise._label,
        timeStamp: Date.now(),
        error: config["instrument-with-stack"] ? new Error(promise._label) : null
      } })) {
      scheduleFlush();
    }
  }

  /**
    `Promise.resolve` returns a promise that will become resolved with the
    passed `value`. It is shorthand for the following:

    ```javascript
    import Promise from 'rsvp';

    let promise = new Promise(function(resolve, reject){
      resolve(1);
    });

    promise.then(function(value){
      // value === 1
    });
    ```

    Instead of writing the above, your code now simply becomes the following:

    ```javascript
    import Promise from 'rsvp';

    let promise = RSVP.Promise.resolve(1);

    promise.then(function(value){
      // value === 1
    });
    ```

    @method resolve
    @for Promise
    @static
    @param {*} object value that the returned promise will be resolved with
    @param {String} [label] optional string for identifying the returned promise.
    Useful for tooling.
    @return {Promise} a promise that will become fulfilled with the given
    `value`
  */
  function resolve$$1(object, label) {
    /*jshint validthis:true */
    var Constructor = this;

    if (object && typeof object === 'object' && object.constructor === Constructor) {
      return object;
    }

    var promise = new Constructor(noop, label);
    resolve$1(promise, object);
    return promise;
  }

  function withOwnPromise() {
    return new TypeError('A promises callback cannot return that same promise.');
  }

  function objectOrFunction(x) {
    var type = typeof x;
    return x !== null && (type === 'object' || type === 'function');
  }

  function noop() {}

  var PENDING = void 0;
  var FULFILLED = 1;
  var REJECTED = 2;

  var TRY_CATCH_ERROR = { error: null };

  function getThen(promise) {
    try {
      return promise.then;
    } catch (error) {
      TRY_CATCH_ERROR.error = error;
      return TRY_CATCH_ERROR;
    }
  }

  var tryCatchCallback = void 0;
  function tryCatcher() {
    try {
      var target = tryCatchCallback;
      tryCatchCallback = null;
      return target.apply(this, arguments);
    } catch (e) {
      TRY_CATCH_ERROR.error = e;
      return TRY_CATCH_ERROR;
    }
  }

  function tryCatch(fn) {
    tryCatchCallback = fn;
    return tryCatcher;
  }

  function handleForeignThenable(promise, thenable, then$$1) {
    config.async(function (promise) {
      var sealed = false;
      var result = tryCatch(then$$1).call(thenable, function (value) {
        if (sealed) {
          return;
        }
        sealed = true;
        if (thenable === value) {
          fulfill(promise, value);
        } else {
          resolve$1(promise, value);
        }
      }, function (reason) {
        if (sealed) {
          return;
        }
        sealed = true;

        reject(promise, reason);
      }, 'Settle: ' + (promise._label || ' unknown promise'));

      if (!sealed && result === TRY_CATCH_ERROR) {
        sealed = true;
        var error = TRY_CATCH_ERROR.error;
        TRY_CATCH_ERROR.error = null;
        reject(promise, error);
      }
    }, promise);
  }

  function handleOwnThenable(promise, thenable) {
    if (thenable._state === FULFILLED) {
      fulfill(promise, thenable._result);
    } else if (thenable._state === REJECTED) {
      thenable._onError = null;
      reject(promise, thenable._result);
    } else {
      subscribe(thenable, undefined, function (value) {
        if (thenable === value) {
          fulfill(promise, value);
        } else {
          resolve$1(promise, value);
        }
      }, function (reason) {
        return reject(promise, reason);
      });
    }
  }

  function handleMaybeThenable(promise, maybeThenable, then$$1) {
    var isOwnThenable = maybeThenable.constructor === promise.constructor && then$$1 === then && promise.constructor.resolve === resolve$$1;

    if (isOwnThenable) {
      handleOwnThenable(promise, maybeThenable);
    } else if (then$$1 === TRY_CATCH_ERROR) {
      var error = TRY_CATCH_ERROR.error;
      TRY_CATCH_ERROR.error = null;
      reject(promise, error);
    } else if (typeof then$$1 === 'function') {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }

  function resolve$1(promise, value) {
    if (promise === value) {
      fulfill(promise, value);
    } else if (objectOrFunction(value)) {
      handleMaybeThenable(promise, value, getThen(value));
    } else {
      fulfill(promise, value);
    }
  }

  function publishRejection(promise) {
    if (promise._onError) {
      promise._onError(promise._result);
    }

    publish(promise);
  }

  function fulfill(promise, value) {
    if (promise._state !== PENDING) {
      return;
    }

    promise._result = value;
    promise._state = FULFILLED;

    if (promise._subscribers.length === 0) {
      if (config.instrument) {
        instrument('fulfilled', promise);
      }
    } else {
      config.async(publish, promise);
    }
  }

  function reject(promise, reason) {
    if (promise._state !== PENDING) {
      return;
    }
    promise._state = REJECTED;
    promise._result = reason;
    config.async(publishRejection, promise);
  }

  function subscribe(parent, child, onFulfillment, onRejection) {
    var subscribers = parent._subscribers;
    var length = subscribers.length;

    parent._onError = null;

    subscribers[length] = child;
    subscribers[length + FULFILLED] = onFulfillment;
    subscribers[length + REJECTED] = onRejection;

    if (length === 0 && parent._state) {
      config.async(publish, parent);
    }
  }

  function publish(promise) {
    var subscribers = promise._subscribers;
    var settled = promise._state;

    if (config.instrument) {
      instrument(settled === FULFILLED ? 'fulfilled' : 'rejected', promise);
    }

    if (subscribers.length === 0) {
      return;
    }

    var child = void 0,
        callback = void 0,
        result = promise._result;

    for (var i = 0; i < subscribers.length; i += 3) {
      child = subscribers[i];
      callback = subscribers[i + settled];

      if (child) {
        invokeCallback(settled, child, callback, result);
      } else {
        callback(result);
      }
    }

    promise._subscribers.length = 0;
  }

  function invokeCallback(state, promise, callback, result) {
    var hasCallback = typeof callback === 'function';
    var value = void 0;

    if (hasCallback) {
      value = tryCatch(callback)(result);
    } else {
      value = result;
    }

    if (promise._state !== PENDING) {
      // noop
    } else if (value === promise) {
      reject(promise, withOwnPromise());
    } else if (value === TRY_CATCH_ERROR) {
      var error = TRY_CATCH_ERROR.error;
      TRY_CATCH_ERROR.error = null; // release
      reject(promise, error);
    } else if (hasCallback) {
      resolve$1(promise, value);
    } else if (state === FULFILLED) {
      fulfill(promise, value);
    } else if (state === REJECTED) {
      reject(promise, value);
    }
  }

  function initializePromise(promise, resolver) {
    var resolved = false;
    try {
      resolver(function (value) {
        if (resolved) {
          return;
        }
        resolved = true;
        resolve$1(promise, value);
      }, function (reason) {
        if (resolved) {
          return;
        }
        resolved = true;
        reject(promise, reason);
      });
    } catch (e) {
      reject(promise, e);
    }
  }

  function then(onFulfillment, onRejection, label) {
    var parent = this;
    var state = parent._state;

    if (state === FULFILLED && !onFulfillment || state === REJECTED && !onRejection) {
      config.instrument && instrument('chained', parent, parent);
      return parent;
    }

    parent._onError = null;

    var child = new parent.constructor(noop, label);
    var result = parent._result;

    config.instrument && instrument('chained', parent, child);

    if (state === PENDING) {
      subscribe(parent, child, onFulfillment, onRejection);
    } else {
      var callback = state === FULFILLED ? onFulfillment : onRejection;
      config.async(function () {
        return invokeCallback(state, child, callback, result);
      });
    }

    return child;
  }

  var Enumerator = function () {
    function Enumerator(Constructor, input, abortOnReject, label) {
      this._instanceConstructor = Constructor;
      this.promise = new Constructor(noop, label);
      this._abortOnReject = abortOnReject;
      this._isUsingOwnPromise = Constructor === Promise;
      this._isUsingOwnResolve = Constructor.resolve === resolve$$1;

      this._init.apply(this, arguments);
    }

    Enumerator.prototype._init = function _init(Constructor, input) {
      var len = input.length || 0;
      this.length = len;
      this._remaining = len;
      this._result = new Array(len);

      this._enumerate(input);
    };

    Enumerator.prototype._enumerate = function _enumerate(input) {
      var length = this.length;
      var promise = this.promise;

      for (var i = 0; promise._state === PENDING && i < length; i++) {
        this._eachEntry(input[i], i, true);
      }
      this._checkFullfillment();
    };

    Enumerator.prototype._checkFullfillment = function _checkFullfillment() {
      if (this._remaining === 0) {
        var result = this._result;
        fulfill(this.promise, result);
        this._result = null;
      }
    };

    Enumerator.prototype._settleMaybeThenable = function _settleMaybeThenable(entry, i, firstPass) {
      var c = this._instanceConstructor;

      if (this._isUsingOwnResolve) {
        var then$$1 = getThen(entry);

        if (then$$1 === then && entry._state !== PENDING) {
          entry._onError = null;
          this._settledAt(entry._state, i, entry._result, firstPass);
        } else if (typeof then$$1 !== 'function') {
          this._settledAt(FULFILLED, i, entry, firstPass);
        } else if (this._isUsingOwnPromise) {
          var promise = new c(noop);
          handleMaybeThenable(promise, entry, then$$1);
          this._willSettleAt(promise, i, firstPass);
        } else {
          this._willSettleAt(new c(function (resolve) {
            return resolve(entry);
          }), i, firstPass);
        }
      } else {
        this._willSettleAt(c.resolve(entry), i, firstPass);
      }
    };

    Enumerator.prototype._eachEntry = function _eachEntry(entry, i, firstPass) {
      if (entry !== null && typeof entry === 'object') {
        this._settleMaybeThenable(entry, i, firstPass);
      } else {
        this._setResultAt(FULFILLED, i, entry, firstPass);
      }
    };

    Enumerator.prototype._settledAt = function _settledAt(state, i, value, firstPass) {
      var promise = this.promise;

      if (promise._state === PENDING) {
        if (this._abortOnReject && state === REJECTED) {
          reject(promise, value);
        } else {
          this._setResultAt(state, i, value, firstPass);
          this._checkFullfillment();
        }
      }
    };

    Enumerator.prototype._setResultAt = function _setResultAt(state, i, value, firstPass) {
      this._remaining--;
      this._result[i] = value;
    };

    Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i, firstPass) {
      var _this = this;

      subscribe(promise, undefined, function (value) {
        return _this._settledAt(FULFILLED, i, value, firstPass);
      }, function (reason) {
        return _this._settledAt(REJECTED, i, reason, firstPass);
      });
    };

    return Enumerator;
  }();


  function setSettledResult(state, i, value) {
    this._remaining--;
    if (state === FULFILLED) {
      this._result[i] = {
        state: 'fulfilled',
        value: value
      };
    } else {
      this._result[i] = {
        state: 'rejected',
        reason: value
      };
    }
  }

  /**
    `Promise.all` accepts an array of promises, and returns a new promise which
    is fulfilled with an array of fulfillment values for the passed promises, or
    rejected with the reason of the first passed promise to be rejected. It casts all
    elements of the passed iterable to promises as it runs this algorithm.

    Example:

    ```javascript
    import Promise, { resolve } from 'rsvp';

    let promise1 = resolve(1);
    let promise2 = resolve(2);
    let promise3 = resolve(3);
    let promises = [ promise1, promise2, promise3 ];

    Promise.all(promises).then(function(array){
      // The array here would be [ 1, 2, 3 ];
    });
    ```

    If any of the `promises` given to `RSVP.all` are rejected, the first promise
    that is rejected will be given as an argument to the returned promises's
    rejection handler. For example:

    Example:

    ```javascript
    import Promise, { resolve, reject } from 'rsvp';

    let promise1 = resolve(1);
    let promise2 = reject(new Error("2"));
    let promise3 = reject(new Error("3"));
    let promises = [ promise1, promise2, promise3 ];

    Promise.all(promises).then(function(array){
      // Code here never runs because there are rejected promises!
    }, function(error) {
      // error.message === "2"
    });
    ```

    @method all
    @for Promise
    @param {Array} entries array of promises
    @param {String} [label] optional string for labeling the promise.
    Useful for tooling.
    @return {Promise} promise that is fulfilled when all `promises` have been
    fulfilled, or rejected if any of them become rejected.
    @static
  */
  function all(entries, label) {
    if (!Array.isArray(entries)) {
      return this.reject(new TypeError("Promise.all must be called with an array"), label);
    }
    return new Enumerator(this, entries, true /* abort on reject */, label).promise;
  }

  /**
    `Promise.race` returns a new promise which is settled in the same way as the
    first passed promise to settle.

    Example:

    ```javascript
    import Promise from 'rsvp';

    let promise1 = new Promise(function(resolve, reject){
      setTimeout(function(){
        resolve('promise 1');
      }, 200);
    });

    let promise2 = new Promise(function(resolve, reject){
      setTimeout(function(){
        resolve('promise 2');
      }, 100);
    });

    Promise.race([promise1, promise2]).then(function(result){
      // result === 'promise 2' because it was resolved before promise1
      // was resolved.
    });
    ```

    `Promise.race` is deterministic in that only the state of the first
    settled promise matters. For example, even if other promises given to the
    `promises` array argument are resolved, but the first settled promise has
    become rejected before the other promises became fulfilled, the returned
    promise will become rejected:

    ```javascript
    import Promise from 'rsvp';

    let promise1 = new Promise(function(resolve, reject){
      setTimeout(function(){
        resolve('promise 1');
      }, 200);
    });

    let promise2 = new Promise(function(resolve, reject){
      setTimeout(function(){
        reject(new Error('promise 2'));
      }, 100);
    });

    Promise.race([promise1, promise2]).then(function(result){
      // Code here never runs
    }, function(reason){
      // reason.message === 'promise 2' because promise 2 became rejected before
      // promise 1 became fulfilled
    });
    ```

    An example real-world use case is implementing timeouts:

    ```javascript
    import Promise from 'rsvp';

    Promise.race([ajax('foo.json'), timeout(5000)])
    ```

    @method race
    @for Promise
    @static
    @param {Array} entries array of promises to observe
    @param {String} [label] optional string for describing the promise returned.
    Useful for tooling.
    @return {Promise} a promise which settles in the same way as the first passed
    promise to settle.
  */
  function race(entries, label) {
    /*jshint validthis:true */
    var Constructor = this;

    var promise = new Constructor(noop, label);

    if (!Array.isArray(entries)) {
      reject(promise, new TypeError('Promise.race must be called with an array'));
      return promise;
    }

    for (var i = 0; promise._state === PENDING && i < entries.length; i++) {
      subscribe(Constructor.resolve(entries[i]), undefined, function (value) {
        return resolve$1(promise, value);
      }, function (reason) {
        return reject(promise, reason);
      });
    }

    return promise;
  }

  /**
    `Promise.reject` returns a promise rejected with the passed `reason`.
    It is shorthand for the following:

    ```javascript
    import Promise from 'rsvp';

    let promise = new Promise(function(resolve, reject){
      reject(new Error('WHOOPS'));
    });

    promise.then(function(value){
      // Code here doesn't run because the promise is rejected!
    }, function(reason){
      // reason.message === 'WHOOPS'
    });
    ```

    Instead of writing the above, your code now simply becomes the following:

    ```javascript
    import Promise from 'rsvp';

    let promise = Promise.reject(new Error('WHOOPS'));

    promise.then(function(value){
      // Code here doesn't run because the promise is rejected!
    }, function(reason){
      // reason.message === 'WHOOPS'
    });
    ```

    @method reject
    @for Promise
    @static
    @param {*} reason value that the returned promise will be rejected with.
    @param {String} [label] optional string for identifying the returned promise.
    Useful for tooling.
    @return {Promise} a promise rejected with the given `reason`.
  */
  function reject$1(reason, label) {
    /*jshint validthis:true */
    var Constructor = this;
    var promise = new Constructor(noop, label);
    reject(promise, reason);
    return promise;
  }

  var guidKey = 'rsvp_' + Date.now() + '-';
  var counter = 0;

  function needsResolver() {
    throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
  }

  function needsNew() {
    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
  }

  /**
    Promise objects represent the eventual result of an asynchronous operation. The
    primary way of interacting with a promise is through its `then` method, which
    registers callbacks to receive either a promise’s eventual value or the reason
    why the promise cannot be fulfilled.

    Terminology
    -----------

    - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
    - `thenable` is an object or function that defines a `then` method.
    - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
    - `exception` is a value that is thrown using the throw statement.
    - `reason` is a value that indicates why a promise was rejected.
    - `settled` the final resting state of a promise, fulfilled or rejected.

    A promise can be in one of three states: pending, fulfilled, or rejected.

    Promises that are fulfilled have a fulfillment value and are in the fulfilled
    state.  Promises that are rejected have a rejection reason and are in the
    rejected state.  A fulfillment value is never a thenable.

    Promises can also be said to *resolve* a value.  If this value is also a
    promise, then the original promise's settled state will match the value's
    settled state.  So a promise that *resolves* a promise that rejects will
    itself reject, and a promise that *resolves* a promise that fulfills will
    itself fulfill.


    Basic Usage:
    ------------

    ```js
    let promise = new Promise(function(resolve, reject) {
      // on success
      resolve(value);

      // on failure
      reject(reason);
    });

    promise.then(function(value) {
      // on fulfillment
    }, function(reason) {
      // on rejection
    });
    ```

    Advanced Usage:
    ---------------

    Promises shine when abstracting away asynchronous interactions such as
    `XMLHttpRequest`s.

    ```js
    function getJSON(url) {
      return new Promise(function(resolve, reject){
        let xhr = new XMLHttpRequest();

        xhr.open('GET', url);
        xhr.onreadystatechange = handler;
        xhr.responseType = 'json';
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.send();

        function handler() {
          if (this.readyState === this.DONE) {
            if (this.status === 200) {
              resolve(this.response);
            } else {
              reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
            }
          }
        };
      });
    }

    getJSON('/posts.json').then(function(json) {
      // on fulfillment
    }, function(reason) {
      // on rejection
    });
    ```

    Unlike callbacks, promises are great composable primitives.

    ```js
    Promise.all([
      getJSON('/posts'),
      getJSON('/comments')
    ]).then(function(values){
      values[0] // => postsJSON
      values[1] // => commentsJSON

      return values;
    });
    ```

    @class Promise
    @public
    @param {function} resolver
    @param {String} [label] optional string for labeling the promise.
    Useful for tooling.
    @constructor
  */

  var Promise = function () {
    function Promise(resolver, label) {
      this._id = counter++;
      this._label = label;
      this._state = undefined;
      this._result = undefined;
      this._subscribers = [];

      config.instrument && instrument('created', this);

      if (noop !== resolver) {
        typeof resolver !== 'function' && needsResolver();
        this instanceof Promise ? initializePromise(this, resolver) : needsNew();
      }
    }

    Promise.prototype._onError = function _onError(reason) {
      var _this = this;

      config.after(function () {
        if (_this._onError) {
          config.trigger('error', reason, _this._label);
        }
      });
    };

    /**
      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
      as the catch block of a try/catch statement.
    
      ```js
      function findAuthor(){
        throw new Error('couldn\'t find that author');
      }
    
      // synchronous
      try {
        findAuthor();
      } catch(reason) {
        // something went wrong
      }
    
      // async with promises
      findAuthor().catch(function(reason){
        // something went wrong
      });
      ```
    
      @method catch
      @param {Function} onRejection
      @param {String} [label] optional string for labeling the promise.
      Useful for tooling.
      @return {Promise}
    */


    Promise.prototype.catch = function _catch(onRejection, label) {
      return this.then(undefined, onRejection, label);
    };

    /**
      `finally` will be invoked regardless of the promise's fate just as native
      try/catch/finally behaves
    
      Synchronous example:
    
      ```js
      findAuthor() {
        if (Math.random() > 0.5) {
          throw new Error();
        }
        return new Author();
      }
    
      try {
        return findAuthor(); // succeed or fail
      } catch(error) {
        return findOtherAuthor();
      } finally {
        // always runs
        // doesn't affect the return value
      }
      ```
    
      Asynchronous example:
    
      ```js
      findAuthor().catch(function(reason){
        return findOtherAuthor();
      }).finally(function(){
        // author was either found, or not
      });
      ```
    
      @method finally
      @param {Function} callback
      @param {String} [label] optional string for labeling the promise.
      Useful for tooling.
      @return {Promise}
    */


    Promise.prototype.finally = function _finally(callback, label) {
      var promise = this;
      var constructor = promise.constructor;

      if (typeof callback === 'function') {
        return promise.then(function (value) {
          return constructor.resolve(callback()).then(function () {
            return value;
          });
        }, function (reason) {
          return constructor.resolve(callback()).then(function () {
            throw reason;
          });
        });
      }

      return promise.then(callback, callback);
    };

    return Promise;
  }();

  Promise.cast = resolve$$1; // deprecated
  Promise.all = all;
  Promise.race = race;
  Promise.resolve = resolve$$1;
  Promise.reject = reject$1;

  Promise.prototype._guidKey = guidKey;

  /**
    The primary way of interacting with a promise is through its `then` method,
    which registers callbacks to receive either a promise's eventual value or the
    reason why the promise cannot be fulfilled.

    ```js
    findUser().then(function(user){
      // user is available
    }, function(reason){
      // user is unavailable, and you are given the reason why
    });
    ```

    Chaining
    --------

    The return value of `then` is itself a promise.  This second, 'downstream'
    promise is resolved with the return value of the first promise's fulfillment
    or rejection handler, or rejected if the handler throws an exception.

    ```js
    findUser().then(function (user) {
      return user.name;
    }, function (reason) {
      return 'default name';
    }).then(function (userName) {
      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
      // will be `'default name'`
    });

    findUser().then(function (user) {
      throw new Error('Found user, but still unhappy');
    }, function (reason) {
      throw new Error('`findUser` rejected and we\'re unhappy');
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
      // If `findUser` rejected, `reason` will be '`findUser` rejected and we\'re unhappy'.
    });
    ```
    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.

    ```js
    findUser().then(function (user) {
      throw new PedagogicalException('Upstream error');
    }).then(function (value) {
      // never reached
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // The `PedgagocialException` is propagated all the way down to here
    });
    ```

    Assimilation
    ------------

    Sometimes the value you want to propagate to a downstream promise can only be
    retrieved asynchronously. This can be achieved by returning a promise in the
    fulfillment or rejection handler. The downstream promise will then be pending
    until the returned promise is settled. This is called *assimilation*.

    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // The user's comments are now available
    });
    ```

    If the assimliated promise rejects, then the downstream promise will also reject.

    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // If `findCommentsByAuthor` fulfills, we'll have the value here
    }, function (reason) {
      // If `findCommentsByAuthor` rejects, we'll have the reason here
    });
    ```

    Simple Example
    --------------

    Synchronous Example

    ```javascript
    let result;

    try {
      result = findResult();
      // success
    } catch(reason) {
      // failure
    }
    ```

    Errback Example

    ```js
    findResult(function(result, err){
      if (err) {
        // failure
      } else {
        // success
      }
    });
    ```

    Promise Example;

    ```javascript
    findResult().then(function(result){
      // success
    }, function(reason){
      // failure
    });
    ```

    Advanced Example
    --------------

    Synchronous Example

    ```javascript
    let author, books;

    try {
      author = findAuthor();
      books  = findBooksByAuthor(author);
      // success
    } catch(reason) {
      // failure
    }
    ```

    Errback Example

    ```js

    function foundBooks(books) {

    }

    function failure(reason) {

    }

    findAuthor(function(author, err){
      if (err) {
        failure(err);
        // failure
      } else {
        try {
          findBoooksByAuthor(author, function(books, err) {
            if (err) {
              failure(err);
            } else {
              try {
                foundBooks(books);
              } catch(reason) {
                failure(reason);
              }
            }
          });
        } catch(error) {
          failure(err);
        }
        // success
      }
    });
    ```

    Promise Example;

    ```javascript
    findAuthor().
      then(findBooksByAuthor).
      then(function(books){
        // found books
    }).catch(function(reason){
      // something went wrong
    });
    ```

    @method then
    @param {Function} onFulfillment
    @param {Function} onRejection
    @param {String} [label] optional string for labeling the promise.
    Useful for tooling.
    @return {Promise}
  */
  Promise.prototype.then = then;

  function makeObject(_, argumentNames) {
    var obj = {};
    var length = _.length;
    var args = new Array(length);

    for (var x = 0; x < length; x++) {
      args[x] = _[x];
    }

    for (var i = 0; i < argumentNames.length; i++) {
      var name = argumentNames[i];
      obj[name] = args[i + 1];
    }

    return obj;
  }

  function arrayResult(_) {
    var length = _.length;
    var args = new Array(length - 1);

    for (var i = 1; i < length; i++) {
      args[i - 1] = _[i];
    }

    return args;
  }

  function wrapThenable(then, promise) {
    return {
      then: function (onFulFillment, onRejection) {
        return then.call(promise, onFulFillment, onRejection);
      }
    };
  }

  /**
    `denodeify` takes a 'node-style' function and returns a function that
    will return an `Promise`. You can use `denodeify` in Node.js or the
    browser when you'd prefer to use promises over using callbacks. For example,
    `denodeify` transforms the following:

    ```javascript
    let fs = require('fs');

    fs.readFile('myfile.txt', function(err, data){
      if (err) return handleError(err);
      handleData(data);
    });
    ```

    into:

    ```javascript
    let fs = require('fs');
    let readFile = denodeify(fs.readFile);

    readFile('myfile.txt').then(handleData, handleError);
    ```

    If the node function has multiple success parameters, then `denodeify`
    just returns the first one:

    ```javascript
    let request = denodeify(require('request'));

    request('http://example.com').then(function(res) {
      // ...
    });
    ```

    However, if you need all success parameters, setting `denodeify`'s
    second parameter to `true` causes it to return all success parameters
    as an array:

    ```javascript
    let request = denodeify(require('request'), true);

    request('http://example.com').then(function(result) {
      // result[0] -> res
      // result[1] -> body
    });
    ```

    Or if you pass it an array with names it returns the parameters as a hash:

    ```javascript
    let request = denodeify(require('request'), ['res', 'body']);

    request('http://example.com').then(function(result) {
      // result.res
      // result.body
    });
    ```

    Sometimes you need to retain the `this`:

    ```javascript
    let app = require('express')();
    let render = denodeify(app.render.bind(app));
    ```

    The denodified function inherits from the original function. It works in all
    environments, except IE 10 and below. Consequently all properties of the original
    function are available to you. However, any properties you change on the
    denodeified function won't be changed on the original function. Example:

    ```javascript
    let request = denodeify(require('request')),
        cookieJar = request.jar(); // <- Inheritance is used here

    request('http://example.com', {jar: cookieJar}).then(function(res) {
      // cookieJar.cookies holds now the cookies returned by example.com
    });
    ```

    Using `denodeify` makes it easier to compose asynchronous operations instead
    of using callbacks. For example, instead of:

    ```javascript
    let fs = require('fs');

    fs.readFile('myfile.txt', function(err, data){
      if (err) { ... } // Handle error
      fs.writeFile('myfile2.txt', data, function(err){
        if (err) { ... } // Handle error
        console.log('done')
      });
    });
    ```

    you can chain the operations together using `then` from the returned promise:

    ```javascript
    let fs = require('fs');
    let readFile = denodeify(fs.readFile);
    let writeFile = denodeify(fs.writeFile);

    readFile('myfile.txt').then(function(data){
      return writeFile('myfile2.txt', data);
    }).then(function(){
      console.log('done')
    }).catch(function(error){
      // Handle error
    });
    ```

    @method denodeify
    @public
    @static
    @for rsvp
    @param {Function} nodeFunc a 'node-style' function that takes a callback as
    its last argument. The callback expects an error to be passed as its first
    argument (if an error occurred, otherwise null), and the value from the
    operation as its second argument ('function(err, value){ }').
    @param {Boolean|Array} [options] An optional paramter that if set
    to `true` causes the promise to fulfill with the callback's success arguments
    as an array. This is useful if the node function has multiple success
    paramters. If you set this paramter to an array with names, the promise will
    fulfill with a hash with these names as keys and the success parameters as
    values.
    @return {Function} a function that wraps `nodeFunc` to return a `Promise`
  */
  function denodeify(nodeFunc, options) {
    var fn = function () {
      var l = arguments.length;
      var args = new Array(l + 1);
      var promiseInput = false;

      for (var i = 0; i < l; ++i) {
        var arg = arguments[i];

        if (!promiseInput) {
          // TODO: clean this up
          promiseInput = needsPromiseInput(arg);
          if (promiseInput === TRY_CATCH_ERROR) {
            var error = TRY_CATCH_ERROR.error;
            TRY_CATCH_ERROR.error = null;
            var p = new Promise(noop);
            reject(p, error);
            return p;
          } else if (promiseInput && promiseInput !== true) {
            arg = wrapThenable(promiseInput, arg);
          }
        }
        args[i] = arg;
      }

      var promise = new Promise(noop);

      args[l] = function (err, val) {
        if (err) {
          reject(promise, err);
        } else if (options === undefined) {
          resolve$1(promise, val);
        } else if (options === true) {
          resolve$1(promise, arrayResult(arguments));
        } else if (Array.isArray(options)) {
          resolve$1(promise, makeObject(arguments, options));
        } else {
          resolve$1(promise, val);
        }
      };

      if (promiseInput) {
        return handlePromiseInput(promise, args, nodeFunc, this);
      } else {
        return handleValueInput(promise, args, nodeFunc, this);
      }
    };

    fn.__proto__ = nodeFunc;

    return fn;
  }

  function handleValueInput(promise, args, nodeFunc, self) {
    var result = tryCatch(nodeFunc).apply(self, args);
    if (result === TRY_CATCH_ERROR) {
      var error = TRY_CATCH_ERROR.error;
      TRY_CATCH_ERROR.error = null;
      reject(promise, error);
    }
    return promise;
  }

  function handlePromiseInput(promise, args, nodeFunc, self) {
    return Promise.all(args).then(function (args) {
      return handleValueInput(promise, args, nodeFunc, self);
    });
  }

  function needsPromiseInput(arg) {
    if (arg !== null && typeof arg === 'object') {
      if (arg.constructor === Promise) {
        return true;
      } else {
        return getThen(arg);
      }
    } else {
      return false;
    }
  }

  /**
    This is a convenient alias for `Promise.all`.

    @method all
    @public
    @static
    @for rsvp
    @param {Array} array Array of promises.
    @param {String} [label] An optional label. This is useful
    for tooling.
  */
  function all$1(array, label) {
    return Promise.all(array, label);
  }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  /**
  @module rsvp
  @public
  **/

  var AllSettled = function (_Enumerator) {
    _inherits(AllSettled, _Enumerator);

    function AllSettled(Constructor, entries, label) {
      return _possibleConstructorReturn(this, _Enumerator.call(this, Constructor, entries, false /* don't abort on reject */, label));
    }

    return AllSettled;
  }(Enumerator);

  AllSettled.prototype._setResultAt = setSettledResult;

  /**
  `RSVP.allSettled` is similar to `RSVP.all`, but instead of implementing
  a fail-fast method, it waits until all the promises have returned and
  shows you all the results. This is useful if you want to handle multiple
  promises' failure states together as a set.
   Returns a promise that is fulfilled when all the given promises have been
  settled. The return promise is fulfilled with an array of the states of
  the promises passed into the `promises` array argument.
   Each state object will either indicate fulfillment or rejection, and
  provide the corresponding value or reason. The states will take one of
  the following formats:
   ```javascript
  { state: 'fulfilled', value: value }
    or
  { state: 'rejected', reason: reason }
  ```
   Example:
   ```javascript
  let promise1 = RSVP.Promise.resolve(1);
  let promise2 = RSVP.Promise.reject(new Error('2'));
  let promise3 = RSVP.Promise.reject(new Error('3'));
  let promises = [ promise1, promise2, promise3 ];
   RSVP.allSettled(promises).then(function(array){
    // array == [
    //   { state: 'fulfilled', value: 1 },
    //   { state: 'rejected', reason: Error },
    //   { state: 'rejected', reason: Error }
    // ]
    // Note that for the second item, reason.message will be '2', and for the
    // third item, reason.message will be '3'.
  }, function(error) {
    // Not run. (This block would only be called if allSettled had failed,
    // for instance if passed an incorrect argument type.)
  });
  ```
   @method allSettled
  @public
  @static
  @for rsvp
  @param {Array} entries
  @param {String} [label] - optional string that describes the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled with an array of the settled
  states of the constituent promises.
  */

  function allSettled(entries, label) {
    if (!Array.isArray(entries)) {
      return Promise.reject(new TypeError("Promise.allSettled must be called with an array"), label);
    }

    return new AllSettled(Promise, entries, label).promise;
  }

  /**
    This is a convenient alias for `Promise.race`.

    @method race
    @public
    @static
    @for rsvp
    @param {Array} array Array of promises.
    @param {String} [label] An optional label. This is useful
    for tooling.
   */
  function race$1(array, label) {
    return Promise.race(array, label);
  }

  function _possibleConstructorReturn$1(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var PromiseHash = function (_Enumerator) {
    _inherits$1(PromiseHash, _Enumerator);

    function PromiseHash(Constructor, object) {
      var abortOnReject = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var label = arguments[3];
      return _possibleConstructorReturn$1(this, _Enumerator.call(this, Constructor, object, abortOnReject, label));
    }

    PromiseHash.prototype._init = function _init(Constructor, object) {
      this._result = {};
      this._enumerate(object);
    };

    PromiseHash.prototype._enumerate = function _enumerate(input) {
      var keys = Object.keys(input);

      var length = keys.length;
      var promise = this.promise;
      this._remaining = length;

      var key = void 0,
          val = void 0;
      for (var i = 0; promise._state === PENDING && i < length; i++) {
        key = keys[i];
        val = input[key];
        this._eachEntry(val, key, true);
      }

      this._checkFullfillment();
    };

    return PromiseHash;
  }(Enumerator);

  /**
    `hash` is similar to `all`, but takes an object instead of an array
    for its `promises` argument.

    Returns a promise that is fulfilled when all the given promises have been
    fulfilled, or rejected if any of them become rejected. The returned promise
    is fulfilled with a hash that has the same key names as the `promises` object
    argument. If any of the values in the object are not promises, they will
    simply be copied over to the fulfilled object.

    Example:

    ```javascript
    let promises = {
      myPromise: resolve(1),
      yourPromise: resolve(2),
      theirPromise: resolve(3),
      notAPromise: 4
    };

    hash(promises).then(function(hash){
      // hash here is an object that looks like:
      // {
      //   myPromise: 1,
      //   yourPromise: 2,
      //   theirPromise: 3,
      //   notAPromise: 4
      // }
    });
    ```

    If any of the `promises` given to `hash` are rejected, the first promise
    that is rejected will be given as the reason to the rejection handler.

    Example:

    ```javascript
    let promises = {
      myPromise: resolve(1),
      rejectedPromise: reject(new Error('rejectedPromise')),
      anotherRejectedPromise: reject(new Error('anotherRejectedPromise')),
    };

    hash(promises).then(function(hash){
      // Code here never runs because there are rejected promises!
    }, function(reason) {
      // reason.message === 'rejectedPromise'
    });
    ```

    An important note: `hash` is intended for plain JavaScript objects that
    are just a set of keys and values. `hash` will NOT preserve prototype
    chains.

    Example:

    ```javascript
    import { hash, resolve } from 'rsvp';
    function MyConstructor(){
      this.example = resolve('Example');
    }

    MyConstructor.prototype = {
      protoProperty: resolve('Proto Property')
    };

    let myObject = new MyConstructor();

    hash(myObject).then(function(hash){
      // protoProperty will not be present, instead you will just have an
      // object that looks like:
      // {
      //   example: 'Example'
      // }
      //
      // hash.hasOwnProperty('protoProperty'); // false
      // 'undefined' === typeof hash.protoProperty
    });
    ```

    @method hash
    @public
    @static
    @for rsvp
    @param {Object} object
    @param {String} [label] optional string that describes the promise.
    Useful for tooling.
    @return {Promise} promise that is fulfilled when all properties of `promises`
    have been fulfilled, or rejected if any of them become rejected.
  */
  function hash(object, label) {
    return Promise.resolve(object, label).then(function (object) {
      if (object === null || typeof object !== 'object') {
        throw new TypeError("Promise.hash must be called with an object");
      }
      return new PromiseHash(Promise, object, label).promise;
    });
  }

  function _possibleConstructorReturn$2(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits$2(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var HashSettled = function (_PromiseHash) {
    _inherits$2(HashSettled, _PromiseHash);

    function HashSettled(Constructor, object, label) {
      return _possibleConstructorReturn$2(this, _PromiseHash.call(this, Constructor, object, false, label));
    }

    return HashSettled;
  }(PromiseHash);

  HashSettled.prototype._setResultAt = setSettledResult;

  /**
    `hashSettled` is similar to `allSettled`, but takes an object
    instead of an array for its `promises` argument.

    Unlike `all` or `hash`, which implement a fail-fast method,
    but like `allSettled`, `hashSettled` waits until all the
    constituent promises have returned and then shows you all the results
    with their states and values/reasons. This is useful if you want to
    handle multiple promises' failure states together as a set.

    Returns a promise that is fulfilled when all the given promises have been
    settled, or rejected if the passed parameters are invalid.

    The returned promise is fulfilled with a hash that has the same key names as
    the `promises` object argument. If any of the values in the object are not
    promises, they will be copied over to the fulfilled object and marked with state
    'fulfilled'.

    Example:

    ```javascript
    import { hashSettled, resolve } from 'rsvp';

    let promises = {
      myPromise: resolve(1),
      yourPromise: resolve(2),
      theirPromise: resolve(3),
      notAPromise: 4
    };

    hashSettled(promises).then(function(hash){
      // hash here is an object that looks like:
      // {
      //   myPromise: { state: 'fulfilled', value: 1 },
      //   yourPromise: { state: 'fulfilled', value: 2 },
      //   theirPromise: { state: 'fulfilled', value: 3 },
      //   notAPromise: { state: 'fulfilled', value: 4 }
      // }
    });
    ```

    If any of the `promises` given to `hash` are rejected, the state will
    be set to 'rejected' and the reason for rejection provided.

    Example:

    ```javascript
    import { hashSettled, reject, resolve } from 'rsvp';

    let promises = {
      myPromise: resolve(1),
      rejectedPromise: reject(new Error('rejection')),
      anotherRejectedPromise: reject(new Error('more rejection')),
    };

    hashSettled(promises).then(function(hash){
      // hash here is an object that looks like:
      // {
      //   myPromise:              { state: 'fulfilled', value: 1 },
      //   rejectedPromise:        { state: 'rejected', reason: Error },
      //   anotherRejectedPromise: { state: 'rejected', reason: Error },
      // }
      // Note that for rejectedPromise, reason.message == 'rejection',
      // and for anotherRejectedPromise, reason.message == 'more rejection'.
    });
    ```

    An important note: `hashSettled` is intended for plain JavaScript objects that
    are just a set of keys and values. `hashSettled` will NOT preserve prototype
    chains.

    Example:

    ```javascript
    import Promise, { hashSettled, resolve } from 'rsvp';

    function MyConstructor(){
      this.example = resolve('Example');
    }

    MyConstructor.prototype = {
      protoProperty: Promise.resolve('Proto Property')
    };

    let myObject = new MyConstructor();

    hashSettled(myObject).then(function(hash){
      // protoProperty will not be present, instead you will just have an
      // object that looks like:
      // {
      //   example: { state: 'fulfilled', value: 'Example' }
      // }
      //
      // hash.hasOwnProperty('protoProperty'); // false
      // 'undefined' === typeof hash.protoProperty
    });
    ```

    @method hashSettled
    @public
    @for rsvp
    @param {Object} object
    @param {String} [label] optional string that describes the promise.
    Useful for tooling.
    @return {Promise} promise that is fulfilled when when all properties of `promises`
    have been settled.
    @static
  */

  function hashSettled(object, label) {
    return Promise.resolve(object, label).then(function (object) {
      if (object === null || typeof object !== 'object') {
        throw new TypeError("hashSettled must be called with an object");
      }

      return new HashSettled(Promise, object, false, label).promise;
    });
  }

  /**
    `rethrow` will rethrow an error on the next turn of the JavaScript event
    loop in order to aid debugging.

    Promises A+ specifies that any exceptions that occur with a promise must be
    caught by the promises implementation and bubbled to the last handler. For
    this reason, it is recommended that you always specify a second rejection
    handler function to `then`. However, `rethrow` will throw the exception
    outside of the promise, so it bubbles up to your console if in the browser,
    or domain/cause uncaught exception in Node. `rethrow` will also throw the
    error again so the error can be handled by the promise per the spec.

    ```javascript
    import { rethrow } from 'rsvp';

    function throws(){
      throw new Error('Whoops!');
    }

    let promise = new Promise(function(resolve, reject){
      throws();
    });

    promise.catch(rethrow).then(function(){
      // Code here doesn't run because the promise became rejected due to an
      // error!
    }, function (err){
      // handle the error here
    });
    ```

    The 'Whoops' error will be thrown on the next turn of the event loop
    and you can watch for it in your console. You can also handle it using a
    rejection handler given to `.then` or `.catch` on the returned promise.

    @method rethrow
    @public
    @static
    @for rsvp
    @param {Error} reason reason the promise became rejected.
    @throws Error
    @static
  */
  function rethrow(reason) {
    setTimeout(function () {
      throw reason;
    });
    throw reason;
  }

  /**
    `defer` returns an object similar to jQuery's `$.Deferred`.
    `defer` should be used when porting over code reliant on `$.Deferred`'s
    interface. New code should use the `Promise` constructor instead.

    The object returned from `defer` is a plain object with three properties:

    * promise - an `Promise`.
    * reject - a function that causes the `promise` property on this object to
      become rejected
    * resolve - a function that causes the `promise` property on this object to
      become fulfilled.

    Example:

     ```javascript
     let deferred = defer();

     deferred.resolve("Success!");

     deferred.promise.then(function(value){
       // value here is "Success!"
     });
     ```

    @method defer
    @public
    @static
    @for rsvp
    @param {String} [label] optional string for labeling the promise.
    Useful for tooling.
    @return {Object}
   */

  function defer(label) {
    var deferred = { resolve: undefined, reject: undefined };

    deferred.promise = new Promise(function (resolve, reject) {
      deferred.resolve = resolve;
      deferred.reject = reject;
    }, label);

    return deferred;
  }

  function _possibleConstructorReturn$3(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits$3(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var MapEnumerator = function (_Enumerator) {
    _inherits$3(MapEnumerator, _Enumerator);

    function MapEnumerator(Constructor, entries, mapFn, label) {
      return _possibleConstructorReturn$3(this, _Enumerator.call(this, Constructor, entries, true, label, mapFn));
    }

    MapEnumerator.prototype._init = function _init(Constructor, input, bool, label, mapFn) {
      var len = input.length || 0;
      this.length = len;
      this._remaining = len;
      this._result = new Array(len);
      this._mapFn = mapFn;

      this._enumerate(input);
    };

    MapEnumerator.prototype._setResultAt = function _setResultAt(state, i, value, firstPass) {
      if (firstPass) {
        var val = tryCatch(this._mapFn)(value, i);
        if (val === TRY_CATCH_ERROR) {
          this._settledAt(REJECTED, i, val.error, false);
        } else {
          this._eachEntry(val, i, false);
        }
      } else {
        this._remaining--;
        this._result[i] = value;
      }
    };

    return MapEnumerator;
  }(Enumerator);

  /**
   `map` is similar to JavaScript's native `map` method. `mapFn` is eagerly called
    meaning that as soon as any promise resolves its value will be passed to `mapFn`.
    `map` returns a promise that will become fulfilled with the result of running
    `mapFn` on the values the promises become fulfilled with.

    For example:

    ```javascript
    import { map, resolve } from 'rsvp';

    let promise1 = resolve(1);
    let promise2 = resolve(2);
    let promise3 = resolve(3);
    let promises = [ promise1, promise2, promise3 ];

    let mapFn = function(item){
      return item + 1;
    };

    map(promises, mapFn).then(function(result){
      // result is [ 2, 3, 4 ]
    });
    ```

    If any of the `promises` given to `map` are rejected, the first promise
    that is rejected will be given as an argument to the returned promise's
    rejection handler. For example:

    ```javascript
    import { map, reject, resolve } from 'rsvp';

    let promise1 = resolve(1);
    let promise2 = reject(new Error('2'));
    let promise3 = reject(new Error('3'));
    let promises = [ promise1, promise2, promise3 ];

    let mapFn = function(item){
      return item + 1;
    };

    map(promises, mapFn).then(function(array){
      // Code here never runs because there are rejected promises!
    }, function(reason) {
      // reason.message === '2'
    });
    ```

    `map` will also wait if a promise is returned from `mapFn`. For example,
    say you want to get all comments from a set of blog posts, but you need
    the blog posts first because they contain a url to those comments.

    ```javscript
    import { map } from 'rsvp';

    let mapFn = function(blogPost){
      // getComments does some ajax and returns an Promise that is fulfilled
      // with some comments data
      return getComments(blogPost.comments_url);
    };

    // getBlogPosts does some ajax and returns an Promise that is fulfilled
    // with some blog post data
    map(getBlogPosts(), mapFn).then(function(comments){
      // comments is the result of asking the server for the comments
      // of all blog posts returned from getBlogPosts()
    });
    ```

    @method map
    @public
    @static
    @for rsvp
    @param {Array} promises
    @param {Function} mapFn function to be called on each fulfilled promise.
    @param {String} [label] optional string for labeling the promise.
    Useful for tooling.
    @return {Promise} promise that is fulfilled with the result of calling
    `mapFn` on each fulfilled promise or value when they become fulfilled.
     The promise will be rejected if any of the given `promises` become rejected.
  */
  function map(promises, mapFn, label) {
    if (typeof mapFn !== 'function') {
      return Promise.reject(new TypeError("map expects a function as a second argument"), label);
    }

    return Promise.resolve(promises, label).then(function (promises) {
      if (!Array.isArray(promises)) {
        throw new TypeError("map must be called with an array");
      }
      return new MapEnumerator(Promise, promises, mapFn, label).promise;
    });
  }

  /**
    This is a convenient alias for `Promise.resolve`.

    @method resolve
    @public
    @static
    @for rsvp
    @param {*} value value that the returned promise will be resolved with
    @param {String} [label] optional string for identifying the returned promise.
    Useful for tooling.
    @return {Promise} a promise that will become fulfilled with the given
    `value`
  */
  function resolve$2(value, label) {
    return Promise.resolve(value, label);
  }

  /**
    This is a convenient alias for `Promise.reject`.

    @method reject
    @public
    @static
    @for rsvp
    @param {*} reason value that the returned promise will be rejected with.
    @param {String} [label] optional string for identifying the returned promise.
    Useful for tooling.
    @return {Promise} a promise rejected with the given `reason`.
  */
  function reject$2(reason, label) {
    return Promise.reject(reason, label);
  }

  function _possibleConstructorReturn$4(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits$4(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var EMPTY_OBJECT = {};

  var FilterEnumerator = function (_MapEnumerator) {
    _inherits$4(FilterEnumerator, _MapEnumerator);

    function FilterEnumerator() {
      return _possibleConstructorReturn$4(this, _MapEnumerator.apply(this, arguments));
    }

    FilterEnumerator.prototype._checkFullfillment = function _checkFullfillment() {
      if (this._remaining === 0 && this._result !== null) {
        var result = this._result.filter(function (val) {
          return val !== EMPTY_OBJECT;
        });
        fulfill(this.promise, result);
        this._result = null;
      }
    };

    FilterEnumerator.prototype._setResultAt = function _setResultAt(state, i, value, firstPass) {
      if (firstPass) {
        this._result[i] = value;
        var val = tryCatch(this._mapFn)(value, i);
        if (val === TRY_CATCH_ERROR) {
          this._settledAt(REJECTED, i, val.error, false);
        } else {
          this._eachEntry(val, i, false);
        }
      } else {
        this._remaining--;
        if (!value) {
          this._result[i] = EMPTY_OBJECT;
        }
      }
    };

    return FilterEnumerator;
  }(MapEnumerator);

  /**
   `filter` is similar to JavaScript's native `filter` method.
   `filterFn` is eagerly called meaning that as soon as any promise
    resolves its value will be passed to `filterFn`. `filter` returns
    a promise that will become fulfilled with the result of running
    `filterFn` on the values the promises become fulfilled with.

    For example:

    ```javascript
    import { filter, resolve } from 'rsvp';

    let promise1 = resolve(1);
    let promise2 = resolve(2);
    let promise3 = resolve(3);

    let promises = [promise1, promise2, promise3];

    let filterFn = function(item){
      return item > 1;
    };

    filter(promises, filterFn).then(function(result){
      // result is [ 2, 3 ]
    });
    ```

    If any of the `promises` given to `filter` are rejected, the first promise
    that is rejected will be given as an argument to the returned promise's
    rejection handler. For example:

    ```javascript
    import { filter, reject, resolve } from 'rsvp';

    let promise1 = resolve(1);
    let promise2 = reject(new Error('2'));
    let promise3 = reject(new Error('3'));
    let promises = [ promise1, promise2, promise3 ];

    let filterFn = function(item){
      return item > 1;
    };

    filter(promises, filterFn).then(function(array){
      // Code here never runs because there are rejected promises!
    }, function(reason) {
      // reason.message === '2'
    });
    ```

    `filter` will also wait for any promises returned from `filterFn`.
    For instance, you may want to fetch a list of users then return a subset
    of those users based on some asynchronous operation:

    ```javascript
    import { filter, resolve } from 'rsvp';

    let alice = { name: 'alice' };
    let bob   = { name: 'bob' };
    let users = [ alice, bob ];

    let promises = users.map(function(user){
      return resolve(user);
    });

    let filterFn = function(user){
      // Here, Alice has permissions to create a blog post, but Bob does not.
      return getPrivilegesForUser(user).then(function(privs){
        return privs.can_create_blog_post === true;
      });
    };
    filter(promises, filterFn).then(function(users){
      // true, because the server told us only Alice can create a blog post.
      users.length === 1;
      // false, because Alice is the only user present in `users`
      users[0] === bob;
    });
    ```

    @method filter
    @public
    @static
    @for rsvp
    @param {Array} promises
    @param {Function} filterFn - function to be called on each resolved value to
    filter the final results.
    @param {String} [label] optional string describing the promise. Useful for
    tooling.
    @return {Promise}
  */

  function filter(promises, filterFn, label) {
    if (typeof filterFn !== 'function') {
      return Promise.reject(new TypeError("filter expects function as a second argument"), label);
    }

    return Promise.resolve(promises, label).then(function (promises) {
      if (!Array.isArray(promises)) {
        throw new TypeError("filter must be called with an array");
      }
      return new FilterEnumerator(Promise, promises, filterFn, label).promise;
    });
  }

  var len = 0;
  var vertxNext = void 0;
  function asap(callback, arg) {
    queue$1[len] = callback;
    queue$1[len + 1] = arg;
    len += 2;
    if (len === 2) {
      // If len is 1, that means that we need to schedule an async flush.
      // If additional callbacks are queued before the queue is flushed, they
      // will be processed by this flush that we are scheduling.
      scheduleFlush$1();
    }
  }

  var browserWindow = typeof window !== 'undefined' ? window : undefined;
  var browserGlobal = browserWindow || {};
  var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
  var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

  // test for web worker but not in IE10
  var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

  // node
  function useNextTick() {
    var nextTick = process.nextTick;
    // node version 0.10.x displays a deprecation warning when nextTick is used recursively
    // setImmediate should be used instead instead
    var version = process.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);
    if (Array.isArray(version) && version[1] === '0' && version[2] === '10') {
      nextTick = setImmediate;
    }
    return function () {
      return nextTick(flush);
    };
  }

  // vertx
  function useVertxTimer() {
    if (typeof vertxNext !== 'undefined') {
      return function () {
        vertxNext(flush);
      };
    }
    return useSetTimeout();
  }

  function useMutationObserver() {
    var iterations = 0;
    var observer = new BrowserMutationObserver(flush);
    var node = document.createTextNode('');
    observer.observe(node, { characterData: true });

    return function () {
      return node.data = iterations = ++iterations % 2;
    };
  }

  // web worker
  function useMessageChannel() {
    var channel = new MessageChannel();
    channel.port1.onmessage = flush;
    return function () {
      return channel.port2.postMessage(0);
    };
  }

  function useSetTimeout() {
    return function () {
      return setTimeout(flush, 1);
    };
  }

  var queue$1 = new Array(1000);

  function flush() {
    for (var i = 0; i < len; i += 2) {
      var callback = queue$1[i];
      var arg = queue$1[i + 1];

      callback(arg);

      queue$1[i] = undefined;
      queue$1[i + 1] = undefined;
    }

    len = 0;
  }

  function attemptVertex() {
    try {
      var vertx = Function('return this')().require('vertx');
      vertxNext = vertx.runOnLoop || vertx.runOnContext;
      return useVertxTimer();
    } catch (e) {
      return useSetTimeout();
    }
  }

  var scheduleFlush$1 = void 0;
  // Decide what async method to use to triggering processing of queued callbacks:
  if (isNode) {
    scheduleFlush$1 = useNextTick();
  } else if (BrowserMutationObserver) {
    scheduleFlush$1 = useMutationObserver();
  } else if (isWorker) {
    scheduleFlush$1 = useMessageChannel();
  } else if (browserWindow === undefined && typeof require === 'function') {
    scheduleFlush$1 = attemptVertex();
  } else {
    scheduleFlush$1 = useSetTimeout();
  }

  // defaults
  config.async = asap;
  config.after = function (cb) {
    return setTimeout(cb, 0);
  };
  var cast = resolve$2;

  var async = function (callback, arg) {
    return config.async(callback, arg);
  };

  function on() {
    config.on.apply(config, arguments);
  }

  function off() {
    config.off.apply(config, arguments);
  }

  // Set up instrumentation through `window.__PROMISE_INTRUMENTATION__`
  if (typeof window !== 'undefined' && typeof window['__PROMISE_INSTRUMENTATION__'] === 'object') {
    var callbacks = window['__PROMISE_INSTRUMENTATION__'];
    configure('instrument', true);
    for (var eventName in callbacks) {
      if (callbacks.hasOwnProperty(eventName)) {
        on(eventName, callbacks[eventName]);
      }
    }
  }

  // the default export here is for backwards compat:
  //   https://github.com/tildeio/rsvp.js/issues/434
  var rsvp = {
    asap: asap,
    cast: cast,
    Promise: Promise,
    EventTarget: EventTarget,
    all: all$1,
    allSettled: allSettled,
    race: race$1,
    hash: hash,
    hashSettled: hashSettled,
    rethrow: rethrow,
    defer: defer,
    denodeify: denodeify,
    configure: configure,
    on: on,
    off: off,
    resolve: resolve$2,
    reject: reject$2,
    map: map,
    async: async,
    filter: filter
  };

  exports.default = rsvp;
  exports.asap = asap;
  exports.cast = cast;
  exports.Promise = Promise;
  exports.EventTarget = EventTarget;
  exports.all = all$1;
  exports.allSettled = allSettled;
  exports.race = race$1;
  exports.hash = hash;
  exports.hashSettled = hashSettled;
  exports.rethrow = rethrow;
  exports.defer = defer;
  exports.denodeify = denodeify;
  exports.configure = configure;
  exports.on = on;
  exports.off = off;
  exports.resolve = resolve$2;
  exports.reject = reject$2;
  exports.map = map;
  exports.async = async;
  exports.filter = filter;

  Object.defineProperty(exports, '__esModule', { value: true });

})));





//

var EPUBJS = EPUBJS || {};
EPUBJS.core = {};

var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var COMMENT_NODE = 8;
var DOCUMENT_NODE = 9;

//-- Get a element for an id
EPUBJS.core.getEl = function(elem) {
	return document.getElementById(elem);
};

//-- Get all elements for a class
EPUBJS.core.getEls = function(classes) {
	return document.getElementsByClassName(classes);
};

EPUBJS.core.request = function(url, type, withCredentials) {
	var supportsURL = window.URL;
	var BLOB_RESPONSE = supportsURL ? "blob" : "arraybuffer";
	var deferred = new RSVP.defer();
	var xhr = new XMLHttpRequest();
	var uri;

	//-- Check from PDF.js:
	//   https://github.com/mozilla/pdf.js/blob/master/web/compatibility.js
	var xhrPrototype = XMLHttpRequest.prototype;

	var handler = function() {
		var r;

		if (this.readyState != this.DONE) return;

		if ((this.status === 200 || this.status === 0) && this.response) { // Android & Firefox reporting 0 for local & blob urls
			if (type == 'xml'){
                // If this.responseXML wasn't set, try to parse using a DOMParser from text
                if(!this.responseXML) {
                    r = new DOMParser().parseFromString(this.response, "application/xml");
                } else {
                    r = this.responseXML;
                }
			} else if (type == 'xhtml') {
                if (!this.responseXML){
                    r = new DOMParser().parseFromString(this.response, "application/xhtml+xml");
                } else {
                    r = this.responseXML;
                }
			} else if (type == 'html') {
				if (!this.responseXML){
                    r = new DOMParser().parseFromString(this.response, "text/html");
                } else {
                    r = this.responseXML;
                }
			} else if (type == 'json') {
				r = JSON.parse(this.response);
			} else if (type == 'blob') {
				if (supportsURL) {
					r = this.response;
				} else {
					//-- Safari doesn't support responseType blob, so create a blob from arraybuffer
					r = new Blob([this.response]);
				}
			} else {
				r = this.response;
			}

			deferred.resolve(r);
		} else {
			deferred.reject({
				message : this.response,
				stack : new Error().stack
			});
		}
	};

	if (!('overrideMimeType' in xhrPrototype)) {
		// IE10 might have response, but not overrideMimeType
		Object.defineProperty(xhrPrototype, 'overrideMimeType', {
			value: function xmlHttpRequestOverrideMimeType(mimeType) {}
		});
	}

	xhr.onreadystatechange = handler;
	xhr.open("GET", url, true);

	if(withCredentials) {
		xhr.withCredentials = true;
	}

	// If type isn't set, determine it from the file extension
	if(!type) {
		uri = EPUBJS.core.uri(url);
		type = uri.extension;
		type = {
			'htm': 'html'
		}[type] || type;
	}

	if(type == 'blob'){
		xhr.responseType = BLOB_RESPONSE;
	}

	if(type == "json") {
		xhr.setRequestHeader("Accept", "application/json");
	}

	if(type == 'xml') {
		xhr.responseType = "document";
		xhr.overrideMimeType('text/xml'); // for OPF parsing
	}

	if(type == 'xhtml') {
		xhr.responseType = "document";
	}

	if(type == 'html') {
		xhr.responseType = "document";
 	}

	if(type == "binary") {
		xhr.responseType = "arraybuffer";
	}

	xhr.send();

	return deferred.promise;
};

EPUBJS.core.toArray = function(obj) {
	var arr = [];

	for (var member in obj) {
		var newitm;
		if ( obj.hasOwnProperty(member) ) {
			newitm = obj[member];
			newitm.ident = member;
			arr.push(newitm);
		}
	}

	return arr;
};

//-- Parse the different parts of a url, returning a object
EPUBJS.core.uri = function(url){
	var uri = {
				protocol : '',
				host : '',
				path : '',
				origin : '',
				directory : '',
				base : '',
				filename : '',
				extension : '',
				fragment : '',
				href : url
			},
			blob = url.indexOf('blob:'),
			doubleSlash = url.indexOf('://'),
			search = url.indexOf('?'),
			fragment = url.indexOf("#"),
			withoutProtocol,
			dot,
			firstSlash;

	if(blob === 0) {
		uri.protocol = "blob";
		uri.base = url.indexOf(0, fragment);
		return uri;
	}

	if(fragment != -1) {
		uri.fragment = url.slice(fragment + 1);
		url = url.slice(0, fragment);
	}

	if(search != -1) {
		uri.search = url.slice(search + 1);
		url = url.slice(0, search);
		href = uri.href;
	}

	if(doubleSlash != -1) {
		uri.protocol = url.slice(0, doubleSlash);
		withoutProtocol = url.slice(doubleSlash+3);
		firstSlash = withoutProtocol.indexOf('/');

		if(firstSlash === -1) {
			uri.host = uri.path;
			uri.path = "";
		} else {
			uri.host = withoutProtocol.slice(0, firstSlash);
			uri.path = withoutProtocol.slice(firstSlash);
		}


		uri.origin = uri.protocol + "://" + uri.host;

		uri.directory = EPUBJS.core.folder(uri.path);

		uri.base = uri.origin + uri.directory;
		// return origin;
	} else {
		uri.path = url;
		uri.directory = EPUBJS.core.folder(url);
		uri.base = uri.directory;
	}

	//-- Filename
	uri.filename = url.replace(uri.base, '');
	dot = uri.filename.lastIndexOf('.');
	if(dot != -1) {
		uri.extension = uri.filename.slice(dot+1);
	}
	return uri;
};

//-- Parse out the folder, will return everything before the last slash

EPUBJS.core.folder = function(url){

	var lastSlash = url.lastIndexOf('/');

	if(lastSlash == -1) var folder = '';

	folder = url.slice(0, lastSlash + 1);

	return folder;

};

//-- https://github.com/ebidel/filer.js/blob/master/src/filer.js#L128
EPUBJS.core.dataURLToBlob = function(dataURL) {
	var BASE64_MARKER = ';base64,',
		parts, contentType, raw, rawLength, uInt8Array;

	if (dataURL.indexOf(BASE64_MARKER) == -1) {
		parts = dataURL.split(',');
		contentType = parts[0].split(':')[1];
		raw = parts[1];

		return new Blob([raw], {type: contentType});
	}

	parts = dataURL.split(BASE64_MARKER);
	contentType = parts[0].split(':')[1];
	raw = window.atob(parts[1]);
	rawLength = raw.length;

	uInt8Array = new Uint8Array(rawLength);

	for (var i = 0; i < rawLength; ++i) {
		uInt8Array[i] = raw.charCodeAt(i);
	}

	return new Blob([uInt8Array], {type: contentType});
};

//-- Load scripts async: http://stackoverflow.com/questions/7718935/load-scripts-asynchronously
EPUBJS.core.addScript = function(src, callback, target) {
	var s, r;
	r = false;
	s = document.createElement('script');
	s.type = 'text/javascript';
	s.async = false;
	s.src = src;
	s.onload = s.onreadystatechange = function() {
		if ( !r && (!this.readyState || this.readyState == 'complete') ) {
			r = true;
			if(callback) callback();
		}
	};
	target = target || document.body;
	target.appendChild(s);
};

EPUBJS.core.addScripts = function(srcArr, callback, target) {
	var total = srcArr.length,
		curr = 0,
		cb = function(){
			curr++;
			if(total == curr){
				if(callback) callback();
			}else{
				EPUBJS.core.addScript(srcArr[curr], cb, target);
			}
		};

	EPUBJS.core.addScript(srcArr[curr], cb, target);
};

EPUBJS.core.addCss = function(src, callback, target) {
	var s, r;
	r = false;
	s = document.createElement('link');
	s.type = 'text/css';
	s.rel = "stylesheet";
	s.href = src;
	s.onload = s.onreadystatechange = function() {
		if ( !r && (!this.readyState || this.readyState == 'complete') ) {
			r = true;
			if(callback) callback();
		}
	};
	target = target || document.body;
	target.appendChild(s);
};

EPUBJS.core.prefixed = function(unprefixed) {
	var vendors = ["Webkit", "Moz", "O", "ms" ],
		prefixes = ['-Webkit-', '-moz-', '-o-', '-ms-'],
		upper = unprefixed[0].toUpperCase() + unprefixed.slice(1),
		length = vendors.length;

	if (typeof(document.documentElement.style[unprefixed]) != 'undefined') {
		return unprefixed;
	}

	for ( var i=0; i < length; i++ ) {
		if (typeof(document.documentElement.style[vendors[i] + upper]) != 'undefined') {
			return vendors[i] + upper;
		}
	}

	return unprefixed;
};

EPUBJS.core.resolveUrl = function(base, path) {
	var url,
		segments = [],
		uri = EPUBJS.core.uri(path),
		folders = base.split("/"),
		paths;

	if(uri.host) {
		return path;
	}

	folders.pop();

	paths = path.split("/");
	paths.forEach(function(p){
		if(p === ".."){
			folders.pop();
		}else{
			segments.push(p);
		}
	});

	url = folders.concat(segments);

	return url.join("/");
};

// http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
EPUBJS.core.uuid = function() {
	var d = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = (d + Math.random()*16)%16 | 0;
			d = Math.floor(d/16);
			return (c=='x' ? r : (r&0x7|0x8)).toString(16);
	});
	return uuid;
};

// Fast quicksort insert for sorted array -- based on:
// http://stackoverflow.com/questions/1344500/efficient-way-to-insert-a-number-into-a-sorted-array-of-numbers
EPUBJS.core.insert = function(item, array, compareFunction) {
	var location = EPUBJS.core.locationOf(item, array, compareFunction);
	array.splice(location, 0, item);

	return location;
};

EPUBJS.core.locationOf = function(item, array, compareFunction, _start, _end) {
	var start = _start || 0;
	var end = _end || array.length;
	var pivot = parseInt(start + (end - start) / 2);
	var compared;
	if(!compareFunction){
		compareFunction = function(a, b) {
			if(a > b) return 1;
			if(a < b) return -1;
			if(a = b) return 0;
		};
	}
	if(end-start <= 0) {
		return pivot;
	}

	compared = compareFunction(array[pivot], item);
	if(end-start === 1) {
		return compared > 0 ? pivot : pivot + 1;
	}

	if(compared === 0) {
		return pivot;
	}
	if(compared === -1) {
		return EPUBJS.core.locationOf(item, array, compareFunction, pivot, end);
	} else{
		return EPUBJS.core.locationOf(item, array, compareFunction, start, pivot);
	}
};

EPUBJS.core.indexOfSorted = function(item, array, compareFunction, _start, _end) {
	var start = _start || 0;
	var end = _end || array.length;
	var pivot = parseInt(start + (end - start) / 2);
	var compared;
	if(!compareFunction){
		compareFunction = function(a, b) {
			if(a > b) return 1;
			if(a < b) return -1;
			if(a = b) return 0;
		};
	}
	if(end-start <= 0) {
		return -1; // Not found
	}

	compared = compareFunction(array[pivot], item);
	if(end-start === 1) {
		return compared === 0 ? pivot : -1;
	}
	if(compared === 0) {
		return pivot; // Found
	}
	if(compared === -1) {
		return EPUBJS.core.indexOfSorted(item, array, compareFunction, pivot, end);
	} else{
		return EPUBJS.core.indexOfSorted(item, array, compareFunction, start, pivot);
	}
};


EPUBJS.core.queue = function(_scope){
	var _q = [];
	var scope = _scope;
	// Add an item to the queue
	var enqueue = function(funcName, args, context) {
		_q.push({
			"funcName" : funcName,
			"args"     : args,
			"context"  : context
		});
		return _q;
	};
	// Run one item
	var dequeue = function(){
		var inwait;
		if(_q.length) {
			inwait = _q.shift();
			// Defer to any current tasks
			// setTimeout(function(){
			scope[inwait.funcName].apply(inwait.context || scope, inwait.args);
			// }, 0);
		}
	};

	// Run All
	var flush = function(){
		while(_q.length) {
			dequeue();
		}
	};
	// Clear all items in wait
	var clear = function(){
		_q = [];
	};

	var length = function(){
		return _q.length;
	};

	return {
		"enqueue" : enqueue,
		"dequeue" : dequeue,
		"flush" : flush,
		"clear" : clear,
		"length" : length
	};
};

// From: https://code.google.com/p/fbug/source/browse/branches/firebug1.10/content/firebug/lib/xpath.js
/**
 * Gets an XPath for an element which describes its hierarchical location.
 */
EPUBJS.core.getElementXPath = function(element) {
	if (element && element.id) {
		return '//*[@id="' + element.id + '"]';
	} else {
		return EPUBJS.core.getElementTreeXPath(element);
	}
};

EPUBJS.core.getElementTreeXPath = function(element) {
	var paths = [];
	var 	isXhtml = (element.ownerDocument.documentElement.getAttribute('xmlns') === "http://www.w3.org/1999/xhtml");
	var index, nodeName, tagName, pathIndex;

	if(element.nodeType === Node.TEXT_NODE){
		// index = Array.prototype.indexOf.call(element.parentNode.childNodes, element) + 1;
		index = EPUBJS.core.indexOfTextNode(element) + 1;

		paths.push("text()["+index+"]");
		element = element.parentNode;
	}

	// Use nodeName (instead of localName) so namespace prefix is included (if any).
	for (; element && element.nodeType == 1; element = element.parentNode)
	{
		index = 0;
		for (var sibling = element.previousSibling; sibling; sibling = sibling.previousSibling)
		{
			// Ignore document type declaration.
			if (sibling.nodeType == Node.DOCUMENT_TYPE_NODE) {
				continue;
			}
			if (sibling.nodeName == element.nodeName) {
				++index;
			}
		}
		nodeName = element.nodeName.toLowerCase();
		tagName = (isXhtml ? "xhtml:" + nodeName : nodeName);
		pathIndex = (index ? "[" + (index+1) + "]" : "");
		paths.splice(0, 0, tagName + pathIndex);
	}

	return paths.length ? "./" + paths.join("/") : null;
};

EPUBJS.core.nsResolver = function(prefix) {
	var ns = {
		'xhtml' : 'http://www.w3.org/1999/xhtml',
		'epub': 'http://www.idpf.org/2007/ops'
	};
	return ns[prefix] || null;
};

//https://stackoverflow.com/questions/13482352/xquery-looking-for-text-with-single-quote/13483496#13483496
EPUBJS.core.cleanStringForXpath = function(str)  {
		var parts = str.match(/[^'"]+|['"]/g);
		parts = parts.map(function(part){
				if (part === "'")  {
						return '\"\'\"'; // output "'"
				}

				if (part === '"') {
						return "\'\"\'"; // output '"'
				}
				return "\'" + part + "\'";
		});
		return "concat(\'\'," + parts.join(",") + ")";
};

EPUBJS.core.indexOfTextNode = function(textNode){
	var parent = textNode.parentNode;
	var children = parent.childNodes;
	var sib;
	var index = -1;
	for (var i = 0; i < children.length; i++) {
		sib = children[i];
		if(sib.nodeType === Node.TEXT_NODE){
			index++;
		}
		if(sib == textNode) break;
	}

	return index;
};

// Underscore
EPUBJS.core.defaults = function(obj) {
  for (var i = 1, length = arguments.length; i < length; i++) {
    var source = arguments[i];
    for (var prop in source) {
      if (obj[prop] === void 0) obj[prop] = source[prop];
    }
  }
  return obj;
};

EPUBJS.core.extend = function(target) {
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function (source) {
      if(!source) return;
      Object.getOwnPropertyNames(source).forEach(function(propName) {
        Object.defineProperty(target, propName, Object.getOwnPropertyDescriptor(source, propName));
      });
    });
    return target;
};

EPUBJS.core.clone = function(obj) {
  return EPUBJS.core.isArray(obj) ? obj.slice() : EPUBJS.core.extend({}, obj);
};

EPUBJS.core.isElement = function(obj) {
    return !!(obj && obj.nodeType == 1);
};

EPUBJS.core.isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

EPUBJS.core.isString = function(str) {
  return (typeof str === 'string' || str instanceof String);
};

EPUBJS.core.isArray = Array.isArray || function(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
};

// Lodash
EPUBJS.core.values = function(object) {
	var index = -1;
	var props, length, result;

	if(!object) return [];

  props = Object.keys(object);
  length = props.length;
  result = Array(length);

  while (++index < length) {
    result[index] = object[props[index]];
  }
  return result;
};

EPUBJS.core.indexOfNode = function(node, typeId) {
	var parent = node.parentNode;
	var children = parent.childNodes;
	var sib;
	var index = -1;
	for (var i = 0; i < children.length; i++) {
		sib = children[i];
		if (sib.nodeType === typeId) {
			index++;
		}
		if (sib == node) break;
	}

	return index;
}

EPUBJS.core.indexOfTextNode = function(textNode) {
	return EPUBJS.core.indexOfNode(textNode, TEXT_NODE);
}

EPUBJS.core.indexOfElementNode = function(elementNode) {
	return EPUBJS.core.indexOfNode(elementNode, ELEMENT_NODE);
}

var EPUBJS = EPUBJS || {};
EPUBJS.reader = {};
EPUBJS.reader.plugins = {}; //-- Attach extra Controllers as plugins (like search?)

(function(root, $) {

	var previousReader = root.ePubReader || {};

	var ePubReader = root.ePubReader = function(path, options) {
		return new EPUBJS.Reader(path, options);
	};

	//exports to multiple environments
	if (typeof define === 'function' && define.amd) {
		//AMD
		define(function(){ return Reader; });
	} else if (typeof module != "undefined" && module.exports) {
		//Node
		module.exports = ePubReader;
	}

})(window, jQuery);

EPUBJS.Reader = function(bookPath, _options) {
	var reader = this;
	var book;
	var plugin;
	var $viewer = $("#viewer");
	var search = window.location.search;
	var parameters;

	this.settings = EPUBJS.core.defaults(_options || {}, {
		bookPath : bookPath,
		restore : false,
		reload : false,
		bookmarks : undefined,
		annotations : undefined,
		contained : undefined,
		bookKey : undefined,
		styles : undefined,
		sidebarReflow: false,
		generatePagination: false,
		history: true
	});

	// Overide options with search parameters
	if(search) {
		parameters = search.slice(1).split("&");
		parameters.forEach(function(p){
			var split = p.split("=");
			var name = split[0];
			var value = split[1] || '';
			reader.settings[name] = decodeURIComponent(value);
		});
	}

	this.setBookKey(this.settings.bookPath); //-- This could be username + path or any unique string

	if(this.settings.restore && this.isSaved()) {
		this.applySavedSettings();
	}

	this.settings.styles = this.settings.styles || {
		fontSize : "100%"
	};

	this.book = book = new ePub(this.settings.bookPath, this.settings);

	this.offline = false;
	this.sidebarOpen = false;
	if(!this.settings.bookmarks) {
		this.settings.bookmarks = [];
	}

	if(!this.settings.annotations) {
		this.settings.annotations = [];
	}

	if(this.settings.generatePagination) {
		book.generatePagination($viewer.width(), $viewer.height());
	}

	this.rendition = book.renderTo("viewer", {
		ignoreClass: "annotator-hl",
		width: "100%",
		height: "100%"
	});

	if(this.settings.previousLocationCfi) {
		this.displayed = this.rendition.display(this.settings.previousLocationCfi);
	} else {
		this.displayed = this.rendition.display();
	}

	book.ready.then(function () {
		reader.ReaderController = EPUBJS.reader.ReaderController.call(reader, book);
		reader.SettingsController = EPUBJS.reader.SettingsController.call(reader, book);
		reader.ControlsController = EPUBJS.reader.ControlsController.call(reader, book);
		reader.SidebarController = EPUBJS.reader.SidebarController.call(reader, book);
		reader.BookmarksController = EPUBJS.reader.BookmarksController.call(reader, book);
		reader.NotesController = EPUBJS.reader.NotesController.call(reader, book);

		window.addEventListener("hashchange", this.hashChanged.bind(this), false);

		document.addEventListener('keydown', this.adjustFontSize.bind(this), false);

		this.rendition.on("keydown", this.adjustFontSize.bind(this));
		this.rendition.on("keydown", reader.ReaderController.arrowKeys.bind(this));

		this.rendition.on("selected", this.selectedRange.bind(this));
	}.bind(this)).then(function() {
		reader.ReaderController.hideLoader();
	}.bind(this));

	// Call Plugins
	for(plugin in EPUBJS.reader.plugins) {
		if(EPUBJS.reader.plugins.hasOwnProperty(plugin)) {
			reader[plugin] = EPUBJS.reader.plugins[plugin].call(reader, book);
		}
	}

	book.loaded.metadata.then(function(meta) {
		reader.MetaController = EPUBJS.reader.MetaController.call(reader, meta);
	});

	book.loaded.navigation.then(function(navigation) {
		reader.TocController = EPUBJS.reader.TocController.call(reader, navigation);
	});

	window.addEventListener("beforeunload", this.unload.bind(this), false);

	return this;
};

EPUBJS.Reader.prototype.adjustFontSize = function(e) {
	var fontSize;
	var interval = 2;
	var PLUS = 187;
	var MINUS = 189;
	var ZERO = 48;
	var MOD = (e.ctrlKey || e.metaKey );

	if(!this.settings.styles) return;

	if(!this.settings.styles.fontSize) {
		this.settings.styles.fontSize = "100%";
	}

	fontSize = parseInt(this.settings.styles.fontSize.slice(0, -1));

	if(MOD && e.keyCode == PLUS) {
		e.preventDefault();
		this.book.setStyle("fontSize", (fontSize + interval) + "%");

	}

	if(MOD && e.keyCode == MINUS){

		e.preventDefault();
		this.book.setStyle("fontSize", (fontSize - interval) + "%");
	}

	if(MOD && e.keyCode == ZERO){
		e.preventDefault();
		this.book.setStyle("fontSize", "100%");
	}
};

EPUBJS.Reader.prototype.addBookmark = function(cfi) {
	var present = this.isBookmarked(cfi);
	if(present > -1 ) return;

	this.settings.bookmarks.push(cfi);

	this.trigger("reader:bookmarked", cfi);
};

EPUBJS.Reader.prototype.removeBookmark = function(cfi) {
	var bookmark = this.isBookmarked(cfi);
	if( bookmark === -1 ) return;

	this.settings.bookmarks.splice(bookmark, 1);

	this.trigger("reader:unbookmarked", bookmark);
};

EPUBJS.Reader.prototype.isBookmarked = function(cfi) {
	var bookmarks = this.settings.bookmarks;

	return bookmarks.indexOf(cfi);
};

/*
EPUBJS.Reader.prototype.searchBookmarked = function(cfi) {
	var bookmarks = this.settings.bookmarks,
			len = bookmarks.length,
			i;

	for(i = 0; i < len; i++) {
		if (bookmarks[i]['cfi'] === cfi) return i;
	}
	return -1;
};
*/

EPUBJS.Reader.prototype.clearBookmarks = function() {
	this.settings.bookmarks = [];
};

//-- Notes
EPUBJS.Reader.prototype.addNote = function(note) {
	this.settings.annotations.push(note);
};

EPUBJS.Reader.prototype.removeNote = function(note) {
	var index = this.settings.annotations.indexOf(note);
	if( index === -1 ) return;

	delete this.settings.annotations[index];

};

EPUBJS.Reader.prototype.clearNotes = function() {
	this.settings.annotations = [];
};

//-- Settings
EPUBJS.Reader.prototype.setBookKey = function(identifier){
	if(!this.settings.bookKey) {
		this.settings.bookKey = "epubjsreader:" + EPUBJS.VERSION + ":" + window.location.host + ":" + identifier;
	}
	return this.settings.bookKey;
};

//-- Checks if the book setting can be retrieved from localStorage
EPUBJS.Reader.prototype.isSaved = function(bookPath) {
	var storedSettings;

	if(!localStorage) {
		return false;
	}

	storedSettings = localStorage.getItem(this.settings.bookKey);

	if(storedSettings === null) {
		return false;
	} else {
		return true;
	}
};

EPUBJS.Reader.prototype.removeSavedSettings = function() {
	if(!localStorage) {
		return false;
	}

	localStorage.removeItem(this.settings.bookKey);
};

EPUBJS.Reader.prototype.applySavedSettings = function() {
		var stored;

		if(!localStorage) {
			return false;
		}

	try {
		stored = JSON.parse(localStorage.getItem(this.settings.bookKey));
	} catch (e) { // parsing error of localStorage
		return false;
	}

		if(stored) {
			// Merge styles
			if(stored.styles) {
				this.settings.styles = EPUBJS.core.defaults(this.settings.styles || {}, stored.styles);
			}
			// Merge the rest
			this.settings = EPUBJS.core.defaults(this.settings, stored);
			return true;
		} else {
			return false;
		}
};

EPUBJS.Reader.prototype.saveSettings = function(){
	if(this.book) {
		this.settings.previousLocationCfi = this.rendition.currentLocation().start.cfi;
	}

	if(!localStorage) {
		return false;
	}

	localStorage.setItem(this.settings.bookKey, JSON.stringify(this.settings));
};

EPUBJS.Reader.prototype.unload = function(){
	if(this.settings.restore && localStorage) {
		this.saveSettings();
	}
};


EPUBJS.Reader.prototype.hashChanged = function(){
	var hash = window.location.hash.slice(1);
	this.rendition.display(hash);
};

EPUBJS.Reader.prototype.selectedRange = function(cfiRange){
	var cfiFragment = "#"+cfiRange;

	// Update the History Location
	if(this.settings.history &&
			window.location.hash != cfiFragment) {
		// Add CFI fragment to the history
		history.pushState({}, '', cfiFragment);
		this.currentLocationCfi = cfiRange;
	}
};

//-- Enable binding events to reader
RSVP.EventTarget.mixin(EPUBJS.Reader.prototype);

EPUBJS.reader.BookmarksController = function() {
	var reader = this;
	var book = this.book;
	var rendition = this.rendition;

	var $bookmarks = $("#bookmarksView"),
			$list = $bookmarks.find("#bookmarks");

	var docfrag = document.createDocumentFragment();

	var show = function() {
		$bookmarks.show();
	};

	var hide = function() {
		$bookmarks.hide();
	};

	var counter = 0;

	var createBookmarkItem = function(cfi) {
		var listitem = document.createElement("li"),
				link = document.createElement("a");

		listitem.id = "bookmark-"+counter;
		listitem.classList.add('list_item');

		var spineItem = book.spine.get(cfi);
		var tocItem;
		if (spineItem.index in book.navigation.toc) {
			tocItem = book.navigation.toc[spineItem.index];
			link.textContent = tocItem.label;
		} else {
			link.textContent = cfi;
		}

		link.href = cfi;

		link.classList.add('bookmark_link');

		link.addEventListener("click", function(event){
				var cfi = this.getAttribute('href');
				rendition.display(cfi);
				event.preventDefault();
		}, false);

		listitem.appendChild(link);

		counter++;

		return listitem;
	};

	this.settings.bookmarks.forEach(function(cfi) {
		var bookmark = createBookmarkItem(cfi);
		docfrag.appendChild(bookmark);
	});

	$list.append(docfrag);

	this.on("reader:bookmarked", function(cfi) {
		var item = createBookmarkItem(cfi);
		$list.append(item);
	});

	this.on("reader:unbookmarked", function(index) {
		var $item = $("#bookmark-"+index);
		$item.remove();
	});

	return {
		"show" : show,
		"hide" : hide
	};
};

EPUBJS.reader.ControlsController = function(book) {
	var reader = this;
	var rendition = this.rendition;

	var $store = $("#store"),
			$fullscreen = $("#fullscreen"),
			$fullscreenicon = $("#fullscreenicon"),
			$cancelfullscreenicon = $("#cancelfullscreenicon"),
			$slider = $("#slider"),
			$main = $("#main"),
			$sidebar = $("#sidebar"),
			$settings = $("#setting"),
			$bookmark = $("#bookmark");
	/*
	var goOnline = function() {
		reader.offline = false;
		// $store.attr("src", $icon.data("save"));
	};

	var goOffline = function() {
		reader.offline = true;
		// $store.attr("src", $icon.data("saved"));
	};

	var fullscreen = false;

	book.on("book:online", goOnline);
	book.on("book:offline", goOffline);
	*/
	$slider.on("click", function () {
		if(reader.sidebarOpen) {
			reader.SidebarController.hide();
			$slider.addClass("icon-menu");
			$slider.removeClass("icon-right");
		} else {
			reader.SidebarController.show();
			$slider.addClass("icon-right");
			$slider.removeClass("icon-menu");
		}
	});

	if(typeof screenfull !== 'undefined') {
		$fullscreen.on("click", function() {
			screenfull.toggle($('#container')[0]);
		});
		if(screenfull.raw) {
			document.addEventListener(screenfull.raw.fullscreenchange, function() {
					fullscreen = screenfull.isFullscreen;
					if(fullscreen) {
						$fullscreen
							.addClass("icon-resize-small")
							.removeClass("icon-resize-full");
					} else {
						$fullscreen
							.addClass("icon-resize-full")
							.removeClass("icon-resize-small");
					}
			});
		}
	}

	$settings.on("click", function() {
		reader.SettingsController.show();
	});

	$bookmark.on("click", function() {
		var cfi = reader.rendition.currentLocation().start.cfi;
		var bookmarked = reader.isBookmarked(cfi);

		if(bookmarked === -1) { //-- Add bookmark
			reader.addBookmark(cfi);
			$bookmark
				.addClass("icon-bookmark")
				.removeClass("icon-bookmark-empty");
		} else { //-- Remove Bookmark
			reader.removeBookmark(cfi);
			$bookmark
				.removeClass("icon-bookmark")
				.addClass("icon-bookmark-empty");
		}

	});

	rendition.on('relocated', function(location){
		var cfi = location.start.cfi;
		var cfiFragment = "#" + cfi;
		//-- Check if bookmarked
		var bookmarked = reader.isBookmarked(cfi);
		if(bookmarked === -1) { //-- Not bookmarked
			$bookmark
				.removeClass("icon-bookmark")
				.addClass("icon-bookmark-empty");
		} else { //-- Bookmarked
			$bookmark
				.addClass("icon-bookmark")
				.removeClass("icon-bookmark-empty");
		}

		reader.currentLocationCfi = cfi;

		// Update the History Location
		if(reader.settings.history &&
				window.location.hash != cfiFragment) {
			// Add CFI fragment to the history
			history.pushState({}, '', cfiFragment);
		}
	});

	return {

	};
};

EPUBJS.reader.MetaController = function(meta) {
	var title = meta.title,
			author = meta.creator;

	var $title = $("#book-title"),
			$author = $("#chapter-title"),
			$dash = $("#title-seperator");

		document.title = title+" – "+author;

		$title.html(title);
		$author.html(author);
		$dash.show();
};

EPUBJS.reader.NotesController = function() {
	var book = this.book;
	var rendition = this.rendition;
	var reader = this;
	var $notesView = $("#notesView");
	var $notes = $("#notes");
	var $text = $("#note-text");
	var $anchor = $("#note-anchor");
	var annotations = reader.settings.annotations;
	var renderer = book.renderer;
	var popups = [];
	var epubcfi = new ePub.CFI();

	var show = function() {
		$notesView.show();
	};

	var hide = function() {
		$notesView.hide();
	}

	var insertAtPoint = function(e) {
		var range;
		var textNode;
		var offset;
		var doc = book.renderer.doc;
		var cfi;
		var annotation;

		// standard
		if (doc.caretPositionFromPoint) {
			range = doc.caretPositionFromPoint(e.clientX, e.clientY);
			textNode = range.offsetNode;
			offset = range.offset;
		// WebKit
		} else if (doc.caretRangeFromPoint) {
			range = doc.caretRangeFromPoint(e.clientX, e.clientY);
			textNode = range.startContainer;
			offset = range.startOffset;
		}

		if (textNode.nodeType !== 3) {
			for (var i=0; i < textNode.childNodes.length; i++) {
				if (textNode.childNodes[i].nodeType == 3) {
					textNode = textNode.childNodes[i];
					break;
				}
			}
			}

		// Find the end of the sentance
		offset = textNode.textContent.indexOf(".", offset);
		if(offset === -1){
			offset = textNode.length; // Last item
		} else {
			offset += 1; // After the period
		}

		cfi = epubcfi.generateCfiFromTextNode(textNode, offset, book.renderer.currentChapter.cfiBase);

		annotation = {
			annotatedAt: new Date(),
			anchor: cfi,
			body: $text.val()
		}

		// add to list
		reader.addNote(annotation);

		// attach
		addAnnotation(annotation);
		placeMarker(annotation);

		// clear
		$text.val('');
		$anchor.text("Attach");
		$text.prop("disabled", false);

		rendition.off("click", insertAtPoint);

	};

	var addAnnotation = function(annotation){
		var note = document.createElement("li");
		var link = document.createElement("a");

		note.innerHTML = annotation.body;
		// note.setAttribute("ref", annotation.anchor);
		link.innerHTML = " context &#187;";
		link.href = "#"+annotation.anchor;
		link.onclick = function(){
			rendition.display(annotation.anchor);
			return false;
		};

		note.appendChild(link);
		$notes.append(note);

	};

	var placeMarker = function(annotation){
		var doc = book.renderer.doc;
		var marker = document.createElement("span");
		var mark = document.createElement("a");
		marker.classList.add("footnotesuperscript", "reader_generated");

		marker.style.verticalAlign = "super";
		marker.style.fontSize = ".75em";
		// marker.style.position = "relative";
		marker.style.lineHeight = "1em";

		// mark.style.display = "inline-block";
		mark.style.padding = "2px";
		mark.style.backgroundColor = "#fffa96";
		mark.style.borderRadius = "5px";
		mark.style.cursor = "pointer";

		marker.id = "note-"+EPUBJS.core.uuid();
		mark.innerHTML = annotations.indexOf(annotation) + 1 + "[Reader]";

		marker.appendChild(mark);
		epubcfi.addMarker(annotation.anchor, doc, marker);

		markerEvents(marker, annotation.body);
	}

	var markerEvents = function(item, txt){
		var id = item.id;

		var showPop = function(){
			var poppos,
					iheight = renderer.height,
					iwidth = renderer.width,
			 		tip,
					pop,
					maxHeight = 225,
					itemRect,
					left,
					top,
					pos;


			//-- create a popup with endnote inside of it
			if(!popups[id]) {
				popups[id] = document.createElement("div");
				popups[id].setAttribute("class", "popup");

				pop_content = document.createElement("div");

				popups[id].appendChild(pop_content);

				pop_content.innerHTML = txt;
				pop_content.setAttribute("class", "pop_content");

				renderer.render.document.body.appendChild(popups[id]);

				//-- TODO: will these leak memory? - Fred
				popups[id].addEventListener("mouseover", onPop, false);
				popups[id].addEventListener("mouseout", offPop, false);

				//-- Add hide on page change
				rendition.on("locationChanged", hidePop, this);
				rendition.on("locationChanged", offPop, this);
				// chapter.book.on("renderer:chapterDestroy", hidePop, this);
			}

			pop = popups[id];


			//-- get location of item
			itemRect = item.getBoundingClientRect();
			left = itemRect.left;
			top = itemRect.top;

			//-- show the popup
			pop.classList.add("show");

			//-- locations of popup
			popRect = pop.getBoundingClientRect();

			//-- position the popup
			pop.style.left = left - popRect.width / 2 + "px";
			pop.style.top = top + "px";


			//-- Adjust max height
			if(maxHeight > iheight / 2.5) {
				maxHeight = iheight / 2.5;
				pop_content.style.maxHeight = maxHeight + "px";
			}

			//-- switch above / below
			if(popRect.height + top >= iheight - 25) {
				pop.style.top = top - popRect.height  + "px";
				pop.classList.add("above");
			}else{
				pop.classList.remove("above");
			}

			//-- switch left
			if(left - popRect.width <= 0) {
				pop.style.left = left + "px";
				pop.classList.add("left");
			}else{
				pop.classList.remove("left");
			}

			//-- switch right
			if(left + popRect.width / 2 >= iwidth) {
				//-- TEMP MOVE: 300
				pop.style.left = left - 300 + "px";

				popRect = pop.getBoundingClientRect();
				pop.style.left = left - popRect.width + "px";
				//-- switch above / below again
				if(popRect.height + top >= iheight - 25) {
					pop.style.top = top - popRect.height  + "px";
					pop.classList.add("above");
				}else{
					pop.classList.remove("above");
				}

				pop.classList.add("right");
			}else{
				pop.classList.remove("right");
			}

		}

		var onPop = function(){
			popups[id].classList.add("on");
		}

		var offPop = function(){
			popups[id].classList.remove("on");
		}

		var hidePop = function(){
			setTimeout(function(){
				popups[id].classList.remove("show");
			}, 100);
		}

		var openSidebar = function(){
			reader.ReaderController.slideOut();
			show();
		};

		item.addEventListener("mouseover", showPop, false);
		item.addEventListener("mouseout", hidePop, false);
		item.addEventListener("click", openSidebar, false);

	}
	$anchor.on("click", function(e){

		$anchor.text("Cancel");
		$text.prop("disabled", "true");
		// listen for selection
		rendition.on("click", insertAtPoint);

	});

	annotations.forEach(function(note) {
		addAnnotation(note);
	});

	/*
	renderer.registerHook("beforeChapterDisplay", function(callback, renderer){
		var chapter = renderer.currentChapter;
		annotations.forEach(function(note) {
			var cfi = epubcfi.parse(note.anchor);
			if(cfi.spinePos === chapter.spinePos) {
				try {
					placeMarker(note);
				} catch(e) {
					console.log("anchoring failed", note.anchor);
				}
			}
		});
		callback();
	}, true);
	*/

	return {
		"show" : show,
		"hide" : hide
	};
};

EPUBJS.reader.ReaderController = function(book) {
	var $main = $("#main"),
			$divider = $("#divider"),
			$loader = $("#loader"),
			$next = $("#next"),
			$prev = $("#prev");
	var reader = this;
	var book = this.book;
	var rendition = this.rendition;
	var slideIn = function() {
		var currentPosition = rendition.currentLocation().start.cfi;
		if (reader.settings.sidebarReflow){
			$main.removeClass('single');
			$main.one("transitionend", function(){
				rendition.resize();
			});
		} else {
			$main.removeClass("closed");
		}
	};

	var slideOut = function() {
		var location = rendition.currentLocation();
		if (!location) {
			return;
		}
		var currentPosition = location.start.cfi;
		if (reader.settings.sidebarReflow){
			$main.addClass('single');
			$main.one("transitionend", function(){
				rendition.resize();
			});
		} else {
			$main.addClass("closed");
		}
	};

	var showLoader = function() {
		$loader.show();
		hideDivider();
	};

	var hideLoader = function() {
		$loader.hide();

		//-- If the book is using spreads, show the divider
		// if(book.settings.spreads) {
		// 	showDivider();
		// }
	};

	var showDivider = function() {
		$divider.addClass("show");
	};

	var hideDivider = function() {
		$divider.removeClass("show");
	};

	var keylock = false;

	var arrowKeys = function(e) {
		if(e.keyCode == 37) {

			if(book.package.metadata.direction === "rtl") {
				rendition.next();
			} else {
				rendition.prev();
			}

			$prev.addClass("active");

			keylock = true;
			setTimeout(function(){
				keylock = false;
				$prev.removeClass("active");
			}, 100);

			 e.preventDefault();
		}
		if(e.keyCode == 39) {

			if(book.package.metadata.direction === "rtl") {
				rendition.prev();
			} else {
				rendition.next();
			}

			$next.addClass("active");

			keylock = true;
			setTimeout(function(){
				keylock = false;
				$next.removeClass("active");
			}, 100);

			 e.preventDefault();
		}
	}

	document.addEventListener('keydown', arrowKeys, false);

	$next.on("click", function(e){

		if(book.package.metadata.direction === "rtl") {
			rendition.prev();
		} else {
			rendition.next();
		}

		e.preventDefault();
	});

	$prev.on("click", function(e){

		if(book.package.metadata.direction === "rtl") {
			rendition.next();
		} else {
			rendition.prev();
		}

		e.preventDefault();
	});

	rendition.on("layout", function(props){
		if(props.spread === true) {
			showDivider();
		} else {
			hideDivider();
		}
	});

	rendition.on('relocated', function(location){
		if (location.atStart) {
			$prev.addClass("disabled");
		}
		if (location.atEnd) {
			$next.addClass("disabled");
		}
	});

	return {
		"slideOut" : slideOut,
		"slideIn"  : slideIn,
		"showLoader" : showLoader,
		"hideLoader" : hideLoader,
		"showDivider" : showDivider,
		"hideDivider" : hideDivider,
		"arrowKeys" : arrowKeys
	};
};

EPUBJS.reader.SettingsController = function() {
	var book = this.book;
	var reader = this;
	var $settings = $("#settings-modal"),
			$overlay = $(".overlay");

	var show = function() {
		$settings.addClass("md-show");
	};

	var hide = function() {
		$settings.removeClass("md-show");
	};

	var $sidebarReflowSetting = $('#sidebarReflow');

	$sidebarReflowSetting.on('click', function() {
		reader.settings.sidebarReflow = !reader.settings.sidebarReflow;
	});

	$settings.find(".closer").on("click", function() {
		hide();
	});

	$overlay.on("click", function() {
		hide();
	});

	return {
		"show" : show,
		"hide" : hide
	};
};
EPUBJS.reader.SidebarController = function(book) {
	var reader = this;

	var $sidebar = $("#sidebar"),
			$panels = $("#panels");

	var activePanel = "Toc";

	var changePanelTo = function(viewName) {
		var controllerName = viewName + "Controller";
		
		if(activePanel == viewName || typeof reader[controllerName] === 'undefined' ) return;
		reader[activePanel+ "Controller"].hide();
		reader[controllerName].show();
		activePanel = viewName;

		$panels.find('.active').removeClass("active");
		$panels.find("#show-" + viewName ).addClass("active");
	};
	
	var getActivePanel = function() {
		return activePanel;
	};
	
	var show = function() {
		reader.sidebarOpen = true;
		reader.ReaderController.slideOut();
		$sidebar.addClass("open");
	}

	var hide = function() {
		reader.sidebarOpen = false;
		reader.ReaderController.slideIn();
		$sidebar.removeClass("open");
	}

	$panels.find(".show_view").on("click", function(event) {
		var view = $(this).data("view");

		changePanelTo(view);
		event.preventDefault();
	});

	return {
		'show' : show,
		'hide' : hide,
		'getActivePanel' : getActivePanel,
		'changePanelTo' : changePanelTo
	};
};
EPUBJS.reader.TocController = function(toc) {
	var book = this.book;
	var rendition = this.rendition;

	var $list = $("#tocView"),
			docfrag = document.createDocumentFragment();

	var currentChapter = false;

	var generateTocItems = function(toc, level) {
		var container = document.createElement("ul");

		if(!level) level = 1;

		toc.forEach(function(chapter) {
			var listitem = document.createElement("li"),
					link = document.createElement("a");
					toggle = document.createElement("a");

			var subitems;

			listitem.id = "toc-"+chapter.id;
			listitem.classList.add('list_item');

			link.textContent = chapter.label;
			link.href = chapter.href;

			link.classList.add('toc_link');

			listitem.appendChild(link);

			if(chapter.subitems && chapter.subitems.length > 0) {
				level++;
				subitems = generateTocItems(chapter.subitems, level);
				toggle.classList.add('toc_toggle');

				listitem.insertBefore(toggle, link);
				listitem.appendChild(subitems);
			}


			container.appendChild(listitem);

		});

		return container;
	};

	var onShow = function() {
		$list.show();
	};

	var onHide = function() {
		$list.hide();
	};

	var chapterChange = function(e) {
		var id = e.id,
				$item = $list.find("#toc-"+id),
				$current = $list.find(".currentChapter"),
				$open = $list.find('.openChapter');

		if($item.length){

			if($item != $current && $item.has(currentChapter).length > 0) {
				$current.removeClass("currentChapter");
			}

			$item.addClass("currentChapter");

			// $open.removeClass("openChapter");
			$item.parents('li').addClass("openChapter");
		}
	};

	rendition.on('renderered', chapterChange);

	var tocitems = generateTocItems(toc);

	docfrag.appendChild(tocitems);

	$list.append(docfrag);
	$list.find(".toc_link").on("click", function(event){
			var url = this.getAttribute('href');

			event.preventDefault();

			//-- Provide the Book with the url to show
			//   The Url must be found in the books manifest
			rendition.display(url);

			$list.find(".currentChapter")
					.addClass("openChapter")
					.removeClass("currentChapter");

			$(this).parent('li').addClass("currentChapter");

	});

	$list.find(".toc_toggle").on("click", function(event){
			var $el = $(this).parent('li'),
					open = $el.hasClass("openChapter");

			event.preventDefault();
			if(open){
				$el.removeClass("openChapter");
			} else {
				$el.addClass("openChapter");
			}
	});

	return {
		"show" : onShow,
		"hide" : onHide
	};
};

//# sourceMappingURL=reader.js.map