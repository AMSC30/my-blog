# 工具类

## Arrays

数组专用工具类指的是 java.util.Arrays 类，基本上常见的数组操作，这个类都提供了静态方法可供直接调用

### 创建数组

1. static T[] copyOf(T[] origin, int newLength)：复制指定的数组，如果长度小于数组长度则截取，如果长度大于数组长度则用`null`填充
2. static T[] copyOfRange(T[] origin, int start, int end)：复制指定范围内的数组到一个新的数组

### 数组操作

#### 排序

1. static void sort(T[] a)：将指定数组按升序排序，排序会改变原有的数组
2. static void sort(T[] a, int fromIndex, int toIndex)：将数组的指定范围按升序排序，排序会改变原有的数组

#### 转换

static \<T> void setAll(T[] array, IntFunction<? extends T> generator)：使用提供的生成器函数设置指定数组的所有元素
static \<T extends Stream> T stream(T[] array)：返回一个以指定数组为源的顺序Stream
static String toString(T[] a)：返回指定数组内容的字符串表示形式

#### 填充

1. static void fill(T[] a, T val)：对数组进行填充
2. static void fill(T[] a, int from ,int to, T val)：对数组进行填充

#### 比较

1. static boolean equals(Object[] a, Object[] b)：判断两个数组是否相等
2. static boolean equals(boolean[] a, int aFromIndex, int aToIndex, boolean[] b, int bFromIndex, int bToIndex)：判断两个数组指定范围内是否相等
3. static boolean deepEquals(Object[] a1, Object[] a2)：如果两个指定的数组是深度相等，则返回true

> Arrays类的`equals()`方法用来判断两个数组是否相等，除了 equals() 方法，还有另外一个诀窍可以判断两个数组是否相等，尽管可能会出现误差。那就是Arrays.hashCode()方法

### 数组元素查询

数组排序后就可以使用Arrays类的binarySearch()方法进行二分查找，线性检索，效率就会低很多

Arrays.binarySearch()方法既可以精确检索，也可以模糊检索，比如说忽略大小写，Arrays.binarySearch(sorted, "Wang",
String::compareToIgnoreCase)

1. static int mismatch(T[] a, T[] b)：查找并返回两个boolean数组之间第一个不匹配的索引，如果没有找到不匹配则返回-1。
2. static int mismatch(T[] a, int aFromIndex, int aToIndex, T[] b, int bFromIndex, int bToIndex)：在指定范围内查找并返回两个boolean数组之间第一个不匹配的相对索引，如果没有找到不匹配则返回-1
3. static int binarySearch(T[] a, T key)：使用二分搜索算法在指定的字节数组中搜索指定值。
4. static int binarySearch(T[] a, int fromIndex, int toIndex, T key)：使用二分搜索算法在指定字节数组的范围内搜索指定值

### 数组打印

因为数组是一个对象，直接 System.out.println 的话，结果是对象的内存地址，要争取打印出数组，需要使用Arrays.toString()，源码实现如下：

```java
public static String toString(Object[] a) {
    if (a == null)
        return "null";

    int iMax = a.length - 1;
    if (iMax == -1)
        return "[]";

    StringBuilder b = new StringBuilder();
    b.append('[');
    for (int i = 0; ; i++) {
        b.append(String.valueOf(a[i]));
        if (i == iMax)
            return b.append(']').toString();
        b.append(", ");
    }
}
```

### 数组转List

尽管数组非常强大，但它自身可以操作的工具方法很少，比如说判断数组中是否包含某个值。如果能转成 List 的话，需要使用Arrays.asList()方法，但是该方法返回的是java.util. Arrays.ArrayList类型，它的长度是固定的，无法进行元素的删除或者添加。要想操作元素的话，需要多一步转化，将返回值作为ArrayList构造函数的参数

代码示例：

```java
List<String> result = new ArrayList<>(Arrays.asList({1,2,3}));
```

## StringUtils

StringUtils工具类用于对字符串判空，截取字符串、转换大小写、分隔字符串、比较字符串、去掉多余空格、拼接字符串、使用正则表达式

### 字符串判空

空字符串，不只是null一种，还有""，" "，"null"等等，多种情况

1. isEmpty与isNotEmpty：用于判断是否是null或者""
2. isBlank与isNotBlank：除了上述情况，会把" "也考虑进去

### 分隔字符串

分割字符串可以使用String类的split方法，但是可能会出现空指针异常，所以StringUtils提供了split方法

```java
System.out.println(StringUtils.split(str1,","));
System.out.println(str1.split(","));
```

### 拼接字符串

将某个集合的内容，拼接成一个字符串，然后输出，这时可以使用join方法

```java
List<String> list = new ArrayList<>("a", "b", "c");
List<Integer> list2 = new ArrayList<>(1, 2, 3);
System.out.println(StringUtils.join(list, ","));
System.out.println(StringUtils.join(list2, " "));
```

### 其他方法

