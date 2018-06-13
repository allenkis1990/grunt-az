require.config({
    paths: {
        jquery: 'jquery-1.9.1.min',
        angular: 'angular.min'
    }
});

require(["jquery","a1"],function($,a1){
    a1();

});
