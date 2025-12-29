# Docker

## Docker三要素

### 镜像 Image

镜像是一个只读的模板，可以用来创建容器，一个镜像可以用来创建多个容器，镜像相当于一个文件系统

### 容器 Container

容器是使用镜像创建的一个虚拟的、隔离的运行环境，用于独立运行一个或者一组应用，应用程序或者服务运行在容器里面。

### 仓库 Repository

仓库是存放镜像文件的场所

## Docker架构图

### 基础架构

![docker简易架构](./images//iShot_2025-12-20_22.43.40.png)

docker是一个c/s架构的系统，docker守护进程运行在主机上，客户端可以通过socket连接到主机，通过发送命令到docker主机来管理docker资源

### docker相比虚拟机的优势

1. docker有着比虚拟机更少的抽象层，docker不需要实现硬件资源的虚拟化，docker容器中的程序使用的是实际硬件资源
2. 新建一个docker容器，不需要重新加载一个操作系统内核，而是利用宿主机的内核

## 常用命令

### 帮助启动类命令

#### 启动docker

```bash
systemctl start docker
```

#### 停止docker

```bash
systemctl stop docker
```

#### 重启docker

```bash
systemctl restart docker
```

#### 查看docker状态

```bash
systemctl status docker
```

#### 开机启动docker

```bash
system enable docker
```

#### 查看docker概要信息

```bash
docker info
```

#### 查看总体帮助文档

```bash
docker --help
```

#### 查看单个命令帮助文档

```bash
docker 命令 --help
```

### 镜像命令

#### 本地镜像列表

```bash
docker images
docker images -a # 显示所有镜像
docker images -q # 显示所有镜像ID
```

#### 搜索镜像

```bash
docker search 镜像名
docker search 镜像名 -s 5 # 搜索镜像，并显示5个结果
```

#### 拉取镜像

```bash
docker pull 镜像名
docker pull 镜像名:标签
docker pull 镜像名:标签@sha256:镜像ID
docker pull 镜像名:latest
docker pull registry.cn-hangzhou.aliyuncs.com/library/nginx:latest
```

#### 删除镜像

```bash
docker rmi 镜像ID[:标签]
docker rmi 镜像名[:标签]
docker rmi -f 镜像ID[:标签]
```

#### 查看镜像、容器所占用空间

```bash
docker system df
docker system df -v
```

### 容器命令

#### 启动容器

```bash
# 创建并运行容器
docker run [options] 镜像名 [命令] [参数] 

# options
-d 后台运行容器并返回容器ID，也称启动守护式容器
-i 以交互模式运行容器，通常与-t同时使用
-t 为容器重新分配一个伪输入终端，通常与-i同时使用
-p 小写p，指定端口映射，hostPort:containerPort
-P 大写P，随机映射端口
--name 容器名
--rm 删除容器
--network=bridge 使用默认的网络
--network=host 使用主机网络
--network=自定义网络 使用自定义的网络

# 启动已经停止的容器
docker start 容器ID或容器名

# 重启容器
docker restart 容器ID或容器名
```

docker容器后台运行，必须有一个前台进程，如果容器运行的命令不是一直挂起的命令，就会自动退出，这个是docker的机制

最佳的解决方案是，将要运行的程序以前台进程的形式运行，常见的就是**命令行模式**

#### 列出容器

```bash
docker ps # 列出正在运行的容器
docker ps -a # 列出所有容器
docker ps -q # 列出所有容器ID
docker ps -aq # 列出所有容器ID并去重
```

#### 退出容器

```bash
exit # 退出容器 容器会自动停止
ctrl + p + q # 退出容器 容器不会自动停止
```

#### 停止容器

```bash
# 停止容器
docker stop 容器ID或容器名

# 强制停止容器
docker kill 容器ID或容器名
```

#### 删除容器

```bash
# 删除已停止的容器
docker rm 容器ID或容器名

# 强制删除容器
docker rm -f 容器ID或容器名
```

#### 查看容器日志

```bash
docker logs 容器ID或容器名
docker logs -f 容器ID或容器名 # 持续查看容器日志
docker logs -n 10 容器ID或容器名 # 查看最后10行日志
docker logs --since 1h 容器ID或容器名 # 查看1小时内的日志
docker logs --tail 10 容器ID或容器名 # 查看最后10行日志
```

#### 容器信息

```bash
docker inspect 容器ID或容器名
docker top 容器ID或容器名
```

#### 进入容器

```bash
docker exec -it 容器ID或容器名 bash
docker exec -it 容器ID或容器名 /bin/bash
docker exec -it 容器ID或容器名 /bin/sh
docker exec -it 容器ID或容器名 /bin/sh -c "ls -l"

docker attach 容器ID或容器名
```

attach命令和exec命令一样，attach不会创建一个新的进程，使用exit退出容器终端会导致容器停止；使用exec命令可以创建一个新的进程，使用exit退出容器终端不会导致容器停止

#### 容器文件导出到宿主机

```bash
docker cp 容器ID或容器名:/文件路径 宿主机路径
```

#### 容器导入导出

```bash
# 导出容器内容为一个tar包
docker export 容器ID或容器名 > 文件名.tar

# 从tar包中的内容创建一个新的镜像
docker import 文件名.tar 镜像名:标签
```

#### 提交容器为镜像

```bash
docker commit 容器ID或容器名 镜像名:标签
docker commit -a "作者" -m "镜像描述" 容器ID或容器名 镜像名:标签
```

## 镜像

### 什么是镜像

镜像是一种轻量级、可执行的独立软件包，它包含运行某个软件所需的所有内容，我们把应用程序和配置依赖打包好形成一个可交付的运行环境(包括代码、运行时需要的库、环境变量和配置文件等)，这个打包好的运行环境就是image镜像文件

### 镜像分层

镜像分层是指一层一层的文件系统，分层的好处是方便复用和迁移

镜像都是可读的，容器启动时，会在容器的顶部加载一个新的可写层，这一层通常被称为“容器层”，容器层以下的都称为镜像层

镜像层和容器层是隔离的，容器层上的修改不会影响镜像层，镜像层上的修改也不会影响容器层

### 联合文件系统

Union文件系统（UnionFS）是一种分层、轻量级并且高性能的文件系统，它支持对文件系统的修改作一次提交来一层层的叠加，同时可以将不同目录桂载到同一个虚拟文件系统 下(unite several directories into a single virtual filesystem)。 Union 文件系统是 Docker 镜像的基础。镜像可以通过分层来进行维承，基于基础镜像（没有父镜像），可以制作各种具体的应用镜像。

特性：一次同时加载多个文件系统，但从外面看起来，只能看到一个文件系统，联合加载会把各层文件系统叠加起来，这样最终的文件系统会包含所有底层的文件和目录

### 镜像加载原理

docker的镜像实际上由一层一层的文件系统组成，这种层级的文件系统UnionFs

bootfs(bootTile system)主要包含bootloader和kernel, bootloader主要是引导加载kernel, Linux刚启动时会加载bootfs文件系统，在Docker镜像的最底层是引导文件系统bootfs。这一层与我们典型的Linux/Unix系统是一样的，包含boot加载器和内核。当boot加载完成之后整个内核就都在内存中了，此时内存的使用权己由bootfs转交给内核，此时系统也会卸载bootfs。

rootfs (root file system)，在bootfs之上。包含的就是典型 Linux 系统中的 /dev, /proc, /bin, /etc 等标准目录和文件。rootfs就是各种不同的操作系统发行版，比如Ubuntu,Centos等等。

## 容器卷

卷是文件或者目录，存在于一个或者多个容器中，用于持久存储和共享数据

容器卷独立于容器的生命周期，不会在容器删除时删除容器卷

### 运行一个带有容器卷的容器

```bash
docker run -d -privileged -v 主机目录path:容器目录path 镜像名:标签 命令
```

### 容器卷的继承

```
docker run -d -privileged --volumes-from 容器ID或容器名称 镜像名:标签 命令
```
## Dockerfile
Dockerfile是用来构建Docker镜像的文本文件，是由一条条构建镜像所需的指令和参数构成的脚本
### 文件编写规则
1. 文件名必须为Dockerfile
2. 每条保留字指令都必须为大写字母且后面至少要跟随一个参数
3. 指令从上至下，顺序执行
4. 注释使用#标识
5. 每条指令都会创建一个新的镜像层并对镜像进行提交

### 执行流程
1. docker从基础镜像创建一个容器
2. 执行一条指令对容器进行修改
3. 执行类似commit的操作，提交一个新的镜像层
4. 基于新的镜像，创建一个新的容器
5. 执行下一条指令，重复上述布置，直到最后一条指令

### 常用指令
#### FROM
指定基础镜像，第一项必须是FROM，FROM 镜像名:标签 

#### MAINTAINER
指定镜像的作者和邮箱地址

#### RUN
在build时，执行一条命令，RUN \<命令行命令\>，可以是shell和exec格式

#### EXPOSE
指定容器向外暴露的端口号，EXPOSE 端口号

#### WORKDIR
指定容器工作目录，WORKDIR 目录，指定在创建容器后，终端默认登录进来的工作目录

#### ENV
用来在构建镜像过程中设置环境变量，ENV 变量名 变量值

#### VOLUME
创建一个容器卷，VOLUME 目录

#### ADD
添加文件或者目录到镜像中，ADD <源文件> <目标文件>，会自动处理url和解压tar压缩包

#### COPY
添加文件或者目录到镜像中，COPY <源文件> <目标文件>，不会自动处理url和解压tar压缩包

#### CMD
 指定容器启动时执行的命令，CMD [命令，参数1，参数2，...]，dockerfile中可以有多个cmd命令，但是只有最后一个会生效，在使用docker run时，如果指定了cmd命令，那么dockerfile中的cmd命令会被覆盖

#### ENTRYPOINT
指定容器启动时执行的命令，ENTRYPOINT [命令，参数1，参数2，...]，ENTRYPOINT命令会覆盖CMD命令，但是ENTRYPOINT命令不能被docker run命令所覆盖

当指定ENTRYPOINT命令时，CMD命令的含义就发生了变化，CMD命令的参数会被追加到ENTRYPOINT命令的参数中，最终的命令行参数为ENTRYPOINT命令的参数+CMD命令的参数
## Docker网络
Docker网络是Docker容器之间进行通信的基础，Docker默认使用bridge网络模式，bridge网络模式下，Docker会创建一个docker0网桥，并把所有容器的网卡都加入到docker0网桥中，docker0网桥会监听所有端口，并把接收到的数据包转发给对应的容器
### 网络模式

####  1. bridge模式
创建一个docker0网桥，并把所有容器的网卡都加入到docker0网桥中，docker0网桥会监听所有端口，并把接收到的数据包转发给对应的容器，每个容器有一个自己的IP地址和端口

#### 2. host模式
容器的网卡会与宿主机的网卡进行绑定，容器的端口会与宿主机的端口进行绑定

容器启动后，相当于在宿主机上启动了一个进程，容器的服务直接通过宿主机的ip和端口进行方案

#### 3. none模式
容器的网卡不会与宿主机的网卡进行绑定，容器的端口不会与宿主机的端口进行绑定

#### 4. container模式
创建一个容器，并指定容器的网卡与 another_container 容器的网卡进行绑定

### 网络操作

#### 创建一个自定义网络
```bash
docker network create -d bridge 网络名称
docker network create -d bridge --subnet=172.18.0.0/16 --gateway=172.18.0.1 网络名称
```
#### 查看网络
```bash
docker network ls
```
#### 删除网络
```bash
docker network rm 网络名称
```
## Docker容器编排
Docker容器编排，是多个容器组成的一个应用，Docker容器编排工具有Docker Compose和Kubernetes

docker建议我们每一个容器中只运行一个服务，如果同时部署多个服务，就需要为每个服务单独写dockerfile来构建镜像，docker官方提供了docker-compose来进行多服务部署

docker-compose允许用户通过一个单独的docker-compose.yml文件来定义一组相关联的应用容器组成一个应用
