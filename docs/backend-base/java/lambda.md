# Lambda表达式

Lambda 表达式描述了一个代码块（或者叫匿名方法），可以将其作为参数传递给构造方法或者普通方法以便后续执行

使用Lambda的依据是必须有相应的函数接口，即内部只有一个抽象方法的接口

## 语法

每个 Lambda 表达式都遵循以下语法

```java
( parameter-list ) -> { expression-or-statements }
```

- () 中的 parameter-list 是以逗号分隔的参数，可以指定参数的类型，也可以不指定
- -> 相当于 Lambda 的标识符
- {} 中的 expression-or-statements 是 Lambda 函数的实现，可以是一个表达式，也可以是多条语句

## 使用场景

1. 为变量赋值

```java
Runnable r = () -> { System.out.println("沉默王二"); };
r.run();
```

2. 作为 return 结果

```java
static FileFilter getFilter(String ext){
    return (pathname) -> pathname.toString().endsWith(ext);
}
```

3. 作为数组元素

```java
final PathMatcher matchers[] ={
        (path) -> path.toString().endsWith("txt"),
        (path) -> path.toString().endsWith("java")
};
```

4. 作为普通方法或者构造方法的参数

```java
new Thread(() -> System.out.println("沉默王二")).start();
```

## 作用域

不要在 Lambda 表达式主体内对方法内的局部变量进行修改，Lambda 表达式中要用到的，但又未在 Lambda 表达式中声明的变量，必须声明为 final 或者是 effectively final，否则就会出现编译错误

## 方法引用

当要传递给Lambda体内的操作，已经有实现的方法了，就可以使用方法引用了，使用操作符 “::” 将方法名和对象或类的名字分隔开来

方法引用使用的前提条件：

1. 方法引用所引用的方法的参数列表必须要和函数式接口中抽象方法的参数列表相同（完全一致）。
2. 方法引用所引用的方法的的返回值必须要和函数式接口中抽象方法的返回值相同（完全一致）

### 对象::实例方法

```java
@Test
  public void test1(){
      PrintStream ps = System.out;
      Consumer<String> con = (str) -> ps.println(str);
      con.accept("Hello World！");

      System.out.println("--------------------------------");

      Consumer<String> con2 = ps::println;
      con2.accept("Hello Java8！");

      Consumer<String> con3 = System.out::println;
  }
  @Test
  public void test2(){
      Employee emp = new Employee(1, "张三", 18, 5112.99);

      Supplier<String> sup = () -> emp.getName();
      System.out.println(sup.get());

      System.out.println("----------------------------------");

      Employee emp1 = new Employee(2, "李四", 18, 5112.99);
      Supplier<String> sup2 = emp1::getName;
      System.out.println(sup2.get());
  }
```

### 类::静态方法

```java
@Test
  public void test3(){
      BiFunction<Double, Double, Double> fun = (x, y) -> Math.max(x, y);
      System.out.println(fun.apply(1.5, 22.2));

      System.out.println("--------------------------------------------------");
      BiFunction<Double, Double, Double> fun2 = Math::max;
      System.out.println(fun2.apply(1.2, 1.5));
  }

  @Test
  public void test4(){
      Comparator<Integer> com = (x, y) -> Integer.compare(x, y);
      System.out.println(com.compare(3,9));

      System.out.println("-------------------------------------");
      Comparator<Integer> com2 = Integer::compare;
      System.out.println(com2.compare(3,9));
  }
```

### 类::实例方法

```java
@Test
  public void test5(){
      BiPredicate<String, String> bp = (x, y) -> x.equals(y);
      System.out.println(bp.test("abcde", "abcde"));

      System.out.println("-----------------------------------------");
      BiPredicate<String, String> bp2 = String::equals;
      System.out.println(bp2.test("abc", "abc"));

      System.out.println("-----------------------------------------");
      Function<Employee, String> fun = (e) -> e.show();
      System.out.println(fun.apply(new Employee()));

      System.out.println("-----------------------------------------");
      Function<Employee, String> fun2 = Employee::show;
      System.out.println(fun2.apply(new Employee()));
  }
```

## 构造器引用

构造器使用的前提是构造器参数列表要与接口中抽象方法的参数列表一致

语法格式为`类名 :: new`

```java
// Employee类中必须有一个 Employee(String name, int age) 的构造器
BiConsumer<String, Integer> biConsumer = Employee :: new;
biConsumer.accept("王五", 19)
```

数组引用和构造引用基本相同

```java
@Test
  public void test10(){
      //传统Lambda实现
      Function<Integer,int[]> function = (i) -> new int[i];
      int[] apply = function.apply(10);
      System.out.println(apply.length); // 10

      //数组类型引用实现
      function = int[] ::new;
      apply = function.apply(100);
      System.out.println(apply.length); // 100
  }
```

## 函数式接口

函数式接口的抽象方法的签名，基本就是lambda表达式的签名，这种抽象方法称为函数描述符

### Supplier接口

