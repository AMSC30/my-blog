# 多线程入门

进程：是系统分配资源的最小单位
线程：是系统执行任务(系统调度)的最小单元
并行：在同一时刻，有多个任务在多个cpu上同时进行
并发：在同一时刻，有多个任务在单个cpu上交替进行

## 创建线程

### 通过继承Thread类

1. 继承Thread类，并重写run()方法
3. 使用子类创建对象
4. 调用对象的start()方法启动线程，启动以后，jvm会自动调用run()方法

```java
public class MyThread extends Thread {
    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            System.out.println(getName() + ":打了" + i + "个小兵");
        }
    }
}
```

### 通过实现Runnable接口

1. 创建Runnable接口的实现类，并重写run()方法
2. 创建Thread对象，并将创建的Runnable接口实现类对象作为参数传递给Thread对象
3. 调用start()方法启动线程

实现Runnable接口

```java
public class MyRunnable implements Runnable {
    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            try {//sleep会发生异常要显示处理
                Thread.sleep(20);//暂停20毫秒
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println(Thread.currentThread().getName() + "打了:" + i + "个小兵");
        }
    }
}
```

创建线程对象并调用start方法

```java
//创建MyRunnable类
MyRunnable mr = new MyRunnable();
//创建Thread类的有参构造,并设置线程名
Thread t1 = new Thread(mr, "张飞");
Thread t2 = new Thread(mr, "貂蝉");
Thread t3 = new Thread(mr, "吕布");
//启动线程
t1.start();
t2.start();
t3.start();
```

### 通过实现Callable接口

1. 创建Callable接口的实现类，并重写call()方法
2. 创建FutureTask对象，将Callable接口实现类对象作为参数传递给FutureTask对象
3. 创建Thread对象，将FutureTask对象作为参数传递给Thread对象
4. 调用start()方法启动线程
5. 调用FutureTask对象的get()方法获取线程执行结果

> call方法与run方法的区别
> call方法有返回值，run方法没有返回值
> call方法可以抛出异常，run方法不可以抛出异常

```java
public class CallerTask implements Callable<String> {
    public String call() throws Exception {
        return "Hello,i am running!";
    }

    public static void main(String[] args) {
        //创建异步任务
        FutureTask<String> task=new FutureTask<String>(new CallerTask());
        //启动线程
        new Thread(task).start();
        try {
            //等待执行完成，并获取返回结果
            String result=task.get();
            System.out.println(result);
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
    }
}
```

### 线程池

1. 使用Executors类中的static ExecutorService newFixedThreadPool(int nThreads)方法创建线程池
2. 使用ExecutorService中的submit(Runnable task)方法提交任务

## 线程常用方法

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

## 线程安全

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

## 线程状态

1. new=>创建状态：线程对象创建后，还没有调用start()方法，线程处于new状态。
2. runnable=>可运行状态：线程对象调用start()方法后，线程就进入可运行状态，此时可能在运行代码，也可能在等待cpu时间片。
3. blocked=>阻塞状态：线程在等待锁的释放。
4. waiting=>无限等待状态：一个线程等待另一个线程唤醒，使用空参调用了wait方法。
5. timed waiting=>限时等待状态：一个线程等待另一个线程唤醒，调用了sleep或者有参wait方法。
6. terminated=>结束状态：run方法执行完毕，或者有未捕获的异常终止了run方法，或者调用了过时的stop()方法，线程就进入终止状态。

> wait方法和sleep方法都是Object类的方法，sleep方法属于Thread类。
wait方法：会释放锁，进入等待状态，当到达时间或者被其他线程唤醒后，会重新获取锁，获取到锁后继续执行
sleep方法：不会释放锁，进入等待状态，时间到后会醒来继续执行

![线程状态转换](../images/thread-status.png)
