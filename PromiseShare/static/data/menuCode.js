$.get('data/menu.json').success(function(data){
    let menuMain = $('.list-group');
    let menuList = data.info;
    let currentTit = 'Title';
    menuList.forEach(function(item){
        let currentStyle = 'active';
        let current = location.pathname===item.path?currentStyle:'';
        if(location.pathname===item.path){
            currentTit = item.name;
        }
        $('title').html(currentTit);
        let menuItem = '<a href="'+item.path+'" class="list-group-item '+current+'">'+item.name+'</a>';
        menuMain.append(menuItem);
    });
    function initMenuH(){
        let contentH = $('.col-md-10').height();
        let winH = $(window).height();
        var menuH =contentH>=winH?contentH:winH;
        $('.col-md-2').css('height',menuH);
    }
    initMenuH();
    $(window).resize(function(){
        initMenuH();
    });
});