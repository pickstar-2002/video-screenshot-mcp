import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { VideoProcessor } from './video-processor.js';
import * as path from 'path';
import fs from 'fs-extra';

export class VideoScreenshotMCPServer {
  private server: Server;
  private videoProcessor: VideoProcessor;

  constructor() {
    this.server = new Server(
      {
        name: 'video-screenshot-mcp',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.videoProcessor = new VideoProcessor();
    this.setupToolHandlers();
  }

  private setupToolHandlers() {
    // 注册工具列表
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'get_video_info',
            description: '获取视频文件的详细信息，包括时长、分辨率、帧率等',
            inputSchema: {
              type: 'object',
              properties: {
                videoPath: {
                  type: 'string',
                  description: '视频文件路径'
                }
              },
              required: ['videoPath']
            }
          },
          {
            name: 'take_screenshot',
            description: '在指定时间点截取视频单帧画面',
            inputSchema: {
              type: 'object',
              properties: {
                videoPath: {
                  type: 'string',
                  description: '视频文件路径'
                },
                timestamp: {
                  type: 'number',
                  description: '截图时间点（秒）'
                },
                outputPath: {
                  type: 'string',
                  description: '输出文件路径'
                },
                format: {
                  type: 'string',
                  enum: ['jpg', 'png', 'webp'],
                  description: '输出格式，默认为 jpg'
                },
                quality: {
                  type: 'number',
                  minimum: 1,
                  maximum: 100,
                  description: '图片质量（1-100，仅对 jpg 有效），默认为 90'
                },
                width: {
                  type: 'number',
                  description: '输出宽度（像素）'
                },
                height: {
                  type: 'number',
                  description: '输出高度（像素）'
                }
              },
              required: ['videoPath', 'timestamp', 'outputPath']
            }
          },
          {
            name: 'batch_screenshot',
            description: '按固定时间间隔批量截取视频画面',
            inputSchema: {
              type: 'object',
              properties: {
                videoPath: {
                  type: 'string',
                  description: '视频文件路径'
                },
                interval: {
                  type: 'number',
                  description: '截图时间间隔（秒）'
                },
                startTime: {
                  type: 'number',
                  description: '开始时间（秒），默认为 0'
                },
                endTime: {
                  type: 'number',
                  description: '结束时间（秒），默认为视频结束'
                },
                maxCount: {
                  type: 'number',
                  description: '最大截图数量'
                },
                outputDir: {
                  type: 'string',
                  description: '输出目录，默认为 ./screenshots'
                },
                prefix: {
                  type: 'string',
                  description: '文件名前缀，默认为 screenshot'
                },
                format: {
                  type: 'string',
                  enum: ['jpg', 'png', 'webp'],
                  description: '输出格式，默认为 jpg'
                },
                quality: {
                  type: 'number',
                  minimum: 1,
                  maximum: 100,
                  description: '图片质量（1-100，仅对 jpg 有效），默认为 90'
                },
                width: {
                  type: 'number',
                  description: '输出宽度（像素）'
                },
                height: {
                  type: 'number',
                  description: '输出高度（像素）'
                }
              },
              required: ['videoPath', 'interval']
            }
          },
          {
            name: 'validate_video',
            description: '验证视频文件是否有效且支持处理',
            inputSchema: {
              type: 'object',
              properties: {
                videoPath: {
                  type: 'string',
                  description: '视频文件路径'
                }
              },
              required: ['videoPath']
            }
          }
        ] as Tool[]
      };
    });

    // 注册工具调用处理器
    this.server.setRequestHandler(CallToolRequestSchema, async (request: any) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'get_video_info':
            return await this.handleGetVideoInfo(args);
          
          case 'take_screenshot':
            return await this.handleTakeScreenshot(args);
          
          case 'batch_screenshot':
            return await this.handleBatchScreenshot(args);
          
          case 'validate_video':
            return await this.handleValidateVideo(args);
          
          default:
            throw new Error(`未知的工具: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `错误: ${error instanceof Error ? error.message : String(error)}`
            }
          ]
        };
      }
    });
  }

  private async handleGetVideoInfo(args: any) {
    const { videoPath } = args;
    
    if (!await VideoProcessor.validateVideoFile(videoPath)) {
      throw new Error('无效的视频文件或文件不存在');
    }

    const videoInfo = await this.videoProcessor.getVideoInfo(videoPath);
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            success: true,
            data: {
              ...videoInfo,
              formattedDuration: VideoProcessor.formatTime(videoInfo.duration),
              filePath: videoPath
            }
          }, null, 2)
        }
      ]
    };
  }

  private async handleTakeScreenshot(args: any) {
    const { videoPath, timestamp, outputPath, ...options } = args;
    
    if (!await VideoProcessor.validateVideoFile(videoPath)) {
      throw new Error('无效的视频文件或文件不存在');
    }

    const result = await this.videoProcessor.takeScreenshot(
      videoPath,
      timestamp,
      outputPath,
      options
    );

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            success: true,
            data: {
              ...result,
              formattedTimestamp: VideoProcessor.formatTime(result.timestamp)
            }
          }, null, 2)
        }
      ]
    };
  }

  private async handleBatchScreenshot(args: any) {
    const { videoPath, ...options } = args;
    
    if (!await VideoProcessor.validateVideoFile(videoPath)) {
      throw new Error('无效的视频文件或文件不存在');
    }

    const results = await this.videoProcessor.batchScreenshot(videoPath, options);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            success: true,
            data: {
              totalCount: results.length,
              screenshots: results.map(result => ({
                ...result,
                formattedTimestamp: VideoProcessor.formatTime(result.timestamp)
              }))
            }
          }, null, 2)
        }
      ]
    };
  }

  private async handleValidateVideo(args: any) {
    const { videoPath } = args;
    const isValid = await VideoProcessor.validateVideoFile(videoPath);
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            success: true,
            data: {
              isValid,
              filePath: videoPath,
              exists: await fs.pathExists(videoPath)
            }
          }, null, 2)
        }
      ]
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('视频截图 MCP 服务器已启动');
  }
}