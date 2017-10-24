/**
 * Created by WCJ on 2016/4/19.
 */
$(function(){
    $(".btn").on("click",function(){
        var cap = $(this).attr("name");
        $(this).parent().parent().each(function(){
            var capul = $(this).attr("class");
            if(cap == capul) {
                var ticketId = $(this).children().eq(0).children().eq(0).val();
                var username = $("#username").text();
                var ticketDay = $(this).children().eq(0).children().eq(1).val();
                var ticketTime = $(this).children().eq(1).children().eq(0).val();
                var originplace = $(this).children().eq(2).children().eq(0).val();
                var destination = $(this).children().eq(3).children().eq(0).val();
                var userticketnum = $(this).children().eq(5).children().eq(0).val();
                var price = $(this).children().eq(6).children().eq(0).val();
                parseInt(price);
                //alert(username);
                //alert(ticketDay);
                //alert(ticketTime);
                //alert(originplace);
                //alert(destination);
                //alert(userticketnum);
                //alert(price);
                var data = {
                    "ticketId"    :ticketId,
                    "username"    :username,
                    "ticketDay"   :ticketDay,
                    "ticketTime"  :ticketTime,
                    "originplace" :originplace,
                    "destination" :destination,
                    "userticketnum":userticketnum,
                    "price"       :price
                };
                $.ajax({
                    url:'/users/booking/userticket',
                    type:'post',
                    data: data,
                    success: function(data,status){
                        if(status == 'success'){
                            location.href = 'selectpay';
                        }
                    },
                    error: function(data,status){
                        if(status == 'error'){
                            location.href = '/';
                        }
                    }
                });

            }
        });
    })
});