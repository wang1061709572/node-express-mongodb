/**
 * Created by WCJ on 2016/4/17.
 */
var mongoose = require('mongoose');
var TicketModel = require('../models/ticket.js');

mongoose.connect("mongodb://127.0.0.1:27017/GraduationDesign");

TicketModel.create({
        ticketDay   :'2016-04-24',
        ticketTime  :'08:00:00',
        originplace :'明水校区',
        destination :'舜耕校区',
        ticketnum   :'50',
        price       :'10'
    },{
        ticketDay   :'2016-04-24',
        ticketTime  :'10:00:00',
        originplace :'明水校区',
        destination :'舜耕校区',
        ticketnum   :'50',
        price       :'10'
    },{
        ticketDay   :'2016-04-24',
        ticketTime  :'13:00:00',
        originplace :'明水校区',
        destination :'舜耕校区',
        ticketnum   :'50',
        price       :'10'
    },{
        ticketDay   :'2016-04-24',
        ticketTime  :'15:00:00',
        originplace :'明水校区',
        destination :'舜耕校区',
        ticketnum   :'50',
        price       :'10'
    },
    {
        ticketDay   :'2016-04-25',
        ticketTime  :'08:00:00',
        originplace :'明水校区',
        destination :'舜耕校区',
        ticketnum   :'50',
        price       :'10'
    },
    {
        ticketDay   :'2016-04-25',
        ticketTime  :'10:00:00',
        originplace :'明水校区',
        destination :'舜耕校区',
        ticketnum   :'50',
        price       :'10'
    },
    {
        ticketDay   :'2016-04-25',
        ticketTime  :'13:00:00',
        originplace :'明水校区',
        destination :'舜耕校区',
        ticketnum   :'50',
        price       :'10'
    },
    {
        ticketDay   :'2016-04-25',
        ticketTime  :'15:00:00',
        originplace :'明水校区',
        destination :'舜耕校区',
        ticketnum   :'50',
        price       :'10'
    },{
        ticketDay   :'2016-04-26',
        ticketTime  :'08:00:00',
        originplace :'明水校区',
        destination :'舜耕校区',
        ticketnum   :'50',
        price       :'10'
    },{
        ticketDay   :'2016-04-26',
        ticketTime  :'10:00:00',
        originplace :'明水校区',
        destination :'舜耕校区',
        ticketnum   :'50',
        price       :'10'
    },{
        ticketDay   :'2016-04-26',
        ticketTime  :'13:00:00',
        originplace :'明水校区',
        destination :'舜耕校区',
        ticketnum   :'50',
        price       :'10'
    },{
        ticketDay   :'2016-04-26',
        ticketTime  :'15:00:00',
        originplace :'明水校区',
        destination :'舜耕校区',
        ticketnum   :'50',
        price       :'10'
    },
    function(err,cb){
        if(err){
            console.log('err' + err)
        }else{
            console.log(cb)
        }
    });