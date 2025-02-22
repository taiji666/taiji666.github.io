import{_ as s,c as a,G as n,e,b as p}from"./chunks/framework.D5KJDRhN.js";const i=JSON.parse('{"title":"33性能提升10倍的秘诀：必须用好table","description":"","frontmatter":{"title":"33性能提升10倍的秘诀：必须用好table","date":"2025-02-22T00:00:00.000Z","categories":["OpenResty从入门到实战"],"head":[["link",{"rel":"canonical","href":"https://www.doit.ip-ddns.com/pages/repository/编程/OpenResty从入门到实战/33性能提升10倍的秘诀：必须用好table"}]]},"headers":[],"relativePath":"pages/repository/编程/OpenResty从入门到实战/33性能提升10倍的秘诀：必须用好table.md","filePath":"pages/repository/编程/OpenResty从入门到实战/33性能提升10倍的秘诀：必须用好table.md","lastUpdated":1739887664000}');const l=s({name:"pages/repository/编程/OpenResty从入门到实战/33性能提升10倍的秘诀：必须用好table.md"},[["render",function(s,i,l,t,r,c){return p(),a("div",null,i[0]||(i[0]=[n('<div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>                            33 性能提升10倍的秘诀：必须用好 table</span></span>\n<span class="line"><span>                            你好，我是温铭。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>在 OpenResty 中，除了字符串经常出现性能问题外，table 也是性能的拦路虎。在之前的章节中，我们零零散散地介绍过 table 相关的函数，但并没有专门提到它对性能方面的提升。今天，我就带你专门来聊聊，table 操作对性能的影响。</p><p>不同于对字符串的熟悉，开发者对于 table 相关的性能优化知之甚少，这主要有两个方面的原因。</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>其一，OpenResty 中使用的是 Lua ，是自己的 LuaJIT 分支，不是标准的 LuaJIT，也不是标准的 Lua。而大部分开发者并不知道它们之间的区别，倾向于使用标准 Lua 的 table 库来写 OpenResty 代码。</span></span>\n<span class="line"><span>其二，在标准 LuaJIT 和 OpenResty 自己的 LuaJIT 分支中，table 操作相关的文档都藏得非常深，开发者很难找到；而且文档中也没有示例代码，需要开发者自己去开源项目中寻找示例。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>这就形成了比较高的认知壁垒，导致了两极分化的结果——资深的 OpenResty 开发者能够写出很高性能的代码，而刚入门的则会怀疑 OpenResty 的高性能是不是一个泡沫。当然，等你学习完这节课的内容，你就可以轻松地戳破这层窗户纸，让性能提升 10 倍不是梦。</p><p>在详细介绍 table 优化之前，我想先强调的一点是，table 相关的优化，有一个自己的简单原则：</p><p>尽量复用，避免不必要的 table 创建。</p><p>你先记住这一点，下面，我们就从 table 的创建、元素的插入、清空、循环使用等方面，分别来介绍相关的优化。</p><p>预先生成数组</p><p>第一步，自然是创建数组。在 Lua 中，我们创建数组的方式很简单：</p><p>local t = {}</p><p>上面这行代码，就创建了一个空数组；当然，你也可以在创建的时候，就加上初始化的数据：</p>',12),e("p",{first:""},"local color =",-1),n('<p>不过，第二种写法对于性能的损失比较大，原因在于每次新增和删除数组元素的时候，都会涉及到数组的空间分配、resize 和 rehash。</p><p>那么应该如何优化呢？空间换时间，是一种常见的优化思路。既然这里的性能瓶颈是动态分配数组空间，那么优化的方向，就可以是预先生成一个指定大小的数组。这样做虽然可能会浪费一部分的内存空间，但多次的空间分配、resize 和 rehash 等动作，就可以合并为一次完成了，效率高了不少。</p><p>事实上，LuaJIT 中的 table.new(narray, nhash) 函数，就是因此而新增的。</p><p>这个函数，会预先分配好指定的数组和哈希的空间大小，而不是在插入元素时自增长，这也是它的两个参数 narray 和 nhash 的含义。</p><p>下面我们通过一个简单的例子，来看下具体的使用。因为这个函数是 LuaJIT 扩展出来的，所以，在使用它之前，我们需要先 require 一下：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>local new_tab = require &quot;table.new&quot;</span></span>\n<span class="line"><span> local t = new_tab(100, 0)</span></span>\n<span class="line"><span> for i = 1, 100 do</span></span>\n<span class="line"><span>   t[i] = i</span></span>\n<span class="line"><span> end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>另外，因为之前的 OpenResty 并没有完全绑定 LuaJIT，还支持标准 Lua，所以有些旧的代码会做这方面的兼容。如果没有找到 table.new 这个函数，就会模拟出来一个空的函数，来保证调用方的统一。</p><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">local ok, new_tab = pcall(require, &quot;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">table</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.new&quot;)</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  if not ok then</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    new_tab = function (narr, nrec) return {} end</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>自己计算 table 下标</p><p>有了 table 对象之后，下一步就是向它里面增加元素了。最直接的方法，就是调用 table.insert 这个函数来插入元素：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>local new_tab = require &quot;table.new&quot;</span></span>\n<span class="line"><span> local t = new_tab(100, 0)</span></span>\n<span class="line"><span> for i = 1, 100 do</span></span>\n<span class="line"><span>   table.insert(t, i)</span></span>\n<span class="line"><span> end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>或者是先获取当前数组的长度，通过下标的方式来插入元素：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>local new_tab = require &quot;table.new&quot;</span></span>\n<span class="line"><span> local t = new_tab(100, 0)</span></span>\n<span class="line"><span> for i = 1, 100 do</span></span>\n<span class="line"><span>   t[#t + 1] = i</span></span>\n<span class="line"><span> end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>不过，这两种方式都需要先计算数组的长度，然后再新增元素。显然，这个操作是 O(n) 的时间复杂度。就拿上面代码的例子来说，for 循环会计算 100 次数组的长度，这样下来性能自然不乐观，并且数组越大时，性能也会越低。</p><p>这一点又该如何解决呢？让我们看下 lua-resty-redis 这个官方的库是如何做的吧：</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">local </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> _gen_req</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">args</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    local</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> nargs</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = #</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">args</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    local req = new_tab(nargs * 5 + 1, 0)</span></span>\n<span class="line"><span>    req[1] = &quot;*&quot; .. nargs .. &quot;\\r\\n&quot;</span></span>\n<span class="line"><span>    local nbits = 2</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    for i = 1, nargs do</span></span>\n<span class="line"><span>        local arg = args[i]</span></span>\n<span class="line"><span>        req[nbits] = &quot;$&quot;</span></span>\n<span class="line"><span>        req[nbits + 1] = #arg</span></span>\n<span class="line"><span>        req[nbits + 2] = &quot;\\r\\n&quot;</span></span>\n<span class="line"><span>        req[nbits + 3] = arg</span></span>\n<span class="line"><span>        req[nbits + 4] = &quot;\\r\\n&quot;</span></span>\n<span class="line"><span>        nbits = nbits + 5</span></span>\n<span class="line"><span>    end</span></span>\n<span class="line"><span>    return req</span></span>\n<span class="line"><span>en</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>这个函数预先生成了数组 req，它的大小由函数的入参来决定，这样就可以保证尽量不浪费空间。</p><p>然后，它使用 nbits 这个变量，来自己维护 req 的下标，自然就抛弃了 Lua 内置的 table.insert 函数和获取长度的操作符 #。你可以看到，在 for 循环中，nbits + 1 等一些运算，就是直接用下标的方式插入元素；并在最后用 nbits = nbits + 5 ，让下标保持一个正确的值。</p><p>这种的好处很明显，它省略了获取数组大小这个 O(n) 的操作，而是直接用下标访问，时间复杂度也变成了 O(1) 。当然，缺点也一样明显，那就是降低了代码的可读性，并且出错概率大大提高，可以说，这是一把双刃剑。</p><p>循环使用单个 table</p><p>既然 table 这么来之不易，我们自然要好好珍惜，尽量做到重复使用。不过，循环利用也是有条件的。我们先要把 table 中原有的数据清理干净，以免对下一个使用者造成污染。</p><p>这时，table.clear 函数就派上用场了。从它的名字你就能看出它的作用，它会把数组中的所有数据清空，但数组的大小不会变。也就是说，你用 table.new(narray, nhash) 生了一个长度为 100 的数组，clear 后，长度还是 100。</p><p>为了让你能够更清楚它的实现，下面我给出了一个代码示例，它兼容了标准 Lua：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>local ok, clear_tab = pcall(require, &quot;table.clear&quot;)</span></span>\n<span class="line"><span>  if not ok then</span></span>\n<span class="line"><span>    clear_tab = function (tab)</span></span>\n<span class="line"><span>      for k, _ in pairs(tab) do</span></span>\n<span class="line"><span>        tab[k] = nil</span></span>\n<span class="line"><span>      end</span></span>\n<span class="line"><span>    end</span></span>\n<span class="line"><span>  end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>可以看到，clear 函数实际上就是把每一个元素都置为了nil。</p><p>一般来说，我们会把这种循环使用的 table，放在一个模块的 top level 中。这样，在你使用模块中的函数的时候，就可以根据自己的实际情况来决定，到底是直接使用，还是 clear 后再使用。</p><p>比如我们来看一个实际应用的例子。下面这段 伪代码 取自开源的微服务 API 网关 APISIX，这是它在加载插件时候的逻辑：</p><p>local local_plugins = {}</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> load</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    core</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">table</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">clear</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">local_plugins</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    local local_conf = core.config.local_conf()</span></span>\n<span class="line"><span>    local plugin_names = local_conf.plugins</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    local processed = {}</span></span>\n<span class="line"><span>    for _, name in ipairs(plugin_names) do</span></span>\n<span class="line"><span>        if processed[name] == nil then</span></span>\n<span class="line"><span>            processed[name] = true</span></span>\n<span class="line"><span>            insert_tab(local_plugins, name)</span></span>\n<span class="line"><span>        end</span></span>\n<span class="line"><span>    end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><pre><code>return local_plugins\n</code></pre><p>你可以看到，local_plugins 这个数组，是 plugin 这个模块的 top level 变量。在 load 这个加载插件函数的开始位置， table 就会被清空，然后根据当前的情况生成新的插件列表。</p><p>table 池</p><p>到现在，你就掌握了对单个 table 循环使用的优化方法了。那么更进一步，你还可以用缓存池的方式来保存多个 table，以便随用随取，官方提供的 lua-tablepool 正是出于这个目的。</p><p>下面这段代码，展示了 table 池的基本使用方法。我们可以从指定的池子中获取一个 table，使用完以后再释放回去：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>local tablepool = require &quot;tablepool&quot;</span></span>\n<span class="line"><span> local tablepool_fetch = tablepool.fetch</span></span>\n<span class="line"><span> local tablepool_release = tablepool.release</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">local pool_name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;some_tag&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">local </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> do_sth</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">     local</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> t</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">tablepool_fetch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">pool_name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, 10, 0)</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     -- -- </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">using</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> t</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> for</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> some</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> purposes</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    tablepool_release</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">pool_name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">t</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>显然，tablepool 中会用到前面我们介绍过的几个方法，而且它的代码只有不到一百行，所以，如果你学有余力，我十分推荐你可以自己搜索并研究一下。这里，我主要介绍下它的两个 API。</p><p>第一个是 fetch 方法，它的参数和 table.new 基本一样，只是多了一个 pool_name。如果池子中没有空闲的数组，fetch 方法就会调用 table.new 来新建一个数组。</p><p>tablepool.fetch(pool_name, narr, nrec)</p><p>第二个是 release 这个把 table 放回池子的函数。在它的参数中，最后的 no_clear ，用来配置是否要调用 table.clear 把数组清空。</p><p>tablepool.release(pool_name, tb, [no_clear])</p><p>你看，我们前面介绍到的方法，到这里是不是就全部串联起来了？</p><p>不过，注意不要因此滥用tablepool。tablepool 在实际项目中的使用并不多，比如 Kong 中就没有用到，APISIX 也只有少数几个调用。大多数情况下，不用 tablepool 的这层封装，也是足够我们使用的。</p><p>写在最后</p><p>性能优化，是 OpenResty 中的硬骨头，也是我们大家关注的热点。今天我介绍了table相关的性能优化技巧，希望能对你的实际项目有所帮助。</p><p>最后给你留一个作业题：你可以自己做个性能测试，对比下使用 table 相关优化技巧前后的性能差异吗？欢迎留言和我交流，你的做法和观点都是我希望听到的声音，也欢迎你把这篇文章分享出去，让更多的人一起参与进来。</p>',50)]))}]]);export{i as __pageData,l as default};
