const express = require("express");
const Room = require("../models/room");
const router = express.Router();



router.post("", (req, res, next) => {
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
router.put("/:id", (req, res, next) => {
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

router.get("", (req, res, next) => {
    Room
        .find()
        .then(documents => {
            res.status(200).json({
                message: 'Rooms fetched successfully!',
                rooms: documents
            });
        });
});
router.get("/:id", (req, res, next) => {
    Room.findById(req.params.id).then(room => {
      if (room) {
        res.status(200).json(room);
      } else {
        res.status(404).json({ message: "Room not found!" });
      }
    });
  });
router.delete("/:id", (req, res, next) => {
    Room.deleteOne({ _id: req.params.id })
        .then(result => {
            console.log(result);
            res.status(200).json({ message: 'Room deleted!' });
        });
});

router.get('/', function (req, res) {
    res.status(200).send('Hello Huyh Le');
});

module.exports = router;
