import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { GameEntity } from "../games/game.entity";
import { LibraryEntity } from "./library.entity";

@Entity({ name: 'library_games' })
export class LibraryGameEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'acquired_at', type: 'date', nullable: false })
    acquiredAt: string;

    @Column({ name: 'purchase_price', nullable: true })
    purchasePrice: number;

    @Column({ name: 'time_played', nullable: true })
    timePlayed: number;

    @Column({ name: 'last_played_at', type: 'date', nullable: true })
    lastPlayedAt: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;

    @ManyToOne(() => LibraryEntity, (library) => library.libraryGames, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'library_id' })
    library: LibraryEntity;

    @ManyToOne(() => GameEntity, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'game_id' })
    game: GameEntity;
}