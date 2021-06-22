const Controller = require('egg').Controller;
const crypto = require('crypto');
const fs = require('fs')
const puppeteer = require('puppeteer')

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    const { html } = ctx.request.body
    const { width } = ctx.request.query
    const { height } = ctx.request.query
    let { url } = ctx.request.query
    // console.log(ctx.request.header.host)
    // this.ctx.body = url
    if(html) {
      const htmlKey = crypto.createHash('sha256').update(html + width + height).digest('hex')
      fs.writeFile("app/public/html/"+htmlKey+".html", html, function(err) {
          if(err) {
              return console.log(err);
          }
      });
      url = "http://"+ctx.request.header.host+"/public/html/"+htmlKey+".html"
    }
    const urlKey = crypto.createHash('sha256').update(url + width + height).digest('hex')

    // 判断文件是否已存在本地
    const posterImage = "poster_image/" + urlKey + ".png";
    

    try {
      fs.accessSync(posterImage, fs.constants.F_OK);
      console.log(posterImage)
      ctx.set('content-type','image/jpeg')
      ctx.body = fs.createReadStream(posterImage);
      return;
    } catch (err) {
      console.error(err);
      console.error('no access!');
    }

    console.log(111111111)

    // 避免重复启动浏览器
    const getWSAddress = ()=>new Promise(resolve => {
        fs.readFile('wsa.txt', {flag: 'r+', encoding: 'utf8'}, function (err, data) {
            if(err) {
                console.error(err);
                return;
            }
            resolve(data);
        });
    });

    const wsa = await getWSAddress();
    const browserConfig={
        browserWSEndpoint :wsa
    };

    // 从已经启动的浏览器中打开新的网页标签
    const browser= await puppeteer.connect(browserConfig);
    const page = await browser.newPage()

    // 设置页面大小，以手机模式浏览
    const Android = {
      'name': 'Galaxy S5', //设备名
      'userAgent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36', //UA
      'viewport': {
        'width': width / 2,//屏幕宽度
        'height': height / 2,//屏幕高度
        'deviceScaleFactor': 2,//缩放比例
        'isMobile': true,//是否是移动设备
        'hasTouch': false,//是否支持touch事件
        'isLandscape': false//是否横屏
      }
    }
    await page.emulate(Android)

    // 加载完成后才显示
    await page.goto(url, {
      waitUntil: 'networkidle0'
    })

    // 保存图片到本地
    await page.screenshot({path: posterImage})

    // 关闭标签
    await page.close()

    // 输出图片流
    ctx.set('content-type','image/jpeg')
    ctx.body = fs.createReadStream(posterImage);
  }
}

module.exports = HomeController;