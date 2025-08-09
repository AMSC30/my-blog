# Java语法基础

## 常用到的DOS命令

### 切换盘符

盘符名+:+回车
> 示例：D:+回车
>
### 查看文件或者文件夹

1. 查看当前路径下的文件或者文件夹

使用dir命令

> 示例：dir

2. 查看指定路径下的文件或者文件夹

使用dir命令 + 路径

> 示例：dir D:\Java

3. 查看指定路径下的文件或者文件夹的详细信息

使用dir命令 + /s + 路径
> 示例：dir /s D:\Java
>
### 进入指定文件夹

1. 使用cd命令

> 示例：cd D:\Java

2. 使用cd命令 + ..  进入上一级目录

> 示例：cd ..
>
### 文件夹操作

1. 在当前目录下创建文件夹

使用mkdir命令
> 示例：mkdir Java

2. 在当前目录下创建多级文件夹

使用mkdir + 路径

> 示例：mkdir \Java\learn

3. 删除文件夹

使用rmdir + /s + 路径

> 示例：rmdir /s D:\Java

4. 删除文件夹下的所有文件

使用del + /q + 路径，删除之后不走回收站
> 示例：del /q D:\Java

5. 删除文件夹下的所有文件及子文件夹

使用rd + /s + /q + 路径，删除之后不走回收站
> 示例：rd /s /q D:\Java

6. 重命名文件夹

使用ren + 旧文件夹名 + 新文件夹名
> 示例：ren D:\Java D:\Java_learn

7. 移动文件夹

使用move + 源文件夹 + 目标文件夹
> 示例：move D:\Java D:\Java_learn
>
## 常量

程序运行中，值不会发生改变的数据

### 整数常量

所有的整数

### 小数常量

所有带小数点的数字，如1.2，2.0

### 字符常量

使用单引号括号包裹的字符，内容必须有且为一个字符，如 'a'、' '
> 注意：不能使用''的形式
>
### 字符串常量

使用双引号包裹的若干字符，内容可以是任何形式

### 布尔常量

只有两个值，true和false

### 空常量

表示数据不存在，只有一个值null

## 变量

### 变量的数据类型

#### 基本数据类型

基本数据类型分为四类八种

1. 整型：

byte：字节型，占用一个字节，基本不用

short：短整型，占用两个字节

int：整型，数字的默认类型，占用4个字节

long：长整型，占用8个字节

2. 浮点型：

float：单精度浮点型，占用4个字节

double：双精度浮点型，占用8个字节，是浮点型的默认类型
> float与double的区别
> float:小数位只有23位二进制，能表示的最大的十进制位2的23次方，即8388608，是七位数
> double:小数位只有52位二进制，能表示的最大的十进制位2的52次方，即4503599627370496，是16位11位

3. 布尔型：

boolean：布尔型，只有两个值true和false，占用1个字节

4. 字符型：

char：占用2个字节

#### 引用数据类型

类、数组、接口、枚举、注解

#### 数组

定义一个数组

数组是一个固定长度的容器，既可以存储基本数据类型也可以存储引用数据类型，数组存储的数据类型必须一致

动态声明数组：通过指定数组长度而不对数组进行初始化来声明一个数组，例如：int[] a = new int[10];

静态声明数组：通过指定数组内容来声明一个数组，例如：int[] a = {1,2,3,4,5};

数组操作：

1. 获取数组长度：a.length

2. 获取数组元素：a[i]

3. 赋值：a[i] = 1

4. 创建静态数组：int[] a = {1,2,3,4,5};

5. 创建动态数组：int[] a = new int[10];

### 变量使用注意事项

1. 变量未声明或未赋值不能直接使用

2. 同一作用域不能重复声明变量

3. 静态变量和实例变量不能有相同的名称

4. 变量声明不能使用数字开头，变量名可以包含字母、数字、下划线_、$符号

### 数据类型转换

当等号两边的数据类型不一致时，数据类型转换；当不同的数据类型进行运算时，数据类型转换

#### 自动类型转换

1. 当取值范围小的数据类型赋值到取值范围大的数据类型时，数据类型小转大

2. 当取值范围小的数据类型与取值范围大的数据类型进行运算时，数据类型小转大

#### 强制类型转换

当取值范围的大的数据类型赋值给取值范围小的数据类型时，数据类型大转小

#### 数据转换的注意事项

1. 不应随意转换数据类型，会有精度丢失或者数据溢出的情况

2. byte，short类型定义时，如果等号右边是整数字面量且没有超出范围，不需要手动转换

3. char类型如果参与运算，会提升为int型，值为ASCII码，如果码表中没有，则在unicode码表中找

#### 数据类型取值范围比较

byte < short,char < int < long < float < double

### 内存图

在java程序中，内存分为5大块

#### 栈内存

存放基本数据类型，对象引用，方法参数，局部变量，方法的运行也在栈内存中进行

#### 堆内存

存放引用类型的数据，每个数据在堆内存中开辟一个空间，并在栈内存中保存这块空间的地址，堆内存是动态分配的，并且堆内存的数据都是有默认值的，比如int型变量，默认值为0；

#### 方法区

