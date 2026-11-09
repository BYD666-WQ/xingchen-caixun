# 星辰彩讯 · 静态部署包

## 直接托管
把这个目录整个上传到任意静态托管（GitHub Pages / Netlify / Vercel / 宝塔 / Nginx）即可。
入口文件：index.html

## 数据
- 页面只读本地文件：assets/js/draw-data.js（实时数据）、assets/js/data-status.js（状态）、assets/js/draw-sample.js（样本）
- 不依赖任何后端、不直连任何第三方站点
- 更新数据：覆盖 assets/js/draw-data.js + data/draw.json 两个文件即可（或用同目录的更新脚本重新生成）

## 注意
- 站点为纯静态，无登录/支付/下注功能
- 品牌名与 logo 为占位（星辰彩讯），等正式素材替换
