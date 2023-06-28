# Less

## Less语法

### 变量

在样式表中，相同的值重复多次的情况很常见，当需要变化时，就需要一一调整，使用less变量，使代码更易于维护

在less中，变量的定义使用`@+变量名`的形式

```less
@link-color: #428bca; // sea blue
@link-color-hover: darken(@link-color, 10%);

// Usage
a,
.link {
  color: @link-color;
}
```

**变量使用**

变量不仅可以用在css属性值中，也可以用于其他地方

**1. 选择器**

```less
@my-selector: banner;

// Usage
.@{my-selector} {
  font-weight: bold;
  line-height: 40px;
  margin: 0 auto;
}
```

**2. 路径**

```less
@images: "../img";

body {
  color: #444;
  background: url("@{images}/white-sand.png");
}
```

**3. 导入语句**

```less
@themes: "../../src/themes";

@import "@{themes}/tidal-wave.less";
```

**4. css属性名**

```less
@property: color;

.widget {
  @{property}: #0ee;
  background-@{property}: #999;
}
```

**5. 变量嵌套变量**

```less
@primary:  green;
@secondary: blue;

.section {
  @color: primary;

  .element {
    color: @@color;
  }
}
```

**属性作为变量**

`$prop`语法可以将属性作为变量，less将从当前/父级范围内使用最后一个匹配的属性值作为变量值

```less
.block {
  color: red;
  .inner {
    background-color: $color;// blue
  }
  color: blue;
}
```

### 混入

使用混入可以通过类选择器和id选择器将一组规则应用到另一个规则集中

```less
.a, #b {
  color: red;
}
.mixin-class {
  .a();
}
.mixin-id {
  #b();
}
```

**阻止css输出**

如果不想讲混入的定义输出到css中，可以使用带括号的混入定义

```less
.my-mixin {
  color: black;// 输出到css中
}
.my-other-mixin() {
  background: white;// 不输出到css
}
.class {
  .my-mixin();
  .my-other-mixin();
}
```

**使用选择器**

```less
.my-hover-mixin() {
  &:hover {
    border: 1px solid red;
  }
}
button {
  .my-hover-mixin();
}
```

输出：

```css
button:hover {
  border: 1px solid red;
}
```

**!important关键字**

在混入调用后使用!important关键字会将其继承的所有属性都标记为`!important`

```less
@bg: #f5f5f5;
@color: #900

.foo() {
  background: @bg;
  color: @color;
}
.unimportant {
  .foo();
}

.important {
  .foo() !important;
}
```

产出:

```css
.unimportant {
  background: #f5f5f5;
  color: #900;
}
.important {
  background: #f5f5f5 !important;
  color: #900 !important;
}
```

**使用参数**

定义混合时，可以对混合内的内容使用参数形式，并允许提供默认参数，如果有多个参数，参数与参数之间使用分号进行分隔，使用混合时使用逗号分隔

```less
.border-radius(@radius: 5px) {
  -webkit-border-radius: @radius;
     -moz-border-radius: @radius;
          border-radius: @radius;
}
#header {
  .border-radius();
}
```

在同一作用域中，相同名称的混合可以以不同参数个数的形式存在，这是允许的，类似于函数的重载

```less
.mixin(@color) {
  color-1: @color;
}
.mixin(@color, @padding: 2) {
  color-2: @color;
  padding-2: @padding;
}
.mixin(@color, @padding, @margin: 2) {
  color-3: @color;
  padding-3: @padding;
  margin: @margin @margin @margin @margin;
}
```

一个mixin引用可以通过参数的名称而不是仅仅通过位置来提供参数值。任何参数都可以通过其名称引用，并且它们不必以任何特殊顺序

```less
.mixin(@color: black; @margin: 10px; @padding: 20px) {
  color: @color;
  margin: @margin;
  padding: @padding;
}
.class1 {
  .mixin(@margin: 20px; @color: #33acfe);
}
.class2 {
  .mixin(#efca44; @padding: 40px);
}
```

@arguments在mixin中有特殊的含义，它包含了mixin被调用时传递的所有参数

```less
.box-shadow(@x: 0, @y: 0, @blur: 1px, @color: #000) {
  -webkit-box-shadow: @arguments;
     -moz-box-shadow: @arguments;
          box-shadow: @arguments;
}
.big-block {
  .box-shadow(2px, 5px);
}
```

### 嵌套

嵌套的写法为css书写提供了更简洁的方式

**普通嵌套**

```less
#header {
  color: black;
  .navigation {
    font-size: 12px;
  }
  .logo {
    width: 300px;
  }
}
```

**嵌套中使用父选择器**

```less
.clearfix {
  display: block;
  zoom: 1;

  &:after {
    content: " ";
    display: block;
    font-size: 0;
    height: 0;
    clear: both;
    visibility: hidden;
  }
}
```

