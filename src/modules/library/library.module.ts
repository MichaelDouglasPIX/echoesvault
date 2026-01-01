import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LibraryEntity } from "./library.entity";
import { LibraryGameService } from "./library-game.service";
import { LibraryGameEntity } from "./library-game.entity";
import { LibraryGameController } from "./library-game.controller";
import { GameService } from "../games/game.service";
import { PlayerService } from "../players/player.service";
import { PlayerEntity } from "../players/player.entity";
import { GameEntity } from "../games/game.entity";
import { GameGenreEntity } from "../genres/game-genre.entity";
import { GenreService } from "../genres/genre.service";
import { GenreEntity } from "../genres/genre.entity";

@Module({
    imports: [TypeOrmModule.forFeature([LibraryEntity, LibraryGameEntity, PlayerEntity, GameEntity, GenreEntity, GameGenreEntity])],
    controllers: [LibraryGameController],
    providers: [GameService, PlayerService, LibraryGameService, GenreService]
})


export class LibraryModule {}