# string

概述
如果要在单引号字符串的内部，使用单引号，也是如此，就必须在内部的引号前面加上反斜杠。
'Did she say \'Hello\'?'
// "Did she say 'Hello'?"

"Did she say \"Hello\"?"
// "Did she say "Hello"?"

字符串默认只能写在一行内，分成多行将会报错。
'a
b
c'
// SyntaxError: Unexpected token ILLEGAL

如果长字符串必须分成多行，可以在每一行的尾部使用反斜杠。
var longString = 'Long \
long \
long \
string';

longString
// "Long long long string"

上面代码表示，加了反斜杠以后，原来写在一行的字符串，可以分成多行书写。但是，输出的时候还是单行，效果与写在同一行完全一样。注意，反斜杠的后面必须是换行符，而不能有其他字符（比如空格），否则会报错。
连接运算符（+）可以连接多个单行字符串，将长字符串拆成多行书写，输出的时候也是单行。
var longString = 'Long '

+ 'long '
+ 'long '
+ 'string';

如果想输出多行字符串，有一种利用多行注释的变通方法。
(function () { /*
line 1
line 2
line 3
*/}).toString().split('\n').slice(1, -1).join('\n')
// "line 1
// line 2
// line 3"

上面的例子中，输出的字符串就是多行。
转义
反斜杠（\）在字符串内有特殊含义，用来表示一些特殊字符，所以又称为转义符。
需要用反斜杠转义的特殊字符，主要有下面这些。

+ \0 ：null（\u0000）
+ \b ：后退键（\u0008）
+ \f ：换页符（\u000C）
+ \n ：换行符（\u000A）
+ \r ：回车键（\u000D）
+ \t ：制表符（\u0009）
+ \v ：垂直制表符（\u000B）
+ \' ：单引号（\u0027）
+ \" ：双引号（\u0022）
+ \\ ：反斜杠（\u005C）
上面这些字符前面加上反斜杠，都表示特殊含义。
console.log('1\n2')
// 1
// 2

上面代码中，\n表示换行，输出的时候就分成了两行。
反斜杠还有三种特殊用法。
（1）\HHH
反斜杠后面紧跟三个八进制数（000到377），代表一个字符。HHH对应该字符的 Unicode 码点，比如\251表示版权符号。显然，这种方法只能输出256种字符。
（2）\xHH
\x后面紧跟两个十六进制数（00到FF），代表一个字符。HH对应该字符的 Unicode 码点，比如\xA9表示版权符号。这种方法也只能输出256种字符。
（3）\uXXXX
\u后面紧跟四个十六进制数（0000到FFFF），代表一个字符。XXXX对应该字符的 Unicode 码点，比如\u00A9表示版权符号。
下面是这三种字符特殊写法的例子。
'\251' // "©"
'\xA9' // "©"
'\u00A9' // "©"

'\172' === 'z' // true
'\x7A' === 'z' // true
'\u007A' === 'z' // true

如果在非特殊字符前面使用反斜杠，则反斜杠会被省略。
'\a'
// "a"

上面代码中，a是一个正常字符，前面加反斜杠没有特殊含义，反斜杠会被自动省略。
如果字符串的正常内容之中，需要包含反斜杠，则反斜杠前面需要再加一个反斜杠，用来对自身转义。
"Prev \\ Next"
// "Prev \ Next"

字符串与数组
字符串可以被视为字符数组，因此可以使用数组的方括号运算符，用来返回某个位置的字符（位置编号从0开始）。
var s = 'hello';
s[0] // "h"
s[1] // "e"
s[4] // "o"

// 直接对字符串使用方括号运算符
'hello'[1] // "e"

如果方括号中的数字超过字符串的长度，或者方括号中根本不是数字，则返回undefined。
'abc'[3] // undefined
'abc'[-1] // undefined
'abc'['x'] // undefined

但是，字符串与数组的相似性仅此而已。实际上，无法改变字符串之中的单个字符。
var s = 'hello';

delete s[0];
s // "hello"

s[1] = 'a';
s // "hello"

s[5] = '!';
s // "hello"

上面代码表示，字符串内部的单个字符无法改变和增删，这些操作会默默地失败。
字符集
JavaScript 使用 Unicode 字符集。JavaScript 引擎内部，所有字符都用 Unicode 表示。
JavaScript 不仅以 Unicode 储存字符，还允许直接在程序中使用 Unicode 码点表示字符，即将字符写成\uxxxx的形式，其中xxxx代表该字符的 Unicode 码点。比如，\u00A9代表版权符号。
var s = '\u00A9';
s // "©"

解析代码的时候，JavaScript 会自动识别一个字符是字面形式表示，还是 Unicode 形式表示。输出给用户的时候，所有字符都会转成字面形式。
var f\u006F\u006F = 'abc';
foo // "abc"

