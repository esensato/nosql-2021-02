const { MongoClient } = require("mongodb");

const URI_LOCAL = "mongodb://localhost:27017";

const client = new MongoClient(URI_LOCAL);

client.connect().then(result => {

    const database = client.db("produtos");
    const frutas = database.collection("frutas");

    frutas.insertOne({nome: "Laranja", preco: 5.00}).then(result => {
        console.log(result);
        client.close()
    });

});