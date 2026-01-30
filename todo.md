帮我处理以下事项：

1. 目前 apps/www/registry/wuhan/blocks/dynamic-form 这里都放的是一些原语

   然后现在新建了 apps/www/registry/wuhan/composed 这样组合的一个文件夹专门负责维护一些拼合好的组件，开发者可以拿过来直接用
   dynamic-form 拼合好的一个组件目前写到 apps/www/registry/wuhan/examples/dynamic-form/dynamic-form-core 这个文件夹下面了
   请帮我把这个组件，迁移到 apps/www/registry/wuhan/composed 下面，文件夹就叫 dynamic-form 然后做好注册工作，同时注意一定要维护好 registryDependencies， 这是关键。

2. 总结一下就是  
   apps/www/content/docs/blocks 负责维护原语， 
   apps/www/registry/wuhan/composed 负责维护拼合好的组件
   
   然后 apps/www/content/docs/blocks 这里维护的文档中，尤其是要注意Installation，
   重要的是 npx shadcn@latest add http://localhost:3000/r/wuhan/attachment-list-01.json 这个路径中 “/r/wuhan/“ 后面的 json 名称。
   如果原语组件有对应的拼合好的组件，那么在注册拼合组件的时候，apps/www/registry/wuhan/composed/_registry.ts 中的name，就是这个 json 名称。
   这样用户在安装原语组件的时候，在安装拼合组件的时候，又因为registryDependencies中包含了原语组件，所以会自动安装原语组件。

   以上内容也可以维护到 apps/www/docs/component-development-guide.md 这里

3. 然后就是 丰富一下 apps/www/content/docs/blocks/task-list.mdx 以及 apps/www/content/docs/blocks/dynamic-form.mdx 这两个文档
   这里其实就是要规定好文档该怎么写，基本上可以参考 apps/www/content/docs/blocks/thinking-process.mdx 这个文档的写法
   主要是要包含以下几个部分：
    - Overview (概述)
    - Quick Start (快速开始)
    - Features (功能)
    - Installation (安装)
    - Examples (示例) 这里需要明确一下，就是原语层，出一个例子就行，因为都是样式结构，没有任何行为逻辑。拼合好的组件，这里可以多出几个例子，展示不同的使用场景。
    - API Reference (API参考) 这里也需要像 apps/www/content/docs/blocks/thinking-process.mdx 这样写

    至于 Usage 、Behavior Spec 都不要

    然后把这些内容补充完整之后，记得同步更新到 apps/www/docs/component-development-guide.md 这里，说明文档该怎么写