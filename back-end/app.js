const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use((reg, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader(
        'Access-Control-Allow-Methods', 
        'GET, POST, PATCH, DELETE, OPTIONS'
        );
    next();
})

app.post("/rooms", (req, res, next) => {
    const room = req.body;
    console.log(room);
    res.status(201).json({
        message: 'Room add successfully'
    });
});
app.get("/rooms", (req, res, next) => {
    const rooms = [
        { id: '1', title: 'First Room', description: 'This is the first room' },
        { id: '2', title: 'Second Room', description: 'This is the second room' },
        { id: '3', title: 'Third Room', description: 'This is the third room' },
    ];
    res.status(200).json({
        message: 'Rooms fetched successfully!',
        rooms: rooms
    });
});
app.get('/', function (req, res) {
    res.status(200).send('Hello Huyh Le');
});
module.exports = app;
