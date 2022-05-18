// use mongoose  package in this file
const mongoose = require("mongoose")

// Store mongoose schema functionality in a variable
const Schema = mongoose.Schema

const turtleSchema = new Schema(
    {
        name: String,
        role: String
    }
)

const Turtle = mongoose.model("Turtle", turtleSchema)

module.exports = Turtle