
// mongo node connection : mongodb://cauldyclark:kVR6hIGqt8qSte4yYDRN5LJut21O8vEkEYLRRJs3Z3enaNFdwlRtfklvWZVtLxvhB0X4cTsidzutF5uVV54BUQ==@cauldyclark.documents.azure.com:10250/store?ssl=true
// mongo shell connection ; mongo cauldyclark.documents.azure.com:10250 -u cauldyclark -p kVR6hIGqt8qSte4yYDRN5LJut21O8vEkEYLRRJs3Z3enaNFdwlRtfklvWZVtLxvhB0X4cTsidzutF5uVV54BUQ== --ssl --sslAllowInvalidCertificates


db.createUser(
  {
    user: "xz",
    pwd: "Fastest15",
    roles: [ { role: "readWrite", db: "kims" } ]
  }
)

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
        name: "Jc",
        position: "Engineer",
        purchased: [],
        payments: [],
        curr_balance: 0,
        date_joined: new Date()
    },
    {
        name: "Francis",
        position: "Engineer",
        purchased: [],
        payments: [],
        curr_balance: 0,
        date_joined: new Date()
    },
    {
        name: "Dauz",
        position: "Engineer",
        purchased: [],
        payments: [],
        curr_balance: 0,
        date_joined: new Date()
    },
    {
        name: "Dauz",
        position: "Engineer",
        purchased: [],
        payments: [],
        curr_balance: 0,
        date_joined: new Date()
    }
])
db.products.insertMany([
    {
        name: "maxx",
        price: 1,
        date_registered: new Date()
    },
    {
        name: "coke",
        price: 8,
        date: new Date()
    },
    {
        name: "skyflakes",
        price: 5,
        date: new Date()
    }
])

db.customers.insertOne(
    {
        name: "Sam",
        position: "Engineer",
        purchased: [],
        payments: [],
        curr_balance: 0,
        date_joined: new Date()
    }
)