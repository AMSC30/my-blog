import{_ as n,p as s,q as a,Y as e}from"./framework-e1bed10d.js";const l="/my-blog/assets/image-20200612005334159-b2b6f663.png",p="/my-blog/assets/image-20200612005524778-fca1400b.png",t="/my-blog/assets/image-20200608163326496-e4296085.png",i="/my-blog/assets/image-20200612010223537-2e21864e.png",c={},o=e('<h1 id="第四章-pod控制器详解" tabindex="-1"><a class="header-anchor" href="#第四章-pod控制器详解" aria-hidden="true">#</a> 第四章 Pod控制器详解</h1><p>本章节主要介绍各种Pod控制器的详细使用。</p><h2 id="pod控制器介绍" tabindex="-1"><a class="header-anchor" href="#pod控制器介绍" aria-hidden="true">#</a> Pod控制器介绍</h2><p>Pod是kubernetes的最小管理单元，在kubernetes中，按照pod的创建方式可以将其分为两类：</p><ul><li><p>自主式pod：kubernetes直接创建出来的Pod，这种pod删除后就没有了，也不会重建</p></li><li><p>控制器创建的pod：kubernetes通过控制器创建的pod，这种pod删除了之后还会自动重建</p></li></ul><blockquote><p><strong><code>什么是Pod控制器</code></strong></p><p>​ Pod控制器是管理pod的中间层，使用Pod控制器之后，只需要告诉Pod控制器，想要多少个什么样的Pod就可以了，它会创建出满足条件的Pod并确保每一个Pod资源处于用户期望的目标状态。如果Pod资源在运行中出现故障，它会基于指定策略重新编排Pod。</p></blockquote><p>在kubernetes中，有很多类型的pod控制器，每种都有自己的适合的场景，常见的有下面这些：</p><ul><li><p>ReplicationController：比较原始的pod控制器，已经被废弃，由ReplicaSet替代</p></li><li><p>ReplicaSet：保证副本数量一直维持在期望值，并支持pod数量扩缩容，镜像版本升级</p></li><li><p>Deployment：通过控制ReplicaSet来控制Pod，并支持滚动升级、回退版本</p></li><li><p>Horizontal Pod Autoscaler：可以根据集群负载自动水平调整Pod的数量，实现削峰填谷</p></li><li><p>DaemonSet：在集群中的指定Node上运行且仅运行一个副本，一般用于守护进程类的任务</p></li><li><p>Job：它创建出来的pod只要完成任务就立即退出，不需要重启或重建，用于执行一次性任务</p></li><li><p>Cronjob：它创建的Pod负责周期性任务控制，不需要持续后台运行</p></li><li><p>StatefulSet：管理有状态应用</p></li></ul><h2 id="replicaset-rs" tabindex="-1"><a class="header-anchor" href="#replicaset-rs" aria-hidden="true">#</a> ReplicaSet(RS)</h2><p>​ ReplicaSet的主要作用是<strong>保证一定数量的pod正常运行</strong>，它会持续监听这些Pod的运行状态，一旦Pod发生故障，就会重启或重建。同时它还支持对pod数量的扩缩容和镜像版本的升降级。</p><p><img src="'+l+`" alt=""></p><p>ReplicaSet的资源清单文件：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1 <span class="token comment"># 版本号</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ReplicaSet <span class="token comment"># 类型       </span>
<span class="token key atrule">metadata</span><span class="token punctuation">:</span> <span class="token comment"># 元数据</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token comment"># rs名称 </span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> <span class="token comment"># 所属命名空间 </span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span> <span class="token comment">#标签</span>
    <span class="token key atrule">controller</span><span class="token punctuation">:</span> rs
<span class="token key atrule">spec</span><span class="token punctuation">:</span> <span class="token comment"># 详情描述</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">3</span> <span class="token comment"># 副本数量</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span> <span class="token comment"># 选择器，通过它指定该控制器管理哪些pod</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>      <span class="token comment"># Labels匹配规则</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>pod
    <span class="token key atrule">matchExpressions</span><span class="token punctuation">:</span> <span class="token comment"># Expressions匹配规则</span>
      <span class="token punctuation">-</span> <span class="token punctuation">{</span><span class="token key atrule">key</span><span class="token punctuation">:</span> app<span class="token punctuation">,</span> <span class="token key atrule">operator</span><span class="token punctuation">:</span> In<span class="token punctuation">,</span> <span class="token key atrule">values</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>nginx<span class="token punctuation">-</span>pod<span class="token punctuation">]</span><span class="token punctuation">}</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span> <span class="token comment"># 模板，当副本数量不足时，会根据下面的模板创建pod副本</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>pod
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
        <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.17.1
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里面，需要新了解的配置项就是<code>spec</code>下面几个选项：</p><ul><li><p>replicas：指定副本数量，其实就是当前rs创建出来的pod的数量，默认为1</p></li><li><p>selector：选择器，它的作用是建立pod控制器和pod之间的关联关系，采用的Label Selector机制</p><p>​ 在pod模板上定义label，在控制器上定义选择器，就可以表明当前控制器能管理哪些pod了</p></li><li><p>template：模板，就是当前控制器创建pod所使用的模板板，里面其实就是前一章学过的pod的定义</p></li></ul><p><strong>创建ReplicaSet</strong></p><p>创建pc-replicaset.yaml文件，内容如下：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ReplicaSet   
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pc<span class="token punctuation">-</span>replicaset
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 创建rs</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl create -f pc-replicaset.yaml</span>
replicaset<span class="token punctuation">.</span>apps/pc-replicaset created

<span class="token comment"># 查看rs</span>
<span class="token comment"># DESIRED:期望副本数量  </span>
<span class="token comment"># CURRENT:当前副本数量  </span>
<span class="token comment"># READY:已经准备好提供服务的副本数量</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get rs pc-replicaset -n dev -o wide</span>
NAME          DESIRED   CURRENT READY AGE   CONTAINERS   IMAGES             SELECTOR
pc-replicaset 3         3       3     22s   nginx        nginx:1<span class="token punctuation">.</span>17<span class="token punctuation">.</span>1       app=nginx-pod

<span class="token comment"># 查看当前控制器创建出来的pod</span>
<span class="token comment"># 这里发现控制器创建出来的pod的名称是在控制器名称后面拼接了-xxxxx随机码</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get pod -n dev</span>
NAME                          READY   STATUS    RESTARTS   AGE
pc-replicaset-6vmvt   1/1     Running   0          54s
pc-replicaset-fmb8f   1/1     Running   0          54s
pc-replicaset-snrk2   1/1     Running   0          54s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>扩缩容</strong></p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 编辑rs的副本数量，修改spec:replicas: 6即可</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl edit rs pc-replicaset -n dev</span>
replicaset<span class="token punctuation">.</span>apps/pc-replicaset edited

<span class="token comment"># 查看pod</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get pods -n dev</span>
NAME                          READY   STATUS    RESTARTS   AGE
pc-replicaset-6vmvt   1/1     Running   0          114m
pc-replicaset-cftnp   1/1     Running   0          10s
pc-replicaset-fjlm6   1/1     Running   0          10s
pc-replicaset-fmb8f   1/1     Running   0          114m
pc-replicaset-s2whj   1/1     Running   0          10s
pc-replicaset-snrk2   1/1     Running   0          114m

<span class="token comment"># 当然也可以直接使用命令实现</span>
<span class="token comment"># 使用scale命令实现扩缩容， 后面--replicas=n直接指定目标数量即可</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl scale rs pc-replicaset --replicas=2 -n dev</span>
replicaset<span class="token punctuation">.</span>apps/pc-replicaset scaled

<span class="token comment"># 命令运行完毕，立即查看，发现已经有4个开始准备退出了</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get pods -n dev</span>
NAME                       READY   STATUS        RESTARTS   AGE
pc-replicaset-6vmvt   0/1     Terminating   0          118m
pc-replicaset-cftnp   0/1     Terminating   0          4m17s
pc-replicaset-fjlm6   0/1     Terminating   0          4m17s
pc-replicaset-fmb8f   1/1     Running       0          118m
pc-replicaset-s2whj   0/1     Terminating   0          4m17s
pc-replicaset-snrk2   1/1     Running       0          118m

<span class="token comment">#稍等片刻，就只剩下2个了</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get pods -n dev</span>
NAME                       READY   STATUS    RESTARTS   AGE
pc-replicaset-fmb8f   1/1     Running   0          119m
pc-replicaset-snrk2   1/1     Running   0          119m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>镜像升级</strong></p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 编辑rs的容器镜像 - image: nginx:1.17.2</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl edit rs pc-replicaset -n dev</span>
replicaset<span class="token punctuation">.</span>apps/pc-replicaset edited

<span class="token comment"># 再次查看，发现镜像版本已经变更了</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get rs -n dev -o wide</span>
NAME                DESIRED  CURRENT   READY   AGE    CONTAINERS   IMAGES        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
pc-replicaset       2        2         2       140m   nginx         nginx:1<span class="token punctuation">.</span>17<span class="token punctuation">.</span>2  <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

<span class="token comment"># 同样的道理，也可以使用命令完成这个工作</span>
<span class="token comment"># kubectl set image rs rs名称 容器=镜像版本 -n namespace</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl set image rs pc-replicaset nginx=nginx:1.17.1  -n dev</span>
replicaset<span class="token punctuation">.</span>apps/pc-replicaset image updated

<span class="token comment"># 再次查看，发现镜像版本已经变更了</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get rs -n dev -o wide</span>
NAME                 DESIRED  CURRENT   READY   AGE    CONTAINERS   IMAGES            <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
pc-replicaset        2        2         2       145m   nginx        nginx:1<span class="token punctuation">.</span>17<span class="token punctuation">.</span>1 <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>删除ReplicaSet</strong></p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 使用kubectl delete命令会删除此RS以及它管理的Pod</span>
<span class="token comment"># 在kubernetes删除RS前，会将RS的replicasclear调整为0，等待所有的Pod被删除后，在执行RS对象的删除</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl delete rs pc-replicaset -n dev</span>
replicaset<span class="token punctuation">.</span>apps <span class="token string">&quot;pc-replicaset&quot;</span> deleted
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get pod -n dev -o wide</span>
No resources found in dev namespace<span class="token punctuation">.</span>

<span class="token comment"># 如果希望仅仅删除RS对象（保留Pod），可以使用kubectl delete命令时添加--cascade=false选项（不推荐）。</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl delete rs pc-replicaset -n dev --cascade=false</span>
replicaset<span class="token punctuation">.</span>apps <span class="token string">&quot;pc-replicaset&quot;</span> deleted
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get pods -n dev</span>
NAME                  READY   STATUS    RESTARTS   AGE
pc-replicaset-cl82j   1/1     Running   0          75s
pc-replicaset-dslhb   1/1     Running   0          75s

<span class="token comment"># 也可以使用yaml直接删除(推荐)</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl delete -f pc-replicaset.yaml</span>
replicaset<span class="token punctuation">.</span>apps <span class="token string">&quot;pc-replicaset&quot;</span> deleted
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="deployment-deploy" tabindex="-1"><a class="header-anchor" href="#deployment-deploy" aria-hidden="true">#</a> Deployment(Deploy)</h2><p>​ 为了更好的解决服务编排的问题，kubernetes在V1.2版本开始，引入了Deployment控制器。值得一提的是，这种控制器并不直接管理pod，而是通过管理ReplicaSet来简介管理Pod，即：Deployment管理ReplicaSet，ReplicaSet管理Pod。所以Deployment比ReplicaSet功能更加强大。</p><p><img src="`+p+`" alt=""></p><p>Deployment主要功能有下面几个：</p><ul><li>支持ReplicaSet的所有功能</li><li>支持发布的停止、继续</li><li>支持滚动升级和回滚版本</li></ul><p>Deployment的资源清单文件：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1 <span class="token comment"># 版本号</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment <span class="token comment"># 类型       </span>
<span class="token key atrule">metadata</span><span class="token punctuation">:</span> <span class="token comment"># 元数据</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token comment"># rs名称 </span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> <span class="token comment"># 所属命名空间 </span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span> <span class="token comment">#标签</span>
    <span class="token key atrule">controller</span><span class="token punctuation">:</span> deploy
<span class="token key atrule">spec</span><span class="token punctuation">:</span> <span class="token comment"># 详情描述</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">3</span> <span class="token comment"># 副本数量</span>
  <span class="token key atrule">revisionHistoryLimit</span><span class="token punctuation">:</span> <span class="token number">3</span> <span class="token comment"># 保留历史版本</span>
  <span class="token key atrule">paused</span><span class="token punctuation">:</span> <span class="token boolean important">false</span> <span class="token comment"># 暂停部署，默认是false</span>
  <span class="token key atrule">progressDeadlineSeconds</span><span class="token punctuation">:</span> <span class="token number">600</span> <span class="token comment"># 部署超时时间（s），默认是600</span>
  <span class="token key atrule">strategy</span><span class="token punctuation">:</span> <span class="token comment"># 策略</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> RollingUpdate <span class="token comment"># 滚动更新策略</span>
    <span class="token key atrule">rollingUpdate</span><span class="token punctuation">:</span> <span class="token comment"># 滚动更新</span>
      <span class="token key atrule">maxSurge</span><span class="token punctuation">:</span> 30% <span class="token comment"># 最大额外可以存在的副本数，可以为百分比，也可以为整数</span>
      <span class="token key atrule">maxUnavailable</span><span class="token punctuation">:</span> 30% <span class="token comment"># 最大不可用状态的 Pod 的最大值，可以为百分比，也可以为整数</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span> <span class="token comment"># 选择器，通过它指定该控制器管理哪些pod</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>      <span class="token comment"># Labels匹配规则</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>pod
    <span class="token key atrule">matchExpressions</span><span class="token punctuation">:</span> <span class="token comment"># Expressions匹配规则</span>
      <span class="token punctuation">-</span> <span class="token punctuation">{</span><span class="token key atrule">key</span><span class="token punctuation">:</span> app<span class="token punctuation">,</span> <span class="token key atrule">operator</span><span class="token punctuation">:</span> In<span class="token punctuation">,</span> <span class="token key atrule">values</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>nginx<span class="token punctuation">-</span>pod<span class="token punctuation">]</span><span class="token punctuation">}</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span> <span class="token comment"># 模板，当副本数量不足时，会根据下面的模板创建pod副本</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>pod
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
        <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.17.1
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>创建deployment</strong></p><p>创建pc-deployment.yaml，内容如下：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 创建deployment</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl create -f pc-deployment.yaml --record=true</span>
deployment<span class="token punctuation">.</span>apps/pc-deployment created

<span class="token comment"># 查看deployment</span>
<span class="token comment"># UP-TO-DATE 最新版本的pod的数量</span>
<span class="token comment"># AVAILABLE  当前可用的pod的数量</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get deploy pc-deployment -n dev</span>
NAME            READY   UP-TO-DATE   AVAILABLE   AGE
pc-deployment   3/3     3            3           15s

<span class="token comment"># 查看rs</span>
<span class="token comment"># 发现rs的名称是在原来deployment的名字后面添加了一个10位数的随机串</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get rs -n dev</span>
NAME                       DESIRED   CURRENT   READY   AGE
pc-deployment-6696798b78   3         3         3       23s

<span class="token comment"># 查看pod</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get pods -n dev</span>
NAME                             READY   STATUS    RESTARTS   AGE
pc-deployment-6696798b78-d2c8n   1/1     Running   0          107s
pc-deployment-6696798b78-smpvp   1/1     Running   0          107s
pc-deployment-6696798b78-wvjd8   1/1     Running   0          107s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>扩缩容</strong></p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 变更副本数量为5个</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl scale deploy pc-deployment --replicas=5  -n dev</span>
deployment<span class="token punctuation">.</span>apps/pc-deployment scaled

<span class="token comment"># 查看deployment</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get deploy pc-deployment -n dev</span>
NAME            READY   UP-TO-DATE   AVAILABLE   AGE
pc-deployment   5/5     5            5           2m

<span class="token comment"># 查看pod</span>
<span class="token namespace">[root@master ~]</span><span class="token comment">#  kubectl get pods -n dev</span>
NAME                             READY   STATUS    RESTARTS   AGE
pc-deployment-6696798b78-d2c8n   1/1     Running   0          4m19s
pc-deployment-6696798b78-jxmdq   1/1     Running   0          94s
pc-deployment-6696798b78-mktqv   1/1     Running   0          93s
pc-deployment-6696798b78-smpvp   1/1     Running   0          4m19s
pc-deployment-6696798b78-wvjd8   1/1     Running   0          4m19s

<span class="token comment"># 编辑deployment的副本数量，修改spec:replicas: 4即可</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl edit deploy pc-deployment -n dev</span>
deployment<span class="token punctuation">.</span>apps/pc-deployment edited

<span class="token comment"># 查看pod</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get pods -n dev</span>
NAME                             READY   STATUS    RESTARTS   AGE
pc-deployment-6696798b78-d2c8n   1/1     Running   0          5m23s
pc-deployment-6696798b78-jxmdq   1/1     Running   0          2m38s
pc-deployment-6696798b78-smpvp   1/1     Running   0          5m23s
pc-deployment-6696798b78-wvjd8   1/1     Running   0          5m23s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>镜像更新</strong></p><p>deployment支持两种更新策略:<code>重建更新</code>和<code>滚动更新</code>,可以通过<code>strategy</code>指定策略类型,支持两个属性:</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>strategy：指定新的Pod替换旧的Pod的策略， 支持两个属性：
  type：指定策略类型，支持两种策略
    Recreate：在创建出新的Pod之前会先杀掉所有已存在的Pod
    RollingUpdate：滚动更新，就是杀死一部分，就启动一部分，在更新过程中，存在两个版本Pod
  rollingUpdate：当type为RollingUpdate时生效，用于为RollingUpdate设置参数，支持两个属性：
    maxUnavailable：用来指定在升级过程中不可用Pod的最大数量，默认为25%。
    maxSurge： 用来指定在升级过程中可以超过期望的Pod的最大数量，默认为25%。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重建更新</p><ol><li>编辑pc-deployment.yaml,在spec节点下添加更新策略</li></ol><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">strategy</span><span class="token punctuation">:</span> <span class="token comment"># 策略</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> Recreate <span class="token comment"># 重建更新</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>创建deploy进行验证</li></ol><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 变更镜像</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl set image deployment pc-deployment nginx=nginx:1.17.2 -n dev</span>
deployment<span class="token punctuation">.</span>apps/pc-deployment image updated

<span class="token comment"># 观察升级过程</span>
<span class="token namespace">[root@master ~]</span><span class="token comment">#  kubectl get pods -n dev -w</span>
NAME                             READY   STATUS    RESTARTS   AGE
pc-deployment-5d89bdfbf9-65qcw   1/1     Running   0          31s
pc-deployment-5d89bdfbf9-w5nzv   1/1     Running   0          31s
pc-deployment-5d89bdfbf9-xpt7w   1/1     Running   0          31s

pc-deployment-5d89bdfbf9-xpt7w   1/1     Terminating   0          41s
pc-deployment-5d89bdfbf9-65qcw   1/1     Terminating   0          41s
pc-deployment-5d89bdfbf9-w5nzv   1/1     Terminating   0          41s

pc-deployment-675d469f8b-grn8z   0/1     Pending       0          0s
pc-deployment-675d469f8b-hbl4v   0/1     Pending       0          0s
pc-deployment-675d469f8b-67nz2   0/1     Pending       0          0s

pc-deployment-675d469f8b-grn8z   0/1     ContainerCreating   0          0s
pc-deployment-675d469f8b-hbl4v   0/1     ContainerCreating   0          0s
pc-deployment-675d469f8b-67nz2   0/1     ContainerCreating   0          0s

pc-deployment-675d469f8b-grn8z   1/1     Running             0          1s
pc-deployment-675d469f8b-67nz2   1/1     Running             0          1s
pc-deployment-675d469f8b-hbl4v   1/1     Running             0          2s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>滚动更新</p><ol><li>编辑pc-deployment.yaml,在spec节点下添加更新策略</li></ol><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">strategy</span><span class="token punctuation">:</span> <span class="token comment"># 策略</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> RollingUpdate <span class="token comment"># 滚动更新策略</span>
    <span class="token key atrule">rollingUpdate</span><span class="token punctuation">:</span>
      <span class="token key atrule">maxSurge</span><span class="token punctuation">:</span> 25% 
      <span class="token key atrule">maxUnavailable</span><span class="token punctuation">:</span> 25%
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>创建deploy进行验证</li></ol><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 变更镜像</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl set image deployment pc-deployment nginx=nginx:1.17.3 -n dev</span>
deployment<span class="token punctuation">.</span>apps/pc-deployment image updated

<span class="token comment"># 观察升级过程</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get pods -n dev -w</span>
NAME                           READY   STATUS    RESTARTS   AGE
pc-deployment-c848d767-8rbzt   1/1     Running   0          31m
pc-deployment-c848d767-h4p68   1/1     Running   0          31m
pc-deployment-c848d767-hlmz4   1/1     Running   0          31m
pc-deployment-c848d767-rrqcn   1/1     Running   0          31m

pc-deployment-966bf7f44-226rx   0/1     Pending             0          0s
pc-deployment-966bf7f44-226rx   0/1     ContainerCreating   0          0s
pc-deployment-966bf7f44-226rx   1/1     Running             0          1s
pc-deployment-c848d767-h4p68    0/1     Terminating         0          34m

pc-deployment-966bf7f44-cnd44   0/1     Pending             0          0s
pc-deployment-966bf7f44-cnd44   0/1     ContainerCreating   0          0s
pc-deployment-966bf7f44-cnd44   1/1     Running             0          2s
pc-deployment-c848d767-hlmz4    0/1     Terminating         0          34m

pc-deployment-966bf7f44-px48p   0/1     Pending             0          0s
pc-deployment-966bf7f44-px48p   0/1     ContainerCreating   0          0s
pc-deployment-966bf7f44-px48p   1/1     Running             0          0s
pc-deployment-c848d767-8rbzt    0/1     Terminating         0          34m

pc-deployment-966bf7f44-dkmqp   0/1     Pending             0          0s
pc-deployment-966bf7f44-dkmqp   0/1     ContainerCreating   0          0s
pc-deployment-966bf7f44-dkmqp   1/1     Running             0          2s
pc-deployment-c848d767-rrqcn    0/1     Terminating         0          34m

<span class="token comment"># 至此，新版本的pod创建完毕，就版本的pod销毁完毕</span>
<span class="token comment"># 中间过程是滚动进行的，也就是边销毁边创建</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>滚动更新的过程：</p><p>&lt;img src=&quot;./assets/image-20200416140251491.png&quot; style=&quot;zoom:150%;border:1px solid&quot; /&gt;</p><p>镜像更新中rs的变化:</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 查看rs,发现原来的rs的依旧存在，只是pod数量变为了0，而后又新产生了一个rs，pod数量为4</span>
<span class="token comment"># 其实这就是deployment能够进行版本回退的奥妙所在，后面会详细解释</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get rs -n dev</span>
NAME                       DESIRED   CURRENT   READY   AGE
pc-deployment-6696798b78   0         0         0       7m37s
pc-deployment-6696798b11   0         0         0       5m37s
pc-deployment-c848d76789   4         4         4       72s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>版本回退</strong></p><p>deployment支持版本升级过程中的暂停、继续功能以及版本回退等诸多功能，下面具体来看.</p><p>kubectl rollout： 版本升级相关功能，支持下面的选项：</p><ul><li><p>status 显示当前升级状态</p></li><li><p>history 显示 升级历史记录</p></li><li><p>pause 暂停版本升级过程</p></li><li><p>resume 继续已经暂停的版本升级过程</p></li><li><p>restart 重启版本升级过程</p></li><li><p>undo 回滚到上一级版本（可以使用--to-revision回滚到指定版本）</p></li></ul><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 查看当前升级版本的状态</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl rollout status deploy pc-deployment -n dev</span>
deployment <span class="token string">&quot;pc-deployment&quot;</span> successfully rolled out

<span class="token comment"># 查看升级历史记录</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl rollout history deploy pc-deployment -n dev</span>
deployment<span class="token punctuation">.</span>apps/pc-deployment
REVISION  CHANGE-CAUSE
1         kubectl create <span class="token operator">--</span>filename=pc-deployment<span class="token punctuation">.</span>yaml <span class="token operator">--</span>record=true
2         kubectl create <span class="token operator">--</span>filename=pc-deployment<span class="token punctuation">.</span>yaml <span class="token operator">--</span>record=true
3         kubectl create <span class="token operator">--</span>filename=pc-deployment<span class="token punctuation">.</span>yaml <span class="token operator">--</span>record=true
<span class="token comment"># 可以发现有三次版本记录，说明完成过两次升级</span>

<span class="token comment"># 版本回滚</span>
<span class="token comment"># 这里直接使用--to-revision=1回滚到了1版本， 如果省略这个选项，就是回退到上个版本，就是2版本</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl rollout undo deployment pc-deployment --to-revision=1 -n dev</span>
deployment<span class="token punctuation">.</span>apps/pc-deployment rolled back

<span class="token comment"># 查看发现，通过nginx镜像版本可以发现到了第一版</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get deploy -n dev -o wide</span>
NAME            READY   UP-TO-DATE   AVAILABLE   AGE   CONTAINERS   IMAGES         
pc-deployment   4/4     4            4           74m   nginx        nginx:1<span class="token punctuation">.</span>17<span class="token punctuation">.</span>1   

<span class="token comment"># 查看rs，发现第一个rs中有4个pod运行，后面两个版本的rs中pod为运行</span>
<span class="token comment"># 其实deployment之所以可是实现版本的回滚，就是通过记录下历史rs来实现的，</span>
<span class="token comment"># 一旦想回滚到哪个版本，只需要将当前版本pod数量降为0，然后将回滚版本的pod提升为目标数量就可以了</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get rs -n dev</span>
NAME                       DESIRED   CURRENT   READY   AGE
pc-deployment-6696798b78   4         4         4       78m
pc-deployment-966bf7f44    0         0         0       37m
pc-deployment-c848d767     0         0         0       71m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>金丝雀发布</strong></p><p>​ Deployment控制器支持控制更新过程中的控制，如“暂停(pause)”或“继续(resume)”更新操作。</p><p>​ 比如有一批新的Pod资源创建完成后立即暂停更新过程，此时，仅存在一部分新版本的应用，主体部分还是旧的版本。然后，再筛选一小部分的用户请求路由到新版本的Pod应用，继续观察能否稳定地按期望的方式运行。确定没问题之后再继续完成余下的Pod资源滚动更新，否则立即回滚更新操作。这就是所谓的金丝雀发布。</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 更新deployment的版本，并配置暂停deployment</span>
<span class="token namespace">[root@master ~]</span><span class="token comment">#  kubectl set image deploy pc-deployment nginx=nginx:1.17.4 -n dev &amp;&amp; kubectl rollout pause deployment pc-deployment  -n dev</span>
deployment<span class="token punctuation">.</span>apps/pc-deployment image updated
deployment<span class="token punctuation">.</span>apps/pc-deployment paused

<span class="token comment">#观察更新状态</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl rollout status deploy pc-deployment -n dev　</span>
Waiting <span class="token keyword">for</span> deployment <span class="token string">&quot;pc-deployment&quot;</span> rollout to finish: 2 out of 4 new replicas have been updated<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

<span class="token comment"># 监控更新的过程，可以看到已经新增了一个资源，但是并未按照预期的状态去删除一个旧的资源，就是因为使用了pause暂停命令</span>

<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get rs -n dev -o wide</span>
NAME                       DESIRED   CURRENT   READY   AGE     CONTAINERS   IMAGES         
pc-deployment-5d89bdfbf9   3         3         3       19m     nginx        nginx:1<span class="token punctuation">.</span>17<span class="token punctuation">.</span>1   
pc-deployment-675d469f8b   0         0         0       14m     nginx        nginx:1<span class="token punctuation">.</span>17<span class="token punctuation">.</span>2   
pc-deployment-6c9f56fcfb   2         2         2       3m16s   nginx        nginx:1<span class="token punctuation">.</span>17<span class="token punctuation">.</span>4   
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get pods -n dev</span>
NAME                             READY   STATUS    RESTARTS   AGE
pc-deployment-5d89bdfbf9-rj8sq   1/1     Running   0          7m33s
pc-deployment-5d89bdfbf9-ttwgg   1/1     Running   0          7m35s
pc-deployment-5d89bdfbf9-v4wvc   1/1     Running   0          7m34s
pc-deployment-6c9f56fcfb-996rt   1/1     Running   0          3m31s
pc-deployment-6c9f56fcfb-j2gtj   1/1     Running   0          3m31s

<span class="token comment"># 确保更新的pod没问题了，继续更新</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl rollout resume deploy pc-deployment -n dev</span>
deployment<span class="token punctuation">.</span>apps/pc-deployment resumed

<span class="token comment"># 查看最后的更新情况</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get rs -n dev -o wide</span>
NAME                       DESIRED   CURRENT   READY   AGE     CONTAINERS   IMAGES         
pc-deployment-5d89bdfbf9   0         0         0       21m     nginx        nginx:1<span class="token punctuation">.</span>17<span class="token punctuation">.</span>1   
pc-deployment-675d469f8b   0         0         0       16m     nginx        nginx:1<span class="token punctuation">.</span>17<span class="token punctuation">.</span>2   
pc-deployment-6c9f56fcfb   4         4         4       5m11s   nginx        nginx:1<span class="token punctuation">.</span>17<span class="token punctuation">.</span>4   

<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get pods -n dev</span>
NAME                             READY   STATUS    RESTARTS   AGE
pc-deployment-6c9f56fcfb-7bfwh   1/1     Running   0          37s
pc-deployment-6c9f56fcfb-996rt   1/1     Running   0          5m27s
pc-deployment-6c9f56fcfb-j2gtj   1/1     Running   0          5m27s
pc-deployment-6c9f56fcfb-rf84v   1/1     Running   0          37s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>删除Deployment</strong></p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 删除deployment，其下的rs和pod也将被删除</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl delete -f pc-deployment.yaml</span>
deployment<span class="token punctuation">.</span>apps <span class="token string">&quot;pc-deployment&quot;</span> deleted
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="horizontal-pod-autoscaler-hpa" tabindex="-1"><a class="header-anchor" href="#horizontal-pod-autoscaler-hpa" aria-hidden="true">#</a> Horizontal Pod Autoscaler(HPA)</h2><p>​ 在前面的课程中，我们已经可以实现通过手工执行<code>kubectl scale</code>命令实现Pod扩容或缩容，但是这显然不符合Kubernetes的定位目标--自动化、智能化。 Kubernetes期望可以实现通过监测Pod的使用情况，实现pod数量的自动调整，于是就产生了Horizontal Pod Autoscaler（HPA）这种控制器。</p><p>​ HPA可以获取每个Pod利用率，然后和HPA中定义的指标进行对比，同时计算出需要伸缩的具体值，最后实现Pod的数量的调整。其实HPA与之前的Deployment一样，也属于一种Kubernetes资源对象，它通过追踪分析RC控制的所有目标Pod的负载变化情况，来确定是否需要针对性地调整目标Pod的副本数，这是HPA的实现原理。</p><p>&lt;img src=&quot;./assets/image-20200608155858271.png&quot; style=&quot;border: 1px solid; zoom: 80%;&quot;/&gt;</p><p>接下来，我们来做一个实验</p><p><strong>1 安装metrics-server</strong></p><p>metrics-server可以用来收集集群中的资源使用情况</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 安装git</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># yum install git -y</span>
<span class="token comment"># 获取metrics-server, 注意使用的版本</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># git clone -b v0.3.6 https://github.com/kubernetes-incubator/metrics-server</span>
<span class="token comment"># 修改deployment, 注意修改的是镜像和初始化参数</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># cd /root/metrics-server/deploy/1.8+/</span>
<span class="token namespace">[root@master 1.8+]</span><span class="token comment"># vim metrics-server-deployment.yaml</span>
按图中添加下面选项
hostNetwork: true
image: registry<span class="token punctuation">.</span>cn-hangzhou<span class="token punctuation">.</span>aliyuncs<span class="token punctuation">.</span>com/google_containers/metrics-server-amd64:v0<span class="token punctuation">.</span>3<span class="token punctuation">.</span>6
args:
<span class="token operator">-</span> <span class="token operator">--</span>kubelet-insecure-tls
<span class="token operator">-</span> <span class="token operator">--</span>kubelet-preferred-address-types=InternalIP<span class="token punctuation">,</span>Hostname<span class="token punctuation">,</span>InternalDNS<span class="token punctuation">,</span>ExternalDNS<span class="token punctuation">,</span>ExternalIP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+t+`" alt="image-20200608163326496"></p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 安装metrics-server</span>
<span class="token namespace">[root@master 1.8+]</span><span class="token comment"># kubectl apply -f ./</span>

<span class="token comment"># 查看pod运行情况</span>
<span class="token namespace">[root@master 1.8+]</span><span class="token comment"># kubectl get pod -n kube-system</span>
metrics-server-6b976979db-2xwbj   1/1     Running   0          90s

<span class="token comment"># 使用kubectl top node 查看资源使用情况</span>
<span class="token namespace">[root@master 1.8+]</span><span class="token comment"># kubectl top node</span>
NAME     CPU<span class="token punctuation">(</span>cores<span class="token punctuation">)</span>   CPU%   MEMORY<span class="token punctuation">(</span>bytes<span class="token punctuation">)</span>   MEMORY%
master   98m          4%     1067Mi          62%
node1    27m          1%     727Mi           42%
node2    34m          1%     800Mi           46%
<span class="token namespace">[root@master 1.8+]</span><span class="token comment"># kubectl top pod -n kube-system</span>
NAME                              CPU<span class="token punctuation">(</span>cores<span class="token punctuation">)</span>   MEMORY<span class="token punctuation">(</span>bytes<span class="token punctuation">)</span>
coredns-6955765f44-7ptsb          3m           9Mi
coredns-6955765f44-vcwr5          3m           8Mi
etcd-master                       14m          145Mi
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token comment"># 至此,metrics-server安装完成</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2 准备deployment和servie</strong></p><p>为了操作简单,直接使用命令</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 创建deployment </span>
<span class="token namespace">[root@master 1.8+]</span><span class="token comment"># kubectl run nginx --image=nginx:latest --requests=cpu=100m -n dev</span>
<span class="token comment"># 创建service</span>
<span class="token namespace">[root@master 1.8+]</span><span class="token comment"># kubectl expose deployment nginx --type=NodePort --port=80 -n dev</span>

<span class="token comment"># 查看</span>
<span class="token namespace">[root@master 1.8+]</span><span class="token comment"># kubectl get deployment,pod,svc -n dev</span>
NAME                    READY   UP-TO-DATE   AVAILABLE   AGE
deployment<span class="token punctuation">.</span>apps/nginx   1/1     1            1           47s

NAME                         READY   STATUS    RESTARTS   AGE
pod/nginx-7df9756ccc-bh8dr   1/1     Running   0          47s

NAME            <span class="token function">TYPE</span>       CLUSTER-IP      EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>        AGE
service/nginx   NodePort   10<span class="token punctuation">.</span>109<span class="token punctuation">.</span>57<span class="token punctuation">.</span>248   &lt;none&gt;        80:31136/TCP   35s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>3 部署HPA</strong></p><p>创建pc-hpa.yaml</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> autoscaling/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> HorizontalPodAutoscaler
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pc<span class="token punctuation">-</span>hpa
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">minReplicas</span><span class="token punctuation">:</span> <span class="token number">1</span>  <span class="token comment">#最小pod数量</span>
  <span class="token key atrule">maxReplicas</span><span class="token punctuation">:</span> <span class="token number">10</span> <span class="token comment">#最大pod数量</span>
  <span class="token key atrule">targetCPUUtilizationPercentage</span><span class="token punctuation">:</span> <span class="token number">3</span> <span class="token comment"># CPU使用率指标</span>
  <span class="token key atrule">scaleTargetRef</span><span class="token punctuation">:</span>   <span class="token comment"># 指定要控制的nginx信息</span>
    <span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
    <span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment  
    <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 创建hpa</span>
<span class="token namespace">[root@master 1.8+]</span><span class="token comment"># kubectl create -f pc-hpa.yaml</span>
horizontalpodautoscaler<span class="token punctuation">.</span>autoscaling/pc-hpa created

<span class="token comment"># 查看hpa</span>
<span class="token namespace">[root@master 1.8+]</span><span class="token comment"># kubectl get hpa -n dev</span>
NAME     REFERENCE          TARGETS   MINPODS   MAXPODS   REPLICAS   AGE
pc-hpa   Deployment/nginx   0%<span class="token operator">/</span>3%     1         10        1          62s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>4 测试</strong></p><p>使用压测工具对service地址<code>192.168.109.100:31136</code>进行压测，然后通过控制台查看hpa和pod的变化</p><p><code>hpa变化</code></p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get hpa -n dev -w</span>
NAME     REFERENCE          TARGETS   MINPODS   MAXPODS   REPLICAS   AGE
pc-hpa   Deployment/nginx   0%<span class="token operator">/</span>3%     1         10        1          4m11s
pc-hpa   Deployment/nginx   0%<span class="token operator">/</span>3%     1         10        1          5m19s
pc-hpa   Deployment/nginx   22%<span class="token operator">/</span>3%    1         10        1          6m50s
pc-hpa   Deployment/nginx   22%<span class="token operator">/</span>3%    1         10        4          7m5s
pc-hpa   Deployment/nginx   22%<span class="token operator">/</span>3%    1         10        8          7m21s
pc-hpa   Deployment/nginx   6%<span class="token operator">/</span>3%     1         10        8          7m51s
pc-hpa   Deployment/nginx   0%<span class="token operator">/</span>3%     1         10        8          9m6s
pc-hpa   Deployment/nginx   0%<span class="token operator">/</span>3%     1         10        8          13m
pc-hpa   Deployment/nginx   0%<span class="token operator">/</span>3%     1         10        1          14m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>deployment变化</code></p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get deployment -n dev -w</span>
NAME    READY   UP-TO-DATE   AVAILABLE   AGE
nginx   1/1     1            1           11m
nginx   1/4     1            1           13m
nginx   1/4     1            1           13m
nginx   1/4     1            1           13m
nginx   1/4     4            1           13m
nginx   1/8     4            1           14m
nginx   1/8     4            1           14m
nginx   1/8     4            1           14m
nginx   1/8     8            1           14m
nginx   2/8     8            2           14m
nginx   3/8     8            3           14m
nginx   4/8     8            4           14m
nginx   5/8     8            5           14m
nginx   6/8     8            6           14m
nginx   7/8     8            7           14m
nginx   8/8     8            8           15m
nginx   8/1     8            8           20m
nginx   8/1     8            8           20m
nginx   1/1     1            1           20m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>pod变化</code></p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get pods -n dev -w</span>
NAME                     READY   STATUS    RESTARTS   AGE
nginx-7df9756ccc-bh8dr   1/1     Running   0          11m
nginx-7df9756ccc-cpgrv   0/1     Pending   0          0s
nginx-7df9756ccc-8zhwk   0/1     Pending   0          0s
nginx-7df9756ccc-rr9bn   0/1     Pending   0          0s
nginx-7df9756ccc-cpgrv   0/1     ContainerCreating   0          0s
nginx-7df9756ccc-8zhwk   0/1     ContainerCreating   0          0s
nginx-7df9756ccc-rr9bn   0/1     ContainerCreating   0          0s
nginx-7df9756ccc-m9gsj   0/1     Pending             0          0s
nginx-7df9756ccc-g56qb   0/1     Pending             0          0s
nginx-7df9756ccc-sl9c6   0/1     Pending             0          0s
nginx-7df9756ccc-fgst7   0/1     Pending             0          0s
nginx-7df9756ccc-g56qb   0/1     ContainerCreating   0          0s
nginx-7df9756ccc-m9gsj   0/1     ContainerCreating   0          0s
nginx-7df9756ccc-sl9c6   0/1     ContainerCreating   0          0s
nginx-7df9756ccc-fgst7   0/1     ContainerCreating   0          0s
nginx-7df9756ccc-8zhwk   1/1     Running             0          19s
nginx-7df9756ccc-rr9bn   1/1     Running             0          30s
nginx-7df9756ccc-m9gsj   1/1     Running             0          21s
nginx-7df9756ccc-cpgrv   1/1     Running             0          47s
nginx-7df9756ccc-sl9c6   1/1     Running             0          33s
nginx-7df9756ccc-g56qb   1/1     Running             0          48s
nginx-7df9756ccc-fgst7   1/1     Running             0          66s
nginx-7df9756ccc-fgst7   1/1     Terminating         0          6m50s
nginx-7df9756ccc-8zhwk   1/1     Terminating         0          7m5s
nginx-7df9756ccc-cpgrv   1/1     Terminating         0          7m5s
nginx-7df9756ccc-g56qb   1/1     Terminating         0          6m50s
nginx-7df9756ccc-rr9bn   1/1     Terminating         0          7m5s
nginx-7df9756ccc-m9gsj   1/1     Terminating         0          6m50s
nginx-7df9756ccc-sl9c6   1/1     Terminating         0          6m50s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="daemonset-ds" tabindex="-1"><a class="header-anchor" href="#daemonset-ds" aria-hidden="true">#</a> DaemonSet(DS)</h2><p>​ DaemonSet类型的控制器可以保证在集群中的每一台（或指定）节点上都运行一个副本。一般适用于日志收集、节点监控等场景。也就是说，如果一个Pod提供的功能是节点级别的（每个节点都需要且只需要一个），那么这类Pod就适合使用DaemonSet类型的控制器创建。</p><p><img src="`+i+`" alt=""></p><p>DaemonSet控制器的特点：</p><ul><li>每当向集群中添加一个节点时，指定的 Pod 副本也将添加到该节点上</li><li>当节点从集群中移除时，Pod 也就被垃圾回收了</li></ul><p>下面先来看下DaemonSet的资源清单文件</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1 <span class="token comment"># 版本号</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> DaemonSet <span class="token comment"># 类型       </span>
<span class="token key atrule">metadata</span><span class="token punctuation">:</span> <span class="token comment"># 元数据</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token comment"># rs名称 </span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> <span class="token comment"># 所属命名空间 </span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span> <span class="token comment">#标签</span>
    <span class="token key atrule">controller</span><span class="token punctuation">:</span> daemonset
<span class="token key atrule">spec</span><span class="token punctuation">:</span> <span class="token comment"># 详情描述</span>
  <span class="token key atrule">revisionHistoryLimit</span><span class="token punctuation">:</span> <span class="token number">3</span> <span class="token comment"># 保留历史版本</span>
  <span class="token key atrule">updateStrategy</span><span class="token punctuation">:</span> <span class="token comment"># 更新策略</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> RollingUpdate <span class="token comment"># 滚动更新策略</span>
    <span class="token key atrule">rollingUpdate</span><span class="token punctuation">:</span> <span class="token comment"># 滚动更新</span>
      <span class="token key atrule">maxUnavailable</span><span class="token punctuation">:</span> <span class="token number">1</span> <span class="token comment"># 最大不可用状态的 Pod 的最大值，可以为百分比，也可以为整数</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span> <span class="token comment"># 选择器，通过它指定该控制器管理哪些pod</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>      <span class="token comment"># Labels匹配规则</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>pod
    <span class="token key atrule">matchExpressions</span><span class="token punctuation">:</span> <span class="token comment"># Expressions匹配规则</span>
      <span class="token punctuation">-</span> <span class="token punctuation">{</span><span class="token key atrule">key</span><span class="token punctuation">:</span> app<span class="token punctuation">,</span> <span class="token key atrule">operator</span><span class="token punctuation">:</span> In<span class="token punctuation">,</span> <span class="token key atrule">values</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>nginx<span class="token punctuation">-</span>pod<span class="token punctuation">]</span><span class="token punctuation">}</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span> <span class="token comment"># 模板，当副本数量不足时，会根据下面的模板创建pod副本</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>pod
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
        <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.17.1
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建pc-daemonset.yaml，内容如下：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> DaemonSet      
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pc<span class="token punctuation">-</span>daemonset
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span> 
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 创建daemonset</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl create -f  pc-daemonset.yaml</span>
daemonset<span class="token punctuation">.</span>apps/pc-daemonset created

