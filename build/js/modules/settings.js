'use strict';

const settings = {
    projects: 0,
    projectSteps: 0,
    mongoURL: 'mongodb+srv://koncrete99:rEmDQKS7XD8q0ymk@koncrete99.zuv0mny.mongodb.net/test?retryWrites=true&w=majority',
    mongoDB: 'flexbox',
    get randomColor() {
        return `hsl(${~~(Math.random()*360)}, 70%, 30%)`
    },
}

export default settings;



