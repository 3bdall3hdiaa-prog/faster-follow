import { Controller, Post, Body, Query, Get, Res } from '@nestjs/common';
import { PaypalService } from './pay-pal.service';

@Controller('paypal')
export class PaypalController {
  constructor(private readonly paypalService: PaypalService) { }

  // إنشاء order
  @Post('create-order')
  async createOrder(@Body('amount') amount: string, @Body('userName') userName: string) {
    return this.paypalService.createOrder(amount, userName);
  }

  // Capture بعد الدفع
  @Get('capture-order')
  async captureOrder(@Query('token') orderId: string, @Query('user') userName: string, @Res() res: any) {
    try {
      const result = await this.paypalService.captureOrder(orderId, userName);
      return res.json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Failed to capture order',
        error: error.message,
      });
    }
  }
  @Get()
  getdata() {
    return this.paypalService.getdatapayment();
  }
}
