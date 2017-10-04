var express = require("express");
var app = express();
var router = express.Router();
var request = require('request');
const redis = require('redis');
const REDIS_PORT = process.env.REDIS_PORT;
const client = redis.createClient(REDIS_PORT);

function cache(req, res, next) {
    const launch = req.query.launch;
    client.get("launch", function (err, data) {
        if (err) throw err;

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
        client.set("launch", body, 'EX', 5);
    });
};

app.get("/latest", cache, GetLatestLaunchData);

var server = app.listen(3000,function(){
    console.log("Live at Port 3000");
});

module.exports = server