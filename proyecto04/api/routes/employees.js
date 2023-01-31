var express = require('express');
var router = express.Router();

const Sequelize = require('sequelize');
const Employee = require('../models').employee;  

router.get('/findAll/json', function(req, res, next) {  

	
    Employee.findAll({  
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] } 
    })  
    .then(employees => {  
        res.json(employees);  
    })  
    .catch(error => res.status(400).send(error)) 
  
  });

module.exports = router;