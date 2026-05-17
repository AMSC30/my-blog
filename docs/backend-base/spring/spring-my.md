# Spring Framework

## IoC容器

IoC也被称为依赖注入（DI）。它是一个过程，对象仅通过构造参数、工厂方法的参数或在对象实例被构造或从工厂方法返回后在其上设置的属性来定义其依赖关系（即它们与之合作的其他对象）。然后容器在创建 bean 时注入这些依赖关系。这个过程从根本上说是Bean本身通过使用直接构建类或诸如服务定位模式的机制来控制其依赖关系的实例化或位置的逆过程（因此被称为控制反转）

## bean

一个Spring IoC容器管理着一个或多个Bean。这些Bean是用你提供给容器的配置元数据创建的（例如，以XML \<bean/> 定义的形式）。

在容器本身中，这些Bean定义被表示为 BeanDefinition 对象，它包含（除其他信息外）以下元数据。

- 一个全路径类名：通常，被定义的Bean的实际实现类。
- Bean的行为配置元素，它说明了Bean在容器中的行为方式（scope、生命周期回调，等等）。
- 对其他Bean的引用，这些Bean需要做它的工作。这些引用也被称为合作者或依赖。
- 要在新创建的对象中设置的其他配置设置—​例如，pool的大小限制或在管理连接池的Bean中使用的连接数

### bean的命名

每个Bean都有一个或多个标识符（identifier）。这些标识符在承载Bean的容器中必须是唯一的。一个Bean通常只有一个标识符。然而，如果它需要一个以上的标识符，多余的标识符可以被视为别名。这些名字是字母数字（'myBean'、'someService’等），但它们也可以包含特殊字符

### bean的定义

bean 定义（definition）本质上是创建一个或多个对象的“配方”。容器在被要求时查看命名的Bean的“配方”，并使用该Bean定义所封装的配置元数据来创建（或获取）一个实际的对象

通常，在容器本身通过反射式地调用构造函数直接创建Bean的情况下，指定要构造的Bean类，有点相当于Java代码中的 new 操作符。 在不太常见的情况下，即容器在一个类上调用 static 工厂方法来创建 bean 时，要指定包含被调用的 static 工厂方法的实际类。从 static 工厂方法的调用中返回的对象类型可能是同一个类或完全是另一个类

1. 用构造函数进行实例化

当你用构造函数的方法创建一个Bean时，所有普通的类都可以被Spring使用并与之兼容。也就是说，被开发的类不需要实现任何特定的接口，也不需要以特定的方式进行编码。只需指定Bean类就足够了。然而，根据你对该特定Bean使用的IoC类型，你可能需要一个默认（空）构造函数。

Spring IoC容器几乎可以管理任何你希望它管理的类。它并不局限于管理真正的JavaBean。大多数Spring用户更喜欢真正的JavaBean，它只有一个默认的（无参数）构造函数，以及按照容器中的属性建模的适当的setter和getter。你也可以在你的容器中拥有更多奇特的非bean风格的类。例如，如果你需要使用一个绝对不遵守JavaBean规范的传统连接池，Spring也可以管理它

2. 用静态工厂方法进行实例化

在定义一个用静态工厂方法创建的Bean时，使用 class 属性来指定包含 static 工厂方法的类，并使用名为 factory-method 的属性来指定工厂方法本身的名称。你应该能够调用这个方法（有可选的参数，如后文所述）并返回一个活的对象，随后该对象被视为通过构造函数创建的。这种Bean定义的一个用途是在遗留代码中调用 static 工厂

假如有这么一个bean定义和对应的类

```xml
<bean id="clientService"
    class="examples.ClientService"
    factory-method="createInstance"/>
```

```java
public class ClientService {
    private static ClientService clientService = new ClientService();
    private ClientService() {}

    public static ClientService createInstance() {
        return clientService;
    }
}
```

3. 用实例工厂方法进行实例化
   用实例工厂方法进行的实例化从容器中调用现有 bean 的非静态方法来创建一个新的 bean。要使用这种机制，请将 class 属性留空，并在 factory-bean 属性中指定当前（或父代或祖代）容器中的一个 Bean 的名称，该容器包含要被调用来创建对象的实例方法。用 factory-method 属性设置工厂方法本身的名称

```xml
<!-- the factory bean, which contains a method called createInstance() -->
<bean id="serviceLocator" class="examples.DefaultServiceLocator">
    <!-- inject any dependencies required by this locator bean -->
</bean>

<!-- the bean to be created via the factory bean -->
<bean id="clientService"
    factory-bean="serviceLocator"
    factory-method="createClientServiceInstance"/>
```

### 生命周期回调

**初始化回调**

org.springframework.beans.factory.InitializingBean 接口让Bean在容器对Bean设置了所有必要的属性后执行初始化工作。InitializingBean 接口指定了一个方法afterPropertiesSet，此方式是不被推荐的方式，因为它不必要地将代码与Spring耦合。使用 @PostConstruct 注解或指定一个POJO初始化方法

在基于XML的配置元数据中，可以使用`init-method`属性来指定具有`void`无参数签名的方法的名称

对于Java配置，可以使用`@Bean`的`initMethod`属性

**销毁回调**

实现 org.springframework.beans.factory.DisposableBean 接口可以让Bean在包含它的容器被销毁时获得一个回调。DisposableBean 接口指定了一个方法，此方式是不被推荐的方式，使用 @PreDestroy 注解或指定一个bean定义所支持的通用方法

对于基于XML的配置元数据，可以使用`\<bean/>`上的`destroy-method`属性

使用Java配置，可以使用`@Bean`的`destroyMethod`属性

**默认的初始化和销毁方法**

可以将Spring容器配置为在每个Bean上 "寻找" 命名的初始化和销毁回调方法名称。这意味着你，作为应用开发者，可以编写你的应用类并使用名为 init() 的初始化回调，而不必为每个Bean定义配置 init-method="init" 属性。当Bean被创建时，Spring IoC容器会调用该方法，destroy同理

```xml
<beans default-init-method="init">

    <bean id="blogService" class="com.something.DefaultBlogService">
        <property name="blogDao" ref="blogDao" />
    </bean>

</beans>
```

```java
public class DefaultBlogService implements BlogService {

    private BlogDao blogDao;

    public void setBlogDao(BlogDao blogDao) {
        this.blogDao = blogDao;
    }

    // this is (unsurprisingly) the initialization callback method
    public void init() {
        if (this.blogDao == null) {
            throw new IllegalStateException("The [blogDao] property must be set.");
        }
    }
}
```

顶层 \<beans/> 元素属性中 default-init-method 属性的存在会使Spring IoC容器识别出Bean类中名为 init 的方法作为初始化方法的回调。当一个Bean被创建和装配时，如果Bean类有这样的方法，它就会在适当的时候被调用

如果现有的Bean类已经有了与惯例不同的回调方法，你可以通过使用 \<bean/> 本身的 init-method 和 destroy-method 属性来指定（在XML中）方法的名称，从而覆盖默认值

## 基于XML配置元数据

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- services -->

    <bean id="petStore" class="org.springframework.samples.jpetstore.services.PetStoreServiceImpl">
        <property name="accountDao" ref="accountDao"/>
        <property name="itemDao" ref="itemDao"/>
        <!-- additional collaborators and configuration for this bean go here -->
    </bean>

    <!-- more bean definitions for services go here -->

