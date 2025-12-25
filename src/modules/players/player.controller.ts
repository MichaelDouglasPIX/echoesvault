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
    async createPlayer(@Body() player: CreatePlayerDTO) {
        const playerEntity = player as PlayerEntity;

        const savedPlayer = await this.playerService.create(playerEntity);

        const playerResponse = new PlayerDTO(
            savedPlayer.id,
            savedPlayer.username,
            savedPlayer.biography,
            savedPlayer.gender
        );

        return { player: playerResponse, status: 'Player created' };
    }

    @Get()
    async listPlayers() {
        const registeredPlayers = await this.playerService.findAll();
        return registeredPlayers;
    }

    @Put('/:id')
    async updatePlayer(
        @Param('id') playerId: string,
        @Body() newData: CreatePlayerDTO,
    ) {
        await this.playerService.update(playerId, newData);

        return {
            message: `player ${playerId} updated successfully`
        }
    }

    @Delete('/:id')
    async deletePlayer(@Param('id') playerId: string) {
        await this.playerService.remove(playerId);

        return {
            message: `player ${playerId} deleted successfully`
        }
    }
}