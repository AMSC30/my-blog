# Spring框架

## Spring Framework

### IoC容器

IoC也被称为依赖注入（DI）。它是一个过程，对象仅通过构造参数、工厂方法的参数或在对象实例被构造或从工厂方法返回后在其上设置的属性来定义其依赖关系（即它们与之合作的其他对象）。然后容器在创建 bean 时注入这些依赖关系。这个过程从根本上说是Bean本身通过使用直接构建类或诸如服务定位模式的机制来控制其依赖关系的实例化或位置的逆过程（因此被称为控制反转）

### bean

一个Spring IoC容器管理着一个或多个Bean。这些Bean是用你提供给容器的配置元数据创建的（例如，以XML <bean/> 定义的形式）。

在容器本身中，这些Bean定义被表示为 BeanDefinition 对象，它包含（除其他信息外）以下元数据。

- 一个全路径类名：通常，被定义的Bean的实际实现类。
- Bean的行为配置元素，它说明了Bean在容器中的行为方式（scope、生命周期回调，等等）。
- 对其他Bean的引用，这些Bean需要做它的工作。这些引用也被称为合作者或依赖。
- 要在新创建的对象中设置的其他配置设置—​例如，pool的大小限制或在管理连接池的Bean中使用的连接数

#### bean的命名

每个Bean都有一个或多个标识符（identifier）。这些标识符在承载Bean的容器中必须是唯一的。一个Bean通常只有一个标识符。然而，如果它需要一个以上的标识符，多余的标识符可以被视为别名。这些名字是字母数字（'myBean'、'someService’等），但它们也可以包含特殊字符

#### bean的定义

bean 定义（definition）本质上是创建一个或多个对象的“配方”。容器在被要求时查看命名的Bean的“配方”，并使用该Bean定义所封装的配置元数据来创建（或获取）一个实际的对象

通常，在容器本身通过反射式地调用构造函数直接创建Bean的情况下，指定要构造的Bean类，有点相当于Java代码中的 new 操作符。 在不太常见的情况下，即容器在一个类上调用 static 工厂方法来创建 bean 时，要指定包含被调用的 static 工厂方法的实际类。从 static 工厂方法的调用中返回的对象类型可能是同一个类或完全是另一个类

1. 用构造函数进行实例化

当你用构造函数的方法创建一个Bean时，所有普通的类都可以被Spring使用并与之兼容。也就是说，被开发的类不需要实现任何特定的接口，也不需要以特定的方式进行编码。只需指定Bean类就足够了。然而，根据你对该特定Bean使用的IoC类型，你可能需要一个默认（空）构造函数。

Spring IoC容器几乎可以管理任何你希望它管理的类。它并不局限于管理真正的JavaBean。大多数Spring用户更喜欢真正的JavaBean，它只有一个默认的（无参数）构造函数，以及按照容器中的属性建模的适当的setter和getter。你也可以在你的容器中拥有更多奇特的非bean风格的类。例如，如果你需要使用一个绝对不遵守JavaBean规范的传统连接池，Spring也可以管理它

2. 用静态工厂方法进行实例化

在定义一个用静态工厂方法创建的Bean时，使用 class 属性来指定包含 static 工厂方法的类，并使用名为 factory-method 的属性来指定工厂方法本身的名称。你应该能够调用这个方法（有可选的参数，如后文所述）并返回一个活的对象，随后该对象被视为通过构造函数创建的。这种Bean定义的一个用途是在遗留代码中调用 static 工厂

### 依赖

#### 依赖注入

依赖注入（DI）是一个过程，对象仅通过构造参数、工厂方法的参数或在对象实例被构造或从工厂方法返回后在其上设置的属性来定义它们的依赖（即与它们一起工作的其它对象）。然后，容器在创建 bean 时注入这些依赖。这个过程从根本上说是Bean本身通过使用类的直接构造或服务定位模式来控制其依赖的实例化或位置的逆过程（因此被称为控制反转）

1. 基于构造器的依赖注入

基于构造函数的 DI 是通过容器调用带有许多参数的构造函数来完成的，每个参数代表一个依赖。调用带有特定参数的 static 工厂方法来构造 bean 几乎是等价的，本讨论对构造函数的参数和 static 工厂方法的参数进行类似处理。下面的例子显示了一个只能用构造函数注入的依赖注入的类

```java
public class SimpleMovieLister {

    // the SimpleMovieLister has a dependency on a MovieFinder
    private final MovieFinder movieFinder;

    // a constructor so that the Spring container can inject a MovieFinder
    public SimpleMovieLister(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }

    // business logic that actually uses the injected MovieFinder is omitted...
}
```

