import { WishlistEntity } from "../wishlist.entity";
import { PlayerWishlistResponseDTO } from "./player-wishlist-response";

export class AllWishlistResponseDTO {
    constructor(
        readonly player: PlayerWishlistResponseDTO,
        readonly wishlist: WishlistEntity[]
    ) { }
}