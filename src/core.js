let TEXT_NODE     = 3;
let ELEMENT_NODE  = 1;
let COMMENT_NODE  = 8;
let DOCUMENT_NODE = 9;

export class Core {

    constructor() {

        this.isArray = Array.isArray || function (obj) {

            return Object.prototype.toString.call(obj) === '[object Array]';
        }
    }
    
    /**
     * Get a element for an id
     * @param {*} elementId 
     * @returns HTMLElement
     */
    getEl(elementId) {

        return document.getElementById(elementId);
    }

    /**
     * Get all elements for a class
     * @param {*} classNames 
     * @returns HTMLCollectionOf<Element>
     */
    getEls(classNames) {

        return document.getElementsByClassName(classNames);
    }

    request(url, type, withCredentials) {

        const supportsURL = window.URL;
        const BLOB_RESPONSE = supportsURL ? "blob" : "arraybuffer";
        const deferred = new RSVP.defer();
        const xhr = new XMLHttpRequest();
        let uri;

        //-- Check from PDF.js:
        //   https://github.com/mozilla/pdf.js/blob/master/web/compatibility.js
        const xhrPrototype = XMLHttpRequest.prototype;

        const handler = function () {
            let r;

            if (this.readyState !== this.DONE)
                return;

            // Android & Firefox reporting 0 for local & blob urls
            if ((this.status === 200 || this.status === 0) && this.response) {

                if (type === 'xml') {
                    // If this.responseXML wasn't set, try to parse using a DOMParser from text
                    if (!this.responseXML) {
                        r = new DOMParser().parseFromString(this.response, "application/xml");
                    } else {
                        r = this.responseXML;
                    }
                } else if (type === 'xhtml') {
                    if (!this.responseXML) {
                        r = new DOMParser().parseFromString(this.response, "application/xhtml+xml");
                    } else {
                        r = this.responseXML;
                    }
                } else if (type === 'html') {
                    if (!this.responseXML) {
                        r = new DOMParser().parseFromString(this.response, "text/html");
                    } else {
                        r = this.responseXML;
                    }
                } else if (type === 'json') {
                    r = JSON.parse(this.response);
                } else if (type === 'blob') {
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
                    message: this.response,
                    stack: new Error().stack
                });
            }
        };

        if (!('overrideMimeType' in xhrPrototype)) {
            // IE10 might have response, but not overrideMimeType
            Object.defineProperty(xhrPrototype, 'overrideMimeType', {
                value: function xmlHttpRequestOverrideMimeType(mimeType) { }
            });
        }

        xhr.onreadystatechange = handler;
        xhr.open("GET", url, true);

        if (withCredentials) {
            xhr.withCredentials = true;
        }

        // If type isn't set, determine it from the file extension
        if (!type) {

            uri = this.uri(url);
            type = uri.extension;
            type = {
                'htm': 'html'
            }[type] || type;
        }

        if (type === 'blob') {
            xhr.responseType = BLOB_RESPONSE;
        }

        if (type === "json") {
            xhr.setRequestHeader("Accept", "application/json");
        }

        if (type === 'xml') {
            xhr.responseType = "document";
            xhr.overrideMimeType('text/xml'); // for OPF parsing
        }

        if (type === 'xhtml') {
            xhr.responseType = "document";
        }

        if (type === 'html') {
            xhr.responseType = "document";
        }

        if (type === "binary") {
            xhr.responseType = "arraybuffer";
        }

