# 📸 Video Screenshot MCP

[![npm version](https://img.shields.io/npm/v/@pickstar-2002/video-screenshot-mcp)](https://www.npmjs.com/package/@pickstar-2002/video-screenshot-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://www.typescriptlang.org/)
[![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-orange)](https://modelcontextprotocol.io/)

一个基于 Model Context Protocol (MCP) 的视频截图服务，支持高质量的视频帧提取和批量截图功能。

## ✨ 特性

- 🎯 **精确截图**: 支持毫秒级精度的视频帧提取
- 📊 **批量处理**: 按时间间隔批量截取视频画面
- 🔍 **视频信息**: 获取视频详细信息（时长、分辨率、帧率等）
- 🖼️ **多格式支持**: 支持 JPG、PNG、WebP 输出格式
- ⚙️ **灵活配置**: 可自定义输出质量、尺寸等参数
- ✅ **文件验证**: 智能验证视频文件有效性
- 🚀 **高性能**: 基于 FFmpeg 的高效视频处理

## 📦 安装

### 作为 MCP 服务使用（推荐）

在您的 IDE 配置文件中添加以下配置：

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

### 本地安装

```bash
npm install @pickstar-2002/video-screenshot-mcp
```

## 🚀 快速开始

### 在 IDE 中配置

#### Cursor / VS Code

在 `settings.json` 中添加：

```json
{
  "mcp.servers": {
    "video-screenshot": {
      "command": "npx",
      "args": ["@pickstar-2002/video-screenshot-mcp@latest"]
    }
  }
}
```

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

### 基本用法示例

配置完成后，您可以通过 AI 助手使用以下功能：

```
请帮我截取视频 /path/to/video.mp4 在第 30 秒的画面
```

```
请批量截取视频每 10 秒的画面，保存为 PNG 格式
```

```
请获取这个视频文件的详细信息
```

## 📖 API 参考

### 🔍 get_video_info

获取视频文件的详细信息。

**参数:**
- `videoPath` (string): 视频文件路径

**返回:** 包含时长、分辨率、帧率、编码格式等信息的对象

### 📸 take_screenshot

在指定时间点截取视频单帧画面。

**参数:**
- `videoPath` (string): 视频文件路径
- `timestamp` (number): 截图时间点（秒）
- `outputPath` (string): 输出文件路径
- `format` (string, 可选): 输出格式 (jpg/png/webp)，默认 jpg
- `quality` (number, 可选): 图片质量 (1-100)，默认 90
- `width` (number, 可选): 输出宽度（像素）
- `height` (number, 可选): 输出高度（像素）

### 📷 batch_screenshot

按固定时间间隔批量截取视频画面。

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
- `width` (number, 可选): 输出宽度（像素）
- `height` (number, 可选): 输出高度（像素）

### ✅ validate_video

验证视频文件是否有效且支持处理。

**参数:**
- `videoPath` (string): 视频文件路径

**返回:** 验证结果和错误信息（如有）

## 🎯 使用场景

- 📝 **内容创作**: 为视频制作缩略图和预览图
- 🎬 **视频分析**: 提取关键帧进行内容分析
- 📊 **质量检测**: 批量检查视频质量和内容
- 🔍 **素材管理**: 为视频库生成预览图
- 🎨 **设计工作**: 提取视频帧用于设计素材

## 🛠️ 疑难解答

### ❌ 常见问题

#### 问题 1: `Connection closed` 错误

**症状**: 在使用 MCP 服务时出现连接关闭错误

**解决方案**（按推荐顺序）:

1. **🎯 首选方案**: 确认使用了 `@latest` 标签
   ```json
   {
     "command": "npx",
     "args": ["@pickstar-2002/video-screenshot-mcp@latest"]
   }
   ```

2. **🔄 备用方案**: 锁定到特定稳定版本
   ```json
   {
     "command": "npx",
     "args": ["@pickstar-2002/video-screenshot-mcp@1.1.1"]
   }
   ```

3. **🧹 终极方案**: 清理 npx 缓存
   ```bash
   # 清理 npx 缓存
   npx clear-npx-cache
   
   # 或者手动删除缓存目录
   # Windows: %USERPROFILE%\.npm\_npx
   # macOS/Linux: ~/.npm/_npx
   ```

#### 问题 2: FFmpeg 未找到

**症状**: 提示 FFmpeg 不可用或未安装

**解决方案**:
```bash
# Windows (使用 Chocolatey)
choco install ffmpeg

# macOS (使用 Homebrew)
brew install ffmpeg

# Ubuntu/Debian
sudo apt update && sudo apt install ffmpeg

# CentOS/RHEL
sudo yum install ffmpeg
```

#### 问题 3: 权限错误

**症状**: 无法读取视频文件或写入截图

**解决方案**:
- 确保视频文件路径正确且可访问
- 检查输出目录的写入权限
- 在 Windows 上可能需要以管理员身份运行

#### 问题 4: 视频格式不支持

**症状**: 某些视频文件无法处理

**解决方案**:
- 使用 `validate_video` 工具检查文件有效性
- 支持的格式: MP4, AVI, MOV, MKV, WebM, FLV 等主流格式
- 对于特殊格式，建议先转换为 MP4

### 📋 调试技巧

1. **启用详细日志**: 设置环境变量 `DEBUG=video-screenshot:*`
2. **检查文件路径**: 使用绝对路径避免相对路径问题
3. **测试小文件**: 先用小视频文件测试功能
4. **查看错误信息**: 仔细阅读错误消息中的具体提示

## 🔧 系统要求

- **Node.js**: >= 18.0.0
- **FFmpeg**: 需要系统安装 FFmpeg
- **操作系统**: Windows, macOS, Linux
- **内存**: 建议至少 512MB 可用内存

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 开发环境设置

```bash
# 克隆仓库
git clone https://github.com/pickstar-2002/video-screenshot-mcp.git
cd video-screenshot-mcp

# 安装依赖
npm install

# 构建项目
npm run build

# 运行测试
npm test
```

## 📞 联系方式

如有问题或建议，欢迎联系：

**微信**: pickstar_loveXX

---

⭐ 如果这个项目对您有帮助，请给个 Star 支持一下！