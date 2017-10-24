/**
 * Created by WCJ on 2016/4/17.
 */
var mongoose = require("mongoose");

//student data model学生数据模型
var StudentSchema = new mongoose.Schema({
    studentId   : { type:Number,required:true },
    username    : { type:String,required:true },
    college     : { type:String,required:true },
    mobile      : { type:String,required:true },
    email       : { type:String,required:true },
    money       : { type:Number,required:true,default:50},
    time        : { type:Date, default:Date.now()}
});

//静态方法
StudentSchema.statics = {
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

var StudentModel = mongoose.model("studentlist", StudentSchema);

module.exports = StudentModel;