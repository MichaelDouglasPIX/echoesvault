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

    async create(playerEntity: PlayerEntity) {
        const savedPlayer = await this.playerRepository.save(playerEntity);
        return savedPlayer;
    }

    async findAll() {
        const registeredPlayers = await this.playerRepository.find();
        const playersList = registeredPlayers.map(
            (player) => new PlayerDTO(player.id, player.username, player.birthDate, player.gender)
        )

        return playersList;
    }

    async update(playerId: string, playerEntity: CreatePlayerDTO) {
        await this.playerRepository.update(playerId, playerEntity);
    }

    async remove(playerId: string) {
        await this.playerRepository.delete(playerId);
    }
}