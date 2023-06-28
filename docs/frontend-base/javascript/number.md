# number

整数和浮点数
JavaScript 内部，所有数字都是以64位浮点数形式储存，即使整数也是如此。所以，1与1.0是相同的，是同一个数。
1 === 1.0 // true

这就是说，JavaScript 语言的底层根本没有整数，所有数字都是小数（64位浮点数）。容易造成混淆的是，某些运算只有整数才能完成，此时 JavaScript 会自动把64位浮点数，转成32位整数，然后再进行运算，参见《运算符》一章的“位运算”部分。
由于浮点数不是精确的值，所以涉及小数的比较和运算要特别小心。
0.1 + 0.2 === 0.3
// false

0.3 / 0.1
// 2.9999999999999996

(0.3 - 0.2) === (0.2 - 0.1)
// false

数值精度
根据国际标准 IEEE 754，JavaScript 浮点数的64个二进制位，从最左边开始，是这样组成的。

- 第1位：符号位，0表示正数，1表示负数
- 第2位到第12位（共11位）：指数部分
- 第13位到第64位（共52位）：小数部分（即有效数字）
符号位决定了一个数的正负，指数部分决定了数值的大小，小数部分决定了数值的精度。
指数部分一共有11个二进制位，因此大小范围就是0到2047。IEEE 754 规定，如果指数部分的值在0到2047之间（不含两个端点），那么有效数字的第一位默认总是1，不保存在64位浮点数之中。也就是说，有效数字这时总是1.xx...xx的形式，其中xx..xx的部分保存在64位浮点数之中，最长可能为52位。因此，JavaScript 提供的有效数字最长为53个二进制位。
(-1)^符号位 *1.xx...xx* 2^指数部分

上面公式是正常情况下（指数部分在0到2047之间），一个数在 JavaScript 内部实际的表示形式。
精度最多只能到53个二进制位，这意味着，绝对值小于2的53次方的整数，即-253到253，都可以精确表示。
Math.pow(2, 53)
// 9007199254740992

Math.pow(2, 53) + 1
// 9007199254740992

Math.pow(2, 53) + 2
// 9007199254740994

Math.pow(2, 53) + 3
// 9007199254740996

Math.pow(2, 53) + 4
// 9007199254740996

上面代码中，大于2的53次方以后，整数运算的结果开始出现错误。所以，大于2的53次方的数值，都无法保持精度。由于2的53次方是一个16位的十进制数值，所以简单的法则就是，JavaScript 对15位的十进制数都可以精确处理。
Math.pow(2, 53)
// 9007199254740992

// 多出的三个有效数字，将无法保存
9007199254740992111
// 9007199254740992000

上面示例表明，大于2的53次方以后，多出来的有效数字（最后三位的111）都会无法保存，变成0。
数值范围
根据标准，64位浮点数的指数部分的长度是11个二进制位，意味着指数部分的最大值是2047（2的11次方减1）。也就是说，64位浮点数的指数部分的值最大为2047，分出一半表示负数，则 JavaScript 能够表示的数值范围为21024到2-1023（开区间），超出这个范围的数无法表示。
如果一个数大于等于2的1024次方，那么就会发生“正向溢出”，即 JavaScript 无法表示这么大的数，这时就会返回Infinity。
Math.pow(2, 1024) // Infinity

如果一个数小于等于2的-1075次方（指数部分最小值-1023，再加上小数部分的52位），那么就会发生为“负向溢出”，即 JavaScript 无法表示这么小的数，这时会直接返回0。
Math.pow(2, -1075) // 0

下面是一个实际的例子。
var x = 0.5;

for(var i = 0; i < 25; i++) {
  x = x * x;
}

x // 0

上面代码中，对0.5连续做25次平方，由于最后结果太接近0，超出了可表示的范围，JavaScript 就直接将其转为0。
JavaScript 提供Number对象的MAX_VALUE和MIN_VALUE属性，返回可以表示的具体的最大值和最小值。
Number.MAX_VALUE // 1.7976931348623157e+308
Number.MIN_VALUE // 5e-324

