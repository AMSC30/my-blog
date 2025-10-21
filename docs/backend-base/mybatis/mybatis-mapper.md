# mybatis映射

从本质上来说，mybatis就是一个映射器，它分为两部分映射：sql语句映射和查询结果的映射

## 简单字段映射

resultMap 元素是 MyBatis 中最重要最强大的元素。它可以让我们从JDBC ResultSets 数据提取代码中解放出来，如下一个简单映射语句的示例，其并没有显式指定 resultMap

```xml
<select id="selectUsers" resultType="map"> 
    select id, username, hashedPassword  from t_users  where id = #{id}
</select>
```

上述语句只是简单地将所有的列映射到 HashMap 的键上，这由 resultType 属性指定。虽然在大部分情况下都够用，但是 HashMap 不是一个很好的领域模型。我们的程序更可能会使用 JavaBean 或 POJO（Plain Old Java Objects，普通老式 Java 对象）作为领域模型

```xml
<select id="selectUsers" resultType="cn.mybatis.model.User">  
    elect id, username, hashedPassword  from t_users  where id = #{id}
</select>
```

使用类型别名，我们就可以不用输入类的完全限定名称了

```xml
<!-- mybatis-config.xml 中 -->
<typeAlias type="cn.mybatis.model.User" alias="User"/>

<!-- SQL 映射 XML 中 -->
<select id="selectUsers" resultType="User">
  select id, username, hashedPassword
  from t_users
  where id = #{id}
</select>
```

MyBatis 会在幕后自动创建一个 ResultMap，再基于属性名来映射列到 JavaBean 的属性上。如果列名和属性名没有精确匹配，可以在 SELECT 语句中对列使用别名（这是一个基本的 SQL 特性）来匹配标签

```xml
<select id="selectUsers" resultType="User">
  select
    user_id             as "id",
    user_name           as "userName",
    hashed_password     as "hashedPassword"
  from t_users
  where id = #{id}
</select>
```

或者使用下面的形式

```xml
<resultMap id="userResultMap" type="User">
  <id property="id" column="user_id" />
  <result property="username" column="user_name"/>
  <result property="password" column="hashed_password"/>
</resultMap>

<select id="selectUsers" resultMap="userResultMap">
  select user_id, user_name, hashed_password
  from t_users
  where id = #{id}
</select>
```

## 自动映射

当自动映射查询结果时，MyBatis 会获取结果中返回的列名并在 Java 类中查找相同名字的属性（忽略大小写）。 这意味着如果发现了 ID 列和 id 属性，MyBatis 会将列 ID 的值赋给 id 属性。

通常数据库列使用大写字母组成的单词命名，单词间用下划线分隔，而 Java 属性一般遵循驼峰命名法约定。为了在这两种命名方式之间启用自动映射，需要将 mapUnderscoreToCamelCase 设置为 true。

甚至在提供了结果映射后，自动映射也能工作。在这种情况下，对于每一个结果映射，在 ResultSet 出现的列，如果没有设置手动映射，将被自动映射。在自动映射处理完毕后，再处理手动映射。

在下面的例子中，id 和 userName 列将被自动映射，hashed_password 列将根据配置进行映射

```xml
<select id="selectUsers" resultMap="userResultMap">
  select
    user_id             as "id",
    user_name           as "userName",
    hashed_password
  from t_users
  where id = #{id}
</select>
<resultMap id="userResultMap" type="User">
  <result property="password" column="hashed_password"/>
</resultMap>
```

## 复杂字段映射

### ResultMap节点属性

|属性|描述|
|--|--|
|id| 当前命名空间中的一个唯一标识，用于标识一个结果映射|
|type |类的完全限定名或者一个类型别名|
|autoMapping |如果设置这个属性，MyBatis将会为本结果映射开启或者关闭自动映射。 这个属性会覆盖全局的属性 autoMappingBehavior。默认值：未设置（unset）|

### ResultMap子节点

1. constructor：用于在实例化类时，注入结果到构造方法中

- idArg：ID 参数；标记出作为 ID 的结果可以帮助提高整体性能
- arg：将被注入到构造方法的一个普通结果

