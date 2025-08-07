# 📸 Video Screenshot MCP

[![npm version](https://badge.fury.io/js/@pickstar-2002%2Fvideo-screenshot-mcp.svg)](https://badge.fury.io/js/@pickstar-2002%2Fvideo-screenshot-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-blue.svg)](https://modelcontextprotocol.io/)

A powerful **Model Context Protocol (MCP) server** for video screenshot functionality with **high-quality output**. Extract single frames or batch screenshots from videos with original quality preservation.

## ✨ Features

- 🎯 **Single Frame Screenshot** - Extract specific frames at any timestamp
- 📦 **Batch Screenshot** - Generate multiple screenshots at regular intervals
- 🔍 **Video Information** - Get detailed video metadata (duration, resolution, fps, etc.)
- ✅ **Video Validation** - Verify video file compatibility
- 🎨 **Multiple Formats** - Support JPG, PNG, WebP output formats
- 🏆 **Original Quality** - Default high-quality output (quality=1)
- ⚡ **High Performance** - Efficient FFmpeg-based processing
- 🔧 **Flexible Configuration** - Customizable quality, resolution, and naming

## 📋 Requirements

- **Node.js** >= 18.0.0
- **FFmpeg** installed and accessible in PATH
- MCP-compatible IDE (Claude Desktop, Cursor, etc.)

## 🚀 Installation & Usage

### Quick Start (Recommended)

Use the `@latest` tag to ensure you always get the most recent version:

```bash
npx @pickstar-2002/video-screenshot-mcp@latest
```

### IDE Configuration

Add this server to your MCP settings:

#### Claude Desktop
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
```json
{
  "mcp": {
    "servers": {
      "video-screenshot": {
        "command": "npx",
        "args": ["@pickstar-2002/video-screenshot-mcp@latest"]
      }
    }
  }
}
```

#### Other MCP-Compatible IDEs
```json
{
  "servers": {
    "video-screenshot": {
      "command": "npx",
      "args": ["@pickstar-2002/video-screenshot-mcp@latest"]
    }
  }
}
```

## 🛠️ API Reference

### Available Tools

#### 1. `get_video_info`
Get comprehensive video information including duration, resolution, fps, and file size.

**Parameters:**
- `videoPath` (string): Path to the video file

**Returns:**
```json
{
  "duration": 289.4,
  "width": 1920,
  "height": 1080,
  "fps": 30,
  "format": "mov,mp4,m4a,3gp,3g2,mj2",
  "size": 21417944,
  "formattedDuration": "4:49.400",
  "filePath": "/path/to/video.mp4"
}
```

#### 2. `take_screenshot`
Extract a single frame at a specific timestamp.

**Parameters:**
- `videoPath` (string): Path to the video file
- `timestamp` (number): Time in seconds to extract frame
- `outputPath` (string): Output file path
- `format` (string, optional): Output format (`jpg`, `png`, `webp`) - default: `jpg`
- `quality` (number, optional): Quality 1-100 (JPG only) - default: `1` (highest quality)
- `width` (number, optional): Output width in pixels
- `height` (number, optional): Output height in pixels

**Returns:**
```json
{
  "filePath": "/path/to/screenshot.jpg",
  "timestamp": 10.5,
  "fileSize": 248035,
  "width": 1920,
  "height": 1080
}
```

#### 3. `batch_screenshot`
Generate multiple screenshots at regular intervals.

**Parameters:**
- `videoPath` (string): Path to the video file
- `interval` (number): Time interval between screenshots (seconds)
- `startTime` (number, optional): Start time in seconds - default: `0`
- `endTime` (number, optional): End time in seconds - default: video duration
- `maxCount` (number, optional): Maximum number of screenshots
- `outputDir` (string, optional): Output directory - default: `./screenshots`
- `prefix` (string, optional): Filename prefix - default: `screenshot`
- `format` (string, optional): Output format - default: `jpg`
- `quality` (number, optional): Quality 1-100 - default: `1`

**Returns:**
```json
[
  {
    "filePath": "/path/to/screenshot_0001_0.00s.jpg",
    "timestamp": 0,
    "fileSize": 245678,
    "width": 1920,
    "height": 1080
  }
]
```

#### 4. `validate_video`
Check if a video file is valid and supported.

**Parameters:**
- `videoPath` (string): Path to the video file

**Returns:**
```json
{
  "isValid": true,
  "filePath": "/path/to/video.mp4",
  "exists": true
}
```

## 🎨 Usage Examples

### Single Screenshot
```javascript
// Extract frame at 30 seconds with original quality
await takeScreenshot({
  videoPath: "/path/to/video.mp4",
  timestamp: 30,
  outputPath: "/path/to/frame.jpg"
});
```

### Batch Screenshots
```javascript
// Generate screenshots every 60 seconds
await batchScreenshot({
  videoPath: "/path/to/video.mp4",
  interval: 60,
  outputDir: "/path/to/screenshots",
  prefix: "frame",
  maxCount: 10
});
```

### Custom Quality & Format
```javascript
// High compression JPG
await takeScreenshot({
  videoPath: "/path/to/video.mp4",
  timestamp: 15,
  outputPath: "/path/to/compressed.jpg",
  quality: 80
});

// Lossless PNG
await takeScreenshot({
  videoPath: "/path/to/video.mp4",
  timestamp: 15,
  outputPath: "/path/to/lossless.png",
  format: "png"
});
```

## 🔧 Supported Formats

### Input Video Formats
- MP4, AVI, MOV, MKV, WMV, FLV, WebM, M4V

### Output Image Formats
- **JPG** - Configurable quality (1-100), smaller file size
- **PNG** - Lossless compression, larger file size
- **WebP** - Modern format, good compression

## 🚨 Troubleshooting

### Common Issues & Solutions

#### 1. "Connection closed" or "Command not found" errors

**🎯 Solution A (Recommended):** Ensure you're using the `@latest` tag
```json
{
  "command": "npx",
  "args": ["@pickstar-2002/video-screenshot-mcp@latest"]
}
```

**🔄 Solution B (Alternative):** Lock to a specific stable version
```json
{
  "command": "npx",
  "args": ["@pickstar-2002/video-screenshot-mcp@1.1.0"]
}
```

**🧹 Solution C (Last Resort):** Clear npx cache
```bash
# Clear npx cache
npx clear-npx-cache

# Or manually clear
rm -rf ~/.npm/_npx
# Windows: rmdir /s %APPDATA%\npm-cache\_npx
```

#### 2. "FFmpeg not found" error

**Solution:** Install FFmpeg and ensure it's in your PATH
```bash
# macOS (Homebrew)
brew install ffmpeg

# Windows (Chocolatey)
choco install ffmpeg

# Ubuntu/Debian
sudo apt update && sudo apt install ffmpeg

# Verify installation
ffmpeg -version
```

#### 3. "Invalid video file" error

**Possible causes:**
- File doesn't exist or path is incorrect
- Unsupported video format
- Corrupted video file

**Solution:**
```javascript
// First validate the video
const validation = await validateVideo({
  videoPath: "/path/to/video.mp4"
});
console.log(validation); // Check if file exists and is valid
```

#### 4. Poor screenshot quality

**Solution:** The default quality is now set to `1` (highest quality). If you're still experiencing quality issues:
```javascript
// Explicitly set highest quality
await takeScreenshot({
  videoPath: "/path/to/video.mp4",
  timestamp: 30,
  outputPath: "/path/to/high_quality.jpg",
  quality: 1  // Highest quality
});

// Or use PNG for lossless output
await takeScreenshot({
  videoPath: "/path/to/video.mp4",
  timestamp: 30,
  outputPath: "/path/to/lossless.png",
  format: "png"
});
```

#### 5. IDE not recognizing the MCP server

**Solution:**
1. Restart your IDE after adding the MCP configuration
2. Check the IDE's MCP logs for error messages
3. Verify the configuration syntax is correct
4. Ensure Node.js >= 18.0.0 is installed

## 📝 Quality Settings Guide

| Quality | File Size | Use Case |
|---------|-----------|----------|
| `1` | ~250KB | **Default** - Original quality, recommended |
| `5` | ~150KB | High quality, balanced |
| `20` | ~80KB | Good quality, smaller files |
| `50` | ~40KB | Medium quality |
| `90` | ~20KB | Low quality, very small files |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**微信**: pickstar_loveXX

---

Made with ❤️ by [pickstar-2002](https://github.com/pickstar-2002)