import { IsArray, IsNotEmpty } from "class-validator";

export class UpdateGameGenreDTO {
    @IsNotEmpty({ message: 'the genres cannot be empty'})
    @IsArray()
    genres: string[];
}