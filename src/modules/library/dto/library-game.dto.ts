import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateLibraryGameDTO {
    @IsNotEmpty({ message: 'the game cannot be empty' })
    @IsUUID()
    game: string;

    @IsNotEmpty({ message: 'the acquiredAt cannot be empty' })
    @IsString()
    acquiredAt: string;

    @IsOptional()
    @IsNumber()
    purchasePrice: number;

    @IsOptional()
    @IsNumber()
    timePlayed: number;

    @IsOptional()
    @IsString()
    lastPlayedAt: string;
}