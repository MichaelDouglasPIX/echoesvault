import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { GameEntity } from "../games/game.entity";
import { LibraryEntity } from "./library.entity";

@Entity({ name: 'library_games' })
export class LibraryGameEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => LibraryEntity, (library) => library.libraryGames, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'library_id' })
    library: LibraryEntity;

    @ManyToOne(() => GameEntity, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'game_id' })
    game: GameEntity;

    @Column({ name: 'acquired_at', type: 'date', nullable: true })
    acquiredAt: string;

    @Column({ name: 'purchase_price', nullable: true })
    purchasePrice: number;

    @Column({ name: 'time_played', type: 'date', nullable: true })
    timePlayed: number;

    @Column({ name: 'last_played_at', type: 'date', nullable: true })
    lastPlayedAt: string;
}