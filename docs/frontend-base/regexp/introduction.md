# 正则表达式语法

## 基本概念

正则表达式（Regular Expression，在代码中常简写为regex、regexp或RE）使用单个字符串来描述、匹配一系列符合某个句法规则的字符串搜索模式。搜索模式可用于文本搜索和文本替换。它用一系列字符定义搜索模式

正则表达式的语法如下：

```bash
/正则表达式主体/修饰符(可选)
```

## 创建方式

1. 字面量：正则表达式直接放在`/ /`之中：

```js
const rex = /pattern/; 
```

2. 构造函数：RegExp 对象表示正则表达式的一个实例：

```js
const rex = new RegExp("pattern");
```

通过这两种方法创建出来的`Regex`对象都具有相同的方法和属性，最大区别是对象的构造函数允许传递带引号的表达式，通过这种方式就可以动态创建正则表达式

## 字符匹配

### 模糊匹配

正则表达式之所以强大，是因为其能实现模糊匹配

1. **横向模糊匹配--量词**

横向模糊指的是，一个正则可匹配的字符串的长度不是固定的，可以是多种情况的。其实现的方式是使用量词。譬如{m,n}，表示连续出现最少m次，最多n次。比如/ab{2,5}c/表示匹配这样一个字符串：第一个字符是“a”，接下来是2到5个字符“b”，最后是字符“c”

1.1 **简写形式**

- {m,}： 表示至少出现m次。
- {m}： 等价于{m,m}，表示出现m次。
- ?： 等价于{0,1}，表示出现或者不出现。记忆方式：问号的意思表示，有吗？
- +： 等价于{1,}，表示出现至少一次。记忆方式：加号是追加的意思，得先有一个，然后才考虑追加。
- *： 等价于{0,}，表示出现任意次，有可能不出现。记忆方式：看看天上的星星，可能一颗没有，可能零散有几颗，可能数也数不过来

1.2 **贪婪匹配与惰性匹配**

字符数量的匹配默认是贪婪匹配的方式，会尽可能匹配多的字符，通过在数量范围(量词)后添加``?``可以实现惰性匹配，匹配到最小符合数量为止

默认是贪婪匹配，如下：

```js
var regex = /\d{2,5}/g;
var string = "123 1234 12345 123456";
console.log(string.match(regex)); 
// => ["123", "1234", "12345", "12345"]
```

修改为惰性匹配后，如下：

```js
var regex = /\d{2,5}?/g;
var string = "123 1234 12345 123456";
console.log(string.match(regex)); 
// => ["12", "12", "34", "12", "34", "12", "34", "56"]
```

2. **纵向模糊匹配--字符组**

纵向模糊指的是，一个正则匹配的字符串，具体到某一位字符时，它可以不是某个确定的字符，可以有多种可能。其实现的方式是使用字符组。譬如[abc]，表示该字符是可以字符“a”、“b”、“c”中的任何一个。比如/a[123]b/可以匹配如下三种字符串："a1b"、"a2b"、"a3b"

2.1 **范围表示**

如果字符组里的字符特别多的话，比如[123456abcdefGHIJKLM]，可以写成[1-6a-fG-M]。用连字符-来省略和简写。因为连字符有特殊用途，那么要匹配“a”、“-”、“z”这三者中任意一个字符，不能写成[a-z]，因为其表示小写字符中的任何一个字符。可以写成如下的方式：[-az]或[az-]或[a\-z]。即要么放在开头，要么放在结尾，要么转义。总之不会让引擎认为是范围表示法就行了

2.2 **排除字符组**

纵向模糊匹配，还有一种情形就是，某位字符可以是任何东西，但就不能是"a"、"b"、"c"。此时就是排除字符组（反义字符组）的概念。例如[^abc]，表示是一个除"a"、"b"、"c"之外的任意一个字符。字符组的第一位放^（脱字符），表示求反的概念。当然，也有相应的范围表示法

2.3 **简写形式**

常用的字符组中，有些系统提供了简写形式