方法区存放类和方法的信息，class文件也是被加载到方法区中，方法区是静态分配的，方法区中的数据没有默认值

#### 本地方法栈

专门运行本地方法

#### 寄存器

待补充

## 面向对象

### 类

类是对一类事物的抽象表示，由属性(成员变量)和行为(成员方法)组成

测试类：带main方法的类，主要用于运行代码

实体类：无main方法的类，主要用来表示对象

抽象类：抽象类不能实例化，只能被继承，抽象类中可以有抽象方法，抽象方法没有方法体，抽象方法必须被继承类实现

抽象类和实体类区别：抽象类不能实例化，只能被继承

### 抽象

抽象是指不具体实现，抽象方法不能有方法体并且一定要在抽象类中，抽象类中可以有抽象方法，也可以没有抽象方法

抽象类不能实例化，只能被继承；非抽象子类的继承必须重写父类的所有抽象方法

抽象类可以看做是一个事物的标准模板，属于这个父类的子类，所有抽象方法都必须得到具体实现

定义一个抽象类：abstract class 类名{}

定义抽象方法：abstract 返回值类型 方法名(参数列表);

### 封装

将实现的细节封装起来，对外提供接口

使用private修饰的成员变量，外部类不能直接访问，只能通过getter和setter方法访问

如果成员变量和成员变量重名时，优先访问局部变量，也就是就近原则，使用this关键字可以访问成员变量，this代表调用this所在方法的对象

构造方法：构造方法名与类型相同，没有返回值，并且不适用void，分为有参构造和无参构造

定义一个类时，jvm内部默认会有一个无参构造方法

```java
public class Person {
    public Person(){
        System.out.println('我是无参构造方法');
    }
}
```

有参构造方法可以在new的时候为对象的成员变量进行赋值，当定义了一个有参构造方法后，jvm提供的默认无参构造方法会被覆盖，我们可以自己定义一个无参构造方法，此时实例化对象时既可以传参也可以不传参

```java
public class Person {
    String name;
    public Person(){
        System.out.println('我是无参构造方法');
    }
    public Person(String name){
        this.name = name;
    }
}
```

#### javabean

javabean是一种编码规范，类必须是具体的和公共的，不能是抽象类；类中包含无参构造和有参构造方法；成员的变量私有化，提供getter和setter方法

#### static

静态关键字，用于修饰成员变量和成员方法，通过static修饰的变量和方法属于类的属性和方法，加载时随着类的加载而加载

使用包含静态成员的类创建出来的所有对象共享静态成员

静态成员访问特点：

1. 静态成员访问非静态成员：需要通过new创建对象后调用

2. 静态成员访问静态成员：本类可以直接访问，也可以通过类名访问，他类需要通过类名访问

3. 非静态成员访问非静态成员：本类可以直接访问，他类需要通过new创建对象访问

4. 非静态成员访问静态成员：本类可以直接访问，他类需要通过类名访问

#### final关键字

final修饰符用于修饰类，类中的成员变量、成员方法、局部变量和对象

1. 修饰类

使用final修饰符修饰类时，类不能被继承，类中的成员不能被重写

2. 修饰方法

使用final修饰符修饰方法时，方法不能被重写；final修饰符不能修饰构造方法和静态方法，并且不能与abstract同时使用

3. 修饰成员变量

成员变量在定义类的时候需要手动赋值，包括在构造函数中也不能对其赋值

4. 修饰局部变量

使用final修饰符修饰局部变量时，不能对局部变量进行赋值，如果局部变量是引用类型，可以修改引用类型中的值

#### 权限修饰符

权限修饰符用于修饰类和类中的成员，只有default和public可以用于修饰类，不使用任何修饰符时，表示default(友好型)

1. public：如果一个类或者类的成员被public访问控制符修饰，那么这个类或者类的成员能被所有的类访问，不管访问类与被访问类是否在同一个包中
2. protected：如果一个类的成员被protected访问控制符修饰，那么这个成员既能被同一包下的其他类访问，也能被不同包下该类的子类访问
3. default：如果一个类或者类的成员不使用任何访问控制符修饰，则称它为默认访问控制级别，这个类或者类的成员只能被本包中的其他类访问
4. private：如果类的成员被private访问控制符来修饰，则这个成员只能被该类的其他成员访问，其他类无法直接访问。类的良好封装就是通过private关键字来实现的

表格总结：

| 形式 | public | protected | default | private |
|---|:---:|---:|:---:|---:|
| 同包同类 | yes | yes |yes | yes |
| 同包不同类 | yes | yes |yes | no |
| 不同包继承 | yes | yes |no | no |
| 不同包非继承 | yes | no |no | no |

### 继承

继承是子类可以继承父类中的属性和方法，是java中实现复用的重要手段，在java中继承是单一的，即一个子类只能有一个父类，但是一个父类可以有多个子类

继承通过extends实现一个子类继承一个父类，子类有自己的构造方法，可以继承父类的私有和非私有成员，但是不能继承父类的构造方法，也不能使用父类中的私有成员

java中所有的类都继承自Object类，所以除了Object类，所有的类都有一个父类

