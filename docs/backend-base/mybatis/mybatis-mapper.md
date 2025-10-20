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
