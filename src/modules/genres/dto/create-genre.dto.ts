import { IsNotEmpty, IsString } from "class-validator";

export class CreateGenreDTO {
    @IsNotEmpty({ message: 'the name cannot be empty' })
    @IsString()
    name: string;
}