- trim(String str)：去除字符串首尾的空白字符。
- trimToEmpty(String str)：去除字符串首尾的空白字符，如果字符串为 null，则返回空字符串。
- trimToNull(String str)：去除字符串首尾的空白字符，如果结果为空字符串，则返回 null。
- equals(String str1, String str2)：比较两个字符串是否相等。
- equalsIgnoreCase(String str1, String str2)：比较两个字符串是否相等，忽略大小写。
- startsWith(String str, String prefix)：检查字符串是否以指定的前缀开头。
- endsWith(String str, String suffix)：检查字符串是否以指定的后缀结尾。
- contains(String str, CharSequence seq)：检查字符串是否包含指定的字符序列。
- indexOf(String str, CharSequence seq)：返回指定字符序列在字符串中首次出现的索引，如果没有找到，则返回 -1。
- lastIndexOf(String str, CharSequence seq)：返回指定字符序列在字符串中最后一次出现的索引，如果没有找到，则返回 -1。
- substring(String str, int start, int end)：截取字符串中指定范围的子串。
- replace(String str, String searchString, String replacement)：替换字符串中所有出现的搜索字符串为指定的替换字符串。
- replaceAll(String str, String regex, String replacement)：使用正则表达式替换字符串中所有匹配的部分。
- join(Iterable<?> iterable, String separator)：使用指定的分隔符将可迭代对象中的元素连接为一个字符串。
- split(String str, String separator)：使用指定的分隔符将字符串分割为一个字符串数组。
- capitalize(String str)：将字符串的第一个字符转换为大写。
- uncapitalize(String str)：将字符串的第一个字符转换为小写。

## Objects

Java 的 Objects 类是一个实用工具类，包含了一系列静态方法，用于处理对象。它位于 java.util 包中，自 Java 7 引入。Objects 类的主要目的是降低代码中的空指针异常 (NullPointerException) 风险

### 对象判空

Objects的isNull 方法用于判断对象是否为空，而nonNull方法判断对象是否不为空，requireNonNull方法如果对象为空，抛出空指针异常

```java
Integer integer = new Integer(1);

if (Objects.isNull(integer)) {
    System.out.println("对象为空");
}

if (Objects.nonNull(integer)) {
    System.out.println("对象不为空");
}

Objects.requireNonNull(integer, "参数不能为空");
Objects.requireNonNull(integer, () -> "参数不能为空");
```

### 判断对象相等

要判断两个对象是否相等，Objects给我们提供了equals方法， Objects.equals()方法本身是用来避免坑的，因为它可以处理null值的比较，而不会抛出空指针异常。然而，这并不意味着它没有任何潜在问题。实际上，Objects.equals() 方法的一个潜在问题是依赖于被比较对象的equals()方法实现。当两个对象的类没有正确实现equals()方法时，Objects.equals()方法可能会产生不符合预期的结果，没有正确地实现equals()方法，默认情况下会使用Object类的 equals()方法，它只比较对象引用是否相同

### 获取对象的hashCode

获取某个对象的 hashCode，可以使用 Objects 的 hashCode 方法

### 比较数组

deepEquals()用于比较两个数组类型的对象，当对象是非数组的话，行为和equals()一致

```java
int[] array1 = {1, 2, 3};
int[] array2 = {1, 2, 3};
int[] array3 = {1, 2, 4};

System.out.println(Objects.deepEquals(array1, array2)); // 输出：true（因为 array1 和 array2 的内容相同）
System.out.println(Objects.deepEquals(array1, array3)); // 输出：false（因为 array1 和 array3 的内容不同）

// 对于非数组对象，deepEquals() 的行为与 equals() 相同
String string1 = "hello";
String string2 = "hello";
String string3 = "world";

System.out.println(Objects.deepEquals(string1, string2)); // 输出：true（因为 string1 和 string2 相同）
System.out.println(Objects.deepEquals(string1, string3)); // 输出：false（因为 string1 和 string3 不同）
```

## Collections

### 排序操作

1. reverse(List list)：反转顺序
2. shuffle(List list)：将顺序打乱
3. sort(List list)：自然升序
4. sort(List list, Comparator c)：按照自定义的比较器排序
5. swap(List list, int i, int j)：将 i 和 j 位置的元素交换位置

### 查找操作

1. binarySearch(List list, Object key)：二分查找法，前提是 List 已经排序过了
2. max(Collection coll)：返回最大元素
3. max(Collection coll, Comparator comp)：根据自定义比较器，返回最大元素
4. min(Collection coll)：返回最小元素
5. min(Collection coll, Comparator comp)：根据自定义比较器，返回最小元素
6. fill(List list, Object obj)：用指定元素替换指定列表的所有元素
7. frequency(Collection c, Object o)：返回指定对象出现的次数

### 其他方法

1. addAll(Collection\<? super T> c, T... elements)，往集合中添加元素
2. disjoint(Collection\<?> c1, Collection\<?> c2)，判断两个集合是否没有交集
3. static \<T> void copy(List<? super T> dest, List<? extends T> src)：将一个列表中的所有元素复制到另一个列表中
4. static \<T> boolean replaceAll(List\<T> list, T oldVal, T newVal)：用另一个指定值替换列表中一个指定值的所有出现
