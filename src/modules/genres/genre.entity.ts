import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { GameGenreEntity } from "./game-genre.entity";

@Entity({ name: 'genres' })
export class GenreEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', length: 255, nullable: false, unique: true})
    name: string;
}