var app=angular.module("myapp",["ui.router"]);

app.config(function($stateProvider,$urlRouterProvider){
    //$urlRouterProvider.when('', '/index');
    $urlRouterProvider.otherwise("/index");
    $stateProvider.state("index",{
        //abstract: true, 节点永远不能被激活 但是子节点可以被激活
        resolve:{ //相当于依赖注入
            resA:  function(){
                return {'value': 'A'};
            }
        },
        url:"/index",
        views:{
            "haha":{
                templateUrl:"temp/content.html",

                controller:"indexCtrl"



                /*templateUrl: function (stateParams){
                    return 'temp/content.html';
                    console.log(stateParams);
                }*/


            },
            /*"left@index":{
                templateUrl:"temp/left.html",
                controller:"listCtrl"
            },
            "right@index":{
                templateUrl:"temp/right.html"
            }*/
            "top@index":{
             templateUrl:"temp/top.html"
             },
            "main@index":{
                templateUrl:"temp/main.html"
            }
        },
        data: {
            customData1: 5,
            customData2: "blue"
        }

    }).state("index.listdetail",{

                url:"/listdetail",
                /*views:{
                    "main@index":{
                        templateUrl:"temp/detail.html"
                    }
                }*/

                templateUrl:"temp/detail.html",
                controller:function($scope,$state){
                    $scope.fn=function(){
                        $state.go("index.listdetail.listdetail2",{id:2,type:3});
                        //$state.go('page2', {data: 'aaa'});
                    }
                }





    }).state("index.listdetail.listdetail2",{ //state("index.listdetail2")这种是跳去单页面
        url:"/listdetail2/:id/:type?myParam1&myParam2",//url:"/listdetail2?myParam1&myParam2",
        cache:true,
        views:{
            "":{
                templateUrl:"temp/detail2.html",
                controller:"detailCtrl"
            }
        }
    });
});

app.controller("listCtrl",function($scope){
    $scope.listarr=[
        {tit:"allenkis",id:1},
        {tit:"wuye",id:2},
        {tit:"xinye",id:3},
        {tit:"lhh",id:4},
        {tit:"aonikexiy",id:5}
    ];
});
app.controller("indexCtrl",function($scope,$state,resA){
    $scope.val=resA.value;
    console.log($scope.val);

        console.log($state.current.data.customData1+1)



});
app.controller("detailCtrl",function($scope,$stateParams,$location,$state){
//console.log($stateParams);
    $scope.absUrl=$location.absUrl();
    $scope.url=$location.url();
    $scope.path=$location.path();
    $scope.protocol=$location.protocol();
    $scope.host=$location.host();
    $scope.hash=$location.hash();
    $scope.port=$location.port();
    $scope.search=$location.search();

    $scope.fn=function(){
        $state.go("index.listdetail.listdetail2",{id:3,type:4,myParam1:5,myParam2:6},{reload:true});
        $location.search({"name":"allenkis"});
    };

    /*console.log($scope.absUrl);//http://localhost:63342/grunt-az/html/ui-router.html#/index/listdetail/listdetail2/3/4?myParam1=5&myParam2=6
    console.log($scope.url);///index/listdetail/listdetail2/3/4?myParam1=5&myParam2=6
    console.log($scope.path);///index/listdetail/listdetail2/3/4
    console.log($scope.protocol);//http
    console.log($scope.host);//localhost
    console.log($scope.hash);
    console.log($scope.port);//63342
    console.log($scope.search);//{myParam1:5,myParam2:6}*/
    //$state.$current.name = 'index.listdetail.listdetail2';
/*console.log($state.includes("*.*.listdetail2")); //包含  true
console.log($state.is("index.listdetail.listdetail2"));//全等  true
    $state.includes("contacts"); // returns true
    $state.includes("contacts.details"); // returns true
    $state.includes("contacts.details.item"); // returns true
    $state.includes("contacts.list"); // returns false
    $state.includes("about"); // returns false*/
$location.url("/index1/listdetail/listdetail2/3/4?myParam1=5&myParam2=6");
    console.log($location.url());


});