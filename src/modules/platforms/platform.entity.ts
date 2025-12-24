import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'platforms' })
export class PlatformEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', length: 255, nullable: false, unique: true})
    name: string;
}