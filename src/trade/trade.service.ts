import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TradeDto } from './dto';

@Injectable()
export class TradeService {
    constructor(private prisma: PrismaService){}

    async addTrade(userId: number, dto: TradeDto){
        
        try{
            const trade = await this.prisma.trade.create({
                data: {
                    directionIsSell: dto.directionIsSell,
                    market: dto.market,
                    quantity: dto.quantity,
                    price: dto.price,
                    userId: userId,
                }
            })

            return trade;

        }catch(err){
            throw new ForbiddenException(
                'Failed to create trade',
            )
        }
    }
}