2. 基于Setter的依赖注入

基于 Setter 的 DI 是通过容器在调用无参数的构造函数或无参数的 static 工厂方法来实例化你的 bean 之后调用 Setter 方法来实现的

#### 依赖的解析过程

容器按如下方式执行 bean 依赖解析。

1. ApplicationContext 是用描述所有bean的配置元数据创建和初始化的。配置元数据可以由XML、Java代码或注解来指定。
2. 对于每个Bean来说，它的依赖是以属性、构造函数参数或静态工厂方法的参数（如果你用它代替正常的构造函数）的形式表达的。在实际创建Bean时，这些依赖被提供给Bean。
3. 每个属性或构造函数参数都是要设置的值的实际定义，或对容器中另一个Bean的引用。
4. 每个作为值的属性或构造函数参数都会从其指定格式转换为该属性或构造函数参数的实际类型。默认情况下，Spring 可以将以字符串格式提供的值转换为所有内置类型，如
   int、long、String、boolean 等等。

当容器被创建时，Spring容器会验证每个Bean的配置。然而，在实际创建Bean之前，Bean的属性本身不会被设置。当容器被创建时，那些具有单例作用域并被设置为预实例化的Bean（默认）被创建。作用域在 Bean Scope 中定义。否则，Bean只有在被请求时才会被创建。创建 bean 有可能导致创建 bean 图（graph），因为 bean 的依赖关系和它的依赖关系（等等）被创建和分配

#### 依赖范围

1. singleton：（默认情况下）为每个Spring IoC容器将单个Bean定义的Scope扩大到单个对象实例。

2. prototype：将单个Bean定义的Scope扩大到任何数量的对象实例。

3. request：将单个Bean定义的Scope扩大到单个HTTP请求的生命周期。也就是说，每个HTTP请求都有自己的Bean实例，该实例是在单个Bean定义的基础上创建的。只在Web
   感知的Spring ApplicationContext 的上下文中有效。

4. session：将单个Bean定义的Scope扩大到一个HTTP Session 的生命周期。只在Web感知的Spring ApplicationContext 的上下文中有效。

5. application：将单个Bean定义的 Scope 扩大到 ServletContext 的生命周期中。只在Web感知的Spring ApplicationContext 的上下文中有效。

6. websocket：将单个Bean定义的 Scope 扩大到 WebSocket 的生命周期。仅在具有Web感知的 Spring ApplicationContext 的上下文中有效。

### 基于注解的容器配置

基于注解的配置提供了XML设置的替代方案，它依靠字节码元数据来注入组件而不是XML声明。开发者通过在相关的类、方法或字段声明上使用注解，将配置移入组件类本身，而不是使用XML来描述bean的装配

#### @Autowired

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

#### @Bean

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

#### @Primary

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

