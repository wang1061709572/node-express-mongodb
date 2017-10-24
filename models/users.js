/**
 * Created by WCJ on 2016/4/17.
 */
var mongoose = require("mongoose");

//student data model学生数据模型
var UsersSchema = new mongoose.Schema({
    userId   : { type:Number,required:true,default:0 },
    username : { type:String,required:true,default:0 },
    password : { type:String,required:true,default:0 },
    question : { type:String,required:true,default:0 },
    answer   : { type:String,required:true,default:0 },
    money    : { type:Number,required:true,default:50 },
    time     : { type:Date,default:Date.now()}
});

//静态方法
UsersSchema.statics = {
    fetch: function (cb) {
        return this
            .find({})
            .sort('time')
            .exec(cb)
    },
    findById: function (id,cb) {
        return this
            .findOne({_id:id})
            .exec(cb)
    }
};

var UsersModel = mongoose.model("userslist", UsersSchema);

module.exports = UsersModel;