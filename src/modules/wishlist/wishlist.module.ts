import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WishlistEntity } from "./wishlist.entity";
import { WishlistController } from "./wishlist.controller";
import { WishlistService } from "./wishlist.service";
import { GameService } from "../games/game.service";
import { PlayerService } from "../players/player.service";
import { GameEntity } from "../games/game.entity";
import { PlayerEntity } from "../players/player.entity";
import { PlayerModule } from "../players/player.module";
import { GameModule } from "../games/game.module";
import { GenreModule } from "../genres/genre.module";

@Module({
    imports: [TypeOrmModule.forFeature([WishlistEntity]), PlayerModule, GameModule],
    controllers: [WishlistController],
    providers: [WishlistService]
})

export class WishlistModule { }