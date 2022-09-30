'use strict';

import dom from './dom.js';

const elements = {
    main: dom.$('main'),
    addProject: dom.$('#addProject'),
    projectMenu: dom.$('#projectMenu'),
    projectTitle: dom.$('#projectTitle'),
    kanban: dom.$('#kanban'),
    column: dom.$$('.column'),
    columnTitle: dom.$$('.columnTitle'),
    addColumn: dom.$('#addColumn'),
    tasks: dom.$$('.tasks'),
    task: dom.$$('.task'),
    taskDate: dom.$$('.taskDate'),
    modal: dom.$('#modal'),
    saveData: dom.$('#saveData'),
};

export default elements;