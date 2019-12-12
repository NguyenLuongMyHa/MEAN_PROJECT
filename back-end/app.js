const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const roomsRoutes = require('./routes/rooms');
const userRoutes = require('./routes/user');
const app = express();

mongoose.connect("mongodb+srv://HaNguyen:HaNguyen@clustermean-wlhzz.mongodb.net/meanproject?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(() => {
        console.log('Connected to database');
    })
    .catch(() => {
        console.log('Connection failed!');
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.get("/images", express.static(path.join("/back-end/images")));
app.use("/images", express.static(path.join("images")));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});
app.use("/api/rooms", roomsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;