2. id：一个 ID 结果；标记出作为 ID 的结果可以帮助提高整体性能
3. result：注入到字段或 JavaBean 属性的普通结果
4. association：一个复杂类型的关联；许多结果将包装成这种类型

- 嵌套结果映射：关联本身可以是一个 resultMap元素，或者从别处引用一个

5. collection：一个复杂类型的集合

- 嵌套结果映射：集合本身可以是一个 resultMap元素，或者从别处引用一个

#### id & result

这些是结果映射最基本的内容。id 和 result 元素都将一个列的值映射到一个简单数据类型（String, int, double, Date 等）的属性或字段。

这两者之间的唯一不同是，id 元素表示的结果将是对象的标识属性，这会在比较对象实例时用到。 这样可以提高整体的性能，尤其是进行缓存和嵌套结果映射（也就是连接映射）的时候

两者都支持以下属性：

|属性| 描述|
|--|--|
|property| 映射到列结果的字段或属性。如果用来匹配的 JavaBean 存在给定名字的属性，那么它将会被使用。否则 MyBatis 将会寻找给定名称的字段。 无论是哪一种情形，你都可以使用通常的点式分隔形式进行复杂属性导航。 比如，你可以这样映射一些简单的东西：“username”，或者映射到一些复杂的东西上：“address.street.number”。|
|column |数据库中的列名，或者是列的别名。一般情况下，这和传递给 resultSet.getString(columnName)方法的参数一样。|
|javaType| 一个 Java 类的完全限定名，或一个类型别名（关于内置的类型别名，可以参考上面的表格）。 如果你映射到一个 JavaBean，MyBatis 通常可以推断类型。然而，如果你映射到的是 HashMap，那么你应该明确地指定 javaType 来保证行为与期望的相一致。|
|jdbcType |JDBC 类型，所支持的 JDBC 类型参见这个表格之后的“支持的 JDBC 类型”。 只需要在可能执行插入、更新和删除的且允许空值的列上指定 JDBC 类型。这是 JDBC 的要求而非 MyBatis 的要求。如果你直接面向 JDBC 编程，你需要对可能存在空值的列指定这个类型。|
|typeHandler |我们在前面讨论过默认的类型处理器。使用这个属性，你可以覆盖默认的类型处理器。 这个属性值是一个类型处理器实现类的完全限定名，或者是类型别名。|

#### 构造方法

构造方法注入允许你在初始化时为类设置属性的值，而不用暴露出公有方法

对于下面构造方法：

```java
public class User 
{
   //...
   
   public User(Integer id, String username, int age) 
   {
    //...
   }
   
   //...
}
```

在resultMap中定义constructor元素：

```xml
<constructor>
   <idArg column="id" javaType="int" name="id" />
   <arg column="age" javaType="_int" name="age" />
   <arg column="username" javaType="String" name="username" />
</constructor>
```

## 集合映射

映射结果集合到一个 List 中，可以使用集合元素\<collection>。和关联映射一样，我们可以使用嵌套 Select 查询，或基于连接的嵌套结果映射集合

### 嵌套Select查询

```xml
<resultMap id="blogResult" type="Blog">
  <collection property="posts" javaType="ArrayList" column="id" ofType="Post" select="selectPostsForBlog"/>
</resultMap>

<select id="selectBlog" resultMap="blogResult">
  SELECT * FROM BLOG WHERE ID = #{id}
</select>

<select id="selectPostsForBlog" resultType="Post">
  SELECT * FROM POST WHERE BLOG_ID = #{id}
</select>
```

"ofType" 属性用来将 JavaBean（或字段）属性的类型和集合存储的类型区分开来

### 嵌套结果映射

对于以下语句：

```xml
<select id="selectBlog" resultMap="blogResult">
  select
  B.id as blog_id,
  B.title as blog_title,
  B.author_id as blog_author_id,
  P.id as post_id,
  P.subject as post_subject,
  P.body as post_body,
  from Blog B
  left outer join Post P on B.id = P.blog_id
  where B.id = #{id}
</select>
```

为每一列都赋予了一个有意义的别名，以便映射保持简单。要映射博客里面的文章集合

