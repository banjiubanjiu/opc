# 让大陆用户访问网站(免备案)照抄指南 — Cloudflare 全家桶方案

> 原理:Cloudflare 的 `pages.dev` 默认域名和默认 anycast 节点在大陆不稳/被墙。
> 解法:**域名在 Cloudflare 买 + Cloudflare Pages 托管 + 优选 IP**——用户解析到 Cloudflare 香港/日本/新加坡的"优选 IP"(没被墙、速度快),请求直接落在 CF 边缘缓存,无需回源。
> 全程免备案,只有一个平台,手工操作约 **10~15 分钟**。花钱只有域名(约 ¥10~70/年)。

---

## 第 0 步:准备工作(2 分钟)

- 一个邮箱(注册 Cloudflare 用)
- 支付宝或信用卡(买域名)
- 你国内日常用的电脑(测优选 IP 用,见第 5 步)

---

## 第 1 步:买域名(5 分钟)

在 **Cloudflare 买**(买完自动托管 DNS,省掉一切 NS 配置):

1. 打开 <https://dash.cloudflare.com> 注册账号(邮箱+密码)
2. 左侧 **Domain Registration → Register Domains**
3. 搜便宜域名:`.xyz` 约 ¥10~30/年,`.com` 约 ¥60/年
4. 支付宝付款
5. 完成 ✅

> 备选:Namesilo(支付宝、免实名,但要手动把 NS 改成 Cloudflare 的)。
> ⚠️ 别在阿里云/腾讯云买,要身份证实名,麻烦。

---

## 第 2 步:部署到 Cloudflare Pages(5 分钟)

### 方式 A:连接 GitHub(以后 push 自动部署,推荐)

1. Cloudflare 控制台 → **Workers & Pages → Create → Pages → Connect to Git**
2. 授权 GitHub,选 `opc-community` 仓库
3. 构建配置:
   - Framework preset: **Astro**
   - 构建命令:`pnpm build`
   - 输出目录:`dist`
4. 点 **Save and Deploy**,等 1~2 分钟,得到 `xxx.pages.dev` 地址(先别管它,大陆打不开是正常的)

### 方式 B:命令行部署(不用连 Git,手动上传)

```bash
# 在本项目目录(已装好 wrangler)
pnpm wrangler login        # 会弹出浏览器,授权一次即可
pnpm build                 # 构建
pnpm wrangler pages deploy dist --project-name=opc-community
```

---

## 第 3 步:绑定你的域名(3 分钟)

1. Cloudflare → **Workers & Pages → 你的 Pages 项目 → Custom domains**
2. **Set up a custom domain**,输入 `example.com`,点继续
3. 弹窗问"是否自动创建 DNS 记录"——**选"是"**(它会创建 CNAME 指向 pages.dev)
4. 重复一次添加 `www.example.com`
5. 两个域名状态变 **Active** 即可

> 注意:此时 DNS 记录是 CNAME(指向 pages.dev),先别删,下一步我们会改成优选 IP。

---

## 第 4 步:换用优选 IP(3 分钟)

1. 先测出优选 IP(见第 5 步),记下 2~3 个
2. Cloudflare → **DNS → Records**,把第 3 步自动创建的两条 CNAME **改成**:
   - `@` → 类型 `A` → 优选IP → **代理状态:开启(橙色云朵)** ✅
   - `www` → 类型 `A` → 优选IP → **代理状态:开启(橙色云朵)** ✅
3. Pages 绑定域名后,即使 DNS 是 A 记录指向 CF 边缘,CF 也会按域名内部路由到你的 Pages 项目——所以 A 记录完全没问题

---

## 第 5 步:测优选 IP(1 分钟,必须在你自己的网络下跑)

> ⚠️ 一定在**你国内日常用的电脑/手机上跑**,别在服务器上跑(服务器测的结果对大陆无参考价值)。

- **Windows**:打开 <https://github.com/XIU2/CloudflareSpeedTest/releases> 下载 `CloudflareST_windows_amd64.zip`,解压,双击 `CloudflareST.exe`,等 1~2 分钟跑完,打开同目录 `result.csv`,取**平均延迟最低**的 2~3 个 IP
- **Mac**:下载 `CloudflareST_darwin_amd64.tar.gz`,解压后终端运行 `./CloudflareST`
- 嫌麻烦可先搜"Cloudflare 优选 IP 2026"用现成列表,但时效性无法保证,建议自己跑

---

## 第 6 步:验证 + 收尾(2 分钟)

1. 浏览器(断开代理)访问 `https://www.example.com`,能打开且 HTTPS 正常即成功
2. 让外地的朋友也试试
3. 之后每次 `git push` 到 main,Pages 自动重新构建部署,无需再操作

---

## 常见问题

| 现象 | 原因 | 解决 |
|---|---|---|
| 打不开/转圈 | 优选 IP 失效或该地区仍被墙 | 重新跑第 5 步换 IP(通常几个月一次) |
| 移动宽带仍慢/不通 | 移动对 CF 拦截更严 | 换移动友好的 IP;或换香港轻量服务器 |
| 自定义域名一直 Pending | 绑定流程没走完 | 检查 DNS 记录是否开橙云、是否 Active |
| 改了 A 记录后打不开 | 忘了开橙色云朵 | DNS 记录必须开代理(橙云) |

---

## 如果还是不满足(花钱但最稳)

**香港轻量服务器 + IP 直连**(腾讯云/阿里云香港,约 ¥40~70/月):

- 不用域名、不用备案,`pnpm build` 后把 `dist/` 上传,nginx 一跑即可
- 大陆 ping 30~50ms,比走 CF 更稳
- 适合对稳定性要求高的正式上线场景
