# sql映射

MyBatis真正强大之处在于它的SQL映射，在MyBatis中实现SQL映射的常见标签有：select标签（映射查询语句）、insert标签（映射插入语句）、update标签（映射更新语句）、delete标签（映射删除语句）和sql标签（可被其他语句引用的可重用语句块）

## select标签

### 标签使用

select标签用来映射查询语句，它是MyBatis中最常用的标签之一。select标签的使用非常简单的

```xml
<select id="selectUser" parameterType="int" resultType="hashmap">
SELECT * FROM TB_USER WHERE ID = #{id}
</select>
```

这个语句被称作selectUser，其接受一个int (或Integer) 类型的参数，并返回一个HashMap类型的对象，HashMap中的键是列名，值便是结果行中的对应值

参数符号#{id}，这是告诉MyBatis创建一个预处理语句参数。通过JDBC，这样的一个参数在SQL中会由一个“?”来标识，并被传递到一个新的预处理语句中。以上MyBatis配置文件执行时会生成如下JDBC 代码

```java
string selectUser = "SELECT * FRON TB_USER WHERE ID=?";
PreparedStatement ps = conn.prepareStatement(selectUser) ;
ps.setInt(1,id);
```

### 属性介绍

select标签的属性解释如下:

- id：命名空间中唯一的标识符，可以被用来引用这条语句
- parameterType：将会传入这条语句的参数类的完全限定名或别名。这个属性是可选的，因为MyBatis可以通过TypeHandler推断出具体传入语句的参数，默认值为unse
- resultType：从这条语句中返回的期望类型的类的完全限定名或别名
- 注意：如果返回值是集合类型，那应该是集合可以包含的类型，而不能是集合本身的类型。返回时可以使用resultType或resultMap，但不能同时使用
- resultMap：外部resultMap的命名引用。结果集的映射是MyBatis最强大的特性，许多复杂映射的情形都能通过resultMap迎刃而解。返回时可以使用resultMap 或resultType，但不能同时使用
- flushCache：如果设置为true，则任何时候只要语句被调用，都会导致本地缓存和二级缓存都被清空，默认值为false
- useCache：如果设置为true，将会导致本条语句的结果被二级缓存，在select标签当中默认值为true
- timeout：驱动程序等待数据库返回请求结果的等待秒数，超时则抛出异常。默认值为unset (依赖驱动)
- fetchSize：驱动程序每次批量返回的结果行数。默认值为unset (依赖驱动)
- statementType：值为STATEMENT、PREPARED 或CALLABLE。这会让MyBatis分别使用JDBC中的Statement、PreparedStatement或CallableStatement，默认值为PREPARED
- resultSetType：结果集的类型，值为FORWARD_ONLY、SCROLL_SENSITIVE 或SCROLLINSENSITIVE，默认值为unset (依赖驱动)
- databaseId：如果配置了databaseIdProvider，MyBatis会加载所有的不带databaseId或匹配当前databaseId的语句。如果带或者不带的语句都有，则不带的会被忽略
- resultOrdered：这个设置仅针对嵌套结果 select 语句适用：如果为 true，就是假设包含了嵌套结果集或是分组了，这样的话当返回一个主结果行的时候，就不会发生有对前面结果集的引用的情况。这就- 使得在获取嵌套的结果集的时候不至于导致内存不够用。默认值：false
- resultSets：这个设置仅对多结果集的情况适用，它将列出语句执行后返回的结果集并给每个结果集一个名称，名称是逗号分隔的

## insert、update、delete标签

insert，update和delete元素用来映射DML语句，是MyBatis 中最常用的元素之一。insert、update和delete元素配置和select 非常接近

insert使用：

```xml
<insert
id="insertUser"
parameterType="cn.mybatis.domain.ser"
flushCache="true"
statementType="PREPARED"
keyProperty=""
keyColumn=""
useGeneratedKeys=""
timeout="20">
```

update使用：

```xml
<update
id= "updateUser"
parameterType="cn.mybatis.domain.User"
flushtCache="true"
statementType="PREPARED"
timeout="20">
```

delete使用：

```xml
<delete
id="deleteUser"
parameterType="cn.mybatis.domain.User"
flushcache="true"
statementType="PRBPARED"
timeout="20">
```

### insert、update特有属性

- useGeneratedKeys：这会令MyBatis使用JDBC的getGeneratedKeys方法来获取由数据库内部生成的主键(比如，像MySQL和SQL Server这样的关系数据库管理系统的自动递增字段)，默认值为false
- keyProperty：唯一标记一个属性，MyBatis会通过getGeneratedKeys的返回值或者通过insert语句的selectKey子元素设置它的键值，默认为unset。如果希望得到多个生成的列，也可以是逗号分隔属性名称列表
- keyColumn：通过生成的键值设置表中的列名，这个设置仅对某些数据库(像PostgreSQL) 是必须的，当主键列不是表中的第一列时需要设置。如果希望得到多个生成的列，也可以是逗号分隔的属性名称列表

## selectKey标签

selectKey用在insert语句中，语法如下：

```xml
<selectKey
keyProperty= "id"
resultType="int"
order="BEFORE"
statementType="PREPARED">
```

