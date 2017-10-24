/**
 * Created by WCJ on 2016/4/17.
 */
var mongoose = require('mongoose');
var UsersModel = require('../models/users.js');

mongoose.connect("mongodb://127.0.0.1:27017/GraduationDesign");

UsersModel.create({
        userId   :'1001',
        username :'管理员',
        password :'admin'
    },{
        userId  :'202006141401',
        username:'赵一',
        password:'wang1993',
        question:'你的名字是',
        answer  :'赵一'
    },
    function(err,cb){
        if(err){
            console.log('err' + err)
        }else{
            console.log(cb)
        }
    });