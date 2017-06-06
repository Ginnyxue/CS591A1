/**
 * Created by Ginny on 17/6/5.
 */

var express = require('express');
var router = express.Router();

// var request = require("request");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});


router.get('/:name', function (req, res, next) {
    let theName = req.params.name
    res.send(JSON.stringify({"string": theName, "length": theName.length}))
//    next()
})

// router.param('/', function (req, res, next, value) {
//     req.params.name
//     next()
// })

router.post('/', function (req, res, next) {
    let object = req.body.string
    res.json({"string": object, "length":object.length})

})

// router.post('/', function (req, res, next) {
//     console.log(req.body.hw1)
//     for (item in req.body) {
//         console.log(item)
//     }
//     res.json(req.body.hw1)
// })
module.exports = router;
