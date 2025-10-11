# 异常

代码的编写出现非正常现象，称为异常，异常分为编译时异常和运行时异常，编译时异常必须处理，运行时异常可以不处理，但是建议处理
异常都是一个一个的类型，继承自Throwable类，除了RuntimeException及其子类，其他都是编译时异常

异常处理常用的两种方式：try-catch和throws

## try-catch

try-catch使用代码块包括语句，可以使用多个catch处理不同的异常类型，的语法格式如下：

```java
try {
    // 代码块1
} catch(exceptionType1 e) {
    // 代码块2
} catch(exceptionType2 e) {
    // 代码块3
}
```

如果 try 语句块中发生异常，那么一个相应的异常对象就会被拋出，然后 catch 语句就会依据所拋出异常对象的类型进行捕获，并处理。处理之后，程序会跳过 try 语句块中剩余的语句，转到 catch 语句块后面的第一条语句开始执行

如果 try 语句块中没有异常发生，那么 try 块正常结束，后面的 catch 语句块被跳过，程序将从 catch 语句块后的第一条语句开始执行

catch处理异常，可以使用以下三种方式对异常信息进行输出

- e.printStackTrace()：指出异常的类型、性质、栈层次及出现在程序中的位置
- e.getMessage()：返回异常的性质
- e.toString()：返回异常的性质和类型

finally用于指定无论try和catch中的代码是否执行完，都会执行的代码

## throws

throws用于指定方法中可能发生的异常，编译器检查方法调用时是否处理了异常，如果处理了，则编译通过；如果未处理，则编译不通过

一般用于在该方法中不处理异常，交给方法的调用者

格式如下：

```java
returnType methodName() throws 异常类1,异常类2,异常类3{}
```
