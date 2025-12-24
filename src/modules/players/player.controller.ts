import { Body, Controller, Post, Get, Put, Param, Delete } from "@nestjs/common";
import { CreatePlayerDTO } from "./dto/create-player.dto";
import { PlayerEntity } from "./player.entity";
import { PlayerDTO } from "./dto/player-response.dto";
import { PlayerService } from "./player.service";

@Controller('/players')
export class playerController {
    constructor(
        private playerService: PlayerService
    ) { }

    @Post()
    async createPlayer(@Body() player: CreatePlayerDTO) {
        const playerEntity = player as PlayerEntity;

        const savedPlayer = await this.playerService.createPlayer(playerEntity);

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
        const registeredPlayers = await this.playerService.listPlayers();
        return registeredPlayers;
    }

    @Put('/:id')
    async updatePlayer(
        @Param('id') playerId: string,
        @Body() newData: CreatePlayerDTO,
    ) {
        await this.playerService.updatePlayer(playerId, newData);

        return {
            message: `player ${playerId} updated successfully`
        }
    }

    @Delete('/:id')
    async deletePlayer(@Param('id') playerId: string) {
        await this.playerService.deletePlayer(playerId);

        return {
            message: `player ${playerId} deleted successfully`
        }
    }
}