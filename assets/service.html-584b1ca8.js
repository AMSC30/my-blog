import{_ as n,p as s,q as a,Y as e}from"./framework-e1bed10d.js";const t="/my-blog/assets/image-20200509191917069-534d5f6f.png",p={},l=e(`<h1 id="第五章-service详解" tabindex="-1"><a class="header-anchor" href="#第五章-service详解" aria-hidden="true">#</a> 第五章 Service详解</h1><p>本章节主要介绍kubernetes的流量负载组件：Service和Ingress。</p><h2 id="service介绍" tabindex="-1"><a class="header-anchor" href="#service介绍" aria-hidden="true">#</a> Service介绍</h2><p>​ 在kubernetes中，pod是应用程序的载体，我们可以通过pod的ip来访问应用程序，但是pod的ip地址不是固定的，这也就意味着不方便直接采用pod的ip对服务进行访问。</p><p>​ 为了解决这个问题，kubernetes提供了Service资源，Service会对提供同一个服务的多个pod进行聚合，并且提供一个统一的入口地址。通过访问Service的入口地址就能访问到后面的pod服务。</p><p>&lt;img src=&quot;./assets/image-20200408194716912.png&quot; style=&quot;zoom:100%;border:1px solid&quot; /&gt;</p><p>​ Service在很多情况下只是一个概念，真正起作用的其实是kube-proxy服务进程，每个Node节点上都运行着一个kube-proxy服务进程。当创建Service的时候会通过api-server向etcd写入创建的service的信息，而kube-proxy会基于监听的机制发现这种Service的变动，然后<strong>它会将最新的Service信息转换成对应的访问规则</strong>。</p><p>&lt;img src=&quot;./assets/image-20200509121254425.png&quot; style=&quot;border:1px solid&quot; /&gt;</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 10.97.97.97:80 是service提供的访问入口</span>
<span class="token comment"># 当访问这个入口的时候，可以发现后面有三个pod的服务在等待调用，</span>
<span class="token comment"># kube-proxy会基于rr（轮询）的策略，将请求分发到其中一个pod上去</span>
<span class="token comment"># 这个规则会同时在集群内的所有节点上都生成，所以在任何一个节点上访问都可以。</span>
<span class="token namespace">[root@node1 ~]</span><span class="token comment"># ipvsadm -Ln</span>
IP Virtual Server version 1<span class="token punctuation">.</span>2<span class="token punctuation">.</span>1 <span class="token punctuation">(</span>size=4096<span class="token punctuation">)</span>
Prot LocalAddress:Port Scheduler Flags
  <span class="token operator">-</span>&gt; RemoteAddress:Port           Forward Weight ActiveConn InActConn
TCP  10<span class="token punctuation">.</span>97<span class="token punctuation">.</span>97<span class="token punctuation">.</span>97:80 rr
  <span class="token operator">-</span>&gt; 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>39:80               Masq    1      0          0
  <span class="token operator">-</span>&gt; 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>40:80               Masq    1      0          0
  <span class="token operator">-</span>&gt; 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>2<span class="token punctuation">.</span>33:80               Masq    1      0          0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>kube-proxy目前支持三种工作模式:</p><p><strong>userspace 模式</strong></p><p>​ userspace模式下，kube-proxy会为每一个Service创建一个监听端口，发向Cluster IP的请求被Iptables规则重定向到kube-proxy监听的端口上，kube-proxy根据LB算法选择一个提供服务的Pod并和其建立链接，以将请求转发到Pod上。 ​ 该模式下，kube-proxy充当了一个四层负责均衡器的角色。由于kube-proxy运行在userspace中，在进行转发处理时会增加内核和用户空间之间的数据拷贝，虽然比较稳定，但是效率比较低。</p><p>&lt;img src=&quot;./assets/image-20200509151424280.png&quot; style=&quot;border: 1px solid; zoom: 57%;&quot; /&gt;</p><p><strong>iptables 模式</strong></p><p>​ iptables模式下，kube-proxy为service后端的每个Pod创建对应的iptables规则，直接将发向Cluster IP的请求重定向到一个Pod IP。 ​ 该模式下kube-proxy不承担四层负责均衡器的角色，只负责创建iptables规则。该模式的优点是较userspace模式效率更高，但不能提供灵活的LB策略，当后端Pod不可用时也无法进行重试。</p><p>&lt;img src=&quot;./assets/image-20200509152947714.png&quot; style=&quot;zoom: 57%;&quot; /&gt;</p><p><strong>ipvs 模式</strong></p><p>​ ipvs模式和iptables类似，kube-proxy监控Pod的变化并创建相应的ipvs规则。ipvs相对iptables转发效率更高。除此以外，ipvs支持更多的LB算法。</p><p>&lt;img src=&quot;./assets/image-20200509153731363.png&quot; style=&quot;zoom: 57%&quot; /&gt;</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 此模式必须安装ipvs内核模块，否则会降级为iptables</span>
<span class="token comment"># 开启ipvs</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl edit cm kube-proxy -n kube-system</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl delete pod -l k8s-app=kube-proxy -n kube-system</span>
<span class="token namespace">[root@node1 ~]</span><span class="token comment"># ipvsadm -Ln</span>
IP Virtual Server version 1<span class="token punctuation">.</span>2<span class="token punctuation">.</span>1 <span class="token punctuation">(</span>size=4096<span class="token punctuation">)</span>
Prot LocalAddress:Port Scheduler Flags
  <span class="token operator">-</span>&gt; RemoteAddress:Port           Forward Weight ActiveConn InActConn
TCP  10<span class="token punctuation">.</span>97<span class="token punctuation">.</span>97<span class="token punctuation">.</span>97:80 rr
  <span class="token operator">-</span>&gt; 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>39:80               Masq    1      0          0
  <span class="token operator">-</span>&gt; 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>40:80               Masq    1      0          0
  <span class="token operator">-</span>&gt; 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>2<span class="token punctuation">.</span>33:80               Masq    1      0          0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="service类型" tabindex="-1"><a class="header-anchor" href="#service类型" aria-hidden="true">#</a> Service类型</h2><p>Service的资源清单文件：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">kind</span><span class="token punctuation">:</span> Service  <span class="token comment"># 资源类型</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1  <span class="token comment"># 资源版本</span>
<span class="token key atrule">metadata</span><span class="token punctuation">:</span> <span class="token comment"># 元数据</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> service <span class="token comment"># 资源名称</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev <span class="token comment"># 命名空间</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span> <span class="token comment"># 描述</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span> <span class="token comment"># 标签选择器，用于确定当前service代理哪些pod</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">type</span><span class="token punctuation">:</span> <span class="token comment"># Service类型，指定service的访问方式</span>
  <span class="token key atrule">clusterIP</span><span class="token punctuation">:</span>  <span class="token comment"># 虚拟服务的ip地址</span>
  <span class="token key atrule">sessionAffinity</span><span class="token punctuation">:</span> <span class="token comment"># session亲和性，支持ClientIP、None两个选项</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span> <span class="token comment"># 端口信息</span>
    <span class="token punctuation">-</span> <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP 
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">3017</span>  <span class="token comment"># service端口</span>
      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">5003</span> <span class="token comment"># pod端口</span>
      <span class="token key atrule">nodePort</span><span class="token punctuation">:</span> <span class="token number">31122</span> <span class="token comment"># 主机端口</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>ClusterIP：默认值，它是Kubernetes系统自动分配的虚拟IP，只能在集群内部访问</li><li>NodePort：将Service通过指定的Node上的端口暴露给外部，通过此方法，就可以在集群外部访问服务</li><li>LoadBalancer：使用外接负载均衡器完成到服务的负载分发，注意此模式需要外部云环境支持</li><li>ExternalName： 把集群外部的服务引入集群内部，直接使用</li></ul><h2 id="service使用" tabindex="-1"><a class="header-anchor" href="#service使用" aria-hidden="true">#</a> Service使用</h2><h3 id="实验环境准备" tabindex="-1"><a class="header-anchor" href="#实验环境准备" aria-hidden="true">#</a> 实验环境准备</h3><p>在使用service之前，首先利用Deployment创建出3个pod，注意要为pod设置<code>app=nginx-pod</code>的标签</p><p>创建deployment.yaml，内容如下：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment      
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pc<span class="token punctuation">-</span>deployment
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span> 
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">3</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>pod
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>pod
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
        <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.17.1
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl create -f deployment.yaml</span>
deployment<span class="token punctuation">.</span>apps/pc-deployment created

<span class="token comment"># 查看pod详情</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get pods -n dev -o wide --show-labels</span>
NAME                             READY   STATUS     IP            NODE     LABELS
pc-deployment-66cb59b984-8p84h   1/1     Running    10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>40   node1    app=nginx-pod
pc-deployment-66cb59b984-vx8vx   1/1     Running    10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>2<span class="token punctuation">.</span>33   node2    app=nginx-pod
pc-deployment-66cb59b984-wnncx   1/1     Running    10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>39   node1    app=nginx-pod

<span class="token comment"># 为了方便后面的测试，修改下三台nginx的index.html页面（三台修改的IP地址不一致）</span>
<span class="token comment"># kubectl exec -it pc-deployment-66cb59b984-8p84h -n dev /bin/sh</span>
<span class="token comment"># echo &quot;10.244.1.40&quot; &gt; /usr/share/nginx/html/index.html</span>

<span class="token comment">#修改完毕之后，访问测试</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># curl 10.244.1.40</span>
10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>40
<span class="token namespace">[root@master ~]</span><span class="token comment"># curl 10.244.2.33</span>
10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>2<span class="token punctuation">.</span>33
<span class="token namespace">[root@master ~]</span><span class="token comment"># curl 10.244.1.39</span>
10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>39
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="clusterip类型的service" tabindex="-1"><a class="header-anchor" href="#clusterip类型的service" aria-hidden="true">#</a> ClusterIP类型的Service</h3><p>创建service-clusterip.yaml文件</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> service<span class="token punctuation">-</span>clusterip
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>pod
  <span class="token key atrule">clusterIP</span><span class="token punctuation">:</span> 10.97.97.97 <span class="token comment"># service的ip地址，如果不写，默认会生成一个</span>
  <span class="token key atrule">type</span><span class="token punctuation">:</span> ClusterIP
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>  <span class="token comment"># Service端口       </span>
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">80</span> <span class="token comment"># pod端口</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 创建service</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl create -f service-clusterip.yaml</span>
service/service-clusterip created

<span class="token comment"># 查看service</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get svc -n dev -o wide</span>
NAME                <span class="token function">TYPE</span>        CLUSTER-IP    EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>   AGE   SELECTOR
service-clusterip   ClusterIP   10<span class="token punctuation">.</span>97<span class="token punctuation">.</span>97<span class="token punctuation">.</span>97   &lt;none&gt;        80/TCP    13s   app=nginx-pod

<span class="token comment"># 查看service的详细信息</span>
<span class="token comment"># 在这里有一个Endpoints列表，里面就是当前service可以负载到的服务入口</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl describe svc service-clusterip -n dev</span>
Name:              service-clusterip
Namespace:         dev
Labels:            &lt;none&gt;
Annotations:       &lt;none&gt;
Selector:          app=nginx-pod
<span class="token function">Type</span>:              ClusterIP
IP:                10<span class="token punctuation">.</span>97<span class="token punctuation">.</span>97<span class="token punctuation">.</span>97
Port:              &lt;unset&gt;  80/TCP
TargetPort:        80/TCP
Endpoints:         10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>39:80<span class="token punctuation">,</span>10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>40:80<span class="token punctuation">,</span>10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>2<span class="token punctuation">.</span>33:80
Session Affinity:  None
Events:            &lt;none&gt;

<span class="token comment"># 查看ipvs的映射规则</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># ipvsadm -Ln</span>
TCP  10<span class="token punctuation">.</span>97<span class="token punctuation">.</span>97<span class="token punctuation">.</span>97:80 rr
  <span class="token operator">-</span>&gt; 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>39:80               Masq    1      0          0
  <span class="token operator">-</span>&gt; 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>40:80               Masq    1      0          0
  <span class="token operator">-</span>&gt; 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>2<span class="token punctuation">.</span>33:80               Masq    1      0          0

<span class="token comment"># 访问10.97.97.97:80观察效果</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># curl 10.97.97.97:80</span>
10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>2<span class="token punctuation">.</span>33
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Endpoint</strong></p><p>​ Endpoint是kubernetes中的一个资源对象，存储在etcd中，用来记录一个service对应的所有pod的访问地址，它是根据service配置文件中selector描述产生的。</p><p>​ 一个Service由一组Pod组成，这些Pod通过Endpoints暴露出来，<strong>Endpoints是实现实际服务的端点集合</strong>。换句话说，service和pod之间的联系是通过endpoints实现的。</p><p><img src="`+t+`" alt="image-20200509191917069"></p><p><strong>负载分发策略</strong></p><p>对Service的访问被分发到了后端的Pod上去，目前kubernetes提供了两种负载分发策略：</p><ul><li><p>如果不定义，默认使用kube-proxy的策略，比如随机、轮询</p></li><li><p>基于客户端地址的会话保持模式，即来自同一个客户端发起的所有请求都会转发到固定的一个Pod上</p><p>此模式可以使在spec中添加<code>sessionAffinity:ClientIP</code>选项</p></li></ul><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 查看ipvs的映射规则【rr 轮询】</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># ipvsadm -Ln</span>
TCP  10<span class="token punctuation">.</span>97<span class="token punctuation">.</span>97<span class="token punctuation">.</span>97:80 rr
  <span class="token operator">-</span>&gt; 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>39:80               Masq    1      0          0
  <span class="token operator">-</span>&gt; 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>40:80               Masq    1      0          0
  <span class="token operator">-</span>&gt; 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>2<span class="token punctuation">.</span>33:80               Masq    1      0          0

<span class="token comment"># 循环访问测试</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># while true;do curl 10.97.97.97:80; sleep 5; done;</span>
10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>40
10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>39
10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>2<span class="token punctuation">.</span>33
10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>40
10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>39
10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>2<span class="token punctuation">.</span>33

<span class="token comment"># 修改分发策略----sessionAffinity:ClientIP</span>

<span class="token comment"># 查看ipvs规则【persistent 代表持久】</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># ipvsadm -Ln</span>
TCP  10<span class="token punctuation">.</span>97<span class="token punctuation">.</span>97<span class="token punctuation">.</span>97:80 rr persistent 10800
  <span class="token operator">-</span>&gt; 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>39:80               Masq    1      0          0
  <span class="token operator">-</span>&gt; 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>40:80               Masq    1      0          0
  <span class="token operator">-</span>&gt; 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>2<span class="token punctuation">.</span>33:80               Masq    1      0          0

<span class="token comment"># 循环访问测试</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># while true;do curl 10.97.97.97; sleep 5; done;</span>
10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>2<span class="token punctuation">.</span>33
10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>2<span class="token punctuation">.</span>33
10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>2<span class="token punctuation">.</span>33
  
<span class="token comment"># 删除service</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl delete -f service-clusterip.yaml</span>
service <span class="token string">&quot;service-clusterip&quot;</span> deleted
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="headliness类型的service" tabindex="-1"><a class="header-anchor" href="#headliness类型的service" aria-hidden="true">#</a> HeadLiness类型的Service</h3><p>​ 在某些场景中，开发人员可能不想使用Service提供的负载均衡功能，而希望自己来控制负载均衡策略，针对这种情况，kubernetes提供了HeadLiness Service，这类Service不会分配Cluster IP，如果想要访问service，只能通过service的域名进行查询。</p><p>创建service-headliness.yaml</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> service<span class="token punctuation">-</span>headliness
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>pod
  <span class="token key atrule">clusterIP</span><span class="token punctuation">:</span> None <span class="token comment"># 将clusterIP设置为None，即可创建headliness Service</span>
  <span class="token key atrule">type</span><span class="token punctuation">:</span> ClusterIP
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>    
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 创建service</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl create -f service-headliness.yaml</span>
service/service-headliness created

<span class="token comment"># 获取service， 发现CLUSTER-IP未分配</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get svc service-headliness -n dev -o wide</span>
NAME                 <span class="token function">TYPE</span>        CLUSTER-IP   EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>   AGE   SELECTOR
service-headliness   ClusterIP   None         &lt;none&gt;        80/TCP    11s   app=nginx-pod

<span class="token comment"># 查看service详情</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl describe svc service-headliness  -n dev</span>
Name:              service-headliness
Namespace:         dev
Labels:            &lt;none&gt;
Annotations:       &lt;none&gt;
Selector:          app=nginx-pod
<span class="token function">Type</span>:              ClusterIP
IP:                None
Port:              &lt;unset&gt;  80/TCP
TargetPort:        80/TCP
Endpoints:         10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>39:80<span class="token punctuation">,</span>10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>40:80<span class="token punctuation">,</span>10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>2<span class="token punctuation">.</span>33:80
Session Affinity:  None
Events:            &lt;none&gt;

<span class="token comment"># 查看域名的解析情况</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl exec -it pc-deployment-66cb59b984-8p84h -n dev /bin/sh</span>
<span class="token operator">/</span> <span class="token comment"># cat /etc/resolv.conf</span>
nameserver 10<span class="token punctuation">.</span>96<span class="token punctuation">.</span>0<span class="token punctuation">.</span>10
search dev<span class="token punctuation">.</span>svc<span class="token punctuation">.</span>cluster<span class="token punctuation">.</span>local svc<span class="token punctuation">.</span>cluster<span class="token punctuation">.</span>local cluster<span class="token punctuation">.</span>local

<span class="token namespace">[root@master ~]</span><span class="token comment"># dig @10.96.0.10 service-headliness.dev.svc.cluster.local</span>
service-headliness<span class="token punctuation">.</span>dev<span class="token punctuation">.</span>svc<span class="token punctuation">.</span>cluster<span class="token punctuation">.</span>local<span class="token punctuation">.</span> 30 IN A 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>40
service-headliness<span class="token punctuation">.</span>dev<span class="token punctuation">.</span>svc<span class="token punctuation">.</span>cluster<span class="token punctuation">.</span>local<span class="token punctuation">.</span> 30 IN A 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>39
service-headliness<span class="token punctuation">.</span>dev<span class="token punctuation">.</span>svc<span class="token punctuation">.</span>cluster<span class="token punctuation">.</span>local<span class="token punctuation">.</span> 30 IN A 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>2<span class="token punctuation">.</span>33
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="nodeport类型的service" tabindex="-1"><a class="header-anchor" href="#nodeport类型的service" aria-hidden="true">#</a> NodePort类型的Service</h3><p>​ 在之前的样例中，创建的Service的ip地址只有集群内部才可以访问，如果希望将Service暴露给集群外部使用，那么就要使用到另外一种类型的Service，称为NodePort类型。NodePort的工作原理其实就是<strong>将service的端口映射到Node的一个端口上</strong>，然后就可以通过<code>NodeIp:NodePort</code>来访问service了。</p><p>&lt;img src=&quot;./assets/image-20200620175731338.png&quot; style=&quot;border:1px solid&quot; /&gt;</p><p>创建service-nodeport.yaml</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> service<span class="token punctuation">-</span>nodeport
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>pod
  <span class="token key atrule">type</span><span class="token punctuation">:</span> NodePort <span class="token comment"># service类型</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">nodePort</span><span class="token punctuation">:</span> <span class="token number">30002</span> <span class="token comment"># 指定绑定的node的端口(默认的取值范围是：30000-32767), 如果不指定，会默认分配</span>
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 创建service</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl create -f service-nodeport.yaml</span>
service/service-nodeport created

<span class="token comment"># 查看service</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get svc -n dev -o wide</span>
NAME               <span class="token function">TYPE</span>       CLUSTER-IP      EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>       SELECTOR
service-nodeport   NodePort   10<span class="token punctuation">.</span>105<span class="token punctuation">.</span>64<span class="token punctuation">.</span>191   &lt;none&gt;        80:30002/TCP  app=nginx-pod

<span class="token comment"># 接下来可以通过电脑主机的浏览器去访问集群中任意一个nodeip的30002端口，即可访问到pod</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="loadbalancer类型的service" tabindex="-1"><a class="header-anchor" href="#loadbalancer类型的service" aria-hidden="true">#</a> LoadBalancer类型的Service</h3><p>​ LoadBalancer和NodePort很相似，目的都是向外部暴露一个端口，区别在于LoadBalancer会在集群的外部再来做一个负载均衡设备，而这个设备需要外部环境支持的，外部服务发送到这个设备上的请求，会被设备负载之后转发到集群中。</p><p>&lt;img src=&quot;./assets/image-20200510103945494.png&quot; style=&quot;border:1px solid&quot; /&gt;</p><h3 id="externalname类型的service" tabindex="-1"><a class="header-anchor" href="#externalname类型的service" aria-hidden="true">#</a> ExternalName类型的Service</h3><p>​ ExternalName类型的Service用于引入集群外部的服务，它通过<code>externalName</code>属性指定外部一个服务的地址，然后在集群内部访问此service就可以访问到外部的服务了。</p><p>&lt;img src=&quot;./assets/image-20200510113311209.png&quot; style=&quot;border:1px solid&quot; /&gt;</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> service<span class="token punctuation">-</span>externalname
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">type</span><span class="token punctuation">:</span> ExternalName <span class="token comment"># service类型</span>
  <span class="token key atrule">externalName</span><span class="token punctuation">:</span> www.baidu.com  <span class="token comment">#改成ip地址也可以</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 创建service</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl  create -f service-externalname.yaml</span>
service/service-externalname created

<span class="token comment"># 域名解析</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># dig @10.96.0.10 service-externalname.dev.svc.cluster.local</span>
service-externalname<span class="token punctuation">.</span>dev<span class="token punctuation">.</span>svc<span class="token punctuation">.</span>cluster<span class="token punctuation">.</span>local<span class="token punctuation">.</span> 30 IN CNAME www<span class="token punctuation">.</span>baidu<span class="token punctuation">.</span>com<span class="token punctuation">.</span>
www<span class="token punctuation">.</span>baidu<span class="token punctuation">.</span>com<span class="token punctuation">.</span>          30      IN      CNAME   www<span class="token punctuation">.</span>a<span class="token punctuation">.</span>shifen<span class="token punctuation">.</span>com<span class="token punctuation">.</span>
www<span class="token punctuation">.</span>a<span class="token punctuation">.</span>shifen<span class="token punctuation">.</span>com<span class="token punctuation">.</span>       30      IN      A       39<span class="token punctuation">.</span>156<span class="token punctuation">.</span>66<span class="token punctuation">.</span>18
www<span class="token punctuation">.</span>a<span class="token punctuation">.</span>shifen<span class="token punctuation">.</span>com<span class="token punctuation">.</span>       30      IN      A       39<span class="token punctuation">.</span>156<span class="token punctuation">.</span>66<span class="token punctuation">.</span>14
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ingress介绍" tabindex="-1"><a class="header-anchor" href="#ingress介绍" aria-hidden="true">#</a> Ingress介绍</h2><p>​ 在前面课程中已经提到，Service对集群之外暴露服务的主要方式有两种：NotePort和LoadBalancer，但是这两种方式，都有一定的缺点：</p><ul><li>NodePort方式的缺点是会占用很多集群机器的端口，那么当集群服务变多的时候，这个缺点就愈发明显</li><li>LB方式的缺点是每个service需要一个LB，浪费、麻烦，并且需要kubernetes之外设备的支持</li></ul><p>​ 基于这种现状，kubernetes提供了Ingress资源对象，Ingress只需要一个NodePort或者一个LB就可以满足暴露多个Service的需求。工作机制大致如下图表示：</p><p>&lt;img src=&quot;./assets/image-20200623092808049.png&quot; style=&quot;border:1px solid&quot;/&gt;</p><p>​ 实际上，Ingress相当于一个7层的负载均衡器，是kubernetes对反向代理的一个抽象，它的工作原理类似于Nginx，可以理解成在<strong>Ingress里建立诸多映射规则，Ingress Controller通过监听这些配置规则并转化成Nginx的反向代理配置 , 然后对外部提供服务</strong>。在这里有两个核心概念：</p><ul><li>ingress：kubernetes中的一个对象，作用是定义请求如何转发到service的规则</li><li>ingress controller：具体实现反向代理及负载均衡的程序，对ingress定义的规则进行解析，根据配置的规则来实现请求转发，实现方式有很多，比如Nginx, Contour, Haproxy等等</li></ul><p>Ingress（以Nginx为例）的工作原理如下：</p><ol><li>用户编写Ingress规则，说明哪个域名对应kubernetes集群中的哪个Service</li><li>Ingress控制器动态感知Ingress服务规则的变化，然后生成一段对应的Nginx反向代理配置</li><li>Ingress控制器会将生成的Nginx配置写入到一个运行着的Nginx服务中，并动态更新</li><li>到此为止，其实真正在工作的就是一个Nginx了，内部配置了用户定义的请求转发规则</li></ol><p>&lt;img src=&quot;./assets/image-20200516112704764.png&quot; style=&quot;border: 1px solid; zoom: 100%;&quot; /&gt;</p><h2 id="ingress使用" tabindex="-1"><a class="header-anchor" href="#ingress使用" aria-hidden="true">#</a> Ingress使用</h2><h3 id="环境准备" tabindex="-1"><a class="header-anchor" href="#环境准备" aria-hidden="true">#</a> 环境准备</h3><p><strong>搭建ingress环境</strong></p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 创建文件夹</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># mkdir ingress-controller</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># cd ingress-controller/</span>

<span class="token comment"># 获取ingress-nginx，本次案例使用的是0.30版本</span>
<span class="token namespace">[root@master ingress-controller]</span><span class="token comment"># wget https://raw.githubusercontent.com/kubernetes/ingress-nginx/nginx-0.30.0/deploy/static/mandatory.yaml</span>
<span class="token namespace">[root@master ingress-controller]</span><span class="token comment"># wget https://raw.githubusercontent.com/kubernetes/ingress-nginx/nginx-0.30.0/deploy/static/provider/baremetal/service-nodeport.yaml</span>

<span class="token comment"># 修改mandatory.yaml文件中的仓库</span>
<span class="token comment"># 修改quay.io/kubernetes-ingress-controller/nginx-ingress-controller:0.30.0</span>
<span class="token comment"># 为quay-mirror.qiniu.com/kubernetes-ingress-controller/nginx-ingress-controller:0.30.0</span>
<span class="token comment"># 创建ingress-nginx</span>
<span class="token namespace">[root@master ingress-controller]</span><span class="token comment"># kubectl apply -f ./</span>

<span class="token comment"># 查看ingress-nginx</span>
<span class="token namespace">[root@master ingress-controller]</span><span class="token comment"># kubectl get pod -n ingress-nginx</span>
NAME                                           READY   STATUS    RESTARTS   AGE
pod/nginx-ingress-controller-fbf967dd5-4qpbp   1/1     Running   0          12h

<span class="token comment"># 查看service</span>
<span class="token namespace">[root@master ingress-controller]</span><span class="token comment"># kubectl get svc -n ingress-nginx</span>
NAME            <span class="token function">TYPE</span>       CLUSTER-IP     EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>                      AGE
ingress-nginx   NodePort   10<span class="token punctuation">.</span>98<span class="token punctuation">.</span>75<span class="token punctuation">.</span>163   &lt;none&gt;        80:32240/TCP<span class="token punctuation">,</span>443:31335/TCP   11h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>准备service和pod</strong></p><p>为了后面的实验比较方便，创建如下图所示的模型</p><p>&lt;img src=&quot;./assets/image-20200516102419998.png&quot; style=&quot;zoom:80%;border:1px solid&quot; /&gt;</p><p>创建tomcat-nginx.yaml</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>deployment
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">3</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>pod
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>pod
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
        <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.17.1
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>

<span class="token punctuation">---</span>

<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> tomcat<span class="token punctuation">-</span>deployment
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">3</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> tomcat<span class="token punctuation">-</span>pod
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> tomcat<span class="token punctuation">-</span>pod
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> tomcat
        <span class="token key atrule">image</span><span class="token punctuation">:</span> tomcat<span class="token punctuation">:</span>8.5<span class="token punctuation">-</span>jre10<span class="token punctuation">-</span>slim
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">8080</span>

<span class="token punctuation">---</span>

<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>service
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>pod
  <span class="token key atrule">clusterIP</span><span class="token punctuation">:</span> None
  <span class="token key atrule">type</span><span class="token punctuation">:</span> ClusterIP
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">80</span>

<span class="token punctuation">---</span>

<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> tomcat<span class="token punctuation">-</span>service
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> tomcat<span class="token punctuation">-</span>pod
  <span class="token key atrule">clusterIP</span><span class="token punctuation">:</span> None
  <span class="token key atrule">type</span><span class="token punctuation">:</span> ClusterIP
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8080</span>
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">8080</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 创建</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl create -f tomcat-nginx.yaml</span>

<span class="token comment"># 查看</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get svc -n dev</span>
NAME             <span class="token function">TYPE</span>        CLUSTER-IP   EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>    AGE
nginx-service    ClusterIP   None         &lt;none&gt;        80/TCP     48s
tomcat-service   ClusterIP   None         &lt;none&gt;        8080/TCP   48s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="http代理" tabindex="-1"><a class="header-anchor" href="#http代理" aria-hidden="true">#</a> Http代理</h3><p>创建ingress-http.yaml</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> extensions/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Ingress
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> ingress<span class="token punctuation">-</span>http
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> nginx.itheima.com
    <span class="token key atrule">http</span><span class="token punctuation">:</span>
      <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /
        <span class="token key atrule">backend</span><span class="token punctuation">:</span>
          <span class="token key atrule">serviceName</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>service
          <span class="token key atrule">servicePort</span><span class="token punctuation">:</span> <span class="token number">80</span>
  <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> tomcat.itheima.com
    <span class="token key atrule">http</span><span class="token punctuation">:</span>
      <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /
        <span class="token key atrule">backend</span><span class="token punctuation">:</span>
          <span class="token key atrule">serviceName</span><span class="token punctuation">:</span> tomcat<span class="token punctuation">-</span>service
          <span class="token key atrule">servicePort</span><span class="token punctuation">:</span> <span class="token number">8080</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 创建</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl create -f ingress-http.yaml</span>
ingress<span class="token punctuation">.</span>extensions/ingress-http created

<span class="token comment"># 查看</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get ing ingress-http -n dev</span>
NAME           HOSTS                                  ADDRESS   PORTS   AGE
ingress-http   nginx<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>com<span class="token punctuation">,</span>tomcat<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>com             80      22s

<span class="token comment"># 查看详情</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl describe ing ingress-http  -n dev</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
Rules:
Host                Path  Backends
<span class="token operator">--</span><span class="token operator">--</span>                <span class="token operator">--</span><span class="token operator">--</span>  <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>
nginx<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>com   <span class="token operator">/</span> nginx-service:80 <span class="token punctuation">(</span>10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>96:80<span class="token punctuation">,</span>10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>97:80<span class="token punctuation">,</span>10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>2<span class="token punctuation">.</span>112:80<span class="token punctuation">)</span>
tomcat<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>com  <span class="token operator">/</span> tomcat-service:8080<span class="token punctuation">(</span>10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>94:8080<span class="token punctuation">,</span>10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>95:8080<span class="token punctuation">,</span>10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>2<span class="token punctuation">.</span>111:8080<span class="token punctuation">)</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

<span class="token comment"># 接下来,在本地电脑上配置host文件,解析上面的两个域名到192.168.109.100(master)上</span>
<span class="token comment"># 然后,就可以分别访问tomcat.itheima.com:32240  和  nginx.itheima.com:32240 查看效果了</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="https代理" tabindex="-1"><a class="header-anchor" href="#https代理" aria-hidden="true">#</a> Https代理</h3><p>创建证书</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 生成证书</span>
openssl req <span class="token operator">-</span>x509 <span class="token operator">-</span>sha256 <span class="token operator">-</span>nodes <span class="token operator">-</span>days 365 <span class="token operator">-</span>newkey rsa:2048 <span class="token operator">-</span>keyout tls<span class="token punctuation">.</span>key <span class="token operator">-</span>out tls<span class="token punctuation">.</span>crt <span class="token operator">-</span>subj <span class="token string">&quot;/C=CN/ST=BJ/L=BJ/O=nginx/CN=itheima.com&quot;</span>

<span class="token comment"># 创建密钥</span>
kubectl create secret tls tls-secret <span class="token operator">--</span>key tls<span class="token punctuation">.</span>key <span class="token operator">--</span>cert tls<span class="token punctuation">.</span>crt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建ingress-https.yaml</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> extensions/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Ingress
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> ingress<span class="token punctuation">-</span>https
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">tls</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">hosts</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> nginx.itheima.com
      <span class="token punctuation">-</span> tomcat.itheima.com
      <span class="token key atrule">secretName</span><span class="token punctuation">:</span> tls<span class="token punctuation">-</span>secret <span class="token comment"># 指定秘钥</span>
  <span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> nginx.itheima.com
    <span class="token key atrule">http</span><span class="token punctuation">:</span>
      <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /
        <span class="token key atrule">backend</span><span class="token punctuation">:</span>
          <span class="token key atrule">serviceName</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>service
          <span class="token key atrule">servicePort</span><span class="token punctuation">:</span> <span class="token number">80</span>
  <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> tomcat.itheima.com
    <span class="token key atrule">http</span><span class="token punctuation">:</span>
      <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /
        <span class="token key atrule">backend</span><span class="token punctuation">:</span>
          <span class="token key atrule">serviceName</span><span class="token punctuation">:</span> tomcat<span class="token punctuation">-</span>service
          <span class="token key atrule">servicePort</span><span class="token punctuation">:</span> <span class="token number">8080</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 创建</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl create -f ingress-https.yaml</span>
ingress<span class="token punctuation">.</span>extensions/ingress-https created

<span class="token comment"># 查看</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get ing ingress-https -n dev</span>
NAME            HOSTS                                  ADDRESS         PORTS     AGE
ingress-https   nginx<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>com<span class="token punctuation">,</span>tomcat<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>com   10<span class="token punctuation">.</span>104<span class="token punctuation">.</span>184<span class="token punctuation">.</span>38   80<span class="token punctuation">,</span> 443   2m42s

<span class="token comment"># 查看详情</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl describe ing ingress-https -n dev</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
TLS:
  tls-secret terminates nginx<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>com<span class="token punctuation">,</span>tomcat<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>com
Rules:
Host              Path Backends
<span class="token operator">--</span><span class="token operator">--</span>              <span class="token operator">--</span><span class="token operator">--</span> <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>
nginx<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>com  <span class="token operator">/</span>  nginx-service:80 <span class="token punctuation">(</span>10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>97:80<span class="token punctuation">,</span>10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>98:80<span class="token punctuation">,</span>10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>2<span class="token punctuation">.</span>119:80<span class="token punctuation">)</span>
tomcat<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>com <span class="token operator">/</span>  tomcat-service:8080<span class="token punctuation">(</span>10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>99:8080<span class="token punctuation">,</span>10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>2<span class="token punctuation">.</span>117:8080<span class="token punctuation">,</span>10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>2<span class="token punctuation">.</span>120:8080<span class="token punctuation">)</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

<span class="token comment"># 下面可以通过浏览器访问https://nginx.itheima.com:31335 和 https://tomcat.itheima.com:31335来查看了</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="第八章-数据存储" tabindex="-1"><a class="header-anchor" href="#第八章-数据存储" aria-hidden="true">#</a> 第八章 数据存储</h1><p>​ 在前面已经提到，容器的生命周期可能很短，会被频繁地创建和销毁。那么容器在销毁时，保存在容器中的数据也会被清除。这种结果对用户来说，在某些情况下是不乐意看到的。为了持久化保存容器的数据，kubernetes引入了Volume的概念。</p><p>​ Volume是Pod中能够被多个容器访问的共享目录，它被定义在Pod上，然后被一个Pod里的多个容器挂载到具体的文件目录下，kubernetes通过Volume实现同一个Pod中不同容器之间的数据共享以及数据的持久化存储。Volume的生命容器不与Pod中单个容器的生命周期相关，当容器终止或者重启时，Volume中的数据也不会丢失。</p><p>kubernetes的Volume支持多种类型，比较常见的有下面几个：</p><ul><li>简单存储：EmptyDir、HostPath、NFS</li><li>高级存储：PV、PVC</li><li>配置存储：ConfigMap、Secret</li></ul><h2 id="基本存储" tabindex="-1"><a class="header-anchor" href="#基本存储" aria-hidden="true">#</a> 基本存储</h2><h3 id="emptydir" tabindex="-1"><a class="header-anchor" href="#emptydir" aria-hidden="true">#</a> EmptyDir</h3><p>​ EmptyDir是最基础的Volume类型，一个EmptyDir就是Host上的一个空目录。</p><p>​ EmptyDir是在Pod被分配到Node时创建的，它的初始内容为空，并且无须指定宿主机上对应的目录文件，因为kubernetes会自动分配一个目录，当Pod销毁时， EmptyDir中的数据也会被永久删除。 EmptyDir用途如下：</p><ul><li><p>临时空间，例如用于某些应用程序运行时所需的临时目录，且无须永久保留</p></li><li><p>一个容器需要从另一个容器中获取数据的目录（多容器共享目录）</p></li></ul><p>接下来，通过一个容器之间文件共享的案例来使用一下EmptyDir。</p><p>​ 在一个Pod中准备两个容器nginx和busybox，然后声明一个Volume分别挂在到两个容器的目录中，然后nginx容器负责向Volume中写日志，busybox中通过命令将日志内容读到控制台。</p><p>&lt;img src=&quot;./assets/image-20200413174713773.png&quot; style=&quot;zoom:80%;border:solid 1px&quot; /&gt;</p><p>创建一个volume-emptydir.yaml</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> volume<span class="token punctuation">-</span>emptydir
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.14<span class="token punctuation">-</span>alpine
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>  <span class="token comment"># 将logs-volume挂在到nginx容器中，对应的目录为 /var/log/nginx</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> logs<span class="token punctuation">-</span>volume
      <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /var/log/nginx
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> busybox
    <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox<span class="token punctuation">:</span><span class="token number">1.30</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;/bin/sh&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;-c&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;tail -f /logs/access.log&quot;</span><span class="token punctuation">]</span> <span class="token comment"># 初始命令，动态读取指定文件中内容</span>
    <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>  <span class="token comment"># 将logs-volume 挂在到busybox容器中，对应的目录为 /logs</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> logs<span class="token punctuation">-</span>volume
      <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /logs
  <span class="token key atrule">volumes</span><span class="token punctuation">:</span> <span class="token comment"># 声明volume， name为logs-volume，类型为emptyDir</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> logs<span class="token punctuation">-</span>volume
    <span class="token key atrule">emptyDir</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 创建Pod</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl create -f volume-emptydir.yaml</span>
pod/volume-emptydir created

<span class="token comment"># 查看pod</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get pods volume-emptydir -n dev -o wide</span>
NAME                  READY   STATUS    RESTARTS   AGE   IP             NODE   <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> 
volume-emptydir   2/2     Running   0          97s   10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>100   node1  <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

<span class="token comment"># 通过podIp访问nginx</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># curl 10.244.1.100</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

<span class="token comment"># 通过kubectl logs命令查看指定容器的标准输出</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl logs -f volume-emptydir -n dev -c busybox</span>
10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0 <span class="token operator">-</span> <span class="token operator">-</span> <span class="token punctuation">[</span>13/Apr/2020:10:58:47 <span class="token operator">+</span>0000<span class="token punctuation">]</span> <span class="token string">&quot;GET / HTTP/1.1&quot;</span> 200 612 <span class="token string">&quot;-&quot;</span> <span class="token string">&quot;curl/7.29.0&quot;</span> <span class="token string">&quot;-&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="hostpath" tabindex="-1"><a class="header-anchor" href="#hostpath" aria-hidden="true">#</a> HostPath</h3><p>​ 上节课提到，EmptyDir中数据不会被持久化，它会随着Pod的结束而销毁，如果想简单的将数据持久化到主机中，可以选择HostPath。</p><p>​ HostPath就是将Node主机中一个实际目录挂在到Pod中，以供容器使用，这样的设计就可以保证Pod销毁了，但是数据依据可以存在于Node主机上。</p><p>&lt;img src=&quot;./assets/image-20200413214031331.png&quot; style=&quot;zoom:100%;border:1px solid&quot; /&gt;</p><p>创建一个volume-hostpath.yaml：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> volume<span class="token punctuation">-</span>hostpath
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.17.1
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> logs<span class="token punctuation">-</span>volume
      <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /var/log/nginx
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> busybox
    <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox<span class="token punctuation">:</span><span class="token number">1.30</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;/bin/sh&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;-c&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;tail -f /logs/access.log&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> logs<span class="token punctuation">-</span>volume
      <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /logs
  <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> logs<span class="token punctuation">-</span>volume
    <span class="token key atrule">hostPath</span><span class="token punctuation">:</span> 
      <span class="token key atrule">path</span><span class="token punctuation">:</span> /root/logs
      <span class="token key atrule">type</span><span class="token punctuation">:</span> DirectoryOrCreate  <span class="token comment"># 目录存在就使用，不存在就先创建后使用</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>关于type的值的一点说明：
	DirectoryOrCreate 目录存在就使用，不存在就先创建后使用
	Directory	目录必须存在
	FileOrCreate  文件存在就使用，不存在就先创建后使用
	File 文件必须存在	
    Socket	unix套接字必须存在
	CharDevice	字符设备必须存在
	BlockDevice 块设备必须存在
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 创建Pod</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl create -f volume-hostpath.yaml</span>
pod/volume-hostpath created

<span class="token comment"># 查看Pod</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get pods volume-hostpath -n dev -o wide</span>
NAME                  READY   STATUS    RESTARTS   AGE   IP             NODE   <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
pod-volume-hostpath   2/2     Running   0          16s   10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>104   node1  <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

<span class="token comment">#访问nginx</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># curl 10.244.1.104</span>

<span class="token comment"># 接下来就可以去host的/root/logs目录下查看存储的文件了</span>
<span class="token comment">###  注意: 下面的操作需要到Pod所在的节点运行（案例中是node1）</span>
<span class="token namespace">[root@node1 ~]</span><span class="token comment"># ls /root/logs/</span>
access<span class="token punctuation">.</span>log  error<span class="token punctuation">.</span>log

<span class="token comment"># 同样的道理，如果在此目录下创建一个文件，到容器中也是可以看到的</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="nfs" tabindex="-1"><a class="header-anchor" href="#nfs" aria-hidden="true">#</a> NFS</h3><p>​ HostPath可以解决数据持久化的问题，但是一旦Node节点故障了，Pod如果转移到了别的节点，又会出现问题了，此时需要准备单独的网络存储系统，比较常用的用NFS、CIFS。</p><p>​ NFS是一个网络文件存储系统，可以搭建一台NFS服务器，然后将Pod中的存储直接连接到NFS系统上，这样的话，无论Pod在节点上怎么转移，只要Node跟NFS的对接没问题，数据就可以成功访问。</p><p>&lt;img src=&quot;./assets/image-20200413215133559.png&quot; style=&quot;zoom:100%;border:1px solid&quot; /&gt;</p><p>1）首先要准备nfs的服务器，这里为了简单，直接是master节点做nfs服务器</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 在master上安装nfs服务</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># yum install nfs-utils -y</span>

<span class="token comment"># 准备一个共享目录</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># mkdir /root/data/nfs -pv</span>

<span class="token comment"># 将共享目录以读写权限暴露给192.168.109.0/24网段中的所有主机</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># vim /etc/exports</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># more /etc/exports</span>
<span class="token operator">/</span>root/<span class="token keyword">data</span><span class="token operator">/</span>nfs     192<span class="token punctuation">.</span>168<span class="token punctuation">.</span>109<span class="token punctuation">.</span>0/24<span class="token punctuation">(</span>rw<span class="token punctuation">,</span>no_root_squash<span class="token punctuation">)</span>

<span class="token comment"># 启动nfs服务</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># systemctl start nfs</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2）接下来，要在的每个node节点上都安装下nfs，这样的目的是为了node节点可以驱动nfs设备</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 在node上安装nfs服务，注意不需要启动</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># yum install nfs-utils -y</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>3）接下来，就可以编写pod的配置文件了，创建volume-nfs.yaml</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> volume<span class="token punctuation">-</span>nfs
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.17.1
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> logs<span class="token punctuation">-</span>volume
      <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /var/log/nginx
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> busybox
    <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox<span class="token punctuation">:</span><span class="token number">1.30</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;/bin/sh&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;-c&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;tail -f /logs/access.log&quot;</span><span class="token punctuation">]</span> 
    <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> logs<span class="token punctuation">-</span>volume
      <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /logs
  <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> logs<span class="token punctuation">-</span>volume
    <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
      <span class="token key atrule">server</span><span class="token punctuation">:</span> 192.168.109.100  <span class="token comment">#nfs服务器地址</span>
      <span class="token key atrule">path</span><span class="token punctuation">:</span> /root/data/nfs <span class="token comment">#共享文件路径</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4）最后，运行下pod，观察结果</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 创建pod</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl create -f volume-nfs.yaml</span>
pod/volume-nfs created

<span class="token comment"># 查看pod</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get pods volume-nfs -n dev</span>
NAME                  READY   STATUS    RESTARTS   AGE
volume-nfs        2/2     Running   0          2m9s

<span class="token comment"># 查看nfs服务器上的共享目录，发现已经有文件了</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># ls /root/data/</span>
access<span class="token punctuation">.</span>log  error<span class="token punctuation">.</span>log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="高级存储" tabindex="-1"><a class="header-anchor" href="#高级存储" aria-hidden="true">#</a> 高级存储</h2><h3 id="pv和pvc" tabindex="-1"><a class="header-anchor" href="#pv和pvc" aria-hidden="true">#</a> PV和PVC</h3><p>​ 前面已经学习了使用NFS提供存储，此时就要求用户会搭建NFS系统，并且会在yaml配置nfs。由于kubernetes支持的存储系统有很多，要求客户全都掌握，显然不现实。为了能够屏蔽底层存储实现的细节，方便用户使用， kubernetes引入PV和PVC两种资源对象。</p><p>​ PV（Persistent Volume）是持久化卷的意思，是对底层的共享存储的一种抽象。一般情况下PV由kubernetes管理员进行创建和配置，它与底层具体的共享存储技术有关，并通过插件完成与共享存储的对接。</p><p>​ PVC（Persistent Volume Claim）是持久卷声明的意思，是用户对于存储需求的一种声明。换句话说，PVC其实就是用户向kubernetes系统发出的一种资源需求申请。</p><p>&lt;img src=&quot;./assets/image-20200514194111567.png&quot; style=&quot;zoom:100%;border:1px solid&quot; /&gt;</p><p>使用了PV和PVC之后，工作可以得到进一步的细分：</p><ul><li>存储：存储工程师维护</li><li>PV： kubernetes管理员维护</li><li>PVC：kubernetes用户维护</li></ul><h3 id="pv" tabindex="-1"><a class="header-anchor" href="#pv" aria-hidden="true">#</a> PV</h3><p>PV是存储资源的抽象，下面是资源清单文件:</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1  
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolume
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pv2
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">nfs</span><span class="token punctuation">:</span> <span class="token comment"># 存储类型，与底层真正存储对应</span>
  <span class="token key atrule">capacity</span><span class="token punctuation">:</span>  <span class="token comment"># 存储能力，目前只支持存储空间的设置</span>
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> 2Gi
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>  <span class="token comment"># 访问模式</span>
  <span class="token key atrule">storageClassName</span><span class="token punctuation">:</span> <span class="token comment"># 存储类别</span>
  <span class="token key atrule">persistentVolumeReclaimPolicy</span><span class="token punctuation">:</span> <span class="token comment"># 回收策略</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>PV 的关键配置参数说明：</p><ul><li><p><strong>存储类型</strong></p><p>底层实际存储的类型，kubernetes支持多种存储类型，每种存储类型的配置都有所差异</p></li><li><p><strong>存储能力（capacity）</strong></p></li></ul><p>​ 目前只支持存储空间的设置( storage=1Gi )，不过未来可能会加入IOPS、吞吐量等指标的配置</p><ul><li><p><strong>访问模式（accessModes）</strong></p><p>用于描述用户应用对存储资源的访问权限，访问权限包括下面几种方式：</p><ul><li>ReadWriteOnce（RWO）：读写权限，但是只能被单个节点挂载</li><li>ReadOnlyMany（ROX）： 只读权限，可以被多个节点挂载</li><li>ReadWriteMany（RWX）：读写权限，可以被多个节点挂载</li></ul><p><code>需要注意的是，底层不同的存储类型可能支持的访问模式不同</code></p></li><li><p><strong>回收策略（persistentVolumeReclaimPolicy）</strong></p><p>当PV不再被使用了之后，对其的处理方式。目前支持三种策略：</p><ul><li>Retain （保留） 保留数据，需要管理员手工清理数据</li><li>Recycle（回收） 清除 PV 中的数据，效果相当于执行 rm -rf /thevolume/*</li><li>Delete （删除） 与 PV 相连的后端存储完成 volume 的删除操作，当然这常见于云服务商的存储服务</li></ul><p><code>需要注意的是，底层不同的存储类型可能支持的回收策略不同</code></p></li><li><p><strong>存储类别</strong></p><p>PV可以通过storageClassName参数指定一个存储类别</p><ul><li><p>具有特定类别的PV只能与请求了该类别的PVC进行绑定</p></li><li><p>未设定类别的PV则只能与不请求任何类别的PVC进行绑定</p></li></ul></li><li><p><strong>状态（status）</strong></p><p>一个 PV 的生命周期中，可能会处于4中不同的阶段：</p><ul><li>Available（可用）： 表示可用状态，还未被任何 PVC 绑定</li><li>Bound（已绑定）： 表示 PV 已经被 PVC 绑定</li><li>Released（已释放）： 表示 PVC 被删除，但是资源还未被集群重新声明</li><li>Failed（失败）： 表示该 PV 的自动回收失败</li></ul></li></ul><p><strong>实验</strong></p><p>使用NFS作为存储，来演示PV的使用，创建3个PV，对应NFS中的3个暴露的路径。</p><ol><li>准备NFS环境</li></ol><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 创建目录</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># mkdir /root/data/{pv1,pv2,pv3} -pv</span>

<span class="token comment"># 暴露服务</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># more /etc/exports</span>
<span class="token operator">/</span>root/<span class="token keyword">data</span><span class="token operator">/</span>pv1     192<span class="token punctuation">.</span>168<span class="token punctuation">.</span>109<span class="token punctuation">.</span>0/24<span class="token punctuation">(</span>rw<span class="token punctuation">,</span>no_root_squash<span class="token punctuation">)</span>
<span class="token operator">/</span>root/<span class="token keyword">data</span><span class="token operator">/</span>pv2     192<span class="token punctuation">.</span>168<span class="token punctuation">.</span>109<span class="token punctuation">.</span>0/24<span class="token punctuation">(</span>rw<span class="token punctuation">,</span>no_root_squash<span class="token punctuation">)</span>
<span class="token operator">/</span>root/<span class="token keyword">data</span><span class="token operator">/</span>pv3     192<span class="token punctuation">.</span>168<span class="token punctuation">.</span>109<span class="token punctuation">.</span>0/24<span class="token punctuation">(</span>rw<span class="token punctuation">,</span>no_root_squash<span class="token punctuation">)</span>

<span class="token comment"># 重启服务</span>
<span class="token namespace">[root@master ~]</span><span class="token comment">#  systemctl restart nfs</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>创建pv.yaml</li></ol><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolume
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span>  pv1
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">capacity</span><span class="token punctuation">:</span> 
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> 1Gi
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> ReadWriteMany
  <span class="token key atrule">persistentVolumeReclaimPolicy</span><span class="token punctuation">:</span> Retain
  <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
    <span class="token key atrule">path</span><span class="token punctuation">:</span> /root/data/pv1
    <span class="token key atrule">server</span><span class="token punctuation">:</span> 192.168.109.100

<span class="token punctuation">---</span>

<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolume
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span>  pv2
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">capacity</span><span class="token punctuation">:</span> 
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> 2Gi
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> ReadWriteMany
  <span class="token key atrule">persistentVolumeReclaimPolicy</span><span class="token punctuation">:</span> Retain
  <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
    <span class="token key atrule">path</span><span class="token punctuation">:</span> /root/data/pv2
    <span class="token key atrule">server</span><span class="token punctuation">:</span> 192.168.109.100
    
<span class="token punctuation">---</span>

<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolume
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span>  pv3
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">capacity</span><span class="token punctuation">:</span> 
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> 3Gi
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> ReadWriteMany
  <span class="token key atrule">persistentVolumeReclaimPolicy</span><span class="token punctuation">:</span> Retain
  <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
    <span class="token key atrule">path</span><span class="token punctuation">:</span> /root/data/pv3
    <span class="token key atrule">server</span><span class="token punctuation">:</span> 192.168.109.100
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 创建 pv</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl create -f pv.yaml</span>
persistentvolume/pv1 created
persistentvolume/pv2 created
persistentvolume/pv3 created

<span class="token comment"># 查看pv</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get pv -o wide</span>
NAME   CAPACITY   ACCESS MODES  RECLAIM POLICY  STATUS      AGE   VOLUMEMODE
pv1    1Gi        RWX            Retain        Available    10s   Filesystem
pv2    2Gi        RWX            Retain        Available    10s   Filesystem
pv3    3Gi        RWX            Retain        Available    9s    Filesystem
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="pvc" tabindex="-1"><a class="header-anchor" href="#pvc" aria-hidden="true">#</a> PVC</h3><p>PVC是资源的申请，用来声明对存储空间、访问模式、存储类别需求信息。下面是资源清单文件:</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolumeClaim
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pvc
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span> <span class="token comment"># 访问模式</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span> <span class="token comment"># 采用标签对PV选择</span>
  <span class="token key atrule">storageClassName</span><span class="token punctuation">:</span> <span class="token comment"># 存储类别</span>
  <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token comment"># 请求空间</span>
    <span class="token key atrule">requests</span><span class="token punctuation">:</span>
      <span class="token key atrule">storage</span><span class="token punctuation">:</span> 5Gi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>PVC 的关键配置参数说明：</p><ul><li><strong>访问模式（accessModes）</strong></li></ul><p>​ 用于描述用户应用对存储资源的访问权限</p><ul><li><p><strong>选择条件（selector）</strong></p><p>通过Label Selector的设置，可使PVC对于系统中己存在的PV进行筛选</p></li><li><p><strong>存储类别（storageClassName）</strong></p><p>PVC在定义时可以设定需要的后端存储的类别，只有设置了该class的pv才能被系统选出</p></li><li><p><strong>资源请求（Resources ）</strong></p><p>描述对存储资源的请求</p></li></ul><p><strong>实验</strong></p><ol><li>创建pvc.yaml，申请pv</li></ol><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolumeClaim
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pvc1
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span> 
  <span class="token punctuation">-</span> ReadWriteMany
  <span class="token key atrule">resources</span><span class="token punctuation">:</span>
    <span class="token key atrule">requests</span><span class="token punctuation">:</span>
      <span class="token key atrule">storage</span><span class="token punctuation">:</span> 1Gi
      
<span class="token punctuation">---</span>

<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolumeClaim
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pvc2
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span> 
  <span class="token punctuation">-</span> ReadWriteMany
  <span class="token key atrule">resources</span><span class="token punctuation">:</span>
    <span class="token key atrule">requests</span><span class="token punctuation">:</span>
      <span class="token key atrule">storage</span><span class="token punctuation">:</span> 1Gi
     
<span class="token punctuation">---</span>

<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolumeClaim
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pvc3
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span> 
  <span class="token punctuation">-</span> ReadWriteMany
  <span class="token key atrule">resources</span><span class="token punctuation">:</span>
    <span class="token key atrule">requests</span><span class="token punctuation">:</span>
      <span class="token key atrule">storage</span><span class="token punctuation">:</span> 1Gi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 创建pvc</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl create -f pvc.yaml</span>
persistentvolumeclaim/pvc1 created
persistentvolumeclaim/pvc2 created
persistentvolumeclaim/pvc3 created

<span class="token comment"># 查看pvc</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get pvc  -n dev -o wide</span>
NAME   STATUS   VOLUME   CAPACITY   ACCESS MODES   STORAGECLASS   AGE   VOLUMEMODE
pvc1   Bound    pv1      1Gi        RWX                           15s   Filesystem
pvc2   Bound    pv2      2Gi        RWX                           15s   Filesystem
pvc3   Bound    pv3      3Gi        RWX                           15s   Filesystem

<span class="token comment"># 查看pv</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get pv -o wide</span>
NAME  CAPACITY ACCESS MODES  RECLAIM POLICY  STATUS    CLAIM       AGE     VOLUMEMODE
pv1    1Gi        RWx        Retain          Bound    dev/pvc1    3h37m    Filesystem
pv2    2Gi        RWX        Retain          Bound    dev/pvc2    3h37m    Filesystem
pv3    3Gi        RWX        Retain          Bound    dev/pvc3    3h37m    Filesystem   
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>创建pods.yaml, 使用pv</li></ol><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pod1
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> busybox
    <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox<span class="token punctuation">:</span><span class="token number">1.30</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;/bin/sh&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;-c&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;while true;do echo pod1 &gt;&gt; /root/out.txt; sleep 10; done;&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> volume
      <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /root/
  <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> volume
      <span class="token key atrule">persistentVolumeClaim</span><span class="token punctuation">:</span>
        <span class="token key atrule">claimName</span><span class="token punctuation">:</span> pvc1
        <span class="token key atrule">readOnly</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pod2
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> busybox
    <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox<span class="token punctuation">:</span><span class="token number">1.30</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;/bin/sh&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;-c&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;while true;do echo pod2 &gt;&gt; /root/out.txt; sleep 10; done;&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> volume
      <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /root/
  <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> volume
      <span class="token key atrule">persistentVolumeClaim</span><span class="token punctuation">:</span>
        <span class="token key atrule">claimName</span><span class="token punctuation">:</span> pvc2
        <span class="token key atrule">readOnly</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>        
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 创建pod</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl create -f pods.yaml</span>
pod/pod1 created
pod/pod2 created

<span class="token comment"># 查看pod</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get pods -n dev -o wide</span>
NAME   READY   STATUS    RESTARTS   AGE   IP            NODE   
pod1   1/1     Running   0          14s   10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>69   node1   
pod2   1/1     Running   0          14s   10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>70   node1  

<span class="token comment"># 查看pvc</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get pvc -n dev -o wide</span>
NAME   STATUS   VOLUME   CAPACITY   ACCESS MODES      AGE   VOLUMEMODE
pvc1   Bound    pv1      1Gi        RWX               94m   Filesystem
pvc2   Bound    pv2      2Gi        RWX               94m   Filesystem
pvc3   Bound    pv3      3Gi        RWX               94m   Filesystem

<span class="token comment"># 查看pv</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get pv -n dev -o wide</span>
NAME   CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM       AGE     VOLUMEMODE
pv1    1Gi        RWX            Retain           Bound    dev/pvc1    5h11m   Filesystem
pv2    2Gi        RWX            Retain           Bound    dev/pvc2    5h11m   Filesystem
pv3    3Gi        RWX            Retain           Bound    dev/pvc3    5h11m   Filesystem

<span class="token comment"># 查看nfs中的文件存储</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># more /root/data/pv1/out.txt</span>
node1
node1
<span class="token namespace">[root@master ~]</span><span class="token comment"># more /root/data/pv2/out.txt</span>
node2
node2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="生命周期" tabindex="-1"><a class="header-anchor" href="#生命周期" aria-hidden="true">#</a> 生命周期</h3><p>PVC和PV是一一对应的，PV和PVC之间的相互作用遵循以下生命周期：</p><ul><li><p><strong>资源供应</strong>：管理员手动创建底层存储和PV</p></li><li><p><strong>资源绑定</strong>：用户创建PVC，kubernetes负责根据PVC的声明去寻找PV，并绑定</p><p>在用户定义好PVC之后，系统将根据PVC对存储资源的请求在已存在的PV中选择一个满足条件的</p><ul><li><p>一旦找到，就将该PV与用户定义的PVC进行绑定，用户的应用就可以使用这个PVC了</p></li><li><p>如果找不到，PVC则会无限期处于Pending状态，直到等到系统管理员创建了一个符合其要求的PV</p></li></ul><p>PV一旦绑定到某个PVC上，就会被这个PVC独占，不能再与其他PVC进行绑定了</p></li><li><p><strong>资源使用</strong>：用户可在pod中像volume一样使用pvc</p><p>Pod使用Volume的定义，将PVC挂载到容器内的某个路径进行使用。</p></li><li><p><strong>资源释放</strong>：用户删除pvc来释放pv</p><p>当存储资源使用完毕后，用户可以删除PVC，与该PVC绑定的PV将会被标记为“已释放”，但还不能立刻与其他PVC进行绑定。通过之前PVC写入的数据可能还被留在存储设备上，只有在清除之后该PV才能再次使用。</p></li><li><p><strong>资源回收</strong>：kubernetes根据pv设置的回收策略进行资源的回收</p><p>对于PV，管理员可以设定回收策略，用于设置与之绑定的PVC释放资源之后如何处理遗留数据的问题。只有PV的存储空间完成回收，才能供新的PVC绑定和使用</p></li></ul><p>&lt;img src=&quot;./assets/image-20200515002806726.png&quot; style=&quot;zoom:100%;border:1px solid&quot; /&gt;</p><h2 id="配置存储" tabindex="-1"><a class="header-anchor" href="#配置存储" aria-hidden="true">#</a> 配置存储</h2><h3 id="configmap" tabindex="-1"><a class="header-anchor" href="#configmap" aria-hidden="true">#</a> ConfigMap</h3><p>ConfigMap是一种比较特殊的存储卷，它的主要作用是用来存储配置信息的。</p><p>创建configmap.yaml，内容如下：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ConfigMap
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> configmap
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token key atrule">info</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
    username:admin
    password:123456</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，使用此配置文件创建configmap</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 创建configmap</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl create -f configmap.yaml</span>
configmap/configmap created

<span class="token comment"># 查看configmap详情</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl describe cm configmap -n dev</span>
Name:         configmap
Namespace:    dev
Labels:       &lt;none&gt;
Annotations:  &lt;none&gt;

<span class="token keyword">Data</span>
====
info:
<span class="token operator">--</span><span class="token operator">--</span>
username:admin
password:123456

Events:  &lt;none&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来创建一个pod-configmap.yaml，将上面创建的configmap挂载进去</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>configmap
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.17.1
    <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span> <span class="token comment"># 将configmap挂载到目录</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> config
      <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /configmap/config
  <span class="token key atrule">volumes</span><span class="token punctuation">:</span> <span class="token comment"># 引用configmap</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> config
    <span class="token key atrule">configMap</span><span class="token punctuation">:</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> configmap
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 创建pod</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl create -f pod-configmap.yaml</span>
pod/pod-configmap created

<span class="token comment"># 查看pod</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get pod pod-configmap -n dev</span>
NAME            READY   STATUS    RESTARTS   AGE
pod-configmap   1/1     Running   0          6s

<span class="token comment">#进入容器</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl exec -it pod-configmap -n dev /bin/sh</span>
<span class="token comment"># cd /configmap/config/</span>
<span class="token comment"># ls</span>
info
<span class="token comment"># more info</span>
username:admin
password:123456

<span class="token comment"># 可以看到映射已经成功，每个configmap都映射成了一个目录</span>
<span class="token comment"># key---&gt;文件     value----&gt;文件中的内容</span>
<span class="token comment"># 此时如果更新configmap的内容, 容器中的值也会动态更新</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="secret" tabindex="-1"><a class="header-anchor" href="#secret" aria-hidden="true">#</a> Secret</h3><p>​ 在kubernetes中，还存在一种和ConfigMap非常类似的对象，称为Secret对象。它主要用于存储敏感信息，例如密码、秘钥、证书等等。</p><ol><li>首先使用base64对数据进行编码</li></ol><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">[</span>root@master ~<span class="token punctuation">]</span><span class="token comment"># echo -n &#39;admin&#39; | base64 #准备username</span>
YWRtaW4=
<span class="token punctuation">[</span>root@master ~<span class="token punctuation">]</span><span class="token comment"># echo -n &#39;123456&#39; | base64 #准备password</span>
MTIzNDU2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>接下来编写secret.yaml，并创建Secret</li></ol><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Secret
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> secret
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">type</span><span class="token punctuation">:</span> Opaque
<span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token key atrule">username</span><span class="token punctuation">:</span> YWRtaW4=
  <span class="token key atrule">password</span><span class="token punctuation">:</span> MTIzNDU2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 创建secret</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl create -f secret.yaml</span>
secret/secret created

<span class="token comment"># 查看secret详情</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl describe secret secret -n dev</span>
Name:         secret
Namespace:    dev
Labels:       &lt;none&gt;
Annotations:  &lt;none&gt;
<span class="token function">Type</span>:  Opaque
<span class="token keyword">Data</span>
====
password:  6 bytes
username:  5 bytes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>创建pod-secret.yaml，将上面创建的secret挂载进去：</li></ol><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>secret
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.17.1
    <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span> <span class="token comment"># 将secret挂载到目录</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> config
      <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /secret/config
  <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> config
    <span class="token key atrule">secret</span><span class="token punctuation">:</span>
      <span class="token key atrule">secretName</span><span class="token punctuation">:</span> secret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 创建pod</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl create -f pod-secret.yaml</span>
pod/pod-secret created

<span class="token comment"># 查看pod</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get pod pod-secret -n dev</span>
NAME            READY   STATUS    RESTARTS   AGE
pod-secret      1/1     Running   0          2m28s

<span class="token comment"># 进入容器，查看secret信息，发现已经自动解码了</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl exec -it pod-secret /bin/sh -n dev</span>
<span class="token operator">/</span> <span class="token comment"># ls /secret/config/</span>
password  username
<span class="token operator">/</span> <span class="token comment"># more /secret/config/username</span>
admin
<span class="token operator">/</span> <span class="token comment"># more /secret/config/password</span>
123456
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>至此，已经实现了利用secret实现了信息的编码。</p><h1 id="第九章-安全认证" tabindex="-1"><a class="header-anchor" href="#第九章-安全认证" aria-hidden="true">#</a> 第九章 安全认证</h1><p>本章节主要介绍Kubernetes的安全认证机制。</p><h2 id="访问控制概述" tabindex="-1"><a class="header-anchor" href="#访问控制概述" aria-hidden="true">#</a> 访问控制概述</h2><p>​ Kubernetes作为一个分布式集群的管理工具，保证集群的安全性是其一个重要的任务。所谓的安全性其实就是保证对Kubernetes的各种<strong>客户端</strong>进行<strong>认证和鉴权</strong>操作。</p><p><strong>客户端</strong></p><p>在Kubernetes集群中，客户端通常有两类：</p><ul><li><p><strong>User Account</strong>：一般是独立于kubernetes之外的其他服务管理的用户账号。</p></li><li><p><strong>Service Account</strong>：kubernetes管理的账号，用于为Pod中的服务进程在访问Kubernetes时提供身份标识。</p></li></ul><p>&lt;img src=&quot;./assets/image-20200520102949189.png&quot; style=&quot;zoom:100%;border:1px solid&quot; /&gt;</p><p><strong>认证、授权与准入控制</strong></p><p>ApiServer是访问及管理资源对象的唯一入口。任何一个请求访问ApiServer，都要经过下面三个流程：</p><ul><li>Authentication（认证）：身份鉴别，只有正确的账号才能够通过认证</li><li>Authorization（授权）： 判断用户是否有权限对访问的资源执行特定的动作</li><li>Admission Control（准入控制）：用于补充授权机制以实现更加精细的访问控制功能。</li></ul><p>&lt;img src=&quot;./assets/image-20200520103942580.png&quot; style=&quot;zoom:100%; border:1px solid&quot; /&gt;</p><h3 id="认证管理" tabindex="-1"><a class="header-anchor" href="#认证管理" aria-hidden="true">#</a> 认证管理</h3><p>Kubernetes集群安全的最关键点在于如何识别并认证客户端身份，它提供了3种客户端身份认证方式：</p><ul><li><p>HTTP Base认证：通过用户名+密码的方式认证</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>    这种认证方式是把“用户名:密码”用BASE64算法进行编码后的字符串放在HTTP请求中的Header Authorization域里发送给服务端。服务端收到后进行解码，获取用户名及密码，然后进行用户身份认证的过程。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>HTTP Token认证：通过一个Token来识别合法用户</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>    这种认证方式是用一个很长的难以被模仿的字符串--Token来表明客户身份的一种方式。每个Token对应一个用户名，当客户端发起API调用请求时，需要在HTTP Header里放入Token，API Server接到Token后会跟服务器中保存的token进行比对，然后进行用户身份认证的过程。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>HTTPS证书认证：基于CA根证书签名的双向数字证书认证方式</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>    这种认证方式是安全性最高的一种方式，但是同时也是操作起来最麻烦的一种方式。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><p>&lt;img src=&quot;./assets/image-20200518211037434.png&quot; style=&quot;zoom:100%;border:1px solid&quot; /&gt;</p><p><strong>HTTPS认证大体分为3个过程：</strong></p><ol><li><p>证书申请和下发</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>  HTTPS通信双方的服务器向CA机构申请证书，CA机构下发根证书、服务端证书及私钥给申请者
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>客户端和服务端的双向认证</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>  1&gt; 客户端向服务器端发起请求，服务端下发自己的证书给客户端，
     客户端接收到证书后，通过私钥解密证书，在证书中获得服务端的公钥，
     客户端利用服务器端的公钥认证证书中的信息，如果一致，则认可这个服务器
  2&gt; 客户端发送自己的证书给服务器端，服务端接收到证书后，通过私钥解密证书，
     在证书中获得客户端的公钥，并用该公钥认证证书信息，确认客户端是否合法
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>服务器端和客户端进行通信</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>  服务器端和客户端协商好加密方案后，客户端会产生一个随机的秘钥并加密，然后发送到服务器端。
  服务器端接收这个秘钥后，双方接下来通信的所有内容都通过该随机秘钥加密
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><blockquote><p>注意: Kubernetes允许同时配置多种认证方式，只要其中任意一个方式认证通过即可</p></blockquote><h3 id="授权管理" tabindex="-1"><a class="header-anchor" href="#授权管理" aria-hidden="true">#</a> 授权管理</h3><p>​ 授权发生在认证成功之后，通过认证就可以知道请求用户是谁， 然后Kubernetes会根据事先定义的授权策略来决定用户是否有权限访问，这个过程就称为授权。</p><p>​ 每个发送到ApiServer的请求都带上了用户和资源的信息：比如发送请求的用户、请求的路径、请求的动作等，授权就是根据这些信息和授权策略进行比较，如果符合策略，则认为授权通过，否则会返回错误。</p><p>API Server目前支持以下几种授权策略：</p><ul><li><p>AlwaysDeny：表示拒绝所有请求，一般用于测试</p></li><li><p>AlwaysAllow：允许接收所有请求，相当于集群不需要授权流程（Kubernetes默认的策略）</p></li><li><p>ABAC：基于属性的访问控制，表示使用用户配置的授权规则对用户请求进行匹配和控制</p></li><li><p>Webhook：通过调用外部REST服务对用户进行授权</p></li><li><p>Node：是一种专用模式，用于对kubelet发出的请求进行访问控制</p></li><li><p>RBAC：基于角色的访问控制（kubeadm安装方式下的默认选项）</p></li></ul><p>RBAC(Role-Based Access Control) 基于角色的访问控制，主要是在描述一件事情：<strong>给哪些对象授予了哪些权限</strong></p><p>其中涉及到了下面几个概念：</p><ul><li>对象：User、Groups、ServiceAccount</li><li>角色：代表着一组定义在资源上的可操作动作(权限)的集合</li><li>绑定：将定义好的角色跟用户绑定在一起</li></ul><p>&lt;img src=&quot;./assets/image-20200519181209566.png&quot; style=&quot;zoom:100%;border:1px solid&quot; /&gt;</p><p>RBAC引入了4个顶级资源对象：</p><ul><li>Role、ClusterRole：角色，用于指定一组权限</li><li>RoleBinding、ClusterRoleBinding：角色绑定，用于将角色（权限）赋予给对象</li></ul><p><strong>Role、ClusterRole</strong></p><p>一个角色就是一组权限的集合，这里的权限都是许可形式的（白名单）。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># Role只能对命名空间内的资源进行授权，需要指定nameapce</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Role
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1beta1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  namespace<span class="token punctuation">:</span> dev
  name<span class="token punctuation">:</span> authorization<span class="token punctuation">-</span>role
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>  <span class="token comment"># 支持的API组列表,&quot;&quot; 空字符串，表示核心API群</span>
  resources<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;pods&quot;</span><span class="token punctuation">]</span> <span class="token comment"># 支持的资源对象列表</span>
  verbs<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;watch&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">]</span> <span class="token comment"># 允许的对资源对象的操作方法列表</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># ClusterRole可以对集群范围内资源、跨namespaces的范围资源、非资源类型进行授权</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1beta1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
 <span class="token key atrule">name</span><span class="token punctuation">:</span> authorization<span class="token punctuation">-</span>clusterrole
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
  <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;pods&quot;</span><span class="token punctuation">]</span>
  <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;watch&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要详细说明的是，rules中的参数：</p><ul><li><p>apiGroups: 支持的API组列表</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token string">&quot;&quot;</span>,<span class="token string">&quot;apps&quot;</span>, <span class="token string">&quot;autoscaling&quot;</span>, <span class="token string">&quot;batch&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>resources：支持的资源对象列表</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token string">&quot;services&quot;</span>, <span class="token string">&quot;endpoints&quot;</span>, <span class="token string">&quot;pods&quot;</span>,<span class="token string">&quot;secrets&quot;</span>,<span class="token string">&quot;configmaps&quot;</span>,<span class="token string">&quot;crontabs&quot;</span>,<span class="token string">&quot;deployments&quot;</span>,<span class="token string">&quot;jobs&quot;</span>,
<span class="token string">&quot;nodes&quot;</span>,<span class="token string">&quot;rolebindings&quot;</span>,<span class="token string">&quot;clusterroles&quot;</span>,<span class="token string">&quot;daemonsets&quot;</span>,<span class="token string">&quot;replicasets&quot;</span>,<span class="token string">&quot;statefulsets&quot;</span>,
<span class="token string">&quot;horizontalpodautoscalers&quot;</span>,<span class="token string">&quot;replicationcontrollers&quot;</span>,<span class="token string">&quot;cronjobs&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>verbs：对资源对象的操作方法列表</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token string">&quot;get&quot;</span>, <span class="token string">&quot;list&quot;</span>, <span class="token string">&quot;watch&quot;</span>, <span class="token string">&quot;create&quot;</span>, <span class="token string">&quot;update&quot;</span>, <span class="token string">&quot;patch&quot;</span>, <span class="token string">&quot;delete&quot;</span>, <span class="token string">&quot;exec&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><p><strong>RoleBinding、ClusterRoleBinding</strong></p><p>角色绑定用来把一个角色绑定到一个目标对象上，绑定目标可以是User、Group或者ServiceAccount。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># RoleBinding可以将同一namespace中的subject绑定到某个Role下，则此subject即具有该Role定义的权限</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> RoleBinding
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1beta1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> authorization<span class="token punctuation">-</span>role<span class="token punctuation">-</span>binding
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> User
  <span class="token key atrule">name</span><span class="token punctuation">:</span> heima
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> Role
  <span class="token key atrule">name</span><span class="token punctuation">:</span> authorization<span class="token punctuation">-</span>role
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># ClusterRoleBinding在整个集群级别和所有namespaces将特定的subject与ClusterRole绑定，授予权限</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRoleBinding
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1beta1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
 <span class="token key atrule">name</span><span class="token punctuation">:</span> authorization<span class="token punctuation">-</span>clusterrole<span class="token punctuation">-</span>binding
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> User
  <span class="token key atrule">name</span><span class="token punctuation">:</span> heima
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
  <span class="token key atrule">name</span><span class="token punctuation">:</span> authorization<span class="token punctuation">-</span>clusterrole
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>RoleBinding引用ClusterRole进行授权</strong></p><p>RoleBinding可以引用ClusterRole，对属于同一命名空间内ClusterRole定义的资源主体进行授权。</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>    一种很常用的做法就是，集群管理员为集群范围预定义好一组角色（ClusterRole），然后在多个命名空间中重复使用这些ClusterRole。这样可以大幅提高授权管理工作效率，也使得各个命名空间下的基础性授权规则与使用体验保持一致。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># 虽然authorization-clusterrole是一个集群角色，但是因为使用了RoleBinding</span>
<span class="token comment"># 所以heima只能读取dev命名空间中的资源</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> RoleBinding
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1beta1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  name<span class="token punctuation">:</span> authorization<span class="token punctuation">-</span>role<span class="token punctuation">-</span>binding<span class="token punctuation">-</span>ns
  namespace<span class="token punctuation">:</span> dev
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> User
  name<span class="token punctuation">:</span> heima
  apiGroup<span class="token punctuation">:</span> rbac.authorization.k8s.io
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  kind<span class="token punctuation">:</span> ClusterRole
  name<span class="token punctuation">:</span> authorization<span class="token punctuation">-</span>clusterrole
  apiGroup<span class="token punctuation">:</span> rbac.authorization.k8s.io
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>实战：创建一个只能管理dev空间下Pods资源的账号</strong></p><ol><li>创建账号</li></ol><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 1) 创建证书</span>
<span class="token namespace">[root@master pki]</span><span class="token comment"># cd /etc/kubernetes/pki/</span>
<span class="token namespace">[root@master pki]</span><span class="token comment"># (umask 077;openssl genrsa -out devman.key 2048)</span>

<span class="token comment"># 2) 用apiserver的证书去签署</span>
<span class="token comment"># 2-1) 签名申请，申请的用户是devman,组是devgroup</span>
<span class="token namespace">[root@master pki]</span><span class="token comment"># openssl req -new -key devman.key -out devman.csr -subj &quot;/CN=devman/O=devgroup&quot;     </span>
<span class="token comment"># 2-2) 签署证书</span>
<span class="token namespace">[root@master pki]</span><span class="token comment"># openssl x509 -req -in devman.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out devman.crt -days 3650</span>

<span class="token comment"># 3) 设置集群、用户、上下文信息</span>
<span class="token namespace">[root@master pki]</span><span class="token comment"># kubectl config set-cluster kubernetes --embed-certs=true --certificate-authority=/etc/kubernetes/pki/ca.crt --server=https://192.168.109.100:6443</span>

<span class="token namespace">[root@master pki]</span><span class="token comment"># kubectl config set-credentials devman --embed-certs=true --client-certificate=/etc/kubernetes/pki/devman.crt --client-key=/etc/kubernetes/pki/devman.key</span>

<span class="token namespace">[root@master pki]</span><span class="token comment"># kubectl config set-context devman@kubernetes --cluster=kubernetes --user=devman</span>

<span class="token comment"># 切换账户到devman</span>
<span class="token namespace">[root@master pki]</span><span class="token comment"># kubectl config use-context devman@kubernetes</span>
Switched to context <span class="token string">&quot;devman@kubernetes&quot;</span><span class="token punctuation">.</span>

<span class="token comment"># 查看dev下pod，发现没有权限</span>
<span class="token namespace">[root@master pki]</span><span class="token comment"># kubectl get pods -n dev</span>
Error <span class="token keyword">from</span> server <span class="token punctuation">(</span>Forbidden<span class="token punctuation">)</span>: pods is forbidden: User <span class="token string">&quot;devman&quot;</span> cannot list resource <span class="token string">&quot;pods&quot;</span> in API <span class="token function">group</span> <span class="token string">&quot;&quot;</span> in the namespace <span class="token string">&quot;dev&quot;</span>

<span class="token comment"># 切换到admin账户</span>
<span class="token namespace">[root@master pki]</span><span class="token comment"># kubectl config use-context kubernetes-admin@kubernetes</span>
Switched to context <span class="token string">&quot;kubernetes-admin@kubernetes&quot;</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2） 创建Role和RoleBinding，为devman用户授权</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">kind</span><span class="token punctuation">:</span> Role
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1beta1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
  <span class="token key atrule">name</span><span class="token punctuation">:</span> dev<span class="token punctuation">-</span>role
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
  <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;pods&quot;</span><span class="token punctuation">]</span>
  <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;watch&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">]</span>
  
<span class="token punctuation">---</span>

<span class="token key atrule">kind</span><span class="token punctuation">:</span> RoleBinding
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1beta1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> authorization<span class="token punctuation">-</span>role<span class="token punctuation">-</span>binding
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> User
  <span class="token key atrule">name</span><span class="token punctuation">:</span> devman
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> Role
  <span class="token key atrule">name</span><span class="token punctuation">:</span> dev<span class="token punctuation">-</span>role
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token namespace">[root@master pki]</span><span class="token comment"># kubectl create -f dev-role.yaml</span>
role<span class="token punctuation">.</span>rbac<span class="token punctuation">.</span>authorization<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io/dev-role created
rolebinding<span class="token punctuation">.</span>rbac<span class="token punctuation">.</span>authorization<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io/authorization-role-binding created
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>切换账户，再次验证</li></ol><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 切换账户到devman</span>
<span class="token namespace">[root@master pki]</span><span class="token comment"># kubectl config use-context devman@kubernetes</span>
Switched to context <span class="token string">&quot;devman@kubernetes&quot;</span><span class="token punctuation">.</span>

<span class="token comment"># 再次查看</span>
<span class="token namespace">[root@master pki]</span><span class="token comment"># kubectl get pods -n dev</span>
NAME                                 READY   STATUS             RESTARTS   AGE
nginx-deployment-66cb59b984-8wp2k    1/1     Running            0          4d1h
nginx-deployment-66cb59b984-dc46j    1/1     Running            0          4d1h
nginx-deployment-66cb59b984-thfck    1/1     Running            0          4d1h

<span class="token comment"># 为了不影响后面的学习,切回admin账户</span>
<span class="token namespace">[root@master pki]</span><span class="token comment"># kubectl config use-context kubernetes-admin@kubernetes</span>
Switched to context <span class="token string">&quot;kubernetes-admin@kubernetes&quot;</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="准入控制" tabindex="-1"><a class="header-anchor" href="#准入控制" aria-hidden="true">#</a> 准入控制</h3><p>通过了前面的认证和授权之后，还需要经过准入控制处理通过之后，apiserver才会处理这个请求。</p><p>准入控制是一个可配置的控制器列表，可以通过在Api-Server上通过命令行设置选择执行哪些准入控制器：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token operator">--</span>admission-control=NamespaceLifecycle<span class="token punctuation">,</span>LimitRanger<span class="token punctuation">,</span>ServiceAccount<span class="token punctuation">,</span>PersistentVolumeLabel<span class="token punctuation">,</span>
                      DefaultStorageClass<span class="token punctuation">,</span>ResourceQuota<span class="token punctuation">,</span>DefaultTolerationSeconds
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>只有当所有的准入控制器都检查通过之后，apiserver才执行该请求，否则返回拒绝。</p><p>当前可配置的Admission Control准入控制如下：</p><ul><li>AlwaysAdmit：允许所有请求</li><li>AlwaysDeny：禁止所有请求，一般用于测试</li><li>AlwaysPullImages：在启动容器之前总去下载镜像</li><li>DenyExecOnPrivileged：它会拦截所有想在Privileged Container上执行命令的请求</li><li>ImagePolicyWebhook：这个插件将允许后端的一个Webhook程序来完成admission controller的功能。</li><li>Service Account：实现ServiceAccount实现了自动化</li><li>SecurityContextDeny：这个插件将使用SecurityContext的Pod中的定义全部失效</li><li>ResourceQuota：用于资源配额管理目的，观察所有请求，确保在namespace上的配额不会超标</li><li>LimitRanger：用于资源限制管理，作用于namespace上，确保对Pod进行资源限制</li><li>InitialResources：为未设置资源请求与限制的Pod，根据其镜像的历史资源的使用情况进行设置</li><li>NamespaceLifecycle：如果尝试在一个不存在的namespace中创建资源对象，则该创建请求将被拒绝。当删除一个namespace时，系统将会删除该namespace中所有对象。</li><li>DefaultStorageClass：为了实现共享存储的动态供应，为未指定StorageClass或PV的PVC尝试匹配默认的StorageClass，尽可能减少用户在申请PVC时所需了解的后端存储细节</li><li>DefaultTolerationSeconds：这个插件为那些没有设置forgiveness tolerations并具有notready:NoExecute和unreachable:NoExecute两种taints的Pod设置默认的“容忍”时间，为5min</li><li>PodSecurityPolicy：这个插件用于在创建或修改Pod时决定是否根据Pod的security context和可用的PodSecurityPolicy对Pod的安全策略进行控制</li></ul><h1 id="第十章-dashboard" tabindex="-1"><a class="header-anchor" href="#第十章-dashboard" aria-hidden="true">#</a> 第十章 DashBoard</h1><p>​ 之前在kubernetes中完成的所有操作都是通过命令行工具kubectl完成的。其实，为了提供更丰富的用户体验，kubernetes还开发了一个基于web的用户界面（Dashboard）。用户可以使用Dashboard部署容器化的应用，还可以监控应用的状态，执行故障排查以及管理kubernetes中各种资源。</p><h2 id="部署dashboard" tabindex="-1"><a class="header-anchor" href="#部署dashboard" aria-hidden="true">#</a> 部署Dashboard</h2><ol><li>下载yaml，并运行Dashboard</li></ol><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 下载yaml</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># wget  https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0/aio/deploy/recommended.yaml</span>

<span class="token comment"># 修改kubernetes-dashboard的Service类型</span>
kind: Service
apiVersion: v1
metadata:
  labels:
    k8s-app: kubernetes-dashboard
  name: kubernetes-dashboard
  namespace: kubernetes-dashboard
spec:
  <span class="token function">type</span>: NodePort  <span class="token comment"># 新增</span>
  ports:
    <span class="token operator">-</span> port: 443
      targetPort: 8443
      nodePort: 30009  <span class="token comment"># 新增</span>
  selector:
    k8s-app: kubernetes-dashboard

<span class="token comment"># 部署</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl create -f recommended.yaml</span>

<span class="token comment"># 查看namespace下的kubernetes-dashboard下的资源</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get pod,svc -n kubernetes-dashboard</span>
NAME                                            READY   STATUS    RESTARTS   AGE
pod/dashboard-metrics-scraper-c79c65bb7-zwfvw   1/1     Running   0          111s
pod/kubernetes-dashboard-56484d4c5-z95z5        1/1     Running   0          111s

NAME                               <span class="token function">TYPE</span>       CLUSTER-IP      EXTERNAL-IP  PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>         AGE
service/dashboard-metrics-scraper  ClusterIP  10<span class="token punctuation">.</span>96<span class="token punctuation">.</span>89<span class="token punctuation">.</span>218    &lt;none&gt;       8000/TCP        111s
service/kubernetes-dashboard       NodePort   10<span class="token punctuation">.</span>104<span class="token punctuation">.</span>178<span class="token punctuation">.</span>171  &lt;none&gt;       443:30009/TCP   111s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2）创建访问账户，获取token</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 创建账号</span>
<span class="token namespace">[root@master-1 ~]</span><span class="token comment"># kubectl create serviceaccount dashboard-admin -n kubernetes-dashboard</span>

<span class="token comment"># 授权</span>
<span class="token namespace">[root@master-1 ~]</span><span class="token comment"># kubectl create clusterrolebinding dashboard-admin-rb --clusterrole=cluster-admin --serviceaccount=kubernetes-dashboard:dashboard-admin</span>

<span class="token comment"># 获取账号token</span>
<span class="token namespace">[root@master ~]</span><span class="token comment">#  kubectl get secrets -n kubernetes-dashboard | grep dashboard-admin</span>
dashboard-admin-token-xbqhh        kubernetes<span class="token punctuation">.</span>io/service-account-token   3      2m35s

<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl describe secrets dashboard-admin-token-xbqhh -n kubernetes-dashboard</span>
Name:         dashboard-admin-token-xbqhh
Namespace:    kubernetes-dashboard
Labels:       &lt;none&gt;
Annotations:  kubernetes<span class="token punctuation">.</span>io/service-account<span class="token punctuation">.</span>name: dashboard-admin
              kubernetes<span class="token punctuation">.</span>io/service-account<span class="token punctuation">.</span>uid: 95d84d80-be7a-4d10-a2e0-68f90222d039

<span class="token function">Type</span>:  kubernetes<span class="token punctuation">.</span>io/service-account-token

<span class="token keyword">Data</span>
====
namespace:  20 bytes
token:      eyJhbGciOiJSUzI1NiIsImtpZCI6ImJrYkF4bW5XcDhWcmNGUGJtek5NODFuSXl1aWptMmU2M3o4LTY5a2FKS2cifQ<span class="token punctuation">.</span>eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlcm5ldGVzLWRhc2hib2FyZCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJkYXNoYm9hcmQtYWRtaW4tdG9rZW4teGJxaGgiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoiZGFzaGJvYXJkLWFkbWluIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQudWlkIjoiOTVkODRkODAtYmU3YS00ZDEwLWEyZTAtNjhmOTAyMjJkMDM5Iiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmVybmV0ZXMtZGFzaGJvYXJkOmRhc2hib2FyZC1hZG1pbiJ9<span class="token punctuation">.</span>NAl7e8ZfWWdDoPxkqzJzTB46sK9E8iuJYnUI9vnBaY3Jts7T1g1msjsBnbxzQSYgAG-<span class="token operator">-</span>cV0WYxjndzJY_UWCwaGPrQrt_GunxmOK9AUnzURqm55GR2RXIZtjsWVP2EBatsDgHRmuUbQvTFOvdJB4x3nXcYLN2opAaMqg3rnU2rr-A8zCrIuX_eca12wIp_QiuP3SF-tzpdLpsyRfegTJZl6YnSGyaVkC9id-cxZRb307qdCfXPfCHR_2rt5FVfxARgg_C0e3eFHaaYQO7CitxsnIoIXpOFNAR8aUrmopJyODQIPqBWUehb7FhlU1DCduHnIIXVC_UICZ-MKYewBDLw
ca<span class="token punctuation">.</span>crt:     1025 bytes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3）通过浏览器访问Dashboard的UI</p><p>在登录页面上输入上面的token</p><p>&lt;img src=&quot;./assets/image-20200520144548997.png&quot; alt=&quot;image-20200520144548997&quot; style=&quot;zoom:80%;border:1px solid&quot; /&gt;</p><p>出现下面的页面代表成功</p><p>&lt;img src=&quot;./assets/image-20200520144959353.png&quot; alt=&quot;image-20200520144959353&quot; style=&quot;zoom:80%;border:1px solid&quot; /&gt;</p><h2 id="使用dashboard" tabindex="-1"><a class="header-anchor" href="#使用dashboard" aria-hidden="true">#</a> 使用DashBoard</h2><p>本章节以Deployment为例演示DashBoard的使用</p><p><strong>查看</strong></p><p>选择指定的命名空间<code>dev</code>，然后点击<code>Deployments</code>，查看dev空间下的所有deployment</p><p>&lt;img src=&quot;./assets/image-20200520154628679.png&quot; style=&quot;zoom:90%;border:1px solid&quot; /&gt;</p><p><strong>扩缩容</strong></p><p>在<code>Deployment</code>上点击<code>规模</code>，然后指定<code>目标副本数量</code>，点击确定</p><p>&lt;img src=&quot;./assets/image-20200520162605102.png&quot; style=&quot;zoom:90%;border:1px solid&quot; /&gt;</p><p><strong>编辑</strong></p><p>在<code>Deployment</code>上点击<code>编辑</code>，然后修改<code>yaml文件</code>，点击确定</p><p>&lt;img src=&quot;./assets/image-20200520163253644.png&quot; alt=&quot;image-20200520163253644&quot; style=&quot;zoom:100%;border:1px solid&quot; /&gt;</p><p><strong>查看Pod</strong></p><p>点击<code>Pods</code>, 查看pods列表</p><p>&lt;img src=&quot;./assets/image-20200520163552110.png&quot; style=&quot;zoom:90%;border:1px solid&quot; /&gt;</p><p><strong>操作Pod</strong></p><p>选中某个Pod，可以对其执行日志（logs）、进入执行（exec）、编辑、删除操作</p><p>&lt;img src=&quot;./assets/image-20200520163832827.png&quot; style=&quot;zoom:90%;border:1px solid&quot; /&gt;</p><blockquote><p>Dashboard提供了kubectl的绝大部分功能，这里不再一一演示</p></blockquote>`,277),i=[l];function c(o,u){return s(),a("div",null,i)}const d=n(p,[["render",c],["__file","service.html.vue"]]);export{d as default};
