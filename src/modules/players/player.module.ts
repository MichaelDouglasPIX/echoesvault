import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { playerController } from "./player.controller";
import { PlayerRepository } from "./player.repository";
import { UniqueEmailValidator } from "./validator/email.validator";
import { PlayerService } from "./player.service";
import { PlayerEntity } from "./player.entity";

@Module({
    imports: [TypeOrmModule.forFeature([PlayerEntity])],
    controllers: [playerController],
    providers: [PlayerService, PlayerRepository, UniqueEmailValidator]
})
export class PlayerModule {}