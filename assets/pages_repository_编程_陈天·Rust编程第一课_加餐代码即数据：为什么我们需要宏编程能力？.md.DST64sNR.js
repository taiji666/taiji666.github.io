import{_ as s,c as i,G as a,b as n}from"./chunks/framework.D5KJDRhN.js";const p=JSON.parse('{"title":"加餐代码即数据：为什么我们需要宏编程能力？","description":"","frontmatter":{"title":"加餐代码即数据：为什么我们需要宏编程能力？","date":"2025-02-22T00:00:00.000Z","categories":["陈天·Rust编程第一课"],"head":[["link",{"rel":"canonical","href":"https://www.doit.ip-ddns.com/pages/repository/编程/陈天·Rust编程第一课/加餐代码即数据：为什么我们需要宏编程能力？"}]]},"headers":[],"relativePath":"pages/repository/编程/陈天·Rust编程第一课/加餐代码即数据：为什么我们需要宏编程能力？.md","filePath":"pages/repository/编程/陈天·Rust编程第一课/加餐代码即数据：为什么我们需要宏编程能力？.md","lastUpdated":1739887664000}');const l=s({name:"pages/repository/编程/陈天·Rust编程第一课/加餐代码即数据：为什么我们需要宏编程能力？.md"},[["render",function(s,p,l,e,t,h){return n(),i("div",null,p[0]||(p[0]=[a('<div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>                            加餐 代码即数据：为什么我们需要宏编程能力？</span></span>\n<span class="line"><span>                            你好，我是陈天。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>应广大同学的呼吁，今天我们来讲讲宏编程。</p><p>最初设计课程的时候考虑知识点的系统性，Rust 的元编程能力声明宏、过程宏各安排了一讲，但宏编程是高阶内容后来删减掉了。其实如果你初步学习Rust，不用太深究宏，大多数应用的场景，你会使用标准库或者第三方库提供的宏就行。不会做宏编程，并不影响你日常的开发。</p><p>不过很多同学对宏有兴趣，我们今天就深入聊一聊。在讲如何使用宏、如何构建宏之前，我们要先搞清楚为什么会出现宏。</p><p>为什么我们需要宏编程能力？</p><p>我们从设计非常独特的Lisp语言讲起。在 Lisp 的世界里，有句名言：代码即数据，数据即代码（Code is data, data is code）。</p><p>如果你有一点 Lisp 相关的开发经验，或者听说过任何一种 Lisp 方言，你可能知道，和普通编程语言不同的是，Lisp 的语言直接把 AST（抽象语法树）暴露给开发者，开发者写的每一行代码，其实就是在描述这段代码的 AST。</p><p>这个特点如果你没有太看明白，我们结合一个具体例子来理解。这段代码是 6 年前，2048 游戏很火的时候，我用 Lisp 的一种方言 Racket 撰写的2048 的实现片段：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>; e.g. &#39;(2 2 2 4 4 4 8) -&gt; &#39;(4 2 8 4 8)</span></span>\n<span class="line"><span>(define (merge row)</span></span>\n<span class="line"><span>  (cond [(&lt;= (length row) 1) row]</span></span>\n<span class="line"><span>        [(= (first row) (second row))</span></span>\n<span class="line"><span>         (cons (* 2 (first row)) (merge (drop row 2)))]</span></span>\n<span class="line"><span>        [else (cons (first row) (merge (rest row)))]))</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>这段代码的算法不难理解，给定一个 row：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>如果它只有一个值，那么直接返回；</span></span>\n<span class="line"><span>如果头两个元素相等，那么把第一个元素乘以 2，与头两个元素之后的所有元素 merge 的结果（此处有递归），组成一个新的 list 返回；</span></span>\n<span class="line"><span>否则，就把第一个元素和之后的所有元素 merge 的结果组成一个新的 list 返回（此处也是递归）。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>看着这段代码，相信只要你花些耐心就可以写出对应的语法树：</p><p>你会发现，撰写 Lisp 代码，就相当于直接在描述语法树。</p><p>从语法树的角度看，编程语言其实也没有什么了不起的，它操作和执行的数据结构不过就是这样的一棵棵树，就跟我们开发者平日里编程操作的各种数据结构一样。</p><p>如果一门编程语言把它在解析过程中产生的语法树暴露给开发者，允许开发者对语法树进行裁剪和嫁接这样移花接木的处理，那么这门语言就具备了元编程的能力。</p><p>语言对这样处理的限制越少，元编程的能力就越强，当然作为一枚硬币的反面，语言就会过度灵活，无法无天，甚至反噬语言本身；反之，语言对开发者操作语法树的限制越多，元编程能力就越弱，语言虽然丧失了灵活性，但是更加规矩。</p><p>Lisp 语言，作为元编程能力的天花板，毫无保留地把语法树像数据一样敞露给开发者，让开发者不光在编译期，甚至在运行期，都可以随意改变代码的行为，这也是Lisp“代码即数据，数据即代码”思路的直接体现。</p><p>在《黑客与画家》一书里（p196），PG 引用了“格林斯潘第十定律”：</p><p>任何C或Fortran程序复杂到一定程度之后，都会包含一个临时开发的、只有一半功能的、不完全符合规格的、到处都是bug的、运行速度很慢的Common Lisp实现。</p><p>虽然这是 Lisp 拥趸对其他语言的极尽嘲讽，不过也说明了一个不争的事实：一门设计再精妙、提供再丰富生态的语言，在实际的使用场景中，都不可避免地需要具备某种用代码生成代码的能力，来大大减轻开发者不断撰写结构和模式相同的重复脚手架代码的需求。</p><p>幸运的是，Rust 这门语言提供了足够强大的宏编程能力，让我们在需要的时候，可以通过撰写宏来避免重复的脚手架代码，同时，Rust 对宏的使用还有足够的限制，在保证灵活性的前提下，防止我们过度使用让代码失控。</p><p>那Rust到底提供了哪些宏呢？</p><p>Rust 对宏编程有哪些支持？</p><p>在过去的课程中，我们经历了各种各样的宏，比如创建 Vec 的 vec! 宏、为数据结构添加各种 trait 支持的 #[derive(Debug, Default, ...)]、条件编译时使用的 #[cfg(test)] 宏等等。</p><p>其实Rust中的宏就两大类：对代码模板做简单替换的声明宏（declarative macro）、可以深度定制和生成代码的过程宏（procedural macro）。-</p><p>声明宏</p><p>首先是声明宏（declarative macro），课程里出现过的比如像 vec![]、println!、以及 info!，它们都是声明宏。</p><p>声明宏可以用 macro_rules! 来描述，我们看一个常用的 tracing log 的宏定义（代码）：</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">macro_rules</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> __tracing_log {</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">target</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> $target</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">expr</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">$level</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">expr</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">$</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">$field</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">tt</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)+ ) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        $crate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">::if_log_enabled</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { $level, {</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            use </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$crate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">::log;</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> level </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $crate::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">level_to_log</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">($level);</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> level </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">max_level</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">                let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> log_meta </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> log::Metadata::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">builder</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                    .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">level</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(level)</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                    .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">target</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">($target)</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                    .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">build</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">                let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> logger </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> log::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">logger</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">                if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> logger.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">log_meta) {</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                    logger.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">log::Record::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">builder</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                        .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">file</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Some</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">file</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()))</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                        .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">module_path</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Some</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">module_path</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()))</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                        .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">line</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Some</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">line</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()))</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                        .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">metadata</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(log_meta)</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                        .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">args</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">($crate::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">__mk_format_args</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">($field)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                        .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">build</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">());</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                }</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            }</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }}</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    };</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>可以看到，它主要做的就是通过简单的接口，把不断重复的逻辑包装起来，然后在调用的地方展开而已，不涉及语法树的操作。</p><p>如果你用过 C/C++，那么Rust的声明宏和 C/C++ 里面的宏类似，承载同样的目的。只不过 Rust 的声明宏更加安全，你无法在需要出现标识符的地方出现表达式，也无法让宏内部定义的变量污染外部的世界。比如在 C 中，你可以这样声明一个宏：</p><p>#define MUL(a, b) a * b</p><p>这个宏是期望调用者传入两个标识符，执行这两个标识符对应值的乘法操作，但实际我们可以对 a 传入 1 + 2，对 b 传入 4 - 3，导致结果完全错误。</p><p>过程宏</p><p>除了做简单替换的声明宏，Rust 还支持允许我们深度操作和改写 Rust 代码语法树的过程宏（procedural macro），更加灵活，更为强大。</p><p>Rust 的过程宏分为三种：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>函数宏（function-like macro）：看起来像函数的宏，但在编译期进行处理。比如我们之前用过的 sqlx 里的 query 宏，它内部展开出一个 expand_query 函数宏。你可能想象不到，看上去一个简单的 query 处理，内部有多么庞大的代码结构。</span></span>\n<span class="line"><span>属性宏（attribute macro）：可以在其他代码块上添加属性，为代码块提供更多功能。比如 rocket 的 get/put 等路由属性。</span></span>\n<span class="line"><span>派生宏（derive macro）：为 derive 属性添加新的功能。这是我们平时使用最多的宏，比如 #[derive(Debug)] 为我们的数据结构提供 Debug trait 的实现、#[derive(Serialize, Deserialize)]为我们的数据结构提供 serde 相关 trait 的实现。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>什么情况可以用宏</p><p>前面讲过，宏的主要作用是避免我们创建大量结构相同的脚手架代码。那么我们在什么情况下可以使用宏呢？</p><p>首先说声明宏。如果重复性的代码无法用函数来封装，那么声明宏就是一个好的选择，比如 Rust 早期版本中的try!，它是? 操作符的前身。</p><p>再比如 futures 库的ready! 宏：</p><p>#[macro_export]</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">macro_rules</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ready {</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">$e</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">expr</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> $</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(,)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        match $e {</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">            $crate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">task</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Poll</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Ready</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(t) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> t,</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">            $crate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">task</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Poll</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">::</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">Pending</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $crate::task::Poll::Pending,</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    };</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>这样的结构，因为涉及提早 return，无法用函数封装，所以用声明宏就很简洁。</p><p>过程宏里，先说最复杂的派生宏，因为派生宏会在特定的场景使用，所以如果你有需要可以使用。</p><p>比如一个数据结构，我们希望它能提供 Debug trait 的能力，但为自己定义的每个数据结构实现 Debug trait 太过繁琐，而且代码所做的操作又都是一样的，这时候就可以考虑使用派生宏来简化这个操作。</p><p>一般来说，如果你定义的 trait 别人实现起来有固定的模式可循，那么可以考虑为其构建派生宏。serde 在 Rust 的世界里这么流行、这么好用，很大程度上也是因为基本上你的数据结构只需要添加 #[derive(Serialize, Deserialize)]，就可以轻松序列化成 JSON、YAML 等好多种类型（或者从这些类型中反序列化）。</p><p>函数宏和属性宏并没有特定的使用场景。sqlx 用函数宏来处理 SQL query、tokio 使用属性宏 #[tokio::main] 来引入 runtime。它们可以帮助目标代码的实现逻辑变得更加简单，但一般除非特别必要，否则我并不推荐写。</p><p>好，学到这里你已经了解了足够多的关于宏的基础知识，欢迎在留言区交流你对宏的理解。</p><p>如果你对撰写宏有兴趣，下一讲我们会手写声明宏和过程宏来深入理解宏到底做了什么。我们下一讲见！</p>',50)]))}]]);export{p as __pageData,l as default};
