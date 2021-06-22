# puppeteer_poster
## 概述
在微信小程序、公众号开发中，经常会遇到需要生成图片海报的功能，如果通过前端渲染海报，一是配置麻烦，其次是只能本地生成效率不高，该项目主要通过服务器启动无头浏览器来打开链接网页再截图输出图片海报。可以通过传 url 或者 html 代码和图片规格来生成图片海报。如果对图片的传输和安全有更高要求，也可以根据自身业务情况加上七牛或者阿里云 OSS，结合字符串哈希和 Redis 避免重复上传。
## step1:
确保安装了 nodejs 环境，版本最好在 v12.5.0 或者以上
## step2:
在当前项目环境下运行：npm install
安装相关依赖的库
## step3:
运行：node launch.js
启动浏览器（为了避免重复启动浏览器，改项目设计为浏览器只启动一次，每次接口通过打开新的网页窗口截图）
## step4:
打开新的命令窗口
运行: npm run dev

再打开 http://127.0.0.1:7001/?url=https://www.baidu.com&width=720&height=1280

即可直接在浏览器输出截图
## tips:
1、如果在 Linux 上遇到无法启动浏览器的问题，通常为 chrome 相关的支持库没有安装完整，你可以在 chrome 的目录下通过命令：`ldd chrome | grep not` 查看有哪些库未安装，可通过 apt 补充安装；详情查看:https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md
2、如果页面文字出现乱码，通常为服务器没有安装中文字体;
## end
如有疑问，可添加微信交流：yezhongrui