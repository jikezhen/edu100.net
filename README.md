# Edu100.net

基于 [Payload CMS 3](https://payloadcms.com) + [Next.js 15](https://nextjs.org) + [Cloudflare D1](https://developers.cloudflare.com/d1/) 的教育内容管理系统。

## 项目状态

| 模块 | 状态 |
|------|------|
| CMS 内容模型（用户/分类/文章/课程/站点设置） | ✅ 已完成 |
| 管理后台 `/admin` | ✅ 已完成 |
| 前端网站（首页/课程/文章） | ✅ 已完成 |
| 数据库迁移 | ✅ 已生成 |
| 本地开发 & 构建 | ✅ 已验证 |
| Cloudflare 生产部署 | ⏸ 暂未部署（按需求保留本地完成状态） |

## 功能概览

### 内容集合

- **Users** — 用户认证，角色：`admin` / `editor`
- **Categories** — 分类（文章 / 课程）
- **Posts** — 教育文章，支持富文本、封面图 URL、发布状态
- **Courses** — 课程，含难度、课时、价格、讲师等字段

### 全局配置

- **Site Settings** — 站点名称、标语、首页文案、联系邮箱、页脚文字

### 前端页面

| 路径 | 说明 |
|------|------|
| `/` | 首页（精选课程 + 最新文章） |
| `/courses` | 课程列表 |
| `/courses/[slug]` | 课程详情 |
| `/posts` | 文章列表 |
| `/posts/[slug]` | 文章详情 |
| `/admin` | Payload 管理后台 |

## 快速开始

### 1. 安装依赖

```bash
npm install --legacy-peer-deps
```

### 2. 配置环境变量

```bash
cp .env.example .env
```

编辑 `.env`，设置 `PAYLOAD_SECRET`（可用 `openssl rand -hex 32` 生成）。

### 3. 登录 Cloudflare（本地 D1 代理需要）

```bash
npx wrangler login
```

### 4. 运行数据库迁移

```bash
npx payload migrate
```

### 5. 启动开发服务器

```bash
npm run dev
```

访问：

- 前端：http://localhost:3000
- 管理后台：http://localhost:3000/admin

首次访问 `/admin` 时创建管理员账号。

## 常用命令

```bash
npm run dev              # 本地开发
npm run build            # 生产构建
npm run generate:types   # 生成 Payload 类型
npm run generate:importmap  # 生成 Admin import map
npm run test             # 运行测试
npx payload migrate:create  # 创建新迁移（schema 变更后）
```

## Cloudflare 配置

`wrangler.jsonc` 中已配置：

- Worker 名称：`edu100-payload`
- D1 数据库：`edu100-payload-db`
- 数据库 ID：`56657a5f-d4c4-479b-babb-ba984dca1879`

### 部署（暂未执行）

确认需要上线时，执行：

```bash
npx wrangler login
export CLOUDFLARE_ENV=production
npm run deploy
```

部署前请确保：

1. Cloudflare 账户已绑定 D1 数据库
2. 已在 Cloudflare Dashboard 设置 `PAYLOAD_SECRET` 环境变量
3. 如需文件上传，需额外配置 R2 存储桶

## 技术栈

- **CMS**: Payload 3.77 + Lexical 富文本编辑器
- **框架**: Next.js 15 (App Router)
- **数据库**: Cloudflare D1 (SQLite)
- **部署适配**: @opennextjs/cloudflare

## 注意事项

- 封面图当前使用 **外链 URL** 字段，未启用 R2 文件上传（避免额外付费依赖）
- 本地 `npm run build` 已配置为不依赖 Cloudflare 远程登录
- 生产环境 Worker 有 3MB 体积限制，建议使用 Paid Workers 计划

## 仓库

https://github.com/jikezhen/edu100.net
