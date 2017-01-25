db.createUser(
  {
    user: "kim",
    pwd: "Fastest15",
    roles: [
       { role: "readWrite", db: "store" }
    ]
  }
)
db.customers.insertMany([
    {
        name: "gani",
        occupation: "material controller"
    },
    {
        name: "por",
        occupation: "foreman"
    },
    {
        name: "henry",
        occupation: "laborer"
    }
])