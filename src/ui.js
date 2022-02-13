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
class UICheckbox extends UIElement {

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
class UIColor extends UIElement {

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
class UINumber extends UIElement {

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
class UIBreak extends UIElement {

    constructor() {

        super(document.createElement('br'));

        this.dom.className = 'Break';
    }
}

/**
 * UIHorizontalRule
 */
class UIHorizontalRule extends UIElement {

    constructor() {

        super(document.createElement('hr'));

        this.dom.className = 'HorizontalRule';
    }
}

/**
 * UIButton
 * @param {any} value
 */
class UIButton extends UIElement {

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

class UIProgress extends UIElement {

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
class UIListbox extends UIElement {

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

export {
    UIElement,
    UISpan,
    UIDiv,
    UIRow,
    UIPanel,
    UILabel,
    UIText,
    UILink,
    UIInput,
    UITextArea,
    UISelect,
    UICheckbox,
    UIColor,
    UINumber,
    UIInteger,
    UIBreak,
    UIHorizontalRule,
    UIButton,
    UIProgress,
    UITabbedPanel,
    UITab,
    UIListbox,
    UITreeView,
    UITreeViewItem
};
