$(".btn").click(function(){
    var jqXHR=$.ajax({   //直接把jqXHR付给ajax方法可以随便添加需要的内容
        type:"POST",
        url:"text.json",
        timeout:5000,
        /*beforeSend:function(){
          alert("555");
        },  这个是发送请求之前只能放在ajax方法里用*/
        //global:false,
       /*error:function(xhr,errorText,errorType){
              alert(errorType);
        },*/
        success:function(data,status,xhr){
            $(".odiv").html(data.age1);
        }
    },"json");



   /* jqXHR.success(function(data){
        alert(data[0].name);
    }).success(function(){
        alert(111);
    });

    jqXHR.success(function(data){
        alert(222);
    });   可连缀也可独立分开来很方便       */

    /*$.post("text.json",function(){

    }).success(function(){
        alert("sss");
    });   局部的错误方法   以后可能被废弃 取而代之的是done always fail*/


});



/*$(document).ajaxSend(function(){
    alert("111");
}).ajaxComplete(function(){
    alert("222");
}).ajaxSuccess(function(){
    alert("333");
}).ajaxError(function(){
    alert("444");
});*/

 /*$(document).ajaxError(function(e,xhr,setting,info){
        for(var i in e){
            document.write(i+"<br />");
        }
     alert(setting.url);
 });*/
/*$(document).ajaxStart(function(){
    $("span").show();
}).ajaxStop(function(){
   $("span").hide();
});*/