接口仅包含一个无参的方法T get()，用来获取一个泛型参数指定类型的对象数据

由于这是一个函数式接口，对应的Lambda表达式需要“对外提供”一个符合泛型类型的对象数据

```java
public class use_Supplier_Max_Value {
    private static int getMax(Supplier<Integer> suply) {
        return suply.get();
    }
    public static void main(String[] args) {
        Integer [] data=new Integer[] {6,5,4,3,2,1};
        int reslut=getMax(()->{
            int max=0;
            for (int i = 0; i < data.length; i++) {
                max=Math.max(max, data[i]);
            }
            return max;
        });
        System.out.println(reslut);
    }
}
```

### Consumer接口

与Supplier接口相反，它不是生产一个数据，而是消费一个数据，其数据类型由泛型决定

Consumer 接口中包含抽象方法 void accept(T t) ，意为消费一个指定泛型的数据

```java
public class Test_Comsumer {
    public static void generateX(Consumer<String> consumer) {
        consumer.accept("hello consumer");
    }
    public static void main(String[] args) {
        generateX(s->System.out.println(s));
    }
}
```

如果一个方法的参数和返回值全都是 Consumer 类型，那么就可以实现效果：消费数据的时候，首先做一个操作，然后再做一个操作，实现组合，默认方法andThen的实现：

```java
default Consumer<T> andThen(Consumer<? super T> after) {
    Objects.requireNonNull(after);
    return (T t) ‐> { accept(t); after.accept(t); }; 
    //1:  返回值为Consumer 那么需要 ()-> 表示函数式接口
    //2:  accept(t);为生产一个数据供应给 (T t)中的t
    //3:  after.accept(t);为利用这个t再次生成新的函数式接口 实现类始于builder的设计模式
}
```

一个实际使用的例子

```java
public class use_Consumer_FormattorName {
    public static void formattorPersonMsg(Consumer<String[]> con1, Consumer<String[]> con2) {
        // con1.accept(new String[]{ "迪丽热巴,女", "古力娜扎,女", "马尔扎哈,男" });
        // con2.accept(new String[]{ "迪丽热巴,女", "古力娜扎,女", "马尔扎哈,男" });
        // 一句代码搞定
        con1.andThen(con2).accept(new String[] { "迪丽热巴,女", "古力娜扎,女", "马尔扎哈,男" });
    }
    public static void main(String[] args) {
        formattorPersonMsg((s1) -> {
            for (int i = 0; i < s1.length; i++) {
                System.out.print(s1[i].split("\\,")[0] + " ");
            }
        }, (s2) -> {
            System.out.println();
            for (int i = 0; i < s2.length; i++) {
                System.out.print(s2[i].split("\\,")[1] + " ");
            }
        });
        System.out.println();
        printInfo(s->System.out.print(s.split("\\,")[0]),
                  s->System.out.println(","+s.split("\\,")[1]),datas);
    }
    // 自身自销 有意思
    private static void printInfo(Consumer<String> one, Consumer<String> two, String[] array) {
        for (String info : array) { // 这里每次产生 {迪丽热巴。性别：女 } String 数据 逻辑那边顺序处理就行
            one.andThen(two).accept(info); // 姓名：迪丽热巴。性别：女。 } }
        }
    }
}
```

### Predicate接口

Predicate 接口中包含一个抽象方法:boolean test(T t)，用于条件判断的场景

既然是条件判断，就会存在与、或、非三种常见的逻辑关系，对应and or nagte (取反)三个默认方法

其中将两个 Predicate 条件使用“与”逻辑连接起来实现“并且”的效果时,类始于 Consumer接口 andThen()函数

```java
default Predicate<T> and(Predicate<? super T> other) {
    Objects.requireNonNull(other); 
    return (t) ‐> test(t) && other.test(t);
}
```

下面是一个实际使用的例子：

```java
public class Use_Predicate {
    // 判断字符串是否存在o  即使生产者 又是消费者接口
    private static void method_test(Predicate<String> predicate) {
         boolean b = predicate.test("OOM SOF");
         System.out.println(b);
    }
    // 判断字符串是否同时存在o h 同时
    private static void method_and(Predicate<String> predicate1,Predicate<String> predicate2) {
        boolean b = predicate1.and(predicate2).test("OOM SOF");
        System.out.println(b);
    }
    //判断字符串是否一方存在o h 
    private static void method_or(Predicate<String> predicate1,Predicate<String> predicate2) {
        boolean b = predicate1.or(predicate2).test("OOM SOF");
        System.out.println(b);
    }
    // 判断字符串不存在o 为真   相反结果
    private static void method_negate(Predicate<String> predicate) {
         boolean b = predicate.negate().test("OOM SOF");
         System.out.println(b);
    }
    public static void main(String[] args) {
        method_test((s)->s.contains("O"));
        method_and(s->s.contains("O"), s->s.contains("h"));
        method_or(s->s.contains("O"), s->s.contains("h"));
        method_negate(s->s.contains("O"));
    }
}
```
