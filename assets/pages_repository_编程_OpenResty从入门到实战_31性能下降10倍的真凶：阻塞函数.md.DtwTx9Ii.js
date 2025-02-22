import{_ as s,c as a,G as n,b as e}from"./chunks/framework.D5KJDRhN.js";const p=JSON.parse('{"title":"31性能下降10倍的真凶：阻塞函数","description":"","frontmatter":{"title":"31性能下降10倍的真凶：阻塞函数","date":"2025-02-22T00:00:00.000Z","categories":["OpenResty从入门到实战"],"head":[["link",{"rel":"canonical","href":"https://www.doit.ip-ddns.com/pages/repository/编程/OpenResty从入门到实战/31性能下降10倍的真凶：阻塞函数"}]]},"headers":[],"relativePath":"pages/repository/编程/OpenResty从入门到实战/31性能下降10倍的真凶：阻塞函数.md","filePath":"pages/repository/编程/OpenResty从入门到实战/31性能下降10倍的真凶：阻塞函数.md","lastUpdated":1740213738000}');const i=s({name:"pages/repository/编程/OpenResty从入门到实战/31性能下降10倍的真凶：阻塞函数.md"},[["render",function(s,p,i,l,t,r){return e(),a("div",null,p[0]||(p[0]=[n('<div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>                            31 性能下降10倍的真凶：阻塞函数</span></span>\n<span class="line"><span>                            你好，我是温铭。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>通过前面几个章节的学习，相信你已经对 LuaJIT、OpenResty 的架构，以及Lua API 和测试等方面有了全面的了解。下面，我们就要进入本专栏内容最多，也是最容易被忽视的性能优化章节了。</p><p>在性能优化章节中，我会带你熟悉 OpenResty 中性能优化的方方面面，并把前面章节中提到的零散内容，总结为全面的 OpenResty 的编码指南，以便你编写出更高质量的 OpenResty 代码。</p><p>要知道，提升性能并不容易，你需要考虑到系统架构优化、数据库优化、代码优化、性能测试、火焰图分析等不少步骤。但相反，降低性能却很容易，就像今天这节课的标题一样，你只需要加几行代码，就可以让性能下降 10 倍甚至更多。如果你使用了 OpenResty 来编写代码，但性能却一直提不上去，那么很可能就是因为使用了阻塞函数。</p><p>所以，在介绍性能优化的具体方法之前，让我们先来了解下 OpenResty 编程中的一个重要原则：避免使用阻塞函数。</p><p>我们从小就被家长和老师教育，不要玩火，不要触碰插头，这些都是危险的行为。同样的，在 OpenResty 中也存有这种危险的行为。如果你的代码中存在阻塞的操作，就会导致性能的急剧下降，那么我们使用 OpenResty 来搭建高性能服务端的初衷，也将会落空。</p><p>为什么不要用阻塞操作？</p><p>了解哪些行为是危险的，并避免使用它们，是性能优化的第一步。让我们先来回顾下，为什么阻塞操作会影响 OpenResty 的性能。</p><p>OpenResty 之所以可以保持很高的性能，简单来说，是因为它借用了 Nginx 的事件处理和 Lua 的协程机制，所以：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>在遇到网络 I/O 等需要等待返回才能继续的操作时，就会先调用 Lua 协程的 yield 把自己挂起，然后在 Nginx 中注册回调；</span></span>\n<span class="line"><span>在 I/O 操作完成（也可能是超时或者出错）后，由 Nginx 回调 resume，来唤醒 Lua 协程。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>这样的流程，保证了 OpenResty 可以一直高效地使用 CPU 资源，来处理所有的请求。</p><p>在这个处理流程中，如果没有使用 cosocket 这种非阻塞的方式，而是用阻塞的函数来处理 I/O，那么 LuaJIT 就不会把控制权交给 Nginx 的事件循环。这就会导致，其他的请求要一直排队等待阻塞的事件处理完，才会得到响应。</p><p>综上所述，在 OpenResty 的编程中，对于可能出现阻塞的函数调用，我们要特别谨慎；否则，一行阻塞的代码，就会把整个服务的性能拖垮。</p><p>下面，我再来介绍几个常见的坑，也就是一些经常会被误用的阻塞函数；我们也一起来体会下，如何用最简单的方式“搞破坏“，快速让你的服务性能下降 10 倍。</p><p>执行外部命令</p><p>在很多的场景下，开发者并不只是把 OpenResty 当作 web 服务器，而是会赋予更多业务的逻辑在其中。这种情况下，就有可能需要调用外部的命令和工具，来辅助完成一些操作了。</p><p>比如杀掉某个进程：</p><p>os.execute(&quot;kill -HUP &quot; .. pid)</p><p>或者是拷贝文件、使用 OpenSSL 生成密钥等耗时更久的一些操作：</p><p>os.execute(&quot; cp test.exe /tmp &quot;)</p><p>os.execute(&quot; openssl genrsa -des3 -out private.pem 2048 &quot;)</p><p>表面上看， os.execute 是 Lua 的内置函数，而在 Lua 世界中，也确实是用这种方式来调用外部命令的。但是，我们要记住，Lua 是一种嵌入式语言，它在不同的上下文环境中，会有完全不同的推荐用法。</p><p>在 OpenResty 的环境中，os.execute 会阻塞当前请求。所以，如果这个命令的执行时间特别短，那么影响还不是很大；可如果这个命令，需要执行几百毫秒甚至几秒钟的时间，那么性能就会有急剧的下降。</p><p>问题我们明白了，那么应该如何解决呢？一般来讲，有两个解决方案。</p><p>方案一：如果有 FFI 库可以使用，那么我们就优先使用 FFI 的方式来调用。</p><p>比如，上面我们是用 OpenSSL 的命令行来生成密钥，就可以改为，用 FFI 调用 OpenSSL 的 C 函数的方式来绕过。</p><p>而对于杀掉某个进程的示例，你可以使用 lua-resty-signal 这个 OpenResty 自带的库，来非阻塞地解决。代码实现如下，当然，这里的lua-resty-signal ，其实也是用 FFI 去调用系统函数来解决的。</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>local resty_signal = require &quot;resty.signal&quot;</span></span>\n<span class="line"><span>local pid = 12345</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>local ok, err = resty_signal.kill(pid, &quot;KILL&quot;)</p><p>另外，在 LuaJIT 的官方网站上，专门有一个页面，里面分门别类地介绍了各种 FFI 的绑定库。当你在处理图片、加解密等 CPU 密集运算的时候，可以先去里面看看，是否有已经封装好的库，可以拿来直接使用。</p><p>方案二：使用基于 ngx.pipe 的 lua-resty-shell 库。</p><p>正如之前介绍过的一样，你可以在 shell.run 中运行你自己的命令，它就是一个非阻塞的操作：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> resty</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -e</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;local shell = require &quot;resty.shell&quot;</span></span>\n<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">local ok, stdout, stderr, reason, status =</span></span>\n<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    shell.run([[echo &quot;hello, world&quot;]])</span></span>\n<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    ngx.say(stdout) &#39;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>磁盘 I/O</p><p>我们再来看下，处理磁盘 I/O 的场景。在一个服务端程序中，读取本地的配置文件是一个很常见的操作，比如下面这段代码：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>local path = &quot;/conf/apisix.conf&quot;</span></span>\n<span class="line"><span>local file = io.open(path, &quot;rb&quot;)</span></span>\n<span class="line"><span>local content = file:read(&quot;*a&quot;) </span></span>\n<span class="line"><span>file:close()</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>这段代码使用 io.open ，来获取某个文件中的所有内容。不过，虽然它是一个阻塞的操作，但别忘了，事情都要在实际场景下来考虑。如果你在 init 和 init worker 中调用，那么它其实是个一次性的动作，并没有影响任何终端用户的请求，是完全可以被接受的。</p><p>当然，如果每一个用户的请求，都会触发磁盘的读写，那就变得不可接受了。这时，你就需要认真地考虑解决方案了。</p><p>第一种方式，我们可以使用 lua-io-nginx-module 这个第三方的 C 模块。它为 OpenResty 提供了“非阻塞”的 Lua API，不过，这里的非阻塞是加了引号的，你不能像 cosocket 一样，随心所欲地去使用它。因为磁盘的 I/O 消耗并不会平白无故地消失，只不过是换了一种方式而已。</p><p>这种方式的原理是，lua-io-nginx-module 利用了 Nginx 的线程池，把磁盘 I/O 操作从主线程转移到另外一个线程中处理，这样，主线程就不会因为磁盘 I/O 操作而被阻塞。</p><p>不过，使用这个库时，你需要重新编译 Nginx，因为它是一个 C 模块。它的使用方法如下，和 Lua 的 I/O 库基本是一致的：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>local ngx_io = require &quot;ngx.io&quot;</span></span>\n<span class="line"><span>local path = &quot;/conf/apisix.conf&quot;</span></span>\n<span class="line"><span> local file, err = ngx_io.open(path, &quot;rb&quot;)</span></span>\n<span class="line"><span> local data, err = file: read(&quot;*a&quot;) </span></span>\n<span class="line"><span>file:close()</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>第二种方式，则是尝试架构上的调整。对于这类磁盘 I/O，我们是否可以换种方式，不再读写本地磁盘呢？</p><p>这里我举一个例子，你可以举一反三去思考。在多年之前，我经手的一个项目中，需要在本地磁盘中记录日志，以便统计和排除问题。</p><p>当时的开发者，是用 ngx.log 来写这些日志的，就像下面这样：</p><p>ngx.log(ngx.WARN, &quot;info&quot;)</p><p>这行代码调用的是 OpenResty 提供的 Lua API，看上去没有任何问题。但是，缺点在于，你不能频繁地去调用它。首先， ngx.log 本身就是一个代价不小的函数调用；其次，即使有缓冲区，大量而频繁的磁盘写入，也会严重地影响性能。</p><p>那该如何解决呢？让我们回到原始的需求——统计和排错，而写入本地磁盘，本就只是达成目的的手段之一。</p><p>所以，你还可以把日志发送到远端的日志服务器上，这样就可以用 cosocket 来完成非阻塞的网络通信了，也就是把阻塞的磁盘 I/O 丢给日志服务，不要阻塞对外的服务。你可以使用 lua-resty-logger-socket ，来完成这样的工作：</p><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">local logger = require &quot;resty</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.logger</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.socket&quot;</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">if not logger.initted() then</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    local ok, err = logger</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.init</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        host</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = &#39;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">xxx</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&#39;,</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        port</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 1234,</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        flush</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">_</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">limit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 1234,</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        drop</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">_</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">limit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 5678,</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">local msg = &quot;foo&quot;</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">local bytes, err = logger.log(msg)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>其实，你应该也发现了，上面两个方法的本质都是一样的：如果阻塞不可避免，那就不要阻塞主要的工作线程，丢给外部的其他线程或者服务就可以了。</p><p>luasocket</p><p>最后，我们来说说 luasocket ，它也是容易被开发者用到的一个 Lua 内置库，经常有人分不清 luasocket 和 OpenResty 提供的 cosocket。luasocket 也可以完成网络通信的功能，但它并没有非阻塞的优势。如果你使用了 luasocket，那么性能也会急剧下降。</p><p>但是，luasocket 同样有它独特的使用场景。不知道你还记得吗？前面我们讲过，cosocket 在不少阶段是无法使用的，我们一般可以用 ngx.timer 的方式来绕过。同时，你也可以在 init_by_lua* 和 init_worker_by_lua* 这种一次性的阶段中，使用 luasocket 来完成 cosocket 的功能。越熟悉 OpenResty 和 Lua 的异同，你就越能找到类似这样的有趣的解决方案。</p><p>另外，lua-resty-socket 其实就是一个二次封装的开源库，它做到了 luasocket 和 cosocket 的兼容。这个内容也值得进一步研究，如果你学有余力，这里我给你准备了继续学习的资料。</p><p>写在最后</p><p>总的来说，在OpenResty 中，认识到阻塞操作的类型和解决方法，是做好性能优化的基础。那么，在实际的开发中，你遇到过类似的阻塞操作吗？你又是如何来发现和解决的呢？欢迎留言和我分享你的经验，也欢迎你把这篇文章分享出去。</p>',57)]))}]]);export{p as __pageData,i as default};
