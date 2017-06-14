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
const Schema_string = new Schema({
    addStr: String,
    lenAddStr: Number
});

// console.log("Now Here!");

const result = mongoose.model('string', Schema_string);

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

router.get('/:str_param', function (req, res, next) {
    result.find({addStr: req.params.str_param}, function (err, results) {

        if(Object.keys(results).length === 0){
            console.log('Did not find this string in database.');
            let str = req.params.str_param;
            let len = str.length;
            const newStr = new result({
                addStr: str,
                lenAddStr: len
            });

            newStr.save(function(err) {
                if (err) {res.send(err)}
                else {
                    console.log('This string has been saved into database.')
                    res.json({string: str, length: len});
                }
            })
        }
        else{
            console.log("This string has been found!");
            res.json({string:results[0].addStr, length:results[0].lenAddStr});
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
                    lenAddStr: len
                });

                newStr.save(function(err) {
                    if (err) {res.send(err)}
                    else {
                        res.json({string: str, length: len});
                    }
                })
            }
            else{
                res.json({string: results[0].addStr, length: results[0].lenAddStr});
            }
        })

    }
    else{

        res.json({message:"Please provide a valid string."})
    }
});

router.delete('/:str_param', function (req, res, next) {
    result.findOneAndRemove({addStr: req.params.str_param}, function (err, data, results) {
            if(data === null){
                console.log("Get to null data passed in.")
                res.json({message:'String not found.'});
            }
            else{
                // console.log('I get here!');
                res.json({message:'Successfully Deleted'});
                console.log('This string is deleted from database.')
            }


        
    })

});

module.exports = router;