数值的表示法
JavaScript 的数值有多种表示方法，可以用字面形式直接表示，比如35（十进制）和0xFF（十六进制）。
数值也可以采用科学计数法表示，下面是几个科学计数法的例子。
123e3 // 123000
123e-3 // 0.123
-3.1E+12
.1e-23

科学计数法允许字母e或E的后面，跟着一个整数，表示这个数值的指数部分。
以下两种情况，JavaScript 会自动将数值转为科学计数法表示，其他情况都采用字面形式直接表示。
（1）小数点前的数字多于21位。
1234567890123456789012
// 1.2345678901234568e+21

123456789012345678901
// 123456789012345680000

（2）小数点后的零多于5个。
// 小数点后紧跟5个以上的零，
// 就自动转为科学计数法
0.0000003 // 3e-7

// 否则，就保持原来的字面形式
0.000003 // 0.000003

数值的进制
使用字面量（literal）直接表示一个数值时，JavaScript 对整数提供四种进制的表示方法：十进制、十六进制、八进制、二进制。

- 十进制：没有前导0的数值。
- 八进制：有前缀0o或0O的数值，或者有前导0、且只用到0-7的八个阿拉伯数字的数值。
- 十六进制：有前缀0x或0X的数值。
- 二进制：有前缀0b或0B的数值。
默认情况下，JavaScript 内部会自动将八进制、十六进制、二进制转为十进制。下面是一些例子。
0xff // 255
0o377 // 255
0b11 // 3

如果八进制、十六进制、二进制的数值里面，出现不属于该进制的数字，就会报错。
0xzz // 报错
0o88 // 报错
0b22 // 报错

上面代码中，十六进制出现了字母z、八进制出现数字8、二进制出现数字2，因此报错。
通常来说，有前导0的数值会被视为八进制，但是如果前导0后面有数字8和9，则该数值被视为十进制。
0888 // 888
0777 // 511

前导0表示八进制，处理时很容易造成混乱。ES5 的严格模式和 ES6，已经废除了这种表示法，但是浏览器为了兼容以前的代码，目前还继续支持这种表示法。
特殊数值
JavaScript 提供了几个特殊的数值。
正零和负零
前面说过，JavaScript 的64位浮点数之中，有一个二进制位是符号位。这意味着，任何一个数都有一个对应的负值，就连0也不例外。
JavaScript 内部实际上存在2个0：一个是+0，一个是-0，区别就是64位浮点数表示法的符号位不同。它们是等价的。
-0 === +0 // true
0 === -0 // true
0 === +0 // true

几乎所有场合，正零和负零都会被当作正常的0。
+0 // 0
-0 // 0
(-0).toString() // '0'
(+0).toString() // '0'

唯一有区别的场合是，+0或-0当作分母，返回的值是不相等的。
(1 / +0) === (1 / -0) // false

上面的代码之所以出现这样结果，是因为除以正零得到+Infinity，除以负零得到-Infinity，这两者是不相等的（关于Infinity详见下文）。
NaN
（1）含义
NaN是 JavaScript 的特殊值，表示“非数字”（Not a Number），主要出现在将字符串解析成数字出错的场合。
5 - 'x' // NaN

上面代码运行时，会自动将字符串x转为数值，但是由于x不是数值，所以最后得到结果为NaN，表示它是“非数字”（NaN）。
另外，一些数学函数的运算结果会出现NaN。
Math.acos(2) // NaN
Math.log(-1) // NaN
Math.sqrt(-1) // NaN

0除以0也会得到NaN。
0 / 0 // NaN

需要注意的是，NaN不是独立的数据类型，而是一个特殊数值，它的数据类型依然属于Number，使用typeof运算符可以看得很清楚。
typeof NaN // 'number'

（2）运算规则
NaN不等于任何值，包括它本身。
NaN === NaN // false

数组的indexOf方法内部使用的是严格相等运算符，所以该方法对NaN不成立。
[NaN].indexOf(NaN) // -1

NaN在布尔运算时被当作false。
Boolean(NaN) // false