        xhr.send();
        return deferred.promise;
    }

    toArray(obj) {

        const arr = [];

        for (let member in obj) {
            let newitm;
            if (Object.prototype.hasOwnProperty.call(obj, member)) {
                newitm = obj[member];
                newitm.ident = member;
                arr.push(newitm);
            }
        }

        return arr;
    }

    /**
     * Parse the different parts of a url, returning an object.
     * @param {*} url 
     * @returns uri
     */
    uri(url) {

        const uri = {
            protocol: '',
            host: '',
            path: '',
            origin: '',
            directory: '',
            base: '',
            filename: '',
            extension: '',
            fragment: '',
            href: url
        };

        const blob = url.indexOf('blob:');
        const doubleSlash = url.indexOf('://');
        const search = url.indexOf('?');
        const fragment = url.indexOf("#");
        let withoutProtocol, dot, firstSlash;

        if (blob === 0) {
            uri.protocol = "blob";
            uri.base = url.indexOf(0, fragment);
            return uri;
        }

        if (fragment !== -1) {
            uri.fragment = url.slice(fragment + 1);
            url = url.slice(0, fragment);
        }

        if (search !== -1) {
            uri.search = url.slice(search + 1);
            url = url.slice(0, search);
            href = uri.href;
        }

        if (doubleSlash !== -1) {
            uri.protocol = url.slice(0, doubleSlash);
            withoutProtocol = url.slice(doubleSlash + 3);
            firstSlash = withoutProtocol.indexOf('/');

            if (firstSlash === -1) {
                uri.host = uri.path;
                uri.path = "";
            } else {
                uri.host = withoutProtocol.slice(0, firstSlash);
                uri.path = withoutProtocol.slice(firstSlash);
            }

            uri.origin = uri.protocol + "://" + uri.host;

            uri.directory = this.folder(uri.path);

            uri.base = uri.origin + uri.directory;
            // return origin;
        } else {
            uri.path = url;
            uri.directory = this.folder(url);
            uri.base = uri.directory;
        }

        //-- Filename
        uri.filename = url.replace(uri.base, '');
        dot = uri.filename.lastIndexOf('.');
        if (dot !== -1) {
            uri.extension = uri.filename.slice(dot + 1);
        }
        return uri;
    }

    /**
     * Parse out the folder, will return everything before the last slash.
     * @param {*} url 
     * @returns folder
     */
    folder(url) {

        let folder;
        const lastSlash = url.lastIndexOf('/');

        if (lastSlash === -1)
            folder = '';

        folder = url.slice(0, lastSlash + 1);

        return folder;
    }

    /**
     * https://github.com/ebidel/filer.js/blob/master/src/filer.js#L128
     * @param {*} dataURL 
     * @returns blob
     */
    dataURLToBlob(dataURL) {

        const BASE64_MARKER = ';base64,';
        let parts, contentType, raw;

        if (dataURL.indexOf(BASE64_MARKER) === -1) {
            parts = dataURL.split(',');
            contentType = parts[0].split(':')[1];
            raw = parts[1];

            return new Blob([raw], { type: contentType });
        }

        parts = dataURL.split(BASE64_MARKER);
        contentType = parts[0].split(':')[1];
        raw = window.atob(parts[1]);

        const rawLength = raw.length;
        const uInt8Array = new Uint8Array(rawLength);

        for (let i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }

        return new Blob([uInt8Array], { type: contentType });
    }

    /**
     * Load scripts async:
     * http://stackoverflow.com/questions/7718935/load-scripts-asynchronously
     * @param {*} src 
     * @param {*} callback 
     * @param {*} target 
     */
    addScript(src, callback, target) {

        let s, r;
        r = false;
        s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = false;
        s.src = src;
        s.onload = s.onreadystatechange = function () {
            if (!r && (!this.readyState || this.readyState === 'complete')) {
                r = true;
                if (callback) callback();
            }
        };
        target = target || document.body;
        target.appendChild(s);
    }

    addCss(src, callback, target) {

        let s, r;
        r = false;
        s = document.createElement('link');
        s.type = 'text/css';
        s.rel = "stylesheet";
        s.href = src;
        s.onload = s.onreadystatechange = function () {
            if (!r && (!this.readyState || this.readyState === 'complete')) {
                r = true;
                if (callback) callback();
            }
        };
        target = target || document.body;
        target.appendChild(s);
    }

    prefixed(unprefixed) {

        let vendors = ["Webkit", "Moz", "O", "ms"];
        let prefixes = ['-Webkit-', '-moz-', '-o-', '-ms-'];
        let upper = unprefixed[0].toUpperCase() + unprefixed.slice(1);
        let length = vendors.length;

        if (typeof (document.documentElement.style[unprefixed]) !== 'undefined') {
            return unprefixed;
        }

        for (var i = 0; i < length; i++) {
            if (typeof (document.documentElement.style[vendors[i] + upper]) !== 'undefined') {
                return vendors[i] + upper;
            }
        }

        return unprefixed;
    }

    resolveUrl(base, path) {

        let url;
        let segments = [];
        let uri = this.uri(path);
        let folders = base.split("/");
        let paths;

        if (uri.host) {
            return path;
        }

        folders.pop();

        paths = path.split("/");
        paths.forEach(function (p) {
            if (p === "..") {
                folders.pop();
            } else {
                segments.push(p);
            }
        });

        url = folders.concat(segments);

        return url.join("/");
    }

    /**
     * http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
     * @returns 
     */
    uuid() {

        const d = new Date().getTime();
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16);
        });
        return uuid;
    }

    /**
     * Fast quicksort insert for sorted array -- based on:
     * http://stackoverflow.com/questions/1344500/efficient-way-to-insert-a-number-into-a-sorted-array-of-numbers
     * @param {*} item 
     * @param {*} array 
     * @param {*} compareFunction 
     * @returns location
     */
    insert(item, array, compareFunction) {

        const location = this.locationOf(item, array, compareFunction);
        array.splice(location, 0, item);

        return location;
    }

    locationOf(item, array, compareFunction, _start, _end) {

        let start = _start || 0;
        let end = _end || array.length;
        let pivot = parseInt(start + (end - start) / 2);
        let compared;
        if (!compareFunction) {
            compareFunction = function (a, b) {
                if (a > b) return 1;
                if (a < b) return -1;
                if (a === b) return 0;
            };
        }
        if (end - start <= 0) {
            return pivot;
        }

        compared = compareFunction(array[pivot], item);

        if (end - start === 1) {
            return compared > 0 ? pivot : pivot + 1;
        }
        if (compared === 0) {
            return pivot;
        }
        if (compared === -1) {
            return this.locationOf(item, array, compareFunction, pivot, end);
        } else {
            return this.locationOf(item, array, compareFunction, start, pivot);
        }
    }

    indexOfSorted(item, array, compareFunction, _start, _end) {

        let start = _start || 0;
        let end = _end || array.length;
        let pivot = parseInt(start + (end - start) / 2);
        let compared;
        if (!compareFunction) {
            compareFunction = function (a, b) {
                if (a > b) return 1;
                if (a < b) return -1;
                if (a === b) return 0;
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
            return this.indexOfSorted(item, array, compareFunction, pivot, end);
        } else {
            return this.indexOfSorted(item, array, compareFunction, start, pivot);
        }
    }

    queue(_scope) {

        const _q = [];
        const scope = _scope;
        // Add an item to the queue
        const enqueue = function (funcName, args, context) {
            _q.push({
                "funcName": funcName,
                "args": args,
                "context": context
            });
            return _q;
        };
        // Run one item
        const dequeue = function () {
            let inwait;
            if (_q.length) {
                inwait = _q.shift();
                // Defer to any current tasks
                // setTimeout(function(){
                scope[inwait.funcName].apply(inwait.context || scope, inwait.args);
                // }, 0);
            }
        };
        // Run All
        const flush = function () {
            while (_q.length) {
                dequeue();
            }
        };
        // Clear all items in wait
        const clear = function () {
            _q = [];
        };

        const length = function () {
            return _q.length;
        };

        return {
            "enqueue": enqueue,
            "dequeue": dequeue,
            "flush": flush,
            "clear": clear,
            "length": length
        };
    }

    /**
     * Gets an XPath for an element which describes its hierarchical location.
     * @param {*} element 
     * @returns path
     */
    getElementXPath(element) {

        if (element && element.id) {
            return '//*[@id="' + element.id + '"]';
        } else {
            return this.getElementTreeXPath(element);
        }
    }

    getElementTreeXPath(element) {

        const paths = [];
        const _elem = element.ownerDocument.documentElement;
        const isXhtml = (_elem.getAttribute('xmlns') === "http://www.w3.org/1999/xhtml");
        let index, nodeName, tagName, pathIndex;

        if (element.nodeType === Node.TEXT_NODE) {
            // index = Array.prototype.indexOf.call(element.parentNode.childNodes, element) + 1;
            index = this.indexOfTextNode(element) + 1;

            paths.push("text()[" + index + "]");
            element = element.parentNode;
        }

        // Use nodeName (instead of localName) so namespace prefix is included (if any).
        for (; element && element.nodeType === 1; element = element.parentNode) {
            index = 0;
            for (let sibling = element.previousSibling; sibling; sibling = sibling.previousSibling) {
                // Ignore document type declaration.
                if (sibling.nodeType === Node.DOCUMENT_TYPE_NODE) {
                    continue;
                }
                if (sibling.nodeName === element.nodeName) {
                    ++index;
                }
            }
            nodeName = element.nodeName.toLowerCase();
            tagName = (isXhtml ? "xhtml:" + nodeName : nodeName);
            pathIndex = (index ? "[" + (index + 1) + "]" : "");
            paths.splice(0, 0, tagName + pathIndex);
        }

        return paths.length ? "./" + paths.join("/") : null;
    }

    nsResolver(prefix) {

        const ns = {
            'xhtml': 'http://www.w3.org/1999/xhtml',
            'epub': 'http://www.idpf.org/2007/ops'
        };
        return ns[prefix] || null;
    }

    /**
     * https://stackoverflow.com/questions/13482352/xquery-looking-for-text-with-single-quote/13483496#13483496
     * @param {*} str 
     * @returns path
     */
    cleanStringForXpath(str) {

        let parts = str.match(/[^'"]+|['"]/g);
        parts = parts.map(function (part) {
            if (part === "'") {
                return '"\'"'; // output "'"
            }

            if (part === '"') {
                return "'\"'"; // output '"'
            }
            return "'" + part + "'";
        });
        return "concat(''," + parts.join(",") + ")";
    }

    indexOfTextNode(textNode) {

        const parent = textNode.parentNode;
        const children = parent.childNodes;
        let sib;
        let index = -1;
        for (let i = 0; i < children.length; i++) {
            sib = children[i];
            if (sib.nodeType === Node.TEXT_NODE) {
                index++;
            }
            if (sib === textNode)
                break;
        }

        return index;
    }

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

    /**
     * Underscore
     * @param {*} target 
     * @returns 
     */
    extend(target) {

        const sources = [].slice.call(arguments, 1);
        sources.forEach(function (source) {
            if (!source) return;
            Object.getOwnPropertyNames(source).forEach(function (propName) {
                Object.defineProperty(target, propName,
                    Object.getOwnPropertyDescriptor(source, propName));
            });
        });
        return target;
    }

    clone(obj) {

        return this.isArray(obj) ? obj.slice() : this.extend({}, obj);
    }

    isElement(obj) {

        return !!(obj && obj.nodeType === 1);
    }

    isNumber(n) {

        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    isString(str) {

        return (typeof str === 'string' || str instanceof String);
    }

    /**
     * Lodash
     * @param {*} object 
     * @returns values array
     */
    values(object) {

        if (!object) return [];

        const props = Object.keys(object);
        const length = props.length;
        const result = Array(length);

        let index = -1;
        while (++index < length) {
            result[index] = object[props[index]];
        }
        return result;
    }

    indexOfNode(node, typeId) {

        const parent = node.parentNode;
        const children = parent.childNodes;
        let sib;
        let index = -1;
        for (let i = 0; i < children.length; i++) {
            sib = children[i];
            if (sib.nodeType === typeId) {
                index++;
            }
            if (sib === node)
                break;
        }

        return index;
    }

    indexOfTextNode(textNode) {

        return this.indexOfNode(textNode, TEXT_NODE);
    }

    indexOfElementNode(elementNode) {

        return this.indexOfNode(elementNode, ELEMENT_NODE);
    }
}