#### 成员变量访问

当子类和父类有相同的成员变量时，子类会覆盖父类成员变量，此时使用子类对象访问成员变量时，会优先使用子类成员变量，如果使用父类对象访问成员变量，则优先使用父类成员变量

当子类和父类的成员变量不重名时，如果等号左边是父类类型，只能调用父类中的成员变量；如果等号左边是子类类型，优先调用子类成员变量，子类没有，再调用父类的非私有成员变量

#### 成员方法访问

在继承中，访问成员方法，看使用new时使用的哪个类，就优先调用哪个类的成员方法

如果是父类，则只能调用父类中的成员方法；如果是子类，则优先调用子类中的成员方法，子类没有，再调用父类的非私有成员方法

> 总结：访问方法和变量，都是子类可以访问父类非私有，父类不能访问子类;变量通过=左边确定类型，方法通过new确定类型

#### 方法重写

在继承关系中，当父类和子类拥有相同的方法名和参数列表时，此时父类的方法被子类重写，方法的调用符合继承中成员方法的访问特点

- 子类重写父类方法后，访问权限必须大于等于父类
- 父类中的构造方法、私有方法、静态方法不能被重写
- 子类方法的返回值应该是父类方法返回值类型的子类类型

#### Super

Super代表父类的引用，可以调用父类中的成员

1. 调用父类构造函数：在子类的构造函数中第一行调用Super()或者Super(参数)
2. 调用父类的成员变量：在子类中成员方法中使用Super.a
3. 调用父类的成员方法：在子类中成员方法中使用Super.a()

#### this

表示调用this所在方法的调用对象

1. 用与区分成员变量和局部变量
2. 调用对象的成员

除了指向对象，this还可以单独调用，即this()，这种使用方式可以调用当前对象的构造方法

### 接口

接口是一种抽象的类型，不能实例化对象，只能通过implements关键字实现，一个类可以继承一个或多个接口；一个接口可以继承一个或多个接口

定义接口：public interface 接口名{}

实现接口:public class 类名 implements 接口名{}

接口中的成员变量默认是public static final的，如果不加public static，编译器会自动为我们加上，所以在接口中，只能使用静态变量，并且必须初始化，按照规范，变量名最好使用大写。接口中的成员方法默认是public abstract的，如果不加public abstract，编译器会自动加上

> jdk8以后新增了默认方法和静态方法，jdk9以后新增了私有方法

一个类实现的多个接口有相同名称和参数的抽象方法，实现类需要且只需要重写一次；

一个类实现的多个接口有相同名称和参数的默认方法，实现类需要且必须重写该方法

#### 抽象类与接口

接口是抽象的，抽象类是具体的，抽象类可以有抽象方法，抽象类也可以有具体方法

一个接口可以继承多个接口，如public interface 接口名 extends 接口名1,接口名2{}

一个实现类可以实现多个接口，如public class 类名 implements 接口名1,接口名2{}

当多个接口有相同的抽象方法且参数相同时，实现类只需要重写一次即可

当多个接口有相同的默认方法且参数相同时，实现类必须重写一次默认方法

### 多态

多态：同一个方法名，不同的参数，不同的返回值，不同的调用方式

多态的前提：

1. 必须和一个类有继承关系或者和一个接口有实现关系
2. 必须有方法的重写，多态的意义主要就是方法的重写
3. 必须有父类引用，子类对象

多态的实现：父类可以接收子类对象

#### 转型

多态中的父类引用指向子类对象，这种方式是一种向上转型，例如：

```java
    Animal animal = new Dog();
```

向下转型是指，将父类对象转为子类类型，例如：

```java
    Animal animal = new Dog();
    Dog dog = (Dog) animal;
```

转型过程中，可能会转成错误类型，这时会抛出ClassCastException异常，通过instanceof关键字判断对象类型，然后再进行转型。

## 内部类

当一个类中，对事物的描述过于复杂时，可以使用内部类，内部类是对事物一部分的描述

## 异常

代码的编写出现非正常现象，称为异常，异常分为编译时异常和运行时异常，编译时异常必须处理，运行时异常可以不处理，但是建议处理
异常都是一个一个的类型，继承自Throwable类，除了RuntimeException及其子类，其他都是编译时异常

## String

String代表字符串类

### 特点

1. java中所有的双引号字面值都是String类的对象实现
2. 字符串是不可变的，对字符串进行拼接、截取、替换、转换、替换、遍历等操作，都会产生新的字符串对象，不会改变原来的字符串对象
3. 相同的字符串在内存中只有一份对象，相同字符串内容的不同变量`共享`同一个对象

### 创建String对象

1. 通过字面值创建String对象:String s = "hello";
2. 通过有参构造传入字符串创建:String s = new String("hello");
3. 通过char数组创建String对象:String s = new String(char[] {'h','e','l','l','o'});
4. 通过字节数组创建String对象:String s = new String(byte[] {104,101,108,108,111});

### 常用方法

#### 比较方法

1. boolean equals(String s) 判断两个字符串是否相等
2. boolean equalsIgnoreCase(String s) 忽略大小写判断两个字符串是否相等
3. int compareTo(String s) 比较两个字符串的大小
4. int compareToIgnoreCase(String s) 忽略大小写比较两个字符串的大小