- \d：就是[0-9]。表示是一位数字。记忆方式：其英文是digit（数字）。
- \D：就是[^0-9]。表示除数字外的任意字符。
- \w：就是[0-9a-zA-Z_]。表示数字、大小写字母和下划线。记忆方式：w是word的简写，也称单词字符。
- \W：是[^0-9a-zA-Z_]。非单词字符。
- \s：是[ \t\v\n\r\f]。表示空白符，包括空格、水平制表符、垂直制表符、换行符、回车符、换页符。记忆方式：s是space character的首字母。
- \S：是[^ \t\v\n\r\f]。 非空白符。
- .：就是[^\n\r\u2028\u2029]。通配符，表示几乎任意字符。换行符、回车符、行分隔符和段分隔符除外。记忆方式：想想省略号...中的每个点，都可以理解成占位符，表示任何类似的东西。

3. **分支--管道符**

一个模式可以实现横向和纵向模糊匹配。而多选分支可以支持多个子模式任选其一。
具体形式如下：(p1|p2|p3)，其中p1、p2和p3是子模式，用|（管道符）分隔，表示其中任何之一
配置匹配也是惰性的，即管道符左侧匹配成功后，不再匹配右侧

比如我用/good|goodbye/，去匹配"goodbye"字符串时，结果是"good"：

```js
var regex = /good|goodbye/g;
var string = "goodbye";
console.log(string.match(regex)); 
// => ["good"]
```

而把正则改成/goodbye|good/，结果是：

```js
var regex = /goodbye|good/g;
var string = "goodbye";
console.log(string.match(regex)); 
// => ["goodbye"]
```

### 位置匹配

位置就是相邻字符间的位置

1. **匹配方式**

1.1 **^与$**

^（脱字符）匹配开头，在多行匹配中匹配行开头。

$（美元符号）匹配结尾，在多行匹配中匹配行结尾。

1.2 **\b与\B**

\b是单词边界，具体就是\w和\W之间的位置，也包括\w和^之间的位置，也包括\w和$之间的位置，\B就是\b的反面的意思，非单词边界，具体说来就是\w与\w、\W与\W、^与\W，\W与$之间的位置

1.3 **(?=p)与(?!p)**

其中p是一个子模式，(?=p)即p前面的位置。比如(?=l)，表示'l'字符前面的位置

(?!p)就是(?=p)的反面意思，即非p模式前面的位置

## 括号的使用

### 分支与分组

**分支**：`分支`与`管道符`一起使用，提供了子表达式的可能，如`(a|b)`

**分组**：若要匹配连续出现的`字符组`时，需要使用到分组，如`/(ab)+/`，表示出现连续的`ab`

### 引用分组

这是分组另一个重要的作用，通过引用分组可以实现`数据提取`和`替换操作`

1. **数据提取**

```js
var regex = /(\d{4})-(\d{2})-(\d{2})/;
var string = "2017-06-12";
console.log(string.match(regex)); 
// => ["2017-06-12", "2017", "06", "12", index: 0, input: "2017-06-12"]
```

如上示例，我们需要从日期中提取出年月日，使用字符串的match方法，返回一个数组，第一项是整体的匹配结果，接着是分组的内容，然后的匹配到的下表，左右是原始字符串

使用正则对象的`exec`方法可以达到同样的效果

```js
var regex = /(\d{4})-(\d{2})-(\d{2})/;
var string = "2017-06-12";
console.log(regex.exec(string)); 
// => ["2017-06-12", "2017", "06", "12", index: 0, input: "2017-06-12"]
```

返回分组的匹配内容，也可以使用正则对象的$1-$9来进行获取

```js
var regex = /(\d{4})-(\d{2})-(\d{2})/;
var string = "2017-06-12";

regex.test(string); // 正则操作即可，例如
//regex.exec(string);
//string.match(regex);

console.log(RegExp.$1); // "2017"
console.log(RegExp.$2); // "06"
console.log(RegExp.$3); // "12"
```

2. **替换**

替换使用字符串的`replace`方法，通过$1-$9获取到分组内容

比如，想把yyyy-mm-dd格式，替换成mm/dd/yyyy怎么做？

```js
var regex = /(\d{4})-(\d{2})-(\d{2})/;
var string = "2017-06-12";
var result = string.replace(regex, "$2/$3/$1");
console.log(result); 
// => "06/12/2017"
```

