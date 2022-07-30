import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('trade')
export class TradeController {

    @UseGuards(AuthGuard('stock-jwt'))
    @Get('all')
    getAllMyTrades(@Req() req: Request){

        const user = req.user;

        return "success";
    }
}
