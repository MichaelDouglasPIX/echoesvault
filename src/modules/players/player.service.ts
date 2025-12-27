import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PlayerEntity } from "./player.entity";
import { DataSource, Repository } from "typeorm";
import { PlayerDTO } from "./dto/player-response.dto";
import { CreatePlayerDTO } from "./dto/create-player.dto";
import { LibraryEntity } from "../library/library.entity";

@Injectable()
export class PlayerService {
    constructor(
        private readonly dataSource: DataSource,
        @InjectRepository(PlayerEntity)
        private readonly playerRepository: Repository<PlayerEntity>
    ) { }

    async create(player: CreatePlayerDTO) {
        const playerEntity = player as PlayerEntity;

        const savedPlayer = await this.dataSource.transaction(async (manager) => {
            const library = manager.create(LibraryEntity);
            const player = manager.create(PlayerEntity, { ...playerEntity, library });

            return manager.save(player);
        })

        const playerResponse = new PlayerDTO(
            savedPlayer.id,
            savedPlayer.username,
            savedPlayer.library,
            savedPlayer.birthDate,
            savedPlayer.biography,
            savedPlayer.gender
        );

        return playerResponse;
    }

    async findAll() {
        const registeredPlayers = await this.playerRepository.find({
            relations: {
                library: true,
            }
        });

        const playersList = registeredPlayers.map(
            (player) => new PlayerDTO(player.id, player.username, player.library, player.birthDate, player.gender)
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