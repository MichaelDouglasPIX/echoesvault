import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'games'})
export class GameEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', length: 100, nullable:false})
    name: string;

    @Column({ name: 'studio', length: 100, nullable:false})
    studio: string;

    @Column({ name: 'description', type: 'text', nullable: true})
    description: string;

    //@Column({ name: 'genre', length: 100, nullable:true})
    //genre: string;

    @Column({ name: 'price', nullable:true})
    price: number;

    //@Column({ name: 'age_rating', length: 100, nullable:true})
    //ageRating: string;

    @Column({ name: 'release_date', type: 'date', nullable:true})
    releaseDate: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;
    
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;
    
    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;
}