- keyProperty：selectKey 语句结果应该被设置的目标属性(一般会设置到id属性上)。如果希望得到多个生成的列，也可以是逗号分隔的属性名称列表
- resultType：结果的类型。MyBatis 通常可以推算出来，但是为了更加确定，建议明确写出。MyBatis允许任何简单类型用作主键的类型，包括字符串。如果希望作用于多个生成的列，则可以使用一个包含期望属性的Object或一个Map
- order：可以被设置为BEFORE 或AFTER。如果设置为BEFORE，那么它会首先选择主键，设置keyProperty然后执行插入语句。如果设置为AFTER，那么先执行插入语句，然后是selectKey元素
- statementType：与前面相同，MyBatis支持STATEMENT、PREPARED 和CALLABLE语句的映射类型，分别代表Statement，PreparedStatement 和CallableStatement 类型

### 获取自增主键

对于不支持自动生成类型的数据库(比如Oracle) 或可能不支持自动生成主键的JDBC驱动来说，MyBatis可以通过这种方法来生成主键

```java
<insert id="insertUser">
    <selectKey keyProperty="id" resultType="int" order="BEFORE">
        select SEQUENCE TB_USER.nextval as id from dual
    </selectKey>
    insert into TB_USER
    (id,username,password,email,address)
    values
    (#{id},#{username},#{password},#{email},#{address})
</insert>
```

### 自定义主键的生成

自动生成主键以外，有些业务需要自定义数据表的主键，这个时候也可以使用selectKey 标签来实现

```xml
<insert id="addUser" parameterType="cn.mybatis.entity.User">
    <selectKey resultType="string" order="BEFORE" keyProperty="id">
        select uuid()  
    </selectKey>
    insert into t_user(id,name,sex,phone) values (#{id},#{name},#{sex},#{phone})
</insert>
```

## @SelectKey注解

@SelectKey注解的作用域是方法，效果与\<selectKey>标签等同

@SelectKey注解用在已经被 @Insert 或 @InsertProvider 或 @Update 或 @UpdateProvider 注解了的方法上。若在未被上述四个注解的方法上作 @SelectKey 注解则视为无效

如果指定了 @SelectKey 注解，那么 MyBatis 就会忽略掉由 @Options 注解所设置的生成主键

### 注解属性

@SelectKey注解支持以下属性：

- statement属性：填入将会被执行的 SQL 字符串数组
- keyProperty属性：填入将会被更新的参数对象的属性的值
- before属性：填入 true 或 false 以指明 SQL 语句应被在插入语句的之前还是之后执行
- resultType属性：填入 keyProperty 的 Java 类型
- statementType属性：填入Statement、 PreparedStatement 和 CallableStatement 中的 STATEMENT、 PREPARED 或 CALLABLE 中任一值填入 。默认值是 PREPARED

### @Options获取主键

使用@Options注解的userGeneratedKeys和keyProperty属性让数据库产生auto_increment（自增长）列的值，然后将生成的值设置到输入参数对象的属性中

```java
@Insert("INSERT INTO STUDENTS(NAME,EMAIL,ADRESS,PHONE)  
        VALUES(#{name},#{email},#{address},#{phone})")  
@Options(useGeneratedKeys = true, keyProperty = "id")  
int insertStudent(Student student)
```

### @SelectKey生成主键

```java
@Insert("INSERT INTO STUDENTS(ID,NAME,EMAIL,ADDR,PHONE)   
VALUES(#{id},#{name},#{email},#{address},#{phone})")  
@SelectKey(statement="SELECT STUD_ID_SEQ.NEXTVAL FROM DUAL",   
keyProperty="id", resultType=int.class, before=true)  
int insertStudent(Student student)
```

## sql标签

sql元素可以被用来定义可重用的SQL代码段，可以包含在其他语句中。它可以被静态地(在加载参数时) 参数化。不同的属性值通过包含的实例发生变化

定义一个sql：

```xml
<sql id="userColumns"> ${alias}.id,${alias}.username,${alias}.password </sql>
```

这个SQL片段可以被包含在其他语句中，例如:

```xml
<select id="selectUsers" resultType="map">
    select
        <include refid="userColumns" ><property name="alias" value="t1" /></include>
    from some_table tl
</select>
```

属性值可以用于包含的refid属性或者包含的字句里面的属性

```xml
<sql id="sometable">
    ${prefix}Table
</sql>

<sql id="someinclude">
    from
        <include refid="${include_target}"/>
</sql>

<select id="select" resultType="map">
    select field1,field2,field3
    <include refid="someinclude">
      <property name="prefix" value="some"/>
      <property name="include_target" value="sometable" />
    </include>
</select>
```

## 参数映射

### 简单参数映射

原生的类型或简单数据类型(比如整型和字符串)，因为没有相关属性，它会完全用参数值来替代

```xml
<select id="selectUsers" parameterType="int" resultType="User">
    select id,username,password
    from users
    where id = #{id}
</select>
```

### 复杂参数映射

如果传入一个复杂的对象(比如User)，如果User 类型的参数对象被传递到了语句中，如#{id}语句则会查找参数对象User的id属性，#{username}和#{password}也是一样，然后将它们的值传入预处理语句的参数中

```xml
<insert id="insertUser" parameterType="User">
    insert into users (id,username,password)
    values (#{id},#{username},{password})
</insert>
```
