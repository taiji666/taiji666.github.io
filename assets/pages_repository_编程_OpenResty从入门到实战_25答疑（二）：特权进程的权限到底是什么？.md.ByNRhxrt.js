import{_ as s,c as n,G as a,b as e}from"./chunks/framework.D5KJDRhN.js";const p=JSON.parse('{"title":"25答疑（二）：特权进程的权限到底是什么？","description":"","frontmatter":{"title":"25答疑（二）：特权进程的权限到底是什么？","date":"2025-02-22T00:00:00.000Z","categories":["OpenResty从入门到实战"],"head":[["link",{"rel":"canonical","href":"https://www.doit.ip-ddns.com/pages/repository/编程/OpenResty从入门到实战/25答疑（二）：特权进程的权限到底是什么？"}]]},"headers":[],"relativePath":"pages/repository/编程/OpenResty从入门到实战/25答疑（二）：特权进程的权限到底是什么？.md","filePath":"pages/repository/编程/OpenResty从入门到实战/25答疑（二）：特权进程的权限到底是什么？.md","lastUpdated":1740213738000}');const i=s({name:"pages/repository/编程/OpenResty从入门到实战/25答疑（二）：特权进程的权限到底是什么？.md"},[["render",function(s,p,i,t,l,r){return e(),n("div",null,p[0]||(p[0]=[a('<div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>                            25 答疑（二）：特权进程的权限到底是什么？</span></span>\n<span class="line"><span>                            你好，我是温铭。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>专栏更新到现在，OpenResty第二版块 OpenResty API 篇，我们就已经学完了。恭喜你没有掉队，仍然在积极学习和实践操作，并且热情地留下了你的思考。</p><p>很多留言提出的问题很有价值，大部分我都已经在App里回复过，一些手机上不方便回复的或者比较典型、有趣的问题，我专门摘了出来，作为今天的答疑内容，集中回复。另一方面，也是为了保证所有人都不漏掉任何一个重点。</p><p>下面我们来看今天的这 6 个问题。</p><p>第一问，特权进程的权限</p><p>Q：我想请问下，特权进程是怎么回事，如果启动 OpenResty 的本身就是普通用户，如何获取root权限呢？另外，老师可以介绍下，特权进程的使用场景有哪些吗？</p><p>A：其实，特权进程的权限和 master 进程的权限保持一样。如果你用普通用户身份启动 OpenResty，那么 master 就是普通用户的权限，这时候特权进程也就没有什么特权了。</p><p>这一点应该还是很好理解的，普通用户启动的进程，无论如何也不会有 root 权限。</p><p>至于特权进程的使用场景，我们一般用特权进程来处理的是清理日志、重启 OpenResty 自身等需要高权限的任务。你需要注意的是，不要把 worker 进程的任务交给特权进程来处理。这并非因为特权进程不能做到，而是其存在安全隐患。</p><p>我见到过一个开发者，他把定时器的任务都交给了特权进程来处理。他为什么这么做呢？因为特权进程只有一个，这样 timer 就不会重复启动。</p><p>是不是觉得这看上去很聪明呀，不用 worker.id 这种笨方法就做到了。但是，别忘了，如果定时器的任务和用户的输入有关，这不就等于留了一个后门吗？显然是非常危险的。</p><p>第二问，阶段和调试</p><p>Q：老师，是不是无论在哪个阶段运行ngx.say(&#39;hello&#39;)，OpenResty都会在执行完本阶段的剩余代码后，直接响应给客户端，而不会继续执行其他阶段了呢？我测试出来是这样的。</p><p>A：事实上并非如此，我们可以来看下它的执行阶段的顺序图：</p><p>你可以做个测试，先在 content 里面 ngx.say；然后，在 log 或者 body filter 阶段使用 ngx.log 来打印下日志试试。</p><p>在专栏中，我并没有专门提到在 OpenResty 中做代码调试的问题，这也是开发者经常困惑的地方，我正好顺着这个问题在答疑中聊一下。</p><p>其实，OpenResty 中的代码调试，并没有断点这些高级功能（相应有一些付费的插件，但我并没有使用过），只能用 ngx.say 和ngx.log 来看输出。我知道的开发者，包括 OpenResty 的作者和贡献者们，都是这样来做 debug 的。所以，你需要有强有力的测试案例和调试日志来作为保证。</p><p>第三问，ngx.exit 和动手实验</p><p>Q：老师，文中的这句话，“OpenResty 的 HTTP 状态码中，有一个特别的常量：ngx.OK。当 ngx.exit(ngx.OK) 时，请求会退出当前处理阶段，进入下一个阶段，而不是直接返回给客户端。”</p><p>我记得，ngx.OK应该不能算是HTTP状态码，它对应的值是0。我的理解是：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ngx.exit(ngx.OK)、ngx.exit(ngx.ERROR)和ngx.exit(ngx.DECLINED)时，请求会退出当前处理阶段，进入下一个阶段；</span></span>\n<span class="line"><span>而当ngx.exit(ngx.HTTP_*)以ngx.HTTP_*的各种HTTP状态码作为参数时，会直接响应给客户端。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>不知道这样想对不对呢？</p><p>A：关于你的第一个问题，ngx.ok 确实不是http状态码，它是 OpenResty 中的一个常量，值是0。</p><p>至于第二个问题，ngx.exit 的官方文档其实正好可以解答：</p><p>When status &gt;= 200 (i.e., ngx.HTTP_OK and above), it will interrupt the execution of the current request and return status code to nginx.</p><p>When status == 0 (i.e., ngx.OK), it will only quit the current phase handler (or the content handler if the content_by_lua* directive is used) and continue to run later phases (if any) for the current request.</p><p>不过，文档里并没有提到， OpenResty对于ngx.exit(ngx.ERROR)和ngx.exit(ngx.DECLINED)是如何处理的，我们可以自己来做个测试，比如下面这样：</p><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">location /lua {</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        rewrite</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">_</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">by</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">_</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">lua</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ngx</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">exit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ngx</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ERROR</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)&quot;;</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        echo</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> hello</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>显然，访问这个 location，你可以看到 http 响应码为空，响应体也是空，并没有进入下一个执行阶段。</p><p>其实，还是那句话，在 OpenResty 的学习过程中，随着你逐步深入，一定会在某个阶段发现，文档和测试案例都无法回答你的问题。这时候，就需要你自己构建测试案例来验证你的想法了。你可以手动测试，也可以添加在 test::nginx 搭建的测试案例集里面。</p><p>第四问，变量和竞争</p><p>Q：老师，你好，我有下面几个问题想请教一下。</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>前面讲过，ngx.var变量的作用域在nginx C和lua-nginx-module模块之间。这个我不太理解，从请求的角度来看，是指一个工作进程中的单个请求吗？</span></span>\n<span class="line"><span>我的理解是，在我们操作模块内的变量时，如果两个操作之间有阻塞操作，可能会出现竞争。那么，如果两个操作之间没有阻塞操作，恰好CPU时间到了后，当前进程进入就绪队列，这样可能产生竞争吗？</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>A：我们依次来看这几个问题。</p><p>第一，关于ngx.var 变量的问题，你的理解是正确的。实际上，ngx.var 的生命周期和请求一致，请求结束它也就消失了。但它的优势，是数据可以在 C 模块和 Lua 代码中传递。这是其他几种方式都无法做到的。</p><p>第二，关于变量竞争的问题，其实，只要两个操作之间有 yield 操作，就可能出现竞争，而不是阻塞操作；有阻塞操作时是不会出现竞争的。换句话说，只要你不把主动权交给 Nginx 的事件循环，就不会有竞争。</p><p>第五问，共享字典操作是否需要加锁呢？</p><p>Q：老师，如果多个worker并发存储数据，是不是需要加锁呢？比如下面这个例子：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>resty --shdict &#39;dogs 10m&#39; -e &#39;local dogs = ngx.shared.dogs</span></span>\n<span class="line"><span>local lock= ngx.xxxx.lock</span></span>\n<span class="line"><span>lock.lock()</span></span>\n<span class="line"><span> dogs:set(&quot;Jim&quot;, 8)</span></span>\n<span class="line"><span>lock.unlock()</span></span>\n<span class="line"><span> local v = dogs:get(&quot;Jim&quot;)</span></span>\n<span class="line"><span> ngx.say(v)</span></span>\n<span class="line"><span> &#39;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>A：其实这里不用你自己加锁，共享字典（shared dict）的操作都是原子性的，不管是 get 还是 set。这种类似加锁的处理，OpenResty已经帮你考虑到了。</p><p>第六问，OpenResty 中如何更新时间？</p><p>Q：ngx.now()取时间，是发生在resume函数恢复堆栈阶段吗？</p><p>A：Nginx 是以性能优先作为设计理念的，它会把时间缓存下来。这一点，我们从 ngx.now 的源码中就可以得到印证：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>static int</span></span>\n<span class="line"><span>ngx_http_lua_ngx_now(lua_State *L)</span></span>\n<span class="line"><span>{</span></span>\n<span class="line"><span>    ngx_time_t              *tp;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><pre><code>tp = ngx_timeofday();\n\nlua_pushnumber(L, (lua_Number) (tp-&gt;sec + tp-&gt;msec / 1000.0L));\n</code></pre><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    return 1;</span></span>\n<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>可以看出，ngx.now()这个获取当前时间函数的背后，隐藏的其实是 Nginx 的 ngx_timeofday 函数。而ngx_timeofday 函数，其实是一个宏定义：</p><p>#define ngx_timeofday() (ngx_time_t *) ngx_cached_time</p><p>这里ngx_cached_time 的值，只在函数 ngx_time_update 中会更新。</p><p>所以，这个问题就简化成了， ngx_time_update什么时候会被调用？如果你在 Nginx 的源码中去跟踪它的话，就会发现， ngx_time_update 的调用都出现在事件循环中，这个问题也就明白了吧。</p><p>通过这个问题你应该也能发现，开源项目的好处就是，你可以根据蛛丝马迹，在源码中寻找答案，颇有一种破案的感觉。</p><p>今天主要解答这几个问题。最后，欢迎你继续在留言区写下你的疑问，我会持续不断地解答。希望可以通过交流和答疑，帮你把所学转化为所得。也欢迎你把这篇文章转发出去，我们一起交流、一起进步。</p>',52)]))}]]);export{p as __pageData,i as default};
