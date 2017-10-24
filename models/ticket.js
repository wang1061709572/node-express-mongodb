/**
 * Created by WCJ on 2016/4/17.
 */
var mongoose = require("mongoose");

//ticket data model车票数据模型
var TicketSchema = new mongoose.Schema({
    ticketDay   : { type:String,required:true },
    ticketTime  : { type:String,required:true },
    originplace : { type:String,required:true },
    destination : { type:String,required:true },
    ticketnum   : { type:Number,required:true },
    price       : { type:Number,required:true }
});

//静态方法
TicketSchema.statics = {
    fetch: function (cb) {
        return this
            .find({})
            .sort('ticketTime')
            .exec(cb)
    },
    findByTd: function (TicketDay,cb) {
        return this
            .findOne({TicketDay:TicketDay})
            .exec(cb)
    }
};

var TicketModel = mongoose.model("Ticketlist", TicketSchema);

module.exports = TicketModel;