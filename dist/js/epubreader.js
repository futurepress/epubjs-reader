/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 804:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isValue         = __webpack_require__(618)
  , isPlainFunction = __webpack_require__(205)
  , assign          = __webpack_require__(191)
  , normalizeOpts   = __webpack_require__(516)
  , contains        = __webpack_require__(981);

var d = (module.exports = function (dscr, value/*, options*/) {
	var c, e, w, options, desc;
	if (arguments.length < 2 || typeof dscr !== "string") {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (isValue(dscr)) {
		c = contains.call(dscr, "c");
		e = contains.call(dscr, "e");
		w = contains.call(dscr, "w");
	} else {
		c = w = true;
		e = false;
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
});

d.gs = function (dscr, get, set/*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== "string") {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (!isValue(get)) {
		get = undefined;
	} else if (!isPlainFunction(get)) {
		options = get;
		get = set = undefined;
	} else if (!isValue(set)) {
		set = undefined;
	} else if (!isPlainFunction(set)) {
		options = set;
		set = undefined;
	}
	if (isValue(dscr)) {
		c = contains.call(dscr, "c");
		e = contains.call(dscr, "e");
	} else {
		c = true;
		e = false;
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};


/***/ }),

/***/ 430:
/***/ ((module) => {



// eslint-disable-next-line no-empty-function
module.exports = function () {};


/***/ }),

/***/ 191:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



module.exports = __webpack_require__(560)() ? Object.assign : __webpack_require__(346);


/***/ }),

/***/ 560:
/***/ ((module) => {



module.exports = function () {
	var assign = Object.assign, obj;
	if (typeof assign !== "function") return false;
	obj = { foo: "raz" };
	assign(obj, { bar: "dwa" }, { trzy: "trzy" });
	return obj.foo + obj.bar + obj.trzy === "razdwatrzy";
};


/***/ }),

/***/ 346:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var keys  = __webpack_require__(103)
  , value = __webpack_require__(745)
  , max   = Math.max;

module.exports = function (dest, src /*, …srcn*/) {
	var error, i, length = max(arguments.length, 2), assign;
	dest = Object(value(dest));
	assign = function (key) {
		try {
			dest[key] = src[key];
		} catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < length; ++i) {
		src = arguments[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};


/***/ }),

/***/ 914:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var _undefined = __webpack_require__(430)(); // Support ES3 engines

module.exports = function (val) { return val !== _undefined && val !== null; };


/***/ }),

/***/ 103:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



module.exports = __webpack_require__(446)() ? Object.keys : __webpack_require__(137);


/***/ }),

/***/ 446:
/***/ ((module) => {



module.exports = function () {
	try {
		Object.keys("primitive");
		return true;
	} catch (e) {
		return false;
	}
};


/***/ }),

/***/ 137:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isValue = __webpack_require__(914);

var keys = Object.keys;

module.exports = function (object) { return keys(isValue(object) ? Object(object) : object); };


/***/ }),

/***/ 516:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isValue = __webpack_require__(914);

var forEach = Array.prototype.forEach, create = Object.create;

var process = function (src, obj) {
	var key;
	for (key in src) obj[key] = src[key];
};

// eslint-disable-next-line no-unused-vars
module.exports = function (opts1 /*, …options*/) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (!isValue(options)) return;
		process(Object(options), result);
	});
	return result;
};


/***/ }),

/***/ 290:
/***/ ((module) => {



module.exports = function (fn) {
	if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
	return fn;
};


/***/ }),

/***/ 745:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isValue = __webpack_require__(914);

module.exports = function (value) {
	if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
	return value;
};


/***/ }),

/***/ 981:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



module.exports = __webpack_require__(591)() ? String.prototype.contains : __webpack_require__(42);


/***/ }),

/***/ 591:
/***/ ((module) => {



var str = "razdwatrzy";

module.exports = function () {
	if (typeof str.contains !== "function") return false;
	return str.contains("dwa") === true && str.contains("foo") === false;
};


/***/ }),

/***/ 42:
/***/ ((module) => {



var indexOf = String.prototype.indexOf;

module.exports = function (searchString /*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};


/***/ }),

/***/ 370:
/***/ ((module, exports, __webpack_require__) => {



var d        = __webpack_require__(804)
  , callable = __webpack_require__(290)

  , apply = Function.prototype.apply, call = Function.prototype.call
  , create = Object.create, defineProperty = Object.defineProperty
  , defineProperties = Object.defineProperties
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , descriptor = { configurable: true, enumerable: false, writable: true }

  , on, once, off, emit, methods, descriptors, base;

on = function (type, listener) {
	var data;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) {
		data = descriptor.value = create(null);
		defineProperty(this, '__ee__', descriptor);
		descriptor.value = null;
	} else {
		data = this.__ee__;
	}
	if (!data[type]) data[type] = listener;
	else if (typeof data[type] === 'object') data[type].push(listener);
	else data[type] = [data[type], listener];

	return this;
};

once = function (type, listener) {
	var once, self;

	callable(listener);
	self = this;
	on.call(this, type, once = function () {
		off.call(self, type, once);
		apply.call(listener, this, arguments);
	});

	once.__eeOnceListener__ = listener;
	return this;
};

off = function (type, listener) {
	var data, listeners, candidate, i;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) return this;
	data = this.__ee__;
	if (!data[type]) return this;
	listeners = data[type];

	if (typeof listeners === 'object') {
		for (i = 0; (candidate = listeners[i]); ++i) {
			if ((candidate === listener) ||
					(candidate.__eeOnceListener__ === listener)) {
				if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];
				else listeners.splice(i, 1);
			}
		}
	} else {
		if ((listeners === listener) ||
				(listeners.__eeOnceListener__ === listener)) {
			delete data[type];
		}
	}

	return this;
};

emit = function (type) {
	var i, l, listener, listeners, args;

	if (!hasOwnProperty.call(this, '__ee__')) return;
	listeners = this.__ee__[type];
	if (!listeners) return;

	if (typeof listeners === 'object') {
		l = arguments.length;
		args = new Array(l - 1);
		for (i = 1; i < l; ++i) args[i - 1] = arguments[i];

		listeners = listeners.slice();
		for (i = 0; (listener = listeners[i]); ++i) {
			apply.call(listener, this, args);
		}
	} else {
		switch (arguments.length) {
		case 1:
			call.call(listeners, this);
			break;
		case 2:
			call.call(listeners, this, arguments[1]);
			break;
		case 3:
			call.call(listeners, this, arguments[1], arguments[2]);
			break;
		default:
			l = arguments.length;
			args = new Array(l - 1);
			for (i = 1; i < l; ++i) {
				args[i - 1] = arguments[i];
			}
			apply.call(listeners, this, args);
		}
	}
};

methods = {
	on: on,
	once: once,
	off: off,
	emit: emit
};

descriptors = {
	on: d(on),
	once: d(once),
	off: d(off),
	emit: d(emit)
};

base = defineProperties({}, descriptors);

module.exports = exports = function (o) {
	return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
};
exports.methods = methods;


/***/ }),

/***/ 372:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isPrototype = __webpack_require__(60);

module.exports = function (value) {
	if (typeof value !== "function") return false;

	if (!hasOwnProperty.call(value, "length")) return false;

	try {
		if (typeof value.length !== "number") return false;
		if (typeof value.call !== "function") return false;
		if (typeof value.apply !== "function") return false;
	} catch (error) {
		return false;
	}

	return !isPrototype(value);
};


/***/ }),

/***/ 940:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isValue = __webpack_require__(618);

// prettier-ignore
var possibleTypes = { "object": true, "function": true, "undefined": true /* document.all */ };

module.exports = function (value) {
	if (!isValue(value)) return false;
	return hasOwnProperty.call(possibleTypes, typeof value);
};


/***/ }),

/***/ 205:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isFunction = __webpack_require__(372);

var classRe = /^\s*class[\s{/}]/, functionToString = Function.prototype.toString;

module.exports = function (value) {
	if (!isFunction(value)) return false;
	if (classRe.test(functionToString.call(value))) return false;
	return true;
};


/***/ }),

/***/ 60:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isObject = __webpack_require__(940);

module.exports = function (value) {
	if (!isObject(value)) return false;
	try {
		if (!value.constructor) return false;
		return value.constructor.prototype === value;
	} catch (error) {
		return false;
	}
};


/***/ }),

