import{_ as s,c as i,G as a,b as n}from"./chunks/framework.D5KJDRhN.js";const p=JSON.parse('{"title":"27 函数式编程沉思录（上）：语言特性分析（JS、TS & Flow）","description":"","frontmatter":{"title":"27 函数式编程沉思录（上）：语言特性分析（JS、TS & Flow）","date":"2025-02-22T00:00:00.000Z","categories":["JavaScript 函数式编程实践指南"],"head":[["link",{"rel":"canonical","href":"https://www.doit.ip-ddns.com/pages/repository/编程/JavaScript 函数式编程实践指南/27 函数式编程沉思录（上）：语言特性分析（JS、TS & Flow）"}]]},"headers":[],"relativePath":"pages/repository/编程/JavaScript 函数式编程实践指南/27 函数式编程沉思录（上）：语言特性分析（JS、TS & Flow）.md","filePath":"pages/repository/编程/JavaScript 函数式编程实践指南/27 函数式编程沉思录（上）：语言特性分析（JS、TS & Flow）.md","lastUpdated":1739887664000}');const e=s({name:"pages/repository/编程/JavaScript 函数式编程实践指南/27 函数式编程沉思录（上）：语言特性分析（JS、TS & Flow）.md"},[["render",function(s,p,e,l,t,h){return n(),i("div",null,p[0]||(p[0]=[a('<p>在过去的 20 多节内容里，我们消化了函数式编程的核心思想、掌握了函数式编程的关键实践方法。学习至此，大家对于函数式编程本身已经建立了系统、全面、有深度的理解。在这个基础上，我想和大家探讨几个稍稍有些发散的话题：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>-   **语言（对于前端，指 JS、TS 和 Flow）和函数式编程之间的关系**</span></span>\n<span class="line"><span>-   **数学理论和函数式编程之间的关系**</span></span>\n<span class="line"><span>-   **前端工程实践和函数式编程之间的关系**</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>通过讨论这些话题，我们将能够<strong>站在一个更高的视角去看待函数式编程在前端技术、乃至在整个软件领域的定位</strong>，这将有利于我们日后的技术决策。</p><p>同时，作为小册的收尾章节，本节和后续2节最直接的效用其实是帮助大家把已经学过的知识串起来、在脑海中构建出一个更加生动的“知识地图”。因此，我会在探讨上述话题的过程中，引导大家去关注已知知识点之间的逻辑联系。通过接下来3节的学习，大家将能够<strong>站在一个更高的视角去看待整本小册</strong>，这将有利于你日后对知识的反刍和回顾。</p><h2 id="函数式的-javascript" tabindex="-1">函数式的 JavaScript <a class="header-anchor" href="#函数式的-javascript" aria-label="Permalink to &quot;函数式的 JavaScript&quot;">​</a></h2><p>在小册的开篇，我们就点出了“JavaScript是多范式的语言，函数式编程是它主要支持的范式之一”。</p><p>“<strong>如何在 JS 世界里实践函数式编程</strong>”是整本小册的主题，但是不知道大家有没有思考过这样一个问题：为什么 JS 语言能够支持函数式编程？</p><p>更具体地来说，<strong>究竟是什么样的 JS 语言特性基础，支撑起了函数式编程这个上层建筑呢？</strong></p><p>个人认为，最关键的特性无外乎这两点：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1.  **函数是一等公民**</span></span>\n<span class="line"><span>1.  **闭包**</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="函数是一等公民" tabindex="-1">函数是一等公民 <a class="header-anchor" href="#函数是一等公民" aria-label="Permalink to &quot;函数是一等公民&quot;">​</a></h3><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>在 JavaScript 中，函数是一等公民，它们可以像普通变量一样被赋值、传递和返回。这使得我们可以将函数作为参数传递给另一个函数，或者从一个函数中返回一个新的函数。  </span></span>\n<span class="line"><span>“一等公民的函数”意味着函数在 JS 世界中具有最高的自由度，意味着函数是 JS 世界里技能树最满的家伙。这直接决定了函数可以在 JS 世界里横着走，可以帮我们做任何我们想要做的事情，这也使“以函数为基本单位构建应用程序”成为可能。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>任何语言如果想要实现对函数式编程范式的支持，就必须支持“函数是一等公民”这一特性。</p><blockquote><p>注：关于”函数是一等公民“的话题，我们在<a href="https://juejin.cn/book/7173591403639865377/section/7175420640583745595" target="_blank" rel="noreferrer">第5节</a>已经有过深入的探讨，此处仅作简述，不多赘述。</p></blockquote><h3 id="闭包" tabindex="-1">闭包 <a class="header-anchor" href="#闭包" aria-label="Permalink to &quot;闭包&quot;">​</a></h3><p>在 JavaScript 中，闭包（closure）是指<strong>一个函数能够访问并使用其声明时所在的词法作用域（lexical scope）中的变量</strong>——即使该函数在声明时所在的作用域已经执行完毕、并且该作用域已经被销毁了。</p><p>简单来说，<strong>如果一个函数定义在另一个函数的内部，并且在外部函数返回之后仍然可以访问外部函数的变量，那么这个函数就形成了一个闭包。</strong> 像下面这样：</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> outerFunction</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> outerValue</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;外部函数的变量&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> innerFunction</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(outerValue)</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> innerFunction</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> inner</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> outerFunction</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()  </span></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//// 输出：&quot;外部函数的变量&quot;</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">inner</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p><strong>闭包允许函数“记住”它们创建时的词法环境（lexical environment），即函数的外部变量。这是我们在 JS 函数式编程中实现高阶函数、柯里化、偏函数等技术的基本前提</strong>。</p><blockquote><p>注：这个”外部变量/外部函数的参数“，我们一般会称其为“<strong>自由变量</strong>”。</p></blockquote><p>确切地说，<strong>闭包支持了高阶函数的实现，而偏函数、柯里化等技术又是高阶函数的特例</strong>。因此我们这里可以结合一个高阶函数的例子来看闭包在函数式编程中的应用：</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> multiplyBy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">factor</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">num</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> num </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> factor</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> double</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> multiplyBy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> triple</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> multiplyBy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 输出 4</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">double</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 输出 6</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">triple</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>在这个例子中，<code>multiplyBy()</code> 函数是一个高阶函数，它接收一个参数 <code>factor</code>，并返回一个新的函数。这<strong>个新函数是一个闭包，它可以访问到外部函数</strong> <code>multiplyBy() </code><strong>的参数</strong> <code>factor</code>。</p><p>通过调用 <code>multiplyBy()</code> 函数并传入不同的参数，我们可以得到两个新函数 <code>double()</code> 和 <code>triple()</code>，这两个函数分别会将传入自身的参数乘以 2 和 3。这是因为 <code>double()</code>和<code>triple()</code>“记住”了自己的词法环境，记住了外部函数 <code>multipleBy()</code>作用域下的<code>factor</code>参数。而<strong>这”记忆“的能力，正是由闭包提供的</strong>。</p><p><strong>任何一门语言要想实现对函数式编程的支持，除了要做到对“函数是一等公民”特性的支持外，还需要确保闭包的实现。</strong></p><h2 id="ts-和-flow-对函数式的支持" tabindex="-1">TS 和 Flow 对函数式的支持 <a class="header-anchor" href="#ts-和-flow-对函数式的支持" aria-label="Permalink to &quot;TS 和 Flow 对函数式的支持&quot;">​</a></h2><p>TypeScript (TS) 和 Flow 都是 JavaScript (JS) 的超集，它们继承了 JS 的各种特性，因此也都支持使用函数式编程范式来编写代码。TS 是由微软开发和维护，而 Flow 是由 Facebook 开发和维护。它们都在 JS 基础上增加了<strong>类型系统</strong>。</p><p>尽管 TS 和 Flow 本质上还是 JS 的超集，并不能完全摆脱 JS 中存在的所有问题。但是，<strong>通过使用 TS 和 Flow，确实可以帮助我们在开发过程中更好地使用函数式编程</strong>。</p><h3 id="类型检查" tabindex="-1">类型检查 <a class="header-anchor" href="#类型检查" aria-label="Permalink to &quot;类型检查&quot;">​</a></h3><p><strong>在函数式编程中，函数的参数和返回值类型通常很重要，因此类型安全特别重要</strong>。下面的代码演示了 TS 和 Flow 如何通过类型检查来确保函数的入参类型匹配：</p><div class="language-ts vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// ts 示例代码</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">a</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">b</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">b</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> a </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> b</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  };</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> add2</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)  </span></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 输出 5</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">add2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><div class="language-flow vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">flow</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// @flow</span></span>\n<span class="line"><span>function add(a: number): (b: number) =&gt; number {</span></span>\n<span class="line"><span>  return function(b: number): number {</span></span>\n<span class="line"><span>    return a + b</span></span>\n<span class="line"><span>  };</span></span>\n<span class="line"><span>}</span></span>\n<span class="line"><span></span></span>\n<span class="line"><span>const add2 = add(2)</span></span>\n<span class="line"><span>// 输出 5</span></span>\n<span class="line"><span>console.log(add2(3))</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><blockquote><p>可以看出，对于 <code>add()</code>函数的实现来说，TS 和 Flow 的写法是一致的。这是因为 TypeScript 和 Flow 的语法风格和功能大致相似，在简单的代码示例中，两者的写法通常是相同的。<br> 对于这个示例来说，两者主要的区别在于：在 Flow 中，为了让 Flow 正确地识别文件并对其进行类型检查，需要在文件顶部添加 @flow 注释，这个是不可省略的。</p></blockquote><p>在这个例子中，我们定义了一个高阶函数 <code>add()</code>，它接受一个数字参数 <code>a</code>，返回一个新的结果函数；这个结果函数接受另一个数字参数 <code>b</code>，并返回 <code>a</code> + <code>b</code> 的结果。</p><p>通过调用 <code>add()</code> 函数并传入参数 2，我们得到了一个新函数 <code>add2()</code>，它可以对传入的参数做加 2 计算。<strong>无论是 <code>add()</code> 还是 <code>add2()</code>，它们预期的入参都是数字类型</strong>，无法消化其它类型的入参。</p><p>通过类型检查，TS 和 Flow 可以在编译时就识别出参数类型的错误。例如，如果我们在调用 <code>add2()</code> 函数时传入一个字符串参数，<strong>TS 和 Flow 会在编译时就抛出错误提示，而不是在运行时抛出异常</strong>（以下是 TS 的编译时报错信息）：</p><div class="language-ts vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 编译时错误：Argument of type &#39;string&#39; is not assignable to parameter of type &#39;number&#39;.</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">add2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;3&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="泛型和函数重载-以-fp-ts-的-compose-实现为例" tabindex="-1">泛型和函数重载：以 fp-ts 的 compose 实现为例 <a class="header-anchor" href="#泛型和函数重载-以-fp-ts-的-compose-实现为例" aria-label="Permalink to &quot;泛型和函数重载：以 fp-ts 的 compose 实现为例&quot;">​</a></h3><p>fp-ts 是一个基于 TypeScript 编写的函数式编程库，这里我们以 fp-ts 1.x 版本的 <code>compose</code>函数实现为例，来看看<strong>泛型和函数重载</strong>是如何改善函数式编程的实现过程的。</p><blockquote><p>注：对应的源代码链接在这里：<a href="https://github.com/gcanti/fp-ts/blob/1.x/src/function.ts" target="_blank" rel="noreferrer">https://github.com/gcanti/fp-ts/blob/1.x/src/function.ts</a></p></blockquote><p>源码略长，这里我先简单贴个图给大家感受下：</p><p><a class="img-fancybox" href="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/17feecb02392475d95ad396866cf2bcc~tplv-k3u1fbpfcp-zoom-1.image" data-fancybox="gallery" data-caption=""><img class="post-img" src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/17feecb02392475d95ad396866cf2bcc~tplv-k3u1fbpfcp-zoom-1.image" alt="" loading="lazy"><span class="post-img-tip"></span></a></p><p>我们需要关注的是 <code>compose</code> 函数的<strong>声明方式</strong>：</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> compose</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">A</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">B</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">C</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">bc</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">b</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> B</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> C</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ab</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">a</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> A</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> B</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">a</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> A</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> C</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> compose</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">A</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">B</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">C</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">D</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cd</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">c</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> C</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> D</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">bc</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">b</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> B</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> C</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ab</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">a</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> A</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> B</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">a</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> A</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> D</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">...</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>这样的声明首先用到了 TS 的<strong>函数重载</strong>特性。</p><h4 id="compose-中的函数重载" tabindex="-1">compose 中的函数重载 <a class="header-anchor" href="#compose-中的函数重载" aria-label="Permalink to &quot;compose 中的函数重载&quot;">​</a></h4><p>函数重载是指在同一个作用域内定义了多个同名函数，这些同名函数的参数类型或数量不同。当调用这个同名函数时，编译器会根据传入的参数类型或数量来决定应该调用哪个函数。</p><p>在我截取的这段代码中，定义了两个同名函数 <code>compose()</code>，它们的参数个数和类型不同——第一个函数接收两个参数：一个类型为 <code>(b: B) =&gt; C</code> 的函数 <code>bc</code> 和一个类型为 <code>(a: A) =&gt; B</code> 的函数 <code>ab</code>，返回值是一个类型为 <code>(a: A) =&gt; C</code> 的函数；第二个函数则接收三个参数，参数类型分别为 <code>(c: C) =&gt; D</code>、<code>(b: B) =&gt; C</code> 和 <code>(a: A) =&gt; B</code> ，返回值则是一个类型为 <code>(a: A) =&gt; D</code> 的函数。</p><p>调用 <code>compose()</code> 函数时，编译器会根据传入的参数类型和数量来选择正确的函数重载进行调用：对于两个函数的组合，编译器会自动选择第一个 <code>compose()</code>进行调用；对于三个函数的组合，则会选择第二个 <code>compose()</code>进行调用。作为开发者，我们不再需要关心 <code>compose</code>入参的数量和类型问题，编译器会帮我们完成相关的判断。</p><h4 id="compose-中的泛型" tabindex="-1">compose 中的泛型 <a class="header-anchor" href="#compose-中的泛型" aria-label="Permalink to &quot;compose 中的泛型&quot;">​</a></h4><p>除了函数重载之外，楼上截取的两个同名函数 <code>compose()</code>还都涉及了泛型的使用。</p><p>其中，<code>&lt;A, B, C&gt;</code> 和 <code>&lt;A, B, C, D&gt;</code> 分别表示了两个函数所使用的泛型类型。这里的 <code>A</code>、<code>B</code>、<code>C</code> 和 <code>D</code> 都是类型参数，可以用任何类型替换。</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>在第一个版本的 `compose()` 函数中，我们使用了三个类型参数`A`、`B`和 `C`，它们分别表示组合函数的输入类型、中间类型和输出类型。  </span></span>\n<span class="line"><span>我们可以看到，在 `compose()` 函数的实现中，参数 `ab` 的输入类型是 `A`、返回类型是 `B`，参数`  bc ` 的输入类型是 `B`、返回类型是`C`。因此它们可以正确地组合成一个输入类型为 `A`、返回类型为 `C` 的函数。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><blockquote><p>注：第二个版本的 <code>compose</code>与第一个版本的泛型使用方式的非常类似的，主要的区别在于新增了一个类型参数<code>D</code>，用以支持新增的函数参数，此处不多赘述。</p></blockquote><p>众所周知，泛型允许我们<strong>在定义函数时不指定具体类型，而是在调用函数时再根据传入的参数类型确定具体的类型。</strong> 所以上面这套 ABC 入参规则约束的不仅仅是类型本身，它还在约束一种【<strong>一致性</strong>】：不管你传入的 <code>B</code>是哪种类型，<code>ab</code>函数的输出都必须和<code>bc</code>函数的输入类型一致。而“前置函数的输出和后继函数的输 入必须一致”这一点，恰恰就是我们对<strong>函数组合链</strong>上每一个函数的预期。也就是说，<strong>对于函数组合链上不同函数之间的参数类型关系，用泛型来表达是再合适不过的</strong>。</p><p>和 TS 一样，Flow 也支持函数重载和泛型这两个特性。也就是说，上述分析过程和结论在 Flow 的语境下也是成立的。</p><p>综上所述，就函数式编程的实践而言，类似 TS 和 Flow 这样的强类型语言中有三个特性是格外值得我们关注的，那就是<strong>类型检查、函数重载和泛型</strong>。</p><p><strong>类型检查</strong>可以帮助我们在编写代码时就发现潜在的类型错误，使函数的运行时<strong>更加安全可靠</strong>；<strong>函数重载</strong>可以帮助我们处理不同参数数量和类型的函数实现，<strong>泛型</strong>则可以帮助我们间接地约束不同函数之间类型的<strong>一致性</strong>，函数重载和泛型都可以使我们的函数式代码<strong>更加灵活和通用</strong>。</p><p>需要注意的是，尽管 TS 和 Flow 支持函数式编程的特性比 JS 更加全面，但是它们仍然基于 JS，并没有完全消除 JS 的局限性（如可变状态和副作用等问题）。因此，<strong>在实践中，我们仍然需要遵循函数式编程的原则和最佳实践，以确保代码的可靠性和可维护性</strong>。</p><p>本节，我们以 JS、TS 和 Flow 等典型的前端语言为例，探讨了语言特性和函数式编程之间的关系。下一节，我们将结合具体的编码实践，进一步探讨数学理论与函数式编程之间的关系。</p><h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-label="Permalink to &quot;&quot;">​</a></h2>',61)]))}]]);export{p as __pageData,e as default};