#### 获取方法

1. int length() 获取字符串的长度
2. char charAt(int index) 获取指定索引处的字符
3. int indexOf(String s) 获取指定字符串在字符串中的索引
4. int indexOf(String s, int fromIndex) 获取指定字符串在字符串中的索引，从指定索引开始
5. int lastIndexOf(String s) 获取指定字符串在字符串中的索引，从字符串末尾开始
6. int lastIndexOf(String s, int fromIndex) 获取指定字符串在字符串中的索引，从指定索引开始，从字符串末尾开始
7. String substring(int beginIndex) 获取指定索引开始到字符串末尾的子字符串
8. String substring(int beginIndex, int endIndex) 获取指定索引开始到指定索引结束的子字符串

#### 转换方法

1. String toLowerCase() 将字符串转换为小写
2. String toUpperCase() 将字符串转换为大写
3. String trim() 删除字符串两端的空格
4. String replace(char oldChar, char newChar) 替换字符串中指定的字符
5. String replace(CharSequence target, CharSequence replacement) 替换字符串中指定的字符序列
6. String replaceAll(String regex, String replacement) 替换字符串中指定的正则表达式
7. String replaceFirst(String regex, String replacement) 替换字符串中指定的正则表达式的第一个匹配项
8. String[] split(String regex) 分割字符串，返回一个字符串数组
9. Char[] toCharArray() 将字符串转换为字符数组
10. byte[] getBytes() 将字符串转换为字节数组

#### 拼接字符串

1. String concat(String str) 拼接字符串，返回一个新串儿

#### 判断方法

1. boolean startsWith(String prefix) 判断字符串是否以指定前缀开头
2. boolean endsWith(String suffix) 判断字符串是否以指定后缀结尾
3. boolean contains(CharSequence seq) 判断字符串是否包含指定字符序列

### StringBuilder

stringBuilder 是一个可变字符串，主要用于字符串拼接，string使用+每拼接一次字符串，就会创建一个新的字符串对象，消耗内存；stringbuilder自带一个缓冲区，每次拼接都会将结果放到缓冲区，不会创建新的对象，拼接结束后，将缓冲区中的内容复制到新的字符串对象中，不会产生垃圾。

使用StringBuilder做字符串拼接， 线程是不安全的

## 数学类

### Math类

1. int abs(int a)、long abs(long a)、double abs(double a)、float abs(float a)：求绝对值
2. double floor(double a)：向下取整，返回double a的整数部分
3. double ceil(double a)：向上取整
4. double round(double a)：四舍五入
5. int max(int a, int b)、long max(long a, long b)、double max(double a, double b)、float max(float a, float b)：求最大值
6. int min(int a, int b)、long min(long a, long b)、double min(double a, double b)、float min(float a, float b)：求最小值

### BigInteger类

1. BigInteger add(BigInteger val)：求和
2. BigInteger subtract(BigInteger val)：求差
3. BigInteger multiply(BigInteger val)：求积
4. BigInteger divide(BigInteger val)：求商
5. BigInteger mod(BigInteger m)：求余
6. BigInteger pow(int n)：求幂

### BigDecimal类

1. BigDecimal add(BigDecimal val)：求和
2. BigDecimal subtract(BigDecimal val)：求差
3. BigDecimal multiply(BigDecimal val)：求积
4. BigDecimal divide(BigDecimal val)：求商
5. BigDecimal divide(BigDecimal val, int scale, int roundingMode)：求商，scale表示精度，roundingMode表示舍入模式，可以解决除不尽的问题
6. BigDecimal pow(int n)：求幂

## Date类

1.new Date()：创建一个Date对象，该对象表示当前时间
2.new Date(long millis)：创建一个Date对象，该对象表示1970年1月1日0时0分0秒到当前时间之间所经过的毫秒数
3.Date.parse(String s)：将字符串s转换成Date对象，字符串s必须遵循"yyyy-MM-dd HH:mm:ss"的格式，否则将返回-1
4.Date.getTime()：返回1970年1月1日0时0分0秒到当前时间之间所经过的毫秒数
5.Date.toString()：返回当前时间对应的字符串，格式为"EEE MMM dd HH:mm:ss zzz yyyy"
6.Date.getYear()/Date.getFullYear：返回当前时间对应的年份，从1900年开始计算
7.Date.getMonth()：返回当前时间对应的月份，从0开始计算
8.Date.getDate()：返回当前时间对应的日期，从1开始计算
9.Date.getHours()：返回当前时间对应的小时，从0开始计算
10.Date.getMinutes()：返回当前时间对应的分钟，从0开始计算
11.Date.getSeconds()：返回当前时间对应的秒钟，从0开始计算
12.Date.getMilliseconds()：返回当前时间对应的毫秒，从0开始计算
13.Date.getDay()：返回当前时间对应的星期，从0开始计算，0表示星期天，1表示星期一，以此类推
14.Date.setTime(long time)：设置当前时间，参数为毫秒数

## Calendar类

