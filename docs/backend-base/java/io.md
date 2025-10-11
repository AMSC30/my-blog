# java IO

## 文件操作

File类是java.io包下的类，用于操作文件

### 静态属性

```java
public static final String pathSeparator: 与系统有关的路径分隔符，如：Windows是; Linux是:
public static final String separator: 与系统有关的路径名称分隔符，如：Windows是\ Linux是/
```

### 静态方法

```java
static File createTempFile(String prefix, String suffix)：在默认临时文件目录中创建一个新的空文件，使用给定的前缀和后缀生成其名称。
static File createTempFile(String prefix, String suffix, File directory)：在指定目录中使用给定的前缀和后缀字符串创建一个新的空文件
static File[] listRoots(): 列出可用的文件系统根目录
```

### 构造方法

```java
public File(String pathname): 根据文件路径创建File对象
public File(String parent, String child): 根据父路径和子路径创建File对象
public File(File parent, String child): 根据父File对象和子路径创建File对象
```

### 实例方法

```java
// 检测
boolean canExecute()：测试应用程序是否可以执行由这个抽象路径名表示的文件。
boolean canRead()：测试应用程序是否可以读取由这个抽象路径名表示的文件。
boolean canWrite()：测试应用程序是否可以修改由这个抽象路径名表示的文件
boolean exists()：测试由这个抽象路径名表示的文件或目录是否存在
boolean isAbsolute() 测试这个抽象路径名是否是绝对的。
boolean isDirectory() 测试由这个抽象路径名表示的文件是否是一个目录。
boolean isFile() 测试由这个抽象路径名表示的文件是否是一个普通文件。
boolean isHidden() 测试由这个抽象路径名表示的文件是否是一个隐藏文件

// 增
boolean createNewFile(): 创建文件，创建成功返回true，否则返回false
boolean mkdir(): 创建文件夹，创建成功返回true，否则返回false
boolean mkdirs(): 创建文件夹,可创建多级文件夹，创建成功返回true，否则返回false

// 删
boolean delete(): 删除文件或者文件夹，删除成功返回true，否则返回false，删除的内容不会在回收站中；如果删除的是文件夹，则文件夹必须为空才能删除成功
void deleteOnExit()：请求在虚拟机终止时删除由这个抽象路径名表示的文件或目录

// 改
boolean setExecutable(boolean executable)：一个方便的方法，用于为此抽象路径名设置所有者的执行权限。
boolean setExecutable(boolean executable, boolean ownerOnly)：为此抽象路径名设置所有者或所有人的执行权限。
boolean setLastModified(long time)：设置由此抽象路径名命名的文件或目录的最后修改时间。
boolean setReadable(boolean readable)：一个方便的方法，用于为此抽象路径名设置所有者的读取权限。
boolean setReadable(boolean readable, boolean ownerOnly)：为此抽象路径名设置所有者或所有人的读取权限。
boolean setWritable(boolean writable)：一个方便的方法，用于为此抽象路径名设置所有者的写入权限。
boolean setWritable(boolean writable, boolean ownerOnly)：为此抽象路径名设置所有者或所有人的写入权限
boolean setReadOnly()：标记由此抽象路径名命名的文件或目录，以便只允许读取操作。

// 查
String getName(): 获取文件或文件夹名称
String getPath(): 获取路径，new对象时传入的路径
File getAbsoluteFile()：返回这个抽象路径名的绝对形式
String getAbsolutePath(): 获取绝对路径，如果new对象时传入的路径是绝对路径，则返回该路径，否则返回当前路径+new对象时传入的路径
String getParent()：返回这个抽象路径名的父目录的路径名字符串，如果这个路径名没有命名父目录，则返回null
File getParentFile()：返回这个抽象路径名的父目录的抽象路径名，如果这个路径名没有命名父目录，则返回null
long length(): 获取文件的字节大小
long lastModified()：返回由这个抽象路径名表示的文件的最后修改时间
String[] list(): 获取文件夹下的所有子文件或目录
File[] listFiles(): 获取文件夹下的所有子文件或目录

```

### FileUtils类

FileUtils 类是 Apache Commons IO 库中的一个类，提供了一些更为方便的方法来操作文件或目录

## IO流

流（Stream），是一个抽象的概念，是指一连串的数据（字符或字节），是以先进先出的方式发送信息的通道。

当程序需要读取数据的时候，就会开启一个通向数据源的流，这个数据源可以是文件，内存，或是网络连接。类似的，当程序需要写入数据的时候，就会开启一个通向目的地的流。这时候你就可以想象数据好像在这其中“流”动一样。

字节流用来处理二进制文件，比如说图片啊、MP3 啊、视频

