/**
 * Created by WCJ on 2016/4/19.
 */
var express = require('express');
var router = express.Router();
var data,data1,data2;
var userIds;

var UsersModel = require('../models/users.js');
var UserticketModel = require('../models/usersticket.js');
var StudentModel = require('../models/students.js');
var WorkerModel = require('../models/workers.js');

//personal info
router.post('/ppersonal',function(req,res){
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
    res.redirect('/users/personal')
});

//personal
router.get('/personal',function(req, res){
     return res.render('personal',{
         userId  :userIds,
         username:data.username,
         college :data.college,
         mobile  :data.mobile,
         email   :data.email,
         money   :data.money,
         _id     :data._id
    });
    console.log(userId);
});

//personal1 info
router.post('/ppersonal1',function(req,res){
    var username = req.body.username;
    console.log(username);
    UserticketModel.find({ username:{ $in: username}},function(err,doc){
        if(err){
            console.log("err" + err)
        } else{
            data1 = doc;
            res.redirect('/users/personal1')
        }
    })
});

//personal1
router.get('/personal1',function(req, res){
    return res.render('personal1',{
    });
});

//personal1 update info
router.post('/newinfo',function(req, res){
    var username  =req.body.username;
    var mobile  =req.body.mobile;
    var email  =req.body.email;
    var userId;
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
            StudentModel.update({username:username},{$set:{mobile:mobile,email:email}},function(err){
                if(err){
                    console.log("err" + err)
                } else{
                    req.session.error =  '信息更新成功！';
                    res.send(200);
                    console.log("info update success!")
                }
            })
        } else{
            if(userId.toString().length == 8){
                WorkerModel.update({username:username},{$set:{mobile:mobile,email:email}},function(err){
                    if(err){
                        console.log("err" + err)
                    } else{
                        req.session.error =  '信息更新成功！';
                        res.send(200);
                        console.log("info update success!")
                    }
                })
            }
        }
    });
});

//personal2 info
router.post('/ppersonal2',function(req,res){
    var username = req.body.username;
    console.log(username);
    UserticketModel.find({ username:{ $in: username}},function(err,doc){
        if(err){
            console.log("err" + err)
        } else{
            data2 = doc;
            console.log(typeof data2);
            res.redirect('/users/personal2')
        }
    })
});

//personal2
router.get('/personal2',function(req, res){
    return res.render('personal2',{
        persons:data2
    });
});

//personal return ticket
router.post('/return/userticket', function (req, res) {
    var userId = req.body.userId;
    var username = req.body.username;
    var price = req.body.price;
    var pricenum = 1;
    pricenum = parseInt(price);
    console.log(username);
    UserticketModel.remove({_id:userId},function(err){
        if(err){
            console.log("err" + err)
        }else{
            console.log("delete success!");
            res.redirect("/users/returnticket")
        }
    });
    UsersModel.find({username:username}, function (err,doc) {
        if(err){
            console.log('err' + err)
        }else{
            var moneynum = 1;
            moneynum = parseInt(data.money);
            var money = 1;
            money = moneynum + pricenum;
            console.log(typeof moneynum);
            console.log(typeof pricenum);
            console.log(typeof money);
            UsersModel.update({username:username},{$set : { money : money }},function(err){
                if(err){
                    console.log("err" + err)
                }else{
                    console.log("update success!")
                }
            })
        }
    })
});

//personal3
router.get('/personal3',function(req, res){
    res.render('personal3',{})
});

//newpassword personal3
router.post('/newpassword',function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    var newpassword = req.body.newpassword;
    console.log(newpassword);
    console.log(username);
    UsersModel.findOne({username:username},function(err,doc){
        if(err){
            console.log("err" + err)
        } else{
            console.log("322");
            console.log(doc);
            console.log(doc.password);
            if(password != doc.password){
                req.session.error = "密码错误";
                console.log("1234");
                res.send(404);
                //res.redirect("/users/personal3")
            }else{
                console.log("233");
                UsersModel.update({username:username},{$set : { password:newpassword }},function(err){
                    if(err){
                        console.log("err" + err)
                    }else{
                        console.log("update success");
                        req.session.error = '密码修改成功！';
                        res.send(200);
                        //res.redirect('/users/personal3')
                    }
                })
            }
        }
    })
});

module.exports = router;