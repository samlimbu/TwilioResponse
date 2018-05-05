const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const ParamM = require('../models/Param');


router.get("/", function(req,res){
     console.log(req.query);
     var limit = 0;
     var str = JSON.stringify(req.query);
     
     ParamM.insertParam({"info":str}, function(err,data){
          if(err){
               throw err;
          }
          ParamM.getParam(0, function(err,data){
               if(err){
                    throw err;
               }
               res.json(data);
          });
     });
     
});
router.post("/", function(req,res){
     console.log('post' + req.query);
     var str = JSON.stringify(req.query);
     ParamM.insertParam({"info":str}, function(err,data){
          if(err){
               throw err;
          }
          res.json(data);
     });
});

router.get("/display", function(req,res){
     ParamM.getParam(0, function(err,data){
          if(err){
               throw err;
          }
          res.json(data);
     });
});


module.exports = router;