</beans>
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="accountDao"
        class="org.springframework.samples.jpetstore.dao.jpa.JpaAccountDao">
        <!-- additional collaborators and configuration for this bean go here -->
    </bean>

    <bean id="itemDao" class="org.springframework.samples.jpetstore.dao.jpa.JpaItemDao">
        <!-- additional collaborators and configuration for this bean go here -->
    </bean>

    <!-- more bean definitions for data access objects go here -->

</beans>
```

在spring应用的启动类中

```java
ApplicationContext context = new ClassPathXmlApplicationContext("services.xml", "daos.xml");
```

通常情况下，每个单独的XML配置文件代表了你架构中的一个逻辑层或模块，可以使用 application context 构造函数从所有这些XML片段中加载Bean定义，或者，使用一个或多个 \<import/> 元素的出现来从另一个或多个文件中加载Bean定义

```xml
<beans>
    <import resource="services.xml"/>
    <import resource="resources/messageSource.xml"/>
    <import resource="/resources/themeSource.xml"/>

    <bean id="bean1" class="..."/>
    <bean id="bean2" class="..."/>
</beans>
```

## 基于注解的容器配置

基于注解的配置提供了XML设置的替代方案，它依靠字节码元数据来注入组件而不是XML声明。开发者通过在相关的类、方法或字段声明上使用注解，将配置移入组件类本身，而不是使用XML来描述bean的装配

> 注解注入是在XML注入之前进行的。因此，XML配置覆盖了通过这两种方法注入的属性的注解

### @Autowired

JSR 330的 @Inject 注解可以代替Spring的 @Autowired 注解

1. @Autowired 注解应用于构造函数

```java
public class MovieRecommender {

    private final CustomerPreferenceDao customerPreferenceDao;

    @Autowired
    public MovieRecommender(CustomerPreferenceDao customerPreferenceDao) {
        this.customerPreferenceDao = customerPreferenceDao;
    }
    // ...
}
```

从Spring Framework 4.3开始，如果目标Bean一开始就只定义了一个构造函数，那么在这样的构造函数上就不再需要 @Autowired 注解。然而，如果有几个构造函数，而且没有主要/默认构造函数，那么至少有一个构造函数必须用 @Autowired 注解，以便指示容器使用哪一个

2. @Autowired 注解应用于传统的setter方法

```java
public class SimpleMovieLister {

    private MovieFinder movieFinder;

    @Autowired
    public void setMovieFinder(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }
    // ...
}
```

3. @Autowired 应用于字段，甚至将其与构造函数混合

```java
public class MovieRecommender {

    private final CustomerPreferenceDao customerPreferenceDao;

    @Autowired
    private MovieCatalog movieCatalog;

    @Autowired
    public MovieRecommender(CustomerPreferenceDao customerPreferenceDao) {
        this.customerPreferenceDao = customerPreferenceDao;
    }
    // ...
}
```

4. 指示Spring从 ApplicationContext 中提供所有特定类型的Bean，方法是将 @Autowired 注解添加到期望有该类型数组的字段或方法中，假如有一个MovieCatalog，Spring会自动把所有类型为MovieCatalog的Bean装配为一个List注入进来，这样一来，我们每新增一个MovieCatalog类型，就自动被Spring装配到MovieCatalogs中了，非常方便

```java
public interface MovieCatalog {
    void validate(String email, String password, String name);
}
// 数组，
public class MovieRecommender {
    @Autowired
    private MovieCatalogs[] movieCatalogs;
}
// 集合
public class MovieRecommender {
    @Autowired
    private Set<MovieCatalog> movieCatalogs;
}
```

因为Spring是通过扫描classpath获取到所有的Bean，而List是有序的，要指定List中Bean的顺序，可以加上@Order注解

```java
@Component
@Order(1)
public class EmailValidator implements Validator {
}

@Component
@Order(2)
public class PasswordValidator implements Validator {
}

@Component
@Order(3)
public class NameValidator implements Validator {
}
```

### @Bean

如果一个Bean不在我们自己的package管理之内，在@Configuration类中编写一个Java方法创建并返回它，注意给方法标记一个@Bean注解

```java
@Configuration
@ComponentScan
public class AppConfig {
    // 创建一个Bean:
    @Bean
    ZoneId createZoneId() {
        return ZoneId.of("Z");
    }
}
```

Spring也提供了工厂模式，允许定义一个工厂，然后由工厂创建真正的Bean，用工厂模式创建Bean需要实现FactoryBean接口：

```java
@Component
public class ZoneIdFactoryBean implements FactoryBean<ZoneId> {

    String zone = "Z";

    @Override
    public ZoneId getObject() throws Exception {
        return ZoneId.of(zone);
    }

    @Override
    public Class<?> getObjectType() {
        return ZoneId.class;
    }
}

```

当一个Bean实现了FactoryBean接口后，Spring会先实例化这个工厂，然后调用getObject()创建真正的Bean。getObjectType()可以指定创建的Bean的类型，因为指定类型不一定与实际类型一致，可以是接口或抽象类

### @Primary

按类型自动注入可能会导致多个候选者，所以经常需要对选择过程进行更多的控制。实现这一目标的方法之一是使用Spring的 @Primary 注解。@Primary 表示，当多个Bean是自动注入到一个单值（single value）依赖的候选者时，应该优先考虑一个特定的Bean。如果在候选者中正好有一个主要（primary）Bean存在，它就会成为自动注入的值

```java
@Configuration
public class MovieConfiguration {

    @Bean
    @Primary
    public MovieCatalog firstMovieCatalog() {  }

    @Bean
    public MovieCatalog secondMovieCatalog() {  }

    // ...
}
```

### @Qualifier

默认情况下，对一种类型的Bean，容器只创建一个实例。但有些时候，我们需要对一种类型的Bean创建多个实例

```java
@Configuration
@ComponentScan
public class AppConfig {
    @Bean
    ZoneId createZoneOfZ() {
        return ZoneId.of("Z");
    }

    @Bean
    ZoneId createZoneOfUTC8() {
        return ZoneId.of("UTC+08:00");
    }
}
```

Spring会报NoUniqueBeanDefinitionException异常，意思是出现了重复的Bean定义。 这个时候，需要给每个Bean添加不同的名字，可以用@Bean("name")指定别名，也可以用@Bean+@Qualifier("name")指定别名：

```java
@Configuration
@ComponentScan
public class AppConfig {
    @Bean("z")
    ZoneId createZoneOfZ() {
        return ZoneId.of("Z");
    }

    @Bean
    @Qualifier("utc8")
    ZoneId createZoneOfUTC8() {
        return ZoneId.of("UTC+08:00");
    }
}
```

存在多个同类型的Bean时，注入ZoneId又会报错，spring期望找到唯一的ZoneId类型Bean，但是找到两个，因此注入时，要指定Bean的名称：

```java
@Component
public class MailService {
    @Autowired(required = false)
    @Qualifier("z") // 指定注入名称为"z"的ZoneId
    private ZoneId zoneId ;

    private ZoneId zoneIdUTC8

    @Autowired(required = false)
    @Qualifier("utc8") // 指定注入名称为"z"的ZoneId
    MailService(ZoneId zoneIdUTC8){
        this.zoneIdUTC8 = zoneIdUTC8;
    }
}
```

### @Resource

Spring还支持通过在`字段`或`setter`方法上使用JSR-250 @Resource 注解（jakarta.annotation.Resource）进行注入，@Resource 需要一个name 属性

默认情况下，Spring将该值解释为要注入的Bean名称，如果没有明确指定名字，默认的名字来自于字段名或setter方法

如果是一个字段，它采用字段名，如果是setter 方法，则采用Bean的属性名，在没有明确指定名称的 @Resource 使用的特殊情况下，与 @Autowired 类似

```java
// setter方法
public class SimpleMovieLister {

