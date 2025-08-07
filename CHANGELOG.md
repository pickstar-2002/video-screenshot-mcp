# 📝 更新日志

## [1.0.0] - 2025-08-07

### ✨ 新增功能
- 🎯 基于 MCP 协议的专业视频截图工具
- 📸 支持按时间点截取单帧画面
- 🎞️ 支持按固定时间间隔批量截图
- 🎨 支持多种输出格式：JPG、PNG、WebP
- 📐 支持自定义输出分辨率和质量设置
- 📊 提供完整的视频信息获取功能
- ✅ 内置智能视频文件验证功能

### 🔧 技术特性
- 使用官方 MCP SDK (`@modelcontextprotocol/sdk`)
- TypeScript 开发，确保类型安全
- 基于 FFmpeg 进行高效视频处理
- 使用 Sharp 进行专业图像处理
- 支持多种视频格式：MP4、AVI、MOV、MKV、WMV、FLV、WebM、M4V
- 完整的依赖管理，开箱即用

### 🛠️ 工具列表
- `get_video_info`: 获取视频详细信息
- `take_screenshot`: 精确单帧截图
- `batch_screenshot`: 智能批量截图
- `validate_video`: 视频文件验证

### 🎯 应用场景
- 📋 内容审核：定期截取视频帧进行内容审核
- 🖼️ 封面生成：在关键时间点生成高质量封面
- 🎞️ 视频预览：生成完整的视频预览图集
- 📊 视频分析：提取关键帧进行深度分析

### 📦 发布信息
- 包名：`@pickstar-2002/video-screenshot-mcp`
- 作者：pickstar-2002
- 许可证：MIT
- Node.js 版本要求：>=18.0.0