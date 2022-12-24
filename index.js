const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require("dotenv").config()
const User = require('./models/users')
const paginatedResults = require('./middleware')
// Connect to a database

const conn_str = `mongodb+srv://${process.env.MONGODB_ATLAS_USERNAME}:${process.env.MONGODB_ATLAS_PASSWORD}@anish.wracvu5.mongodb.net/?retryWrites=true&w=majority`
mongoose.set('strictQuery', false);
mongoose.connect(
    conn_str,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, async () => {
        if (await User.countDocuments().exec() > 0) {
            return
        } else {

            const users = [];
            for (let i = 1; i <= 150; i++) {
                users.push({ name: `User ${i}` })
            }
            // Use a loop to insert the documents one at a time
            for (const user of users) {
                await User.create(user);
            }
            console.log("Data added successful")

        }
    });


// users?page=1&limit=5
app.get('/users', paginatedResults(User), (req, res) => {
    res.json(res.paginatedResults)
})
// to delete elements inside mongodb atlas
async function removeAllDocuments() {
    // Use the deleteMany method to remove all documents from the collection
    await User.deleteMany({});
}
app.listen(3000)