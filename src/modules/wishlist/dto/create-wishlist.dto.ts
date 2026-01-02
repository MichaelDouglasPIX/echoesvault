import { IsNotEmpty, IsString } from "class-validator";

export class CreateWishlistDTO {
    @IsNotEmpty({ message: 'the game ID cannot be empty' })
    @IsString()
    gameId: string;
}