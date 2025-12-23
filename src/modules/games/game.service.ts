import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GameEntity } from "./game.entity";
import { Repository } from "typeorm";
import { GameResponseDTO } from "./dto/game-response.dto";

@Injectable()
export class GameService {
    constructor(
        @InjectRepository(GameEntity)
        private readonly gameRepository: Repository<GameEntity>
    ) { }

    async createGame(gameEntity: GameEntity) {
        const savedGame = await this.gameRepository.save(gameEntity);
        return savedGame;
    }

    async listGames() {
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

    async updateGame(gameId: string, gameEntity) {
        await this.gameRepository.update(gameId, gameEntity);
    }

    async deleteGame(gameId: string) {
        await this.gameRepository.delete(gameId);
    }
}