import{_ as s,c as i,G as a,b as n}from"./chunks/framework.D5KJDRhN.js";const p=JSON.parse('{"title":"加餐愚昧之巅：你的Rust学习常见问题汇总","description":"","frontmatter":{"title":"加餐愚昧之巅：你的Rust学习常见问题汇总","date":"2025-02-22T00:00:00.000Z","categories":["陈天·Rust编程第一课"],"head":[["link",{"rel":"canonical","href":"https://www.doit.ip-ddns.com/pages/repository/编程/陈天·Rust编程第一课/加餐愚昧之巅：你的Rust学习常见问题汇总"}]]},"headers":[],"relativePath":"pages/repository/编程/陈天·Rust编程第一课/加餐愚昧之巅：你的Rust学习常见问题汇总.md","filePath":"pages/repository/编程/陈天·Rust编程第一课/加餐愚昧之巅：你的Rust学习常见问题汇总.md","lastUpdated":1740213738000}');const e=s({name:"pages/repository/编程/陈天·Rust编程第一课/加餐愚昧之巅：你的Rust学习常见问题汇总.md"},[["render",function(s,p,e,l,t,h){return n(),i("div",null,p[0]||(p[0]=[a('<div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>                            加餐 愚昧之巅：你的Rust学习常见问题汇总</span></span>\n<span class="line"><span>                            你好，我是陈天。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>到目前为止，我们已经学了很多 Rust 的知识，比如基本语法、内存管理、所有权、生命周期等，也展示了三个非常有代表性的示例项目，让你了解接近真实应用环境的 Rust 代码是什么样的。</p><p>虽然学了这么多东西，你是不是还是有种“一学就会，一写就废”的感觉？别着急，饭要一口一口吃，任何新知识的学习都不是一蹴而就的，我们让子弹先飞一会。你也可以鼓励一下自己，已经完成了这么多次打卡，继续坚持。</p><p>在今天这个加餐里我们就休个小假，调整一下学习节奏，来聊一聊 Rust 开发中的常见问题，希望可以解决你的一些困惑。</p><p>所有权问题</p><p>Q：如果我想创建双向链表，该怎么处理？</p><p>Rust 标准库有 LinkedList，它是一个双向链表的实现。但是当你需要使用链表的时候，可以先考虑一下，同样的需求是否可以用列表 Vec、循环缓冲区 VecDeque 来实现。因为，链表对缓存非常不友好，性能会差很多。</p><p>如果你只是好奇如何实现双向链表，那么可以用之前讲的 Rc/RefCell （[第9讲]）来实现。对于链表的 next 指针，你可以用 Rc；对于 prev 指针，可以用 Weak。</p><p>Weak 相当于一个弱化版本的 Rc，不参与到引用计数的计算中，而Weak 可以 upgrade 到 Rc 来使用。如果你用过其它语言的引用计数数据结构，你应该对 Weak 不陌生，它可以帮我们打破循环引用。感兴趣的同学可以自己试着实现一下，然后对照这个参考实现。</p><p>你也许好奇为什么 Rust 标准库的 LinkedList 不用 Rc/Weak，那是因为标准库直接用 NonNull 指针和 unsafe。</p><p>Q：编译器总告诉我：“use of moved value” 错误，该怎么破？</p><p>这是我们初学 Rust 时经常会遇到的错误，这个错误是说你在试图访问一个所有权已经移走的变量。</p><p>对于这样的错误，首先你要判断，这个变量真的需要被移动到另一个作用域下么？如果不需要，可不可以使用借用？（[第8讲]）如果的确需要移动给另一个作用域的话：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>如果需要多个所有者共享同一份数据，可以使用 Rc/Arc，辅以 Cell/RefCell/Mutex/RwLock。（[第9讲]）</span></span>\n<span class="line"><span>如果不需要多个所有者共享，那可以考虑实现 Clone 甚至 Copy。（[第7讲]）</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>生命周期问题</p><p>Q：为什么我的函数返回一个引用的时候，编译器总是跟我过不去？</p><p>函数返回引用时，除非是静态引用，那么这个引用一定和带有引用的某个输入参数有关。输入参数可能是 &amp;self、&amp;mut self 或者 &amp;T/&amp;mut T。我们要建立正确的输入和返回值之间的关系，这个关系和函数内部的实现无关，只和函数的签名有关。</p><p>比如 HashMap 的 get() 方法：</p><div class="language-html vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">pub fn get&lt;</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">Q:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ?Sized</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;(&amp;self, k: &amp;Q) -&gt; Option</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;V&gt;</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    where</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        K: Borrow&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">Q</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;,</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        Q: Hash + Eq</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>我们并不用实现它或者知道它如何实现，就可以确定返回值 Option&lt;&amp;V&gt; 到底跟谁有关系。因为这里只有两个选择：&amp;self 或者 k: &amp;Q。显然是 &amp;self，因为 HashMap 持有数据，而 k 只是用来在 HashMap 里查询的 key。</p><p>这里为什么不需要使用生命周期参数呢？因为我们之前讲的规则：当 &amp;self/&amp;mut self 出现时，返回值的生命周期和它关联。（[第10讲]）这是一个很棒的规则，因为大部分方法，如果返回引用，它基本上是引用 &amp;self 里的某个数据。</p><p>如果你能搞明白这一层关系，那么就比较容易处理，函数返回引用时出现的生命周期错误。</p><p>当你要返回在函数执行过程中，创建的或者得到的数据，和参数无关，那么无论它是一个有所有权的数据，还是一个引用，你只能返回带所有权的数据。对于引用，这就意味着调用 clone() 或者 to_owned() 来，从引用中得到所有权。</p><p>数据结构问题</p><p>Q：为什么 Rust 字符串这么混乱，有 String、&amp;String、&amp;str 这么多不同的表述？</p><p>我不得不说，这是一个很有误导性的问题，因为这个问题有点胡乱总结的倾向，很容易把人带到沟里。</p><p>首先，任何数据结构 T，都可以有指向它的引用 &amp;T，所以 String 跟 &amp;String的区别，以及 String 跟 &amp;str的区别，压根是两个问题。</p><p>更好的问题是：为什么有了 String，还要有 &amp;str？或者，更通用的问题：为什么 String、Vec 这样存放连续数据的容器，还要有切片的概念呢？</p><p>一旦问到点子上，答案不言自喻，因为切片是一个非常通用的数据结构。</p><p>用过 Python 的人都知道：</p><div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">s </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;hello world&quot;</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">let slice1 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> s[:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 可以对字符串切片</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">let slice2 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> slice1[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 可以对切片再切片</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(slice1, slice2) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 打印 hello, el</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>这和 Rust 的 String 切片何其相似：</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> s </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;hello world&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">to_string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> slice1 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">s[.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">.5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 可以对字符串切片</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> slice2 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">slice1[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1..3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 可以对切片再切片</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">println</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;{} {}&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, slice1, slice2); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 打印 hello el</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>所以 &amp;str 是 String 的切片，也可以是 &amp;str 的切片。它和 &amp;[T] 一样，没有什么特别的，就是一个带着长度的胖指针，指向了一片连续的内存区域。</p><p>你可以这么理解：切片之于 Vec/String 等数据，就好比数据库里的视图（view）之于表（table）。关于这个问题我们会在后面，讲Rust的数据结构时详细讲到。</p><p>Q：在课程的示例代码中，用了很多 unwrap()，这样可以么？</p><p>当我们需要从 Option 或者 Result 中获得数据时，可以使用 unwrap()，这是示例代码出现 unwrap() 的原因。</p><p>如果我们只是写一些学习性质的代码，那么 unwrap() 是可以接受的，但在生产环境中，除非你可以确保 unwrap() 不会引发 panic!()，否则应该使用模式匹配来处理数据，或者使用错误处理的 ? 操作符。我们后续会有专门一讲聊 Rust 的错误处理。</p><p>那什么情况下我们可以确定 unwrap() 不会 panic 呢？如果在做 unwrap() 之前，Option 或者 Result 中已经有合适的值（Some(T) 或者 Ok(T)），你就可以做 unwrap()。比如这样的代码：</p><div class="language-html vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// 假设 v 是一个 Vec&lt;</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">T</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">if v.is_empty() {</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    return None;</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 我们现在确定至少有一个数据，所以 unwrap 是安全的</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> first </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> v.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pop</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">unwrap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Q：为什么标准库的数据结构比如 Rc/Vec 用那么多 unsafe，但别人总是告诉我，unsafe 不好？</p><p>好问题。C 语言的开发者也认为 asm 不好，但 C 的很多库里也大量使用 asm。</p><p>标准库的责任是，在保证安全的情况下，即使牺牲一定的可读性，也要用最高效的手段来实现要实现的功能；同时，为标准库的用户提供一个优雅、高级的抽象，让他们可以在绝大多数场合下写出漂亮的代码，无需和丑陋打交道。</p><p>Rust中，unsafe 代码把程序的正确性和安全性交给了开发者来保证，而标准库的开发者花了大量的精力和测试来保证这种正确性和安全性。而我们自己撰写 unsafe 代码时，除非有经验丰富的开发者 review 代码，否则，有可能疏于对并发情况的考虑，写出了有问题的代码。</p><p>所以只要不是必须，建议不要写 unsafe 代码。毕竟大部分我们要处理的问题，都可以通过良好的设计、合适的数据结构和算法来实现。</p><p>Q：在 Rust 里，我如何声明全局变量呢？</p><p>在[第3讲]里，我们讲过 const 和 static，它们都可以用于声明全局变量。但注意，除非使用 unsafe，static 无法作为 mut 使用，因为这意味着它可能在多个线程下被修改，所以不安全：</p><p>static mut COUNTER: u64 = 0;</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn main() {</span></span>\n<span class="line"><span>    COUNTER += 1; // 编译不过，编译器告诉你需要使用 unsafe</span></span>\n<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>如果你的确想用可写的全局变量，可以用 Mutex，然而，初始化它很麻烦，这时，你可以用一个库 lazy_static。比如（代码）：</p><div class="language-cpp vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">use </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">lazy_static</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">::lazy_static;</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">use </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">std</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">collections</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">::HashMap;</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">use </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">std</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sync</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">::{Arc, Mutex};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language-cpp vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">lazy_static</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    static</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ref </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">HASHMAP</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: Arc</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Mutex</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">HashMap</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">u32, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;static str&gt;&gt;&gt; = {</span></span>\n<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        let mut m = HashMap::new();</span></span>\n<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        m.insert(0, &quot;foo&quot;);</span></span>\n<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        m.insert(1, &quot;bar&quot;);</span></span>\n<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        m.insert(2, &quot;baz&quot;);</span></span>\n<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        Arc::new(Mutex::new(m))</span></span>\n<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    };</span></span>\n<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn main() {</span></span>\n<span class="line"><span>    let mut map = HASHMAP.lock().unwrap();</span></span>\n<span class="line"><span>    map.insert(3, &quot;waz&quot;);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    println!(&quot;map: {:?}&quot;, map);</span></span>\n<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>调试工具</p><p>Q：Rust 下，一般如何调试应用程序？</p><p>我自己一般会用 tracing 来打日志，一些简单的示例代码会使用 println!/dbg! ，来查看数据结构在某个时刻的状态。而在平时的开发中，我几乎不会用调试器设置断点单步跟踪。</p><p>因为与其浪费时间在调试上，不如多花时间做设计。在实现的时候，添加足够清晰的日志，以及撰写合适的单元测试，来确保代码逻辑上的正确性。如果你发现自己总需要使用调试工具单步跟踪才能搞清楚程序的状态，说明代码没有设计好，过于复杂。</p><p>当我学习 Rust 时，会常用调试工具来查看内存信息，后续的课程中我们会看到，在分析有些数据结构时使用了这些工具。</p><p>Rust 下，我们可以用 rust-gdb 或 rust-lldb，它们提供了一些对 Rust 更友好的 pretty-print 功能，在安装 Rust 时，它们也会被安装。我个人习惯使用 gdb，但 rust-gdb 适合在 linux 下，在 OS X 下有些问题，所以我一般会切到 Ubuntu 虚拟机中使用 rust-gdb。</p><p>其它问题</p><p>Q：为什么 Rust 编译出来的二进制那么大？为什么 Rust 代码运行起来那么慢？</p><p>如果你是用 cargo build 编译出来的，那很正常，因为这是个 debug build，里面有大量的调试信息。你可以用 cargo build –release 来编译出优化过的版本，它会小很多。另外，还可以通过很多方法进一步优化二进制的大小，如果你对此感兴趣，可以参考这个文档。</p><p>Rust的很多库如果你不用 –release 来编译，它不会做任何优化，有时候甚至感觉比你的 Node.js 代码还慢。所以当你要把代码应用在生产环境，一定要使用 release build。</p><p>Q：这门课使用什么样的 Rust 版本？会随着 2021 edition 更新么？</p><p>会的。Rust 是一门不断在发展的语言，每六周就会有一个新的版本诞生，伴随着很多新的功能。比如 const generics（代码）：</p><p>#[derive(Debug)]</p><div class="language-html vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">struct Packet&lt;</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> N:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> usize</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; {</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    data: [u8; N],</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">fn </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">main</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ip </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Packet { data: [0u8; </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">20</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] };</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> udp </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Packet { data: [0u8; </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">8</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] };</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    println!(&quot;ip: {:?}, udp: {:?}&quot;, ip, udp);</span></span>\n<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>再比如最近刚发的 1.55 支持了 open range pattern（代码）：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn main() {</span></span>\n<span class="line"><span>    println!(&quot;{}&quot;, match_range(10001));</span></span>\n<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">fn </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">match_range</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(v: usize) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &amp;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;static str </span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">{</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    match v {</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        0.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">99</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;good&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        100.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">9999</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;unbelievable&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        10000.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">. </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;beyond expectation&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>\n<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">        _</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> unreachable</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(),</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>再过一个多月，Rust 就要发布 2021 edition 了。由于 Rust 良好的向后兼容能力，我建议保持使用最新的 Rust 版本。等 2021 edition 发布后，我会更新代码库到 2021 edition，文稿中的相应代码也会随之更新。</p><p>思考题</p><p>来一道简单的思考题，我们把之前学的内容融会贯通一下，代码展示了有问题的生命周期，你能找到原因么？（代码）</p><p>use std::str::Chars;</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 错误，为什么？</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">fn </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">lifetime1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">str {</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Tyr&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">to_string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    &amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">name[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.]</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// 错误，为什么？</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">fn lifetime2(name: String) -</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &amp;str {</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[1..]</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// 正确，为什么？</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">fn lifetime3(name: &amp;str) -</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Chars {</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">chars</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>欢迎在留言区抢答，也非常欢迎你分享这段时间的学习感受，一起交流进步。我们下节课回归正文讲Rust的类型系统，下节课见！</p>',82)]))}]]);export{p as __pageData,e as default};
