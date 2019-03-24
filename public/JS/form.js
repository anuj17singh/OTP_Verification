var enable = function(){
    $("#submitNumber").prop('disabled',false); 
    $(".alert").html("Did not recieve OTP? Resend OTP")
   };

function submitNumber()
{
    var num=$("#phoneNumber").val();
    var regex=/^[789][0-9]{9}$/;
    if(num === undefined || num === null || num === "")
    {
        $(".alert").css("display","block");
        $(".alert").html("Enter a valid 10 digit number");
    }
    else if(!num.match(regex))
    {
        $(".alert").css("display","block");
        $(".alert").html("Enter a valid 10 digit number");
    }
    else
    {
        $(".alert").css("display","none");
        $.ajax({
            type: "POST",
            url: "/submitNumber",
            data: {number:num} ,
            success: function(){
                $(".alert").css("display","block");
                $(".alert").html("OTP sent! Enter OTP to complete verification. (Resend only after 1 minute)");
                $("#form2").css("display","block");
                $("#submitNumber").prop('disabled',true);
                setTimeout(enable,60000);
            }        
        });
    }
}

$("#submitNumber").click(function(){
    submitNumber();
});