```xml
<resultMap id="blogResult" type="Blog">
  <id property="id" column="blog_id" />
  <result property="title" column="blog_title"/>
  <collection property="posts" ofType="Post">
    <id property="id" column="post_id"/>
    <result property="subject" column="post_subject"/>
    <result property="body" column="post_body"/>
  </collection>
</resultMap>
```

或者使用更详略、可重用的方式

```xml
<resultMap id="blogResult" type="Blog">
  <id property="id" column="blog_id" />
  <result property="title" column="blog_title"/>
  <collection property="posts" ofType="Post" resultMap="blogPostResult" columnPrefix="post_"/>
</resultMap>

<resultMap id="blogPostResult" type="Post">
  <id property="id" column="id"/>
  <result property="subject" column="subject"/>
  <result property="body" column="body"/>
</resultMap>
```

## 关联映射

关联（association）元素处理"有一个类型"的关系。 比如，一个博客有一个用户。关联结果映射和其它类型的映射工作方式差不多。关联的不同之处是，你需要告诉 MyBatis 如何加载

关联。MyBatis有两种不同的方式加载关联：

1. 嵌套 Select 查询：通过执行另外一个 SQL 映射语句来加载期望的复杂类型
2. 嵌套结果映射：使用嵌套的结果映射来处理连接结果的重复子集

### 嵌套Select查询

```xml
<resultMap id="blogResult" type="Blog">
  <association property="author" column="author_id" javaType="Author" select="selectAuthor"/>
</resultMap>

<select id="selectBlog" resultMap="blogResult">
  SELECT * FROM BLOG WHERE ID = #{id}
</select>

<select id="selectAuthor" resultType="Author">
  SELECT * FROM AUTHOR WHERE ID = #{id}
</select>
```

有两个 select 查询语句：一个用来加载博客（Blog），另外一个用来加载作者（Author），而且博客的结果映射描述了应该使用 selectAuthor 语句加载它的 author 属性。

其它所有的属性将会被自动加载，只要它们的列名和属性名相匹配。

> 这种方式虽然很简单，但在大型数据集或大型数据表上常出现N+1查询问题
> 执行了一个单独的 SQL 语句来获取结果的一个列表（就是"+1"）。然后，对列表返回的每条记录，你执行一个 select 查询语句来为每条记录加载详细信息（就是"N"）
>
### 嵌套结果映射

```xml
<resultMap id="blogResult" type="Blog">
  <id property="id" column="blog_id" />
  <result property="title" column="blog_title"/>
  <association property="author" column="blog_author_id" javaType="Author" resultMap="authorResult"/>
</resultMap>

<resultMap id="authorResult" type="Author">
  <id property="id" column="author_id"/>
  <result property="username" column="author_username"/>
  <result property="password" column="author_password"/>
  <result property="email" column="author_email"/>
  <result property="bio" column="author_bio"/>
</resultMap>
```

如果你不打算重用它，或者你更喜欢将你所有的结果映射放在一个具有描述性的结果映射元素中。 你可以直接将结果映射作为子元素嵌套在内

```xml
<resultMap id="blogResult" type="Blog">
  <id property="id" column="blog_id" />
  <result property="title" column="blog_title"/>
  <association property="author" javaType="Author">
    <id property="id" column="author_id"/>
    <result property="username" column="author_username"/>
    <result property="password" column="author_password"/>
    <result property="email" column="author_email"/>
    <result property="bio" column="author_bio"/>
  </association>
</resultMap>
```

## 一对一映射

有时候，要查询的数据在多张表中，并且多张表中的数据是一一对应的，比如将个人信息和身份证信息分别存在两张表中，在个人信息表中通过card_id作为外键关联身份证信息表，当查询个人信息时，同时查询身份证信息

有对应一下映射语句