NaN与任何数（包括它自己）的运算，得到的都是NaN。
NaN + 32 // NaN
NaN - 32 // NaN
NaN * 32 // NaN
NaN / 32 // NaN

Infinity
（1）含义
Infinity表示“无穷”，用来表示两种场景。一种是一个正的数值太大，或一个负的数值太小，无法表示；另一种是非0数值除以0，得到Infinity。
// 场景一
Math.pow(2, 1024)
// Infinity

// 场景二
0 / 0 // NaN
1 / 0 // Infinity

上面代码中，第一个场景是一个表达式的计算结果太大，超出了能够表示的范围，因此返回Infinity。第二个场景是0除以0会得到NaN，而非0数值除以0，会返回Infinity。
Infinity有正负之分，Infinity表示正的无穷，-Infinity表示负的无穷。
Infinity === -Infinity // false

1 / -0 // -Infinity
-1 / -0 // Infinity

上面代码中，非零正数除以-0，会得到-Infinity，负数除以-0，会得到Infinity。
由于数值正向溢出（overflow）、负向溢出（underflow）和被0除，JavaScript 都不报错，所以单纯的数学运算几乎没有可能抛出错误。
Infinity大于一切数值（除了NaN），-Infinity小于一切数值（除了NaN）。
Infinity > 1000 // true
-Infinity < -1000 // true

Infinity与NaN比较，总是返回false。
Infinity > NaN // false
-Infinity > NaN // false

Infinity < NaN // false
-Infinity < NaN // false

（2）运算规则
Infinity的四则运算，符合无穷的数学计算规则。
5 * Infinity // Infinity
5 - Infinity // -Infinity
Infinity / 5 // Infinity
5 / Infinity // 0

0乘以Infinity，返回NaN；0除以Infinity，返回0；Infinity除以0，返回Infinity。
0 * Infinity // NaN
0 / Infinity // 0
Infinity / 0 // Infinity

Infinity加上或乘以Infinity，返回的还是Infinity。
Infinity + Infinity // Infinity
Infinity * Infinity // Infinity

Infinity减去或除以Infinity，得到NaN。
Infinity - Infinity // NaN
Infinity / Infinity // NaN

Infinity与null计算时，null会转成0，等同于与0的计算。
null * Infinity // NaN
null / Infinity // 0
Infinity / null // Infinity

Infinity与undefined计算，返回的都是NaN。
undefined + Infinity // NaN
undefined - Infinity // NaN
undefined * Infinity // NaN
undefined / Infinity // NaN
Infinity / undefined // NaN

与数值相关的全局方法
parseInt()
（1）基本用法
parseInt方法用于将字符串转为整数，返回值只有两种可能，要么是一个十进制整数，要么是NaN。
parseInt('123') // 123

- 头部的空格和0会被忽略
parseInt('   81') // 81
parseInt('011') // 11

// 如果转换失败，保留0
parseInt('0bb') // 0

- 参数不是字符串，则会先转为字符串再转换。
parseInt(1.23) // 1
// 等同于
parseInt('1.23') // 1

- 遇到不能转为数字的字符，就不再进行下去，返回已经转好的部分。
parseInt('8a') // 8
parseInt('12**') // 12
parseInt('12.34') // 12
parseInt('15e2') // 15
parseInt('15px') // 15

- 如果字符串的第一个字符不能转化为数字（后面跟着数字的正负号除外），返回NaN。
parseInt('abc') // NaN
parseInt('.3') // NaN
parseInt('') // NaN
parseInt('+') // NaN
parseInt('+1') // 1

- 如果字符串以0x或0X开头，parseInt会将其按照十六进制数解析，二进制和八进制不会，会输出开头的0。
parseInt('0x10') // 16

- 对于那些会自动转为科学计数法的数字，parseInt会将科学计数法的表示方法视为字符串，因此导致一些奇怪的结果。
parseInt(1000000000000000000000.5) // 1
// 等同于
parseInt('1e+21') // 1

parseInt(0.0000008) // 8
// 等同于
parseInt('8e-7') // 8

