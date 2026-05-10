#SpringBoot

## 参数配置

### 文件属性配置

1. application.properties

此方式使用key=value的方式对程序支持参数配置，如server.port=8080

2. application.yml

此方式使用两个空格缩进的方式来表示属性的层级，在yml文件中，缩进表示层级关系，而空格表示键值对之间的间隔，也就是yml文件比properties文件更易读。属性的冒号后要使用一个空格，如

```yml
server:
  port: 8080
```

3. application.yaml

与yml的方式相同

优先级关系：

application.properties > application.yml > application.yaml > application-{env}.yml > application-{env}.yaml

### 系统属性配置

系统属性可以在ida中进行配置，格式为：-Dkey=value，如：-Dserver.port=8080

也可以在启动命令行中进行指定，如java -jar xxx.jar --Dserver.port=8080

### 命令行参数配置

命令行参数可以在ida中进行配置，格式为：--key=value，如：--server.port=8080，优先级高于系统属性

也可以在启动命令行中进行指定，如java -jar xxx.jar --server.port=8080

> 参数配置优先级从高到低
> 命令行参数 > 系统属性 > properties > yml > yaml

## 常用注解

### @SpringBootApplication

定义在main方法入口类处，用于启动spring boot应用项目

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@Configuration
@EnableAutoConfiguration
@ComponentScan
public @interface SpringBootApplication {

 /**
  * Exclude specific auto-configuration classes such that they will never be applied.
  * @return the classes to exclude
  */
 Class<?>[] exclude() default {};

}
```

### @EnableAutoConfiguration

让spring boot根据类路径中的jar包依赖当前项目进行自动配置

### @ImportResource

加载xml配置，一般是放在启动main类上

```java
@ImportResource("classpath*:/spring/*.xml")  单个

@ImportResource({"classpath*:/spring/1.xml","classpath*:/spring/2.xml"})   多个
```

### @Value

application.properties定义属性，直接使用@Value注入即可

```java
public class A{
    @Value("${push.start:0}")    如果缺失，默认值为0
    private Long  id;
}
```

### @EnableConfigurationProperties与@ConfigurationProperties(prefix="xxx")

用`@EnableConfigurationProperties`注解使`@ConfigurationProperties`生效，并从IOC容器中获取bean

可以新建一个properties文件，@ConfigurationProperties的属性prefix指定properties的配置的前缀，通过location指定properties文件的位置

```java
@ConfigurationProperties(prefix="person")
public class PersonProperties {
 
 private String name ;
 private int age;
}
```

### @RestController

组合@Controller和@ResponseBody，当你开发一个和页面交互数据的控制时，比如bbs-web的api接口需要此注解

### @RequestMapping("/api2/copper")

用来映射web请求(访问路径和参数)、处理类和方法，可以注解在类或方法上。

注解在方法上的路径会继承注解在类上的路径。

produces属性: 定制返回的response的媒体类型和字符集，或需返回值是json对象

```java
@RequestMapping(value="/api2/copper",produces="application/json;charset=UTF-8",method = RequestMethod.POST)
```

### @RequestParam

获取request请求的参数值

```java
public List<CopperVO> getOpList(HttpServletRequest request,
                                    @RequestParam(value = "pageIndex", required = false) Integer pageIndex,
                                    @RequestParam(value = "pageSize", required = false) Integer pageSize) {
 
}
```

### @PathVariable

用来获得请求url中的动态参数

```java
@Controller  
public class TestController {  

     @RequestMapping(value="/user/{userId}/roles/{roleId}",method = RequestMethod.GET)  
     public String getLogin(@PathVariable("userId") String userId,  
         @PathVariable("roleId") String roleId){
           
         System.out.println("User Id : " + userId);  
         System.out.println("Role Id : " + roleId);  
         return "hello";  
     
     }  
}
```

### @ResponseBody

支持将返回值放在response体内，而不是返回一个页面。比如Ajax接口，可以用此注解返回数据而不是页面。此注解可以放置在返回值前或方法前

### @Bean

@Bean(name="bean的名字",initMethod="初始化时调用方法名字",destroyMethod="close")

定义在方法上，在容器内初始化一个bean实例类

```java
@Bean(destroyMethod="close")
@ConditionalOnMissingBean
public PersonService registryService() {
  return new PersonService();
}
```

### @Controller、@Service、@Repository、@Component

@Service用于标注业务层组件

@Controller用于标注控制层组件(如struts中的action)

@Repository用于标注数据访问组件，即DAO组件

@Component泛指组件，当组件不好归类的时候，我们可以使用这个注解进行标注

### @ComponentScan

注解会告知Spring扫描指定的包来初始化Spring

```java
@ComponentScan(basePackages = "com.bbs.xx")
```

### @Autowired

在默认情况下使用 @Autowired 注释进行自动注入时，Spring 容器中匹配的候选 Bean 数目必须有且仅有一个。当找不到一个匹配的 Bean 时，Spring 容器将抛出 BeanCreationException 异常，并指出必须至少拥有一个匹配的 Bean。当不能确定 Spring 容器中一定拥有某个类的 Bean 时，可以在需要自动注入该类 Bean 的地方可以使用 @Autowired(required = false)，这等于告诉 Spring: 在找不到匹配 Bean 时也不报错

### @Configuration

表示这是一个配置信息类

```java
@Configuration("name")//表示这是一个配置信息类,可以给这个配置类也起一个名称
@ComponentScan("spring4")//类似于xml中的<context:component-scan base-package="spring4"/>
public class Config {