/***/ 618:
/***/ ((module) => {



// ES3 safe
var _undefined = void 0;

module.exports = function (value) { return value !== _undefined && value !== null; };


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {

// EXTERNAL MODULE: ./node_modules/event-emitter/index.js
var event_emitter = __webpack_require__(370);
var event_emitter_default = /*#__PURE__*/__webpack_require__.n(event_emitter);
;// CONCATENATED MODULE: ./src/ui.js
/**
 * @author mrdoob (https://github.com/mrdoob/ui.js)
 */

const errormsg = 'is not an instance of UIElement.';

/**
 * UIElement
 * @param {object} dom
 */
class UIElement {

    constructor(dom) {

        this.dom = dom;
    }

    add() {

        for (let i = 0; i < arguments.length; i++) {

            const argument = arguments[i];

            if (argument instanceof UIElement) {

                this.dom.appendChild(argument.dom);

            } else if (Array.isArray(argument)) {
                
                for (let j = 0; j < argument.length; j++) {

                    const element = argument[j];

                    if (element instanceof UIElement) {

                        this.dom.appendChild(element.dom);

                    } else {

                        console.error('UIElement:', element, errormsg);
                    }
                }
                
            } else {

                console.error('UIElement:', argument, errormsg);
            }
        }

        return this;
    }

    remove() {

        for (let i = 0; i < arguments.length; i++) {

            const argument = arguments[i];

            if (argument instanceof UIElement) {

                this.dom.removeChild(argument.dom);

            } else {

                console.error('UIElement:', argument, errormsg);
            }
        }

        return this;
    }

    clear() {

        while (this.dom.children.length) {

            this.dom.removeChild(this.dom.lastChild);
        }
    }

    setId(id) {

        this.dom.id = id;
        return this;
    }

    getId() {

        return this.dom.id;
    }

    setClass(name) {

        this.dom.className = name;
        return this;
    }

    addClass(name) {

        this.dom.classList.add(name);
        return this;
    }

    removeClass(name) {

        this.dom.classList.remove(name);
        return this;
    }

    setStyle(style, array) {

        for (let i = 0; i < array.length; i++) {

            this.dom.style[style] = array[i];
        }

        return this;
    }

    setDisabled(value) {

        this.dom.disabled = value;
        return this;
    }

    setTextContent(value) {

        this.dom.textContent = value;
        return this;
    }

    getRect() {

        this.dom.getBoundingClientRect();
        return this;
    }
}

// properties

const properties = [
    'position',
    'left',
    'top',
    'right',
    'bottom',
    'width',
    'height',
    'border',
    'borderLeft',
    'borderTop',
    'borderRight',
    'borderBottom',
    'borderColor',
    'display',
    'overflow',
    'margin',
    'marginLeft',
    'marginTop',
    'marginRight',
    'marginBottom',
    'padding',
    'paddingLeft',
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'color',
    'background',
    'backgroundColor',
    'opacity',
    'fontSize',
    'fontWeight',
    'textAlign',
    'textDecoration',
    'textTransform',
    'cursor',
    'zIndex'
];

properties.forEach(function (property) {

    const method = 'set' +
        property.substr(0, 1).toUpperCase() +
        property.substr(1, property.length);

    UIElement.prototype[method] = function () {

        this.setStyle(property, arguments);

        return this;
    };
});

// events

const events = [
    'KeyUp', 
    'KeyDown', 
    'MouseOver', 
    'MouseOut', 
    'Click', 
    'DblClick', 
    'Change', 
    'Input'
];

events.forEach(function (event) {

    const method = 'on' + event;

    UIElement.prototype[method] = function (callback) {

        this.dom.addEventListener(event.toLowerCase(), callback.bind(this), false);
        return this;
    };
});

/**
 * UISpan
 */
class UISpan extends UIElement {

    constructor() {

        super(document.createElement('span'));
    }
}

/**
 * UIDiv
 */
class UIDiv extends UIElement {

    constructor() {

        super(document.createElement('div'));
    }
}

/**
 * UIRow
 */
class UIRow extends UIDiv {

    constructor() {

        super();
        this.dom.className = 'row';
    }
}

/**
 * UIPanel
 */
class UIPanel extends UIDiv {

    constructor() {

        super();
        this.dom.className = 'panel';
    }
}

class UILabel extends UIElement {

    constructor(text, id) {

        super(document.createElement('label'));
        this.dom.textContent = text;
        if (id) this.dom.htmlFor = id;
    }
}

/**
 * UIText
 * @param {any} text
 */
class UIText extends UISpan {

    constructor(text) {

        super();
        this.setValue(text);
    }

    getValue() {

        return this.dom.textContent;
    }

    setValue(value) {

        if (value !== undefined) {

            this.dom.textContent = value;
        }

        return this;
    }
}

/**
 * UILink
 * @param {*} uri
 * @param {*} label
 */
class UILink extends UIElement {

    constructor(uri, label) {

        super(document.createElement('a'));
        this.dom.href = uri;
        this.dom.textContent = label;
    }
}

/**
 * UIInput
 * @param {any} value
 */
class UIInput extends UIElement {

    constructor(type, value, title) {

        super(document.createElement('input'));

        this.dom.type = type;
        this.dom.addEventListener('keydown', function (event) {

            event.stopPropagation();

        }, false);

        this.setValue(value);
        this.setTitle(title);
    }

    getName() {

        return this.dom.name;
    }

    setName(name) {

        this.dom.name = name;
        return this;
    }

    getType() {

        return this.dom.type;
    }

    setType(type) {

        this.dom.type = type;
        return this;
    }

    getValue() {

        return this.dom.value;
    }

    setValue(value) {

        if (value !== undefined) {
            this.dom.value = value;
        }
        return this;
    }

    getTitle() {

        return this.dom.title;
    }

    setTitle(text) {

        if (text !== undefined) {
            this.dom.title = text;
        }
        return this;
    }

    readonly(value) {

        this.dom.readOnly = value;
        return this;
    }
}

/**
 * UITextArea
 */
class UITextArea extends UIElement {

    constructor() {

        super(document.createElement('textarea'));

        this.dom.spellcheck = false;
        this.dom.addEventListener('keydown', function (event) {

            event.stopPropagation();

            if (event.keyCode === 9) {

                event.preventDefault();

                const cursor = dom.selectionStart;

                this.dom.value = this.dom.value.substring(0, cursor) + '\t' + this.dom.value.substring(cursor);
                this.dom.selectionStart = cursor + 1;
                this.dom.selectionEnd = this.dom.selectionStart;
            }

        }, false);
    }

    getValue() {

        return this.dom.value;
    }

    setValue(value) {

        this.dom.value = value;
        return this;
    }
}

/**
 * The <select> element is used to create a drop-down list.
 */
class UISelect extends UIElement {

    constructor() {

        super(document.createElement('select'));
    }

    setMultiple(boolean) {

        this.dom.multiple = boolean || false;
        return this;
    }

    setOptions(options) {

        const selected = this.dom.value;

        while (this.dom.children.length > 0) {

            this.dom.removeChild(this.dom.firstChild);
        }

        for (const key in options) {

            const option = document.createElement('option');
            option.value = key;
            option.innerHTML = options[key];
            this.dom.appendChild(option);
        }

        this.dom.value = selected;

        return this;
    }

    getValue() {

        return this.dom.value;
    }

    setValue(value) {

        value = String(value);

        if (this.dom.value !== value) {

            this.dom.value = value;
        }

        return this;
    }
}

/**
 * UICheckbox
 * @param {boolean} value
 */
class UICheckbox extends (/* unused pure expression or super */ null && (UIElement)) {

    constructor(value) {

        super(document.createElement('input'));

        this.dom.type = 'checkbox';
        this.setValue(value);
    }

    getName() {

        return this.dom.name;
    }

    setName(name) {

        this.dom.name = name;
        return this;
    }

    getValue() {

        return this.dom.checked;
    }

    setValue(value) {

        if (value !== undefined) {

            this.dom.checked = value;
        }
        return this;
    }
}

/**
 * UIColor
 */
class UIColor extends (/* unused pure expression or super */ null && (UIElement)) {

    constructor() {

        super(document.createElement('input'));

        try {

            this.dom.type = 'color';
            this.dom.value = '#ffffff';

        } catch (e) {

            console.exception(e);
        }
    }

    getValue() {

        return this.dom.value;
    }

    getHexValue() {

        return parseInt(this.dom.value.substr(1), 16);
    }

    setValue(value) {

        this.dom.value = value;
        return this;
    }

    setHexValue(hex) {

        this.dom.value = '#' + ('000000' + hex.toString(16)).slice(-6);
        return this;
    }
}

/**
 * UINumber
 * @param {any} number
 */
class UINumber extends (/* unused pure expression or super */ null && (UIElement)) {

    constructor(number) {

        super(document.createElement('input'));

        
        this.dom.type = 'number';
        this.dom.value = '0.00';

        this.value = 0;

        this.min = - Infinity;
        this.max = + Infinity;

        this.precision = 2;
        this.step = 1;
        this.unit = '';
        this.nudge = 0.01;

        this.setValue(number);

        const scope = this;

        const changeEvent = document.createEvent('HTMLEvents');
        changeEvent.initEvent('change', true, true);

        let distance = 0;
        let onMouseDownValue = 0;

        const pointer = { x: 0, y: 0 };
        const prevPointer = { x: 0, y: 0 };

        function onMouseDown(event) {

            event.preventDefault();

            distance = 0;

            onMouseDownValue = scope.value;

            prevPointer.x = event.clientX;
            prevPointer.y = event.clientY;

            document.addEventListener('mousemove', onMouseMove, false);
            document.addEventListener('mouseup', onMouseUp, false);
        }

        function onMouseMove(event) {

            const currentValue = scope.value;

            pointer.x = event.clientX;
            pointer.y = event.clientY;

            distance += (pointer.x - prevPointer.x) - (pointer.y - prevPointer.y);

            let value = onMouseDownValue + (distance / (event.shiftKey ? 5 : 50)) * scope.step;
            value = Math.min(scope.max, Math.max(scope.min, value));

            if (currentValue !== value) {

                scope.setValue(value);
                scope.dom.dispatchEvent(changeEvent);
            }

            prevPointer.x = event.clientX;
            prevPointer.y = event.clientY;
        }

        function onMouseUp() {

            document.removeEventListener('mousemove', onMouseMove, false);
            document.removeEventListener('mouseup', onMouseUp, false);

            if (Math.abs(distance) < 2) {

                scope.dom.focus();
                scope.dom.select();
            }
        }

        function onTouchStart(event) {

            if (event.touches.length === 1) {

                distance = 0;

                onMouseDownValue = scope.value;

                prevPointer.x = event.touches[0].pageX;
                prevPointer.y = event.touches[0].pageY;

                document.addEventListener('touchmove', onTouchMove, false);
                document.addEventListener('touchend', onTouchEnd, false);
            }
        }

        function onTouchMove(event) {

            const currentValue = scope.value;

            pointer.x = event.touches[0].pageX;
            pointer.y = event.touches[0].pageY;

            distance += (pointer.x - prevPointer.x) - (pointer.y - prevPointer.y);

            let value = onMouseDownValue + (distance / (event.shiftKey ? 5 : 50)) * scope.step;
            value = Math.min(scope.max, Math.max(scope.min, value));

            if (currentValue !== value) {

                scope.setValue(value);
                scope.dom.dispatchEvent(changeEvent);
            }

            prevPointer.x = event.touches[0].pageX;
            prevPointer.y = event.touches[0].pageY;
        }

        function onTouchEnd(event) {

            if (event.touches.length === 0) {

                document.removeEventListener('touchmove', onTouchMove, false);
                document.removeEventListener('touchend', onTouchEnd, false);
            }
        }

        function onChange() {

            scope.setValue(this.value);
        }

        //function onFocus() {
        //    dom.style.backgroundColor = '';
        //    dom.style.cursor = '';
        //}
        //function onBlur() {
        //    dom.style.backgroundColor = 'transparent';
        //    dom.style.cursor = 'ns-resize';
        //}

        function onKeyDown(event) {

            event.stopPropagation();

            switch (event.keyCode) {

                //case 13: // enter
                //    dom.blur();
                //    break;
                case 38: // up
                    event.preventDefault();
                    scope.setValue(scope.getValue() + scope.nudge);
                    scope.dom.dispatchEvent(changeEvent);
                    break;
                case 40: // down
                    event.preventDefault();
                    scope.setValue(scope.getValue() - scope.nudge);
                    scope.dom.dispatchEvent(changeEvent);
                    break;
            }
        }

        //onBlur();
        this.dom.addEventListener('keydown', onKeyDown, false);
        this.dom.addEventListener('mousedown', onMouseDown, false);
        this.dom.addEventListener('touchstart', onTouchStart, false);
        this.dom.addEventListener('change', onChange, false);
        //dom.addEventListener('focus', onFocus, false);
        //dom.addEventListener('blur', onBlur, false);
    }

    getName() {

        return this.dom.name;
    }

    setName(name) {

        this.dom.name = name;
        return this;
    }

    getValue() {

        return parseFloat(this.dom.value);
    }

    setValue(value) {

        if (value !== undefined) {

            value = parseFloat(value);

            if (value < this.min)
                value = this.min;
            if (value > this.max)
                value = this.max;

            this.value = value;
            this.dom.value = value.toFixed(this.precision);

            if (this.unit !== '')
                this.dom.value += ' ' + this.unit;
        }

        return this;
    }

    setPrecision(precision) {

        this.precision = precision;
        return this;
    }

    setStep(step) {

        this.step = step;
        return this;
    }

    setNudge(nudge) {

        this.nudge = nudge;
        return this;
    }

    setRange(min, max) {

        this.min = min;
        this.max = max;

        return this;
    }

    setUnit(unit) {

        this.unit = unit;
        return this;
    }

    setTitle(text) {

        this.dom.title = text;
        return this;
    }
}

/**
 * UIInteger
 * @param {number} value
 * @param {number} step
 * @param {number} min
 * @param {number} max
 */
class UIInteger extends UIElement {

    constructor(value, step, min, max) {

        super(document.createElement('input'));

        this.dom.type = 'number';
        this.dom.value = value;

        if (step != undefined)
        {
            this.dom.step = step;
        }
        
        if (min !== undefined)
        {
            this.dom.min = min;
        }

        if (max !== undefined)
        {
            this.dom.max = max;
        }
    }

    getValue() {

        return this.dom.value;
    }

    setValue(value) {

        if (value !== undefined) {
            
            this.dom.value = value;
        }
        return this;
    }
}

/**
 * UIBreak
 */
class UIBreak extends (/* unused pure expression or super */ null && (UIElement)) {

    constructor() {

        super(document.createElement('br'));

        this.dom.className = 'Break';
    }
}

/**
 * UIHorizontalRule
 */
class UIHorizontalRule extends (/* unused pure expression or super */ null && (UIElement)) {

    constructor() {

        super(document.createElement('hr'));

        this.dom.className = 'HorizontalRule';
    }
}

/**
 * UIButton
 * @param {any} value
 */
class UIButton extends (/* unused pure expression or super */ null && (UIElement)) {

    constructor(value) {

        super(document.createElement('input'));

        this.dom.type = 'button';

        if (value !== undefined) {

            this.dom.value = value;
        }

        return this;
    }

    setValue(value) {

        this.dom.value = value;
        return this;
    }
}

class UIProgress extends (/* unused pure expression or super */ null && (UIElement)) {

    constructor(value) {

        super(document.createElement('progress'));

        this.dom.value = value;
    }

    setValue(value) {

        this.dom.value = value;
    }
}

/**
 * UITabbedPanel
 */
class UITabbedPanel extends UIDiv {

    /**
     * Constructor
     * @param {*} align (horizontal | vertical)
     */
    constructor(align) {

        super();

        this.tabs = [];
        this.panels = [];
        this.selector = new UISpan().setClass('tab-selector');

        this.tabsDiv = new UIDiv();
        this.tabsDiv.dom.className = 'tabs';
        this.tabsDiv.add(this.selector);

        this.panelsDiv = new UIDiv();
        this.panelsDiv.dom.className = 'panels';

        this.add(this.tabsDiv);
        this.add(this.panelsDiv);

        this.align = align || 'horizontal';
        this.selected = '';
    }

    select(id) {

        let tab;
        let panel;

        // Deselect current selection
        if (this.selected && this.selected.length) {

            tab = this.tabs.find((item) => {

                return item.dom.id === this.selected;
            });

            panel = this.panels.find((item) => {

                return item.dom.id === this.selected;
            });

            if (tab) {

                tab.removeClass('selected');
            }

            if (panel) {

                panel.setDisplay('none');
            }
        }

        tab = this.tabs.find(function (item) {

            return item.dom.id === id;
        });

        panel = this.panels.find(function (item) {

            return item.dom.id === id;
        });

        if (tab) {

            tab.addClass('selected');
            //
            // transforming the tab-selector element
            //
            let size;
            const rect = tab.dom.getBoundingClientRect();
            if (this.align === 'horizontal') {
                size = rect.width * this.tabs.indexOf(tab);
                this.selector.dom.style.transform = `translateX(${size}px)`;
            } else {
                size = rect.height * this.tabs.indexOf(tab);
                this.selector.dom.style.transform = `translateY(${size}px)`;
            }
        }

        if (panel) {

            panel.setDisplay('');
        }

        this.selected = id;

        return this;
    }

    addTab(id, label, items) {

        const tab = new UITab(label, this);
        tab.setId(id);
        tab.setClass('tab');
        this.tabs.push(tab);
        this.tabsDiv.add(tab);

        const panel = new UIDiv();
        panel.setId(id);
        panel.add(items);
        panel.setDisplay('none');
        this.panels.push(panel);
        this.panelsDiv.add(panel);

        this.select(id);
    }
}

/**
 * UITab
 */
class UITab extends UIDiv {

    constructor(text, parent) {

        super(text);

        this.button = new UIInput('button');
        this.button.dom.title = text;
        this.parent = parent;
        this.dom.addEventListener('click', () => {

            this.parent.select(this.dom.id);

        });
        this.add(this.button);
    }
}

/**
 * UIListbox
 */
class UIListbox extends (/* unused pure expression or super */ null && (UIElement)) {

    constructor() {

        super(document.createElement('select'));
        
        this.dom.multiple = true;

        this.items = [];
        this.listItems = [];
        this.selectedIndex = -1;
        this.selectedValue = null;

        return this;
    }

    setItems(items) {

        this.items = items;
        this.dom.options.length = 0;

        for (let i = 0; i < items.length; i++) {

            this.setItem(items[i]);
        }
    }

    selectIndex(index) {

        this.selectValue(index);
    }

    selectValue(index) {

        let value = null;

        for (let i = 0; i < this.dom.options.length; i++) {

            const option = this.dom.options[i];

            if (index === i) {

                option.selected = true;
                option.className = 'selected';
                value = parseInt(option.value);

            } else {

                option.selected = false;
                option.className = '';
            }
        }

        this.selectedValue = value;
        this.selectedIndex = index;
    }

    getValue() {

        return this.selectedValue;
    }

    setItem(item) {

        const option = document.createElement('option');
        option.value = item.id;
        option.text = item.type;
        option.addEventListener('click', (event) => {

            this.selectValue(event.target.index);

        }, false);

        this.dom.appendChild(option);
        this.listItems.push(item);

        return this;
    }
}

/**
 * UITreeView
 */
class UITreeView extends UIElement {

    constructor() {

        super(document.createElement('ul'));
    }
}

/**
 * UITreeViewItem
 * @param {*} id
 * @param {*} link
 * @param {*} parent
 */
class UITreeViewItem extends UIElement {

    constructor(id, link, parent) {

        super(document.createElement('li'));
        this.dom.id = id;
        this.link = link;
        this.parent = parent;
        this.toggle = new UISpan().setClass('toggle-collapsed');
        this.expander = new UIDiv().setId('expander');
        this.expanded = false;
        this.selected = false;
        this.add([this.expander, this.link]);
    }

    setItems(subItems) {

        this.add(subItems);
        this.toggle.dom.onclick = () => {

            if (this.expanded) {
                this.collaps();
            } else {
                this.expand();
            }
            return false;
        };
        this.expander.add(this.toggle);

        if (!this.expanded) {

            const items = subItems.dom.getElementsByTagName('li');
            for (let item of items) {
                if (item.className === 'selected') {
                    this.expand();
                    break;
                }
            }
        }
    }

    select() {

        this.selected = true;
        this.setClass('selected');
    }

    unselect() {

        this.selected = false;
        this.dom.removeAttribute('class');
    }

    expand() {

        this.toggle.setClass('toggle-expanded');
        this.dom.children[2].style.display = 'block';
        this.expanded = true;
    }

    collaps() {

        this.toggle.setClass('toggle-collapsed');
        this.dom.children[2].style.display = 'none';
        this.expanded = false;
    }
}



;// CONCATENATED MODULE: ./src/panels/metadata_panel.js


class MetadataPanel extends UIPanel {
	
	constructor(reader) {
		
		super();
		super.setId('metadata');

		this.title = new UIText().setId('book-title');
		this.creator = new UIText().setId('book-creator');
		this.separator = new UIText().setId('book-title-separator');

		super.add([this.title, this.separator, this.creator]);

		//-- events --//

		reader.on('metadata', (meta) => {

			this.init(meta);
		});
	}

	init(meta) {
		
		document.title = meta.title + " – " + meta.creator;

		this.title.setValue(meta.title);
		this.creator.setValue(meta.creator);
		this.separator.dom.style.display = 'inline-block';
	}
}

;// CONCATENATED MODULE: ./src/toolbar.js



class Toolbar {
    
    constructor(reader) {

        const strings = reader.strings;

        const container = new UIDiv().setId('toolbar');

        const start = new UIPanel().setId('start');
        const opener = new UIInput('button').setId('btn-s');
        const openerStr = strings.get('toolbar/opener');
        opener.dom.title = openerStr;
        opener.dom.onclick = () => {

            const isOpen = opener.dom.classList.length > 0;

            reader.emit('sidebaropener', !isOpen);

            if (!isOpen) {
                opener.addClass('open');
            } else {
                opener.removeClass('open');
            }
        };

        start.add(opener);

        const center = new MetadataPanel(reader);

        const end = new UIPanel().setId('end');
        const open = new UIInput('file').setId('btn-o');
        const uploadStr = strings.get('toolbar/openbook');
        const storage = window.storage;
        open.dom.title = uploadStr;
        open.dom.accept = 'application/epub+zip';
        open.dom.addEventListener('change', function (e) {

            if (e.target.files.length === 0)
                return;

            if (window.FileReader) {

                const fr = new FileReader();
                fr.onload = function (e) {
                    storage.clear();
                    storage.set(e.target.result, () => {
                        reader.unload();
                        reader.init(e.target.result, { restore: true });
                    });
                };
                fr.readAsArrayBuffer(e.target.files[0]);
                fr.onerror = function (e) {
                    console.error(e);
                };

                if (window.location.href.includes("?bookPath=")) {
                    window.location.href = window.location.origin + window.location.pathname;
                }

            } else {
                alert(strings.get('toolbar/openbook/error'));
            }
        }, false);

        end.add(open);

        const bookmark = new UIInput('button').setId('btn-b');
        const bookmarkStr = strings.get('toolbar/bookmark');
        bookmark.dom.title = bookmarkStr;
        bookmark.dom.addEventListener('click', () => {

            const cfi = reader.rendition.currentLocation().start.cfi;
            reader.emit('bookmarked', reader.isBookmarked(cfi) === -1);
        });

        end.add(bookmark);

        if (document.fullscreenEnabled) {
            
            const fullscreen = new UIInput('button').setId('btn-f');
            const fullscreenStr = strings.get('toolbar/fullsceen');
            fullscreen.dom.title = fullscreenStr;
            fullscreen.dom.addEventListener('click', () => {
                
                this.toggleFullScreen();
            });

            document.addEventListener('keydown', (e) => {
            
                if (e.key === 'F11') {
                    e.preventDefault();
                    this.toggleFullScreen();
                }
            }, false);

            document.addEventListener('fullscreenchange', (e) => {

                const w = window.screen.width === e.path[2].innerWidth;
                const h = window.screen.height === e.path[2].innerHeight;
                
                if (w && h) {
                    fullscreen.addClass('resize-small');
                } else {
                    fullscreen.removeClass('resize-small');
                }
            }, false);

            end.add(fullscreen);
        }

        container.add([start, center, end]);
        document.body.appendChild(container.dom);

        //-- events --//

        reader.on('relocated', (location) => {

            const cfi = location.start.cfi;

            if (reader.isBookmarked(cfi) === -1) {
                bookmark.removeClass('bookmarked');
            } else {
                bookmark.addClass('bookmarked');
            }
        });

        reader.on('bookmarked', (value) => {

            if (value) {
                bookmark.addClass('bookmarked');
            } else {
                bookmark.removeClass('bookmarked');
            }
        });
    }

    toggleFullScreen() {
        
        document.activeElement.blur();
        
        if (document.fullscreenElement === null) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

;// CONCATENATED MODULE: ./src/panels/toc_panel.js


class TocPanel extends UIPanel {
    
    constructor(reader) {
        
        super();
        super.setId('contents');

        this.reader = reader;
        this.selector = undefined; // save reference to selected tree item

        //-- events --//

        reader.on('navigation', (toc) => {

            this.init(toc);
        });
    }

    init(toc) {

        super.clear();
        super.add(this.generateToc(toc));
    }

    generateToc(toc, parent) {

        const container = new UITreeView();

        toc.forEach((chapter) => {

            const link = new UILink(chapter.href, chapter.label);
            const treeItem = new UITreeViewItem(chapter.id, link, parent);

            link.dom.onclick = () => {

                this.reader.rendition.display(chapter.href);
                if (this.selector && this.selector !== treeItem) {
                    this.selector.unselect();
                }
                treeItem.select();
                this.selector = treeItem;
                this.reader.emit('tocselected', chapter.id);
                return false;
            };

            if (this.reader.settings.sectionId === chapter.id) {
                treeItem.select();
                this.selector = treeItem;
            }

            if (chapter.subitems && chapter.subitems.length > 0) {
                
                treeItem.setItems(this.generateToc(chapter.subitems, treeItem));
            }

            container.add(treeItem);
        });

        return container;
    }
}

;// CONCATENATED MODULE: ./src/panels/bookmarks_panel.js


class BookmarksPanel extends UIPanel {

    constructor(reader) {
        
        super();
        super.setId('bookmarks');

        const strings = reader.strings;

        const ctrlRow = new UIRow();
        const ctrlStr = [
            strings.get('sidebar/bookmarks/add'),
            strings.get('sidebar/bookmarks/remove'),
            strings.get('sidebar/bookmarks/clear'),
        ];
        const btn_a = new UIInput('button', ctrlStr[0]).addClass('btn-start');
        const btn_r = new UIInput('button', ctrlStr[1]).addClass('btn-medium');
        const btn_c = new UIInput('button', ctrlStr[2]).addClass('btn-end');

        btn_a.dom.onclick = () => {

            reader.emit('bookmarked', true);
            return false;
        };

        btn_r.dom.onclick = () => {

            reader.emit('bookmarked', false);
            return false;
        };

        btn_c.dom.onclick = () => {

            this.clearBookmarks();
            reader.emit('bookmarked', false);
            return false;
        };

        ctrlRow.add([btn_a, btn_r, btn_c]);

        this.reader = reader;
        this.bookmarks = document.createElement('ul');
        
        super.add(ctrlRow);
        this.dom.appendChild(this.bookmarks);

        const update = () => {

            btn_r.dom.disabled = reader.settings.bookmarks.length === 0;
            btn_c.dom.disabled = reader.settings.bookmarks.length === 0;
        };

        //-- events --//

        reader.on ('bookready', () => {

            reader.settings.bookmarks.forEach((cfi) => {
                
                const bookmark = this.createBookmarkItem(cfi);
                this.bookmarks.appendChild(bookmark);
            });

            update();
        });

        reader.on('relocated', (location) => {

            const cfi = location.start.cfi;
            const val = reader.isBookmarked(cfi) === -1;
            btn_a.dom.disabled = !val;
            btn_r.dom.disabled = val;
        });

        reader.on('bookmarked', (value) => {

            const cfi = reader.rendition.currentLocation().start.cfi;

            if (value) {
                this.addBookmark(cfi);
                btn_a.dom.disabled = true;
            } else {
                this.removeBookmark(cfi);
                btn_a.dom.disabled = false;
            }

            update();
        });
    }

    addBookmark(cfi) {

        if (this.reader.isBookmarked(cfi) > -1)
            return;

        const bookmark = this.createBookmarkItem(cfi);
        this.bookmarks.appendChild(bookmark);
        this.reader.settings.bookmarks.push(cfi);
    }

    removeBookmark(cfi) {

        const index = this.reader.isBookmarked(cfi);
        if (index === -1)
            return;

        this.bookmarks.removeChild(this.bookmarks.childNodes[index]);
        this.reader.settings.bookmarks.splice(index, 1);
    }

    clearBookmarks() {

        this.reader.settings.bookmarks = [];
        while (this.bookmarks.hasChildNodes()) {
            this.bookmarks.removeChild(this.bookmarks.lastChild);
        }
    }

    createBookmarkItem(cfi) {

        const item = document.createElement('li');
        const link = document.createElement('a');

        const book = this.reader.book;
        const spineItem = book.spine.get(cfi);
        
        if (spineItem.index in book.navigation.toc) {
            const tocItem = book.navigation.toc[spineItem.index];
            item.id = tocItem.id;
            link.textContent = tocItem.label;
        } else {
            link.textContent = cfi;
        }

        link.href = "#" + cfi;
        link.onclick = () => {

            this.reader.rendition.display(cfi);
            return false;
        };

        item.appendChild(link);
        return item;
    }
}

;// CONCATENATED MODULE: ./src/panels/annotations_panel.js


class AnnotationsPanel extends UIPanel {

	constructor(reader) {
		
		super();
		super.setId('annotations');

		const strings = reader.strings;
		const ctrlStr = [
			strings.get('sidebar/annotations/add'),
			strings.get('sidebar/annotations/clear')
		];

		this.reader = reader;
		this.notes = document.createElement('ul');

		const textBox = new UITextArea();
		textBox.dom.addEventListener('input', (e) => {

			if (isSelected() && e.target.value.length > 0) {
				btn_a.dom.disabled = false;
			} else {
				btn_a.dom.disabled = true;
			}
		});

		const selector = {
			range: undefined,
			cfiRange: undefined
		};

		const textRow = new UIRow();
		const ctrlRow = new UIRow();

		const btn_a = new UIInput('button', ctrlStr[0]).addClass('btn-start');
		btn_a.dom.disabled = true;
		btn_a.dom.onclick = () => {

			const note = {
				date: new Date(),
				text: textBox.getValue(),
				href: selector.cfiRange,
				uuid: reader.uuid()
			};

			reader.settings.annotations.push(note);

			this.add(note);

			textBox.setValue('');
			btn_a.dom.disabled = true;
			return false;
		};

		const btn_c = new UIInput('button', ctrlStr[1]).addClass('btn-end');
		btn_c.dom.disabled = true;
		btn_c.dom.onclick = () => {

			this.clearNotes();
			return false;
		};

		textRow.add(textBox);
		ctrlRow.add([btn_a, btn_c]);

		super.add([textRow, ctrlRow]);
		this.dom.appendChild(this.notes);

		this.update = () => {

			btn_c.dom.disabled = reader.settings.annotations.length === 0;
		};

		const isSelected = () => {

			return selector.range && selector.range.startOffset !== selector.range.endOffset;
		};

		//-- events --//

		reader.on('bookready', () => {

			reader.settings.annotations.forEach((note) => {

				this.add(note);
			});
		});

		reader.on('selected', (cfiRange, contents) => {

			selector.range = contents.range(cfiRange);
			selector.cfiRange = cfiRange;

			if (isSelected() && textBox.getValue().length > 0) {
				btn_a.dom.disabled = false;
			} else {
				btn_a.dom.disabled = true;
			}
		});

		reader.on('unselected', () => {

			btn_a.dom.disabled = true;
		});
	}

	add(note) {

		const item = document.createElement('li');
		const link = document.createElement('a');
		const btnr = document.createElement('span');
		const call = () => {};
		
		link.href = "#" + note.href;
		link.textContent = note.text;
		link.onclick = () => {

			this.reader.rendition.display(note.href);
			return false;
		};

		item.id = 'note-' + note.uuid;
		item.appendChild(link);

		btnr.className = 'btn-remove';
		btnr.onclick = () => {
			
			this.remove(note);
			return false;
		};
		
		item.appendChild(btnr);

		this.notes.appendChild(item);
		this.reader.rendition.annotations.add(
			"highlight", note.href, {}, call, "note-highlight", {});
		this.update();
	}

	remove(note) {

		const index = this.reader.settings.annotations.indexOf(note);
		if (index === -1)
			return;

		this.notes.removeChild(this.notes.childNodes[index]);
		this.reader.settings.annotations.splice(index, 1);
		this.reader.rendition.annotations.remove(note.href, "highlight");
		this.update();
	}

	clearNotes() {

		const len = this.reader.settings.annotations.length;
		for(let i = 0; i < len; i++) {

			this.remove(this.reader.settings.annotations[i]);
		}
	}
}

;// CONCATENATED MODULE: ./src/panels/search_panel.js


class SearchPanel extends UIPanel {

    constructor(reader) {

        super();
        super.setId('search');
        
        const strings = reader.strings;

        let searchQuery = undefined;
        const searchBox = new UIInput('search');
        searchBox.dom.placeholder = strings.get('sidebar/search/placeholder');
        searchBox.dom.onsearch = () => {

            const value = searchBox.getValue();
            
            if (value.length === 0) {
                this.clear();
            } else if (searchQuery !== value) {
                this.clear();
                this.doSearch(value).then(results => {

                    results.forEach(item => {
                        this.set(item);
                    });
                });
            }
            searchQuery = value;
        };

        const ctrlRow = new UIRow();
        ctrlRow.add(searchBox);
        super.add(ctrlRow);

        this.items = document.createElement('ul');
        this.dom.appendChild(this.items);
        this.reader = reader;
        //
        // improvement of the highlighting of keywords is required...
        //
    }

    /**
     * Searching the entire book
     * @param {*} q Query keyword
     * @returns The search result array.
     */
    async doSearch(q) {

        const book = this.reader.book;
        const results = await Promise.all(
            book.spine.spineItems.map(item => item.load(book.load.bind(book))
            .then(item.find.bind(item, q)).finally(item.unload.bind(item))));
        return await Promise.resolve([].concat.apply([], results));
    }

    set(data) {

        const item = document.createElement('li');
        const link = document.createElement('a');

        link.href = "#" + data.cfi;
        link.textContent = data.excerpt;
        link.onclick = () => {

            this.reader.rendition.display(data.cfi);
            return false;
        };

        item.appendChild(link);
        this.items.appendChild(item);
    }

    clear() {

        while (this.items.hasChildNodes()) {
            this.items.removeChild(this.items.lastChild);
        }
    }
}
;// CONCATENATED MODULE: ./src/panels/settings_panel.js


class SettingsPanel extends UIPanel {

	constructor(reader) {

		super();
		super.setId('settings');
		
		const strings = reader.strings;

		const languageStr = strings.get('sidebar/settings/language');
		const languageRow = new UIRow();
		const language = new UISelect().setOptions({
			en: 'English', 
			fr: 'French', 
			ja: 'Japanese', 
			ru: 'Russian'
		});
		language.dom.addEventListener('change', (e) => {

			reader.settings.language = e.target.value;
		});

		languageRow.add(new UILabel(languageStr));
		languageRow.add(language);

		const fontSizeStr = strings.get('sidebar/settings/fontsize');
		const fontSizeRow = new UIRow();
		const fontSize = new UIInteger(100, 1);
		fontSize.dom.addEventListener('change', (e) => {

			reader.emit('fontresize', e.target.value);
		});

		fontSizeRow.add(new UILabel(fontSizeStr));
		fontSizeRow.add(fontSize);

		const reflowTextStr = strings.get('sidabar/settings/reflowtext');
		const reflowTextRow = new UIRow();
		const reflowText = new UIInput('checkbox', false, reflowTextStr[1]);
		reflowText.setId('reflowtext');
		reflowText.dom.addEventListener('click', (e) => {

			reader.settings.reflowText = e.target.checked;
			reader.rendition.resize();
		});

		reflowTextRow.add(new UILabel(reflowTextStr[0], 'reflowtext'));
		reflowTextRow.add(reflowText);

		const paginationStr = strings.get('sidebar/settings/pagination');
		const paginationRow = new UIRow();
		const pagination = new UIInput('checkbox', false, paginationStr[1]);
		pagination.setId('pagination');
		pagination.dom.addEventListener('click', (e) => {

			reader.settings.pagination = e.target.checked;
			reader.generatePagination(); // not implemented
		});

		paginationRow.add(new UILabel(paginationStr[0], 'pagination'));
		paginationRow.add(pagination);

		super.add([
			languageRow,
			fontSizeRow,
			//reflowTextRow,
			//paginationRow
		]);

		//-- events --//

		reader.on('bookready', () => {

			language.setValue(reader.settings.language);
		});

		reader.on('fontresize', (value) => {

			if (fontSize.getValue() !== value) {
				fontSize.setValue(value);
			}
		});
	}
}

;// CONCATENATED MODULE: ./src/sidebar.js







class Sidebar {
    
    constructor(reader) {
        
        const strings = reader.strings;
        const tabs = [
            strings.get('sidebar/contents'),
            strings.get('sidebar/bookmarks'),
            strings.get('sidebar/annotations'),
            strings.get('sidebar/search'),
            strings.get('sidebar/settings')
        ];

        this.toc = new TocPanel(reader);
        this.bookmarks = new BookmarksPanel(reader);
        this.annotations = new AnnotationsPanel(reader);
        this.search = new SearchPanel(reader);
        this.settings = new SettingsPanel(reader);

        this.container = new UITabbedPanel('vertical').setId('sidebar');

        this.container.addTab('tab-t', tabs[0], this.toc);
        this.container.addTab('tab-b', tabs[1], this.bookmarks);
        this.container.addTab('tab-n', tabs[2], this.annotations);
        this.container.addTab('tab-s', tabs[3], this.search);
        this.container.addTab('tab-c', tabs[4], this.settings);

        this.container.select('tab-t');

        document.body.appendChild(this.container.dom);
    }
}
;// CONCATENATED MODULE: ./src/content.js


class Content {

    constructor(reader) {
        
        this.main = new UIDiv().setId('content');
        this.main.dom.addEventListener('transitionend', (e) => {

            if (reader.settings.sidebarReflow) {
                reader.rendition.resize();
            }
        });

        const prev = new UIDiv().setId('prev').setClass('arrow');
        prev.dom.onclick = (e) => {

            reader.emit('prev');
            e.preventDefault();
        };
        prev.add(new UILabel('<'));

        const next = new UIDiv().setId('next').setClass('arrow');
        next.dom.onclick = (e) => {
            
            reader.emit('next');
            e.preventDefault();
        };
        next.add(new UILabel('>'));

        const viewer  = new UIDiv().setId('viewer');
        const divider = new UIDiv().setId('divider');
        const loader  = new UIDiv().setId('loader');

        const showDivider = () => {
            divider.dom.style.display = 'block';
        };

        const hideDivider = () => {
            divider.dom.style.display = 'none';
        };

        const showLoader = () => {
            loader.dom.style.display = 'block';
            hideDivider();
        };

        const hideLoader = () => {
            loader.dom.style.display = 'none';

            //-- If the book is using spreads, show the divider
            if(reader.book.settings.spreads) {
                showDivider();
            }
        };

        this.main.add([prev, viewer, next, divider, loader]);

        this.reader = reader;
        
        document.body.appendChild(this.main.dom);

        //-- events --//

        reader.on('bookloaded', () => {

            hideLoader();
        });

        reader.on('sidebaropener', (value) => {
            
            if (value) {
                this.slideOut();
            } else {
                this.slideIn();
            }
        });

        reader.on('layout', (props) => {

            if (props.spread === true && props.width > props.spreadWidth) {
                showDivider();
            } else {
                hideDivider();
            }
        });

        reader.on('relocated', (location) => {

            if (location.atStart) {
                prev.addClass('disabled');
            } else {
                prev.removeClass('disabled');
            }

            if (location.atEnd) {
                next.addClass('disabled');
            } else {
                next.removeClass('disabled');
            }
        });

        reader.on('prev', () => {

            prev.addClass('active');
            setTimeout(() => { prev.removeClass('active'); }, 100);
        });

        reader.on('next', () => {

            next.addClass('active');
            setTimeout(() => { next.removeClass('active'); }, 100);
        });

        reader.on('viewercleanup', () => {

            viewer.clear();
        });
    }

    slideIn() {

        //var currentPosition = rendition.currentLocation().start.cfi;
        if (this.reader.settings.sidebarReflow) {
            //this.main.removeClass('single');
        } else {
            //this.main.removeClass('closed');
        }

        this.main.removeClass('single');
        this.main.removeClass('closed');
    }

    slideOut() {
        /*
        var location = rendition.currentLocation();
        if (!location) {
            return;
        }
        var currentPosition = location.start.cfi;
        */
        if (this.reader.settings.sidebarReflow) {
            this.main.addClass('single');
        } else {
            this.main.addClass('closed');
        }
    }
}
;// CONCATENATED MODULE: ./src/strings.js
class Strings {

    constructor(reader) {

        this.language = reader.settings.language || 'en';
        this.values = {
            en: {
                'toolbar/opener': 'Sidebar',
                'toolbar/openbook': 'Open book',
                'toolbar/openbook/error': 'Your browser does not support the required features.\nPlease use a modern browser such as Google Chrome, or Mozilla Firefox.',
                'toolbar/bookmark': 'Add this page to bookmarks',
                'toolbar/fullsceen': 'Fullscreen',

                'sidebar/contents': 'Contents',
                'sidebar/bookmarks': 'Bookmarks',
                'sidebar/bookmarks/add': 'Add',
                'sidebar/bookmarks/remove': 'Remove',
                'sidebar/bookmarks/clear': 'Clear',
                'sidebar/annotations': 'Annotations',
                'sidebar/annotations/add': 'Add',
                'sidebar/annotations/clear': 'Clear',
                'sidebar/annotations/anchor': 'Anchor',
                'sidebar/annotations/cancel': 'Cancel',
                'sidebar/search': 'Search',
                'sidebar/search/placeholder': 'search',
                'sidebar/settings': 'Settings',
                'sidebar/settings/language': 'Language',
                'sidebar/settings/fontsize': 'Font size (%)',
                'sidabar/settings/reflowtext': ['Reflow text', 'Reflow text when sidebars are open'],
                'sidebar/settings/pagination': ['Pagination', 'Generate pagination']
            },
            fr: {
                'toolbar/opener': 'Barre latérale',
                'toolbar/openbook': 'Ouvrir un livre local',
                'toolbar/openbook/error': 'Votre navigateur ne prend pas en charge les fonctions nécessaires.\nVeuillez utiliser un navigateur moderne tel que Google Chrome ou Mozilla Firefox.',
                'toolbar/bookmark': 'Insérer un marque page ici',
                'toolbar/fullsceen': 'Plein écran',

                'sidebar/contents': 'Sommaire',
                'sidebar/bookmarks': 'Marque-pages',
                'sidebar/bookmarks/add': 'Ajouter',
                'sidebar/bookmarks/remove': 'Retirer',
                'sidebar/bookmarks/clear': 'Tout enlever',
                'sidebar/annotations': 'Annotations',
                'sidebar/annotations/add': 'Ajouter',
                'sidebar/annotations/clear': 'Tout enlever',
                'sidebar/annotations/anchor': 'Ancre',
                'sidebar/annotations/cancel': 'Annuler',
                'sidebar/search': 'Rechercher',
                'sidebar/search/placeholder': 'rechercher',
                'sidebar/settings': 'Réglages',
                'sidebar/settings/language': 'Langue',
                'sidebar/settings/fontsize': '???',
                'sidabar/settings/reflowtext': ['Réagencer', 'Réagencer les lignes lorsque le panneau latéral est ouvert'],
                'sidebar/settings/pagination': ['Pagination', 'Établir une pagination']
            },
            ja: {
                'toolbar/opener': 'サイドバー',
                'toolbar/openbook': '本を開く',
                'toolbar/openbook/error': 'ご利用のブラウザは必要な機能をサポートしていません。\nGoogle Chrome、Mozilla Firefox、その他のモダンなブラウザでご利用ください。',
                'toolbar/bookmark': 'このページに栞を設定する',
                'toolbar/fullsceen': 'フルスクリーン',

                'sidebar/contents': '目次',
                'sidebar/bookmarks': '栞',
                'sidebar/bookmarks/add': '追加',
                'sidebar/bookmarks/remove': '削除',
                'sidebar/bookmarks/clear': 'クリア',
                'sidebar/annotations': '注釈',
                'sidebar/annotations/add': '追加',
                'sidebar/annotations/clear': 'クリア',
                'sidebar/annotations/anchor': 'アンカー',
                'sidebar/annotations/cancel': 'キャンセル',
                'sidebar/search': '検索',
                'sidebar/search/placeholder': '検索',
                'sidebar/settings': '設定',
                'sidebar/settings/language': '表示言語',
                'sidebar/settings/fontsize': '???',
                'sidabar/settings/reflowtext': ['再配置', 'サイドバーを開いた時に、テキストを再配置します。'],
                'sidebar/settings/pagination': ['ページネーション', 'ページネーションを生成します。']
            },
            ru: {
                'toolbar/opener': 'Боковая панель',
                'toolbar/openbook': 'Открыть книгу',
                'toolbar/openbook/error': 'Ваш браузер не поддерживает необходимые функции.\nПожалуйста, используйте современный браузер, такой как Google Chrome или Mozilla Firefox.',
                'toolbar/bookmark': 'Добавить эту страницу в закладки',
                'toolbar/fullsceen': 'Полноэкранный режим',

                'sidebar/contents': 'Содержание',
                'sidebar/bookmarks': 'Закладки',
                'sidebar/bookmarks/add': 'Добавить',
                'sidebar/bookmarks/remove': 'Удалить',
                'sidebar/bookmarks/clear': 'Очистить',
                'sidebar/annotations': 'Аннотации',
                'sidebar/annotations/add': 'Добавить',
                'sidebar/annotations/clear': 'Очистить',
                'sidebar/annotations/anchor': 'Метка',
                'sidebar/annotations/cancel': 'Отмена',
                'sidebar/search': 'Поиск',
                'sidebar/search/placeholder': 'поиск...',
                'sidebar/settings': 'Настройки',
                'sidebar/settings/language': 'Язык',
                'sidebar/settings/fontsize': 'Размер шрифта',
                'sidabar/settings/reflowtext': ['Перекомпоновать текст', 'Перекомпоновать текст при открытых боковых панелях'],
                'sidebar/settings/pagination': ['Нумерация страниц', 'Генерировать нумерацию страниц']
            }
        };
    }

    get(key) { return this.values[this.language][key] || '???'; }
}

;// CONCATENATED MODULE: ./src/reader.js







class Reader {

    constructor(bookPath, _options) {

        this.settings = undefined;
        this.cfgInit(bookPath, _options);

        this.strings = new Strings(this);
        this.toolbar = new Toolbar(this);
        this.sidebar = new Sidebar(this);
        this.content = new Content(this);

        this.book = undefined;
        this.rendition = undefined;
        this.displayed = undefined;

        this.init();

        window.addEventListener('beforeunload', this.unload.bind(this), false);
        window.addEventListener('hashchange', this.hashChanged.bind(this), false);
        window.addEventListener('keydown', this.keyboardHandler.bind(this), false);
        window.addEventListener('wheel', (e) => {
            if (e.ctrlKey) {
                e.preventDefault();
            }
        }, { passive: false });
    }

    /**
     * Initialize book.
     * @param {*} bookPath 
     * @param {*} _options 
     */
    init(bookPath, _options) {

        this.emit('viewercleanup');
        
        if (arguments.length > 0) {

            this.cfgInit(bookPath, _options);
        }

        this.book = ePub(this.settings.bookPath);
        this.rendition = this.book.renderTo('viewer', {
            width: '100%',
            height: '100%'
        });

        const cfi = this.settings.previousLocationCfi;
        if (cfi) {
            this.displayed = this.rendition.display(cfi);
        } else {
            this.displayed = this.rendition.display();
        }

        this.displayed.then((renderer) => {
            this.emit('renderered', renderer);
        });

        this.book.ready.then(function () {
            if (this.settings.pagination) {
                this.generatePagination();
            }
            this.emit('bookready');
            this.emit('fontresize', parseInt(this.settings.styles.fontSize));
        }.bind(this)).then(function () {
            this.emit('bookloaded');
        }.bind(this));

        this.book.loaded.metadata.then((meta) => {
            this.emit('metadata', meta);
        });

        this.book.loaded.navigation.then((toc) => {
            this.emit('navigation', toc);
        });

        this.rendition.on('click', (e) => {
            const selection = e.view.document.getSelection();
            const range = selection.getRangeAt(0);
            if (range.startOffset === range.endOffset) {
                this.emit('unselected');
            }
        });

        this.rendition.on('layout', (props) => {
            this.emit('layout', props);
        });

        this.rendition.on('selected', (cfiRange, contents) => {
            this.setLocation(cfiRange);
            this.emit('selected', cfiRange, contents);
        });

        this.rendition.on('relocated', (location) => {
            this.setLocation(location.start.cfi);
            this.emit('relocated', location);
        });

        this.on('fontresize', (value) => {
            const fontSize = value + "%";
            this.settings.styles.fontSize = fontSize;
            this.rendition.themes.fontSize(fontSize);
        });

        this.on('prev', () => {
            if (this.book.package.metadata.direction === 'rtl') {
                this.rendition.next();
            } else {
                this.rendition.prev();
            }
        });

        this.on('next', () => {
            if (this.book.package.metadata.direction === 'rtl') {
                this.rendition.prev();
            } else {
                this.rendition.next();
            }
        });

        this.on('tocselected', (sectionId) => {
            this.settings.sectionId = sectionId;
        });
    }

    /* ------------------------------- Common ------------------------------- */

    defaults(obj) {

        for (let i = 1, length = arguments.length; i < length; i++) {
            const source = arguments[i];
            for (let prop in source) {
                if (obj[prop] === void 0)
                    obj[prop] = source[prop];
            }
        }
        return obj;
    }

    uuid() {

        let d = new Date().getTime();
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16);
        });
        return uuid;
    }

    /* ------------------------------ Bookmarks ----------------------------- */

    /**
     * Verifying the current page in bookmarks.
     * @param {*} cfi 
     * @returns The index of the bookmark if it exists, or -1 otherwise.
     */
    isBookmarked(cfi) {

        return this.settings.bookmarks.indexOf(cfi);
    }

    /* ----------------------------- Annotations ---------------------------- */

    isAnnotated(note) {

        return this.settings.annotations.indexOf(note);
    }

    /* ------------------------------ Settings ------------------------------ */

    /**
     * Initialize book settings.
     * @param {*} bookPath
     * @param {*} _options
     */
    cfgInit(bookPath, _options) {

        this.settings = this.defaults(_options || {}, {
            bookKey: this.getBookKey(bookPath),
            bookPath: bookPath,
            restore: false,
            history: true,
            reload: false, // ??
            bookmarks: undefined,
            annotations: undefined,
            contained: undefined,
            sectionId: undefined,
            styles: undefined,
            reflowText: false, // ??
            pagination: false, // ??
            language: undefined
        });

        if (this.settings.restore && this.isSaved()) {
            this.applySavedSettings();
        }

        if (this.settings.bookmarks === undefined) {
            this.settings.bookmarks = [];
        }

        if (this.settings.annotations === undefined) {
            this.settings.annotations = [];
        }

        if (this.settings.styles === undefined) {
            this.settings.styles = { fontSize: '100%' };
        }

        if (this.settings.language === undefined) {
            this.settings.language = 'en';
        }
    }
    
    /**
     * Get book key.
     * @param {*} identifier (url | blob)
     * @returns Book key (MD5).
     */
    getBookKey(identifier) {

        return 'epubjs-reader:' + md5(identifier);
    }
    
    /**
     * Set book key in settings.
     * @param {*} identifier (url | blob)
     * @returns Current book key.
     */
    setBookKey(identifier) {

        if (this.settings.bookKey === undefined) {
            this.settings.bookKey = this.getBookKey(identifier);
        }
        return this.settings.bookKey;
    }

    /**
     * Checks if the book setting can be retrieved from localStorage.
     * @returns true if the book key exists, or false otherwise.
     */
    isSaved() {

        if (!localStorage)
            return false;
        
        return localStorage.getItem(this.settings.bookKey) !== null;
    }

    /**
     * Removing the current book settings from local storage.
     * @returns true if the book settings were deleted successfully, or false 
     * otherwise.
     */
    removeSavedSettings() {

        if (!this.isSaved())
            return false;

        localStorage.removeItem(this.settings.bookKey);
        return true;
    }

    applySavedSettings() {

        if (!localStorage)
            return false;

        let stored;
        try {
            stored = JSON.parse(localStorage.getItem(this.settings.bookKey));
        } catch (e) { // parsing error of localStorage
            console.exception(e);
        }

        if (stored) {
            // Merge styles
            if (stored.styles) {
                this.settings.styles = this.defaults(this.settings.styles || {},
                    stored.styles);
            }
            // Merge the rest
            this.settings = this.defaults(this.settings, stored);
            return true;
        } else {
            return false;
        }
    }

    /**
     * Saving the current book settings in local storage.
     * @returns 
     */
    saveSettings() {

        if (this.book) {

            if (this.rendition.location) {
                const curLocation = this.rendition.currentLocation();
                this.settings.previousLocationCfi = curLocation.start.cfi;
            }
        }

        if (!localStorage)
            return false;

        localStorage.setItem(this.settings.bookKey, JSON.stringify(this.settings));
        return true;
    }

    unload() {
        
        if (this.settings.restore && localStorage) {
            this.saveSettings();
        }
    }

    hashChanged() {

        const hash = window.location.hash.slice(1);
        this.rendition.display(hash);
    }

    setLocation(cfi) {

        const baseUrl = this.book.archived ? undefined : this.book.url;
        const url = new URL(window.location, baseUrl);
        url.hash = "#" + cfi;

        // Update the History Location
        if (this.settings.history && window.location.hash !== url.hash) {
            // Add CFI fragment to the history
            window.history.pushState({}, "", url);
            this.currentLocationCfi = cfi;
        }
    }

    generatePagination() {
        //
        // no implemented
        //
        //const rect = this.content.viewer.getRect();
        //this.book.generatePagination(rect.width, rect.height);
    }

    keyboardHandler(e) {

        const MOD = (e.ctrlKey || e.metaKey);

        if (MOD) {

            const step = 2;
            let value = parseInt(this.settings.styles.fontSize);

            switch (e.key) {

                case '=':
                    e.preventDefault();
                    value += step;
                    this.emit('fontresize', value);
                    break;
                case '-':
                    e.preventDefault();
                    value -= step;
                    this.emit('fontresize', value);
                    break;
                case '0':
                    e.preventDefault();
                    value = 100;
                    this.emit('fontresize', value);
                    break;
            }
        } else {

            switch (e.key) {
                case 'ArrowLeft':
                    this.emit('prev');
                    e.preventDefault();
                    break;
                case 'ArrowRight':
                    this.emit('next');
                    e.preventDefault();
                    break;
            }
        }
    }
}

event_emitter_default()(Reader.prototype);

;// CONCATENATED MODULE: ./src/storage.js
class Storage {

	constructor() {
		
		this.name = 'epubjs-reader';
		this.version = 1.0;
		this.database;
		this.indexedDB = window.indexedDB || 
						 window.webkitIndexedDB || 
						 window.mozIndexedDB ||
						 window.OIndexedDB ||
						 window.msIndexedDB;
		
		if (this.indexedDB === undefined) {

			alert('The IndexedDB API not available in your browser.');
		}
	}

	init(callback) {

		if (this.indexedDB === undefined) {
			callback();
			return;
		}
		
		const scope = this;
		const request = indexedDB.open(this.name, this.version);
		request.onupgradeneeded = function (event) {

			const db = event.target.result;
			if (db.objectStoreNames.contains('entries') === false) {

				db.createObjectStore("entries");
			}
		};

		request.onsuccess = function (event) {

			scope.database = event.target.result;
			scope.database.onerror = function (event) {

				console.error('IndexedDB', event);
			};
			callback();
		}

		request.onerror = function (event) {

			console.error('IndexedDB', event);
		};
	}

	get(callback) {

		if (this.database === undefined) {
			callback();
			return;
		}
		
		const transaction = this.database.transaction(['entries'], 'readwrite');
		const objectStore = transaction.objectStore('entries');
		const request = objectStore.get(0);
		request.onsuccess = function (event) {

			callback(event.target.result);
			console.log('storage.get');
		};
	}

	set(data, callback) {
		
		if (this.database === undefined) {
			callback();
			return;
		}
		
		const transaction = this.database.transaction(['entries'], 'readwrite');
		const objectStore = transaction.objectStore('entries');
		const request = objectStore.put(data, 0);
		request.onsuccess = function () {

			callback();
			console.log('storage.set');
		};
	}

	clear() {

		if (this.database === undefined)
			return;

		const transaction = this.database.transaction(['entries'], 'readwrite');
		const objectStore = transaction.objectStore('entries');
		const request = objectStore.clear();
		request.onsuccess = function () {

			console.log('storage.clear');
		};
	}
}

;// CONCATENATED MODULE: ./src/main.js



"use strict";

window.onload = function () {

	const storage = new Storage();
	const url = new URL(window.location);
	const path = url.search.length > 0 
		? url.searchParams.get("bookPath") 
		: "https://s3.amazonaws.com/moby-dick/";

	storage.init(function () {

		storage.get(function (data) {

			if (data !== undefined && url.search.length === 0) {

				window.reader = new Reader(data, { restore: true });

			} else {

				window.reader = new Reader(path, { restore: true });
			}
		});
	});

	window.storage = storage;
};
})();

/******/ })()
;
//# sourceMappingURL=epubreader.js.map