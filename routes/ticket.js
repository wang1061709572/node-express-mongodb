/**
 * Created by WCJ on 2016/4/18.
 */
var express = require('express');
var router = express.Router();
var data;

var TicketModel = require('../models/ticket.js');
var UserticketModel = require('../models/usersticket.js');
var StudentModel = require('../models/students.js');
var WorkerModel = require('../models/workers.js');
var UsersModel = require('../models/users.js');

//returnticket
router.get('/returnticket',function(req, res){
    res.render('returnticket',{})
});

//payselect
router.get('/selectpay', function (req, res) {
    res.render('selectpay',{})
});

////paysuccess1
router.get('/paysuccess1', function (req, res) {
    res.render('paysuccess1',{})
});

//payselect
router.get('/paypage', function (req, res) {
    res.render('paypage',{})
});

//ticket
router.get('/ticket',function(req, res){
    TicketModel.fetch(function (err,cb) {
        if(err){
            console.log(err)
        }
        console.log(cb.length);
        res.render('ticket',{
            persons: cb
        })
    })
});

//paysuccess
router.get('/paysuccess', function (req, res) {
    res.render('paysuccess',{})
});

//userticket
router.post('/query/userticket',function(req, res){
    var originplace = req.body.originplace;
    var destination = req.body.destination;
    var ticketDay = req.body.ticketDay;
    TicketModel.find({
        originplace:{$in:originplace},
        destination:{$in:destination},
        ticketDay:{$in:ticketDay}
    },function(err,doc){
        if(err){
            console.log(err)
        }
        data = doc;
        res.redirect('/users/userticket')
    })
});

//
router.get('/userticket',function(req, res){
    res.render('userticket',{
        persons: data,
        person_id:data._id
    });
});

//booking ticket
router.post('/booking/userticket',function(req, res){
    console.log("1");
    var num = 1,tnum = 1;
    var ticketId = req.body.ticketId;
    var username    = req.body.username;
    var ticketDay   = req.body.ticketDay;
    var ticketTime  = req.body.ticketTime;
    var originplace = req.body.originplace;
    var destination = req.body.destination;
    var userticketnum   = req.body.userticketnum;
    var price       = req.body.price;
    num = parseInt(price);
    tnum = parseInt(userticketnum);
    console.log(username);
    console.log(userticketnum);
    console.log(typeof num);
    UsersModel.findOne({username:username},function (err,doc) {
        if(err){
            console.log('err' + err)
        } else{
            console.log(doc);
            var usermoney = doc.money;
            if(usermoney > num){
                UserticketModel.create({
                    username    :username,
                    ticketDay   :ticketDay,
                    ticketTime  :ticketTime,
                    originplace :originplace,
                    destination :destination,
                    userticketnum  :userticketnum,
                    price       :price
                },function(err,doc){
                    if(err){
                        console.log("err" + err)
                    } else{
                        req.session.error = '用户订票成功！';
                        res.redirect('/users/paysuccess');
                    }
                });
                var update = 50 - num ;
                var upnum = 50 - tnum;
                console.log(update);
                UsersModel.update({username:username},{$set:{money:update}}, function (err) {
                    if(err){
                        console.log('err' + err)
                    }else{
                        console.log('updata success');
                    }
                })
                TicketModel.update({_id:ticketId},{$set:{ticketnum:upnum}}, function (err) {
                    if(err){
                        console.log('err' + err)
                    }else{
                        console.log('updata success');
                    }
                })
            }else{
                req.session.error =  '用户余额不足！';
            }
        }
    })
});

module.exports = router;