# 字符串

## 特点

1. java中所有的双引号字面值都是String类的对象实现
2. 字符串是不可变的，对字符串进行拼接、截取、替换、转换、替换、遍历等操作，都会产生新的字符串对象，不会改变原来的字符串对象
3. 相同的字符串在内存中只有一份对象，相同字符串内容的不同变量`共享`同一个对象

## 创建String对象

1. 通过字面值创建String对象:String s = "hello";
2. 通过有参构造传入字符串创建:String s = new String("hello");
3. 通过char数组创建String对象:String s = new String(char[] {'h','e','l','l','o'},int offset, int count);
4. 通过字节数组创建String对象:String s = new String(byte[] {104,101,108,108,111},int offset, int length);
5. 通过字符串生成器创建String对象:String s = new String(StringBuilder builder);
6. 通过字符串缓冲器创建String对象:String s = new String(StringBuffer buffer);

## 常用方法

### 静态方法

1. static String format(String format, Object... args)：使用指定的格式字符串和参数返回格式化字符串
2. static String valueOf([boolean b|chart[] c|char c|byte b|short s|int i|long l|float f|double d])：返回参数的字符串表示形式
3. static String join(CharSequence delimiter, CharSequence... elements)：返回由CharSequence元素的副本与指定delimiter的副本连接在一起组成的新字符串

### 比较方法

1. boolean equals(String s)：判断两个字符串是否相等
2. boolean equalsIgnoreCase(String s)：忽略大小写判断两个字符串是否相等
3. int compareTo(String s)：比较两个字符串的大小
4. int compareToIgnoreCase(String s)：忽略大小写比较两个字符串的大小

### 获取方法

1. int length()：获取字符串的长度
2. char charAt(int index)：获取指定索引处的字符
3. int codePointAt(int index)：返回指定索引处的字符（Unicode 代码点）
4. int indexOf(String s)：获取指定字符串在字符串中的索引
5. int indexOf(String s, int fromIndex)：获取指定字符串在字符串中的索引，从指定索引开始
6. int lastIndexOf(String s)：获取指定字符串在字符串中的索引，从字符串末尾开始
7. int lastIndexOf(String s, int fromIndex)：获取指定字符串在字符串中的索引，从指定索引开始，从字符串末尾开始
8. String substring(int beginIndex)：获取指定索引开始到字符串末尾的子字符串
9. String substring(int beginIndex, int endIndex)：获取指定索引开始到指定索引结束的子字符串

### 修改方法

1. String toLowerCase()：将字符串转换为小写
2. String toUpperCase()：将字符串转换为大写
3. String trim()：删除字符串两端所有的空格
4. String replace(char oldChar, char newChar)：替换字符串中指定的字符
5. String replace(CharSequence target, CharSequence replacement)：替换字符串中指定的字符序列
6. String replaceAll(String regex, String replacement)：替换字符串中指定的正则表达式
7. String replaceFirst(String regex, String replacement)：替换字符串中指定的正则表达式的第一个匹配项

### 转换方法

1. String[] split(String regex)：分割字符串，返回一个字符串数组
2. Char[] toCharArray()：将字符串转换为字符数组
3. byte[] getBytes(Charset charset)：使用给定的 charset 将此 String 编码为字节序列，并将结果存储到新的字节数组中
4. byte[] getBytes()：使用平台的默认字符集将此 String 编码为字节序列，并将结果存储到新的字节数组中
5. void getChars(int srcBegin, int srcEnd, char[] dst, int dstBegin)：将此字符串中的字符复制到目标字符数组中

### 拼接字符串

1. String concat(String str)：拼接字符串，返回一个新字符串

### 判断方法

1. boolean startsWith(String prefix)：判断字符串是否以指定前缀开头
2. boolean endsWith(String suffix)：判断字符串是否以指定后缀结尾
3. boolean contains(CharSequence seq)：判断字符串是否包含指定字符序列
4. boolean isEmpty()：判断字符串是否为空
5. boolean isBlank()：如果字符串为空或仅包含 空白 代码点，则返回 true，否则返回 false

## StringBuilder

StringBuilder是一个可变字符串，主要用于字符串拼接，string使用+每拼接一次字符串，就会创建一个新的字符串对象，消耗内存

StringBuilder自带一个缓冲区，每次拼接都会将结果放到缓冲区，不会创建新的对象，拼接结束后，将缓冲区中的内容复制到新的字符串对象中，不会产生垃圾

用作StringBuffer在字符串缓冲区被单个线程使用的地方（通常情况下）的替代品，建议优先使用此类而不是StringBuffer，使用StringBuilder做字符串拼接， 线程是不安全的

### 构造方法

