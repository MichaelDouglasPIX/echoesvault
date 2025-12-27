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
    async create(@Body() player: CreatePlayerDTO) {
        const savedPlayer = await this.playerService.create(player);
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
        @Body() newData: CreatePlayerDTO,
    ) {
        await this.playerService.update(playerId, newData);

        return {
            message: `player ${playerId} updated successfully`
        }
    }

    @Delete('/:id')
    async delete(@Param('id') playerId: string) {
        await this.playerService.remove(playerId);

        return {
            message: `player ${playerId} deleted successfully`
        }
    }
}