字符流用来处理文本文件，文本文件可以看作是一种特殊的二进制文件，只不过经过了编码，便于人们阅读。

换句话说就是，字节流可以处理一切文件，而字符流只能处理文本

一般来说关于流的特性有下面几点：

1. 先进先出：最先写入输出流的数据最先被输入流读取到。
2. 顺序存取：可以一个接一个地往流中写入一串字节，读出时也将按写入顺序读取一串字节，不能随机访问中间的数据。（RandomAccessFile除外）
3. 只读或只写：每个流只能是输入流或输出流的一种，不能同时具备两个功能，输入流只能进行读操作，对输出流只能进行写操作。在一个数据传输通道中，如果既要写入数据，又要读取数据，则要分别提供两个流。

## FileOutputStream

文件输出流，是抽象类OutputStream的子类

构造方法：

- FileOutputStream(File file)：传入一个文件对象
- FileOutputStream(String name)：传入一个文件路径，指定文件如果没有，则会自动创建，如果有，则会创建一个对老的文件进行覆盖
- FileOutputStream(File file, boolean append)：传入一个文件对象，第二个参数表示是否追加，true表示追加，false表示覆盖
- FileOutputStream(String name, boolean append)：传入一个文件路径，第二个参数表示是否追加，true表示追加，false表示覆盖

常用方法：

- void write(byte b)：写入一个字节
- void write(byte[] b)：写入一个字节数组
- void write(byte[] b, int off, int length)：写入一个字节数组的一部分
- void close()：关闭输出流，此时流对象就不能再使用了

## FileInputStream

文件输入流，是抽象类InputStream的子类

构造方法：

```
FileInputStream(File file)：创建一个输入流，该输入流从指定的File对象表示的文件中读取字节
FileInputStream(String name)：创建一个输入流，该输入流从指定的文件名中读取字节
```

> 如果硬板中不存在该文件，则抛出FileNotFoundException异常，不会创建文件

常用方法：

```java
int read()：从输入流中读取一个字节
int read(byte[] b)：从输入流中读取字节数组，返回读取的个数，读取反比后返回-1
int read(byte[] b, int off, int len)：从输入流中读取len字节到数组，返回读取的个数，读取完毕后返回-1
void close()：关闭输入流
long skip(long n)：从输入流中跳过并丢弃 n 字节的数据
```

## FileReader

FileReader类继承Reader类，用于从文件中读取字符。

构造方法：

```java
FileReader(File file)
FileReader(String fileName)
```

常用方法：

```
int read()：一次一个字符，返回读取的字符，如果到达文件末尾，则返回-1
int read(char[] cbuf)：一次一个字符数组，返回读取的字符个数
int read(char[] cbuf, int off, int len)：一次一个字符数组，返回读取的个数
void close()：关闭输入流
```

## FileWriter

FileWriter类继承Writer类，用于向文件中写入字符。

构造方法：

```java
FileWriter(File file)：创建一个向指定File对象表示的文件中写入数据的FileWriter对象
FileWriter(String fileName)：创建一个向具有指定名称的文件中写入数据的FileWriter对象
FileWriter(File file, boolean append)：创建一个向指定File对象表示的文件中写入数据的
```

FileWriter对象，如果第二个参数为true，则将数据写入文件末尾，而不是写入文件开头

常用方法：

```java
void write(int c)：写入一个字节
void write(char[] cbuf)：写入字符数组
void write(char[] cbuf, int off, int len)：写入字符数组的某一部分
void write(String str)：写入字符串
void write(String str, int off, int len)：写入字符串的某部分
void flush()：刷新该流的缓冲，将缓冲区的数据刷入到文件中
void close()：关闭此流并释放与之关联的所有资源
```

## 缓冲流

BufferedInputStream 和 BufferedOutputStream 属于字节缓冲流，强化了字节流 InputStream 和 OutputStream

new BufferedInputStream(InputStream in)创建一个字节缓冲流 BufferedInputStream，它将输入数据读入一个缓冲区，缓冲区会自动扩容

newBufferedOutputStream(OutputStream out)创建一个字节缓冲流 BufferedOutputStream，它将输入数据写入一个缓冲区，缓冲区会自动扩容

字节缓冲流解决的就是这个问题：一次多读点多写点，减少读写的频率，用空间换时间。