（2）进制转换
parseInt方法第二个参数（2到36之间）表示被解析的值的进制，返回该值对应的十进制数。默认情况下，parseInt的第二个参数为10，即默认是十进制转十进制。
parseInt('1000') // 1000
// 等同于
parseInt('1000', 10) // 1000

parseInt('1000', 2) // 8
parseInt('1000', 6) // 216
parseInt('1000', 8) // 512

如果不是数字，会被自动转为一个整数。
如果不在2到36之间，则返回NaN。
如果是0、undefined和null，则直接忽略。
parseInt('10', 37) // NaN
parseInt('10', 1) // NaN
parseInt('10', 0) // 10
parseInt('10', null) // 10
parseInt('10', undefined) // 10

如果字符串包含对于指定进制无意义的字符，则从最高位开始，只返回可以转换的数值。如果最高位无法转换，则直接返回NaN。
parseInt('1546', 2) // 1
parseInt('546', 2) // NaN

前面说过，如果parseInt的第一个参数不是字符串，会被先转为字符串。这会导致一些令人意外的结果。
parseInt(0x11, 36) // 43
parseInt(0x11, 2) // 1

// 等同于
parseInt(String(0x11), 36)
parseInt(String(0x11), 2)

// 等同于
parseInt('17', 36)
parseInt('17', 2)

这种处理方式，对于八进制的前缀0，尤其需要注意。
parseInt(011, 2) // NaN

// 等同于
parseInt(String(011), 2)

// 等同于
parseInt(String(9), 2)

上面代码中，第一行的011会被先转为字符串9，因为9不是二进制的有效字符，所以返回NaN。如果直接计算parseInt('011', 2)，011则是会被当作二进制处理，返回3。
JavaScript 不再允许将带有前缀0的数字视为八进制数，而是要求忽略这个0。但是，为了保证兼容性，大部分浏览器并没有部署这一条规定。
parseFloat()
parseFloat方法用于将一个字符串转为浮点数。
parseFloat('3.14') // 3.14

如果字符串符合科学计数法，则会进行相应的转换。
parseFloat('314e-2') // 3.14
parseFloat('0.0314E+2') // 3.14

如果字符串包含不能转为浮点数的字符，则不再进行往后转换，返回已经转好的部分。
parseFloat('3.14more non-digit characters') // 3.14

parseFloat方法会自动过滤字符串前导的空格。
parseFloat('\t\v\r12.34\n ') // 12.34

如果参数不是字符串，不进行转换，或者字符串的第一个字符不能转化为浮点数，直接返回NaN。
parseFloat([]) // NaN
parseFloat('FF2') // NaN
parseFloat('') // NaN

这些特点使得parseFloat的转换结果不同于Number函数。
parseFloat(true)  // NaN
Number(true) // 1

parseFloat(null) // NaN
Number(null) // 0

parseFloat('') // NaN
Number('') // 0

parseFloat('123.45#') // 123.45
Number('123.45#') // NaN

isNaN()
isNaN方法可以用来判断一个值是否为NaN。
isNaN(NaN) // true
isNaN(123) // false

但是，isNaN只对数值有效，如果传入其他值，会被先转成数值。比如，传入字符串的时候，字符串会被先转成NaN，所以最后返回true，这一点要特别引起注意。也就是说，isNaN为true的值，有可能不是NaN，而是一个字符串。
isNaN('Hello') // true
// 相当于
isNaN(Number('Hello')) // true

出于同样的原因，对于对象和数组，isNaN也返回true。
isNaN({}) // true
// 等同于
isNaN(Number({})) // true

isNaN(['xzy']) // true
// 等同于
isNaN(Number(['xzy'])) // true

但是，对于空数组和只有一个数值成员的数组，isNaN返回false。
isNaN([]) // false
isNaN([123]) // false
isNaN(['123']) // false

上面代码之所以返回false，原因是这些数组能被Number函数转成数值
因此，使用isNaN之前，最好判断一下数据类型。
function myIsNaN(value) {
  return typeof value === 'number' && isNaN(value);
}

判断NaN更可靠的方法是，利用NaN为唯一不等于自身的值的这个特点，进行判断。
function myIsNaN(value) {
  return value !== value;
}

