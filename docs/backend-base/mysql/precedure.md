# 存储过程

## 定义

存储过程是事先经过编译并存储在数据库中的一段 SQL 语句的集合，调用存储过程可以简化应用开发人员的很多工作，减少数据在数据库和应用服务器之间的传输，对于提高数据处理的效率是有好处的。

存储过程思想上很简单，就是数据库 SQL 语言层面的代码封装与重用

## 特点

封装，复用：可以把某一业务SQL封装在存储过程中，需要用到的时候直接调用即可

可以接收参数，也可以返回数据：再存储过程中，可以传递参数，也可以接收返回值

减少网络交互，效率提升：如果涉及到多条SQL，每执行一次都是一次网络传输。 而如果封装在存储过程中，我们只需要网络交互一次可能就可以了

## 语法

1. 创建

```sql
CREATE PROCEDURE 存储过程名称 ([ 参数列表 ])
BEGIN
 -- SQL语句
END ;


# 在命令行中，执行创建存储过程的SQL时，需要通过关键字 delimiter 指定SQL语句的结束符

delimiter $$

CREATE PROCEDURE 存储过程名称 ([ 参数列表 ])
BEGIN
 -- SQL语句
END$$
```

2. 调用

```sql
CALL 储过程 ([ 参数 ]);
```

3. 查看

```sql
SELECT * FROM INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_SCHEMA = 'xxx'; -- 查询指定数据库的存储过程及状态信息
SHOW CREATE PROCEDURE 存储过程名称 ; -- 查询某个存储过程的定义
```

4. 删除

```sql
DROP PROCEDURE [ IF EXISTS ] 存储过程名称;
```

## 变量

在MySQL中变量分为三种类型: 系统变量、用户定义变量、局部变量

### 系统变量

系统变量 是MySQL服务器提供，不是用户定义的，属于服务器层面。分为全局变量（GLOBAL）、会话变量（SESSION）

全局变量(GLOBAL): 针对于所有的会话

会话变量(SESSION): 针对于单个会话，在另外一个会话窗口就不生效了

如果没有指定SESSION/GLOBAL，默认是SESSION，会话变量

查看系统变量：

```sql
SHOW [ SESSION | GLOBAL ] VARIABLES ; -- 查看所有系统变量
SHOW [ SESSION | GLOBAL ] VARIABLES LIKE '......'; -- 可以通过LIKE模糊匹配方式查找变量
SELECT @@[SESSION | GLOBAL].系统变量名; -- 查看指定变量的值
```

设置系统变量:

```sql
SET [ SESSION | GLOBAL ] 系统变量名 = 值 ;
SET @@[SESSION | GLOBAL].系统变量名 = 值 ;
```

mysql服务重新启动之后，所设置的全局参数会失效，要想不失效，可以在 /etc/my.cnf 中配置

### 用户定义变量

用户定义变量 是用户根据需要自己定义的变量，用户变量不用提前声明，在用的时候直接用 "@变量名" 使用就可以。其作用域为当前连接

设置用户定义变量：

```sql
SET @var_name = expr [, @var_name = expr] ... ; 
SET @var_name := expr [, @var_name := expr] ... ;

SELECT @var_name := expr [, @var_name := expr] ... ; 
SELECT 字段名 INTO @var_name FROM 表名;
```

查看用户定义变量：

```sql
SELECT @var_name;
```

> 用户定义的变量无需对其进行声明或初始化，只不过获取到的值为NULL

### 局部变量

局部变量 是根据需要定义的在局部生效的变量，访问之前，需要DECLARE声明。可用作存储过程内的局部变量和输入参数，局部变量的范围是在其内声明的BEGIN ... END块

声明局部变量：

```sql
DECLARE 变量名 变量类型 [DEFAULT ... ] ;
```

> 变量类型就是数据库字段类型：INT、BIGINT、CHAR、VARCHAR、DATE、TIME等

赋值局部变量：

```sql
SET 变量名 = 值 ;
SET 变量名 := 值 ;
SELECT 字段名 INTO 变量名 FROM 表名 ... 
```

