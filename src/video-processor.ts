import ffmpeg from 'fluent-ffmpeg';
import sharp from 'sharp';
import * as fs from 'fs-extra';
import * as path from 'path';
import { promisify } from 'util';
import { VideoInfo, ScreenshotOptions, BatchScreenshotOptions, ScreenshotResult } from './types.js';

export class VideoProcessor {
  private static ffprobePath: string | undefined;
  private static ffmpegPath: string | undefined;

  constructor() {
    // 设置 ffmpeg 和 ffprobe 路径（如果系统中有的话）
    if (VideoProcessor.ffmpegPath) {
      ffmpeg.setFfmpegPath(VideoProcessor.ffmpegPath);
    }
    if (VideoProcessor.ffprobePath) {
      ffmpeg.setFfprobePath(VideoProcessor.ffprobePath);
    }
  }

  /**
   * 获取视频信息
   */
  async getVideoInfo(videoPath: string): Promise<VideoInfo> {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(videoPath, (err: any, metadata: any) => {
        if (err) {
          reject(new Error(`获取视频信息失败: ${err.message}`));
          return;
        }

        const videoStream = metadata.streams.find((stream: any) => stream.codec_type === 'video');
        if (!videoStream) {
          reject(new Error('未找到视频流'));
          return;
        }

        const stats = fs.statSync(videoPath);
        
        resolve({
          duration: metadata.format.duration || 0,
          width: videoStream.width || 0,
          height: videoStream.height || 0,
          fps: this.parseFps(videoStream.r_frame_rate || '0/1'),
          format: metadata.format.format_name || 'unknown',
          size: stats.size
        });
      });
    });
  }

  /**
   * 单帧截图
   */
  async takeScreenshot(
    videoPath: string, 
    timestamp: number, 
    outputPath: string, 
    options: ScreenshotOptions = {}
  ): Promise<ScreenshotResult> {
    const {
      format = 'jpg',
      quality = 90,
      width,
      height
    } = options;

    // 确保输出目录存在
    await fs.ensureDir(path.dirname(outputPath));

    return new Promise((resolve, reject) => {
      const command = ffmpeg(videoPath)
        .seekInput(timestamp)
        .frames(1)
        .output(outputPath);

      // 设置输出格式
      if (format === 'jpg') {
        command.outputFormat('image2').outputOptions(['-q:v', quality.toString()]);
      } else if (format === 'png') {
        command.outputFormat('image2');
      } else if (format === 'webp') {
        command.outputFormat('webp');
      }

      // 设置分辨率
      if (width && height) {
        command.size(`${width}x${height}`);
      } else if (width) {
        command.size(`${width}x?`);
      } else if (height) {
        command.size(`?x${height}`);
      }

      command
        .on('end', async () => {
          try {
            const stats = await fs.stat(outputPath);
            const imageInfo = await sharp(outputPath).metadata();
            
            resolve({
              filePath: outputPath,
              timestamp,
              fileSize: stats.size,
              width: imageInfo.width || 0,
              height: imageInfo.height || 0
            });
          } catch (error) {
            reject(new Error(`获取截图信息失败: ${error}`));
          }
        })
        .on('error', (err: any) => {
          reject(new Error(`截图失败: ${err.message}`));
        })
        .run();
    });
  }

  /**
   * 批量截图
   */
  async batchScreenshot(
    videoPath: string,
    options: BatchScreenshotOptions
  ): Promise<ScreenshotResult[]> {
    const {
      interval,
      startTime = 0,
      endTime,
      maxCount,
      outputDir = './screenshots',
      prefix = 'screenshot',
      format = 'jpg'
    } = options;

    // 获取视频信息
    const videoInfo = await this.getVideoInfo(videoPath);
    const actualEndTime = endTime || videoInfo.duration;

    // 计算截图时间点
    const timestamps: number[] = [];
    let currentTime = startTime;
    let count = 0;

    while (currentTime <= actualEndTime && (!maxCount || count < maxCount)) {
      timestamps.push(currentTime);
      currentTime += interval;
      count++;
    }

    // 确保输出目录存在
    await fs.ensureDir(outputDir);

    // 批量截图
    const results: ScreenshotResult[] = [];
    
    for (let i = 0; i < timestamps.length; i++) {
      const timestamp = timestamps[i];
      const filename = `${prefix}_${String(i + 1).padStart(4, '0')}_${timestamp.toFixed(2)}s.${format}`;
      const outputPath = path.join(outputDir, filename);

      try {
        const result = await this.takeScreenshot(videoPath, timestamp, outputPath, options);
        results.push(result);
      } catch (error) {
        console.warn(`截图失败 (时间点: ${timestamp}s): ${error}`);
      }
    }

    return results;
  }

  /**
   * 解析帧率字符串
   */
  private parseFps(fpsString: string): number {
    const parts = fpsString.split('/');
    if (parts.length === 2) {
      const numerator = parseInt(parts[0]);
      const denominator = parseInt(parts[1]);
      return denominator !== 0 ? numerator / denominator : 0;
    }
    return parseFloat(fpsString) || 0;
  }

  /**
   * 格式化时间为可读格式
   */
  static formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 1000);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
    } else {
      return `${minutes}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
    }
  }

  /**
   * 验证视频文件
   */
  static async validateVideoFile(videoPath: string): Promise<boolean> {
    try {
      const stats = await fs.stat(videoPath);
      if (!stats.isFile()) {
        return false;
      }

      // 检查文件扩展名
      const ext = path.extname(videoPath).toLowerCase();
      const supportedFormats = ['.mp4', '.avi', '.mov', '.mkv', '.wmv', '.flv', '.webm', '.m4v'];
      
      return supportedFormats.includes(ext);
    } catch {
      return false;
    }
  }
}