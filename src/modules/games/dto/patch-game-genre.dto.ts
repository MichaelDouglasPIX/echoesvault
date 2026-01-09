import { IsNotEmpty, IsUUID } from "class-validator";
import { UUID } from "typeorm/driver/mongodb/bson.typings.js";

export class PatchGameGenreDTO {
    @IsNotEmpty({ message: 'the genre cannot be empty'})
    @IsUUID()
    genre: string;
}