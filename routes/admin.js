/**
 * Created by WCJ on 2016/4/20.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var data;
var data1 = new Array();
var userIds;

var TicketModel = require('../models/ticket.js');
var UserticketModel = require('../models/usersticket.js');
var UsersModel = require('../models/users.js');
var StudentModel = require('../models/students.js');
var WorkerModel = require('../models/workers.js');


//adminpage1
router.get('/admin1',function(req, res){
    res.render('adminpage1',{})
});

//adminpage2
router.get('/admin2',function(req, res){
    res.render('adminpage2',{})
});

//adminpage4
router.get('/admin4',function(req, res){
    res.render('adminpage4',{})
});

//look ticket
router.get('/admin',function(req, res,next){
    UserticketModel.fetch(function (err,cb) {
        if(err){
            console.log(err)
        }
        res.render('adminpage',{
            persons: cb
        })
    })
});

//look userinfo
router.post('/userinfo',function(req,res){
    var username = req.body.username;
    var userId;
    console.log(username);
    UsersModel.findOne({username:username},function(err,doc){
        if(err){
            console.log("err" + err)
        } else {
            userId = doc.userId
        }
        console.log(userId);
        console.log(typeof userId);
        console.log(userId.toString().length);
        if(userId.toString().length == 12){
            StudentModel.findOne({studentId:userId},function(err,doc){
                if(err){
                    console.log("err" + err)
                } else{
                    data = doc;
                    userIds = data.studentId;
                    console.log(data);
                    return data;
                }
            })
        } else{
            if(userId.toString().length == 8){
                WorkerModel.findOne({workerId:userId},function(err,doc){
                    if(err){
                        console.log("err" + err)
                    } else{
                        data = doc;
                        userIds = data.workerId;
                        console.log(data);
                        return data;
                    }
                })
            }
        }
    });
    res.redirect('/users/admin5')
});

//adminpage5
router.get('/admin5',function(req,res){
    res.render('adminpage5',{
        _id:data._id,
        userId:userIds,
        username:data.username,
        college:data.college,
        mobile:data.mobile,
        email:data.email
    });
});


//change ticket price
router.post('/change/price',function(req, res){
    var ticketDay = req.body.ticketDay;
    var ticketTime = req.body.ticketTime;
    var originplace = req.body.originplace;
    var destination = req.body.destination;
    var price = req.body.ticketprice;
    TicketModel.update({ticketDay:ticketDay,ticketTime:ticketTime,originplace:originplace,destination:destination},{$set:{price:price}},function(err){
        if(err){
            console.log("err" + err)
        }else{
            console.log("update mgprice success!")
            req.session.error = "修改成功";
            res.send(200);
        }
    });
});

//addticket
router.post('/change/newticket',function(req,res){
    var ticketDay = req.body.ticketDay;
    var ticketTime = req.body.ticketTime;
    var originplace = req.body.originplace;
    var destination = req.body.destination;
    var ticketnum = req.body.ticketnum;
    var price = req.body.ticketprice;
    TicketModel.create({
        ticketDay  :ticketDay,
        ticketTime :ticketTime,
        originplace:originplace,
        destination:destination,
        ticketnum  :ticketnum,
        price      :price
    },function(err,doc){
        if(err){
            console.log("err" + err)
        } else{
            console.log(doc);
            req.session.error = "增加成功";
            res.send(200);
        }
    })
});

module.exports = router;