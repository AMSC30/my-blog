# Maven

Maven是Apache基金会的一个开源项目，用于管理和构建java项目

## Maven的作用

1. 依赖管理：方便快捷管理项目中的依赖资源(jar包)，避免版本冲突问题
2. 统一项目结构：提供标准、统一的目录结构
3. 构建项目：提供跨平台的自动化构建

## Maven常见生命周期

### 属性Properties

针对以下依赖

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-core</artifactId>
        <version>5.2.1.RELEASE</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-beans</artifactId>
        <version>5.2.1.RELEASE</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-aop</artifactId>
        <version>5.2.1.RELEASE</version>
    </dependency>
</dependencies>
```

groupId和version都是一样的，可以将同样的代码，提取成变量，做到重用，方便维护。

```xml
<properties>
    <spring.group>org.springframework</spring.group>
    <spring.version>5.2.1.RELEASE</spring.version>
</properties>
<dependencies>
    <dependency>
        <groupId>${spring.group}</groupId>
        <artifactId>spring-core</artifactId>
        <version>${spring.version}</version>
    </dependency>
    <dependency>
        <groupId>${spring.group}</groupId>
        <artifactId>spring-beans</artifactId>
        <version>${spring.version}</version>
    </dependency>
    <dependency>
        <groupId>${spring.group}</groupId>
        <artifactId>spring-aop</artifactId>
        <version>${spring.version}</version>
    </dependency>
</dependencies>
```

properties位于pom.xml中的，是project元素的子元素，用户可以在properties中自定义一些用户属性，然后可以在其他地方使用${属性名称}这种方式进行引用

### 生命周期详解

maven将项目的生命周期抽象成了3套生命周期，每套生命周期又包含多个阶段，每套中具体包含哪些阶段是maven已经约定好的，但是每个阶段具体需要做什么，是用户可以自己指定的。maven中定义的3套生命周期：

1. clean生命周期
2. default生命周期
3. site生命周期

生命周期是相互独立的，没有依赖关系的，而每套生命周期中有多个阶段，每套中的多个阶段是有先后顺序的，并且后面的阶段依赖于前面的阶段，而用户可以直接使用mvn命令来调用这些阶段去完成项目生命周期中具体的操作

#### clean生命周期

clean生命周期的目的是清理项目，它包含三个阶段：

| 生命周期阶段 | 描述 |
| ------------ | ------------ |
| pre-clean | 执行一些需要在clean之前完成的工作 |
| clean | 移除所有上一次构建生成的文件 |
| post-clean | 执行一些需要在clean之后立刻完成的工作 |

用户可以通过mvn pre-clean来调用clean生命周期中的pre-clean阶段需要执行的操作。

调用mvn post-clean会执行上面3个阶段所有的操作，每个生命周期中的后面的阶段会依赖于前面的阶段，当执行某个阶段的时候，会先执行其前面的阶段

#### default生命周期

maven主要的生命周期，主要被用于构建应用，包含了23个阶段，主要包含以下阶段

| 生命周期阶段 | 描述 |
| ------------ | ------------ |
| validate | 校验：校验项目是否正确并且所有必要的信息可以完成项目的构建过程 |
| initialize | 初始化：初始化构建状态，比如设置属性值 |
| compile | 处理类文件：编译项目的源代码 |
| test-compile| 编译测试源码：编译测试源代码到测试目标目录 |
| test | 测试：使用合适的单元测试框架运行测试（Juint是其中之一）|
| package | 打包：将编译后的代码打包成可分发格式的文件，比如JAR、WAR或者EAR文件|
| verify | 验证：运行任意的检查来验证项目包有效且达到质量标准 |
| install | 安装：安装项目包到本地仓库，这样项目包可以用作其他本地项目的依赖 |
| deploy | 部署：将最终的项目包复制到远程仓库中与其他开发者和项目共享 |

#### site生命周期

site生命周期的目的是建立和发布项目站点，Maven能够基于pom.xml所包含的信息，自动生成一个友好的站点，方便团队交流和发布项目信息。主要包含以下4个阶段：

| 生命周期阶段 |  描述 |
| ------------ | ------------ |
| pre-site | 执行一些需要在生成站点文档之前完成的工作 |
| site | 生成项目的站点文档 |
| post-site | 执行一些需要在生成站点文档之后完成的工作，并且为部署做准备 |
| site-deploy | 将生成的站点文档部署到特定的服务器上 |

## Maven插件

maven插件主要是为maven中生命周期中的阶段服务的，maven中只是定义了3套生命周期，以及每套生命周期中有哪些阶段，具体每个阶段中执行什么操作，完全是交给插件去干的。

maven中的插件就相当于一些工具，比如编译代码的工具，运行测试用例的工具，打包代码的工具，将代码上传到本地仓库的工具，将代码部署到远程仓库的工具等等，这些都是maven中的插件。

插件可以通过mvn命令的方式调用直接运行，或者将插件和maven生命周期的阶段进行绑定，然后通过mvn 阶段的方式执行阶段的时候，会自动执行和这些阶段绑定的插件。

maven中的插件以jar的方式存在于仓库中，和其他构件是一样的，也是通过坐标进行访问，每个插件中可能为了代码可以重用，一个插件可能包含了多个功能，比如编译代码的插件，可以编译源代码、也可以编译测试代码；插件中的每个功能就叫做`插件目标(Plugin Goal)`，每个插件中可能包含一个或者多个插件目标（Plugin Goal

### 目标参数

插件目标是用来执行任务的，那么执行任务肯定是有参数配的，这些就是目标的参数，每个插件目标对应于java中的一个类，参数就对应于这个类中的属性

列出插件所有目标

```bash
mvn groupId:artifactId[:version]:help
```

以maven-clean-plugin插件为例

```bash
D:\code\IdeaProjects\maven-chat06>mvn org.apache.maven.plugins:maven-clean-plugin:help
[INFO] Scanning for projects...
[INFO]
[INFO] -------------------< com.javacode2018:maven-chat06 >--------------------
[INFO] Building maven-chat06 1.0-SNAPSHOT
[INFO] --------------------------------[ jar ]---------------------------------
[INFO]
[INFO] --- maven-clean-plugin:2.5:help (default-cli) @ maven-chat06 ---
[INFO] org.apache.maven.plugins:maven-clean-plugin:2.5
Maven Clean Plugin
  The Maven Clean Plugin is a plugin that removes files generated at build-time
  in a project's directory.

