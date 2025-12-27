import { GameEntity } from "src/modules/games/game.entity";
import { LibraryEntity } from "../library.entity";

export class LibraryGameResponseDTO {
    constructor(
        readonly id: string,
        readonly library: LibraryEntity,
        readonly game: GameEntity,
        readonly acquiredAt: string,
        readonly purchasePrice: number,
        readonly timePlayed: number,
        readonly lastPlayedAt: string
    ) {}
}