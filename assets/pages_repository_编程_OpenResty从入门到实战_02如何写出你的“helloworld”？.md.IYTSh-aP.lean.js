import{_ as s,c as i,G as a,b as n}from"./chunks/framework.D5KJDRhN.js";const e=JSON.parse('{"title":"02如何写出你的“helloworld”？","description":"","frontmatter":{"title":"02如何写出你的“helloworld”？","date":"2025-02-22T00:00:00.000Z","categories":["OpenResty从入门到实战"],"head":[["link",{"rel":"canonical","href":"https://www.doit.ip-ddns.com/pages/repository/编程/OpenResty从入门到实战/02如何写出你的“helloworld”？"}]]},"headers":[],"relativePath":"pages/repository/编程/OpenResty从入门到实战/02如何写出你的“helloworld”？.md","filePath":"pages/repository/编程/OpenResty从入门到实战/02如何写出你的“helloworld”？.md","lastUpdated":1739887664000}');const p=s({name:"pages/repository/编程/OpenResty从入门到实战/02如何写出你的“helloworld”？.md"},[["render",function(s,e,p,l,t,h){return n(),i("div",null,e[0]||(e[0]=[a('<div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>                            02 如何写出你的“hello world”？</span></span>\n<span class="line"><span>                            你好，我是温铭。今天起，就要开始我们的正式学习之旅。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>每当我们开始学习一个新的开发语言或者平台，都会从最简单的hello world开始，OpenResty 也不例外。让我们先跳过安装的步骤，直接看下，最简单的 OpenResty 程序是怎么编写和运行的：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> resty</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -e</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;ngx.say(&#39;hello world&#39;)&quot;</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">hello</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> world</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>这应该是你见过的最简单的那种 hello world 代码写法，和 Python 类似：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> python</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -c</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;print(&quot;hello world&quot;)&#39;</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">hello</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> world</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>这背后其实是 OpenResty 哲学的一种体现，代码要足够简洁，也好让你打消“从入门到放弃“的念头。我们今天的内容，就专门围绕着这行代码来展开聊一聊。</p><p>上一节我们讲过，OpenResty 是基于 NGINX 的。那你现在是不是有一个疑问：为什么这里看不到 NGINX 的影子？别着急，我们加一行代码，看看 resty背后真正运行的是什么：</p><p>resty -e &quot;ngx.say(&#39;hello world&#39;); ngx.sleep(10)&quot; &amp;</p><p>我们加了一行 sleep 休眠的代码，让 resty 运行的程序打印出字符串后，并不退出。这样，我们就有机会一探究竟：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ps</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -ef</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> grep</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nginx</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">501</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 25468</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 25462</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   0</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  7:24下午</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ttys000</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    0:00.01</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /usr/local/Cellar/openresty/&#39;&#39;1.13.6.2/nginx/sbin/nginx</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /tmp/resty_AfNwigQVOB/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -c</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> conf/nginx.conf</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>终于看了熟悉的 NGINX 进程。看来，resty 本质上是启动了一个 NGINX 服务，那么resty 又是一个什么程序呢？我先卖个关子，咱后面再讲。</p><p>你的机器上可能还没有安装 OpenResty，所以，接下来，我们先回到开头跳过的安装步骤，把 OpenResty 安装完成后再继续。</p><p>OpenResty 的安装</p><p>和其他的开源软件一样，OpenResty 的安装有多种方法，比如使用操作系统的包管理器、源码编译或者 docker 镜像。我推荐你优先使用 yum、apt-get、brew 这类包管理系统，来安装 OpenResty。这里我们使用 Mac 系统来做示例：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>brew tap openresty/brew</span></span>\n<span class="line"><span>brew install openresty</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>使用其他操作系统也是类似的，先要在包管理器中添加 OpenResty 的仓库地址，然后用包管理工具来安装。具体步骤，你可以参考官方文档。</p><p>不过，这看似简单的安装背后，其实有两个问题：</p><p>为什么我不推荐使用源码来安装呢？</p><p>为什么不能直接从操作系统的官方仓库安装，而是需要先设置另外一个仓库地址？</p><p>对于这两个问题，你不妨先自己想一想。</p><p>这里我想补充一句。在这门课程里面，我会在表象背后提出很多的“为什么”，希望你可以一边学新东西一边思考，结果是否正确并不重要。独立思考在技术领域也是稀缺的，由于每个人技术领域和深度的不同，在任何课程中老师都会不可避免地带有个人观点以及知识的错漏。只有在学习过程中多问几个为什么，融会贯通，才能逐渐形成自己的技术体系。</p><p>很多工程师都有源码的情节，多年前的我也是一样。在使用一个开源项目的时候，我总是希望能够自己手工从源码开始 configure 和 make，并修改一些编译参数，感觉这样做才能最适合这台机器的环境，才能把性能发挥到极致。</p><p>但现实并非如此，每次源码编译，我都会遇到各种诡异的环境问题，磕磕绊绊才能安装好。现在我想明白了，我们的最初目的其实是用开源项目来解决业务需求，不应该浪费时间和环境鏖战，更何况包管理器和容器技术，正是为了帮我们解决这些问题。</p><p>言归正传，给你说说我的看法。使用 OpenResty 源码安装，不仅仅步骤繁琐，需要自行解决 PCRE、OpenSSL 等外部依赖，而且还需要手工对 OpenSSL 打上对应版本的补丁。不然就会在处理 SSL session 时，带来功能上的缺失，比如像ngx.sleep这类会导致 yield 的 Lua API 就没法使用。这部分内容如果你还想深入了解，可以参考[官方文档]来获取更详细的信息。</p><p>从 OpenResty 自己维护的 OpenSSL [打包脚本]中，就可以看到这些补丁。而在 OpenResty 升级 OpenSSL 版本时，都需要重新生成对应的补丁，并进行完整的回归测试。</p><p>Source0: <a href="https://www.openssl.org/source/openssl-%25%7Bversion%7D.tar.gz" target="_blank" rel="noreferrer">https://www.openssl.org/source/openssl-%{version}.tar.gz</a></p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Patch0: https://raw.githubusercontent.com/openresty/openresty/master/patches/openssl-1.1.0d-sess_set_get_cb_yield.patch</span></span>\n<span class="line"><span>Patch1: https://raw.githubusercontent.com/openresty/openresty/master/patches/openssl-1.1.0j-parallel_build_fix.patch</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>同时，我们可以看下 OpenResty 在 CentOS 中的[打包脚本]，看看是否还有其他隐藏的点：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>BuildRequires: perl-File-Temp</span></span>\n<span class="line"><span>BuildRequires: gcc, make, perl, systemtap-sdt-devel</span></span>\n<span class="line"><span>BuildRequires: openresty-zlib-devel &gt;= 1.2.11-3</span></span>\n<span class="line"><span>BuildRequires: openresty-openssl-devel &gt;= 1.1.0h-1</span></span>\n<span class="line"><span>BuildRequires: openresty-pcre-devel &gt;= 8.42-1</span></span>\n<span class="line"><span>Requires: openresty-zlib &gt;= 1.2.11-3</span></span>\n<span class="line"><span>Requires: openresty-openssl &gt;= 1.1.0h-1</span></span>\n<span class="line"><span>Requires: openresty-pcre &gt;= 8.42-1</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>从这里可以看出，OpenResty 不仅维护了自己的 OpenSSL 版本，还维护了自己的 zlib 和 PCRE 版本。不过后面两个只是调整了编译参数，并没有维护自己的补丁。</p><p>所以，综合这些因素，我不推荐你自行源码编译 OpenResty，除非你已经很清楚这些细节。</p><p>为什么不推荐源码安装，你现在应该已经很清楚了。其实我们在回答第一个问题时，也顺带回答了第二个问题：为什么不能直接从操作系统的官方仓库安装，而是需要先设置另外一个仓库地址？</p><p>这是因为，官方仓库不愿意接受第三方维护的 OpenSSL、PCRE 和 zlib 包，这会导致其他使用者的困惑，不知道选用哪一个合适。另一方面，OpenResty 又需要指定版本的 OpenSSL、PCRE 库才能正常运行，而系统默认自带的版本都比较旧。</p><p>OpenResty CLI</p><p>安装完 OpenResty 后，默认就已经把 OpenResty 的 CLI：resty 安装好了。resty是个 1000 多行的 Perl 脚本，之前我们提到过，OpenResty 的周边工具都是 Perl 编写的，这个是由 OpenResty 作者的技术偏好决定的。</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> which</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> resty</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/usr/local/bin/resty</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> head</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -n</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /usr/local/bin/resty</span></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> #!/usr/bin/env perl</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>resty 的功能很强大，想了解完整的列表，你可以查看resty -h或者[官方文档]。下面，我挑两个有意思的功能介绍一下。</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> resty</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --shdict=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;dogs 1m&#39;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -e</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;local dict = ngx.shared.dogs</span></span>\n<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">                               dict:set(&quot;Tom&quot;, 56)</span></span>\n<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">                               print(dict:get(&quot;Tom&quot;))&#39;</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">56</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>先来看第一个例子。这个示例结合了 NGINX 配置和 Lua 代码，一起完成了一个共享内存字典的设置和查询。dogs 1m 是 NGINX 的一段配置，声明了一个共享内存空间，名字是 dogs，大小是 1m；在 Lua 代码中用字典的方式使用共享内存。另外还有--http-include 和 --main-include来设置 NGINX 配置文件。所以，上面的例子也可以写为：</p><div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">resty </span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">http</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">conf </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;lua_shared_dict dogs 1m;&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">e </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;local dict = ngx.shared.dogs</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">                               dict</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">set</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Tom&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">56</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">                               print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">dict</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:get(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Tom&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>OpenResty 世界中常用的调试工具，比如gdb、valgrind、sysetmtap和Mozilla rr ，也可以和 resty 一起配合使用，方便你平时的开发和测试。它们分别对应着 resty 不同的指令，内部的实现其实很简单，就是多套了一层命令行调用。我们以 valgrind 为例：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> resty</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --valgrind</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -e</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;ngx.say(&#39;hello world&#39;); &quot;</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ERROR:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> failed</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> to</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> command</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;valgrind /usr/local/Cellar/openresty/1.13.6.2/nginx/sbin/nginx -p /tmp/resty_hTFRsFBhVl/ -c conf/nginx.conf&quot;:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> No</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> such</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> file</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> or</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> directory</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>在后面调试、测试和性能分析的章节，会涉及到这些工具的使用。它们不仅适用于 OpenResty 世界，也是服务端的通用工具，让我们循序渐进地来学习吧。</p><p>更正式的 hello world</p><p>最开始我们使用resty写的第一个 OpenResty 程序，没有 master 进程，也不会监听端口。下面，让我们写一个更正式的 hello world。</p><p>写出这样的 OpenResty 程序并不简单，你至少需要三步才能完成：</p><p>创建工作目录；</p><p>修改 NGINX 的配置文件，把 Lua 代码嵌入其中；</p><p>启动 OpenResty 服务。</p><p>我们先来创建工作目录。</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mkdir geektime</span></span>\n<span class="line"><span>cd geektime</span></span>\n<span class="line"><span>mkdir logs/ conf/</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>下面是一个最简化的 nginx.conf，在根目录下新增 OpenResty 的content_by_lua指令，里面嵌入了ngx.say的代码：</p><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">events {</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    worker</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">_</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">connections</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 1024;</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">http {</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    server</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        listen</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 8080;</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        location</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> / {</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">            content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">_</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">by</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">_</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">lua</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &#39;</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">                ngx</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">say</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">hello</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">world</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&quot;)</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            &#39;;</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>请先确认下，是否已经把openresty加入到PATH环境中；然后，启动 OpenResty 服务就可以了：</p><p>openresty -p <code>pwd</code> -c conf/nginx.conf</p><p>没有报错的话，OpenResty 的服务就已经成功启动了。你可以打开浏览器，或者使用 curl 命令，来查看结果的返回：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> curl</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -i</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 127.0.0.1:8080</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">HTTP/1.1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 200</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> OK</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Server:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> openresty/1.13.6.2</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Content-Type:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> text/plain</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Transfer-Encoding:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> chunked</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Connection:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> keep-alive</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>hello, world</p><p>到这里，恭喜你，一个真正的 OpenResty 程序就完成了。</p><p>总结</p><p>让我们回顾下今天讲的内容。我们通过一行简单的 hello, world 代码，延展到OpenResty 的安装和 CLI，并在最后启动了 OpenResty 进程，运行了一个真正的后端程序。</p><p>其中， resty 是我们后面会频繁使用到的命令行工具，课程中的演示代码都是用它来运行的，而不是启动后台的 OpenResty 服务。</p><p>更为重要的是，OpenResty 的背后隐藏了非常多的文化和技术细节，它就像漂浮在海面上的一座冰山。我希望能够通过这门课程，给你展示更全面、更立体的 OpenResty，而不仅仅是它对外暴露出来的 API。</p><p>思考</p><p>最后，我给你留一个作业题。我们现在的做法，是把 Lua 代码写在 NGINX 配置文件中。不过，如果代码越来越多，那代码的可读性和可维护性就无法保证了。</p><p>你有什么方法来解决这个问题吗？欢迎留言和我分享，也欢迎你把这篇文章转发给你的同事、朋友。</p>',67)]))}]]);export{e as __pageData,p as default};
