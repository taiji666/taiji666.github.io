import{_ as p,c as t,G as i,b as r}from"./chunks/framework.D5KJDRhN.js";const e=JSON.parse('{"title":"16.从 JavaScript 迁移到 TypeScript：让你的项目改头换面","description":"","frontmatter":{"title":"16.从 JavaScript 迁移到 TypeScript：让你的项目改头换面","date":"2025-02-22T00:00:00.000Z","categories":["TypeScript 入门教程"],"head":[["link",{"rel":"canonical","href":"https://www.doit.ip-ddns.com/pages/repository/编程/TypeScript 入门教程/16.从 JavaScript 迁移到 TypeScript：让你的项目改头换面"}]]},"headers":[],"relativePath":"pages/repository/编程/TypeScript 入门教程/16.从 JavaScript 迁移到 TypeScript：让你的项目改头换面.md","filePath":"pages/repository/编程/TypeScript 入门教程/16.从 JavaScript 迁移到 TypeScript：让你的项目改头换面.md","lastUpdated":1740213738000}');const c=p({name:"pages/repository/编程/TypeScript 入门教程/16.从 JavaScript 迁移到 TypeScript：让你的项目改头换面.md"},[["render",function(p,e,c,a,S,l){return r(),t("div",null,e[0]||(e[0]=[i("<p>随着教程迈入尾声，现在的你应该对 TypeScript 已不再感到陌生，而开始摩拳擦掌，准备用它大干一场。先停下你正准备新建一个 TypeScript 工程的举动！我们还有更好的方式来提升自己的 TypeScript 掌握程度，先看看你手头有没有一个由自己维护的 JavaScript 代码仓库？</p><p>对于刚完成入门阶段的同学来说，要提升实际场景中的 TypeScript 应用，自己操刀进行一次 JavaScript 到 TypeScript 的迁移，应该是效率最高的方式之一。找一个你手头由自己维护，相对熟悉的中等规模 JavaScript 代码仓库，将它一点点迁移到 TypeScript，这个过程里，你会更加清晰地感受到 JavaScript 和 TypeScript 下编程范式的差异，在实际的产品逻辑中感受 TypeScript 带来的优势。相比于新建项目的方式，你还能够避免不少陷阱：</p><p>首先，一个项目并不只是由编程语言组成，它还包括了产品规划，架构选型，代码逻辑设计等等，如果你决定完全自己一手包办，那编写的重心就不可能放在 TypeScript 身上，而是需要花费额外的精力来考虑其它因素。其次，即使你接下来恰好要从零开发一个新项目，产品和架构都会由其它人给你设计好，在编码过程中，由于你才半只脚迈出新手村，很容易陷入“这里不太清楚怎么用 TypeScript 的方式来写...，先用 JavaScript 代替一下吧”的陷阱里，导致代码质量可能还不如此前你已经非常熟练的 JavaScript。</p><p>而将一个 JavaScript 项目迁移到 TypeScript 的过程中，你可以很好地避免这些问题，专注于 TypeScript 本身的逻辑编写。同时，由于你对这个项目原本的脉络已经相当熟悉，包括其中的各种数据与状态，因此在编写类型时也可以更加得心应手。</p><p>但要注意的是，从 JavaScript 到 TypeScript 的迁移也是有技巧的，可不能直接盲干，这里我们介绍一个推荐的迁移方案与它的步骤组成，供你作为实践的参考：</p><ul><li>首先，基于项目规模，设计迁移顺序。</li></ul><p>根据项目规模的不同，你可以考虑「全量迁移」与「渐进迁移」两个方案。注意，全量迁移并不是说空出一个月时间专门做 TS 的迁移，而是先将所有的 JS 文件改成 TS 文件，先享受到 TypeScript 的完整类型检查能力，但实际的迁移工作还没开始。而渐进迁移则是说，你可以每个月抽一周时间来搞迁移，比如说这次想改 <code> &lt;UserProfile ``/&gt;</code> 组件，就把这个组件文件后缀改成 <code>.tsx</code>，然后必须完成文件内的所有类型迁移。而对于渐进迁移，你也可以通过启用 allowJs 与 checkJs 配置，来先使用一部分类型检查能力。</p><p>这两种方案可以根据你对项目规模的定义来选择，如果你认为这个项目还是比较庞大的，你担心牵一发动全身，那就可以选择渐进迁移。反之，如果你觉得你能 hold 住，那么完全可以一步到位！</p><ul><li>谨记，不要发生逻辑重构，只做类型的补充。不要发生技术栈的替换，只做类型包的补充。</li></ul><p>在迁移过程中的一个大忌就是，你明明只应该补充下类型，却觉得原来的逻辑不顺眼直接顺手改掉了，或者感觉使用的 npm 包太老，顺手替换了个更潮流的包。千万不要这么做！否则如果迁移过程中哪里出现了问题，为了定位问题根源，大概率你又要将它们回退回去，甚至包括一些无辜的类型代码...，简直就是在给你自己增加工作量了。</p><p>每次迁移应该是纯粹的，在针对 TypeScript 类型的迁移过程中，不要修改任何有关逻辑的部分，计算你实在忍不住，也只能标个 TODO，下次再发起个针对逻辑优化的重构吧。</p><ul><li>编码工作的第一步，一定是尽可能补充类型定义。</li></ul><p>迁移的第一步，一定是基于项目的数据补充类型定义，比如页面组件的状态、接口的响应、枚举、全局状态等等等等。为什么？TypeScript 再智能，也不可能为你自动补全这些类型，而没有这些类型，它的能力就是相当局限的。大部分地方会被推断为 any / unknown 类型，导致类型检查基本失效了。只有你先完善了项目的整个类型体系，才能在后面的重构过程中，不断得到来自类型的提示与警告，从而“安全”地完成迁移流程。</p><p>同时最开始的类型补充可以是粗糙的，到处复制粘贴也没问题，毕竟你不能未卜先知哪些类型是有关联的。但随着迁移的进行，这些类型定义应该是要被不断完善，慢慢关联起来，编织成一张类型大网的。</p><ul><li>先迁移通用工具方法，再迁移前端组件。</li></ul><p>完成类型定义补充后，你应该首先完善项目中那些工具方法，因为正常情况下，大部分的数据变化都发生在工具方法中，完成了对这些工具方法的入参与出参的定义后，所有引用了它们的组件都能从中受益。但这一步往往也需要一定时间，毕竟在数据变化的过程中你很容易发现到处都是 TS 类型报错，如果你希望更快一点点，也可以仅仅完成出入参类型的明确，对于过程中的类型日后再来完善。</p><ul><li>通用类型定义的沉淀</li></ul><p>如果这个项目其实是一套产品的一部分，那么推荐你可以有意识地标记那些可提供给其它项目复用的类型，并将它们的类型定义尽可能完善。这样一来，以后就算你是直接复制粘贴，也能省下一笔功夫了。</p><p>总结一下，就是这么几点：选择合适的迁移方案、避免发生逻辑改动、优先补充类型定义与完善工具方法以及有意识地沉淀通用的类型定义。使用这一套组合拳，能让你的迁移过程更加合理与稳定，同时也能帮助你更好地磨炼自己的技巧。</p>",19)]))}]]);export{e as __pageData,c as default};
