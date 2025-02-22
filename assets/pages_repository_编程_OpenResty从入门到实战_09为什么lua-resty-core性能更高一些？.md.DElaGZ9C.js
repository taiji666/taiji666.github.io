import{_ as s,c as a,G as n,b as e}from"./chunks/framework.D5KJDRhN.js";const p=JSON.parse('{"title":"09为什么lua-resty-core性能更高一些？","description":"","frontmatter":{"title":"09为什么lua-resty-core性能更高一些？","date":"2025-02-22T00:00:00.000Z","categories":["OpenResty从入门到实战"],"head":[["link",{"rel":"canonical","href":"https://www.doit.ip-ddns.com/pages/repository/编程/OpenResty从入门到实战/09为什么lua-resty-core性能更高一些？"}]]},"headers":[],"relativePath":"pages/repository/编程/OpenResty从入门到实战/09为什么lua-resty-core性能更高一些？.md","filePath":"pages/repository/编程/OpenResty从入门到实战/09为什么lua-resty-core性能更高一些？.md","lastUpdated":1739887664000}');const l=s({name:"pages/repository/编程/OpenResty从入门到实战/09为什么lua-resty-core性能更高一些？.md"},[["render",function(s,p,l,i,t,r){return e(),a("div",null,p[0]||(p[0]=[n('<div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>                            09 为什么 lua-resty-core 性能更高一些？</span></span>\n<span class="line"><span>                            你好，我是温铭。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>前面两节课我们说了，Lua 是一种嵌入式开发语言，核心保持了短小精悍，你可以在 Redis、NGINX 中嵌入 Lua，来帮助你更灵活地完成业务逻辑。同时，Lua 也可以调用已有的 C 函数和数据结构，避免重复造轮子。</p><p>在 Lua 中，你可以用 Lua C API 来调用 C 函数，而在 LuaJIT 中还可以使用 FFI。对 OpenResty 而言：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>在核心的 lua-nginx-module 中，调用 C 函数的 API，都是使用 Lua C API 来完成的；</span></span>\n<span class="line"><span>而在 lua-resty-core 中，则是把 lua-nginx-module 已有的部分 API，使用 FFI 的模式重新实现了一遍。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>看到这里你估计纳闷了：为什么要用 FFI 重新实现一遍？</p><p>别着急，让我们以 ngx.base64_decode 这个很简单的 API 为例，一起看下 Lua C API 和 FFI 的实现有何不同之处，这样你也可以对它们的性能有个直观的认识。</p><p>Lua CFunction</p><p>我们先来看下， lua-nginx-module 中用 Lua C API 是如何实现的。我们在项目的代码中搜索 decode_base64，可以找到它的代码实现在 ngx_http_lua_string.c 中：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lua_pushcfunction(L, ngx_http_lua_ngx_decode_base64);</span></span>\n<span class="line"><span>lua_setfield(L, -2, &quot;decode_base64&quot;);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>上面的代码看着就头大，不过还好，我们不用深究那两个 lua_ 开头的函数，以及它们参数的具体作用，只需要知道一点——这里注册了一个 CFunction：ngx_http_lua_ngx_decode_base64， 而它与 ngx.base64_decode 这个对外暴露的 API 是对应关系。</p><p>我们继续“按图索骥”，在这个 C 文件中搜索 ngx_http_lua_ngx_decode_base64，它定义在文件的开始位置：</p><p>static int ngx_http_lua_ngx_decode_base64(lua_State *L);</p><p>对于那些能够被 Lua 调用的 C 函数来说，它的接口必须遵循 Lua 要求的形式，也就是 typedef int (<em>lua_CFunction)(lua_State</em> L)。它包含的参数是 lua_State 类型的指针 L ；它的返回值类型是一个整型，表示返回值的数量，而非返回值自身。</p><p>它的实现如下（这里我已经去掉了错误处理的代码）：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>static int</span></span>\n<span class="line"><span> ngx_http_lua_ngx_decode_base64(lua_State *L)</span></span>\n<span class="line"><span> {</span></span>\n<span class="line"><span>     ngx_str_t p, src;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><pre><code>src.data = (u_char *) luaL_checklstring(L, 1, &amp;src.len);\n\n p.len = ngx_base64_decoded_length(src.len);\n\n p.data = lua_newuserdata(L, p.len);\n</code></pre><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>     if (ngx_decode_base64(&amp;p, &amp;src) == NGX_OK) {</span></span>\n<span class="line"><span>         lua_pushlstring(L, (char *) p.data, p.len);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     } else {</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">         lua</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">_</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">pushnil</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">L</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>     return 1;</span></span>\n<span class="line"><span> }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>这段代码中，最主要的是 ngx_base64_decoded_length 和 ngx_decode_base64， 它们都是 NGINX 自身提供的 C 函数。</p><p>我们知道，用 C 编写的函数，无法把返回值传给 Lua 代码，而是需要通过栈，来传递 Lua 和 C 之间的调用参数和返回值。这也是为什么，会有很多我们一眼无法看懂的代码。同时，这些代码也不能被 JIT 跟踪到，所以对于 LuaJIT 而言，这些操作是处于黑盒中的，没法进行优化。</p><p>LuaJIT FFI</p><p>而 FFI 则不同。FFI 的交互部分是用 Lua 实现的，这部分代码可以被 JIT 跟踪到，并进行优化；当然，代码也会更加简洁易懂。</p><p>我们还是以 base64_decode为例，它的 FFI 实现分散在两个仓库中： lua-resty-core 和 lua-nginx-module。我们先来看下前者里面实现的代码：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ngx.decode_base64 = function (s)</span></span>\n<span class="line"><span>     local slen = #s</span></span>\n<span class="line"><span>     local dlen = base64_decoded_length(slen)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>     local dst = get_string_buf(dlen)</span></span>\n<span class="line"><span>     local pdlen = get_size_ptr()</span></span>\n<span class="line"><span>     local ok = C.ngx_http_lua_ffi_decode_base64(s, slen, dst, pdlen)</span></span>\n<span class="line"><span>     if ok == 0 then</span></span>\n<span class="line"><span>         return nil</span></span>\n<span class="line"><span>     end</span></span>\n<span class="line"><span>     return ffi_string(dst, pdlen[0])</span></span>\n<span class="line"><span> end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>你会发现，相比 CFunction，FFI 实现的代码清爽了很多，它具体的实现是 lua-nginx-module 仓库中的ngx_http_lua_ffi_decode_base64，如果你对这里感兴趣，可以自己去查看这个函数的实现，特别简单，这里我就不贴代码了。</p><p>不过，细心的你，是否从上面的代码片段中，发现函数命名的一些规律了呢？</p><p>没错，OpenResty 中的函数都是有命名规范的，你可以通过命名推测出它的用处。比如：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ngx_http_lua_ffi_ ，是用 FFI 来处理 NGINX HTTP 请求的 Lua 函数；</span></span>\n<span class="line"><span>ngx_http_lua_ngx_ ，是用 Cfunction 来处理 NGINX HTTP 请求的 Lua 函数；</span></span>\n<span class="line"><span>其他 ngx_ 和 lua_ 开头的函数，则分别属于 NGINX 和 Lua 的内置函数。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>更进一步，OpenResty 中的 C 代码，也有着严格的代码规范，这里我推荐阅读官方的 C 代码风格指南。对于有意学习 OpenResty 的 C 代码并提交 PR 的开发者来说，这是必备的一篇文档。否则，即使你的 PR 写得再好，也会因为代码风格问题被反复评论并要求修改。</p><p>关于 FFI 更多的 API 和细节，推荐你阅读 LuaJIT 官方的教程 和 文档。技术专栏并不能代替官方文档，我也只能在有限的时间内帮你指出学习的路径，少走一些弯路，硬骨头还是需要你自己去啃的。</p><p>LuaJIT FFI GC</p><p>使用 FFI 的时候，我们可能会迷惑：在 FFI 中申请的内存，到底由谁来管理呢？是应该我们在 C 里面手动释放，还是 LuaJIT 自动回收呢？</p><p>这里有个简单的原则：LuaJIT 只负责由自己分配的资源；而 ffi.C 是 C 库的命名空间，所以，使用 ffi.C 分配的空间不由 LuaJIT 负责，需要你自己手动释放。</p><p>举个例子，比如你使用 ffi.C.malloc 申请了一块内存，那你就需要用配对的 ffi.C.free 来释放。LuaJIT 的官方文档中有一个对应的示例：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>local p = ffi.gc(ffi.C.malloc(n), ffi.C.free)</span></span>\n<span class="line"><span> ...</span></span>\n<span class="line"><span> p = nil -- Last reference to p is gone.</span></span>\n<span class="line"><span> -- GC will eventually run finalizer: ffi.C.free(p)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>这段代码中，ffi.C.malloc(n) 申请了一段内存，同时 ffi.gc 就给它注册了一个析构的回调函数 ffi.C.free。这样一来，p 这个 cdata 在被 LuaJIT GC 的时候，就会自动调用 ffi.C.free，来释放 C 级别的内存。而 cdata 是由 LuaJIT 负责 GC的 ，所以上述代码中的 p 会被 LuaJIT 自动释放。</p><p>这里要注意，如果你要在 OpenResty 中申请大块的内存，我更推荐你用 ffi.C.malloc 而不是 ffi.new。原因也很明显：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ffi.new 返回的是一个 cdata，这部分内存由 LuaJIT 管理；</span></span>\n<span class="line"><span>LuaJIT GC 的管理内存是有上限的，OpenResty 中的 LuaJIT 并未开启 GC64 选项，所以单个 worker 内存的上限只有2G。一旦超过 LuaJIT 的内存管理上限，就会导致报错。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>在使用 FFI 的时候，我们还需要特别注意内存泄漏的问题。不过，凡人皆会犯错，只要是人写的代码，百密一疏，总会出现 bug。那么，有没有什么工具可以检测内存泄漏呢？</p><p>这时候，OpenResty 强大的周边测试和调试工具链就派上用场了。</p><p>我们先来说说测试。在 OpenResty 体系中，我们使用 Valgrind 来检测内存泄漏问题。</p><p>前面课程我们提到过的测试框架 test::nginx，有专门的内存泄漏检测模式去运行单元测试案例集，你只需要设置环境变量 TEST_NGINX_USE_VALGRIND=1 即可。OpenResty 的官方项目在发版本之前，都会在这个模式下完整回归，后面的测试章节中我们再详细介绍。</p><p>而 OpenResty 的 CLI resty 也有 --valgrind 选项，方便你单独运行某段 Lua 代码，即使你没有写测试案例也是没问题的。</p><p>再来看调试工具。</p><p>OpenResty 提供基于 systemtap 的扩展，来对 OpenResty 程序进行活体的动态分析。你可以在这个项目的工具集中，搜索 gc 这个关键字，会看到 lj-gc 和 lj-gc-objs 这两个工具。</p><p>而对于 core dump 这种离线分析，OpenResty 提供了 GDB 的工具集，同样你可以在里面搜索 gc，找到 lgc、lgcstat 和 lgcpath 三个工具。</p><p>这些调试工具的具体用法，我们会在后面的调试章节中详细介绍，你先有个印象即可。这样，你遇到内存问题就不会“病急乱投医“，毕竟OpenResty 有专门的工具集，帮你定位和解决这些问题。</p><p>lua-resty-core</p><p>从上面的比较中，我们可以看到，FFI 的方式不仅代码更简洁，而且可以被 LuaJIT 优化，显然是更优的选择。其实现实也是如此，实际上，CFunction 的实现方式已经被 OpenResty 废弃，相关的实现也从代码库中移除了。现在新的 API，都通过 FFI 的方式，在 lua-resty-core 仓库中实现。</p><p>在 OpenResty 2019 年 5 月份发布的 1.15.8.1 版本前，lua-resty-core 默认是不开启的，而这不仅会带来性能损失，更严重的是会造成潜在的 bug。所以，我强烈推荐还在使用历史版本的用户，都手动开启 lua-resty-core。你只需要在 init_by_lua 阶段，增加一行代码就可以了：</p><p>require &quot;resty.core&quot;</p><p>当然，姗姗来迟的 1.15.8.1 版本中，已经增加了 lua_load_resty_core 指令，默认开启了 lua-resty-core。我个人感觉，OpenResty 对于 lua-resty-core 的开启还是过于谨慎了，开源项目应该尽早把类似的功能设置为默认开启。</p><p>lua-resty-core 中不仅重新实现了部分 lua-nginx-module 项目中的 API，比如 ngx.re.match、ngx.md5 等，还实现了不少新的 API，比如 ngx.ssl、ngx.base64、ngx.errlog、ngx.process、ngx.re.split、ngx.resp.add_header、ngx.balancer、ngx.semaphore 等等，我们在后面的 OpenResty API 章节中会介绍到。</p><p>写在最后</p><p>讲了这么多内容，最后我还是想说，FFI 虽然好，却也并不是性能银弹。它之所以高效，主要原因就是可以被 JIT 追踪并优化。如果你写的 Lua 代码不能被 JIT，而是需要在解释模式下执行，那么 FFI 的效率反而会更低。</p><p>那么到底有哪些操作可以被 JIT，哪些不能呢？怎样才可以避免写出不能被 JIT 的代码呢？下一节我来揭晓这个问题。</p><p>最后，给你留一个需要动手的作业题：你可以找一两个lua-nginx-module 和 lua-resty-core 中都存在的 API，然后性能测试比较一下两者的差异吗？你可以看下 FFI 的性能提升到底有多大。</p><p>欢迎留言和我分享你的思考、收获，也欢迎你把这篇文章分享给你的同事、朋友，一起交流，一起进步。</p>',60)]))}]]);export{p as __pageData,l as default};
