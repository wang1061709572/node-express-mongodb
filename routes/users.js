var express = require('express');
var router = express.Router();

var StudentModel = require('../models/students.js');
var WorkerModel = require('../models/workers.js');
var UsersModel = require('../models/users.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//register
router.get('/register', function (req, res, next) {
  res.render('register',{})
});

//login
router.get('/login',function(req, res, next){
  res.render('login',{})
});

//home
router.get('/home', function(req, res, next) {
  res.render('home', {});
});

//register POST
router.post('/new/register',function(req, res){
  //这里的User就是从model中获取user对象，通过global.dbHandel全局方法（这个方法在app.js中已经实现)
  //var User = global.dbHandel.getModel('user');
  var userId = req.body.userId;
  var username;
  var password = req.body.password;
  var question = req.body.question;
  var answer = req.body.answer;
  if (userId.length == 8){
    WorkerModel.findOne({workerId:userId},function(error,doc){
      if(!doc){
        username = "null1";
      } else{
        username = doc.username;
      }
    })
  } else {
    if(userId.length == 12){
      StudentModel.findOne({studentId:userId},function(err,doc){
        if(!doc){
          username = "null1";
        } else{
          username = doc.username;
        }
      })
    } else{
      username = "null1";
    }
  }
  console.log(username);
  if (username === "null1"){
    req.session.error =  '用户名错误，请输入正确学号或工号！';
    res.send(500);
  } else {
    UsersModel.findOne({userId:userId},function(error,doc){   // 同理 /login 路径的处理方式
      if(error){
        res.send(500);
        req.session.error =  '网络异常错误！';
        console.log(error);
      }else if(doc){
        req.session.error = '用户名已存在！';
        res.send(500);
      }else{
        UsersModel.create({ 							// 创建一组user对象置入model
          userId   :userId,
          username :username,
          password :password,
          question :question,
          answer   :answer
        },function(error,doc){
          if (error) {
            res.send(500);
            console.log(error);
          } else {
            req.session.error = '用户名注册成功！';
            res.send(200);
          }
        });
      }
    });
  }
});

//login POST
router.post('/login',function(req,res){
  var userId = req.body.userId;
  UsersModel.findOne({userId:userId},function(err,doc){   //通过此model以用户名的条件 查询数据库中的匹配信息
    if(err){ 										//错误就返回给原post处（login.html) 状态码为500的错误
      res.send(500);
      console.log(err);
    }else if(!doc){ 								//查询不到用户名匹配信息，则用户名不存在
      req.session.error = '用户名不存在';
      res.send(404);							//	状态码返回404
      //res.redirect("/login");
    }else{
      if(req.body.password != doc.password){ 	//查询到匹配用户名的信息，但相应的password属性不匹配
        req.session.error = "密码错误";
        res.send(404);
        //res.redirect("/login");
      }else{ 									//信息匹配成功，则将此对象（匹配到的user) 赋给session.user  并返回成功
        req.session.user = doc;
        res.send(200);
        //res.redirect("/home");
      }
    }
  });
});

//logout
router.get("/logout",function(req,res){    // 到达 /logout 路径则登出， session中user,error对象置空，并重定向到根路径
  req.session.user = null;
  req.session.error = null;
  res.redirect("/");
});

module.exports = router;
