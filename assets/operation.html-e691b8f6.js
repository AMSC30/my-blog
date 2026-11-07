import{_ as n,p as s,q as e,Y as a}from"./framework-e1bed10d.js";const l="/my-blog/assets/image-20200408194716912-b4a94235.png",t={},i=a(`<h1 id="第二章-实战入门" tabindex="-1"><a class="header-anchor" href="#第二章-实战入门" aria-hidden="true">#</a> 第二章 实战入门</h1><p>本章节将介绍如何在kubernetes集群中部署一个nginx服务，并且能够对其进行访问。</p><h2 id="namespace" tabindex="-1"><a class="header-anchor" href="#namespace" aria-hidden="true">#</a> Namespace</h2><p>​ Namespace是kubernetes系统中的一种非常重要资源，它的主要作用是用来实现<strong>多套环境的资源隔离</strong>或者<strong>多租户的资源隔离</strong>。</p><p>​ 默认情况下，kubernetes集群中的所有的Pod都是可以相互访问的。但是在实际中，可能不想让两个Pod之间进行互相的访问，那此时就可以将两个Pod划分到不同的namespace下。kubernetes通过将集群内部的资源分配到不同的Namespace中，可以形成逻辑上的&quot;组&quot;，以方便不同的组的资源进行隔离使用和管理。</p><p>​ 可以通过kubernetes的授权机制，将不同的namespace交给不同租户进行管理，这样就实现了多租户的资源隔离。此时还能结合kubernetes的资源配额机制，限定不同租户能占用的资源，例如CPU使用量、内存使用量等等，来实现租户可用资源的管理。</p><p>&lt;img src=&quot;./assets/image-20200407100850484.png&quot; alt=&quot;image-20200407100850484&quot; style=&quot;zoom:80%;border:1px solid&quot; /&gt;</p><p>kubernetes在集群启动之后，会默认创建几个namespace</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl  get namespace</span>
NAME              STATUS   AGE
default           Active   45h     <span class="token comment">#  所有未指定Namespace的对象都会被分配在default命名空间</span>
kube-node-lease   Active   45h     <span class="token comment">#  集群节点之间的心跳维护，v1.13开始引入</span>
kube-public       Active   45h     <span class="token comment">#  此命名空间下的资源可以被所有人访问（包括未认证用户）</span>
kube-system       Active   45h     <span class="token comment">#  所有由Kubernetes系统创建的资源都处于这个命名空间</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面来看namespace资源的具体操作：</p><p><strong>查看</strong></p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 1 查看所有的ns  命令：kubectl get ns</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get ns</span>
NAME              STATUS   AGE
default           Active   45h
kube-node-lease   Active   45h
kube-public       Active   45h     
kube-system       Active   45h     

<span class="token comment"># 2 查看指定的ns   命令：kubectl get ns ns名称</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get ns default</span>
NAME      STATUS   AGE
default   Active   45h

<span class="token comment"># 3 指定输出格式  命令：kubectl get ns ns名称  -o 格式参数</span>
<span class="token comment"># kubernetes支持的格式有很多，比较常见的是wide、json、yaml</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get ns default -o yaml</span>
apiVersion: v1
kind: Namespace
metadata:
  creationTimestamp: <span class="token string">&quot;2020-04-05T04:44:16Z&quot;</span>
  name: default
  resourceVersion: <span class="token string">&quot;151&quot;</span>
  selfLink: <span class="token operator">/</span>api/v1/namespaces/default
  uid: 7405f73a-e486-43d4-9db6-145f1409f090
spec:
  finalizers:
  <span class="token operator">-</span> kubernetes
status:
  phase: Active
  
<span class="token comment"># 4 查看ns详情  命令：kubectl describe ns ns名称</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl describe ns default</span>
Name:         default
Labels:       &lt;none&gt;
Annotations:  &lt;none&gt;
Status:       Active  <span class="token comment"># Active 命名空间正在使用中  Terminating 正在删除命名空间</span>

<span class="token comment"># ResourceQuota 针对namespace做的资源限制</span>
<span class="token comment"># LimitRange针对namespace中的每个组件做的资源限制</span>
No resource quota<span class="token punctuation">.</span>
No LimitRange resource<span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>创建</strong></p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 创建namespace</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl create ns dev</span>
namespace/dev created
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>删除</strong></p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 删除namespace</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl delete ns dev</span>
namespace <span class="token string">&quot;dev&quot;</span> deleted
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>配置方式</strong></p><p>首先准备一个yaml文件：ns-dev.yaml</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Namespace
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后就可以执行对应的创建和删除命令了：</p><p>​ 创建：kubectl create -f ns-dev.yaml</p><p>​ 删除：kubectl delete -f ns-dev.yaml</p><h2 id="pod" tabindex="-1"><a class="header-anchor" href="#pod" aria-hidden="true">#</a> Pod</h2><p>Pod是kubernetes集群进行管理的最小单元，程序要运行必须部署在容器中，而容器必须存在于Pod中。</p><p>Pod可以认为是容器的封装，一个Pod中可以存在一个或者多个容器。</p><p>&lt;img src=&quot;./assets/image-20200407121501907.png&quot; alt=&quot;image-20200407121501907&quot; style=&quot;zoom:80%;&quot; /&gt;</p><p>kubernetes在集群启动之后，集群中的各个组件也都是以Pod方式运行的。可以通过下面命令查看：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get pod -n kube-system</span>
NAMESPACE     NAME                             READY   STATUS    RESTARTS   AGE
kube-system   coredns-6955765f44-68g6v         1/1     Running   0          2d1h
kube-system   coredns-6955765f44-cs5r8         1/1     Running   0          2d1h
kube-system   etcd-master                      1/1     Running   0          2d1h
kube-system   kube-apiserver-master            1/1     Running   0          2d1h
kube-system   kube-controller-manager-master   1/1     Running   0          2d1h
kube-system   kube-flannel-ds-amd64-47r25      1/1     Running   0          2d1h
kube-system   kube-flannel-ds-amd64-ls5lh      1/1     Running   0          2d1h
kube-system   kube-proxy-685tk                 1/1     Running   0          2d1h
kube-system   kube-proxy-87spt                 1/1     Running   0          2d1h
kube-system   kube-scheduler-master            1/1     Running   0          2d1h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>创建并运行</strong></p><p>kubernetes没有提供单独运行Pod的命令，都是通过Pod控制器来实现的</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 命令格式： kubectl run (pod控制器名称) [参数] </span>
<span class="token comment"># --image  指定Pod的镜像</span>
<span class="token comment"># --port   指定端口</span>
<span class="token comment"># --namespace  指定namespace</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl run nginx --image=nginx:1.17.1 --port=80 --namespace dev </span>
deployment<span class="token punctuation">.</span>apps/nginx created
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>查看pod信息</strong></p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 查看Pod基本信息</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get pods -n dev</span>
NAME                     READY   STATUS    RESTARTS   AGE
nginx-5ff7956ff6-fg2db   1/1     Running   0          43s

<span class="token comment"># 查看Pod的详细信息</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl describe pod nginx-5ff7956ff6-fg2db -n dev</span>
Name:         nginx-5ff7956ff6-fg2db
Namespace:    dev
Priority:     0
Node:         node1/192<span class="token punctuation">.</span>168<span class="token punctuation">.</span>109<span class="token punctuation">.</span>101
<span class="token function">Start</span> Time:   Wed<span class="token punctuation">,</span> 08 Apr 2020 09:29:24 <span class="token operator">+</span>0800
Labels:       pod-template-hash=5ff7956ff6
              run=nginx
Annotations:  &lt;none&gt;
Status:       Running
IP:           10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>23
IPs:
  IP:           10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>23
Controlled By:  ReplicaSet/nginx-5ff7956ff6
Containers:
  nginx:
    Container ID:   docker:<span class="token operator">/</span><span class="token operator">/</span>4c62b8c0648d2512380f4ffa5da2c99d16e05634979973449c98e9b829f6253c
    Image:          nginx:1<span class="token punctuation">.</span>17<span class="token punctuation">.</span>1
    Image ID:       docker-pullable:<span class="token operator">/</span><span class="token operator">/</span>nginx@sha256:485b610fefec7ff6c463ced9623314a04ed67e3945b9c08d7e53a47f6d108dc7
    Port:           80/TCP
    Host Port:      0/TCP
    State:          Running
      Started:      Wed<span class="token punctuation">,</span> 08 Apr 2020 09:30:01 <span class="token operator">+</span>0800
    Ready:          True
    Restart Count:  0
    Environment:    &lt;none&gt;
    Mounts:
      <span class="token operator">/</span><span class="token keyword">var</span><span class="token operator">/</span>run/secrets/kubernetes<span class="token punctuation">.</span>io/serviceaccount <span class="token keyword">from</span> default-token-hwvvw <span class="token punctuation">(</span>ro<span class="token punctuation">)</span>
Conditions:
  <span class="token function">Type</span>              Status
  Initialized       True
  Ready             True
  ContainersReady   True
  PodScheduled      True
Volumes:
  default-token-hwvvw:
    <span class="token function">Type</span>:        Secret <span class="token punctuation">(</span>a volume populated by a Secret<span class="token punctuation">)</span>
    SecretName:  default-token-hwvvw
    Optional:    false
QoS <span class="token keyword">Class</span>:       BestEffort
Node-Selectors:  &lt;none&gt;
Tolerations:     node<span class="token punctuation">.</span>kubernetes<span class="token punctuation">.</span>io/not-ready:NoExecute <span class="token keyword">for</span> 300s
                 node<span class="token punctuation">.</span>kubernetes<span class="token punctuation">.</span>io/unreachable:NoExecute <span class="token keyword">for</span> 300s
Events:
  <span class="token function">Type</span>    Reason     Age        <span class="token keyword">From</span>               Message
  <span class="token operator">--</span><span class="token operator">--</span>    <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>     <span class="token operator">--</span><span class="token operator">--</span>       <span class="token operator">--</span><span class="token operator">--</span>               <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>
  Normal  Scheduled  &lt;unknown&gt;  default-scheduler  Successfully assigned dev/nginx-5ff7956ff6-fg2db to node1
  Normal  Pulling    4m11s      kubelet<span class="token punctuation">,</span> node1     Pulling image <span class="token string">&quot;nginx:1.17.1&quot;</span>
  Normal  Pulled     3m36s      kubelet<span class="token punctuation">,</span> node1     Successfully pulled image <span class="token string">&quot;nginx:1.17.1&quot;</span>
  Normal  Created    3m36s      kubelet<span class="token punctuation">,</span> node1     Created container nginx
  Normal  Started    3m36s      kubelet<span class="token punctuation">,</span> node1     Started container nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>访问Pod</strong></p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 获取podIP</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get pods -n dev -o wide</span>
NAME                     READY   STATUS    RESTARTS   AGE    IP             NODE    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> 
nginx-5ff7956ff6-fg2db   1/1     Running   0          190s   10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>23   node1   <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

<span class="token comment">#访问POD</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># curl http://10.244.1.23:80</span>
&lt;<span class="token operator">!</span>DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
	&lt;title&gt;Welcome to nginx!&lt;<span class="token operator">/</span>title&gt;
&lt;<span class="token operator">/</span>head&gt;
&lt;body&gt;
	&lt;p&gt;&lt;em&gt;Thank you <span class="token keyword">for</span> <span class="token keyword">using</span> nginx<span class="token punctuation">.</span>&lt;<span class="token operator">/</span>em&gt;&lt;<span class="token operator">/</span>p&gt;
&lt;<span class="token operator">/</span>body&gt;
&lt;<span class="token operator">/</span>html&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>删除指定Pod</strong></p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 删除指定Pod</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl delete pod nginx-5ff7956ff6-fg2db -n dev</span>
pod <span class="token string">&quot;nginx-5ff7956ff6-fg2db&quot;</span> deleted

<span class="token comment"># 此时，显示删除Pod成功，但是再查询，发现又新产生了一个 </span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get pods -n dev</span>
NAME                     READY   STATUS    RESTARTS   AGE
nginx-5ff7956ff6-jj4ng   1/1     Running   0          21s

<span class="token comment"># 这是因为当前Pod是由Pod控制器创建的，控制器会监控Pod状况，一旦发现Pod死亡，会立即重建</span>
<span class="token comment"># 此时要想删除Pod，必须删除Pod控制器</span>

<span class="token comment"># 先来查询一下当前namespace下的Pod控制器</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get deploy -n  dev</span>
NAME    READY   UP-TO-DATE   AVAILABLE   AGE
nginx   1/1     1            1           9m7s

<span class="token comment"># 接下来，删除此PodPod控制器</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl delete deploy nginx -n dev</span>
deployment<span class="token punctuation">.</span>apps <span class="token string">&quot;nginx&quot;</span> deleted

<span class="token comment"># 稍等片刻，再查询Pod，发现Pod被删除了</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get pods -n dev</span>
No resources found in dev namespace<span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>配置操作</strong></p><p>创建一个pod-nginx.yaml，内容如下：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.17.1
    <span class="token key atrule">name</span><span class="token punctuation">:</span> pod
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>port
      <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
      <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后就可以执行对应的创建和删除命令了：</p><p>​ 创建：kubectl create -f pod-nginx.yaml</p><p>​ 删除：kubectl delete -f pod-nginx.yaml</p><h2 id="label" tabindex="-1"><a class="header-anchor" href="#label" aria-hidden="true">#</a> Label</h2><p>Label是kubernetes系统中的一个重要概念。它的作用就是在资源上添加标识，用来对它们进行区分和选择。</p><p>Label的特点：</p><ul><li>一个Label会以key/value键值对的形式附加到各种对象上，如Node、Pod、Service等等</li><li>一个资源对象可以定义任意数量的Label ，同一个Label也可以被添加到任意数量的资源对象上去</li><li>Label通常在资源对象定义时确定，当然也可以在对象创建后动态添加或者删除</li></ul><p>可以通过Label实现资源的多维度分组，以便灵活、方便地进行资源分配、调度、配置、部署等管理工作。</p><blockquote><p>一些常用的Label 示例如下：</p><ul><li>版本标签：&quot;version&quot;:&quot;release&quot;, &quot;version&quot;:&quot;stable&quot;......</li><li>环境标签：&quot;environment&quot;:&quot;dev&quot;，&quot;environment&quot;:&quot;test&quot;，&quot;environment&quot;:&quot;pro&quot;</li><li>架构标签：&quot;tier&quot;:&quot;frontend&quot;，&quot;tier&quot;:&quot;backend&quot;</li></ul></blockquote><p>标签定义完毕之后，还要考虑到标签的选择，这就要使用到Label Selector，即：</p><p>​ Label用于给某个资源对象定义标识</p><p>​ Label Selector用于查询和筛选拥有某些标签的资源对象</p><p>当前有两种Label Selector：</p><ul><li><p>基于等式的Label Selector</p><p>name = slave: 选择所有包含Label中key=&quot;name&quot;且value=&quot;slave&quot;的对象</p><p>env != production: 选择所有包括Label中的key=&quot;env&quot;且value不等于&quot;production&quot;的对象</p></li><li><p>基于集合的Label Selector</p><p>name in (master, slave): 选择所有包含Label中的key=&quot;name&quot;且value=&quot;master&quot;或&quot;slave&quot;的对象</p><p>name not in (frontend): 选择所有包含Label中的key=&quot;name&quot;且value不等于&quot;frontend&quot;的对象</p></li></ul><p>标签的选择条件可以使用多个，此时将多个Label Selector进行组合，使用逗号&quot;,&quot;进行分隔即可。例如：</p><p>​ name=slave，env!=production</p><p>​ name not in (frontend)，env!=production</p><p><strong>命令方式</strong></p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 为pod资源打标签</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl label pod nginx-pod version=1.0 -n dev</span>
pod/nginx-pod labeled

<span class="token comment"># 为pod资源更新标签</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl label pod nginx-pod version=2.0 -n dev --overwrite</span>
pod/nginx-pod labeled

<span class="token comment"># 查看标签</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get pod nginx-pod  -n dev --show-labels</span>
NAME        READY   STATUS    RESTARTS   AGE   LABELS
nginx-pod   1/1     Running   0          10m   version=2<span class="token punctuation">.</span>0

<span class="token comment"># 筛选标签</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get pod -n dev -l version=2.0  --show-labels</span>
NAME        READY   STATUS    RESTARTS   AGE   LABELS
nginx-pod   1/1     Running   0          17m   version=2<span class="token punctuation">.</span>0
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get pod -n dev -l version!=2.0 --show-labels</span>
No resources found in dev namespace<span class="token punctuation">.</span>

<span class="token comment">#删除标签</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl label pod nginx-pod version- -n dev</span>
pod/nginx-pod labeled
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>配置方式</strong></p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&quot;3.0&quot;</span> 
    <span class="token key atrule">env</span><span class="token punctuation">:</span> <span class="token string">&quot;test&quot;</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.17.1
    <span class="token key atrule">name</span><span class="token punctuation">:</span> pod
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>port
      <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
      <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后就可以执行对应的更新命令了：kubectl apply -f pod-nginx.yaml</p><h2 id="deployment" tabindex="-1"><a class="header-anchor" href="#deployment" aria-hidden="true">#</a> Deployment</h2><p>​ 在kubernetes中，Pod是最小的控制单元，但是kubernetes很少直接控制Pod，一般都是通过Pod控制器来完成的。Pod控制器用于pod的管理，确保pod资源符合预期的状态，当pod的资源出现故障时，会尝试进行重启或重建pod。</p><p>​ 在kubernetes中Pod控制器的种类有很多，本章节只介绍一种：Deployment。</p><p>&lt;img src=&quot;./assets/image-20200408193950807.png&quot; alt=&quot;image-20200408193950807&quot; style=&quot;border: 1px solid; zoom: 80%;&quot; /&gt;</p><p><strong>命令操作</strong></p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 命令格式: kubectl run deployment名称  [参数] </span>
<span class="token comment"># --image  指定pod的镜像</span>
<span class="token comment"># --port   指定端口</span>
<span class="token comment"># --replicas  指定创建pod数量</span>
<span class="token comment"># --namespace  指定namespace</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl run nginx --image=nginx:1.17.1 --port=80 --replicas=3 -n dev</span>
deployment<span class="token punctuation">.</span>apps/nginx created

<span class="token comment"># 查看创建的Pod</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get pods -n dev</span>
NAME                     READY   STATUS    RESTARTS   AGE
nginx-5ff7956ff6-6k8cb   1/1     Running   0          19s
nginx-5ff7956ff6-jxfjt   1/1     Running   0          19s
nginx-5ff7956ff6-v6jqw   1/1     Running   0          19s

<span class="token comment"># 查看deployment的信息</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get deploy -n dev</span>
NAME    READY   UP-TO-DATE   AVAILABLE   AGE
nginx   3/3     3            3           2m42s

<span class="token comment"># UP-TO-DATE：成功升级的副本数量</span>
<span class="token comment"># AVAILABLE：可用副本的数量</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get deploy -n dev -o wide</span>
NAME    READY UP-TO-DATE  AVAILABLE   AGE     CONTAINERS   IMAGES              SELECTOR
nginx   3/3     3         3           2m51s   nginx        nginx:1<span class="token punctuation">.</span>17<span class="token punctuation">.</span>1        run=nginx

<span class="token comment"># 查看deployment的详细信息</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl describe deploy nginx -n dev</span>
Name:                   nginx
Namespace:              dev
CreationTimestamp:      Wed<span class="token punctuation">,</span> 08 Apr 2020 11:14:14 <span class="token operator">+</span>0800
Labels:                 run=nginx
Annotations:            deployment<span class="token punctuation">.</span>kubernetes<span class="token punctuation">.</span>io/revision: 1
Selector:               run=nginx
Replicas:               3 desired <span class="token punctuation">|</span> 3 updated <span class="token punctuation">|</span> 3 total <span class="token punctuation">|</span> 3 available <span class="token punctuation">|</span> 0 unavailable
StrategyType:           RollingUpdate
MinReadySeconds:        0
RollingUpdateStrategy:  25% max unavailable<span class="token punctuation">,</span> 25% max surge
Pod Template:
  Labels:  run=nginx
  Containers:
   nginx:
    Image:        nginx:1<span class="token punctuation">.</span>17<span class="token punctuation">.</span>1
    Port:         80/TCP
    Host Port:    0/TCP
    Environment:  &lt;none&gt;
    Mounts:       &lt;none&gt;
  Volumes:        &lt;none&gt;
Conditions:
  <span class="token function">Type</span>           Status  Reason
  <span class="token operator">--</span><span class="token operator">--</span>           <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>  <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>
  Available      True    MinimumReplicasAvailable
  Progressing    True    NewReplicaSetAvailable
OldReplicaSets:  &lt;none&gt;
NewReplicaSet:   nginx-5ff7956ff6 <span class="token punctuation">(</span>3/3 replicas created<span class="token punctuation">)</span>
Events:
  <span class="token function">Type</span>    Reason             Age    <span class="token keyword">From</span>                   Message
  <span class="token operator">--</span><span class="token operator">--</span>    <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>             <span class="token operator">--</span><span class="token operator">--</span>   <span class="token operator">--</span><span class="token operator">--</span>                   <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>
  Normal  ScalingReplicaSet  5m43s  deployment-controller  Scaled up replicaset nginx-5ff7956ff6 to 3
  
<span class="token comment"># 删除 </span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl delete deploy nginx -n dev</span>
deployment<span class="token punctuation">.</span>apps <span class="token string">&quot;nginx&quot;</span> deleted
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>配置操作</strong></p><p>创建一个deploy-nginx.yaml，内容如下：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">3</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">run</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">run</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.17.1
        <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
          <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后就可以执行对应的创建和删除命令了：</p><p>​ 创建：kubectl create -f deploy-nginx.yaml</p><p>​ 删除：kubectl delete -f deploy-nginx.yaml</p><h2 id="service" tabindex="-1"><a class="header-anchor" href="#service" aria-hidden="true">#</a> Service</h2><p>通过上节课的学习，已经能够利用Deployment来创建一组Pod来提供具有高可用性的服务。</p><p>虽然每个Pod都会分配一个单独的Pod IP，然而却存在如下两问题：</p><ul><li>Pod IP 会随着Pod的重建产生变化</li><li>Pod IP 仅仅是集群内可见的虚拟IP，外部无法访问</li></ul><p>这样对于访问这个服务带来了难度。因此，kubernetes设计了Service来解决这个问题。</p><p>Service可以看作是一组同类Pod<strong>对外的访问接口</strong>。借助Service，应用可以方便地实现服务发现和负载均衡。</p><p><img src="`+l+`" alt="image-20200408194716912"></p><p><strong>操作一：创建集群内部可访问的Service</strong></p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 暴露Service</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl expose deploy nginx --name=svc-nginx1 --type=ClusterIP --port=80 --target-port=80 -n dev</span>
service/svc-nginx1 exposed

<span class="token comment"># 查看service</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get svc svc-nginx -n dev -o wide</span>
NAME         <span class="token function">TYPE</span>        CLUSTER-IP       EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>   AGE     SELECTOR
svc-nginx1   ClusterIP   10<span class="token punctuation">.</span>109<span class="token punctuation">.</span>179<span class="token punctuation">.</span>231   &lt;none&gt;        80/TCP    3m51s   run=nginx

<span class="token comment"># 这里产生了一个CLUSTER-IP，这就是service的IP，在Service的生命周期中，这个地址是不会变动的</span>
<span class="token comment"># 可以通过这个IP访问当前service对应的POD</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># curl 10.109.179.231:80</span>
&lt;<span class="token operator">!</span>DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;title&gt;Welcome to nginx!&lt;<span class="token operator">/</span>title&gt;
&lt;<span class="token operator">/</span>head&gt;
&lt;body&gt;
&lt;h1&gt;Welcome to nginx!&lt;<span class="token operator">/</span>h1&gt;
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
&lt;<span class="token operator">/</span>body&gt;
&lt;<span class="token operator">/</span>html&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>操作二：创建集群外部也可访问的Service</strong></p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 上面创建的Service的type类型为ClusterIP，这个ip地址只用集群内部可访问</span>
<span class="token comment"># 如果需要创建外部也可以访问的Service，需要修改type为NodePort</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl expose deploy nginx --name=svc-nginx2 --type=NodePort --port=80 --target-port=80 -n dev</span>
service/svc-nginx2 exposed

<span class="token comment"># 此时查看，会发现出现了NodePort类型的Service，而且有一对Port（80:31928/TC）</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get svc  svc-nginx-1  -n dev -o wide</span>
NAME          <span class="token function">TYPE</span>        CLUSTER-IP       EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>        AGE    SELECTOR
svc-nginx2    NodePort    10<span class="token punctuation">.</span>100<span class="token punctuation">.</span>94<span class="token punctuation">.</span>0      &lt;none&gt;        80:31928/TCP   9s     run=nginx

<span class="token comment"># 接下来就可以通过集群外的主机访问 节点IP:31928访问服务了</span>
<span class="token comment"># 例如在的电脑主机上通过浏览器访问下面的地址</span>
http:<span class="token operator">/</span><span class="token operator">/</span>192<span class="token punctuation">.</span>168<span class="token punctuation">.</span>109<span class="token punctuation">.</span>100:31928/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>删除Service</strong></p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl delete svc svc-nginx-1 -n dev                                   service &quot;svc-nginx-1&quot; deleted</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>配置方式</strong></p><p>创建一个svc-nginx.yaml，内容如下：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> svc<span class="token punctuation">-</span>nginx
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">clusterIP</span><span class="token punctuation">:</span> 10.109.179.231
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">run</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">type</span><span class="token punctuation">:</span> ClusterIP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后就可以执行对应的创建和删除命令了：</p><p>​ 创建：kubectl create -f svc-nginx.yaml</p><p>​ 删除：kubectl delete -f svc-nginx.yaml</p><blockquote><p><strong>小结</strong></p><p>​ 至此，已经掌握了Namespace、Pod、Deployment、Service资源的基本操作，有了这些操作，就可以在kubernetes集群中实现一个服务的简单部署和访问了，但是如果想要更好的使用kubernetes，就需要深入学习这几种资源的细节和原理。</p></blockquote>`,94),p=[i];function o(c,d){return s(),e("div",null,p)}const r=n(t,[["render",o],["__file","operation.html.vue"]]);export{r as default};
