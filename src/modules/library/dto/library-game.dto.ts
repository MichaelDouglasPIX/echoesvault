import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateLibraryGameDTO {
    @IsNotEmpty({ message: 'the library cannot be empty' })
    @IsString()
    library: string;

    @IsNotEmpty({ message: 'the game cannot be empty' })
    @IsString()
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