其中replace中的，第二个参数里用$1、$2、$3指代相应的分组。等价于如下的形式：

```js
var regex = /(\d{4})-(\d{2})-(\d{2})/;
var string = "2017-06-12";
var result = string.replace(regex, function() {
    return RegExp.$2 + "/" + RegExp.$3 + "/" + RegExp.$1;
});
console.log(result); 
// => "06/12/2017"
```

也等价于：

```js
var regex = /(\d{4})-(\d{2})-(\d{2})/;
var string = "2017-06-12";
var result = string.replace(regex, function(match, year, month, day) {
    return month + "/" + day + "/" + year;
});
console.log(result); 
// => "06/12/2017"
```

3. **反向引用**

所谓反向引用，就是正则引用正则本身的分组
比如要写一个正则支持匹配如下三种格式：

- 2016-06-12

- 2016/06/12

- 2016.06.12

最先可能想到的正则是:

```js
var regex = /\d{4}(-|\/|\.)\d{2}(-|\/|\.)\d{2}/;
var string1 = "2017-06-12";
var string2 = "2017/06/12";
var string3 = "2017.06.12";
var string4 = "2016-06/12";
console.log(regex.test(string1)); // true
console.log(regex.test(string2)); // true
console.log(regex.test(string3)); // true
console.log(regex.test(string4)); // true
```

其中/和.需要转义。虽然匹配了要求的情况，但也匹配"2016-06/12"这样的数据。

假设我们想要求分割符前后一致怎么办？此时需要使用反向引用：

```js
var regex = /\d{4}(-|\/|\.)\d{2}\1\d{2}/;
var string1 = "2017-06-12";
var string2 = "2017/06/12";
var string3 = "2017.06.12";
var string4 = "2016-06/12";
console.log(regex.test(string1)); // true
console.log(regex.test(string2)); // true
console.log(regex.test(string3)); // true
console.log(regex.test(string4)); // false
```

注意里面的\1，表示的引用之前的那个分组(-|\/|\.)。不管它匹配到什么（比如-），\1都匹配那个同样的具体某个字符。
> 几个特殊的情况：

1. 有嵌套的括号
 嵌套的括号以左括号为准

```js
var regex = /^((\d)(\d(\d)))\1\2\3\4$/;
var string = "1231231233";
console.log(regex.test(string)); // true
console.log(RegExp.$1); // 123
console.log(RegExp.$2); // 1
console.log(RegExp.$3); // 23
console.log(RegExp.$4); // 3
```

- 第一个字符是数字，比如说1，
- 第二个字符是数字，比如说2，
- 第三个字符是数字，比如说3，
- 接下来的是\1，是第一个分组内容，那么看第一个开括号对应的分组是什么，是123，
- 接下来的是\2，找到第2个开括号，对应的分组，匹配的内容是1，
- 接下来的是\3，找到第3个开括号，对应的分组，匹配的内容是23，
- 最后的是\4，找到第3个开括号，对应的分组，匹配的内容是3。

2. \10表示什么呢

即\10是表示第10个分组，还是\1和0呢？

答案是前者，虽然一个正则里出现\10比较罕见

3. 引用的分组不存在

因为反向引用，是引用前面的分组，但我们在正则里引用了不存在的分组时，此时正则不会报错，只是匹配反向引用的字符本身。例如\2，就匹配"\2"。注意"\2"表示对"2"进行了转义

## 正则表达式的拆分

### 结构

- 字面量：匹配一个具体字符，包括不用转义的和需要转义的。比如a匹配字符"a"，又比如\n匹配换行符，又比如\.匹配小数点。
- 字符组：匹配一个字符，可以是多种可能之一，比如[0-9]，表示匹配一个数字。也有\d的简写形式。另外还有反义字符组，表示可以是除了特定字符之外任何一个字符，比如[^0-9]，表示一个非数字字符，也有\D的简写形式。
- 量词：表示一个字符连续出现，比如a{1,3}表示“a”字符连续出现3次。另外还有常见的简写形式，比如a+表示“a”字符连续出现至少一次。
- 锚点：匹配一个位置，而不是字符。比如^匹配字符串的开头，又比如\b匹配单词边界，又比如(?=\d)表示数字前面的位置。
- 分组：用括号表示一个整体，比如(ab)+，表示"ab"两个字符连续出现多次，也可以使用非捕获分组(?:ab)+。
- 分支：多个子表达式多选一，比如abc|bcd，表达式匹配"abc"或者"bcd"字符子串。
- 反向引用：比如\2，表示引用第2个分组

