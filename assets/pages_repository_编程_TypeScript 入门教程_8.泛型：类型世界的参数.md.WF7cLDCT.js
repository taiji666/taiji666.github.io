import{_ as s,c as i,G as a,b as p}from"./chunks/framework.D5KJDRhN.js";const n=JSON.parse('{"title":"8.泛型：类型世界的参数","description":"","frontmatter":{"title":"8.泛型：类型世界的参数","date":"2025-02-22T00:00:00.000Z","categories":["TypeScript 入门教程"],"head":[["link",{"rel":"canonical","href":"https://www.doit.ip-ddns.com/pages/repository/编程/TypeScript 入门教程/8.泛型：类型世界的参数"}]]},"headers":[],"relativePath":"pages/repository/编程/TypeScript 入门教程/8.泛型：类型世界的参数.md","filePath":"pages/repository/编程/TypeScript 入门教程/8.泛型：类型世界的参数.md","lastUpdated":1739887664000}');const t=s({name:"pages/repository/编程/TypeScript 入门教程/8.泛型：类型世界的参数.md"},[["render",function(s,n,t,e,l,h){return p(),i("div",null,n[0]||(n[0]=[a('<p>在上一节，我们学习了类型别名、联合类型以及交叉类型，也将它们一一类比到了 JavaScript 中的变量、逻辑或与逻辑与，你是否渐渐感觉到了，其实 TypeScript 的本质，是在对类型进行编程？</p><p>恭喜，如果能想到这一层，那说明你已经抓住了这门编程语言的本质，即 TypeScript 在 JavaScript 对值进行编程的能力之上，又给予了你对类型进行编程的能力。为什么我们需要对类型进行编程？当然是因为，有时候类型世界也存在着和实际值一致的逻辑，就像我们已经学习的联合类型与交叉类型，就很好地证明了这一点。</p><p>在绝大部分编程语言中，函数都是一个非常重要的概念，如果缺少了函数，我们的代码可能会变得冗长晦涩，到处夹杂着重复的片段。而在函数中，最重要的概念则是参数，参数是一个函数向外界开放的唯一入口，随着入参的差异，函数可能也会表现出各不相同的行为。这一节我们要学习的概念「泛型」，其实本质就是类型世界中的参数。</p><p>上一节我们学习到了类型别名，提到了类型别名能够充当一个变量，存放一组存在关联的类型：</p><div class="language-typescript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Status</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;success&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;failure&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;pending&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>其实类型别名还能够充当函数的作用，但函数怎么能没有入参？我们可以这么来为类型别名添加一个入参，也就是泛型：</p><div class="language-typescript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Status</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">T</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;success&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;failure&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;pending&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> T</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> CompleteStatus</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Status</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;offline&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>这里的 CompleteStatus ，其实等价于：</p><div class="language-typescript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> CompleteStatus</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;success&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;failure&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;pending&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;offline&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>在这个例子中，Status 就像一个函数，它声明了自己有一个参数 T，即泛型，并会将这个参数 T 合并到自己内部的联合类型中。我们可以用一段伪代码来理解：</p><div class="language-typescript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Status</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">T</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">){</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;success&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;failure&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;pending&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">T</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> CompleteStatus</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Status</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;offline&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>很容易发现，这里的泛型就是参数作用，只不过它接受的是一个类型而不是值，同时，我们可以把联合类型类比为类型的集合。</p><p>是不是对「类型编程」这个概念又有了一些新的认知？唯一需要你稍微转换下思维的是，在 TypeScript 中，变量与函数都由类型别名来承担，而一个类型别名一旦声明了泛型，就会化身成为函数，此时严格来说我们应该称它为「工具类型」。</p><p>看起来好像类型别名才是主角，泛型的存在感还比较弱，它就是一个默默无闻的参数罢了？那是因为我们这里展示的是「主动赋值」的用法，用于帮助你快速建立起对「类型编程」这个概念的理解。而实际上，「自动推导」才是泛型的强大之处所在。</p><p>我们先回到 JavaScript 中的函数，想象我们有一个这样的函数，它的出参与入参类型是完全一致的，比如给我个字符串，我就返回字符串类型，如果是数字，就返回数字类型，此时你会怎么对这个函数进行精确地类型标注，联合类型吗？</p><div class="language-typescript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> factory</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">input</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // ...</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>首先，这么做会导致你丢失「出参与入参类型完全一致」这个信息，在你使用这个函数时，它只会提醒你返回值可能有字符串和函数，而不会根据你当前的入参给出唯一匹配的那个出参。其次，假设随着需求变更，可能的入参又多了一个布尔值类型，难不成你又要再加一次？一次两次还好，如果后面慢慢到十几个类型，你猜同事看见你的代码会是什么心情？</p><p>这个时候我们就要请出泛型了，我们前面是把一个类型主动赋值给泛型，而其实人家真正的作用可不仅于此，我们先给这个函数添加上泛型：</p><div class="language-typescript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> factory</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">T</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">input</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> T</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> T</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // ...</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>可以看到这里我们一共出现了三个 T，它们的作用分别是什么？</p><p>首先，类似于类型别名中，<code>&lt;T&gt;</code>是声明了一个泛型，而参数类型与返回值类型标注中的 T 就是普通的类型标注了。这里的整体意思其实是：这个函数有一个泛型 T，当你的函数获得一个入参时，会根据这个入参的类型自动来给 T 赋值，然后同时作为入参与返回值的实际类型！</p><p>你是否 Get 到了其中最重要的两点？“自动赋值”以及“同时作为入参与返回值的实际类型”，前者意味着我们无需再操心到底会有哪些可能的类型输入了，后者意味着我们只需要在两处使用同一个泛型参数，就实现了入参与返回值的类型绑定：</p><p><a class="img-fancybox" href="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7c4e44afda7c4772becd065ab73cbdb2~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=830&amp;h=102&amp;s=21331&amp;e=png&amp;b=24272e" data-fancybox="gallery" data-caption=""><img class="post-img" src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7c4e44afda7c4772becd065ab73cbdb2~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=830&amp;h=102&amp;s=21331&amp;e=png&amp;b=24272e" alt="" loading="lazy"><span class="post-img-tip"></span></a></p><p><a class="img-fancybox" href="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/24886611b87c4ce5bcfeb84937e79fa3~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=908&amp;h=118&amp;s=20683&amp;e=png&amp;b=22242a" data-fancybox="gallery" data-caption=""><img class="post-img" src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/24886611b87c4ce5bcfeb84937e79fa3~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=908&amp;h=118&amp;s=20683&amp;e=png&amp;b=22242a" alt="" loading="lazy"><span class="post-img-tip"></span></a></p><p>你可能会想，一个泛型参数不一定够用啊，万一我可能有多个参数都需要填充泛型，但只有其中的一个泛型参数会被作为返回值类型呢？没问题，我们来声明多个泛型看看：</p><div class="language-typescript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> factory</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">T1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">T2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">T3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">input</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> T1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">arg1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> T2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">arg2</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> T3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> T1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // ...</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>类似于上面的例子，在你给这些参数赋值时，泛型参数 T1 T2 T3 会被分别进行赋值，而只有泛型 T1 会被作为返回值的参数。</p><p>这个例子只是为了向你展示如何提供多个泛型参数，本质上它只需要一个泛型参数即可——为什么？我们定义泛型参数是为了在未来的某一刻消费它，比如函数内部的逻辑，比如返回值的类型，在这里只有 T1 参数得到了应用，而 T2 T3 虽然会被填充，但却没有用武之地。因此，切记不要为了使用泛型而使用泛型，确保只在你需要进行上面例子中那样参数与返回值类型的关联时，才使用泛型。</p><p>上一节的联合类型和交叉类型可能让你感到了一丝熟悉，但是这一节的泛型可能又让你开始有点迷糊了，毕竟光是“类型世界也有参数”就需要花上一些功夫来理解。而如果你成功绕过来了，那么恭喜你开始慢慢接近“类型编程”这个光听就很酷炫概念的本质了。在这一节里，我们学习了 TypeScript 中泛型在类型别名与函数中的使用示例，前者让类型别名摇身一变成为了类型世界的函数，而后者则神奇地让函数的参数类型能够自动从输入进行推导，并且和返回值类型能够实现关联，获得全面的类型保护。</p>',29)]))}]]);export{n as __pageData,t as default};