    private MovieFinder movieFinder;

    @Resource(name="myMovieFinder") 
    public void setMovieFinder(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }
}

// 字段
public class SimpleMovieLister {

    @Resource(name="myMovieFinder")
    private MovieFinder movieFinder;

    public void setMovieFinder(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }
}
```

### @Value

@Value 通常用于注入外部化properties，Spring提供了一个默认的宽松的嵌入式值解析器（value resolver）。它将尝试解析属性值，如果无法解析，属性名称（例如 ${catalog.name}）将被注入作为值

当存在application.properties文件，并做以下配置

```properties
catalog.name=MovieCatalog
```

在配置类中读取配置文件

```java
@Configuration
@PropertySource("classpath:application.properties")
public class AppConfig { }
```

在bean中注入配置的值，如果不存在，则使用aliasName

```java
@Component
public class MovieRecommender {
    private final String catalog;
    public MovieRecommender(@Value("${catalog.name:aliasName}") String catalog) {
        this.catalog = catalog;
    }
}
```

另一种注入配置的方式是先通过一个简单的JavaBean持有所有的配置

```java
@Component
public class SmtpConfig {
    @Value("${smtp.host}")
    private String host;

    @Value("${smtp.port:25}")
    private int port;

    public String getHost() {
        return host;
    }

    public int getPort() {
        return port;
    }
}
```

在需要读取的地方，使用#{smtpConfig.host}注入

```java
@Component
public class MailService {
    @Value("#{smtpConfig.host}")
    private String smtpHost;

    @Value("#{smtpConfig.port}")
    private int smtpPort;
}
```

> 注意观察#{}这种注入语法，它和${key}不同的是，#{}表示从JavaBean读取属性

### @Profile

Spring为应用程序准备了Profile这一概念，用来表示不同的环境，我们在开发应用程序的时候根据自身的环境做一些适配

在运行程序时，加上JVM参数-Dspring.profiles.active=test/dev/production就可以指定环境启动

创建某个Bean时，Spring容器可以根据注解@Profile来决定是否创建

```java
@Configuration
@ComponentScan
public class AppConfig {
    @Bean
    @Profile("!test")
    ZoneId createZoneId() {
        return ZoneId.systemDefault();
    }

    @Bean
    @Profile("test")
    ZoneId createZoneIdForTest() {
        return ZoneId.of("America/New_York");
    }
}
```

当多条件时，可以使用以下方式：

```java
@Bean
@Profile({ "test", "master" }) // 满足 test 或 master
ZoneId createZoneId() {}
```

### @Configuration

@Configuration 是一个类级注解，表示一个对象是Bean定义的来源。@Configuration 类通过 @Bean 注解的方法声明bean。对 @Configuration 类上的 @Bean 方法的调用也可以用来定义bean间的依赖关系

声明bean间依赖关系的方法只有在 @Configuration 类中声明了 @Bean 方法时才有效。你不能通过使用普通的 @Component 类来声明bean间的依赖关系

### @Import

@Import 注解允许从另一个配置类中加载 @Bean 定义

```java
@Configuration
public class ConfigA {

    @Bean
    public A a() {
        return new A();
    }
}

@Configuration
@Import(ConfigA.class)
public class ConfigB {

    @Bean
    public B b() {
        return new B();
    }
}
```

现在，在实例化上下文时不需要同时指定 ConfigA.class 和 ConfigB.class，而只需要明确提供 ConfigB

```java
public static void main(String[] args) {
    ApplicationContext ctx = new AnnotationConfigApplicationContext(ConfigB.class);

    // now both beans A and B will be available...
    A a = ctx.getBean(A.class);
    B b = ctx.getBean(B.class);
}
```

### @Scope()

指定Bean的作用域

```java
@Scope("prototype")
@Repository
public class MovieFinderImpl implements MovieFinder {
    // ...
}
```

## 基于Java的容器配置

@Bean注解用来表示一个方法实例化、配置和初始化了一个新的对象，由Spring IoC容器管理

@Bean注解的作用与\<bean/>元素的作用相同，**可以在任何Spring @Component 中使用 @Bean 注解的方法**，最常被用于@Configuration Bean

### 声明Bean

1. @Bean注解来注解一个方法，用这个方法在 ApplicationContext 中注册一个Bean定义，该类型被指定为该方法的返回值，默认情况下，Bean的名字和方法的名字是一样的

```java
@Configuration
public class AppConfig {

    @Bean
    public TransferServiceImpl transferService() {
        return new TransferServiceImpl();
    }
}
```

2. 使用default方法来定义Bean，允许通过在默认方法上实现带有Bean定义的接口来组成Bean配置

```java
public interface BaseConfig {

    @Bean
    default TransferServiceImpl transferService() {
        return new TransferServiceImpl();
    }
}

@Configuration
public class AppConfig implements BaseConfig {

}
```

### Bean依赖

一个 @Bean 注解的方法可以有任意数量的参数，描述构建该Bean所需的依赖关系，解析机制与基于构造函数的依赖注入基本相同

```java
@Configuration
public class AppConfig {

    @Bean
    public TransferService transferService(AccountRepository accountRepository) {
        return new TransferServiceImpl(accountRepository);
    }
}
```

### 生命周期

任何用 @Bean 注解定义的类都支持常规的生命周期回调，并且可以使用JSR-250的 @PostConstruct 和 @PreDestroy 注解

常规的Spring 生命周期 回调也被完全支持。如果一个bean实现了 InitializingBean、DisposableBean 或 Lifecycle，它们各自的方法就会被容器调用

@Bean 注解支持指定任意的初始化和销毁回调方法，就像Spring XML在 bean 元素上的 init-method 和 destroy-method 属性一样

```java
public class BeanOne {

    public void init() {
        // initialization logic
    }
}

public class BeanTwo {

    public void cleanup() {
        // destruction logic
    }
}

@Configuration
public class AppConfig {

    @Bean(initMethod = "init")
    public BeanOne beanOne() {
        return new BeanOne();
    }

    @Bean(destroyMethod = "cleanup")
    public BeanTwo beanTwo() {
        return new BeanTwo();
    }
}
```

默认情况下，用Java配置定义的具有 public 的 close 或 shutdown 方法的Bean会自动被列入销毁回调

如果不希望它在容器关闭时被调用，可以在Bean定义中添加 @Bean(destroyMethod = "") 来禁用默认 (inferred) 模式

在构造过程中直接调用init()方法同样有效

```java
@Configuration
public class AppConfig {

    @Bean
    public BeanOne beanOne() {
        BeanOne beanOne = new BeanOne();
        beanOne.init();
        return beanOne;
    }

    // ...
}
```

### Bean作用域

使用`@Scope`注解可以指定你用@Bean注解一个特定的scope，默认的scope是`singleton`，可以用`@Scope`注解来覆盖它

```java
@Configuration
public class MyConfiguration {

    @Bean
    @Scope("prototype")
    public Encryptor encryptor() {
        // ...
    }
}
```

### Bean别名

默认情况下，配置类使用 @Bean 方法的名称作为结果Bean的名称，可以通`name`属性来重写，@Bean 注解的name属性接受一个`String`或者`String数组`来实现这一目的

```java
@Configuration
public class AppConfig {

    @Bean("myThing")
    public Thing thing() {
        return new Thing();
    }
}

@Configuration
public class AppConfig {