<span class="token comment"># 查看daemonset</span>
<span class="token namespace">[root@master ~]</span><span class="token comment">#  kubectl get ds -n dev -o wide</span>
NAME        DESIRED  CURRENT  READY  UP-TO-DATE  AVAILABLE   AGE   CONTAINERS   IMAGES         
pc-daemonset   2        2        2      2           2        24s   nginx        nginx:1<span class="token punctuation">.</span>17<span class="token punctuation">.</span>1   

<span class="token comment"># 查看pod,发现在每个Node上都运行一个pod</span>
<span class="token namespace">[root@master ~]</span><span class="token comment">#  kubectl get pods -n dev -o wide</span>
NAME                 READY   STATUS    RESTARTS   AGE   IP            NODE    
pc-daemonset-9bck8   1/1     Running   0          37s   10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>43   node1     
pc-daemonset-k224w   1/1     Running   0          37s   10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>2<span class="token punctuation">.</span>74   node2      

<span class="token comment"># 删除daemonset</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl delete -f pc-daemonset.yaml</span>
daemonset<span class="token punctuation">.</span>apps <span class="token string">&quot;pc-daemonset&quot;</span> deleted
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="job" tabindex="-1"><a class="header-anchor" href="#job" aria-hidden="true">#</a> Job</h2><p>Job，主要用于负责**批量处理(一次要处理指定数量任务)<strong>短暂的</strong>一次性(每个任务仅运行一次就结束)**任务。Job特点如下：</p><ul><li>当Job创建的pod执行成功结束时，Job将记录成功结束的pod数量</li><li>当成功结束的pod达到指定的数量时，Job将完成执行</li></ul><p>&lt;img src=&quot;./assets/image-20200618213054113.png&quot; style=&quot;zoom:80%;&quot; /&gt;</p><p>Job的资源清单文件：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> batch/v1 <span class="token comment"># 版本号</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Job <span class="token comment"># 类型       </span>
<span class="token key atrule">metadata</span><span class="token punctuation">:</span> <span class="token comment"># 元数据</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token comment"># rs名称 </span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> <span class="token comment"># 所属命名空间 </span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span> <span class="token comment">#标签</span>
    <span class="token key atrule">controller</span><span class="token punctuation">:</span> job
