import{_ as e,c as s,G as p,b as a}from"./chunks/framework.D5KJDRhN.js";const t=JSON.parse('{"title":"22[视频]从一个安全漏洞说起，探寻API性能和安全的平衡","description":"","frontmatter":{"title":"22[视频]从一个安全漏洞说起，探寻API性能和安全的平衡","date":"2025-02-22T00:00:00.000Z","categories":["OpenResty从入门到实战"],"head":[["link",{"rel":"canonical","href":"https://www.doit.ip-ddns.com/pages/repository/编程/OpenResty从入门到实战/22[视频]从一个安全漏洞说起，探寻API性能和安全的平衡"}]]},"headers":[],"relativePath":"pages/repository/编程/OpenResty从入门到实战/22[视频]从一个安全漏洞说起，探寻API性能和安全的平衡.md","filePath":"pages/repository/编程/OpenResty从入门到实战/22[视频]从一个安全漏洞说起，探寻API性能和安全的平衡.md","lastUpdated":1739887664000}');const n=e({name:"pages/repository/编程/OpenResty从入门到实战/22[视频]从一个安全漏洞说起，探寻API性能和安全的平衡.md"},[["render",function(e,t,n,r,i,l){return a(),s("div",null,t[0]||(t[0]=[p('<div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>                            22 [视频]从一个安全漏洞说起，探寻API性能和安全的平衡</span></span>\n<span class="line"><span>                            22 [视频]从一个安全漏洞说起，探寻API性能和安全的平衡</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>你好，我是温铭。</p><p>今天的内容，我同样会以视频的形式来讲解。老规矩，在你进行视频学习之前，我想先问你这么几个问题：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>你在使用 OpenResty 的时候，是否注意到有 API 存在安全隐患呢？</span></span>\n<span class="line"><span>在安全和性能之间，如何去平衡它们的关系呢？</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>这几个问题，也是今天视频课要解决的核心内容，希望你可以先自己思考一下，并带着问题来学习今天的视频内容。</p><p>同时，我会给出相应的文字介绍，方便你在听完视频内容后，及时总结与复习。下面是今天这节课的文字介绍部分。</p><p>今日核心</p><p>安全，是一个永恒的话题，不管你是写开发业务代码，还是做底层的架构，都离不开安全方面的考虑。</p><p>CVE-2018-9230 是与 OpenResty 相关的一个安全漏洞，但它并非 OpenResty 自身的安全漏洞。这听起来是不是有些拗口呢？没关系，接下来让我们具体看下，攻击者是如何构造请求的。</p><p>OpenResty 中的 ngx.req.get_uri_args、ngx.req.get_post_args 和 ngx.req.get_headers接口，默认只返回前 100 个参数。如果 WAF 的开发者没有注意到这个细节，就会被参数溢出的方式攻击。攻击者可以填入 100 个无用参数，把 payload 放在第 101 个参数中，借此绕过 WAF 的检测。</p><p>那么，应该如何处理这个 CVE 呢？</p><p>显然，OpenResty 的维护者需要考虑到向下兼容、不引入更多安全风险和不影响性能这么几个因素，并要在其中做出一个平衡的选择。</p><p>最终，OpenResty 维护者选择新增一个 err 的返回值来解决这个问题。如果输入参数超过 100 个，err 的提示信息就是 truncated。这样一来，这些 API 的调用者就必须要处理错误信息，自行判断拒绝请求还是放行。</p><p>其实，归根到底，安全是一种平衡。究竟是选择基于规则的黑名单方式，还是选择基于身份的白名单方式，抑或是两种方式兼用，都取决于你的实际业务场景。</p><p>课件参考</p><p>今天的课件已经上传到了我的GitHub上，你可以自己下载学习。</p><p>链接如下：<a href="https://github.com/iresty/geektime-slides" target="_blank" rel="noreferrer">https://github.com/iresty/geektime-slides</a></p><p>如果有不清楚的地方，你可以在留言区提问，另也可以在留言区分享你的学习心得。期待与你的对话，也欢迎你把这篇文章分享给你的同事、朋友，我们一起交流、一起进步。</p>',18)]))}]]);export{t as __pageData,n as default};