    @Bean({"dataSource", "subsystemA-dataSource", "subsystemB-dataSource"})
    public DataSource dataSource() {
        // instantiate, configure and return DataSource bean...
    }
}
```

### Bean描述

有时，为 Bean 提供更详细的文本描述是有帮助的，为了给 @Bean 添加描述，可以使用 @Description 注解

```java
@Configuration
public class AppConfig {

    @Bean
    @Description("Provides a basic example of a bean")
    public Thing thing() {
        return new Thing();
    }
}
```

### 使用@Import注解

就像\<import/>元素在Spring XML文件中被用来帮助模块化配置一样，@Import 注解允许从另一个配置类中加载 @Bean 定义

```java
@Configuration
public class ConfigA {

    @Bean
    public A a() {
        return new A();
    }
}

@Configuration
@Import(ConfigA.class)
public class ConfigB {

    @Bean
    public B b() {
        return new B();
    }
}
```

## Java和XML相结合

Spring的 @Configuration 类支持的目的并不是要100%完全取代Spring XML。一些设施，如Spring XML命名空间，仍然是配置容器的理想方式。在XML方便或必要的情况下，你有一个选择：要么通过使用例如 ClassPathXmlApplicationContext 以 "以XML为中心" 的方式实例化容器，要么通过使用 AnnotationConfigApplicationContext 和 @ImportResource 注解来根据需要导入XML，以 "以Java为中心" 的方式实例化它

### 以XML为中心使用@Configuration类

从XML引导Spring容器并以临时的方式包含 @Configuration 类可能是更好的做法。例如，在一个使用Spring XML的大型现有代码库中，根据需要创建 @Configuration 类并从现有的XML文件中包含它们是比较容易的，@Configuration 类最终是容器中的Bean定义

定义一个配置类

```java
@Configuration
public class AppConfig {

    @Autowired
    private DataSource dataSource;

    @Bean
    public AccountRepository accountRepository() {
        return new JdbcAccountRepository(dataSource);
    }

    @Bean
    public TransferService transferService() {
        return new TransferService(accountRepository());
    }
}
```

xml配置如下

```xml
<beans>
    <!-- enable processing of annotations such as @Autowired and @Configuration -->
    <context:annotation-config/>
    <context:property-placeholder location="classpath:/com/acme/jdbc.properties"/>

    <bean class="com.acme.AppConfig"/>

    <bean class="org.springframework.jdbc.datasource.DriverManagerDataSource">
        <property name="url" value="${jdbc.url}"/>
        <property name="username" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
    </bean>
</beans>
```

### 以java配置类为中心使用XML

在 @Configuration 类是配置容器的主要机制的应用中，仍然可能需要至少使用一些 XML。在这些情况下，你可以使用 @ImportResource 并只定义你需要的 XML。这样做实现了 "以 Java 为中心" 的配置容器的方法，并使 XML 保持在最低限度

```java
@Configuration
@ImportResource("classpath:/com/acme/properties-config.xml")
public class AppConfig {

    @Value("${jdbc.url}")
    private String url;

    @Value("${jdbc.username}")
    private String username;

    @Value("${jdbc.password}")
    private String password;

    @Bean
    public DataSource dataSource() {
        return new DriverManagerDataSource(url, username, password);
    }
}
```

properties-config.xml

```xml
<beans>
    <context:property-placeholder location="classpath:/com/acme/jdbc.properties"/>
</beans>
```

## 依赖

### 依赖注入

依赖注入（DI）是一个过程，对象仅通过构造参数、工厂方法的参数或在对象实例被构造或从工厂方法返回后在其上设置的属性来定义它们的依赖（即与它们一起工作的其它对象）。然后，容器在创建 bean 时注入这些依赖。这个过程从根本上说是Bean本身通过使用类的直接构造或服务定位模式来控制其依赖的实例化或位置的逆过程（因此被称为控制反转）

1. 基于构造器的依赖注入

基于构造函数的 DI 是通过容器调用带有许多参数的构造函数来完成的，每个参数代表一个依赖。调用带有特定参数的 static 工厂方法来构造 bean 几乎是等价的，本讨论对构造函数的参数和 static 工厂方法的参数进行类似处理。下面的例子显示了一个只能用构造函数注入的依赖注入的类

```java
public class SimpleMovieLister {

    private final MovieFinder movieFinder;

    public SimpleMovieLister(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }

}
```

```xml
<bean id="simpleMovieLister" class="examples.SimpleMovieLister">
    <!-- constructor injection using the neater ref attribute -->
    <constructor-arg ref="movieFinder"/>
</bean>

<bean id="movieFinder" class="examples.MovieFinder"/>
```

构造函数参数解析

构造函数参数解析匹配是通过使用参数的类型进行的。如果 bean 定义中的构造器参数不存在潜在的歧义，那么构造器参数在 bean 定义中的定义顺序就是这些参数在 bean 被实例化时被提供给适当的构造器的顺序

当使用一个简单的类型时，比如 \<value>true\</value>，Spring不能确定值的类型，所以在没有帮助的情况下不能通过类型进行匹配

- 通过使用 type 属性显式地指定构造函数参数的类型

```xml
<bean id="exampleBean" class="examples.ExampleBean">
    <constructor-arg type="int" value="7500000"/>
    <constructor-arg type="java.lang.String" value="42"/>
</bean>
```

- 使用 index 属性来明确指定构造函数参数的索引

```xml
<bean id="exampleBean" class="examples.ExampleBean">
    <constructor-arg index="0" value="7500000"/>
    <constructor-arg index="1" value="42"/>
</bean>
```

2. 基于Setter的依赖注入

基于 Setter 的 DI 是通过容器在调用无参数的构造函数或无参数的 static 工厂方法来实例化你的 bean 之后调用 Setter 方法来实现的

```xml
<bean id="exampleBean" class="examples.ExampleBean">
    <!-- setter injection using the nested ref element -->
    <property name="beanOne">
        <ref bean="anotherExampleBean"/>
    </property>

    <!-- setter injection using the neater ref attribute -->
    <property name="beanTwo" ref="yetAnotherBean"/>
    <property name="integerProperty" value="1"/>
</bean>

<bean id="anotherExampleBean" class="examples.AnotherBean"/>
<bean id="yetAnotherBean" class="examples.YetAnotherBean"/>
```

```java
public class ExampleBean {

    private AnotherBean beanOne;

    private YetAnotherBean beanTwo;

    private int i;

    public void setBeanOne(AnotherBean beanOne) {
        this.beanOne = beanOne;
    }

    public void setBeanTwo(YetAnotherBean beanTwo) {
        this.beanTwo = beanTwo;
    }