### 操作符

- 转义符： \
- 括号和方括号： (...)、(?:...)、(?=...)、(?!...)、[...]
- 量词限定符： {m}、{m,n}、{m,}、?、*、+
- 位置和序列： ^ 、$、 \元字符、 一般字符
- 管道符：|

## 正则表达式编程

### 正则表达式四种操作

正则表达式是匹配模式，不管如何使用正则表达式，万变不离其宗，都需要先`匹配`，所谓匹配，就是看目标字符串里是否有满足匹配的子串。因此，“匹配”的本质就是“查找”

 **1. 验证**

- 使用search

```js
var regex = /\d/;
var string = "abc123";
console.log(!!string.search(regex));
// => true
```

- 使用match

```js
var regex = /\d/;
var string = "abc123";
console.log(!!string.match(regex));
// => true
```

- 使用test

```js
var regex = /\d/;
var string = "abc123";
console.log(regex.test(string));
// => true
```

- 使用exec

```js
var regex = /\d/;
var string = "abc123";
console.log(!!regex.exec(string));
// => true
```

**2. 切分**

匹配上了，我们就可以进行一些操作，比如切分。

所谓“切分”，就是把目标字符串，切成一段一段的。在JS中使用的是split。

比如，目标字符串是"html,css,javascript"，按逗号来切分：

```js
var regex = /,/;
var string = "html,css,javascript";
console.log(string.split(regex));
// => ["html", "css", "javascript"]
```

又比如，如下的日期格式：

- 2017/06/26
- 2017.06.26
- 2017-06-26

可以使用split“切出”年月日：

```js
var regex = /\D/;
console.log("2017/06/26".split(regex));
console.log("2017.06.26".split(regex));
console.log("2017-06-26".split(regex));
// => ["2017", "06", "26"]
// => ["2017", "06", "26"]
// => ["2017", "06", "26"]
```

**3. 提取**

虽然整体匹配上了，但有时需要提取部分匹配的数据。

此时正则通常要使用分组引用（分组捕获）功能，还需要配合使用相关API。

这里，还是以日期为例，提取出年月日。注意下面正则中的括号：

- match

```js
var regex = /^(\d{4})\D(\d{2})\D(\d{2})$/;
var string = "2017-06-26";
console.log(string.match(regex));
// =>["2017-06-26", "2017", "06", "26", index: 0, input: "2017-06-26"]
```

- exec

```js
var regex = /^(\d{4})\D(\d{2})\D(\d{2})$/;
var string = "2017-06-26";
console.log(regex.exec(string));
// =>["2017-06-26", "2017", "06", "26", index: 0, input: "2017-06-26"]
```

- test

```js
var regex = /^(\d{4})\D(\d{2})\D(\d{2})$/;
var string = "2017-06-26";
regex.test(string);
console.log(RegExp.$1, RegExp.$2, RegExp.$3);
// => "2017" "06" "26"
```

- search

```js
var regex = /^(\d{4})\D(\d{2})\D(\d{2})$/;
var string = "2017-06-26";
string.search(regex);
console.log(RegExp.$1, RegExp.$2, RegExp.$3);
// => "2017" "06" "26"
```

- replace

```js
var regex = /^(\d{4})\D(\d{2})\D(\d{2})$/;
var string = "2017-06-26";
var date = [];
string.replace(regex, function(match, year, month, day) {
    date.push(year, month, day);
});
console.log(date);
// => ["2017", "06", "26"]
```

### 相关API注意要点

从上面可以看出用于正则操作的方法，共有6个，字符串实例4个，正则实例2个：

String：search、split、match、replace

RegExp：test、exec

**1.search和match将字符串参数转为正则**

字符串实例的那4个方法参数都支持正则和字符串，但search和match，会把字符串转换为正则的。

