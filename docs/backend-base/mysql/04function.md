# 04内置函数

函数是指一段可以被直接调用的程序或者代码

## 聚合函数

分组查询中，经常会用到聚合函数，常见的聚合函数有以下几种：

| 函数 | 说明 |
| --- | --- |
| count(字段) | 根据某个字段统计数量 |
| max(字段) | 某个字段为表中最大值的数据 |
| min(字段) | 某个字段为表中最小值的数据 |
| avg(字段) | 计算某个字段的平均值 |
| sum(字段) | 计算某个字段之和 |

## 字符串函数

| 函数 | 说明 |
| --- | --- |
| left(str,len) | 左边的len个字符 |
| right(str,len) | 右边的len个字符 |
| concat(S1,S2,...,Sn) | 字符串拼接 |
| lower(str) | 转换为小写字符 |
| upper(str) | 转换为大写字符 |
| ltrim(str) | 去除左边的空格 |
| rtrim(str) | 去除右边的空格 |
| trim(str) | 去除字符串两边的空格 |
| length(str) | 长度 |
| lpad(str,len,s) | 用s左填充str到长度len |
| rpad(str,len,s) | 用s右填充str到长度len |
| substring(str,from,len) | 从from截取字符串str的len个字符
| soundex() | 转换为语音值 |

## 日期和时间处理

日期格式为`YYYY-MM-DD`，时间格式为`HH:MM:SS`

**0 参数｜取当前时刻**
| 函数 | 说明 |
| --- | --- |
| curdate() | 当前日期，如 2026-10-31（同义 current_date） |
| curtime() | 当前时间，如 22:59:52（同义 current_time） |
| now() | 当前日期和时间，如 2026-10-31 22:59:52（同义 current_timestamp） |
| sysdate() | 实时时间，不受语句级快照影响 |
| utc_timestamp() | UTC 时间 |

**1 参数｜拆出日期/时间容器**
| 函数 | 说明 |
| --- | --- |
| date(expr) | 取日期部分，date('2020-12-12 22:23:12') → 2020-12-12 |
| time(expr) | 取时间部分，time('2020-12-12 22:23:12') → 22:23:12 |

**1 参数｜拆出数字（年→月→日→时→分→秒）**
| 函数 | 说明 |
| --- | --- |
| year(date) | 年份部分 |
| month(date) | 月份部分 |
| day(date) | 天数部分（等价 dayofmonth） |
| hour(date) | 小时部分 |
| minute(date) | 分钟部分 |
| second(date) | 秒部分 |
| quarter(date) | 季度（1~4） |
| week(date[, mode]) | 当年第几周 |
| dayofyear(date) | 一年中第几天 |
| microsecond(date) | 微秒部分 |

**1 参数｜星期与周（口径不同，注意区分）**
| 函数 | 说明 |
| --- | --- |
| dayofweek(date) | 1~7，**1=周日**、7=周六 |
| weekday(date) | 0~6，**0=周一**、6=周日 |
| dayname(date) | 星期英文名，如 saturday |
| week(date[, mode]) | 当年第几周，受 mode 影响 |

**2 参数｜运算与格式化**
| 函数 | 说明 |
| --- | --- |
| date_add(date, interval count unit) | 增加 count 个 unit，如 interval 1 month（unit 不加引号） |
| date_sub(date, interval count unit) | 减少 count 个 unit |
| addtime(expr1, expr2) | 增加一个时间，如 addtime(dt, '01:30:00') |
| subtime(expr1, expr2) | 减少一个时间 |
| datediff(date1, date2) | 相差天数，date1 - date2，只比较日期部分 |
| timediff(t1, t2) | 两个时间之差 |
| timestampdiff(unit, d1, d2) | 按指定粒度求差，unit 可为 second/minute/hour/day/month/year |
| date_format(date, format) | 格式化为字符串，如 '%Y-%m-%d' |
| str_to_date(str, format) | 字符串解析为日期，与上者互为反向 |
## 数值函数

| 函数 | 说明 |
| --- | --- |
| sin(x) | 计算数值x的正弦值，x需为弧度制数值 |
| cos(x) | 计算数值x的余弦值，x需为弧度制数值 |
| tan(x) | 计算数值x的正切值，x需为弧度制数值 |
| abs(x) | 计算数值x的绝对值，支持整数、浮点数等数值类型 |
| sqrt(x) | 计算非负数x的算术平方根，x需大于等于0 |
| mod(x, y) | 计算x除以y的余数（模运算），可处理整数和小数的取余需求 |
| floor(x) | 对数值x进行向下取整，返回不大于x的最大整数 |
| ceil(x) | 对数值x进行向上取整，返回不小于x的最小整数 |
| round(x[, y]) | 对数值x四舍五入，保留y位小数（y可选，默认0位，即取整） |
| exp(x) | 计算自然常数e的x次幂，即自然指数函数 |
| pi() | 获取圆周率π的近似值，可用于几何相关计算 |
| rand() | 生成一个[0,1)区间内的随机浮点数，每次调用返回不同值 |

## 流程函数

| 函数 | 说明 |
| --- | --- |
| if(value, t, f) | 如果value为true，则返回t，否则返回f |
| ifnull(value1,value2) | 如果value1不为空则返回，否则返回value2 |
| case when exp then res1,...else [default] end | 如果val1为true，则返回res1,..，否则返回default默认值，when和then可以有多个，以end结尾 |
| case exp when val1 then res1,...else [default] end | 如果exp等于val1，则返回res1,...，否则返回default默认值，when和then可以有多个，以end结尾 |
