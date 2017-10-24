/**
 * Created by WCJ on 2016/4/17.
 */
var mongoose = require('mongoose');
var StudentModel = require('../models/workers.js');

mongoose.connect("mongodb://127.0.0.1:27017/GraduationDesign");

StudentModel.create({
        workerId  :'20200101',
        username  :'赵一一',
        college    :'公共管理学院',
        mobile     :'18366661234',
        email      :'18366661234@163.con',
        money     : '50'
    },{
        workerId  :'20200102',
        username  :'周二二',
        college   :'经济学院',
        mobile    :'18388881234',
        email     :'18388881234@163.con',
        money     : '50'
    },{
        workerId  :'20200103',
        username  :'张三三',
        college   :'会计学院',
        mobile    :'18388886515',
        email     :'18388886515@163.con',
        money     : '50'
    },{
        workerId  :'20200104',
        username  :'李四四',
        college   :'管理科学与工程学院',
        mobile    :'18388884321',
        email     :'18388884321@163.con',
        money     : '50'
    },{
        workerId  :'20200105',
        username  :'王五五',
        college   :'外国语学院',
        mobile    :'18388887688',
        email     :'18388887688@163.con',
        money     : '50'
    },
    function(err,cb){
        if(err){
            console.log('err' + err)
        }else{
            console.log(cb)
        }
    }
);