import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { GameService } from "./game.service";
import { CreateGameDTO } from "./dto/create-game.dto";
import { GameEntity } from "./game.entity";
import { GameResponseDTO } from "./dto/game-response.dto";

@Controller('/games')
export class GameController {
    constructor(
        private gameService: GameService
    ) { }

    @Post()
    async createGame(@Body() game: CreateGameDTO) {
        const gameEntity = game as GameEntity;

        const savedGame = await this.gameService.create(gameEntity);

        const gameResponse = new GameResponseDTO(
            savedGame.id,
            savedGame.name,
            savedGame.studio,
            savedGame.description,
            savedGame.price,
            savedGame.releaseDate
        );

        return { game: gameResponse, status: 'game created' }
    }

    @Get()
    async listGames() {
        const registeredGames = await this.gameService.findAll();
        return registeredGames;
    }

    @Put('/:id')
    async updateGames(
        @Param('id') gameId: string,
        @Body() newData: CreateGameDTO
    ) {
        await this.gameService.update(gameId, newData);

        return {
            message: `game ${gameId} updated successfully`
        }
    }

    @Delete('/:id')
    async deleteGame(@Param('id') gameId: string) {
        await this.gameService.remove(gameId);

        return {
            message: `game ${gameId} deleted successfully`
        }
    }
}