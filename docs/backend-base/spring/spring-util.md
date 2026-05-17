# Spring Util

## 日志类库

### 日志系统

#### java.util.logging (JUL)

JUL是java.util.logging的简称，java.util.logging是java自带的日志类库，由于性能和兼容性问题，一般不建议使用JUL

#### Log4j

Log4j 是 apache 的一个开源项目，创始人 Ceki Gulcu。Log4j 应该说是 Java 领域资格最老，应用最广的日志工具。Log4j 是高度可配置的，并可通过在运行时的外部文件配置。它根据记录的优先级别，并提供机制，以指示记录信息到许多的目的地，诸如：数据库，文件，控制台，UNIX 系统日志等

Log4j 中有三个主要组成部分：

1. loggers - 负责捕获记录信息。
2. appenders - 负责发布日志信息，以不同的首选目的地。
3. layouts - 负责格式化不同风格的日志信息

Log4j 的短板在于性能，在Logback 和 Log4j2 出来之后，Log4j的使用也减少了

#### Logback

Logback 是由 log4j 创始人 Ceki Gulcu 设计的又一个开源日志组件，是作为 Log4j 的继承者来开发的，提供了性能更好的实现，异步 logger，Filter等更多的特性。

logback 当前分成三个模块：

1. logback-core：是其它两个模块的基础模块
2. logback-classic：是 log4j 的一个 改良版本。此外 logback-classic 完整实现 SLF4J API 使你可以很方便地更换成其它日志系统如 log4j 或 JDK14 Logging
3. logback-access：访问模块与 Servlet 容器集成提供通过 Http 来访问日志的功能

#### Log4j2

Log4j2 和 Log4j1.x 并不兼容，设计上很大程度上模仿了 SLF4J/Logback，性能上也获得了很大的提升

> 从性能上Log4J2要强，但从生态上Logback+SLF4J优先
>
#### Log4j2与Logback对比

**差异：**

log4j2采用了更先进的锁机制和LMAX Disruptor库，性能优于logback，特别是在多线程环境下和使用异步日志的环境下

log4j2实现了“无垃圾”和“低垃圾”模式，减少因日志记录产生的垃圾对象，减少垃圾回收带来的性能下降

logback能够自动压缩/删除旧日志

logback提供了对日志的HTTP访问功能

**相同点：**

二者都支持Filter，能够实现灵活的日志记录规则（例如仅对一部分用户记录debug级别的日志）

二者都支持对配置文件的动态更新

二者都能够适配slf4j，logback与slf4j的适配应该会更好一些，毕竟省掉了一层适配库

### 日志门面

日志门面是一种提供统一日志接口的抽象层，它不负责实际的日志记录工作，而是充当应用程序与具体日志实现（如Logback、Log4j）之间的桥梁。其主要作用是让应用程序代码不直接依赖于具体的日志实现，从而能在不修改代码的情况下灵活地切换底层日志框架，解耦应用与日志系统的强耦合性

#### common-logging

common-logging 是 apache 的一个开源项目，缩写 JCL，提供日志功能的 API 接口，本身并不提供日志的具体实现，而是在运行时动态的绑定日志实现组件来工作（如 log4j、java.util.loggin）

#### slf4j

slf4j 是对不同日志框架提供的一个 API 封装，可以在部署的时候不修改任何配置即可接入一种日志实现方案。但是，slf4j 在编译时静态绑定真正的 Log 库。使用 SLF4J 时，如果你需要使用某一种日志实现，那么你必须选择正确的 SLF4J 的 jar 包的集合（各种桥接包）

slf4j不需要使用logger.isDebugEnabled()来解决日志因为字符拼接产生的性能问题。slf4j 的方式是使用{}作为字符串替换符

>slf4j 库类似于 Apache Common-Logging。但是，他在编译时静态绑定真正的日志库。这点似乎很麻烦，其实也不过是导入桥接 jar 包而已

### 日志库使用

使用日志解决方案基本可分为三步：引入 jar 包、配置、使用 API

强烈建议不要直接使用日志实现组件(logback、log4j、java.util.logging)，无法灵活替换日志库

首选推荐使用`slf4j + logback`的组合，也可以选择`common-logging+log4j`得组合

#### slf4j方案引入jar包

