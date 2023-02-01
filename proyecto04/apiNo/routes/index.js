var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/findAll/json', async function(req, res, next) {  
	const URL = 'https://sales-ac6a5-default-rtdb.firebaseio.com/collection.json'
  const response = await axios.get(URL);
  res.json(response.data);
});

router.get('/orders/:id', async function(req, res, next) {  
	const URL = `https://sales-ac6a5-default-rtdb.firebaseio.com/collection.json?orderBy="customerNumber"&equalTo=${req.params.id}`
  const response = await axios.get(URL);
  let values = Object.values(response.data);
  array = [];
  for (let order of values){
    if(order.status == "Shipped"){
      array.push(order);
    }
  }
  res.json(array);
  
});
module.exports = router;
