import { IsNotEmpty, IsString } from "class-validator";

export class PatchGameGenreDTO {
    @IsNotEmpty({ message: 'the genre cannot be empty'})
    @IsString()
    genre: string;
}