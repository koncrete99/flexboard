'use strict';

import dom from './dom.js';

const mapping = {
    kanban: dom.$('#kanban'),
    column: dom.$$('.column'),
    newTask: dom.$$('.newTask'),
};

export default mapping;