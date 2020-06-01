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

//Add a new user to the data
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
        res.status(201).json(newUser)
    }
    //Return an error message if the data sent doesn't meet requirements
    else res.status(400).json({ "errorMessage": "Please provide name and bio for the user." })
})

//Get a list of users from the API
server.get('/api/users', (req, res) => {

    res.status(200).json(users)
})

//Get a user by id
server.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id)

    //Check if the user id exists in the data
    if (users.some(u => u.id === id)) {
        //Get the index of the user
        const idx = users.findIndex(u => u.id === id)

        //return the user we want
        res.status(200).json(users[idx])
    }
    //Return an error message if the user id is not found
    else res.status(404).json({ "message": "The user with the specified ID does not exist." })
})

//Delete a user by id
server.delete('/api/users/:id', (req, res) => {
    const id = Number(req.params.id)

    //Check if the user id exists in the data
    if (users.some(u => u.id === id)) {
        //Get the index of the user
        const idx = users.findIndex(u => u.id === id)

        //Store the user to be deleted for use in the res
        const deletedUser = users[idx]

        //Delete the user from the data
        users = users.filter(u => u.id !== id)

        //return the deleted user in the res
        res.status(200).json(deletedUser)
    }
    else res.status(404).json({ "message": "The user with the specified ID does not exist." })
})

//Update a user by id
server.put('/api/users/:id', (req, res) => {
    const id = Number(req.params.id)

    if (users.some(u => u.id === id)) {
        if (req.body.name && req.body.bio) {
            users = users.map(u => u.id !== id ? u : { ...u, name: req.body.name, bio: req.body.bio })

            res.status(200).json(users)
        }
        //Return an error message if the data sent doesn't meet requirements
        else res.status(400).json({ "errorMessage": "Please provide name and bio for the user." })

    }
    else res.status(404).json({ "message": "The user with the specified ID does not exist." })
})


//Listen for requests
const port = 8000

server.listen(port, () => console.log(`\n == Listening on Port ${port} == \n`))