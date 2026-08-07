---
name: frontend-polish
description: 按 OPC 项目设计系统打磨前端 UI(Tailwind v4 + Astro)。用于任何页面/组件的视觉修改、响应式检查、可访问性打磨。设计令牌与规范见项目根目录 DESIGN.md(cohere/DESIGN.md 为源文件)。改 UI 前必须先读本 skill 与 DESIGN.md。
---

# 前端打磨规范(OPC 社区)

本项目的设计系统来源:`DESIGN.md`(getdesign 生成的 Cohere 设计语言分析,已按 OPC 品牌做"暖化"定制)。
任何 UI 改动都必须遵循它,不要凭个人偏好引入新样式。

## 1. 设计令牌(只准用这些,禁止硬编码 hex)

定义在 `src/styles/global.css` 的 `@theme` 中:

| Token | 值 | 用途 |
|---|---|---|
| paper | #fdfcfa | 暖白画布(Cohere 纯白 + 一点暖,抵消企业感) |
| ink | #17171c | 标题/正文主色 |
| muted / muted-soft | #75758a / #93939f | 次级文字 |
| line / line-soft | #e3e0da / #f2f2f2 | 暖 hairline 边框/分隔 |
| accent / accent-active | #17171c / #000000 | 主按钮(近黑 pill) |
| accent-soft | #fff1ec | 极淡珊瑚底(提醒条/强调底) |
| surface-card | #eeece7 | stone 卡片底 |
| surface-warm | #fbf3ee | 极暖淡色带(部分 section 背景,如"泼冷水") |
| surface-dark | #003c33 | 深绿黑全宽带 |
| on-dark / on-dark-soft | #ffffff / #a8c8bf | 深色带文字 |
| coral | #e8663f | 小点缀(见下) |
| action-blue | #1863dc | 仅链接与表单聚焦环 |

**珊瑚 `coral` 的允许清单(稀缺,别滥用):**
- 章节编号 `/01`、眉题(mono-eyebrow)、大引言、QuoteBlock 左线、EventCard 阶段标签、"49 元"类关键强调、导航当前页下划线
- 禁止:议程时间、表格值、普通标签(用 muted/ink)、大面积背景、主按钮

**其他纪律:**
- 禁止把 action-blue 用于非链接元素
- 不引入第四个彩色系统
- 不用阴影做层级(色块优先)

## 2. 排版(Cohere monumental display + 中文适配)

- 标题:`display-xl` / `display-lg` / `display-md`(衬线 500 + 负字距 + 紧行高)。**不要用 font-bold/600**(品牌 Logo 除外)
- 正文:无衬线 400;日期/时间/编号用等宽 `font-mono`
- 眉题小字:`.mono-eyebrow`
- **中文字体**:系统栈(Songti SC → Noto Serif SC → Source Han Serif SC → SimSun)。
  Windows 无 Songti,会落到 SimSun——可接受;如需统一体验,后续自托管 Noto Serif SC 子集(注意国内不能用 Google Fonts,需自托管或国内 CDN)
- 大引言(pull-quote):display-* 字体 + 珊瑚引号,用于声音区块首条

## 3. 组件模式

- **主按钮**:`.btn-primary`(近黑 pill);深色带上用 `.btn-on-dark`(白 pill)
- **次按钮**:`.btn-secondary` / `.btn-on-dark-link`(下划线文字链接)
- **卡片**:stone 卡 `bg-surface-card` + `rounded-lg`(8px)
- **列表**:优先"规则线分隔行"(`border-t border-line`);声音区块用"首条大引言 + 其余双栏规则行"
- **CTA 带**:页面收尾深绿黑全宽带 `bg-surface-dark`,白色 pill + 白文字链接
- **插画**:`HeroMark.astro`(细线星座,中心"一个人"连产品/用户/客户/伙伴)——不要替换成照片风插画

## 4. 图片规范(用户提供真实照片后)

- 真实活动照片放 `src/assets/`(需建目录),目前全站无照片,用 HeroMark 线条插画代替
- 接入照片时:保持 stone 卡圆角(8px)、不加重阴影;照片必须压缩(目标 < 150KB)
- 不要从外部热链图片(国内访问不稳)

## 5. 打磨 QA 清单(每次改完必须过一遍)

1. **令牌**:grep 无硬编码 hex、无 `bg-white/50`、无 `font-semibold`(品牌名除外)
2. **珊瑚纪律**:检查新增 coral 用法是否在允许清单内
3. **响应式**:375px / 768px / 1440px 三档;检查 flex-wrap 是否漏
4. **可访问性**:链接/按钮有 focus-visible(global.css 已全局加,别覆盖掉);muted 只用于次要文字
5. **状态**:hover 不改变布局(不位移,只改色/透明度)
6. **动效**:尊重 prefers-reduced-motion(global.css 已处理)
7. **一致性**:章节标题都用 display-* 系列;眉题都用 mono-eyebrow
8. **构建**:`pnpm build` 无错误;`pnpm preview` 本地预览

## 6. 工作流

```bash
pnpm build          # 构建
pnpm preview        # 预览(默认 4321,端口被占会自动递增)
google-chrome --headless --disable-gpu --screenshot=/tmp/qa.png --window-size=1440,3000 http://localhost:PORT/
```

截图可检查布局,但最终以用户浏览器反馈为准。

## 7. 内容约定

- 城市信息只改 `src/data/site.ts`,不动页面
- 表单端点只改 `src/data/site.ts` 的 formEndpoint(**当前为空,报名未接后端**)
- 文案引用必须注明出处(见 docs/03-copy.md),不编造