<span class="token key atrule">spec</span><span class="token punctuation">:</span> <span class="token comment"># 详情描述</span>
  <span class="token key atrule">completions</span><span class="token punctuation">:</span> <span class="token number">1</span> <span class="token comment"># 指定job需要成功运行Pods的次数。默认值: 1</span>
  <span class="token key atrule">parallelism</span><span class="token punctuation">:</span> <span class="token number">1</span> <span class="token comment"># 指定job在任一时刻应该并发运行Pods的数量。默认值: 1</span>
  <span class="token key atrule">activeDeadlineSeconds</span><span class="token punctuation">:</span> <span class="token number">30</span> <span class="token comment"># 指定job可运行的时间期限，超过时间还未结束，系统将会尝试进行终止。</span>
  <span class="token key atrule">backoffLimit</span><span class="token punctuation">:</span> <span class="token number">6</span> <span class="token comment"># 指定job失败后进行重试的次数。默认是6</span>
  <span class="token key atrule">manualSelector</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># 是否可以使用selector选择器选择pod，默认是false</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span> <span class="token comment"># 选择器，通过它指定该控制器管理哪些pod</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>      <span class="token comment"># Labels匹配规则</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> counter<span class="token punctuation">-</span>pod
    <span class="token key atrule">matchExpressions</span><span class="token punctuation">:</span> <span class="token comment"># Expressions匹配规则</span>
      <span class="token punctuation">-</span> <span class="token punctuation">{</span><span class="token key atrule">key</span><span class="token punctuation">:</span> app<span class="token punctuation">,</span> <span class="token key atrule">operator</span><span class="token punctuation">:</span> In<span class="token punctuation">,</span> <span class="token key atrule">values</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>counter<span class="token punctuation">-</span>pod<span class="token punctuation">]</span><span class="token punctuation">}</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span> <span class="token comment"># 模板，当副本数量不足时，会根据下面的模板创建pod副本</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> counter<span class="token punctuation">-</span>pod
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> Never <span class="token comment"># 重启策略只能设置为Never或者OnFailure</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> counter
        <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox<span class="token punctuation">:</span><span class="token number">1.30</span>
        <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;bin/sh&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;-c&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;for i in 9 8 7 6 5 4 3 2 1; do echo $i;sleep 2;done&quot;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>关于重启策略设置的说明：
    如果指定为OnFailure，则job会在pod出现故障时重启容器，而不是创建pod，failed次数不变
    如果指定为Never，则job会在pod出现故障时创建新的pod，并且故障pod不会消失，也不会重启，failed次数加1
    如果指定为Always的话，就意味着一直重启，意味着job任务会重复去执行了，当然不对，所以不能设置为Always
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建pc-job.yaml，内容如下：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> batch/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Job      
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pc<span class="token punctuation">-</span>job
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">manualSelector</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> counter<span class="token punctuation">-</span>pod
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> counter<span class="token punctuation">-</span>pod
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> Never
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> counter
        <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox<span class="token punctuation">:</span><span class="token number">1.30</span>
        <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;bin/sh&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;-c&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;for i in 9 8 7 6 5 4 3 2 1; do echo $i;sleep 3;done&quot;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 创建job</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl create -f pc-job.yaml</span>
