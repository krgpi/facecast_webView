var express = require('express');
var router = express.Router();

var moment = require('moment');
moment.locale('ja');

/* GET home page. */
router.get('/', function (req, res) {

    // res.render('index');

});

module.exports = router;
