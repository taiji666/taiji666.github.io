import{_ as s,c as i,G as a,b as n}from"./chunks/framework.D5KJDRhN.js";const p=JSON.parse('{"title":"13 理解声明式数据流：从链式调用到“回调地狱”","description":"","frontmatter":{"title":"13 理解声明式数据流：从链式调用到“回调地狱”","date":"2025-02-22T00:00:00.000Z","categories":["JavaScript 函数式编程实践指南"],"head":[["link",{"rel":"canonical","href":"https://www.doit.ip-ddns.com/pages/repository/编程/JavaScript 函数式编程实践指南/13 理解声明式数据流：从链式调用到“回调地狱”"}]]},"headers":[],"relativePath":"pages/repository/编程/JavaScript 函数式编程实践指南/13 理解声明式数据流：从链式调用到“回调地狱”.md","filePath":"pages/repository/编程/JavaScript 函数式编程实践指南/13 理解声明式数据流：从链式调用到“回调地狱”.md","lastUpdated":1739887664000}');const l=s({name:"pages/repository/编程/JavaScript 函数式编程实践指南/13 理解声明式数据流：从链式调用到“回调地狱”.md"},[["render",function(s,p,l,e,t,h){return n(),i("div",null,p[0]||(p[0]=[a('<p>书接上回，我们仍然用数组方法作为我们切入本节的引子。</p><p>考虑这样一个数字数组 <code>arr</code>：</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> arr</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">6</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">7</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">8</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>现在我想以 <code>arr</code> 数组作为数据源，按照如下的步骤指引做一个求和操作：</p><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  筛选出 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">`arr`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 里大于 2 的数字</span></span>\n<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  将步骤1中筛选出的这些数字逐个乘以 2</span></span>\n<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  对步骤 2 中的偶数数组做一次求和</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>当然啦，1、2都只是过程，我想要的只有步骤3的求和结果而已。</p><p>从一个朴素的视角出发，我可以实现如下的计算过程：</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 用于筛选大于2的数组元素</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> biggerThan2</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> num</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> num </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 用于做乘以2计算</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> multi2</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> num</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> num </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 用于求和</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> add</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">b</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> a </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> b   </span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 完成步骤 1</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> filteredArr</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> arr.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">filter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(biggerThan2)    </span></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 完成步骤 2</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> multipledArr</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> filteredArr.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(multi2)    </span></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 完成步骤 3</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> sum</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> multipledArr.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">reduce</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(add, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>大家可以试着把这坨代码丢进控制台，每个步骤的计算结果输出如下：</p><p><a class="img-fancybox" href="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ebf3958cb834a42a60cc4c1a95945f7~tplv-k3u1fbpfcp-zoom-1.image" data-fancybox="gallery" data-caption=""><img class="post-img" src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ebf3958cb834a42a60cc4c1a95945f7~tplv-k3u1fbpfcp-zoom-1.image" alt="" loading="lazy"><span class="post-img-tip"></span></a></p><p>输出结果符合预期，说明这坨代码是能用的。</p><h2 id="🌰code-review-思考-简洁否-安全否" tabindex="-1">🌰code review 思考：简洁否？安全否？ <a class="header-anchor" href="#🌰code-review-思考-简洁否-安全否" aria-label="Permalink to &quot;🌰code review 思考：简洁否？安全否？&quot;">​</a></h2><p>然而，作为一个好的程序员，“能用”只是最基本的代码标准。在此基础上，我们还需要兼顾代码的质量。</p><p>代码质量衡量是一个相对宏大的命题。这里我们的例子比较简单，不需要整太多花活，只需要考虑最基础的两个要素——<strong>简洁否？安全否？</strong> 。</p><p>本着简洁和安全的原则，我们来对楼上的🌰进行一次 code review。</p><p>首先，代码是否简洁？</p><p><strong>答案是【否】。</strong></p><p><strong>我们的目标输出只有</strong> <code>sum</code> <strong>这一个求和结果，计算过程中额外定义的</strong> <code>filteredArr</code> <strong>、</strong> <code>multipledArr</code> <strong>完全属于混淆视听的冗余常量，它们拉垮了代码的可读性。</strong></p><p>一旦我走出了当前的代码块，我将不会在任何地方再用到<code>filteredArr</code>和<code>multipledArr</code>——它们唯一的作用，就是作为入参，辅助 <code>sum</code> 的求和。</p><p>像这样的值，我们可以记为“计算中间态”。</p><p>其次，代码是否安全？</p><p><strong>答案是【否】。</strong></p><p><code>filteredArr</code> <strong>和</strong> <code>multipledArr</code> <strong>作为引用类型，完全有可能在运行过程中被修改。</strong></p><p>试想一下，楼下的这三行代码，它们是严格绑定的吗？</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> filteredArr</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> arr.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">filter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(biggerThan2)    </span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> multipledArr</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> filteredArr.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(multi2)    </span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> sum</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> multipledArr.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">reduce</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(add, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>显然不是，只要我想，我可以往它们中间插入任何噪音代码，像这样：</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> filteredArr</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> arr.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">filter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(biggerThan2)         </span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 噪音代码1号</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> changeArray</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  ...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">..  </span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  filteredArr.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">push</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">changeArray</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> multipledArr</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> filteredArr.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(multi2)     </span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 噪音代码2号</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> changeArrayAgain</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  ...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">..  </span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  multipledArr.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">push</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">101</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}    </span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">changeArrayAgain</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> sum</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> multipledArr.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">reduce</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(add, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>如上面代码所示：我不费吹灰之力就可以在 sum 计算还没有完成的情况下，打断整个计算流程，并且篡改 filteredArr 和 multipledArr 这两个关键的<strong>计算中间态</strong>。</p><p>你可能会觉得，这样的篡改看上去显得有些暴力且无脑。如果这个模块只有你自己在开发，你一定会想办法避免破坏这3行代码执行的连续性。</p><p>但是当你<strong>写了10000行代码再往回看</strong>这3行代码的时候......你真的还会记得自己立下的那个“禁止打断、绝不篡改”的 flag 吗？</p><p>以及，当你带的实习生<strong>协助你迭代</strong>这个模块时，他会知道这背后还会有一个“禁止打断、绝不篡改”的 flag 需要守护吗？</p><p>与其寄希望于 flag，不如一开始就<strong>不要把计算中间态暴露出去</strong>。</p><h2 id="解法启蒙-蛋糕🍰工厂流水线是如何组合多道工序的" tabindex="-1">解法启蒙：蛋糕🍰工厂流水线是如何组合多道工序的？ <a class="header-anchor" href="#解法启蒙-蛋糕🍰工厂流水线是如何组合多道工序的" aria-label="Permalink to &quot;解法启蒙：蛋糕🍰工厂流水线是如何组合多道工序的？&quot;">​</a></h2><p>如何改善这段代码呢？</p><p>想象我们在一家蛋糕🍰工厂工作。</p><p>制作一个蛋糕，需要很多工序，比如：</p><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  工序①：混合原材料，制作</span><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;">**蛋糕液**</span></span>\n<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  工序②：烘焙蛋糕液，制作</span><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;">**蛋糕坯**</span></span>\n<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  工序③：往蛋糕胚上</span><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;">**撒糖霜**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">，增加基本的风味</span></span>\n<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  工序④：往蛋糕坯上</span><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;">**放巧克力/草莓/芒果**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">等等，增加进阶的风味</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>截止目前，工人们是这样协作的：</p><p>工序①的工人们完成了工作之后，就把装有蛋糕液的桶放在地上，等候工序②的工人过来取走它。</p><p>工序②的工人制作完蛋糕坯后，又把蛋糕坯放在地上，等候工序③的工人过来取走它。</p><p>工序③的工人撒完糖霜后，又把蛋糕坯放在地上，等候工序④的工人过来取走它......</p><p>很快，工厂老板就会发现这样两个问题：</p><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  放在地上的蛋糕液/蛋糕坯非常容易遭受污染，也容易被路过的工人一脚踢翻。</span></span>\n<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  无论是蛋糕液桶，还是蛋糕坯块，丢在地上总是需要占用空间的。在生产旺季，堆积如山的“蛋糕中间态”将使得本不宽敞的厂房雪上加霜。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>仔细想想，楼上给出的串行计算示例，是不是就恰似这条蛋糕流水线？</p><p>地板上堆积如山的“蛋糕中间态”，是不是就恰似那些冗余的“计算中间态”？</p><p>工厂老板会如何解决这个问题呢？</p><p>在工厂打过螺丝/看别人在工厂打过螺丝的同学会知道，不同工序之间的流水线是由<strong>传送带</strong>连接的。</p><p>完成一道工序后，传送带会主动把这一步交付的产物送到下一道工序里去。这样就可以确保所有的 <strong>“蛋糕中间态”只会穿梭于不同的工序之间，而不会暴露在流水线的外部</strong>。</p><p>在 JS 世界中，最像“传送带”的东西，无疑是<strong>链式调用</strong>。</p><h2 id="借助链式调用构建声明式数据流" tabindex="-1">借助链式调用构建声明式数据流 <a class="header-anchor" href="#借助链式调用构建声明式数据流" aria-label="Permalink to &quot;借助链式调用构建声明式数据流&quot;">​</a></h2><p>大家知道，像 map、reduce、filter 这些数组方法，它们彼此之间是可以进行链式调用的。</p><p>因此，我们完全可以把楼上的啰嗦代码改写为如下风格：</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> sum</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> arr.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">filter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(biggerThan2).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(multi2).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">reduce</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(add, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>链式调用的每一步，都会像传送带一样，把上一步的输出作为下一步的输入“传送”出去。</p><p>对比一下链式调用前后的两个函数工作流（左侧为链式调用前，右侧为链式调用后）：</p><p><a class="img-fancybox" href="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/22e1de59b45848e0982ba71d67c99de3~tplv-k3u1fbpfcp-zoom-1.image" data-fancybox="gallery" data-caption=""><img class="post-img" src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/22e1de59b45848e0982ba71d67c99de3~tplv-k3u1fbpfcp-zoom-1.image" alt="" loading="lazy"><span class="post-img-tip"></span></a></p><p>我们可以看到，借助链式调用，足以完美地规避掉那些尴尬的“中间态”，从而确保我们的代码简洁安全。</p><p>同时，链式调用也大大改善了代码的可读性：</p><p>过去，我有三行代码，我需要逐行阅读、理解计算中间态和主流程之间的逻辑关系，才能够推导出程序的意图。<strong>这样的代码，是命令式的。</strong></p><p>现在，我只需要观察一个函数调用链，这个调用链如同一条传送带一般，用函数名标注了每道工序的行为。即便不清楚数据到底是如何在“传送带”上流转的，我们也能够通过函数名去理解程序的意图。</p><p><strong>这样的代码，是声明式的。</strong> 基于此构建出的数据流，就是<strong>声明式的数据流</strong>。</p><p><strong>实现声明式的数据流，除了借助链式调用，还可以借助函数组合。</strong></p><h2 id="链式调用的前提" tabindex="-1">链式调用的前提 <a class="header-anchor" href="#链式调用的前提" aria-label="Permalink to &quot;链式调用的前提&quot;">​</a></h2><p>链式调用虽然牛，可它不是万金油。</p><p>map()、reduce()、filter() 这些方法之间，之所以能够进行链式调用，是因为：</p><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  它们都</span><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;">**挂载在 Array 原型的 Array.prototype**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 上</span></span>\n<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  它们在计算结束后都会 return 一个新的 Array</span></span>\n<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  既然 return 出来的也是 Array，那么自然可以继续访问原型 </span><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;">**Array.prototype**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 上的方法</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>也就是说，链式调用是有前提的。</p><p>链式调用的本质 <strong>，是通过在方法中返回对象实例本身的 this/ 与实例 this 相同类型的对象，达到多次调用其原型（链）上方法的目的。</strong></p><p>要对函数执行链式调用，<strong>前提是函数挂载在一个靠谱的宿主 Object 上。</strong></p><blockquote><p>tips: 在函数式编程中，范畴论设计模式的编码形态也是以链式调用呈现的，关于这点，我们从<a href="https://juejin.cn/book/7173591403639865377/section/7175422979646423098" target="_blank" rel="noreferrer">第17节</a>开始会有详细的讲解。</p></blockquote><p>那么对于那些没有挂载在对象上的函数（为了区分，下文称“独立函数”）来说，链式调用这条路显然走不通了，有没有其它的路子可以走呢？</p><h2 id="独立函数的组合姿势-组合-但是回调地狱版" tabindex="-1">独立函数的组合姿势：组合，但是回调地狱版 <a class="header-anchor" href="#独立函数的组合姿势-组合-但是回调地狱版" aria-label="Permalink to &quot;独立函数的组合姿势：组合，但是回调地狱版&quot;">​</a></h2><p>为了减少不必要的理解成本，这里我直接定义几个极简的独立函数，代码如下：</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> add4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">num</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> num </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 4</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}  </span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> multiply3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">num</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> num</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}  </span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> divide2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">num</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> num</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>问：如何基于这些独立函数，构建一个多个函数串行执行的工作流？</p><p>从朴素的视角出发，我们不难想到这样一个解法：</p><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">![</span><span style="--shiki-light:#032F62;--shiki-light-text-decoration:underline;--shiki-dark:#DBEDFF;--shiki-dark-text-decoration:underline;">47166E1B-D683-4105-9DF8-F4A8B2541E37.png</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">](</span><span style="--shiki-light:#24292E;--shiki-light-text-decoration:underline;--shiki-dark:#E1E4E8;--shiki-dark-text-decoration:underline;">https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/66a6311c378f4ef783df7ec74d847ec0~tplv-k3u1fbpfcp-watermark.image?</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)    </span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">多说无益，我直接贴出套娃代码：</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> sum</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  add4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">multiply3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">divide2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(num)))</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>套娃，顾名思义，就是把函数的执行结果套进下一个函数里作为入参，然后再把下一个函数的执行结果作为下下一个函数的执行结果作为入参......</p><p>也就是说<strong>反复去嵌套各种回调函数</strong>。</p><p>3个函数的套娃看上去似乎还没有那么可怕， 但数量稍微多一点，代码就变得有点面目全非了：</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> sum</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  square</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">minus10</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">computeWithBonus</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">add4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">muliply3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">divide2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(num))))))</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>问：有哪位家人可以一眼看出，这个套娃试图构建起来的是一个什么样的数据流？</p><p>讲真，即便我稍微改善一下这坨东西的排版，也无法掩盖它混乱不堪的事实：</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> sum</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> square</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  minus10</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    computeWithBonus</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      add4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        multiply3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">          divide2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            num</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          )</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        )</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      )</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    )</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  )</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>区区 6 个函数的套娃，已经让人望而生畏了。</p><p>数量再多一点会怎样，我都不敢想了！（突然提高音量[○･｀Д´･ ○]）</p><p>在这场套娃灾难里，并不是只有读代码的人在受苦，写代码的人也一样抓狂。</p><p>好奇心重的同学可以试着在自己的编辑器里重现一遍套娃的过程：</p><p>首先，我写下了 <code>divide2(num)</code>；接着，我要把它作为入参传递给 <code>multiply3()</code>，也就是说我要先在 <code>divide2(num) </code>前面写上 &quot;<code>multiply3(</code>&quot;，然后再跑到 <code>divide2(num)</code> 后面写上 &quot;<code>)</code>&quot; ......</p><p>有多少层嵌套，就需要重复多少次这个过程。</p><p>当嵌套层级很深的时候，光是确认哪个括号对应哪个函数，就需要花上半天时间。</p><p>这场要命的套娃灾难，实际上有一个更贴切的名字，叫做“<strong>回调地狱</strong>”。</p><p>（此处强烈建议对这个名字感到陌生的年轻同学去搜索一下“回调地狱”这个关键词，你会学到许多有趣的前端黑历史）。</p><p>总之，为什么前端开发在 <code>Promise</code> 问世那天饱含泪水？</p><p>因为他们对回调地狱恨得深沉。</p><h2 id="思考-如何摆脱回调地狱" tabindex="-1">思考：如何摆脱回调地狱？ <a class="header-anchor" href="#思考-如何摆脱回调地狱" aria-label="Permalink to &quot;思考：如何摆脱回调地狱？&quot;">​</a></h2><p>到这里，我们已经引出了函数组合的目标：组合多个独立函数，构造<strong>声明式的数据流</strong>。</p><p>过程中也拜访了隔壁 <code>OOP</code> 世界的成功人士：<strong>链式调用</strong>。</p><p>同时，我们也遇到了组合过程中的最大问题：套娃（AKA<strong>回调地狱</strong>）。</p><p>那么如何用魔法打败魔法，用函数式的姿势解决函数嵌套过深的问题呢？</p><p>这里先给大家一个小提示：关键字就是我们上节反复强调的 <strong>reduce</strong>。</p><p>我们将会在下一节讲解具体的解法。</p><p>（阅读过程中有任何想法或疑问，或者单纯希望和笔者交个朋友啥的，欢迎大家添加我的微信xyalinode与我交流哈~）</p>',104)]))}]]);export{p as __pageData,l as default};