job<span class="token punctuation">.</span>batch/pc-job created

<span class="token comment"># 查看job</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get job -n dev -o wide  -w</span>
NAME     COMPLETIONS   DURATION   AGE   CONTAINERS   IMAGES         SELECTOR
pc-job   0/1           21s        21s   counter      busybox:1<span class="token punctuation">.</span>30   app=counter-pod
pc-job   1/1           31s        79s   counter      busybox:1<span class="token punctuation">.</span>30   app=counter-pod

<span class="token comment"># 通过观察pod状态可以看到，pod在运行完毕任务后，就会变成Completed状态</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get pods -n dev -w</span>
NAME           READY   STATUS     RESTARTS      AGE
pc-job-rxg96   1/1     Running     0            29s
pc-job-rxg96   0/1     Completed   0            33s

<span class="token comment"># 接下来，调整下pod运行的总数量和并行数量 即：在spec下设置下面两个选项</span>
<span class="token comment">#  completions: 6 # 指定job需要成功运行Pods的次数为6</span>
<span class="token comment">#  parallelism: 3 # 指定job并发运行Pods的数量为3</span>
<span class="token comment">#  然后重新运行job，观察效果，此时会发现，job会每次运行3个pod，总共执行了6个pod</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get pods -n dev -w</span>
NAME           READY   STATUS    RESTARTS   AGE
pc-job-684ft   1/1     Running   0          5s
pc-job-jhj49   1/1     Running   0          5s
pc-job-pfcvh   1/1     Running   0          5s
pc-job-684ft   0/1     Completed   0          11s
pc-job-v7rhr   0/1     Pending     0          0s
pc-job-v7rhr   0/1     Pending     0          0s
pc-job-v7rhr   0/1     ContainerCreating   0          0s
pc-job-jhj49   0/1     Completed           0          11s
pc-job-fhwf7   0/1     Pending             0          0s
pc-job-fhwf7   0/1     Pending             0          0s
pc-job-pfcvh   0/1     Completed           0          11s
pc-job-5vg2j   0/1     Pending             0          0s
pc-job-fhwf7   0/1     ContainerCreating   0          0s
pc-job-5vg2j   0/1     Pending             0          0s
pc-job-5vg2j   0/1     ContainerCreating   0          0s
pc-job-fhwf7   1/1     Running             0          2s
pc-job-v7rhr   1/1     Running             0          2s
pc-job-5vg2j   1/1     Running             0          3s
pc-job-fhwf7   0/1     Completed           0          12s
pc-job-v7rhr   0/1     Completed           0          12s
pc-job-5vg2j   0/1     Completed           0          12s

