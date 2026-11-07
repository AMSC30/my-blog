import{_ as n,p as s,q as e,Y as t}from"./framework-e1bed10d.js";const a="/my-blog/assets/image-20200505183738289-b0bdd8ce.png",l="/my-blog/assets/image-20200526203726071-e3162d27.png",i="/my-blog/assets/image-20200404094800622-6d2f195f.png",p="/my-blog/assets/image-20200505213817934-6f23b535.png",d="/my-blog/assets/image-20200505214156148-a6575c93.png",o={},c=t('<h1 id="第一章-kubernetes介绍" tabindex="-1"><a class="header-anchor" href="#第一章-kubernetes介绍" aria-hidden="true">#</a> 第一章 kubernetes介绍</h1><p>本章节主要介绍应用程序在服务器上部署方式演变以及kubernetes的概念、组件和工作原理。</p><h2 id="应用部署方式演变" tabindex="-1"><a class="header-anchor" href="#应用部署方式演变" aria-hidden="true">#</a> 应用部署方式演变</h2><p>在部署应用程序的方式上，主要经历了三个时代：</p><ul><li><p><strong>传统部署</strong>：互联网早期，会直接将应用程序部署在物理机上</p><blockquote><p>优点：简单，不需要其它技术的参与</p><p>缺点：不能为应用程序定义资源使用边界，很难合理地分配计算资源，而且程序之间容易产生影响</p></blockquote></li><li><p><strong>虚拟化部署</strong>：可以在一台物理机上运行多个虚拟机，每个虚拟机都是独立的一个环境</p><blockquote><p>优点：程序环境不会相互产生影响，提供了一定程度的安全性</p><p>缺点：增加了操作系统，浪费了部分资源</p></blockquote></li><li><p><strong>容器化部署</strong>：与虚拟化类似，但是共享了操作系统</p><blockquote><p>优点：</p><p>​ 可以保证每个容器拥有自己的文件系统、CPU、内存、进程空间等</p><p>​ 运行应用程序所需要的资源都被容器包装，并和底层基础架构解耦</p><p>​ 容器化的应用程序可以跨云服务商、跨Linux操作系统发行版进行部署</p></blockquote></li></ul><p><img src="'+a+'" alt="image-20200505183738289"></p><p>容器化部署方式给带来很多的便利，但是也会出现一些问题，比如说：</p><ul><li>一个容器故障停机了，怎么样让另外一个容器立刻启动去替补停机的容器</li><li>当并发访问量变大的时候，怎么样做到横向扩展容器数量</li></ul><p>这些容器管理的问题统称为<strong>容器编排</strong>问题，为了解决这些容器编排问题，就产生了一些容器编排的软件：</p><ul><li><strong>Swarm</strong>：Docker自己的容器编排工具</li><li><strong>Mesos</strong>：Apache的一个资源统一管控的工具，需要和Marathon结合使用</li><li><strong>Kubernetes</strong>：Google开源的的容器编排工具</li></ul><p>&lt;img src=&quot;./assets/image-20200524150339551.png&quot; alt=&quot;image-20200524150339551&quot; style=&quot;border:1px solid;zoom:110%;&quot; /&gt;</p><h2 id="kubernetes简介" tabindex="-1"><a class="header-anchor" href="#kubernetes简介" aria-hidden="true">#</a> kubernetes简介</h2><p>&lt;img src=&quot;./assets/image-20200406232838722.png&quot; alt=&quot;image-20200406232838722&quot; style=&quot;zoom:100%;border:1px solid;&quot; /&gt;</p><p>​</p><p>​ kubernetes，是一个全新的基于容器技术的分布式架构领先方案，是谷歌严格保密十几年的秘密武器----Borg系统的一个开源版本，于2014年9月发布第一个版本，2015年7月发布第一个正式版本。</p><p>​ kubernetes的本质是<strong>一组服务器集群</strong>，它可以在集群的每个节点上运行特定的程序，来对节点中的容器进行管理。目的是实现资源管理的自动化，主要提供了如下的主要功能：</p><ul><li><strong>自我修复</strong>：一旦某一个容器崩溃，能够在1秒中左右迅速启动新的容器</li><li><strong>弹性伸缩</strong>：可以根据需要，自动对集群中正在运行的容器数量进行调整</li><li><strong>服务发现</strong>：服务可以通过自动发现的形式找到它所依赖的服务</li><li><strong>负载均衡</strong>：如果一个服务起动了多个容器，能够自动实现请求的负载均衡</li><li><strong>版本回退</strong>：如果发现新发布的程序版本有问题，可以立即回退到原来的版本</li><li><strong>存储编排</strong>：可以根据容器自身的需求自动创建存储卷</li></ul><p><img src="'+l+'" alt="image-20200526203726071"></p><h2 id="kubernetes组件" tabindex="-1"><a class="header-anchor" href="#kubernetes组件" aria-hidden="true">#</a> kubernetes组件</h2><p>一个kubernetes集群主要是由<strong>控制节点(master)</strong>、**工作节点(node)**构成，每个节点上都会安装不同的组件。</p><p><strong>master：集群的控制平面，负责集群的决策 ( 管理 )</strong></p><blockquote><p><strong>ApiServer</strong> : 资源操作的唯一入口，接收用户输入的命令，提供认证、授权、API注册和发现等机制</p><p><strong>Scheduler</strong> : 负责集群资源调度，按照预定的调度策略将Pod调度到相应的node节点上</p><p><strong>ControllerManager</strong> : 负责维护集群的状态，比如程序部署安排、故障检测、自动扩展、滚动更新等</p><p><strong>Etcd</strong> ：负责存储集群中各种资源对象的信息</p></blockquote><p><strong>node：集群的数据平面，负责为容器提供运行环境 ( 干活 )</strong></p><blockquote><p><strong>Kubelet</strong> : 负责维护容器的生命周期，即通过控制docker，来创建、更新、销毁容器</p><p><strong>KubeProxy</strong> : 负责提供集群内部的服务发现和负载均衡</p><p><strong>Docker</strong> : 负责节点上容器的各种操作</p></blockquote><p>&lt;img src=&quot;./assets/image-20200406184656917.png&quot; alt=&quot;image-20200406184656917&quot; style=&quot;zoom:200%;&quot; /&gt;</p><p>下面，以部署一个nginx服务来说明kubernetes系统各个组件调用关系：</p><ol><li><p>首先要明确，一旦kubernetes环境启动之后，master和node都会将自身的信息存储到etcd数据库中</p></li><li><p>一个nginx服务的安装请求会首先被发送到master节点的apiServer组件</p></li><li><p>apiServer组件会调用scheduler组件来决定到底应该把这个服务安装到哪个node节点上</p><p>在此时，它会从etcd中读取各个node节点的信息，然后按照一定的算法进行选择，并将结果告知apiServer</p></li><li><p>apiServer调用controller-manager去调度Node节点安装nginx服务</p></li><li><p>kubelet接收到指令后，会通知docker，然后由docker来启动一个nginx的pod</p><p>pod是kubernetes的最小操作单元，容器必须跑在pod中至此，</p></li><li><p>一个nginx服务就运行了，如果需要访问nginx，就需要通过kube-proxy来对pod产生访问的代理</p></li></ol><p>​ 这样，外界用户就可以访问集群中的nginx服务了</p><h2 id="kubernetes概念" tabindex="-1"><a class="header-anchor" href="#kubernetes概念" aria-hidden="true">#</a> kubernetes概念</h2><p><strong>Master</strong>：集群控制节点，每个集群需要至少一个master节点负责集群的管控</p><p><strong>Node</strong>：工作负载节点，由master分配容器到这些node工作节点上，然后node节点上的docker负责容器的运行</p><p><strong>Pod</strong>：kubernetes的最小控制单元，容器都是运行在pod中的，一个pod中可以有1个或者多个容器</p><p><strong>Controller</strong>：控制器，通过它来实现对pod的管理，比如启动pod、停止pod、伸缩pod的数量等等</p><p><strong>Service</strong>：pod对外服务的统一入口，下面可以维护者同一类的多个pod</p><p><strong>Label</strong>：标签，用于对pod进行分类，同一类pod会拥有相同的标签</p><p><strong>NameSpace</strong>：命名空间，用来隔离pod的运行环境</p><p>&lt;img src=&quot;./assets/image-20200403224313355.png&quot; alt=&quot;image-20200403224313355&quot; style=&quot;zoom:200%;&quot; /&gt;</p><h1 id="第二章-集群环境搭建" tabindex="-1"><a class="header-anchor" href="#第二章-集群环境搭建" aria-hidden="true">#</a> 第二章 集群环境搭建</h1><p>本章节主要介绍如何搭建kubernetes的集群环境</p><h2 id="环境规划" tabindex="-1"><a class="header-anchor" href="#环境规划" aria-hidden="true">#</a> 环境规划</h2><h3 id="集群类型" tabindex="-1"><a class="header-anchor" href="#集群类型" aria-hidden="true">#</a> 集群类型</h3><p>kubernetes集群大体上分为两类：<strong>一主多从</strong>和<strong>多主多从</strong>。</p><ul><li>一主多从：一台Master节点和多台Node节点，搭建简单，但是有单机故障风险，适合用于测试环境</li><li>多主多从：多台Master节点和多台Node节点，搭建麻烦，安全性高，适合用于生产环境</li></ul><p><img src="'+i+`" alt="image-20200404094800622"></p><blockquote><p><code>说明：为了测试简单，本次搭建的是 一主两从 类型的集群</code></p></blockquote><h3 id="安装方式" tabindex="-1"><a class="header-anchor" href="#安装方式" aria-hidden="true">#</a> 安装方式</h3><p>kubernetes有多种部署方式，目前主流的方式有kubeadm、minikube、二进制包</p><ul><li>minikube：一个用于快速搭建单节点kubernetes的工具</li><li>kubeadm：一个用于快速搭建kubernetes集群的工具</li><li>二进制包 ：从官网下载每个组件的二进制包，依次去安装，此方式对于理解kubernetes组件更加有效</li></ul><blockquote><p><code>说明：现在需要安装kubernetes的集群环境，但是又不想过于麻烦，所以选择使用kubeadm方式</code></p></blockquote><h3 id="主机规划" tabindex="-1"><a class="header-anchor" href="#主机规划" aria-hidden="true">#</a> 主机规划</h3><table><thead><tr><th>作用</th><th>IP地址</th><th>操作系统</th><th>配置</th></tr></thead><tbody><tr><td>Master</td><td>192.168.109.101</td><td>Centos7.5 基础设施服务器</td><td>2颗CPU 2G内存 50G硬盘</td></tr><tr><td>Node1</td><td>192.168.109.102</td><td>Centos7.5 基础设施服务器</td><td>2颗CPU 2G内存 50G硬盘</td></tr><tr><td>Node2</td><td>192.168.109.103</td><td>Centos7.5 基础设施服务器</td><td>2颗CPU 2G内存 50G硬盘</td></tr></tbody></table><h2 id="环境搭建" tabindex="-1"><a class="header-anchor" href="#环境搭建" aria-hidden="true">#</a> 环境搭建</h2><p>​ 本次环境搭建需要安装三台Centos服务器（一主二从），然后在每台服务器中分别安装docker（18.06.3），kubeadm（1.17.4）、kubelet（1.17.4）、kubectl（1.17.4）程序。</p><h3 id="主机安装" tabindex="-1"><a class="header-anchor" href="#主机安装" aria-hidden="true">#</a> 主机安装</h3><p>安装虚拟机过程中注意下面选项的设置：</p><ul><li><p>操作系统环境：CPU（2C） 内存（2G） 硬盘（50G）</p></li><li><p>语言选择：中文简体</p></li><li><p>软件选择：基础设施服务器</p></li><li><p>分区选择：自动分区</p></li><li><p>网络配置：按照下面配置网路地址信息</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>网络地址：192.168.109.100  （每台主机都不一样  分别为100、101、102）
子网掩码：255.255.255.0
默认网关：192.168.109.2
DNS：    223.5.5.5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+p+`" alt="image-20200505213817934"></p></li><li><p>主机名设置：按照下面信息设置主机名</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>master节点： master
node节点：   node1
node节点：   node2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+d+`" alt="image-20200505214156148"></p></li></ul><h3 id="环境初始化" tabindex="-1"><a class="header-anchor" href="#环境初始化" aria-hidden="true">#</a> 环境初始化</h3><ol><li>检查操作系统的版本</li></ol><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 此方式下安装kubernetes集群要求Centos版本要在7.5或之上</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># cat /etc/redhat-release</span>
CentOS Linux release 7<span class="token punctuation">.</span>5<span class="token punctuation">.</span>1804 <span class="token punctuation">(</span>Core<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2） 主机名解析</p><p>为了方便后面集群节点间的直接调用，在这配置一下主机名解析，企业中推荐使用内部DNS服务器</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 主机名成解析 编辑三台服务器的/etc/hosts文件，添加下面内容</span>
192<span class="token punctuation">.</span>168<span class="token punctuation">.</span>109<span class="token punctuation">.</span>100  master
192<span class="token punctuation">.</span>168<span class="token punctuation">.</span>109<span class="token punctuation">.</span>101  node1
192<span class="token punctuation">.</span>168<span class="token punctuation">.</span>109<span class="token punctuation">.</span>102  node2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3） 时间同步</p><p>kubernetes要求集群中的节点时间必须精确一致，这里直接使用chronyd服务从网络同步时间。</p><p>企业中建议配置内部的时间同步服务器</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 启动chronyd服务</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># systemctl start chronyd</span>
<span class="token comment"># 设置chronyd服务开机自启</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># systemctl enable chronyd</span>
<span class="token comment"># chronyd服务启动稍等几秒钟，就可以使用date命令验证时间了</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># date</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4） 禁用iptables和firewalld服务</p><p>kubernetes和docker在运行中会产生大量的iptables规则，为了不让系统规则跟它们混淆，直接关闭系统的规则</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 1 关闭firewalld服务</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># systemctl stop firewalld</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># systemctl disable firewalld</span>
<span class="token comment"># 2 关闭iptables服务</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># systemctl stop iptables</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># systemctl disable iptables</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>5） 禁用selinux</p><p>selinux是linux系统下的一个安全服务，如果不关闭它，在安装集群中会产生各种各样的奇葩问题</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 编辑 /etc/selinux/config 文件，修改SELINUX的值为disabled</span>
<span class="token comment"># 注意修改完毕之后需要重启linux服务</span>
SELINUX=disabled
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>6） 禁用swap分区</p><p>swap分区指的是虚拟内存分区，它的作用是在物理内存使用完之后，将磁盘空间虚拟成内存来使用</p><p>启用swap设备会对系统的性能产生非常负面的影响，因此kubernetes要求每个节点都要禁用swap设备</p><p>但是如果因为某些原因确实不能关闭swap分区，就需要在集群安装过程中通过明确的参数进行配置说明</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 编辑分区配置文件/etc/fstab，注释掉swap分区一行</span>
<span class="token comment"># 注意修改完毕之后需要重启linux服务</span>
 UUID=455cc753-7a60-4c17-a424-7741728c44a1 <span class="token operator">/</span>boot    xfs     defaults        0 0
 <span class="token operator">/</span>dev/mapper/centos-home <span class="token operator">/</span>home                      xfs     defaults        0 0
<span class="token comment"># /dev/mapper/centos-swap swap                      swap    defaults        0 0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>7）修改linux的内核参数</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 修改linux的内核参数，添加网桥过滤和地址转发功能</span>
<span class="token comment"># 编辑/etc/sysctl.d/kubernetes.conf文件，添加如下配置:</span>
net<span class="token punctuation">.</span>bridge<span class="token punctuation">.</span>bridge-nf-call-ip6tables = 1
net<span class="token punctuation">.</span>bridge<span class="token punctuation">.</span>bridge-nf-call-iptables = 1
net<span class="token punctuation">.</span>ipv4<span class="token punctuation">.</span>ip_forward = 1

<span class="token comment"># 重新加载配置</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># sysctl -p</span>

<span class="token comment"># 加载网桥过滤模块</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># modprobe br_netfilter</span>

<span class="token comment"># 查看网桥过滤模块是否加载成功</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># lsmod | grep br_netfilter</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>8）配置ipvs功能</p><p>在kubernetes中service有两种代理模型，一种是基于iptables的，一种是基于ipvs的</p><p>两者比较的话，ipvs的性能明显要高一些，但是如果要使用它，需要手动载入ipvs模块</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 1 安装ipset和ipvsadm</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># yum install ipset ipvsadmin -y</span>

<span class="token comment"># 2 添加需要加载的模块写入脚本文件</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># cat &lt;&lt;EOF &gt;  /etc/sysconfig/modules/ipvs.modules</span>
<span class="token comment">#!/bin/bash</span>
modprobe <span class="token operator">--</span> ip_vs
modprobe <span class="token operator">--</span> ip_vs_rr
modprobe <span class="token operator">--</span> ip_vs_wrr
modprobe <span class="token operator">--</span> ip_vs_sh
modprobe <span class="token operator">--</span> nf_conntrack_ipv4
EOF

<span class="token comment"># 3 为脚本文件添加执行权限</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># chmod +x /etc/sysconfig/modules/ipvs.modules</span>

<span class="token comment"># 4 执行脚本文件</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># /bin/bash /etc/sysconfig/modules/ipvs.modules</span>

<span class="token comment"># 5 查看对应的模块是否加载成功</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># lsmod | grep -e ip_vs -e nf_conntrack_ipv4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>9） 重启服务器</p><p>上面步骤完成之后，需要重新启动linux系统</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token namespace">[root@master ~]</span><span class="token comment"># reboot</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="安装docker" tabindex="-1"><a class="header-anchor" href="#安装docker" aria-hidden="true">#</a> 安装docker</h3><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 1 切换镜像源</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># wget https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo -O /etc/yum.repos.d/docker-ce.repo</span>

<span class="token comment"># 2 查看当前镜像源中支持的docker版本</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># yum list docker-ce --showduplicates</span>

<span class="token comment"># 3 安装特定版本的docker-ce</span>
<span class="token comment"># 必须指定--setopt=obsoletes=0，否则yum会自动安装更高版本</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># yum install --setopt=obsoletes=0 docker-ce-18.06.3.ce-3.el7 -y</span>

<span class="token comment"># 4 添加一个配置文件</span>
<span class="token comment"># Docker在默认情况下使用的Cgroup Driver为cgroupfs，而kubernetes推荐使用systemd来代替cgroupfs</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># mkdir /etc/docker</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># cat &lt;&lt;EOF &gt;  /etc/docker/daemon.json</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;exec-opts&quot;</span>: <span class="token punctuation">[</span><span class="token string">&quot;native.cgroupdriver=systemd&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token string">&quot;registry-mirrors&quot;</span>: <span class="token punctuation">[</span><span class="token string">&quot;https://kn0t2bca.mirror.aliyuncs.com&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
EOF

<span class="token comment"># 5 启动docker</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># systemctl restart docker</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># systemctl enable docker</span>

<span class="token comment"># 6 检查docker状态和版本</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># docker version</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装kubernetes组件" tabindex="-1"><a class="header-anchor" href="#安装kubernetes组件" aria-hidden="true">#</a> 安装kubernetes组件</h3><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 由于kubernetes的镜像源在国外，速度比较慢，这里切换成国内的镜像源</span>
<span class="token comment"># 编辑/etc/yum.repos.d/kubernetes.repo，添加下面的配置 </span>
<span class="token namespace">[kubernetes]</span>
name=Kubernetes
baseurl=http:<span class="token operator">/</span><span class="token operator">/</span>mirrors<span class="token punctuation">.</span>aliyun<span class="token punctuation">.</span>com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=http:<span class="token operator">/</span><span class="token operator">/</span>mirrors<span class="token punctuation">.</span>aliyun<span class="token punctuation">.</span>com/kubernetes/yum/doc/yum-key<span class="token punctuation">.</span>gpg
       http:<span class="token operator">/</span><span class="token operator">/</span>mirrors<span class="token punctuation">.</span>aliyun<span class="token punctuation">.</span>com/kubernetes/yum/doc/rpm-package-key<span class="token punctuation">.</span>gpg

<span class="token comment"># 安装kubeadm、kubelet和kubectl</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># yum install --setopt=obsoletes=0 kubeadm-1.17.4-0 kubelet-1.17.4-0 kubectl-1.17.4-0 -y</span>

<span class="token comment"># 配置kubelet的cgroup</span>
<span class="token comment"># 编辑/etc/sysconfig/kubelet，添加下面的配置</span>
KUBELET_CGROUP_ARGS=<span class="token string">&quot;--cgroup-driver=systemd&quot;</span>
KUBE_PROXY_MODE=<span class="token string">&quot;ipvs&quot;</span>

<span class="token comment"># 4 设置kubelet开机自启</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># systemctl enable kubelet</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="准备集群镜像" tabindex="-1"><a class="header-anchor" href="#准备集群镜像" aria-hidden="true">#</a> 准备集群镜像</h3><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 在安装kubernetes集群之前，必须要提前准备好集群需要的镜像，所需镜像可以通过下面命令查看</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubeadm config images list</span>

<span class="token comment"># 下载镜像</span>
<span class="token comment"># 此镜像在kubernetes的仓库中,由于网络原因,无法连接，下面提供了一种替代方案</span>
images=<span class="token punctuation">(</span>
    kube-apiserver:v1<span class="token punctuation">.</span>17<span class="token punctuation">.</span>4
    kube-controller-manager:v1<span class="token punctuation">.</span>17<span class="token punctuation">.</span>4
    kube-scheduler:v1<span class="token punctuation">.</span>17<span class="token punctuation">.</span>4
    kube-proxy:v1<span class="token punctuation">.</span>17<span class="token punctuation">.</span>4
    pause:3<span class="token punctuation">.</span>1
    etcd:3<span class="token punctuation">.</span>4<span class="token punctuation">.</span>3-0
    coredns:1<span class="token punctuation">.</span>6<span class="token punctuation">.</span>5
<span class="token punctuation">)</span>

<span class="token keyword">for</span> imageName in $<span class="token punctuation">{</span>images<span class="token punctuation">[</span>@<span class="token punctuation">]</span><span class="token punctuation">}</span> <span class="token punctuation">;</span> <span class="token keyword">do</span>
	docker pull registry<span class="token punctuation">.</span>cn-hangzhou<span class="token punctuation">.</span>aliyuncs<span class="token punctuation">.</span>com/google_containers/<span class="token variable">$imageName</span>
	docker tag registry<span class="token punctuation">.</span>cn-hangzhou<span class="token punctuation">.</span>aliyuncs<span class="token punctuation">.</span>com/google_containers/<span class="token variable">$imageName</span> 		k8s<span class="token punctuation">.</span>gcr<span class="token punctuation">.</span>io/<span class="token variable">$imageName</span>
	docker rmi registry<span class="token punctuation">.</span>cn-hangzhou<span class="token punctuation">.</span>aliyuncs<span class="token punctuation">.</span>com/google_containers/<span class="token variable">$imageName</span>
done
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="集群初始化" tabindex="-1"><a class="header-anchor" href="#集群初始化" aria-hidden="true">#</a> 集群初始化</h3><p>下面开始对集群进行初始化，并将node节点加入到集群中</p><blockquote><p>下面的操作只需要在<code>master</code>节点上执行即可</p></blockquote><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 创建集群</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubeadm init \\</span>
	<span class="token operator">--</span>kubernetes-version=v1<span class="token punctuation">.</span>17<span class="token punctuation">.</span>4 \\
    <span class="token operator">--</span>pod-network-cidr=10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0/16 \\
    <span class="token operator">--</span>service-cidr=10<span class="token punctuation">.</span>96<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0/12 \\
    <span class="token operator">--</span>apiserver-advertise-address=192<span class="token punctuation">.</span>168<span class="token punctuation">.</span>109<span class="token punctuation">.</span>100

<span class="token comment"># 创建必要文件</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># mkdir -p $HOME/.kube</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># sudo chown $(id -u):$(id -g) $HOME/.kube/config</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>下面的操作只需要在<code>node</code>节点上执行即可</p></blockquote><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 将node节点加入集群</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubeadm join 192.168.109.100:6443 \\ </span>
	<span class="token operator">--</span>token 8507uc<span class="token punctuation">.</span>o0knircuri8etnw2 \\
	<span class="token operator">--</span>discovery-token-ca-cert-hash \\
	sha256:acc37967fb5b0acf39d7598f8a439cc7dc88f439a3f4d0c9cae88e7901b9d3f
	
<span class="token comment"># 查看集群状态 此时的集群状态为NotReady，这是因为还没有配置网络插件</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get nodes</span>
NAME     STATUS     ROLES    AGE     VERSION
master   NotReady   master   6m43s   v1<span class="token punctuation">.</span>17<span class="token punctuation">.</span>4
node1    NotReady   &lt;none&gt;   22s     v1<span class="token punctuation">.</span>17<span class="token punctuation">.</span>4
node2    NotReady   &lt;none&gt;   19s     v1<span class="token punctuation">.</span>17<span class="token punctuation">.</span>4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装网络插件" tabindex="-1"><a class="header-anchor" href="#安装网络插件" aria-hidden="true">#</a> 安装网络插件</h3><p>kubernetes支持多种网络插件，比如flannel、calico、canal等等，任选一种使用即可，本次选择flannel</p><blockquote><p>下面操作依旧只在<code>master</code>节点执行即可，插件使用的是DaemonSet的控制器，它会在每个节点上都运行</p></blockquote><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 获取fannel的配置文件</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># wget https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml</span>

<span class="token comment"># 修改文件中quay.io仓库为quay-mirror.qiniu.com</span>

<span class="token comment"># 使用配置文件启动fannel</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl apply -f kube-flannel.yml</span>

<span class="token comment"># 稍等片刻，再次查看集群节点的状态</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get nodes</span>
NAME     STATUS   ROLES    AGE     VERSION
master   Ready    master   15m     v1<span class="token punctuation">.</span>17<span class="token punctuation">.</span>4
node1    Ready    &lt;none&gt;   8m53s   v1<span class="token punctuation">.</span>17<span class="token punctuation">.</span>4
node2    Ready    &lt;none&gt;   8m50s   v1<span class="token punctuation">.</span>17<span class="token punctuation">.</span>4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>至此，kubernetes的集群环境搭建完成</p><h2 id="服务部署" tabindex="-1"><a class="header-anchor" href="#服务部署" aria-hidden="true">#</a> 服务部署</h2><p>接下来在kubernetes集群中部署一个nginx程序，测试下集群是否在正常工作。</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 部署nginx</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl create deployment nginx --image=nginx:1.14-alpine</span>

<span class="token comment"># 暴露端口</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl expose deployment nginx --port=80 --type=NodePort</span>

<span class="token comment"># 查看服务状态</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get pods,service</span>
NAME                         READY   STATUS    RESTARTS   AGE
pod/nginx-86c57db685-fdc2k   1/1     Running   0          18m

NAME                 <span class="token function">TYPE</span>        CLUSTER-IP      EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>        AGE
service/kubernetes   ClusterIP   10<span class="token punctuation">.</span>96<span class="token punctuation">.</span>0<span class="token punctuation">.</span>1       &lt;none&gt;        443/TCP        82m
service/nginx        NodePort    10<span class="token punctuation">.</span>104<span class="token punctuation">.</span>121<span class="token punctuation">.</span>45   &lt;none&gt;        80:30073/TCP   17m

<span class="token comment"># 4 最后在电脑上访问下部署的nginx服务</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>&lt;img src=&quot;./assets/image-20200405142656921.png&quot; alt=&quot;image-20200405142656921&quot; style=&quot;zoom:80%; border:1px solid&quot; /&gt;</p><h1 id="第三章-资源管理" tabindex="-1"><a class="header-anchor" href="#第三章-资源管理" aria-hidden="true">#</a> 第三章 资源管理</h1><p>本章节主要介绍yaml语法和kubernetes的资源管理方式</p><h2 id="资源管理介绍" tabindex="-1"><a class="header-anchor" href="#资源管理介绍" aria-hidden="true">#</a> 资源管理介绍</h2><p>在kubernetes中，所有的内容都抽象为资源，用户需要通过操作资源来管理kubernetes。</p><blockquote><p>​ kubernetes的本质上就是一个集群系统，用户可以在集群中部署各种服务，所谓的部署服务，其实就是在kubernetes集群中运行一个个的容器，并将指定的程序跑在容器中。</p><p>​ kubernetes的最小管理单元是pod而不是容器，所以只能将容器放在<code>Pod</code>中，而kubernetes一般也不会直接管理Pod，而是通过<code>Pod控制器</code>来管理Pod的。</p><p>​ Pod可以提供服务之后，就要考虑如何访问Pod中服务，kubernetes提供了<code>Service</code>资源实现这个功能。</p><p>​ 当然，如果Pod中程序的数据需要持久化，kubernetes还提供了各种<code>存储</code>系统。</p></blockquote><p>&lt;img src=&quot;./assets/image-20200406225334627.png&quot; alt=&quot;image-20200406225334627&quot; style=&quot;zoom:200%;&quot; /&gt;</p><blockquote><p>学习kubernetes的核心，就是学习如何对集群上的<code>Pod、Pod控制器、Service、存储</code>等各种资源进行操作</p></blockquote><h2 id="yaml语言介绍" tabindex="-1"><a class="header-anchor" href="#yaml语言介绍" aria-hidden="true">#</a> YAML语言介绍</h2><p>​ YAML是一个类似 XML、JSON 的标记性语言。它强调以<strong>数据</strong>为中心，并不是以标识语言为重点。因而YAML本身的定义比较简单，号称&quot;一种人性化的数据格式语言&quot;。</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>heima</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>age</span><span class="token punctuation">&gt;</span></span>15<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>age</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>address</span><span class="token punctuation">&gt;</span></span>Beijing<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>address</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>heima</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">heima</span><span class="token punctuation">:</span>
  <span class="token key atrule">age</span><span class="token punctuation">:</span> <span class="token number">15</span>
  <span class="token key atrule">address</span><span class="token punctuation">:</span> Beijing
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>YAML的语法比较简单，主要有下面几个：</p><ul><li>大小写敏感</li><li>使用缩进表示层级关系</li><li>缩进不允许使用tab，只允许空格( 低版本限制 )</li><li>缩进的空格数不重要，只要相同层级的元素左对齐即可</li><li>&#39;#&#39;表示注释</li></ul><p>YAML支持以下几种数据类型：</p><ul><li>纯量：单个的、不可再分的值</li><li>对象：键值对的集合，又称为映射（mapping）/ 哈希（hash） / 字典（dictionary）</li><li>数组：一组按次序排列的值，又称为序列（sequence） / 列表（list）</li></ul><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># 纯量, 就是指的一个简单的值，字符串、布尔值、整数、浮点数、Null、时间、日期</span>
<span class="token comment"># 1 布尔类型</span>
<span class="token key atrule">c1</span><span class="token punctuation">:</span> true (或者True)
<span class="token comment"># 2 整型</span>
<span class="token key atrule">c2</span><span class="token punctuation">:</span> <span class="token number">234</span>
<span class="token comment"># 3 浮点型</span>
<span class="token key atrule">c3</span><span class="token punctuation">:</span> <span class="token number">3.14</span>
<span class="token comment"># 4 null类型 </span>
<span class="token key atrule">c4</span><span class="token punctuation">:</span> <span class="token null important">~</span>  <span class="token comment"># 使用~表示null</span>
<span class="token comment"># 5 日期类型</span>
<span class="token key atrule">c5</span><span class="token punctuation">:</span> <span class="token datetime number">2018-02-17</span>    <span class="token comment"># 日期必须使用ISO 8601格式，即yyyy-MM-dd</span>
<span class="token comment"># 6 时间类型</span>
<span class="token key atrule">c6</span><span class="token punctuation">:</span> <span class="token datetime number">2018-02-17T15:02:31+08:00</span>  <span class="token comment"># 时间使用ISO 8601格式，时间和日期之间使用T连接，最后使用+代表时区</span>
<span class="token comment"># 7 字符串类型</span>
<span class="token key atrule">c7</span><span class="token punctuation">:</span> heima     <span class="token comment"># 简单写法，直接写值 , 如果字符串中间有特殊字符，必须使用双引号或者单引号包裹 </span>
<span class="token key atrule">c8</span><span class="token punctuation">:</span> line1
    line2     <span class="token comment"># 字符串过多的情况可以拆成多行，每一行会被转化成一个空格</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># 对象</span>
<span class="token comment"># 形式一(推荐):</span>
<span class="token key atrule">heima</span><span class="token punctuation">:</span>
  <span class="token key atrule">age</span><span class="token punctuation">:</span> <span class="token number">15</span>
  <span class="token key atrule">address</span><span class="token punctuation">:</span> Beijing
<span class="token comment"># 形式二(了解):</span>
<span class="token key atrule">heima</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token key atrule">age</span><span class="token punctuation">:</span> <span class="token number">15</span><span class="token punctuation">,</span><span class="token key atrule">address</span><span class="token punctuation">:</span> Beijing<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># 数组</span>
<span class="token comment"># 形式一(推荐):</span>
<span class="token key atrule">address</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> 顺义
  <span class="token punctuation">-</span> 昌平	
<span class="token comment"># 形式二(了解):</span>
<span class="token key atrule">address</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>顺义<span class="token punctuation">,</span>昌平<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>小提示：</p><p>​ 1 书写yaml切记<code>:</code> 后面要加一个空格</p><p>​ 2 如果需要将多段yaml配置放在一个文件中，中间要使用<code>---</code>分隔</p><p>​ 3 下面是一个yaml转json的网站，可以通过它验证yaml是否书写正确</p><p>​ https://www.json2yaml.com/convert-yaml-to-json</p></blockquote><h2 id="资源管理方式" tabindex="-1"><a class="header-anchor" href="#资源管理方式" aria-hidden="true">#</a> 资源管理方式</h2><ul><li><p>命令式对象管理：直接使用命令去操作kubernetes资源</p><p><code>kubectl run nginx-pod --image=nginx:1.17.1 --port=80</code></p></li><li><p>命令式对象配置：通过命令配置和配置文件去操作kubernetes资源</p><p><code>kubectl create/patch -f nginx-pod.yaml</code></p></li><li><p>声明式对象配置：通过apply命令和配置文件去操作kubernetes资源</p><p><code>kubectl apply -f nginx-pod.yaml</code></p></li></ul><table><thead><tr><th>类型</th><th>操作对象</th><th>适用环境</th><th>优点</th><th>缺点</th></tr></thead><tbody><tr><td>命令式对象管理</td><td>对象</td><td>测试</td><td>简单</td><td>只能操作活动对象，无法审计、跟踪</td></tr><tr><td>命令式对象配置</td><td>文件</td><td>开发</td><td>可以审计、跟踪</td><td>项目大时，配置文件多，操作麻烦</td></tr><tr><td>声明式对象配置</td><td>目录</td><td>开发</td><td>支持目录操作</td><td>意外情况下难以调试</td></tr></tbody></table><h3 id="命令式对象管理" tabindex="-1"><a class="header-anchor" href="#命令式对象管理" aria-hidden="true">#</a> 命令式对象管理</h3><p><strong>kubectl命令</strong></p><p>​ kubectl是kubernetes集群的命令行工具，通过它能够对集群本身进行管理，并能够在集群上进行容器化应用的安装部署。kubectl命令的语法如下：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>kubectl <span class="token url">[<span class="token content">command</span>] [<span class="token variable">type</span>]</span> <span class="token url">[<span class="token content">name</span>] [<span class="token variable">flags</span>]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>comand</strong>：指定要对资源执行的操作，例如create、get、delete</p><p><strong>type</strong>：指定资源类型，比如deployment、pod、service</p><p><strong>name</strong>：指定资源的名称，名称大小写敏感</p><p><strong>flags</strong>：指定额外的可选参数</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 查看所有pod</span>
kubectl get pod 

<span class="token comment"># 查看某个pod</span>
kubectl get pod pod_name

<span class="token comment"># 查看某个pod,以yaml格式展示结果</span>
kubectl get pod pod_name <span class="token operator">-</span>o yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>资源类型</strong></p><p>kubernetes中所有的内容都抽象为资源，可以通过下面的命令进行查看:</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>kubectl api-resources
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>经常使用的资源有下面这些：</p><p>&lt;table&gt; &lt;tr&gt; &lt;th&gt;资源分类&lt;/th&gt; &lt;th&gt;资源名称&lt;/th&gt; &lt;th&gt;缩写&lt;/th&gt; &lt;th&gt;资源作用&lt;/th&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td rowspan=&quot;2&quot;&gt;集群级别资源&lt;/td&gt; &lt;td&gt;nodes&lt;/td&gt; &lt;td&gt;no&lt;/td&gt; &lt;td&gt;集群组成部分&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;namespaces&lt;/td&gt; &lt;td&gt;ns&lt;/td&gt; &lt;td&gt;隔离Pod&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;pod资源&lt;/td&gt; &lt;td&gt;pods&lt;/td&gt; &lt;td&gt;po&lt;/td&gt; &lt;td&gt;装载容器&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td rowspan=&quot;8&quot;&gt;pod资源控制器&lt;/td&gt; &lt;td&gt;replicationcontrollers&lt;/td&gt; &lt;td&gt;rc&lt;/td&gt; &lt;td&gt;控制pod资源&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;replicasets&lt;/td&gt; &lt;td&gt;rs&lt;/td&gt; &lt;td&gt;控制pod资源&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;deployments&lt;/td&gt; &lt;td&gt;deploy&lt;/td&gt; &lt;td&gt;控制pod资源&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;daemonsets&lt;/td&gt; &lt;td&gt;ds&lt;/td&gt; &lt;td&gt;控制pod资源&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;jobs&lt;/td&gt; &lt;td&gt;&lt;/td&gt; &lt;td&gt;控制pod资源&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;cronjobs&lt;/td&gt; &lt;td&gt;cj&lt;/td&gt; &lt;td&gt;控制pod资源&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;horizontalpodautoscalers&lt;/td&gt; &lt;td&gt;hpa&lt;/td&gt; &lt;td&gt;控制pod资源&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;statefulsets&lt;/td&gt; &lt;td&gt;sts&lt;/td&gt; &lt;td&gt;控制pod资源&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td rowspan=&quot;2&quot;&gt;服务发现资源&lt;/td&gt; &lt;td&gt;services&lt;/td&gt; &lt;td&gt;svc&lt;/td&gt; &lt;td&gt;统一pod对外接口&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;ingress&lt;/td&gt; &lt;td&gt;ing&lt;/td&gt; &lt;td&gt;统一pod对外接口&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td rowspan=&quot;3&quot;&gt;存储资源&lt;/td&gt; &lt;td&gt;volumeattachments&lt;/td&gt; &lt;td&gt;&lt;/td&gt; &lt;td&gt;存储&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;persistentvolumes&lt;/td&gt; &lt;td&gt;pv&lt;/td&gt; &lt;td&gt;存储&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;persistentvolumeclaims&lt;/td&gt; &lt;td&gt;pvc&lt;/td&gt; &lt;td&gt;存储&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td rowspan=&quot;2&quot;&gt;配置资源&lt;/td&gt; &lt;td&gt;configmaps&lt;/td&gt; &lt;td&gt;cm&lt;/td&gt; &lt;td&gt;配置&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;secrets&lt;/td&gt; &lt;td&gt;&lt;/td&gt; &lt;td&gt;配置&lt;/td&gt; &lt;/tr&gt; &lt;/table&gt;</p><p><strong>操作</strong></p><p>kubernetes允许对资源进行多种操作，可以通过--help查看详细的操作命令</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>kubectl <span class="token operator">--</span>help
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>经常使用的操作有下面这些：</p><p>&lt;table&gt; &lt;tr&gt; &lt;th&gt;命令分类&lt;/th&gt; &lt;th&gt;命令&lt;/th&gt; &lt;th&gt;翻译&lt;/th&gt; &lt;th&gt;命令作用&lt;/th&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td rowspan=&quot;6&quot;&gt;基本命令&lt;/td&gt; &lt;td&gt;create&lt;/td&gt; &lt;td&gt;创建&lt;/td&gt; &lt;td&gt;创建一个资源&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;edit&lt;/td&gt; &lt;td&gt;编辑&lt;/td&gt; &lt;td&gt;编辑一个资源&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;get&lt;/td&gt; &lt;td&gt;获取&lt;/td&gt; &lt;td&gt;获取一个资源&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;patch&lt;/td&gt; &lt;td&gt;更新&lt;/td&gt; &lt;td&gt;更新一个资源&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;delete&lt;/td&gt; &lt;td&gt;删除&lt;/td&gt; &lt;td&gt;删除一个资源&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;explain&lt;/td&gt; &lt;td&gt;解释&lt;/td&gt; &lt;td&gt;展示资源文档&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td rowspan=&quot;10&quot;&gt;运行和调试&lt;/td&gt; &lt;td&gt;run&lt;/td&gt; &lt;td&gt;运行&lt;/td&gt; &lt;td&gt;在集群中运行一个指定的镜像&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;expose&lt;/td&gt; &lt;td&gt;暴露&lt;/td&gt; &lt;td&gt;暴露资源为Service&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;describe&lt;/td&gt; &lt;td&gt;描述&lt;/td&gt; &lt;td&gt;显示资源内部信息&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;logs&lt;/td&gt; &lt;td&gt;日志&lt;/td&gt; &lt;td&gt;输出容器在 pod 中的日志&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;attach&lt;/td&gt; &lt;td&gt;缠绕&lt;/td&gt; &lt;td&gt;进入运行中的容器&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;exec&lt;/td&gt; &lt;td&gt;执行&lt;/td&gt; &lt;td&gt;执行容器中的一个命令&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;cp&lt;/td&gt; &lt;td&gt;复制&lt;/td&gt; &lt;td&gt;在Pod内外复制文件&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;rollout&lt;/td&gt; &lt;td&gt;首次展示&lt;/td&gt; &lt;td&gt;管理资源的发布&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;scale&lt;/td&gt; &lt;td&gt;规模&lt;/td&gt; &lt;td&gt;扩(缩)容Pod的数量&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;autoscale&lt;/td&gt; &lt;td&gt;自动调整&lt;/td&gt; &lt;td&gt;自动调整Pod的数量&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td rowspan=&quot;2&quot;&gt;高级命令&lt;/td&gt; &lt;td&gt;apply&lt;/td&gt; &lt;td&gt;rc&lt;/td&gt; &lt;td&gt;通过文件对资源进行配置&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;label&lt;/td&gt; &lt;td&gt;标签&lt;/td&gt; &lt;td&gt;更新资源上的标签&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td rowspan=&quot;2&quot;&gt;其他命令&lt;/td&gt; &lt;td&gt;cluster-info&lt;/td&gt; &lt;td&gt;集群信息&lt;/td&gt; &lt;td&gt;显示集群信息&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;version&lt;/td&gt; &lt;td&gt;版本&lt;/td&gt; &lt;td&gt;显示当前Server和Client的版本&lt;/td&gt; &lt;/tr&gt; &lt;/table&gt;</p><p>下面以一个namespace / pod的创建和删除简单演示下命令的使用：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 创建一个namespace</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl create namespace dev</span>
namespace/dev created

<span class="token comment"># 获取namespace</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get ns</span>
NAME              STATUS   AGE
default           Active   21h
dev               Active   21s
kube-node-lease   Active   21h
kube-public       Active   21h
kube-system       Active   21h

<span class="token comment"># 在此namespace下创建并运行一个nginx的Pod</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl run pod --image=nginx -n dev</span>
kubectl run <span class="token operator">--</span>generator=deployment/apps<span class="token punctuation">.</span>v1 is DEPRECATED and will be removed in a future version<span class="token punctuation">.</span> Use kubectl run <span class="token operator">--</span>generator=run-pod/v1 or kubectl create instead<span class="token punctuation">.</span>
deployment<span class="token punctuation">.</span>apps/pod created

<span class="token comment"># 查看新创建的pod</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get pod -n dev</span>
NAME                   READY   STATUS    RESTARTS   AGE
pod-864f9875b9-pcw7x   1/1     Running   0          21s

<span class="token comment"># 删除指定的pod</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl delete pod pod-864f9875b9-pcw7x</span>
pod <span class="token string">&quot;pod-864f9875b9-pcw7x&quot;</span> deleted

<span class="token comment"># 删除指定的namespace</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl delete ns dev</span>
namespace <span class="token string">&quot;dev&quot;</span> deleted
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="命令式对象配置" tabindex="-1"><a class="header-anchor" href="#命令式对象配置" aria-hidden="true">#</a> 命令式对象配置</h3><p>命令式对象配置就是使用命令配合配置文件一起来操作kubernetes资源。</p><p>1） 创建一个nginxpod.yaml，内容如下：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Namespace
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> dev

<span class="token punctuation">---</span>

<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginxpod
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>containers
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.17.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2）执行create命令，创建资源：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl create -f nginxpod.yaml</span>
namespace/dev created
pod/nginxpod created
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时发现创建了两个资源对象，分别是namespace和pod</p><p>3）执行get命令，查看资源：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token namespace">[root@master ~]</span><span class="token comment">#  kubectl get -f nginxpod.yaml</span>
NAME            STATUS   AGE
namespace/dev   Active   18s

NAME            READY   STATUS    RESTARTS   AGE
pod/nginxpod    1/1     Running   0          17s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样就显示了两个资源对象的信息</p><p>4）执行delete命令，删除资源：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl delete -f nginxpod.yaml</span>
namespace <span class="token string">&quot;dev&quot;</span> deleted
pod <span class="token string">&quot;nginxpod&quot;</span> deleted
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时发现两个资源对象被删除了</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>总结:
	命令式对象配置的方式操作资源，可以简单的认为：命令  +  yaml配置文件（里面是命令需要的各种参数）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="声明式对象配置" tabindex="-1"><a class="header-anchor" href="#声明式对象配置" aria-hidden="true">#</a> 声明式对象配置</h3><p>声明式对象配置跟命令式对象配置很相似，但是它只有一个命令apply。</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 首先执行一次kubectl apply -f yaml文件，发现创建了资源</span>
<span class="token namespace">[root@master ~]</span><span class="token comment">#  kubectl apply -f nginxpod.yaml</span>
namespace/dev created
pod/nginxpod created

<span class="token comment"># 再次执行一次kubectl apply -f yaml文件，发现说资源没有变动</span>
<span class="token namespace">[root@master ~]</span><span class="token comment">#  kubectl apply -f nginxpod.yaml</span>
namespace/dev unchanged
pod/nginxpod unchanged
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>总结:
    其实声明式对象配置就是使用apply描述一个资源最终的状态（在yaml中定义状态）
	使用apply操作资源：
        如果资源不存在，就创建，相当于 kubectl create
		如果资源已存在，就更新，相当于 kubectl patch
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>扩展：kubectl可以在node节点上运行吗 ?</p></blockquote><p>​ kubectl的运行是需要进行配置的，它的配置文件是$HOME/.kube，如果想要在node节点运行此命令，需要将master上的.kube文件复制到node节点上，即在master节点上执行下面操作：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>scp  <span class="token operator">-</span>r  HOME/<span class="token punctuation">.</span>kube   node1: HOME/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>使用推荐: 三种方式应该怎么用 ?</p></blockquote><p>创建/更新资源 使用声明式对象配置 kubectl apply -f XXX.yaml</p><p>删除资源 使用命令式对象配置 kubectl delete -f XXX.yaml</p><p>查询资源 使用命令式对象管理 kubectl get(describe) 资源名称</p>`,175),r=[c];function u(m,v){return s(),e("div",null,r)}const k=n(o,[["render",u],["__file","instruction.html.vue"]]);export{k as default};