```js
var string = "2017.06.27";

console.log(string.search("."));
// => 0

//需要修改成下列形式之一
console.log(string.search("\\."));
console.log(string.search(/\./));
// => 4
// => 4

console.log(string.match("."));
// => ["2", index: 0, input: "2017.06.27"]

//需要修改成下列形式之一
console.log(string.match("\\."));
console.log(string.match(/\./));
// => [".", index: 4, input: "2017.06.27"]
// => [".", index: 4, input: "2017.06.27"]

console.log(string.split("."));
// => ["2017", "06", "27"]

console.log(string.replace(".", "/"));
// => "2017/06.27"
```

**2. match返回结果的格式问题**

match返回结果的格式，与正则对象是否有修饰符g有关。

```js
var string = "2017.06.27";
var regex1 = /\b(\d+)\b/;
var regex2 = /\b(\d+)\b/g;
console.log(string.match(regex1));
console.log(string.match(regex2));
// => ["2017", "2017", index: 0, input: "2017.06.27"]
// => ["2017", "06", "27"]
```

没有g，返回的是标准匹配格式，即，数组的第一个元素是整体匹配的内容，接下来是分组捕获的内容，然后是整体匹配的第一个下标，最后是输入的目标字符串。

有g，返回的是所有匹配的内容。

当没有匹配时，不管有无g，都返回null。

**3. exec比match更强大**

当正则没有g时，使用match返回的信息比较多。但是有g后，就没有关键的信息index了。

而exec方法就能解决这个问题，它能接着上一次匹配后继续匹配：

```js
var string = "2017.06.27";
var regex2 = /\b(\d+)\b/g;
console.log(regex2.exec(string));
console.log(regex2.lastIndex);
console.log(regex2.exec(string));
console.log(regex2.lastIndex);
console.log(regex2.exec(string));
console.log(regex2.lastIndex);
console.log(regex2.exec(string));
console.log(regex2.lastIndex);
// => ["2017", "2017", index: 0, input: "2017.06.27"]
// => 4
// => ["06", "06", index: 5, input: "2017.06.27"]
// => 7
// => ["27", "27", index: 8, input: "2017.06.27"]
// => 10
// => null
// => 0
```

其中正则实例lastIndex属性，表示下一次匹配开始的位置。

比如第一次匹配了“2017”，开始下标是0，共4个字符，因此这次匹配结束的位置是3，下一次开始匹配的位置是4。

从上述代码看出，在使用exec时，经常需要配合使用while循环：

```js
var string = "2017.06.27";
var regex2 = /\b(\d+)\b/g;
var result;
while (result = regex2.exec(string)) {
    console.log(result, regex2.lastIndex);
}
// => ["2017", "2017", index: 0, input: "2017.06.27"] 4
// => ["06", "06", index: 5, input: "2017.06.27"] 7
// => ["27", "27", index: 8, input: "2017.06.27"] 10
```

**4. 修饰符g，对exec和test的影响**

字符串的四个方法，每次匹配时，都是从0开始的，即lastIndex属性始终不变。

而正则实例的两个方法exec、test，当正则是全局匹配时，每一次匹配完成后，都会修改lastIndex。下面让我们以test为例，看看你是否会迷糊：

```js
var regex = /a/g;
console.log(regex.test("a"), regex.lastIndex);
console.log(regex.test("aba"), regex.lastIndex);
console.log(regex.test("ababc"), regex.lastIndex);
// => true 1
// => true 3
// => false 0
```

注意上面代码中的第三次调用test，因为这一次尝试匹配，开始从下标lastIndex即3位置处开始查找，自然就找不到了。

如果没有g，自然都是从字符串第0个字符处开始尝试匹配：

```js
var regex = /a/;
console.log(regex.test("a"), regex.lastIndex);
console.log(regex.test("aba"), regex.lastIndex);
console.log(regex.test("ababc"), regex.lastIndex);
// => true 0
// => true 0
// => true 0
```

**5. test整体匹配时需要使用^和$**

这个相对容易理解，因为test是看目标字符串中是否有子串匹配正则，即有部分匹配即可。