#### @Qualifier

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
 ZoneId zoneId = ZoneId.systemDefault();
}
```

#### @Resource

Spring还支持通过在字段或Bean属性设置方法上使用JSR-250 @Resource 注解（jakarta.annotation.Resource）进行注入，@Resource 需要一个
name 属性。默认情况下，Spring将该值解释为要注入的Bean名称，如果没有明确指定名字，默认的名字来自于字段名或setter方法。如果是一个字段，它采用字段名。如果是setter 方法，则采用Bean的属性名，在没有明确指定名称的 @Resource 使用的特殊情况下，与 @Autowired 类似

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

#### @Value

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

#### @Profile

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

#### @Configuration

@Configuration 是一个类级注解，表示一个对象是Bean定义的来源。@Configuration 类通过 @Bean 注解的方法声明bean。对 @Configuration 类上的 @Bean 方法的调用也可以用来定义bean间的依赖关系

声明bean间依赖关系的方法只有在 @Configuration 类中声明了 @Bean 方法时才有效。你不能通过使用普通的 @Component 类来声明bean间的依赖关系

#### @Import

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

### 元注解

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

### AOP

AOP, Aspect Oriented Programming, 是一种编程范式，直译过来就是面向切面编程，其实就是面向`特定方法`编程，主流的实现方式是动态代理

springAOP也是在管理bean对象的过程中，通过底层的动态代理机制，来实现对特定方法的编程

#### springAOP操作

1. 引入springAOP依赖
2. 创建AOP类，在类上添加注解@Component，将类注入到ioc容器中，添加@Aspect注解，表明是一个AOP类
3. 编写类方法，并在类方法中添加@Arround注解，通过execution指定方法的切入点
4. 方法中通过ProceedingJoinPoint调用原始方法，并返回原始方法的返回值

#### AOP的应用场景

1. 记录操作日志
2. 权限控制
3. 事务管理

#### AOP的优势

1. 无代码侵入，不修改原始业务代码
2. 减少重复代码，提高开发效率
3. 易于维护

#### AOP核心概念

1. 连接点：JoinPoint，满足execution规则的方法，也就是可以被AOP控制的方法，并包含方法在执行时的相关信息
2. 切入点：Pointcut，通过execution表达式定义的规则
3. 通知：Advice，AOP中定义的切点所对应的方法，可以添加到切点中

#### 通知类型

1. @Around：环绕通知，在原始方法执行前后执行
2. @Before：前置通知，在原始方法执行前执行
3. @After：后置通知，在原始方法执行后执行，无论原始方法是否异常，都会执行
4. @AfterReturning：返回通知，在原始方法返回后执行
5. @AfterThrowing：异常通知，在原始方法抛出异常后执行

#### 切入点表达式

1. execution：匹配方法执行

execution表示表达式的语法为：

```java
execution(访问修饰符? 返回值 包名.类名.方法名?(参数类型列表) throws 异常类型)?
// 示例
execution(public * com.example.demo.controller.*.*(..))：匹配com.example.demo.controller包下的所有方法，方法返回值任意，方法参数任意
execution(* com.example.demo.controller.*.*(..))：匹配com.example.demo.controller包下的所有方法，方法返回值任意，方法参数任意
execution(* *.*.*.*.*.*(..))：匹配所有方法，方法返回值任意，方法参数任意
```

当多个表达式组合使用时，可以以使用&&、||、!进行组合。

2. @anotation：
   匹配方法上指定注解，表达式语法为

```
@annotation(包名.注解名)
```

#### 连接点

在@around注解的切面方法中，连接点只能使用ProceedingJoinPoint，在其他四个注解类型中，只能使用JoinPoint。JoinPoint是ProceedingJoinPoint的父类，JoinPoint可以获取连接点信息，如方法参数，方法返回值，方法签名等信息。

- 获取目标对象的类：String ClassName = joinPoint.getTarget().getClass().getName()
- 获取目标方法的方法名：String methodName = joinPoint.getSignature().getName()
- 获取方法运行时的参数：Object[] args = joinPoint.getArgs()
- 获取方法执行后的返回值：Object[] result = joinPoint.proceed(ObJect[] args)

### 过滤器

过滤器是javaWeb三大组件之一，过滤器可以把请求拦截下来，做一些特殊处理，比如权限验证，日志记录，数据过滤、统一编码处理、敏感字符处理等

#### 定义过滤器

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

#### doFilter执行流程

doFilter方法执行以调用放行逻辑chain.doFilter()方法为界限，执行前会执行放行前的逻辑，放行逻辑chain.doFilter()会访问web资源，即controller方法，然后执行放行后的逻辑。

如果要阻止放行操作，可以调用servletResponse.getWriter().write(data)方法写入响应数据，并结束响应。需要注意的是，data为序列化后的字符串，不能是对象，然后return

#### 拦截路径配置

拦截路径配置通过@WebFilter注解的patterns属性来配置，通常有三种模式：

1. /url：匹配指定url，如@WebFilter(urlPatterns = "/user")
2. /url/*：匹配指定url下的所有子路径，如@WebFilter(urlPatterns = "/user/*")
3. /*： 匹配所有路径，如@WebFilter(urlPatterns = "/*")

#### 过滤器链

在web应用中，可以配置多个过滤器，多个过滤器就形成了过滤器链，过滤器链的执行顺序是按照过滤器类名顺序执行的，即先执行第一个过滤器，然后执行第二个过滤器，依次类推直到访问web资源。

web应用的方法执行完成后，会执行过滤器的放行后逻辑，放行后的逻辑为放行顺序的反向执行。

### 拦截器

拦截器类似于过滤器，是spring框架提供的用于动态拦截控制器方法的执行

#### 定义拦截器

1. 创建一个拦截器类，实现HandlerInterceptor接口，并实现preHandle、postHandle、afterCompletion方法
2. 在拦截器类中通过@Component注解来将拦截器交给IOC容器管理
3. 创建一个配置类，实现WebMvcConfigurer接口，并实现addInterceptors方法
4. 在配置类中通过@Configuration注解来标识配置类
5. 注入拦截器对象，在addInterceptors方法中通过registry参数的addInterceptor方法添加创建的拦截器对象
6. 调用addPathPatterns方法指定拦截的请求路径

### 全局异常处理器

全局异常处理器是springMVC提供的一种处理全局异常的机制，它可以处理项目中所有未处理的异常，并返回错误信息给前端。

#### 创建全局异常处理器

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