- slf4j + logback

logback-classic-1.0.13.jar 会自动将 slf4j-api-1.7.21.jar 和 logback-core-1.0.13.jar 也添加到你的项目中。

```xml
<dependency>
  <groupId>ch.qos.logback</groupId>
  <artifactId>logback-classic</artifactId>
  <version>1.0.13</version>
</dependency>
```

- slf4j + log4j

slf4j-log4j12-1.7.21.jar 会自动将 slf4j-api-1.7.21.jar 和 log4j-1.2.17.jar 也添加到你的项目中。

```xml
<dependency>
  <groupId>org.slf4j</groupId>
  <artifactId>slf4j-log4j12</artifactId>
  <version>1.7.21</version>
</dependency>
```

- slf4j + java.util.logging

slf4j-jdk14-1.7.21.jar 会自动将 slf4j-api-1.7.21.jar 也添加到你的项目中。

```xml
<dependency>
  <groupId>org.slf4j</groupId>
  <artifactId>slf4j-jdk14</artifactId>
  <version>1.7.21</version>
</dependency>
```

#### common-logging方案引入jar包

```xml
<dependency>
  <groupId>commons-logging</groupId>
  <artifactId>commons-logging</artifactId>
  <version>1.2</version>
</dependency>
<dependency>
  <groupId>log4j</groupId>
  <artifactId>log4j</artifactId>
  <version>1.2.17</version>
</dependency>
```

#### 桥接

spring 使用的日志解决方案是 common-logging + log4j，需要一个桥接 jar 包：logback-ext-spring

```xml
<dependency>
  <groupId>ch.qos.logback</groupId>
  <artifactId>logback-classic</artifactId>
  <version>1.1.3</version>
</dependency>
<dependency>
  <groupId>org.logback-extensions</groupId>
  <artifactId>logback-ext-spring</artifactId>
  <version>0.1.2</version>
</dependency>
<dependency>
  <groupId>org.slf4j</groupId>
  <artifactId>jcl-over-slf4j</artifactId>
  <version>1.7.12</version>
</dependency>
```

#### log4j 配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE log4j:configuration SYSTEM "log4j.dtd">
 
<log4j:configuration xmlns:log4j='http://jakarta.apache.org/log4j/'>
 
  <appender name="STDOUT" class="org.apache.log4j.ConsoleAppender">
    <layout class="org.apache.log4j.PatternLayout">
      <param name="ConversionPattern"
             value="%d{yyyy-MM-dd HH:mm:ss,SSS\} [%-5p] [%t] %c{36\}.%M - %m%n"/>
    </layout>
 
    <!--过滤器设置输出的级别-->
    <filter class="org.apache.log4j.varia.LevelRangeFilter">
      <param name="levelMin" value="debug"/>
      <param name="levelMax" value="fatal"/>
      <param name="AcceptOnMatch" value="true"/>
    </filter>
  </appender>
 
 
  <appender name="ALL" class="org.apache.log4j.DailyRollingFileAppender">
    <param name="File" value="${user.dir}/logs/spring-common/jcl/all"/>
    <param name="Append" value="true"/>
    <!-- 每天重新生成日志文件 -->
    <param name="DatePattern" value="'-'yyyy-MM-dd'.log'"/>
    <!-- 每小时重新生成日志文件 -->
    <!--<param name="DatePattern" value="'-'yyyy-MM-dd-HH'.log'"/>-->
    <layout class="org.apache.log4j.PatternLayout">
      <param name="ConversionPattern"
             value="%d{yyyy-MM-dd HH:mm:ss,SSS\} [%-5p] [%t] %c{36\}.%M - %m%n"/>
    </layout>
  </appender>
 
  <!-- 指定logger的设置，additivity指示是否遵循缺省的继承机制-->
  <logger name="org.zp.notes.spring" additivity="false">
    <level value="error"/>
    <appender-ref ref="STDOUT"/>
    <appender-ref ref="ALL"/>
  </logger>
 
  <!-- 根logger的设置-->
  <root>
    <level value="warn"/>
    <appender-ref ref="STDOUT"/>
  </root>
