# ThreadLocal

ThreadLocal 就是线程的“本地变量”，即每个线程都拥有该变量的一个副本，达到人手一份的目的，这样就可以避免共享资源的竞争

## set 方法

set 方法用于设置当前线程中 ThreadLocal 的变量值，该方法的源码如下：

```java
public void set(T value) {
 //1. 获取当前线程实例对象
    Thread t = Thread.currentThread();

 //2. 通过当前线程实例获取到ThreadLocalMap对象
    ThreadLocalMap map = getMap(t);

    if (map != null)
    //3. 如果Map不为null,则以当前ThreadLocal实例为key,值为value进行存入
       map.set(this, value);
    else
   //4.map为null,则新建ThreadLocalMap并存入value
      createMap(t, value);
}
```

## get 方法

get 方法用于获取当前线程中 ThreadLocal 的变量值，同样的还是来看源码：

```java
public T get() {
  //1. 获取当前线程的实例对象
  Thread t = Thread.currentThread();

  //2. 获取当前线程的ThreadLocalMap
  ThreadLocalMap map = getMap(t);
  if (map != null) {
 //3. 获取map中当前ThreadLocal实例为key的值的entry
    ThreadLocalMap.Entry e = map.getEntry(this);

    if (e != null) {
      @SuppressWarnings("unchecked")
   //4. 当前entitiy不为null的话，就返回相应的值value
      T result = (T)e.value;
      return result;
    }
  }
  //5. 若map为null或者entry为null的话通过该方法初始化，并返回该方法返回的value
  return setInitialValue();
}
```

## remove 方法

remove 方法的作用是从当前线程的 ThreadLocalMap 中删除与当前 ThreadLocal 实例关联的条目

```java
public void remove() {
 //1. 获取当前线程的ThreadLocalMap
 ThreadLocalMap m = getMap(Thread.currentThread());
  if (m != null)
  //2. 从map中删除以当前ThreadLocal实例为key的键值对
  m.remove(this);
}
```

## 使用场景

ThreadLocal 的使用场景非常多，比如说：

- 用于保存用户登录信息，这样在同一个线程中的任何地方都可以获取到登录信息。
- 用于保存数据库连接、Session 对象等，这样在同一个线程中的任何地方都可以获取到数据库连接、Session 对象等。
- 用于保存事务上下文，这样在同一个线程中的任何地方都可以获取到事务上下文。
- 用于保存线程中的变量，这样在同一个线程中的任何地方都可以获取到线程中的变量。
