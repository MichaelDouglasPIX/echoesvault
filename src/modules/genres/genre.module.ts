import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GenreEntity } from "./genre.entity";
import { genreController } from "./genre.controller";
import { GenreService } from "./genre.service";

@Module({
    imports: [TypeOrmModule.forFeature([GenreEntity])],
    controllers: [genreController],
    providers: [GenreService]
})

export class GenreModule { }