# 视频截图工具使用示例

## 基本使用

### 1. 获取视频信息

```json
{
  "tool": "get_video_info",
  "arguments": {
    "videoPath": "/path/to/your/video.mp4"
  }
}
```

### 2. 单帧截图

```json
{
  "tool": "take_screenshot",
  "arguments": {
    "videoPath": "/path/to/your/video.mp4",
    "timestamp": 30.5,
    "outputPath": "/path/to/output/screenshot.jpg",
    "format": "jpg",
    "quality": 95,
    "width": 1920,
    "height": 1080
  }
}
```

### 3. 批量截图

```json
{
  "tool": "batch_screenshot",
  "arguments": {
    "videoPath": "/path/to/your/video.mp4",
    "interval": 10,
    "startTime": 0,
    "endTime": 120,
    "outputDir": "./screenshots",
    "prefix": "frame",
    "format": "png",
    "width": 1280,
    "height": 720
  }
}
```

### 4. 验证视频文件

```json
{
  "tool": "validate_video",
  "arguments": {
    "videoPath": "/path/to/your/video.mp4"
  }
}
```

## 实际应用场景

### 内容审核
每隔5秒截取一帧，用于内容审核：

```json
{
  "tool": "batch_screenshot",
  "arguments": {
    "videoPath": "/content/video.mp4",
    "interval": 5,
    "outputDir": "./audit_frames",
    "prefix": "audit",
    "format": "jpg",
    "quality": 80
  }
}
```

### 封面生成
在视频的关键时间点截取高质量封面：

```json
{
  "tool": "take_screenshot",
  "arguments": {
    "videoPath": "/content/video.mp4",
    "timestamp": 15,
    "outputPath": "./covers/thumbnail.jpg",
    "format": "jpg",
    "quality": 95,
    "width": 1920,
    "height": 1080
  }
}
```

### 视频预览
生成视频预览图集：

```json
{
  "tool": "batch_screenshot",
  "arguments": {
    "videoPath": "/content/video.mp4",
    "interval": 30,
    "maxCount": 12,
    "outputDir": "./preview",
    "prefix": "preview",
    "format": "webp",
    "width": 640,
    "height": 360
  }
}