# MySQL语法

## DDL语句

数据库定义语言，用于创建和删除数据库、表、字段

### 数据库操作

- 查询所有数据库: show databases
- 查询当前使用的数据库：select database()
- 创建数据库：create database [if not exists] 数据库名 [default charset 字符集]
- 删除数据库：drop database [if exists] 数据库名
- 使用数据库：use 数据库名

### 表操作

- 创建表：create table 表名(字段1 字段1类型 [约束] [comment  字段1注释 ],字段2  字段2类型 [约束]  [comment  字段2注释 ],......字段n  字段n类型 [约束]  [comment  字段n注释 ]) [ comment  表注释 ] ;
- 创建包含外键的表：create table (字段名 字段类型 字段约束 字段注释, ..., [constraint] [外键名称] foreign key (外键字段名) references 主表 主表(字段名))
- 删除表：drop table [if exists] 表名;
- 修改表名: rename table 表名 to 新表名;
- 查询表结构：desc 表名;
- 查询所有的表: show tables;
- 查询建表语句：show create table 表名;

### 字段操作

- 添加字段：alter table 表名 add 字段名称 字段类型(长度) [comment 注释]  [约束]
- 添加字段外键约束： alter table 表名 add [constraint] [外键名称] foreign key (外键字段名) references 主表 主表(字段名))
- 修改字段类型：alter table 表名 modify 字段名称 字段类型(长度) [comment 注释]  [约束]
- 修改字段名称和类型：alter table 表名 change 旧名称字段 新名称字段 字段类型(长度) [comment 注释]  [约束]
- 删除字段：alter table 表名 drop column 字段名称
- 删除外键：alter table 表名 drop foreign key 字段名称

### 字段约束

字段约束用于保证表中字段数据的正确性和完整性，是作用于字段的规则

- 默认约束 default：如果没有指定字段的值，则使用默认值
- 非空约束 not null：存储在表中的字段数据不能为null
- 唯一约束 unique：存储在表中的字段数据必须唯一，不能重复
- 主键约束 primary key：存储在表中的字段数据必须唯一且不能重复，并且不能为null
- 自增约束 auto_increment：字段值自动增长
- 外键约束 foreign key：让两张表建立联系，从而保证数据的完整性和一致性

## DML语句

数据库操作语句，用于对数据的增删改

- 添加表指定字段数据：insert into 表名(字段1,字段2,字段3) values（值1,值2,值3)\[,(值1,值2,值3)]
- 添加表所有字段数据：insert into 表名 values(值1,值2,值3,...),(值1,值2,值3,...)
- 修改表指定字段数据：update 表名 set 字段1=值1,字段2=值2,字段3=值3 [where 条件]
- 删除表指定字段数据：delete from 表名 [where 条件]

## DQL语句

### 基本查询

1. 查询所有字段：select * from 表名
2. 查询多个字段：select 字段1,字段2[,...] from 表名
3. 查询后设置别名 select 字段1 [as] 字段1别名,字段2 from 表名
4. 查询后去除重复值 select distinct 字段列表 from 表名

### 条件查询

基本语法

```bash
select 字段列表 from 表名 where 条件列表
```

运算符：条件列表中的条件运算符主要分为比较运算符和逻辑运算符

比较运算符：

- \>, >=, \<, \<=, =, !=：做相等和大小判断
- between A and B：在A与B的这个范围之内
- in (...)：值为in后面的列表之一
- like 占位符：模糊匹配，_匹配单个字符；%匹配任意个字符，包括0个；[] 可以匹配集合内的字符,用脱字符 ^ 可以对其进行否定
- is null：值为null，不能使用`=null`
- is not null：值不为null

逻辑运算符：

- and或者&&：逻辑与，同时满足
- or或者||；逻辑或，满足其中一个
- not或者!：逻辑非，不满足条件

### 分组查询

分组查询语法：select 字段列表 from 表名 [where 条件列表] group by 分组字段名 [having 分组后过滤条件]

示例：select gender,count("date") as "date_count" from user where date <= "2021-12-21" group by date having count("date") > 10

where与having的区别：

- where是在分组之前使用，是对分组前的数据进行过滤，符合条件的才参与分组；having是对分组后的数据进行过滤
- where不能对聚合函数进行判断，having可以

```bash
聚合函数：将一列的数据作为一个整体，进行纵向计算。进行计算时，所有的null值不参与计算
- count：统计查询结果的数量
- min：统计某一列的最小值
- max：统计某一列的最大值
- avg：统计某一列的平均值
- sum：统计某一列的总和
```

### 排序查询

排序查询，需要使用order by，支持两种排序方式，asc升序，desc降序，如果不写，默认为asc

基本语法：select 字段列表 from 表名 [where 条件列表] [group by 分组字段名] [having 分组后过滤条件] order by 排序字段1 [asc/desc],排序字段2 [asc/desc]...

### 分页查询

分页查询中，需要使用limit，数据开始索引从0开始

基本语法为：select 字段列表 from 表名 [where 筛选条件] limit 数据开始索引，单页数量

### 执行顺序

DQL中，语句的执行顺序为

from -> where -> group by -> having -> select -> order by -> limit

## DCL语句

数据库控制语言，用于操作数据库的用户及数据库访问权限

### 用户管理

查询用户

```bash
use mysql
select * from user
```

创建用户

```bash
create user '用户名'@'主机名' identified by '密码'
create user '用户名'@'%' identified by '密码' # 任意主机都可以访问
```

修改密码

```bash
alter user '用户名'@'主机名' identified with mysql_native_password by "密码"
```

删除用户

```bash
drop user '用户名'@'主机名'
```

### 权限控制

mysql中定义了很多种权限，常用的有以下几种：

- ALL：所有权限
- SELECT：数据查询权限
- INSERT：数据插入权限
- UPDATE：数据更新权限
- DELETE：数据删除权限
- CREATE：创建数据库、表的权限
- ALTER：修改表的权限
- DROP：删除数据库、表、视图的权限

查询用户拥有的权限

```bash
show grants for '用户名'@'主机名'
```

授予用户权限

```bash
grant 权限列表 on 数据库名.表名 to '用户名'@'主机名'
```

删除用户权限

```bash
revoke 权限列表 on 数据库名.表名 from '用户名'@'主机名'
```
