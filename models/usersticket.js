/**
 * Created by WCJ on 2016/4/17.
 */
var mongoose = require("mongoose");

//ticket data model车票数据模型
var UserticketSchema = new mongoose.Schema({
    username      : { type:String,required:true,default:0 },
    ticketDay     : { type:String,required:true,default:0 },
    ticketTime    : { type:String,required:true,default:0 },
    originplace   : { type:String,required:true,default:0 },
    destination   : { type:String,required:true,default:0 },
    userticketnum : { type:Number,required:true,default:0 },
    price         : { type:Number,required:true,default:0 }
});

//静态方法
UserticketSchema.statics = {
    fetch: function (cb) {
        return this
            .find({})
            .exec(cb)
    },
    findById: function (id,cb) {
        return this
            .findOne({_id:id})
            .exec(cb)
    }
};

var UserticketModel = mongoose.model("userticketlist", UserticketSchema);

module.exports = UserticketModel;