</log4j:configuration>
```

#### log4j2 配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="debug" strict="true" name="XMLConfigTest"
               packages="org.apache.logging.log4j.test">
  <Properties>
    <Property name="filename">target/test.log</Property>
  </Properties>
  <Filter type="ThresholdFilter" level="trace"/>
 
  <Appenders>
    <Appender type="Console" name="STDOUT">
      <Layout type="PatternLayout" pattern="%m MDC%X%n"/>
      <Filters>
        <Filter type="MarkerFilter" marker="FLOW" onMatch="DENY" onMismatch="NEUTRAL"/>
        <Filter type="MarkerFilter" marker="EXCEPTION" onMatch="DENY" onMismatch="ACCEPT"/>
      </Filters>
    </Appender>
    <Appender type="Console" name="FLOW">
      <Layout type="PatternLayout" pattern="%C{1}.%M %m %ex%n"/><!-- class and line number -->
      <Filters>
        <Filter type="MarkerFilter" marker="FLOW" onMatch="ACCEPT" onMismatch="NEUTRAL"/>
        <Filter type="MarkerFilter" marker="EXCEPTION" onMatch="ACCEPT" onMismatch="DENY"/>
      </Filters>
    </Appender>
    <Appender type="File" name="File" fileName="${filename}">
      <Layout type="PatternLayout">
        <Pattern>%d %p %C{1.} [%t] %m%n</Pattern>
      </Layout>
    </Appender>
  </Appenders>
 
  <Loggers>
    <Logger name="org.apache.logging.log4j.test1" level="debug" additivity="false">
      <Filter type="ThreadContextMapFilter">
        <KeyValuePair key="test" value="123"/>
      </Filter>
      <AppenderRef ref="STDOUT"/>
    </Logger>
 
    <Logger name="org.apache.logging.log4j.test2" level="debug" additivity="false">
      <AppenderRef ref="File"/>
    </Logger>
 
    <Root level="trace">
      <AppenderRef ref="STDOUT"/>
    </Root>
  </Loggers>
 
</Configuration>
```

#### logback 配置

