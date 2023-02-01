var express = require('express');
const axios = require('axios');
const { response } = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/customers', async function(req, res, next) {
  const URL = 'http://localhost:4444/customers/findAll/json'
  const config = {
    proxy: {
      host: 'localhost',
      port: 4444
    }
  }
  const response = await axios.get(URL, config) 
  res.render('clientes', { title: 'Clientes', clientes: response.data});
});

router.get('/products', async function(req, res, next) {
  const URL = 'http://localhost:3080/findAll/json'
  const config = {
    proxy: {
      host: 'localhost',
      port: 3080
    }
  }
  const response = await axios.get(URL, config) 
  res.render('productos', { title: 'Productos', productos: response.data});
});

router.get('/customers/orders/:id',async function(req, res, next) {
  const URL = `http://localhost:3080/orders/${req.params.id}`

  const config = {
    proxy: {
      host: 'localhost',
      port: 3080
    }
  }
  const response = await axios.get(URL, config);
  console.log("entre a order de admin");
  res.render('orders', {title: 'Orders', orders: response.data});
});

module.exports = router;
