// CRUD create read update delete

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const connectionURL = 'mongodb+srv://koncrete99:rEmDQKS7XD8q0ymk@koncrete99.zuv0mny.mongodb.net'
const databaseName = 'flexboard'
const projectCollection = 'project'
const taskCollection = 'task'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    console.log('Läuft')

    /*
    const db = client.db(databaseName)
    
    db.collection(projectCollection).insertOne({
        title: 'test 2',
        column: [
            {
                title: 'Spalte 1'
            },{
                title: 'Spalte 2'
            },
        ]
    })
    */
})