```xml
<?xml version="1.0" encoding="UTF-8" ?>
 
<!-- logback中一共有5种有效级别，分别是TRACE、DEBUG、INFO、WARN、ERROR，优先级依次从低到高 -->
<configuration scan="true" scanPeriod="60 seconds" debug="false">
 
  <property name="DIR_NAME" value="spring-helloworld"/>
 
  <!-- 将记录日志打印到控制台 -->
  <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
    <encoder>
      <pattern>%d{HH:mm:ss.SSS} [%thread] [%-5p] %c{36}.%M - %m%n</pattern>
    </encoder>
  </appender>
 
  <!-- RollingFileAppender begin -->
  <appender name="ALL" class="ch.qos.logback.core.rolling.RollingFileAppender">
    <!-- 根据时间来制定滚动策略 -->
    <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
      <fileNamePattern>${user.dir}/logs/${DIR_NAME}/all.%d{yyyy-MM-dd}.log</fileNamePattern>
      <maxHistory>30</maxHistory>
    </rollingPolicy>
 
    <!-- 根据文件大小来制定滚动策略 -->
    <triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
      <maxFileSize>30MB</maxFileSize>
    </triggeringPolicy>
 
    <encoder>
      <pattern>%d{HH:mm:ss.SSS} [%thread] [%-5p] %c{36}.%M - %m%n</pattern>
    </encoder>
  </appender>
 
  <appender name="ERROR" class="ch.qos.logback.core.rolling.RollingFileAppender">
    <!-- 根据时间来制定滚动策略 -->
    <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
      <fileNamePattern>${user.dir}/logs/${DIR_NAME}/error.%d{yyyy-MM-dd}.log</fileNamePattern>
      <maxHistory>30</maxHistory>
    </rollingPolicy>
 
    <!-- 根据文件大小来制定滚动策略 -->
    <triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
      <maxFileSize>10MB</maxFileSize>
    </triggeringPolicy>
 
    <filter class="ch.qos.logback.classic.filter.LevelFilter">
      <level>ERROR</level>
      <onMatch>ACCEPT</onMatch>
      <onMismatch>DENY</onMismatch>
    </filter>
 
    <encoder>
      <pattern>%d{HH:mm:ss.SSS} [%thread] [%-5p] %c{36}.%M - %m%n</pattern>
    </encoder>
  </appender>
 
  <appender name="WARN" class="ch.qos.logback.core.rolling.RollingFileAppender">
    <!-- 根据时间来制定滚动策略 -->
    <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
      <fileNamePattern>${user.dir}/logs/${DIR_NAME}/warn.%d{yyyy-MM-dd}.log</fileNamePattern>
      <maxHistory>30</maxHistory>
    </rollingPolicy>
 
    <!-- 根据文件大小来制定滚动策略 -->
    <triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
      <maxFileSize>10MB</maxFileSize>
    </triggeringPolicy>
 
    <filter class="ch.qos.logback.classic.filter.LevelFilter">
      <level>WARN</level>
      <onMatch>ACCEPT</onMatch>
      <onMismatch>DENY</onMismatch>
    </filter>
 
    <encoder>
      <pattern>%d{HH:mm:ss.SSS} [%thread] [%-5p] %c{36}.%M - %m%n</pattern>
    </encoder>
  </appender>
 
  <appender name="INFO" class="ch.qos.logback.core.rolling.RollingFileAppender">
    <!-- 根据时间来制定滚动策略 -->
    <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
      <fileNamePattern>${user.dir}/logs/${DIR_NAME}/info.%d{yyyy-MM-dd}.log</fileNamePattern>
      <maxHistory>30</maxHistory>
    </rollingPolicy>
 
    <!-- 根据文件大小来制定滚动策略 -->
    <triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
      <maxFileSize>10MB</maxFileSize>
    </triggeringPolicy>
 
    <filter class="ch.qos.logback.classic.filter.LevelFilter">
      <level>INFO</level>
      <onMatch>ACCEPT</onMatch>
      <onMismatch>DENY</onMismatch>
    </filter>
 
    <encoder>
      <pattern>%d{HH:mm:ss.SSS} [%thread] [%-5p] %c{36}.%M - %m%n</pattern>
    </encoder>
  </appender>
 
  <appender name="DEBUG" class="ch.qos.logback.core.rolling.RollingFileAppender">
    <!-- 根据时间来制定滚动策略 -->
    <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
      <fileNamePattern>${user.dir}/logs/${DIR_NAME}/debug.%d{yyyy-MM-dd}.log</fileNamePattern>
      <maxHistory>30</maxHistory>
    </rollingPolicy>
 
    <!-- 根据文件大小来制定滚动策略 -->
    <triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
      <maxFileSize>10MB</maxFileSize>
    </triggeringPolicy>
 
    <filter class="ch.qos.logback.classic.filter.LevelFilter">
      <level>DEBUG</level>
      <onMatch>ACCEPT</onMatch>
      <onMismatch>DENY</onMismatch>
    </filter>
 
    <encoder>
      <pattern>%d{HH:mm:ss.SSS} [%thread] [%-5p] %c{36}.%M - %m%n</pattern>
    </encoder>
  </appender>
 
  <appender name="TRACE" class="ch.qos.logback.core.rolling.RollingFileAppender">
    <!-- 根据时间来制定滚动策略 -->
    <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
      <fileNamePattern>${user.dir}/logs/${DIR_NAME}/trace.%d{yyyy-MM-dd}.log</fileNamePattern>
      <maxHistory>30</maxHistory>
    </rollingPolicy>
 
    <!-- 根据文件大小来制定滚动策略 -->
    <triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
      <maxFileSize>10MB</maxFileSize>
    </triggeringPolicy>
 
    <filter class="ch.qos.logback.classic.filter.LevelFilter">
      <level>TRACE</level>
      <onMatch>ACCEPT</onMatch>
      <onMismatch>DENY</onMismatch>
    </filter>
 
    <encoder>
      <pattern>%d{HH:mm:ss.SSS} [%thread] [%-5p] %c{36}.%M - %m%n</pattern>
    </encoder>
  </appender>
 
  <appender name="SPRING" class="ch.qos.logback.core.rolling.RollingFileAppender">
    <!-- 根据时间来制定滚动策略 -->
    <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
      <fileNamePattern>${user.dir}/logs/${DIR_NAME}/springframework.%d{yyyy-MM-dd}.log
      </fileNamePattern>
      <maxHistory>30</maxHistory>
    </rollingPolicy>
 
    <!-- 根据文件大小来制定滚动策略 -->
    <triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
      <maxFileSize>10MB</maxFileSize>
    </triggeringPolicy>
 
    <encoder>
      <pattern>%d{HH:mm:ss.SSS} [%thread] [%-5p] %c{36}.%M - %m%n</pattern>
    </encoder>
  </appender>
  <!-- RollingFileAppender end -->
 
  <!-- logger begin -->
  <!-- 本项目的日志记录，分级打印 -->
  <logger name="org.zp.notes.spring" level="TRACE" additivity="false">
    <appender-ref ref="STDOUT"/>
    <appender-ref ref="ERROR"/>
    <appender-ref ref="WARN"/>
    <appender-ref ref="INFO"/>
    <appender-ref ref="DEBUG"/>
    <appender-ref ref="TRACE"/>
  </logger>
 
  <!-- SPRING框架日志 -->
  <logger name="org.springframework" level="WARN" additivity="false">
    <appender-ref ref="SPRING"/>
  </logger>
 
  <root level="TRACE">
    <appender-ref ref="ALL"/>
  </root>
  <!-- logger end -->
 
</configuration>
```

