import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LibraryEntity } from "./library.entity";
import { LibraryGameService } from "./library-game.service";
import { LibraryGameEntity } from "./library-game.entity";

@Module({
    imports: [TypeOrmModule.forFeature([LibraryEntity, LibraryGameEntity])],
    providers: [LibraryGameService]
})


export class LibraryModule {}