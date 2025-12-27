import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CountryEntity } from "./country.entity";
import { CountryController } from "./country.controller";
import { CountryService } from "./contry.service";

@Module({
    imports: [TypeOrmModule.forFeature([CountryEntity])],
    controllers: [CountryController],
    providers: [CountryService]
})

export class CountryModule { }