1.Calendar.getInstance()：获取当前时间对应的日历对象
2.Calendar.get(int field)：获取指定字段的值
3.Calendar.set(int field, int value)：设置指定字段的值
4.Calendar.add(int field, int amount)：将指定字段的值增加或减少指定的值
5.Calendar.getTime()：获取当前日历对应的时间对象
6.Calendar.getTimeInMillis()：获取当前日历对应时间的毫秒数
7.Calendar.get(Calendar.YEAR)：获取当前日历对应时间的年
8.Calendar.get(Calendar.MONTH)：获取当前日历对应时间的月
9.Calendar.get(Calendar.DAY_OF_MONTH)：获取当前日历对应时间的日
10.Calendar.get(Calendar.HOUR_OF_DAY)：获取当前日历对应时间的时
11.Calendar.get(Calendar.MINUTE)：获取当前日历对应时间的分
12.Calendar.get(Calendar.SECOND)：获取当前日历对应时间的秒
13.Calendar.get(Calendar.MILLISECOND)：获取当前日历对应时间的毫秒
14.Calendar.get(Calendar.DAY_OF_WEEK)：获取当前日历对应时间的星期几

## SimpleDateFormat类

SimpleDateFormat类是java.text包下的类，用于格式化日期。
创建sdf对象，SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

1. 格式化日期：String format( Date date)
2. 解析日期：Date parse(String source)

## 包装类

基本类型对应的类就是包装类，例如int对应的包装类是Integer

装箱：将基本类型转换为对应的包装类，如Integer提供了valueOf()方法。Integer i = Integer.valueOf(100);

拆箱：将包装类转换为对应的基本类型，如integer提供了intValue()方法。int a = i.intValue();

字符串转包装类：在包装类中，都有一个类似parseXXX的方法，用于将字符串转换为对应的基本类型。如Integer提供了parseInt()方法。int a = Integer.parseInt("100");

包装类转字符串：在包装类中，还有一个类似toString()的方法，用于将基本类型转换为字符串。如Integer提供了toString()方法。String s = Integer.toString(100);

## 多线程

进程：是系统分配资源的最小单位
线程：是系统执行任务(系统调度)的最小单元
并行：在同一时刻，有多个任务在多个cpu上同时进行
并发：在同一时刻，有多个任务在单个cpu上交替进行

### 创建线程

#### 通过继承Thread类

1. 继承Thread类，并重写run()方法
2. 实现Runnable接口，并实现run()方法
3. 使用继承的类创建对象
4. 调用对象的start()方法启动线程，启动以后，jvm会自动调用run()方法

#### 通过实现Runnable接口

1. 创建Runnable接口的实现类，并实现Runnable接口
2. 重写run()方法
3. 创建Thread对象，并将创建的Runnable接口实现类对象作为参数传递给Thread对象
4. 调用start()方法启动线程

#### 通过实现Callable接口

1. 创建Callable接口的实现类，并实现Callable接口
2. 重写call()方法
3. 创建FutureTask对象，将Callable接口实现类对象作为参数传递给FutureTask对象
4. 创建Thread对象，将FutureTask对象作为参数传递给Thread对象
5. 调用start()方法启动线程
6. 调用FutureTask对象的get()方法获取线程执行结果

> call方法与run方法的区别
> call方法有返回值，run方法没有返回值
> call方法可以抛出异常，run方法不可以抛出异常

#### 线程池

1. 使用Executors类中的static ExecutorService newFixedThreadPool(int nThreads)方法创建线程池
2. 使用ExecutorService中的submit(Runnable task)方法提交任务

### 线程常用方法

1. start()：启动线程，调用run()方法
2. run()：线程要执行的任务，线程启动后，会自动调用此方法，不应该在代码中主动调用
3. sleep(long millis)：让当前线程休眠指定的时间
4. setName(String name)：设置线程名称
5. getName()：获取线程名称
6. static currentThread()：返回当前线程对象
7. setPriority(int priority)：设置线程优先级
8. getPriority()：获取线程优先级
9. setDaemon(boolean on)：设置线程为守护线程，非守护线程结束后，守护线程也会结束
10. static void yield()：设置线程为礼让线程, 让当前线程暂停，但是不释放锁
11. join()：将线程插入到当前线程之前

### 线程安全

线程安全是指多个线程并发访问同一个数据时，产生数据不一致的问题。

1. synchronized同步代码块：同步锁，保证线程安全
当一个线程拿到锁对象后，进入到同步代码块，其他线程拿到锁对象后，无法进入同步代码块，只能等待；当synchronized代码块执行完毕，锁对象释放，其他线程拿到锁对象后，进入同步代码块。

```java
public class SynchronizeDemo {
    int count =  100;
    Object obj = new Object();
    void run() {
        synchronized (obj) {
            // some codes
            count--;
        }
    }
}
```

2. 非静态同步方法,此时默认的锁对象就是所在对象，即this

对有线程安全的代码使用synchronized修饰

```java
public class Demo {
    public void run() {
        getCount();
    }
    public synchronized void getCount() {
        // some codes
    }
}
```

3. 静态同步方法,此时默认的锁对象就是所在类的Class对象