#### slf4j 用法

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
 
public class App {
    private static final Logger log = LoggerFactory.getLogger(App.class);
    public static void main(String[] args) {
        String msg = "print log, current level: {}";
        log.trace(msg, "trace");
        log.debug(msg, "debug");
        log.info(msg, "info");
        log.warn(msg, "warn");
        log.error(msg, "error");
    }
}
```

#### common-logging 用法

common-logging 用法和 slf4j 几乎一样，但是支持的打印等级多了一个更高级别的：fatal。

common-logging 不支持{}替换参数

```java
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
 
public class JclTest {
    private static final Log log = LogFactory.getLog(JclTest.class);
 
    public static void main(String[] args) {
        String msg = "print log, current level: ";
        log.trace(msg + "trace");
        log.debug(msg + "debug");
        log.info(msg + "info");
        log.warn(msg + "warn");
        log.error(msg + "error");
        log.fatal(msg + "fatal");
    }
}
```

## JSON类库

Java中并没有内置JSON的解析，因此使用JSON需要借助第三方类库。下面是几个常用的 JSON 解析类库：

1. FastJson: 阿里巴巴开发的 JSON 库，性能优秀
2. Jackson: 社区十分活跃且更新速度很快
3. Gson: 谷歌开发的 JSON 库，功能十分全面

### FastJson使用

Fastjson 是一个 Java 库，可以将 Java 对象转换为 JSON 格式，当然它也可以将 JSON 字符串转换为 Java 对象

#### 下载和配置

```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
    <version>x.x.x</version>
</dependency>
```

#### 序列化一个对象成JSON字符串

```java
User user = new User();
user.setName("校长");
user.setAge(3);
user.setSalary(new BigDecimal("123456789.0123"));
String jsonString = JSON.toJSONString(user);
System.out.println(jsonString);
// 输出 {"age":3,"name":"校长","old":false,"salary":123456789.0123}
```

#### 反序列化一个JSON字符串成Java对象

```java
String jsonString = "{\"age\":3,\"birthdate\":1496738822842,\"name\":\"校长\",\"old\":true,\"salary\":123456789.0123}";
 User u = JSON.parseObject(jsonString ,User.class);
 System.out.println(u.getName());
 // 输出 校长

String jsonStringArray = "[{\"age\":3,\"birthdate\":1496738822842,\"name\":\"校长\",\"old\":true,\"salary\":123456789.0123}]";
List<User> userList = JSON.parseArray(jsonStringArray, User.class);
System.out.println(userList.size());
// 输出 1
```

#### 对于日期的处理

默认序列化Date输出使用”yyyy-MM-dd HH:mm:ss”格式，可以用UseISO8601DateFormat特性换成”yyyy-MM-dd’T’HH:mm:ss”格式

```java
JSON.defaultTimeZone = TimeZone.getTimeZone("Asia/Shanghai");
JSON.defaultLocale = Locale.US;
        
public static class Model {
    @JSONField(format = "MMM dd, yyyy h:mm:ss aa")
    private java.util.Date date;

    public java.util.Date getDate() {
        return date;
    }

