import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GenreEntity } from "./genre.entity";
import { In, Repository } from "typeorm";
import { GenreResponseDTO } from "./dto/genre-response.dto";
import { CreateGenreDTO } from "./dto/create-genre.dto";

@Injectable()
export class GenreService {
    constructor(
        @InjectRepository(GenreEntity)
        private readonly genreRepository: Repository<GenreEntity>
    ) { }

    async create(genreEntity: GenreEntity) {
        const savedGenre = await this.genreRepository.save(genreEntity);
        return savedGenre;
    }

    async findOne(genreId: string) {
        const registeredGenre = await this.genreRepository.findOneBy({ id: genreId });

        if (!registeredGenre) {
            throw new NotFoundException(`Genre ${genreId} not found`);
        }

        const genre = new GenreResponseDTO(
            registeredGenre.id,
            registeredGenre.name
        );

        return genre;
    }

    async findAll() {
        const registeredGenres = await this.genreRepository.find();
        const genreList = registeredGenres.map(
            (genre) => new GenreResponseDTO(genre.id, genre.name)
        );

        return genreList;
    }

    async findBy(genres: string[]) {
        const genresFound = await this.genreRepository.findBy({
            id: In(genres)
        });

        if (genresFound.length !== genres.length) {
            const foundIds = genresFound.map((genre) => genre.id);

            const missingIds = genres.filter(
                (id) => !foundIds.includes(id)
            );

            throw new NotFoundException( `genres not found: ${missingIds.join(', ')}`);
        }

        return genresFound;
    }

    async update(genreId: string, genreEntity: CreateGenreDTO) {
        await this.genreRepository.update(genreId, genreEntity);
    }

    async remove(genreId: string) {
        await this.genreRepository.delete(genreId);
    }
}