    public void setIntegerProperty(int i) {
        this.i = i;
    }
}
```

### 依赖的解析过程

容器按如下方式执行 bean 依赖解析。

1. ApplicationContext 是用描述所有bean的配置元数据创建和初始化的。配置元数据可以由XML、Java代码或注解来指定。
2. 对于每个Bean来说，它的依赖是以属性、构造函数参数或静态工厂方法的参数（如果你用它代替正常的构造函数）的形式表达的。在实际创建Bean时，这些依赖被提供给Bean。
3. 每个属性或构造函数参数都是要设置的值的实际定义，或对容器中另一个Bean的引用。
4. 每个作为值的属性或构造函数参数都会从其指定格式转换为该属性或构造函数参数的实际类型。默认情况下，Spring 可以将以字符串格式提供的值转换为所有内置类型，如
   int、long、String、boolean 等等。

当容器被创建时，Spring容器会验证每个Bean的配置。然而，在实际创建Bean之前，Bean的属性本身不会被设置。当容器被创建时，那些具有单例作用域并被设置为预实例化的Bean（默认）被创建。作用域在 Bean Scope 中定义。否则，Bean只有在被请求时才会被创建。创建 bean 有可能导致创建 bean 图（graph），因为 bean 的依赖关系和它的依赖关系（等等）被创建和分配

### 依赖范围

1. singleton：（默认情况下）为每个Spring IoC容器将单个Bean定义的Scope扩大到单个对象实例。

2. prototype：将单个Bean定义的Scope扩大到任何数量的对象实例。

3. request：将单个Bean定义的Scope扩大到单个HTTP请求的生命周期。也就是说，每个HTTP请求都有自己的Bean实例，该实例是在单个Bean定义的基础上创建的。只在Web
   感知的Spring ApplicationContext 的上下文中有效。

4. session：将单个Bean定义的Scope扩大到一个HTTP Session 的生命周期。只在Web感知的Spring ApplicationContext 的上下文中有效。

5. application：将单个Bean定义的 Scope 扩大到 ServletContext 的生命周期中。只在Web感知的Spring ApplicationContext 的上下文中有效。

6. websocket：将单个Bean定义的 Scope 扩大到 WebSocket 的生命周期。仅在具有Web感知的 Spring ApplicationContext 的上下文中有效。

## 元注解

Spring提供的许多注解都可以在你自己的代码中作为元注解使用。元注解是一个可以应用于另一个注解的注解，例如，Spring MVC的 @RestController 注解是由 @Controller 和 @ResponseBody 组成。

组合注解可以选择性地重新声明来自元注解的属性以允许定制。当你想只暴露元注解的一个子集的属性时，这可能特别有用。例如，Spring的 @SessionScope 注解将 scope 名称硬编码为 session，但仍然允许自定义 proxyMode。下面的列表显示了 SessionScope 注解的定义

```java
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Scope(WebApplicationContext.SCOPE_SESSION)
public @interface SessionScope {
    /**
     * Alias for {@link Scope#proxyMode}.
     * <p>Defaults to {@link ScopedProxyMode#TARGET_CLASS}.
     */
    @AliasFor(annotation = Scope.class)
    ScopedProxyMode proxyMode() default ScopedProxyMode.TARGET_CLASS;
}
```

然后，你可以使用 @SessionScope，而不用声明 proxyMode，也可以覆盖 proxyMode

```java
@Service
@SessionScope(proxyMode = ScopedProxyMode.INTERFACES)
public class SessionScopedUserService implements UserService {
}
```

## 扫描和管理组件

### 自动监测类和Bean定义

Spring可以自动检测 stereotype 的类，并在 ApplicationContext 中注册相应的 BeanDefinition 实例，需要@Configuration类中添加 @ComponentScan，其中 basePackages 属性是需要扫描的类的共同父包

```java
@Configuration
@ComponentScan(basePackages = "org.example") // 或者@ComponentScan("org.example")
public class AppConfig  {
    // ...
}
```

### 使用Filter来自定义扫描

默认情况下，用 @Component、@Repository、@Service、@Controller、 @Configuration 注解的类，或者本身用 @Component 注解的自定义注解是唯一被检测到的候选组件。然而，你可以通过应用自定义`filter`来修改和扩展这种行为。将它们作为 @ComponentScan 注解的 includeFilters 或 excludeFilters 属性，每个 filter 元素都需要`type`和`expression`属性。

FilterType定义了几种filter中使用的类型

- FilterType.ANNOTATION：按照注解过滤
- FilterType.ASSIGNABLE_TYPE：按照给定的类型,指定具体的类，子类也会被扫描到
- FilterType.ASPECTJ：使用ASPECTJ表达式
- FilterType.REGEX：正则
- FilterType.CUSTOM：自定义规则

```java
// ASSIGNABLE_TYPE: includeFilters 用法 包含Animal.class类可以被扫描到，包括其子类
@ComponentScan(value = "com.spring", includeFilters = {@Filter(type = FilterType.ASSIGNABLE_TYPE, classes = {Animal.class})})

//ANNOTATION: excludeFilters 用法 排除包含@Controller注解的类
@ComponentScan(value = "com.spring", excludeFilters = {@Filter(type = FilterType.ANNOTATION, classes = {Controller.class}),})

// ComponentScans用法
// 针对Java8 语法可以指定多个@ComponentScan，Java8以下可以用 //@ComponentScans() 配置多个规则
@ComponentScans(value = {
                @ComponentScan(value = "com.spring", includeFilters = {Filter(type = FilterType.ANNOTATION, classes = {Controller.class})
                }, useDefaultFilters = false) ,
                @ComponentScan(value = "com.spring", excludeFilters = {Filter(type = FilterType.ANNOTATION, classes = { Repository.class})
                })
        }
)
```

## Environment抽象

Environment 接口是一个集成在容器中的抽象，它对 application environment 的两个关键方面进行建模：配置文件（profiles） 和 属性（properties）

profile是一个命名的、逻辑上的bean定义组，只有在给定的profile处于活动状态时才会在容器中注册。无论是用 XML 定义的还是用注解定义的，Bean 都可以被分配给一个profile。Environment 对象在profile方面的作用是确定哪些profile（如果有的话）是当前活动（active）的，以及哪些profile（如果有的话）应该是默认活动的。

属性（Properties）在几乎所有的应用程序中都扮演着重要的角色，它可能来自各种来源：properties 文件、JVM系统属性、系统环境变量、JNDI、Servlet上下文参数、特设的 Properties 对象、Map 对象等等。与属性有关的 Environment 对象的作用是为用户提供一个方便的服务接口，用于配置属性源并从它们那里解析属性

### Bean定义配置

Bean定义配置（Bean definition profiles） 在核心容器中提供了一种机制，允许在不同的环境中注册不同的bean

**使用@Profile**

@Profile 注解让你表明当一个或多个指定的配置文件处于活动状态时，一个组件就有资格注册

```java
@Configuration
@Profile("development")
public class StandaloneDataConfig {

    @Bean
    public DataSource dataSource() {
        return new EmbeddedDatabaseBuilder()
            .setType(EmbeddedDatabaseType.HSQL)
            .addScript("classpath:com/bank/config/sql/schema.sql")
            .addScript("classpath:com/bank/config/sql/test-data.sql")
            .build();
    }
}

@Configuration
@Profile("production")
public class JndiDataConfig {

    @Bean(destroyMethod = "") 
    public DataSource dataSource() throws Exception {
        Context ctx = new InitialContext();
        return (DataSource) ctx.lookup("java:comp/env/jdbc/datasource");
    }
}
```

profile 字符串可以包含一个简单的 profile 名称（例如，production）或一个 profile 表达式。this用运算符!、|、&可以使profile表达式拥有更复杂的profile逻辑

@Profile 也可以在方法层面上声明，以便只包括一个配置类的一个特定Bean

```java
@Configuration
public class AppConfig {

    @Bean("dataSource")
    @Profile("development") (1)
    public DataSource standaloneDataSource() {
        return new EmbeddedDatabaseBuilder()
            .setType(EmbeddedDatabaseType.HSQL)
            .addScript("classpath:com/bank/config/sql/schema.sql")
            .addScript("classpath:com/bank/config/sql/test-data.sql")
            .build();
    }

