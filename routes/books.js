var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var main = require("./db");

router.use('/', function (req, res, next) {
    jwt.verify(req.query.token, 'secret', function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
    })
});
router.get('/', function (req, res, next) {
    main.getConnection(function ( err, connection) {
        if(err) { console.log(err); callback(true); return; }
            connection.query('Select * from book' , function(err, books) {
                //console.log('all results query' + books); 
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                res.status(200).json({
                    message: 'Success',
                    obj: books
                });

            });
         });
});
router.post('/', function (req, res, next) {
    main.getConnection(function ( err, connection) {
        if(err) { console.log(err); callback(true); return; }
            connection.query('INSERT INTO book (Name, Author,Description,Price,Genre) VALUES ?', 
            [[[req.body.Name,req.body.Author,req.body.Description,parseFloat(req.body.Price),req.body.Genre]]] , function(err, result) {
               // console.log('inserted records' + result); 
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                res.status(201).json({
                    message: 'Saved message',
                    obj: result
                });
            });
         });
});
router.patch('/:id', function (req, res, next) {
    main.getConnection(function ( err, connection) {
        if(err) { console.log(err); callback(true); return; }
            connection.query('UPDATE book SET Name = ? ,Author=?,Description =? ,Price =?,Genre=? WHERE BookId = ?', 
            [req.body.Name,req.body.Author,req.body.Description,req.body.Price,req.body.Genre,req.params.id] , function(err, result) {
                console.log('all results query' + result); 
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                res.status(200).json({
                    message: 'updated message',
                    obj: result
                });
            });
         });
});
router.delete('/:id', function(req, res, next) {
    main.getConnection(function ( err, connection) {
        if(err) { console.log(err); callback(true); return; }
            connection.query('DELETE  from book where BookId= ?', 
            [req.params.id] , function(err, result) {
               // console.log('inserted records' + result); 
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                res.status(200).json({
                    message: 'Saved message',
                    obj: result
                });
            });
         });
});


module.exports = router;