isFinite()
isFinite方法返回一个布尔值，表示某个值是否为正常的数值。
isFinite(Infinity) // false
isFinite(-Infinity) // false
isFinite(NaN) // false
isFinite(undefined) // false
isFinite(null) // true
isFinite(-1) // true

除了Infinity、-Infinity、NaN和undefined这几个值会返回false，isFinite对于其他的数值都会返回true。
Number 对象
Number对象是数值对应的包装对象，可以作为构造函数使用，也可以作为工具函数使用。

- 作为构造函数时，它用于生成值为数值的对象。
var n = new Number(1);
typeof n // "object"

- 作为工具函数时，它可以将任何类型的值转为数值。
Number(true) // 1

静态属性
Number对象拥有以下一些静态属性（即直接定义在Number对象上的属性，而不是定义在实例上的属性）。

- Number.POSITIVE_INFINITY：正的无限，指向Infinity。
- Number.NEGATIVE_INFINITY：负的无限，指向-Infinity。
- Number.NaN：表示非数值，指向NaN。
- Number.MIN_VALUE：表示最小的正数（即最接近0的正数，在64位浮点数体系中为5e-324），相应的，最接近0的负数为-Number.MIN_VALUE。
- Number.MAX_SAFE_INTEGER：表示能够精确表示的最大整数，即9007199254740991。
- Number.MIN_SAFE_INTEGER：表示能够精确表示的最小整数，即-9007199254740991。
Number.POSITIVE_INFINITY // Infinity
Number.NEGATIVE_INFINITY // -Infinity
Number.NaN // NaN

Number.MAX_VALUE
// 1.7976931348623157e+308
Number.MAX_VALUE < Infinity
// true

Number.MIN_VALUE
// 5e-324
Number.MIN_VALUE > 0
// true

Number.MAX_SAFE_INTEGER // 9007199254740991
Number.MIN_SAFE_INTEGER // -9007199254740991

实例方法
Number对象有4个实例方法，都跟将数值转换成指定格式有关。
Number.prototype.toString()
Number对象部署了自己的toString方法，用来将一个数值转为字符串形式。
(10).toString() // "10"

toString方法可以接受一个参数，表示输出的进制。如果省略这个参数，默认将数值先转为十进制，再输出字符串；否则，就根据参数指定的进制，将一个数字转化成某个进制的字符串。
(10).toString(2) // "1010"
(10).toString(8) // "12"
(10).toString(16) // "a"

上面代码中，10一定要放在括号里，这样表明后面的点表示调用对象属性。如果不加括号，这个点会被 JavaScript 引擎解释成小数点，从而报错。
10.toString(2)
// SyntaxError: Unexpected token ILLEGAL

只要能够让 JavaScript 引擎不混淆小数点和对象的点运算符，各种写法都能用。除了为10加上括号，还可以在10后面加两个点，JavaScript 会把第一个点理解成小数点（即10.0），把第二个点理解成调用对象属性，从而得到正确结果。
10..toString(2)
// "1010"

// 其他方法还包括
10 .toString(2) // "1010"
10.0.toString(2) // "1010"

这实际上意味着，可以直接对一个小数使用toString方法。
10.5.toString() // "10.5"
10.5.toString(2) // "1010.1"
10.5.toString(8) // "12.4"
10.5.toString(16) // "a.8"

通过方括号运算符也可以调用toString方法。
10['toString'](2) // "1010"

toString方法只能将十进制的数，转为其他进制的字符串。如果要将其他进制的数，转回十进制，需要使用parseInt方法。
Number.prototype.toFixed()
toFixed()方法先将一个数转为指定位数的小数，然后返回这个小数对应的字符串。
(10).toFixed(2) // "10.00"
10.005.toFixed(2) // "10.01"

上面代码中，10和10.005先转成2位小数，然后转成字符串。其中10必须放在括号里，否则后面的点会被处理成小数点。
toFixed()方法的参数为小数位数，有效范围为0到100，超出这个范围将抛出 RangeError 错误。
由于浮点数的原因，小数5的四舍五入是不确定的，使用的时候必须小心。
(10.055).toFixed(2) // 10.05
(10.005).toFixed(2) // 10.01