    @Bean("dataSource")
    @Profile("production") (2)
    public DataSource jndiDataSource() throws Exception {
        Context ctx = new InitialContext();
        return (DataSource) ctx.lookup("java:comp/env/jdbc/datasource");
    }
}
```

**使用XML定义配置**

XML的对应部分是\<beans>元素的 profile 属性，可以将通过注解的配置改写为：

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:jdbc="http://www.springframework.org/schema/jdbc"
    xmlns:jee="http://www.springframework.org/schema/jee"
    xsi:schemaLocation="...">

    <!-- other bean definitions -->

    <beans profile="development">
        <jdbc:embedded-database id="dataSource">
            <jdbc:script location="classpath:com/bank/config/sql/schema.sql"/>
            <jdbc:script location="classpath:com/bank/config/sql/test-data.sql"/>
        </jdbc:embedded-database>
    </beans>

    <beans profile="production">
        <jee:jndi-lookup id="dataSource" jndi-name="java:comp/env/jdbc/datasource"/>
    </beans>
</beans>
```

**激活一个Profile**

1. 以编程方式对环境API进行激活

```java
AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext();
ctx.getEnvironment().setActiveProfiles("development");
ctx.register(SomeConfig.class, StandaloneDataConfig.class, JndiDataConfig.class);
ctx.refresh();
```

2. spring.profiles.active

通过spring.profiles.active属性声明性地激活profiles，它可以通过系统环境变量、JVM系统属性、web.xml 中的servlet上下文参数，甚至作为JNDI中的一个条目来指定

### PropertySource 抽象

PropertySource 是对任何key值对来源的简单抽象，Spring的 StandardEnvironment 配置了两个 PropertySource 对象—​一个代表JVM系统属性集合（System.getProperties()），一个代表系统环境变量集合（System.getenv()）

执行的搜索是分层次的。默认情况下，系统属性（system properties）比环境变量有优先权。因此，如果在调用 env.getProperty("my-property") 时，my-property 属性恰好在两个地方都被设置了，那么系统属性值 "胜出" 并被返回。请注意，属性值不会被合并，而是被前面的条目完全覆盖。

对于一个普通的 StandardServletEnvironment 来说，完整的层次结构如下，最高优先级的条目在顶部。

1. ServletConfig 参数（如果适用 - 例如，在 DispatcherServlet 上下文的情况下）。
2. ServletContext 参数（web.xml的context-param条目）.
3. JNDI环境变量（java:comp/env/ 条目）。
4. JVM系统属性（-D 命令行参数）。
5. JVM系统环境（操作系统环境变量）

**使用 @PropertySource**

@PropertySource 注解为向Spring的 Environment 添加 PropertySource 提供了一种方便的声明性机制

任何存在于 @PropertySource 资源位置的 ${…​} 占位符都会根据已经针对环境（environment）注册的属性源集合进行解析

```java
@Configuration
@PropertySource("classpath:/com/${my.placeholder:default/path}/app.properties")
public class AppConfig {

    @Autowired
    Environment env;

    @Bean
    public TestBean testBean() {
        TestBean testBean = new TestBean();
        testBean.setName(env.getProperty("testbean.name"));
        return testBean;
    }
}
```

## AOP

AOP, Aspect Oriented Programming, 是一种编程范式，直译过来就是面向切面编程，其实就是面向`特定方法`编程，主流的实现方式是动态代理

springAOP也是在管理bean对象的过程中，通过底层的动态代理机制，来实现对特定方法的编程

### AOP核心概念

1. Aspect（切面）: 一个跨越多个类的关注点的模块化。事务管理是企业级Java应用中横切关注点的一个很好的例子。在Spring AOP中，切面是通过使用常规类（基于 schema 的方法）或使用 @Aspect 注解的常规类（@AspectJ 风格）实现的
2. 连接点JoinPoint：程序执行过程中的一个点，例如一个方法的执行或一个异常的处理，在Spring AOP中，一个连接点总是代表一个方法的执行
3. 切入点PointCut：一个匹配连接点的谓词（predicate）
4. 通知Advice： 一个切面在一个特定的连接点采取的行动。不同类型的advice包括 "around"、"before" 和 "after" 的advice（Advice 类型将在后面讨论）。许多AOP框架，包括Spring，都将advice建模为一个拦截器，并在连接点（Join point）周围维护一个拦截器链

>advice在Spring AOP有以下几个类型:
>
> - Before advice: 在连接点之前运行的Advice ，但它不具备以下能力 阻止执行流进行到 join point 的能力（除非它抛出一个异常）
> - After returning advice: 在一个连接点正常完成后运行的Advice （例如，如果一个方法返回时没有抛出一个异常）
> - After (finally) advice: 无论连接点以何种方式退出（正常或特殊返回），都要运行该advice。
> - Around advice: 围绕一个连接点的advice，如方法调用。这是最强大的一种advice。Around advice可以在方法调用之前和之后执行自定义行为。它还负责选择是否继续进行连接点或通过返回自己的返回值或抛出一个异常来缩短advice方法的执行
> - After Throwing advice：异常通知，在原始方法抛出异常后执行

### 切入点表达式

1. execution：匹配方法执行

execution表示表达式的语法为：

```java
execution(访问修饰符? 返回值 包名.类名.方法名?(参数类型列表) throws 异常类型?)
// 示例
execution(public * com.example.demo.controller.*.*(..))：匹配com.example.demo.controller包下的所有方法，方法返回值任意，方法参数任意
execution(* com.example.demo.controller.*.*(..))：匹配com.example.demo.controller包下的所有方法，方法返回值任意，方法参数任意
execution(* *.*.*.*.*.*(..))：匹配所有方法，方法返回值任意，方法参数任意
```

当多个表达式组合使用时，可以以使用&&、||、!进行组合。

2. @anotation：

匹配方法上指定注解，表达式语法为

```java
@annotation(包名.注解名)
```

### 连接点

在@around注解的切面方法中，连接点只能使用ProceedingJoinPoint，在其他四个注解类型中，只能使用JoinPoint。JoinPoint是ProceedingJoinPoint的父类，JoinPoint可以获取连接点信息，如方法参数，方法返回值，方法签名等信息。

- 获取目标对象的类：String ClassName = joinPoint.getTarget().getClass().getName()
- 获取目标方法的方法名：String methodName = joinPoint.getSignature().getName()
- 获取方法运行时的参数：Object[] args = joinPoint.getArgs()
- 获取方法执行后的返回值：Object[] result = joinPoint.proceed(ObJect[] args)

## 事务

事务是逻辑上的一组操作，要么都执行，要么都不执行

### 事务的特性ACID

1. 原子性（Atomicity）：事务是最小的执行单位，不允许分割。事务的原子性确保动作要么全部完成，要么完全不起作用
2. 一致性（Consistency）：执行事务前后，数据保持一致，例如转账业务中，无论事务是否成功，转账者和收款人的总额应该是不变的
3. 隔离性（Isolation）：并发访问数据库时，一个用户的事务不被其他事务所干扰，各并发事务之间数据库是独立的
4. 持久性（Durability）：一个事务被提交之后。它对数据库中数据的改变是持久的，即使数据库发生故障也不应该对其有任何影响

A、I、D 是手段，C 是目的

### 编程式事务管理

通过 TransactionTemplate或者TransactionManager手动管理事务，实际应用中很少使用

使用TransactionTemplate 进行编程式事务管理

```java
@Autowired
private TransactionTemplate transactionTemplate;
public void testTransaction() {

        transactionTemplate.execute(new TransactionCallbackWithoutResult() {
            @Override
            protected void doInTransactionWithoutResult(TransactionStatus transactionStatus) {

                try {

                    // ....  业务代码
                } catch (Exception e){
                    //回滚
                    transactionStatus.setRollbackOnly();
                }

            }
        });
}
```

使用 TransactionManager 进行编程式事务管理

