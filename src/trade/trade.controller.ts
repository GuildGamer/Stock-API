import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/decorator';
import { JwtGuard } from 'src/guard';

@UseGuards(JwtGuard)
@Controller('trade')
export class TradeController {

    @Get('all')
    getAllMyTrades(@GetUser('id') userId: number){

        return "success";
    }
}
