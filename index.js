const express = require("express");
const app = express();
const path = require('path')
const ejsMate = require('ejs-mate')
const Person = require('./models/schema');
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
const port = 5000;

// Configurations
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
// Connection with mongodb Atlas
const conn_str = `mongodb+srv://${process.env.MONGODB_ATLAS_USERNAME}:${process.env.MONGODB_ATLAS_PASSWORD}@experiment.rwpnw8r.mongodb.net/?retryWrites=true&w=majority`
mongoose.set('strictQuery', false);
mongoose.connect(
    conn_str,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) => {
        if (err) {
            console.log("error in connection");
        } else {
            console.log("mongodb is connected");
        }
    });


//Routes
app.get('/', (req, res) => {
    res.render("home")
})
app.listen(port, () => {
    console.log("starting the server");
});
//the server object listens on port 8080