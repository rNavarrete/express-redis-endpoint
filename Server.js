var express = require("express");
var app = express();
var router = express.Router();
var request = require('request');


router.get("/space", function (req, res) {
    request('https://api.spacexdata.com/v1/launches/latest', function (error, response, body) {
        res.send(body);
    })
});

app.use("/", router);

var server = app.listen(3000,function(){
    console.log("Live at Port 3000");
});

module.exports = server