This plugin has 2 goals:

clean:clean
  Goal which cleans the build.
  This attempts to clean a project's working directory of the files that were
  generated at build-time. By default, it discovers and deletes the directories
  configured in project.build.directory, project.build.outputDirectory,
  project.build.testOutputDirectory, and project.reporting.outputDirectory.
  Files outside the default may also be included in the deletion by configuring
  the filesets tag.

clean:help
  Display help information on maven-clean-plugin.
  Call
    mvn clean:help -Ddetail=true -Dgoal=<goal-name>
  to display parameter details.
```

这个插件所有的目标有2个，分别是clean:clean、clean:help，分号后面的部分是目标名称，分号前面的部分是插件的前缀，每个目标的后面包含对这个目标的详细解释说明

查看插件目标参数列表

```bash
mvn 插件goupId:插件artifactId[:插件version]:help -Dgoal=目标名称 -Ddetail
```

```bash
D:\code\IdeaProjects\maven-chat06>mvn org.apache.maven.plugins:maven-clean-plugin:help -Dgoal=help -Ddetail
[INFO] Scanning for projects...
[INFO]
[INFO] -------------------< com.javacode2018:maven-chat06 >--------------------
[INFO] Building maven-chat06 1.0-SNAPSHOT
[INFO] --------------------------------[ jar ]---------------------------------
[INFO]
[INFO] --- maven-clean-plugin:2.5:help (default-cli) @ maven-chat06 ---
[INFO] org.apache.maven.plugins:maven-clean-plugin:2.5
Maven Clean Plugin
  The Maven Clean Plugin is a plugin that removes files generated at build-time
  in a project's directory.

