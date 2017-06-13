/**
 * Created by Ginny on 17/6/5.
 */

const express = require('express');
const router = express.Router();

// var request = require("request");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hw2');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

    console.log("Connected!")
});

const Schema = mongoose.Schema;
const strSchema = new Schema({
    addStr: String,
    lenStr: Number
});

// console.log("Now Here!");

const result = mongoose.model('string', strSchema);

//Below GET method is used to return all current stored data to the page, while there is no parameter passed.
router.get('/', function(req, res, next) {result.find({}, function (err, results) {
    res.json(results);
})
});

// console.log("Now Here!!");

//
// The GET Method first look in the database to see if the string is already present.
// If it is, return the string and its length as read from the database. If it isn’t,
// compute the length, store the string and its length in the database, and
// return both to the client.

router.get('/:_str', function (req, res, next) {
    result.find({addStr: req.params._str}, function (err, results) {

        if(Object.keys(results).length === 0){

            let str = req.params._str;
            let len = str.length;
            const newStr = new result({
                addStr: str,
                lenStr: len
            });

            newStr.save(function(err) {
                if (err) {res.send(err)}
                else {
                    res.json({string: str, length: len});
                }
            })
        }
        else{
            console.log("This string has been found!");
            res.json({string:results[0].addStr, length:results[0].lenStr});
        }
    })
});


router.post('/', function(req, res, next) {

    console.log(req.body);

    if(req.body.addStr){

        result.find({addStr: req.body.addStr}, function (err, results) {

            if(Object.keys(results).length === 0){
                let str = req.body.addStr;
                let len = str.length;
                const newStr = new result({
                    addStr: str,
                    lenStr: len
                });

                newStr.save(function(err) {
                    if (err) {res.send(err)}
                    else {
                        res.json({string: str, length: len});
                    }
                })
            }
            else{
                res.json({string: results[0].addStr, length: results[0].lenStr});
            }
        })

    }
    else{

        res.json({message:"Please provide a valid string."})
    }
});

router.delete('/:_str', function (req, res, next) {
    result.findOneAndRemove(req.params._str, function (err, results) {
        if (err) {
            res.json({message:'Error Deleting'});
        }
        else{
            // console.log('I get here!');
            res.json({message:'Successfully Deleted'});

        }
        
    })

});

module.exports = router;