上面代码中，第一行的变量名foo是 Unicode 形式表示，第二行是字面形式表示。JavaScript 会自动识别。
我们还需要知道，每个字符在 JavaScript 内部都是以16位（即2个字节）的 UTF-16 格式储存。也就是说，JavaScript 的单位字符长度固定为16位长度，即2个字节。
但是，UTF-16 有两种长度：对于码点在U+0000到U+FFFF之间的字符，长度为16位（即2个字节）；对于码点在U+10000到U+10FFFF之间的字符，长度为32位（即4个字节），而且前两个字节在0xD800到0xDBFF之间，后两个字节在0xDC00到0xDFFF之间。举例来说，码点U+1D306对应的字符为𝌆，它写成 UTF-16 就是0xD834 0xDF06。
JavaScript 对 UTF-16 的支持是不完整的，由于历史原因，只支持两字节的字符，不支持四字节的字符。这是因为 JavaScript 第一版发布的时候，Unicode 的码点只编到U+FFFF，因此两字节足够表示了。后来，Unicode 纳入的字符越来越多，出现了四字节的编码。但是，JavaScript 的标准此时已经定型了，统一将字符长度限制在两字节，导致无法识别四字节的字符。上一节的那个四字节字符𝌆，浏览器会正确识别这是一个字符，但是 JavaScript 无法识别，会认为这是两个字符。
'𝌆'.length // 2

总结一下，对于码点在U+10000到U+10FFFF之间的字符，JavaScript 总是认为它们是两个字符（length属性为2）。所以处理的时候，必须把这一点考虑在内，也就是说，JavaScript 返回的字符串长度可能是不正确的。
Base64 转码
使用场景

1. ASCII 码0到31的符号都无法打印出来
2. 需要以文本格式传递二进制数据
所谓 Base64 就是一种编码方法，可以将任意值转成 0～9、A～Z、a-z、+和/这64个字符组成的可打印字符。
使用它的主要目的，不是为了加密，而是为了不出现特殊字符，简化程序的处理。
JavaScript 原生提供两个 Base64 相关的方法。

+ btoa()：任意值转为 Base64 编码

+ atob()：Base64 编码转为原来的值
var string = 'Hello World!';
btoa(string) // "SGVsbG8gV29ybGQh"
atob('SGVsbG8gV29ybGQh') // "Hello World!"

注意，这两个方法不适合非 ASCII 码的字符，会报错。
btoa('你好') // 报错

要将非 ASCII 码字符转为 Base64 编码，必须中间插入一个转码环节，再使用这两个方法。
function b64Encode(str) {
  return btoa(encodeURIComponent(str));
}

function b64Decode(str) {
  return decodeURIComponent(atob(str));
}

b64Encode('你好') // "JUU0JUJEJUEwJUU1JUE1JUJE"
b64Decode('JUU0JUJEJUEwJUU1JUE1JUJE') // "你好"

String 对象
String对象是 JavaScript 原生提供的三个包装对象之一，用来生成字符串对象。
var s1 = 'abc';
var s2 = new String('abc');

typeof s1 // "string"
typeof s2 // "object"

s2.valueOf() // "abc"

字符串对象是一个类似数组的对象（很像数组，但不是数组）。
new String('abc')
// String {0: "a", 1: "b", 2: "c", length: 3}

(new String('abc'))[1] // "b"

上面代码中，字符串abc对应的字符串对象，有数值键（0、1、2）和length属性，所以可以像数组那样取值。
除了用作构造函数，String对象还可以当作工具方法使用，将任意类型的值转为字符串。
String(true) // "true"
String(5) // "5"

静态方法
String.fromCharCode()
String对象提供的静态方法（即定义在对象本身，而不是定义在对象实例的方法），主要是String.fromCharCode()。该方法的参数是一个或多个数值，代表 Unicode 码点，返回值是这些码点组成的字符串。
String.fromCharCode() // ""
String.fromCharCode(97) // "a"
String.fromCharCode(104, 101, 108, 108, 111)
// "hello"

注意，该方法不支持 Unicode 码点大于0xFFFF的字符，即传入的参数不能大于0xFFFF（即十进制的 65535）。
String.fromCharCode(0x20BB7)
// "ஷ"
String.fromCharCode(0x20BB7) === String.fromCharCode(0x0BB7)
// true

码点大于0xFFFF的字符占用四个字节，而 JavaScript 默认支持两个字节的字符。这种情况下，必须把0x20BB7拆成两个字符表示。
String.fromCharCode(0xD842, 0xDFB7)
// "𠮷"

