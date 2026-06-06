# 项目设置指南

## 修复注册功能 "Failed to fetch" 错误

### 问题原因
注册功能使用 **Supabase** 进行身份验证，但缺少 Supabase 的配置凭证。

### 解决方案

#### 步骤 1: 创建 Supabase 项目
1. 访问 [Supabase](https://supabase.com) 并注册账户
2. 创建一个新项目
3. 在项目设置中找到 **API** 页面
4. 复制以下两个值：
   - `Project URL` (例如: `https://xxxxx.supabase.co`)
   - `anon public` key (以 `eyJ...` 开头)

#### 步骤 2: 创建 .env 文件
在项目根目录创建 `.env` 文件：

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**注意**: 将 `your-project-id.supabase.co` 和 `your-anon-key-here` 替换为你在步骤 1 中复制的实际值。

#### 步骤 3: 配置 Supabase 数据库

在 Supabase 仪表板中执行以下 SQL 来创建必要的表：

```sql
-- 创建用户表
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  username TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建课程表
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  language TEXT NOT NULL,
  level TEXT,
  duration INTEGER,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建进度表
CREATE TABLE progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  course_id UUID REFERENCES courses(id),
  completed_lessons INTEGER DEFAULT 0,
  total_lessons INTEGER DEFAULT 0,
  study_time INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建成就表
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  unlocked_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建帖子表
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  content TEXT NOT NULL,
  language TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 启用实时订阅（可选）
ALTER PUBLICATION supabase_realtime ADD TABLE posts;
```

#### 步骤 4: 配置 Supabase 身份验证

1. 在 Supabase 仪表板中，进入 **Authentication** > **Settings**
2. 确保 **Email** 身份验证已启用
3. 在 **Site URL** 中填写你的应用地址（例如: `http://localhost:5173`）
4. 保存设置

#### 步骤 5: 重启开发服务器

```bash
# 停止当前运行的服务器 (Ctrl+C)

# 重新启动
npm run dev
```

### 验证修复

1. 访问注册页面 (`/auth/register`)
2. 填写表单并提交
3. 如果配置正确，应该能够成功注册或看到 Supabase 的邮箱验证提示

### 常见问题

**Q: 仍然看到 "Failed to fetch" 错误**
- 检查 `.env` 文件是否在项目根目录
- 确保 Supabase URL 和 key 正确无误
- 重启开发服务器

**Q: 收到 CORS 错误**
- 在 Supabase 仪表板的 Authentication > Settings 中，添加你的域名到 **Redirect URLs** 列表
- 对于本地开发，添加 `http://localhost:5173`

**Q: 邮箱验证邮件没有收到**
- 检查垃圾邮件文件夹
- 在 Supabase 仪表板查看邮件日志
- 确保邮箱服务商允许来自 Supabase 的邮件

### 下一步

- 配置生产环境的 Supabase 凭证
- 部署到 Vercel 并配置环境变量
- 自定义邮件模板和验证页面
