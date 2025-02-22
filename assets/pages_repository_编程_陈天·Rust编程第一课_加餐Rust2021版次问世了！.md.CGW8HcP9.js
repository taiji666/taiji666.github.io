import{_ as s,c as i,G as a,b as n}from"./chunks/framework.D5KJDRhN.js";const p=JSON.parse('{"title":"加餐Rust2021版次问世了！","description":"","frontmatter":{"title":"加餐Rust2021版次问世了！","date":"2025-02-22T00:00:00.000Z","categories":["陈天·Rust编程第一课"],"head":[["link",{"rel":"canonical","href":"https://www.doit.ip-ddns.com/pages/repository/编程/陈天·Rust编程第一课/加餐Rust2021版次问世了！"}]]},"headers":[],"relativePath":"pages/repository/编程/陈天·Rust编程第一课/加餐Rust2021版次问世了！.md","filePath":"pages/repository/编程/陈天·Rust编程第一课/加餐Rust2021版次问世了！.md","lastUpdated":1740213738000}');const t=s({name:"pages/repository/编程/陈天·Rust编程第一课/加餐Rust2021版次问世了！.md"},[["render",function(s,p,t,e,l,h){return n(),i("div",null,p[0]||(p[0]=[a('<div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>                            加餐 Rust2021版次问世了！</span></span>\n<span class="line"><span>                            你好，我是陈天。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>千呼万唤始出来的 Rust 2021 edition（下称版次），终于伴随着 1.56 版本出来了。在使用 rustup update stable 完成工具链的升级之后，小伙伴们就可以尝试着把自己之前的代码升级到 2021 版了。</p><p>具体做法很简单：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>cargo fix --edition</span></span>\n<span class="line"><span>修改 Cargo.toml，替换 edition = “2021”</span></span>\n<span class="line"><span>cargo build/cargo test 确保一切正常</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>在做第一步之前，记得先把未提交的代码提交。</p><p>如果你是初次涉猎 Rust 的同学，可能不清楚 Rust 中“版次”的作用，它是一个非常巧妙的、向后兼容的发布工具。</p><p>不知道在其它编程语言中有没有类似的概念，反正我所了解的语言，没有类似的东西。C++ 虽然允许你编译 lib A 时用 –std=C++17，编译 lib B 时用 –std=C++20，但这种用法有不少局限，用起来也没有版次这么清爽。我们先对它的理解达成一致，再聊这次“版次”更新的重点内容。</p><p>在 Rust 中，版次之间可能会有不同的保留字和缺省行为。比如 2018的 async/await/dyn，在 2015 中就没有严格保留成关键字。</p><p>假设语言在迭代的过程中发现 actor 需要成为保留字，但如果将其设置为保留字就会破坏兼容性，会让之前把 actor 当成普通名称使用的代码无法编译通过。怎么办呢？升级大版本，让代码分裂成不兼容的 v1 和 v2 么？这个问题是令所有语言开发者头疼的事情。</p><p>语言总是要发展的，总会从不完善到完善，所以，一开始考虑不周，后来不得不通过破坏性更新来弥补的事情，屡见不鲜。</p><p>升级大版本号，是之前处理这类问题的惯常手段。</p><p>然而，对于库的作者来说，如果他不想升级大版本或者受限于某些原因无法很快升级，最终，要么是使用这个库的开发者只好坚守在 v1，要么是使用这个库的开发者不得不找到对应的和 v2 兼容的替代品。但无论哪种方式，整个生态环境都会受到撕裂。</p><p>Rust 通过“版次”非常聪明地解决了这个问题。库的作者还是以旧的版次发布他的代码，使用库的开发者可以选择他们想使用最新的版次，二者可以完全不一致，编译时，Rust 编译器以旧的版次的功能编译旧的库，而以新的版次编译使用者的代码。</p><p>看一个实际例子吧。在 crates.io 里我随便搜了一个最后更新止步于三年前的库 rbpf。看它的 Cargo.toml，这是个 2015 版次的库（不声明版次就意味着 2015），和现在的代码断了两代。我们来尝试创建一个 2021 版次的 crate，同时引入这个库，以及 2018 版次的 futures 库，看有没有问题。</p><p>首先，确保你的 Rust 升级到了 1.56。然后 cargo new test-rust-edition。在生成的项目里，为 Cargo.toml 加入：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[package]</span></span>\n<span class="line"><span>name = &quot;test-rust-edition&quot;</span></span>\n<span class="line"><span>version = &quot;0.1.0&quot;</span></span>\n<span class="line"><span>edition = &quot;2021&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[dependencies]</span></span>\n<span class="line"><span>rbpf = &quot;0.1.0&quot;</span></span>\n<span class="line"><span>futures = &quot;0.3&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>这里我故意让两个本来是不兼容的 crate 放在一起看看是否可以协同工作。futures 使用了 async/await，这是 Rust 2018 才引入的关键字，但 rbpf 使用的 2015 版次。</p><p>修改好 Cargo.toml 后，我们在 src/main.rs 中拷入：</p><p>use futures::executor::block_on;</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">fn </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">main</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // This is the eBPF program, in the form of bytecode instructions.</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> prog </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        0xb4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0x00</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0x00</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0x00</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0x00</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0x00</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0x00</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0x00</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// mov32 r0, 0</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        0xb4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0x01</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0x00</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0x00</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0x02</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0x00</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0x00</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0x00</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// mov32 r1, 2</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        0x04</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0x00</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0x00</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0x00</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0x01</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0x00</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0x00</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0x00</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// add32 r0, 1</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        0x0c</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0x10</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0x00</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0x00</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0x00</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0x00</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0x00</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0x00</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// add32 r0, r1</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        0x95</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0x00</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0x00</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0x00</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0x00</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0x00</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0x00</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0x00</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// exit</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ];</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // Instantiate a struct EbpfVmNoData. This is an eBPF VM for programs that</span></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // takes no packet data in argument.</span></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // The eBPF program is passed to the constructor.</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> vm </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> rbpf::EbpfVmNoData::</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Some</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(prog)).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">unwrap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    block_on(async move {</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        dummy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">vm</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">execute</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">_</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">program</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">unwrap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()).</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    });</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">async fn dummy(result: u64) {</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    println</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">!(&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">hello</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> world</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">! </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Result</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> is</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {} (should be 0x3)&quot;, result);</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>这个代码在做什么我们不用关心，只需要关心它能不能在 2021 版次的 crate 里跑起来，cargo run 后，发现 rbpf 和 futures 融洽地处在了一起。</p><p>一份代码，使用了三个版次的代码，却能够无缝对接，我们使用的时候甚至可以不用关心谁是什么版次，你说厉害不厉害？</p><p>所以你看，版次起到了防火墙的作用，使得整个生态系统不用分裂，大家无需改动，依旧能够各司其职。这就是版次对 Rust 最大的贡献。如果你经历过 Python2 到 Python3 升级过程中的巨大阵痛，那应该能够非常感激 Rust 引入了这么个非常重要的概念。</p><p>Rust 2021 包括了什么新东西？</p><p>在你理解 Rust 2021 版次的意义之后，再来看看对我们影响最大的几个更新。</p><p>闭包的不相交捕获</p><p>在 2021 之前，哪怕你只用到了其中一个域，闭包也需要捕获整个数据结构，即使是引用。但是 2021 之后，闭包可以只捕获需要的域。</p><p>比如下面的代码：</p><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">struct Employee {</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: String,</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    title: String,</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">fn </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">main</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> tom </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Employee {</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Tom&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">into</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(),</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        title: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Engineer&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">into</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(),</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    };</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><pre><code>drop(tom.name);\n\nprintln!(&quot;title: {}&quot;, tom.title);\n</code></pre><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 之前这句不能工作，2021 可以编译</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> c </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ||</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> println</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;{}&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, tom.title);</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    c</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>闭包的不相交捕获对我们使用的好处是，那些闭包中捕获了结构体的一部分字段，而其它地方又用了另一部分与之不相交的字段，原本在 2018 中是编译不过的，你只能 clone() 这个结构体满足双方的需要，现在可以编译通过。</p><p>feature resolver</p><p>依赖管理是一个难题，其中最困难的部分之一就是在依赖两个不同的包时，选择要使用的依赖版本。这里指的不仅包括其版本号，还包括为该软件包启用或未启用的功能（feature）。因为Cargo 的默认行为是在依赖中多次引用单个包时合并所用到的功能。</p><p>例如，假设你有一个名为 Foo 的 crate，其中有 A 和 B 两个功能，该依赖项被包 bar 和 baz 使用，但 bar 依赖 Foo + A，而 baz 依赖 Foo + B。Cargo 会合并这两个功能并编译 Foo + A B。-</p><p>这确实有一个好处，你只需要编译一次 Foo，就可以被 bar 和 baz 使用。但是，如果 A 和 B 不应该一起编译呢？如果你对这样的场景感兴趣，可以看下面的 Rust 1.51 编译策略的链接。这是 Rust 一个长期存在并困扰社区的问题。</p><p>之前 Rust 1.51 终于提供了新的方法，通过不同的编译策略解决这一问题。如今，这个策略已经成为 2021 的缺省行为，它会带来一些编译速度的损失，但会让编译结果更加精确。</p><p>新的 prelude</p><p>任何语言都会缺省引入某些命名空间下的一些非常常见的行为，这样让开发者使用起来很方便。Rust 也不例外，它会缺省引入一些 trait 、数据结构和宏，比如我们使用的 From/Into 这样的 trait、Vec 这样的数据结构，以及 println!/vec! 这样的宏。这样在写代码的时候，就不需要频繁地使用 use。</p><p>在 2021 版次中，TryInto、TryFrom 和 FromIterator 默认被引入到 prelude 中，我们不再需要使用 use 声明了。比如现在下面的语句就没必要了，因为 prelude 已经包含了：</p><p>use std::convert::TryFrom;</p><p>小结</p><p>总的来说，Rust 2021 不是一个大的版次更新，里面只包含了少量和之前版本不兼容的地方。未来 3 年，Rust 都将稳定在这个版次上。</p><p>也许你会不理解：搞这么大动静，就这？但这正是 Rust 当初设计用心良苦的地方。</p><p>三年内，以 6 周为单位，不断迭代新的功能，风雨无阻，但不引入破坏性更新，或者用某些编译选项将其隔离，使用者必须手工打开（比如 resolver = “2”）；三年期满，升级版次，一次性把这三年内潜在的破坏性更新，以及可预见的未来会引入的破坏性更新（比如保留新的关键字），通过版次来区隔。</p><p>版次中出现的大动作越少，就说明语言越趋向成熟。</p><p>好，关于 2021 版次的介绍就到这里，还有一些其它的修改，这里我就不赘述了，感兴趣的可以看发布文档。这门课的代码仓库 tyrchen/geektime-rust 也随之升级到了 2021 版次，具体修改你可以看这个 pull request。</p>',52)]))}]]);export{p as __pageData,t as default};