clean:help
  Display help information on maven-clean-plugin.

  Call
    mvn clean:help -Ddetail=true -Dgoal=<goal-name>
  to display parameter details.

  Available parameters:

    detail (Default: false)
      If true, display all settable properties for each goal.
      Expression: ${detail}

    goal
      The name of the goal for which to show help. If unspecified, all goals
      will be displayed.
      Expression: ${goal}

    indentSize (Default: 2)
      The number of spaces per indentation level, should be positive.
      Expression: ${indentSize}

    lineLength (Default: 80)
      The maximum length of a display line, should be positive.
      Expression: ${lineLength}
```

Expression: ${xxx}这样的部分，这种表示给这个运行的目标传参，可以通过mvn -Dxxx这种方式传参，xxx为${xxx}中的xxx部分，这个xxx有时候和目标参数的名称不一致

命令行运行插件

```bash
mvn groupId:artifactId[:version]:目标 [-D目标参数1] [-D目标参数2] [-D目标参数n]
```

### 聚合

假如使用java做一个电商网站，涉及到：pc端网站、h5微站、移动端接口部分，如果三个项目都作为单独的项目，那么每次全量发布的时候，都需要对几个项目进行单独打包，这个过程是相当繁琐的

我们使用maven聚合创建一个额外的maven项目来管理上面3个项目，然后只用在聚合项目中执行mvn命令，就会自动为其他3个项目自动执行同样的mvn命令

在聚合项目的pom.xml文件中添加如下内容：

```xml
<modules>
    <module>模块1</module>
    <module>模块2</module>
    <module>模块n</module>
</modules>
<package>pom</package>
```

module是被聚合的模块pom.xml所在目录的相对路径

package是聚合项目的打包方式，必须为pom

### 继承

在子项目中，有时候很多配置是与父项目相同的，比如groupId、version、dependence等，这时就可以使用继承。

继承需要在子项目的pom.xml中添加如下内容：

```xml
<parent>
    <groupId>父构件groupId</groupId>
    <artifactId>父构件artifactId</artifactId>
    <version>父构件的版本号</version>
    <relativePath>父构件pom.xml路径</relativePath>
</parent>
```

relativePath表示父构件pom.xml相对路径，默认是../pom.xml

可以继承的信息如下：

- groupId：项目组ID，项目坐标的核心元素
- version：项目版本，项目坐标的核心元素
- description：项目的描述信息
- organization：项目的组织信息
- inceptionYear：项目的创始年份
- url：项目的url地址
- developers：项目的开发者信息
- contributors：项目的贡献者信息
- distributionManagement：项目的部署配置信息
- issueManagement：项目的缺陷跟踪系统信息
- ciManagement：项目的持续集成系统信息
- scm：项目的版本控制系统信息
- mailingLists：项目的邮件列表信息
- properties：自定义的maven属性配置信息
- dependencyManagement：项目的依赖管理配置
- repositories：项目的仓库配置
- build：包括项目的源码目录配置、输出目录配置、插件管理配置等信息
- reporting：包括项目的报告输出目录配置、报告插件配置等信息

## 项目依赖

项目中的依赖通过pom.xml文件进行管理，在pom.xml文件中通过\<dependencies\>标签添加依赖，\<dependency\>标签包含以下属性：

- groupId：依赖的组ID
- artifactId：依赖的 artifact ID
- version：依赖的版本

### 依赖传递

在项目中添加依赖后，Maven会自动将依赖的依赖项添加到项目中。例如，如果项目依赖了A，那么Maven会自动将A的依赖项添加到项目中。如果A依赖了B，那么Maven会自动将B的依赖项添加到项目中。在项目中也可以使用B依赖

当多个依赖有相同的依赖时，Maven的依赖使用优先方式为：

1. 项目自身依赖：项目自身依赖的优先级最高
2. 路径优先：使用路径较近的依赖，层级越深，优先级越低
3. 声明优先：当依赖的层级相同，配置靠前的依赖优先级更高
4. 特殊优先：当同层级配置了相同依赖的不同版本，配置靠后的优先级更高

### 依赖继承

#### 继承配置

如果新增一个子构件，都会默认从父构件中继承依赖的一批构建，父pom.xml中配置的这些依赖的构建可能是其他项目不需要的，可能某个子项目只是想使用其中一个构件，但是上面的继承关系却把所有的依赖都给传递到子构件中了，这种显然是不合适的

maven提供的dependencyManagement元素既能让子模块继承到父模块的依赖配置，又能保证子模块依赖使用的灵活性，在dependencyManagement元素下声明的依赖不会引入实际的依赖，他只是声明了这些依赖，不过它可以对dependencies中使用的依赖起到一些约束作用。

```xml
 <dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-web</artifactId>
            <version>5.2.1.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis-spring</artifactId>
            <version>2.0.3</version>
        </dependency>
    </dependencies>
