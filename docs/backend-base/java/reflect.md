# 反射

## 获取Class对象

1. Class.forName("包名.类名")
2. 对象.getClass()
3. 类名.class

## 获取构造方法

 获取所有public构造方法

 Constructor\<?\>[] constructors = class.getConstructors();

 ```java
Class<?> aClass = Person.class;
Constructor<?>[] constructors = aClass.getConstructors();
  for (Constructor<?> constructor : constructors) {
    System.out.println(constructor);
  }
 ```

获取空参的public构造方法

 Constructor\<?\> constructor = class.getConstructor();

 ```java
Class<?> bClass  = Person.class
Constructor<?> constructor = bClass.getConstructor();
// 使用构造方法创建对象
constructor.newInstance()
```

获取有参的public构造方法

Constructor\<?\> constructor = class.getConstructor(Class\<?\>...parameterTypes)

```java
Class<?> cClass = Person.class;
Constructor<?> constructor = cClass.getConstructor(String.class, Integer.class);
// 使用构造方法创建对象
constructor.newInstance("张三", 18);
```

获取所有构造方法
Constructor\<?\>[] constructors = class.getDeclaredConstructors()

获取指定的构造方法

Constructor\<?\> constructor = class.getDeclaredConstructor(Class\<?\>... parameterTypes)

解除私有构造限制

constructor.setAccessible(true);

## 获取成员方法

获取所有的public方法

Method[] methods = class.getMethods()

获取指定的public方法

Method method = class.getMethod(methodName, Class\<?\>...parameterTypes)

调用通过反射获取到的方法

method.invoke(Object object, Object... parameterValues)

获取所有方法，包括private

Method[] methods = class.getDeclaredMethods()

获取指定的方法，包括private

Method method = class.getDeclaredMethod(methodName, Class\<?\>...parameterTypes)

解除私有方法限制

method.setAccessible(true)

## 获取成员变量

获取所有public成员变量

Field[] fields = class.getFields()

获取指定的public成员变量

Field field = class.getField(fieldName)

获取所有成员变量

Field[] fields = class.getDeclaredFields()

获取指定的成员变量

Field field = class.getDeclaredField(fieldName)

解除成员变量限制

field.setAccessible(true)

获取成员变量的值

Object value = field.get(Object object)

设置成员变量的值

field.set(Object obj, Object val))
