var room = require('../models/room.js');

var express = require('express');
var router = express.Router();


router.get('/playlist', function(req, res){
  res.json(room);
});




module.exports = router;
