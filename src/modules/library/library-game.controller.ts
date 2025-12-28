import { Body, Controller, Delete, Get, Injectable, Param, Post, Put } from "@nestjs/common";
import { LibraryGameService } from "./library-game.service";
import { CreateLibraryGameDTO } from "./dto/library-game.dto";

@Controller('players/:playerId/library-games')
export class LibraryGameController {
    constructor(
        private libraryGameService: LibraryGameService
    ) { }

    @Post()
    async create(@Param('playerId') playerId: string,
        @Body() dto: CreateLibraryGameDTO) {
        const savedLibraryGame = await this.libraryGameService.create(playerId, dto);
        return savedLibraryGame;
    }

    @Get()
    async findOne(@Param('playerId') playerId: string) {
        const registeredLibraryGames = await this.libraryGameService.findOneLibraryGames(playerId);
        return registeredLibraryGames;
    }

    @Put('/:id')
    async update(@Param('id') libraryGameId: string, @Body() dto: CreateLibraryGameDTO) {
        const libraryGame = await this.libraryGameService.update(libraryGameId, dto);
        return libraryGame;
    }

    @Delete('/:id')
    async delete(@Param('id') libraryGameId: string ) {
        const libraryGame = await this.libraryGameService.remove(libraryGameId);
        return libraryGame;
    }
}