- 减少系统调用次数：在使用字节缓冲流时，数据不是立即写入磁盘或输出流，而是先写入缓冲区，当缓冲区满时再一次性写入磁盘或输出流。这样可以减少系统调用的次数，从而提高 I/O 操作的效率。
- 减少磁盘读写次数：在使用字节缓冲流时，当需要读取数据时，缓冲流会先从缓冲区中读取数据，如果缓冲区中没有足够的数据，则会一次性从磁盘或输入流中读取一定量的数据。同样地，当需要写入数据时，缓冲流会先将数据写入缓冲区，如果缓冲区满了，则会一次性将缓冲区中的数据写入磁盘或输出流。这样可以减少磁盘读写的次数，从而提高 I/O 操作的效率。
- 提高数据传输效率：在使用字节缓冲流时，由于数据是以块的形式进行传输，因此可以减少数据传输的次数，从而提高数据传输的效率

BufferedReader和BufferedWriter属于字符缓冲流

BufferedReader(Reader in)创建一个字符缓冲流 BufferedReader，它将输入数据读入一个缓冲区，缓冲区会自动扩容

String readLine(): 读一行数据，读取到最后返回 null

BufferedWriter(Writer out)创建一个字符缓冲流 BufferedWriter，它将输入数据写入一个缓冲区，缓冲区会自动扩容

newLine(): 换行，由系统定义换行符

字符缓冲流的基本方法与普通字符流调用方式一致

## 转换流

转换流可以将一个字节流包装成字符流，或者将一个字符流包装成字节流。这种转换通常用于处理文本数据，如读取文本文件或将数据从网络传输到应用程序。

转换流主要有两种类型：InputStreamReader 和 OutputStreamWriter。

InputStreamReader 将一个字节输入流转换为一个字符输入流，而 OutputStreamWriter 将一个字节输出流转换为一个字符输出流。它们使用指定的字符集将字节流和字符流之间进行转换。常用的字符集包括 UTF-8、GBK、ISO-8859-1 等

### InputStreamReader

构造方法

```java
InputStreamReader(InputStream in)：创建一个使用默认字符集的InputStreamReader。
InputStreamReader(InputStream in, String charsetName)：创建一个使用指定名称字符集的InputStreamReader。
InputStreamReader(InputStream in, Charset cs)：创建一个使用给定字符集的InputStreamReader。
InputStreamReader(InputStream in, CharsetDecoder dec)：创建一个使用给定字符集解码器的InputStreamReader
```

实例方法

```java
void close()：关闭流并释放与其关联的任何系统资源
String getEncoding()：返回此流正在使用的字符编码的名称
int read()：读取单个字符
int read(char[] cbuf, int off, int len)：将字符读入数组的一部分
boolean ready()：告知此流是否准备好进行读取
```

### OutputStreamWriter

实例方法

```java
OutputStreamWriter(OutputStream out)：创建一个使用默认字符编码的OutputStreamWriter，或者当out是PrintStream时，使用打印流使用的字符集。
OutputStreamWriter(OutputStream out, String charsetName)：创建一个使用指定字符集的OutputStreamWriter。
OutputStreamWriter(OutputStream out, Charset cs)：创建一个使用给定字符集的OutputStreamWriter。
OutputStreamWriter(OutputStream out, CharsetEncoder enc)：创建一个使用给定字符集编码器的OutputStreamWriter
```

实例方法

```java
void close()：关闭流，首先刷新它。
void flush()：刷新流。
String getEncoding()：返回此流正在使用的字符编码的名称。
void write(char[] cbuf, int off, int len)：写入字符数组的一部分。
void write(int c)：写入单个字符。
void write(String str, int off, int len)：写入字符串的一部分
```

下面是一个复制的实例代码，通常为了提高读写效率，我们会在转换流上再加一层缓冲流

```java
try {
    // 从文件读取字节流，使用UTF-8编码方式
    FileInputStream fis = new FileInputStream("test.txt");
    // 将字节流转换为字符流，使用UTF-8编码方式
    InputStreamReader isr = new InputStreamReader(fis, "UTF-8");
    // 使用缓冲流包装字符流，提高读取效率
    BufferedReader br = new BufferedReader(isr);
    // 创建输出流，使用UTF-8编码方式
    FileOutputStream fos = new FileOutputStream("output.txt");
    // 将输出流包装为转换流，使用UTF-8编码方式
    OutputStreamWriter osw = new OutputStreamWriter(fos, "UTF-8");
    // 使用缓冲流包装转换流，提高写入效率
    BufferedWriter bw = new BufferedWriter(osw);

    // 读取输入文件的每一行，写入到输出文件中
    String line;
    while ((line = br.readLine()) != null) {
        bw.write(line);
        bw.newLine(); // 每行结束后写入一个换行符
    }

    // 关闭流
    br.close();
    bw.close();
} catch (IOException e) {
    e.printStackTrace();
}
```

## Stream流
