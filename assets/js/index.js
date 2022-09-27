"use strict";

import settings from "./modules/settings.js";
import elements from "./modules/elements.js";
import dom from "./modules/dom.js";

const createProject = () => {
	settings.projects++;
	let projectName = `Projekt ${settings.projects}`;
	dom.create({
		content: `
            <li>
                <a href="">${projectName}</a>
            </li>
            `,
		parent: elements.projectMenu
	});
};

const saveProject = () => {};

const createColumn = evt => {
	settings.projectSteps++;

	dom.create({
		content: `
            <div class="columnHeader">
                <button class="columnDelete"></button>
                <h2><input type="text" value="Schritt ${settings.projectSteps}" class="columnTitle" style="background-color: ${settings.randomColor}"></h2>
            </div>    
            <h3 class="addTask">+</h3> 
            <div class="tasks"></div>
            `,
		classes: ["column"],
		attr: { draggable: true },
		parent: elements.kanban
	});

	elements.tasks = dom.$$(".tasks");

	let columnDelete = dom.$$(".columnDelete");
	columnDelete.forEach(el => {
		el.addEventListener("click", evt => {
			evt.currentTarget.parentNode.parentNode.remove();
		});
	});

	let addTask = dom.$$(".addTask");
	addTask.forEach(el => {
		el.addEventListener("click", createTask);
	});

	dragTask();
};

const createTask = evt => {
	dom.create({
		content: `
            <button class="taskClose">x</button>
            <input type="text" value="Neue Aufgabe" class="taskTitle">
            <textarea class="taskDescription">Beschreibung</textarea>
            <p>
            <span>07.10.2022</span>
            <button class="taskDelete"></button>
            <button class="taskDone"></button>
            <button class="taskOpen"></button>
            <button class="taskSave"></button>
            </p>
            `,
		classes: ["task"],
		attr: { draggable: true },
		parent: evt.currentTarget.nextElementSibling,
		onBottom: false
	});

	elements.task = dom.$$(".task");

	let taskDelete = dom.$$(".taskDelete");
	taskDelete.forEach(el => {
		el.addEventListener("click", evt => {
			evt.currentTarget.parentNode.parentNode.remove();
		});
	});

	let taskDone = dom.$$(".taskDone");
	taskDone.forEach(el => {
		el.addEventListener("click", evt => {
			evt.currentTarget.parentNode.parentNode.classList.toggle("done");
		});
	});

	let taskOpen = dom.$$(".taskOpen");
	taskOpen.forEach(el => {
		el.addEventListener("click", evt => {
            evt.preventDefault();
            elements.modal.classList.add('show');
			evt.currentTarget.parentNode.parentNode.classList.add("open");
		});
	});

	let taskClose = dom.$$(".taskClose");
	taskClose.forEach(el => {
		el.addEventListener("click", evt => {
            evt.preventDefault();
            elements.modal.classList.remove('show');
			evt.currentTarget.parentNode.classList.remove("open");
		});
    });

	let taskSave = dom.$$(".taskSave");
	taskSave.forEach(el => {
		el.addEventListener("click", saveTask);
	});

	dragTask();
};

const dragTask = () => {
	elements.task.forEach(task => {
		task.addEventListener("dragstart", () => {
			task.classList.add("drag");
		});
		task.addEventListener("dragend", () => {
			task.classList.remove("drag");
		});
	});

	elements.tasks.forEach(tasks => {
		tasks.addEventListener("dragover", el => {
			el.preventDefault();
			let afterElement = getDragAfterElement(tasks, el.clientY);
			let draggable = dom.$(".drag");
			if (afterElement == null) {
				tasks.appendChild(draggable);
			} else {
				tasks.insertBefore(draggable, afterElement);
			}
		});
	});

	const getDragAfterElement = (tasks, y) => {

		let dragTasks = [...tasks.querySelectorAll(".task:not(.drag)")];

		return dragTasks.reduce(
			(closest, child) => {
				let box = child.getBoundingClientRect();
				let offset = y - box.top - box.height / 2;
				if (offset < 0 && offset > closest.offset) {
					return { offset: offset, element: child };
				} else {
					return closest;
				}
			},
			{ offset: Number.NEGATIVE_INFINITY }
		).element;
	};
};

const saveTask = () => {};

const appendEventlisteners = () => {
	elements.addProject.addEventListener("click", createProject);
	elements.addColumn.addEventListener("click", createColumn);
};

const init = () => {
	appendEventlisteners();
};

// INIT
document.addEventListener("DOMContentLoaded", init);
