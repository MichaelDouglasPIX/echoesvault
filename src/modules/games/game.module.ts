import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GameEntity } from "./game.entity";
import { GameController } from "./game.controller";
import { GameService } from "./game.service";
import { GameGenreService } from "./game-genre.service";
import { GameGenreController } from "./game-genre.controller";
import { GenreModule } from "../genres/genre.module";
import { GameGenreEntity } from "../genres/game-genre.entity";

@Module({
    imports: [TypeOrmModule.forFeature([GameEntity, GameGenreEntity]), GenreModule],
    controllers: [GameController, GameGenreController],
    providers: [GameService, GameGenreService],
    exports: [GameService]
})

export class GameModule { }