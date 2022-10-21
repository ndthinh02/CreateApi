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
var Cake = mongo.model('cake', foodSchema);
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
router.get('/getAll', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    Food.find({}, (err, data) => {
        res.send((data))

    })
})
router.get('/getCake', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    Food.find({
        type: "1"
    }, (err, data) => {
        res.send((data))
    })
})
router.get('/getDrink', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    Food.find({
        type: "2"
    }, (err, data) => {
        res.send((data))

    })
})
router.get('/getFruit', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    Food.find({
        type: "3"
    }, (err, data) => {
        res.send((data))

    })
})
router.post("/addFood", (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST');
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
        name: name,
        price: price,
        type: type
    })
    food.save(function (err) {
        res.redirect('/getAll')
    })
})
router.get('/addFood', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.render('addPost')

})
router.get('/delete', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    Food.find({}, (err, data) => {
        res.render('delete', {data: data});
    })
});
router.post("/updateFood", (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST');
    var id = req.body.id;
    var name = req.body.name;
    var total = req.body.total;
    var type = req.body.type;
    var price = req.body.price;
    var url = req.body.urlImage;
    console.log(id)
    Food.findOneAndUpdate({_id:id}, {urlImage: url, total: total, name: name, price: price, type: type}, (err, data) => {
        res.redirect('/delete')
        console.log(data)
    })


})

router.post('/update', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST');
    var idUpdate = req.body.idUpdate;
    Food.findById(idUpdate, (err, data) => {
        res.render('update', {data: data})
        // console.log(data)
    })
})
router.get('/update', function (req, res, next) {
    var idUpdate = req.body.idUpdate;
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    Food.find({id: idUpdate}, (err, data) => {
        res.render('update', {data: data});
    })

});

router.post("/delete", (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST');
    var id = req.body.idDelete;

    Food.findByIdAndRemove(id, (err, data) => {
        res.redirect('/delete')
    })
})
module.exports = router;
