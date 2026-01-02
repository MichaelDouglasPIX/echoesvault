import { Injectable, NotFoundException, Param } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WishlistEntity } from "./wishlist.entity";
import { Repository } from "typeorm";
import { GameService } from "../games/game.service";
import { CreateWishlistDTO } from "./dto/create-wishlist.dto";
import { PlayerService } from "../players/player.service";
import { WishlistResponseDTO } from "./dto/wishlist-response.dto";
import { AllWishlistResponseDTO } from "./dto/all-wishlist-response.dto";
import { PlayerEntity } from "../players/player.entity";
import { PlayerWishlistResponseDTO } from "./dto/player-wishlist-response";

@Injectable()
export class WishlistService {
    constructor(
        @InjectRepository(WishlistEntity)
        private readonly wishlistRepository: Repository<WishlistEntity>,
        private playerService: PlayerService,
        private gameService: GameService
    ) { }

    async create(playerId: string, dto: CreateWishlistDTO) {
        const player = await this.playerService.findOne(playerId);
        const game = await this.gameService.findOne(dto.gameId);

        const wishlist = this.wishlistRepository.create({
            player,
            game
        });

        const savedWishlist = await this.wishlistRepository.save(wishlist);

        const wishlistResponse = new WishlistResponseDTO(
            savedWishlist.id,
            new PlayerWishlistResponseDTO(
                savedWishlist.player.id,
                savedWishlist.player.username,
                savedWishlist.player.library
            ),
            savedWishlist.game,
            savedWishlist.createdAt
        )

        return wishlistResponse;
    }

    async findOneByWishlistId(wishlistId: string) {
        const gameOnWishlist = await this.wishlistRepository.findOne({
            where: { id: wishlistId },
            relations: {
                game: true,
                player: {
                    library: true,
                }
            }
        });

        if (!gameOnWishlist) {
            throw new NotFoundException(`Wishlist with ID ${wishlistId} not found`);
        }

        const wishlist = new WishlistResponseDTO(
            gameOnWishlist.id,
            new PlayerWishlistResponseDTO(
                gameOnWishlist.player.id,
                gameOnWishlist.player.username,
                gameOnWishlist.player.library
            ),
            gameOnWishlist.game,
            gameOnWishlist.createdAt
        );

        return wishlist;
    }

    async findAllByPlayerId(playerId: string) {
        const player = await this.playerService.findOne(playerId) as PlayerEntity;
        const wishlists = await this.wishlistRepository.find({
            where: { player: { id: playerId } },
            relations: {
                game: true,
            }
        });

        return new AllWishlistResponseDTO(
            new PlayerWishlistResponseDTO(
                player.id,
                player.username,
                player.library
            ), wishlists);
    }

    async remove(whilistId: string) {
        const wishlist = await this.wishlistRepository.delete(whilistId);

        return {
            message: `wishlist ${whilistId} deleted successfully`
        }
    }
}