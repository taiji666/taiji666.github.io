import{_ as s,c as a,G as i,b as n}from"./chunks/framework.D5KJDRhN.js";const p=JSON.parse('{"title":"18worker间的通信法宝：最重要的数据结构之shareddict","description":"","frontmatter":{"title":"18worker间的通信法宝：最重要的数据结构之shareddict","date":"2025-02-22T00:00:00.000Z","categories":["OpenResty从入门到实战"],"head":[["link",{"rel":"canonical","href":"https://www.doit.ip-ddns.com/pages/repository/编程/OpenResty从入门到实战/18worker间的通信法宝：最重要的数据结构之shareddict"}]]},"headers":[],"relativePath":"pages/repository/编程/OpenResty从入门到实战/18worker间的通信法宝：最重要的数据结构之shareddict.md","filePath":"pages/repository/编程/OpenResty从入门到实战/18worker间的通信法宝：最重要的数据结构之shareddict.md","lastUpdated":1740213738000}');const e=s({name:"pages/repository/编程/OpenResty从入门到实战/18worker间的通信法宝：最重要的数据结构之shareddict.md"},[["render",function(s,p,e,l,t,h){return n(),a("div",null,p[0]||(p[0]=[i('<div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>                            18 worker间的通信法宝：最重要的数据结构之shared dict</span></span>\n<span class="line"><span>                            你好，我是温铭。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>前面我们讲过，在 Lua 中， table 是唯一的数据结构。与之对应的一个事实是，共享内存字典shared dict，是你在 OpenResty 编程中最为重要的数据结构。它不仅支持数据的存放和读取，还支持原子计数和队列操作。</p><p>基于 shared dict，你可以实现多个 worker 之间的缓存和通信，以及限流限速、流量统计等功能。你可以把 shared dict 当作简单的 Redis 来使用，只不过 shared dict 中的数据不能持久化，所以你存放在其中的数据，一定要考虑到丢失的情况。</p><p>数据共享的几种方式</p><p>在编写 OpenResty Lua 代码的过程中，你不可避免地会遇到，在一个请求的不同阶段、不同 worker 之间共享数据的情况，还可能需要在 Lua 和 C 代码之间共享数据。</p><p>所以，在正式介绍 shared dict 的 API 之前，先让我们了解一下，OpenResty 中常见的几种数据共享的方法；并学会根据实际情况，选择较为合适的数据共享方式。</p><p>第一种是 Nginx 中的变量。它可以在 Nginx C 模块之间共享数据，自然的，也可以在 C 模块和 OpenResty 提供的 lua-nginx-module 之间共享数据，比如下面这段代码：</p><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">location /foo {</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">     set</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">my</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">_</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &#39;&#39;; # </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> line</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> is</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> required</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> to</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> create</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">my</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">_</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">var</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> at</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> config</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> time</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">     content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">_</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">by</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">_</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">lua</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">_</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">block</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">         ngx</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">my</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">_</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 123;</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         ...</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     }</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>不过，使用 Nginx 变量这种方式来共享数据是比较慢的，因为它涉及到 hash 查找和内存分配。同时，这种方法有其局限性，只能用来存储字符串，不能支持复杂的 Lua 类型。</p><p>第二种是ngx.ctx，可以在同一个请求的不同阶段之间共享数据。它其实就是一个普通的 Lua 的 table，所以速度很快，还可以存储各种 Lua 的对象。它的生命周期是请求级别的，当一个请求结束的时候，ngx.ctx 也会跟着被销毁掉。</p><p>下面是一个典型的使用场景，我们用 ngx.ctx 来缓存 Nginx 变量 这种昂贵的调用，并在不同阶段都可以使用到它：</p><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">location /test {</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">     rewrite</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">_</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">by</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">_</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">lua</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">_</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">block</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">         ngx</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ctx</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">host</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ngx</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">host</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     }</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     access_by_lua_block {</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ngx</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ctx</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">host</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> == &#39;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">openresty</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">org</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&#39;) </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">then</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">            ngx</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ctx</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">host</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = &#39;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">test</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">com</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&#39;</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        end</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     }</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     content_by_lua_block {</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">         ngx</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">say</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ngx</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ctx</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">host</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     }</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>这时，如果你使用 curl 访问的话：</p><p>curl -i 127.0.0.1:8080/test -H &#39;host:openresty.org&#39;</p><p>就会打印出 test.com，可以表明 ngx.ctx 的确是在不同阶段共享了数据。当然，你还可以自己动手修改上面的例子，保存 table 等更复杂的对象，而非简单的字符串，看看它是否满足你的预期。</p><p>不过，这里需要特别注意的是，正因为 ngx.ctx 的生命周期是请求级别的，所以它并不能在模块级别进行缓存。比如，我在 foo.lua 文件中这样使用就是错误的：</p><p>local ngx_ctx = ngx.ctx</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">local </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> bar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    ngx_ctx</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">host</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> =  &#39;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">test</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">com</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&#39;</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>我们应该在函数级别进行调用和缓存：</p><p>local ngx = ngx</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">local </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> bar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    ngx_ctx</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">host</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> =  &#39;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">test</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">com</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&#39;</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>ngx.ctx 还有很多的细节，后面的性能优化部分，我们再继续探讨。</p><p>接着往下看，第三种方法是使用模块级别的变量，在同一个 worker 内的所有请求之间共享数据。跟前面的 Nginx 变量和 ngx.ctx 不一样，这种方法有些不太好理解。不过别着急，概念抽象，代码先行，让我们先来看个例子，弄明白什么是 模块级别的变量：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>-- mydata.lua</span></span>\n<span class="line"><span> local _M = {}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> local data = {</span></span>\n<span class="line"><span>     dog = 3,</span></span>\n<span class="line"><span>     cat = 4,</span></span>\n<span class="line"><span>     pig = 5,</span></span>\n<span class="line"><span> }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> function _M.get_age(name)</span></span>\n<span class="line"><span>     return data[name]</span></span>\n<span class="line"><span> end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>return _M</p><p>在 nginx.conf 的配置如下：</p><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">location /lua {</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">     content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">_</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">by</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">_</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">lua</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">_</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">block</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">         local</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> mydata</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">require</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">mydata</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&quot;</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">         ngx</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">say</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">mydata</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">_</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">age</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">dog</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&quot;))</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     }</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>在这个示例中，mydata 就是一个模块，它只会被 worker 进程加载一次，之后，这个 worker 处理的所有请求，都会共享 mydata 模块的代码和数据。</p><p>自然，mydata 模块中的 data 这个变量，就是 模块级别的变量，它位于模块的 top level，也就是模块最开始的位置，所有函数都可以访问到它。</p><p>所以，你可以把需要在请求间共享的数据，放在模块的 top level 变量中。不过，需要特别注意的是，一般我们只用这种方式来保存只读的数据。如果涉及到写操作，你就要非常小心了，因为可能会有 race condition，这是非常难以定位的 bug。</p><p>我们可以通过下面这个最简化的例子来体会下：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>-- mydata.lua</span></span>\n<span class="line"><span> local _M = {}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> local data = {</span></span>\n<span class="line"><span>     dog = 3,</span></span>\n<span class="line"><span>     cat = 4,</span></span>\n<span class="line"><span>     pig = 5,</span></span>\n<span class="line"><span> }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> function _M.incr_age(name)</span></span>\n<span class="line"><span>     data[name]  = data[name] + 1</span></span>\n<span class="line"><span>    return data[name]</span></span>\n<span class="line"><span> end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>return _M</p><p>在模块中，我们增加了 incr_age 这个函数，它会对 data 这个表的数据进行修改。</p><p>然后，在调用的代码中，我们增加了最关键的一行 ngx.sleep(5)，这个 sleep 是一个 yield 操作：</p><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">location /lua {</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">     content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">_</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">by</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">_</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">lua</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">_</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">block</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">         local</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> mydata</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">require</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">mydata</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&quot;</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">         ngx</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">say</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">mydata</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">. </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">incr</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">_</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">age</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">dog</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&quot;))</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">         ngx</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">sleep</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(5) </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">--</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> yield</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> API</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">         ngx</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">say</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">mydata</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">. </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">incr</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">_</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">age</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">dog</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&quot;))</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     }</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>如果没有这行 sleep 代码（也可以是其他的非阻塞 IO 操作，比如访问 Redis 等），就不会有 yield 操作，也就不会产生竞争，那么，最后输出的数字就是顺序的。</p><p>但当我们加了这行代码后，哪怕只是在 sleep 的 5 秒钟内，也很可能就有其他请求调用了mydata. incr_age 函数，修改了变量的值，从而导致最后输出的数字不连续。要知道，在实际的代码中，逻辑不会这么简单，bug 的定位也一定会困难得多。</p><p>所以，除非你很确定这中间没有 yield 操作，不会把控制权交给 Nginx 事件循环，否则，我建议你还是保持对模块级别变量的只读。</p><p>第四种，也是最后一种方法，用 shared dict 来共享数据，这些数据可以在多个 worker 之间共享。</p><p>这种方法是基于红黑树实现的，性能很好，但也有自己的局限性——你必须事先在 Nginx 的配置文件中，声明共享内存的大小，并且这不能在运行期更改：</p><p>lua_shared_dict dogs 10m;</p><p>shared dict 同样只能缓存字符串类型的数据，不支持复杂的 Lua 数据类型。这也就意味着，当我需要存放 table 等复杂的数据类型时，我将不得不使用 json 或者其他的方法，来序列化和反序列化，这自然会带来不小的性能损耗。</p><p>总之，还是那句话，这里并没有银弹，不存在一种完美的数据共享方式，你需要根据需求和场景，来组合多个方法来使用。</p><p>共享字典</p><p>上面数据共享的部分，我们花了很多的篇幅来学，有的人可能纳闷儿：它们看上去和 shared dict 没有直接关系，是不是有些文不对题呢？</p><p>事实并非如此，你可以自己想一下，为什么 OpenResty 中要有 shared dict 的存在呢？</p><p>回忆一下刚刚讲的几种方法，前面三种数据共享的范围都是在请求级别，或者单个 worker 级别。所以，在当前的 OpenResty 的实现中，只有 shared dict 可以完成 worker 间的数据共享，并借此实现 worker 之间的通信，这也是它存在的价值。</p><p>在我看来，明白一个技术为何存在，并弄清楚它和别的类似技术之间的差异和优势，远比你只会熟练调用它提供的 API 更为重要。这种技术视野，会给你带来一定程度的远见和洞察力，这也可以说是工程师和架构师的一个重要区别。</p><p>回到共享字典本身，它对外提供了 20多个 Lua API，不过所有的这些 API 都是原子操作，你不用担心多个 worker 和高并发的情况下的竞争问题。</p><p>这些 API 都有官方详细的文档，我就不再一一赘述了。这里我想再强调一下，任何技术课程的学习，都不能代替对官方文档的仔细研读。这些耗时的笨功夫，每个人都省不掉的。</p><p>继续看shared dict 的 API，这些 API可以分为下面三个大类，也就是字典读写类、队列操作类和管理类这三种。</p><p>字典读写类</p><p>首先来看字典读写类。在最初的版本中，只有字典读写类的 API，它们也是共享字典最常用的功能。下面是一个最简单的示例：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> resty</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --shdict=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;dogs 1m&#39;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -e</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;local dict = ngx.shared.dogs</span></span>\n<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">                               dict:set(&quot;Tom&quot;, 56)</span></span>\n<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">                               print(dict:get(&quot;Tom&quot;))&#39;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>除了 set 外，OpenResty 还提供了 safe_set、add、safe_add、replace 这四种写入的方法。这里safe 前缀的含义是，在内存占满的情况下，不根据 LRU 淘汰旧的数据，而是写入失败并返回 no memory 的错误信息。</p><p>除了 get 外，OpenResty 还提供了 get_stale 的读取数据的方法，相比 get 方法，它多了一个过期数据的返回值：</p><p>value, flags, stale = ngx.shared.DICT:get_stale(key)</p><p>你还可以调用 delete 方法来删除指定的 key，它和 set(key, nil) 是等价的。</p><p>队列操作类</p><p>再来看队列操作，它是 OpenResty 后续新增的功能，提供了和 Redis 类似的接口。队列中的每一个元素，都用 ngx_http_lua_shdict_list_node_t 来描述：</p><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">typedef struct { </span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    ngx</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">_</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">queue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">_</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">t</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> queue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    uint</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">32_</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">t</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">_</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">len</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    uint</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">8_</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">t</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">_</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    u</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">_</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">char</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> data</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[1]; </span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} ngx_http_lua_shdict_list_node_t;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>我把这些队列操作 API 的 PR 贴在了文章中，如果你对此感兴趣，可以跟着文档、测试案例和源码，来分析具体的实现。</p><p>不过，下面这 5 个队列 API，在文档中并没有对应的代码示例，这里我简单介绍一下：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lpush/rpush，表示在队列两端增加元素；</span></span>\n<span class="line"><span>lpop/rpop，表示在队列两端弹出元素；</span></span>\n<span class="line"><span>llen，表示返回队列的元素数量。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>别忘了我们上节课讲过的另一个利器——测试案例。如果文档中没有，我们通常可以在测试案例中找到对应的代码。队列相关的测试，正是在 145-shdict-list.t 这个文件中：</p><p>--- http_config lua_shared_dict dogs 1m; --- config</p><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=== TEST 1: lpush &amp; lpop</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    location = /test {</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">_</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">by</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">_</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">lua</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">_</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">block</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">            local</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> dogs</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ngx</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">shared</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">dogs</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>            local len, err = dogs:lpush(&quot;foo&quot;, &quot;bar&quot;)</span></span>\n<span class="line"><span>            if len then</span></span>\n<span class="line"><span>                ngx.say(&quot;push success&quot;)</span></span>\n<span class="line"><span>            else</span></span>\n<span class="line"><span>                ngx.say(&quot;push err: &quot;, err)</span></span>\n<span class="line"><span>            end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>            local val, err = dogs:llen(&quot;foo&quot;)</span></span>\n<span class="line"><span>            ngx.say(val, &quot; &quot;, err)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>            local val, err = dogs:lpop(&quot;foo&quot;)</span></span>\n<span class="line"><span>            ngx.say(val, &quot; &quot;, err)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>            local val, err = dogs:llen(&quot;foo&quot;)</span></span>\n<span class="line"><span>            ngx.say(val, &quot; &quot;, err)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>--- request GET /test --- response_body --- no_error_log [error]</p><p>管理类</p><p>最后要说的管理类 API 也是后续新增的，属于社区呼声比较高的需求。其中，共享内存的使用情况就是最典型的例子。比如，用户申请了 100M 的空间作为 shared dict，那么这 100M 是否够用呢？里面存放了多少 key？具体是哪些 key 呢？这几个都是非常现实的问题。</p><p>对于这类问题，OpenResty 的官方态度，是希望用户使用火焰图来解决，即非侵入式，保持代码基的高效和整洁，而不是提供侵入式的 API 来直接返回结果。</p><p>但站在使用者友好角度来考虑，这些管理类 API 还是非常有必要的。毕竟开源项目是用来解决产品需求的，并不是展示技术本身的。所以，下面我们就来了解一下，这几个后续增加的管理类 API。</p><p>首先是 get_keys(max_count?)，它默认也只返回前 1024 个 key；如果你把 max_count 设置为 0，那就返回所有 key。</p><p>然后是 capacity 和 free_space，这两个 API 都属于 lua-resty-core 仓库，所以需要你 require 后才能使用：</p><p>require &quot;resty.core.shdict&quot;</p><p>local cats = ngx.shared.cats local capacity_bytes = cats:capacity() local free_page_bytes = cats:free_space()</p><p>它们分别返回的，是共享内存的大小（也就是 lua_shared_dict 中配置的大小）和空闲页的字节数。因为 shared dict 是按照页来分配的，即使 free_space 返回为 0，在已经分配的页面中也可能存在空间，所以它的返回值并不能代表共享内存实际被占用的情况。</p><p>写在最后</p><p>在实际的开发中，我们经常会用到多级缓存，OpenResty 的官方项目中也有对缓存的封装。你能找出来是哪几个项目吗？或者你知道一些其他缓存封装的 lua-resty 库吗？</p><p>欢迎留言和我分享，也欢迎你把这篇文章分享给你的同事、朋友，我们一起交流，一起进步。</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>            local val, err = dogs:lpop(&quot;foo&quot;)</span></span>\n<span class="line"><span>            ngx.say(val, &quot; &quot;, err)</span></span>\n<span class="line"><span>        }</span></span>\n<span class="line"><span>    }</span></span>\n<span class="line"><span>push success</span></span>\n<span class="line"><span>1 nil</span></span>\n<span class="line"><span>bar nil</span></span>\n<span class="line"><span>0 nil</span></span>\n<span class="line"><span>nil nil</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div>',90)]))}]]);export{p as __pageData,e as default};
