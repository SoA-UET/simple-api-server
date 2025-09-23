import { Controller, Get, Head, All, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import type { Request, Response } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy thông tin chào mừng từ server' })
  @ApiResponse({ status: 200, description: 'Thành công' })
  getHello(): string {
    return this.appService.getHello();
  }

  @Head()
  @ApiOperation({ summary: 'Kiểm tra server có hoạt động không (HEAD method)' })
  @ApiResponse({ status: 200, description: 'Server đang hoạt động' })
  headHello(@Res() res: Response): void {
    // HEAD method chỉ trả về headers, không có body
    res.status(200).send();
  }

  @All('trace')
  @ApiOperation({ summary: 'Echo lại request (TRACE method)' })
  @ApiResponse({ status: 200, description: 'Echo request thành công' })
  trace(@Req() req: Request): any {
    // TRACE method echo lại toàn bộ request
    return {
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body,
      timestamp: new Date().toISOString()
    };
  }

  @All('connect')
  @ApiOperation({ summary: 'Xử lý CONNECT method (thường dùng cho proxy)' })
  @ApiResponse({ status: 200, description: 'CONNECT method được xử lý' })
  connect(@Req() req: Request, @Res() res: Response): void {
    // CONNECT method thường dùng cho HTTP tunneling/proxy
    // Trong môi trường thực tế, method này cần xử lý phức tạp hơn
    res.status(200).json({
      message: 'CONNECT method received',
      target: req.url,
      timestamp: new Date().toISOString()
    });
  }
}