<span class="token comment"># 删除job</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl delete -f pc-job.yaml</span>
job<span class="token punctuation">.</span>batch <span class="token string">&quot;pc-job&quot;</span> deleted
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="cronjob-cj" tabindex="-1"><a class="header-anchor" href="#cronjob-cj" aria-hidden="true">#</a> CronJob(CJ)</h2><p>​ CronJob控制器以Job控制器资源为其管控对象，并借助它管理pod资源对象，Job控制器定义的作业任务在其控制器资源创建之后便会立即执行，但CronJob可以以类似于Linux操作系统的周期性任务作业计划的方式控制其运行<strong>时间点</strong>及<strong>重复运行</strong>的方式。也就是说，<strong>CronJob可以在特定的时间点(反复的)去运行job任务</strong>。</p><p>&lt;img src=&quot;./assets/image-20200618213149531.png&quot; style=&quot;zoom:80%;&quot; /&gt;</p><p>CronJob的资源清单文件：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> batch/v1beta1 <span class="token comment"># 版本号</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> CronJob <span class="token comment"># 类型       </span>
<span class="token key atrule">metadata</span><span class="token punctuation">:</span> <span class="token comment"># 元数据</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token comment"># rs名称 </span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> <span class="token comment"># 所属命名空间 </span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span> <span class="token comment">#标签</span>
    <span class="token key atrule">controller</span><span class="token punctuation">:</span> cronjob