**@规则嵌套和冒泡**

```less
.component {
  width: 300px;
  @media (min-width: 768px) {
    width: 600px;
    @media  (min-resolution: 192dpi) {
      background-image: url(/img/retina2x.png);
    }
  }
  @media (min-width: 1280px) {
    width: 800px;
  }
}
```

产出：

```css
.component {
  width: 300px;
}
@media (min-width: 768px) {
  .component {
    width: 600px;
  }
}
@media (min-width: 768px) and (min-resolution: 192dpi) {
  .component {
    background-image: url(/img/retina2x.png);
  }
}
@media (min-width: 1280px) {
  .component {
    width: 800px;
  }
}
```

### 运算

算术运算符 +、-、*、/ 可以对任何数字、颜色或变量进行运算。如果可能的话，算术运算符在加、减或比较之前会进行单位换算。计算的结果以最左侧操作数的单位类型为准。如果单位换算无效或失去意义，则忽略单位。无效的单位换算例如：px 到 cm 或 rad 到 % 的转换，乘法和除法不作转换

```less
// 所有操作数被转换成相同的单位
@conversion-1: 5cm + 10mm; // 结果是 6cm
@conversion-2: 2 - 3cm - 5mm; // 结果是 -1.5cm

// conversion is impossible
@incompatible-units: 2 + 5px - 3cm; // 结果是 4px

// example with variables
@base: 5%;
@filler: @base * 2; // 结果是 10%
@other: @base + @filler; // 结果是 15%
```

### 转义

转义（Escaping）允许你使用任意字符串作为属性或变量值。任何 ~"anything" 或 ~'anything' 形式的内容都将按原样输出

```less
@min768: ~"(min-width: 768px)";
.element {
  @media @min768 {
    font-size: 1.2rem;
  }
}
```

从 Less 3.5 开始，可以简写

```less
@min768: (min-width: 768px);
.element {
  @media @min768 {
    font-size: 1.2rem;
  }
}
```

### 函数

### 映射

从 Less 3.5 版本开始，可以将混合（mixins）和规则集作为一组值的映射（map）使用

```less
#colors() {
  primary: blue;
  secondary: green;
}

.button {
  color: #colors[primary];
  border: 1px solid #colors[secondary];
}
```

### 作用域

Less中的作用域与CSS中的作用域非常类似。首先在本地查找变量和混合（mixins），如果找不到，则从“父”级作用域继承

变量的使用不需要在使用前定义

```less
@var: red;

#page {
  #header {
    color: @var; // white
  }
  @var: white;
}
```

### 导入

**文件扩展名**

根据文件扩展名的不同个，less将会进行不同的处理

- 如果文件有css后缀，则视为css，@import语句保持原样
- 如果是其他扩展，视为less导入
- 如果没有扩展，视为less导入

**导入选项**

导入选项允许使用不同的关键字对导入内容做不同的处理，格式为@import (key) "foo.less"

- reference：使用Less文件但不输出
- inline：在输出中包含源文件，但不处理它
- less：将文件视为Less文件，无论文件扩展名是什么
- css：将文件视为CSS文件，无论文件扩展名如何
- once：只包含一次文件（这是默认行为）
- multiple：多次包含文件
- optional：未找到文件时继续编译

## Less.js使用

less.js用于将less文件转译为css文件

### 命令行安装与使用

**安装**

```bash
npm install less -g # 全局
npm install less -S # 局部
```

**使用**

```bash
lessc [option option=parameter ...] <source> [destination]
```

如果 source 设置为 `-' （破折号或连字符减号），则从 stdin 读取输入

### 浏览器安装与使用

**安装**

```html
<script src="less.js" type="text/javascript"></script>
```

**使用**

可以通过编程方式设置选项，方法是在脚本标记之前的less对象上设置它们-这会影响所有初始链接标记和less的编程使用

```html
<script>
  less = {
    env: "development",
    async: false,
    fileAsync: false,
    poll: 1000,
    functions: {},
    dumpLineNumbers: "comments",
    relativeUrls: false,
    rootpath: ":/a.com/"
  };
</script>
<script src="less.js"></script>
```

另一种方法是在脚本标签上指定选项，例如：

```html
<script>
  less = {
    env: "development"
  };
</script>
<script src="less.js" data-env="development"></script>
```

**监视模式**

要启用“监视”模式，选项env必须设置为development。然后在包含less.js文件之后，调用less.watch()

```html
<script>less = { env: 'development'};</script>
<script src="less.js"></script>
<script>less.watch();</script>
```

**修改变量**

启用Less变量的运行时修改。当使用新值调用时，Less文件将重新编译，而无需重新加载。

```js
less.modifyVars({
  '@buttonFace': '#5B83AD',
  '@buttonText': '#D9EEF2'
});
```
