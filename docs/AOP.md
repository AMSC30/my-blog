## AOP

AOP, Aspect Oriented Programming, 是一种编程范式，直译过来就是面向切面编程，其实就是面向`特定方法`编程，主流的实现方式是动态代理

springAOP也是在管理bean对象的过程中，通过底层的动态代理机制，来实现对特定方法的编程

### springAOP操作

1. 引入springAOP依赖
2. 创建AOP类，在类上添加注解@Component，将类注入到ioc容器中，添加@Aspect注解，表明是一个AOP类
3. 编写类方法，并在类方法中添加@Arround注解，通过execution指定方法的切入点
4. 方法中通过ProceedingJoinPoint调用原始方法，并返回原始方法的返回值

### AOP的应用场景

1. 记录操作日志
2. 权限控制
3. 事务管理

### AOP的优势

1. 无代码侵入，不修改原始业务代码
2. 减少重复代码，提高开发效率
3. 易于维护

### AOP核心概念

1. 连接点：JoinPoint，满足execution规则的方法，也就是可以被AOP控制的方法，并包含方法在执行时的相关信息
2. 切入点：Pointcut，通过execution表达式定义的规则
3. 通知：Advice，AOP中定义的切点所对应的方法，可以添加到切点中

### 通知类型

1. @Around：环绕通知，在原始方法执行前后执行
2. @Before：前置通知，在原始方法执行前执行
3. @After：后置通知，在原始方法执行后执行，无论原始方法是否异常，都会执行
4. @AfterReturning：返回通知，在原始方法返回后执行
5. @AfterThrowing：异常通知，在原始方法抛出异常后执行

### 切入点表达式

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

### 连接点

在@around注解的切面方法中，连接点只能使用ProceedingJoinPoint，在其他四个注解类型中，只能使用JoinPoint。JoinPoint是ProceedingJoinPoint的父类，JoinPoint可以获取连接点信息，如方法参数，方法返回值，方法签名等信息。

- 获取目标对象的类：String ClassName = joinPoint.getTarget().getClass().getName()
- 获取目标方法的方法名：String methodName = joinPoint.getSignature().getName()
- 获取方法运行时的参数：Object[] args = joinPoint.getArgs()
- 获取方法执行后的返回值：Object[] result = joinPoint.proceed(ObJect[] args)
