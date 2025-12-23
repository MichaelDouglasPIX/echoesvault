import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateGameDTO {
    @IsNotEmpty({ message: 'the name cannot be empty'})
    @IsString()
    name: string;

    @IsNotEmpty({ message: 'the studio cannot be empty'})
    @IsString()
    studio: string;
    
    @IsOptional()
    @IsString()
    description: string;

    @IsNumber()
    price: number;

    @IsOptional()
    @IsString()
    releaseDate: string;
}