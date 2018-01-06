var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
/*
router.use('/', function (req, res, next) {
        jwt.verify(req.query.token, 'secret', function (err, decoded) {
            if (err) {
                res.render('login');/*
                return res.status(401).json({
                    title: 'Not Authenticated',
                    error: err
                });
            }
            else
            next();
        })
});
*/
router.get('/', function (req, res, next) {
   res.render('index');
});


module.exports = router;
