import{_ as p}from"./chunks/ArticleMetadata.bItWbIop.js";import{_ as n,D as c,o as s,c as l,I as d,w as h,k as r,a as m,R as _,b as g,e as u}from"./chunks/framework.FVQzxbLi.js";import"./chunks/md5.RtphNWHi.js";const b="/assets/202102220930199.RQQ6ym22.png",R="/assets/202102220930299.cyVDzgDx.png",f="/assets/202102220930399.huxH-_LW.png",k="/assets/202102220930599.u_SNVreh.png",D="/assets/202102220930699.PsCQnTFf.png",M="/assets/202102220930799.sJ-7oEh4.png",q="/assets/202102220930899.E5hOA1JF.png",x="/assets/202102220930999.pwH29JUq.png",P="/assets/202102220931199._wX6dO49.png",w="/assets/202102220931299.IogdzysS.png",T="/assets/202102220931399.MtvrZ62n.png",C="/assets/202102220931599.irP__jCc.png",H="/assets/202102220931699.uH-a5BOF.png",N="/assets/202102220931799.HEhqZ0eI.png",O="/assets/202102220931899.y-Bjbvyl.png",v="/assets/202102220931999.fcOFOtpu.png",S="/assets/202102220932199.TY1NugYQ.gif",V="/assets/202102220932299.iIk2Kqw9.gif",y="/assets/202102220932399.iz81OmYp.gif",I="/assets/202102220932599.I3p2cHvK.gif",$="/assets/202102220932699.cR8YhuPx.gif",A="/assets/202102220932799.cwzwJgCN.gif",Z=JSON.parse('{"title":"Redis Desktop Manager 快速入门","description":"","frontmatter":{"title":"Redis Desktop Manager 快速入门","author":"查尔斯","date":"2021/02/22 09:41","categories":["工具四海谈"],"tags":["Redis","管理工具"]},"headers":[],"relativePath":"categories/tools/2021/02/22/RDM快速入门.md","filePath":"categories/tools/2021/02/22/RDM快速入门.md","lastUpdated":1667545308000}'),B={name:"categories/tools/2021/02/22/RDM快速入门.md"},F=r("h1",{id:"redis-desktop-manager-快速入门",tabindex:"-1"},[m("Redis Desktop Manager 快速入门 "),r("a",{class:"header-anchor",href:"#redis-desktop-manager-快速入门","aria-label":'Permalink to "Redis Desktop Manager 快速入门"'},"​")],-1),E=_('<h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p>这个时代，Redis 多流行啊，10 个程序员起码有 8 个听过用过。人多了，自然有人不太喜欢使用命令行来直接操作 Redis。所以，在官方没有提供的情况下，大家一直都在寻求一款好用的 Redis 客户端管理工具，而 RDM 这款软件，在咱们国内 IT 圈子里不说人尽皆知吧，也可以说的上是小有名气的。</p><div class="tip custom-block"><p class="custom-block-title">简介</p><p>RDM，全称 Redis Desktop Manager。它是一个快速、简单、支持跨平台的 Redis 桌面管理工具，基于 Qt 5 开发，支持通过 SSH Tunnel 连接 [1]。它开源在了 GitHub [2] 上。</p></div><p>长下面这样。在当前 Redis 客户端工具圈里可以说的上是 “高颜值”，而且也比较实用。</p><p><img src="'+b+'" alt="202102220930199"></p><p>但是很可惜，0.9.3.817 是它的最后一个免费版。</p><p>你可能会比较好奇，它不是开源的吗？的确，它是开源的，但也仅仅是开源，即开放源代码。而大多数开源软件都会免费提供安装包，但 RDM 从 0.9.3.817 版本开始就不再免费提供了。</p><p>这意味着什么？如果你懂一定的相关技术，自然可以利用它的源代码自己编译一个。而如果你不懂？不好意思，那就买它吧！看看下方的价格，其实也算良心价了。</p><p><img src="'+R+'" alt="202102220930299"></p><p>当然，笔者不是来刺激你的，早就给你准备好了一份 RDM 的第三方编译版 。</p><p><img src="'+f+'" alt="202102220930399"></p><p>在 GitHub 上，这类 RDM 第三方编译版还是挺多的，你也可以自己去搜索一下。</p><p><img src="'+k+'" alt="202102220930599"></p><h2 id="下载" tabindex="-1">下载 <a class="header-anchor" href="#下载" aria-label="Permalink to &quot;下载&quot;">​</a></h2><p>笔者这里以 rdm-builder 这个 GitHub 仓库为示例，来介绍下第三方编译版的 Windows 版 RDM 下载和安装。</p><p>打开这个仓库之后，在右侧的 Releases 显示它有15个发行版，最新的是 v2021.2 版，这也是随着官方来更新的。等你看到这篇文章的时候，或许它已经变成了更新的版本。</p><p>点击最新发行版，跳转到版本下载页面。</p><p><img src="'+D+'" alt="202102220930699"></p><p>然后再点击 <code>xxx.exe</code> 即可开始下载这个第三方编译的 Windows 版 RDM 了。</p><p><img src="'+M+'" alt="202102220930799"></p><p>下载好了，一个普普通通的可执行程序。</p><p><img src="'+q+'" alt="202102220930899"></p><h2 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h2><p>接下来，我们 “傻瓜式” 安装即可。</p><p><img src="'+x+'" alt="202102220930999"></p><p><img src="'+P+'" alt="202102220931199"></p><p>改动一下安装位置，这个目录专门放开发工具，是笔者以前逐渐养成的个人习惯。</p><p><img src="'+w+'" alt="202102220931299"></p><p><img src="'+T+'" alt="202102220931399"></p><p><img src="'+C+'" alt="202102220931599"></p><p><img src="'+H+'" alt="202102220931699"></p><h2 id="连接服务器" tabindex="-1">连接服务器 <a class="header-anchor" href="#连接服务器" aria-label="Permalink to &quot;连接服务器&quot;">​</a></h2><p>安装完成后，直接打开。因为不是最新版，所以每次都会弹出这个更新提示框。别管，直接点 [OK] 就行。</p><p><img src="'+N+'" alt="202102220931799"></p><p>RDM 使用起来还是比较容易的，点击左上角的 [连接到 Redis 服务器]。</p><p><img src="'+O+'" alt="202102220931899"></p><p>进入到连接设置之后，依次填写 [连接名称，Redis 服务器地址，Redis 密码（可选），用户名（可选）]，可以先点击 [测试连接] 查看下是否可以连接成功。</p><p><img src="'+v+'" alt="202102220931999"></p><h2 id="常见使用" tabindex="-1">常见使用 <a class="header-anchor" href="#常见使用" aria-label="Permalink to &quot;常见使用&quot;">​</a></h2><p>虽然，本篇笔者重点是给你安利第三方编译的 RDM，但思来想去还是决定为部分小白们介绍一下 RDM 的简易操作，会用的老白们就不用看了。</p><h3 id="查看所有数据库" tabindex="-1">查看所有数据库 <a class="header-anchor" href="#查看所有数据库" aria-label="Permalink to &quot;查看所有数据库&quot;">​</a></h3><p>测试连接成功后，双击连接名，就可以看到当前 Redis 服务器的所有数据库。</p><p><img src="'+S+'" alt="202102220932199"></p><h3 id="存储键" tabindex="-1">存储键 <a class="header-anchor" href="#存储键" aria-label="Permalink to &quot;存储键&quot;">​</a></h3><p><img src="'+V+'" alt="202102220932299"></p><h3 id="修改值" tabindex="-1">修改值 <a class="header-anchor" href="#修改值" aria-label="Permalink to &quot;修改值&quot;">​</a></h3><p><img src="'+y+'" alt="202102220932399"></p><h3 id="修改过期时间" tabindex="-1">修改过期时间 <a class="header-anchor" href="#修改过期时间" aria-label="Permalink to &quot;修改过期时间&quot;">​</a></h3><p><img src="'+I+'" alt="202102220932599"></p><h3 id="删除键" tabindex="-1">删除键 <a class="header-anchor" href="#删除键" aria-label="Permalink to &quot;删除键&quot;">​</a></h3><p>刚才我们给 <code>name</code> 这个键设置了5秒过期之后，唯一存储的数据也没了，我们再新建一个，然后来测试一下删除功能。</p><p><img src="'+$+'" alt="202102220932699"></p><h3 id="命令行操作" tabindex="-1">命令行操作 <a class="header-anchor" href="#命令行操作" aria-label="Permalink to &quot;命令行操作&quot;">​</a></h3><p>不仅如此，当你想用命令行操作时，RDM 还可以直接打开控制台连接 Redis 服务器。</p><p><img src="'+A+'" alt="202102220932799"></p><h2 id="参考资料" tabindex="-1">参考资料 <a class="header-anchor" href="#参考资料" aria-label="Permalink to &quot;参考资料&quot;">​</a></h2><p>[1]Redis Desktop Manager 介绍：<a href="https://www.oschina.net/p/redisdesktop?hmsr=aladdin1e1" target="_blank" rel="noreferrer">https://www.oschina.net/p/redisdesktop?hmsr=aladdin1e1</a></p><p>[2]RDM GitHub 地址：<a href="https://github.com/uglide/RedisDesktopManager/" target="_blank" rel="noreferrer">https://github.com/uglide/RedisDesktopManager/</a></p><p>[3]RDM 的第三方编译版：<a href="https://github.com/FuckDoctors/rdm-builder" target="_blank" rel="noreferrer">https://github.com/FuckDoctors/rdm-builder</a></p>',59);function J(a,Q,z,G,Y,K){const o=p,i=c("ClientOnly");return s(),l("div",null,[F,d(i,null,{default:h(()=>{var t,e;return[(((t=a.$frontmatter)==null?void 0:t.aside)??!0)&&(((e=a.$frontmatter)==null?void 0:e.showArticleMetadata)??!0)?(s(),g(o,{key:0,article:a.$frontmatter},null,8,["article"])):u("",!0)]}),_:1}),E])}const L=n(B,[["render",J]]);export{Z as __pageData,L as default};
