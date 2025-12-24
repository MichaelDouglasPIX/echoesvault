import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PlayerEntity } from "./player.entity";
import { Repository } from "typeorm";
import { PlayerDTO } from "./dto/player-response.dto";
import { CreatePlayerDTO } from "./dto/create-player.dto";

@Injectable()
export class PlayerService {
    constructor(
        @InjectRepository(PlayerEntity)
        private readonly playerRepository: Repository<PlayerEntity>
    ) { }

    async createPlayer(playerEntity: PlayerEntity) {
        const savedPlayer = await this.playerRepository.save(playerEntity);
        return savedPlayer;
    }

    async listPlayers() {
        const registeredPlayers = await this.playerRepository.find();
        const playersList = registeredPlayers.map(
            (player) => new PlayerDTO(player.id, player.username, player.birthDate, player.gender)
        )

        return playersList;
    }

    async updatePlayer(playerId: string, playerEntity: CreatePlayerDTO) {
        await this.playerRepository.update(playerId, playerEntity);
    }

    async deletePlayer(playerId: string) {
        await this.playerRepository.delete(playerId);
    }
}