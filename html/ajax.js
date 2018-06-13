// JavaScript Document
function ajax(ulr,fun){
//1.打开浏览器
	var oAja=null;
		//XMLHttpRequest()兼容问题IE7+，firfox,opera，webkit
	//var oAja=new XMLHttpRequest();
		//ActiveXobject("Microsoft.XMLHTTP") IE6-
	//var oAja=new ActiveXObject("Microsoft.XMLHTTP");
	try
	{
		oAja=new XMLHttpRequest();
	}catch(e)
	{
		oAja=new ActiveXObject("Microsoft.XMLHTTP");
	}
	//2.在地址栏输入地址
		//open(传值方式,访问路径,是否异步)
	oAja.open('get',ulr+'?t='+Math.random(),true);
	//3.确认
	oAja.send();
	//4.等待给你返回内容
		//on ready state change
		//当  准备	状态		改变
	//readyState 准备状态
		  /*0.(初始化)准备浏览器
			1.(载入)调用send(),访问
			2.(载入完毕)接受内容完成
			3.(解析)解析数据内容
			4.(完成)可调用*/
			//oAja.responseText
	oAja.onreadystatechange=function(){
		if(oAja.readyState==4)
		{
			if(oAja.status==200)
			{
				fun(oAja.responseText);
			}else{
				alert("您的访问出现了错误");
			}
		}	
	}
}