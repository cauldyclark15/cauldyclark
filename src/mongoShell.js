// mongo node connection : mongodb://cauldyclark:kVR6hIGqt8qSte4yYDRN5LJut21O8vEkEYLRRJs3Z3enaNFdwlRtfklvWZVtLxvhB0X4cTsidzutF5uVV54BUQ==@cauldyclark.documents.azure.com:10250/store?ssl=true
// mongo shell connection ; mongo cauldyclark.documents.azure.com:10250 -u cauldyclark -p kVR6hIGqt8qSte4yYDRN5LJut21O8vEkEYLRRJs3Z3enaNFdwlRtfklvWZVtLxvhB0X4cTsidzutF5uVV54BUQ== --ssl --sslAllowInvalidCertificates

db.users.insertMany([
    {
        name: "kim",
        password: "Xanderzyreb15"
    },
    {
        name: "guest",
        password: "1234"
    }
])
db.customers.insertMany([
    {
        name: "jc",
        occupation: "engineer",
        purchased: [
            {
                name: "skyflakes",
                qty: 4,
                price: 5,
                total: 20,
                date: new Date()
            },
            {
                name: "coke",
                qty: 1,
                price: 8,
                total: 8,
                date: new Date()
            },
            {
                name: "maxx",
                qty: 10,
                price: 1,
                total: 10,
                date: new Date()
            }           
        ],
        prev_balance: 38,
        last_payment: {
            amount: 30,
            date: new Date()
        },
        curr_balance: 8
    },
    {
        name: "franki",
        occupation: "engineer",
        purchased: [
            {
                name: "skyflakes",
                qty: 4,
                price: 5,
                total: 20,
                date: new Date()
            },
            {
                name: "coke",
                qty: 1,
                price: 8,
                total: 8,
                date: new Date()
            },
            {
                name: "maxx",
                qty: 10,
                price: 1,
                total: 10,
                date: new Date()
            }           
        ],
        prev_balance: 38,
        last_payment: {
            amount: 30,
            date: new Date()
        },
        curr_balance: 8 
    },
    {
        name: "dauzmoves",
        occupation: "engineer",
        purchased: [
            {
                name: "skyflakes",
                qty: 4,
                price: 5,
                total: 20,
                date: new Date()
            },
            {
                name: "coke",
                qty: 1,
                price: 8,
                total: 8,
                date: new Date()
            },
            {
                name: "maxx",
                qty: 10,
                price: 1,
                total: 10,
                date: new Date()
            }           
        ],
        prev_balance: 38,
        last_payment: {
            amount: 30,
            date: new Date()
        },
        curr_balance: 8
    },
    {
        name: "sampip",
        occupation: "engineer",
        purchased: [
            {
                name: "skyflakes",
                qty: 4,
                price: 5,
                total: 20,
                date: new Date()
            },
            {
                name: "coke",
                qty: 1,
                price: 8,
                total: 8,
                date: new Date()
            },
            {
                name: "maxx",
                qty: 10,
                price: 1,
                total: 10,
                date: new Date()
            }           
        ],
        prev_balance: 38,
        last_payment: {
            amount: 30,
            date: new Date()
        },
        curr_balance: 8      
    }
])

db.customers.insertOne({
        name: "sampip",
        occupation: "engineer",
        purchased: [
            {
                name: "skyflakes",
                qty: 4,
                price: 5,
                total: 20,
                date: new Date()
            },
            {
                name: "coke",
                qty: 1,
                price: 8,
                total: 8,
                date: new Date()
            },
            {
                name: "maxx",
                qty: 10,
                price: 1,
                total: 10,
                date: new Date()
            }           
        ],
        prev_balance: 38,
        last_payment: {
            amount: 30,
            date: new Date()
        },
        curr_balance: 8 
})
db.products.insertOne({
    name: "maxx",
    price: 1,
    date: new Date()
})