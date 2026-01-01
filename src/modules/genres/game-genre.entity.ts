import { Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GenreEntity } from "./genre.entity";
import { GameEntity } from "../games/game.entity";

@Entity({ name: 'game_genres' })
export class GameGenreEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => GenreEntity, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'genre_id'})
    genre: GenreEntity;

    @ManyToOne(() => GameEntity, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'game_id'})
    game: GameEntity;
}