1. StringBuilder()：构造一个没有字符且初始容量为 16 个字符的字符串生成器。
2. StringBuilder(int capacity)：构造一个没有字符的字符串生成器，初始容量由 capacity 参数指定。
3. StringBuilder(CharSequence seq)：构造一个字符串生成器，其中包含与指定的 CharSequence 相同的字符。
4. StringBuilder(String str)：构造一个初始化为指定字符串内容的字符串生成器

### 追加方法

1. StringBuilder append(boolean b)：将 boolean 参数的字符串表示形式附加到序列中。
2. StringBuilder append(char c)：将 char 参数的字符串表示形式附加到此序列。
3. StringBuilder append(char[] str)：将 char 数组参数的字符串表示形式附加到此序列。
4. StringBuilder append(char[] str, int offset, int len)：将 char 数组参数的子数组的字符串表示形式附加到此序列。
5. StringBuilder append(double d)：将 double 参数的字符串表示形式附加到此序列。
6. StringBuilder append(float f)：将 float 参数的字符串表示附加到此序列。
7. StringBuilder append(int i)：将 int 参数的字符串表示形式附加到此序列。
8. StringBuilder append(long lng)：将 long 参数的字符串表示形式附加到此序列。
9. StringBuilder append(CharSequence s)：将指定的字符序列附加到此 Appendable 。
10. StringBuilder append(CharSequence s, int start, int end)：将指定的 CharSequence 的子序列附加到此序列。
11. StringBuilder append(Object obj)：附加 Object 参数的字符串表示形式。
12. StringBuilder append(String str)：将指定的字符串附加到此字符序列。
13. StringBuilder append(StringBuffer sb)：将指定的 StringBuffer 附加到此序列

### 插入方法

1. StringBuilder insert(int offset, boolean b)：将 boolean 参数的字符串表示形式插入此序列。
2. StringBuilder insert(int offset, char c) 将 char 参数的字符串表示形式插入此序列。
3. StringBuilder insert(int offset, char[] str)：将 char 数组参数的字符串表示形式插入到此序列中。
4. StringBuilder insert(int index, char[] str, int offset, int len)：将 str 数组参数的子数组的字符串表示形式插入到此序列中。
5. StringBuilder insert(int offset, double d)：将 double 参数的字符串表示形式插入此序列。
6. StringBuilder insert(int offset, float f)：将 float 参数的字符串表示形式插入此序列。
7. StringBuilder insert(int offset, int i)：将第二个 int 参数的字符串表示形式插入此序列。
8. StringBuilder insert(int offset, long l)：将 long 参数的字符串表示形式插入此序列。
9. StringBuilder insert(int dstOffset, CharSequence s)：将指定的 CharSequence 插入此序列。
10. StringBuilder insert(int dstOffset, CharSequence s, int start, int end)：将指定 CharSequence 的子序列插入此序列。
11. StringBuilder insert(int offset, Object obj)：将 Object 参数的字符串表示形式插入此字符序列。
12. StringBuilder insert(int offset, String str)：将字符串插入此字符序列

### 删除方法

1. StringBuilder delete(int start, int end)：删除此序列的子字符串中的字符。
2. StringBuilder deleteCharAt(int index)：删除此序列中指定位置的 char

### 查询方法

1. int capacity()：返回当前容量。
2. char charAt(int index)：返回此序列中指定索引处的 char 值
3. int codePointAt(int index)：返回指定索引处的字符（Unicode 代码点）
4. int indexOf(String str)：返回指定子字符串在该字符串中第一次出现的索引。
5. int indexOf(String str, int fromIndex)：从指定索引开始，返回第一次出现的指定子字符串在此字符串中的索引
6. int lastIndexOf(String str)：返回最后一次出现的指定子字符串在此字符串中的索引。
7. int lastIndexOf(String str, int fromIndex)：返回最后一次出现的指定子字符串在此字符串中的索引，从指定索引开始向后搜索。
8. int length()：返回长度（字符数）

### 修改方法

1. StringBuilder replace(int start, int end, String str)：用指定的 String 中的字符替换此序列的子字符串中的字符。
2. StringBuilder reverse()：导致此字符序列被序列的反向替换
3. void setCharAt(int index, char ch)：指定索引处的字符设置为 ch 。
4. void setLength(int newLength)：设置字符序列的长度
5. String substring(int start)：返回一个新的 String，其中包含当前包含在此字符序列中的字符子序列。
6. String substring(int start, int end)：返回一个新的 String，其中包含当前包含在此序列中的字符子序列
7. String toString()：返回表示此序列中数据的字符串

## StringBuffer

一个线程安全的、可变的字符序列，字符串缓冲区可以安全地供多个线程使用，是线程安全的，常用API同StringBuilder
