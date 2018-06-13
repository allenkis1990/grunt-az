/**
 * Created by admin on 2017/1/19.
 */


var obj={
    navLi:$('.nav li'),
    bannerBtn:$('#banner-btn li'),
    bannerItem:$('.bannerItem'),
    bannerTxt:$('.banner-txt span'),
    bannerIndex:0,
    timePlay:null,
    bannerAutoTime:3000,
    banner:$('.banner'),
    tzTitBTn:$('.tz-tit a'),
    tzmain:$('.js-tzmain'),
    ksjsTit:$('#ksjs-tit a'),
    kejsMain:$('.kejs-main ul'),
    kejsIndex:0,
    kejsCount1:0,
    kejsCount2:0,
    kejsCount3:0,
    kejsPre:$('#kejs-pre'),
    kejsNext:$('#kejs-next'),
    search:$('#search'),
    searchInitTxt:'请您输入关键词'
};

/*搜索栏效果*/
obj.search.focus(function(){
    var $this=$(this);
    if($this.val()===obj.searchInitTxt){
        $this.val('');
    }
});

obj.search.blur(function(){
    var $this=$(this);
    if($this.val()===''){
        $this.val(obj.searchInitTxt);
    }
});


/*NAV效果*/
obj.navLi.hover(function(){
    var $this=$(this);
    $this.addClass('hover').siblings().removeClass('hover');
},function(){
    var $this=$(this);
    $this.removeClass('hover');
});

/*banner效果*/
obj.bannerBtn.click(function(){
    var $this=$(this);
    obj.bannerIndex=$this.index();
    $this.addClass('hover').siblings().removeClass('hover');
    obj.bannerItem.eq(obj.bannerIndex).stop(true,true).fadeIn().siblings('.bannerItem').stop(true,true).fadeOut();
    obj.bannerTxt.eq(obj.bannerIndex).show().siblings('.banner-txt span').hide();
});

obj.banner.hover(function(){
    clearInterval(obj.timePlay);
},function(){
    bannerAutoPlay();
});


bannerAutoPlay();
function bannerAutoPlay(){
    obj.timePlay=setInterval(function(){
        obj.bannerIndex++;
        if(obj.bannerIndex>obj.bannerBtn.length-1){
            obj.bannerIndex=0;
        }
        obj.bannerBtn.eq(obj.bannerIndex).addClass('hover').siblings().removeClass('hover');
        obj.bannerItem.eq(obj.bannerIndex).stop(true,true).fadeIn().siblings('.bannerItem').stop(true,true).fadeOut();
        obj.bannerTxt.eq(obj.bannerIndex).show().siblings('.banner-txt span').hide();
    },obj.bannerAutoTime);
}


obj.tzTitBTn.click(function(){
    var $this=$(this),index=$this.index();
    $this.addClass('hover').siblings().removeClass('hover');
    obj.tzmain.eq(index).show().siblings('.js-tzmain').hide();
});

obj.ksjsTit.click(function(){
    var $this=$(this),index=$this.index();
    obj.kejsIndex=index;
    $this.addClass('hover').siblings().removeClass('hover');
    obj.kejsMain.eq(index).show().siblings('.kejs-main ul').hide();
});

obj.kejsNext.click(function(){
    //alert(1);

    var count=0;
    var len=obj.kejsMain.eq(obj.kejsIndex).find('li').length;
    if(obj.kejsIndex===0){
        obj.kejsCount1++;

        if(obj.kejsCount1+3>=len){
            if(len-4<=0){
                obj.kejsCount1=0;
            }else{
                obj.kejsCount1=len-4;
            }
        }

        count=obj.kejsCount1;
    }
    if(obj.kejsIndex===1){
        obj.kejsCount2++;

        if(obj.kejsCount2+3>=len){
            if(len-4<=0){
                obj.kejsCount2=0;
            }else{
                obj.kejsCount2=len-4;
            }
        }

        count=obj.kejsCount2;
    }
    if(obj.kejsIndex===2){
        obj.kejsCount3++;


        if(obj.kejsCount3+3>=len){

            if(len-4<=0){
                obj.kejsCount3=0;
            }else{
                obj.kejsCount3=len-4;
            }

        }

        count=obj.kejsCount3;
    }
    //count++;
    obj.kejsMain.eq(obj.kejsIndex).stop(true,true).animate({'marginLeft':-281*count});
});

obj.kejsPre.click(function(){
    //alert(1);

    var count=0;
    if(obj.kejsIndex===0){
        obj.kejsCount1--;
        if(obj.kejsCount1<0){
            obj.kejsCount1=0;
        }
        count=obj.kejsCount1;
    }
    if(obj.kejsIndex===1){
        obj.kejsCount2--;
        if(obj.kejsCount2<0){
            obj.kejsCount2=0;
        }
        count=obj.kejsCount2;
    }
    if(obj.kejsIndex===2){
        obj.kejsCount3--;
        if(obj.kejsCount3<0){
            obj.kejsCount3=0;
        }
        count=obj.kejsCount3;
    }
    //count++;
    obj.kejsMain.eq(obj.kejsIndex).stop(true,true).animate({'marginLeft':-281*count});
});






