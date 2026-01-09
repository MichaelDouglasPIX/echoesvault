import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateWishlistDTO {
    @IsNotEmpty({ message: 'the game ID cannot be empty' })
    @IsUUID()
    gameId: string;
}