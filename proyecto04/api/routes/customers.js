var express = require('express');
var router = express.Router();

const Sequelize = require('sequelize');
const Customer = require('../models').customer;  

router.get('/findAll/json', function(req, res, next) {  

	
    Customer.findAll({  
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] } 
    })  
    .then(customers => {  
        res.json(customers);  
    })  
    .catch(error => res.status(400).send(error)) 
  
  });

module.exports = router;