</dependencyManagement>
```

子模块如果想用到这些配置，可以dependencies进行引用，引用之后，依赖的构建才会被真正的引入。

使用dependencyManagement来解决继承的问题，子pom.xml中只用写groupId,artifactId就可以了，其他信息都会从父dependencyManagement中声明的依赖关系中传递过来，通常我们使用这种方式将所有依赖的构建在父pom.xml中定义好，子构件中只需要通过groupId,artifactId就可以引入依赖的构建，而不需要写version，可以很好的确保多个子项目中依赖构件的版本的一致性，对应依赖构件版本的升级也非常方便，只需要在父pom.xml中修改一下就可以了

#### 单继承的问题

只有使用继承的时候，dependencyManagement中声明的依赖才可能被子pom.xml用到，如果我的项目本来就有父pom.xml了，但是我现在想使用另外一个项目dependencyManagement中声明的依赖，而又不想继承这个项目的时候，在我们的项目中使用加入type和scope来声明依赖

```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>com.javacode2018</groupId>
            <artifactId>javacode2018-parent</artifactId>
            <version>1.0-SNAPSHOT</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
        <dependency>构件2</dependency>
        <dependency>构件3</dependency>
        <dependency>构件n</dependency>
    </dependencies>
</dependencyManagement>
```

这个配置会将javacode2018-parent构件中dependencyManagement元素中声明的所有依赖导入到当前pom.xml的dependencyManagement中,相当于会将parent的dependencies拷贝到当前pom.xml中

### 依赖可见性

默认情况下，Maven的依赖是可见的，即其他项目也可以访问到该依赖。但是，也可以将依赖设置为不可见，主要有两种方式：

1. 主动排除：在依赖项中添加\<exclusions\>标签，并指定要排除的依赖项
2. 依赖可选：在依赖项中添加\<optional\>标签，并设置为true，表示该依赖项是可选的，其他项目无法访问该依赖项

### 依赖范围

通过scope标签，可以指定依赖的作用范围，默认为compile，在任何地方都可用

1. compile：默认范围，在编译、测试、运行时都可以使用
2. provided：在编译代码和测试代码中使用，不参与到打包
3. runtime：在打包时使用，不可在主代码中使用
4. test：在编译代码中使用

## 按需构建

有这样的一种场景：b2b-account-api被b2b-account-service和b2b-order-service依赖了，所以当b2b-account-api有修改的时候，我们希望他们3个都能够被重新构建一次，而不是去对所有的模块都进行重新构建，我们只希望被影响的模块都能够参与重新构建

我们需要的是按需构建，需要构建哪些模块让我们自己能够随意指定，这样也可以加快构建的速度

### -pl,--projects \<arg>

构建指定的模块，arg表示多个模块，之间用逗号分开，模块有两种写法

```bash
-pl 模块1相对路径 [,模块2相对路径] [,模块n相对路径]
-pl [模块1的groupId]:模块1的artifactId [,[模块2的groupId]:模块2的artifactId] [,[模块n的groupId]:模块n的artifactId]
```

如果构建b2b-account-api，使用相对路径的方式：

```bash
mvn clean install -pl b2b-account/b2b-account-api
```

使用模块id的方式：

```bash
mvn clean install -pl :b2b-account-api
mvn clean install -pl com.javacode2018:b2b-account-api
```

构建多个模块,构建b2b-account-api和b2b-order-api:

```bash
mvn clean install -pl b2b-account/b2b-account-api,b2b-order/b2b-order-api
mvn clean install -pl com.javacode2018:b2b-account-api,:b2b-order-api
```

### -amd,—also-make-dependents

假设b2b-account-service和b2b-order-service依赖于b2b-account-api，当b2b-account-api改动并需要重新打包时，我们希望对应有依赖于b2b-account-api的模块也重新构建，可以使用-amd参数

```bash
mvn clean install -pl b2b-account/b2b-account-api -amd
```

### -am,—also-make

假设b2b-order-service依赖于b2b-account-api和b2b-order-api，构建b2b-order-service时，希望b2b-order-service依赖的构件也能被同时构建

## Maven属性

### 自定义属性

maven自定义属性，需要先在properties中定义，然后才可以在其他地方使用${属性元素名称}进行引用

### 内置属性

${basedir}：表示项目根目录，即包含pom.xml文件的目录

${version}：表示项目的版本号

### POM属性

用户可以使用该属性引用pom.xml文件中对应元素的值，例如${project.artifactId}就可以取到project->artifactId元素的值，常用的有：

${pom.build.sourceDirectory}：项目的主源码目录，默认为src/main/java/

${project.build.testSourceDirectory}：项目的测试源码目录，默认为src/test/java/

${project.build.directory}：项目构建输出目录，默认为target/

${project.build.outputDirectory}：项目主代码编译输出目录，默认为target/classes

${project.build.testOutputDirectory}：项目测试代码编译输出目录，默认为target/test-classes

${project.groupId}：项目的groupId

${project.artifactId}：项目的artifactId

${project.version}：项目的version，与${version}等价

${project.build.finalName}：项目打包输出文件的名称，默认为${project.artifactId}-${project.version}

### Settings属性

这种属性以settings.开头来引用~/.m2/settings.xml中的内容，如:${settings.localRepository}

### java系统属性

所有java系统属性都可以使用maven属性来进行引用，例如${user.home}指向了当前用户目录。

java系统属性可以通过mvn help:system命令看到

### 环境变量属性

所有的环境变量都可以使用env.开头的方式来进行引用，如：${env.JAVA_HOME}

## 资源文件打包

插件maven-resources-plugin的resources目标，将src/main/resouces目录中的资源文件复制到了target/classess目录，testResources目标，将src/test/resouces目录中的资源文件复制到了target/test-classes目录

### 资源文件编码

可以在pom.xml文件中的properties标签中定义

```xml
<properties>
    <encoding>UTF-8</encoding>