<span class="token key atrule">spec</span><span class="token punctuation">:</span> <span class="token comment"># 详情描述</span>
  <span class="token key atrule">schedule</span><span class="token punctuation">:</span> <span class="token comment"># cron格式的作业调度运行时间点,用于控制任务在什么时间执行</span>
  <span class="token key atrule">concurrencyPolicy</span><span class="token punctuation">:</span> <span class="token comment"># 并发执行策略，用于定义前一次作业运行尚未完成时是否以及如何运行后一次的作业</span>
  <span class="token key atrule">failedJobHistoryLimit</span><span class="token punctuation">:</span> <span class="token comment"># 为失败的任务执行保留的历史记录数，默认为1</span>
  <span class="token key atrule">successfulJobHistoryLimit</span><span class="token punctuation">:</span> <span class="token comment"># 为成功的任务执行保留的历史记录数，默认为3</span>
  <span class="token key atrule">startingDeadlineSeconds</span><span class="token punctuation">:</span> <span class="token comment"># 启动作业错误的超时时长</span>
  <span class="token key atrule">jobTemplate</span><span class="token punctuation">:</span> <span class="token comment"># job控制器模板，用于为cronjob控制器生成job对象;下面其实就是job的定义</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">completions</span><span class="token punctuation">:</span> <span class="token number">1</span>
      <span class="token key atrule">parallelism</span><span class="token punctuation">:</span> <span class="token number">1</span>
      <span class="token key atrule">activeDeadlineSeconds</span><span class="token punctuation">:</span> <span class="token number">30</span>
      <span class="token key atrule">backoffLimit</span><span class="token punctuation">:</span> <span class="token number">6</span>
      <span class="token key atrule">manualSelector</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
      <span class="token key atrule">selector</span><span class="token punctuation">:</span>
        <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
          <span class="token key atrule">app</span><span class="token punctuation">:</span> counter<span class="token punctuation">-</span>pod
        <span class="token key atrule">matchExpressions</span><span class="token punctuation">:</span> 规则
          <span class="token punctuation">-</span> <span class="token punctuation">{</span><span class="token key atrule">key</span><span class="token punctuation">:</span> app<span class="token punctuation">,</span> <span class="token key atrule">operator</span><span class="token punctuation">:</span> In<span class="token punctuation">,</span> <span class="token key atrule">values</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>counter<span class="token punctuation">-</span>pod<span class="token punctuation">]</span><span class="token punctuation">}</span>
      <span class="token key atrule">template</span><span class="token punctuation">:</span>
        <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
          <span class="token key atrule">labels</span><span class="token punctuation">:</span>
            <span class="token key atrule">app</span><span class="token punctuation">:</span> counter<span class="token punctuation">-</span>pod
        <span class="token key atrule">spec</span><span class="token punctuation">:</span>
          <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> Never 
          <span class="token key atrule">containers</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> counter
            <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox<span class="token punctuation">:</span><span class="token number">1.30</span>
            <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;bin/sh&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;-c&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;for i in 9 8 7 6 5 4 3 2 1; do echo $i;sleep 20;done&quot;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>需要重点解释的几个选项：
