import { LibraryEntity } from "src/modules/library/library.entity";

export class PlayerWishlistResponseDTO {
    constructor(
        readonly id: string,
        readonly username: string,
        readonly library: LibraryEntity
    ) {}
}