上面代码中，0x20BB7拆成两个字符0xD842和0xDFB7（即两个两字节字符，合成一个四字节字符），就能得到正确的结果。码点大于0xFFFF的字符的四字节表示法，由 UTF-16 编码方法决定。
实例属性
String.prototype.length
字符串实例的length属性返回字符串的长度。长度的计算是按字节算的，两个字节为一个单位长度
'abc'.length // 3

实例方法
记忆方法

+ 查：indexOf, lastIndexOf, charAt, chartCodeAt, search, match
+ 转：toLowerCase, toUpperCase, split,
+ 操：slice, substring, substr, replace, trim, concat
String.prototype.charAt()
charAt方法返回指定位置的字符，参数是从0开始编号的位置。
var s = new String('abc');

s.charAt(1) // "b"
s.charAt(s.length - 1) // "c"

这个方法完全可以用数组下标替代。
'abc'.charAt(1) // "b"
'abc'[1] // "b"

如果参数为负数，或大于等于字符串的长度，charAt返回空字符串。
'abc'.charAt(-1) // ""
'abc'.charAt(3) // ""

String.prototype.charCodeAt()
charCodeAt()方法返回字符串指定位置的 Unicode 码点（十进制表示），相当于String.fromCharCode()的逆操作。
'abc'.charCodeAt(1) // 98

如果没有任何参数，charCodeAt返回首字符的 Unicode 码点。
'abc'.charCodeAt() // 97

如果参数为负数，或大于等于字符串的长度，charCodeAt返回NaN。
'abc'.charCodeAt(-1) // NaN
'abc'.charCodeAt(4) // NaN

注意，charCodeAt方法返回的 Unicode 码点不会大于65536（0xFFFF），也就是说，只返回两个字节的字符的码点。如果遇到码点大于 65536 的字符（四个字节的字符），必须连续使用两次charCodeAt，不仅读入charCodeAt(i)，还要读入charCodeAt(i+1)，将两个值放在一起，才能得到准确的字符。
String.prototype.concat()
concat方法用于连接两个字符串，返回一个新字符串，不改变原字符串。
var s1 = 'abc';
var s2 = 'def';

s1.concat(s2) // "abcdef"
s1 // "abc"

该方法可以接受多个参数。
'a'.concat('b', 'c') // "abc"

如果参数不是字符串，concat方法会将其先转为字符串，然后再连接。
var one = 1;
var two = 2;
var three = '3';

''.concat(one, two, three) // "123"
one + two + three // "33"

String.prototype.slice()
slice()方法用于从原字符串取出子字符串并返回，不改变原字符串。它的第一个参数是子字符串的开始位置，第二个参数是子字符串的结束位置（不含该位置）。
'JavaScript'.slice(0, 4) // "Java"

如果省略第二个参数，则表示子字符串一直到原字符串结束。
'JavaScript'.slice(4) // "Script"

如果参数是负值，表示从结尾开始倒数计算的位置，即该负值加上字符串长度。
'JavaScript'.slice(-6) // "Script"
'JavaScript'.slice(0, -6) // "Java"
'JavaScript'.slice(-2, -1) // "p"

如果第一个参数大于第二个参数（正数情况下），slice()方法返回一个空字符串。
'JavaScript'.slice(2, 1) // ""

String.prototype.substring()
substring方法用于从原字符串取出子字符串并返回，不改变原字符串，跟slice方法很相像。它的第一个参数表示子字符串的开始位置，第二个位置表示结束位置（返回结果不含该位置）。
'JavaScript'.substring(0, 4) // "Java"

如果省略第二个参数，则表示子字符串一直到原字符串的结束。
'JavaScript'.substring(4) // "Script"

如果第一个参数大于第二个参数，substring方法会自动更换两个参数的位置。
'JavaScript'.substring(10, 4) // "Script"
// 等同于
'JavaScript'.substring(4, 10) // "Script"

如果参数是负数，substring方法会自动将负数转为0。
'JavaScript'.substring(-3) // "JavaScript"
'JavaScript'.substring(4, -3) // "Java"

由于这些规则违反直觉，因此不建议使用substring方法，应该优先使用slice。
String.prototype.substr()
substr方法用于从原字符串取出子字符串并返回，不改变原字符串，跟slice和substring方法的作用相同。
substr方法的第一个参数是子字符串的开始位置（从0开始计算），第二个参数是子字符串的长度。
'JavaScript'.substr(4, 6) // "Script"

如果省略第二个参数，则表示子字符串一直到原字符串的结束。
'JavaScript'.substr(4) // "Script"

如果第一个参数是负数，表示倒数计算的字符位置。如果第二个参数是负数，将被自动转为0，因此会返回空字符串。
'JavaScript'.substr(-6) // "Script"
'JavaScript'.substr(4, -1) // ""

String.prototype.indexOf()，String.prototype.lastIndexOf()
indexOf方法用于确定一个字符串在另一个字符串中第一次出现的位置，返回结果是匹配开始的位置。如果返回-1，就表示不匹配。
'hello world'.indexOf('o') // 4
'JavaScript'.indexOf('script') // -1

