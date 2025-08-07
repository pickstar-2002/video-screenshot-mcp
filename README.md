# 📸 Video Screenshot MCP

[![npm version](https://badge.fury.io/js/@pickstar-2002%2Fvideo-screenshot-mcp.svg)](https://badge.fury.io/js/@pickstar-2002%2Fvideo-screenshot-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

> 🎯 基于 MCP (Model Context Protocol) 协议的专业视频截图工具，提供灵活、高效的视频帧提取能力

## ✨ 功能特性

- 🎯 **单帧截图**: 在指定时间点精确截取视频单帧画面
- 📸 **批量截图**: 按固定时间间隔自动批量截取视频画面
- 🎨 **多格式支持**: 支持输出 JPG、PNG、WebP 等多种图片格式
- 📐 **自定义分辨率**: 可自定义输出截图的分辨率和质量
- 📊 **视频信息**: 获取视频详细信息（时长、分辨率、帧率等）
- ✅ **文件验证**: 智能验证视频文件有效性
- 🚀 **开箱即用**: 所有依赖已内置，无需额外配置环境

## 🎬 支持的视频格式

- **MP4** (.mp4) - 推荐格式
- **AVI** (.avi)
- **MOV** (.mov)
- **MKV** (.mkv)
- **WMV** (.wmv)
- **FLV** (.flv)
- **WebM** (.webm)
- **M4V** (.m4v)

## 📦 安装

### 推荐方式（使用最新版本）

```bash
npx @pickstar-2002/video-screenshot-mcp@latest
```

### 全局安装

```bash
npm install -g @pickstar-2002/video-screenshot-mcp@latest
```

## 🚀 使用方法

### 在 AI 工具中配置

#### Claude Desktop

在 `claude_desktop_config.json` 中添加：

```json
{
  "mcpServers": {
    "video-screenshot": {
      "command": "npx",
      "args": ["@pickstar-2002/video-screenshot-mcp@latest"]
    }
  }
}
```

#### Cursor

在 `.cursorrules` 或项目配置中添加：

```json
{
  "mcpServers": {
    "video-screenshot": {
      "command": "npx",
      "args": ["@pickstar-2002/video-screenshot-mcp@latest"]
    }
  }
}
```

#### 其他支持 MCP 的 IDE

参考各 IDE 的 MCP 配置文档，使用以下命令：

```bash
npx @pickstar-2002/video-screenshot-mcp@latest
```

## 🛠️ API 工具

### 1. get_video_info

获取视频文件的详细信息

**参数:**
- `videoPath` (string): 视频文件路径

**示例:**
```json
{
  "videoPath": "/path/to/video.mp4"
}
```

**返回:**
```json
{
  "success": true,
  "data": {
    "duration": 120.5,
    "width": 1920,
    "height": 1080,
    "fps": 30,
    "format": "mp4",
    "size": 52428800,
    "formattedDuration": "2:00.500"
  }
}
```

### 2. take_screenshot

在指定时间点截取视频单帧画面

**参数:**
- `videoPath` (string): 视频文件路径
- `timestamp` (number): 截图时间点（秒）
- `outputPath` (string): 输出文件路径
- `format` (string, 可选): 输出格式 (jpg/png/webp)，默认 jpg
- `quality` (number, 可选): 图片质量 (1-100)，默认 90
- `width` (number, 可选): 输出宽度
- `height` (number, 可选): 输出高度

**示例:**
```json
{
  "videoPath": "/path/to/video.mp4",
  "timestamp": 30.5,
  "outputPath": "/path/to/screenshot.jpg",
  "format": "jpg",
  "quality": 95,
  "width": 1920,
  "height": 1080
}
```

### 3. batch_screenshot

按固定时间间隔批量截取视频画面

**参数:**
- `videoPath` (string): 视频文件路径
- `interval` (number): 截图时间间隔（秒）
- `startTime` (number, 可选): 开始时间（秒），默认 0
- `endTime` (number, 可选): 结束时间（秒），默认视频结束
- `maxCount` (number, 可选): 最大截图数量
- `outputDir` (string, 可选): 输出目录，默认 ./screenshots
- `prefix` (string, 可选): 文件名前缀，默认 screenshot
- `format` (string, 可选): 输出格式，默认 jpg
- `quality` (number, 可选): 图片质量，默认 90
- `width` (number, 可选): 输出宽度
- `height` (number, 可选): 输出高度

**示例:**
```json
{
  "videoPath": "/path/to/video.mp4",
  "interval": 10,
  "startTime": 0,
  "endTime": 120,
  "maxCount": 20,
  "outputDir": "./screenshots",
  "prefix": "frame",
  "format": "png",
  "width": 1280,
  "height": 720
}
```

### 4. validate_video

验证视频文件是否有效且支持处理

**参数:**
- `videoPath` (string): 视频文件路径

**示例:**
```json
{
  "videoPath": "/path/to/video.mp4"
}
```

## 🎯 应用场景

### 📋 内容审核
每隔5秒截取一帧，用于内容审核：

```json
{
  "videoPath": "/content/video.mp4",
  "interval": 5,
  "outputDir": "./audit_frames",
  "prefix": "audit",
  "format": "jpg",
  "quality": 80
}
```

### 🖼️ 封面生成
在视频的关键时间点截取高质量封面：

```json
{
  "videoPath": "/content/video.mp4",
  "timestamp": 15,
  "outputPath": "./covers/thumbnail.jpg",
  "format": "jpg",
  "quality": 95,
  "width": 1920,
  "height": 1080
}
```

### 🎞️ 视频预览
生成视频预览图集：

```json
{
  "videoPath": "/content/video.mp4",
  "interval": 30,
  "maxCount": 12,
  "outputDir": "./preview",
  "prefix": "preview",
  "format": "webp",
  "width": 640,
  "height": 360
}
```

## 🔧 疑难解答

### ❌ 常见问题

#### 问题 1: `Connection closed` 错误

**原因**: 通常由 `npx` 缓存问题导致，可能使用了过期的版本。

**解决方案**:

1. **🎯 首选方案**: 确认使用了 `@latest` 标签
   ```bash
   npx @pickstar-2002/video-screenshot-mcp@latest
   ```

2. **🔄 备用方案**: 锁定到特定稳定版本
   ```bash
   npx @pickstar-2002/video-screenshot-mcp@1.0.0
   ```

3. **🧹 终极方案**: 清理 `npx` 缓存
   ```bash
   # 清理特定包缓存
   npm cache clean --force
   npx clear-npx-cache
   
   # 或手动删除缓存目录
   # Windows: %USERPROFILE%\.npm\_npx
   # macOS/Linux: ~/.npm/_npx
   ```

#### 问题 2: FFmpeg 相关错误

**解决方案**: 确保系统已安装 FFmpeg
- **Windows**: 下载 FFmpeg 并添加到 PATH
- **macOS**: `brew install ffmpeg`
- **Linux**: `sudo apt install ffmpeg` 或 `sudo yum install ffmpeg`

#### 问题 3: 权限错误

**解决方案**: 确保对输出目录有写入权限
```bash
chmod 755 /path/to/output/directory
```

#### 问题 4: 内存不足

**解决方案**: 处理大视频文件时，建议：
- 降低输出分辨率
- 增加截图间隔
- 限制最大截图数量

## 🏗️ 开发

```bash
# 克隆项目
git clone https://github.com/pickstar-2002/video-screenshot-mcp.git
cd video-screenshot-mcp

# 安装依赖
npm install

# 构建项目
npm run build

# 开发模式
npm run dev

# 启动服务器
npm start
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目基于 [MIT](https://opensource.org/licenses/MIT) 许可证开源。

## 📞 联系方式

如有问题或建议，欢迎联系：

**微信**: pickstar_loveXX

---

⭐ 如果这个项目对您有帮助，请给个 Star 支持一下！