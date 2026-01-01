import { Body, Controller, Delete, Get, Param, Patch, Put } from "@nestjs/common";
import { GameGenreService } from "./game-genre.service";
import { UpdateGameGenreDTO } from "./dto/update-game-genre.dto";
import { PatchGameGenreDTO } from "./dto/patch-game-genre.dto";

@Controller('/games/:gameId/games-genres')
export class GameGenreController{
    constructor(
        private gameGenreService: GameGenreService
    ) { }

    @Get()
    async findGenresByGame(@Param('gameId') gameId: string) {
        const registeredGenresByGame = await this.gameGenreService.findGenresByGame(gameId); 
        return registeredGenresByGame;
    }

    @Get('/:id')
    async findGenreByGameGenreId(@Param('id') genreId: string) {
        const genreByGameGenreId = await this.gameGenreService.findGenreByGameGenreId(genreId);
        return genreByGameGenreId;
    }

    @Put()
    async updateGenresByGame(
        @Param('gameId') gameId: string,
        @Body() dto: UpdateGameGenreDTO
    ) {
        const updatedGenresByGame = await this.gameGenreService.updateAllGenresByGame(gameId, dto);
        return updatedGenresByGame;
    }

    @Patch('/:id')
    async updateGenreByGameGenreId(@Param('id') genreId: string, @Body() dto: PatchGameGenreDTO) {
        const updatedGenreByGameGenreId = await this.gameGenreService.patch(genreId, dto);
        return updatedGenreByGameGenreId;
    }

    @Delete('/:id')
    async remove(@Param('gameId') gameId: string, @Param('id') genreId: string ) {
        const game = await this.gameGenreService.removeGenresByGameGenreId(genreId, gameId);
        return game;
    }

    @Delete()
    async removeAll(@Param('gameId') gameId: string,) {
        const game = await this.gameGenreService.removeAllGenresByGame(gameId);
        return game;
    }
}