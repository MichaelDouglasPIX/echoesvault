import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LibraryEntity } from "./library.entity";
import { LibraryGameService } from "./library-game.service";
import { LibraryGameEntity } from "./library-game.entity";
import { LibraryGameController } from "./library-game.controller";
import { PlayerModule } from "../players/player.module";
import { GameModule } from "../games/game.module";
import { GenreModule } from "../genres/genre.module";

@Module({
    imports: [TypeOrmModule.forFeature([LibraryEntity, LibraryGameEntity]), PlayerModule, GameModule, GenreModule],
    controllers: [LibraryGameController],
    providers: [LibraryGameService]
})


export class LibraryModule { }