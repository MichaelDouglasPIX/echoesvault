import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GameEntity } from "./game.entity";
import { Repository } from "typeorm";
import { GameResponseDTO } from "./dto/game-response.dto";
import { CreateGameDTO } from "./dto/create-game.dto";

@Injectable()
export class GameService {
    constructor(
        @InjectRepository(GameEntity)
        private readonly gameRepository: Repository<GameEntity>
    ) { }

    async create(dto: CreateGameDTO) {
        const gameEntity = this.gameRepository.create({...dto});
        const savedGame = await this.gameRepository.save(gameEntity);

        const gameResponse = new GameResponseDTO(
            savedGame.id,
            savedGame.name,
            savedGame.studio,
            savedGame.description,
            savedGame.price,
            savedGame.releaseDate
        );

        return gameResponse;
    }

    async findOne(gameId: string) {
        const registeredGame = await this.gameRepository.findOneBy({ id: gameId });

        if (!registeredGame) {
            throw new NotFoundException(`Game ${gameId} not found`);
        }

        const game = new GameResponseDTO(
            registeredGame.id,
            registeredGame.name,
            registeredGame.studio,
            registeredGame.description,
            registeredGame.price,
            registeredGame.releaseDate
        );

        return game;
    }

    async findAll() {
        const registeredGames = await this.gameRepository.find();
        const gameList = registeredGames.map(
            (game) => new GameResponseDTO(
                game.id,
                game.name,
                game.studio,
                game.description,
                game.price,
                game.releaseDate
            )
        )
        return gameList;
    }

    async update(gameId: string, dto: CreateGameDTO) {
        const gameEntity = this.gameRepository.create({...dto});
        await this.gameRepository.update(gameId, gameEntity);

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