```xml
<mapper namespace="cn.mybatis.mydemo.mapper.CardMapper">

  <!-- 根据id查询Card，返回Card对象 -->
  <select id="selectCardById" parameterType="int" resultType="cn.mybatis.mydemo.domain.Card">
      select * from tb_card where id = #{id}
  </select>
</mapper>



<mapper namespace="cn.mybatis.mydemo.mapper.PersonMapper">

    <!-- 根据id查询Person，返回resultMap -->
    <select id="selectPersonById" parameterType="int" resultMap="personMapper">
        select * from tb_person where id = #{id}
    </select>

    <!-- 映射Peson对象的resultMap -->
    <resultMap type="cn.mybatis.mydemo.domain.Person" id="personMapper">
        <id property="id" column="id" />
        <result property="name" column="name" />
        <result property="sex" column="sex" />
        <result property="age" column="age" />
        <!-- 一对一关联映射:association -->
        <association property="card" column="card_id"
            select="cn.mybatis.mydemo.mapper.CardMapper.selectCardById"
            javaType="cn.mybatis.mydemo.domain.Card" />
    </resultMap>

</mapper>
```

在PersonMapper.xml中定义了一个<select.../>，其根据id查询Person信息，由于Person类除了简单的属性id、name、sex和age之外，还有一个关联对象card，所以返回的是一个名为personMapper的resultMap。personMapper中使用了<association .../>元素映射一对一的关联关系。其中，select属性表示会使用column属性的card_id值作为参数执行CardMapper中定义的selectCardById语句，查询对应的Card数据，查询出的数据将被封装到property表示的card对象当中

## 一对多映射

在实际项目开发中，一对多是非常常见的关系，比如，一个班级可以有多个学生，一个学生只能属于一个班级，班级和学生是一对多的关系，而学生和班级是多对一的关系。数据库中一对多关系通常使用主外键关联，外键列应该在多方，即多方维护关系

```xml
<mapper namespace="cn.mybatis.mydemo2.mapper.ClassMapper">

    <!-- 根据id查询班级信息，返回resultMap -->
    <select id="selectClassById" parameterType="int"
        resultMap="classResultMap">
        SELECT * FROM tb_class WHERE id = #{id}
    </select>

    <!-- 映射Class对象的resultMap -->
    <resultMap type="cn.mybatis.mydemo2.domain.Class"
        id="classResultMap">
        <id property="id" column="id" />
        <result property="code" column="code" />
        <result property="name" column="name" />
        <!-- 一对多关联映射:collection fetchType="lazy"表示懒加载 -->
        <collection property="students" javaType="ArrayList"
            column="id" ofType="cn.mybatis.mydemo2.domain.Student"
            select="cn.mybatis.mydemo2.mapper.StudentMapper.selectStudentByClassId"
            fetchType="lazy">
            <id property="id" column="id" />
            <result property="name" column="name" />
            <result property="sex" column="sex" />
            <result property="age" column="age" />
        </collection>
    </resultMap>
</mapper>
```

ClassMapper.xml中定义了一个<select.../>，其根据id查询班级信息。由于Class类除了简单的属性id、code、name 之外，还有一个关联对象students，所以返回的是一个名为classResultMap的resultMap。
由于student是一个List集合，所以classResultMap中使用了<collection.../>元素映射一对多的关联关系，select属性表示会使用column属性的id值作为参数执行StudentMapper中定义的selectStudentByClass查询该班级对应的所有学生数据，查询出的数据将被封装到property表示的students对象当中。

还使用了一个新的属性fetchType，该属性的取值有eager和lazy，eager表示立即加载，即查询Class对象的时候，会立即执行关联的selectStudentByClassId中定义的SQL语句去查询班级的所有学生；lazy表示懒加载，其不会立即发送SQL语句去查询班级的所有学生，而是等到需要使用到班级的students属性时，才会发送SQL语句去查询班级的所有学生。fetch机制更多的是为了性能考虑，如果查询班级时确定会访问班级的所有学生，则该属性应该设置为eager；如果查询班级时只是查询班级信息，有可能不会访问班级的所有学生，则该属性应该设置为lazy。正常情况下，一对多所关联的集合对象，都应该被设置成lazy

## 多对多映射

在实际项目开发中，多对多关系也是非常常见的关系，比如，一个购物系统中，一个用户可以有多个订单，这是一对多的关系；一个订单中可以购买多种商品，一种商品也可以属于多个不同的订单，订单和商品就是多对多的关系。对于数据库中多对多关系建议使用一个中间表来维护关系，中间表中的订单d作为外键参照订单表的id，商品id作为外键参照商品表的id

