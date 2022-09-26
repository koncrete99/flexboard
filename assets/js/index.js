'use strict';

import settings from './modules/settings.js';
import mapping from './modules/mapping.js';
import dom from './modules/dom.js';

const createTask = () => {
    console.log('dgdf');
    dom.create({
        content:
            '<input type="text" value="Neue Aufgabe">',
        classes:['task'],
        parent: mapping.column,
    })
}





const appendEventlisteners = () => {
    console.log(mapping.newTask);
    mapping.newTask.addEventListener("click", createTask);
}

const init = () => {
    appendEventlisteners();
}

// INIT
document.addEventListener('DOMContentLoaded', init);