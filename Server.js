// require the dependencies we installed
var express = require("express");
var app = express();
var router = express.Router();
var request = require('request');
// create a new redis client and connect to our local redis instance
const redis = require('redis');
const REDIS_PORT = process.env.REDIS_PORT;
const client = redis.createClient(REDIS_PORT);

function cache(req, res, next) {
    const launch = req.query.launch;
    client.get("launch", function (err, data) {
        if (err) throw err;
        // the result exists in our cache - return it to our user immediately
        if (data != null) {
            res.send(data);
        } else {
            next();
        }
    });
}

function GetLatestLaunchData(req, res) {
    request('https://api.spacexdata.com/v1/launches/latest', function (err, response, body) {
        if (err) throw err;
        var data = res.send(body)
        // store the key-value pair in our cache, break cache in 5 seconds
        client.set("launch", body, 'EX', 5);
    });
};

app.get("/latest", cache, GetLatestLaunchData);

var server = app.listen(3000,function(){
    console.log("Live at Port 3000");
});

module.exports = server