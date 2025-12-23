import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GameEntity } from "./game.entity";
import { gameController } from "./game.controller";
import { GameService } from "./game.service";

@Module({
    imports: [TypeOrmModule.forFeature([GameEntity])],
    controllers: [gameController],
    providers: [GameService]
})

export class GameModule { }