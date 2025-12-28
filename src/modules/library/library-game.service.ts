import { Body, Injectable, NotFoundException, Param } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LibraryGameEntity } from "./library-game.entity";
import { PlayerService } from "../players/player.service";
import { LibraryGameResponseDTO } from "./dto/library-game-response.dto";
import { CreateLibraryGameDTO } from "./dto/library-game.dto";
import { GameService } from "../games/game.service";

@Injectable()
export class LibraryGameService {
    constructor(
        @InjectRepository(LibraryGameEntity)
        private readonly libraryGameRepository: Repository<LibraryGameEntity>,
        private gameService: GameService,
        private playerService: PlayerService
    ) { }

    async create(playerId: string, dto: CreateLibraryGameDTO) {
        const player = await this.playerService.findOne(playerId);
        const game = await this.gameService.findOne(dto.game);

        const libraryGame = this.libraryGameRepository.create({
            ...dto,
            game,
            library: player.library
        });

        const savedLibraryGame = await this.libraryGameRepository.save(libraryGame);

        const libraryGameResponse = new LibraryGameResponseDTO(
            savedLibraryGame.id,
            savedLibraryGame.library,
            savedLibraryGame.game,
            savedLibraryGame.acquiredAt,
            savedLibraryGame.purchasePrice,
            savedLibraryGame.timePlayed,
            savedLibraryGame.lastPlayedAt
        )

        return libraryGameResponse;
    }

    async findOneLibraryGames(playerId: string) {
        const player = await this.playerService.findOne(playerId);
        const registeredLibraryGames = await this.libraryGameRepository.find({
            where: { library: player.library },
            relations: {
                library: true,
                game: true
            }
        });

        if (!registeredLibraryGames) {
            throw new NotFoundException(`Library Games from ${playerId} not found`);
        }

        const libraryGames = registeredLibraryGames.map(
            (libraryGame) =>
                new LibraryGameResponseDTO(
                    libraryGame.id,
                    libraryGame.library,
                    libraryGame.game,
                    libraryGame.acquiredAt,
                    libraryGame.purchasePrice,
                    libraryGame.timePlayed,
                    libraryGame.lastPlayedAt
                ))

        return libraryGames;
    }

    async findAll() {
        const registeredLibraryGames = await this.libraryGameRepository.find({
            relations: {
                game: true,
            }
        });

        const libraryGameList = registeredLibraryGames.map(
            (libraryGame) => new LibraryGameResponseDTO(
                libraryGame.id,
                libraryGame.library,
                libraryGame.game,
                libraryGame.acquiredAt,
                libraryGame.purchasePrice,
                libraryGame.timePlayed,
                libraryGame.lastPlayedAt)
        )

        return libraryGameList;
    }

    async update(
        @Param('id') libraryGameId: string,
        @Body() dto: CreateLibraryGameDTO
    ) {
        const game = await this.gameService.findOne(dto.game);

        const libraryGame = this.libraryGameRepository.create({
            ...dto,
            game
        });

        await this.libraryGameRepository.update(libraryGameId, libraryGame);

        return {
            message: `library game ${libraryGameId} updated successfully`
        }
    }

    async remove(libraryGameId: string) {
        await this.libraryGameRepository.delete(libraryGameId);

        return {
            message: `library game ${libraryGameId} deleted successfully`
        }
    }
}