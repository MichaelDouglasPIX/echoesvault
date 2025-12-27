import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PlayerEntity } from "../players/player.entity";
import { LibraryGameEntity } from "./library-game.entity";

@Entity({ name: 'libraries' })
export class LibraryEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => LibraryGameEntity, (libraryGames) => libraryGames.library)
    libraryGames: LibraryGameEntity[];

    @OneToOne(() => PlayerEntity, (player) => player.library)
    player: PlayerEntity;
}