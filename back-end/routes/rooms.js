const express = require("express");
const multer = require("multer");

const Room = require("../models/room");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();


const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
};
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const isValid = MIME_TYPE_MAP[file.mimetype];
      let error = new Error("Invalid mime type");
      if (isValid) {
        error = null;
      }
      cb(error, "images");
    },
    filename: (req, file, cb) => {
      const name = file.originalname
        .toLowerCase()
        .split(" ")
        .join("-");
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, name + "-" + Date.now() + "." + ext);
    }
  });

router.post("",  
checkAuth,
multer({ storage: storage }).single("image"),
(req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
    const room = new Room({
        title: req.body.title,
        description: req.body.description,
        address: req.body.address,
        price: req.body.price,
        discount: req.body.discount,
        typeid: req.body.typeid,
        imagePath: url + "/images/" + req.file.filename
    });
    room.save().then(createdRoom => {
        console.log(room);
        res.status(201).json({
            message: "Room added successfully",
            room: {
                ...createdRoom,
                id: createdRoom._id
            }
        });
    });
});
router.put("/:id", checkAuth, multer({ storage: storage }).single("image"),
(req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename
  }
    const room = new Room({
        _id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        address: req.body.address,
        price: req.body.price,
        discount: req.body.discount,
        typeid: req.body.typeid,
        imagePath: imagePath
    });
    Room.updateOne({ _id: req.params.id }, room).then(result => {
        console.log(result);
        res.status(200).json({ message: "Update successful!" });
    });
});

router.get("", (req, res, next) => {
    
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    const roomQuery = Room.find();
    let fetchedRooms;
    if(pageSize && currentPage)
    {
        roomQuery.skip(pageSize * (currentPage - 1))
        .limit(pageSize);
    }
    roomQuery
        .then(documents =>{
            fetchedRooms = documents
            return Room.count();
        })
        .then(count => {
            res.status(200).json({
                message: 'Rooms fetched successfully!',
                rooms: fetchedRooms,
                maxRooms: count
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
router.delete("/:id", checkAuth, (req, res, next) => {
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