    public void setDate(java.util.Date date) {
        this.date = date;
    }

    @JSONField(format = "MMM-dd-yyyy h:mm:ss aa")
    public java.sql.Date date2;
}
```

#### 设置字段名

```java
public class A {
    @JSONField(name="ID")
    private int id;

    public int getId() {return id;}
    public void setId(int value) {this.id = id;}
}
// 输出：{"ID":1}
```

#### 设置是否不序列化某字段

```java
public class A {
    @JSONField(serialize=false)
    public Date date;
}

public class A {
    @JSONField(deserialize=false)
    public Date date;
}
```

#### 设置字段顺序

```java
public static class VO {
    @JSONField(ordinal = 3)
    private int f0;

    @JSONField(ordinal = 2)
    private int f1;

    @JSONField(ordinal = 1)
    private int f2;
}
```

> FastJson存在许多漏洞，尽量不要使用

### JackSon的使用

#### 依赖配置

```xml
<!-- https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-core -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-core</artifactId>
    <version>2.10.1</version>
</dependency>
<!-- https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-databind -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.10.1</version>
</dependency>
<!-- https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-annotations -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-annotations</artifactId>
    <version>2.10.1</version>
</dependency>
```

#### 序列化一个对象成JSON字符串

```java
public void toJson() throws JsonProcessingException {

    ObjectMapper mapper = new ObjectMapper();

    City case1 = new City();
    case1.setCity("SZ");
    case1.setAge(123);

    String jsonStr = mapper.writeValueAsString(case1);
    System.out.println("JSON:" + jsonStr);
}
// 输出：JSON:{"city":"SZ","age":123}
```

#### 反序列化一个JSON字符串成Java对象

```java
public void toObj() throws JsonParseException, JsonMappingException, IOException {
    ObjectMapper mapper = new ObjectMapper();
    String inputjsonstr = "{\"city\":\"SZ\",\"age\":123}";
    
    City readcase = mapper.readValue(inputjsonstr, City.class);

    System.out.println("city info:" + readcase);
}
```

#### 常用注解

- @JsonProperty("xxx"): 将当前的属性名在json字符串中重新命名为当前设置的这个值，比如在示例中，将age-->mAge
- @JsonIgnore: 将被标注的属性在生成json字符串的时候，直接忽略
- @JsonInclude: 是一个类级别的设置，JsonInclude.Include.NON_EMPTY标识只有非NULL的值才会被纳入json string之中，其余的都被忽略
- @JsonSerialize: 使用自定义的类来实现自定义的字段转换。
- @JsonDeserialize: 解析的时候，自定义的转换器
- @JsonAutoDetect: 设置类的访问策略，是否所有的属性都可以，还是按照一定的方式来提取
- @JsonRawValue: 无转换的将属性值写入到json 字符串中
- @JsonValue: 标注方法，用以替代缺省的方法，由该方法来完成json的字符输出
- @JsonFormat(pattern = "yyyy-MM-dd")： 设置日期格式

## Lombok工具库

Lombok是一款非常实用Java工具，可用来帮助开发人员消除Java的冗长代码，尤其是对于简单的Java对象（POJO）。实际上我并不推荐使用Lombok（不主动使用它）, 但是因为它有着很大的使用量，我们仍然有必要掌握它，不仅知道如何使用和它解决的问题，还要知道它的坑

### Lombok配置

```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.12</version>
    <scope>provided</scope>
