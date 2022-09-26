'use strict';

const dom = {
    create({
        content = '',
        type = 'div',
        parent = false,
        classes = [],
        attr = {},
        listeners = {},
        styles = {},
        onTop = true,
    } = {}) {
        let newElement = document.createElement(type);
        if (content) newElement.innerHTML = content;
        if (classes.length) newElement.className = classes.join(' ');
    
        Object.entries(attr).forEach(el => newElement.setAttribute(...el));
        Object.entries(listeners).forEach(el => newElement.addEventListener(...el));
        Object.entries(styles).forEach(style => newElement.style[style[0]] = style[1]);
    
        if (parent) {
            if (!onTop && parent.children.length) parent.append(newElement);
            else parent.prepend(newElement);
        }
    
        return newElement;
    },
    $(selector) {
        return document.querySelector(selector);
    },
    $$(selector) {
        return [...document.querySelectorAll(selector)];
    },
}

export default dom;