```java
public class Demo {
    public void run() {
        getCount();
    }
    public static synchronized void getCount() {
        // some codes
    }
}
```

### 线程状态

1. new=>创建状态：线程对象创建后，还没有调用start()方法，线程处于new状态。
2. runnable=>可运行状态：线程对象调用start()方法后，线程就进入可运行状态，此时可能在运行代码，也可能在等待cpu时间片。
3. blocked=>阻塞状态：线程在等待锁的释放。
4. waiting=>无限等待状态：一个线程等待另一个线程唤醒，使用空参调用了wait方法。
5. timed waiting=>限时等待状态：一个线程等待另一个线程唤醒，调用了sleep或者有参wait方法。
6. terminated=>结束状态：run方法执行完毕，或者有未捕获的异常终止了run方法，或者调用了过时的stop()方法，线程就进入终止状态。

> wait方法和sleep方法都是Object类的方法，sleep方法属于Thread类。
wait方法：会释放锁，进入等待状态，当到达时间或者被其他线程唤醒后，会重新获取锁，获取到锁后继续执行
sleep方法：不会释放锁，进入等待状态，时间到后会醒来继续执行

![线程状态转换](./images/thread-status.png)

## 集合

集合是一个长度可变的容器，提供了一系列方法来操作集合，集合中只能存放引用类型的数据，如果存放的是基本类型数据，那么会自动封装成对象。

单列集合：一个元素只包含一个部分

双列结合：一个元素含两个部分，如map包含key和value

集合的实现类

set接口、map接口和list接口都继承自collection接口，list接口下有ArrayList、LinkedList、Vector三种实现类，map接口下有HashMap、LinkedHashMap、TreeMap三种实现类，set接口下有HashSet、LinkedHashSet、TreeSet三种实现类