```java
@Autowired
private PlatformTransactionManager transactionManager;

public void testTransaction() {

  TransactionStatus status = transactionManager.getTransaction(new DefaultTransactionDefinition());
          try {
               // ....  业务代码
              transactionManager.commit(status);
          } catch (Exception e) {
              transactionManager.rollback(status);
          }
}
```

### 声明式事务管理

使用@Transactional注解进行事务管理，是通过 AOP 实现，代码侵入量很小

```java
@Transactional(propagation = Propagation.REQUIRED)
public void aMethod {
  //do something
  B b = new B();
  C c = new C();
  b.bMethod();
  c.cMethod();
}
```

### Spring事务管理接口

Spring 并不直接管理事务，而是提供了管理器接口PlatformTransactionManager

PlatformTransactionManager接口可以被看作是事务上层的管理者，而 TransactionDefinition 和 TransactionStatus 这两个接口可以看作是事务的描述。

PlatformTransactionManager会根据 TransactionDefinition 的定义比如事务超时时间、隔离级别、传播行为等来进行事务管理

TransactionStatus接口则提供了一些方法来获取事务相应的状态比如是否新事务、是否可以回滚等等

**1. PlatformTransactionManager**

通过PlatformTransactionManager接口，Spring为各个平台如：JDBC(DataSourceTransactionManager)、Hibernate(HibernateTransactionManager)、JPA(JpaTransactionManager)等都提供了对应的事务管理器，具体由各个平台实现

PlatformTransactionManager接口中定义了三个方法：

```java
package org.springframework.transaction;

import org.springframework.lang.Nullable;

public interface PlatformTransactionManager {
    //获得事务
    TransactionStatus getTransaction(@Nullable TransactionDefinition var1) throws TransactionException;
    //提交事务
    void commit(TransactionStatus var1) throws TransactionException;
    //回滚事务
    void rollback(TransactionStatus var1) throws TransactionException;
}
```

**2. TransactionDefinition**

事务管理器接口 PlatformTransactionManager 通过 getTransaction(TransactionDefinition definition) 方法来得到一个事务，这个方法里面的参数是 TransactionDefinition 类 ，这个类就定义了一些基本的事务属性

事务属性可以理解成事务的一些基本配置，描述了事务策略如何应用到方法上

TransactionDefinition 接口中定义了 5 个方法以及一些表示事务属性的常量比如隔离级别、传播行为等等

```java
package org.springframework.transaction;

import org.springframework.lang.Nullable;

public interface TransactionDefinition {
    int PROPAGATION_REQUIRED = 0;
    int PROPAGATION_SUPPORTS = 1;
    int PROPAGATION_MANDATORY = 2;
    int PROPAGATION_REQUIRES_NEW = 3;
    int PROPAGATION_NOT_SUPPORTED = 4;
    int PROPAGATION_NEVER = 5;
    int PROPAGATION_NESTED = 6;
    int ISOLATION_DEFAULT = -1;
    int ISOLATION_READ_UNCOMMITTED = 1;
    int ISOLATION_READ_COMMITTED = 2;
    int ISOLATION_REPEATABLE_READ = 4;
    int ISOLATION_SERIALIZABLE = 8;
    int TIMEOUT_DEFAULT = -1;
    // 返回事务的传播行为，默认值为 REQUIRED。
    int getPropagationBehavior();
    //返回事务的隔离级别，默认值是 DEFAULT
    int getIsolationLevel();
    // 返回事务的超时时间，默认值为-1。如果超过该时间限制但事务还没有完成，则自动回滚事务。
    int getTimeout();
    // 返回是否为只读事务，默认值为 false
    boolean isReadOnly();

    @Nullable
    String getName();
}
```

**3. TransactionStatus**

TransactionStatus接口用来记录事务的状态 该接口定义了一组方法,用来获取或判断事务的相应状态信息

```java
public interface TransactionStatus{
    boolean isNewTransaction(); // 是否是新的事务
    boolean hasSavepoint(); // 是否有恢复点
    void setRollbackOnly();  // 设置为只回滚
    boolean isRollbackOnly(); // 是否为只回滚
    boolean isCompleted; // 是否已完成
}
```

### 事务属性

##### 事务传播行为：propagation

事务传播行为是为了解决业务层方法之间互相调用的事务问题，当事务方法被另一个事务方法调用时，必须指定事务应该如何传播。例如：方法可能继续在现有事务中运行，也可能开启一个新事务，并在自己的事务中运行

Spring 相应地定义了一个枚举类：Propagation

```java
package org.springframework.transaction.annotation;

import org.springframework.transaction.TransactionDefinition;

public enum Propagation {

    REQUIRED(TransactionDefinition.PROPAGATION_REQUIRED),

    SUPPORTS(TransactionDefinition.PROPAGATION_SUPPORTS),

    MANDATORY(TransactionDefinition.PROPAGATION_MANDATORY),

    REQUIRES_NEW(TransactionDefinition.PROPAGATION_REQUIRES_NEW),

    NOT_SUPPORTED(TransactionDefinition.PROPAGATION_NOT_SUPPORTED),

    NEVER(TransactionDefinition.PROPAGATION_NEVER),

    NESTED(TransactionDefinition.PROPAGATION_NESTED);

    private final int value;

    Propagation(int value) {
        this.value = value;
    }

    public int value() {
        return this.value;
    }

}
```

**1. TransactionDefinition.PROPAGATION_REQUIRED**

使用的最多的一个事务传播行为，我们平时经常使用的@Transactional注解默认使用就是这个事务传播行为

- 如果当前存在事务，则加入该事务；如果当前没有事务，则创建一个新的事务。也就是说：如果外部方法没有开启事务的话，Propagation.REQUIRED修饰的内部方法会新开启自己的事务，且开启的事务相互独立，互不干扰
- 如果外部方法开启事务并且被Propagation.REQUIRED的话，所有Propagation.REQUIRED修饰的内部方法和外部方法均属于同一事务 ，只要一个方法回滚，整个事务均回滚

**2. TransactionDefinition.PROPAGATION_REQUIRES_NEW**

创建一个新的事务，如果当前存在事务，则把当前事务挂起。也就是说不管外部方法是否开启事务，Propagation.REQUIRES_NEW修饰的内部方法会新开启自己的事务，且开启的事务相互独立，互不干扰

- 如果外部事物方法发生回滚，内部方法传播行为被定义为TransactionDefinition.PROPAGATION_REQUIRES_NEW的不会发生回滚
- 如果内部发生未被捕获的异常，并且这个异常满足回滚的要求，外部方法也会发生回滚

**3.TransactionDefinition.PROPAGATION_NESTED**

如果当前存在事务，则创建一个事务作为当前事务的嵌套事务执行； 如果当前没有事务，就执行与TransactionDefinition.PROPAGATION_REQUIRED类似的操作

也就是说：在外部方法开启事务的情况下，在内部开启一个新的事务，作为嵌套事务存在。如果外部方法无事务，则单独开启一个事务，与 PROPAGATION_REQUIRED 类似

TransactionDefinition.PROPAGATION_NESTED代表的嵌套事务以父子关系呈现，其核心理念是子事务不会独立提交，依赖于父事务，在父事务中运行；当父事务提交时，子事务也会随着提交，理所当然的，当父事务回滚时，子事务也会回滚

与TransactionDefinition.PROPAGATION_REQUIRES_NEW区别于：PROPAGATION_REQUIRES_NEW是独立事务，不依赖于外部事务，以平级关系呈现，执行完就会立即提交，与外部事务无关；子事务也有自己的特性，可以独立进行回滚，不会引发父事务的回滚，但是前提是需要处理子事务的异常，避免异常被父事务感知导致外部事务回滚

