import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { GameService } from "./game.service";
import { CreateGameDTO } from "./dto/create-game.dto";

@Controller('/games')
export class GameController {
    constructor(
        private gameService: GameService
    ) { }

    @Post()
    async createGame(@Body() dto: CreateGameDTO) {
        const savedGame = await this.gameService.create(dto);
        return savedGame;
    }

    @Get('/:id')
    async findOne(
        @Param('id') gameId: string 
    ) {
        const registeredGame = await this.gameService.findOne(gameId);
        return registeredGame;
    }

    @Get()
    async findAll() {
        const registeredGames = await this.gameService.findAll();
        return registeredGames;
    }

    @Put('/:id')
    async update(
        @Param('id') gameId: string,
        @Body() dto: CreateGameDTO
    ) {
        const game = await this.gameService.update(gameId, dto);
        return game;
    }

    @Delete('/:id')
    async remove(@Param('id') gameId: string) {
        const game = await this.gameService.remove(gameId);
        return game;
    }
}