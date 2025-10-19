# 动态sql

## if标签

if标签在mybatis的开发工作中主要用于where查询、insert插入和update更新三种操作中

### where中使用

```xml
<mapper namespace="cn.mybatis.mapper.EmployeeMapper">
  <select id="selectEmployeeByIdLike" resultTypem"cn.mybatis.domain.Employee">
    SELECT * FROM tb_employee WHERE state = 'ACTIVE'
    <!-- 可选条件，如果传进来的参数有id属性，则加上id查询条件-->
    <if test="id != null">
        and id = #{id}
    </if>
  </select>
</mapper>
```

如果想通过两个条件搜索

```xml
<select id="selectEmgloyeeByLoginLike" resultType="cn.mybatis.domain.Employee">
SELECT * FROM tb_employee WHERE state = 'ACTIVE'
<!-- 两个可选条件，例如登录功能的登录名和密码查询-->
<if test="loginname != null and password != null">
and loginname = #{loginname} and password = #{password)
</if>
</select>
```

### insert中使用

通过判断参数值是否为空来决定是否将SQL字段和对象加入到SQL语句中:

```xml
<mapper namespace="cn.mybatis.mapper.EmployeeMapper">
  <insert id="insertEmployee" useGeneratedKeys="true" keyProperty="id">
    insert into tb_employee (
    <if test="loginname != null and loginname != ''">
        loginname,
    </if>
    <if test="password != null and password != ''">
        password,
    </if>
    <if test="name != null and name != ''">
        name,
    </if>
    status ) values (
    <if test="loginname != null and loginname != ''">
        #{loginname},
    </if>
    <if test="password != null and password != ''">
        #{password},
    </if>
    <if test="name != null and name != ''">
        #{name},
    </if>
    #{status}
    )
  </insert>
</mapper>
```

### update中使用

通过判断参数值是否为空来决定是否将SQL字段和对象加入到SQL语句中:

```xml
<mapper namespace="cn.mybatis.mapper.EmployeeMapper">
    <update id="updateEmployee">
        update tb_employee
        <set>
            <if test="loginname != null and loginname !=''">
                loginname = #{loginname},
            </if>
            <if test="password != null and password != ''">
                password = #{password},
            </if>
            <if test="name != null and name != ''">
                name = #{name},
            </if>
            <if test="status != null and status != ''">
                status = #{status},
            </if>
            id = #{id} where id = #{id}
        </set>
    </update>
</mapper>
```

## choose标签

有些时候，我们不想使用所有的条件语句，而只想从中择其一二。针对这种情况，MyBatis提供了choose标签，它有点像Java中的switch语句

```xml
<select id="selectEmployeeChoose" parameterType="hashmap" resultType="my.mybatis.domain.Employee">
    SELECT * FROM tb employee WHERE state = 'ACTIVE'
    <!--- 如果传入了id，就根据id查询，没有传入id就根据loginname和password查询，否则查询sex等于男的数据-->
    <choose>
      <when test="id != null">
        and id= #{id}
      </when>
      <when test="loginname != null and password != null">
        and loginname = #{loginname} and password = #{password}
      </when>
      <otherwise>
        and sex = '男'
      </otherwise>
    </choose>
</select>
```

## where标签

where 标签知道只有在一个以上的if条件有值的情况下才去插入WHERE子句。而且，若最后的内容是“AND”或“OR”开头，则where元素也知道如何将它们去除

```xml
<select id="selectEmployeeLike" resultType="cn.mybatis.domain.Employee">
    SELECT * EROM tb_employee
    <where>
      <if test="state != null ">
        state = #{state}
      </if>
      <if test="id != null ">
        and id = #{id}
      </if>
      <if test="loginname != null and password != null">
        and loginname = #{loginname} and password = #{password}
      </if>
    </where>
</select>
```

where 标签无法去除掉后面的 and 关键字，此时 SQL 语句出现语法错误

```xml
<select id="selectEmployeeLike" resultType="cn.mybatis.domain.Employee">
    SELECT * EROM tb_employee
    <where>
      <if test="state != null ">
        state = #{state} and
      </if>
      <if test="id != null ">
        id = #{id} and
      </if>
      <if test="loginname != null and password != null">
        loginname = #{loginname} and password = #{password}
      </if>
    </where>
</select>
```

要想解决以上where标签无法处理的问题，可以考虑使用`trim`标签