</properties>
```

### 动态替换

资源文件中可以通过${maven属性}来引用maven属性中的值，打包的过程中这些会被替换掉，替换的过程默认是不开启的，需要手动开启配置

```xml
<build>
    <resources>
        <resource>
            <!-- 指定资源文件的目录 -->
            <directory>${project.basedir}/src/main/resources</directory>
            <!-- 是否开启过滤替换配置，默认是不开启的 -->
            <filtering>true</filtering>
        </resource>
    </resources>
    <testResources>
        <testResource>
            <!-- 指定资源文件的目录 -->
            <directory>${project.basedir}/src/test/resources</directory>
            <!-- 是否开启过滤替换配置，默认是不开启的 -->
            <filtering>true</filtering>
        </testResource>
    </testResources>
</build>
```

### 指定资源文件

默认情况下，resource中的配置，directory下所有的资源文件都会被拷贝和替换，通过includes和excludes属性，可以指定需要替换的资源文件

```xml
<resources>
    <resource>
        <!-- 指定资源文件的目录 -->
        <directory>${project.basedir}/src/main/resources</directory>
        <!-- 是否开启过滤替换配置，默认是不开启的 -->
        <filtering>true</filtering>
        <includes>
            <include>**/jdbc.properties</include>
        </includes>
        <excludes>
            <exclude>**/const.properties</exclude>
        </excludes>
    </resource>
</resources>
```

### 配置多个resource

有时候针对不同的配置文件，需要做不同的处理，比如a需要进行拷贝和替换，b只进行拷贝不替换，这个时候可以通过多个resource来配置

```xml
<resources>
    <resource>
        <!-- 指定资源文件的目录 -->
        <directory>${project.basedir}/src/main/resources</directory>
        <!-- 是否开启过滤替换配置，默认是不开启的 -->
        <filtering>true</filtering>
        <includes>
            <include>**/jdbc.properties</include>
        </includes>
    </resource>
    <resource>
        <directory>${project.basedir}/src/main/resources</directory>
        <includes>
            <include>**/const.properties</include>
        </includes>
    </resource>
