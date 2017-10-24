/**
 * Created by WCJ on 2016/4/20.
 */
var express = require('express');
var router = express.Router();
var data = new Array();

var UsersModel = require('../models/users');

//forgetpassword
router.get('/forgetpassword',function(req,res){
    res.render('forgetpassword',{})
});

//forgetpassword 跳转修改页面
router.post('/new/forgetpassword', function (req, res) {
    console.log("1");
    var userId = req.body.userId;
    var username = req.body.username;
    UsersModel.findOne({userId:userId},function(err,doc){
        if(err){
            console.log('err' + err)
        }else{
            console.log("2");
            data = doc;
            console.log(data);
            res.redirect('/users/changepassword');
        }
    })
});

//changepassword
router.get('/changepassword',function(req,res){
    res.render('changepassword',{
        userId:data.userId,
        question:data.question
    })
});

//changepassword 修改密码
router.post('/new/changepassword',function(req, res){
    var userId = req.body.userId;
    var answer = req.body.answer;
    var newpassword = req.body.newpassword;
    UsersModel.findOne({userId:userId},function(err,doc){
        if(err){
            console.log("err" + err)
        }else{
            console.log(doc);
            console.log(answer);
            console.log(doc.answer);
            if(answer != doc.answer){
                req.session.error =  '答案错误！';
                res.send(404);
                //res.redirect('/users/changepassword');
            }else{
                UsersModel.update({userId:userId},{$set:{password:newpassword}},function(err){
                    if(err){
                        console.log("err" + err)
                    }else{
                        req.session.error = '密码修改成功,请登录！';
                        res.send(200);
                        //res.redirect('/users/login');
                    }
                })
            }
        }
    })
});

module.exports = router;