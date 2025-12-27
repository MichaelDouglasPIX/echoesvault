import { LibraryEntity } from "src/modules/library/library.entity";

export class PlayerDTO {
    constructor(
        readonly id: string,
        readonly username: string,
        readonly library: LibraryEntity,
        readonly biography?: string,
        readonly birthDate?: string,
        readonly gender?: string
    ) { }
}