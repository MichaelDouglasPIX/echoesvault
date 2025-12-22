import { Body, Controller, Post, Get, Put, Param, Delete } from "@nestjs/common";
import { PlayerRepository } from "src/modules/players/player.repository";
import { CreatePlayerDTO } from "./dto/CreatePlayer.dto";
import { PlayerEntity } from "./player.entity";
import { PlayerDTO } from "./dto/Player.dto";
import { PlayerService } from "./player.service";

@Controller('/players')
export class playerController {
    constructor(
        private playerRepository: PlayerRepository,
        private playerService: PlayerService
    ) {}

    @Post()
    async createPlayer(@Body() player: CreatePlayerDTO) {
        const playerEntity = player as PlayerEntity;

        await this.playerService.createPlayer(playerEntity);
        
        return {player: new PlayerDTO(player.username, player.birthDate, player.gender), status: 'Player created'};
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
        const updatedPlayer = await this.playerService.updatePlayer(playerId, newData);

        return {
            message: `player ${playerId} updated successfully`
        }
    }

    @Delete('/:id')
    async deletePlayer(@Param('id') playerId: string) {
        const deletedPlayer = await this.playerService.deletePlayer(playerId);

        return {
            player: deletedPlayer,
            message: `player ${playerId} deleted successfully`
        }
    }
}