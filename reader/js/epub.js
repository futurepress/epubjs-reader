(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("xmldom"), (function webpackLoadOptionalExternalModule() { try { return require("JSZip"); } catch(e) {} }()));
	else if(typeof define === 'function' && define.amd)
		define(["xmldom", "JSZip"], factory);
	else if(typeof exports === 'object')
		exports["ePub"] = factory(require("xmldom"), (function webpackLoadOptionalExternalModule() { try { return require("JSZip"); } catch(e) {} }()));
	else
		root["ePub"] = factory(root["xmldom"], root["JSZip"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_15__, __WEBPACK_EXTERNAL_MODULE_51__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.isElement = isElement;
exports.uuid = uuid;
exports.documentHeight = documentHeight;
exports.isNumber = isNumber;
exports.isFloat = isFloat;
exports.prefixed = prefixed;
exports.defaults = defaults;
exports.extend = extend;
exports.insert = insert;
exports.locationOf = locationOf;
exports.indexOfSorted = indexOfSorted;
exports.bounds = bounds;
exports.borders = borders;
exports.windowBounds = windowBounds;
exports.cleanStringForXpath = cleanStringForXpath;
exports.indexOfNode = indexOfNode;
exports.indexOfTextNode = indexOfTextNode;
exports.indexOfElementNode = indexOfElementNode;
exports.isXml = isXml;
exports.createBlob = createBlob;
exports.createBlobUrl = createBlobUrl;
exports.revokeBlobUrl = revokeBlobUrl;
exports.createBase64Url = createBase64Url;
exports.type = type;
exports.parse = parse;
exports.qs = qs;
exports.qsa = qsa;
exports.qsp = qsp;
exports.sprint = sprint;
exports.treeWalker = treeWalker;
exports.walk = walk;
exports.blob2base64 = blob2base64;
exports.defer = defer;
exports.querySelectorByType = querySelectorByType;
exports.findChildren = findChildren;
exports.parents = parents;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var requestAnimationFrame = exports.requestAnimationFrame = typeof window != "undefined" ? window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame : false;
var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var COMMENT_NODE = 8;
var DOCUMENT_NODE = 9;
var _URL = typeof URL != "undefined" ? URL : typeof window != "undefined" ? window.URL || window.webkitURL || window.mozURL : undefined;

function isElement(obj) {
	return !!(obj && obj.nodeType == 1);
}

// http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
function uuid() {
	var d = new Date().getTime();
	var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
		var r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return (c == "x" ? r : r & 0x7 | 0x8).toString(16);
	});
	return uuid;
}

function documentHeight() {
	return Math.max(document.documentElement.clientHeight, document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight);
}

function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

function isFloat(n) {
	return isNumber(n) && Math.floor(n) !== n;
}

function prefixed(unprefixed) {
	var vendors = ["Webkit", "webkit", "Moz", "O", "ms"];
	var prefixes = ["-webkit-", "-webkit-", "-moz-", "-o-", "-ms-"];
	var upper = unprefixed[0].toUpperCase() + unprefixed.slice(1);
	var length = vendors.length;

	if (typeof document === "undefined" || typeof document.body.style[unprefixed] != "undefined") {
		return unprefixed;
	}

	for (var i = 0; i < length; i++) {
		if (typeof document.body.style[vendors[i] + upper] != "undefined") {
			return prefixes[i] + unprefixed;
		}
	}

	return unprefixed;
}

function defaults(obj) {
	for (var i = 1, length = arguments.length; i < length; i++) {
		var source = arguments[i];
		for (var prop in source) {
			if (obj[prop] === void 0) obj[prop] = source[prop];
		}
	}
	return obj;
}

function extend(target) {
	var sources = [].slice.call(arguments, 1);
	sources.forEach(function (source) {
		if (!source) return;
		Object.getOwnPropertyNames(source).forEach(function (propName) {
			Object.defineProperty(target, propName, Object.getOwnPropertyDescriptor(source, propName));
		});
	});
	return target;
}

// Fast quicksort insert for sorted array -- based on:
// http://stackoverflow.com/questions/1344500/efficient-way-to-insert-a-number-into-a-sorted-array-of-numbers
function insert(item, array, compareFunction) {
	var location = locationOf(item, array, compareFunction);
	array.splice(location, 0, item);

	return location;
}

// Returns where something would fit in
function locationOf(item, array, compareFunction, _start, _end) {
	var start = _start || 0;
	var end = _end || array.length;
	var pivot = parseInt(start + (end - start) / 2);
	var compared;
	if (!compareFunction) {
		compareFunction = function compareFunction(a, b) {
			if (a > b) return 1;
			if (a < b) return -1;
			if (a == b) return 0;
		};
	}
	if (end - start <= 0) {
		return pivot;
	}

	compared = compareFunction(array[pivot], item);
	if (end - start === 1) {
		return compared >= 0 ? pivot : pivot + 1;
	}
	if (compared === 0) {
		return pivot;
	}
	if (compared === -1) {
		return locationOf(item, array, compareFunction, pivot, end);
	} else {
		return locationOf(item, array, compareFunction, start, pivot);
	}
}

// Returns -1 of mpt found
function indexOfSorted(item, array, compareFunction, _start, _end) {
	var start = _start || 0;
	var end = _end || array.length;
	var pivot = parseInt(start + (end - start) / 2);
	var compared;
	if (!compareFunction) {
		compareFunction = function compareFunction(a, b) {
			if (a > b) return 1;
			if (a < b) return -1;
			if (a == b) return 0;
		};
	}
	if (end - start <= 0) {
		return -1; // Not found
	}

	compared = compareFunction(array[pivot], item);
	if (end - start === 1) {
		return compared === 0 ? pivot : -1;
	}
	if (compared === 0) {
		return pivot; // Found
	}
	if (compared === -1) {
		return indexOfSorted(item, array, compareFunction, pivot, end);
	} else {
		return indexOfSorted(item, array, compareFunction, start, pivot);
	}
}

function bounds(el) {

	var style = window.getComputedStyle(el);
	var widthProps = ["width", "paddingRight", "paddingLeft", "marginRight", "marginLeft", "borderRightWidth", "borderLeftWidth"];
	var heightProps = ["height", "paddingTop", "paddingBottom", "marginTop", "marginBottom", "borderTopWidth", "borderBottomWidth"];

	var width = 0;
	var height = 0;

	widthProps.forEach(function (prop) {
		width += parseFloat(style[prop]) || 0;
	});

	heightProps.forEach(function (prop) {
		height += parseFloat(style[prop]) || 0;
	});

	return {
		height: height,
		width: width
	};
}

function borders(el) {

	var style = window.getComputedStyle(el);
	var widthProps = ["paddingRight", "paddingLeft", "marginRight", "marginLeft", "borderRightWidth", "borderLeftWidth"];
	var heightProps = ["paddingTop", "paddingBottom", "marginTop", "marginBottom", "borderTopWidth", "borderBottomWidth"];

	var width = 0;
	var height = 0;

	widthProps.forEach(function (prop) {
		width += parseFloat(style[prop]) || 0;
	});

	heightProps.forEach(function (prop) {
		height += parseFloat(style[prop]) || 0;
	});

	return {
		height: height,
		width: width
	};
}

function windowBounds() {

	var width = window.innerWidth;
	var height = window.innerHeight;

	return {
		top: 0,
		left: 0,
		right: width,
		bottom: height,
		width: width,
		height: height
	};
}

