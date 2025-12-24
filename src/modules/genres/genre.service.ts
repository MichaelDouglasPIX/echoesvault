import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GenreEntity } from "./genre.entity";
import { Repository } from "typeorm";
import { GenreResponseDTO } from "./dto/genre-response.dto";
import { CreateGenreDTO } from "./dto/create-genre.dto";

@Injectable()
export class GenreService {
    constructor(
        @InjectRepository(GenreEntity)
        private readonly genreRepository: Repository<GenreEntity>
    ) { }

    async createGenre(genreEntity: GenreEntity) {
        const savedGenre = await this.genreRepository.save(genreEntity);
        return savedGenre;
    }

    async listGenres() {
        const registeredGenres = await this.genreRepository.find();
        const genreList = registeredGenres.map(
            (genre) => new GenreResponseDTO(genre.id, genre.name)
        );

        return genreList;
    }

    async updateGenre(genreId: string, genreEntity: CreateGenreDTO) {
        await this.genreRepository.update(genreId, genreEntity);
    }

    async deleteGenre(genreId: string) {
        await this.genreRepository.delete(genreId);
    }
}