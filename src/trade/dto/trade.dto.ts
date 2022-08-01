import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class TradeDto {
    @IsString()
    @IsNotEmpty()
    direction: string;

    @IsString()
    @IsNotEmpty()
    market: string;

    @IsInt()
    @IsNotEmpty()
    price: number;

    @IsInt()
    @IsNotEmpty()
    quantity: number;

    @IsNumber()
    consideration: number;

    // @IsInt()
    // @IsNotEmpty()
    // userId: number;
}

export class FilterTradeDto {

    @IsString()
    @IsNotEmpty()
    start: string;

    @IsString()
    @IsNotEmpty()
    end: string;

    @IsOptional()
    @IsString()
    market: string;

}