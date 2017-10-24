/**
 * Created by WCJ on 2016/4/17.
 */
var mongoose = require("mongoose");

//worker data model工人数据模型
var WorkerSchema = new mongoose.Schema({
    workerId   : { type:Number,required:true },
    username   : { type:String,required:true },
    college    : { type:String,required:true },
    mobile     : { type:String,required:true },
    email      : { type:String,required:true },
    money      : { type:Number,required:true,default:50},
    time       : { type:Date, default:Date.now() }
});

//静态方法
WorkerSchema.statics = {
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

var WorkerModel = mongoose.model("workerlist", WorkerSchema);

module.exports = WorkerModel;