var express = require('express');
var router = express.Router();
var connection  = require('../lib/db');

/* GET home page. */
router.get('/', function(req, res, next) {

 connection.query('SELECT * FROM customers ORDER BY id desc',function(err,rows)     {

        if(err){
         req.flash('error', err);
         res.render('customers',{page_title:"Customers - Node.js",data:''});
        }else{

            res.render('customers',{page_title:"Customers - Node.js",data:rows});
        }

         });

    });

module.exports = router;