</dependency>
```

### Lombok注解说明

- val：用在局部变量前面，相当于将变量声明为final

```java
public static void main(String[] args) {
    val sets = new HashSet<String>();
    val lists = new ArrayList<String>();
    val maps = new HashMap<String, String>();
    //=>相当于如下
    final Set<String> sets2 = new HashSet<>();
    final List<String> lists2 = new ArrayList<>();
    final Map<String, String> maps2 = new HashMap<>();
}
```

- @NonNull：给方法参数增加这个注解会自动在方法内对该参数进行是否为空的校验，如果为空，则抛出NPE（NullPointerException）

```java
public void notNullExample(@NonNull String string) {
    string.length();
}
//=>相当于
public void notNullExample(String string) {
    if (string != null) {
        string.length();
    } else {
        throw new NullPointerException("null");
    }
}
```

- @Cleanup：自动管理资源，用在局部变量之前，在当前变量范围内即将执行完毕退出之前会自动清理资源，自动生成try-finally这样的代码来关闭流

```java
public static void main(String[] args) {
    try {
        @Cleanup InputStream inputStream = new FileInputStream(args[0]);
    } catch (FileNotFoundException e) {
        e.printStackTrace();
    }
    //=>相当于
    InputStream inputStream = null;
    try {
        inputStream = new FileInputStream(args[0]);
    } catch (FileNotFoundException e) {
        e.printStackTrace();
    } finally {
        if (inputStream != null) {
            try {
                inputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```

- @Getter/@Setter：用在属性上，再也不用自己手写setter和getter方法了，还可以指定访问范围

```java
@Setter(AccessLevel.PUBLIC)
@Getter(AccessLevel.PROTECTED)
private int id;
private String shape;
```

- @ToString：用在类上，可以自动覆写toString方法，当然还可以加其他参数，例如@ToString(exclude=”id”)排除id属性，或者@ToString(callSuper=true, includeFieldNames=true)调用父类的toString方法，包含所有属性

```java
@ToString(exclude = "id", callSuper = true, includeFieldNames = true)
public class LombokDemo {
    private int id;
    private String name;
    private int age;
    public static void main(String[] args) {
        //输出LombokDemo(super=LombokDemo@48524010, name=null, age=0)
        System.out.println(new LombokDemo());
    }
}
```

- @EqualsAndHashCode：用在类上，自动生成equals方法和hashCode方法

```java
@EqualsAndHashCode(exclude = {"id", "shape"}, callSuper = false)
public class LombokDemo {
    private int id;
    private String shape;
}
```

- @NoArgsConstructor, @RequiredArgsConstructor and @AllArgsConstructor：用在类上，自动生成无参构造和使用所有参数的构造函数以及把所有+ @NonNull属性作为参数的构造函数，如果指定staticName = “of”`参数，同时还会生成一个返回类对象的静态工厂方法，比使用构造函数方便很多

```java
@NoArgsConstructor
@RequiredArgsConstructor(staticName = "of")
@AllArgsConstructor
public class LombokDemo {
    @NonNull
    private int id;
    @NonNull
    private String shape;
    private int age;
    public static void main(String[] args) {
        new LombokDemo(1, "circle");
        //使用静态工厂方法
        LombokDemo.of(2, "circle");
        //无参构造
        new LombokDemo();
        //包含所有参数
        new LombokDemo(1, "circle", 2);
    }
}
```

- @Data：注解在类上，相当于同时使用了@ToString、@EqualsAndHashCode、@Getter、@Setter和- @RequiredArgsConstrutor这些注解，对于POJO类十分有用

```java
import lombok.Data;
@Data
public class Menu {
    private String shopId;
    private String skuMenuId;
    private String skuName;
    private String normalizeSkuName;
    private String dishMenuId;
    private String dishName;
    private String dishNum;
    //默认阈值
    private float thresHold = 0;
    //新阈值
    private float newThresHold = 0;
    //总得分
    private float totalScore = 0;
}
```

- @Value：用在类上，是@Data的不可变形式，相当于为属性添加final声明，只提供getter方法，而不提供setter方法

```java
@Value
public class LombokDemo {
    @NonNull
    private int id;
    @NonNull
    private String shap;
    private int age;
    //相当于
    private final int id;
    public int getId() {
        return this.id;
    }
    ...
}
```

- @Builder：用在类、构造器、方法上，为你提供复杂的builder APIs，让你可以像如下方式一样调用Person.builder().name("Adam Savage").city("San Francisco").job("Mythbusters").job("Unchained Reaction").build();更多说明参考Builder

```java
@Builder
public class BuilderExample {
    private String name;
    private int age;
    @Singular
    private Set<String> occupations;
    public static void main(String[] args) {
        LombokDemo3 test = LombokDemo3.builder().age(11).name("test")
                .occupation("1")
                .occupation("2")
                .build();
    }
}
```

@Singular可以为集合类型的参数或字段生成一种特殊的方法, 它采用修改列表中一个元素而不是整个列表的方式，可以是增加一个元素，也可以是删除一个元素。在使用@Singular注释注释一个集合字段（使用@Builder注释类），lombok会将该构建器节点视为一个集合，并生成两个adder方法而不是setter方法。

```java
public LombokDemo3.LombokDemo3Builder occupation(String occupation) {
    if (this.occupations == null) {
        this.occupations = new ArrayList();
    }

    this.occupations.add(occupation);
    return this;
}

public LombokDemo3.LombokDemo3Builder occupations(Collection<? extends String> occupations) {
    if (occupations == null) {
        throw new NullPointerException("occupations cannot be null");
    } else {
        if (this.occupations == null) {
            this.occupations = new ArrayList();
        }

        this.occupations.addAll(occupations);
        return this;
    }
}

public LombokDemo3.LombokDemo3Builder clearOccupations() {
    if (this.occupations != null) {
        this.occupations.clear();
    }

    return this;
}
```

- @Builder.Default：@Builder.Default注解可以用来设置默认值，当字段没有赋值时，默认值会生效  

```java
@Builder
@ToString
public class BuilderDefaultExample {

    @Builder.Default
    private final String id = UUID.randomUUID().toString();
    
    private String username;

    @Builder.Default
    private long insertTime = System.currentTimeMillis();

}
```

- @SneakyThrows：自动抛受检异常，而无需显式在方法上使用throws语句

```java
import lombok.SneakyThrows;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
public class Test {
    @SneakyThrows()
    public void read() {
        InputStream inputStream = new FileInputStream("");
    }
    @SneakyThrows
    public void write() {
        throw new UnsupportedEncodingException();
    }
    //相当于
    public void read() throws FileNotFoundException {
        InputStream inputStream = new FileInputStream("");
    }
    public void write() throws UnsupportedEncodingException {
        throw new UnsupportedEncodingException();
    }
}
```

- @Synchronized：用在方法上，将方法声明为同步的，并自动加锁，而锁对象是一个私有的属性$lock或$LOCK，而java中的synchronized关键字锁对象是this，锁在this或者自己的类对象上存在副作用，就是你不能阻止非受控代码去锁this或者类对象，这可能会导致竞争条件或者其它线程错误

```java
public class SynchronizedDemo {
    @Synchronized
    public static void hello() {
        System.out.println("world");
    }
    //相当于
    private static final Object $LOCK = new Object[0];
    public static void hello() {
        synchronized ($LOCK) {
            System.out.println("world");
        }
    }
}
```

- @Getter(lazy=true)：可以替代经典的Double Check Lock样板代码

```java
public class GetterLazyExample {
    @Getter(lazy = true)
    private final double[] cached = expensive();
    private double[] expensive() {
        double[] result = new double[1000000];
        for (int i = 0; i < result.length; i++) {
            result[i] = Math.asin(i);
        }
        return result;
    }
}

// 相当于如下所示: 

import java.util.concurrent.atomic.AtomicReference;
public class GetterLazyExample {
    private final AtomicReference<java.lang.Object> cached = new AtomicReference<>();
    public double[] getCached() {
        java.lang.Object value = this.cached.get();
        if (value == null) {
            synchronized (this.cached) {
                value = this.cached.get();
                if (value == null) {
                    final double[] actualValue = expensive();
                    value = actualValue == null ? this.cached : actualValue;
                    this.cached.set(value);
                }
            }
        }
        return (double[]) (value == this.cached ? null : value);
    }
    private double[] expensive() {
        double[] result = new double[1000000];
        for (int i = 0; i < result.length; i++) {
            result[i] = Math.asin(i);
        }
        return result;
    }
}
```

- @Log：根据不同的注解生成不同类型的log对象，但是实例名称都是log，有六种可选实现类
- @CommonsLog Creates log = org.apache.commons.logging.LogFactory.getLog(LogExample.class);
- @Log Creates log = java.util.logging.Logger.getLogger(LogExample.class.getName());
- @Log4j Creates log = org.apache.log4j.Logger.getLogger(LogExample.class);
- @Log4j2 Creates log = org.apache.logging.log4j.LogManager.getLogger(LogExample.class);
- @Slf4j Creates log = org.slf4j.LoggerFactory.getLogger(LogExample.class);
- @XSlf4j Creates log = org.slf4j.ext.XLoggerFactory.getXLogger(LogExample.class)
