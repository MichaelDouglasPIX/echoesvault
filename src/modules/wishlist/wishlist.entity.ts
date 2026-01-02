import { CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PlayerEntity } from "../players/player.entity";
import { GameEntity } from "../games/game.entity";

@Entity({ name: 'wishlists' })
export class WishlistEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => PlayerEntity, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'player_id' })
    player: PlayerEntity;

    @ManyToOne(() => GameEntity, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'game_id' })
    game: GameEntity;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;
}