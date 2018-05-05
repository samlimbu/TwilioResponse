const express = require('express');
const cors = require('cors');
const Data = require('./models/data')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/database');
const genreRouter = require('./routes/genre');
const paramRouter = require('./routes/param');
var jwt = require('jsonwebtoken');

mongoose.connect(config.database);
mongoose.connection.on('connected', function(){
     console.log('connected to ' + config.database);
});

const port = process.env.PORT || 3000;
let app = express();



app.use(cors());
app.use(bodyParser.json());


app.get('/test/:id&:id2', (req,res)=>{
     console.log(req.params.id);
     res.json({"test": req.params.id,
     "id2": req.params.id2
          });
});

app.use('/getParams',paramRouter)

app.use('/genre', genreRouter);
app.post('/', (request, response) => {
	console.log(request.body);
	response.json(request.body);

});

app.get('/', (request, response, next) => {
	
	response.json({"message":"Hellow world"});

});
app.post('/login', function(req,res){
     const user = {
          "username":"sam"
     };
     jwt.sign({ user: user }, 'secretkey', function(err, token) {
          //console.log(token);
          res.json(token);

        });
});
app.post('/admin', verifyToken, function(req,res){
     
     jwt.verify(req.token, 'secretkey', function(err, decoded) {
          if(err){
               res.sendStatus(403);
          }
          else{
               
               res.json({"message":"signedin",
                    decoded
                    });


          }
          // decoded undefined
        });
     
});
function verifyToken(req,res,next){
     const bearerHeader = req.headers['authorization'];
     console.log('token' + bearerHeader);
     if(typeof bearerHeader !== 'undefined'){
          req.token = bearerHeader;
          
          next();
     }
    
     else{
          res.sendStatus(403);
     }
     
}

app.listen(port, () => {
	console.log('Server Up and running on PORT', port);
});