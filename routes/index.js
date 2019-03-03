var express = require('express');
var router = express.Router();

// var fs = require('fs');

var moment = require('moment');
moment.locale('ja');

// var autoCompleteData = {"apple": null, "microsoft": null};

/* GET home page. */
router.get('/', function (req, res) {
    // var contents = [];
    // conn.query('SELECT * FROM `contents` json_contains(`topic`,'+req.params.gid+')', function (err, dbres, fields) { //トピックIDが含まれるコンテンツを検索
    //     contents = dbres;
    // if (req.session.user) {
    //     var userObj = req.session.user;
    //
    // } else {
    //     var userObj = null;
    // }
    // ;
    console.log("index js loaded")
    res.render('index');
    // });
});

module.exports = router;
