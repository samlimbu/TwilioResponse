const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const GenreM = require('../models/genre');


router.get("/", function(req,res){
     var limit = 0;
     GenreM.getGenres(limit, function(err,data){
          if(err){
               throw err;
          }
          res.json(data);
     });
});
router.post("/", function(req,res){
     
     GenreM.insertGenre(req.body, function(err,data){
          if(err){
               throw err;
          }
          res.json(data);
     });
});


module.exports = router;