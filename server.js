require('dotenv').config();

const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const app = express();
let port = normalizePort(process.env.PORT || '5000');

// static server
// app.use(express.static('./build'));

// app.get('/', (req, res) => {
//     res.sendfile(path.join(__dirname, './build', 'index.html'));
// });

const URL1 = process.env.AzureMongoDBConnectSTR;
const URL2 = process.env.localDBServer;

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

MongoClient.connect(URL2, (err, db) => {
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
        colCustomers.find({}, {"_id": 1, "name": 1, "position": 1, "curr_balance": 1}).toArray((error, documents) => {
            if (error) throw error;
            res.send(documents);
        });
    });

    app.get('/products.json', (req, res) => {
        colProducts.find({}, {"_id": 1, "name": 1, "price": 1}).toArray((error, documents) => {
            if (error) throw error;
            res.send(documents);
        })
    })

    app.listen(port);
    console.log(`server running at port ${port}`);
});