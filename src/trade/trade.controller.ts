import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/decorator';
import { JwtGuard } from 'src/guard';
import { FilterTradeDto, TradeDto } from './dto';
import { TradeService } from './trade.service';

@UseGuards(JwtGuard)
@Controller('trade')
export class TradeController {

    constructor(private tradeService: TradeService){}

    @Post('add')
    addTrade(@GetUser('id') userId: number, @Body() dto: TradeDto){
        return this.tradeService.addTrade(userId, dto);
    }

    @Get('filter')
    filterTrade(@GetUser('id') userId: number, @Body() dto: FilterTradeDto){
        return this.tradeService.filterTrade(userId, dto);
    }

    @Get('profit')
    filterProfit(@GetUser('id') userId: number, @Body() dto: FilterTradeDto){
        return this.tradeService.filterProfit(userId, dto);
    }
}
