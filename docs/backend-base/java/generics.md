# 泛型

在定义时无法确定具体的类型，需要等到使用的时候才能确定类型，为了避免数据类型转换异常，可以使用泛型，泛型可以理解为参数化的类型，泛型可以用在集合、数组、方法、类、接口等地方

## 定义泛型

定义泛型类

```java
public class GenericClass<T>{
    private T t;  
}   
```

定义泛型方法

```java
修饰符 <T> 返回值类型 方法名(参数列表){}
修饰符 <T> 返回值类型 方法名(T t){} // 在调用时确定类型
修饰符 <T> 返回值类型 方法名(ArrayList<T> list,T...t){}
```

定义泛型接口

```java
public interface GenericInterface<T>{}
class GenericClass<T> implements GenericInterface<T>{}
class GenericClass<T> implements GenericInterface<String>{}
```

泛型类、泛型方法、泛型接口的泛型参数可以有多个，多个参数之间用逗号隔开，如：\<T1,T2,T3\>

## 类型限定

类型限定规定在使用泛型类、泛型方法、泛型接口时，只能使用限定的参数类型及其继承的子类

## 通配符

1. 泛型通配符：\<?\>

泛型通配符?可以表示任意类型，如：

```java
List<?> list = new ArrayList<>();
```

2. 泛型上限：<? extends 类型>

问号只能接收extends类型的本类类型及其子类类型，如：

```java
List<? extends Number> list = new ArrayList<>();
```

3. 泛型下限：\<? super 类型\>

问号只能接收super类型的本类类型及其父类类型，如：

```java
List<? super Number> list = new ArrayList<>();
```