    @Autowired//自动注入，如果容器中有多个符合的bean时，需要进一步明确
    @Qualifier("component")//进一步指明注入bean名称为component的bean
    private Component component;

    @Bean//类似于xml中的<bean id="newBean" class="spring4.Component"/>
    public Component newBean(){
        return new Component();
    }   
}
```

### @Import(Config1.class)

导入Config1配置类里实例化的bean

```java
@Configuration
public class CDConfig {

    @Bean   // 将compactDisc注册为 SpringContext中的bean
    public CompactDisc compactDisc() {
        return new CompactDisc();  // CompactDisc类型的
    }
}

@Configuration
@Import(CDConfig.class)  //导入CDConfig的配置
public class CDPlayerConfig {

    @Bean(name = "cDPlayer")
    public CDPlayer cdPlayer(CompactDisc compactDisc) {  
         // 这里会注入CompactDisc类型的bean
         // 这里注入的这个bean是CDConfig.class中的CompactDisc类型的那个bean
        return new CDPlayer(compactDisc);
    }
}
```

### @ConditionalOnExpression

开关为true的时候才实例化bean

```java
@Configuration
@ConditionalOnExpression("${enabled:false}")
public class BigpipeConfiguration {
    @Bean
    public OrderMessageMonitor orderMessageMonitor(ConfigContext configContext) {
        return new OrderMessageMonitor(configContext);
    }
}
```

### @ConditionalOnClass

该注解的参数对应的类必须存在，否则不解析该注解修饰的配置类

```java
@Configuration
@ConditionalOnClass({Gson.class})
public class GsonAutoConfiguration {
    public GsonAutoConfiguration() {
    }

    @Bean
    @ConditionalOnMissingBean
    public Gson gson() {
        return new Gson();
    }
}
```

### @ConditionalOnProperty

这个注解能够控制某个 @Configuration 是否生效。具体操作是通过其两个属性name以及havingValue来实现的，其中name用来从application.properties中读取某个属性值，如果该值为空，则返回false;如果值不为空，则将该值与havingValue指定的值进行比较，如果一样则返回true;否则返回false。如果返回值为false，则该configuration不生效；为true则生效

### @ConditionalOnMissingClass({ApplicationManager.class})

如果存在它修饰的类的bean，则不需要再创建这个bean；

### @ConditionOnMissingBean(name = "example")

表示如果name为“example”的bean存在，该注解修饰的代码块不执行

## 参数校验

Spring Validation是对hibernate validation的二次封装，用于支持spring mvc参数自动校验

### 实现步骤

**1. 添加pom依赖**

```xml
<!-- https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-validation -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

**2. 请求参数封装**

单一职责，所以将查询用户的参数封装到DTO中， 而不是Entity（数据库实体）本身

```java
/**
 * user.
 *
 * @author pdai
 */
@Data
@Builder
@ApiModel(value = "User", subTypes = {AddressParam.class})
public class UserParam implements Serializable {

    private static final long serialVersionUID = 1L;

    @NotEmpty(message = "could not be empty")
    private String userId;

    @NotEmpty(message = "could not be empty")
    @Email(message = "invalid email")
    private String email;

    @NotEmpty(message = "could not be empty")
    @Pattern(regexp = "^(\\d{6})(\\d{4})(\\d{2})(\\d{2})(\\d{3})([0-9]|X)$", message = "invalid ID")
    private String cardNo;

    @NotEmpty(message = "could not be empty")
    @Length(min = 1, max = 10, message = "nick name should be 1-10")
    private String nickName;

    @NotEmpty(message = "could not be empty")
    @Range(min = 0, max = 1, message = "sex should be 0-1")
    private int sex;

    @Max(value = 100, message = "Please input valid age")
    private int age;

    @Valid
    private AddressParam address;

}
```

**3. Controller中获取参数绑定结果**

使用@Valid或者@Validated注解，参数校验的值放在BindingResult中

