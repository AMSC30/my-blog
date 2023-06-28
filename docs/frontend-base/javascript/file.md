# File

```js
File 对象
File 对象代表一个文件，用来读写文件信息。它继承了 Blob 对象，或者说是一种特殊的 Blob 对象，所有可以使用 Blob 对象的场合都可以使用它。
最常见的使用场合是表单的文件上传控件（<input type="file">），用户选中文件以后，浏览器就会生成一个数组，里面是每一个用户选中的文件，它们都是 File 实例对象。
// HTML 代码如下
// <input id="fileItem" type="file">
var file = document.getElementById('fileItem').files[0];
file instanceof File // true

构造函数
浏览器原生提供一个File()构造函数，用来生成 File 实例对象。
new File(array, name [, options])

File()构造函数接受三个参数。

- array：一个数组，成员可以是二进制对象或字符串，表示文件的内容。
- name：字符串，表示文件名或文件路径。
- options：配置对象，设置实例的属性。该参数可选。
第三个参数配置对象，可以设置两个属性。
- type：字符串，表示实例对象的 MIME 类型，默认值为空字符串。
- lastModified：时间戳，表示上次修改的时间，默认为Date.now()。
下面是一个例子。
var file = new File(
  ['foo'],
  'foo.txt',
  {
    type: 'text/plain',
  }
);

实例属性和实例方法
File 对象有以下实例属性。

- File.lastModified：最后修改时间
- File.name：文件名或文件路径
- File.size：文件大小（单位字节）
- File.type：文件的 MIME 类型
var myFile = new File([], 'file.bin', {
  lastModified: new Date(2018, 1, 1),
});
myFile.lastModified // 1517414400000
myFile.name // "file.bin"
myFile.size // 0
myFile.type // ""

File 对象没有自己的实例方法，由于继承了 Blob 对象，因此可以使用 Blob 的实例方法slice()。
FileList 对象
FileList对象是一个类似数组的对象，代表一组选中的文件，每个成员都是一个 File 实例。它主要出现在两个场合。

- 文件控件节点（<input type="file">）的files属性，返回一个 FileList 实例。
- 拖拉一组文件时，目标区的DataTransfer.files属性，返回一个 FileList 实例。
// HTML 代码如下
// <input id="fileItem" type="file">
var files = document.getElementById('fileItem').files;
files instanceof FileList // true

FileList 的实例属性主要是length，表示包含多少个文件。
FileList 的实例方法主要是item()，用来返回指定位置的实例。它接受一个整数作为参数，表示位置的序号（从零开始）。但是，由于 FileList 的实例是一个类似数组的对象，可以直接用方括号运算符，即myFileList[0]等同于myFileList.item(0)，所以一般用不到item()方法。
Blob 对象
简介
Blob 对象表示一个二进制文件的数据内容，比如一个图片文件的内容就可以通过 Blob 对象读写。它通常用来读写文件，它的名字是 Binary Large Object （二进制大型对象）的缩写。它与 ArrayBuffer 的区别在于，它用于操作二进制文件，而 ArrayBuffer 用于操作内存。
浏览器原生提供Blob()构造函数，用来生成实例对象。
new Blob(array [, options])

Blob构造函数接受两个参数。第一个参数是数组，成员是字符串或二进制对象，表示新生成的Blob实例对象的内容；第二个参数是可选的，是一个配置对象，目前只有一个属性type，它的值是一个字符串，表示数据的 MIME 类型，默认是空字符串。
var htmlFragment = ['<a id="a"><b id="b">hey!</b></a>'];
var myBlob = new Blob(htmlFragment, {type : 'text/html'});

实例属性和实例方法
Blob具有两个实例属性size和type，分别返回数据的大小和类型。
var htmlFragment = ['<a id="a"><b id="b">hey!</b></a>'];
var myBlob = new Blob(htmlFragment, {type : 'text/html'});

myBlob.size // 32
myBlob.type // "text/html"

Blob具有一个实例方法slice，用来拷贝原来的数据，返回的也是一个Blob实例。
myBlob.slice(start, end, contentType)

slice方法有三个参数，都是可选的。它们依次是起始的字节位置（默认为0）、结束的字节位置（默认为size属性的值，该位置本身将不包含在拷贝的数据之中）、新实例的数据类型（默认为空字符串）。
获取文件信息
文件选择器<input type="file">用来让用户选取文件。出于安全考虑，浏览器不允许脚本自行设置这个控件的value属性，即文件必须是用户手动选取的，不能是脚本指定的。一旦用户选好了文件，脚本就可以读取这个文件。
文件选择器返回一个 FileList 对象，该对象是一个类似数组的成员，每个成员都是一个 File 实例对象。File 实例对象是一个特殊的 Blob 实例，增加了name和lastModifiedDate属性。
// HTML 代码如下
// <input type="file" accept="image/*" multiple onchange="fileinfo(this.files)"/>

function fileinfo(files) {
  for (var i = 0; i < files.length; i++) {
    var f = files[i];
    console.log(
      f.name, // 文件名，不含路径
      f.size, // 文件大小，Blob 实例属性
      f.type, // 文件类型，Blob 实例属性
      f.lastModifiedDate // 文件的最后修改时间
    );
  }
}

除了文件选择器，拖放 API 的dataTransfer.files返回的也是一个FileList 对象，它的成员因此也是 File 实例对象。
ArrayBuffer 对象
ArrayBuffer 对象表示一段二进制数据，用来模拟内存里面的数据。通过这个对象，JavaScript 可以读写二进制数据。这个对象可以看作内存数据的表达。
浏览器原生提供ArrayBuffer()构造函数，用来生成实例。它接受一个整数作为参数，表示这段二进制数据占用多少个字节。
var buffer = new ArrayBuffer(8);

ArrayBuffer 对象有实例属性byteLength，表示当前实例占用的内存长度（单位字节）。
var buffer = new ArrayBuffer(8);
buffer.byteLength // 8

ArrayBuffer 对象有实例方法slice()，用来复制一部分内存。它接受两个整数参数，分别表示复制的开始位置（从0开始）和结束位置（复制时不包括结束位置），如果省略第二个参数，则表示一直复制到结束。
var buf1 = new ArrayBuffer(8);
var buf2 = buf1.slice(0);

FileReader 对象
FileReader 对象用于读取 File 对象或 Blob 对象所包含的文件内容。
浏览器原生提供一个FileReader构造函数，用来生成 FileReader 实例。
var reader = new FileReader();

实例属性。

- FileReader.error：读取文件时产生的错误对象
- FileReader.readyState：整数，表示读取文件时的当前状态。一共有三种可能的状态，0表示尚未加载任何数据，1表示数据正在加载，2表示加载完成。
- FileReader.result：读取完成后的文件内容，有可能是字符串，也可能是一个 ArrayBuffer 实例。
实例事件
- FileReader.onabort：abort事件（用户终止读取操作）的监听函数。
- FileReader.onerror：error事件（读取错误）的监听函数。
- FileReader.onload：load事件（读取操作完成）的监听函数，通常在这个函数里面使用result属性，拿到文件内容。
- FileReader.onloadstart：loadstart事件（读取操作开始）的监听函数。
- FileReader.onloadend：loadend事件（读取操作结束）的监听函数。
- FileReader.onprogress：progress事件（读取操作进行中）的监听函数。
下面是监听load事件的一个例子。
// HTML 代码如下
// <input type="file" onchange="onChange(event)">

function onChange(event) {
  var file = event.target.files[0];
  var reader = new FileReader();
  reader.onload = function (event) {
    console.log(event.target.result)
  };

  reader.readAsText(file);
}

实例方法。

- FileReader.abort()：终止读取操作，readyState属性将变成2。
- FileReader.readAsArrayBuffer()：以 ArrayBuffer 的格式读取文件，读取完成后result属性将返回一个 ArrayBuffer 实例。
// HTML 代码如下
// <input type="file" onchange="typefile(this.files[0])"></input>
function typefile(file) {
  // 文件开头的四个字节，生成一个 Blob 对象
  var slice = file.slice(0, 4);
  var reader = new FileReader();
  // 读取这四个字节
  reader.readAsArrayBuffer(slice);
  reader.onload = function (e) {
    var buffer = reader.result;
    // 将这四个字节的内容，视作一个32位整数
    var view = new DataView(buffer);
    var magic = view.getUint32(0, false);
    // 根据文件的前四个字节，判断它的类型
    switch(magic) {
      case 0x89504E47: file.verified_type = 'image/png'; break;
      case 0x47494638: file.verified_type = 'image/gif'; break;
      case 0x25504446: file.verified_type = 'application/pdf'; break;
      case 0x504b0304: file.verified_type = 'application/zip'; break;
    }
    console.log(file.name, file.verified_type);
  };
}

- FileReader.readAsBinaryString()：读取完成后，result属性将返回原始的二进制字符串。
- FileReader.readAsDataURL()：读取完成后，result属性将返回一个 Data URL 格式（Base64 编码）的字符串，代表文件内容。对于图片文件，这个字符串可以用于<img>元素的src属性。注意，这个字符串不能直接进行 Base64 解码，必须把前缀data:*/*;base64,从字符串里删除以后，再进行解码。
/*HTML 代码如下
  <input type="file" onchange="previewFile()">
  <img src="" height="200">
*/

function previewFile() {
  var preview = document.querySelector('img');
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();

  reader.addEventListener('load', function () {
    preview.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}

- FileReader.readAsText()：读取完成后，result属性将返回文件内容的文本字符串。该方法的第一个参数是代表文件的 Blob 实例，第二个参数是可选的，表示文本编码，默认为 UTF-8。
// HTML 代码如下
// <input type="file" onchange="readfile(this.files[0])"></input>
// <pre id="output"></pre>
function readfile(f) {
  var reader = new FileReader();
  reader.readAsText(f);
  reader.onload = function () {
    var text = reader.result;
    var out = document.getElementById('output');
    out.innerHTML = '';
    out.appendChild(document.createTextNode(text));
  }
  reader.onerror = function(e) {
    console.log('Error', e);
  };
}

FormData 对象
概述
表单数据以键值对的形式向服务器发送，这个过程是浏览器自动完成的。但是有时候，我们希望通过脚本完成这个过程，构造或编辑表单的键值对，然后通过脚本发送给服务器。浏览器原生提供了 FormData 对象来完成这项工作。
FormData()首先是一个构造函数，用来生成表单的实例。
var formdata = new FormData(form);

FormData()构造函数的参数是一个 DOM 的表单元素，构造函数会自动处理表单的键值对。这个参数是可选的，如果省略该参数，就表示一个空的表单。
下面是一个表单。
<form id="myForm" name="myForm">
  <div>
    <label for="username">用户名：</label>
    <input type="text" id="username" name="username">
  </div>
  <div>
    <label for="useracc">账号：</label>
    <input type="text" id="useracc" name="useracc">
  </div>
  <div>
    <label for="userfile">上传文件：</label>
    <input type="file" id="userfile" name="userfile">
  </div>
<input type="submit" value="Submit!">
</form>

我们用FormData()处理上面这个表单。
var myForm = document.getElementById('myForm');
var formData = new FormData(myForm);

// 获取某个控件的值
formData.get('username') // ""

// 设置某个控件的值
formData.set('username', '张三');

formData.get('username') // "张三"

实例方法
FormData 提供以下实例方法。

- FormData.get(key)：获取指定键名对应的键值，参数为键名。如果有多个同名的键值对，则返回第一个键值对的键值。
- FormData.getAll(key)：返回一个数组，表示指定键名对应的所有键值。如果有多个同名的键值对，数组会包含所有的键值。
- FormData.set(key, value)：设置指定键名的键值，参数为键名。如果键名不存在，会添加这个键值对，否则会更新指定键名的键值。如果第二个参数是文件，还可以使用第三个参数，表示文件名。
- FormData.delete(key)：删除一个键值对，参数为键名。
- FormData.append(key, value)：添加一个键值对。如果键名重复，则会生成两个相同键名的键值对。如果第二个参数是文件，还可以使用第三个参数，表示文件名。
- FormData.has(key)：返回一个布尔值，表示是否具有该键名的键值对。
- FormData.keys()：返回一个遍历器对象，用于for...of循环遍历所有的键名。
- FormData.values()：返回一个遍历器对象，用于for...of循环遍历所有的键值。
- FormData.entries()：返回一个遍历器对象，用于for...of循环遍历所有的键值对。如果直接用for...of循环遍历 FormData 实例，默认就会调用这个方法。
下面是get()、getAll()、set()、append()方法的例子。
var formData = new FormData();

formData.set('username', '张三');
formData.append('username', '李四');
formData.get('username') // "张三"
formData.getAll('username') // ["张三", "李四"]

formData.append('userpic[]', myFileInput.files[0], 'user1.jpg');
formData.append('userpic[]', myFileInput.files[1], 'user2.jpg');

下面是遍历器的例子。
var formData = new FormData();
formData.append('key1', 'value1');
formData.append('key2', 'value2');

for (var key of formData.keys()) {
  console.log(key);
}
// "key1"
// "key2"

for (var value of formData.values()) {
  console.log(value);
}
// "value1"
// "value2"

for (var pair of formData.entries()) {
  console.log(pair[0] + ': ' + pair[1]);
}
// key1: value1
// key2: value2

// 等同于遍历 formData.entries()
for (var pair of formData) {
  console.log(pair[0] + ': ' + pair[1]);
}
// key1: value1
// key2: value2

文件上传
通过表单上传
通过文件输入框选择本地文件，提交表单的时候，浏览器就会把这个文件发送到服务器。
将表单<form>元素的method属性设为POST，enctype属性设为multipart/form-data，enctype属性决定了 HTTP 头信息的Content-Type字段的值，默认情况下这个字段的值是application/x-www-form-urlencoded，但是文件上传的时候要改成multipart/form-data
<form method="post" enctype="multipart/form-data">
  <div>
    <label for="file">选择一个文件</label>
    <input type="file" id="file" name="myFile" multiple>
  </div>
  <div>
    <input type="submit" id="submit" name="submit_button" value="上传" />
  </div>
</form>

multiple属性，指定可以一次选择多个文件；如果没有这个属性，则一次只能选择一个文件

通过AJAX上传
首先通过input元素获取到文件对象
<input type="file" id="file" name="myFile" multiple>

然后组装formdata参数
var formData = new FormData();

for (var i = 0; i < files.length; i++) {
  var file = files[i];

  // 只上传图片文件
  if (!file.type.match('image.*')) {
    continue;
  }

  formData.append('photos[]', file, file.name);
}

最后，使用 Ajax 向服务器上传文件。
var xhr = new XMLHttpRequest();

xhr.open('POST', 'handler.php', true);

xhr.onload = function () {
  if (xhr.status !== 200) {
    console.log('An error occurred!');
  }
};

xhr.send(formData);

除了发送 FormData 实例，也可以直接 AJAX 发送文件。
var file = document.getElementById('test-input').files[0];
var xhr = new XMLHttpRequest();

xhr.open('POST', 'myserver/uploads');
xhr.setRequestHeader('Content-Type', file.type);
xhr.send(file);

文件下载
下载方式
使用window.open和location.href
window.open('downloadFile.zip');
location.href = 'downloadFile.zip';

使用这两种方式与使用a标签方式差不多，简单直接，缺点也很多：

1. 需要注意url长度和编码的问题
2. 对于浏览器可预览的链接，如图片、文本，可能无法直接下载
3. 无法感知到下载进度
4. 无法添加header进行鉴权
使用a标签的download属性
使用download属性可以下载图片、文件，并指定文件的文件名
 const a = document.createElement('a')
 a.href = url
 a.download = 'file'
 a.click()

使用该属性可以对图片进行下载，而不是进行预览，同样有以下缺点

1. 对于跨源的资源，只能预览，无法下载
2. 无法添加header进行鉴权
3. 有浏览器兼容性问题
判断浏览器是否支持download属性方式下载
const isSupport = 'download' in document.createElement('a');

url生成
后端提供地址
可以使用后端提供的资源地址或者下载地址
Blob对象或者File对象生成object url
const xhr = new XMLHttpRequest()
xhr.open('get', path)
xhr.responseType = 'blob'
xhr.send()
xhr.onload = function () {
    if (this.status === 200 || this.status === 304) {
        // 如果是IE10及以上，不支持download属性，采用msSaveOrOpenBlob方法，但是IE10以下也不支持msSaveOrOpenBlob
        if ('msSaveOrOpenBlob' in navigator) {
            navigator.msSaveOrOpenBlob(this.response, name)
            return
        }
        // const blob = new Blob([this.response], { type: xhr.getResponseHeader('Content-Type') });
        // const url = URL.createObjectURL(blob);
        const url = URL.createObjectURL(this.response)
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        a.download = name
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }
}

使用ajax可以向后端传递header进行鉴权，但是也存在兼容性问题，在Safari浏览器下载时可能存在问题
Blob对象或者File对象生成Data url
使用base64的方式与接口调用方式差不多，只是生成url的方式不同，这个生成的是data url
各对象之间转换
无法复制加载中的内容
```
