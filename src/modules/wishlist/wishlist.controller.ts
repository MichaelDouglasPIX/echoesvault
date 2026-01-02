import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { WishlistService } from "./wishlist.service";
import { CreateWishlistDTO } from "./dto/create-wishlist.dto";

@Controller('players/:playerId/wishlists')
export class WishlistController {
    constructor(
        private wishlistService: WishlistService
    ) { }

    @Post()
    async createWishlist(@Param('playerId') playerId: string, @Body() dto: CreateWishlistDTO) {
        const savedWishlist = await this.wishlistService.create(playerId, dto); 
        return savedWishlist;
    }

    @Get('/:id')
    async findWishlistById(@Param('id') wishlistId: string) {
        const wishlist = await this.wishlistService.findOneByWishlistId(wishlistId);
        return wishlist;
    }

    @Get()
    async findAllWishlistsByPlayer(@Param('playerId') playerId: string) {
        const wishlists = await this.wishlistService.findAllByPlayerId(playerId);
        return wishlists;
    }

    @Delete('/:id')
    async delete(@Param('id') wishlistId: string) {
        const wishlist = await this.wishlistService.remove(wishlistId);
        return wishlist;
    }
}