Number.prototype.toExponential()
toExponential方法用于将一个数转为科学计数法形式。
(10).toExponential()  // "1e+1"
(10).toExponential(1) // "1.0e+1"
(10).toExponential(2) // "1.00e+1"

(1234).toExponential()  // "1.234e+3"
(1234).toExponential(1) // "1.2e+3"
(1234).toExponential(2) // "1.23e+3"

toExponential方法的参数是小数点后有效数字的位数，范围为0到100，超出这个范围，会抛出一个 RangeError 错误。
Number.prototype.toPrecision()
Number.prototype.toPrecision()方法用于将一个数转为指定位数的有效数字。
(12.34).toPrecision(1) // "1e+1"
(12.34).toPrecision(2) // "12"
(12.34).toPrecision(3) // "12.3"
(12.34).toPrecision(4) // "12.34"
(12.34).toPrecision(5) // "12.340"

该方法的参数为有效数字的位数，范围是1到100，超出这个范围会抛出 RangeError 错误。
该方法用于四舍五入时不太可靠，跟浮点数不是精确储存有关。
(12.35).toPrecision(3) // "12.3"
(12.25).toPrecision(3) // "12.3"
(12.15).toPrecision(3) // "12.2"
(12.45).toPrecision(3) // "12.4"

Number.prototype.toLocaleString()
Number.prototype.toLocaleString()方法接受一个地区码作为参数，返回一个字符串，表示当前数字在该地区的当地书写形式。
(123).toLocaleString('zh-Hans-CN-u-nu-hanidec')
// "一二三"

该方法还可以接受第二个参数配置对象，用来定制指定用途的返回字符串。该对象的style属性指定输出样式，默认值是decimal，表示输出十进制形式。如果值为percent，表示输出百分数。
(123).toLocaleString('zh-Hans-CN', { style: 'percent' })
// "12,300%"

如果style属性的值为currency，则可以搭配currency属性，输出指定格式的货币字符串形式。
(123).toLocaleString('zh-Hans-CN', { style: 'currency', currency: 'CNY' })
// "￥123.00"

(123).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
// "123,00 €"

(123).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
// "$123.00"

如果Number.prototype.toLocaleString()省略了参数，则由浏览器自行决定如何处理，通常会使用操作系统的地区设定。注意，该方法如果使用浏览器不认识的地区码，会抛出一个错误。
(123).toLocaleString('123') // 出错

自定义方法
与其他对象一样，Number.prototype对象上面可以自定义方法，被Number的实例继承。
Number.prototype.add = function (x) {
  return this + x;
};

8['add'](2) // 10

上面代码为Number对象实例定义了一个add方法。在数值上调用某个方法，数值会自动转为Number的实例对象，所以就可以调用add方法了。由于add方法返回的还是数值，所以可以链式运算。
Number.prototype.subtract = function (x) {
  return this - x;
};

(8).add(2).subtract(4)
// 6

上面代码在Number对象的实例上部署了subtract方法，它可以与add方法链式调用。
我们还可以部署更复杂的方法。
Number.prototype.iterate = function () {
  var result = [];
  for (var i = 0; i <= this; i++) {
    result.push(i);
  }
  return result;
};

(8).iterate()
// [0, 1, 2, 3, 4, 5, 6, 7, 8]

上面代码在Number对象的原型上部署了iterate方法，将一个数值自动遍历为一个数组。
注意，数值的自定义方法，只能定义在它的原型对象Number.prototype上面，数值本身是无法自定义属性的。
var n = 1;
n.x = 1;
n.x // undefined

上面代码中，n是一个原始类型的数值。直接在它上面新增一个属性x，不会报错，但毫无作用，总是返回undefined。这是因为一旦被调用属性，n就自动转为Number的实例对象，调用结束后，该对象自动销毁。所以，下一次调用n的属性时，实际取到的是另一个对象，属性x当然就读不出来。