schedule: cron表达式，用于指定任务的执行时间
	<span class="token italic"><span class="token punctuation">*</span><span class="token content">/1    </span><span class="token punctuation">*</span></span>      <span class="token italic"><span class="token punctuation">*</span><span class="token content">    </span><span class="token punctuation">*</span></span>     *
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>分钟</span><span class="token punctuation">&gt;</span></span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>小时</span><span class="token punctuation">&gt;</span></span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>日</span><span class="token punctuation">&gt;</span></span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>月份</span><span class="token punctuation">&gt;</span></span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>星期</span><span class="token punctuation">&gt;</span></span>

<span class="token code keyword">    分钟 值从 0 到 59.
    小时 值从 0 到 23.
    日 值从 1 到 31.
    月 值从 1 到 12.
    星期 值从 0 到 6, 0 代表星期日
    多个时间可以用逗号隔开； 范围可以用连字符给出；*可以作为通配符； /表示每...</span>
concurrencyPolicy:
	Allow:   允许Jobs并发运行(默认)
	Forbid:  禁止并发运行，如果上一次运行尚未完成，则跳过下一次运行
	Replace: 替换，取消当前正在运行的作业并用新作业替换它
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建pc-cronjob.yaml，内容如下：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> batch/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> CronJob
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pc<span class="token punctuation">-</span>cronjob
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">controller</span><span class="token punctuation">:</span> cronjob
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">schedule</span><span class="token punctuation">:</span> <span class="token string">&quot;*/1 * * * *&quot;</span>
  <span class="token key atrule">jobTemplate</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">template</span><span class="token punctuation">:</span>
        <span class="token key atrule">spec</span><span class="token punctuation">:</span>
          <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> Never
          <span class="token key atrule">containers</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> counter
            <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox<span class="token punctuation">:</span><span class="token number">1.30</span>
            <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;bin/sh&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;-c&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;for i in 9 8 7 6 5 4 3 2 1; do echo $i;sleep 3;done&quot;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 创建cronjob</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl create -f pc-cronjob.yaml</span>
