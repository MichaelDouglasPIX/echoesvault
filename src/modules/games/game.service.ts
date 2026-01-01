import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GameEntity } from "./game.entity";
import { DataSource, Repository } from "typeorm";
import { GameResponseDTO } from "./dto/game-response.dto";
import { CreateGameDTO } from "./dto/create-game.dto";
import { GenreService } from "../genres/genre.service";
import { GenreResponseDTO } from "../genres/dto/genre-response.dto";
import { GenreEntity } from "../genres/genre.entity";
import { GameGenreEntity } from "../genres/game-genre.entity";
import { UpdateGameDTO } from "./dto/update-game.dto";

@Injectable()
export class GameService {
    constructor(
        private readonly dataSource: DataSource,
        @InjectRepository(GameEntity)
        private readonly gameRepository: Repository<GameEntity>,
    ) { }

    async create(dto: CreateGameDTO) {
        const savedGame = await this.dataSource.transaction(async (manager) => {
            let genres: GenreEntity[] = [];

            if (dto.genres && dto.genres.length > 0) {
                genres = await Promise.all(
                    dto.genres.map(async (genreId) => {
                        const genre = await manager.findOne(GenreEntity, { where: { id: genreId } });
                        if (!genre) {
                            throw new NotFoundException(`Genre ${genreId} not found`);
                        }
                        return genre;
                    })
                );
            }

            const gameEntity = manager.create(GameEntity, {
                name: dto.name,
                studio: dto.studio,
                description: dto.description,
                price: dto.price,
                releaseDate: dto.releaseDate
            });

            const game = await manager.save(gameEntity);

            const gameResponse = new GameResponseDTO(
                game.id,
                game.name,
                game.studio,
                game.description,
                game.price,
                game.releaseDate
            );

            if (!genres || genres.length == 0) {
                return gameResponse;
            }

            const gameGenres = genres.map((genre) => {
                return manager.create(GameGenreEntity, { genre, game });
            });

            await manager.save(gameGenres);

            return { ...gameResponse, genres: [...genres] };
        })

        return savedGame;
    }

    async findOne(gameId: string) {
        const registeredGame = await this.gameRepository.findOne({
            where: { id: gameId },
            relations: {
                genres: true
            }
        });

        if (!registeredGame) {
            throw new NotFoundException(`Game ${gameId} not found`);
        }

        const game = new GameResponseDTO(
            registeredGame.id,
            registeredGame.name,
            registeredGame.studio,
            registeredGame.description,
            registeredGame.price,
            registeredGame.releaseDate,
            registeredGame.genres,
        );

        return game;
    }

    async findAll() {
        const registeredGames = await this.gameRepository.find({
            relations: {
                genres: true,
            }
        });
        const gameList = registeredGames.map(
            (game) => new GameResponseDTO(
                game.id,
                game.name,
                game.studio,
                game.description,
                game.price,
                game.releaseDate,
                game.genres,
            )
        )
        return gameList;
    }

    async update(gameId: string, dto: UpdateGameDTO) {
        await this.gameRepository.update(gameId, {
                name: dto.name,
                studio: dto.studio,
                description: dto.description,
                price: dto.price,
                releaseDate: dto.releaseDate
        });

        return {
            message: `game ${gameId} updated successfully`
        }
    }

    async remove(gameId: string) {
        await this.gameRepository.delete(gameId);

        return {
            message: `game ${gameId} deleted successfully`
        }
    }
}