```java
/**
 * @author pdai
 */
@Slf4j
@Api(value = "User Interfaces", tags = "User Interfaces")
@RestController
@RequestMapping("/user")
public class UserController {

    /**
     * http://localhost:8080/user/add .
     *
     * @param userParam user param
     * @return user
     */
    @ApiOperation("Add User")
    @ApiImplicitParam(name = "userParam", type = "body", dataTypeClass = UserParam.class, required = true)
    @PostMapping("add")
    public ResponseEntity<String> add(@Valid @RequestBody UserParam userParam, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<ObjectError> errors = bindingResult.getAllErrors();
            errors.forEach(p -> {
                FieldError fieldError = (FieldError) p;
                log.error("Invalid Parameter : object - {},field - {},errorMessage - {}", fieldError.getObjectName(), fieldError.getField(), fieldError.getDefaultMessage());
            });
            return ResponseEntity.badRequest().body("invalid parameter");
        }
        return ResponseEntity.ok("success");
    }
}
```

### 分组校验

上面的例子中，其实存在一个问题，UserParam既可以作为addUser的参数（id为空），又可以作为updateUser的参数（id不能为空），这时候需要使用分组校验
**1. 先定义分组（无需实现接口）**

```java
public interface AddValidationGroup {
}
public interface EditValidationGroup {
}
```

**2. 在UserParam的userId字段添加分组**

```java
@Data
@Builder
@ApiModel(value = "User", subTypes = {AddressParam.class})
public class UserParam implements Serializable {

    private static final long serialVersionUID = 1L;

    @NotEmpty(message = "{user.msg.userId.notEmpty}", groups = {EditValidationGroup.class}) // 这里
    private String userId;

}
```

**3. controller中的接口使用校验时使用分组**

```java
@Slf4j
@Api(value = "User Interfaces", tags = "User Interfaces")
@RestController
@RequestMapping("/user")
public class UserController {

    /**
     * http://localhost:8080/user/add .
     *
     * @param userParam user param
     * @return user
     */
    @ApiOperation("Add User")
    @ApiImplicitParam(name = "userParam", type = "body", dataTypeClass = UserParam.class, required = true)
    @PostMapping("add")
    public ResponseEntity<UserParam> add(@Validated(AddValidationGroup.class) @RequestBody UserParam userParam) {
        return ResponseEntity.ok(userParam);
    }

    /**
     * http://localhost:8080/user/add .
     *
     * @param userParam user param
     * @return user
     */
    @ApiOperation("Edit User")
    @ApiImplicitParam(name = "userParam", type = "body", dataTypeClass = UserParam.class, required = true)
    @PostMapping("edit")
    public ResponseEntity<UserParam> edit(@Validated(EditValidationGroup.class) @RequestBody UserParam userParam) {
        return ResponseEntity.ok(userParam);
    }
}
```

> 需要使用@Validated注解

### @Validated和@Valid的区别

@Validated：

@Validated提供了一个分组功能，可以在入参验证时，根据不同的分组采用不同的验证机制

@Validated可以用在类型、方法和方法参数上。但是不能用在成员属性（字段）上

@Valid：

@Valid可以用在方法、构造函数、方法参数和成员属性（字段）上

@Valid可以用在嵌套类型上

### 常用的校验注解

JSR-349

```java
@AssertFalse            被注释的元素只能为false
@AssertTrue             被注释的元素只能为true
@DecimalMax             被注释的元素必须小于或等于{value}
@DecimalMin             被注释的元素必须大于或等于{value}
@Digits                 被注释的元素数字的值超出了允许范围(只允许在{integer}位整数和{fraction}位小数范围内)
@Email                  被注释的元素不是一个合法的电子邮件地址
@Future                 被注释的元素需要是一个将来的时间
@FutureOrPresent        被注释的元素需要是一个将来或现在的时间
@Max                    被注释的元素最大不能超过{value}
@Min                    被注释的元素最小不能小于{value}
@Negative               被注释的元素必须是负数
@NegativeOrZero         被注释的元素必须是负数或零
@NotBlank               被注释的元素不能为空
@NotEmpty               被注释的元素不能为空
@NotNull                被注释的元素不能为null
@Null                   被注释的元素必须为null
@Past                   被注释的元素需要是一个过去的时间
@PastOrPresent          被注释的元素需要是一个过去或现在的时间
@Pattern                被注释的元素需要匹配正则表达式"{regexp}"
@Positive               被注释的元素必须是正数
@PositiveOrZero         被注释的元素必须是正数或零
@Size                   被注释的元素个数必须在{min}和{max}之间
```

spring validation

