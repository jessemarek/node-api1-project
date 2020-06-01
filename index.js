//import Express
const express = require('express')

//Create server
const server = express()

//Middleware
server.use(express.json())

//id to add to users
let idNumber = 2

//users seed data
let users = [
    {
        id: 1,
        name: 'Jesse',
        bio: 'node.js student'
    }
]

server.post('/api/users', (req, res) => {
    if (req.body.name && req.body.bio) {

        // add the next id number to the data being added
        const newUser = req.body
        newUser.id = idNumber

        //increment the id number
        idNumber++

        //Add the new user to the data
        users.push(newUser)

        //Return the list of users
        res.status(201).json(users)
    }
    //Return an error message if the data sent doesn't meet requirements
    else res.status(400).json({ "errorMessage": "Please provide name and bio for the user." })
})

//Listen for requests
const port = 8000

server.listen(port, () => console.log(`\n == Listening on Port ${port} == \n`))