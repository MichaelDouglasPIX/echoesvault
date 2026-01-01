import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateGameDTO {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    studio: string;
    
    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsArray()
    genres: string[];

    @IsOptional()
    @IsNumber()
    price: number;

    @IsOptional()
    @IsString()
    releaseDate: string;
}