# 数学类

## Math类

### 静态属性

1. static final double E：比任何其他值都更接近e, 自然对数的底数。
2. static final double PI：比任何其他值都更接近pi，圆的周长与其直径之比

## 静态方法

1. int abs(int a)、long abs(long a)、double abs(double a)、float abs(float a)：求绝对值
2. double floor(double a)：向下取整，返回double a的整数部分
3. double ceil(double a)：向上取整
4. double round(double a)：四舍五入
5. int max(int a, int b)、long max(long a, long b)、double max(double a, double b)、float max(float a, float b)：求最大值
6. int min(int a, int b)、long min(long a, long b)、double min(double a, double b)、float min(float a, float b)：求最小值

## BigInteger类

BigInteger类用于表示任意大小的整数，可以进行加减乘除运算，并且可以解决除不尽的问题

### 静态常量

1. static final BigInteger ONE：BigInteger常量1
2. static final BigInteger TEN：BigInteger常量10
3. static final BigInteger TWO：BigInteger常量2
4. static final BigInteger ZERO：BigInteger常量0

### 构造方法

1. static BigInteger probablePrime(int bitLength, Random rnd)：返回一个可能是质数的正BigInteger，具有指定的bitLength
2. static BigInteger valueOf(long val)：返回一个 BigInteger，其值等于指定的long的值

### 实例方法

1. BigInteger add(BigInteger val)：求和
2. BigInteger subtract(BigInteger val)：求差
3. BigInteger multiply(BigInteger val)：求积
4. BigInteger divide(BigInteger val)：求商
5. BigInteger mod(BigInteger m)：求余
6. BigInteger[] divideAndRemainder(BigInteger val)：返回包含 (this / val) 后跟 (this % val) 的两个 BigInteger 的数
7. BigInteger pow(int n)：求幂
8. BigInteger max(BigInteger val)：返回此 BigInteger 和 val 的最大值。
9. BigInteger min(BigInteger val)：返回此 BigInteger 和 val 的最小值
10. BigInteger abs()：返回一个 BigInteger，其值是此 BigInteger 的绝对值
11. BigInteger sqrt()：返回此 BigInteger 的整数平方根

### 取值方法

1. int intValue()：将此 BigInteger 转换为 int
2. long longValue()：将此 BigInteger 转换为 long
3. float floatValue()：将此 BigInteger 转换为 float
4. double doubleValue()：将此 BigInteger 转换为 double
5. byte[] toByteArray()：返回包含此 BigInteger 的二进制补码表示的字节数组
6. String toString()：返回此 BigInteger 的十进制字符串表示形式。
7. String toString(int radix)：返回给定基数中此 BigInteger 的字符串表示形式

## BigDecimal类

1. BigDecimal add(BigDecimal val)：求和
2. BigDecimal subtract(BigDecimal val)：求差
3. BigDecimal multiply(BigDecimal val)：求积
4. BigDecimal divide(BigDecimal val)：求商
5. BigDecimal divide(BigDecimal val, int scale, int roundingMode)：求商，scale表示精度，roundingMode表示舍入模式，可以解决除不尽的问题
6. BigDecimal pow(int n)：求幂
