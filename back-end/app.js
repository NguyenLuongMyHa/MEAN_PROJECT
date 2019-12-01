const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Room = require('./models/room');
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

app.post("/api/rooms", (req, res, next) => {
    const room = new Room({
        title: req.body.title,
        description: req.body.description,
        address: req.body.address,
        price: req.body.price,
        discount: req.body.discount,
        typeid: req.body.typeid
    });
    room.save().then(createdRoom => {
        //console.log(room);
        res.status(201).json({
            message: "Room added successfully",
            roomId: createdRoom._id
        });
    });
});
app.put("/api/rooms/:id", (req, res, next) => {
    const room = new Room({
        _id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        address: req.body.address,
        price: req.body.price,
        discount: req.body.discount,
        typeid: req.body.typeid
    });
    Room.updateOne({ _id: req.params.id }, room).then(result => {
        console.log(result);
        res.status(200).json({ message: "Update successful!" });
    });
});

app.get("/api/rooms", (req, res, next) => {
    Room
        .find()
        .then(documents => {
            res.status(200).json({
                message: 'Rooms fetched successfully!',
                rooms: documents
            });
        });
});
app.get("/api/rooms/:id", (req, res, next) => {
    Room.findById(req.params.id).then(room => {
      if (room) {
        res.status(200).json(room);
      } else {
        res.status(404).json({ message: "Room not found!" });
      }
    });
  });
app.delete("/api/rooms/:id", (req, res, next) => {
    Room.deleteOne({ _id: req.params.id })
        .then(result => {
            console.log(result);
            res.status(200).json({ message: 'Room deleted!' });
        });
});

app.get('/', function (req, res) {
    res.status(200).send('Hello Huyh Le');
});
module.exports = app;