cronjob<span class="token punctuation">.</span>batch/pc-cronjob created

<span class="token comment"># 查看cronjob</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get cronjobs -n dev</span>
NAME         SCHEDULE      SUSPEND   ACTIVE   LAST SCHEDULE   AGE
pc-cronjob   <span class="token operator">*</span><span class="token operator">/</span>1 <span class="token operator">*</span> <span class="token operator">*</span> <span class="token operator">*</span> <span class="token operator">*</span>   False     0        &lt;none&gt;          6s

<span class="token comment"># 查看job</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get jobs -n dev</span>
NAME                    COMPLETIONS   DURATION   AGE
pc-cronjob-1592587800   1/1           28s        3m26s
pc-cronjob-1592587860   1/1           28s        2m26s
pc-cronjob-1592587920   1/1           28s        86s

<span class="token comment"># 查看pod</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl get pods -n dev</span>
pc-cronjob-1592587800-x4tsm   0/1     Completed   0          2m24s
pc-cronjob-1592587860-r5gv4   0/1     Completed   0          84s
pc-cronjob-1592587920-9dxxq   1/1     Running     0          24s


<span class="token comment"># 删除cronjob</span>
<span class="token namespace">[root@master ~]</span><span class="token comment"># kubectl  delete -f pc-cronjob.yaml</span>
cronjob<span class="token punctuation">.</span>batch <span class="token string">&quot;pc-cronjob&quot;</span> deleted
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,120),d=[o];function u(r,m){return s(),a("div",null,d)}const k=n(c,[["render",u],["__file","controller.html.vue"]]);export{k as default};
