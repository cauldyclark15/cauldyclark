const express = require('express');
const path = require('path');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
let port = 1515;

app.use(express.static('./build'));

app.get('/', (req, res) => {
    res.sendfile(path.join(__dirname, './build', 'index.html'));
});

const url = 'mongodb://cauldyclark:kVR6hIGqt8qSte4yYDRN5LJut21O8vEkEYLRRJs3Z3enaNFdwlRtfklvWZVtLxvhB0X4cTsidzutF5uVV54BUQ==@cauldyclark.documents.azure.com:10250/store?ssl=true';

MongoClient.connect(url, (err, db) => {
    assert.equal(null, err);
    console.log('Connected correctly to server');

    let col = db.collection('customers');
    
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.get('/customers.json', (req, res) => {
        col.find({}).toArray((error, documents) => {
            if (err) throw error;
            res.send(documents);
        });
    });

    app.listen(1515);
    console.log(`server running at port ${port}`);
});