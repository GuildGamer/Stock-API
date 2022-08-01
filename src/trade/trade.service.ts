import { ForbiddenException, Injectable } from '@nestjs/common';
import { Trade } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterTradeDto, TradeDto } from './dto';

@Injectable()
export class TradeService {
    constructor(private prisma: PrismaService){}

    async addTrade(userId: number, dto: TradeDto){

        try{
            const trade = await this.prisma.trade.create({
                data: {
                    direction: dto.direction,
                    market: dto.market,
                    quantity: dto.quantity,
                    price: dto.price,
                    consideration: dto.consideration,
                    userId: userId,
                }
            })

            return trade;

        }catch(err){
            console.log(err);
            throw new ForbiddenException(
                'Failed to create trade',
            )
        }
    }

    async filterTrade(userId: number, dto: FilterTradeDto): Promise<Trade[]>{

        try{
            const start = new Date(dto.start);
            start.toUTCString()

            console.log(start)

            const end = new Date(dto.end);
            end.setHours(end.getHours() + 24);
            end.toUTCString()

            console.log(end)

            const trades = await this.prisma.trade.findMany({
                where: {
                    createdAt: {
                        lte: end,
                        gte: start,
                    },

                    userId: userId
                },
            });

        return trades;
        
        }catch(err){
            throw new ForbiddenException(
                    'Failed to get trades between those dates',
                )
        }
    }

    async filterProfit(userId: number, dto: FilterTradeDto): Promise<{profit: number [], msg: string, profitSum: number}>{
        const start = new Date(dto.start);

        const endDate = new Date(dto.end);
        const end = new Date(endDate.getTime() + (25 * 60 * 60000) - 1)
        
        console.log("START", start)
        console.log("END", end)

        // const allMarkets = await this.prisma.trade.groupBy({
        //     by: ['market'],
        //     where:{
        //         userId: userId,
        //         createdAt: {
        //             lte: end,
        //             gte: start,
        //         }
        //     }
        // })

        // investment cost: total purchase cost
        try{
            const allBuy = await this.prisma.trade.findMany({
                where:{
                    userId: userId,
                    createdAt: {
                        lte: end,
                        gte: start,
                    },

                    direction: "BUY",
                    market: dto.market //Optional
                },

                orderBy: {
                    createdAt: 'asc',
                    },
            })

            // all sell prices
            const allSell = await this.prisma.trade.findMany({
                where:{
                    userId: userId,
                    createdAt: {
                        lte: end,
                        gte: start,
                    },

                    direction: "SELL",
                    market: dto.market //Optional 
                },
                
                orderBy: {
                    createdAt: 'asc',
                    },
            })

            if (allSell.length > 0) {

                const profitArray = []

                for (let i = 0; i < allSell.length; i++){
                    // get the list of BUY trades with the same market of the SELL trade
                    const sellMarket = allSell[i].market

                    function checkMarket(buyTrade: Trade){
                        return buyTrade.market === sellMarket
                    }

                    const allBuyWithinMarket = allBuy.filter(checkMarket)

                    // calculate the total cost at the time the SELL trade was performed for each market

                    let totalCost = 0;
                    let totalQuantity = 0;

                    for (let j = 0; j < allBuyWithinMarket.length; j++) {
                        if (
                            allBuyWithinMarket[j].createdAt <= allSell[i].createdAt
                            ){
                            
                            // minus since the consideration for buying alrready has a minus sign
                            totalCost += allBuy[j].consideration
                            totalQuantity += allBuy[j].quantity

                        }
                    }

                    // make the totalCost positive
                    if(totalCost != 0){
                        totalCost *= -1
                    }

                    // console.log(totalCost)
                    
                    // calculate the average cost per share for that market
                    const costPerShare = (totalCost != 0) ? totalCost / totalQuantity : 0

                    // make the sell quanity postitive
                    let sellQuantity = allSell[i].quantity
                    sellQuantity *= -1

                    const profitOrLoss = (allSell[i].consideration - (sellQuantity * costPerShare))
                    
                    if (profitOrLoss > 0){
                        profitArray.push(Number(profitOrLoss.toFixed(2)))
                    }
                    
                }

                // const gain_type =  profitOrLoss >= 0 ? "profit" :"loss"
                
                const profitSum = profitArray.reduce((a:number, b:number) => a + b, 0)

                // return {
                //     "profit": Number(profitOrLoss.toFixed(2)),
                //     "type": gain_type,
                //     "msg": null
                // }
                return {
                        "profit":profitArray,
                        "profitSum":profitSum,
                        "msg": null,
                }
            }

            return {
                "profit": [],
                "profitSum":null,
                "msg": "No profit or loss available"
            }
        }catch(err){
            console.log(err);

            if (err.code === "P2009"){
                throw new ForbiddenException(
                    "Invalid date"
                )
            }

            throw new ForbiddenException(
                "Failed to obtain a profit or loss"
            )
        }
    }
}