indexOf方法还可以接受第二个参数，表示从该位置开始向后匹配。
'hello world'.indexOf('o', 6) // 7

lastIndexOf方法的用法跟indexOf方法一致，主要的区别是lastIndexOf从尾部开始匹配，indexOf则是从头部开始匹配。
'hello world'.lastIndexOf('o') // 7

另外，lastIndexOf的第二个参数表示从该位置起向前匹配。
'hello world'.lastIndexOf('o', 6) // 4

String.prototype.trim()
trim方法用于去除字符串两端的空格，返回一个新字符串，不改变原字符串。
'  hello world  '.trim()
// "hello world"

该方法去除的不仅是空格，还包括制表符（\t、\v）、换行符（\n）和回车符（\r）。
'\r\nabc \t'.trim() // 'abc'

String.prototype.toLowerCase()，String.prototype.toUpperCase()
toLowerCase方法用于将一个字符串全部转为小写，toUpperCase则是全部转为大写。它们都返回一个新字符串，不改变原字符串。
'Hello World'.toLowerCase()
// "hello world"

'Hello World'.toUpperCase()
// "HELLO WORLD"

String.prototype.match()
match方法用于确定原字符串是否匹配某个子字符串，返回一个数组，成员为匹配的第一个字符串。如果没有找到匹配，则返回null。
'cat, bat, sat, fat'.match('at') // ["at"]
'cat, bat, sat, fat'.match('xt') // null

返回的数组还有index属性和input属性，分别表示匹配字符串开始的位置和原始字符串。
var matches = 'cat, bat, sat, fat'.match('at');
matches.index // 1
matches.input // "cat, bat, sat, fat"

String.prototype.search()，String.prototype.replace()
search方法的用法基本等同于match，但是返回值为匹配的第一个位置。如果没有找到匹配，则返回-1。
'cat, bat, sat, fat'.search('at') // 1

replace方法用于替换匹配的子字符串，一般情况下只替换第一个匹配（除非使用带有g修饰符的正则表达式）。
'aaa'.replace('a', 'b') // "baa"

replace方法还可以使用正则表达式作为参数，详见《正则表达式》一节。
String.prototype.split()
split方法按照给定规则分割字符串，返回一个由分割出来的子字符串组成的数组。
'a|b|c'.split('|') // ["a", "b", "c"]

如果分割规则为空字符串，则返回数组的成员是原字符串的每一个字符。
'a|b|c'.split('') // ["a", "|", "b", "|", "c"]

如果省略参数，则返回数组的唯一成员就是原字符串。
'a|b|c'.split() // ["a|b|c"]

如果满足分割规则的两个部分紧邻着（即两个分割符中间没有其他字符），则返回数组之中会有一个空字符串。
'a||c'.split('|') // ['a', '', 'c']

如果满足分割规则的部分处于字符串的开头或结尾（即它的前面或后面没有其他字符），则返回数组的第一个或最后一个成员是一个空字符串。
'|b|c'.split('|') // ["", "b", "c"]
'a|b|'.split('|') // ["a", "b", ""]

split方法还可以接受第二个参数，限定返回数组的最大成员数。
'a|b|c'.split('|', 0) // []
'a|b|c'.split('|', 1) // ["a"]
'a|b|c'.split('|', 2) // ["a", "b"]
'a|b|c'.split('|', 3) // ["a", "b", "c"]
'a|b|c'.split('|', 4) // ["a", "b", "c"]

String.prototype.localeCompare()
localeCompare方法用于比较两个字符串。它返回一个整数，如果小于0，表示第一个字符串小于第二个字符串；如果等于0，表示两者相等；如果大于0，表示第一个字符串大于第二个字符串。
'apple'.localeCompare('banana') // -1
'apple'.localeCompare('apple') // 0

该方法的最大特点，就是会考虑自然语言的顺序。举例来说，正常情况下，大写的英文字母小于小写字母。
'B' > 'a' // false

上面代码中，字母B小于字母a。因为 JavaScript 采用的是 Unicode 码点比较，B的码点是66，而a的码点是97。
但是，localeCompare方法会考虑自然语言的排序情况，将B排在a的前面。
'B'.localeCompare('a') // 1

上面代码中，localeCompare方法返回整数1，表示B较大。
localeCompare还可以有第二个参数，指定所使用的语言（默认是英语），然后根据该语言的规则进行比较。
'ä'.localeCompare('z', 'de') // -1
'ä'.localeCompare('z', 'sv') // 1

上面代码中，de表示德语，sv表示瑞典语。德语中，ä小于z，所以返回-1；瑞典语中，ä大于z，所以返回1。