如果，要整体匹配，正则前后需要添加开头和结尾：

```js
console.log(/123/.test("a123b"));
// => true
console.log(/^123$/.test("a123b"));
// => false
console.log(/^123$/.test("123"));
// => true
```

**6. split相关注意事项**

split方法看起来不起眼，但要注意的地方有两个的。

第一，它可以有第二个参数，表示结果数组的最大长度：

```js
var string = "html,css,javascript";
console.log(string.split(/,/, 2));
// =>["html", "css"]
```

第二，正则使用分组时，结果数组中是包含分隔符的：

```js
var string = "html,css,javascript";
console.log(string.split(/(,)/));
// =>["html", ",", "css", ",", "javascript"]
```

**7. replace是很强大的**

总体来说replace有两种使用形式，这是因为它的第二个参数，可以是字符串，也可以是函数。

当第二个参数是字符串时，如下的字符有特殊的含义：

```text
$1,$2,...,$99 匹配第1~99个分组里捕获的文本
$& 匹配到的子串文本
$` 匹配到的子串的左边文本
$' 匹配到的子串的右边文本
? 美元符号
例如，把"2,3,5"，变成"5=2+3"：
```

```js
var result = "2,3,5".replace(/(\d+),(\d+),(\d+)/, "$3=$1+$2");
console.log(result);
// => "5=2+3"
```

又例如，把"2,3,5"，变成"222,333,555":

```js
var result = "2,3,5".replace(/(\d+)/g, "$&$&$&");
console.log(result);
// => "222,333,555"
```

再例如，把"2+3=5"，变成"2+3=2+3=5=5":

```js
var result = "2+3=5".replace(/=/, "$&$`$&$'$&");
console.log(result);
// => "2+3=2+3=5=5"
```

当第二个参数是函数时，我们需要注意该回调函数的参数具体是什么：

```js
"1234 2345 3456".replace(/(\d)\d{2}(\d)/g, function(match, $1, $2, index, input) {
    console.log([match, $1, $2, index, input]);
});
// => ["1234", "1", "4", 0, "1234 2345 3456"]
// => ["2345", "2", "5", 5, "1234 2345 3456"]
// => ["3456", "3", "6", 10, "1234 2345 3456"]
```

此时我们可以看到replace拿到的信息，并不比exec少。

**8. 使用构造函数需要注意的问题**

一般不推荐使用构造函数生成正则，而应该优先使用字面量。因为用构造函数会多写很多\。

```
var string = "2017-06-27 2017.06.27 2017/06/27";
var regex = /\d{4}(-|\.|\/)\d{2}\1\d{2}/g;
console.log(string.match(regex));
// => ["2017-06-27", "2017.06.27", "2017/06/27"]

regex = new RegExp("\\d{4}(-|\\.|\\/)\\d{2}\\1\\d{2}", "g");
console.log(string.match(regex));
// => ["2017-06-27", "2017.06.27", "2017/06/27"]
```

**9. 修饰符**

ES5中修饰符，共3个：

- g 全局匹配，即找到所有匹配的，单词是global

- i 忽略字母大小写，单词ingoreCase

- m 多行匹配，只影响^和$，二者变成行的概念，即行开头和行结尾。单词是multiline

当然正则对象也有相应的只读属性：

```js
var regex = /\w/img;
console.log(regex.global);
console.log(regex.ignoreCase);
console.log(regex.multiline);
// => true
// => true
// => true
```

**10. source属性**

正则实例对象属性，除了global、ingnoreCase、multiline、lastIndex属性之外，还有一个source属性。

它什么时候有用呢？

比如，在构建动态的正则表达式时，可以通过查看该属性，来确认构建出的正则到底是什么：

```js
var className = "high";
var regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
console.log(regex.source)
// => (^|\s)high(\s|$) 即字符串"(^|\\s)high(\\s|$)"
```

**11. 构造函数属性**

构造函数的静态属性基于所执行的最近一次正则操作而变化。除了是$1,...,$9之外，还有几个不太常用的属性（有兼容性问题）：

RegExp.input`最近一次目标字符串，简写成`RegExp["$_"]`
`RegExp.lastMatch`最近一次匹配的文本，简写成`RegExp["$&"]`
`RegExp.lastParen`最近一次捕获的文本，简写成`RegExp["$+"]`
`RegExp.leftContext`目标字符串中`lastMatch`之前的文本，简写成`RegExp["$`"]`
`RegExp.rightContext`目标字符串中`lastMatch`之后的文本，简写成`RegExp["$'"]
测试代码如下：

```js
var regex = /([abc])(\d)/g;
var string = "a1b2c3d4e5";
string.match(regex);