## if判断

if 用于做条件判断，具体的语法结构为：

```sql
IF 条件1 THEN 
 .....
ELSEIF 条件2 THEN -- 可选
 .....
ELSE -- 可选
 .....
END IF;
```

在if条件判断的结构中，ELSE IF 结构可以有多个，也可以没有。 ELSE结构可以有，也可以没有

## case

语法1：

```sql
CASE case_value
 WHEN when_value1 THEN statement_list1
 [ WHEN when_value2 THEN statement_list2] ...
 [ ELSE statement_list ]
END CASE;
```

语法2：

```sql
CASE
 WHEN search_condition1 THEN statement_list1
 [WHEN search_condition2 THEN statement_list2] ...
 [ELSE statement_list]
END CASE;
```

## 循环

### while循环

while 循环是有条件的循环控制语句。满足条件后，再执行循环体中的SQL语句

```sql
WHILE 条件 DO
 SQL逻辑...
END WHILE;
```

### repeat循环

repeat是有条件的循环控制语句, 当满足until声明的条件的时候，则退出循环

```sql
REPEAT
 SQL逻辑... 
 UNTIL 条件
END REPEAT;
```

### loop循环

LOOP 实现简单的循环，如果不在SQL逻辑中增加退出循环的条件，可以用其来实现简单的死循环

```sql
[begin_label:] LOOP
 SQL逻辑... 
END LOOP [end_label];
```

LOOP可以配合一下两个语句使用：

- LEAVE ：配合循环使用，退出循环。
- ITERATE：必须用在循环中，作用是跳过当前循环剩下的语句，直接进入下一次循环

```sql
LEAVE label; -- 退出指定标记的循环体
ITERATE label; -- 直接进入下一次循环
```

## 游标

游标（CURSOR）是用来存储查询结果集的数据类型 , 在存储过程和函数中可以使用游标对结果集进行循环的处理。游标的使用包括游标的声明、OPEN、FETCH 和 CLOSE

声明游标：

```sql
DECLARE 游标名称 CURSOR FOR 查询语句
```

打开游标:

```sql
OPEN 游标名称
```

获取游标记录:

```sql
FETCH 游标名称 INTO 变量 [, 变量 ]
```

关闭游标:

```sql
CLOSE 游标名称
```

### 条件处理程序

条件处理程序（Handler）可以用来定义在流程控制结构执行过程中遇到问题时相应的处理步骤。具体语法为：

```sql
DECLARE handler_action HANDLER FOR condition_value [, condition_value] ... statement ;

handler_action 的取值： 
 CONTINUE: 继续执行当前程序
 EXIT: 终止执行当前程序
 
condition_value 的取值： 
 SQLSTATE: 状态码，如 02000
 SQLWARNING: 所有以01开头的SQLSTATE代码的简写
 NOT FOUND: 所有以02开头的SQLSTATE代码的简写
 SQLEXCEPTION: 所有没有被SQLWARNING 或 NOT FOUND捕获的SQLSTATE代码的简写
 ```

## 参数

参数的类型，主要分为以下三种：IN、OUT、INOUT

|类型 |含义| 备注|
|---- |----| ----|
|IN |该类参数作为输入，也就是需要调用时传入值| 默认|
|OUT| 该类参数作为输出，也就是该参数可以作为返回值|
|INOUT |既可以作为输入参数，也可以作为输出参数 |

用法：

```sql
CREATE PROCEDURE 存储过程名称 ([ IN/OUT/INOUT 参数名 参数类型 ])
BEGIN
 -- SQL语句
END ;
```

## 存储函数

存储函数是有返回值的存储过程，存储函数的参数只能是IN类型的

```sql
CREATE FUNCTION 存储函数名称 ([ 参数列表 ])
RETURNS type [characteristic ...]
BEGIN
 -- SQL语句
 RETURN ...;
END ;
```

characteristic说明：

- DETERMINISTIC：相同的输入参数总是产生相同的结果
- NO SQL：不包含 SQL 语句。
- READS SQL DATA：包含读取数据的语句，但不包含写入数据的语句
