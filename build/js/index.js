"use strict";

import settings from "./modules/settings.js";
import elements from "./modules/elements.js";
import dom from "./modules/dom.js";

const renderProject = request => {
	
	elements.projectTitle.value = request.title;

	console.log(request);

	request.column.forEach(el => {
		dom.create({
			content: `
				<div class="columnHeader">
					<button class="columnDelete"></button>
					<h2><input type="text" value="${el.title}" class="columnTitle" style="background-color: ${settings.randomColor}"></h2>
				</div>    
				<h3 class="addTask">+</h3> 
				<div class="tasks"></div>
				`,
			classes: ["column", el.cID],
			parent: elements.kanban
		});
	});

	elements.column = dom.$$(".column");
	elements.columnTitle = dom.$$(".columnTitle");

	request.task.forEach(el => {
		dom.create({
			content: `
				<button class="taskClose">x</button>
				<input type="text" value="${el.title}" class="taskTitle">
				<textarea class="taskDescription">${el.text}</textarea>
				<p>
				<span>07.10.2022</span>
				<button class="taskDelete"></button>
				<button class="taskDone"></button>
				<button class="taskOpen"></button>
				</p>
				`,
			classes: [`task ${ el.state ? "done" : null}`],
			attr: { draggable: true },
			parent: dom.$(`.column.${el.cID} .tasks`)
			
		});
	});

	elements.task = dom.$$(".task");
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
			elements.modal.classList.add("show");
			evt.currentTarget.parentNode.parentNode.classList.add("open");
		});
	});

	let taskClose = dom.$$(".taskClose");
	taskClose.forEach(el => {
		el.addEventListener("click", evt => {
			evt.preventDefault();
			elements.modal.classList.remove("show");
			evt.currentTarget.parentNode.classList.remove("open");
		});
	});

	dragTask();
};


const createColumn = evt => {
	dom.create({
		content: `
            <div class="columnHeader">
                <button class="columnDelete"></button>
                <h2><input type="text" value="Abschnitt" class="columnTitle" style="background-color: ${settings.randomColor}"></h2>
            </div>    
            <h3 class="addTask">+</h3> 
            <div class="tasks"></div>
            `,
		classes: ["column"],
		parent: elements.kanban
	});

	elements.column = dom.$$(".column");
	elements.columnTitle = dom.$$(".columnTitle");
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
			elements.modal.classList.add("show");
			evt.currentTarget.parentNode.parentNode.classList.add("open");
		});
	});

	let taskClose = dom.$$(".taskClose");
	taskClose.forEach(el => {
		el.addEventListener("click", evt => {
			evt.preventDefault();
			elements.modal.classList.remove("show");
			evt.currentTarget.parentNode.classList.remove("open");
		});
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

// Elemente werden zum Speichern der Daten erfasst
const updateData = () => {
	elements.column = dom.$$(".column");
	elements.columnTitle = dom.$$(".columnTitle");
	elements.tasks = dom.$$(".tasks");
	elements.task = dom.$$(".task");
};

// Zeige Meldung wenn Daten geladen oder gespeichert werden
const showMessage = state => {
	let message = dom.create({
		content: `Daten werden ${state == "save" ? "gespeichert" : "geladen"}.`,
		classes: ["message", "show"],
		parent: elements.main
	});
	message.classList.add("show");
	setInterval(() => {
		message.classList.remove("show");
	}, 1000);
};

// Speichern der Daten in die Datenbank
const saveData = () => {

	updateData();

	let projectTitle = elements.projectTitle.value;

	let columnID = 0;
	let columnArray = [];
	let columnObject = {};
	elements.column.forEach(el => {
		let columnTitle = el.querySelector(".columnTitle").value;
		columnID++;
		columnObject = { title: columnTitle, cID: "c" + columnID };
		columnArray.push(columnObject);
	});

	columnID = 0;
	let taskArray = [];
	let taskObject = {};
	let taskState;
	elements.column.forEach(el => {
		let tasks = [...el.querySelectorAll(".task")];
		columnID++;
		tasks.forEach(task => {
			let taskTitle = task.querySelector(".taskTitle").value;
			let taskDesc = task.querySelector(".taskDescription").value;
			task.classList.contains('done') ? taskState = true : taskState = false;
			taskObject = { title: taskTitle, text: taskDesc, cID: "c" + columnID, state: taskState };
			taskArray.push(taskObject);
		});
	});

	let projectData = JSON.stringify({
		title: projectTitle,
		pID: 1,
		column: columnArray,
		task: taskArray
	});

	fetch("/saveProject", {
		method: "post",
		body: projectData,
		headers: { "Content-Type": "application/json" }
	})
		.then(res => res.json())
		.then(showMessage("save"))
		.catch(console.warn);
};


const loadProject = () => {
	return fetch("/loadProject").then(response => response.json());
};

const appendEventlisteners = () => {
	elements.addColumn.addEventListener("click", createColumn);
	elements.saveData.addEventListener("click", saveData);
};

const init = () => {
	appendEventlisteners();
	loadProject()
		.then(showMessage("load"))
		.then(renderProject)
		.catch(console.warn);
};

// INIT
document.addEventListener("DOMContentLoaded", init);