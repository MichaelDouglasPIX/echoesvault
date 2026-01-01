import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GenreEntity } from "./genre.entity";
import { GenreController } from "./genre.controller";
import { GenreService } from "./genre.service";
import { GameGenreEntity } from "./game-genre.entity";

@Module({
    imports: [TypeOrmModule.forFeature([GenreEntity, GameGenreEntity])],
    controllers: [GenreController],
    providers: [GenreService]
})

export class GenreModule { }