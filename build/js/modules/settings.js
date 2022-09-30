"use strict";

const settings = {
	projects: 0,
	projectSteps: 0,
	get randomColor() {
		return `hsl(${~~(Math.random() * 360)}, 70%, 30%)`;
	},
	get currentDate() {
		let today = new Date();
		let dd = today.getDate();
		let MM = today.getMonth() + 1;
		let yyyy = today.getFullYear();
		if (dd < 10) dd = "0" + dd;
		if (MM < 10) MM = "0" + MM;
		return `${yyyy}-${MM}-${dd}`;
	},
};

export default settings;