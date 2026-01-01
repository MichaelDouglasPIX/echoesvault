import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GameEntity } from "./game.entity";
import { GameController } from "./game.controller";
import { GameService } from "./game.service";
import { GenreService } from "../genres/genre.service";
import { GameGenreEntity } from "../genres/game-genre.entity";
import { GenreEntity } from "../genres/genre.entity";
import { GameGenreService } from "./game-genre.service";
import { GameGenreController } from "./game-genre.controller";

@Module({
    imports: [TypeOrmModule.forFeature([GameEntity, GameGenreEntity, GenreEntity])],
    controllers: [GameController, GameGenreController],
    providers: [GameService, GenreService, GameGenreService]
})

export class GameModule { }