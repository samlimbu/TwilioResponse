const express = require('express');
const cors = require('cors');
const Data = require('./models/data')
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
let app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/', (request, response) => {
	console.log(request.body);
	response.json(request.body);

});

app.listen(port, () => {
	console.log('Server Up and running on PORT', port);
});