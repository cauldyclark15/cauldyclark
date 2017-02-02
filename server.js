require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
let port = normalizePort(process.env.PORT || '5000');

app.use(express.static('./build'));

app.get('/', (req, res) => {
    res.sendfile(path.join(__dirname, './build', 'index.html'));
});

const url = process.env.AzureMongoDBConnectSTR;

function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}

MongoClient.connect(url, (err, db) => {
    assert.equal(null, err);
    console.log('Connected correctly to server');

    let colCustomers = db.collection('customers');
    let colProducts = db.collection('products');

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.get('/customers.json', (req, res) => {
        colCustomers.find({}).toArray((error, documents) => {
            if (error) throw error;
            res.send(documents);
        });
    });

    app.get('/products.json', (req, res) => {
        colProducts.find({}).toArray((error, documents) => {
            if (error) throw error;
            res.send(documents);
        })
    })

    app.listen(port);
    console.log(`server running at port ${port}`);
});