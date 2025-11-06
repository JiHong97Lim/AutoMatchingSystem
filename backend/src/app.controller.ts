import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  health() { return { ok: true }; }

  @Get('players')
  async getPlayers() {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    return prisma.player.findMany();
  }
  
  getHello(): string {
    return this.appService.getHello();
  }
}
