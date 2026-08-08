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
| paper | #faf9f5 | 暖奶油画布(Claude) |
| ink | #141413 | 标题/正文主色(暖墨) |
| muted / muted-soft | #6c6a64 / #8e8b82 | 次级文字(暖棕灰) |
| line / line-soft | #e6dfd8 / #ebe6df | hairline 边框/分隔 |
| accent / accent-active | #cc785c / #a9583e | **珊瑚:主 CTA + 强调(Claude 标志性)** |
| accent-soft | #f5e9e3 | 淡珊瑚底 |
| surface-card | #efe9de | 奶油卡 |
| surface-warm | #f5f0e8 | 暖淡色带(如"泼冷水") |
| surface-dark | #181715 | 暖黑深色带(收尾 + 页脚) |
| on-dark / on-dark-soft | #faf9f5 / #a09d96 | 深色带文字 |
| coral | #cc785c | = accent 语义别名 |
| accent-teal | #5db8a6 | 备用次级点缀(暂不用) |

**调色板纪律:Claude 配色(暖奶油 + 珊瑚 + 暖黑深色)**
- 主 CTA 用珊瑚(按钮、"加入社区"、提交);hover 用 accent-active #a9583e
- 深色收尾(CTA 带 + 页脚)用暖黑 #181715,不用冷色
- 文字灰用暖棕灰,不用冷 slate;无蓝色(链接/聚焦环用珊瑚)
- 不引入第四个彩色系统

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

## 4. HeroUI 集成(仅报名表单用)

- 组件:`src/components/react/SignupForm.tsx`(React island,`client:load`),仅用于 /signup/ 与活动详情页
- **样式按需引入**(global.css):只 import button/input/textfield/textarea/select/popover/list-box 等用到的 css + base + theme + utilities + variants。**不要改回 `@import "@heroui/styles"`**(全量会把 CSS 从 97KB 撑到 418KB)
- 主题对齐:global.css 的 `:root` 覆盖 `--accent`(暖黑 #1c1917)、`--field-border`、`--radius` 等;`.button` 强制 pill 圆角;HeroUI 的 `--muted` 也用暖灰褐 #82766c
- JSX 编译:astro.config.mjs 已设 `esbuild.jsx='automatic'`(否则报 React is not defined)
- 表单数据流:FormData → `site.formEndpoint`(POST JSON);为空时 console.log,不阻塞报名意向
- 体积现状:报名页按需加载 ~400KB JS(React DOM + HeroUI);首页零 React。后续可拆单组件包减小

## 5. 图片规范(用户提供真实照片后)

- 真实活动照片放 `src/assets/`(需建目录),目前全站无照片,用 HeroMark 线条插画代替
- 接入照片时:保持 stone 卡圆角(8px)、不加重阴影;照片必须压缩(目标 < 150KB)
- 不要从外部热链图片(国内访问不稳)

## 6. 打磨 QA 清单(每次改完必须过一遍)

1. **令牌**:grep 无硬编码 hex、无 `bg-white/50`、无 `font-semibold`(品牌名除外)
2. **珊瑚纪律**:检查新增 coral 用法是否在允许清单内
3. **响应式**:375px / 768px / 1440px 三档;检查 flex-wrap 是否漏
4. **可访问性**:链接/按钮有 focus-visible(global.css 已全局加,别覆盖掉);muted 只用于次要文字
5. **状态**:hover 不改变布局(不位移,只改色/透明度)
6. **动效**:尊重 prefers-reduced-motion(global.css 已处理)
7. **一致性**:章节标题都用 display-* 系列;眉题都用 mono-eyebrow
8. **构建**:`pnpm build` 无错误;`pnpm dev`(4321,可能已有常驻 dev 服务器)或 `pnpm preview` 预览
9. **HeroUI**:不要引入未按需 import 的组件 css;新组件(Modal/Toast 等)需同步加对应 css import

## 7. 工作流

```bash
pnpm build          # 构建
pnpm dev            # 开发(带热重载,本机常驻 4321)
pnpm preview        # 构建后预览(端口被占会自动递增)
```

## 8. 内容约定

- 城市信息只改 `src/data/site.ts`,不动页面
- 表单端点只改 `src/data/site.ts` 的 formEndpoint(**当前为空,报名未接后端**)
- 文案引用必须注明出处(见 docs/03-copy.md),不编造
