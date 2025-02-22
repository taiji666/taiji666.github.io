import{_ as s,c as i,G as a,b as n}from"./chunks/framework.D5KJDRhN.js";const t=JSON.parse('{"title":"07排列：如何让计算机学会“田忌赛马”？","description":"","frontmatter":{"title":"07排列：如何让计算机学会“田忌赛马”？","date":"2025-02-22T00:00:00.000Z","categories":["程序员的数学基础课"],"head":[["link",{"rel":"canonical","href":"https://www.doit.ip-ddns.com/pages/repository/编程/程序员的数学基础课/07排列：如何让计算机学会“田忌赛马”？"}]]},"headers":[],"relativePath":"pages/repository/编程/程序员的数学基础课/07排列：如何让计算机学会“田忌赛马”？.md","filePath":"pages/repository/编程/程序员的数学基础课/07排列：如何让计算机学会“田忌赛马”？.md","lastUpdated":1739887664000}');const p=s({name:"pages/repository/编程/程序员的数学基础课/07排列：如何让计算机学会“田忌赛马”？.md"},[["render",function(s,t,p,e,l,h){return n(),i("div",null,t[0]||(t[0]=[a('<div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>                            07 排列：如何让计算机学会“田忌赛马”？</span></span>\n<span class="line"><span>                            你好，我是黄申。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>“田忌赛马”的故事我想你肯定听过吧？田忌是齐国有名的将领，他常常和齐王赛马，可是总是败下阵来，心中非常不悦。孙膑想帮田忌一把。他把这些马分为上、中、下三等。他让田忌用自己的下等马来应战齐王的上等马，用上等马应战齐王的中等马，用中等马应战齐王的下等马。三场比赛结束后，田忌只输了第一场，赢了后面两场，最终赢得与齐王的整场比赛。</p><p>孙膑每次都从田忌的马匹中挑选出一匹，一共进行三次，排列出战的顺序。是不是感觉这个过程很熟悉？这其实就是数学中的排列过程。</p><p>我们初高中的时候，都学过排列，它的概念是这么说的：从n个不同的元素中取出m（1≤m≤n）个不同的元素，按照一定的顺序排成一列，这个过程就叫排列（Permutation）。当m=n这种特殊情况出现的时候，比如说，在田忌赛马的故事中，田忌的三匹马必须全部出战，这就是全排列（All Permutation）。</p><p>如果选择出的这m个元素可以有重复的，这样的排列就是为重复排列（Permutation with Repetition），否则就是不重复排列（Permutation without Repetition）。</p><p>看出来没有？这其实是一个树状结构。从树的根结点到叶子结点，每种路径都是一种排列。有多少个叶子结点就有多少种全排列。从图中我们可以看出，最终叶子结点的数量是3x2x1=6，所以最终排列的数量为6。</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{上等，中等，下等}</span></span>\n<span class="line"><span>{上等，下等，中等}</span></span>\n<span class="line"><span>{中等，上等，下等}</span></span>\n<span class="line"><span>{中等，下等，上等}</span></span>\n<span class="line"><span>{下等，上等，中等}</span></span>\n<span class="line"><span>{下等，中等，上等}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>我用t1，t2和t3分别表示田忌的上、中、下等马跑完全程所需的时间，用q1，q2和q3分别表示齐王的上、中、下等马跑全程所需的时间，因此，q1</p><p>如果你将这些可能的排列，仔细地和齐王的上等、中等和下等马进行对比，只有{下等，上等，中等}这一种可能战胜齐王，也就是t3&gt;q1，t1</p><p>对于最终排列的数量，这里我再推广一下：</p><p>对于n个元素的全排列，所有可能的排列数量就是nx(n-1)x(n-2)x…x2x1，也就是n!；</p><p>对于n个元素里取出m(0≤n)个元素的不重复排列数量是nx(n-1)x(n-2)x…x(n - m + 1)，也就是n!/(n-m)!。</p><p>这两点都是可以用数学归纳法证明的，有兴趣的话你可以自己尝试一下。</p><p>如何让计算机为田忌安排赛马？</p><p>我们刚才讨论了3匹马的情况，这倒还好。可是，如果有30匹马、300匹马，怎么办？30的阶乘已经是天文数字了。更糟糕的是，如果两组马之间的速度关系也是非常随机的，例如q1</p><p>如果你细心的话，就会发现在新版舍罕王赏麦的案例中，其实已经涉及了排列的思想，不过那个案例不是以“选取多少个元素”为终止条件，而是以“选取元素的总和”为终止条件。尽管这样，我们仍然可以使用递归的方式来快速地实现排列。</p><p>不过，要把田忌赛马的案例，转成计算机所能理解的内容，还需要额外下点功夫。</p><p>首先，在不同的选马阶段，我们都要保存已经有几匹马出战、它们的排列顺序、以及还剩几匹马没有选择。我使用变量result来存储到当前函数操作之前，已经出战的马匹及其排列顺序。而变量horses存储了到当前函数操作之前，还剩几匹马还没出战。变量new_result和rest_horses是分别从result和horses克隆而来，保证不会影响上一次的结果。</p><p>其次，孙膑的方法之所以奏效，是因为他看到每一等马中，田忌的马只比齐王的差一点点。如果相差太多，可能就会有不同的胜负结局。所以，在设置马匹跑完全程的时间上，我特意设置为q1</p><div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> java.util.ArrayList;</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> java.util.Arrays; </span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> java.util.HashMap;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>public class Lesson7_1 {</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>\t// 设置齐王的马跑完所需时间</span></span>\n<span class="line"><span>\tpublic static HashMap&lt;String, Double&gt; q_horses_time = new HashMap&lt;String, Double&gt;(){</span></span>\n<span class="line"><span>\t\t{</span></span>\n<span class="line"><span>\t\t \t  put(&quot;q1&quot;, 1.0);</span></span>\n<span class="line"><span>\t\t \t  put(&quot;q2&quot;, 2.0);</span></span>\n<span class="line"><span>\t\t    put(&quot;q3&quot;, 3.0);</span></span>\n<span class="line"><span>\t\t}</span></span>\n<span class="line"><span>\t};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>\t// 设置田忌的马跑完所需时间</span></span>\n<span class="line"><span>\tpublic static HashMap&lt;String, Double&gt; t_horses_time = new HashMap&lt;String, Double&gt;(){</span></span>\n<span class="line"><span>\t\t{</span></span>\n<span class="line"><span>\t\t \t  put(&quot;t1&quot;, 1.5);</span></span>\n<span class="line"><span>\t\t \t  put(&quot;t2&quot;, 2.5);</span></span>\n<span class="line"><span>\t\t    put(&quot;t3&quot;, 3.5);</span></span>\n<span class="line"><span>\t\t}</span></span>\n<span class="line"><span>\t};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><pre><code>public\tstatic ArrayList&lt;String&gt; q_horses = new ArrayList&lt;String&gt;(Arrays.asList(&quot;q1&quot;, &quot;q2&quot;, &quot;q3&quot;));\n</code></pre><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>\t/**</span></span>\n<span class="line"><span>    * @Description:\t使用函数的递归（嵌套）调用，找出所有可能的马匹出战顺序</span></span>\n<span class="line"><span>    * @param horses-目前还剩多少马没有出战，result-保存当前已经出战的马匹及顺序</span></span>\n<span class="line"><span>    * @return void</span></span>\n<span class="line"><span>    */</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><pre><code>public static void permutate(ArrayList&lt;String&gt; horses, ArrayList&lt;String&gt; result) {\n</code></pre><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    \t// 所有马匹都已经出战，判断哪方获胜，输出结果</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    \tif</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (horses.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">size</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    \t\tSystem.out.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">println</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(result);</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    \t\tcompare</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(result, q_horses);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><pre><code>\t\tSystem.out.println();\n</code></pre><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> \t \t\t\treturn;</span></span>\n<span class="line"><span>   \t\t}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language-html vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   \t\tfor (int i = 0; i </span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> horses.size(); i++) {</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    \t\t// 从剩下的未出战马匹中，选择一匹，加入结果</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> \t \t\t\tArrayList&lt;</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; new_result = (ArrayList&lt;</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;)(result.clone());</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   \t\t\tnew_result.add(horses.get(i));</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="language-html vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    \t\t// 将已选择的马匹从未出战的列表中移出</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> \t \t\t\tArrayList&lt;</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; rest_horses = ((ArrayList&lt;</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;)horses.clone());</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> \t \t\t\trest_horses.remove(i);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    \t\t// 递归调用，对于剩余的马匹继续生成排列</span></span>\n<span class="line"><span>   \t\t\tpermutate(rest_horses, new_result);</span></span>\n<span class="line"><span>   \t\t}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><pre><code>}\n</code></pre><p>}</p><p>另外，我还使用了compare的函数来比较田忌和齐王的马匹，看哪方获胜。</p><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> static</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> compare</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(ArrayList</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">String</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> t, ArrayList</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">String</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> q) {</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    \tint</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> t_won_cnt </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    \tfor</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> i </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; i </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> t.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">size</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(); i</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">++</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\t\t\tSystem.out.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">println</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(t_horses_time.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(t.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(i)) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot; &quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> +</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  q_horses_time.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(q.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(i)));</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">\t\t\tif</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (t_horses_time.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(t.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(i)) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> q_horses_time.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(q.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(i))) t_won_cnt </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">++</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\t\t}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">\t\tif</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (t_won_cnt </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (t.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">size</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)) System.out.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">println</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;田忌获胜！&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">\t\telse</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> System.out.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">println</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;齐王获胜！&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\t\tSystem.out.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">println</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>下面是测试代码。当然你可以设置更多的马匹，并增加相应的马匹跑完全程的时间。</p><p>public static void main(String[] args) {</p><div class="language-html vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\t\tArrayList&lt;</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; horses = new\tArrayList&lt;</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;(Arrays.asList(&quot;t1&quot;, &quot;t2&quot;, &quot;t3&quot;));</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\t\tLesson7_1.permutate(horses,\tnew ArrayList&lt;</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;());</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><pre><code>}\n</code></pre><p>在最终的输出结果中，6种排列中只有一种情况是田忌获胜的。</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[t3, t1, t2]</span></span>\n<span class="line"><span>3.5 1.0</span></span>\n<span class="line"><span>1.5 2.0</span></span>\n<span class="line"><span>2.5 3.0</span></span>\n<span class="line"><span>田忌获胜！</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>如果田忌不听从孙膑的建议，而是随机的安排马匹出战，那么他只有1/6的获胜概率。</p><p>说到这里，我突然产生了一个想法，如果齐王也是随机安排他的马匹出战顺序，又会是怎样的结果？如果动手来实现的话，大体思路是我们为田忌和齐王两方都生成他们马匹的全排序，然后再做交叉对比，看哪方获胜。这个交叉对比的过程也是个排列的问题，田忌这边有6种顺序，而齐王也是6种顺序，所以一共的可能性是6x6=36种。</p><p>我用代码模拟了一下，你可以看看。</p><p>public static void main(String[] args) {</p><div class="language-html vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\t\tArrayList&lt;</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; t_horses = new ArrayList&lt;</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;(Arrays.asList(&quot;t1&quot;, &quot;t2&quot;, &quot;t3&quot;));</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\t\tLesson7_2.permutate(t_horses, new ArrayList&lt;</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;(), t_results);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language-html vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\t\tArrayList&lt;</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; q_horses = new ArrayList&lt;</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;(Arrays.asList(&quot;q1&quot;, &quot;q2&quot;, &quot;q3&quot;));</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\t\tLesson7_2.permutate(q_horses, new ArrayList&lt;</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;(), q_results);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\t\tSystem.out.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">println</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(t_results);</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\t\tSystem.out.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">println</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(q_results);</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\t\tSystem.out.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">println</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>\t\tfor (int i = 0; i &lt; t_results.size(); i++) {</span></span>\n<span class="line"><span>\t\t\tfor (int j = 0; j &lt; q_results.size(); j++) {</span></span>\n<span class="line"><span>\t\t\t\tLesson7_2.compare(t_results.get(i), q_results.get(j));</span></span>\n<span class="line"><span>\t\t\t}</span></span>\n<span class="line"><span>\t\t}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><pre><code>}\n</code></pre><p>由于交叉对比时只需要选择2个元素，分别是田忌的出战顺序和齐王的出战顺序，所以这里使用2层循环的嵌套来实现。从最后的结果可以看出，田忌获胜的概率仍然是1/6。</p><p>暴力破解密码如何使用排列思想？</p><p>聊了这么多，相信你对排列有了更多了解。在概率中，排列有很大的作用，因为排列会帮助我们列举出随机变量取值的所有可能性，用于生成这个变量的概率分布，之后在概率统计篇我还会具体介绍。此外，排列在计算机领域中有着很多应用场景。我这里讲讲最常见的密码的暴力破解。</p><p>我们先来看去年网络安全界的两件大事。第一件发生在2017年5月，新型“蠕虫”式勒索病毒WannaCry爆发。当时这个病毒蔓延得非常迅速，电脑被感染后，其中的文件会被加密锁住，黑客以此会向用户勒索比特币。第二件和美国的信用评级公司Equifax有关。仅在2017年内，这个公司就被黑客盗取了大约1.46亿用户的数据。</p><p>看样子，黑客攻击的方式多种多样，手段也高明了很多，但是窃取系统密码仍然是最常用的攻击方式。有时候，黑客们并不需要真的拿到你的密码，而是通过“猜”，也就是列举各种可能的密码，然后逐个地去尝试密码的正确性。如果某个尝试的密码正好和原先管理员设置的一样，那么系统就被破解了。这就是我们常说的暴力破解法。</p><p>我们可以假设一个密码是由英文字母组成的，那么每位密码有52种选择，也就是大小写字母加在一起的数量。那么，生成m位密码的可能性就是52^m种。也就是说，从n（这里n为52）个元素取出m（0≤n）个元素的可重复全排列，总数量为n^m。如果你遍历并尝试所有的可能性，就能破解密码了。</p><p>不过，即使存在这种暴力法，你也不用担心自己的密码很容易被人破解。我们平时需要使用密码登录的网站或者移动端App程序，基本上都限定了一定时间内尝试密码的次数，例如1天之内只能尝试5次等等。这些次数一定远远小于密码排列的可能性。</p><p>这也是为什么有些网站或App需要你一定使用多种类型的字符来创建密码，比如字母加数字加特殊符号。因为类型越多，n^m中的n越大，可能性就越多。如果使用英文字母的4位密码，就有52^4=7311616种，超过了700万种。如果我们在密码中再加入0～9这10个阿拉伯数字，那么可能性就是62^4=14776336种，超过了1400万。</p><p>同理，我们也可以增加密码长度，也就是用n^m中的m来实现这一点。如果在英文和阿拉伯数字的基础上，我们把密码的长度增加到6位，那么就是62^6=56800235584种，已经超过了568亿了！这还没有考虑键盘上的各种特殊符号。有人估算了一下，如果用上全部256个ASCII码字符，设置长度为8的密码，那么一般的黑客需要10年左右的时间才能暴力破解这种密码。</p><p>小结</p><p>排列可以帮助我们生成很多可能性。由于这种特性，排列最多的用途就是穷举法，也就是，列出所有可能的情况，一个一个验证，然后看每种情况是否符合条件的解。</p><p>古代的孙膑利用排列的思想，穷举了田忌马匹的各种出战顺序，然后获得了战胜齐王的策略。现代的黑客，通过排列的方法，穷举了各种可能的密码，试图破坏系统的安全性。如果你所面临的问题，它的答案也是各种元素所组成的排列，那么你就可以考虑，有没有可能排列出所有的可能性，然后通过穷举的方式来获得最终的解。</p><p>思考题</p><p>假设有一个4位字母密码，每位密码是a～e之间的小写字母。你能否编写一段代码，来暴力破解该密码？（提示：根据可重复排列的规律，生成所有可能的4位密码。）</p><p>欢迎在留言区交作业，并写下你今天的学习笔记。你可以点击“请朋友读”，把今天的内容分享给你的好友，和他一起精进。</p>',68)]))}]]);export{t as __pageData,p as default};
