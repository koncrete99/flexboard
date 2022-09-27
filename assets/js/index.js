'use strict';


import settings from './modules/settings.js';
import elements from './modules/elements.js';
import dom from './modules/dom.js';






const createProject = () => {

    settings.projects++

    let projectName = `Projekt ${settings.projects}`

    dom.create({
        content:
            `
            <li>
                <a href="">${projectName}</a>
            </li>
            `,
        parent: elements.projectMenu,
    })

}

const saveProject = () => {

 

}



const createColumn = evt => {

    settings.projectColumns++

    dom.create({
        content:
            `
            <div class="columnHeader">
                <button class="columnDelete"></button>
                <input type="text" value="Schritt ${settings.projectColumns}" class="columnTitle">
            </div>    
            <h3 class="addTask">+</h3> 
            <div class="tasks"></div>
            `,
        classes:['column'],
        attr: {draggable: true},
        parent: elements.kanban,
    })

    let columnDelete = dom.$$('.columnDelete');
    columnDelete.forEach( el => {
        el.addEventListener("click", evt => {
            evt.currentTarget.parentNode.parentNode.remove();
        });   
    });

    let addTask = dom.$$('.addTask');
    addTask.forEach( el => {
        el.addEventListener("click", createTask) 
    });
}

const createTask = evt => {
    dom.create({
        content:
            `
            <button class="taskClose">x</button>
            <input type="text" value="Neue Aufgabe" class="taskTitle">
            <textarea class="taskDescription">Beschreibung</textarea>
            <p>
            07.10.2022
            <button class="taskDelete"></button>
            <button class="taskDone"></button>
            <button class="taskOpen"></button>
            <button class="taskSave"></button>
            </p>
            `,
        classes:['task'],
        attr: {draggable: true},
        parent: evt.currentTarget.nextElementSibling,
        onBottom: false,
    })


    let taskDelete = dom.$$('.taskDelete');
    taskDelete.forEach( el => {
        el.addEventListener("click", evt => {
            evt.currentTarget.parentNode.parentNode.remove();
        });   
    });

    let taskDone = dom.$$('.taskDone');
    taskDone.forEach( el => {
        el.addEventListener("click", evt => {
            evt.currentTarget.parentNode.parentNode.classList.toggle('done');
        });   
    });

    let taskOpen = dom.$$('.taskOpen');
    taskOpen.forEach( el => {
        el.addEventListener("click", evt => {
            evt.preventDefault();
            evt.currentTarget.parentNode.parentNode.classList.add('open');
            });
    }); 

    let taskClose = dom.$$('.taskClose');
    taskClose.forEach( el => {
        el.addEventListener("click", evt => {
            evt.preventDefault();
            evt.currentTarget.parentNode.classList.remove('open');
            });
    }); 

    let taskSave = dom.$$('.taskSave');
    taskSave.forEach( el => {
        el.addEventListener("click", saveTask) 
    });

    
    
}

const saveTask = () => {

 

}




const appendEventlisteners = () => {
    elements.addProject.addEventListener("click", createProject);
    elements.addColumn.addEventListener("click", createColumn);
    
}

const init = () => {
    appendEventlisteners();
}

// INIT
document.addEventListener('DOMContentLoaded', init);