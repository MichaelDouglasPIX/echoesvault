import { PlayerWishlistResponseDTO } from "./player-wishlist-response";
import { GameEntity } from "src/modules/games/game.entity";

export class WishlistResponseDTO {
    constructor(
        readonly id: string,
        readonly player: PlayerWishlistResponseDTO,
        readonly game: GameEntity,
        readonly createdAt: string
    ) { }
}