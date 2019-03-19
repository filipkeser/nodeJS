// load our app server using express somehow...
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

const bodyParser = require('body-parser')

// middleware - using it for easier request processing from the html form
// vidi #1 u app.post metodi
app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static('./public'))

app.use(morgan('short'))

// instead of a connection, create a connestion pool with strictly defined number of connections
const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    database: "MySQL",
    password: "AnaFilip1708"
})

// returns a connection pool (see above)
function getConnection(){
    return pool         
}

// see router "users" 
const router = require('./routes/user.js')

app.use(router)


app.get("/", (req,res) => 
{
    console.log("Responding to root route")
    res.send("Hello from ROOT")
})

/*
app.get("/users", (req,res) => {
    var user1 = {
                    firstName: "Filip", 
                    lastName: "Keser"
                } 
    var user2 = {   firstName: "Ana", 
                    lastName: "Keser"
                }

    res.json([user1, user2])
//  res.send("Nodemon autoupdates when I save this file")
})
*/

// localhost: 3003
app.listen(3003,() =>  {
    console.log("Server is up and listening in port 3003")
})
