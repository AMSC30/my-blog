# Stream流

Stream就像一个高级的迭代器，只能遍历一次，要想操作流，首先需要有一个数据源，可以是数组或者集合。每次操作都会返回一个新的流对象，方便进行链式操作，但原有的流对象会保持不变

流的操作可以分为两种类型：

- 中间操作，可以有多个，每次返回一个新的流，可进行链式操作。
- 终端操作，只能有一个，每次执行完，这个流也就用光光了，无法执行下一个操作，因此只能放在最后

## 创建流

```java
static <T> Stream<T> concat(Stream<? extends T> a, Stream<? extends T> b)：建一个延迟连接的流，其元素是第一个流的所有元素，后跟第二个流的所有元素
static <T> Stream<T> empty()：返回一个空的顺序Stream
static <T> Stream<T> of(T t)：返回包含单个元素的顺序Stream。
static <T> Stream<T> of(T... values)：返回元素为指定值的顺序有序流。
static <T> Stream<T> ofNullable(T t)：返回包含单个元素的顺序Stream，如果非空，则返回一个空的Stream
```

如果是数组的话，可以使用Arrays提供的静态方法

```java
static <T> Stream<T> stream(T[] array)：返回一个以指定数组为源的顺序Stream。
static <T> Stream<T> stream(T[] array, int startInclusive, int endExclusive)：返回一个以指定对象数组的指定范围为源的顺序Stream
```

## 操作流

### 遍历

```java
// 过滤
Stream<T> filter(Predicate<? super T> predicate)：返回由与给定断言匹配的此流的元素组成的流
// 映射
<R> Stream<R> map(Function<? super T,? extends R> mapper)：返回由将给定函数应用于此流的元素的结果组成的流
// 迭代
void forEach(Consumer<? super T> action)：对此流的每个元素执行一个操作

Stream<T> peek(Consumer<? super T> action)：返回由此流的元素组成的流，同时在从生成的流中消耗元素时对每个元素执行提供的操作
```

### 匹配

```java
boolean allMatch(Predicate<? super T> predicate)：返回此流的所有元素是否都与提供的断言匹配。
boolean anyMatch(Predicate<? super T> predicate)：返回此流的任何元素是否与提供的断言匹配
boolean noneMatch(Predicate<? super T> predicate)：返回此流的元素是否没有一个与提供的谓词匹配
```

### 累积

```java
Optional<T> reduce(BinaryOperator<T> accumulator)：对此流的元素执行reduction，使用关联累积函数，并返回描述减少值（如果有）的Optional。
T reduce(T identity, BinaryOperator<T> accumulator)：对此流的元素执行reduction，使用提供的身份值和关联累积函数，并返回减少值
<U> U reduce(U identity, BiFunction<U,? super T,U> accumulator, BinaryOperator<U> combiner)：对此流的元素执行reduction，使用提供的身份、累积和组合函数
```

代码示例：

```java
public class ReduceStreamDemo {
    public static void main(String[] args) {
        Integer[] ints = {0, 1, 2, 3};
        List<Integer> list = Arrays.asList(ints);

        Optional<Integer> optional = list.stream().reduce((a, b) -> a + b);
        Optional<Integer> optional1 = list.stream().reduce(Integer::sum);
        System.out.println(optional.orElse(0)); // 输出6
        System.out.println(optional1.orElse(0)); // 输出6

        int reduce = list.stream().reduce(6, (a, b) -> a + b);
        System.out.println(reduce);// 输出12
        int reduce1 = list.stream().reduce(6, Integer::sum);
        System.out.println(reduce1);// 输出12
    }
}
```

### 转换

```java
<R> R collect(Supplier<R> supplier, BiConsumer<R,? super T> accumulator, BiConsumer<R,R> combiner)：对此流的元素执行一个 可变归约 操作。
<R, A> R collect(Collector<? super T,A,R> collector)：对此流的元素使用 Collector 执行一个 可变归约操作
default List<T> toList()：将此流的元素累积为List
Object[] toArray()：返回包含此流的元素的数组。
<A> A[] toArray(IntFunction<A[]> generator)：返回包含此流的元素的数组，使用提供的generator函数来分配返回的数组，以及可能需要用于分区执行或调整大小的其他数组
```

### 其他api

```java
// 排序
Stream<T> sorted()：返回根据自然顺序排序的此流的元素组成的流。
Stream<T> sorted(Comparator<? super T> comparator)：返回根据提供的Comparator排序的此流的元素组成的流

Stream<T> limit(long maxSize)：返回由此流的元素组成的流，截断长度不超过maxSize
Stream<T> skip(long n)：返回丢弃流的前n个元素后剩余元素组成的流
Optional<T> max(Comparator<? super T> comparator)：根据提供的Comparator返回此流的最大元素。
Optional<T> min(Comparator<? super T> comparator)：根据提供的Comparator返回此流的最小元素
long count()：返回此流中元素的计数。
Stream<T> distinct()：返回此流的不同元素（根据 Object.equals(Object)）组成的流
Optional<T> findAny()：返回一个描述流中某个元素的 Optional，如果流为空则返回一个空的 Optional。
Optional<T> findFirst()：返回描述此流的第一个元素的 Optional，如果流为空则返回一个空的 Optional
```
