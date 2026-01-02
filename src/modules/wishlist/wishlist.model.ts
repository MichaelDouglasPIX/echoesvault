import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WishlistEntity } from "./wishlist.entity";
import { WishlistController } from "./wishlist.controller";
import { WishlistService } from "./wishlist.service";
import { GameService } from "../games/game.service";
import { PlayerService } from "../players/player.service";
import { GameEntity } from "../games/game.entity";
import { PlayerEntity } from "../players/player.entity";

@Module({
    imports: [TypeOrmModule.forFeature([WishlistEntity, GameEntity, PlayerEntity])],
    controllers: [WishlistController],
    providers: [WishlistService, GameService, PlayerService]
})

export class WishlistModule { }