//-- https://stackoverflow.com/questions/13482352/xquery-looking-for-text-with-single-quote/13483496#13483496
function cleanStringForXpath(str) {
	var parts = str.match(/[^'"]+|['"]/g);
	parts = parts.map(function (part) {
		if (part === "'") {
			return "\"\'\""; // output "'"
		}

		if (part === "\"") {
			return "\'\"\'"; // output '"'
		}
		return "'" + part + "'";
	});
	return "concat(''," + parts.join(",") + ")";
}

function indexOfNode(node, typeId) {
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

function indexOfTextNode(textNode) {
	return indexOfNode(textNode, TEXT_NODE);
}

function indexOfElementNode(elementNode) {
	return indexOfNode(elementNode, ELEMENT_NODE);
}

function isXml(ext) {
	return ["xml", "opf", "ncx"].indexOf(ext) > -1;
}

function createBlob(content, mime) {
	return new Blob([content], { type: mime });
}

function createBlobUrl(content, mime) {
	var tempUrl;
	var blob = createBlob(content, mime);

	tempUrl = _URL.createObjectURL(blob);

	return tempUrl;
}

function revokeBlobUrl(url) {
	return _URL.revokeObjectURL(url);
}

function createBase64Url(content, mime) {
	var data;
	var datauri;

	if (typeof content !== "string") {
		// Only handles strings
		return;
	}

	data = btoa(encodeURIComponent(content));

	datauri = "data:" + mime + ";base64," + data;

	return datauri;
}

function type(obj) {
	return Object.prototype.toString.call(obj).slice(8, -1);
}

function parse(markup, mime, forceXMLDom) {
	var doc;
	var Parser;

	if (typeof DOMParser === "undefined" || forceXMLDom) {
		Parser = __webpack_require__(15).DOMParser;
	} else {
		Parser = DOMParser;
	}

	// Remove byte order mark before parsing
	// https://www.w3.org/International/questions/qa-byte-order-mark
	if (markup.charCodeAt(0) === 0xFEFF) {
		markup = markup.slice(1);
	}

	doc = new Parser().parseFromString(markup, mime);

	return doc;
}

function qs(el, sel) {
	var elements;
	if (!el) {
		throw new Error("No Element Provided");
	}

	if (typeof el.querySelector != "undefined") {
		return el.querySelector(sel);
	} else {
		elements = el.getElementsByTagName(sel);
		if (elements.length) {
			return elements[0];
		}
	}
}

function qsa(el, sel) {

	if (typeof el.querySelector != "undefined") {
		return el.querySelectorAll(sel);
	} else {
		return el.getElementsByTagName(sel);
	}
}

function qsp(el, sel, props) {
	var q, filtered;
	if (typeof el.querySelector != "undefined") {
		sel += "[";
		for (var prop in props) {
			sel += prop + "='" + props[prop] + "'";
		}
		sel += "]";
		return el.querySelector(sel);
	} else {
		q = el.getElementsByTagName(sel);
		filtered = Array.prototype.slice.call(q, 0).filter(function (el) {
			for (var prop in props) {
				if (el.getAttribute(prop) === props[prop]) {
					return true;
				}
			}
			return false;
		});

		if (filtered) {
			return filtered[0];
		}
	}
}

/**
 * Sprint through all text nodes in a document
 * @param  {element} root element to start with
 * @param  {function} func function to run on each element
 */
function sprint(root, func) {
	var doc = root.ownerDocument || root;
	if (typeof doc.createTreeWalker !== "undefined") {
		treeWalker(root, func, NodeFilter.SHOW_TEXT);
	} else {
		walk(root, function (node) {
			if (node && node.nodeType === 3) {
				// Node.TEXT_NODE
				func(node);
			}
		}, true);
	}
}

function treeWalker(root, func, filter) {
	var treeWalker = document.createTreeWalker(root, filter, null, false);
	var node = void 0;
	while (node = treeWalker.nextNode()) {
		func(node);
	}
}

// export function walk(root, func, onlyText) {
// 	var node = root;
//
// 	if (node && !onlyText || node.nodeType === 3) { // Node.TEXT_NODE
// 		func(node);
// 	}
// 	console.log(root);
//
// 	node = node.firstChild;
// 	while(node) {
// 		walk(node, func, onlyText);
// 		node = node.nextSibling;
// 	}
// }

/**
 * @param callback return false for continue,true for break
 * @return boolean true: break visit;
 */
function walk(node, callback) {
	if (callback(node)) {
		return true;
	}
	node = node.firstChild;
	if (node) {
		do {
			var walked = walk(node, callback);
			if (walked) {
				return true;
			}
			node = node.nextSibling;
		} while (node);
	}
}

function blob2base64(blob) {
	return new Promise(function (resolve, reject) {
		var reader = new FileReader();
		reader.readAsDataURL(blob);
		reader.onloadend = function () {
			resolve(reader.result);
		};
	});
}

// From: https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred#backwards_forwards_compatible
function defer() {
	var _this = this;

	/* A method to resolve the associated Promise with the value passed.
  * If the promise is already settled it does nothing.
  *
  * @param {anything} value : This value is used to resolve the promise
  * If the value is a Promise then the associated promise assumes the state
  * of Promise passed as value.
  */
	this.resolve = null;

	/* A method to reject the assocaited Promise with the value passed.
  * If the promise is already settled it does nothing.
  *
  * @param {anything} reason: The reason for the rejection of the Promise.
  * Generally its an Error object. If however a Promise is passed, then the Promise
  * itself will be the reason for rejection no matter the state of the Promise.
  */
	this.reject = null;

	this.id = uuid();

	/* A newly created Pomise object.
  * Initially in pending state.
  */
	this.promise = new Promise(function (resolve, reject) {
		_this.resolve = resolve;
		_this.reject = reject;
	});
	Object.freeze(this);
}

function querySelectorByType(html, element, type) {
	var query;
	if (typeof html.querySelector != "undefined") {
		query = html.querySelector(element + "[*|type=\"" + type + "\"]");
	}
	// Handle IE not supporting namespaced epub:type in querySelector
	if (!query || query.length === 0) {
		query = qsa(html, element);
		for (var i = 0; i < query.length; i++) {
			if (query[i].getAttributeNS("http://www.idpf.org/2007/ops", "type") === type || query[i].getAttribute("epub:type") === type) {
				return query[i];
			}
		}
	} else {
		return query;
	}
}

function findChildren(el) {
	var result = [];
	var childNodes = el.childNodes;
	for (var i = 0; i < childNodes.length; i++) {
		var node = childNodes[i];
		if (node.nodeType === 1) {
			result.push(node);
		}
	}
	return result;
}

function parents(node) {
	var nodes = [node];
	for (; node; node = node.parentNode) {
		nodes.unshift(node);
	}
	return nodes;
}

var RangeObject = exports.RangeObject = function () {
	function RangeObject() {
		_classCallCheck(this, RangeObject);

		this.collapsed = false;
		this.commonAncestorContainer = undefined;
		this.endContainer = undefined;
		this.endOffset = undefined;
		this.startContainer = undefined;
		this.startOffset = undefined;
	}

	_createClass(RangeObject, [{
		key: "setStart",
		value: function setStart(startNode, startOffset) {
			this.startContainer = startNode;
			this.startOffset = startOffset;

			if (!this.endContainer) {
				this.collapse(true);
			} else {
				this.commonAncestorContainer = this._commonAncestorContainer();
			}

			this._checkCollapsed();
		}
	}, {
		key: "setEnd",
		value: function setEnd(endNode, endOffset) {
			this.endContainer = endNode;
			this.endOffset = endOffset;

			if (!this.startContainer) {
				this.collapse(false);
			} else {
				this.collapsed = false;
				this.commonAncestorContainer = this._commonAncestorContainer();
			}

			this._checkCollapsed();
		}
	}, {
		key: "collapse",
		value: function collapse(toStart) {
			this.collapsed = true;
			if (toStart) {
				this.endContainer = this.startContainer;
				this.endOffset = this.startOffset;
				this.commonAncestorContainer = this.startContainer.parentNode;
			} else {
				this.startContainer = this.endContainer;
				this.startOffset = this.endOffset;
				this.commonAncestorContainer = this.endOffset.parentNode;
			}
		}
	}, {
		key: "selectNode",
		value: function selectNode(referenceNode) {
			var parent = referenceNode.parentNode;
			var index = Array.prototype.indexOf.call(parent.childNodes, referenceNode);
			this.setStart(parent, index);
			this.setEnd(parent, index + 1);
		}
	}, {
		key: "selectNodeContents",
		value: function selectNodeContents(referenceNode) {
			var end = referenceNode.childNodes[referenceNode.childNodes - 1];
			var endIndex = referenceNode.nodeType === 3 ? referenceNode.textContent.length : parent.childNodes.length;
			this.setStart(referenceNode, 0);
			this.setEnd(referenceNode, endIndex);
		}
	}, {
		key: "_commonAncestorContainer",
		value: function _commonAncestorContainer(startContainer, endContainer) {
			var startParents = parents(startContainer || this.startContainer);
			var endParents = parents(endContainer || this.endContainer);

			if (startParents[0] != endParents[0]) return undefined;

			for (var i = 0; i < startParents.length; i++) {
				if (startParents[i] != endParents[i]) {
					return startParents[i - 1];
				}
			}
		}
	}, {
		key: "_checkCollapsed",
		value: function _checkCollapsed() {
			if (this.startContainer === this.endContainer && this.startOffset === this.endOffset) {
				this.collapsed = true;
			} else {
				this.collapsed = false;
			}
		}
	}, {
		key: "toString",
		value: function toString() {
			// TODO: implement walking between start and end to find text
		}
	}]);

	return RangeObject;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _core = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
	EPUB CFI spec: http://www.idpf.org/epub/linking/cfi/epub-cfi.html

	Implements:
	- Character Offset: epubcfi(/6/4[chap01ref]!/4[body01]/10[para05]/2/1:3)
	- Simple Ranges : epubcfi(/6/4[chap01ref]!/4[body01]/10[para05],/2/1:1,/3:4)

	Does Not Implement:
	- Temporal Offset (~)
	- Spatial Offset (@)
	- Temporal-Spatial Offset (~ + @)
	- Text Location Assertion ([)
*/

var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
// const COMMENT_NODE = 8;
var DOCUMENT_NODE = 9;

var EpubCFI = function () {
	function EpubCFI(cfiFrom, base, ignoreClass) {
		_classCallCheck(this, EpubCFI);

		var type;

		this.str = "";

		this.base = {};
		this.spinePos = 0; // For compatibility

		this.range = false; // true || false;

		this.path = {};
		this.start = null;
		this.end = null;

		// Allow instantiation without the "new" keyword
		if (!(this instanceof EpubCFI)) {
			return new EpubCFI(cfiFrom, base, ignoreClass);
		}

		if (typeof base === "string") {
			this.base = this.parseComponent(base);
		} else if ((typeof base === "undefined" ? "undefined" : _typeof(base)) === "object" && base.steps) {
			this.base = base;
		}

		type = this.checkType(cfiFrom);

		if (type === "string") {
			this.str = cfiFrom;
			return (0, _core.extend)(this, this.parse(cfiFrom));
		} else if (type === "range") {
			return (0, _core.extend)(this, this.fromRange(cfiFrom, this.base, ignoreClass));
		} else if (type === "node") {
			return (0, _core.extend)(this, this.fromNode(cfiFrom, this.base, ignoreClass));
		} else if (type === "EpubCFI" && cfiFrom.path) {
			return cfiFrom;
		} else if (!cfiFrom) {
			return this;
		} else {
			throw new TypeError("not a valid argument for EpubCFI");
		}
	}

	_createClass(EpubCFI, [{
		key: "checkType",
		value: function checkType(cfi) {

			if (this.isCfiString(cfi)) {
				return "string";
				// Is a range object
			} else if ((typeof cfi === "undefined" ? "undefined" : _typeof(cfi)) === "object" && ((0, _core.type)(cfi) === "Range" || typeof cfi.startContainer != "undefined")) {
				return "range";
			} else if ((typeof cfi === "undefined" ? "undefined" : _typeof(cfi)) === "object" && typeof cfi.nodeType != "undefined") {
				// || typeof cfi === "function"
				return "node";
			} else if ((typeof cfi === "undefined" ? "undefined" : _typeof(cfi)) === "object" && cfi instanceof EpubCFI) {
				return "EpubCFI";
			} else {
				return false;
			}
		}
	}, {
		key: "parse",
		value: function parse(cfiStr) {
			var cfi = {
				spinePos: -1,
				range: false,
				base: {},
				path: {},
				start: null,
				end: null
			};
			var baseComponent, pathComponent, range;

			if (typeof cfiStr !== "string") {
				return { spinePos: -1 };
			}

			if (cfiStr.indexOf("epubcfi(") === 0 && cfiStr[cfiStr.length - 1] === ")") {
				// Remove intial epubcfi( and ending )
				cfiStr = cfiStr.slice(8, cfiStr.length - 1);
			}

			baseComponent = this.getChapterComponent(cfiStr);

			// Make sure this is a valid cfi or return
			if (!baseComponent) {
				return { spinePos: -1 };
			}

			cfi.base = this.parseComponent(baseComponent);

			pathComponent = this.getPathComponent(cfiStr);
			cfi.path = this.parseComponent(pathComponent);

			range = this.getRange(cfiStr);

			if (range) {
				cfi.range = true;
				cfi.start = this.parseComponent(range[0]);
				cfi.end = this.parseComponent(range[1]);
			}

			// Get spine node position
			// cfi.spineSegment = cfi.base.steps[1];

			// Chapter segment is always the second step
			cfi.spinePos = cfi.base.steps[1].index;

			return cfi;
		}
	}, {
		key: "parseComponent",
		value: function parseComponent(componentStr) {
			var component = {
				steps: [],
				terminal: {
					offset: null,
					assertion: null
				}
			};
			var parts = componentStr.split(":");
			var steps = parts[0].split("/");
			var terminal;

			if (parts.length > 1) {
				terminal = parts[1];
				component.terminal = this.parseTerminal(terminal);
			}

			if (steps[0] === "") {
				steps.shift(); // Ignore the first slash
			}

			component.steps = steps.map(function (step) {
				return this.parseStep(step);
			}.bind(this));

			return component;
		}
	}, {
		key: "parseStep",
		value: function parseStep(stepStr) {
			var type, num, index, has_brackets, id;

			has_brackets = stepStr.match(/\[(.*)\]/);
			if (has_brackets && has_brackets[1]) {
				id = has_brackets[1];
			}

			//-- Check if step is a text node or element
			num = parseInt(stepStr);

			if (isNaN(num)) {
				return;
			}

			if (num % 2 === 0) {
				// Even = is an element
				type = "element";
				index = num / 2 - 1;
			} else {
				type = "text";
				index = (num - 1) / 2;
			}

			return {
				"type": type,
				"index": index,
				"id": id || null
			};
		}
	}, {
		key: "parseTerminal",
		value: function parseTerminal(termialStr) {
			var characterOffset, textLocationAssertion;
			var assertion = termialStr.match(/\[(.*)\]/);

			if (assertion && assertion[1]) {
				characterOffset = parseInt(termialStr.split("[")[0]);
				textLocationAssertion = assertion[1];
			} else {
				characterOffset = parseInt(termialStr);
			}

			if (!(0, _core.isNumber)(characterOffset)) {
				characterOffset = null;
			}

			return {
				"offset": characterOffset,
				"assertion": textLocationAssertion
			};
		}
	}, {
		key: "getChapterComponent",
		value: function getChapterComponent(cfiStr) {

			var indirection = cfiStr.split("!");

			return indirection[0];
		}
	}, {
		key: "getPathComponent",
		value: function getPathComponent(cfiStr) {

			var indirection = cfiStr.split("!");

			if (indirection[1]) {
				var ranges = indirection[1].split(",");
				return ranges[0];
			}
		}
	}, {
		key: "getRange",
		value: function getRange(cfiStr) {

			var ranges = cfiStr.split(",");

			if (ranges.length === 3) {
				return [ranges[1], ranges[2]];
			}

			return false;
		}
	}, {
		key: "getCharecterOffsetComponent",
		value: function getCharecterOffsetComponent(cfiStr) {
			var splitStr = cfiStr.split(":");
			return splitStr[1] || "";
		}
	}, {
		key: "joinSteps",
		value: function joinSteps(steps) {
			if (!steps) {
				return "";
			}

			return steps.map(function (part) {
				var segment = "";

				if (part.type === "element") {
					segment += (part.index + 1) * 2;
				}

				if (part.type === "text") {
					segment += 1 + 2 * part.index; // TODO: double check that this is odd
				}

				if (part.id) {
					segment += "[" + part.id + "]";
				}

				return segment;
			}).join("/");
		}
	}, {
		key: "segmentString",
		value: function segmentString(segment) {
			var segmentString = "/";

			segmentString += this.joinSteps(segment.steps);

			if (segment.terminal && segment.terminal.offset != null) {
				segmentString += ":" + segment.terminal.offset;
			}

			if (segment.terminal && segment.terminal.assertion != null) {
				segmentString += "[" + segment.terminal.assertion + "]";
			}

			return segmentString;
		}
	}, {
		key: "toString",
		value: function toString() {
			var cfiString = "epubcfi(";

			cfiString += this.segmentString(this.base);

			cfiString += "!";
			cfiString += this.segmentString(this.path);

			// Add Range, if present
			if (this.range && this.start) {
				cfiString += ",";
				cfiString += this.segmentString(this.start);
			}

			if (this.range && this.end) {
				cfiString += ",";
				cfiString += this.segmentString(this.end);
			}

			cfiString += ")";

			return cfiString;
		}
	}, {
		key: "compare",
		value: function compare(cfiOne, cfiTwo) {
			var stepsA, stepsB;
			var terminalA, terminalB;

			var rangeAStartSteps, rangeAEndSteps;
			var rangeBEndSteps, rangeBEndSteps;
			var rangeAStartTerminal, rangeAEndTerminal;
			var rangeBStartTerminal, rangeBEndTerminal;

			if (typeof cfiOne === "string") {
				cfiOne = new EpubCFI(cfiOne);
			}
			if (typeof cfiTwo === "string") {
				cfiTwo = new EpubCFI(cfiTwo);
			}
			// Compare Spine Positions
			if (cfiOne.spinePos > cfiTwo.spinePos) {
				return 1;
			}
			if (cfiOne.spinePos < cfiTwo.spinePos) {
				return -1;
			}

			if (cfiOne.range) {
				stepsA = cfiOne.path.steps.concat(cfiOne.start.steps);
				terminalA = cfiOne.start.terminal;
			} else {
				stepsA = cfiOne.path.steps;
				terminalA = cfiOne.path.terminal;
			}

			if (cfiTwo.range) {
				stepsB = cfiTwo.path.steps.concat(cfiTwo.start.steps);
				terminalB = cfiTwo.start.terminal;
			} else {
				stepsB = cfiTwo.path.steps;
				terminalB = cfiTwo.path.terminal;
			}

			// Compare Each Step in the First item
			for (var i = 0; i < stepsA.length; i++) {
				if (!stepsA[i]) {
					return -1;
				}
				if (!stepsB[i]) {
					return 1;
				}
				if (stepsA[i].index > stepsB[i].index) {
					return 1;
				}
				if (stepsA[i].index < stepsB[i].index) {
					return -1;
				}
				// Otherwise continue checking
			}

			// All steps in First equal to Second and First is Less Specific
			if (stepsA.length < stepsB.length) {
				return 1;
			}

			// Compare the charecter offset of the text node
			if (terminalA.offset > terminalB.offset) {
				return 1;
			}
			if (terminalA.offset < terminalB.offset) {
				return -1;
			}

			// CFI's are equal
			return 0;
		}
	}, {
		key: "step",
		value: function step(node) {
			var nodeType = node.nodeType === TEXT_NODE ? "text" : "element";

			return {
				"id": node.id,
				"tagName": node.tagName,
				"type": nodeType,
				"index": this.position(node)
			};
		}
	}, {
		key: "filteredStep",
		value: function filteredStep(node, ignoreClass) {
			var filteredNode = this.filter(node, ignoreClass);
			var nodeType;

			// Node filtered, so ignore
			if (!filteredNode) {
				return;
			}

			// Otherwise add the filter node in
			nodeType = filteredNode.nodeType === TEXT_NODE ? "text" : "element";

			return {
				"id": filteredNode.id,
				"tagName": filteredNode.tagName,
				"type": nodeType,
				"index": this.filteredPosition(filteredNode, ignoreClass)
			};
		}
	}, {
		key: "pathTo",
		value: function pathTo(node, offset, ignoreClass) {
			var segment = {
				steps: [],
				terminal: {
					offset: null,
					assertion: null
				}
			};
			var currentNode = node;
			var step;

			while (currentNode && currentNode.parentNode && currentNode.parentNode.nodeType != DOCUMENT_NODE) {

				if (ignoreClass) {
					step = this.filteredStep(currentNode, ignoreClass);
				} else {
					step = this.step(currentNode);
				}

				if (step) {
					segment.steps.unshift(step);
				}

				currentNode = currentNode.parentNode;
			}

			if (offset != null && offset >= 0) {

				segment.terminal.offset = offset;

				// Make sure we are getting to a textNode if there is an offset
				if (segment.steps[segment.steps.length - 1].type != "text") {
					segment.steps.push({
						"type": "text",
						"index": 0
					});
				}
			}

			return segment;
		}
	}, {
		key: "equalStep",
		value: function equalStep(stepA, stepB) {
			if (!stepA || !stepB) {
				return false;
			}

			if (stepA.index === stepB.index && stepA.id === stepB.id && stepA.type === stepB.type) {
				return true;
			}

			return false;
		}
	}, {
		key: "fromRange",
		value: function fromRange(range, base, ignoreClass) {
			var cfi = {
				range: false,
				base: {},
				path: {},
				start: null,
				end: null
			};

			var start = range.startContainer;
			var end = range.endContainer;

			var startOffset = range.startOffset;
			var endOffset = range.endOffset;

			var needsIgnoring = false;

			if (ignoreClass) {
				// Tell pathTo if / what to ignore
				needsIgnoring = start.ownerDocument.querySelector("." + ignoreClass) != null;
			}

			if (typeof base === "string") {
				cfi.base = this.parseComponent(base);
				cfi.spinePos = cfi.base.steps[1].index;
			} else if ((typeof base === "undefined" ? "undefined" : _typeof(base)) === "object") {
				cfi.base = base;
			}

			if (range.collapsed) {
				if (needsIgnoring) {
					startOffset = this.patchOffset(start, startOffset, ignoreClass);
				}
				cfi.path = this.pathTo(start, startOffset, ignoreClass);
			} else {
				cfi.range = true;

				if (needsIgnoring) {
					startOffset = this.patchOffset(start, startOffset, ignoreClass);
				}

				cfi.start = this.pathTo(start, startOffset, ignoreClass);
				if (needsIgnoring) {
					endOffset = this.patchOffset(end, endOffset, ignoreClass);
				}

				cfi.end = this.pathTo(end, endOffset, ignoreClass);

				// Create a new empty path
				cfi.path = {
					steps: [],
					terminal: null
				};

				// Push steps that are shared between start and end to the common path
				var len = cfi.start.steps.length;
				var i;

				for (i = 0; i < len; i++) {
					if (this.equalStep(cfi.start.steps[i], cfi.end.steps[i])) {
						if (i === len - 1) {
							// Last step is equal, check terminals
							if (cfi.start.terminal === cfi.end.terminal) {
								// CFI's are equal
								cfi.path.steps.push(cfi.start.steps[i]);
								// Not a range
								cfi.range = false;
							}
						} else {
							cfi.path.steps.push(cfi.start.steps[i]);
						}
					} else {
						break;
					}
				}

				cfi.start.steps = cfi.start.steps.slice(cfi.path.steps.length);
				cfi.end.steps = cfi.end.steps.slice(cfi.path.steps.length);

				// TODO: Add Sanity check to make sure that the end if greater than the start
			}

			return cfi;
		}
	}, {
		key: "fromNode",
		value: function fromNode(anchor, base, ignoreClass) {
			var cfi = {
				range: false,
				base: {},
				path: {},
				start: null,
				end: null
			};

			if (typeof base === "string") {
				cfi.base = this.parseComponent(base);
				cfi.spinePos = cfi.base.steps[1].index;
			} else if ((typeof base === "undefined" ? "undefined" : _typeof(base)) === "object") {
				cfi.base = base;
			}

			cfi.path = this.pathTo(anchor, null, ignoreClass);

			return cfi;
		}
	}, {
		key: "filter",
		value: function filter(anchor, ignoreClass) {
			var needsIgnoring;
			var sibling; // to join with
			var parent, previousSibling, nextSibling;
			var isText = false;

			if (anchor.nodeType === TEXT_NODE) {
				isText = true;
				parent = anchor.parentNode;
				needsIgnoring = anchor.parentNode.classList.contains(ignoreClass);
			} else {
				isText = false;
				needsIgnoring = anchor.classList.contains(ignoreClass);
			}

			if (needsIgnoring && isText) {
				previousSibling = parent.previousSibling;
				nextSibling = parent.nextSibling;

				// If the sibling is a text node, join the nodes
				if (previousSibling && previousSibling.nodeType === TEXT_NODE) {
					sibling = previousSibling;
				} else if (nextSibling && nextSibling.nodeType === TEXT_NODE) {
					sibling = nextSibling;
				}

				if (sibling) {
					return sibling;
				} else {
					// Parent will be ignored on next step
					return anchor;
				}
			} else if (needsIgnoring && !isText) {
				// Otherwise just skip the element node
				return false;
			} else {
				// No need to filter
				return anchor;
			}
		}
	}, {
		key: "patchOffset",
		value: function patchOffset(anchor, offset, ignoreClass) {
			if (anchor.nodeType != TEXT_NODE) {
				throw new Error("Anchor must be a text node");
			}

			var curr = anchor;
			var totalOffset = offset;

			// If the parent is a ignored node, get offset from it's start
			if (anchor.parentNode.classList.contains(ignoreClass)) {
				curr = anchor.parentNode;
			}

			while (curr.previousSibling) {
				if (curr.previousSibling.nodeType === ELEMENT_NODE) {
					// Originally a text node, so join
					if (curr.previousSibling.classList.contains(ignoreClass)) {
						totalOffset += curr.previousSibling.textContent.length;
					} else {
						break; // Normal node, dont join
					}
				} else {
					// If the previous sibling is a text node, join the nodes
					totalOffset += curr.previousSibling.textContent.length;
				}

				curr = curr.previousSibling;
			}

			return totalOffset;
		}
	}, {
		key: "normalizedMap",
		value: function normalizedMap(children, nodeType, ignoreClass) {
			var output = {};
			var prevIndex = -1;
			var i,
			    len = children.length;
			var currNodeType;
			var prevNodeType;

			for (i = 0; i < len; i++) {

				currNodeType = children[i].nodeType;

				// Check if needs ignoring
				if (currNodeType === ELEMENT_NODE && children[i].classList.contains(ignoreClass)) {
					currNodeType = TEXT_NODE;
				}

				if (i > 0 && currNodeType === TEXT_NODE && prevNodeType === TEXT_NODE) {
					// join text nodes
					output[i] = prevIndex;
				} else if (nodeType === currNodeType) {
					prevIndex = prevIndex + 1;
					output[i] = prevIndex;
				}

				prevNodeType = currNodeType;
			}

			return output;
		}
	}, {
		key: "position",
		value: function position(anchor) {
			var children, index;
			if (anchor.nodeType === ELEMENT_NODE) {
				children = anchor.parentNode.children;
				if (!children) {
					children = (0, _core.findChildren)(anchor.parentNode);
				}
				index = Array.prototype.indexOf.call(children, anchor);
			} else {
				children = this.textNodes(anchor.parentNode);
				index = children.indexOf(anchor);
			}

			return index;
		}
	}, {
		key: "filteredPosition",
		value: function filteredPosition(anchor, ignoreClass) {
			var children, index, map;

			if (anchor.nodeType === ELEMENT_NODE) {
				children = anchor.parentNode.children;
				map = this.normalizedMap(children, ELEMENT_NODE, ignoreClass);
			} else {
				children = anchor.parentNode.childNodes;
				// Inside an ignored node
				if (anchor.parentNode.classList.contains(ignoreClass)) {
					anchor = anchor.parentNode;
					children = anchor.parentNode.childNodes;
				}
				map = this.normalizedMap(children, TEXT_NODE, ignoreClass);
			}

			index = Array.prototype.indexOf.call(children, anchor);

			return map[index];
		}
	}, {
		key: "stepsToXpath",
		value: function stepsToXpath(steps) {
			var xpath = [".", "*"];

			steps.forEach(function (step) {
				var position = step.index + 1;

				if (step.id) {
					xpath.push("*[position()=" + position + " and @id='" + step.id + "']");
				} else if (step.type === "text") {
					xpath.push("text()[" + position + "]");
				} else {
					xpath.push("*[" + position + "]");
				}
			});

			return xpath.join("/");
		}

		/*
  	To get the last step if needed:
  	// Get the terminal step
  lastStep = steps[steps.length-1];
  // Get the query string
  query = this.stepsToQuery(steps);
  // Find the containing element
  startContainerParent = doc.querySelector(query);
  // Find the text node within that element
  if(startContainerParent && lastStep.type == "text") {
  	container = startContainerParent.childNodes[lastStep.index];
  }
  */

	}, {
		key: "stepsToQuerySelector",
		value: function stepsToQuerySelector(steps) {
			var query = ["html"];

			steps.forEach(function (step) {
				var position = step.index + 1;

				if (step.id) {
					query.push("#" + step.id);
				} else if (step.type === "text") {
					// unsupported in querySelector
					// query.push("text()[" + position + "]");
				} else {
					query.push("*:nth-child(" + position + ")");
				}
			});

			return query.join(">");
		}
	}, {
		key: "textNodes",
		value: function textNodes(container, ignoreClass) {
			return Array.prototype.slice.call(container.childNodes).filter(function (node) {
				if (node.nodeType === TEXT_NODE) {
					return true;
				} else if (ignoreClass && node.classList.contains(ignoreClass)) {
					return true;
				}
				return false;
			});
		}
	}, {
		key: "walkToNode",
		value: function walkToNode(steps, _doc, ignoreClass) {
			var doc = _doc || document;
			var container = doc.documentElement;
			var children;
			var step;
			var len = steps.length;
			var i;

			for (i = 0; i < len; i++) {
				step = steps[i];

				if (step.type === "element") {
					//better to get a container using id as some times step.index may not be correct
					//For ex.https://github.com/futurepress/epub.js/issues/561
					if (step.id) {
						container = doc.getElementById(step.id);
					} else {
						children = container.children || (0, _core.findChildren)(container);
						container = children[step.index];
					}
				} else if (step.type === "text") {
					container = this.textNodes(container, ignoreClass)[step.index];
				}
				if (!container) {
					//Break the for loop as due to incorrect index we can get error if
					//container is undefined so that other functionailties works fine
					//like navigation
					break;
				}
			}

			return container;
		}
	}, {
		key: "findNode",
		value: function findNode(steps, _doc, ignoreClass) {
			var doc = _doc || document;
			var container;
			var xpath;

			if (!ignoreClass && typeof doc.evaluate != "undefined") {
				xpath = this.stepsToXpath(steps);
				container = doc.evaluate(xpath, doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			} else if (ignoreClass) {
				container = this.walkToNode(steps, doc, ignoreClass);
			} else {
				container = this.walkToNode(steps, doc);
			}

			return container;
		}
	}, {
		key: "fixMiss",
		value: function fixMiss(steps, offset, _doc, ignoreClass) {
			var container = this.findNode(steps.slice(0, -1), _doc, ignoreClass);
			var children = container.childNodes;
			var map = this.normalizedMap(children, TEXT_NODE, ignoreClass);
			var child;
			var len;
			var lastStepIndex = steps[steps.length - 1].index;

			for (var childIndex in map) {
				if (!map.hasOwnProperty(childIndex)) return;

				if (map[childIndex] === lastStepIndex) {
					child = children[childIndex];
					len = child.textContent.length;
					if (offset > len) {
						offset = offset - len;
					} else {
						if (child.nodeType === ELEMENT_NODE) {
							container = child.childNodes[0];
						} else {
							container = child;
						}
						break;
					}
				}
			}

			return {
				container: container,
				offset: offset
			};
		}
	}, {
		key: "toRange",
		value: function toRange(_doc, ignoreClass) {
			var doc = _doc || document;
			var range;
			var start, end, startContainer, endContainer;
			var cfi = this;
			var startSteps, endSteps;
			var needsIgnoring = ignoreClass ? doc.querySelector("." + ignoreClass) != null : false;
			var missed;

			if (typeof doc.createRange !== "undefined") {
				range = doc.createRange();
			} else {
				range = new _core.RangeObject();
			}

			if (cfi.range) {
				start = cfi.start;
				startSteps = cfi.path.steps.concat(start.steps);
				startContainer = this.findNode(startSteps, doc, needsIgnoring ? ignoreClass : null);
				end = cfi.end;
				endSteps = cfi.path.steps.concat(end.steps);
				endContainer = this.findNode(endSteps, doc, needsIgnoring ? ignoreClass : null);
			} else {
				start = cfi.path;
				startSteps = cfi.path.steps;
				startContainer = this.findNode(cfi.path.steps, doc, needsIgnoring ? ignoreClass : null);
			}

			if (startContainer) {
				try {

					if (start.terminal.offset != null) {
						range.setStart(startContainer, start.terminal.offset);
					} else {
						range.setStart(startContainer, 0);
					}
				} catch (e) {
					missed = this.fixMiss(startSteps, start.terminal.offset, doc, needsIgnoring ? ignoreClass : null);
					range.setStart(missed.container, missed.offset);
				}
			} else {
				console.log("No startContainer found for", this.toString());
				// No start found
				return null;
			}

			if (endContainer) {
				try {

					if (end.terminal.offset != null) {
						range.setEnd(endContainer, end.terminal.offset);
					} else {
						range.setEnd(endContainer, 0);
					}
				} catch (e) {
					missed = this.fixMiss(endSteps, cfi.end.terminal.offset, doc, needsIgnoring ? ignoreClass : null);
					range.setEnd(missed.container, missed.offset);
				}
			}

			// doc.defaultView.getSelection().addRange(range);
			return range;
		}

		// is a cfi string, should be wrapped with "epubcfi()"

	}, {
		key: "isCfiString",
		value: function isCfiString(str) {
			if (typeof str === "string" && str.indexOf("epubcfi(") === 0 && str[str.length - 1] === ")") {
				return true;
			}

			return false;
		}
	}, {
		key: "generateChapterComponent",
		value: function generateChapterComponent(_spineNodeIndex, _pos, id) {
			var pos = parseInt(_pos),
			    spineNodeIndex = (_spineNodeIndex + 1) * 2,
			    cfi = "/" + spineNodeIndex + "/";

			cfi += (pos + 1) * 2;

			if (id) {
				cfi += "[" + id + "]";
			}

			return cfi;
		}
	}, {
		key: "collapse",
		value: function collapse(toStart) {
			if (!this.range) {
				return;
			}

			this.range = false;

			if (toStart) {
				this.path.steps = this.path.steps.concat(this.start.steps);
				this.path.terminal = this.start.terminal;
			} else {
				this.path.steps = this.path.steps.concat(this.end.steps);
				this.path.terminal = this.end.terminal;
			}
		}
	}]);

	return EpubCFI;
}();

exports.default = EpubCFI;
module.exports = exports["default"];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var d        = __webpack_require__(24)
  , callable = __webpack_require__(38)

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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pathWebpack = __webpack_require__(5);

var _pathWebpack2 = _interopRequireDefault(_pathWebpack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Path = function () {
	function Path(pathString) {
		_classCallCheck(this, Path);

		var protocol;
		var parsed;

		protocol = pathString.indexOf("://");
		if (protocol > -1) {
			pathString = new URL(pathString).pathname;
		}

		parsed = this.parse(pathString);

		this.path = pathString;

		if (this.isDirectory(pathString)) {
			this.directory = pathString;
		} else {
			this.directory = parsed.dir + "/";
		}

		this.filename = parsed.base;
		this.extension = parsed.ext.slice(1);
	}

	_createClass(Path, [{
		key: "parse",
		value: function parse(what) {
			return _pathWebpack2.default.parse(what);
		}
	}, {
		key: "isAbsolute",
		value: function isAbsolute(what) {
			return _pathWebpack2.default.isAbsolute(what || this.path);
		}
	}, {
		key: "isDirectory",
		value: function isDirectory(what) {
			return what.charAt(what.length - 1) === "/";
		}
	}, {
		key: "resolve",
		value: function resolve(what) {
			return _pathWebpack2.default.resolve(this.directory, what);
		}
	}, {
		key: "relative",
		value: function relative(what) {
			return _pathWebpack2.default.relative(this.directory, what);
		}
	}, {
		key: "splitPath",
		value: function splitPath(filename) {
			return this.splitPathRe.exec(filename).slice(1);
		}
	}, {
		key: "toString",
		value: function toString() {
			return this.path;
		}
	}]);

	return Path;
}();

exports.default = Path;
module.exports = exports["default"];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = __webpack_require__(3);

var _path2 = _interopRequireDefault(_path);

var _pathWebpack = __webpack_require__(5);

var _pathWebpack2 = _interopRequireDefault(_pathWebpack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * creates a uri object
 * @param	{string} urlString	a url string (relative or absolute)
 * @param	{[string]} baseString optional base for the url,
 * default to window.location.href
 * @return {object} url
 */

var Url = function () {
	function Url(urlString, baseString) {
		_classCallCheck(this, Url);

		var absolute = urlString.indexOf("://") > -1;
		var pathname = urlString;
		var basePath;

		this.Url = undefined;
		this.href = urlString;
		this.protocol = "";
		this.origin = "";
		this.hash = "";
		this.hash = "";
		this.search = "";
		this.base = baseString;

		if (!absolute && baseString !== false && typeof baseString !== "string" && window && window.location) {
			this.base = window.location.href;
		}

		// URL Polyfill doesn't throw an error if base is empty
		if (absolute || this.base) {
			try {
				if (this.base) {
					// Safari doesn't like an undefined base
					this.Url = new URL(urlString, this.base);
				} else {
					this.Url = new URL(urlString);
				}
				this.href = this.Url.href;

				this.protocol = this.Url.protocol;
				this.origin = this.Url.origin;
				this.hash = this.Url.hash;
				this.search = this.Url.search;

				pathname = this.Url.pathname;
			} catch (e) {
				// Skip URL parsing
				this.Url = undefined;
				// resolve the pathname from the base
				if (this.base) {
					basePath = new _path2.default(this.base);
					pathname = basePath.resolve(pathname);
				}
			}
		}

		this.Path = new _path2.default(pathname);

		this.directory = this.Path.directory;
		this.filename = this.Path.filename;
		this.extension = this.Path.extension;
	}

	_createClass(Url, [{
		key: "path",
		value: function path() {
			return this.Path;
		}
	}, {
		key: "resolve",
		value: function resolve(what) {
			var isAbsolute = what.indexOf("://") > -1;
			var fullpath;

			if (isAbsolute) {
				return what;
			}

			fullpath = _pathWebpack2.default.resolve(this.directory, what);
			return this.origin + fullpath;
		}
	}, {
		key: "relative",
		value: function relative(what) {
			return _pathWebpack2.default.relative(what, this.directory);
		}
	}, {
		key: "toString",
		value: function toString() {
			return this.href;
		}
	}]);

	return Url;
}();

exports.default = Url;
module.exports = exports["default"];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (!process) {
  var process = {
    "cwd" : function () { return '/' }
  };
}

function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + path);
  }
}

// Resolves . and .. elements in a path with directory names
function normalizeStringPosix(path, allowAboveRoot) {
  var res = '';
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length)
      code = path.charCodeAt(i);
    else if (code === 47/*/*/)
      break;
    else
      code = 47/*/*/;
    if (code === 47/*/*/) {
      if (lastSlash === i - 1 || dots === 1) {
        // NOOP
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 ||
            res.charCodeAt(res.length - 1) !== 46/*.*/ ||
            res.charCodeAt(res.length - 2) !== 46/*.*/) {
          if (res.length > 2) {
            var start = res.length - 1;
            var j = start;
            for (; j >= 0; --j) {
              if (res.charCodeAt(j) === 47/*/*/)
                break;
            }
            if (j !== start) {
              if (j === -1)
                res = '';
              else
                res = res.slice(0, j);
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = '';
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += '/..';
          else
            res = '..';
        }
      } else {
        if (res.length > 0)
          res += '/' + path.slice(lastSlash + 1, i);
        else
          res = path.slice(lastSlash + 1, i);
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46/*.*/ && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}

function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base ||
    ((pathObject.name || '') + (pathObject.ext || ''));
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}

var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = '';
    var resolvedAbsolute = false;
    var cwd;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path;
      if (i >= 0)
        path = arguments[i];
      else {
        if (cwd === undefined)
          cwd = process.cwd();
        path = cwd;
      }

      assertPath(path);

      // Skip empty entries
      if (path.length === 0) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charCodeAt(0) === 47/*/*/;
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);

    if (resolvedAbsolute) {
      if (resolvedPath.length > 0)
        return '/' + resolvedPath;
      else
        return '/';
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return '.';
    }
  },


  normalize: function normalize(path) {
    assertPath(path);

    if (path.length === 0)
      return '.';

    var isAbsolute = path.charCodeAt(0) === 47/*/*/;
    var trailingSeparator = path.charCodeAt(path.length - 1) === 47/*/*/;

    // Normalize the path
    path = normalizeStringPosix(path, !isAbsolute);

    if (path.length === 0 && !isAbsolute)
      path = '.';
    if (path.length > 0 && trailingSeparator)
      path += '/';

    if (isAbsolute)
      return '/' + path;
    return path;
  },


  isAbsolute: function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47/*/*/;
  },


  join: function join() {
    if (arguments.length === 0)
      return '.';
    var joined;
    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === undefined)
          joined = arg;
        else
          joined += '/' + arg;
      }
    }
    if (joined === undefined)
      return '.';
    return posix.normalize(joined);
  },


  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);

    if (from === to)
      return '';

    from = posix.resolve(from);
    to = posix.resolve(to);

    if (from === to)
      return '';

    // Trim any leading backslashes
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47/*/*/)
        break;
    }
    var fromEnd = from.length;
    var fromLen = (fromEnd - fromStart);

    // Trim any leading backslashes
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47/*/*/)
        break;
    }
    var toEnd = to.length;
    var toLen = (toEnd - toStart);

    // Compare paths to find the longest common path from root
    var length = (fromLen < toLen ? fromLen : toLen);
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47/*/*/) {
            // We get here if `from` is the exact base path for `to`.
            // For example: from='/foo/bar'; to='/foo/bar/baz'
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            // We get here if `from` is the root
            // For example: from='/'; to='/foo'
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47/*/*/) {
            // We get here if `to` is the exact base path for `from`.
            // For example: from='/foo/bar/baz'; to='/foo/bar'
            lastCommonSep = i;
          } else if (i === 0) {
            // We get here if `to` is the root.
            // For example: from='/foo'; to='/'
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode)
        break;
      else if (fromCode === 47/*/*/)
        lastCommonSep = i;
    }

    var out = '';
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47/*/*/) {
        if (out.length === 0)
          out += '..';
        else
          out += '/..';
      }
    }

    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0)
      return out + to.slice(toStart + lastCommonSep);
    else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47/*/*/)
        ++toStart;
      return to.slice(toStart);
    }
  },


  _makeLong: function _makeLong(path) {
    return path;
  },


  dirname: function dirname(path) {
    assertPath(path);
    if (path.length === 0)
      return '.';
    var code = path.charCodeAt(0);
    var hasRoot = (code === 47/*/*/);
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
      code = path.charCodeAt(i);
      if (code === 47/*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
        // We saw the first non-path separator
        matchedSlash = false;
      }
    }

    if (end === -1)
      return hasRoot ? '/' : '.';
    if (hasRoot && end === 1)
      return '//';
    return path.slice(0, end);
  },


  basename: function basename(path, ext) {
    if (ext !== undefined && typeof ext !== 'string')
      throw new TypeError('"ext" argument must be a string');
    assertPath(path);

    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;

    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path)
        return '';
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;
      for (i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === 47/*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            start = i + 1;
            break;
          }
        } else {
          if (firstNonSlashEnd === -1) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            // Try to match the explicit extension
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = i;
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }

      if (start === end)
        end = firstNonSlashEnd;
      else if (end === -1)
        end = path.length;
      return path.slice(start, end);
    } else {
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === 47/*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            start = i + 1;
            break;
          }
        } else if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // path component
          matchedSlash = false;
          end = i + 1;
        }
      }

      if (end === -1)
        return '';
      return path.slice(start, end);
    }
  },


  extname: function extname(path) {
    assertPath(path);
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;
    for (var i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i);
      if (code === 47/*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46/*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 ||
        end === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        (preDotState === 1 &&
         startDot === end - 1 &&
         startDot === startPart + 1)) {
      return '';
    }
    return path.slice(startDot, end);
  },


  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
      throw new TypeError(
        'Parameter "pathObject" must be an object, not ' + typeof(pathObject)
      );
    }
    return _format('/', pathObject);
  },


  parse: function parse(path) {
    assertPath(path);

    var ret = { root: '', dir: '', base: '', ext: '', name: '' };
    if (path.length === 0)
      return ret;
    var code = path.charCodeAt(0);
    var isAbsolute = (code === 47/*/*/);
    var start;
    if (isAbsolute) {
      ret.root = '/';
      start = 1;
    } else {
      start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;

    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;

    // Get non-dir info
    for (; i >= start; --i) {
      code = path.charCodeAt(i);
      if (code === 47/*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46/*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 ||
        end === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        (preDotState === 1 &&
         startDot === end - 1 &&
         startDot === startPart + 1)) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute)
          ret.base = ret.name = path.slice(1, end);
        else
          ret.base = ret.name = path.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }

    if (startPart > 0)
      ret.dir = path.slice(0, startPart - 1);
    else if (isAbsolute)
      ret.dir = '/';

    return ret;
  },


  sep: '/',
  delimiter: ':',
  posix: null
};


module.exports = posix;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.replaceBase = replaceBase;
exports.replaceCanonical = replaceCanonical;
exports.replaceMeta = replaceMeta;
exports.replaceLinks = replaceLinks;
exports.substitute = substitute;

var _core = __webpack_require__(0);

var _url = __webpack_require__(4);

var _url2 = _interopRequireDefault(_url);

var _path = __webpack_require__(3);

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function replaceBase(doc, section) {
	var base;
	var head;
	var url = section.url;
	var absolute = url.indexOf("://") > -1;

	if (!doc) {
		return;
	}

	head = (0, _core.qs)(doc, "head");
	base = (0, _core.qs)(head, "base");

	if (!base) {
		base = doc.createElement("base");
		head.insertBefore(base, head.firstChild);
	}

	// Fix for Safari crashing if the url doesn't have an origin
	if (!absolute && window && window.location) {
		url = window.location.origin + url;
	}

	base.setAttribute("href", url);
}

function replaceCanonical(doc, section) {
	var head;
	var link;
	var url = section.canonical;

	if (!doc) {
		return;
	}

	head = (0, _core.qs)(doc, "head");
	link = (0, _core.qs)(head, "link[rel='canonical']");

	if (link) {
		link.setAttribute("href", url);
	} else {
		link = doc.createElement("link");
		link.setAttribute("rel", "canonical");
		link.setAttribute("href", url);
		head.appendChild(link);
	}
}

function replaceMeta(doc, section) {
	var head;
	var meta;
	var id = section.idref;
	if (!doc) {
		return;
	}

	head = (0, _core.qs)(doc, "head");
	meta = (0, _core.qs)(head, "link[property='dc.identifier']");

	if (meta) {
		meta.setAttribute("content", id);
	} else {
		meta = doc.createElement("meta");
		meta.setAttribute("name", "dc.identifier");
		meta.setAttribute("content", id);
		head.appendChild(meta);
	}
}

// TODO: move me to Contents
function replaceLinks(contents, fn) {

	var links = contents.querySelectorAll("a[href]");

	if (!links.length) {
		return;
	}

	var base = (0, _core.qs)(contents.ownerDocument, "base");
	var location = base ? base.getAttribute("href") : undefined;
	var replaceLink = function (link) {
		var href = link.getAttribute("href");

		if (href.indexOf("mailto:") === 0) {
			return;
		}

		var absolute = href.indexOf("://") > -1;
		var linkUrl = new _url2.default(href, location);

		if (absolute) {

			link.setAttribute("target", "_blank");
		} else {
			link.onclick = function () {

				if (linkUrl && linkUrl.hash) {
					fn(linkUrl.Path.path + linkUrl.hash);
				} else if (linkUrl) {
					fn(linkUrl.Path.path);
				} else {
					fn(href);
				}

				return false;
			};
		}
	}.bind(this);

	for (var i = 0; i < links.length; i++) {
		replaceLink(links[i]);
	}
}

function substitute(content, urls, replacements) {
	urls.forEach(function (url, i) {
		if (url && replacements[i]) {
			content = content.replace(new RegExp(url, "g"), replacements[i]);
		}
	});
	return content;
}

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _undefined = __webpack_require__(31)(); // Support ES3 engines

module.exports = function (val) {
 return (val !== _undefined) && (val !== null);
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Hooks allow for injecting functions that must all complete in order before finishing
 * They will execute in parallel but all must finish before continuing
 * Functions may return a promise if they are asycn.
 * @param {any} context scope of this
 * @example this.content = new EPUBJS.Hook(this);
 */
var Hook = function () {
	function Hook(context) {
		_classCallCheck(this, Hook);

		this.context = context || this;
		this.hooks = [];
	}

	/**
  * Adds a function to be run before a hook completes
  * @example this.content.register(function(){...});
  */


	_createClass(Hook, [{
		key: "register",
		value: function register() {
			for (var i = 0; i < arguments.length; ++i) {
				if (typeof arguments[i] === "function") {
					this.hooks.push(arguments[i]);
				} else {
					// unpack array
					for (var j = 0; j < arguments[i].length; ++j) {
						this.hooks.push(arguments[i][j]);
					}
				}
			}
		}

		/**
   * Triggers a hook to run all functions
   * @example this.content.trigger(args).then(function(){...});
   */

	}, {
		key: "trigger",
		value: function trigger() {
			var args = arguments;
			var context = this.context;
			var promises = [];

			this.hooks.forEach(function (task) {
				var executing = task.apply(context, args);

				if (executing && typeof executing["then"] === "function") {
					// Task is a function that returns a promise
					promises.push(executing);
				}
				// Otherwise Task resolves immediately, continue
			});

			return Promise.all(promises);
		}

		// Adds a function to be run before a hook completes

	}, {
		key: "list",
		value: function list() {
			return this.hooks;
		}
	}, {
		key: "clear",
		value: function clear() {
			return this.hooks = [];
		}
	}]);

	return Hook;
}();

exports.default = Hook;
module.exports = exports["default"];

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _core = __webpack_require__(0);

var _path = __webpack_require__(3);

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function request(url, type, withCredentials, headers) {
	var supportsURL = typeof window != "undefined" ? window.URL : false; // TODO: fallback for url if window isn't defined
	var BLOB_RESPONSE = supportsURL ? "blob" : "arraybuffer";

	var deferred = new _core.defer();

	var xhr = new XMLHttpRequest();

	//-- Check from PDF.js:
	//   https://github.com/mozilla/pdf.js/blob/master/web/compatibility.js
	var xhrPrototype = XMLHttpRequest.prototype;

	var header;

	if (!("overrideMimeType" in xhrPrototype)) {
		// IE10 might have response, but not overrideMimeType
		Object.defineProperty(xhrPrototype, "overrideMimeType", {
			value: function xmlHttpRequestOverrideMimeType() {}
		});
	}

	if (withCredentials) {
		xhr.withCredentials = true;
	}

	xhr.onreadystatechange = handler;
	xhr.onerror = err;

	xhr.open("GET", url, true);

	for (header in headers) {
		xhr.setRequestHeader(header, headers[header]);
	}

	if (type == "json") {
		xhr.setRequestHeader("Accept", "application/json");
	}

	// If type isn"t set, determine it from the file extension
	if (!type) {
		type = new _path2.default(url).extension;
	}

	if (type == "blob") {
		xhr.responseType = BLOB_RESPONSE;
	}

	if ((0, _core.isXml)(type)) {
		// xhr.responseType = "document";
		xhr.overrideMimeType("text/xml"); // for OPF parsing
	}

	if (type == "xhtml") {
		// xhr.responseType = "document";
	}

	if (type == "html" || type == "htm") {
		// xhr.responseType = "document";
	}

	if (type == "binary") {
		xhr.responseType = "arraybuffer";
	}

	xhr.send();

	function err(e) {
		deferred.reject(e);
	}

	function handler() {
		if (this.readyState === XMLHttpRequest.DONE) {
			var responseXML = false;

			if (this.responseType === "" || this.responseType === "document") {
				responseXML = this.responseXML;
			}

			if (this.status === 200 || responseXML) {
				//-- Firefox is reporting 0 for blob urls
				var r;

				if (!this.response && !responseXML) {
					deferred.reject({
						status: this.status,
						message: "Empty Response",
						stack: new Error().stack
					});
					return deferred.promise;
				}

				if (this.status === 403) {
					deferred.reject({
						status: this.status,
						response: this.response,
						message: "Forbidden",
						stack: new Error().stack
					});
					return deferred.promise;
				}
				if (responseXML) {
					r = this.responseXML;
				} else if ((0, _core.isXml)(type)) {
					// xhr.overrideMimeType("text/xml"); // for OPF parsing
					// If this.responseXML wasn't set, try to parse using a DOMParser from text
					r = (0, _core.parse)(this.response, "text/xml");
				} else if (type == "xhtml") {
					r = (0, _core.parse)(this.response, "application/xhtml+xml");
				} else if (type == "html" || type == "htm") {
					r = (0, _core.parse)(this.response, "text/html");
				} else if (type == "json") {
					r = JSON.parse(this.response);
				} else if (type == "blob") {

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
					status: this.status,
					message: this.response,
					stack: new Error().stack
				});
			}
		}
	}

	return deferred.promise;
}

exports.default = request;
module.exports = exports["default"];

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Task = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _core = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Queue for handling tasks one at a time
 * @class
 * @param {scope} context what this will resolve to in the tasks
 */
var Queue = function () {
	function Queue(context) {
		_classCallCheck(this, Queue);

		this._q = [];
		this.context = context;
		this.tick = _core.requestAnimationFrame;
		this.running = false;
		this.paused = false;
	}

	/**
  * Add an item to the queue
  * @return {Promise}
  */


	_createClass(Queue, [{
		key: "enqueue",
		value: function enqueue() {
			var deferred, promise;
			var queued;
			var task = [].shift.call(arguments);
			var args = arguments;

			// Handle single args without context
			// if(args && !Array.isArray(args)) {
			//   args = [args];
			// }
			if (!task) {
				throw new Error("No Task Provided");
			}

			if (typeof task === "function") {

				deferred = new _core.defer();
				promise = deferred.promise;

				queued = {
					"task": task,
					"args": args,
					//"context"  : context,
					"deferred": deferred,
					"promise": promise
				};
			} else {
				// Task is a promise
				queued = {
					"promise": task
				};
			}

			this._q.push(queued);

			// Wait to start queue flush
			if (this.paused == false && !this.running) {
				// setTimeout(this.flush.bind(this), 0);
				// this.tick.call(window, this.run.bind(this));
				this.run();
			}

			return queued.promise;
		}

		/**
   * Run one item
   * @return {Promise}
   */

	}, {
		key: "dequeue",
		value: function dequeue() {
			var inwait, task, result;

			if (this._q.length && !this.paused) {
				inwait = this._q.shift();
				task = inwait.task;
				if (task) {
					// console.log(task)

					result = task.apply(this.context, inwait.args);

					if (result && typeof result["then"] === "function") {
						// Task is a function that returns a promise
						return result.then(function () {
							inwait.deferred.resolve.apply(this.context, arguments);
						}.bind(this), function () {
							inwait.deferred.reject.apply(this.context, arguments);
						}.bind(this));
					} else {
						// Task resolves immediately
						inwait.deferred.resolve.apply(this.context, result);
						return inwait.promise;
					}
				} else if (inwait.promise) {
					// Task is a promise
					return inwait.promise;
				}
			} else {
				inwait = new _core.defer();
				inwait.deferred.resolve();
				return inwait.promise;
			}
		}

		// Run All Immediately

	}, {
		key: "dump",
		value: function dump() {
			while (this._q.length) {
				this.dequeue();
			}
		}

		/**
   * Run all tasks sequentially, at convince
   * @return {Promise}
   */

	}, {
		key: "run",
		value: function run() {
			var _this = this;

			if (!this.running) {
				this.running = true;
				this.defered = new _core.defer();
			}

			this.tick.call(window, function () {

				if (_this._q.length) {

					_this.dequeue().then(function () {
						this.run();
					}.bind(_this));
				} else {
					_this.defered.resolve();
					_this.running = undefined;
				}
			});

			// Unpause
			if (this.paused == true) {
				this.paused = false;
			}

			return this.defered.promise;
		}

		/**
   * Flush all, as quickly as possible
   * @return {Promise}
   */

	}, {
		key: "flush",
		value: function flush() {

			if (this.running) {
				return this.running;
			}

			if (this._q.length) {
				this.running = this.dequeue().then(function () {
					this.running = undefined;
					return this.flush();
				}.bind(this));

				return this.running;
			}
		}

		/**
   * Clear all items in wait
   */

	}, {
		key: "clear",
		value: function clear() {
			this._q = [];
		}

		/**
   * Get the number of tasks in the queue
   * @return {int} tasks
   */

	}, {
		key: "length",
		value: function length() {
			return this._q.length;
		}

		/**
   * Pause a running queue
   */

	}, {
		key: "pause",
		value: function pause() {
			this.paused = true;
		}

		/**
   * End the queue
   */

	}, {
		key: "stop",
		value: function stop() {
			this._q = [];
			this.running = false;
			this.paused = true;
		}
	}]);

	return Queue;
}();

/**
 * Create a new task from a callback
 * @class
 * @private
 * @param {function} task
 * @param {array} args
 * @param {scope} context
 * @return {function} task
 */


var Task = function Task(task, args, context) {
	_classCallCheck(this, Task);

	return function () {
		var _this2 = this;

		var toApply = arguments || [];

		return new Promise(function (resolve, reject) {
			var callback = function callback(value, err) {
				if (!value && err) {
					reject(err);
				} else {
					resolve(value);
				}
			};
			// Add the callback to the arguments list
			toApply.push(callback);

			// Apply all arguments to the functions
			task.apply(context || _this2, toApply);
		});
	};
};

exports.default = Queue;
exports.Task = Task;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _epubcfi = __webpack_require__(1);

var _epubcfi2 = _interopRequireDefault(_epubcfi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mapping = function () {
	function Mapping(layout, dev) {
		_classCallCheck(this, Mapping);

		this.layout = layout;
		this.horizontal = this.layout.flow === "paginated" ? true : false;
		this._dev = dev;
	}

	_createClass(Mapping, [{
		key: "section",
		value: function section(view) {
			var ranges = this.findRanges(view);
			var map = this.rangeListToCfiList(view.section.cfiBase, ranges);

			return map;
		}
	}, {
		key: "page",
		value: function page(contents, cfiBase, start, end) {
			var root = contents && contents.document ? contents.document.body : false;
			var result;

			if (!root) {
				return;
			}

			result = this.rangePairToCfiPair(cfiBase, {
				start: this.findStart(root, start, end),
				end: this.findEnd(root, start, end)
			});

			if (this._dev === true) {
				var doc = contents.document;
				var startRange = new _epubcfi2.default(result.start).toRange(doc);
				var endRange = new _epubcfi2.default(result.end).toRange(doc);

				var selection = doc.defaultView.getSelection();
				var r = doc.createRange();
				selection.removeAllRanges();
				r.setStart(startRange.startContainer, startRange.startOffset);
				r.setEnd(endRange.endContainer, endRange.endOffset);
				selection.addRange(r);
			}

			return result;
		}
	}, {
		key: "walk",
		value: function walk(root, func) {
			//IE11 has strange issue, if root is text node IE throws exception on
			//calling treeWalker.nextNode(), saying
			//Unexpected call to method or property access instead of returing null value
			if (root && root.nodeType === Node.TEXT_NODE) {
				return;
			}
			//safeFilter is required so that it can work in IE as filter is a function for IE
			// and for other browser filter is an object.
			var filter = {
				acceptNode: function acceptNode(node) {
					if (node.data.trim().length > 0) {
						return NodeFilter.FILTER_ACCEPT;
					} else {
						return NodeFilter.FILTER_REJECT;
					}
				}
			};
			var safeFilter = filter.acceptNode;
			safeFilter.acceptNode = filter.acceptNode;
			//var treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT + NodeFilter.SHOW_TEXT, null, false);
			var treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, safeFilter, false);
			var node;
			var result;
			while (node = treeWalker.nextNode()) {
				result = func(node);
				if (result) break;
			}

			return result;
		}
	}, {
		key: "findRanges",
		value: function findRanges(view) {
			var columns = [];
			var scrollWidth = view.contents.scrollWidth();
			var spreads = Math.ceil(scrollWidth / this.layout.spreadWidth);
			var count = spreads * this.layout.divisor;
			var columnWidth = this.layout.columnWidth;
			var gap = this.layout.gap;
			var start, end;

			for (var i = 0; i < count.pages; i++) {
				start = (columnWidth + gap) * i;
				end = columnWidth * (i + 1) + gap * i;
				columns.push({
					start: this.findStart(view.document.body, start, end),
					end: this.findEnd(view.document.body, start, end)
				});
			}

			return columns;
		}
	}, {
		key: "findStart",
		value: function findStart(root, start, end) {
			var _this = this;

			var stack = [root];
			var $el;
			var found;
			var $prev = root;

			while (stack.length) {

				$el = stack.shift();

				found = this.walk($el, function (node) {
					var left, right;
					var elPos;
					var elRange;

					if (node.nodeType == Node.TEXT_NODE) {
						elRange = document.createRange();
						elRange.selectNodeContents(node);
						elPos = elRange.getBoundingClientRect();
					} else {
						elPos = node.getBoundingClientRect();
					}

					left = _this.horizontal ? elPos.left : elPos.top;
					right = _this.horizontal ? elPos.right : elPos.bottom;

					if (left >= start && left <= end) {
						return node;
					} else if (right > start) {
						return node;
					} else {
						$prev = node;
						stack.push(node);
					}
				});

				if (found) {
					return this.findTextStartRange(found, start, end);
				}
			}

			// Return last element
			return this.findTextStartRange($prev, start, end);
		}
	}, {
		key: "findEnd",
		value: function findEnd(root, start, end) {
			var _this2 = this;

			var stack = [root];
			var $el;
			var $prev = root;
			var found;

			while (stack.length) {

				$el = stack.shift();

				found = this.walk($el, function (node) {

					var left, right;
					var elPos;
					var elRange;

					if (node.nodeType == Node.TEXT_NODE) {
						elRange = document.createRange();
						elRange.selectNodeContents(node);
						elPos = elRange.getBoundingClientRect();
					} else {
						elPos = node.getBoundingClientRect();
					}

					left = Math.round(_this2.horizontal ? elPos.left : elPos.top);
					right = Math.round(_this2.horizontal ? elPos.right : elPos.bottom);

					if (left > end && $prev) {
						return $prev;
					} else if (right > end) {
						return node;
					} else {
						$prev = node;
						stack.push(node);
					}
				});

				if (found) {
					return this.findTextEndRange(found, start, end);
				}
			}

			// end of chapter
			return this.findTextEndRange($prev, start, end);
		}
	}, {
		key: "findTextStartRange",
		value: function findTextStartRange(node, start, end) {
			var ranges = this.splitTextNodeIntoRanges(node);
			var range;
			var pos;
			var left;

			for (var i = 0; i < ranges.length; i++) {
				range = ranges[i];

				pos = range.getBoundingClientRect();
				left = this.horizontal ? pos.left : pos.top;

				if (left >= start) {
					return range;
				}

				// prev = range;
			}

			return ranges[0];
		}
	}, {
		key: "findTextEndRange",
		value: function findTextEndRange(node, start, end) {
			var ranges = this.splitTextNodeIntoRanges(node);
			var prev;
			var range;
			var pos;
			var left, right;

			for (var i = 0; i < ranges.length; i++) {
				range = ranges[i];

				pos = range.getBoundingClientRect();
				left = this.horizontal ? pos.left : pos.top;
				right = this.horizontal ? pos.right : pos.bottom;

				if (left > end && prev) {
					return prev;
				} else if (right > end) {
					return range;
				}

				prev = range;
			}

			// Ends before limit
			return ranges[ranges.length - 1];
		}
	}, {
		key: "splitTextNodeIntoRanges",
		value: function splitTextNodeIntoRanges(node, _splitter) {
			var ranges = [];
			var textContent = node.textContent || "";
			var text = textContent.trim();
			var range;
			var doc = node.ownerDocument;
			var splitter = _splitter || " ";

			var pos = text.indexOf(splitter);

			if (pos === -1 || node.nodeType != Node.TEXT_NODE) {
				range = doc.createRange();
				range.selectNodeContents(node);
				return [range];
			}

			range = doc.createRange();
			range.setStart(node, 0);
			range.setEnd(node, pos);
			ranges.push(range);
			range = false;

			while (pos != -1) {

				pos = text.indexOf(splitter, pos + 1);
				if (pos > 0) {

					if (range) {
						range.setEnd(node, pos);
						ranges.push(range);
					}

					range = doc.createRange();
					range.setStart(node, pos + 1);
				}
			}

			if (range) {
				range.setEnd(node, text.length);
				ranges.push(range);
			}

			return ranges;
		}
	}, {
		key: "rangePairToCfiPair",
		value: function rangePairToCfiPair(cfiBase, rangePair) {

			var startRange = rangePair.start;
			var endRange = rangePair.end;

			startRange.collapse(true);
			endRange.collapse(false);

			var startCfi = new _epubcfi2.default(startRange, cfiBase).toString();
			var endCfi = new _epubcfi2.default(endRange, cfiBase).toString();

			return {
				start: startCfi,
				end: endCfi
			};
		}
	}, {
		key: "rangeListToCfiList",
		value: function rangeListToCfiList(cfiBase, columns) {
			var map = [];
			var cifPair;

			for (var i = 0; i < columns.length; i++) {
				cifPair = this.rangePairToCfiPair(cfiBase, columns[i]);

				map.push(cifPair);
			}

			return map;
		}
	}]);

	return Mapping;
}();

exports.default = Mapping;
module.exports = exports["default"];

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventEmitter = __webpack_require__(2);

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

var _core = __webpack_require__(0);

var _epubcfi = __webpack_require__(1);

var _epubcfi2 = _interopRequireDefault(_epubcfi);

var _mapping = __webpack_require__(12);

var _mapping2 = _interopRequireDefault(_mapping);

var _replacements = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Dom events to listen for
var EVENTS = ["keydown", "keyup", "keypressed", "mouseup", "mousedown", "click", "touchend", "touchstart"];

var isChrome = /Chrome/.test(navigator.userAgent);
var isWebkit = !isChrome && /AppleWebKit/.test(navigator.userAgent);

var ELEMENT_NODE = 1;
var TEXT_NODE = 3;

var Contents = function () {
	function Contents(doc, content, cfiBase, sectionIndex) {
		_classCallCheck(this, Contents);

		// Blank Cfi for Parsing
		this.epubcfi = new _epubcfi2.default();

		this.document = doc;
		this.documentElement = this.document.documentElement;
		this.content = content || this.document.body;
		this.window = this.document.defaultView;

		this._size = {
			width: 0,
			height: 0
		};

		this.sectionIndex = sectionIndex || 0;
		this.cfiBase = cfiBase || "";

		this.listeners();
	}

	_createClass(Contents, [{
		key: "width",
		value: function width(w) {
			// var frame = this.documentElement;
			var frame = this.content;

			if (w && (0, _core.isNumber)(w)) {
				w = w + "px";
			}

			if (w) {
				frame.style.width = w;
				// this.content.style.width = w;
			}

			return this.window.getComputedStyle(frame)["width"];
		}
	}, {
		key: "height",
		value: function height(h) {
			// var frame = this.documentElement;
			var frame = this.content;

			if (h && (0, _core.isNumber)(h)) {
				h = h + "px";
			}

			if (h) {
				frame.style.height = h;
				// this.content.style.height = h;
			}

			return this.window.getComputedStyle(frame)["height"];
		}
	}, {
		key: "contentWidth",
		value: function contentWidth(w) {

			var content = this.content || this.document.body;

			if (w && (0, _core.isNumber)(w)) {
				w = w + "px";
			}

			if (w) {
				content.style.width = w;
			}

			return this.window.getComputedStyle(content)["width"];
		}
	}, {
		key: "contentHeight",
		value: function contentHeight(h) {

			var content = this.content || this.document.body;

			if (h && (0, _core.isNumber)(h)) {
				h = h + "px";
			}

			if (h) {
				content.style.height = h;
			}

			return this.window.getComputedStyle(content)["height"];
		}
	}, {
		key: "textWidth",
		value: function textWidth() {
			var width = void 0;
			var range = this.document.createRange();
			var content = this.content || this.document.body;
			var border = (0, _core.borders)(content);

			// Select the contents of frame
			range.selectNodeContents(content);

			// get the width of the text content
			width = range.getBoundingClientRect().width;

			if (border && border.width) {
				width += border.width;
			}

			return Math.round(width);
		}
	}, {
		key: "textHeight",
		value: function textHeight() {
			var height = void 0;
			var range = this.document.createRange();
			var content = this.content || this.document.body;
			var border = (0, _core.borders)(content);

			range.selectNodeContents(content);

			height = range.getBoundingClientRect().height;

			if (height && border.height) {
				height += border.height;
			}

			return Math.round(height);
		}
	}, {
		key: "scrollWidth",
		value: function scrollWidth() {
			var width = this.documentElement.scrollWidth;

			return width;
		}
	}, {
		key: "scrollHeight",
		value: function scrollHeight() {
			var height = this.documentElement.scrollHeight;

			return height;
		}
	}, {
		key: "overflow",
		value: function overflow(_overflow) {

			if (_overflow) {
				this.documentElement.style.overflow = _overflow;
			}

			return this.window.getComputedStyle(this.documentElement)["overflow"];
		}
	}, {
		key: "overflowX",
		value: function overflowX(overflow) {

			if (overflow) {
				this.documentElement.style.overflowX = overflow;
			}

			return this.window.getComputedStyle(this.documentElement)["overflowX"];
		}
	}, {
		key: "overflowY",
		value: function overflowY(overflow) {

			if (overflow) {
				this.documentElement.style.overflowY = overflow;
			}

			return this.window.getComputedStyle(this.documentElement)["overflowY"];
		}
	}, {
		key: "css",
		value: function css(property, value, priority) {
			var content = this.content || this.document.body;

			if (value) {
				content.style.setProperty(property, value, priority ? "important" : "");
			}

			return this.window.getComputedStyle(content)[property];
		}
	}, {
		key: "viewport",
		value: function viewport(options) {
			var _width, _height, _scale, _minimum, _maximum, _scalable;
			var width, height, scale, minimum, maximum, scalable;
			var $viewport = this.document.querySelector("meta[name='viewport']");
			var parsed = {
				"width": undefined,
				"height": undefined,
				"scale": undefined,
				"minimum": undefined,
				"maximum": undefined,
				"scalable": undefined
			};
			var newContent = [];

			/*
   * check for the viewport size
   * <meta name="viewport" content="width=1024,height=697" />
   */
			if ($viewport && $viewport.hasAttribute("content")) {
				var content = $viewport.getAttribute("content");
				var _width2 = content.match(/width\s*=\s*([^,]*)/g);
				var _height2 = content.match(/height\s*=\s*([^,]*)/g);
				var _scale2 = content.match(/initial-scale\s*=\s*([^,]*)/g);
				var _minimum2 = content.match(/minimum-scale\s*=\s*([^,]*)/g);
				var _maximum2 = content.match(/maximum-scale\s*=\s*([^,]*)/g);
				var _scalable2 = content.match(/user-scalable\s*=\s*([^,]*)/g);
				if (_width2 && _width2.length && typeof _width2[1] !== "undefined") {
					parsed.width = _width2[1];
				}
				if (_height2 && _height2.length && typeof _height2[1] !== "undefined") {
					parsed.height = _height2[1];
				}
				if (_scale2 && _scale2.length && typeof _scale2[1] !== "undefined") {
					parsed.scale = _scale2[1];
				}
				if (_minimum2 && _minimum2.length && typeof _minimum2[1] !== "undefined") {
					parsed.minimum = _minimum2[1];
				}
				if (_maximum2 && _maximum2.length && typeof _maximum2[1] !== "undefined") {
					parsed.maximum = _maximum2[1];
				}
				if (_scalable2 && _scalable2.length && typeof _scalable2[1] !== "undefined") {
					parsed.scalable = _scalable2[1];
				}
			}

			if (options) {
				if (options.width || parsed.width) {
					newContent.push("width=" + (options.width || parsed.width));
				}

				if (options.height || parsed.height) {
					newContent.push("height=" + (options.height || parsed.height));
				}

				if (options.scale || parsed.scale) {
					newContent.push("initial-scale=" + (options.scale || parsed.scale));
				}
				if (options.scalable || parsed.scalable) {
					newContent.push("minimum-scale=" + (options.scale || parsed.minimum));
					newContent.push("maximum-scale=" + (options.scale || parsed.maximum));
					newContent.push("user-scalable=" + (options.scalable || parsed.scalable));
				}

				if (!$viewport) {
					$viewport = this.document.createElement("meta");
					$viewport.setAttribute("name", "viewport");
					this.document.querySelector("head").appendChild($viewport);
				}

				$viewport.setAttribute("content", newContent.join(", "));

				this.window.scrollTo(0, 0);
			}

			return {
				width: parseInt(width),
				height: parseInt(height)
			};
		}

		// layout(layoutFunc) {
		//
		//   this.iframe.style.display = "inline-block";
		//
		//   // Reset Body Styles
		//   this.content.style.margin = "0";
		//   //this.document.body.style.display = "inline-block";
		//   //this.document.documentElement.style.width = "auto";
		//
		//   if(layoutFunc){
		//     layoutFunc(this);
		//   }
		//
		//   this.onLayout(this);
		//
		// };
		//
		// onLayout(view) {
		//   // stub
		// };

	}, {
		key: "expand",
		value: function expand() {
			this.emit("expand");
		}
	}, {
		key: "listeners",
		value: function listeners() {

			this.imageLoadListeners();

			this.mediaQueryListeners();

			// this.fontLoadListeners();

			this.addEventListeners();

			this.addSelectionListeners();

			// this.transitionListeners();

			this.resizeListeners();

			// this.resizeObservers();

			this.linksHandler();
		}
	}, {
		key: "removeListeners",
		value: function removeListeners() {

			this.removeEventListeners();

			this.removeSelectionListeners();

			clearTimeout(this.expanding);
		}
	}, {
		key: "resizeCheck",
		value: function resizeCheck() {
			var width = this.textWidth();
			var height = this.textHeight();
			if (width != this._size.width || height != this._size.height) {

				this._size = {
					width: width,
					height: height
				};

				this.onResize && this.onResize(this._size);
				this.emit("resize", this._size);
			}
		}
	}, {
		key: "resizeListeners",
		value: function resizeListeners() {
			var width, height;
			// Test size again
			clearTimeout(this.expanding);

			requestAnimationFrame(this.resizeCheck.bind(this));

			this.expanding = setTimeout(this.resizeListeners.bind(this), 350);
		}
	}, {
		key: "transitionListeners",
		value: function transitionListeners() {
			var body = this.content;

			body.style['transitionProperty'] = "font, font-size, font-size-adjust, font-stretch, font-variation-settings, font-weight, width, height";
			body.style['transitionDuration'] = "0.001ms";
			body.style['transitionTimingFunction'] = "linear";
			body.style['transitionDelay'] = "0";

			this.document.addEventListener('transitionend', this.resizeCheck.bind(this));
		}

		//https://github.com/tylergaw/media-query-events/blob/master/js/mq-events.js

	}, {
		key: "mediaQueryListeners",
		value: function mediaQueryListeners() {
			var sheets = this.document.styleSheets;
			var mediaChangeHandler = function (m) {
				if (m.matches && !this._expanding) {
					setTimeout(this.expand.bind(this), 1);
					// this.expand();
				}
			}.bind(this);

			for (var i = 0; i < sheets.length; i += 1) {
				var rules;
				// Firefox errors if we access cssRules cross-domain
				try {
					rules = sheets[i].cssRules;
				} catch (e) {
					return;
				}
				if (!rules) return; // Stylesheets changed
				for (var j = 0; j < rules.length; j += 1) {
					//if (rules[j].constructor === CSSMediaRule) {
					if (rules[j].media) {
						var mql = this.window.matchMedia(rules[j].media.mediaText);
						mql.addListener(mediaChangeHandler);
						//mql.onchange = mediaChangeHandler;
					}
				}
			}
		}
	}, {
		key: "resizeObservers",
		value: function resizeObservers() {
			var _this = this;

			// create an observer instance
			this.observer = new MutationObserver(function (mutations) {
				_this.resizeCheck();
			});

			// configuration of the observer:
			var config = { attributes: true, childList: true, characterData: true, subtree: true };

			// pass in the target node, as well as the observer options
			this.observer.observe(this.document, config);
		}
	}, {
		key: "imageLoadListeners",
		value: function imageLoadListeners(target) {
			var images = this.document.querySelectorAll("img");
			var img;
			for (var i = 0; i < images.length; i++) {
				img = images[i];

				if (typeof img.naturalWidth !== "undefined" && img.naturalWidth === 0) {
					img.onload = this.expand.bind(this);
				}
			}
		}
	}, {
		key: "fontLoadListeners",
		value: function fontLoadListeners(target) {
			if (!this.document || !this.document.fonts) {
				return;
			}

			this.document.fonts.ready.then(function () {
				this.expand();
			}.bind(this));
		}
	}, {
		key: "root",
		value: function root() {
			if (!this.document) return null;
			return this.document.documentElement;
		}
	}, {
		key: "locationOf",
		value: function locationOf(target, ignoreClass) {
			var position;
			var targetPos = { "left": 0, "top": 0 };

			if (!this.document) return targetPos;

			if (this.epubcfi.isCfiString(target)) {
				var range = new _epubcfi2.default(target).toRange(this.document, ignoreClass);

				if (range) {
					if (range.startContainer.nodeType === Node.ELEMENT_NODE) {
						position = range.startContainer.getBoundingClientRect();
						targetPos.left = position.left;
						targetPos.top = position.top;
					} else {
						// Webkit does not handle collapsed range bounds correctly
						// https://bugs.webkit.org/show_bug.cgi?id=138949

						// Construct a new non-collapsed range
						if (isWebkit) {
							var container = range.startContainer;
							var newRange = new Range();
							try {
								if (container.nodeType === ELEMENT_NODE) {
									position = container.getBoundingClientRect();
								} else if (range.startOffset + 2 < container.length) {
									newRange.setStart(container, range.startOffset);
									newRange.setEnd(container, range.startOffset + 2);
									position = newRange.getBoundingClientRect();
								} else if (range.startOffset - 2 > 0) {
									newRange.setStart(container, range.startOffset - 2);
									newRange.setEnd(container, range.startOffset);
									position = newRange.getBoundingClientRect();
								} else {
									// empty, return the parent element
									position = container.parentNode.getBoundingClientRect();
								}
							} catch (e) {
								console.error(e, e.stack);
							}
						} else {
							position = range.getBoundingClientRect();
						}
					}
				}
			} else if (typeof target === "string" && target.indexOf("#") > -1) {

				var id = target.substring(target.indexOf("#") + 1);
				var el = this.document.getElementById(id);

				if (el) {
					position = el.getBoundingClientRect();
				}
			}

			if (position) {
				targetPos.left = position.left;
				targetPos.top = position.top;
			}

			return targetPos;
		}
	}, {
		key: "addStylesheet",
		value: function addStylesheet(src) {
			return new Promise(function (resolve, reject) {
				var $stylesheet;
				var ready = false;

				if (!this.document) {
					resolve(false);
					return;
				}

				// Check if link already exists
				$stylesheet = this.document.querySelector("link[href='" + src + "']");
				if ($stylesheet) {
					resolve(true);
					return; // already present
				}

				$stylesheet = this.document.createElement("link");
				$stylesheet.type = "text/css";
				$stylesheet.rel = "stylesheet";
				$stylesheet.href = src;
				$stylesheet.onload = $stylesheet.onreadystatechange = function () {
					if (!ready && (!this.readyState || this.readyState == "complete")) {
						ready = true;
						// Let apply
						setTimeout(function () {
							resolve(true);
						}, 1);
					}
				};

				this.document.head.appendChild($stylesheet);
			}.bind(this));
		}

		// Array: https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/insertRule
		// Object: https://github.com/desirable-objects/json-to-css

	}, {
		key: "addStylesheetRules",
		value: function addStylesheetRules(rules) {
			var styleEl;
			var styleSheet;
			var key = "epubjs-inserted-css";

			if (!this.document || !rules || rules.length === 0) return;

			// Check if link already exists
			styleEl = this.document.getElementById("#" + key);
			if (!styleEl) {
				styleEl = this.document.createElement("style");
				styleEl.id = key;
			}

			// Append style element to head
			this.document.head.appendChild(styleEl);

			// Grab style sheet
			styleSheet = styleEl.sheet;

			if (Object.prototype.toString.call(rules) === "[object Array]") {
				for (var i = 0, rl = rules.length; i < rl; i++) {
					var j = 1,
					    rule = rules[i],
					    selector = rules[i][0],
					    propStr = "";
					// If the second argument of a rule is an array of arrays, correct our variables.
					if (Object.prototype.toString.call(rule[1][0]) === "[object Array]") {
						rule = rule[1];
						j = 0;
					}

					for (var pl = rule.length; j < pl; j++) {
						var prop = rule[j];
						propStr += prop[0] + ":" + prop[1] + (prop[2] ? " !important" : "") + ";\n";
					}

					// Insert CSS Rule
					styleSheet.insertRule(selector + "{" + propStr + "}", styleSheet.cssRules.length);
				}
			} else {
				var selectors = Object.keys(rules);
				selectors.forEach(function (selector) {
					var definition = rules[selector];
					if (Array.isArray(definition)) {
						definition.forEach(function (item) {
							var _rules = Object.keys(item);
							var result = _rules.map(function (rule) {
								return rule + ":" + item[rule];
							}).join(';');
							styleSheet.insertRule(selector + "{" + result + "}", styleSheet.cssRules.length);
						});
					} else {
						var _rules = Object.keys(definition);
						var result = _rules.map(function (rule) {
							return rule + ":" + definition[rule];
						}).join(';');
						styleSheet.insertRule(selector + "{" + result + "}", styleSheet.cssRules.length);
					}
				});
			}
		}
	}, {
		key: "addScript",
		value: function addScript(src) {

			return new Promise(function (resolve, reject) {
				var $script;
				var ready = false;

				if (!this.document) {
					resolve(false);
					return;
				}

				$script = this.document.createElement("script");
				$script.type = "text/javascript";
				$script.async = true;
				$script.src = src;
				$script.onload = $script.onreadystatechange = function () {
					if (!ready && (!this.readyState || this.readyState == "complete")) {
						ready = true;
						setTimeout(function () {
							resolve(true);
						}, 1);
					}
				};

				this.document.head.appendChild($script);
			}.bind(this));
		}
	}, {
		key: "addClass",
		value: function addClass(className) {
			var content;

			if (!this.document) return;

			content = this.content || this.document.body;

			if (content) {
				content.classList.add(className);
			}
		}
	}, {
		key: "removeClass",
		value: function removeClass(className) {
			var content;

			if (!this.document) return;

			content = this.content || this.document.body;

			if (content) {
				content.classList.remove(className);
			}
		}
	}, {
		key: "addEventListeners",
		value: function addEventListeners() {
			if (!this.document) {
				return;
			}

			EVENTS.forEach(function (eventName) {
				this.document.addEventListener(eventName, this.triggerEvent.bind(this), false);
			}, this);
		}
	}, {
		key: "removeEventListeners",
		value: function removeEventListeners() {
			if (!this.document) {
				return;
			}
			EVENTS.forEach(function (eventName) {
				this.document.removeEventListener(eventName, this.triggerEvent, false);
			}, this);
		}

		// Pass browser events

	}, {
		key: "triggerEvent",
		value: function triggerEvent(e) {
			this.emit(e.type, e);
		}
	}, {
		key: "addSelectionListeners",
		value: function addSelectionListeners() {
			if (!this.document) {
				return;
			}
			this.document.addEventListener("selectionchange", this.onSelectionChange.bind(this), false);
		}
	}, {
		key: "removeSelectionListeners",
		value: function removeSelectionListeners() {
			if (!this.document) {
				return;
			}
			this.document.removeEventListener("selectionchange", this.onSelectionChange, false);
		}
	}, {
		key: "onSelectionChange",
		value: function onSelectionChange(e) {
			if (this.selectionEndTimeout) {
				clearTimeout(this.selectionEndTimeout);
			}
			this.selectionEndTimeout = setTimeout(function () {
				var selection = this.window.getSelection();
				this.triggerSelectedEvent(selection);
			}.bind(this), 250);
		}
	}, {
		key: "triggerSelectedEvent",
		value: function triggerSelectedEvent(selection) {
			var range, cfirange;

			if (selection && selection.rangeCount > 0) {
				range = selection.getRangeAt(0);
				if (!range.collapsed) {
					// cfirange = this.section.cfiFromRange(range);
					cfirange = new _epubcfi2.default(range, this.cfiBase).toString();
					this.emit("selected", cfirange);
					this.emit("selectedRange", range);
				}
			}
		}
	}, {
		key: "range",
		value: function range(_cfi, ignoreClass) {
			var cfi = new _epubcfi2.default(_cfi);
			return cfi.toRange(this.document, ignoreClass);
		}
	}, {
		key: "cfiFromRange",
		value: function cfiFromRange(range, ignoreClass) {
			return new _epubcfi2.default(range, this.cfiBase, ignoreClass).toString();
		}
	}, {
		key: "cfiFromNode",
		value: function cfiFromNode(node, ignoreClass) {
			return new _epubcfi2.default(node, this.cfiBase, ignoreClass).toString();
		}
	}, {
		key: "map",
		value: function map(layout) {
			var map = new _mapping2.default(layout);
			return map.section();
		}
	}, {
		key: "size",
		value: function size(width, height) {
			var viewport = { scale: 1.0, scalable: "no" };

			if (width >= 0) {
				this.width(width);
				viewport.width = width;
				this.css("padding", "0 " + width / 12 + "px", true);
			}

			if (height >= 0) {
				this.height(height);
				viewport.height = height;
			}

			this.css("margin", "0");
			this.css("box-sizing", "border-box");

			this.viewport(viewport);
		}
	}, {
		key: "columns",
		value: function columns(width, height, columnWidth, gap) {
			var COLUMN_AXIS = (0, _core.prefixed)("column-axis");
			var COLUMN_GAP = (0, _core.prefixed)("column-gap");
			var COLUMN_WIDTH = (0, _core.prefixed)("column-width");
			var COLUMN_FILL = (0, _core.prefixed)("column-fill");

			this.width(width);
			this.height(height);

			// Deal with Mobile trying to scale to viewport
			this.viewport({ width: width, height: height, scale: 1.0, scalable: "no" });

			this.css("display", "inline-block"); // Fixes Safari column cut offs
			this.css("overflow-y", "hidden");
			this.css("margin", "0", true);

			this.css("padding", "20px " + gap / 2 + "px", true);

			this.css("box-sizing", "border-box");
			this.css("max-width", "inherit");

			this.css(COLUMN_AXIS, "horizontal");
			this.css(COLUMN_FILL, "auto");

			this.css(COLUMN_GAP, gap + "px");
			this.css(COLUMN_WIDTH, columnWidth + "px");
		}
	}, {
		key: "scaler",
		value: function scaler(scale, offsetX, offsetY) {
			var scaleStr = "scale(" + scale + ")";
			var translateStr = "";
			// this.css("position", "absolute"));
			this.css("transform-origin", "top left");

			if (offsetX >= 0 || offsetY >= 0) {
				translateStr = " translate(" + (offsetX || 0) + "px, " + (offsetY || 0) + "px )";
			}

			this.css("transform", scaleStr + translateStr);
		}
	}, {
		key: "fit",
		value: function fit(width, height) {
			var viewport = this.viewport();
			var widthScale = width / viewport.width;
			var heightScale = height / viewport.height;
			var scale = widthScale < heightScale ? widthScale : heightScale;

			var offsetY = (height - viewport.height * scale) / 2;

			this.width(width);
			this.height(height);
			this.overflow("hidden");

			// Deal with Mobile trying to scale to viewport
			this.viewport({ width: width, height: height, scale: 1.0 });

			// Scale to the correct size
			this.scaler(scale, 0, offsetY);

			this.css("background-color", "transparent");
		}
	}, {
		key: "mapPage",
		value: function mapPage(cfiBase, layout, start, end, dev) {
			var mapping = new _mapping2.default(layout, dev);

			return mapping.page(this, cfiBase, start, end);
		}
	}, {
		key: "linksHandler",
		value: function linksHandler() {
			var _this2 = this;

			(0, _replacements.replaceLinks)(this.content, function (href) {
				_this2.emit("linkClicked", href);
			});
		}
	}, {
		key: "destroy",
		value: function destroy() {
			// Stop observing
			if (this.observer) {
				this.observer.disconnect();
			}

			this.document.removeEventListener('transitionend', this.resizeCheck);

			this.removeListeners();
		}
	}], [{
		key: "listenedEvents",
		get: function get() {
			return EVENTS;
		}
	}]);

	return Contents;
}();

(0, _eventEmitter2.default)(Contents.prototype);

exports.default = Contents;
module.exports = exports["default"];

/***/ }),
/* 14 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_15__;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 From Zip.js, by Gildas Lormeau
edited down
 */

var table = {
	"application": {
		"ecmascript": ["es", "ecma"],
		"javascript": "js",
		"ogg": "ogx",
		"pdf": "pdf",
		"postscript": ["ps", "ai", "eps", "epsi", "epsf", "eps2", "eps3"],
		"rdf+xml": "rdf",
		"smil": ["smi", "smil"],
		"xhtml+xml": ["xhtml", "xht"],
		"xml": ["xml", "xsl", "xsd", "opf", "ncx"],
		"zip": "zip",
		"x-httpd-eruby": "rhtml",
		"x-latex": "latex",
		"x-maker": ["frm", "maker", "frame", "fm", "fb", "book", "fbdoc"],
		"x-object": "o",
		"x-shockwave-flash": ["swf", "swfl"],
		"x-silverlight": "scr",
		"epub+zip": "epub",
		"font-tdpfr": "pfr",
		"inkml+xml": ["ink", "inkml"],
		"json": "json",
		"jsonml+json": "jsonml",
		"mathml+xml": "mathml",
		"metalink+xml": "metalink",
		"mp4": "mp4s",
		// "oebps-package+xml" : "opf",
		"omdoc+xml": "omdoc",
		"oxps": "oxps",
		"vnd.amazon.ebook": "azw",
		"widget": "wgt",
		// "x-dtbncx+xml" : "ncx",
		"x-dtbook+xml": "dtb",
		"x-dtbresource+xml": "res",
		"x-font-bdf": "bdf",
		"x-font-ghostscript": "gsf",
		"x-font-linux-psf": "psf",
		"x-font-otf": "otf",
		"x-font-pcf": "pcf",
		"x-font-snf": "snf",
		"x-font-ttf": ["ttf", "ttc"],
		"x-font-type1": ["pfa", "pfb", "pfm", "afm"],
		"x-font-woff": "woff",
		"x-mobipocket-ebook": ["prc", "mobi"],
		"x-mspublisher": "pub",
		"x-nzb": "nzb",
		"x-tgif": "obj",
		"xaml+xml": "xaml",
		"xml-dtd": "dtd",
		"xproc+xml": "xpl",
		"xslt+xml": "xslt",
		"internet-property-stream": "acx",
		"x-compress": "z",
		"x-compressed": "tgz",
		"x-gzip": "gz"
	},
	"audio": {
		"flac": "flac",
		"midi": ["mid", "midi", "kar", "rmi"],
		"mpeg": ["mpga", "mpega", "mp2", "mp3", "m4a", "mp2a", "m2a", "m3a"],
		"mpegurl": "m3u",
		"ogg": ["oga", "ogg", "spx"],
		"x-aiff": ["aif", "aiff", "aifc"],
		"x-ms-wma": "wma",
		"x-wav": "wav",
		"adpcm": "adp",
		"mp4": "mp4a",
		"webm": "weba",
		"x-aac": "aac",
		"x-caf": "caf",
		"x-matroska": "mka",
		"x-pn-realaudio-plugin": "rmp",
		"xm": "xm",
		"mid": ["mid", "rmi"]
	},
	"image": {
		"gif": "gif",
		"ief": "ief",
		"jpeg": ["jpeg", "jpg", "jpe"],
		"pcx": "pcx",
		"png": "png",
		"svg+xml": ["svg", "svgz"],
		"tiff": ["tiff", "tif"],
		"x-icon": "ico",
		"bmp": "bmp",
		"webp": "webp",
		"x-pict": ["pic", "pct"],
		"x-tga": "tga",
		"cis-cod": "cod"
	},
	"text": {
		"cache-manifest": ["manifest", "appcache"],
		"css": "css",
		"csv": "csv",
		"html": ["html", "htm", "shtml", "stm"],
		"mathml": "mml",
		"plain": ["txt", "text", "brf", "conf", "def", "list", "log", "in", "bas"],
		"richtext": "rtx",
		"tab-separated-values": "tsv",
		"x-bibtex": "bib"
	},
	"video": {
		"mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v", "mp2", "mpa", "mpv2"],
		"mp4": ["mp4", "mp4v", "mpg4"],
		"quicktime": ["qt", "mov"],
		"ogg": "ogv",
		"vnd.mpegurl": ["mxu", "m4u"],
		"x-flv": "flv",
		"x-la-asf": ["lsf", "lsx"],
		"x-mng": "mng",
		"x-ms-asf": ["asf", "asx", "asr"],
		"x-ms-wm": "wm",
		"x-ms-wmv": "wmv",
		"x-ms-wmx": "wmx",
		"x-ms-wvx": "wvx",
		"x-msvideo": "avi",
		"x-sgi-movie": "movie",
		"x-matroska": ["mpv", "mkv", "mk3d", "mks"],
		"3gpp2": "3g2",
		"h261": "h261",
		"h263": "h263",
		"h264": "h264",
		"jpeg": "jpgv",
		"jpm": ["jpm", "jpgm"],
		"mj2": ["mj2", "mjp2"],
		"vnd.ms-playready.media.pyv": "pyv",
		"vnd.uvvu.mp4": ["uvu", "uvvu"],
		"vnd.vivo": "viv",
		"webm": "webm",
		"x-f4v": "f4v",
		"x-m4v": "m4v",
		"x-ms-vob": "vob",
		"x-smv": "smv"
	}
};