```java
@CreditCardNumber       被注释的元素不合法的信用卡号码
@Currency               被注释的元素不合法的货币 (必须是{value}其中之一)
@EAN                    被注释的元素不合法的{type}条形码
@Email                  被注释的元素不是一个合法的电子邮件地址  (已过期)
@Length                 被注释的元素长度需要在{min}和{max}之间
@CodePointLength        被注释的元素长度需要在{min}和{max}之间
@LuhnCheck              被注释的元素${validatedValue}的校验码不合法, Luhn模10校验和不匹配
@Mod10Check             被注释的元素${validatedValue}的校验码不合法, 模10校验和不匹配
@Mod11Check             被注释的元素${validatedValue}的校验码不合法, 模11校验和不匹配
@ModCheck               被注释的元素${validatedValue}的校验码不合法, ${modType}校验和不匹配  (已过期)
@NotBlank               被注释的元素不能为空  (已过期)
@NotEmpty               被注释的元素不能为空  (已过期)
@ParametersScriptAssert 被注释的元素执行脚本表达式"{script}"没有返回期望结果
@Range                  被注释的元素需要在{min}和{max}之间
@SafeHtml               被注释的元素可能有不安全的HTML内容
@ScriptAssert           被注释的元素执行脚本表达式"{script}"没有返回期望结果
@URL                    被注释的元素需要是一个合法的URL
@DurationMax            被注释的元素必须小于${inclusive == true ? '或等于' : ''}${days == 0 ? '' : days += '天'}${hours == 0 ? '' : hours += '小时'}${minutes == 0 ? '' : minutes += '分钟'}${seconds == 0 ? '' : seconds += '秒'}${millis == 0 ? '' : millis += '毫秒'}${nanos == 0 ? '' : nanos += '纳秒'}
@DurationMin            被注释的元素必须大于${inclusive == true ? '或等于' : ''}${days == 0 ? '' : days += '天'}${hours == 0 ? '' : hours += '小时'}${minutes == 0 ? '' : minutes += '分钟'}${seconds == 0 ? '' : seconds += '秒'}${millis == 0 ? '' : millis += '毫秒'}${nanos == 0 ? '' : nanos += '纳秒'}
```

### 自定义校验注解

**1. 定义校验器**

```java
public class TelephoneNumberValidator implements ConstraintValidator<TelephoneNumber, String> {
    private static final String REGEX_TEL = "0\\d{2,3}[-]?\\d{7,8}|0\\d{2,3}\\s?\\d{7,8}|13[0-9]\\d{8}|15[1089]\\d{8}";

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        try {
            return Pattern.matches(REGEX_TEL, s);
        } catch (Exception e) {
            return false;
        }
    }

}
```

**2. 定义注解**

```java
package tech.pdai.springboot.validation.group.validation.custom;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target({ METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER, TYPE_USE })
@Retention(RUNTIME)
@Documented
@Constraint(validatedBy = {TelephoneNumberValidator.class}) // 指定校验器
public @interface TelephoneNumber {
    String message() default "Invalid telephone number";
    Class<?>[] groups() default { };
    Class<? extends Payload>[] payload() default { };
}
```

3. 使用

```java
@Data
@Builder
@ApiModel(value = "User", subTypes = {AddressParam.class})
public class UserParam implements Serializable {

    private static final long serialVersionUID = 1L;

    @NotEmpty(message = "{user.msg.userId.notEmpty}", groups = {EditValidationGroup.class})
    private String userId;

    @TelephoneNumber(message = "invalid telephone number") // 这里
    private String telephone;

}
```

### 统一异常处理

@ControllerAdvice注解所注解的类，可以标识该类为全局异常处理类

```java
/**
 * Global exception handler.
 *
 * @author pdai
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * exception handler for bad request.
     *
     * @param e
     *            exception
     * @return ResponseResult
     */
    @ResponseBody
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = { BindException.class, ValidationException.class, MethodArgumentNotValidException.class })
    public ResponseResult<ExceptionData> handleParameterVerificationException(@NonNull Exception e) {
        ExceptionData.ExceptionDataBuilder exceptionDataBuilder = ExceptionData.builder();
        log.warn("Exception: {}", e.getMessage());
        if (e instanceof BindException) {
            BindingResult bindingResult = ((MethodArgumentNotValidException) e).getBindingResult();
            bindingResult.getAllErrors().stream().map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .forEach(exceptionDataBuilder::error);
        } else if (e instanceof ConstraintViolationException) {
            if (e.getMessage() != null) {
                exceptionDataBuilder.error(e.getMessage());
            }
        } else {
            exceptionDataBuilder.error("invalid parameter");
        }
        return ResponseResultEntity.fail(exceptionDataBuilder.build(), "invalid parameter");
    }

}
```

对于自定义异常类

```java
/**
 * handle business exception.
 *
 * @param businessException
 *            business exception
 * @return ResponseResult
 */
@ResponseBody
@ExceptionHandler(BusinessException.class)
public ResponseResult<BusinessException> processBusinessException(BusinessException businessException) {
    log.error(businessException.getLocalizedMessage(), businessException);
    // 这里可以屏蔽掉后台的异常栈信息，直接返回"business error"
    return ResponseResultEntity.fail(businessException, businessException.getLocalizedMessage());
}
```