console.log(RegExp.input);
console.log(RegExp["$_"]);
// => "a1b2c3d4e5"

console.log(RegExp.lastMatch);
console.log(RegExp["$&"]);
// => "c3"

console.log(RegExp.lastParen);
console.log(RegExp["$+"]);
// => "3"

console.log(RegExp.leftContext);
console.log(RegExp["$`"]);
// => "a1b2"

console.log(RegExp.rightContext);
console.log(RegExp["$'"]);
// => "d4e5"
```

## 常见特殊字符

- **\b**: 匹配一个单词边界，也就是指单词和空格间的位置。例如，“er\b”可以匹配“never”中的“er”，但不能匹配“verb”中的“er”。
- **\B**: 匹配非单词边界。“er\B”能匹配“verb”中的“er”，但不能匹配“never”中的“er”。
- **\cx**: 匹配由x指明的控制字符。例如，\cM匹配一个Control-M或回车符。x的值必须为A-Z或a-z之一。否则，将c视为一个原义的“c”字符。
- **\d**: 匹配一个数字字符。等价于[0-9]。
- **\D**: 匹配一个非数字字符。等价于[^0-9]。
- **\f**: 匹配一个换页符。等价于\x0c和\cL。
- **\n**: 匹配一个换行符。等价于\x0a和\cJ。
- **\r**: 匹配一个回车符。等价于\x0d和\cM。
- **\s**: 匹配任何空白字符，包括空格、制表符、换页符等等。等价于[ \f\n\r\t\v]。
- **\S**: 匹配任何非空白字符。等价于[^ \f\n\r\t\v]。
- **\t**: 匹配一个制表符。等价于\x09和\cI。
- **\v**: 匹配一个垂直制表符。等价于\x0b和\cK。
- **\w**: 匹配包括下划线的任何单词字符。等价于“[A-Za-z0-9_]”。
- **\W**: 匹配任何非单词字符。等价于“[^A-Za-z0-9_]”。
- **\xn**: 匹配n，其中n为十六进制转义值。十六进制转义值必须为确定的两个数字长。例如，“\x41”匹配“A”。“\x041”则等价于“\x04&1”。正则表达式中可以使用ASCII编码。.
- **\num**: 匹配num，其中num是一个正整数。对所获取的匹配的引用。例如，“(.)\1”匹配两个连续的相同字符。
- **\n**: 标识一个八进制转义值或一个向后引用。如果\n之前至少n个获取的子表达式，则n为向后引用。否则，如果n为八进制数字（0-7），则n为一个八进制转义值。
- **\nm**: 标识一个八进制转义值或一个向后引用。如果\nm之前至少有nm个获得子表达式，则nm为向后引用。如果\nm之前至少有n个获取，则n为一个后跟文字m的向后引用。如果前面的条件都不满足，若n和m均为八进制数字（0-7），则\nm将匹配八进制转义值nm。
- **\nml**: 如果n为八进制数字（0-3），且m和l均为八进制数字（0-7），则匹配八进制转义值nml。
- **\un**: 匹配n，其中n是一个用四个十六进制数字表示的Unicode字符。例如，\u00A9匹配版权符号（©）。

## 常用正则表达式

- **用户名**: /^[a-z0-9_-]{3,16}$/
- **密码**： /^[a-z0-9_-]{6,18}$/
- **十六进制值**： /^#?([a-f0-9]{6}|[a-f0-9]{3})$/
- **电子邮箱**：

    /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/

    /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/

- **URL**： /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
- **IP 地址**：

    /((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/

    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

- **HTML标签**： /^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/
- **Unicode编码中的汉字范围**： /^[\u2E80-\u9FFF]+$/
