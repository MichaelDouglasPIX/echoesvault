import { GenreEntity } from "src/modules/genres/genre.entity";
import { GameEntity } from "../game.entity";

export class GameGenreResponseDTO {
    constructor(
        readonly id: string,
        readonly genre: GenreEntity,
        readonly game: GameEntity
    ) { }
}