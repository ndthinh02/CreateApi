var express = require('express');
var router = express.Router();

/* GET home page. */
var db = 'mongodb+srv://admin:ndthinh1410@cluster0.ikuee.mongodb.net/testmongo?retryWrites=true&w=majority'
var mongo = require('mongoose')
const {json} = require("express");

mongo.connect(db).catch(err => {
  console.log("Da xay ra loi" + err)
})
var foodSchema = new mongo.Schema({
  id: 'String',
  name: 'String',
  urlImage: 'String',
  type: 'String',
  total: 'String',
  price: 'String'
})

var Food = mongo.model('food', foodSchema);
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/getAll', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  Food.find({}, (err, data) => {
    res.send((data))

  })
})
router.post("/addFood", (req, res) => {

  var id = req.body.id;
  var name = req.body.name;
  var total = req.body.total;
  var type = req.body.type;
  var price = req.body.price;
  var url = req.body.urlImage;

  const food = new Food({
    id: id,
    urlImage: url,
    total: total,
    name:name,
    price:price,
    type:type
  })
  food.save(function (err) {
    res.redirect('/getAll')
  })
})
router.get('/addFood', (req, res) => {

  res.render('addPost')

})
module.exports = router;
