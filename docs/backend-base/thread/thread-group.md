# 线程组和线程优先级

## 线程组

Java用ThreadGroup来表示线程组，我们可以通过线程组对线程进行批量控制

ThreadGroup 和 Thread 的关系就如同他们的字面意思一样简单粗暴，每个 Thread 必然存在于一个 ThreadGroup 中，Thread 不能独立于 ThreadGroup 存在。执行main()方法的线程名字是 main，如果在 new Thread 时没有显式指定，那么默认将父线程（当前执行 new Thread 的线程）线程组设置为自己的线程组

## 线程组常用方法

1. 获取当前线程的线程组名字

```java
Thread.currentThread().getThreadGroup().getName()
```

2. 复制线程组

```java
// 获取当前的线程组
ThreadGroup threadGroup = Thread.currentThread().getThreadGroup();
// 复制一个线程组到一个线程数组（获取Thread信息）
Thread[] threads = new Thread[threadGroup.activeCount()];
threadGroup.enumerate(threads);
```

3. 线程组统一异常处理

```java
// 创建一个线程组，并重新定义异常
ThreadGroup group = new ThreadGroup("testGroup") {
    @Override
    public void uncaughtException(Thread t, Throwable e) {
        System.out.println(t.getName() + ": " + e.getMessage());
    }
};

// 测试异常
Thread thread = new Thread(group, () -> {
    // 抛出 unchecked 异常
    throw new RuntimeException("测试异常");
});

// 启动线程
thread.start();
```

## 线程的优先级

线程优先级可以指定，范围是 1~10。但并不是所有的操作系统都支持 10 级优先级的划分（比如有些操作系统只支持 3 级划分：低、中、高），Java 只是给操作系统一个优先级的参考值，线程最终在操作系统中的优先级还是由操作系统决定

Java 默认的线程优先级为 5，线程的执行顺序由调度程序来决定，线程的优先级会在线程被调用之前设定

通常情况下，高优先级的线程将会比低优先级的线程有更高的概率得到执行。Thread类的setPriority()方法可以用来设定线程的优先级，Java 程序中对线程所设置的优先级只是给操作系统一个建议，操作系统不一定会采纳。而真正的调用顺序，是由操作系统的线程调度算法来决定的

Java 提供了一个线程调度器来监视和控制处于RUNNABLE 状态的线程。

- 线程的调度策略采用抢占式的方式，优先级高的线程会比优先级低的线程有更大的几率优先执行
- 在优先级相同的情况下，会按照“先到先得”的原则执行
- 每个 Java 程序都有一个默认的主线程，就是通过 JVM 启动的第一个线程——main 线程

还有一种特殊的线程，叫做守护线程（Daemon），守护线程默认的优先级比较低

- 如果某线程是守护线程，那如果所有的非守护线程都结束了，这个守护线程也会自动结束
- 当所有的非守护线程结束时，守护线程会自动关闭，这就免去了还要继续关闭子线程的麻烦
- 线程默认是非守护线程，可以通过 Thread 类的 setDaemon 方法来设置为守护线程
