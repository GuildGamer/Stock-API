import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/decorator';
import { JwtGuard } from 'src/guard';
import { TradeDto } from './dto';
import { TradeService } from './trade.service';

@UseGuards(JwtGuard)
@Controller('trade')
export class TradeController {

    constructor(private tradeService: TradeService){}

    @Get('all')
    getAllMyTrades(@GetUser('id') userId: number){

        return "success";
    }

    @Post('add')
    addTrade(@GetUser('id') userId: number, @Body() dto: TradeDto){
        return this.tradeService.addTrade(userId, dto);
    }
}