继承关系如下：
![集合](./images//collection.png)

### 单列集合

#### Collection

单列集合的顶级接口

创建一个集合

```java
Collection<E> 对象名 = new 实现类<E>()
```

常用方法：

boolean add(E e): 将元素添加到集合中

boolean addAll(Connection connection): 将一个集合添加到当前集合后面，集合合并的效果

boolean remove(E e): 从集合中删除指定元素，删除成功返回true

void clear(): 清除集合中的所有元素

boolean contains(E e): 判断集合中是否含有某个元素

boolean isEmpty(): 查询集合是否为空

int size(): 查询集合中元素的数量

Object[] toArray(): 将集合中的元素转换为数组形式

迭代器

通过集合的iterator方法可以获取集合的迭代器

```java
    ArrayList<String> al = new ArrayList<String>()
    Iterator<String> iterator = al.iterator()
    boolean hasNext = iterator.hasNext()
    String next = iterator.next()
```

#### ArrayList

底层由数组实现，线程不安全；ArrayList中的元素都是有序、有索引的，并且可以重复

常用方法

boolean add(int index,E e): 将元素添加到指定为止

E set(int index, E e): 将指定位置的元素设置为新的元素，返回被替换的元素

E remove(int index): 删除指定为止的元素，并返回删除的元素

E get(int index): 获取指定为止的元素

#### LinkedList

底层由链表实现，线程不安全；LinkedList中的元素是有序、有基于索引的操作方法，本质没有索引，并且可以重复

常用方法

void addFirst(E e): 在链表开头添加元素

void addLast(E e): 在链表末尾添加元素

E removeFirst(): 删除链表开头的元素，并返回删除的元素

E removeLast(): 删除链表末尾的元素，并返回删除的元素

E getFirst(): 获取链表开头的元素

E getLast(): 获取链表末尾的元素

void push(E e): 添加元素到头部

E pop(): 删除链表开头的元素，并返回删除的元素

#### HashSet

底层由哈希表实现，线程不安全；HashSet中的元素是无序、无索引的，并且不能重复

#### LinkedHashSet

d底层由链表+哈希表实现，线程不安全；LinkedHashSet中的元素是有序、无索引的，并且不能重复

#### TreeSet

底层由红黑树实现，线程不安全；TreeSet可以对元素进行排序，元素没有索引，并且不能重复

#### 集合工具类

Collection工具类提供了一系列静态方法，用于操作集合，类名为Collections，工具类的构造方法私有，不能创建对象，方法都是静态的

常用方法

public static void reverse(List list): 反转集合中的元素顺序

public static void addAll(Collection c1, Collection c2): 将c2集合中的元素添加到c1集合中

public static void shuffle(List list): 随机打乱集合中的元素顺序

public static void sort(List list): 对集合中的元素按照默认规则(ascII码值)排序

public static void sort(List list, Comparator c): 对集合中的元素进行指定排序

public static void swap(List list, int i, int j): 交换集合中指定位置的元素

public static int binarySearch(List list, Object key): 二分查找集合中指定元素，返回索引，找不到返回-1

public static int frequency(Collection c, Object o): 统计集合中指定元素的数量

public static void copy(List dest, List src): 将src集合中的元素复制到dest集合中

public static boolean replaceAll(List list, Object oldVal, Object newVal): 替换集合中的元素，返回替换的元素数量

### 双列集合

#### Map

Map是双列集合的顶级接口
![map](./images/map.png)

#### hashMap

具有key唯一，无序无索引，线程不安全，可以存null键null值的特点，底层结构是hash表

常用方法：

- V put(K key, V value): 添加元素，返回被覆盖的value，如果没有发生覆盖，返回null
- V get(Object key): 获取指定key对应的value
- V remove(Object key): 删除指定key对应的元素，并返回被删除的value
- boolean containsKey(Object key): 判断集合中是否包含指定key
- boolean containsValue(Object value): 判断集合中是否包含指定value
- Collection values(): 获取集合中所有value
- Set entrySet(): 获取集合中所有key和value
- Set keySet(): 获取集合中所有key

#### linkedHashMap

继承自hashMap，无序无索引，线程不安全，可以存null键null值，底层结构式hash表+双向链表

常用方法同hashMap

#### hashTable

key唯一，value可重复，无序无索引，线程安全，不可以存null键null值，底层结构是hash表

#### properties

继承自hashTable，key和value都是string，key不能重复，value可重复，无序无索引，线程安全，不可以存null键null值，底层结构是hash表

常用方法同hashTable，特有方法：

- String getProperty(String key): 获取指定key对应的value
- String getProperty(String key, String defaultValue): 获取指定key对应的value，如果key不存在，返回默认值
- Object setProperty(String key, String value): 设置指定key对应的value
- void load(InputStream inStream): 从输入流中加载数据
- Set\<String\ > stringPropertyNames(): 获取所有key

#### TreeMap

key唯一，可对key进行排序，value可重复，无序无索引，线程不安全，不可以存null键null值，底层结构是红黑树

## 泛型

在定义时无法确定具体的类型，需要等到使用的时候才能确定类型，为了避免数据类型转换异常，可以使用泛型，泛型可以理解为参数化的类型，泛型可以用在集合、数组、方法、类、接口等地方

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

泛型类、泛型方法、泛型接口的泛型参数可以有多个，多个参数之间用逗号隔开，如：<T1,T2,T3>

泛型通配符<?>

泛型通配符?可以表示任意类型，如：List<?> list = new ArrayList<>();

泛型上限<? extends 类型>

问号只能接收extends类型的本类类型及其子类类型，如：List<? extends Number> list = new ArrayList<>();

泛型下限<? super 类型>

问号只能接收super类型的本类类型及其父类类型，如：List<? super Number> list = new ArrayList<>();

## File类

File类是java.io包下的类，用于操作文件

### 静态成员

- public static final String pathSeparator: 与系统有关的路径分隔符，如：Windows是; Linux是:
- public static final String separator: 与系统有关的路径名称分隔符，如：Windows是\ Linux是/

### 构造方法

- public File(String pathname): 根据文件路径创建File对象
- public File(String parent, String child): 根据父路径和子路径创建File对象
- public File(File parent, String child): 根据父File对象和子路径创建File对象

### 常用方法

- public String getPath(): 获取路径，new对象时传入的路径
- public String getAbsolutePath(): 获取绝对路径，如果new对象时传入的路径是绝对路径，则返回该路径，否则返回当前路径+new对象时传入的路径
- public String getName(): 获取文件或文件夹名称
- public boolean exists(): 判断文件或文件夹是否存在
- public boolean isFile(): 判断是否是文件
- public boolean isDirectory(): 判断是否是文件夹
- long length(): 获取文件的字节大小
- boolean createNewFile(): 创建文件，创建成功返回true，否则返回false
- boolean mkdir(): 创建文件夹，创建成功返回true，否则返回false
- boolean mkdirs(): 创建文件夹,可创建多级文件夹，创建成功返回true，否则返回false
- boolean delete(): 删除文件或者文件夹，删除成功返回true，否则返回false，删除的内容不会在回收站中；如果删除的是文件夹，则文件夹必须为空才能删除成功
- String[] list(): 获取文件夹下的所有文件名
- File[] listFiles(): 获取文件夹下的所有文件

### FileOutputStream

文件输出流，是抽象类OutputStream的子类

构造方法：

- FileOutputStream(File file)：传入一个文件对象
- FileOutputStream(String name)：传入一个文件路径，指定文件如果没有，则会自动创建，如果有，则会创建一个对老的文件进行覆盖
- FileOutputStream(File file, boolean append)：传入一个文件对象，第二个参数表示是否追加，true表示追加，false表示覆盖
- FileOutputStream(String name, boolean append)：传入一个文件路径，第二个参数表示是否追加，true表示追加，false表示覆盖

常用方法：

- void write(byte b)：向硬板写入一个字节
- void write(byte[] b)：向硬板写入一个字节数组
- void write(byte[] b, int off, int length)：向硬盘写入一个字节数组的一部分
- void close()：关闭输出流，此时流对象就不能再使用了

### FileInputStream

文件输入流，是抽象类InputStream的子类

构造方法：

- FileInputStream(File file)：创建一个输入流，该输入流从指定的File对象表示的文件中读取字节
- FileInputStream(String name)：创建一个输入流，该输入流从指定的文件名中读取字节

> 如果硬板中不存在该文件，则抛出FileNotFoundException异常，不会创建文件

常用方法：

- int read()：从输入流中读取一个字节
- int read(byte[] b)：从输入流中读取字节数组，返回读取的个数
- int read(byte[] b, int off, int len)：从输入流中读取字节数组，返回读取的个数
- void close()：关闭输入流

### FileReader

FileReader类继承Reader类，用于从文件中读取字符。

构造方法：

- FileReader(File file)
- FileReader(String fileName)

常用方法：

- int read()：一次一个字符，返回读取的字符，如果到达文件末尾，则返回-1
- int read(char[] cbuf)：一次一个字符数组，返回读取的字符个数
- int read(char[] cbuf, int off, int len)：一次一个字符数组，返回读取的个数
- void close()：关闭输入流

### FileWriter

FileWriter类继承Writer类，用于向文件中写入字符。

构造方法：

- FileWriter(File file)：创建一个向指定File对象表示的文件中写入数据的FileWriter对象
- FileWriter(String fileName)：创建一个向具有指定名称的文件中写入数据的FileWriter对象
- FileWriter(File file, boolean append)：创建一个向指定File对象表示的文件中写入数据的FileWriter对象，如果第二个参数为true，则将数据写入文件末尾，而不是写入文件开头

常用方法：

- void write(int c)：写入单个字符
- void write(char[] cbuf)：写入字符数组
- void write(char[] cbuf, int off, int len)：写入字符数组的某一部分
- void write(String str)：写入字符串
- void write(String str, int off, int len)：写入字符串的某部分
- void flush()：刷新该流的缓冲，将缓冲区的数据刷入到文件中
- void close()：关闭此流并释放与之关联的所有资源

### BufferedInputStream

 BufferedInputStream(InputStream in)创建一个字节缓冲流 BufferedInputStream，它将输入数据读入一个缓冲区，缓冲区会自动扩容

### BufferedOutputStream

 BufferedOutputStream(OutputStream out)创建一个字节缓冲流 BufferedOutputStream，它将输入数据写入一个缓冲区，缓冲区会自动扩容

### BufferedReader

 BufferedReader(Reader in)创建一个字符缓冲流 BufferedReader，它将输入数据读入一个缓冲区，缓冲区会自动扩容

### BufferedWriter

 BufferedWriter(Writer out)创建一个字符缓冲流 BufferedWriter，它将输入数据写入一个缓冲区，缓冲区会自动扩容

## 反射

### 获取Class对象

1. Class.forName("包名.类名")
2. 对象.getClass()
3. 类名.class

### 获取class对象的构造方法

 获取所有public构造方法

 Constructor<?>[] constructors = class.getConstructors();

 ```java
Class<?> aClass = Person.class;
Constructor<?>[] constructors = aClass.getConstructors();
  for (Constructor<?> constructor : constructors) {
    System.out.println(constructor);
  }
 ```

获取空参的public构造方法

 Constructor<?> constructor = class.getConstructor();

 ```java
Class<?> bClass  = Person.class
Constructor<?> constructor = bClass.getConstructor();
// 使用构造方法创建对象
constructor.newInstance()
```

获取有参的public构造方法

Constructor<?> constructor = class.getConstructor(Class<?>...parameterTypes)

```java
Class<?> cClass = Person.class;
Constructor<?> constructor = cClass.getConstructor(String.class, Integer.class);
// 使用构造方法创建对象
constructor.newInstance("张三", 18);
```

获取所有构造方法
Constructor<?>[] constructors = class.getDeclaredConstructors()

获取指定的构造方法

Constructor<?> constructor = class.getDeclaredConstructor(Class<?>... parameterTypes)

解除私有构造限制

constructor.setAccessible(true);

### 获取class对象的成员方法

获取所有的public方法

Method[] methods = class.getMethods()

获取指定的public方法

Method method = class.getMethod(methodName, Class<?>...parameterTypes)

调用通过反射获取到的方法

method.invoke(Object object, Object... parameterValues)

获取所有方法，包括private

Method[] methods = class.getDeclaredMethods()

获取指定的方法，包括private

Method method = class.getDeclaredMethod(methodName, Class<?>...parameterTypes)

解除私有方法限制

method.setAccessible(true)

### 获取class对象的成员变量

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

## 注解

### 注解的作用

说明：对代码进行说明，生成api文档

检查：检查代码是否符合条件，如@Override检查方式是否为重写方法，@FunctionalInterface检查是否为函数式接口

分析：对代码进行分析，起到代替配置文件的作用

### 注解的定义

```java
public @interface 注解名称 {
    数据类型 属性名();
    数据类型 属性名() default 默认值;
}
```

数据类型可以是8中基本类型、String、Class、enum、注解已经以上的一维数组组合

```java
public @interface Book{
    String name();
    double price() default 12.34;
}
```

### 注解的使用

注解的使用本质上是给注解的属性赋值，注解可以在类、方法、属性、参数、局部变量上使用

使用格式：

- @注解名(属性名=值,属性名=值)
- @注解名(属性名={a,b,c},属性名=属性值)

### 注解的解析

注解的解析，本质上是将注解中的属性值获取出来
