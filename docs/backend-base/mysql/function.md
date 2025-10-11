# MySQL中的函数

函数是指一段可以被直接调用的程序或者代码

## 聚合函数

分组查询中，经常会用到聚合函数，常见的聚合函数有以下几种：

- count(字段/*)：根据某个字段统计数量
- max(字段)：某个字段为表中最大值的数据
- min(字段)：某个字段为表中最小值的数据
- avg(字段)：计算某个字段的平均值
- sum(字段)：计算某个字段之和

## 字符串函数

- LEFT(str,len)：左边的len个字符
- RIGHT(str,len)：右边的len个字符
- CONCAT(S1,S2,...,Sn)：字符串拼接
- LOWER(str)：转换为小写字符
- UPPER(str)：转换为大写字符
- LTRIM(str)：去除左边的空格
- RTRIM(str)：去除右边的空格
- TRIM(str)：去除字符串两边的空格
- LENGTH(str)：长度
- LPAD(str,len,s)：用s左填充str到长度len
- RPAD(str,len,s)：用s右填充str到长度len
- SUBSTRING(str,from,len)：从str截取字符串str的len个字符
- OUNDEX()：转换为语音值

## 日期和时间处理

日期格式为`YYYY-MM-DD`，时间格式为`HH:MM:SS`

- CurDate()：返回当前日期
- CurTime()：返回当前时间
- NOW()：当前的日期和时间
- date_add(date,interval count type)：将日期增加count个type
- Date_Format(date,format)：返回一个格式化的日期或时间串
- DateDiff(date1, date2)：计算两个日期相差的天数，date1减date2
- AddTime()：增加一个时间(时、分)等
- Date('2020-12-12 22:23:12')：返回日期时间的日期部分
- DayOfWeek(date)：对于一个日期，返回对应的星期几
- Year(date)：返回一个日期的年份部分
- Month(date)：返回一个日期的月份部分
- Day(date)：返回一个日期的天数部分
- Hour(date)：返回一个时间的小时部分
- Minute(date)：返回一个时间的分钟部分
- Second()：返回一个时间的秒部分
- Time()：返回一个日期时间的时间部分

## 数值函数

- SIN()：正弦
- COS()：余弦
- TAN()：正切
- ABS()：绝对值
- SQRT()：平方根
- MOD(x, y)：取x/y的模(余数)
- FLOOR(X)：向下取整
- CEIL(x)：向上取整
- ROUND(x, y)：求参数x的四舍五入值，保留y位小数
- EXP()：指数
- PI()：圆周率
- RAND()：0-1的随机数

## 流程函数

- if(value, t, f)：如果value为true，则返回t，否则返回f
- ifnull(value1,value2)：如果value1不为空则返回，否则返回value2
- case when exp then res1,...else [default] end：如果val1为true，则返回res1,..，否则返回default默认值，when和then可以有多个，以end结尾
- case exp when val1 then res1,...else [default] end：如果exp等于val1，则返回res1,...，否则返回default默认值，when和then可以有多个，以end结尾
