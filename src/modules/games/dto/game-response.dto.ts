import { GameGenreEntity } from "src/modules/genres/game-genre.entity";

export class GameResponseDTO {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly studio: string,
        readonly description: string,
        readonly price: number,
        readonly releaseDate: string,
        readonly genres?: GameGenreEntity[],
    ){}
}