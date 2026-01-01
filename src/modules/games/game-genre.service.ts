import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GameGenreEntity } from "../genres/game-genre.entity";
import { GenreService } from "../genres/genre.service";
import { DataSource, Repository } from "typeorm";
import { GameGenreResponseDTO } from "./dto/game-genre-response.dto";
import { UpdateGameGenreDTO } from "./dto/update-game-genre.dto";
import { GenreEntity } from "../genres/genre.entity";
import { PatchGameGenreDTO } from "./dto/patch-game-genre.dto";

@Injectable()
export class GameGenreService {
    constructor(
        private readonly dataSource: DataSource,
        @InjectRepository(GameGenreEntity)
        private readonly gameGenreRepository: Repository<GameGenreEntity>,
        private genreService: GenreService
    ) { }

    async findGenresByGame(gameId: string) {
        const gameGenres = await this.gameGenreRepository.find({
            where: {
                game: {
                    id: gameId
                }
            },
            relations: {
                genre: true
            }
        });

        if (!gameGenres || gameGenres.length === 0) {
            throw new NotFoundException(`Genres for Game ${gameId} not found`);
        }

        const genreList = gameGenres.map(
            (genre) => new GameGenreResponseDTO(
                genre.id,
                genre.genre,
                genre.game
            )
        );

        return genreList;
    }

    async findGenreByGameGenreId(genreId: string) {
        const gameGenre = await this.gameGenreRepository.findOne({
            where: {
                id: genreId,
            },
            relations: {
                genre: true,
                game: true
            }
        });

        if (!gameGenre) {
            throw new NotFoundException(`Genre ${genreId} not found`);
        }

        const gameGenreResponse = new GameGenreResponseDTO(
            gameGenre.id,
            gameGenre.genre,
            gameGenre.game
        )

        return gameGenreResponse;
    }

    async updateAllGenresByGame(gameId: string, genreIds: UpdateGameGenreDTO) {
        let genres = await this.findGenres(genreIds.genres);

        const savedGenresByGame = await this.dataSource.transaction(async (manager) => {
            const gameGenres = genres.map((genre) => {
                return manager.create(GameGenreEntity, { genre, game: { id: gameId } });
            });

            await manager.delete(GameGenreEntity, {
                game: { id: gameId }
            });

            const savedGenres = await manager.save(gameGenres);

            const genreList = savedGenres.map(
                (genre) => new GameGenreResponseDTO(
                    genre.id,
                    genre.genre,
                    genre.game
                )
            );

            return genreList;
        });

        return savedGenresByGame;
    }

    async patch(genreId: string, dto: PatchGameGenreDTO) {
        const gameGenre = await this.findGenreByGameGenreId(genreId);
        const genre = await this.genreService.findOne(dto.genre);

        const updateGenre = this.gameGenreRepository.create({
            ...gameGenre,
            genre: genre
        });

        await this.gameGenreRepository.save(updateGenre);

        return {
            message: `genre ${genreId} updated successfully from game ${updateGenre.game.id}`
        }
    }

    async removeGenresByGameGenreId(genreId: string, gameId: string) {
        await this.gameGenreRepository.delete(genreId);

        return {
            message: `genre ${genreId} deleted successfully from game ${gameId}`
        }
    }

    async removeAllGenresByGame(gameId: string) {
        await this.gameGenreRepository.delete({
            game: { id: gameId }
        });

        return {
            message: `genres deleted successfully from game ${gameId}`
        }
    }

    async findGenres(genres: string[]) {
        let genresFound: GenreEntity[] = [];

        if (genres && genres.length > 0) {
            genresFound = await Promise.all(
                genres.map(async (genreId) => {
                    const genre = await this.genreService.findOne(genreId);
                    if (!genre) {
                        throw new NotFoundException(`Genre ${genreId} not found`);
                    }
                    return genre;
                })
            );
        }

        return genresFound;
    }
}