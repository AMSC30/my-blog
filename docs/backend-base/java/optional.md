# Optional

Optional类提供了一种用于表示可选值而非空引用的类级别解决方案

## 创建 Optional 对象

```java
static <T> Optional<T> empty():返回一个空的Optional实例
static <T> Optional<T> of(T value):返回描述给定非null值的Optional
static <T> Optional<T> ofNullable(T value):返回描述给定值的Optional（如果非null），否则返回一个空的Optional
```

## 判断值是否存在

```java
boolean isEmpty()：如果值不存在，则返回true，否则返回false
boolean isPresent()：如果存在值，则返回true，否则返回false
void ifPresent(Consumer<? super T> action)：如果存在值，则使用该值执行给定操作，否则不执行任何操作。
void ifPresentOrElse(Consumer<? super T> action, Runnable emptyAction)：如果存在值，则使用该值执行给定操作，否则执行给定的基于空值的操作
```

## 获取值

```java
T get()：如果存在值，则返回该值，否则抛出NoSuchElementException
T orElse(T other)：如果存在值，则返回该值，否则返回other。
T orElseGet(Supplier<? extends T> supplier)：如果存在值，则返回该值，否则返回由提供函数生成的结果
```

## 过滤值

```java
Optional<T> filter(Predicate<? super T> predicate)：如果存在值，并且该值与给定的断言匹配，则返回描述该值的Optional，否则返回一个空的Optional
```

## 转换值

```java
<U> Optional<U> map(Function<? super T,? extends U> mapper)：如果存在值，则返回描述该值的Optional（如同通过ofNullable(T)）应用给定映射函数的结果，否则返回一个空Optional
```
