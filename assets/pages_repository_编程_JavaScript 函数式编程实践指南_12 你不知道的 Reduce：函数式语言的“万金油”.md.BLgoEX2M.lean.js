import{_ as s,c as i,G as a,b as n}from"./chunks/framework.D5KJDRhN.js";const e=JSON.parse('{"title":"12 你不知道的 Reduce：函数式语言的“万金油”","description":"","frontmatter":{"title":"12 你不知道的 Reduce：函数式语言的“万金油”","date":"2025-02-22T00:00:00.000Z","categories":["JavaScript 函数式编程实践指南"],"head":[["link",{"rel":"canonical","href":"https://www.doit.ip-ddns.com/pages/repository/编程/JavaScript 函数式编程实践指南/12 你不知道的 Reduce：函数式语言的“万金油”"}]]},"headers":[],"relativePath":"pages/repository/编程/JavaScript 函数式编程实践指南/12 你不知道的 Reduce：函数式语言的“万金油”.md","filePath":"pages/repository/编程/JavaScript 函数式编程实践指南/12 你不知道的 Reduce：函数式语言的“万金油”.md","lastUpdated":1740213738000}');const p=s({name:"pages/repository/编程/JavaScript 函数式编程实践指南/12 你不知道的 Reduce：函数式语言的“万金油”.md"},[["render",function(s,e,p,l,h,t){return n(),i("div",null,e[0]||(e[0]=[a('<h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><blockquote><p><code>reduce()</code><strong>是函数式语言的万金油；函数式语言不能失去</strong> <code>reduce()</code><strong>，就像西方不能失去耶路撒冷。</strong> ——修·格拉底·鲁迅·言思妥耶夫斯基</p></blockquote><p>有一类高阶函数，我们几乎天天都在用，但却不曾真正了解过它们。</p><p>没错，我说的就是数组方法，包括但不限于 <code>map()</code>、<code>reduce()</code>、<code>filter()</code> 等等等等.....</p><p>其中，最特别的一个是 <code>reduce()</code>。</p><p>几乎任何在范式上支持了函数式编程的语言，都原生支持了 <code>reduce()</code>。</p><p>这些语言包括但不限于Python、Scala、Clojure、Perl......（Haskell 语言其实也是支持 reduce 的，只是 Haskell 里的 reduce 改名叫 fold 了）。</p><p><strong>在 JS 中，基于 reduce()，我们不仅能够推导出其它数组方法，更能够推导出经典的函数组合过程。</strong></p><h2 id="前置知识-reduce-工作流分析" tabindex="-1">前置知识：Reduce 工作流分析 <a class="header-anchor" href="#前置知识-reduce-工作流分析" aria-label="Permalink to &quot;前置知识：Reduce 工作流分析&quot;">​</a></h2><p>接下来我们先通过一个小🌰快速分析一波 reduce 的工作流特征。</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> arr</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 0 + 1 + 2 + 3 </span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> initialValue</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> add</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">previousValue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">currentValue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> previousValue </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> currentValue</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> sumArr</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> arr.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">reduce</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  add,</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  initialValue</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(sumArr)</span></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// expected output: 6</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>众所周知，<code>reduce()</code>是一个高阶函数，它的第一个入参是回调函数，第二个入参是初始值。</p><p><code>Array.prototype.reduce()</code>调用发生后，它会逐步将数组中的每个元素作为回调函数的入参传入，并且将每一步的计算结果汇总到最终的单个返回值里去。</p><p>以楼上的 case 为例，它的工作流是这样的：</p><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  执行回调函数 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">`add()`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">，入参为</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">`(initialValue, arr[0])`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">。这一步的计算结果为记为 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">`sum0`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">，</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">`sum0=intialValue + arr[0]`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">，此时剩余待遍历的数组内容为</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">`[2, 3]`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">，待遍历元素2个。</span></span>\n<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  执行回调函数 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">`add()`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">，入参为 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">`(sum0, arr[1])`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">。这一步的计算结果记为 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">`sum1`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">，</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">`sum1 = sum0 + arr[1]`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">，此时剩余待遍历的数组内容为 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">`[3]`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ，待遍历元素1个。</span></span>\n<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  执行回调函数 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">`add()`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">，入参为</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">`  (sum1, arr[2])`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">，这一步的计算结果记为 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">`sum2`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">，</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">`sum2 = sum1 + arr[2]`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">，此时数组中剩余待遍历的元素是 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">`[]`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">，遍历结束。</span></span>\n<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  输出 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">`sum2`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 作为 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">`reduce()`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 的执行结果， sum2 是一个单一的值。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>这个过程本质上是一个循环调用<code>add()</code>函数的过程，上一次 <code>add()</code>函数调用的输出，会成为下一次 <code>add()</code>函数调用的输入（如下图所示）。</p><p><a class="img-fancybox" href="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4bdec6d68aa84d8c808fe99c4c18198e~tplv-k3u1fbpfcp-zoom-1.image" data-fancybox="gallery" data-caption=""><img class="post-img" src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4bdec6d68aa84d8c808fe99c4c18198e~tplv-k3u1fbpfcp-zoom-1.image" alt="" loading="lazy"><span class="post-img-tip"></span></a></p><p>这个调用链看上去好像有点东西，但暂时又看不出太多。为了能够挖掘出更多东西，咱们先去看看 <code>map()</code>。</p><h2 id="小试牛刀-用-reduce-推导-map" tabindex="-1">小试牛刀：用 <code>reduce()</code> 推导 <code>map()</code> <a class="header-anchor" href="#小试牛刀-用-reduce-推导-map" aria-label="Permalink to &quot;小试牛刀：用 `reduce()` 推导 `map()`&quot;">​</a></h2><h3 id="map-工作流分析" tabindex="-1">Map 工作流分析 <a class="header-anchor" href="#map-工作流分析" aria-label="Permalink to &quot;Map 工作流分析&quot;">​</a></h3><p>没错，用 <code>reduce()</code>是可以推导 <code>map()</code>的。至于怎么推，我们先分析了 <code>map()</code> 的工作流再说。</p><p>众所周知， <code>map()</code> 长这样，它看上去和 <code>reduce()</code>没有一毛钱关系：</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> arr</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]  </span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> add1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">num</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> num</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// newArr: [2, 3, 4]</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> newArr</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> arr.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(add1)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>对比 <code>newArr</code> 和 <code>arr</code>，我们可以看到它们之间的不等关系：</p><p><a class="img-fancybox" href="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/397d2d72192747ebacca4a1fa201e626~tplv-k3u1fbpfcp-zoom-1.image" data-fancybox="gallery" data-caption=""><img class="post-img" src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/397d2d72192747ebacca4a1fa201e626~tplv-k3u1fbpfcp-zoom-1.image" alt="" loading="lazy"><span class="post-img-tip"></span></a></p><p>这说明 <code>newArr</code> 是一个新创建出来的数组——<code>map()</code> 方法不会改变原有的 <code>arr</code> 数组，而是会把结果放在一个新创建出来的数组里返回，这符合我们对不可变数据的预期。</p><p>（不可变数据是函数式编程里最基本的原则之一，我们前面强调过太多次了，这里不再反复吹它。）</p><p>我们重点要看的是 map 函数都做了啥：</p><blockquote><p><strong>map()</strong> 方法创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成。 —— MDN</p></blockquote><p>就这个例子来说，<code>map()</code> 遍历了 <code>arr</code> 数组中的每一个元素，给每一个元素执行一遍 <code>add1()</code> 这个 callback 后，把执行结果放在一个新的数组里返回。</p><p>我把这个过程用代码表达出来，看上去会更清晰：</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> map</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">arr</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">callback</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> len</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> arr.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">length</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 创建一个新数组用来承接计算结果</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> newArr</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> []</span></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 遍历原有数组中的每一个元素</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> i</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; i</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">len; i</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">++</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {  </span></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 逐个对每个元素做 callback 计算，</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    newArr.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">push</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">callback</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(arr[i]))</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> newArr</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>大家可以试着在控制台用这个手工 map 跑一遍楼上的 <code>add1()</code> 回调：</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">], (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">num</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> num</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>输出结果为<code>[2, 3, 4]</code>，这和原生 <code>map()</code>是一毛一样的。</p><p>PS：这里倒不需要大家去细抠 <code>Array.prototype.map() </code>的源码，因为：</p><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  `Array.prototype.map()`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 的源码实现跟楼上的人工 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">`map()`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">不一样，我抠过了</span></span>\n<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  我们的目的是理解 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">`map()`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 做了哪些事情，理解它的工作流，而不是了解它每一行的代码实现细节</span></span>\n<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  对</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">`map()`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 工作流的分析仅仅是我们进一步认识 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">`reduce()`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">的一个小道具，接下来我们需要迅速带着对 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">` map()  `</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">的理解去看 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">`reduce()`</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="map-其实是-mapreduce" tabindex="-1">Map 其实是 MapReduce <a class="header-anchor" href="#map-其实是-mapreduce" aria-label="Permalink to &quot;Map 其实是 MapReduce&quot;">​</a></h3><p>在 <code>add1()</code> 这个 case 里，整个<code>map()</code> 的计算过程共有以下要素参加：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1.  `arr` 数组里的所有数字。</span></span>\n<span class="line"><span>1.  `newArr`，它最初是一个空数组 `[]`，在循环体中被反复 `push()`。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>我们把每次循环列出来看：</p><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  初始化状态，</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">`newArr = []`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">，剩余待遍历的数组内容为</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">`  [1,2,3] `</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">，待遍历元素3个。</span></span>\n<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  计算 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">`callback(arr[0])`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">，把计算结果推入 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">`newArr`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">。此时 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">`newArr = [2]`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">，剩余待遍历的数组内容为</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">`  [2, 3] `</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">，待遍历元素2个。</span></span>\n<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  计算 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">`callback(arr[1])`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">，把计算结果推入 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">`newArr`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">。此时 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">`newArr= [2, 3]`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">，剩余待遍历的数组内容为 [</span><span style="--shiki-light:#032F62;--shiki-light-text-decoration:underline;--shiki-dark:#DBEDFF;--shiki-dark-text-decoration:underline;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] ，待遍历元素1个。</span></span>\n<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  计算 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">`callback[arr[2]]`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">，把计算结果推入 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">`newArr`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">，此时 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">`newArr= [2, 3, 4]`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">，剩余待遍历的数组内容为 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">`[]`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">，待遍历元素0个。</span></span>\n<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  输出 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">`newArr`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 作为 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">`map()`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 的执行结果， </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">`newArr`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 是一个单一的值（一个单一的数组）。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>大家细品一下这个过程，你是不是开始隐约觉得它和楼上的 <code>reduce()</code>好像有点神似——它们都吃进【多个】入参、吐出【一个】出参。</p><p>（注意这个入参和出参之间的数量关系，这个很重要，在下文会有更进一步的分析）。</p><p>不同点仅仅在于出参的类型：reduce 编码示例中的出参是一个数字 <code>6</code>，而 map 编码示例中的出参是一个数组<code>[2, 3, 4]</code>。</p><p>但出参类型的不同，其实是由 callback 的不同导致的，而不是由流程上的差异导致的。</p><p><strong>有没有可能，我微调一下</strong> <code>reduce()</code><strong>的 callback，它的输出就和</strong> <code>map()</code><strong>一致了呢？</strong></p><h3 id="用-reduce-推导-map" tabindex="-1">用 <code>reduce()</code> 推导 <code>map()</code> <a class="header-anchor" href="#用-reduce-推导-map" aria-label="Permalink to &quot;用 `reduce()` 推导 `map()`&quot;">​</a></h3><p>具体来说，我们可以把 <code>map()</code> 编码示例中的 <code>add1()</code>回调逻辑和 <code>newArr.push()</code> 这个动作看做是同一坨逻辑，给它起名叫 <code>add1AndPush()</code>。</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> add1AndPush</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">previousValue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">currentValue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // previousValue 是一个数组</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  previousValue.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">push</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(currentValue </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> previousValue</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>然后我用 <code>reduce()</code> 去调用这个 <code>add1AndPush()</code>：</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> arr</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> newArray</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> arr.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">reduce</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(add1AndPush, [])</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>你会发现，这段代码的工作内容和楼上我们刚分析过的 <code>map()</code> 是等价的。</p><p>把这段代码丢到控制台里运行一下，它的输出结果和楼上的 <code>map()</code> 也是等价的：</p><p><a class="img-fancybox" href="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/46c25899056444d49b04eec7818a252d~tplv-k3u1fbpfcp-zoom-1.image" data-fancybox="gallery" data-caption=""><img class="post-img" src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/46c25899056444d49b04eec7818a252d~tplv-k3u1fbpfcp-zoom-1.image" alt="" loading="lazy"><span class="post-img-tip"></span></a></p><p>看来我只要微调一下 <code>reduce()</code> 的 callback，它就能干<code> map()</code> 的活了！</p><p>大家可以试着在脑海中绘制一下，<code>reduce(add1AndPush, [])</code>这个过程对应的函数调用链，它长这样：</p><p><a class="img-fancybox" href="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4a5e308c75794c02941dfacebd0325cf~tplv-k3u1fbpfcp-zoom-1.image" data-fancybox="gallery" data-caption=""><img class="post-img" src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4a5e308c75794c02941dfacebd0325cf~tplv-k3u1fbpfcp-zoom-1.image" alt="" loading="lazy"><span class="post-img-tip"></span></a>如图，我们的 <code>map()</code>函数背后，是一个多么标准的<code>reduce()</code>工作流啊！</p><h3 id="map-和-reduce-之间的逻辑关系" tabindex="-1">Map 和 Reduce 之间的逻辑关系 <a class="header-anchor" href="#map-和-reduce-之间的逻辑关系" aria-label="Permalink to &quot;Map 和 Reduce 之间的逻辑关系&quot;">​</a></h3><p>破案了，<code>map()</code> 的过程本质上也是一个 <code>reduce()</code>的过程！</p><p>区别仅仅在于， <code>reduce()</code> 本体的回调函数入参可以是任何值，出参也可以是任何值；而 map 则是一个相对特殊的 <code>reduce() </code>,它锁定了一个数组作为每次回调的第一个入参，并且限定了 <code>reduce()</code> 的返回结果只能是数组。</p><p><code>map()</code> 和<code>reduce()</code>，这两个工具函数的应用非常广泛，不仅仅在 JS 中有内置的实现，在许多函数式编程语言中，你都可以看到它们的身影。</p><p>在这些语言底层的源码中， 是否真的是直接借助 <code>reduce()</code> 调用来实现 <code>map()</code>，这个不好说，咱也不必太关注。</p><p>我们真正需要关注的，<strong>是</strong> <code> map()</code><strong>和</strong> <code> reduce()</code><strong>之间的逻辑关系</strong>。</p><p>通过楼上一系列的工作流拆解+逻辑分析，我们至少可以确定，<code>map()</code> 过程可以看作是 <code>reduce()</code> 过程的一种特殊的应用。</p><p>也就是说，在数组方法里，<code>reduce()</code> 处在逻辑链相对底层的位置，这一点毋庸置疑。</p><p>理解到这一层，大家也就能初步认识到 <code>reduce()</code> 函数的重要性了。</p><p>“初步认识”绝对是不够的，<code>reduce()</code> 方法真正的威力，远远不止于此。</p><p><code> reduce()</code><strong>真正的威力，在于它对函数组合思想的映射。</strong></p><hr><h2 id="更进一步-reduce-映射了函数组合思想" tabindex="-1">更进一步： <code>reduce()</code> 映射了函数组合思想 <a class="header-anchor" href="#更进一步-reduce-映射了函数组合思想" aria-label="Permalink to &quot;更进一步： `reduce()` 映射了函数组合思想&quot;">​</a></h2><p>现在请大家重新审视一下 <code>reduce()</code> 的工作流：</p><p><a class="img-fancybox" href="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fd3b69f006824035ac674303fe2c0feb~tplv-k3u1fbpfcp-zoom-1.image" data-fancybox="gallery" data-caption=""><img class="post-img" src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fd3b69f006824035ac674303fe2c0feb~tplv-k3u1fbpfcp-zoom-1.image" alt="" loading="lazy"><span class="post-img-tip"></span></a></p><p>通过观察这个工作流，我们可以发现这样两个特征：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>-   `reduce()` 的回调函数在做参数组合</span></span>\n<span class="line"><span>-   `reduce()` 过程构建了一个函数 pipeline</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="reduce-的回调函数在做参数组合" tabindex="-1"><code>reduce()</code> 的回调函数在做参数组合 <a class="header-anchor" href="#reduce-的回调函数在做参数组合" aria-label="Permalink to &quot;`reduce()` 的回调函数在做参数组合&quot;">​</a></h3><p>首先，就 reduce() 过程中的单个步骤来说，每一次回调执行，都会吃进 2 个参数，吐出 1 个结果。</p><p>我们可以把每一次的调用看做是把 2 个入参被【<strong>组合</strong>】进了 callback 函数里，最后转化出 1 个出参的过程。</p><p>我们把数组中的 n 个元素看做 n 个参数，那么 <code>reduce()</code> 的过程，就是一个把 n 个参数逐步【<strong>组合</strong>】到一起，最终吐出 1 个结果的过程。</p><p>上文讨论过的 <code>reduce(add)</code> 和 <code>reduce(add1AndPush)</code> 均能够体现这个特征：</p><p><a class="img-fancybox" href="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ccc3554f1f1245c5bdaa8d3647411b90~tplv-k3u1fbpfcp-zoom-1.image" data-fancybox="gallery" data-caption=""><img class="post-img" src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ccc3554f1f1245c5bdaa8d3647411b90~tplv-k3u1fbpfcp-zoom-1.image" alt="" loading="lazy"><span class="post-img-tip"></span></a></p><p>reduce，动词，意为减少。这个【减少】可以理解为是参数个数的减少。</p><p>如上图所示，reduce 方法把多个入参，reduce（减少）为一个出参 。</p><h3 id="reduce-过程是一个函数-pipeline" tabindex="-1"><code>reduce()</code> 过程是一个函数 pipeline <a class="header-anchor" href="#reduce-过程是一个函数-pipeline" aria-label="Permalink to &quot;`reduce()` 过程是一个函数 pipeline&quot;">​</a></h3><p><code>reduce()</code> 函数发起的工作流，可以看作是一个函数 pipeline。</p><p>尽管每次调用的都是同一个函数，但上一个函数的输出，总是会成为下一个函数的输入。</p><p>同时，<code>reduce()</code> pipeline 里的每一个任务都是一样的，仅仅是入参不同，这极大地约束了 pipeline 的能力。 如下图，整个 <code>reduce(add)</code> pipeline 中只有 <code>add()</code> 这一种行为。</p><p><a class="img-fancybox" href="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7974874fe6f54566a6f42b29051d3801~tplv-k3u1fbpfcp-zoom-1.image" data-fancybox="gallery" data-caption=""><img class="post-img" src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7974874fe6f54566a6f42b29051d3801~tplv-k3u1fbpfcp-zoom-1.image" alt="" loading="lazy"><span class="post-img-tip"></span></a></p><p>这就好像你开了一家水果加工厂，厂里拉出来了一条流水线，这流水线里的每一道工序都是一样的，就只会做“水果切块”，不会整别的了。</p><p>难道哪天我想做果汁了，我还得拉个新的流水线出来，专门做水果榨汁吗？</p><p>这、这是不是有点浪费？</p><p>我们把 <code>reduce()</code> 的这两个特征放在一起来看：<strong>参数组合+函数pipeline</strong>。</p><p>咱就是说，有没有可能，有没有可能咱们把 pipeline 里的每一个函数也弄成不一样的呢？</p><p>更直白地说，你<code>reduce()</code>既然都能组合参数了，你能不能帮我的 pipeline 组合一下函数呢？</p><p>毕竟，<strong>JS 的函数是可以作为参数传递</strong>的嘛！</p><p>答案是肯定的——可能，可太能了！</p><p><code>reduce()</code> 之所以能够作为函数式编程的“万金油”存在，本质上就是因为它映射了函数组合的思想。</p><p>而函数组合，恰恰是函数式编程中最特别、最关键的实践方法，是核心中的核心，堪称“核中核”。</p><p>那么函数组合到底是什么？它在实践中的形态是什么样的？我们又该如何借助<code>reduce()</code>来实现函数组合呢？</p><p>在展开讨论这些问题之前，咱首先得去到下一节，整明白“声明式的数据流”是啥。</p><p>（阅读过程中有任何想法或疑问，或者单纯希望和笔者交个朋友啥的，欢迎大家添加我的微信xyalinode与我交流哈~）</p>',101)]))}]]);export{e as __pageData,p as default};
