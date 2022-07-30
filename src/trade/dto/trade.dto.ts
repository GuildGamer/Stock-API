import { IsBoolean, IsInt, IsNotEmpty, IsString } from "class-validator";

export class TradeDto {
    @IsBoolean()
    @IsNotEmpty()
    directionIsSell: boolean;

    @IsString()
    @IsNotEmpty()
    market: string;

    @IsInt()
    @IsNotEmpty()
    price: number;

    @IsInt()
    @IsNotEmpty()
    quantity: number;

    // @IsInt()
    // @IsNotEmpty()
    // userId: number;
}