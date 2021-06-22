# puppeteer_poster
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

## end
如有疑问，可添加我微信：yezhongrui