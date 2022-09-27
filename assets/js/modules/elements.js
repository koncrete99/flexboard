'use strict';

import dom from './dom.js';

const elements = {
    main: dom.$('main'),
    modal: dom.$('#modal'),
    addProject: dom.$('#addProject'),
    projectMenu: dom.$('#projectMenu'),
    kanban: dom.$('#kanban'),
    column: dom.$$('.column'),
    addColumn: dom.$('#addColumn'),
    tasks: dom.$$('.tasks'),
};

export default elements;