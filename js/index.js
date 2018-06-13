$(window).scroll(function(){
    var top=$(this).scrollTop();
    if(top>400){
        $(".return-top").show();
    }else{
        $(".return-top").hide();
    }
});

$(".return-top").click(function(){
    $("html,body").animate({scrollTop:0},10);
});
$(".return-top").hover(function(){
    $(this).css("background-position","0px -54px");
},function(){
    $(this).css("background-position","0px 0px");
});
var left1=$(".nav-list").offset().left;
//alert(left1);
var left2=0;
$(".nav-list a").hover(function(){
    var w=$(this).width()+50;
  left2=$(this).offset().left;
    var left3=left2-left1;
    $(".short-line").stop().animate({"left":left3,"width":w});

});


