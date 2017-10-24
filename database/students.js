/**
 * Created by WCJ on 2016/4/17.
 */
var mongoose = require('mongoose');
var StudentModel = require('../models/students.js');

mongoose.connect("mongodb://127.0.0.1:27017/GraduationDesign");

StudentModel.create({
        studentId  :'202006141401',
        username:'赵一',
        college    :'管理科学与工程学院',
        mobile     :'18366666666',
        email      :'18366666666@163.con',
        money      : '50'
},{
        studentId  :'202006141402',
        username:'周二',
        college    :'工商管理学院',
        mobile     :'18366666688',
        email      :'18366666688@163.con',
        money      : '50'
    },{
        studentId  :'202006141403',
        username   :'张三',
        college    :'外国语学院',
        mobile     :'18366886666',
        email      :'18366886666@163.con',
        money      : '50'
    },{
        studentId  :'202006141404',
        username   :'李四',
        college    :'公共管理学院',
        mobile     :'18388888888',
        email      :'18388888888@163.con',
        money      : '50'
    },{
        studentId  :'202006141405',
        username   :'王五',
        college    :'金融学院',
        mobile     :'18366668888',
        email      :'18366668888@163.con',
        money      : '50'
    },
    function(err,cb){
    if(err){
        console.log('err' + err)
    }else{
        console.log(cb)
    }
});