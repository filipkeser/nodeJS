//  will contain all my user related routes

/*  ****************************************************************************************************************************************************************
    constants declaration 
    ****************************************************************************************************************************************************************    */
const express = require('express')
const router1 = express.Router()

/*  ****************************************************************************************************************************************************************
    router1
    - TODO: separate the inserts and selects, just to see how it works
    ****************************************************************************************************************************************************************    */
router1.get('/messages', (req, res) =>{
    console.log("Creating some random code...")
    res.end()
})

/*  ****************************************************************************************************************************************************************
    route /user_create 
    - a method for creating a new user by writing the data in the form
    - TODO: find out how to automaticly assign an ID (something like "next value for sequence_xyz" from DB2) 
    ****************************************************************************************************************************************************************    */
router1.post('/user_create', (req, res) => 
{
    console.log("Trying to create a new user")
    console.log("How do we get the form data??")

    // Fetching the data from html form
    console.log("First Name: " + req.body.create_first_name)
    const firstName = req.body.create_first_name
    const lastName = req.body.create_last_name

    // creating an SQL insert statement 
    const queryString = "Insert into users (name, surname) values (?, ?)"
    getConnection().query(queryString, [firstName, lastName], (err, results, fieldsd) =>{
        if(err){
            console.log("Failed to insert new users: " + err)
            res.sendStatus(500)
            return
        }
        console.log("Inserted a new user with id: ", results.insertedID)
        res.end()
    })
    res.end()
})

/*  ****************************************************************************************************************************************************************
    route /user/:id 
    - where id can be some of the id's from the table users
    ****************************************************************************************************************************************************************    */
router1.get('/user/:id',(req, res) => 
{
    console.log("Fetching user id: " + req.params.id)
    const connection =  getConnection()

    // Fetching a userID from request parameter 
    const userID = req.params.id
    // Creating a SQL select statement
    const queryString = "Select * from users  where id = ? order by name"
    connection.query(queryString, [userID], (err, rows, fields) => 
    {
        // Handling possible exceptions (just to be on the safe side :) )  
        if(err)
        {
            console.log("Failed to query for users: " + err)
            res.sendStatus(500)
            res.end()   
            return
        }
        console.log("I think we fetched users successfully")
        // with a help of "map" method creating custom formatting for a specific row...
        const users = rows.map((row) =>
        {   // on a way that I write a custom tag and  reference it to row.xyz
            return{Ime: row.name, Prezime: row.surname}
        })
        // response with a custom mapping, can also return the normal  row -> res.json(row)
        res.json(users)
    })
})

/*  ****************************************************************************************************************************************************************
    route /users 
    - fetches all the users stored in the users table 
    ****************************************************************************************************************************************************************    */
router1.get('/users',(req, res) => 
{
    console.log("Fetching all users ")
    const connection =  getConnection()

    const userID = req.params.id
    const queryString = "Select * from users  order by name"
    connection.query(queryString, (err, rows, fields) => 
    {
        if(err)
        {
            console.log("Failed to query for users: " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("I think we fetched users successfully")
        // res.json(rows)
        // with a help of "map" method creating custom formatting for a specific row...
        const users = rows.map((row) =>
        {   // on a way that I write a custom tag and  reference it to row.xyz
            return{Ime: row.name, Prezime: row.surname}
        })
        res.json(users)
    })
})

/*  ****************************************************************************************************************************************************************
    export
    - need to export it, so I can access it from another methods....
    TODO: what is module? A method of express maybe?
    ****************************************************************************************************************************************************************    */
module.exports = router1