## trim标签

trim 标签的主要属性有四个，如下表所示：

|属性名| 作用|
|---| --|
|prefix |给sql增加前缀|
|suffix| 给sql增加后缀|
|prefixOverrides |去掉sql前面多余的关键字或者字符|
|suffixOverrides| 去掉sql后面多余的关键字或者字符|

### prefix使用场景

```xml
<select id="getUser" resultType="user">
 select * from t_users 
 <trim prefix="where">
  name = #{name} and age = #{age} and phone = #{phone}
 </trim>
</select>
```

生成的sql语句为

```sql
select * from t_users where name= ? and age= ? and phone = ?
```

### prefixOverrides使用场景

```xml
<select id="getUser" resultType="user">
    select * from t_users 
    <trim prefix="where" prefixOverrides="and">
        <if test="name != null">
        name=#{name}
        </if>
        <if test="age != null">
        and age=#{age}
        </if>
        <if test="phone != null">
        and phone=#{phone}
        </if>
    </trim>
</select>
```

### suffix和suffixOverrides

```xml
update t_users
<trim prefix="set" suffixOverrides="," suffix=" where id = #{id} ">
　　<if test="name != null and name.length() > 0"> name=#{name}, </if>
　　<if test="gender != null and gender.length() > 0"> gender=#{gender},  </if>
</trim>
```

## set标签

set 标签会动态前置SET关键字，同时也会消除无关的逗号，因为使用了条件语句之后很可能就会在生成的赋值语句的后面留下这些逗号

```xml
<!-- 根据id查询员工信息-->
<select id="selectEmployeewithId" parameterType="int" resultType="cn.mybatis.domain.Employee">
    SELECT * FROM tb_employee where id = #{id}
</select>

<!-- 动态更新员工信息-->
<update id="updateEmployeeIfNecessary" parameterType="cn.mybatis.domain.Employee">
    update tb_employee
    <set>
      <if test="loginname != null">loginname=#{loginname} ,</if>
      <if test="password != null">password=#{password} ,</if>
      <if test="name != null">name=#{name},</if>
      <if test="sex != null">sex=#{sex},</if>
      <if test="age != null">age=#{age},</if>
      <if test="phone != null">phone=#{phone} ,</if>
      <if test="sal != null">sal=#{sal},</if>
      <if test="state != null">state=#{state}</if>
    </set>
    where id=#{id}
</update>
```

## foreach 标签

foreach标签主要用在构 in条件中和批量插入中

### 标签属性

foreach 标签的属性主要有 collection，item，index，open，separator，close。其含义如下所示：

- collection：遍历的对象。当遍历对象是List、Array对象时，collection属性值分别默认用"list"、"array"代替，而Map对象没有默认的属性值
- item：集合元素遍历时的别名称。该参数为必选项
- index：在list、array中，index为元素的序号索引，但是在Map中，index为遍历元素的key值。该参数为可选项
- open：遍历集合时的开始符号，通常与 close=")" 搭配使用。使用场景为 IN()、values()时。该参数为可选项
- separator：元素之间的分隔符，类比在 IN() 的时候，separator=","，最终所有遍历的元素将会以设定的逗号符号隔开。该参数为可选项
- close：遍历集合时的结束符号，通常与 open="(" 搭配使用。该参数为可选项

> 可以使用 @Param(“keyName”) 注解来自定义collection属性值，设置keyName后，list、array会失效
>
### collection属性值

collection属性值有三种情况

- 如果参数类型为List时，collection的默认属性值为list，同样可以使用@Param注解自定义;
- 如果参数类型为Array时，collection的默认属性值为array，同样可以使用@Param注解自定义;
- 如果传入的参数类型为Map时，collection的属性值可为map.keys、map.values、map.entrySet()

## bind标签

bind 标签可以用来在映射文件中定义变量，然后将输入参数中的值拼接其他字符串后组成新的字符串赋值给该变量

```xml
<select id="selectEmployeeLikeName" resultType="cn.mybatis.domain.Employee" parameterType="cn.mybatis.domain.Employee">
    <bind name="pattern" value="'%'+_parameter.getName() + '%'" />
    SELECT * FROM tb_employee WHERE loginname LIKE #{pattern}
</select>
```

参数名称必须是`_parameter`，表示传入的查询对象Employee，否则会提示异常
