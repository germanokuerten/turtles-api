//////////////////
// Turtles API
//////////////////

require('dotenv').config()

// dependencies
const express = require('express')

// Create application Obj
const app = express()
const PORT = process.env.PORT || 3001
const DATABASE_URL = process.env.DATABASE_URL


/////////////
// Middleware
/////////////

// Middleware
app.use(express.json())

// body-parser
app.use(express.urlencoded({extended:false})) 

// Mongoose Tweet Schema (Import)
const Turtle = require("./models/turtle.js")

// Mongoose config
const mongoose = require("mongoose")
const mongoose_db = mongoose.connection
mongoose.connect(DATABASE_URL)

// Check for DB connection and errors
mongoose_db.on("connected", () => {
    console.log("MongoDB Connected!")
})
mongoose_db.on("error", (err) => {
    console.log(err.message + " is mongodb not running?")
})
mongoose_db.on("disconnected", () => {
    console.log("mongo disconnected")
})



///////////////
// Routes
///////////////

// I N DUC E S

// app.get("/", (req, res) => {
//     res.send("Hello World")
// })

// Home
app.get("/", (req, res) => {
    res.json({ response: "Hello World" })
})

// Index - I
app.get("/turtles", (req, res) => {
    Turtle.find({}, (err, allTurtles) => {
        res.json(allTurtles)
    })
})

// Seed Route
app.get("/turtles/seed", async (req, res) => {
    // delete all existing drinks
    await Turtle.remove({}).catch((err) => res.send(err))
    // add sample drinks
    const turtles = await Turtle.create([
        { name: "Leonardo", role: "ninja" },
        { name: "Michaelangelo", role: "ninja" },
        { name: "Donatello", role: "ninja" },
        { name: "Raphael", role: "ninja" },
        { name: "Franklin", role: "student" },
        { name: "Master Oogway", role: "Sensei" },
        { name: "Crush", role: "Nemo's Ride" },
        { name: "Koopa Troopa", role: "Mario's foe" },
        { name: "Bowser", role: "King of evil Mario Turtles" },
        { name: "Squirtle", role: "Og starter poke" },
      ]).catch((err) => res.send(err))
    // send the drinks as json
    res.json(turtles)
})

// Delete - D
app.delete("/turtles/:index", (req, res) => {
    // splice (index number, how many objects)
    // turtles.splice(req.params.index, 1)

    const index = req.params.index
    Turtle.findByIdAndDelete(index, (err, data) => {
        res.json(data)
    })
})

// Update - U
app.put("/turtles/:index", (req, res) => {
    // turtles[req.params.index] = req.body

    Turtle.findByIdAndUpdate(req.params.index, req.body, {new: true},
        (err, updatedTurtle) => {
            res.json(updatedTurtle)
    })  
})

// Create - C
app.post("/turtles", (req, res) => {
    // Add the turtle to the array
    // turtles.push(req.body)

    Turtle.create(req.body, (err, newTurtle) => {
        res.json(newTurtle)
    })
    // Send the whole thing back to confirm it was added
    
})

// Show - S
app.get("/turtles/:index", (req, res) => {
    const showTurtle = Turtle.findById(req.params.index, (err, showTurtle) => {
        res.json(showTurtle)
    })
    
})

// Listen
app.listen(PORT, () => {
    console.log(`Listen to 1337`)
})