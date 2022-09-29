"use strict";

const express = require("express");
const server = express();
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const connectionURL =
	"mongodb+srv://koncrete99:rEmDQKS7XD8q0ymk@koncrete99.zuv0mny.mongodb.net";
const databaseName = "flexboard";
const projectCollection = "project";
const taskCollection = "task";
server.use(
	express.static("build", {
		extensions: ["html"]
	})
);
server.use(express.json());

MongoClient.connect(
	connectionURL,
	{ useNewUrlParser: true },
	(error, client) => {
		if (error) {
			return console.log("Datenbankverbindung konnte nicht hergestellt werden");
		} else {
			console.log("Verbunden mit Datenbank");

            const db = client.db(databaseName);
            

			server.post("/saveProject", (request, response) => {
				console.log(request.body);
				db.collection(projectCollection)
					.deleteMany()
					.then(db.collection(projectCollection).insertOne(request.body))
					.catch(err => {
						console.warn(err);
						response.json({
							status: "err",
							err
						});
					});
			});

			server.get("/loadProject", (request, response) => {
				let result = db.collection(projectCollection).find({ pID: 1 });

                let doc = result.hasNext() ? result.next() : null;

                doc
                .then( dataset => console.log(dataset))
                .catch( err => console.log(err))
                
                // result.forEach( dataset => console.log(dataset) )


				/*
                .then(
                    data => response.json(data)
                ).catch(
                    err => {
                        console.warn(err);
                        response.json({
                            status: 'err',
                            err
                        })
                    }
                )
                */
			});
		}
	}
);

const init = () => {
	server.listen(5500, err => console.log(err || "Server läuft"));
};

init();
