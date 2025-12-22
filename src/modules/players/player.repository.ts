import { Injectable } from "@nestjs/common";
import { PlayerEntity } from "./player.entity";

@Injectable()
export class PlayerRepository {
    private players: PlayerEntity[] = [];

    async register(player: PlayerEntity) {
        this.players.push(player);
    }

    async list() {
        return this.players;
    }

    async existEmail(email: string) {
        const emailFound = this.players.find(
            player => player.email === email
        ) 

        return emailFound !== undefined;
    }
}