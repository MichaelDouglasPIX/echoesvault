import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'age_ratings'})
export class AgeRatingEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'rating', length: 255, nullable: false})
    rating: string;
}