import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'players' })
export class PlayerEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'username', length: 100, nullable: false })
    username: string;

    @Column({ name: 'password', length: 255, nullable: false })
    password: string;

    @Column({ name: 'biography', type: 'text', nullable: true })
    biography: string;

    @Column({ name: 'birth_date', type: 'date', nullable: true })
    birthDate: string;

    @Column({ name: 'gender', length: 100, nullable: true })
    gender: string;

    @Column({ name: 'email', length: 70, nullable: false })
    email: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;
}