var mimeTypes = function () {
	var type,
	    subtype,
	    val,
	    index,
	    mimeTypes = {};
	for (type in table) {
		if (table.hasOwnProperty(type)) {
			for (subtype in table[type]) {
				if (table[type].hasOwnProperty(subtype)) {
					val = table[type][subtype];
					if (typeof val == "string") {
						mimeTypes[val] = type + "/" + subtype;
					} else {
						for (index = 0; index < val.length; index++) {
							mimeTypes[val[index]] = type + "/" + subtype;
						}
					}
				}
			}
		}
	}
	return mimeTypes;
}();

var defaultValue = "text/plain"; //"application/octet-stream";

function lookup(filename) {
	return filename && mimeTypes[filename.split(".").pop().toLowerCase()] || defaultValue;
};

module.exports = {
	'lookup': lookup
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventEmitter = __webpack_require__(2);

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

var _core = __webpack_require__(0);

var _hook = __webpack_require__(9);

var _hook2 = _interopRequireDefault(_hook);

var _epubcfi = __webpack_require__(1);

var _epubcfi2 = _interopRequireDefault(_epubcfi);

var _queue = __webpack_require__(11);

var _queue2 = _interopRequireDefault(_queue);

var _layout = __webpack_require__(47);

var _layout2 = _interopRequireDefault(_layout);

var _mapping = __webpack_require__(12);

var _mapping2 = _interopRequireDefault(_mapping);

var _themes = __webpack_require__(48);

var _themes2 = _interopRequireDefault(_themes);

var _contents = __webpack_require__(13);

var _contents2 = _interopRequireDefault(_contents);

var _annotations = __webpack_require__(49);

var _annotations2 = _interopRequireDefault(_annotations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * [Rendition description]
 * @class
 * @param {Book} book
 * @param {object} options
 * @param {int} options.width
 * @param {int} options.height
 * @param {string} options.ignoreClass
 * @param {string} options.manager
 * @param {string} options.view
 * @param {string} options.layout
 * @param {string} options.spread
 * @param {int} options.minSpreadWidth overridden by spread: none (never) / both (always)
 * @param {string} options.stylesheet url of stylesheet to be injected
 */
var Rendition = function () {
	function Rendition(book, options) {
		_classCallCheck(this, Rendition);

		this.settings = (0, _core.extend)(this.settings || {}, {
			width: null,
			height: null,
			ignoreClass: "",
			manager: "default",
			view: "iframe",
			flow: null,
			layout: null,
			spread: null,
			minSpreadWidth: 800,
			stylesheet: null,
			script: null
		});

		(0, _core.extend)(this.settings, options);

		if (_typeof(this.settings.manager) === "object") {
			this.manager = this.settings.manager;
		}

		this.book = book;

		// this.views = null;

		/**
   * Adds Hook methods to the Rendition prototype
   * @property {Hook} hooks
   */
		this.hooks = {};
		this.hooks.display = new _hook2.default(this);
		this.hooks.serialize = new _hook2.default(this);
		/**
   * @property {method} hooks.content
   * @type {Hook}
   */
		this.hooks.content = new _hook2.default(this);
		this.hooks.unloaded = new _hook2.default(this);
		this.hooks.layout = new _hook2.default(this);
		this.hooks.render = new _hook2.default(this);
		this.hooks.show = new _hook2.default(this);

		this.hooks.content.register(this.handleLinks.bind(this));
		this.hooks.content.register(this.passEvents.bind(this));
		this.hooks.content.register(this.adjustImages.bind(this));

		this.book.spine.hooks.content.register(this.injectIdentifier.bind(this));

		if (this.settings.stylesheet) {
			this.book.spine.hooks.content.register(this.injectStylesheet.bind(this));
		}

		if (this.settings.script) {
			this.book.spine.hooks.content.register(this.injectScript.bind(this));
		}

		// this.hooks.display.register(this.afterDisplay.bind(this));
		this.themes = new _themes2.default(this);

		this.annotations = new _annotations2.default(this);

		this.epubcfi = new _epubcfi2.default();

		this.q = new _queue2.default(this);

		this.q.enqueue(this.book.opened);

		// Block the queue until rendering is started
		this.starting = new _core.defer();
		this.started = this.starting.promise;
		this.q.enqueue(this.start);
	}

	/**
  * Set the manager function
  * @param {function} manager
  */


	_createClass(Rendition, [{
		key: "setManager",
		value: function setManager(manager) {
			this.manager = manager;
		}

		/**
   * Require the manager from passed string, or as a function
   * @param  {string|function} manager [description]
   * @return {method}
   */

	}, {
		key: "requireManager",
		value: function requireManager(manager) {
			var viewManager;

			// If manager is a string, try to load from register managers,
			// or require included managers directly
			if (typeof manager === "string") {
				// Use global or require
				viewManager = typeof ePub != "undefined" ? ePub.ViewManagers[manager] : undefined; //require("./managers/"+manager);
			} else {
				// otherwise, assume we were passed a function
				viewManager = manager;
			}

			return viewManager;
		}

		/**
   * Require the view from passed string, or as a function
   * @param  {string|function} view
   * @return {view}
   */

	}, {
		key: "requireView",
		value: function requireView(view) {
			var View;

			if (typeof view == "string") {
				View = typeof ePub != "undefined" ? ePub.Views[view] : undefined; //require("./views/"+view);
			} else {
				// otherwise, assume we were passed a function
				View = view;
			}

			return View;
		}

		/**
   * Start the rendering
   * @return {Promise} rendering has started
   */

	}, {
		key: "start",
		value: function start() {

			if (!this.manager) {
				this.ViewManager = this.requireManager(this.settings.manager);
				this.View = this.requireView(this.settings.view);

				this.manager = new this.ViewManager({
					view: this.View,
					queue: this.q,
					request: this.book.load.bind(this.book),
					settings: this.settings
				});
			}

			// Parse metadata to get layout props
			this.settings.globalLayoutProperties = this.determineLayoutProperties(this.book.package.metadata);

			this.flow(this.settings.globalLayoutProperties.flow);

			this.layout(this.settings.globalLayoutProperties);

			// Listen for displayed views
			this.manager.on("added", this.afterDisplayed.bind(this));
			this.manager.on("removed", this.afterRemoved.bind(this));

			// Listen for resizing
			this.manager.on("resized", this.onResized.bind(this));

			// Listen for rotation
			this.manager.on("orientationchange", this.onOrientationChange.bind(this));

			// Listen for scroll changes
			this.manager.on("scrolled", this.reportLocation.bind(this));

			// Trigger that rendering has started
			this.emit("started");

			// Start processing queue
			this.starting.resolve();
		}

		/**
   * Call to attach the container to an element in the dom
   * Container must be attached before rendering can begin
   * @param  {element} element to attach to
   * @return {Promise}
   */

	}, {
		key: "attachTo",
		value: function attachTo(element) {

			return this.q.enqueue(function () {

				// Start rendering
				this.manager.render(element, {
					"width": this.settings.width,
					"height": this.settings.height
				});

				// Trigger Attached
				this.emit("attached");
			}.bind(this));
		}

		/**
   * Display a point in the book
   * The request will be added to the rendering Queue,
   * so it will wait until book is opened, rendering started
   * and all other rendering tasks have finished to be called.
   * @param  {string} target Url or EpubCFI
   * @return {Promise}
   */

	}, {
		key: "display",
		value: function display(target) {
			if (this.displaying) {
				this.displaying.resolve();
			}
			return this.q.enqueue(this._display, target);
		}

		/**
   * Tells the manager what to display immediately
   * @private
   * @param  {string} target Url or EpubCFI
   * @return {Promise}
   */

	}, {
		key: "_display",
		value: function _display(target) {
			var _this = this;

			if (!this.book) {
				return;
			}
			var isCfiString = this.epubcfi.isCfiString(target);
			var displaying = new _core.defer();
			var displayed = displaying.promise;
			var section;
			var moveTo;

			this.displaying = displaying;

			// Check if this is a book percentage
			if (this.book.locations.length && ((0, _core.isFloat)(target) || typeof target === "string" && target == parseFloat(target)) // Handle 1.0
			) {
					target = this.book.locations.cfiFromPercentage(parseFloat(target));
				}

			section = this.book.spine.get(target);

			if (!section) {
				displaying.reject(new Error("No Section Found"));
				return displayed;
			}

			this.manager.display(section, target).then(function () {
				displaying.resolve(section);
				_this.displaying = undefined;

				_this.emit("displayed", section);
				_this.reportLocation();
			});

			return displayed;
		}

		/*
  render(view, show) {
  		// view.onLayout = this.layout.format.bind(this.layout);
  	view.create();
  		// Fit to size of the container, apply padding
  	this.manager.resizeView(view);
  		// Render Chain
  	return view.section.render(this.book.request)
  		.then(function(contents){
  			return view.load(contents);
  		}.bind(this))
  		.then(function(doc){
  			return this.hooks.content.trigger(view, this);
  		}.bind(this))
  		.then(function(){
  			this.layout.format(view.contents);
  			return this.hooks.layout.trigger(view, this);
  		}.bind(this))
  		.then(function(){
  			return view.display();
  		}.bind(this))
  		.then(function(){
  			return this.hooks.render.trigger(view, this);
  		}.bind(this))
  		.then(function(){
  			if(show !== false) {
  				this.q.enqueue(function(view){
  					view.show();
  				}, view);
  			}
  			// this.map = new Map(view, this.layout);
  			this.hooks.show.trigger(view, this);
  			this.trigger("rendered", view.section);
  			}.bind(this))
  		.catch(function(e){
  			this.trigger("loaderror", e);
  		}.bind(this));
  	}
  */

		/**
   * Report what has been displayed
   * @private
   * @param  {*} view
   */

	}, {
		key: "afterDisplayed",
		value: function afterDisplayed(view) {
			var _this2 = this;

			view.on("markClicked", function (cfiRange, data) {
				return _this2.triggerMarkEvent(cfiRange, data, view);
			});

			this.hooks.render.trigger(view, this).then(function () {
				if (view.contents) {
					_this2.hooks.content.trigger(view.contents, _this2).then(function () {
						_this2.emit("rendered", view.section, view);
					});
				} else {
					_this2.emit("rendered", view.section, view);
				}
			});

			// this.reportLocation();
		}

		/**
   * Report what has been removed
   * @private
   * @param  {*} view
   */

	}, {
		key: "afterRemoved",
		value: function afterRemoved(view) {
			var _this3 = this;

			this.hooks.unloaded.trigger(view, this).then(function () {
				_this3.emit("removed", view.section, view);
			});
		}

		/**
   * Report resize events and display the last seen location
   * @private
   */

	}, {
		key: "onResized",
		value: function onResized(size) {

			this.emit("resized", {
				width: size.width,
				height: size.height
			});

			if (this.location && this.location.start) {
				this.display(this.location.start.cfi);
			}
		}

		/**
   * Report orientation events and display the last seen location
   * @private
   */

	}, {
		key: "onOrientationChange",
		value: function onOrientationChange(orientation) {
			// Handled in resize event
			// if (this.location) {
			// 	this.display(this.location.start.cfi);
			// }

			this.emit("orientationchange", orientation);
		}

		/**
   * Move the Rendition to a specific offset
   * Usually you would be better off calling display()
   * @param {object} offset
   */

	}, {
		key: "moveTo",
		value: function moveTo(offset) {
			this.manager.moveTo(offset);
		}

		/**
   * Go to the next "page" in the rendition
   * @return {Promise}
   */

	}, {
		key: "next",
		value: function next() {
			return this.q.enqueue(this.manager.next.bind(this.manager)).then(this.reportLocation.bind(this));
		}

		/**
   * Go to the previous "page" in the rendition
   * @return {Promise}
   */

	}, {
		key: "prev",
		value: function prev() {
			return this.q.enqueue(this.manager.prev.bind(this.manager)).then(this.reportLocation.bind(this));
		}

		//-- http://www.idpf.org/epub/301/spec/epub-publications.html#meta-properties-rendering
		/**
   * Determine the Layout properties from metadata and settings
   * @private
   * @param  {object} metadata
   * @return {object} properties
   */

	}, {
		key: "determineLayoutProperties",
		value: function determineLayoutProperties(metadata) {
			var properties;
			var layout = this.settings.layout || metadata.layout || "reflowable";
			var spread = this.settings.spread || metadata.spread || "auto";
			var orientation = this.settings.orientation || metadata.orientation || "auto";
			var flow = this.settings.flow || metadata.flow || "auto";
			var viewport = metadata.viewport || "";
			var minSpreadWidth = this.settings.minSpreadWidth || metadata.minSpreadWidth || 800;

			if (this.settings.width >= 0 && this.settings.height >= 0) {
				viewport = "width=" + this.settings.width + ", height=" + this.settings.height + "";
			}

			properties = {
				layout: layout,
				spread: spread,
				orientation: orientation,
				flow: flow,
				viewport: viewport,
				minSpreadWidth: minSpreadWidth
			};

			return properties;
		}

		// applyLayoutProperties(){
		// 	var settings = this.determineLayoutProperties(this.book.package.metadata);
		//
		// 	this.flow(settings.flow);
		//
		// 	this.layout(settings);
		// };

		/**
   * Adjust the flow of the rendition to paginated or scrolled
   * (scrolled-continuous vs scrolled-doc are handled by different view managers)
   * @param  {string} flow
   */

	}, {
		key: "flow",
		value: function flow(_flow2) {
			var _flow = _flow2;
			if (_flow2 === "scrolled" || _flow2 === "scrolled-doc" || _flow2 === "scrolled-continuous") {
				_flow = "scrolled";
			}

			if (_flow2 === "auto" || _flow2 === "paginated") {
				_flow = "paginated";
			}

			this.settings.flow = _flow2;

			if (this._layout) {
				this._layout.flow(_flow);
			}

			if (this.manager && this._layout) {
				this.manager.applyLayout(this._layout);
			}

			if (this.manager) {
				this.manager.updateFlow(_flow);
			}

			if (this.location) {
				this.manager.clear();
				this.display(this.location.start.cfi);
			}
		}

		/**
   * Adjust the layout of the rendition to reflowable or pre-paginated
   * @param  {object} settings
   */

	}, {
		key: "layout",
		value: function layout(settings) {
			if (settings) {
				this._layout = new _layout2.default(settings);
				this._layout.spread(settings.spread, this.settings.minSpreadWidth);

				this.mapping = new _mapping2.default(this._layout.props);
			}

			if (this.manager && this._layout) {
				this.manager.applyLayout(this._layout);
			}

			return this._layout;
		}

		/**
   * Adjust if the rendition uses spreads
   * @param  {string} spread none | auto (TODO: implement landscape, portrait, both)
   * @param  {int} min min width to use spreads at
   */

	}, {
		key: "spread",
		value: function spread(_spread, min) {

			this._layout.spread(_spread, min);

			if (this.manager.isRendered()) {
				this.manager.updateLayout();
			}
		}

		/**
   * Report the current location
   * @private
   */

	}, {
		key: "reportLocation",
		value: function reportLocation() {
			return this.q.enqueue(function reportedLocation() {
				requestAnimationFrame(function reportedLocationAfterRAF() {
					var location = this.manager.currentLocation();
					if (location && location.then && typeof location.then === "function") {
						location.then(function (result) {
							var located = this.located(result);

							if (!located || !located.start || !located.end) {
								return;
							}

							this.location = located;

							this.emit("locationChanged", {
								index: this.location.start.index,
								href: this.location.start.href,
								start: this.location.start.cfi,
								end: this.location.end.cfi,
								percentage: this.location.start.percentage
							});

							this.emit("relocated", this.location);
						}.bind(this));
					} else if (location) {
						var located = this.located(location);

						if (!located || !located.start || !located.end) {
							return;
						}

						this.location = located;

						this.emit("locationChanged", {
							index: this.location.start.index,
							href: this.location.start.href,
							start: this.location.start.cfi,
							end: this.location.end.cfi,
							percentage: this.location.start.percentage
						});

						this.emit("relocated", this.location);
					}
				}.bind(this));
			}.bind(this));
		}

		/**
   * Get the Current Location CFI
   * @return {EpubCFI} location (may be a promise)
   */

	}, {
		key: "currentLocation",
		value: function currentLocation() {
			var location = this.manager.currentLocation();
			if (location && location.then && typeof location.then === "function") {
				location.then(function (result) {
					var located = this.located(result);
					return located;
				}.bind(this));
			} else if (location) {
				var located = this.located(location);
				return located;
			}
		}
	}, {
		key: "located",
		value: function located(location) {
			if (!location.length) {
				return {};
			}
			var start = location[0];
			var end = location[location.length - 1];

			var located = {
				start: {
					index: start.index,
					href: start.href,
					cfi: start.mapping.start,
					displayed: {
						page: start.pages[0] || 1,
						total: start.totalPages
					}
				},
				end: {
					index: end.index,
					href: end.href,
					cfi: end.mapping.end,
					displayed: {
						page: end.pages[end.pages.length - 1] || 1,
						total: end.totalPages
					}
				}
			};

			var locationStart = this.book.locations.locationFromCfi(start.mapping.start);
			var locationEnd = this.book.locations.locationFromCfi(end.mapping.end);

			if (locationStart != null) {
				located.start.location = locationStart;
				located.start.percentage = this.book.locations.percentageFromLocation(locationStart);
			}
			if (locationEnd != null) {
				located.end.location = locationEnd;
				located.end.percentage = this.book.locations.percentageFromLocation(locationEnd);
			}

			var pageStart = this.book.pageList.pageFromCfi(start.mapping.start);
			var pageEnd = this.book.pageList.pageFromCfi(end.mapping.end);

			if (pageStart != -1) {
				located.start.page = pageStart;
			}
			if (pageEnd != -1) {
				located.end.page = pageEnd;
			}

			if (end.index === this.book.spine.last().index && located.end.displayed.page >= located.end.displayed.total) {
				located.atEnd = true;
			}

			if (start.index === this.book.spine.first().index && located.start.displayed.page === 1) {
				located.atStart = true;
			}

			return located;
		}

		/**
   * Remove and Clean Up the Rendition
   */

	}, {
		key: "destroy",
		value: function destroy() {
			// Clear the queue
			// this.q.clear();
			// this.q = undefined;

			this.manager && this.manager.destroy();

			this.book = undefined;

			// this.views = null;

			// this.hooks.display.clear();
			// this.hooks.serialize.clear();
			// this.hooks.content.clear();
			// this.hooks.layout.clear();
			// this.hooks.render.clear();
			// this.hooks.show.clear();
			// this.hooks = {};

			// this.themes.destroy();
			// this.themes = undefined;

			// this.epubcfi = undefined;

			// this.starting = undefined;
			// this.started = undefined;

		}

		/**
   * Pass the events from a view's Contents
   * @private
   * @param  {View} view
   */

	}, {
		key: "passEvents",
		value: function passEvents(contents) {
			var _this4 = this;

			var listenedEvents = _contents2.default.listenedEvents;

			listenedEvents.forEach(function (e) {
				contents.on(e, function (ev) {
					return _this4.triggerViewEvent(ev, contents);
				});
			});

			contents.on("selected", function (e) {
				return _this4.triggerSelectedEvent(e, contents);
			});
		}

		/**
   * Emit events passed by a view
   * @private
   * @param  {event} e
   */

	}, {
		key: "triggerViewEvent",
		value: function triggerViewEvent(e, contents) {
			this.emit(e.type, e, contents);
		}

		/**
   * Emit a selection event's CFI Range passed from a a view
   * @private
   * @param  {EpubCFI} cfirange
   */

	}, {
		key: "triggerSelectedEvent",
		value: function triggerSelectedEvent(cfirange, contents) {
			this.emit("selected", cfirange, contents);
		}

		/**
   * Emit a markClicked event with the cfiRange and data from a mark
   * @private
   * @param  {EpubCFI} cfirange
   */

	}, {
		key: "triggerMarkEvent",
		value: function triggerMarkEvent(cfiRange, data, contents) {
			this.emit("markClicked", cfiRange, data, contents);
		}

		/**
   * Get a Range from a Visible CFI
   * @param  {string} cfi EpubCfi String
   * @param  {string} ignoreClass
   * @return {range}
   */

	}, {
		key: "getRange",
		value: function getRange(cfi, ignoreClass) {
			var _cfi = new _epubcfi2.default(cfi);
			var found = this.manager.visible().filter(function (view) {
				if (_cfi.spinePos === view.index) return true;
			});

			// Should only every return 1 item
			if (found.length) {
				return found[0].contents.range(_cfi, ignoreClass);
			}
		}

		/**
   * Hook to adjust images to fit in columns
   * @param  {View} view
   */

	}, {
		key: "adjustImages",
		value: function adjustImages(contents) {

			if (this._layout.name === "pre-paginated") {
				return new Promise(function (resolve) {
					resolve();
				});
			}

			contents.addStylesheetRules({
				"img": {
					"max-width": (this._layout.columnWidth ? this._layout.columnWidth + "px" : "100%") + "!important",
					"max-height": (this._layout.height ? this._layout.height * 0.6 + "px" : "60%") + "!important",
					"object-fit": "contain",
					"page-break-inside": "avoid"
				}
			});

			return new Promise(function (resolve, reject) {
				// Wait to apply
				setTimeout(function () {
					resolve();
				}, 1);
			});
		}
	}, {
		key: "getContents",
		value: function getContents() {
			return this.manager ? this.manager.getContents() : [];
		}
	}, {
		key: "views",
		value: function views() {
			var views = this.manager ? this.manager.views : undefined;
			return views || [];
		}
	}, {
		key: "handleLinks",
		value: function handleLinks(contents) {
			var _this5 = this;

			if (contents) {
				contents.on("link", function (href) {
					var relative = _this5.book.path.relative(href);
					_this5.display(relative);
				});
			}
		}
	}, {
		key: "injectStylesheet",
		value: function injectStylesheet(doc, section) {
			var style = doc.createElement("link");
			style.setAttribute("type", "text/css");
			style.setAttribute("rel", "stylesheet");
			style.setAttribute("href", this.settings.stylesheet);
			doc.getElementsByTagName("head")[0].appendChild(style);
		}
	}, {
		key: "injectScript",
		value: function injectScript(doc, section) {
			var script = doc.createElement("script");
			script.setAttribute("type", "text/javascript");
			script.setAttribute("src", this.settings.script);
			script.textContent = " "; // Needed to prevent self closing tag
			doc.getElementsByTagName("head")[0].appendChild(script);
		}
	}, {
		key: "injectIdentifier",
		value: function injectIdentifier(doc, section) {
			var ident = this.book.package.metadata.identifier;
			var meta = doc.createElement("meta");
			meta.setAttribute("name", "dc.relation.ispartof");
			if (ident) {
				meta.setAttribute("content", ident);
			}
			doc.getElementsByTagName("head")[0].appendChild(meta);
		}
	}]);

	return Rendition;
}();

//-- Enable binding events to Renderer


(0, _eventEmitter2.default)(Rendition.prototype);

exports.default = Rendition;
module.exports = exports["default"];

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventEmitter = __webpack_require__(2);

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

var _core = __webpack_require__(0);

var _mapping = __webpack_require__(12);

var _mapping2 = _interopRequireDefault(_mapping);

var _queue = __webpack_require__(11);

var _queue2 = _interopRequireDefault(_queue);

var _stage = __webpack_require__(58);

var _stage2 = _interopRequireDefault(_stage);

var _views = __webpack_require__(68);

var _views2 = _interopRequireDefault(_views);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DefaultViewManager = function () {
	function DefaultViewManager(options) {
		_classCallCheck(this, DefaultViewManager);

		this.name = "default";
		this.View = options.view;
		this.request = options.request;
		this.renditionQueue = options.queue;
		this.q = new _queue2.default(this);

		this.settings = (0, _core.extend)(this.settings || {}, {
			infinite: true,
			hidden: false,
			width: undefined,
			height: undefined,
			// globalLayoutProperties : { layout: "reflowable", spread: "auto", orientation: "auto"},
			// layout: null,
			axis: "vertical",
			ignoreClass: ""
		});

		(0, _core.extend)(this.settings, options.settings || {});

		this.viewSettings = {
			ignoreClass: this.settings.ignoreClass,
			axis: this.settings.axis,
			layout: this.layout,
			method: this.settings.method, // srcdoc, blobUrl, write
			width: 0,
			height: 0
		};
	}

	_createClass(DefaultViewManager, [{
		key: "render",
		value: function render(element, size) {
			var tag = element.tagName;

			if (tag && (tag.toLowerCase() == "body" || tag.toLowerCase() == "html")) {
				this.fullsize = true;
			}

			if (this.fullsize) {
				this.settings.overflow = "visible";
				this.overflow = this.settings.overflow;
			}

			this.settings.size = size;

			// Save the stage
			this.stage = new _stage2.default({
				width: size.width,
				height: size.height,
				overflow: this.overflow,
				hidden: this.settings.hidden,
				axis: this.settings.axis,
				fullsize: this.fullsize
			});

			this.stage.attachTo(element);

			// Get this stage container div
			this.container = this.stage.getContainer();

			// Views array methods
			this.views = new _views2.default(this.container);

			// Calculate Stage Size
			this._bounds = this.bounds();
			this._stageSize = this.stage.size();

			// Set the dimensions for views
			this.viewSettings.width = this._stageSize.width;
			this.viewSettings.height = this._stageSize.height;

			// Function to handle a resize event.
			// Will only attach if width and height are both fixed.
			this.stage.onResize(this.onResized.bind(this));

			this.stage.onOrientationChange(this.onOrientationChange.bind(this));

			// Add Event Listeners
			this.addEventListeners();

			// Add Layout method
			// this.applyLayoutMethod();
			if (this.layout) {
				this.updateLayout();
			}
		}
	}, {
		key: "addEventListeners",
		value: function addEventListeners() {
			var scroller;

			window.addEventListener("unload", function (e) {
				this.destroy();
			}.bind(this));

			if (!this.fullsize) {
				scroller = this.container;
			} else {
				scroller = window;
			}

			scroller.addEventListener("scroll", this.onScroll.bind(this));
		}
	}, {
		key: "removeEventListeners",
		value: function removeEventListeners() {
			var scroller;

			if (!this.fullsize) {
				scroller = this.container;
			} else {
				scroller = window;
			}

			scroller.removeEventListener("scroll", this.onScroll.bind(this));
		}
	}, {
		key: "destroy",
		value: function destroy() {
			clearTimeout(this.orientationTimeout);
			clearTimeout(this.resizeTimeout);
			clearTimeout(this.afterScrolled);

			this.clear();

			this.removeEventListeners();

			this.stage.destroy();

			/*
   		clearTimeout(this.trimTimeout);
   	if(this.settings.hidden) {
   		this.element.removeChild(this.wrapper);
   	} else {
   		this.element.removeChild(this.container);
   	}
   */
		}
	}, {
		key: "onOrientationChange",
		value: function onOrientationChange(e) {
			var _window = window,
			    orientation = _window.orientation;


			this.resize();

			// Per ampproject:
			// In IOS 10.3, the measured size of an element is incorrect if the
			// element size depends on window size directly and the measurement
			// happens in window.resize event. Adding a timeout for correct
			// measurement. See https://github.com/ampproject/amphtml/issues/8479
			clearTimeout(this.orientationTimeout);
			this.orientationTimeout = setTimeout(function () {
				this.orientationTimeout = undefined;
				this.resize();
				this.emit("orientationchange", orientation);
			}.bind(this), 500);
		}
	}, {
		key: "onResized",
		value: function onResized(e) {
			this.resize();
		}
	}, {
		key: "resize",
		value: function resize(width, height) {
			var stageSize = this.stage.size(width, height);

			// For Safari, wait for orientation to catch up
			// if the window is a square
			this.winBounds = (0, _core.windowBounds)();
			if (this.orientationTimeout && this.winBounds.width === this.winBounds.height) {
				// reset the stage size for next resize
				this._stageSize = undefined;
				return;
			}

			if (this._stageSize && this._stageSize.width === stageSize.width && this._stageSize.height === stageSize.height) {
				// Size is the same, no need to resize
				return;
			}

			this._stageSize = stageSize;

			this._bounds = this.bounds();

			// Clear current views
			this.clear();

			// Update for new views
			this.viewSettings.width = this._stageSize.width;
			this.viewSettings.height = this._stageSize.height;

			this.updateLayout();

			this.emit("resized", {
				width: this._stageSize.width,
				height: this._stageSize.height
			});
		}
	}, {
		key: "createView",
		value: function createView(section) {
			return new this.View(section, this.viewSettings);
		}
	}, {
		key: "display",
		value: function display(section, target) {

			var displaying = new _core.defer();
			var displayed = displaying.promise;

			// Check if moving to target is needed
			if (target === section.href || parseInt(target)) {
				target = undefined;
			}

			// Check to make sure the section we want isn't already shown
			var visible = this.views.find(section);

			// View is already shown, just move to correct location in view
			if (visible && section) {
				var offset = visible.offset();
				this.scrollTo(offset.left, offset.top, true);

				if (target) {
					var _offset = visible.locationOf(target);
					this.moveTo(_offset);
				}

				displaying.resolve();
				return displayed;
			}

			// Hide all current views
			this.clear();

			this.add(section).then(function (view) {

				// Move to correct place within the section, if needed
				if (target) {
					var _offset2 = view.locationOf(target);
					this.moveTo(_offset2);
				}
			}.bind(this)).then(function () {
				var next;
				if (this.layout.name === "pre-paginated" && this.layout.divisor > 1) {
					next = section.next();
					if (next) {
						return this.add(next);
					}
				}
			}.bind(this)).then(function () {

				this.views.show();

				displaying.resolve();
			}.bind(this));
			// .then(function(){
			// 	return this.hooks.display.trigger(view);
			// }.bind(this))
			// .then(function(){
			// 	this.views.show();
			// }.bind(this));
			return displayed;
		}
	}, {
		key: "afterDisplayed",
		value: function afterDisplayed(view) {
			this.emit("added", view);
		}
	}, {
		key: "afterResized",
		value: function afterResized(view) {
			this.emit("resize", view.section);
		}

		// moveTo(offset){
		// 	this.scrollTo(offset.left, offset.top);
		// };

	}, {
		key: "moveTo",
		value: function moveTo(offset) {
			var distX = 0,
			    distY = 0;

			if (this.settings.axis === "vertical") {
				distY = offset.top;
			} else {
				distX = Math.floor(offset.left / this.layout.delta) * this.layout.delta;

				if (distX + this.layout.delta > this.container.scrollWidth) {
					distX = this.container.scrollWidth - this.layout.delta;
				}
			}
			this.scrollTo(distX, distY, true);
		}
	}, {
		key: "add",
		value: function add(section) {
			var view = this.createView(section);

			this.views.append(view);

			// view.on("shown", this.afterDisplayed.bind(this));
			view.onDisplayed = this.afterDisplayed.bind(this);
			view.onResize = this.afterResized.bind(this);

			return view.display(this.request);
		}
	}, {
		key: "append",
		value: function append(section) {
			var view = this.createView(section);
			this.views.append(view);

			view.onDisplayed = this.afterDisplayed.bind(this);
			view.onResize = this.afterResized.bind(this);

			return view.display(this.request);
		}
	}, {
		key: "prepend",
		value: function prepend(section) {
			var view = this.createView(section);

			this.views.prepend(view);

			view.onDisplayed = this.afterDisplayed.bind(this);
			view.onResize = this.afterResized.bind(this);

			return view.display(this.request);
		}
		// resizeView(view) {
		//
		// 	if(this.settings.globalLayoutProperties.layout === "pre-paginated") {
		// 		view.lock("both", this.bounds.width, this.bounds.height);
		// 	} else {
		// 		view.lock("width", this.bounds.width, this.bounds.height);
		// 	}
		//
		// };

	}, {
		key: "next",
		value: function next() {
			var next;
			var left;

			if (!this.views.length) return;

			if (this.settings.axis === "horizontal") {

				this.scrollLeft = this.container.scrollLeft;

				left = this.container.scrollLeft + this.container.offsetWidth + this.layout.delta;

				if (left <= this.container.scrollWidth) {
					this.scrollBy(this.layout.delta, 0, true);
				} else if (left - this.layout.columnWidth === this.container.scrollWidth) {
					this.scrollTo(this.container.scrollWidth - this.layout.delta, 0, true);
					next = this.views.last().section.next();
				} else {
					next = this.views.last().section.next();
				}
			} else {
				next = this.views.last().section.next();
			}

			if (next) {
				this.clear();

				return this.append(next).then(function () {
					var right;
					if (this.layout.name === "pre-paginated" && this.layout.divisor > 1) {
						right = next.next();
						if (right) {
							return this.append(right);
						}
					}
				}.bind(this)).then(function () {
					this.views.show();
				}.bind(this));
			}
		}
	}, {
		key: "prev",
		value: function prev() {
			var prev;
			var left;

			if (!this.views.length) return;

			if (this.settings.axis === "horizontal") {

				this.scrollLeft = this.container.scrollLeft;

				left = this.container.scrollLeft;

				if (left > 0) {
					this.scrollBy(-this.layout.delta, 0, true);
				} else {
					prev = this.views.first().section.prev();
				}
			} else {

				prev = this.views.first().section.prev();
			}

			if (prev) {
				this.clear();

				return this.prepend(prev).then(function () {
					var left;
					if (this.layout.name === "pre-paginated" && this.layout.divisor > 1) {
						left = prev.prev();
						if (left) {
							return this.prepend(left);
						}
					}
				}.bind(this)).then(function () {
					if (this.settings.axis === "horizontal") {
						this.scrollTo(this.container.scrollWidth - this.layout.delta, 0, true);
					}
					this.views.show();
				}.bind(this));
			}
		}
	}, {
		key: "current",
		value: function current() {
			var visible = this.visible();
			if (visible.length) {
				// Current is the last visible view
				return visible[visible.length - 1];
			}
			return null;
		}
	}, {
		key: "clear",
		value: function clear() {

			// this.q.clear();

			if (this.views) {
				this.views.hide();
				this.scrollTo(0, 0, true);
				this.views.clear();
			}
		}
	}, {
		key: "currentLocation",
		value: function currentLocation() {

			if (this.settings.axis === "vertical") {
				this.location = this.scrolledLocation();
			} else {
				this.location = this.paginatedLocation();
			}
			return this.location;
		}
	}, {
		key: "scrolledLocation",
		value: function scrolledLocation() {
			var _this = this;

			var visible = this.visible();
			var container = this.container.getBoundingClientRect();
			var pageHeight = container.height < window.innerHeight ? container.height : window.innerHeight;

			var offset = 0;
			var used = 0;

			if (this.fullsize) {
				offset = window.scrollY;
			}

			var sections = visible.map(function (view) {
				var _view$section = view.section,
				    index = _view$section.index,
				    href = _view$section.href;

				var position = view.position();
				var height = view.height();

				var startPos = offset + container.top - position.top + used;
				var endPos = startPos + pageHeight - used;
				if (endPos > height) {
					endPos = height;
					used = endPos - startPos;
				}

				var totalPages = _this.layout.count(view._height, pageHeight).pages;
				var currPage = Math.ceil(startPos / pageHeight);
				var pages = [];
				var endPage = Math.ceil(endPos / pageHeight);

				pages = [currPage];
				for (var i = currPage; i <= endPage; i++) {
					var pg = i;
					pages.push(pg);
				}

				var mapping = _this.mapping.page(view.contents, view.section.cfiBase, startPos, endPos);

				return {
					index: index,
					href: href,
					pages: pages,
					totalPages: totalPages,
					mapping: mapping
				};
			});

			return sections;
		}
	}, {
		key: "paginatedLocation",
		value: function paginatedLocation() {
			var _this2 = this;

			var visible = this.visible();
			var container = this.container.getBoundingClientRect();

			var left = 0;
			var used = 0;

			if (this.fullsize) {
				left = window.scrollX;
			}

			var sections = visible.map(function (view) {
				var _view$section2 = view.section,
				    index = _view$section2.index,
				    href = _view$section2.href;

				var offset = view.offset().left;
				var position = view.position().left;
				var width = view.width();

				// Find mapping
				var start = left + container.left - position + used;
				var end = start + _this2.layout.width - used;

				var mapping = _this2.mapping.page(view.contents, view.section.cfiBase, start, end);

				// Find displayed pages
				var startPos = left + used;
				var endPos = startPos + _this2.layout.spreadWidth - used;
				if (endPos > offset + width) {
					endPos = offset + width;
					used = _this2.layout.pageWidth;
				}

				var totalPages = _this2.layout.count(width).pages;
				var currPage = Math.ceil((startPos + _this2.layout.gap - offset) / _this2.layout.pageWidth);
				var pages = [];
				var endPage = Math.ceil((endPos - _this2.layout.gap - offset) / _this2.layout.pageWidth);

				pages = [currPage];
				for (var i = currPage; i <= endPage; i++) {
					var pg = i;
					pages.push(pg);
				}

				return {
					index: index,
					href: href,
					pages: pages,
					totalPages: totalPages,
					mapping: mapping
				};
			});

			return sections;
		}
	}, {
		key: "isVisible",
		value: function isVisible(view, offsetPrev, offsetNext, _container) {
			var position = view.position();
			var container = _container || this.bounds();

			if (this.settings.axis === "horizontal" && position.right > container.left - offsetPrev && position.left < container.right + offsetNext) {

				return true;
			} else if (this.settings.axis === "vertical" && position.bottom > container.top - offsetPrev && position.top < container.bottom + offsetNext) {

				return true;
			}

			return false;
		}
	}, {
		key: "visible",
		value: function visible() {
			var container = this.bounds();
			var views = this.views.displayed();
			var viewsLength = views.length;
			var visible = [];
			var isVisible;
			var view;

			for (var i = 0; i < viewsLength; i++) {
				view = views[i];
				isVisible = this.isVisible(view, 0, 0, container);

				if (isVisible === true) {
					visible.push(view);
				}
			}
			return visible;
		}
	}, {
		key: "scrollBy",
		value: function scrollBy(x, y, silent) {
			if (silent) {
				this.ignore = true;
			}

			if (!this.fullsize) {
				if (x) this.container.scrollLeft += x;
				if (y) this.container.scrollTop += y;
			} else {
				window.scrollBy(x, y);
			}
			this.scrolled = true;
		}
	}, {
		key: "scrollTo",
		value: function scrollTo(x, y, silent) {
			if (silent) {
				this.ignore = true;
			}

			if (!this.fullsize) {
				this.container.scrollLeft = x;
				this.container.scrollTop = y;
			} else {
				window.scrollTo(x, y);
			}
			this.scrolled = true;
		}
	}, {
		key: "onScroll",
		value: function onScroll() {
			var scrollTop = void 0;
			var scrollLeft = void 0;

			if (!this.fullsize) {
				scrollTop = this.container.scrollTop;
				scrollLeft = this.container.scrollLeft;
			} else {
				scrollTop = window.scrollY;
				scrollLeft = window.scrollX;
			}

			this.scrollTop = scrollTop;
			this.scrollLeft = scrollLeft;

			if (!this.ignore) {
				this.emit("scroll", {
					top: scrollTop,
					left: scrollLeft
				});

				clearTimeout(this.afterScrolled);
				this.afterScrolled = setTimeout(function () {
					this.emit("scrolled", {
						top: this.scrollTop,
						left: this.scrollLeft
					});
				}.bind(this), 20);
			} else {
				this.ignore = false;
			}
		}
	}, {
		key: "bounds",
		value: function bounds() {
			var bounds;

			bounds = this.stage.bounds();

			return bounds;
		}
	}, {
		key: "applyLayout",
		value: function applyLayout(layout) {

			this.layout = layout;
			this.updateLayout();

			this.mapping = new _mapping2.default(this.layout.props);

			// this.manager.layout(this.layout.format);
		}
	}, {
		key: "updateLayout",
		value: function updateLayout() {
			if (!this.stage) {
				return;
			}

			this._stageSize = this.stage.size();

			if (this.settings.axis === "vertical") {
				this.layout.calculate(this._stageSize.width, this._stageSize.height);
			} else {
				this.layout.calculate(this._stageSize.width, this._stageSize.height, this.settings.gap);

				// Set the look ahead offset for what is visible
				this.settings.offset = this.layout.delta;

				// this.stage.addStyleRules("iframe", [{"margin-right" : this.layout.gap + "px"}]);
			}

			// Set the dimensions for views
			this.viewSettings.width = this.layout.width;
			this.viewSettings.height = this.layout.height;

			this.setLayout(this.layout);
		}
	}, {
		key: "setLayout",
		value: function setLayout(layout) {

			this.viewSettings.layout = layout;

			if (this.views) {

				this.views.forEach(function (view) {
					if (view) {
						view.setLayout(layout);
					}
				});
			}
		}
	}, {
		key: "updateFlow",
		value: function updateFlow(flow) {
			var axis = flow === "paginated" ? "horizontal" : "vertical";

			this.settings.axis = axis;

			this.stage && this.stage.axis(axis);

			this.viewSettings.axis = axis;

			if (!this.settings.overflow) {
				this.overflow = flow === "paginated" ? "hidden" : "auto";
			} else {
				this.overflow = this.settings.overflow;
			}
			// this.views.forEach(function(view){
			// 	view.setAxis(axis);
			// });

			this.updateLayout();
		}
	}, {
		key: "getContents",
		value: function getContents() {
			var contents = [];
			if (!this.views) {
				return contents;
			}
			this.views.forEach(function (view) {
				var viewContents = view && view.contents;
				if (viewContents) {
					contents.push(viewContents);
				}
			});
			return contents;
		}
	}]);

	return DefaultViewManager;
}();

//-- Enable binding events to Manager


(0, _eventEmitter2.default)(DefaultViewManager.prototype);

exports.default = DefaultViewManager;
module.exports = exports["default"];

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(14),
    now = __webpack_require__(60),
    toNumber = __webpack_require__(62);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(61);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(20);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _book = __webpack_require__(23);

var _book2 = _interopRequireDefault(_book);

var _epubcfi = __webpack_require__(1);

var _epubcfi2 = _interopRequireDefault(_epubcfi);

var _rendition = __webpack_require__(17);

var _rendition2 = _interopRequireDefault(_rendition);

var _contents = __webpack_require__(13);

var _contents2 = _interopRequireDefault(_contents);

var _core = __webpack_require__(0);

var core = _interopRequireWildcard(_core);

__webpack_require__(52);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a new Book
 * @param {string|ArrayBuffer} url URL, Path or ArrayBuffer
 * @param {object} options to pass to the book
 * @returns {Book} a new Book object
 * @example ePub("/path/to/book.epub", {})
 */
function ePub(url, options) {
	return new _book2.default(url, options);
}

ePub.VERSION = "0.3";

if (typeof global !== "undefined") {
	global.EPUBJS_VERSION = ePub.VERSION;
}

ePub.CFI = _epubcfi2.default;
ePub.Rendition = _rendition2.default;
ePub.Contents = _contents2.default;
ePub.utils = core;

ePub.ViewManagers = {};
ePub.Views = {};
/**
 * register plugins
 */
ePub.register = {
	/**
  * register a new view manager
  */
	manager: function manager(name, _manager) {
		return ePub.ViewManagers[name] = _manager;
	},
	/**
  * register a new view
  */
	view: function view(name, _view) {
		return ePub.Views[name] = _view;
	}
};

// Default Views
ePub.register.view("iframe", __webpack_require__(54));

// Default View Managers
ePub.register.manager("default", __webpack_require__(18));
ePub.register.manager("continuous", __webpack_require__(69));

exports.default = ePub;
module.exports = exports["default"];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
// import path from "path";


var _eventEmitter = __webpack_require__(2);

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

var _core = __webpack_require__(0);

var _url = __webpack_require__(4);

var _url2 = _interopRequireDefault(_url);

var _path = __webpack_require__(3);

var _path2 = _interopRequireDefault(_path);

var _spine = __webpack_require__(39);

var _spine2 = _interopRequireDefault(_spine);

var _locations = __webpack_require__(41);

var _locations2 = _interopRequireDefault(_locations);

var _container = __webpack_require__(42);

var _container2 = _interopRequireDefault(_container);

var _packaging = __webpack_require__(43);

var _packaging2 = _interopRequireDefault(_packaging);

var _navigation = __webpack_require__(44);

var _navigation2 = _interopRequireDefault(_navigation);

var _resources = __webpack_require__(45);

var _resources2 = _interopRequireDefault(_resources);

var _pagelist = __webpack_require__(46);

var _pagelist2 = _interopRequireDefault(_pagelist);

var _rendition = __webpack_require__(17);

var _rendition2 = _interopRequireDefault(_rendition);

var _archive = __webpack_require__(50);

var _archive2 = _interopRequireDefault(_archive);

var _request2 = __webpack_require__(10);

var _request3 = _interopRequireDefault(_request2);

var _epubcfi = __webpack_require__(1);

var _epubcfi2 = _interopRequireDefault(_epubcfi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CONTAINER_PATH = "META-INF/container.xml";
var EPUBJS_VERSION = "0.3";

/**
 * Creates a new Book
 * @class
 * @param {string} url
 * @param {object} options
 * @param {method} options.requestMethod a request function to use instead of the default
 * @param {boolean} [options.requestCredentials=undefined] send the xhr request withCredentials
 * @param {object} [options.requestHeaders=undefined] send the xhr request headers
 * @param {string} [options.encoding=binary] optional to pass 'binary' or base64' for archived Epubs
 * @param {string} [options.replacements=none] use base64, blobUrl, or none for replacing assets in archived Epubs
 * @returns {Book}
 * @example new Book("/path/to/book.epub", {})
 * @example new Book({ replacements: "blobUrl" })
 */

var Book = function () {
	function Book(url, options) {
		var _this = this;

		_classCallCheck(this, Book);

		// Allow passing just options to the Book
		if (typeof options === "undefined" && (typeof url === "undefined" ? "undefined" : _typeof(url)) === "object") {
			options = url;
			url = undefined;
		}

		this.settings = (0, _core.extend)(this.settings || {}, {
			requestMethod: undefined,
			requestCredentials: undefined,
			requestHeaders: undefined,
			encoding: undefined,
			replacements: undefined,
			canonical: undefined
		});

		(0, _core.extend)(this.settings, options);

		// Promises
		this.opening = new _core.defer();
		/**
   * @property {promise} opened returns after the book is loaded
   */
		this.opened = this.opening.promise;
		this.isOpen = false;

		this.loading = {
			manifest: new _core.defer(),
			spine: new _core.defer(),
			metadata: new _core.defer(),
			cover: new _core.defer(),
			navigation: new _core.defer(),
			pageList: new _core.defer(),
			resources: new _core.defer()
		};

		this.loaded = {
			manifest: this.loading.manifest.promise,
			spine: this.loading.spine.promise,
			metadata: this.loading.metadata.promise,
			cover: this.loading.cover.promise,
			navigation: this.loading.navigation.promise,
			pageList: this.loading.pageList.promise,
			resources: this.loading.resources.promise
		};

		// this.ready = RSVP.hash(this.loaded);
		/**
   * @property {promise} ready returns after the book is loaded and parsed
   * @private
   */
		this.ready = Promise.all([this.loaded.manifest, this.loaded.spine, this.loaded.metadata, this.loaded.cover, this.loaded.navigation, this.loaded.resources]);

		// Queue for methods used before opening
		this.isRendered = false;
		// this._q = queue(this);

		/**
   * @property {method} request
   * @private
   */
		this.request = this.settings.requestMethod || _request3.default;

		/**
   * @property {Spine} spine
   */
		this.spine = new _spine2.default();

		/**
   * @property {Locations} locations
   */
		this.locations = new _locations2.default(this.spine, this.load.bind(this));

		/**
   * @property {Navigation} navigation
   */
		this.navigation = undefined;

		/**
   * @property {PageList} pagelist
   */
		this.pageList = new _pagelist2.default();

		/**
   * @property {Url} url
   * @private
   */
		this.url = undefined;

		/**
   * @property {Path} path
   * @private
   */
		this.path = undefined;

		/**
   * @property {boolean} archived
   * @private
   */
		this.archived = false;

		/**
   * @property {Archive} archive
   * @private
   */
		this.archive = undefined;

		/**
   * @property {Resources} resources
   * @private
   */
		this.resources = undefined;

		/**
   * @property {Rendition} rendition
   * @private
   */
		this.rendition = undefined;

		this.container = undefined;
		this.packaging = undefined;
		this.toc = undefined;

		if (url) {
			this.open(url).catch(function (error) {
				var err = new Error("Cannot load book at " + url);
				// console.error(err);
				_this.emit("openFailed", err);
			});
		}
	}

	/**
  * Open a epub or url
  * @param {string} input URL, Path or ArrayBuffer
  * @param {string} [what] to force opening
  * @returns {Promise} of when the book has been loaded
  * @example book.open("/path/to/book.epub")
  */


	_createClass(Book, [{
		key: "open",
		value: function open(input, what) {
			var opening;
			var type = what || this.determineType(input);

			if (type === "binary") {
				this.archived = true;
				this.url = new _url2.default("/", "");
				opening = this.openEpub(input);
			} else if (type === "base64") {
				this.archived = true;
				this.url = new _url2.default("/", "");
				opening = this.openEpub(input, type);
			} else if (type === "epub") {
				this.archived = true;
				this.url = new _url2.default("/", "");
				opening = this.request(input, "binary").then(this.openEpub.bind(this));
			} else if (type == "opf") {
				this.url = new _url2.default(input);
				opening = this.openPackaging(this.url.Path.toString());
			} else if (type == "json") {
				this.url = new _url2.default(input);
				opening = this.openManifest(this.url.Path.toString());
			} else {
				this.url = new _url2.default(input);
				opening = this.openContainer(CONTAINER_PATH).then(this.openPackaging.bind(this));
			}

			return opening;
		}

		/**
   * Open an archived epub
   * @private
   * @param  {binary} data
   * @param  {[string]} encoding
   * @return {Promise}
   */

	}, {
		key: "openEpub",
		value: function openEpub(data, encoding) {
			var _this2 = this;

			return this.unarchive(data, encoding || this.settings.encoding).then(function () {
				return _this2.openContainer(CONTAINER_PATH);
			}).then(function (packagePath) {
				return _this2.openPackaging(packagePath);
			});
		}

		/**
   * Open the epub container
   * @private
   * @param  {string} url
   * @return {string} packagePath
   */

	}, {
		key: "openContainer",
		value: function openContainer(url) {
			var _this3 = this;

			return this.load(url).then(function (xml) {
				_this3.container = new _container2.default(xml);
				return _this3.resolve(_this3.container.packagePath);
			});
		}

		/**
   * Open the Open Packaging Format Xml
   * @private
   * @param  {string} url
   * @return {Promise}
   */

	}, {
		key: "openPackaging",
		value: function openPackaging(url) {
			var _this4 = this;

			this.path = new _path2.default(url);
			return this.load(url).then(function (xml) {
				_this4.packaging = new _packaging2.default(xml);
				return _this4.unpack(_this4.packaging);
			});
		}

		/**
   * Open the manifest JSON
   * @private
   * @param  {string} url
   * @return {Promise}
   */

	}, {
		key: "openManifest",
		value: function openManifest(url) {
			var _this5 = this;

			this.path = new _path2.default(url);
			return this.load(url).then(function (json) {
				_this5.packaging = new _packaging2.default();
				_this5.packaging.load(json);
				return _this5.unpack(_this5.packaging);
			});
		}

		/**
   * Load a resource from the Book
   * @param  {string} path path to the resource to load
   * @return {Promise}     returns a promise with the requested resource
   */

	}, {
		key: "load",
		value: function load(path) {
			var resolved;

			if (this.archived) {
				resolved = this.resolve(path);
				return this.archive.request(resolved);
			} else {
				resolved = this.resolve(path);
				return this.request(resolved, null, this.settings.requestCredentials, this.settings.requestHeaders);
			}
		}

		/**
   * Resolve a path to it's absolute position in the Book
   * @param  {string} path
   * @param  {[boolean]} absolute force resolving the full URL
   * @return {string}          the resolved path string
   */

	}, {
		key: "resolve",
		value: function resolve(path, absolute) {
			if (!path) {
				return;
			}
			var resolved = path;
			var isAbsolute = path.indexOf("://") > -1;

			if (isAbsolute) {
				return path;
			}

			if (this.path) {
				resolved = this.path.resolve(path);
			}

			if (absolute != false && this.url) {
				resolved = this.url.resolve(resolved);
			}

			return resolved;
		}

		/**
   * Get a canonical link to a path
   * @param  {string} path
   * @return {string} the canonical path string
   */

	}, {
		key: "canonical",
		value: function canonical(path) {
			var url = path;

			if (!path) {
				return "";
			}

			if (this.settings.canonical) {
				url = this.settings.canonical(path);
			} else {
				url = this.resolve(path, true);
			}

			return url;
		}

		/**
   * Determine the type of they input passed to open
   * @private
   * @param  {string} input
   * @return {string}  binary | directory | epub | opf
   */

	}, {
		key: "determineType",
		value: function determineType(input) {
			var url;
			var path;
			var extension;

			if (this.settings.encoding === "base64") {
				return "base64";
			}

			if (typeof input != "string") {
				return "binary";
			}

			url = new _url2.default(input);
			path = url.path();
			extension = path.extension;

			if (!extension) {
				return "directory";
			}

			if (extension === "epub") {
				return "epub";
			}

			if (extension === "opf") {
				return "opf";
			}

			if (extension === "json") {
				return "json";
			}
		}

		/**
   * unpack the contents of the Books packageXml
   * @private
   * @param {document} packageXml XML Document
   */

	}, {
		key: "unpack",
		value: function unpack(opf) {
			var _this6 = this;

			this.package = opf;

			this.spine.unpack(this.package, this.resolve.bind(this), this.canonical.bind(this));

			this.resources = new _resources2.default(this.package.manifest, {
				archive: this.archive,
				resolver: this.resolve.bind(this),
				request: this.request.bind(this),
				replacements: this.settings.replacements || (this.archived ? "blobUrl" : "base64")
			});

			this.loadNavigation(this.package).then(function () {
				_this6.toc = _this6.navigation.toc;
				_this6.loading.navigation.resolve(_this6.navigation);
			});

			if (this.package.coverPath) {
				this.cover = this.resolve(this.package.coverPath);
			}
			// Resolve promises
			this.loading.manifest.resolve(this.package.manifest);
			this.loading.metadata.resolve(this.package.metadata);
			this.loading.spine.resolve(this.spine);
			this.loading.cover.resolve(this.cover);
			this.loading.resources.resolve(this.resources);
			this.loading.pageList.resolve(this.pageList);

			this.isOpen = true;

			if (this.archived || this.settings.replacements && this.settings.replacements != "none") {
				this.replacements().then(function () {
					_this6.opening.resolve(_this6);
				}).catch(function (err) {
					console.error(err);
				});
			} else {
				// Resolve book opened promise
				this.opening.resolve(this);
			}
		}

		/**
   * Load Navigation and PageList from package
   * @private
   * @param {document} opf XML Document
   */

	}, {
		key: "loadNavigation",
		value: function loadNavigation(opf) {
			var _this7 = this;

			var navPath = opf.navPath || opf.ncxPath;
			var toc = opf.toc;

			if (toc) {
				return new Promise(function (resolve, reject) {
					_this7.navigation = new _navigation2.default(toc);

					_this7.pageList = new _pagelist2.default(); // TODO: handle page lists

					resolve(_this7.navigation);
				});
			}

			if (!navPath) {
				return new Promise(function (resolve, reject) {
					_this7.navigation = new _navigation2.default();
					_this7.pageList = new _pagelist2.default();

					resolve(_this7.navigation);
				});
			}

			return this.load(navPath, "xml").then(function (xml) {
				_this7.navigation = new _navigation2.default(xml);
				_this7.pageList = new _pagelist2.default(xml);
				return _this7.navigation;
			});
		}

		/**
   * Alias for book.spine.get
   * @param {string} target
   */

	}, {
		key: "section",
		value: function section(target) {
			return this.spine.get(target);
		}

		/**
   * Sugar to render a book
   * @param  {element} element element to add the views to
   * @param  {[object]} options
   * @return {Rendition}
   */

	}, {
		key: "renderTo",
		value: function renderTo(element, options) {
			// var renderMethod = (options && options.method) ?
			//     options.method :
			//     "single";

			this.rendition = new _rendition2.default(this, options);
			this.rendition.attachTo(element);

			return this.rendition;
		}

		/**
   * Set if request should use withCredentials
   * @param {boolean} credentials
   */

	}, {
		key: "setRequestCredentials",
		value: function setRequestCredentials(credentials) {
			this.settings.requestCredentials = credentials;
		}

		/**
   * Set headers request should use
   * @param {object} headers
   */

	}, {
		key: "setRequestHeaders",
		value: function setRequestHeaders(headers) {
			this.settings.requestHeaders = headers;
		}

		/**
   * Unarchive a zipped epub
   * @private
   * @param  {binary} input epub data
   * @param  {[string]} encoding
   * @return {Archive}
   */

	}, {
		key: "unarchive",
		value: function unarchive(input, encoding) {
			this.archive = new _archive2.default();
			return this.archive.open(input, encoding);
		}

		/**
   * Get the cover url
   * @return {string} coverUrl
   */

	}, {
		key: "coverUrl",
		value: function coverUrl() {
			var _this8 = this;

			var retrieved = this.loaded.cover.then(function (url) {
				if (_this8.archived) {
					// return this.archive.createUrl(this.cover);
					return _this8.resources.get(_this8.cover);
				} else {
					return _this8.cover;
				}
			});

			return retrieved;
		}

		/**
   * load replacement urls
   * @private
   * @return {Promise} completed loading urls
   */

	}, {
		key: "replacements",
		value: function replacements() {
			var _this9 = this;

			this.spine.hooks.serialize.register(function (output, section) {
				section.output = _this9.resources.substitute(output, section.url);
			});

			return this.resources.replacements().then(function () {
				return _this9.resources.replaceCss();
			});
		}

		/**
   * Find a DOM Range for a given CFI Range
   * @param  {EpubCFI} cfiRange a epub cfi range
   * @return {Range}
   */

	}, {
		key: "getRange",
		value: function getRange(cfiRange) {
			var cfi = new _epubcfi2.default(cfiRange);
			var item = this.spine.get(cfi.spinePos);
			var _request = this.load.bind(this);
			if (!item) {
				return new Promise(function (resolve, reject) {
					reject("CFI could not be found");
				});
			}
			return item.load(_request).then(function (contents) {
				var range = cfi.toRange(item.document);
				return range;
			});
		}

		/**
   * Generates the Book Key using the identifer in the manifest or other string provided
   * @param  {[string]} identifier to use instead of metadata identifier
   * @return {string} key
   */

	}, {
		key: "key",
		value: function key(identifier) {
			var ident = identifier || this.package.metadata.identifier || this.url.filename;
			return "epubjs:" + EPUBJS_VERSION + ":" + ident;
		}
	}, {
		key: "destroy",
		value: function destroy() {
			this.opened = undefined;
			this.loading = undefined;
			this.loaded = undefined;
			this.ready = undefined;

			this.isOpen = false;
			this.isRendered = false;

			this.spine && this.spine.destroy();
			this.locations && this.locations.destroy();
			this.pageList && this.pageList.destroy();
			this.archive && this.archive.destroy();
			this.resources && this.resources.destroy();
			this.container && this.container.destroy();
			this.packaging && this.packaging.destroy();
			this.rendition && this.rendition.destroy();

			this.spine = undefined;
			this.locations = undefined;
			this.pageList = undefined;
			this.archive = undefined;
			this.resources = undefined;
			this.container = undefined;
			this.packaging = undefined;
			this.rendition = undefined;

			this.navigation = undefined;
			this.url = undefined;
			this.path = undefined;
			this.archived = false;
			this.toc = undefined;
		}
	}]);

	return Book;
}();

//-- Enable binding events to book


(0, _eventEmitter2.default)(Book.prototype);

exports.default = Book;
module.exports = exports["default"];

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign        = __webpack_require__(25)
  , normalizeOpts = __webpack_require__(33)
  , isCallable    = __webpack_require__(34)
  , contains      = __webpack_require__(35)

  , d;

d = module.exports = function (dscr, value/*, options*/) {
	var c, e, w, options, desc;
	if ((arguments.length < 2) || (typeof dscr !== 'string')) {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (dscr == null) {
		c = w = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
		w = contains.call(dscr, 'w');
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

d.gs = function (dscr, get, set/*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== 'string') {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (get == null) {
		get = undefined;
	} else if (!isCallable(get)) {
		options = get;
		get = set = undefined;
	} else if (set == null) {
		set = undefined;
	} else if (!isCallable(set)) {
		options = set;
		set = undefined;
	}
	if (dscr == null) {
		c = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(26)()
	? Object.assign
	: __webpack_require__(27);


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	var assign = Object.assign, obj;
	if (typeof assign !== "function") return false;
	obj = { foo: "raz" };
	assign(obj, { bar: "dwa" }, { trzy: "trzy" });
	return (obj.foo + obj.bar + obj.trzy) === "razdwatrzy";
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys  = __webpack_require__(28)
  , value = __webpack_require__(32)
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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(29)()
	? Object.keys
	: __webpack_require__(30);


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	try {
		Object.keys("primitive");
		return true;
	} catch (e) {
 return false;
}
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(8);

var keys = Object.keys;

module.exports = function (object) {
	return keys(isValue(object) ? Object(object) : object);
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// eslint-disable-next-line no-empty-function
module.exports = function () {};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(8);

module.exports = function (value) {
	if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
	return value;
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(8);

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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Deprecated



module.exports = function (obj) {
 return typeof obj === "function";
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(36)()
	? String.prototype.contains
	: __webpack_require__(37);


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var str = "razdwatrzy";

module.exports = function () {
	if (typeof str.contains !== "function") return false;
	return (str.contains("dwa") === true) && (str.contains("foo") === false);
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var indexOf = String.prototype.indexOf;

module.exports = function (searchString/*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (fn) {
	if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
	return fn;
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _epubcfi = __webpack_require__(1);

var _epubcfi2 = _interopRequireDefault(_epubcfi);

var _hook = __webpack_require__(9);

var _hook2 = _interopRequireDefault(_hook);

var _section = __webpack_require__(40);

var _section2 = _interopRequireDefault(_section);

var _replacements = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A collection of Spine Items
 */
var Spine = function () {
	function Spine() {
		_classCallCheck(this, Spine);

		this.spineItems = [];
		this.spineByHref = {};
		this.spineById = {};

		this.hooks = {};
		this.hooks.serialize = new _hook2.default();
		this.hooks.content = new _hook2.default();

		// Register replacements
		this.hooks.content.register(_replacements.replaceBase);
		this.hooks.content.register(_replacements.replaceCanonical);
		this.hooks.content.register(_replacements.replaceMeta);

		this.epubcfi = new _epubcfi2.default();

		this.loaded = false;

		this.items = undefined;
		this.manifest = undefined;
		this.spineNodeIndex = undefined;
		this.baseUrl = undefined;
		this.length = undefined;
	}

	/**
  * Unpack items from a opf into spine items
  * @param  {Package} _package
  * @param  {method} resolver URL resolver
  */


	_createClass(Spine, [{
		key: "unpack",
		value: function unpack(_package, resolver, canonical) {
			var _this = this;

			this.items = _package.spine;
			this.manifest = _package.manifest;
			this.spineNodeIndex = _package.spineNodeIndex;
			this.baseUrl = _package.baseUrl || _package.basePath || "";
			this.length = this.items.length;

			this.items.forEach(function (item, index) {
				var manifestItem = _this.manifest[item.idref];
				var spineItem;

				item.index = index;
				item.cfiBase = _this.epubcfi.generateChapterComponent(_this.spineNodeIndex, item.index, item.idref);

				if (item.href) {
					item.url = resolver(item.href, true);
					item.canonical = canonical(item.href);
				}

				if (manifestItem) {
					item.href = manifestItem.href;
					item.url = resolver(item.href, true);
					item.canonical = canonical(item.href);

					if (manifestItem.properties.length) {
						item.properties.push.apply(item.properties, manifestItem.properties);
					}
				}

				if (item.linear === "yes") {
					item.prev = function () {
						var prevIndex = item.index;
						while (prevIndex > 0) {
							var prev = this.get(prevIndex - 1);
							if (prev && prev.linear) {
								return prev;
							}
							prevIndex -= 1;
						}
						return;
					}.bind(_this);
					item.next = function () {
						var nextIndex = item.index;
						while (nextIndex < this.spineItems.length - 1) {
							var next = this.get(nextIndex + 1);
							if (next && next.linear) {
								return next;
							}
							nextIndex += 1;
						}
						return;
					}.bind(_this);
				} else {
					item.prev = function () {
						return;
					};
					item.next = function () {
						return;
					};
				}

				spineItem = new _section2.default(item, _this.hooks);

				_this.append(spineItem);
			});

			this.loaded = true;
		}

		/**
   * Get an item from the spine
   * @param  {[string|int]} target
   * @return {Section} section
   * @example spine.get();
   * @example spine.get(1);
   * @example spine.get("chap1.html");
   * @example spine.get("#id1234");
   */

	}, {
		key: "get",
		value: function get(target) {
			var index = 0;

			if (typeof target === "undefined") {
				while (index < this.spineItems.length) {
					var next = this.spineItems[index];
					if (next && next.linear) {
						break;
					}
					index += 1;
				}
			} else if (this.epubcfi.isCfiString(target)) {
				var cfi = new _epubcfi2.default(target);
				index = cfi.spinePos;
			} else if (typeof target === "number" || isNaN(target) === false) {
				index = target;
			} else if (typeof target === "string" && target.indexOf("#") === 0) {
				index = this.spineById[target.substring(1)];
			} else if (typeof target === "string") {
				// Remove fragments
				target = target.split("#")[0];
				index = this.spineByHref[target];
			}

			return this.spineItems[index] || null;
		}

		/**
   * Append a Section to the Spine
   * @private
   * @param  {Section} section
   */

	}, {
		key: "append",
		value: function append(section) {
			var index = this.spineItems.length;
			section.index = index;

			this.spineItems.push(section);

			this.spineByHref[section.href] = index;
			this.spineById[section.idref] = index;

			return index;
		}

		/**
   * Prepend a Section to the Spine
   * @private
   * @param  {Section} section
   */

	}, {
		key: "prepend",
		value: function prepend(section) {
			// var index = this.spineItems.unshift(section);
			this.spineByHref[section.href] = 0;
			this.spineById[section.idref] = 0;

			// Re-index
			this.spineItems.forEach(function (item, index) {
				item.index = index;
			});

			return 0;
		}

		// insert(section, index) {
		//
		// };

		/**
   * Remove a Section from the Spine
   * @private
   * @param  {Section} section
   */

	}, {
		key: "remove",
		value: function remove(section) {
			var index = this.spineItems.indexOf(section);

			if (index > -1) {
				delete this.spineByHref[section.href];
				delete this.spineById[section.idref];

				return this.spineItems.splice(index, 1);
			}
		}

		/**
   * Loop over the Sections in the Spine
   * @return {method} forEach
   */

	}, {
		key: "each",
		value: function each() {
			return this.spineItems.forEach.apply(this.spineItems, arguments);
		}
	}, {
		key: "first",
		value: function first() {
			var index = 0;

			do {
				var next = this.get(index);
				if (next && next.linear) {
					return next;
				}
				index += 1;
			} while (index < this.spineItems.length - 1);
		}
	}, {
		key: "last",
		value: function last() {
			var index = this.spineItems.length - 1;

			do {
				var prev = this.get(index);
				if (prev && prev.linear) {
					return prev;
				}
				index -= 1;
			} while (index > 0);
		}
	}, {
		key: "destroy",
		value: function destroy() {
			this.each(function (section) {
				return section.destroy();
			});

			this.spineItems = undefined;
			this.spineByHref = undefined;
			this.spineById = undefined;

			this.hooks.serialize.clear();
			this.hooks.content.clear();
			this.hooks = undefined;

			this.epubcfi = undefined;

			this.loaded = false;

			this.items = undefined;
			this.manifest = undefined;
			this.spineNodeIndex = undefined;
			this.baseUrl = undefined;
			this.length = undefined;
		}
	}]);

	return Spine;
}();

exports.default = Spine;
module.exports = exports["default"];

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _core = __webpack_require__(0);

var _epubcfi = __webpack_require__(1);

var _epubcfi2 = _interopRequireDefault(_epubcfi);

var _hook = __webpack_require__(9);

var _hook2 = _interopRequireDefault(_hook);

var _replacements = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Represents a Section of the Book
 * In most books this is equivelent to a Chapter
 * @param {object} item  The spine item representing the section
 * @param {object} hooks hooks for serialize and content
 */
var Section = function () {
	function Section(item, hooks) {
		_classCallCheck(this, Section);

		this.idref = item.idref;
		this.linear = item.linear === "yes";
		this.properties = item.properties;
		this.index = item.index;
		this.href = item.href;
		this.url = item.url;
		this.canonical = item.canonical;
		this.next = item.next;
		this.prev = item.prev;

		this.cfiBase = item.cfiBase;

		if (hooks) {
			this.hooks = hooks;
		} else {
			this.hooks = {};
			this.hooks.serialize = new _hook2.default(this);
			this.hooks.content = new _hook2.default(this);
		}

		this.document = undefined;
		this.contents = undefined;
		this.output = undefined;
	}

	/**
  * Load the section from its url
  * @param  {method} _request a request method to use for loading
  * @return {document} a promise with the xml document
  */


	_createClass(Section, [{
		key: "load",
		value: function load(_request) {
			var request = _request || this.request || __webpack_require__(10);
			var loading = new _core.defer();
			var loaded = loading.promise;

			if (this.contents) {
				loading.resolve(this.contents);
			} else {
				request(this.url).then(function (xml) {
					// var directory = new Url(this.url).directory;

					this.document = xml;
					this.contents = xml.documentElement;

					return this.hooks.content.trigger(this.document, this);
				}.bind(this)).then(function () {
					loading.resolve(this.contents);
				}.bind(this)).catch(function (error) {
					loading.reject(error);
				});
			}

			return loaded;
		}

		/**
   * Adds a base tag for resolving urls in the section
   * @private
   */

	}, {
		key: "base",
		value: function base() {
			return (0, _replacements.replaceBase)(this.document, this);
		}

		/**
   * Render the contents of a section
   * @param  {method} _request a request method to use for loading
   * @return {string} output a serialized XML Document
   */

	}, {
		key: "render",
		value: function render(_request) {
			var rendering = new _core.defer();
			var rendered = rendering.promise;
			this.output; // TODO: better way to return this from hooks?

			this.load(_request).then(function (contents) {
				var userAgent = typeof navigator !== 'undefined' && navigator.userAgent || '';
				var isIE = userAgent.indexOf('Trident') >= 0;
				var Serializer;
				if (typeof XMLSerializer === "undefined" || isIE) {
					Serializer = __webpack_require__(15).XMLSerializer;
				} else {
					Serializer = XMLSerializer;
				}
				var serializer = new Serializer();
				this.output = serializer.serializeToString(contents);
				return this.output;
			}.bind(this)).then(function () {
				return this.hooks.serialize.trigger(this.output, this);
			}.bind(this)).then(function () {
				rendering.resolve(this.output);
			}.bind(this)).catch(function (error) {
				rendering.reject(error);
			});

			return rendered;
		}

		/**
   * Find a string in a section
   * @param  {string} _query The query string to find
   * @return {object[]} A list of matches, with form {cfi, excerpt}
   */

	}, {
		key: "find",
		value: function find(_query) {
			var section = this;
			var matches = [];
			var query = _query.toLowerCase();
			var find = function find(node) {
				var text = node.textContent.toLowerCase();
				var range = section.document.createRange();
				var cfi;
				var pos;
				var last = -1;
				var excerpt;
				var limit = 150;

				while (pos != -1) {
					// Search for the query
					pos = text.indexOf(query, last + 1);

					if (pos != -1) {
						// We found it! Generate a CFI
						range = section.document.createRange();
						range.setStart(node, pos);
						range.setEnd(node, pos + query.length);

						cfi = section.cfiFromRange(range);

						// Generate the excerpt
						if (node.textContent.length < limit) {
							excerpt = node.textContent;
						} else {
							excerpt = node.textContent.substring(pos - limit / 2, pos + limit / 2);
							excerpt = "..." + excerpt + "...";
						}

						// Add the CFI to the matches list
						matches.push({
							cfi: cfi,
							excerpt: excerpt
						});
					}

					last = pos;
				}
			};

			(0, _core.sprint)(section.document, function (node) {
				find(node);
			});

			return matches;
		}
	}, {
		key: "reconcileLayoutSettings",


		/**
  * Reconciles the current chapters layout properies with
  * the global layout properities.
  * @param {object} global  The globa layout settings object, chapter properties string
  * @return {object} layoutProperties Object with layout properties
  */
		value: function reconcileLayoutSettings(global) {
			//-- Get the global defaults
			var settings = {
				layout: global.layout,
				spread: global.spread,
				orientation: global.orientation
			};

			//-- Get the chapter's display type
			this.properties.forEach(function (prop) {
				var rendition = prop.replace("rendition:", "");
				var split = rendition.indexOf("-");
				var property, value;

				if (split != -1) {
					property = rendition.slice(0, split);
					value = rendition.slice(split + 1);

					settings[property] = value;
				}
			});
			return settings;
		}

		/**
   * Get a CFI from a Range in the Section
   * @param  {range} _range
   * @return {string} cfi an EpubCFI string
   */

	}, {
		key: "cfiFromRange",
		value: function cfiFromRange(_range) {
			return new _epubcfi2.default(_range, this.cfiBase).toString();
		}

		/**
   * Get a CFI from an Element in the Section
   * @param  {element} el
   * @return {string} cfi an EpubCFI string
   */

	}, {
		key: "cfiFromElement",
		value: function cfiFromElement(el) {
			return new _epubcfi2.default(el, this.cfiBase).toString();
		}

		/**
   * Unload the section document
   */

	}, {
		key: "unload",
		value: function unload() {
			this.document = undefined;
			this.contents = undefined;
			this.output = undefined;
		}
	}, {
		key: "destroy",
		value: function destroy() {
			this.unload();
			this.hooks.serialize.clear();
			this.hooks.content.clear();

			this.hooks = undefined;
			this.idref = undefined;
			this.linear = undefined;
			this.properties = undefined;
			this.index = undefined;
			this.href = undefined;
			this.url = undefined;
			this.next = undefined;
			this.prev = undefined;

			this.cfiBase = undefined;
		}
	}]);

	return Section;
}();

exports.default = Section;
module.exports = exports["default"];

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _core = __webpack_require__(0);

var _queue = __webpack_require__(11);

var _queue2 = _interopRequireDefault(_queue);

var _epubcfi = __webpack_require__(1);

var _epubcfi2 = _interopRequireDefault(_epubcfi);

var _eventEmitter = __webpack_require__(2);

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Find Locations for a Book
 * @param {Spine} spine
 * @param {request} request
 */
var Locations = function () {
	function Locations(spine, request, pause) {
		_classCallCheck(this, Locations);

		this.spine = spine;
		this.request = request;
		this.pause = pause || 100;

		this.q = new _queue2.default(this);
		this.epubcfi = new _epubcfi2.default();

		this._locations = [];
		this.total = 0;

		this.break = 150;

		this._current = 0;

		this.currentLocation = '';
		this._currentCfi = '';
		this.processingTimeout = undefined;
	}

	/**
  * Load all of sections in the book to generate locations
  * @param  {int} chars how many chars to split on
  * @return {object} locations
  */


	_createClass(Locations, [{
		key: "generate",
		value: function generate(chars) {

			if (chars) {
				this.break = chars;
			}

			this.q.pause();

			this.spine.each(function (section) {
				if (section.linear) {
					this.q.enqueue(this.process.bind(this), section);
				}
			}.bind(this));

			return this.q.run().then(function () {
				this.total = this._locations.length - 1;

				if (this._currentCfi) {
					this.currentLocation = this._currentCfi;
				}

				return this._locations;
				// console.log(this.percentage(this.book.rendition.location.start), this.percentage(this.book.rendition.location.end));
			}.bind(this));
		}
	}, {
		key: "createRange",
		value: function createRange() {
			return {
				startContainer: undefined,
				startOffset: undefined,
				endContainer: undefined,
				endOffset: undefined
			};
		}
	}, {
		key: "process",
		value: function process(section) {

			return section.load(this.request).then(function (contents) {
				var completed = new _core.defer();
				var locations = this.parse(contents, section.cfiBase);
				this._locations = this._locations.concat(locations);

				section.unload();

				this.processingTimeout = setTimeout(function () {
					return completed.resolve(locations);
				}, this.pause);
				return completed.promise;
			}.bind(this));
		}
	}, {
		key: "parse",
		value: function parse(contents, cfiBase, chars) {
			var locations = [];
			var range;
			var doc = contents.ownerDocument;
			var body = (0, _core.qs)(doc, "body");
			var counter = 0;
			var prev;
			var _break = chars || this.break;
			var parser = function parser(node) {
				var len = node.length;
				var dist;
				var pos = 0;

				if (node.textContent.trim().length === 0) {
					return false; // continue
				}

				// Start range
				if (counter == 0) {
					range = this.createRange();
					range.startContainer = node;
					range.startOffset = 0;
				}

				dist = _break - counter;

				// Node is smaller than a break,
				// skip over it
				if (dist > len) {
					counter += len;
					pos = len;
				}

				while (pos < len) {
					dist = _break - counter;

					if (counter === 0) {
						// Start new range
						pos += 1;
						range = this.createRange();
						range.startContainer = node;
						range.startOffset = pos;
					}

					// pos += dist;

					// Gone over
					if (pos + dist >= len) {
						// Continue counter for next node
						counter += len - pos;
						// break
						pos = len;
						// At End
					} else {
						// Advance pos
						pos += dist;

						// End the previous range
						range.endContainer = node;
						range.endOffset = pos;
						// cfi = section.cfiFromRange(range);
						var cfi = new _epubcfi2.default(range, cfiBase).toString();
						locations.push(cfi);
						counter = 0;
					}
				}
				prev = node;
			};

			(0, _core.sprint)(body, parser.bind(this));

			// Close remaining
			if (range && range.startContainer && prev) {
				range.endContainer = prev;
				range.endOffset = prev.length;
				var cfi = new _epubcfi2.default(range, cfiBase).toString();
				locations.push(cfi);
				counter = 0;
			}

			return locations;
		}
	}, {
		key: "locationFromCfi",
		value: function locationFromCfi(cfi) {
			var loc = void 0;
			if (_epubcfi2.default.prototype.isCfiString(cfi)) {
				cfi = new _epubcfi2.default(cfi);
			}
			// Check if the location has not been set yet
			if (this._locations.length === 0) {
				return -1;
			}

			loc = (0, _core.locationOf)(cfi, this._locations, this.epubcfi.compare);

			if (loc > this.total) {
				return this.total;
			}

			return loc;
		}
	}, {
		key: "percentageFromCfi",
		value: function percentageFromCfi(cfi) {
			if (this._locations.length === 0) {
				return null;
			}
			// Find closest cfi
			var loc = this.locationFromCfi(cfi);
			// Get percentage in total
			return this.percentageFromLocation(loc);
		}
	}, {
		key: "percentageFromLocation",
		value: function percentageFromLocation(loc) {
			if (!loc || !this.total) {
				return 0;
			}

			return loc / this.total;
		}
	}, {
		key: "cfiFromLocation",
		value: function cfiFromLocation(loc) {
			var cfi = -1;
			// check that pg is an int
			if (typeof loc != "number") {
				loc = parseInt(loc);
			}

			if (loc >= 0 && loc < this._locations.length) {
				cfi = this._locations[loc];
			}

			return cfi;
		}
	}, {
		key: "cfiFromPercentage",
		value: function cfiFromPercentage(percentage) {
			var loc = void 0;
			if (percentage > 1) {
				console.warn("Normalize cfiFromPercentage value to between 0 - 1");
			}

			// Make sure 1 goes to very end
			if (percentage >= 1) {
				var cfi = new _epubcfi2.default(this._locations[this.total]);
				cfi.collapse();
				return cfi.toString();
			}

			loc = Math.ceil(this.total * percentage);
			return this.cfiFromLocation(loc);
		}
	}, {
		key: "load",
		value: function load(locations) {
			if (typeof locations === "string") {
				this._locations = JSON.parse(locations);
			} else {
				this._locations = locations;
			}
			this.total = this._locations.length - 1;
			return this._locations;
		}
	}, {
		key: "save",
		value: function save(json) {
			return JSON.stringify(this._locations);
		}
	}, {
		key: "getCurrent",
		value: function getCurrent(json) {
			return this._current;
		}
	}, {
		key: "setCurrent",
		value: function setCurrent(curr) {
			var loc;

			if (typeof curr == "string") {
				this._currentCfi = curr;
			} else if (typeof curr == "number") {
				this._current = curr;
			} else {
				return;
			}

			if (this._locations.length === 0) {
				return;
			}

			if (typeof curr == "string") {
				loc = this.locationFromCfi(curr);
				this._current = loc;
			} else {
				loc = curr;
			}

			this.emit("changed", {
				percentage: this.percentageFromLocation(loc)
			});
		}
	}, {
		key: "length",
		value: function length() {
			return this._locations.length;
		}
	}, {
		key: "destroy",
		value: function destroy() {
			this.spine = undefined;
			this.request = undefined;
			this.pause = undefined;

			this.q.stop();
			this.q = undefined;
			this.epubcfi = undefined;

			this._locations = undefined;
			this.total = undefined;

			this.break = undefined;
			this._current = undefined;

			this.currentLocation = undefined;
			this._currentCfi = undefined;
			clearTimeout(this.processingTimeout);
		}
	}, {
		key: "currentLocation",
		get: function get() {
			return this._current;
		},
		set: function set(curr) {
			this.setCurrent(curr);
		}
	}]);

	return Locations;
}();

(0, _eventEmitter2.default)(Locations.prototype);

exports.default = Locations;
module.exports = exports["default"];

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pathWebpack = __webpack_require__(5);

var _pathWebpack2 = _interopRequireDefault(_pathWebpack);

var _core = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Handles Parsing and Accessing an Epub Container
 * @class
 * @param {[document]} containerDocument xml document
 */
var Container = function () {
	function Container(containerDocument) {
		_classCallCheck(this, Container);

		this.packagePath = '';
		this.directory = '';
		this.encoding = '';

		if (containerDocument) {
			this.parse(containerDocument);
		}
	}

	/**
  * Parse the Container XML
  * @param  {document} containerDocument
  */


	_createClass(Container, [{
		key: "parse",
		value: function parse(containerDocument) {
			//-- <rootfile full-path="OPS/package.opf" media-type="application/oebps-package+xml"/>
			var rootfile;

			if (!containerDocument) {
				throw new Error("Container File Not Found");
			}

			rootfile = (0, _core.qs)(containerDocument, "rootfile");

			if (!rootfile) {
				throw new Error("No RootFile Found");
			}

			this.packagePath = rootfile.getAttribute("full-path");
			this.directory = _pathWebpack2.default.dirname(this.packagePath);
			this.encoding = containerDocument.xmlEncoding;
		}
	}, {
		key: "destroy",
		value: function destroy() {
			this.packagePath = undefined;
			this.directory = undefined;
			this.encoding = undefined;
		}
	}]);

	return Container;
}();

exports.default = Container;
module.exports = exports["default"];

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _core = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Open Packaging Format Parser
 * @class
 * @param {document} packageDocument OPF XML
 */
var Packaging = function () {
	function Packaging(packageDocument) {
		_classCallCheck(this, Packaging);

		this.manifest = {};
		this.navPath = '';
		this.ncxPath = '';
		this.coverPath = '';
		this.spineNodeIndex = 0;
		this.spine = [];
		this.metadata = {};

		if (packageDocument) {
			this.parse(packageDocument);
		}
	}

	/**
  * Parse OPF XML
  * @param  {document} packageDocument OPF XML
  * @return {object} parsed package parts
  */


	_createClass(Packaging, [{
		key: 'parse',
		value: function parse(packageDocument) {
			var metadataNode, manifestNode, spineNode;

			if (!packageDocument) {
				throw new Error("Package File Not Found");
			}

			metadataNode = (0, _core.qs)(packageDocument, "metadata");
			if (!metadataNode) {
				throw new Error("No Metadata Found");
			}

			manifestNode = (0, _core.qs)(packageDocument, "manifest");
			if (!manifestNode) {
				throw new Error("No Manifest Found");
			}

			spineNode = (0, _core.qs)(packageDocument, "spine");
			if (!spineNode) {
				throw new Error("No Spine Found");
			}

			this.manifest = this.parseManifest(manifestNode);
			this.navPath = this.findNavPath(manifestNode);
			this.ncxPath = this.findNcxPath(manifestNode, spineNode);
			this.coverPath = this.findCoverPath(packageDocument);

			this.spineNodeIndex = (0, _core.indexOfElementNode)(spineNode);

			this.spine = this.parseSpine(spineNode, this.manifest);

			this.metadata = this.parseMetadata(metadataNode);

			this.metadata.direction = spineNode.getAttribute("page-progression-direction");

			return {
				"metadata": this.metadata,
				"spine": this.spine,
				"manifest": this.manifest,
				"navPath": this.navPath,
				"ncxPath": this.ncxPath,
				"coverPath": this.coverPath,
				"spineNodeIndex": this.spineNodeIndex
			};
		}

		/**
   * Parse Metadata
   * @private
   * @param  {document} xml
   * @return {object} metadata
   */

	}, {
		key: 'parseMetadata',
		value: function parseMetadata(xml) {
			var metadata = {};

			metadata.title = this.getElementText(xml, "title");
			metadata.creator = this.getElementText(xml, "creator");
			metadata.description = this.getElementText(xml, "description");

			metadata.pubdate = this.getElementText(xml, "date");

			metadata.publisher = this.getElementText(xml, "publisher");

			metadata.identifier = this.getElementText(xml, "identifier");
			metadata.language = this.getElementText(xml, "language");
			metadata.rights = this.getElementText(xml, "rights");

			metadata.modified_date = this.getPropertyText(xml, "dcterms:modified");

			metadata.layout = this.getPropertyText(xml, "rendition:layout");
			metadata.orientation = this.getPropertyText(xml, "rendition:orientation");
			metadata.flow = this.getPropertyText(xml, "rendition:flow");
			metadata.viewport = this.getPropertyText(xml, "rendition:viewport");
			// metadata.page_prog_dir = packageXml.querySelector("spine").getAttribute("page-progression-direction");

			return metadata;
		}

		/**
   * Parse Manifest
   * @private
   * @param  {document} manifestXml
   * @return {object} manifest
   */

	}, {
		key: 'parseManifest',
		value: function parseManifest(manifestXml) {
			var manifest = {};

			//-- Turn items into an array
			// var selected = manifestXml.querySelectorAll("item");
			var selected = (0, _core.qsa)(manifestXml, "item");
			var items = Array.prototype.slice.call(selected);

			//-- Create an object with the id as key
			items.forEach(function (item) {
				var id = item.getAttribute("id"),
				    href = item.getAttribute("href") || "",
				    type = item.getAttribute("media-type") || "",
				    properties = item.getAttribute("properties") || "";

				manifest[id] = {
					"href": href,
					// "url" : href,
					"type": type,
					"properties": properties.length ? properties.split(" ") : []
				};
			});

			return manifest;
		}

		/**
   * Parse Spine
   * @param  {document} spineXml
   * @param  {Packaging.manifest} manifest
   * @return {object} spine
   */

	}, {
		key: 'parseSpine',
		value: function parseSpine(spineXml, manifest) {
			var spine = [];

			var selected = spineXml.getElementsByTagName("itemref");
			var items = Array.prototype.slice.call(selected);

			// var epubcfi = new EpubCFI();

			//-- Add to array to mantain ordering and cross reference with manifest
			items.forEach(function (item, index) {
				var idref = item.getAttribute("idref");
				// var cfiBase = epubcfi.generateChapterComponent(spineNodeIndex, index, Id);
				var props = item.getAttribute("properties") || "";
				var propArray = props.length ? props.split(" ") : [];
				// var manifestProps = manifest[Id].properties;
				// var manifestPropArray = manifestProps.length ? manifestProps.split(" ") : [];

				var itemref = {
					"idref": idref,
					"linear": item.getAttribute("linear") || "yes",
					"properties": propArray,
					// "href" : manifest[Id].href,
					// "url" :  manifest[Id].url,
					"index": index
					// "cfiBase" : cfiBase
				};
				spine.push(itemref);
			});

			return spine;
		}

		/**
   * Find TOC NAV
   * @private
   */

	}, {
		key: 'findNavPath',
		value: function findNavPath(manifestNode) {
			// Find item with property "nav"
			// Should catch nav irregardless of order
			// var node = manifestNode.querySelector("item[properties$='nav'], item[properties^='nav '], item[properties*=' nav ']");
			var node = (0, _core.qsp)(manifestNode, "item", { "properties": "nav" });
			return node ? node.getAttribute("href") : false;
		}

		/**
   * Find TOC NCX
   * media-type="application/x-dtbncx+xml" href="toc.ncx"
   * @private
   */

	}, {
		key: 'findNcxPath',
		value: function findNcxPath(manifestNode, spineNode) {
			// var node = manifestNode.querySelector("item[media-type='application/x-dtbncx+xml']");
			var node = (0, _core.qsp)(manifestNode, "item", { "media-type": "application/x-dtbncx+xml" });
			var tocId;

			// If we can't find the toc by media-type then try to look for id of the item in the spine attributes as
			// according to http://www.idpf.org/epub/20/spec/OPF_2.0.1_draft.htm#Section2.4.1.2,
			// "The item that describes the NCX must be referenced by the spine toc attribute."
			if (!node) {
				tocId = spineNode.getAttribute("toc");
				if (tocId) {
					// node = manifestNode.querySelector("item[id='" + tocId + "']");
					node = manifestNode.getElementById(tocId);
				}
			}

			return node ? node.getAttribute("href") : false;
		}

		/**
   * Find the Cover Path
   * <item properties="cover-image" id="ci" href="cover.svg" media-type="image/svg+xml" />
   * Fallback for Epub 2.0
   * @param  {document} packageXml
   * @return {string} href
   */

	}, {
		key: 'findCoverPath',
		value: function findCoverPath(packageXml) {
			var pkg = (0, _core.qs)(packageXml, "package");
			var epubVersion = pkg.getAttribute("version");

			if (epubVersion === "2.0") {
				var metaCover = (0, _core.qsp)(packageXml, "meta", { "name": "cover" });
				if (metaCover) {
					var coverId = metaCover.getAttribute("content");
					// var cover = packageXml.querySelector("item[id='" + coverId + "']");
					var cover = packageXml.getElementById(coverId);
					return cover ? cover.getAttribute("href") : "";
				} else {
					return false;
				}
			} else {
				// var node = packageXml.querySelector("item[properties='cover-image']");
				var node = (0, _core.qsp)(packageXml, "item", { "properties": "cover-image" });
				return node ? node.getAttribute("href") : "";
			}
		}

		/**
   * Get text of a namespaced element
   * @private
   * @param  {document} xml
   * @param  {string} tag
   * @return {string} text
   */

	}, {
		key: 'getElementText',
		value: function getElementText(xml, tag) {
			var found = xml.getElementsByTagNameNS("http://purl.org/dc/elements/1.1/", tag);
			var el;

			if (!found || found.length === 0) return "";

			el = found[0];

			if (el.childNodes.length) {
				return el.childNodes[0].nodeValue;
			}

			return "";
		}

		/**
   * Get text by property
   * @private
   * @param  {document} xml
   * @param  {string} property
   * @return {string} text
   */

	}, {
		key: 'getPropertyText',
		value: function getPropertyText(xml, property) {
			var el = (0, _core.qsp)(xml, "meta", { "property": property });

			if (el && el.childNodes.length) {
				return el.childNodes[0].nodeValue;
			}

			return "";
		}

		/**
   * Load JSON Manifest
   * @param  {document} packageDocument OPF XML
   * @return {object} parsed package parts
   */

	}, {
		key: 'load',
		value: function load(json) {
			var _this = this;

			this.metadata = json.metadata;

			this.spine = json.spine.map(function (item, index) {
				item.index = index;
				return item;
			});

			json.resources.forEach(function (item, index) {
				_this.manifest[index] = item;

				if (item.rel && item.rel[0] === "cover") {
					_this.coverPath = item.href;
				}
			});

			this.spineNodeIndex = 0;

			this.toc = json.toc.map(function (item, index) {
				item.label = item.title;
				return item;
			});

			return {
				"metadata": this.metadata,
				"spine": this.spine,
				"manifest": this.manifest,
				"navPath": this.navPath,
				"ncxPath": this.ncxPath,
				"coverPath": this.coverPath,
				"spineNodeIndex": this.spineNodeIndex,
				"toc": this.toc
			};
		}
	}, {
		key: 'destroy',
		value: function destroy() {
			this.manifest = undefined;
			this.navPath = undefined;
			this.ncxPath = undefined;
			this.coverPath = undefined;
			this.spineNodeIndex = undefined;
			this.spine = undefined;
			this.metadata = undefined;
		}
	}]);

	return Packaging;
}();

exports.default = Packaging;
module.exports = exports['default'];

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _core = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Navigation Parser
 * @param {document} xml navigation html / xhtml / ncx
 */
var Navigation = function () {
	function Navigation(xml) {
		_classCallCheck(this, Navigation);

		this.toc = [];
		this.tocByHref = {};
		this.tocById = {};

		if (xml) {
			this.parse(xml);
		}
	}

	/**
  * Parse out the navigation items
  * @param {document} xml navigation html / xhtml / ncx
  */


	_createClass(Navigation, [{
		key: "parse",
		value: function parse(xml) {
			var isXml = xml.nodeType;
			var html = void 0;
			var ncx = void 0;

			if (isXml) {
				html = (0, _core.qs)(xml, "html");
				ncx = (0, _core.qs)(xml, "ncx");
			}

			if (!isXml) {
				this.toc = this.load(xml);
			} else if (html) {
				this.toc = this.parseNav(xml);
			} else if (ncx) {
				this.toc = this.parseNcx(xml);
			}

			this.unpack(this.toc);
		}

		/**
   * Unpack navigation items
   * @private
   * @param  {array} toc
   */

	}, {
		key: "unpack",
		value: function unpack(toc) {
			var item;

			for (var i = 0; i < toc.length; i++) {
				item = toc[i];
				this.tocByHref[item.href] = i;
				this.tocById[item.id] = i;
			}
		}

		/**
   * Get an item from the navigation
   * @param  {string} target
   * @return {object} navItems
   */

	}, {
		key: "get",
		value: function get(target) {
			var index;

			if (!target) {
				return this.toc;
			}

			if (target.indexOf("#") === 0) {
				index = this.tocById[target.substring(1)];
			} else if (target in this.tocByHref) {
				index = this.tocByHref[target];
			}

			return this.toc[index];
		}
	}, {
		key: "createTocItem",
		value: function createTocItem(linkElement, id) {
			var _this = this;

			var list = [],
			    tocLinkElms = linkElement.childNodes,
			    tocLinkArray = Array.prototype.slice.call(tocLinkElms);

			var index = id ? id : 0;
			tocLinkArray.forEach(function (linkElm) {
				if (linkElm.nodeName.toLowerCase() === 'li') {
					var tocLink = (0, _core.qs)(linkElm, 'a'),
					    tocLinkData = {
						id: -1,
						href: tocLink.getAttribute('href'),
						label: tocLink.textContent,
						parent: null
					},
					    subItemElm = (0, _core.qs)(linkElm, 'ol');
					index++;
					tocLinkData.id = index;
					if (id) {
						tocLinkData.parent = id;
					}
					list.push(tocLinkData);
					if (subItemElm) {
						var subitems = _this.createTocItem(subItemElm, index);
						if (subitems && subitems.length > 0) {
							index = index + subitems.length;
							list = list.concat(subitems);
						}
					}
				}
			});
			return list;
		}

		/**
   * Parse from a Epub > 3.0 Nav
   * @private
   * @param  {document} navHtml
   * @return {array} navigation list
   */

	}, {
		key: "parseNav",
		value: function parseNav(navHtml) {
			var navElement = (0, _core.querySelectorByType)(navHtml, "nav", "toc");
			var tocItems = (0, _core.qs)(navElement, "ol");
			return this.createTocItem(tocItems);
		}

		/**
   * Create a navItem
   * @private
   * @param  {element} item
   * @return {object} navItem
   */

	}, {
		key: "navItem",
		value: function navItem(item) {
			var id = item.getAttribute("id") || false,
			    content = (0, _core.qs)(item, "a"),
			    src = content.getAttribute("href") || "",
			    text = content.textContent || "",
			    subitems = [],
			    parentNode = item.parentNode,
			    parent;

			if (parentNode && parentNode.nodeName === "navPoint") {
				parent = parentNode.getAttribute("id");
			}

			return {
				"id": id,
				"href": src,
				"label": text,
				"subitems": subitems,
				"parent": parent
			};
		}

		/**
   * Parse from a Epub > 3.0 NC
   * @private
   * @param  {document} navHtml
   * @return {array} navigation list
   */

	}, {
		key: "parseNcx",
		value: function parseNcx(tocXml) {
			var navPoints = (0, _core.qsa)(tocXml, "navPoint");
			var length = navPoints.length;
			var i;
			var toc = {};
			var list = [];
			var item, parent;

			if (!navPoints || length === 0) return list;

			for (i = 0; i < length; ++i) {
				item = this.ncxItem(navPoints[i]);
				toc[item.id] = item;
				if (!item.parent) {
					list.push(item);
				} else {
					parent = toc[item.parent];
					parent.subitems.push(item);
				}
			}

			return list;
		}

		/**
   * Create a ncxItem
   * @private
   * @param  {element} item
   * @return {object} ncxItem
   */

	}, {
		key: "ncxItem",
		value: function ncxItem(item) {
			var id = item.getAttribute("id") || false,
			    content = (0, _core.qs)(item, "content"),
			    src = content.getAttribute("src"),
			    navLabel = (0, _core.qs)(item, "navLabel"),
			    text = navLabel.textContent ? navLabel.textContent : "",
			    subitems = [],
			    parentNode = item.parentNode,
			    parent;

			if (parentNode && parentNode.nodeName === "navPoint") {
				parent = parentNode.getAttribute("id");
			}

			return {
				"id": id,
				"href": src,
				"label": text,
				"subitems": subitems,
				"parent": parent
			};
		}

		/**
   * Load Spine Items
   * @param  {object} json the items to be loaded
   */

	}, {
		key: "load",
		value: function load(json) {
			var _this2 = this;

			return json.map(function (item) {
				item.label = item.title;
				if (item.children) {
					item.subitems = _this2.load(item.children);
				}
				return item;
			});
		}

		/**
   * forEach pass through
   * @param  {Function} fn function to run on each item
   * @return {method} forEach loop
   */

	}, {
		key: "forEach",
		value: function forEach(fn) {
			return this.toc.forEach(fn);
		}
	}]);

	return Navigation;
}();

exports.default = Navigation;
module.exports = exports["default"];

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _replacements = __webpack_require__(6);

var _core = __webpack_require__(0);

var _url = __webpack_require__(4);

var _url2 = _interopRequireDefault(_url);

var _mime = __webpack_require__(16);

var _mime2 = _interopRequireDefault(_mime);

var _path = __webpack_require__(3);

var _path2 = _interopRequireDefault(_path);

var _pathWebpack = __webpack_require__(5);

var _pathWebpack2 = _interopRequireDefault(_pathWebpack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Handle Package Resources
 * @class
 * @param {Manifest} manifest
 * @param {[object]} options
 * @param {[string="base64"]} options.replacements
 * @param {[Archive]} options.archive
 * @param {[method]} options.resolver
 */
var Resources = function () {
	function Resources(manifest, options) {
		_classCallCheck(this, Resources);

		this.settings = {
			replacements: options && options.replacements || "base64",
			archive: options && options.archive,
			resolver: options && options.resolver,
			request: options && options.request
		};
		this.manifest = manifest;
		this.resources = Object.keys(manifest).map(function (key) {
			return manifest[key];
		});

		this.replacementUrls = [];

		this.html = [];
		this.assets = [];
		this.css = [];

		this.urls = [];
		this.cssUrls = [];

		this.split();
		this.splitUrls();
	}

	/**
  * Split resources by type
  * @private
  */


	_createClass(Resources, [{
		key: "split",
		value: function split() {

			// HTML
			this.html = this.resources.filter(function (item) {
				if (item.type === "application/xhtml+xml" || item.type === "text/html") {
					return true;
				}
			});

			// Exclude HTML
			this.assets = this.resources.filter(function (item) {
				if (item.type !== "application/xhtml+xml" && item.type !== "text/html") {
					return true;
				}
			});

			// Only CSS
			this.css = this.resources.filter(function (item) {
				if (item.type === "text/css") {
					return true;
				}
			});
		}

		/**
   * Convert split resources into Urls
   * @private
   */

	}, {
		key: "splitUrls",
		value: function splitUrls() {

			// All Assets Urls
			this.urls = this.assets.map(function (item) {
				return item.href;
			}.bind(this));

			// Css Urls
			this.cssUrls = this.css.map(function (item) {
				return item.href;
			});
		}
	}, {
		key: "createUrl",
		value: function createUrl(url) {
			var parsedUrl = new _url2.default(url);
			var mimeType = _mime2.default.lookup(parsedUrl.filename);

			if (this.settings.archive) {
				return this.settings.archive.createUrl(url, { "base64": this.settings.replacements === "base64" });
			} else {
				if (this.settings.replacements === "base64") {
					return this.settings.request(url, 'blob').then(function (blob) {
						return (0, _core.blob2base64)(blob);
					}).then(function (blob) {
						return (0, _core.createBase64Url)(blob, mimeType);
					});
				} else {
					return this.settings.request(url, 'blob').then(function (blob) {
						return (0, _core.createBlobUrl)(blob, mimeType);
					});
				}
			}
		}

		/**
   * Create blob urls for all the assets
   * @return {Promise}         returns replacement urls
   */

	}, {
		key: "replacements",
		value: function replacements() {
			var _this = this;

			if (this.settings.replacements === "none") {
				return new Promise(function (resolve) {
					resolve(this.urls);
				}.bind(this));
			}

			var replacements = this.urls.map(function (url) {
				var absolute = _this.settings.resolver(url);

				return _this.createUrl(absolute).catch(function (err) {
					console.error(err);
					return null;
				});
			});

			return Promise.all(replacements).then(function (replacementUrls) {
				_this.replacementUrls = replacementUrls.filter(function (url) {
					return typeof url === "string";
				});
				return replacementUrls;
			});
		}

		/**
   * Replace URLs in CSS resources
   * @private
   * @param  {[Archive]} archive
   * @param  {[method]} resolver
   * @return {Promise}
   */

	}, {
		key: "replaceCss",
		value: function replaceCss(archive, resolver) {
			var replaced = [];
			archive = archive || this.settings.archive;
			resolver = resolver || this.settings.resolver;
			this.cssUrls.forEach(function (href) {
				var replacement = this.createCssFile(href, archive, resolver).then(function (replacementUrl) {
					// switch the url in the replacementUrls
					var indexInUrls = this.urls.indexOf(href);
					if (indexInUrls > -1) {
						this.replacementUrls[indexInUrls] = replacementUrl;
					}
				}.bind(this));

				replaced.push(replacement);
			}.bind(this));
			return Promise.all(replaced);
		}

		/**
   * Create a new CSS file with the replaced URLs
   * @private
   * @param  {string} href the original css file
   * @return {Promise}  returns a BlobUrl to the new CSS file or a data url
   */

	}, {
		key: "createCssFile",
		value: function createCssFile(href) {
			var _this2 = this;

			var newUrl;

			if (_pathWebpack2.default.isAbsolute(href)) {
				return new Promise(function (resolve) {
					resolve();
				});
			}

			var absolute = this.settings.resolver(href);

			// Get the text of the css file from the archive
			var textResponse;

			if (this.settings.archive) {
				textResponse = this.settings.archive.getText(absolute);
			} else {
				textResponse = this.settings.request(absolute, "text");
			}

			// Get asset links relative to css file
			var relUrls = this.urls.map(function (assetHref) {
				var resolved = _this2.settings.resolver(assetHref);
				var relative = new _path2.default(absolute).relative(resolved);

				return relative;
			});

			if (!textResponse) {
				// file not found, don't replace
				return new Promise(function (resolve) {
					resolve();
				});
			}

			return textResponse.then(function (text) {
				// Replacements in the css text
				text = (0, _replacements.substitute)(text, relUrls, _this2.replacementUrls);

				// Get the new url
				if (_this2.settings.replacements === "base64") {
					newUrl = (0, _core.createBase64Url)(text, "text/css");
				} else {
					newUrl = (0, _core.createBlobUrl)(text, "text/css");
				}

				return newUrl;
			}, function (err) {
				// handle response errors
				return new Promise(function (resolve) {
					resolve();
				});
			});
		}

		/**
   * Resolve all resources URLs relative to an absolute URL
   * @param  {string} absolute to be resolved to
   * @param  {[resolver]} resolver
   * @return {string[]} array with relative Urls
   */

	}, {
		key: "relativeTo",
		value: function relativeTo(absolute, resolver) {
			resolver = resolver || this.settings.resolver;

			// Get Urls relative to current sections
			return this.urls.map(function (href) {
				var resolved = resolver(href);
				var relative = new _path2.default(absolute).relative(resolved);
				return relative;
			}.bind(this));
		}

		/**
   * Get a URL for a resource
   * @param  {string} path
   * @return {string} url
   */

	}, {
		key: "get",
		value: function get(path) {
			var indexInUrls = this.urls.indexOf(path);
			if (indexInUrls === -1) {
				return;
			}
			if (this.replacementUrls.length) {
				return new Promise(function (resolve, reject) {
					resolve(this.replacementUrls[indexInUrls]);
				}.bind(this));
			} else {
				return this.createUrl(path);
			}
		}

		/**
   * Substitute urls in content, with replacements,
   * relative to a url if provided
   * @param  {string} content
   * @param  {[string]} url   url to resolve to
   * @return {string}         content with urls substituted
   */

	}, {
		key: "substitute",
		value: function substitute(content, url) {
			var relUrls;
			if (url) {
				relUrls = this.relativeTo(url);
			} else {
				relUrls = this.urls;
			}
			return (0, _replacements.substitute)(content, relUrls, this.replacementUrls);
		}
	}, {
		key: "destroy",
		value: function destroy() {
			this.settings = undefined;
			this.manifest = undefined;
			this.resources = undefined;
			this.replacementUrls = undefined;
			this.html = undefined;
			this.assets = undefined;
			this.css = undefined;

			this.urls = undefined;
			this.cssUrls = undefined;
		}
	}]);

	return Resources;
}();

exports.default = Resources;
module.exports = exports["default"];

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _epubcfi = __webpack_require__(1);

var _epubcfi2 = _interopRequireDefault(_epubcfi);

var _core = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Page List Parser
 * @param {[document]} xml
 */
var PageList = function () {
	function PageList(xml) {
		_classCallCheck(this, PageList);

		this.pages = [];
		this.locations = [];
		this.epubcfi = new _epubcfi2.default();

		this.firstPage = 0;
		this.lastPage = 0;
		this.totalPages = 0;

		this.toc = undefined;
		this.ncx = undefined;

		this.lastPage;
		if (xml) {
			this.pageList = this.parse(xml);
		}

		if (this.pageList && this.pageList.length) {
			this.process(this.pageList);
		}
	}

	/**
  * Parse PageList Xml
  * @param  {document} xml
  */


	_createClass(PageList, [{
		key: "parse",
		value: function parse(xml) {
			var html = (0, _core.qs)(xml, "html");
			var ncx = (0, _core.qs)(xml, "ncx");

			if (html) {
				this.toc = this.parseNav(xml);
			} else if (ncx) {
				// Not supported
				// this.toc = this.parseNcx(xml);
				return;
			}
		}

		/**
   * Parse a Nav PageList
   * @private
   * @param  {document} navHtml
   * @return {PageList.item[]} list
   */

	}, {
		key: "parseNav",
		value: function parseNav(navHtml) {
			var navElement = (0, _core.querySelectorByType)(navHtml, "nav", "page-list");
			var navItems = navElement ? (0, _core.qsa)(navElement, "li") : [];
			var length = navItems.length;
			var i;
			var list = [];
			var item;

			if (!navItems || length === 0) return list;

			for (i = 0; i < length; ++i) {
				item = this.item(navItems[i]);
				list.push(item);
			}

			return list;
		}

		/**
   * Page List Item
   * @private
   * @param  {object} item
   * @return {object} pageListItem
   */

	}, {
		key: "item",
		value: function item(_item) {
			var content = (0, _core.qs)(_item, "a"),
			    href = content.getAttribute("href") || "",
			    text = content.textContent || "",
			    page = parseInt(text),
			    isCfi = href.indexOf("epubcfi"),
			    split,
			    packageUrl,
			    cfi;

			if (isCfi != -1) {
				split = href.split("#");
				packageUrl = split[0];
				cfi = split.length > 1 ? split[1] : false;
				return {
					"cfi": cfi,
					"href": href,
					"packageUrl": packageUrl,
					"page": page
				};
			} else {
				return {
					"href": href,
					"page": page
				};
			}
		}

		/**
   * Process pageList items
   * @private
   * @param  {array} pageList
   */

	}, {
		key: "process",
		value: function process(pageList) {
			pageList.forEach(function (item) {
				this.pages.push(item.page);
				if (item.cfi) {
					this.locations.push(item.cfi);
				}
			}, this);
			this.firstPage = parseInt(this.pages[0]);
			this.lastPage = parseInt(this.pages[this.pages.length - 1]);
			this.totalPages = this.lastPage - this.firstPage;
		}

		/**
   * Replace HREFs with CFI
   * TODO: implement getting CFI from Href
   */

	}, {
		key: "addCFIs",
		value: function addCFIs() {
			this.pageList.forEach(function (pg) {
				if (!pg.cfi) {
					// epubcfi.generateCfiFromHref(pg.href, book).then(function(cfi){
					// 	pg.cfi = cfi;
					// 	pg.packageUrl = book.settings.packageUrl;
					// });
				}
			});
		}

		/*
  EPUBJS.generateCfiFromHref(href, book) {
    var uri = EPUBJS.core.uri(href);
    var path = uri.path;
    var fragment = uri.fragment;
    var spinePos = book.spineIndexByURL[path];
    var loaded;
    var deferred = new RSVP.defer();
    var epubcfi = new EPUBJS.EpubCFI();
    var spineItem;
  	  if(typeof spinePos !== "undefined"){
      spineItem = book.spine[spinePos];
      loaded = book.loadXml(spineItem.url);
      loaded.then(function(doc){
        var element = doc.getElementById(fragment);
        var cfi;
        cfi = epubcfi.generateCfiFromElement(element, spineItem.cfiBase);
        deferred.resolve(cfi);
      });
    }
  	  return deferred.promise;
  }
  */

		/**
   * Get a PageList result from a EpubCFI
   * @param  {string} cfi EpubCFI String
   * @return {string} page
   */

	}, {
		key: "pageFromCfi",
		value: function pageFromCfi(cfi) {
			var pg = -1;

			// Check if the pageList has not been set yet
			if (this.locations.length === 0) {
				return -1;
			}

			// TODO: check if CFI is valid?

			// check if the cfi is in the location list
			// var index = this.locations.indexOf(cfi);
			var index = (0, _core.indexOfSorted)(cfi, this.locations, this.epubcfi.compare);
			if (index != -1) {
				pg = this.pages[index];
			} else {
				// Otherwise add it to the list of locations
				// Insert it in the correct position in the locations page
				//index = EPUBJS.core.insert(cfi, this.locations, this.epubcfi.compare);
				index = (0, _core.locationOf)(cfi, this.locations, this.epubcfi.compare);
				// Get the page at the location just before the new one, or return the first
				pg = index - 1 >= 0 ? this.pages[index - 1] : this.pages[0];
				if (pg !== undefined) {
					// Add the new page in so that the locations and page array match up
					//this.pages.splice(index, 0, pg);
				} else {
					pg = -1;
				}
			}
			return pg;
		}

		/**
   * Get an EpubCFI from a Page List Item
   * @param  {string} pg
   * @return {string} cfi
   */

	}, {
		key: "cfiFromPage",
		value: function cfiFromPage(pg) {
			var cfi = -1;
			// check that pg is an int
			if (typeof pg != "number") {
				pg = parseInt(pg);
			}

			// check if the cfi is in the page list
			// Pages could be unsorted.
			var index = this.pages.indexOf(pg);
			if (index != -1) {
				cfi = this.locations[index];
			}
			// TODO: handle pages not in the list
			return cfi;
		}

		/**
   * Get a Page from Book percentage
   * @param  {number} percent
   * @return {string} page
   */

	}, {
		key: "pageFromPercentage",
		value: function pageFromPercentage(percent) {
			var pg = Math.round(this.totalPages * percent);
			return pg;
		}

		/**
   * Returns a value between 0 - 1 corresponding to the location of a page
   * @param  {int} pg the page
   * @return {number} percentage
   */

	}, {
		key: "percentageFromPage",
		value: function percentageFromPage(pg) {
			var percentage = (pg - this.firstPage) / this.totalPages;
			return Math.round(percentage * 1000) / 1000;
		}

		/**
   * Returns a value between 0 - 1 corresponding to the location of a cfi
   * @param  {string} cfi EpubCFI String
   * @return {number} percentage
   */

	}, {
		key: "percentageFromCfi",
		value: function percentageFromCfi(cfi) {
			var pg = this.pageFromCfi(cfi);
			var percentage = this.percentageFromPage(pg);
			return percentage;
		}
	}, {
		key: "destroy",
		value: function destroy() {
			this.pages = undefined;
			this.locations = undefined;
			this.epubcfi = undefined;

			this.pageList = undefined;

			this.toc = undefined;
			this.ncx = undefined;
		}
	}]);

	return PageList;
}();

exports.default = PageList;
module.exports = exports["default"];

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Figures out the CSS to apply for a layout
 * @class
 * @param {object} settings
 * @param {[string=reflowable]} settings.layout
 * @param {[string]} settings.spread
 * @param {[int=800]} settings.minSpreadWidth
 * @param {[boolean=false]} settings.evenSpreads
 */
var Layout = function () {
	function Layout(settings) {
		_classCallCheck(this, Layout);

		this.settings = settings;
		this.name = settings.layout || "reflowable";
		this._spread = settings.spread === "none" ? false : true;
		this._minSpreadWidth = settings.minSpreadWidth || 800;
		this._evenSpreads = settings.evenSpreads || false;

		if (settings.flow === "scrolled" || settings.flow === "scrolled-continuous" || settings.flow === "scrolled-doc") {
			this._flow = "scrolled";
		} else {
			this._flow = "paginated";
		}

		this.width = 0;
		this.height = 0;
		this.spreadWidth = 0;
		this.delta = 0;

		this.columnWidth = 0;
		this.gap = 0;
		this.divisor = 1;

		this.props = {
			name: this.name,
			spread: this._spread,
			flow: this._flow,
			width: 0,
			height: 0,
			spreadWidth: 0,
			delta: 0,
			columnWidth: 0,
			gap: 0,
			divisor: 1
		};
	}

	/**
  * Switch the flow between paginated and scrolled
  * @param  {string} flow paginated | scrolled
  */


	_createClass(Layout, [{
		key: "flow",
		value: function flow(_flow) {
			if (typeof _flow != "undefined") {
				if (_flow === "scrolled" || _flow === "scrolled-continuous" || _flow === "scrolled-doc") {
					this._flow = "scrolled";
				} else {
					this._flow = "paginated";
				}
				this.props.flow = this._flow;
			}
			return this._flow;
		}

		/**
   * Switch between using spreads or not, and set the
   * width at which they switch to single.
   * @param  {string} spread true | false
   * @param  {boolean} min integer in pixels
   */

	}, {
		key: "spread",
		value: function spread(_spread, min) {

			if (_spread) {
				this._spread = _spread === "none" ? false : true;
				this.props.spread = this._spread;
			}

			if (min >= 0) {
				this._minSpreadWidth = min;
			}

			return this._spread;
		}

		/**
   * Calculate the dimensions of the pagination
   * @param  {number} _width  [description]
   * @param  {number} _height [description]
   * @param  {number} _gap    [description]
   */

	}, {
		key: "calculate",
		value: function calculate(_width, _height, _gap) {

			var divisor = 1;
			var gap = _gap || 0;

			//-- Check the width and create even width columns
			// var fullWidth = Math.floor(_width);
			var width = _width;

			var section = Math.floor(width / 12);

			var colWidth;
			var spreadWidth;
			var pageWidth;
			var delta;

			if (this._spread && width >= this._minSpreadWidth) {
				divisor = 2;
			} else {
				divisor = 1;
			}

			if (this.name === "reflowable" && this._flow === "paginated" && !(_gap >= 0)) {
				gap = section % 2 === 0 ? section : section - 1;
			}

			if (this.name === "pre-paginated") {
				gap = 0;
			}

			//-- Double Page
			if (divisor > 1) {
				// width = width - gap;
				// colWidth = (width - gap) / divisor;
				// gap = gap / divisor;
				colWidth = width / divisor - gap;
				pageWidth = colWidth + gap;
			} else {
				colWidth = width;
				pageWidth = width;
			}

			if (this.name === "pre-paginated" && divisor > 1) {
				width = colWidth;
			}

			spreadWidth = colWidth * divisor + gap;

			delta = width;

			this.width = width;
			this.height = _height;
			this.spreadWidth = spreadWidth;
			this.pageWidth = pageWidth;
			this.delta = delta;

			this.columnWidth = colWidth;
			this.gap = gap;
			this.divisor = divisor;

			this.props.width = width;
			this.props.height = _height;
			this.props.spreadWidth = spreadWidth;
			this.props.pageWidth = pageWidth;
			this.props.delta = delta;

			this.props.columnWidth = colWidth;
			this.props.gap = gap;
			this.props.divisor = divisor;
		}

		/**
   * Apply Css to a Document
   * @param  {Contents} contents
   * @return {[Promise]}
   */

	}, {
		key: "format",
		value: function format(contents) {
			var formating;

			if (this.name === "pre-paginated") {
				formating = contents.fit(this.columnWidth, this.height);
			} else if (this._flow === "paginated") {
				formating = contents.columns(this.width, this.height, this.columnWidth, this.gap);
			} else {
				// scrolled
				formating = contents.size(this.width, null);
			}

			return formating; // might be a promise in some View Managers
		}

		/**
   * Count number of pages
   * @param  {number} totalWidth
   * @return {number} spreads
   * @return {number} pages
   */

	}, {
		key: "count",
		value: function count(totalLength, pageLength) {
			// var totalWidth = contents.scrollWidth();
			var spreads = void 0,
			    pages = void 0;

			if (this.name === "pre-paginated") {
				spreads = 1;
				pages = 1;
			} else if (this._flow === "paginated") {
				pageLength = pageLength || this.delta;
				spreads = Math.ceil(totalLength / pageLength);
				pages = spreads * this.divisor;
			} else {
				// scrolled
				pageLength = pageLength || this.height;
				spreads = Math.ceil(totalLength / pageLength);
				pages = spreads;
			}

			return {
				spreads: spreads,
				pages: pages
			};
		}
	}]);

	return Layout;
}();

exports.default = Layout;
module.exports = exports["default"];

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _url = __webpack_require__(4);

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Themes = function () {
	function Themes(rendition) {
		_classCallCheck(this, Themes);

		this.rendition = rendition;
		this._themes = {
			"default": {
				"rules": {},
				"url": "",
				"serialized": ""
			}
		};
		this._overrides = {};
		this._current = "default";
		this._injected = [];
		this.rendition.hooks.content.register(this.inject.bind(this));
		this.rendition.hooks.content.register(this.overrides.bind(this));
	}

	_createClass(Themes, [{
		key: "register",
		value: function register() {
			if (arguments.length === 0) {
				return;
			}
			if (arguments.length === 1 && _typeof(arguments[0]) === "object") {
				return this.registerThemes(arguments[0]);
			}
			if (arguments.length === 1 && typeof arguments[0] === "string") {
				return this.default(arguments[0]);
			}
			if (arguments.length === 2 && typeof arguments[1] === "string") {
				return this.registerUrl(arguments[0], arguments[1]);
			}
			if (arguments.length === 2 && _typeof(arguments[1]) === "object") {
				return this.registerRules(arguments[0], arguments[1]);
			}
		}
	}, {
		key: "default",
		value: function _default(theme) {
			if (!theme) {
				return;
			}
			if (typeof theme === "string") {
				return this.registerUrl("default", theme);
			}
			if ((typeof theme === "undefined" ? "undefined" : _typeof(theme)) === "object") {
				return this.registerRules("default", theme);
			}
		}
	}, {
		key: "registerThemes",
		value: function registerThemes(themes) {
			for (var theme in themes) {
				if (themes.hasOwnProperty(theme)) {
					if (typeof themes[theme] === "string") {
						this.registerUrl(theme, themes[theme]);
					} else {
						this.registerRules(theme, themes[theme]);
					}
				}
			}
		}
	}, {
		key: "registerUrl",
		value: function registerUrl(name, input) {
			var url = new _url2.default(input);
			this._themes[name] = { "url": url.toString() };
			if (this._injected[name]) {
				this.update(name);
			}
		}
	}, {
		key: "registerRules",
		value: function registerRules(name, rules) {
			this._themes[name] = { "rules": rules };
			// TODO: serialize css rules
			if (this._injected[name]) {
				this.update(name);
			}
		}
	}, {
		key: "select",
		value: function select(name) {
			var prev = this._current;
			var contents;

			this._current = name;
			this.update(name);

			contents = this.rendition.getContents();
			contents.forEach(function (content) {
				content.removeClass(prev);
				content.addClass(name);
			});
		}
	}, {
		key: "update",
		value: function update(name) {
			var _this = this;

			var contents = this.rendition.getContents();
			contents.forEach(function (content) {
				_this.add(name, content);
			});
		}
	}, {
		key: "inject",
		value: function inject(contents) {
			var links = [];
			var themes = this._themes;
			var theme;

			for (var name in themes) {
				if (themes.hasOwnProperty(name) && (name === this._current || name === "default")) {
					theme = themes[name];
					if (theme.rules && Object.keys(theme.rules).length > 0 || theme.url && links.indexOf(theme.url) === -1) {
						this.add(name, contents);
					}
					this._injected.push(name);
				}
			}

			if (this._current != "default") {
				contents.addClass(this._current);
			}
		}
	}, {
		key: "add",
		value: function add(name, contents) {
			var theme = this._themes[name];

			if (!theme || !contents) {
				return;
			}

			if (theme.url) {
				contents.addStylesheet(theme.url);
			} else if (theme.serialized) {
				// TODO: handle serialized
			} else if (theme.rules) {
				contents.addStylesheetRules(theme.rules);
				theme.injected = true;
			}
		}
	}, {
		key: "override",
		value: function override(name, value) {
			var _this2 = this;

			var contents = this.rendition.getContents();

			this._overrides[name] = value;

			contents.forEach(function (content) {
				content.css(name, _this2._overrides[name]);
			});
		}
	}, {
		key: "overrides",
		value: function overrides(contents) {
			var overrides = this._overrides;

			for (var rule in overrides) {
				if (overrides.hasOwnProperty(rule)) {
					contents.css(rule, overrides[rule]);
				}
			}
		}
	}, {
		key: "fontSize",
		value: function fontSize(size) {
			this.override("font-size", size);
		}
	}, {
		key: "font",
		value: function font(f) {
			this.override("font-family", f);
		}
	}, {
		key: "destroy",
		value: function destroy() {
			this.rendition = undefined;
			this._themes = undefined;
			this._overrides = undefined;
			this._current = undefined;
			this._injected = undefined;
		}
	}]);

	return Themes;
}();

exports.default = Themes;
module.exports = exports["default"];

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Manage annotations for a book?

/*
let a = rendition.annotations.highlight(cfiRange, data)

a.on("added", () => console.log("added"))
a.on("removed", () => console.log("removed"))
a.on("clicked", () => console.log("clicked"))

a.update(data)
a.remove();
a.text();

rendition.annotations.show()
rendition.annotations.hide()

rendition.annotations.highlights.show()
rendition.annotations.highlights.hide()
*/

var _eventEmitter = __webpack_require__(2);

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

var _epubcfi = __webpack_require__(1);

var _epubcfi2 = _interopRequireDefault(_epubcfi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
	* Handles managing adding & removing Annotations
	* @class
	*/
var Annotations = function () {
	function Annotations(rendition) {
		_classCallCheck(this, Annotations);

		this.rendition = rendition;
		this.highlights = [];
		this.underlines = [];
		this.marks = [];
		this._annotations = {};
		this._annotationsBySectionIndex = {};

		this.rendition.hooks.render.register(this.inject.bind(this));
		this.rendition.hooks.unloaded.register(this.clear.bind(this));
	}

	_createClass(Annotations, [{
		key: "add",
		value: function add(type, cfiRange, data, cb) {
			var hash = encodeURI(cfiRange);
			var cfi = new _epubcfi2.default(cfiRange);
			var sectionIndex = cfi.spinePos;
			var annotation = new Annotation({
				type: type,
				cfiRange: cfiRange,
				data: data,
				sectionIndex: sectionIndex,
				cb: cb
			});

			this._annotations[hash] = annotation;

			if (sectionIndex in this._annotationsBySectionIndex) {
				this._annotationsBySectionIndex[sectionIndex].push(hash);
			} else {
				this._annotationsBySectionIndex[sectionIndex] = [hash];
			}

			var views = this.rendition.views();

			views.forEach(function (view) {
				if (annotation.sectionIndex === view.index) {
					annotation.attach(view);
				}
			});

			return annotation;
		}
	}, {
		key: "remove",
		value: function remove(cfiRange, type) {
			var _this = this;

			var hash = encodeURI(cfiRange);

			if (hash in this._annotations) {
				var annotation = this._annotations[hash];

				if (type && annotation.type !== type) {
					return;
				}

				var views = this.rendition.views();
				views.forEach(function (view) {
					_this._removeFromAnnotationBySectionIndex(annotation.sectionIndex, hash);
					if (annotation.sectionIndex === view.index) {
						annotation.detach(view);
					}
				});

				delete this._annotations[hash];
			}
		}
	}, {
		key: "_removeFromAnnotationBySectionIndex",
		value: function _removeFromAnnotationBySectionIndex(sectionIndex, hash) {
			this._annotationsBySectionIndex[sectionIndex] = this._annotationsAt(sectionIndex).filter(function (h) {
				return h !== hash;
			});
		}
	}, {
		key: "_annotationsAt",
		value: function _annotationsAt(index) {
			return this._annotationsBySectionIndex[index];
		}
	}, {
		key: "highlight",
		value: function highlight(cfiRange, data, cb) {
			this.add("highlight", cfiRange, data, cb);
		}
	}, {
		key: "underline",
		value: function underline(cfiRange, data, cb) {
			this.add("underline", cfiRange, data, cb);
		}
	}, {
		key: "mark",
		value: function mark(cfiRange, data, cb) {
			this.add("mark", cfiRange, data, cb);
		}
	}, {
		key: "each",
		value: function each() {
			return this._annotations.forEach.apply(this._annotations, arguments);
		}
	}, {
		key: "inject",
		value: function inject(view) {
			var _this2 = this;

			var sectionIndex = view.index;
			if (sectionIndex in this._annotationsBySectionIndex) {
				var annotations = this._annotationsBySectionIndex[sectionIndex];
				annotations.forEach(function (hash) {
					var annotation = _this2._annotations[hash];
					annotation.attach(view);
				});
			}
		}
	}, {
		key: "clear",
		value: function clear(view) {
			var _this3 = this;

			var sectionIndex = view.index;
			if (sectionIndex in this._annotationsBySectionIndex) {
				var annotations = this._annotationsBySectionIndex[sectionIndex];
				annotations.forEach(function (hash) {
					var annotation = _this3._annotations[hash];
					annotation.detach(view);
				});
			}
		}
	}, {
		key: "show",
		value: function show() {}
	}, {
		key: "hide",
		value: function hide() {}
	}]);

	return Annotations;
}();

var Annotation = function () {
	function Annotation(_ref) {
		var type = _ref.type,
		    cfiRange = _ref.cfiRange,
		    data = _ref.data,
		    sectionIndex = _ref.sectionIndex,
		    cb = _ref.cb;

		_classCallCheck(this, Annotation);

		this.type = type;
		this.cfiRange = cfiRange;
		this.data = data;
		this.sectionIndex = sectionIndex;
		this.mark = undefined;
		this.cb = cb;
	}

	_createClass(Annotation, [{
		key: "update",
		value: function update(data) {
			this.data = data;
		}
	}, {
		key: "attach",
		value: function attach(view) {
			var cfiRange = this.cfiRange,
			    data = this.data,
			    type = this.type,
			    mark = this.mark,
			    cb = this.cb;

			var result = void 0;
			/*
   if (mark) {
   	return; // already added
   }
   */

			if (type === "highlight") {
				result = view.highlight(cfiRange, data, cb);
			} else if (type === "underline") {
				result = view.underline(cfiRange, data, cb);
			} else if (type === "mark") {
				result = view.mark(cfiRange, data, cb);
			}

			this.mark = result;

			return result;
		}
	}, {
		key: "detach",
		value: function detach(view) {
			var cfiRange = this.cfiRange,
			    type = this.type;

			var result = void 0;

			if (view) {
				if (type === "highlight") {
					result = view.unhighlight(cfiRange);
				} else if (type === "underline") {
					result = view.ununderline(cfiRange);
				} else if (type === "mark") {
					result = view.unmark(cfiRange);
				}
			}

			this.mark = undefined;

			return result;
		}
	}, {
		key: "text",
		value: function text() {
			// TODO: needs implementation in contents
		}
	}]);

	return Annotation;
}();

(0, _eventEmitter2.default)(Annotation.prototype);

exports.default = Annotations;
module.exports = exports["default"];

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _core = __webpack_require__(0);

var _request = __webpack_require__(10);

var _request2 = _interopRequireDefault(_request);

var _mime = __webpack_require__(16);

var _mime2 = _interopRequireDefault(_mime);

var _path = __webpack_require__(3);

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Handles Unzipping a requesting files from an Epub Archive
 * @class
 */
var Archive = function () {
	function Archive() {
		_classCallCheck(this, Archive);

		this.zip = undefined;
		this.urlCache = {};

		this.checkRequirements();
	}

	/**
  * Checks to see if JSZip exists in global namspace,
  * Requires JSZip if it isn't there
  * @private
  */


	_createClass(Archive, [{
		key: "checkRequirements",
		value: function checkRequirements() {
			try {
				if (typeof JSZip === "undefined") {
					var _JSZip = __webpack_require__(51);
					this.zip = new _JSZip();
				} else {
					this.zip = new JSZip();
				}
			} catch (e) {
				throw new Error("JSZip lib not loaded");
			}
		}

		/**
   * Open an archive
   * @param  {binary} input
   * @param  {boolean} isBase64 tells JSZip if the input data is base64 encoded
   * @return {Promise} zipfile
   */

	}, {
		key: "open",
		value: function open(input, isBase64) {
			return this.zip.loadAsync(input, { "base64": isBase64 });
		}

		/**
   * Load and Open an archive
   * @param  {string} zipUrl
   * @param  {boolean} isBase64 tells JSZip if the input data is base64 encoded
   * @return {Promise} zipfile
   */

	}, {
		key: "openUrl",
		value: function openUrl(zipUrl, isBase64) {
			return (0, _request2.default)(zipUrl, "binary").then(function (data) {
				return this.zip.loadAsync(data, { "base64": isBase64 });
			}.bind(this));
		}

		/**
   * Request
   * @param  {string} url  a url to request from the archive
   * @param  {[string]} type specify the type of the returned result
   * @return {Promise}
   */

	}, {
		key: "request",
		value: function request(url, type) {
			var deferred = new _core.defer();
			var response;
			var path = new _path2.default(url);

			// If type isn't set, determine it from the file extension
			if (!type) {
				type = path.extension;
			}

			if (type == "blob") {
				response = this.getBlob(url);
			} else {
				response = this.getText(url);
			}

			if (response) {
				response.then(function (r) {
					var result = this.handleResponse(r, type);
					deferred.resolve(result);
				}.bind(this));
			} else {
				deferred.reject({
					message: "File not found in the epub: " + url,
					stack: new Error().stack
				});
			}
			return deferred.promise;
		}

		/**
   * Handle the response from request
   * @private
   * @param  {any} response
   * @param  {[string]} type
   * @return {any} the parsed result
   */

	}, {
		key: "handleResponse",
		value: function handleResponse(response, type) {
			var r;

			if (type == "json") {
				r = JSON.parse(response);
			} else if ((0, _core.isXml)(type)) {
				r = (0, _core.parse)(response, "text/xml");
			} else if (type == "xhtml") {
				r = (0, _core.parse)(response, "application/xhtml+xml");
			} else if (type == "html" || type == "htm") {
				r = (0, _core.parse)(response, "text/html");
			} else {
				r = response;
			}

			return r;
		}

		/**
   * Get a Blob from Archive by Url
   * @param  {string} url
   * @param  {[string]} mimeType
   * @return {Blob}
   */

	}, {
		key: "getBlob",
		value: function getBlob(url, mimeType) {
			var decodededUrl = window.decodeURIComponent(url.substr(1)); // Remove first slash
			var entry = this.zip.file(decodededUrl);

			if (entry) {
				mimeType = mimeType || _mime2.default.lookup(entry.name);
				return entry.async("uint8array").then(function (uint8array) {
					return new Blob([uint8array], { type: mimeType });
				});
			}
		}

		/**
   * Get Text from Archive by Url
   * @param  {string} url
   * @param  {[string]} encoding
   * @return {string}
   */

	}, {
		key: "getText",
		value: function getText(url, encoding) {
			var decodededUrl = window.decodeURIComponent(url.substr(1)); // Remove first slash
			var entry = this.zip.file(decodededUrl);

			if (entry) {
				return entry.async("string").then(function (text) {
					return text;
				});
			}
		}

		/**
   * Get a base64 encoded result from Archive by Url
   * @param  {string} url
   * @param  {[string]} mimeType
   * @return {string} base64 encoded
   */

	}, {
		key: "getBase64",
		value: function getBase64(url, mimeType) {
			var decodededUrl = window.decodeURIComponent(url.substr(1)); // Remove first slash
			var entry = this.zip.file(decodededUrl);

			if (entry) {
				mimeType = mimeType || _mime2.default.lookup(entry.name);
				return entry.async("base64").then(function (data) {
					return "data:" + mimeType + ";base64," + data;
				});
			}
		}

		/**
   * Create a Url from an unarchived item
   * @param  {string} url
   * @param  {[object]} options.base64 use base64 encoding or blob url
   * @return {Promise} url promise with Url string
   */

	}, {
		key: "createUrl",
		value: function createUrl(url, options) {
			var deferred = new _core.defer();
			var _URL = window.URL || window.webkitURL || window.mozURL;
			var tempUrl;
			var response;
			var useBase64 = options && options.base64;

			if (url in this.urlCache) {
				deferred.resolve(this.urlCache[url]);
				return deferred.promise;
			}

			if (useBase64) {
				response = this.getBase64(url);

				if (response) {
					response.then(function (tempUrl) {

						this.urlCache[url] = tempUrl;
						deferred.resolve(tempUrl);
					}.bind(this));
				}
			} else {

				response = this.getBlob(url);

				if (response) {
					response.then(function (blob) {

						tempUrl = _URL.createObjectURL(blob);
						this.urlCache[url] = tempUrl;
						deferred.resolve(tempUrl);
					}.bind(this));
				}
			}

			if (!response) {
				deferred.reject({
					message: "File not found in the epub: " + url,
					stack: new Error().stack
				});
			}

			return deferred.promise;
		}

		/**
   * Revoke Temp Url for a achive item
   * @param  {string} url url of the item in the archive
   */

	}, {
		key: "revokeUrl",
		value: function revokeUrl(url) {
			var _URL = window.URL || window.webkitURL || window.mozURL;
			var fromCache = this.urlCache[url];
			if (fromCache) _URL.revokeObjectURL(fromCache);
		}
	}, {
		key: "destroy",
		value: function destroy() {
			var _URL = window.URL || window.webkitURL || window.mozURL;
			for (var fromCache in this.urlCache) {
				_URL.revokeObjectURL(fromCache);
			}
			this.zip = undefined;
			this.urlCache = {};
		}
	}]);

	return Archive;
}();

exports.default = Archive;
module.exports = exports["default"];

/***/ }),
/* 51 */
/***/ (function(module, exports) {

if(typeof __WEBPACK_EXTERNAL_MODULE_51__ === 'undefined') {var e = new Error("Cannot find module \"JSZip\""); e.code = 'MODULE_NOT_FOUND'; throw e;}
module.exports = __WEBPACK_EXTERNAL_MODULE_51__;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* From https://github.com/webcomponents/URL/blob/master/url.js
 * Added UMD, file link handling */

/* Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/publicdomain/zero/1.0/ */


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (root, factory) {
  // Fix for this being undefined in modules
  if (!root) {
    root = window || global;
  }
  if (( false ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
    // Node
    module.exports = factory(root);
  } else if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    // Browser globals (root is window)
    root.URL = factory(root);
  }
})(undefined, function (scope) {
  // feature detect for URL constructor
  var hasWorkingUrl = false;
  if (!scope.forceJURL) {
    try {
      var u = new URL('b', 'http://a');
      u.pathname = 'c%20d';
      hasWorkingUrl = u.href === 'http://a/c%20d';
    } catch (e) {}
  }

  if (hasWorkingUrl) return scope.URL;

  var relative = Object.create(null);
  relative['ftp'] = 21;
  relative['file'] = 0;
  relative['gopher'] = 70;
  relative['http'] = 80;
  relative['https'] = 443;
  relative['ws'] = 80;
  relative['wss'] = 443;

  var relativePathDotMapping = Object.create(null);
  relativePathDotMapping['%2e'] = '.';
  relativePathDotMapping['.%2e'] = '..';
  relativePathDotMapping['%2e.'] = '..';
  relativePathDotMapping['%2e%2e'] = '..';

  function isRelativeScheme(scheme) {
    return relative[scheme] !== undefined;
  }

  function invalid() {
    clear.call(this);
    this._isInvalid = true;
  }

  function IDNAToASCII(h) {
    if ('' == h) {
      invalid.call(this);
    }
    // XXX
    return h.toLowerCase();
  }

  function percentEscape(c) {
    var unicode = c.charCodeAt(0);
    if (unicode > 0x20 && unicode < 0x7F &&
    // " # < > ? `
    [0x22, 0x23, 0x3C, 0x3E, 0x3F, 0x60].indexOf(unicode) == -1) {
      return c;
    }
    return encodeURIComponent(c);
  }

  function percentEscapeQuery(c) {
    // XXX This actually needs to encode c using encoding and then
    // convert the bytes one-by-one.

    var unicode = c.charCodeAt(0);
    if (unicode > 0x20 && unicode < 0x7F &&
    // " # < > ` (do not escape '?')
    [0x22, 0x23, 0x3C, 0x3E, 0x60].indexOf(unicode) == -1) {
      return c;
    }
    return encodeURIComponent(c);
  }

  var EOF = undefined,
      ALPHA = /[a-zA-Z]/,
      ALPHANUMERIC = /[a-zA-Z0-9\+\-\.]/;

  function parse(input, stateOverride, base) {
    function err(message) {
      errors.push(message);
    }

    var state = stateOverride || 'scheme start',
        cursor = 0,
        buffer = '',
        seenAt = false,
        seenBracket = false,
        errors = [];

    loop: while ((input[cursor - 1] != EOF || cursor == 0) && !this._isInvalid) {
      var c = input[cursor];
      switch (state) {
        case 'scheme start':
          if (c && ALPHA.test(c)) {
            buffer += c.toLowerCase(); // ASCII-safe
            state = 'scheme';
          } else if (!stateOverride) {
            buffer = '';
            state = 'no scheme';
            continue;
          } else {
            err('Invalid scheme.');
            break loop;
          }
          break;

        case 'scheme':
          if (c && ALPHANUMERIC.test(c)) {
            buffer += c.toLowerCase(); // ASCII-safe
          } else if (':' == c) {
            this._scheme = buffer;
            buffer = '';
            if (stateOverride) {
              break loop;
            }
            if (isRelativeScheme(this._scheme)) {
              this._isRelative = true;
            }
            if ('file' == this._scheme) {
              state = 'relative';
            } else if (this._isRelative && base && base._scheme == this._scheme) {
              state = 'relative or authority';
            } else if (this._isRelative) {
              state = 'authority first slash';
            } else {
              state = 'scheme data';
            }
          } else if (!stateOverride) {
            buffer = '';
            cursor = 0;
            state = 'no scheme';
            continue;
          } else if (EOF == c) {
            break loop;
          } else {
            err('Code point not allowed in scheme: ' + c);
            break loop;
          }
          break;

        case 'scheme data':
          if ('?' == c) {
            this._query = '?';
            state = 'query';
          } else if ('#' == c) {
            this._fragment = '#';
            state = 'fragment';
          } else {
            // XXX error handling
            if (EOF != c && '\t' != c && '\n' != c && '\r' != c) {
              this._schemeData += percentEscape(c);
            }
          }
          break;

        case 'no scheme':
          if (!base || !isRelativeScheme(base._scheme)) {
            err('Missing scheme.');
            invalid.call(this);
          } else {
            state = 'relative';
            continue;
          }
          break;

        case 'relative or authority':
          if ('/' == c && '/' == input[cursor + 1]) {
            state = 'authority ignore slashes';
          } else {
            err('Expected /, got: ' + c);
            state = 'relative';
            continue;
          }
          break;

        case 'relative':
          this._isRelative = true;
          if ('file' != this._scheme) this._scheme = base._scheme;
          if (EOF == c) {
            this._host = base._host;
            this._port = base._port;
            this._path = base._path.slice();
            this._query = base._query;
            this._username = base._username;
            this._password = base._password;
            break loop;
          } else if ('/' == c || '\\' == c) {
            if ('\\' == c) err('\\ is an invalid code point.');
            state = 'relative slash';
          } else if ('?' == c) {
            this._host = base._host;
            this._port = base._port;
            this._path = base._path.slice();
            this._query = '?';
            this._username = base._username;
            this._password = base._password;
            state = 'query';
          } else if ('#' == c) {
            this._host = base._host;
            this._port = base._port;
            this._path = base._path.slice();
            this._query = base._query;
            this._fragment = '#';
            this._username = base._username;
            this._password = base._password;
            state = 'fragment';
          } else {
            var nextC = input[cursor + 1];
            var nextNextC = input[cursor + 2];
            if ('file' != this._scheme || !ALPHA.test(c) || nextC != ':' && nextC != '|' || EOF != nextNextC && '/' != nextNextC && '\\' != nextNextC && '?' != nextNextC && '#' != nextNextC) {
              this._host = base._host;
              this._port = base._port;
              this._username = base._username;
              this._password = base._password;
              this._path = base._path.slice();
              this._path.pop();
            }
            state = 'relative path';
            continue;
          }
          break;

        case 'relative slash':
          if ('/' == c || '\\' == c) {
            if ('\\' == c) {
              err('\\ is an invalid code point.');
            }
            if ('file' == this._scheme) {
              state = 'file host';
            } else {
              state = 'authority ignore slashes';
            }
          } else {
            if ('file' != this._scheme) {
              this._host = base._host;
              this._port = base._port;
              this._username = base._username;
              this._password = base._password;
            }
            state = 'relative path';
            continue;
          }
          break;

        case 'authority first slash':
          if ('/' == c) {
            state = 'authority second slash';
          } else {
            err("Expected '/', got: " + c);
            state = 'authority ignore slashes';
            continue;
          }
          break;

        case 'authority second slash':
          state = 'authority ignore slashes';
          if ('/' != c) {
            err("Expected '/', got: " + c);
            continue;
          }
          break;

        case 'authority ignore slashes':
          if ('/' != c && '\\' != c) {
            state = 'authority';
            continue;
          } else {
            err('Expected authority, got: ' + c);
          }
          break;

        case 'authority':
          if ('@' == c) {
            if (seenAt) {
              err('@ already seen.');
              buffer += '%40';
            }
            seenAt = true;
            for (var i = 0; i < buffer.length; i++) {
              var cp = buffer[i];
              if ('\t' == cp || '\n' == cp || '\r' == cp) {
                err('Invalid whitespace in authority.');
                continue;
              }
              // XXX check URL code points
              if (':' == cp && null === this._password) {
                this._password = '';
                continue;
              }
              var tempC = percentEscape(cp);
              null !== this._password ? this._password += tempC : this._username += tempC;
            }
            buffer = '';
          } else if (EOF == c || '/' == c || '\\' == c || '?' == c || '#' == c) {
            cursor -= buffer.length;
            buffer = '';
            state = 'host';
            continue;
          } else {
            buffer += c;
          }
          break;

        case 'file host':
          if (EOF == c || '/' == c || '\\' == c || '?' == c || '#' == c) {
            if (buffer.length == 2 && ALPHA.test(buffer[0]) && (buffer[1] == ':' || buffer[1] == '|')) {
              state = 'relative path';
            } else if (buffer.length == 0) {
              state = 'relative path start';
            } else {
              this._host = IDNAToASCII.call(this, buffer);
              buffer = '';
              state = 'relative path start';
            }
            continue;
          } else if ('\t' == c || '\n' == c || '\r' == c) {
            err('Invalid whitespace in file host.');
          } else {
            buffer += c;
          }
          break;

        case 'host':
        case 'hostname':
          if (':' == c && !seenBracket) {
            // XXX host parsing
            this._host = IDNAToASCII.call(this, buffer);
            buffer = '';
            state = 'port';
            if ('hostname' == stateOverride) {
              break loop;
            }
          } else if (EOF == c || '/' == c || '\\' == c || '?' == c || '#' == c) {
            this._host = IDNAToASCII.call(this, buffer);
            buffer = '';
            state = 'relative path start';
            if (stateOverride) {
              break loop;
            }
            continue;
          } else if ('\t' != c && '\n' != c && '\r' != c) {
            if ('[' == c) {
              seenBracket = true;
            } else if (']' == c) {
              seenBracket = false;
            }
            buffer += c;
          } else {
            err('Invalid code point in host/hostname: ' + c);
          }
          break;

        case 'port':
          if (/[0-9]/.test(c)) {
            buffer += c;
          } else if (EOF == c || '/' == c || '\\' == c || '?' == c || '#' == c || stateOverride) {
            if ('' != buffer) {
              var temp = parseInt(buffer, 10);
              if (temp != relative[this._scheme]) {
                this._port = temp + '';
              }
              buffer = '';
            }
            if (stateOverride) {
              break loop;
            }
            state = 'relative path start';
            continue;
          } else if ('\t' == c || '\n' == c || '\r' == c) {
            err('Invalid code point in port: ' + c);
          } else {
            invalid.call(this);
          }
          break;

        case 'relative path start':
          if ('\\' == c) err("'\\' not allowed in path.");
          state = 'relative path';
          if ('/' != c && '\\' != c) {
            continue;
          }
          break;

        case 'relative path':
          if (EOF == c || '/' == c || '\\' == c || !stateOverride && ('?' == c || '#' == c)) {
            if ('\\' == c) {
              err('\\ not allowed in relative path.');
            }
            var tmp;
            if (tmp = relativePathDotMapping[buffer.toLowerCase()]) {
              buffer = tmp;
            }
            if ('..' == buffer) {
              this._path.pop();
              if ('/' != c && '\\' != c) {
                this._path.push('');
              }
            } else if ('.' == buffer && '/' != c && '\\' != c) {
              this._path.push('');
            } else if ('.' != buffer) {
              if ('file' == this._scheme && this._path.length == 0 && buffer.length == 2 && ALPHA.test(buffer[0]) && buffer[1] == '|') {
                buffer = buffer[0] + ':';
              }
              this._path.push(buffer);
            }
            buffer = '';
            if ('?' == c) {
              this._query = '?';
              state = 'query';
            } else if ('#' == c) {
              this._fragment = '#';
              state = 'fragment';
            }
          } else if ('\t' != c && '\n' != c && '\r' != c) {
            buffer += percentEscape(c);
          }
          break;

        case 'query':
          if (!stateOverride && '#' == c) {
            this._fragment = '#';
            state = 'fragment';
          } else if (EOF != c && '\t' != c && '\n' != c && '\r' != c) {
            this._query += percentEscapeQuery(c);
          }
          break;

        case 'fragment':
          if (EOF != c && '\t' != c && '\n' != c && '\r' != c) {
            this._fragment += c;
          }
          break;
      }

      cursor++;
    }
  }

  function clear() {
    this._scheme = '';
    this._schemeData = '';
    this._username = '';
    this._password = null;
    this._host = '';
    this._port = '';
    this._path = [];
    this._query = '';
    this._fragment = '';
    this._isInvalid = false;
    this._isRelative = false;
  }

  // Does not process domain names or IP addresses.
  // Does not handle encoding for the query parameter.
  function jURL(url, base /* , encoding */) {
    if (base !== undefined && !(base instanceof jURL)) base = new jURL(String(base));

    this._url = url;
    clear.call(this);

    var input = url.replace(/^[ \t\r\n\f]+|[ \t\r\n\f]+$/g, '');
    // encoding = encoding || 'utf-8'

    parse.call(this, input, null, base);
  }

  jURL.prototype = {
    toString: function toString() {
      return this.href;
    },
    get href() {
      if (this._isInvalid) return this._url;

      var authority = '';
      if ('' != this._username || null != this._password) {
        authority = this._username + (null != this._password ? ':' + this._password : '') + '@';
      }

      return this.protocol + (this._isRelative ? '//' + authority + this.host : '') + this.pathname + this._query + this._fragment;
    },
    set href(href) {
      clear.call(this);
      parse.call(this, href);
    },

    get protocol() {
      return this._scheme + ':';
    },
    set protocol(protocol) {
      if (this._isInvalid) return;
      parse.call(this, protocol + ':', 'scheme start');
    },

    get host() {
      return this._isInvalid ? '' : this._port ? this._host + ':' + this._port : this._host;
    },
    set host(host) {
      if (this._isInvalid || !this._isRelative) return;
      parse.call(this, host, 'host');
    },

    get hostname() {
      return this._host;
    },
    set hostname(hostname) {
      if (this._isInvalid || !this._isRelative) return;
      parse.call(this, hostname, 'hostname');
    },

    get port() {
      return this._port;
    },
    set port(port) {
      if (this._isInvalid || !this._isRelative) return;
      parse.call(this, port, 'port');
    },

    get pathname() {
      return this._isInvalid ? '' : this._isRelative ? '/' + this._path.join('/') : this._schemeData;
    },
    set pathname(pathname) {
      if (this._isInvalid || !this._isRelative) return;
      this._path = [];
      parse.call(this, pathname, 'relative path start');
    },

    get search() {
      return this._isInvalid || !this._query || '?' == this._query ? '' : this._query;
    },
    set search(search) {
      if (this._isInvalid || !this._isRelative) return;
      this._query = '?';
      if ('?' == search[0]) search = search.slice(1);
      parse.call(this, search, 'query');
    },

    get hash() {
      return this._isInvalid || !this._fragment || '#' == this._fragment ? '' : this._fragment;
    },
    set hash(hash) {
      if (this._isInvalid) return;
      this._fragment = '#';
      if ('#' == hash[0]) hash = hash.slice(1);
      parse.call(this, hash, 'fragment');
    },

    get origin() {
      var host;
      if (this._isInvalid || !this._scheme) {
        return '';
      }
      // javascript: Gecko returns String(""), WebKit/Blink String("null")
      // Gecko throws error for "data://"
      // data: Gecko returns "", Blink returns "data://", WebKit returns "null"
      // Gecko returns String("") for file: mailto:
      // WebKit/Blink returns String("SCHEME://") for file: mailto:
      switch (this._scheme) {
        case 'file':
          return 'file://'; // EPUBJS Added
        case 'data':
        case 'javascript':
        case 'mailto':
          return 'null';
      }
      host = this.host;
      if (!host) {
        return '';
      }
      return this._scheme + '://' + host;
    }
  };

  // Copy over the static methods
  var OriginalURL = scope.URL;
  if (OriginalURL) {
    jURL.createObjectURL = function (blob) {
      // IE extension allows a second optional options argument.
      // http://msdn.microsoft.com/en-us/library/ie/hh772302(v=vs.85).aspx
      return OriginalURL.createObjectURL.apply(OriginalURL, arguments);
    };
    jURL.revokeObjectURL = function (url) {
      OriginalURL.revokeObjectURL(url);
    };
  }

  return jURL;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7), __webpack_require__(53)(module)))

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventEmitter = __webpack_require__(2);

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

var _core = __webpack_require__(0);

var _epubcfi = __webpack_require__(1);

var _epubcfi2 = _interopRequireDefault(_epubcfi);

var _contents = __webpack_require__(13);

var _contents2 = _interopRequireDefault(_contents);

var _marksPane = __webpack_require__(55);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IframeView = function () {
	function IframeView(section, options) {
		_classCallCheck(this, IframeView);

		this.settings = (0, _core.extend)({
			ignoreClass: "",
			axis: "vertical",
			width: 0,
			height: 0,
			layout: undefined,
			globalLayoutProperties: {},
			method: undefined
		}, options || {});

		this.id = "epubjs-view-" + (0, _core.uuid)();
		this.section = section;
		this.index = section.index;

		this.element = this.container(this.settings.axis);

		this.added = false;
		this.displayed = false;
		this.rendered = false;

		// this.width  = this.settings.width;
		// this.height = this.settings.height;

		this.fixedWidth = 0;
		this.fixedHeight = 0;

		// Blank Cfi for Parsing
		this.epubcfi = new _epubcfi2.default();

		this.layout = this.settings.layout;
		// Dom events to listen for
		// this.listenedEvents = ["keydown", "keyup", "keypressed", "mouseup", "mousedown", "click", "touchend", "touchstart"];

		this.pane = undefined;
		this.highlights = {};
		this.underlines = {};
		this.marks = {};
	}

	_createClass(IframeView, [{
		key: "container",
		value: function container(axis) {
			var element = document.createElement("div");

			element.classList.add("epub-view");

			// this.element.style.minHeight = "100px";
			element.style.height = "0px";
			element.style.width = "0px";
			element.style.overflow = "hidden";
			element.style.position = "relative";

			if (axis && axis == "horizontal") {
				element.style.display = "block";
				element.style.flex = "none";
			} else {
				element.style.display = "block";
			}

			return element;
		}
	}, {
		key: "create",
		value: function create() {

			if (this.iframe) {
				return this.iframe;
			}

			if (!this.element) {
				this.element = this.createContainer();
			}

			this.iframe = document.createElement("iframe");
			this.iframe.id = this.id;
			this.iframe.scrolling = "no"; // Might need to be removed: breaks ios width calculations
			this.iframe.style.overflow = "hidden";
			this.iframe.seamless = "seamless";
			// Back up if seamless isn't supported
			this.iframe.style.border = "none";

			this.iframe.setAttribute("enable-annotation", "true");

			this.resizing = true;

			// this.iframe.style.display = "none";
			this.element.style.visibility = "hidden";
			this.iframe.style.visibility = "hidden";

			this.iframe.style.width = "0";
			this.iframe.style.height = "0";
			this._width = 0;
			this._height = 0;

			this.element.setAttribute("ref", this.index);

			this.element.appendChild(this.iframe);
			this.added = true;

			this.elementBounds = (0, _core.bounds)(this.element);

			// if(width || height){
			//   this.resize(width, height);
			// } else if(this.width && this.height){
			//   this.resize(this.width, this.height);
			// } else {
			//   this.iframeBounds = bounds(this.iframe);
			// }


			if ("srcdoc" in this.iframe) {
				this.supportsSrcdoc = true;
			} else {
				this.supportsSrcdoc = false;
			}

			if (!this.settings.method) {
				this.settings.method = this.supportsSrcdoc ? "srcdoc" : "write";
			}

			return this.iframe;
		}
	}, {
		key: "render",
		value: function render(request, show) {

			// view.onLayout = this.layout.format.bind(this.layout);
			this.create();

			// Fit to size of the container, apply padding
			this.size();

			if (!this.sectionRender) {
				this.sectionRender = this.section.render(request);
			}

			// Render Chain
			return this.sectionRender.then(function (contents) {
				return this.load(contents);
			}.bind(this)).then(function () {
				var _this = this;

				// apply the layout function to the contents
				this.settings.layout.format(this.contents);

				// Listen for events that require an expansion of the iframe
				this.addListeners();

				return new Promise(function (resolve, reject) {
					// Expand the iframe to the full size of the content
					_this.expand();
					resolve();
				});
			}.bind(this)).then(function () {
				this.emit("rendered", this.section);
			}.bind(this)).catch(function (e) {
				this.emit("loaderror", e);
			}.bind(this));
		}
	}, {
		key: "reset",
		value: function reset() {
			if (this.iframe) {
				this.iframe.style.width = "0";
				this.iframe.style.height = "0";
				this._width = 0;
				this._height = 0;
				this._textWidth = undefined;
				this._contentWidth = undefined;
				this._textHeight = undefined;
				this._contentHeight = undefined;
			}
			this._needsReframe = true;
		}

		// Determine locks base on settings

	}, {
		key: "size",
		value: function size(_width, _height) {
			var width = _width || this.settings.width;
			var height = _height || this.settings.height;

			if (this.layout.name === "pre-paginated") {
				this.lock("both", width, height);
			} else if (this.settings.axis === "horizontal") {
				this.lock("height", width, height);
			} else {
				this.lock("width", width, height);
			}
		}

		// Lock an axis to element dimensions, taking borders into account

	}, {
		key: "lock",
		value: function lock(what, width, height) {
			var elBorders = (0, _core.borders)(this.element);
			var iframeBorders;

			if (this.iframe) {
				iframeBorders = (0, _core.borders)(this.iframe);
			} else {
				iframeBorders = { width: 0, height: 0 };
			}

			if (what == "width" && (0, _core.isNumber)(width)) {
				this.lockedWidth = width - elBorders.width - iframeBorders.width;
				// this.resize(this.lockedWidth, width); //  width keeps ratio correct
			}

			if (what == "height" && (0, _core.isNumber)(height)) {
				this.lockedHeight = height - elBorders.height - iframeBorders.height;
				// this.resize(width, this.lockedHeight);
			}

			if (what === "both" && (0, _core.isNumber)(width) && (0, _core.isNumber)(height)) {

				this.lockedWidth = width - elBorders.width - iframeBorders.width;
				this.lockedHeight = height - elBorders.height - iframeBorders.height;
				// this.resize(this.lockedWidth, this.lockedHeight);
			}

			if (this.displayed && this.iframe) {

				// this.contents.layout();
				this.expand();
			}
		}

		// Resize a single axis based on content dimensions

	}, {
		key: "expand",
		value: function expand(force) {
			var width = this.lockedWidth;
			var height = this.lockedHeight;
			var columns;

			var textWidth, textHeight;

			if (!this.iframe || this._expanding) return;

			if (this.layout.name === "pre-paginated") return;

			this._expanding = true;

			// Expand Horizontally
			if (this.settings.axis === "horizontal") {
				// Get the width of the text
				width = this.contents.textWidth();

				if (width % this.layout.pageWidth > 0) {
					width = Math.ceil(width / this.layout.pageWidth) * this.layout.pageWidth;
				}

				/*
    columns = Math.ceil(width / this.settings.layout.delta);
    if ( this.settings.layout.divisor > 1 &&
    		 this.settings.layout.name === "reflowable" &&
    		(columns % 2 > 0)) {
    	// add a blank page
    	width += this.settings.layout.gap + this.settings.layout.columnWidth;
    }
    */
			} // Expand Vertically
			else if (this.settings.axis === "vertical") {
					height = this.contents.textHeight();
				}

			// Only Resize if dimensions have changed or
			// if Frame is still hidden, so needs reframing
			if (this._needsReframe || width != this._width || height != this._height) {
				this.reframe(width, height);
			}

			this._expanding = false;
		}
	}, {
		key: "reframe",
		value: function reframe(width, height) {
			var size;

			if ((0, _core.isNumber)(width)) {
				this.element.style.width = width + "px";
				this.iframe.style.width = width + "px";
				this._width = width;
			}

			if ((0, _core.isNumber)(height)) {
				this.element.style.height = height + "px";
				this.iframe.style.height = height + "px";
				this._height = height;
			}

			var widthDelta = this.prevBounds ? width - this.prevBounds.width : width;
			var heightDelta = this.prevBounds ? height - this.prevBounds.height : height;

			size = {
				width: width,
				height: height,
				widthDelta: widthDelta,
				heightDelta: heightDelta
			};

			this.pane && this.pane.render();

			this.onResize(this, size);

			this.emit("resized", size);

			this.prevBounds = size;
		}
	}, {
		key: "load",
		value: function load(contents) {
			var loading = new _core.defer();
			var loaded = loading.promise;

			if (!this.iframe) {
				loading.reject(new Error("No Iframe Available"));
				return loaded;
			}

			this.iframe.onload = function (event) {

				this.onLoad(event, loading);
			}.bind(this);

			if (this.settings.method === "blobUrl") {
				this.blobUrl = (0, _core.createBlobUrl)(contents, "application/xhtml+xml");
				this.iframe.src = this.blobUrl;
			} else if (this.settings.method === "srcdoc") {
				this.iframe.srcdoc = contents;
			} else {

				this.document = this.iframe.contentDocument;

				if (!this.document) {
					loading.reject(new Error("No Document Available"));
					return loaded;
				}

				this.iframe.contentDocument.open();
				this.iframe.contentDocument.write(contents);
				this.iframe.contentDocument.close();
			}

			return loaded;
		}
	}, {
		key: "onLoad",
		value: function onLoad(event, promise) {
			var _this2 = this;

			this.window = this.iframe.contentWindow;
			this.document = this.iframe.contentDocument;

			this.contents = new _contents2.default(this.document, this.document.body, this.section.cfiBase, this.section.index);

			this.rendering = false;

			var link = this.document.querySelector("link[rel='canonical']");
			if (link) {
				link.setAttribute("href", this.section.canonical);
			} else {
				link = this.document.createElement("link");
				link.setAttribute("rel", "canonical");
				link.setAttribute("href", this.section.canonical);
				this.document.querySelector("head").appendChild(link);
			}

			this.contents.on("expand", function () {
				if (_this2.displayed && _this2.iframe) {
					_this2.expand();
					if (_this2.contents) {
						_this2.settings.layout.format(_this2.contents);
					}
				}
			});

			this.contents.on("resize", function (e) {
				if (_this2.displayed && _this2.iframe) {
					_this2.expand();
					if (_this2.contents) {
						_this2.settings.layout.format(_this2.contents);
					}
				}
			});

			promise.resolve(this.contents);
		}
	}, {
		key: "setLayout",
		value: function setLayout(layout) {
			this.layout = layout;
		}
	}, {
		key: "setAxis",
		value: function setAxis(axis) {
			this.settings.axis = axis;
		}
	}, {
		key: "addListeners",
		value: function addListeners() {
			//TODO: Add content listeners for expanding
		}
	}, {
		key: "removeListeners",
		value: function removeListeners(layoutFunc) {
			//TODO: remove content listeners for expanding
		}
	}, {
		key: "display",
		value: function display(request) {
			var displayed = new _core.defer();

			if (!this.displayed) {

				this.render(request).then(function () {

					this.emit("displayed", this);
					this.onDisplayed(this);

					this.displayed = true;
					displayed.resolve(this);
				}.bind(this));
			} else {
				displayed.resolve(this);
			}

			return displayed.promise;
		}
	}, {
		key: "show",
		value: function show() {

			this.element.style.visibility = "visible";

			if (this.iframe) {
				this.iframe.style.visibility = "visible";
			}

			this.emit("shown", this);
		}
	}, {
		key: "hide",
		value: function hide() {
			// this.iframe.style.display = "none";
			this.element.style.visibility = "hidden";
			this.iframe.style.visibility = "hidden";

			this.stopExpanding = true;
			this.emit("hidden", this);
		}
	}, {
		key: "offset",
		value: function offset() {
			return {
				top: this.element.offsetTop,
				left: this.element.offsetLeft
			};
		}
	}, {
		key: "width",
		value: function width() {
			return this._width;
		}
	}, {
		key: "height",
		value: function height() {
			return this._height;
		}
	}, {
		key: "position",
		value: function position() {
			return this.element.getBoundingClientRect();
		}
	}, {
		key: "locationOf",
		value: function locationOf(target) {
			var parentPos = this.iframe.getBoundingClientRect();
			var targetPos = this.contents.locationOf(target, this.settings.ignoreClass);

			return {
				"left": targetPos.left,
				"top": targetPos.top
			};
		}
	}, {
		key: "onDisplayed",
		value: function onDisplayed(view) {
			// Stub, override with a custom functions
		}
	}, {
		key: "onResize",
		value: function onResize(view, e) {
			// Stub, override with a custom functions
		}
	}, {
		key: "bounds",
		value: function bounds() {
			if (!this.elementBounds) {
				this.elementBounds = (0, _core.bounds)(this.element);
			}
			return this.elementBounds;
		}
	}, {
		key: "highlight",
		value: function highlight(cfiRange) {
			var _this3 = this;

			var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			var cb = arguments[2];

			if (!this.contents) {
				return;
			}
			var range = this.contents.range(cfiRange);

			var emitter = function emitter() {
				_this3.emit("markClicked", cfiRange, data);
			};

			data["epubcfi"] = cfiRange;

			if (!this.pane) {
				this.pane = new _marksPane.Pane(this.iframe, this.element);
			}

			var m = new _marksPane.Highlight(range, "epubjs-hl", data, { 'fill': 'yellow', 'fill-opacity': '0.3', 'mix-blend-mode': 'multiply' });
			var h = this.pane.addMark(m);

			this.highlights[cfiRange] = { "mark": h, "element": h.element, "listeners": [emitter, cb] };

			h.element.setAttribute("ref", "epubjs-hl");
			h.element.addEventListener("click", emitter);
			h.element.addEventListener("touchstart", emitter);

			if (cb) {
				h.element.addEventListener("click", cb);
				h.element.addEventListener("touchstart", cb);
			}
			return h;
		}
	}, {
		key: "underline",
		value: function underline(cfiRange) {
			var _this4 = this;

			var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			var cb = arguments[2];

			if (!this.contents) {
				return;
			}
			var range = this.contents.range(cfiRange);
			var emitter = function emitter() {
				_this4.emit("markClicked", cfiRange, data);
			};

			data["epubcfi"] = cfiRange;

			if (!this.pane) {
				this.pane = new _marksPane.Pane(this.iframe, this.element);
			}

			var m = new _marksPane.Underline(range, "epubjs-ul", data, { 'stroke': 'black', 'stroke-opacity': '0.3', 'mix-blend-mode': 'multiply' });
			var h = this.pane.addMark(m);

			this.underlines[cfiRange] = { "mark": h, "element": h.element, "listeners": [emitter, cb] };

			h.element.setAttribute("ref", "epubjs-ul");
			h.element.addEventListener("click", emitter);
			h.element.addEventListener("touchstart", emitter);

			if (cb) {
				h.element.addEventListener("click", cb);
				h.element.addEventListener("touchstart", cb);
			}
			return h;
		}
	}, {
		key: "mark",
		value: function mark(cfiRange) {
			var _this5 = this;

			var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			var cb = arguments[2];


			if (!this.contents) {
				return;
			}

			if (cfiRange in this.marks) {
				var item = this.marks[cfiRange];
				return item;
			}

			var range = this.contents.range(cfiRange);
			if (!range) {
				return;
			}
			var container = range.commonAncestorContainer;
			var parent = container.nodeType === 1 ? container : container.parentNode;

			var emitter = function emitter(e) {
				_this5.emit("markClicked", cfiRange, data);
			};

			if (range.collapsed && container.nodeType === 1) {
				range = new Range();
				range.selectNodeContents(container);
			} else if (range.collapsed) {
				// Webkit doesn't like collapsed ranges
				range = new Range();
				range.selectNodeContents(parent);
			}

			var top = void 0,
			    right = void 0,
			    left = void 0;

			if (this.layout.name === "pre-paginated" || this.settings.axis !== "horizontal") {
				var pos = range.getBoundingClientRect();
				top = pos.top;
				right = pos.right;
			} else {
				// Element might break columns, so find the left most element
				var rects = range.getClientRects();
				var rect = void 0;
				for (var i = 0; i != rects.length; i++) {
					rect = rects[i];
					if (!left || rect.left < left) {
						left = rect.left;
						right = left + this.layout.columnWidth - this.layout.gap;
						top = rect.top;
					}
				}
			}

			var mark = this.document.createElement('a');
			mark.setAttribute("ref", "epubjs-mk");
			mark.style.position = "absolute";
			mark.style.top = top + "px";
			mark.style.left = right + "px";

			mark.dataset["epubcfi"] = cfiRange;

			if (data) {
				Object.keys(data).forEach(function (key) {
					mark.dataset[key] = data[key];
				});
			}

			if (cb) {
				mark.addEventListener("click", cb);
				mark.addEventListener("touchstart", cb);
			}

			mark.addEventListener("click", emitter);
			mark.addEventListener("touchstart", emitter);

			this.element.appendChild(mark);

			this.marks[cfiRange] = { "element": mark, "listeners": [emitter, cb] };

			return parent;
		}
	}, {
		key: "unhighlight",
		value: function unhighlight(cfiRange) {
			var item = void 0;
			if (cfiRange in this.highlights) {
				item = this.highlights[cfiRange];

				this.pane.removeMark(item.mark);
				item.listeners.forEach(function (l) {
					if (l) {
						item.element.removeEventListener("click", l);
					};
				});
				delete this.highlights[cfiRange];
			}
		}
	}, {
		key: "ununderline",
		value: function ununderline(cfiRange) {
			var item = void 0;
			if (cfiRange in this.underlines) {
				item = this.underlines[cfiRange];
				this.pane.removeMark(item.mark);
				item.listeners.forEach(function (l) {
					if (l) {
						item.element.removeEventListener("click", l);
					};
				});
				delete this.underlines[cfiRange];
			}
		}
	}, {
		key: "unmark",
		value: function unmark(cfiRange) {
			var item = void 0;
			if (cfiRange in this.marks) {
				item = this.marks[cfiRange];
				this.element.removeChild(item.element);
				item.listeners.forEach(function (l) {
					if (l) {
						item.element.removeEventListener("click", l);
					};
				});
				delete this.marks[cfiRange];
			}
		}
	}, {
		key: "destroy",
		value: function destroy() {

			for (var cfiRange in this.highlights) {
				this.unhighlight(cfiRange);
			}

			for (var _cfiRange in this.underlines) {
				this.ununderline(_cfiRange);
			}

			for (var _cfiRange2 in this.marks) {
				this.unmark(_cfiRange2);
			}

			if (this.blobUrl) {
				(0, _core.revokeBlobUrl)(this.blobUrl);
			}

			if (this.displayed) {
				this.displayed = false;

				this.removeListeners();

				this.stopExpanding = true;
				this.element.removeChild(this.iframe);
				this.displayed = false;
				this.iframe = null;

				this._textWidth = null;
				this._textHeight = null;
				this._width = null;
				this._height = null;
			}
			// this.element.style.height = "0px";
			// this.element.style.width = "0px";
		}
	}]);

	return IframeView;
}();

(0, _eventEmitter2.default)(IframeView.prototype);

exports.default = IframeView;
module.exports = exports["default"];

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Underline = exports.Highlight = exports.Mark = exports.Pane = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _svg = __webpack_require__(56);

var _svg2 = _interopRequireDefault(_svg);

var _events = __webpack_require__(57);

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pane = exports.Pane = function () {
    function Pane(target) {
        var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;

        _classCallCheck(this, Pane);

        this.target = target;
        this.element = _svg2.default.createElement('svg');
        this.marks = [];

        // Match the coordinates of the target element
        this.element.style.position = 'absolute';
        // Disable pointer events
        this.element.setAttribute('pointer-events', 'none');

        // Set up mouse event proxying between the target element and the marks
        _events2.default.proxyMouse(this.target, this.marks);

        this.container = container;
        this.container.appendChild(this.element);

        this.render();
    }

    _createClass(Pane, [{
        key: 'addMark',
        value: function addMark(mark) {
            var g = _svg2.default.createElement('g');
            this.element.appendChild(g);
            mark.bind(g, this.container);

            this.marks.push(mark);

            mark.render();
            return mark;
        }
    }, {
        key: 'removeMark',
        value: function removeMark(mark) {
            var idx = this.marks.indexOf(mark);
            if (idx === -1) {
                return;
            }
            var el = mark.unbind();
            this.element.removeChild(el);
            this.marks.splice(idx, 1);
        }
    }, {
        key: 'render',
        value: function render() {
            setCoords(this.element, coords(this.target, this.container));
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.marks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var m = _step.value;

                    m.render();
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }]);

    return Pane;
}();

var Mark = exports.Mark = function () {
    function Mark() {
        _classCallCheck(this, Mark);

        this.element = null;
    }

    _createClass(Mark, [{
        key: 'bind',
        value: function bind(element, container) {
            this.element = element;
            this.container = container;
        }
    }, {
        key: 'unbind',
        value: function unbind() {
            var el = this.element;
            this.element = null;
            return el;
        }
    }, {
        key: 'render',
        value: function render() {}
    }, {
        key: 'dispatchEvent',
        value: function dispatchEvent(e) {
            if (!this.element) return;
            this.element.dispatchEvent(e);
        }
    }, {
        key: 'getBoundingClientRect',
        value: function getBoundingClientRect() {
            return this.element.getBoundingClientRect();
        }
    }, {
        key: 'getClientRects',
        value: function getClientRects() {
            var rects = [];
            var el = this.element.firstChild;
            while (el) {
                rects.push(el.getBoundingClientRect());
                el = el.nextSibling;
            }
            return rects;
        }
    }, {
        key: 'filteredRanges',
        value: function filteredRanges() {
            var rects = Array.from(this.range.getClientRects());

            // De-duplicate the boxes
            return rects.filter(function (box) {
                for (var i = 0; i < rects.length; i++) {
                    if (rects[i] === box) {
                        return true;
                    }
                    var contained = contains(rects[i], box);
                    if (contained) {
                        return false;
                    }
                }
                return true;
            });
        }
    }]);

    return Mark;
}();

var Highlight = exports.Highlight = function (_Mark) {
    _inherits(Highlight, _Mark);

    function Highlight(range, className, data, attributes) {
        _classCallCheck(this, Highlight);

        var _this = _possibleConstructorReturn(this, (Highlight.__proto__ || Object.getPrototypeOf(Highlight)).call(this));

        _this.range = range;
        _this.className = className;
        _this.data = data || {};
        _this.attributes = attributes || {};
        return _this;
    }

    _createClass(Highlight, [{
        key: 'bind',
        value: function bind(element, container) {
            _get(Highlight.prototype.__proto__ || Object.getPrototypeOf(Highlight.prototype), 'bind', this).call(this, element, container);

            for (var attr in this.data) {
                if (this.data.hasOwnProperty(attr)) {
                    this.element.dataset[attr] = this.data[attr];
                }
            }

            for (var attr in this.attributes) {
                if (this.attributes.hasOwnProperty(attr)) {
                    this.element.setAttribute(attr, this.attributes[attr]);
                }
            }

            if (this.className) {
                this.element.classList.add(this.className);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            // Empty element
            while (this.element.firstChild) {
                this.element.removeChild(this.element.firstChild);
            }

            var docFrag = this.element.ownerDocument.createDocumentFragment();
            var filtered = this.filteredRanges();
            var offset = this.element.getBoundingClientRect();
            var container = this.container.getBoundingClientRect();

            for (var i = 0, len = filtered.length; i < len; i++) {
                var r = filtered[i];
                var el = _svg2.default.createElement('rect');
                el.setAttribute('x', r.left - offset.left + container.left);
                el.setAttribute('y', r.top - offset.top + container.top);
                el.setAttribute('height', r.height);
                el.setAttribute('width', r.width);
                docFrag.appendChild(el);
            }

            this.element.appendChild(docFrag);
        }
    }]);

    return Highlight;
}(Mark);

var Underline = exports.Underline = function (_Highlight) {
    _inherits(Underline, _Highlight);

    function Underline(range, className, data, attributes) {
        _classCallCheck(this, Underline);

        return _possibleConstructorReturn(this, (Underline.__proto__ || Object.getPrototypeOf(Underline)).call(this, range, className, data, attributes));
    }

    _createClass(Underline, [{
        key: 'render',
        value: function render() {
            // Empty element
            while (this.element.firstChild) {
                this.element.removeChild(this.element.firstChild);
            }

            var docFrag = this.element.ownerDocument.createDocumentFragment();
            var filtered = this.filteredRanges();
            var offset = this.element.getBoundingClientRect();
            var container = this.container.getBoundingClientRect();

            for (var i = 0, len = filtered.length; i < len; i++) {
                var r = filtered[i];

                var rect = _svg2.default.createElement('rect');
                rect.setAttribute('x', r.left - offset.left);
                rect.setAttribute('y', r.top - offset.top);
                rect.setAttribute('height', r.height);
                rect.setAttribute('width', r.width);
                rect.setAttribute('fill', 'none');

                var line = _svg2.default.createElement('line');
                line.setAttribute('x1', r.left - offset.left + container.left);
                line.setAttribute('x2', r.left - offset.left + container.left + r.width);
                line.setAttribute('y1', r.top - offset.top + container.top + r.height - 1);
                line.setAttribute('y2', r.top - offset.top + container.top + r.height - 1);

                line.setAttribute('stroke-width', 1);
                line.setAttribute('stroke', 'black'); //TODO: match text color?
                line.setAttribute('stroke-linecap', 'square');

                docFrag.appendChild(rect);

                docFrag.appendChild(line);
            }

            this.element.appendChild(docFrag);
        }
    }]);

    return Underline;
}(Highlight);

function coords(el, container) {
    var offset = container.getBoundingClientRect();
    var rect = el.getBoundingClientRect();

    return {
        top: rect.top - offset.top,
        left: rect.left - offset.left,
        height: el.scrollHeight,
        width: el.scrollWidth
    };
}

function setCoords(el, coords) {
    el.style.top = coords.top + 'px';
    el.style.left = coords.left + 'px';
    el.style.height = coords.height + 'px';
    el.style.width = coords.width + 'px';
}

function contains(rect1, rect2) {
    return rect2.right <= rect1.right && rect2.left >= rect1.left && rect2.top >= rect1.top && rect2.bottom <= rect1.bottom;
}

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createElement = createElement;
function createElement(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}

exports.default = {
    createElement: createElement
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.proxyMouse = proxyMouse;
exports.clone = clone;
// import 'babelify/polyfill'; // needed for Object.assign

exports.default = {
    proxyMouse: proxyMouse
};

/**
 * Start proxying all mouse events that occur on the target node to each node in
 * a set of tracked nodes.
 *
 * The items in tracked do not strictly have to be DOM Nodes, but they do have
 * to have dispatchEvent, getBoundingClientRect, and getClientRects methods.
 *
 * @param target {Node} The node on which to listen for mouse events.
 * @param tracked {Node[]} A (possibly mutable) array of nodes to which to proxy
 *                         events.
 */

function proxyMouse(target, tracked) {
    function dispatch(e) {
        // We walk through the set of tracked elements in reverse order so that
        // events are sent to those most recently added first.
        //
        // This is the least surprising behaviour as it simulates the way the
        // browser would work if items added later were drawn "on top of"
        // earlier ones.
        for (var i = tracked.length - 1; i >= 0; i--) {
            var t = tracked[i];
            var x = e.clientX;
            var y = e.clientY;

            if (e.touches && e.touches.length) {
                x = e.touches[0].clientX;
                y = e.touches[0].clientY;
            }

            if (!contains(t, target, x, y)) {
                continue;
            }

            // The event targets this mark, so dispatch a cloned event:
            t.dispatchEvent(clone(e));
            // We only dispatch the cloned event to the first matching mark.
            break;
        }
    }

    if (target.nodeName === "iframe" || target.nodeName === "IFRAME") {

        try {
            // Try to get the contents if same domain
            this.target = target.contentDocument;
        } catch (err) {
            this.target = target;
        }
    } else {
        this.target = target;
    }

    var _arr = ['mouseup', 'mousedown', 'click', 'touchstart'];
    for (var _i = 0; _i < _arr.length; _i++) {
        var ev = _arr[_i];
        this.target.addEventListener(ev, function (e) {
            return dispatch(e);
        }, false);
    }
}

/**
 * Clone a mouse event object.
 *
 * @param e {MouseEvent} A mouse event object to clone.
 * @returns {MouseEvent}
 */
function clone(e) {
    var opts = Object.assign({}, e, { bubbles: false });
    try {
        return new MouseEvent(e.type, opts);
    } catch (err) {
        // compat: webkit
        var copy = document.createEvent('MouseEvents');
        copy.initMouseEvent(e.type, false, opts.cancelable, opts.view, opts.detail, opts.screenX, opts.screenY, opts.clientX, opts.clientY, opts.ctrlKey, opts.altKey, opts.shiftKey, opts.metaKey, opts.button, opts.relatedTarget);
        return copy;
    }
}

/**
 * Check if the item contains the point denoted by the passed coordinates
 * @param item {Object} An object with getBoundingClientRect and getClientRects
 *                      methods.
 * @param x {Number}
 * @param y {Number}
 * @returns {Boolean}
 */
function contains(item, target, x, y) {
    // offset
    var offset = target.getBoundingClientRect();

    function rectContains(r, x, y) {
        var top = r.top - offset.top;
        var left = r.left - offset.left;
        var bottom = top + r.height;
        var right = left + r.width;
        return top <= y && left <= x && bottom > y && right > x;
    }

    // Check overall bounding box first
    var rect = item.getBoundingClientRect();
    if (!rectContains(rect, x, y)) {
        return false;
    }

    // Then continue to check each child rect
    var rects = item.getClientRects();
    for (var i = 0, len = rects.length; i < len; i++) {
        if (rectContains(rects[i], x, y)) {
            return true;
        }
    }
    return false;
}

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _core = __webpack_require__(0);

var _throttle = __webpack_require__(59);

var _throttle2 = _interopRequireDefault(_throttle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stage = function () {
	function Stage(_options) {
		_classCallCheck(this, Stage);

		this.settings = _options || {};
		this.id = "epubjs-container-" + (0, _core.uuid)();

		this.container = this.create(this.settings);

		if (this.settings.hidden) {
			this.wrapper = this.wrap(this.container);
		}
	}

	/*
 * Creates an element to render to.
 * Resizes to passed width and height or to the elements size
 */


	_createClass(Stage, [{
		key: "create",
		value: function create(options) {
			var height = options.height; // !== false ? options.height : "100%";
			var width = options.width; // !== false ? options.width : "100%";
			var overflow = options.overflow || false;
			var axis = options.axis || "vertical";

			if (options.height && (0, _core.isNumber)(options.height)) {
				height = options.height + "px";
			}

			if (options.width && (0, _core.isNumber)(options.width)) {
				width = options.width + "px";
			}

			// Create new container element
			var container = document.createElement("div");

			container.id = this.id;
			container.classList.add("epub-container");

			// Style Element
			// container.style.fontSize = "0";
			container.style.wordSpacing = "0";
			container.style.lineHeight = "0";
			container.style.verticalAlign = "top";
			container.style.position = "relative";

			if (axis === "horizontal") {
				// container.style.whiteSpace = "nowrap";
				container.style.display = "flex";
				container.style.flexDirection = "row";
				container.style.flexWrap = "nowrap";
			}

			if (width) {
				container.style.width = width;
			}

			if (height) {
				container.style.height = height;
			}

			if (overflow) {
				container.style.overflow = overflow;
			}

			return container;
		}
	}, {
		key: "wrap",
		value: function wrap(container) {
			var wrapper = document.createElement("div");

			wrapper.style.visibility = "hidden";
			wrapper.style.overflow = "hidden";
			wrapper.style.width = "0";
			wrapper.style.height = "0";

			wrapper.appendChild(container);
			return wrapper;
		}
	}, {
		key: "getElement",
		value: function getElement(_element) {
			var element;

			if ((0, _core.isElement)(_element)) {
				element = _element;
			} else if (typeof _element === "string") {
				element = document.getElementById(_element);
			}

			if (!element) {
				throw new Error("Not an Element");
			}

			return element;
		}
	}, {
		key: "attachTo",
		value: function attachTo(what) {

			var element = this.getElement(what);
			var base;

			if (!element) {
				return;
			}

			if (this.settings.hidden) {
				base = this.wrapper;
			} else {
				base = this.container;
			}

			element.appendChild(base);

			this.element = element;

			return element;
		}
	}, {
		key: "getContainer",
		value: function getContainer() {
			return this.container;
		}
	}, {
		key: "onResize",
		value: function onResize(func) {
			// Only listen to window for resize event if width and height are not fixed.
			// This applies if it is set to a percent or auto.
			if (!(0, _core.isNumber)(this.settings.width) || !(0, _core.isNumber)(this.settings.height)) {
				this.resizeFunc = (0, _throttle2.default)(func, 50);
				window.addEventListener("resize", this.resizeFunc, false);
			}
		}
	}, {
		key: "onOrientationChange",
		value: function onOrientationChange(func) {
			this.orientationChangeFunc = func;
			window.addEventListener("orientationchange", this.orientationChangeFunc, false);
		}
	}, {
		key: "size",
		value: function size(width, height) {
			var bounds;
			// var width = _width || this.settings.width;
			// var height = _height || this.settings.height;

			// If width or height are set to false, inherit them from containing element
			if (width === null) {
				bounds = this.element.getBoundingClientRect();

				if (bounds.width) {
					width = bounds.width;
					this.container.style.width = bounds.width + "px";
				}
			}

			if (height === null) {
				bounds = bounds || this.element.getBoundingClientRect();

				if (bounds.height) {
					height = bounds.height;
					this.container.style.height = bounds.height + "px";
				}
			}

			if (!(0, _core.isNumber)(width)) {
				bounds = this.container.getBoundingClientRect();
				width = bounds.width;
				//height = bounds.height;
			}

			if (!(0, _core.isNumber)(height)) {
				bounds = bounds || this.container.getBoundingClientRect();
				//width = bounds.width;
				height = bounds.height;
			}

			this.containerStyles = window.getComputedStyle(this.container);

			this.containerPadding = {
				left: parseFloat(this.containerStyles["padding-left"]) || 0,
				right: parseFloat(this.containerStyles["padding-right"]) || 0,
				top: parseFloat(this.containerStyles["padding-top"]) || 0,
				bottom: parseFloat(this.containerStyles["padding-bottom"]) || 0
			};

			// Bounds not set, get them from window
			var _windowBounds = (0, _core.windowBounds)();
			if (!width) {
				width = _windowBounds.width;
			}
			if (this.settings.fullsize || !height) {
				height = _windowBounds.height;
			}

			return {
				width: width - this.containerPadding.left - this.containerPadding.right,
				height: height - this.containerPadding.top - this.containerPadding.bottom
			};
		}
	}, {
		key: "bounds",
		value: function bounds() {
			var box = void 0;
			if (this.container.style.overflow !== "visible") {
				box = this.container && this.container.getBoundingClientRect();
			}

			if (!box || !box.width || !box.height) {
				return (0, _core.windowBounds)();
			} else {
				return box;
			}
		}
	}, {
		key: "getSheet",
		value: function getSheet() {
			var style = document.createElement("style");

			// WebKit hack --> https://davidwalsh.name/add-rules-stylesheets
			style.appendChild(document.createTextNode(""));

			document.head.appendChild(style);

			return style.sheet;
		}
	}, {
		key: "addStyleRules",
		value: function addStyleRules(selector, rulesArray) {
			var scope = "#" + this.id + " ";
			var rules = "";

			if (!this.sheet) {
				this.sheet = this.getSheet();
			}

			rulesArray.forEach(function (set) {
				for (var prop in set) {
					if (set.hasOwnProperty(prop)) {
						rules += prop + ":" + set[prop] + ";";
					}
				}
			});

			this.sheet.insertRule(scope + selector + " {" + rules + "}", 0);
		}
	}, {
		key: "axis",
		value: function axis(_axis) {
			if (_axis === "horizontal") {
				this.container.style.display = "flex";
				this.container.style.flexDirection = "row";
				this.container.style.flexWrap = "nowrap";
			} else {
				this.container.style.display = "block";
			}
		}

		// orientation(orientation) {
		// 	if (orientation === "landscape") {
		//
		// 	} else {
		//
		// 	}
		//
		// 	this.orientation = orientation;
		// }

	}, {
		key: "destroy",
		value: function destroy() {
			var base;

			if (this.element) {

				if (this.settings.hidden) {
					base = this.wrapper;
				} else {
					base = this.container;
				}

				if (this.element.contains(this.container)) {
					this.element.removeChild(this.container);
				}

				window.removeEventListener("resize", this.resizeFunc);
				window.removeEventListener("orientationChange", this.orientationChangeFunc);
			}
		}
	}]);

	return Stage;
}();

exports.default = Stage;
module.exports = exports["default"];

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var debounce = __webpack_require__(19),
    isObject = __webpack_require__(14);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

module.exports = throttle;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(20);

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(14),
    isSymbol = __webpack_require__(63);

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(64),
    isObjectLike = __webpack_require__(67);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(21),
    getRawTag = __webpack_require__(65),
    objectToString = __webpack_require__(66);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(21);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),
/* 66 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 67 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Views = function () {
	function Views(container) {
		_classCallCheck(this, Views);

		this.container = container;
		this._views = [];
		this.length = 0;
		this.hidden = false;
	}

	_createClass(Views, [{
		key: "all",
		value: function all() {
			return this._views;
		}
	}, {
		key: "first",
		value: function first() {
			return this._views[0];
		}
	}, {
		key: "last",
		value: function last() {
			return this._views[this._views.length - 1];
		}
	}, {
		key: "indexOf",
		value: function indexOf(view) {
			return this._views.indexOf(view);
		}
	}, {
		key: "slice",
		value: function slice() {
			return this._views.slice.apply(this._views, arguments);
		}
	}, {
		key: "get",
		value: function get(i) {
			return this._views[i];
		}
	}, {
		key: "append",
		value: function append(view) {
			this._views.push(view);
			if (this.container) {
				this.container.appendChild(view.element);
			}
			this.length++;
			return view;
		}
	}, {
		key: "prepend",
		value: function prepend(view) {
			this._views.unshift(view);
			if (this.container) {
				this.container.insertBefore(view.element, this.container.firstChild);
			}
			this.length++;
			return view;
		}
	}, {
		key: "insert",
		value: function insert(view, index) {
			this._views.splice(index, 0, view);

			if (this.container) {
				if (index < this.container.children.length) {
					this.container.insertBefore(view.element, this.container.children[index]);
				} else {
					this.container.appendChild(view.element);
				}
			}

			this.length++;
			return view;
		}
	}, {
		key: "remove",
		value: function remove(view) {
			var index = this._views.indexOf(view);

			if (index > -1) {
				this._views.splice(index, 1);
			}

			this.destroy(view);

			this.length--;
		}
	}, {
		key: "destroy",
		value: function destroy(view) {
			if (view.displayed) {
				view.destroy();
			}

			if (this.container) {
				this.container.removeChild(view.element);
			}
			view = null;
		}

		// Iterators

	}, {
		key: "forEach",
		value: function forEach() {
			return this._views.forEach.apply(this._views, arguments);
		}
	}, {
		key: "clear",
		value: function clear() {
			// Remove all views
			var view;
			var len = this.length;

			if (!this.length) return;

			for (var i = 0; i < len; i++) {
				view = this._views[i];
				this.destroy(view);
			}

			this._views = [];
			this.length = 0;
		}
	}, {
		key: "find",
		value: function find(section) {

			var view;
			var len = this.length;

			for (var i = 0; i < len; i++) {
				view = this._views[i];
				if (view.displayed && view.section.index == section.index) {
					return view;
				}
			}
		}
	}, {
		key: "displayed",
		value: function displayed() {
			var displayed = [];
			var view;
			var len = this.length;

			for (var i = 0; i < len; i++) {
				view = this._views[i];
				if (view.displayed) {
					displayed.push(view);
				}
			}
			return displayed;
		}
	}, {
		key: "show",
		value: function show() {
			var view;
			var len = this.length;

			for (var i = 0; i < len; i++) {
				view = this._views[i];
				if (view.displayed) {
					view.show();
				}
			}
			this.hidden = false;
		}
	}, {
		key: "hide",
		value: function hide() {
			var view;
			var len = this.length;

			for (var i = 0; i < len; i++) {
				view = this._views[i];
				if (view.displayed) {
					view.hide();
				}
			}
			this.hidden = true;
		}
	}]);

	return Views;
}();

exports.default = Views;
module.exports = exports["default"];

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _core = __webpack_require__(0);

var _default = __webpack_require__(18);

var _default2 = _interopRequireDefault(_default);

var _debounce = __webpack_require__(19);

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContinuousViewManager = function (_DefaultViewManager) {
	_inherits(ContinuousViewManager, _DefaultViewManager);

	function ContinuousViewManager(options) {
		_classCallCheck(this, ContinuousViewManager);

		var _this = _possibleConstructorReturn(this, (ContinuousViewManager.__proto__ || Object.getPrototypeOf(ContinuousViewManager)).call(this, options));

		_this.name = "continuous";

		_this.settings = (0, _core.extend)(_this.settings || {}, {
			infinite: true,
			overflow: undefined,
			axis: "vertical",
			offset: 500,
			offsetDelta: 250,
			width: undefined,
			height: undefined
		});

		(0, _core.extend)(_this.settings, options.settings || {});

		// Gap can be 0, but defaults doesn't handle that
		if (options.settings.gap != "undefined" && options.settings.gap === 0) {
			_this.settings.gap = options.settings.gap;
		}

		_this.viewSettings = {
			ignoreClass: _this.settings.ignoreClass,
			axis: _this.settings.axis,
			layout: _this.layout,
			width: 0,
			height: 0
		};

		_this.scrollTop = 0;
		_this.scrollLeft = 0;
		return _this;
	}

	_createClass(ContinuousViewManager, [{
		key: "display",
		value: function display(section, target) {
			return _default2.default.prototype.display.call(this, section, target).then(function () {
				return this.fill();
			}.bind(this));
		}
	}, {
		key: "fill",
		value: function fill(_full) {
			var _this2 = this;

			var full = _full || new _core.defer();

			this.q.enqueue(function () {
				return _this2.check();
			}).then(function (result) {
				if (result) {
					_this2.fill(full);
				} else {
					full.resolve();
				}
			});

			return full.promise;
		}
	}, {
		key: "moveTo",
		value: function moveTo(offset) {
			// var bounds = this.stage.bounds();
			// var dist = Math.floor(offset.top / bounds.height) * bounds.height;
			var distX = 0,
			    distY = 0;

			var offsetX = 0,
			    offsetY = 0;

			if (this.settings.axis === "vertical") {
				distY = offset.top;
				offsetY = offset.top + this.settings.offset;
			} else {
				distX = Math.floor(offset.left / this.layout.delta) * this.layout.delta;
				offsetX = distX + this.settings.offset;
			}

			if (distX > 0 || distY > 0) {
				this.scrollBy(distX, distY, true);
			}
		}

		/*
  afterDisplayed(currView){
  	var next = currView.section.next();
  	var prev = currView.section.prev();
  	var index = this.views.indexOf(currView);
  	var prevView, nextView;
  		if(index + 1 === this.views.length && next) {
  		nextView = this.createView(next);
  		this.q.enqueue(this.append.bind(this), nextView);
  	}
  		if(index === 0 && prev) {
  		prevView = this.createView(prev, this.viewSettings);
  		this.q.enqueue(this.prepend.bind(this), prevView);
  	}
  		// this.removeShownListeners(currView);
  	// currView.onShown = this.afterDisplayed.bind(this);
  	this.emit("added", currView.section);
  	}
  */

		// onResized(e) {
		//
		// 	// this.views.clear();
		//
		// 	clearTimeout(this.resizeTimeout);
		// 	this.resizeTimeout = setTimeout(function(){
		// 		this.resize();
		// 	}.bind(this), 150);
		// }

	}, {
		key: "afterResized",
		value: function afterResized(view) {
			this.emit("resize", view.section);
		}

		// Remove Previous Listeners if present

	}, {
		key: "removeShownListeners",
		value: function removeShownListeners(view) {

			// view.off("shown", this.afterDisplayed);
			// view.off("shown", this.afterDisplayedAbove);
			view.onDisplayed = function () {};
		}

		// append(section){
		// 	return this.q.enqueue(function() {
		//
		// 		this._append(section);
		//
		//
		// 	}.bind(this));
		// };
		//
		// prepend(section){
		// 	return this.q.enqueue(function() {
		//
		// 		this._prepend(section);
		//
		// 	}.bind(this));
		//
		// };

	}, {
		key: "add",
		value: function add(section) {
			var view = this.createView(section);

			this.views.append(view);

			view.on("resized", function (bounds) {
				view.expanded = true;
			});

			// view.on("shown", this.afterDisplayed.bind(this));
			view.onDisplayed = this.afterDisplayed.bind(this);
			view.onResize = this.afterResized.bind(this);

			return view.display(this.request);
		}
	}, {
		key: "append",
		value: function append(section) {
			var view = this.createView(section);

			view.on("resized", function (bounds) {
				view.expanded = true;
			});

			this.views.append(view);

			view.onDisplayed = this.afterDisplayed.bind(this);

			return view;
		}
	}, {
		key: "prepend",
		value: function prepend(section) {
			var _this3 = this;

			var view = this.createView(section);

			view.on("resized", function (bounds) {
				_this3.counter(bounds);
				view.expanded = true;
			});

			this.views.prepend(view);

			view.onDisplayed = this.afterDisplayed.bind(this);

			return view;
		}
	}, {
		key: "counter",
		value: function counter(bounds) {
			if (this.settings.axis === "vertical") {
				this.scrollBy(0, bounds.heightDelta, true);
			} else {
				this.scrollBy(bounds.widthDelta, 0, true);
			}
		}
	}, {
		key: "update",
		value: function update(_offset) {
			var container = this.bounds();
			var views = this.views.all();
			var viewsLength = views.length;
			var visible = [];
			var offset = typeof _offset != "undefined" ? _offset : this.settings.offset || 0;
			var isVisible;
			var view;

			var updating = new _core.defer();
			var promises = [];
			for (var i = 0; i < viewsLength; i++) {
				view = views[i];

				isVisible = this.isVisible(view, offset, offset, container);

				if (isVisible === true) {
					// console.log("visible " + view.index);

					if (!view.displayed) {
						promises.push(view.display(this.request).then(function (view) {
							view.show();
						}));
					} else {
						view.show();
					}
					visible.push(view);
				} else {
					// this.q.enqueue(view.destroy.bind(view));
					// console.log("hidden " + view.index);

					clearTimeout(this.trimTimeout);
					this.trimTimeout = setTimeout(function () {
						this.q.enqueue(this.trim.bind(this));
					}.bind(this), 250);
				}
			}

			if (promises.length) {
				return Promise.all(promises);
			} else {
				updating.resolve();
				return updating.promise;
			}
		}
	}, {
		key: "check",
		value: function check(_offsetLeft, _offsetTop) {
			var _this4 = this;

			var last, first, next, prev;

			var checking = new _core.defer();
			var newViews = [];

			var horizontal = this.settings.axis === "horizontal";
			var delta = this.settings.offset || 0;

			if (_offsetLeft && horizontal) {
				delta = _offsetLeft;
			}

			if (_offsetTop && !horizontal) {
				delta = _offsetTop;
			}

			var bounds = this._bounds; // bounds saved this until resize

			var offset = horizontal ? this.scrollLeft : this.scrollTop;
			var visibleLength = horizontal ? bounds.width : bounds.height;
			var contentLength = horizontal ? this.container.scrollWidth : this.container.scrollHeight;

			if (offset + visibleLength + delta >= contentLength) {
				last = this.views.last();
				next = last && last.section.next();

				if (next) {
					newViews.push(this.append(next));
				}
			}

			if (offset - delta < 0) {
				first = this.views.first();

				prev = first && first.section.prev();
				if (prev) {
					newViews.push(this.prepend(prev));
				}
			}

			var promises = newViews.map(function (view) {
				return view.displayed;
			});

			if (newViews.length) {
				return Promise.all(promises).then(function () {
					// Check to see if anything new is on screen after rendering
					return _this4.update(delta);
				});
			} else {
				this.q.enqueue(function () {
					this.update();
				}.bind(this));
				checking.resolve(false);
				return checking.promise;
			}
		}
	}, {
		key: "trim",
		value: function trim() {
			var task = new _core.defer();
			var displayed = this.views.displayed();
			var first = displayed[0];
			var last = displayed[displayed.length - 1];
			var firstIndex = this.views.indexOf(first);
			var lastIndex = this.views.indexOf(last);
			var above = this.views.slice(0, firstIndex);
			var below = this.views.slice(lastIndex + 1);

			// Erase all but last above
			for (var i = 0; i < above.length - 1; i++) {
				this.erase(above[i], above);
			}

			// Erase all except first below
			for (var j = 1; j < below.length; j++) {
				this.erase(below[j]);
			}

			task.resolve();
			return task.promise;
		}
	}, {
		key: "erase",
		value: function erase(view, above) {
			//Trim

			var prevTop;
			var prevLeft;

			if (this.settings.height) {
				prevTop = this.container.scrollTop;
				prevLeft = this.container.scrollLeft;
			} else {
				prevTop = window.scrollY;
				prevLeft = window.scrollX;
			}

			var bounds = view.bounds();

			view.destroy.bind(view);
			this.views.remove(view);

			if (above) {

				if (this.settings.axis === "vertical") {
					this.scrollTo(0, prevTop - bounds.height, true);
				} else {
					this.scrollTo(prevLeft - bounds.width, 0, true);
				}
			}
		}
	}, {
		key: "addEventListeners",
		value: function addEventListeners(stage) {

			window.addEventListener("unload", function (e) {
				this.ignore = true;
				// this.scrollTo(0,0);
				this.destroy();
			}.bind(this));

			this.addScrollListeners();
		}
	}, {
		key: "addScrollListeners",
		value: function addScrollListeners() {
			var scroller;

			this.tick = _core.requestAnimationFrame;

			if (this.settings.height) {
				this.prevScrollTop = this.container.scrollTop;
				this.prevScrollLeft = this.container.scrollLeft;
			} else {
				this.prevScrollTop = window.scrollY;
				this.prevScrollLeft = window.scrollX;
			}

			this.scrollDeltaVert = 0;
			this.scrollDeltaHorz = 0;

			if (this.settings.height) {
				scroller = this.container;
				this.scrollTop = this.container.scrollTop;
				this.scrollLeft = this.container.scrollLeft;
			} else {
				scroller = window;
				this.scrollTop = window.scrollY;
				this.scrollLeft = window.scrollX;
			}

			scroller.addEventListener("scroll", this.onScroll.bind(this));
			this._scrolled = (0, _debounce2.default)(this.scrolled.bind(this), 60);
			// this.tick.call(window, this.onScroll.bind(this));

			this.didScroll = false;
		}
	}, {
		key: "removeEventListeners",
		value: function removeEventListeners() {
			var scroller;

			if (this.settings.height) {
				scroller = this.container;
			} else {
				scroller = window;
			}

			scroller.removeEventListener("scroll", this.onScroll.bind(this));
		}
	}, {
		key: "onScroll",
		value: function onScroll() {
			var scrollTop = void 0;
			var scrollLeft = void 0;

			if (this.settings.height) {
				scrollTop = this.container.scrollTop;
				scrollLeft = this.container.scrollLeft;
			} else {
				scrollTop = window.scrollY;
				scrollLeft = window.scrollX;
			}

			this.scrollTop = scrollTop;
			this.scrollLeft = scrollLeft;

			if (!this.ignore) {

				this._scrolled();
			} else {
				this.ignore = false;
			}

			this.scrollDeltaVert += Math.abs(scrollTop - this.prevScrollTop);
			this.scrollDeltaHorz += Math.abs(scrollLeft - this.prevScrollLeft);

			this.prevScrollTop = scrollTop;
			this.prevScrollLeft = scrollLeft;

			clearTimeout(this.scrollTimeout);
			this.scrollTimeout = setTimeout(function () {
				this.scrollDeltaVert = 0;
				this.scrollDeltaHorz = 0;
			}.bind(this), 150);

			this.didScroll = false;
		}
	}, {
		key: "scrolled",
		value: function scrolled() {
			this.q.enqueue(function () {
				this.check();
			}.bind(this));

			this.emit("scroll", {
				top: this.scrollTop,
				left: this.scrollLeft
			});

			clearTimeout(this.afterScrolled);
			this.afterScrolled = setTimeout(function () {
				this.emit("scrolled", {
					top: this.scrollTop,
					left: this.scrollLeft
				});
			}.bind(this));
		}
	}, {
		key: "next",
		value: function next() {

			if (this.settings.axis === "horizontal") {

				this.scrollLeft = this.container.scrollLeft;

				if (this.container.scrollLeft + this.container.offsetWidth + this.layout.delta < this.container.scrollWidth) {
					this.scrollBy(this.layout.delta, 0, true);
				} else {
					this.scrollTo(this.container.scrollWidth - this.layout.delta, 0, true);
				}
			} else {
				this.scrollBy(0, this.layout.height, true);
			}

			this.q.enqueue(function () {
				this.check();
			}.bind(this));
		}
	}, {
		key: "prev",
		value: function prev() {
			if (this.settings.axis === "horizontal") {
				this.scrollBy(-this.layout.delta, 0, true);
			} else {
				this.scrollBy(0, -this.layout.height, true);
			}

			this.q.enqueue(function () {
				this.check();
			}.bind(this));
		}
	}, {
		key: "updateFlow",
		value: function updateFlow(flow) {
			var axis = flow === "paginated" ? "horizontal" : "vertical";

			this.settings.axis = axis;

			this.stage && this.stage.axis(axis);

			this.viewSettings.axis = axis;

			if (!this.settings.overflow) {
				this.overflow = flow === "paginated" ? "hidden" : "auto";
			} else {
				this.overflow = this.settings.overflow;
			}

			// this.views.forEach(function(view){
			// 	view.setAxis(axis);
			// });

			if (this.settings.axis === "vertical") {
				this.settings.infinite = true;
			} else {
				this.settings.infinite = false;
			}

			this.updateLayout();
		}
	}]);

	return ContinuousViewManager;
}(_default2.default);

exports.default = ContinuousViewManager;
module.exports = exports["default"];

/***/ })
/******/ ]);
});
//# sourceMappingURL=epub.js.map