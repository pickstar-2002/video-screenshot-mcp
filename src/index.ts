#!/usr/bin/env node

import { VideoScreenshotMCPServer } from './mcp-server.js';

async function main() {
  const server = new VideoScreenshotMCPServer();
  await server.run();
}

main().catch((error: any) => {
  console.error('服务器启动失败:', error);
  process.exit(1);
});