```xml
<mapper namespace="cn.mybatis.mydemo3.mapper.UserMapper">

    <resultMap type="cn.mybatis.mydemo3.domain.User"
        id="userResultMap">
        <id property="id" column="id" />
        <result property="username" column="username" />
        <result property="loginname" column="loginname" />
        <result property="password" column="password" />
        <result property="phone" column="phone" />
        <result property="address" column="address" />
        <!-- 一对多关联映射:collection -->
        <collection property="orders" javaType="ArrayList"
            column="id" ofType="cn.mybatis.mydemo3.domain.Order"
            select="cn.mybatis.mydemo3.mapper.OrderMapper.selectOrderByUserId"
            fetchType="lazy">
            <id property="id" column="id" />
            <result property="code" column="code" />
            <result property="total" column="total" />
        </collection>
    </resultMap>

    <select id="selectUserById" parameterType="int"
        resultMap="userResultMap">
        SELECT * FROM tb_user WHERE id = #{id}
    </select>

</mapper>
```

UserMapper.xml中定义了一一个<select.../>，其根据id查询用户信息。由于User 类除了简单的属性id、usemame、loginame、password和address之外，还有一个关联对象orders，所以返回的是一个名为userResultMap的resultMap。由于orders是一个List集合，因此userResultMap 中使用了<collection.../>元素映射一对多的关联关系，select属性表示会使用columm属性的id值作为参数执行OrderMapper中定义的selectOrderByUserId查询该用户所下的所有订单，查询出的数据将被封装到property表示的orders对象当中。注意，一对多使用的都是lazy(懒加载)

## 一对一注解

```java
public interface CardMapper
{
    @Select("SELECT * FROM tb_card WHERE ID = #{id} ")
    Card selectCardById(Integer id);
}

public interface PersonMapper
{

    @Select("SELECT * FROM tb_person WHERE ID = #{id}")
    @Results(
    { @Result(id = true, column = "id", property = "id"), @Result(column = "name", property = "name"),
            @Result(column = "sex", property = "sex"), @Result(column = "age", property = "age"),
            @Result(column = "card_id", property = "card", one = @One(select = "cn.mybatis.mydemo4.mapper.CardMapper.selectCardById", fetchType = FetchType.EAGER)) })

    Person selectPersonById(Integer id);

}
```

## 一对多注解

```java
public interface ClazzMapper
{
    // 根据id查询班级信息
    @Select("SELECT * FROM tb_clazz  WHERE ID = #{id}")
    @Results(
    { @Result(id = true, column = "id", property = "id"), @Result(column = "code", property = "code"),
            @Result(column = "name", property = "name"),
            @Result(column = "id", property = "students", many = @Many(select = "cn.mybatis.mydemo5.mapper.StudentMapper.selectByClazzId", fetchType = FetchType.LAZY)) })
    Clazz selectById(Integer id);
}

public interface StudentMapper
{
    // 根据班级id查询班级所有学生
    @Select("SELECT * FROM tb_student WHERE CLAZZ_ID = #{id}")
    @Results(
    { @Result(id = true, column = "id", property = "id"), @Result(column = "name", property = "name"),
            @Result(column = "sex", property = "sex"), @Result(column = "age", property = "age") })

    List<Student> selectByClazzId(Integer clazz_id);
}
```

## 多对多注解

```java
public interface ArticleMapper
{

    @Select("SELECT * FROM tb_article WHERE id IN (SELECT article_id FROM tb_item WHERE order_id = #{id} ) ")
    List<Article> selectByOrderId(Integer order_id);

}

public interface OrderMapper
{

    @Select("SELECT * FROM tb_order WHERE ID = #{id}")
    @Results(
    { @Result(id = true, column = "id", property = "id"), @Result(column = "code", property = "code"),
            @Result(column = "total", property = "total"),
            @Result(column = "user_id", property = "user", one = @One(select = "cn.mybatis.mydemo6.mapper.UserMapper.selectById", fetchType = FetchType.EAGER)),
            @Result(column = "id", property = "articles", many = @Many(select = "cn.mybatis.mydemo6.mapper.ArticleMapper.selectByOrderId", fetchType = FetchType.LAZY)) })
    Order selectById(Integer id);

}
```
