export interface ScreenshotOptions {
  /** 输出格式 */
  format?: 'jpg' | 'png' | 'webp';
  /** 输出质量 (1-100, 仅对 jpg 有效) */
  quality?: number;
  /** 输出宽度 */
  width?: number;
  /** 输出高度 */
  height?: number;
  /** 输出目录 */
  outputDir?: string;
  /** 文件名前缀 */
  prefix?: string;
}

export interface BatchScreenshotOptions extends ScreenshotOptions {
  /** 时间间隔（秒） */
  interval: number;
  /** 开始时间（秒） */
  startTime?: number;
  /** 结束时间（秒） */
  endTime?: number;
  /** 最大截图数量 */
  maxCount?: number;
}

export interface VideoInfo {
  /** 视频时长（秒） */
  duration: number;
  /** 视频宽度 */
  width: number;
  /** 视频高度 */
  height: number;
  /** 帧率 */
  fps: number;
  /** 视频格式 */
  format: string;
  /** 文件大小（字节） */
  size: number;
}

export interface ScreenshotResult {
  /** 输出文件路径 */
  filePath: string;
  /** 截图时间点（秒） */
  timestamp: number;
  /** 文件大小（字节） */
  fileSize: number;
  /** 图片宽度 */
  width: number;
  /** 图片高度 */
  height: number;
}