#!/usr/bin/env node

import { VideoScreenshotMCPServer } from './mcp-server.js';

async function main() {
  try {
    const server = new VideoScreenshotMCPServer();
    await server.run();
  } catch (error) {
    console.error('服务器启动失败:', error);
    process.exit(1);
  }
}

// 确保进程正确处理信号
process.on('SIGINT', () => {
  console.error('收到 SIGINT 信号，正在关闭服务器...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.error('收到 SIGTERM 信号，正在关闭服务器...');
  process.exit(0);
});

main();
