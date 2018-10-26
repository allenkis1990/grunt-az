[TOC]

##门户首页


###1根据门户地区ID获取单位信息
**URL web/portal/index/getUnitInfoByRegion**


**支持格式**
`json`

**HTTP请求方式**
`GET`

**请求参数**
```
{region:''}
```

**返回结果**
未执行预期的业务逻辑而抛出的`BasicRuntimeException`的响应格式。
其中`code`值为`400`为非受检异常
其他的业务异常的`code`为自定义
```
{
	status: false,
    code: 400,
    info: '错误提示语'
}
```

请求响应达到预期的数据格式。
```
{
	status: true,
    code: 200,
    info: true;
}
```


其中`info`中的集合元素需提供如下属性（从产品原型截图即可）

![](images/门户首页培训地区.png)


`info`集合里的元素的`Java`对象是（此处由服务实现者补充）
```
{
    code:'' //组织机构代码
	domain:''//单位域名
	name:''//私教机构名称
	platformName:''//门户展示名称
	unitId:''//单位ID
}
```


###2获取本月累计选课学时
**URL**
`web/portal/indexStatistic/getCurrentMonthTotalChooseCoursePeriod`

**支持格式**
`json`

**HTTP请求方式**
`GET`

**请求参数**
```
{ }
```

**返回结果**
未执行预期的业务逻辑而抛出的`BasicRuntimeException`的响应格式。
其中`code`值为`400`为非受检异常
其他的业务异常的`code`为自定义
```
{
	status: false,
    code: 400,
    info: '错误提示语'
}
```

请求响应达到预期的数据格式。
```
{
	status: true,
    code: 200,
    info: 10086;
}
```


其中`info`中的集合元素需提供如下属性（从产品原型截图即可）

![](images/本月累计选课学时.png)



###3获取精品课程列表
**URL**
`web/portal/index/getPreferenceCoursePage
**支持格式**
`json`

**HTTP请求方式**
`GET`

**请求参数**
```
{
	pageNo:"第几页",
	pageSize:"每页数量",
    optId:"精品课程类别",
	unitId:"单位id"
}
```

**返回结果**
未执行预期的业务逻辑而抛出的`BasicRuntimeException`的响应格式。
其中`code`值为`400`为非受检异常
其他的业务异常的`code`为自定义
```
{
	status: false,
    code: 400,
    info: '错误提示语'
}
```

请求响应达到预期的数据格式。
```
{
	status: true,
    code: 200,
    info: true;
}
```


其中`info`中的集合元素需提供如下属性（从产品原型截图即可）

![](images/精品课程.png)

```
`info`集合里的元素的`Java`对象是（此处由服务实现者补充）
{
	opcId:"优选课程主键Id",
	cseId:"课程id",
	courseName:"课程名称",
	imagePath:"",
    教师姓名,
    credit:"学时"
}
```


###4获取专题培训

![](images/门户专题培训.png)
这里是静态页面


###5获取名师风采列表
**URL**


**支持格式**
`json`

**HTTP请求方式**
`GET`

**请求参数**
```
{ }
```

**返回结果**
未执行预期的业务逻辑而抛出的`BasicRuntimeException`的响应格式。
其中`code`值为`400`为非受检异常
其他的业务异常的`code`为自定义
```
{
	status: false,
    code: 400,
    info: '错误提示语'
}
```

请求响应达到预期的数据格式。
```
{
	status: true,
    code: 200,
    info: true;
}
```


其中`info`中的集合元素需提供如下属性（从产品原型截图即可）

![](images/门户名师风采.png)


`info`集合里的元素的`Java`对象是（此处由服务实现者补充）
{	}

###6获取课程排行
**URL**

`web/portal/indexStatistic/getTotalChooseCourseRankings`

**支持格式**
`json`

**HTTP请求方式**
`GET`

**请求参数**
```
{
	sum:0
}
```

**返回结果**
未执行预期的业务逻辑而抛出的`BasicRuntimeException`的响应格式。
其中`code`值为`400`为非受检异常
其他的业务异常的`code`为自定义
```
{
	status: false,
    code: 400,
    info: '错误提示语'
}
```

请求响应达到预期的数据格式。
```
{
	status: true,
    code: 200,
    info: [];
}
```


其中`info`中的集合元素需提供如下属性（从产品原型截图即可）

![](images/课程排行.png)


`info`集合里的元素的`Java`对象是（此处由服务实现者补充）
{
	courseId:"", // 课程ID
	courseName:"", // 课程名字
	courseProviderId:"", // 课程提供商ID
	period:, // 学时
	courseProviderName:"", // 该课程提供商名字
	coursePoolId:"", // 该课程所属课程包ID
	coursePoolName:"", // 该课程所属课程包名称
	subjectId:"", // 该课程所属科目ID
	subjectName:"", // 该课程所属科目名字
	statisticTimeId:"", // 所属年度ID
	statisticTime:"", // 所属年度
	purchaseUserCount:, // 累计选课次数
	quitUserCount:, // 退课次数
	effectiveUserCount: // 净开通
}


###7获取最新完成课程学习的学员
**URL**

`web/portal/indexStatistic/getLatestPassUserCourseInfos`

**支持格式**
`json`

**HTTP请求方式**
`GET`

**请求参数**
```
{ 
	sum:5
}
```

**返回结果**
未执行预期的业务逻辑而抛出的`BasicRuntimeException`的响应格式。
其中`code`值为`400`为非受检异常
其他的业务异常的`code`为自定义
```
{
	status: false,
    code: 400,
    info: '错误提示语'
}
```

请求响应达到预期的数据格式。
```
{
	status: true,
    code: 200,
    info: true;
}
```


其中`info`中的集合元素需提供如下属性（从产品原型截图即可）

![](images/最新完成课程学习的学员.png)


`info`集合里的元素的`Java`对象是（此处由服务实现者补充）
{
	name:"",
	courseName:"",
	PassTime:""
}

###8获取所有启用地区单位信息
**URL web/portal/index/getAreaUnitInfoList**


**支持格式**
`json`

**HTTP请求方式**
`GET`

**请求参数**
```
{}
```

**返回结果**
未执行预期的业务逻辑而抛出的`BasicRuntimeException`的响应格式。
其中`code`值为`400`为非受检异常
其他的业务异常的`code`为自定义
```
{
	status: false,
    code: 400,
    info: '错误提示语'
}
```

请求响应达到预期的数据格式。
```
{
	status: true,
    code: 200,
    info: true;
}
```


其中`info`中的集合元素需提供如下属性（从产品原型截图即可）

![](images/门户首页培训地区.png)


`info`集合里的元素的`Java`对象是（此处由服务实现者补充）
```
{
    unitName:'' //单位名称
	unitId:''//单位ID
	areaName:''//所属地区名称
	domain:''//域名
	photoUrl:''//门户轮播图
}
```