</resources>
```

## 多环境配置

### 基于property注入

在pom.xml文件中定义多个profile，然后通过-P参数指定使用哪个profile，-P为profile对应的id值，比如：mvn clean install -P dev

```xml
<!-- 配置多套环境 -->
<profiles>
    <!-- 开发环境使用的配置 -->
    <profile>
        <id>dev</id>
        <properties>
            <jdbc.url>dev jdbc url</jdbc.url>
            <jdbc.username>dev jdbc username</jdbc.username>
            <jdbc.password>dev jdbc password</jdbc.password>
        </properties>
    </profile>
    <!-- 测试环境使用的配置 -->
    <profile>
        <id>test</id>
        <properties>
            <jdbc.url>test jdbc url</jdbc.url>
            <jdbc.username>test jdbc username</jdbc.username>
            <jdbc.password>test jdbc password</jdbc.password>
        </properties>
    </profile>
    <!-- 线上环境使用的配置 -->
    <profile>
        <id>prod</id>
        <properties>
            <jdbc.url>prod jdbc url</jdbc.url>
            <jdbc.username>prod jdbc username</jdbc.username>
            <jdbc.password>prod jdbc password</jdbc.password>
        </properties>
    </profile>
</profiles>
```

在resource对应的properties文件中，通过${jdbc.url}来引用jdbc.url属性，这样，当使用不同的profile时，jdbc.url属性的值就会改变

```proterties
jdbc.url=${jdbc.url}
jdbc.username=${jdbc.username}
jdbc.password=${jdbc.password}
```

### 开启默认环境

没有通过-P来指定具体使用哪个环境进行构建，properties中的内容不会被替换，在profile中可以指定一个默认开启的配置

```xml
<profile>
    <id>dev</id>
    <activation>
        <activeByDefault>true</activeByDefault>
    </activation>
    <properties>
        <jdbc.url>dev jdbc url</jdbc.url>
        <jdbc.username>dev jdbc username</jdbc.username>
        <jdbc.password>dev jdbc password</jdbc.password>
    </properties>
</profile>
```

### 基于文件注入

在profile中通过build.filters.filter指定properties来源

```xml
<profile>
    <id>dev</id>
    <activation>
        <activeByDefault>true</activeByDefault>
    </activation>
    <build>
        <filters>
            <filter>../../config/dev.properties</filter>
        </filters>
    </build>
</profile>
```

或者在外层定义build，filter通过profile中定义的值进行替换

```xml
<build>
    <filters>
        <!-- 这里的文件名必须与多环境配置文件的文件名相同, ${env} 会动态获取不同环境 -->
        <!-- 假如激活 dev 环境, 这时对应的文件就是 src/main/properties/application-dev.properties -->
        <filter>src/main/properties/application-${env}.properties</filter>
    </filters>
    <resources>
        <resource>
            <!-- 可以理解为真正的配置文件所在的目录 -->
            <directory>src/main/resources</directory>
            <!-- 是否替换资源中的属性, 设置为 true 才能实现动态替换 -->
            <filtering>true</filtering>
        </resource>
    </resources>
</build>
<profile>
    <id>dev</id>
    <activation>
        <activeByDefault>true</activeByDefault>
    </activation>
    <properties>
        <!-- env 必须与文件的后缀一致(application-${env}.properties) -->
        <!-- 其中 env 这个标签也可以自定义, 没有强制要求必须是 env,但必须与上面 application-${env}.properties 的 ${} 里的值一致 -->
        <env>dev</env>
    </properties>
</profile>
```

执行mvn clean install -P dev，此时，dev.properties配置的value会替换掉resource中配置的properties文件中的value

profile元素可以用于对不同环境的构建进行配置，project中包含的元素，在profile元素中基本上都有，所以profile可以定制更复杂的构建过程，不同的环境依赖的构件、插件、build过程、测试过程都是不一样的，这些都可以在profile中进行指定，也就是说不同的环境所有的东西都可以通过profile元素来进行个性化的设置
