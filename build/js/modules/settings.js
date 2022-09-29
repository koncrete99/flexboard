'use strict';

const settings = {
    projects: 0,
    projectSteps: 0,
    get randomColor() {
        return `hsl(${~~(Math.random()*360)}, 70%, 30%)`
    },
}

export default settings;



