import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'countries'})
export class CountryEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'code', length: 100, nullable: false})
    code: string;

    @Column({ name: 'name', length: 100, nullable: false})
    name: string;
}