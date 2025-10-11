# 集合框架

集合是一个长度可变的容器，提供了一系列方法来操作集合，集合中只能存放引用类型的数据，如果存放的是基本类型数据，那么会自动封装成对象。

单列集合：一个元素只包含一个部分

双列结合：一个元素含两个部分，如map包含key和value

集合的实现类

set接口、map接口和list接口都继承自collection接口，list接口下有ArrayList、LinkedList、Vector三种实现类，map接口下有HashMap、LinkedHashMap、TreeMap三种实现类，set接口下有HashSet、LinkedHashSet、TreeSet三种实现类

继承关系如下：
![集合](../images//collection.png)

## Collection接口

单列集合的顶级接口

创建一个集合

```java
Collection<E> 对象名 = new 实现类<E>()
```

常用实例方法

```java
// 增
boolean add(E e): 将元素添加到集合中
boolean addAll(Collection<? extends E>): 将一个集合添加到当前集合后面，集合合并的效果

// 删
boolean remove(E e): 从集合中删除指定元素，删除成功返回true
boolean removeAll(Collection<?> c)：删除此集合的所有也包含在指定集合中的元素（可选操作）
boolean retainAll(Collection<?> c)：仅保留此集合中包含在指定集合中的元素（可选操作）
void clear(): 清除集合中的所有元素

// 查
boolean contains(E e): 查询集合中是否含有某个元素
boolean containsAll(Collection<?> c)：如果此集合包含指定集合中的所有元素，则返回 true。
boolean isEmpty(): 查询集合是否为空
int size(): 查询集合中元素的数量

// 转换
Object[] toArray(): 将集合中的元素转换为数组形式
```

## List接口

List接口是继承自collection接口的有序列表，可以通过整数索引（在列表中的位置）访问元素，并在列表中搜索元素，通常允许重复元素

List接口在iterator 、add 、remove 、equals和hashCode方法的约定中扩展了额外的方法

### 静态方法

```java
// 创建
static <E> List<E> copyOf(Collection<? extends E> coll)：返回一个不可修改的列表 包含给定 Collection 的元素，按其迭代顺序
static <E> List<E> of(E... elements)：返回包含任意数量元素的不可修改列表
```

### 实例方法

list实例方法在collection的基础上做了一下扩展

```java
// 增
void add(int index, E element)：在此list中的指定位置插入指定元素（可选操作）

// 删
E remove(int index)：删除此list中指定位置的元素（可选操作）

// 改
E set(int index, E element)：用指定的元素替换此list中指定位置的元素（可选操作）

// 查
E get(int index)：返回此list中指定位置的元素
int indexOf(Object o)：返回此list中指定元素第一次出现的索引，如果此list不包含该元素，则返回 -1
int lastIndexOf(Object o)：返回此list中指定元素最后一次出现的索引，如果此list不包含该元素，则返回 -1
```

## Set接口

Set接口表示不包含重复元素的集合，也就是在集合中不包含满足 e1.equals(e2) 的一对元素e1和e2，最多包含一个空元素

与List一样，也在Collection的基础上做了增强

### 静态方法

```java
static <E> Set<E> copyOf(Collection<? extends E> coll)：返回包含给定 Collection 元素的 不可修改的集合
static <E> Set<E> of(E... elements)：返回包含任意数量元素的不可修改集
```

### 实例方法

```java
boolean add(E e)：如果指定的元素不存在，则将其添加到此集合（可选操作）
boolean addAll(Collection<? extends E> c)：将指定集合中的所有元素添加到此集合（如果它们不存在）（可选操作）
```

## ArrayList

底层由数组实现，线程不安全；ArrayList中的元素都是有序、有索引的，并且可以重复

除了实现 List 接口之外，此类还提供了一些方法来操纵内部用于存储列表的数组的大小

每个 ArrayList 实例都有一个capacity.容量是用于存储列表中元素的数组的大小。它始终至少与列表大小一样大。当元素被添加到 ArrayList 时，它的容量会自动增长

### 构造方法

```java
ArrayList():构造一个初始容量为 10 的空列表。
ArrayList(int initialCapacity):构造一个具有指定初始容量的空列表。
ArrayList(Collection<? extends E> c):构造一个包含指定集合元素的列表，按照集合迭代器返回元素的顺序
```

创建一个ArrayList：

```java
ArrayList<String> aList = new ArrayList<String>();
```

由于 ArrayList 实现了 List 接口，所以 aList 变量的类型可以是 List 类型；new 关键字声明后的尖括号中可以不再指定元素的类型，因为编译器可以通过前面尖括号中的类型进行智能推断

```java
List<String> aList = new ArrayList<>();
```

如果非常确定 ArrayList 中元素的个数，在创建的时候还可以指定初始大小，可以有效地避免在添加新的元素时进行不必要的扩容

```java
List<String> aList = new ArrayList<>(20);
```

实例方法：

```java
// 增
boolean addAll(int index, Collection<? extends E> c)：将指定集合中的所有元素插入此list，从指定位置开始

// 删
boolean removeIf(Predicate<? super E> filter)：移除此集合中满足给定谓词的所有元素。
protected void removeRange(int fromIndex, int toIndex)：从此list中删除索引介于 fromIndex 和 toIndex 之间的所有元素，包括在内

// 改
void trimToSize()：将此 ArrayList 实例的容量修剪为列表的当前大小

// 克隆
Object clone()：返回此 ArrayList 实例的浅表副本

// 遍历
void forEach(Consumer<? super E> action)：对 Iterable 的每个元素执行给定的操作，直到处理完所有元素或操作引发异常

// 截取
List<E> subList(int fromIndex, int toIndex)：返回此list中指定的 fromIndex（含）和 toIndex（不含）之间的部分的视图
```

## LinkedList

底层由链表实现，线程不安全，实现了List和queue接口

LinkedList中的元素是有序、有基于索引的操作方法，本质没有索引，并且可以重复

### 构造方法

```java
LinkedList()：构造一个空列表
LinkedList(Collection<? extends E> c)：构造一个包含指定集合元素的列表，按照集合迭代器返回元素的顺序
```

### 实例方法

```java
// 增
void add(int index, E element)：在此list中的指定位置插入指定元素
void addFirst(E e): 在链表开头添加元素
void addLast(E e): 在链表末尾添加元素
boolean addAll(int index, Collection<? extends E> c)将指定集合中的所有元素插入此list，从指定位置开始
void push(E e): 添加元素到头部
boolean offer(E e)：添加指定元素作为此list的尾部（最后一个元素）。
boolean offerFirst(E e)：在此list的前面插入指定的元素。
boolean offerLast(E e)：在此list的末尾插入指定的元素

// 删
E remove()：删除头部的元素并返回
E removeFirst(): 删除链表开头的元素，并返回删除的元素
E removeLast(): 删除链表末尾的元素，并返回删除的元素
E remove(int index)：移除此list中指定位置的元素
boolean removeFirstOccurrence(Object o)：删除此list中第一次出现的指定元素（从头到尾遍历列表时）
boolean removeLastOccurrence(Object o)：删除此list中最后一次出现的指定元素（从头到尾遍历列表时）
E poll()：检索并删除此list的头部（第一个元素）。
E pollFirst()：检索并删除此list的第一个元素，如果此list为空，则返回 null。
E pollLast()：检索并删除此list的最后一个元素，如果此list为空，则返回 null
E pop(): 删除链表开头的元素，并返回删除的元素

// 改
E set(int index,E e)：修改指定位置的元素，并返回该位置之前的元素

// 查
int indexOf(E e): 查询指定元素在集合中的索引，如果元素不存在，则返回-1
E get(int index)：获取指定位置的元素
E getFirst(): 获取链表开头的元素
E getLast(): 获取链表末尾的元素
E peek()：检索但不删除此list的头部（第一个元素）。
E peekFirst()：检索但不删除此list的第一个元素，如果此list为空，则返回 null。
E peekLast()：检索但不删除此list的最后一个元素，如果此list为空，则返回 null

```

## HashSet

实现了 Set 接口，由哈希表（实际上是一个 HashMap实例）实现，它不保证集合的迭代顺序

HashSet中的元素是无序、无索引的，并且不能重复，同时也是线程不安全菜单

### 构造方法

```java
HashSet()：构造一个新的空集；后备 HashMap 实例具有默认初始容量 (16) 和负载因子 (0.75)。
HashSet(int initialCapacity)：构造一个新的空集；后备 HashMap 实例具有指定的初始容量和默认负载系数 (0.75)。
HashSet(int initialCapacity, float loadFactor)：构造一个新的空集；后备 HashMap 实例具有指定的初始容量和指定的负载因子。
HashSet(Collection<? extends E> c)：构造一个包含指定集合中的元素的新集合
```

### 实例方法

```java
// 增
boolean add(E e)：如果指定的元素不存在，则将其添加到此集合中

// 删
boolean remove(Object o)：如果存在，则从此集合中移除指定元素
void clear()：从此集合中删除所有元素

// 查
boolean contains(Object o)：如果此集合包含指定元素，则返回 true。
boolean isEmpty()：如果此集合不包含任何元素，则返回 true
int size()：返回此集合中的元素数（其基数）

// 转换
Object[] toArray()：返回包含此集合中所有元素的数组
```

## LinkedHashSet

底层由链表+哈希表实现，线程不安全；LinkedHashSet中的元素是有序、无索引的，并且不能重复

### 构造方法

```java
LinkedHashSet() 使用默认初始容量 (16) 和加载因子 (0.75)：构造一个新的空链接哈希集。 
LinkedHashSet(int initialCapacity)：使用指定的初始容量和默认加载因子 (0.75) 构造一个新的空链接哈希集。
LinkedHashSet(int initialCapacity, float loadFactor)：使用指定的初始容量和加载因子构造一个新的空链接哈希集。
LinkedHashSet(Collection<? extends E> c)：使用与指定集合相同的元素构造一个新的链接哈希集
```

### 实例方法

```java
// 增
boolean add(E e)：如果指定的元素不存在，则将其添加到此集合中

// 删
boolean remove(Object o)：如果存在，则从此集合中移除指定元素
void clear()：从此集合中删除所有元素

// 查
boolean contains(Object o)：如果此集合包含指定元素，则返回 true。
boolean isEmpty()：如果此集合不包含任何元素，则返回 true
int size()：返回此集合中的元素数（其基数）

// 转换
Object[] toArray()：返回包含此集合中所有元素的数组
```

## TreeSet

底层由红黑树实现，线程不安全；TreeSet可以对元素进行排序，元素没有索引，并且不能重复

### 构造方法

```java
TreeSet() 构造一个新的空树集，根据其元素的自然顺序进行排序。
TreeSet(Collection<? extends E> c) 构造一个新的树集，包含指定集合中的元素，按照自然排序它的元素。
TreeSet(Comparator<? super E> comparator) 构造一个新的空树集，根据指定的比较器排序。
TreeSet(SortedSet<E> s) 构造一个包含相同元素并使用与指定排序集相同顺序的新树集
```

### 实例方法

```java
boolean add(E e)：如果指定的元素不存在，则将其添加到此集合中。
boolean addAll(Collection<? extends E> c)：将指定集合中的所有元素添加到此集合。
E ceiling(E e)：返回此集合中大于或等于给定元素的最小元素，如果没有这样的元素，则返回 null。
void clear()：从此集合中删除所有元素。
Object clone()：返回此 TreeSet 实例的浅表副本。
Comparator<? super E> comparator()：返回用于对该集合中的元素进行排序的比较器，如果该集合使用其元素的 自然排序，则返回 null。
boolean contains(Object o) 如果此集合包含指定元素，则返回 true。
Iterator<E> descendingIterator() 按降序返回此集合中元素的迭代器。
NavigableSet<E> descendingSet() 返回此集合中包含的元素的倒序视图。
E first() 返回此集合中当前的第一个（最低）元素。
E floor(E e) 返回此集合中小于或等于给定元素的最大元素，如果没有这样的元素，则返回 null。
SortedSet<E> headSet(E toElement) 返回此集合中元素严格小于 toElement 的部分的视图。
NavigableSet<E> headSet(E toElement, boolean inclusive) 返回此集合的部分视图，其元素小于（或等于，如果 inclusive 为真） toElement 。
E higher(E e) 返回此集合中严格大于给定元素的最小元素，如果没有这样的元素，则返回 null。
boolean isEmpty() 如果此集合不包含任何元素，则返回 true。
Iterator<E> iterator() 按升序返回此集合中元素的迭代器。
E last() 返回此集合中当前的最后一个（最高）元素。
E lower(E e) 返回此集合中严格小于给定元素的最大元素，如果没有这样的元素，则返回 null。
E pollFirst() 检索并删除第一个（最低）元素，如果此集合为空，则返回 null。
E pollLast() 检索并删除最后一个（最高）元素，如果此集合为空，则返回 null。
boolean remove(Object o) 如果存在，则从此集合中移除指定元素。
int size() 返回此集合中的元素数（其基数）。
Spliterator<E> spliterator() 在此集合中的元素上创建 late-binding 和 fail-fast Spliterator 。
NavigableSet<E> subSet(E fromElement, boolean fromInclusive, E toElement, boolean toInclusive) 返回此集合的部分视图，其元素范围从 fromElement 到 toElement 。
SortedSet<E> subSet(E fromElement, E toElement) 返回此集合的部分视图，其元素范围从 fromElement（含）到 toElement（不含）。
SortedSet<E> tailSet(E fromElement) 返回此集合中元素大于或等于 fromElement 的部分的视图。
NavigableSet<E> tailSet(E fromElement, boolean inclusive) 返回此集合的部分视图，其元素大于（或等于，如果 inclusive 为真） fromElement
```

## Map接口

Map是双列集合的顶级接口，将键映射到值的对象。map不能包含重复的键；每个键最多可以映射到一个值

![map](../images/map.png)

### 静态方法

```java
static <K, V> Map<K,V> copyOf(Map<? extends K,? extends V> map)：返回包含给定 Map 条目的 不可修改的map
static <K, V> Map.Entry<K,V> entry(K k, V v)：返回包含给定键和值的不可修改的 Map.Entry
static <K, V> Map<K,V> of(K k1, V v1)：返回包含单个映射的不可修改的map，可以通过多参数添加更多映射
```

### 实例方法

```java
// 增
V put(K key, V value)：将指定值与此map中的指定键相关联（可选操作）。
void putAll(Map<? extends K,? extends V> m)：将指定map中的所有值复制到此map（可选操作）
default V putIfAbsent(K key, V value)：如果指定的键尚未与值关联（或映射到 null ），则将其与给定值关联并返回 null ，否则返回当前值

// 删
V remove(Object key)：如果存在，则从此map中删除键的映射（可选操作）。
default boolean remove(Object key, Object value)：仅当指定键当前映射到指定值时才删除该条目
void clear()：从此map中删除所有映射

// 改
default V replace(K key, V value)：仅在当前映射到某个值时才替换指定键的条目。
default boolean replace(K key, V oldValue, V newValue)：仅当当前映射到指定值时才替换指定键的条目。
default void replaceAll(BiFunction<? super K,? super V,? extends V> function)：将每个条目的值替换为对该条目调用给定函数的结果，直到处理完所有条目或函数抛出异常

// 查
Set<Map.Entry<K,V>> entrySet()：返回此map中包含的映射的Entry集合
Set<K> keySet()：返回此map中包含的键的 Set 视图
Collection<V> values()：返回此map中包含的值的 Collection 视图
boolean containsKey(Object key)：如果此map包含指定键的映射，则返回 true。
boolean containsValue(Object value)：如果此map将一个或多个键映射到指定值，则返回 true
V get(Object key)：返回指定键映射到的值，如果此map不包含键的映射，则返回 null。
default V getOrDefault(Object key, V defaultValue)：返回指定键映射到的值，如果此map不包含键的映射，则返回 defaultValue
boolean isEmpty()：如果此map不包含键值映射，则返回 true
int size()：返回此map中键值映射的数量

// 遍历
default void forEach(BiConsumer<? super K,? super V> action)：对此map中的每个条目执行给定的操作，直到处理完所有条目或操作引发异常
```

## HashMap

具有key唯一，无序无索引，线程不安全，可以存null键null值的特点，底层结构是hash表

### 构造方法

```java
HashMap()：使用默认初始容量 (16) 和默认负载因子 (0.75) 构造一个空的 HashMap。
HashMap(int initialCapacity)：构造一个具有指定初始容量和默认加载因子 (0.75) 的空 HashMap。
HashMap(int initialCapacity, float loadFactor)：构造一个具有指定初始容量和加载因子的空HashMap。
HashMap(Map<? extends K,? extends V> m)：构造一个新的 HashMap，其映射与指定的 Map 相同
```

### 实例方法

与Map接口实例方法一致

## linkedHashMap

继承自hashMap，有序无索引，线程不安全，可以存null键null值，底层结构式hash表+双向链表

常用方法同HashMap

## HashTable

key唯一，value可重复，无序无索引，线程安全，不可以存null键null值，底层结构是hash表

常用方法同HashMap

## Properties

Properties类表示一组持久属性，可以保存到流中或从流中加载，属性列表中的每个键及其对应的值都是一个字符串

继承自hashTable，key不能重复，value可重复，无序无索引，线程安全，不可以存null键null值，底层结构是hash表

### 构造方法

```java
Properties()：创建一个没有默认值的空属性列表。
Properties(int initialCapacity)：创建一个没有默认值的空属性列表，其初始大小可容纳指定数量的元素，而无需动态调整大小。
Properties(Properties defaults)：创建具有指定默认值的空属性列表
```

### 实例方法

```java
// 增
void load(InputStream inStream)：从输入字节流中读取属性列表（键和元素对）
void load(Reader reader)：以简单的面向行的格式从输入字符流中读取属性列表（键和元素对）
void loadFromXML(InputStream in)：将指定输入流上的 XML 文档表示的所有属性加载到此属性表中
Set<String> stringPropertyNames(): 获取所有key

// 改
Object setProperty(String key, String value): 设置指定key对应的value

// 查
String getProperty(String key): 获取指定key对应的value
String getProperty(String key, String defaultValue): 获取指定key对应的value，如果key不存在，返回默认值
```

## TreeMap

key唯一，可对key进行排序，value可重复，无序无索引，线程不安全，不可以存null键null值，底层结构是红黑树
