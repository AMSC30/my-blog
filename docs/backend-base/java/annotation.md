# 注解

## 注解的作用

说明：对代码进行说明，生成api文档

检查：检查代码是否符合条件，如@Override检查方式是否为重写方法，@FunctionalInterface检查是否为函数式接口

分析：对代码进行分析，起到代替配置文件的作用

## 注解的生命周期

1. SOURCE：@Retention(RetentionPolicy.SOURCE)，在源文件中有效，被编译器丢弃
2. CLASS：@Retention(RetentionPolicy.CLASS)，在class文件中有效，被JVM加载，但JVM退出时丢弃
3. RUNTIME：@Retention(RetentionPolicy.RUNTIME)，在JVM加载时有效，可以通过反射获取注解信息，并根据注解的定义执行相应的代码

## 注解的作用目标

注解的目标定义了注解将适用于哪一种级别的 Java 代码上，有些注解只适用于方法，有些只适用于成员变量，有些只适用于类，有些则都适用。截止到 Java 9，注解的类型一共有 11 种，定义在 ElementType 枚举中。

- TYPE：用于类、接口、注解、枚举
- FIELD：用于字段（类的成员变量），或者枚举常量
- METHOD：用于方法
- PARAMETER：用于普通方法或者构造方法的参数
- CONSTRUCTOR：用于构造方法
- LOCAL_VARIABLE：用于变量
- ANNOTATION_TYPE：用于注解
- PACKAGE：用于包
- TYPE_PARAMETER：用于泛型参数
- TYPE_USE：用于声明语句、泛型或者强制转换语句中的类型
- MODULE：用于模块

## 注解的定义

```java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface 注解名称 {
    数据类型 属性名();
    数据类型 属性名() default 默认值;
}
```

数据类型可以是8中基本类型、String、Class、enum、注解以及以上的一维数组组合

```java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface Book{
    String name();
    double price() default 12.34;
}
```

## 注解的使用

注解的使用本质上是给注解的属性赋值，注解可以在类、方法、属性、参数、局部变量上使用

使用格式：

- @注解名(属性名=值,属性名=值)
- @注解名(属性名={a,b,c},属性名=属性值)
- @注解名(value=值)，这种情况可以省略value使用`@注解名(值)`的形式

## 注解的解析

注解的解析，本质上是将注解中的属性值获取出来
