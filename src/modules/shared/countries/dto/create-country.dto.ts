import { IsNotEmpty, IsString } from "class-validator";

export class CreateCountryDTO {
    @IsNotEmpty({ message: 'the code cannot be empty' })
    @IsString()
    code: string;

    @IsNotEmpty({ message: 'the name cannot be empty' })
    @IsString()
    name: string;
}