##### 事务隔离级别：isolation

Spring 响应地定义了一个枚举类：Isolation

```java
public enum Isolation {

  DEFAULT(TransactionDefinition.ISOLATION_DEFAULT),

  READ_UNCOMMITTED(TransactionDefinition.ISOLATION_READ_UNCOMMITTED),

  READ_COMMITTED(TransactionDefinition.ISOLATION_READ_COMMITTED),

  REPEATABLE_READ(TransactionDefinition.ISOLATION_REPEATABLE_READ),

  SERIALIZABLE(TransactionDefinition.ISOLATION_SERIALIZABLE);

  private final int value;

  Isolation(int value) {
    this.value = value;
  }

  public int value() {
    return this.value;
  }

}
```

- TransactionDefinition.ISOLATION_DEFAULT :使用后端数据库默认的隔离级别，MySQL 默认采用的 REPEATABLE_READ 隔离级别 Oracle 默认采用的 READ_COMMITTED 隔离级别.
- TransactionDefinition.ISOLATION_READ_UNCOMMITTED :最低的隔离级别，使用这个隔离级别很少，因为它允许读取尚未提交的数据变更，可能会导致脏读、幻读或不可重复读
- TransactionDefinition.ISOLATION_READ_COMMITTED : 允许读取并发事务已经提交的数据，可以阻止脏读，但是幻读或不可重复读仍有可能发生
- TransactionDefinition.ISOLATION_REPEATABLE_READ : 对同一字段的多次读取结果都是一致的，除非数据是被本身事务自己所修改，可以阻止脏读和不可重复读，但幻读仍有可能发生。
- TransactionDefinition.ISOLATION_SERIALIZABLE : 最高的隔离级别，完全服从 ACID 的隔离级别。所有的事务依次逐个执行，这样事务之间就完全不可能产生干扰，也就是说，该级别可以防止脏读、不可重复读以及幻读。但是这将严重影响程序的性能。通常情况下也不会用到该级别

##### 事务超时： timeout

属性所谓事务超时，就是指一个事务所允许执行的最长时间，如果超过该时间限制但事务还没有完成，则自动回滚事务。在 TransactionDefinition 中以 int 的值来表示超时时间，其单位是秒，默认值为-1，这表示事务的超时时间取决于底层事务系统或者没有超时时间

##### 事务只读属性：readOnly

对于只有读取数据查询的事务，可以指定事务类型为 readonly，即只读事务。只读事务不涉及数据的修改，数据库会提供一些优化手段，适合用在有多条数据库查询操作的方法中

- 如果你一次执行单条查询语句，则没有必要启用事务支持，数据库默认支持 SQL 执行期间的读一致性
- 如果你一次执行多条查询语句，例如统计查询，报表查询，在这种场景下，多条查询 SQL 必须保证整体的读一致性，否则，在前条 SQL 查询之后，后条 SQL 查询之前，数据被其他用户改变，则该次整体的统计查询将会出现读数据不一致的状态，此时，应该启用事务支持

##### 事务回滚：rollbackFor

这些规则定义了哪些异常会导致事务回滚而哪些不会。默认情况下，事务只有遇到运行期异常（RuntimeException 的子类）时才会回滚，Error 也会导致事务回滚，但是，在遇到检查型（Checked）异常时不会回滚

如果你想要回滚你定义的特定的异常类型的话，可以这样：

```java
@Transactional(rollbackFor= MyException.class)
```

### @Transactional注解

方法：推荐将注解使用于方法上，不过需要注意的是：该注解只能应用到public方法上，否则不生效

类：如果这个注解使用在类上的话，表明该注解对该类中所有的public方法都生效

接口：不推荐在接口上使用

```java
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
public @interface Transactional {

  @AliasFor("transactionManager")
  String value() default "";

  @AliasFor("value")
  String transactionManager() default "";

  Propagation propagation() default Propagation.REQUIRED;

  Isolation isolation() default Isolation.DEFAULT;

  int timeout() default TransactionDefinition.TIMEOUT_DEFAULT;

  boolean readOnly() default false;

  Class<? extends Throwable>[] rollbackFor() default {};

  String[] rollbackForClassName() default {};

  Class<? extends Throwable>[] noRollbackFor() default {};

  String[] noRollbackForClassName() default {};

}
```

## 过滤器

过滤器是javaWeb三大组件之一，过滤器可以把请求拦截下来，做一些特殊处理，比如权限验证，日志记录，数据过滤、统一编码处理、敏感字符处理等

### 定义过滤器

1. 创建一个过滤器类，继承Filter接口，并实现init、doFilter、destroy方法
2. 添加@WebFilter注解，通过patterns属性配置拦截的请求路径
3. 在启动类中通过@ServletComponentScan注解来扫描过滤器类

```java

@WebFilter(urlPatterns = "/*")
public class MyFilter implements Filter { 
    @Override
    void init(FilterConfig filterConfig) throws ServletException {}

    @Override
    void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        // 放行处理
        filterChain.doFilter(servletRequest,servletResponse);
    }

    @Override
    void destroy() {}
}
```

### doFilter执行流程

doFilter方法执行以调用放行逻辑chain.doFilter()方法为界限，执行前会执行放行前的逻辑，放行逻辑chain.doFilter()会访问web资源，即controller方法，然后执行放行后的逻辑。

如果要阻止放行操作，可以调用servletResponse.getWriter().write(data)方法写入响应数据，并结束响应。需要注意的是，data为序列化后的字符串，不能是对象，然后return

### 拦截路径配置

拦截路径配置通过@WebFilter注解的patterns属性来配置，通常有三种模式：

1. /url：匹配指定url，如@WebFilter(urlPatterns = "/user")
2. /url/*：匹配指定url下的所有子路径，如@WebFilter(urlPatterns = "/user/*")
3. /*： 匹配所有路径，如@WebFilter(urlPatterns = "/*")

### 过滤器链

在web应用中，可以配置多个过滤器，多个过滤器就形成了过滤器链，过滤器链的执行顺序是按照过滤器类名顺序执行的，即先执行第一个过滤器，然后执行第二个过滤器，依次类推直到访问web资源。

web应用的方法执行完成后，会执行过滤器的放行后逻辑，放行后的逻辑为放行顺序的反向执行。

## 拦截器

拦截器类似于过滤器，是spring框架提供的用于动态拦截控制器方法的执行

### 定义拦截器

1. 创建一个拦截器类，实现HandlerInterceptor接口，并实现preHandle、postHandle、afterCompletion方法
2. 在拦截器类中通过@Component注解来将拦截器交给IOC容器管理
3. 创建一个配置类，实现WebMvcConfigurer接口，并实现addInterceptors方法
4. 在配置类中通过@Configuration注解来标识配置类
5. 注入拦截器对象，在addInterceptors方法中通过registry参数的addInterceptor方法添加创建的拦截器对象
6. 调用addPathPatterns方法指定拦截的请求路径

## 全局异常处理器

全局异常处理器是springMVC提供的一种处理全局异常的机制，它可以处理项目中所有未处理的异常，并返回错误信息给前端。

### 创建全局异常处理器

1. 创建一个全局处理器类，并在类上添加@RestControllerAdvice注解，表名是全局异常处理器
2. 在全局处理器类中通过@ExceptionHandler注解来标识处理异常的方法，并指定异常类型，如@ExceptionHandler(Exception.class)
3. 在处理异常的方法中，可以通过参数获取异常信息，并返回错误信息给前端

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public Result handleException(Exception e) {
        return Result.error(e.getMessage());
    }
}
```
