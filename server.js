"use strict";

// Node (NPM) Module werden geladen
const express = require("express");
const server = express();
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb+srv://koncrete99:rEmDQKS7XD8q0ymk@koncrete99.zuv0mny.mongodb.net";
server.use(
	express.static("build", {
		extensions: ["html"]
	})
);
server.use(express.json());

// Projekt in Datenbank speichern
server.post("/saveProject", (request, response) => {
	MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
		if (error) {
			return console.log("Datenbankverbindung konnte nicht hergestellt werden");
		} else {
			let db = client.db("flexboard");
			let collection = db.collection("project");
			console.log(request.body);
			collection
				.deleteMany()
				.then(collection.insertOne(request.body))
				.catch(err => {
					console.warn(err);
					response.json({
						status: "err",
						err
					});
				});
		}
	});
});

// Projekt-Daten werden beim Öffnen der Website geladen
server.get("/loadProject", (request, response) => {
	async function findOne() {
		let client = await MongoClient.connect(url, {
			useNewUrlParser: true
		}).catch(err => {
			console.log(err);
		});

		if (!client) {
			return;
		}
		try {
			let db = client.db("flexboard");
			let collection = db.collection("project");
			let query = { pID: 1 };
			let res = await collection.findOne(query);
			console.log(res);
			response.send(res);
		} catch (err) {
			console.log(err);
		} finally {
			client.close();
		}
	}
	findOne();
});

const init = () => {
	server.listen(5500, err => console.log(err || "Server läuft"));
};

init();
