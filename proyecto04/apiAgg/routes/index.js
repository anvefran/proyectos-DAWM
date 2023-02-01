var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/getTotal', function(req, res, next) {
  let arreglo = req.body;
  let total=0;
  for (let order of arreglo){
    total += order.priceEach * order.quantityOrdered;
  }
  res.json({"total": total})
});
module.exports = router;
