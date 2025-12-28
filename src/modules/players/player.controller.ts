import { Body, Controller, Post, Get, Put, Param, Delete } from "@nestjs/common";
import { CreatePlayerDTO } from "./dto/create-player.dto";
import { PlayerEntity } from "./player.entity";
import { PlayerDTO } from "./dto/player-response.dto";
import { PlayerService } from "./player.service";

@Controller('/players')
export class PlayerController {
    constructor(
        private playerService: PlayerService
    ) { }

    @Post()
    async create(@Body() dto: CreatePlayerDTO) {
        const savedPlayer = await this.playerService.create(dto);
        return savedPlayer;
    }

    @Get()
    async findAll() {
        const registeredPlayers = await this.playerService.findAll();
        return registeredPlayers;
    }

    @Put('/:id')
    async update(
        @Param('id') playerId: string,
        @Body() dto: CreatePlayerDTO,
    ) {
        const player = await this.playerService.update(playerId, dto);
        return player;
    }

    @Delete('/:id')
    async delete(@Param('id') playerId: string) {
        const player = await this.playerService.remove(playerId);
        return player;
    }
}