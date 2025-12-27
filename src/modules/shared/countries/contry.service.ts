import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CountryEntity } from "./country.entity";
import { Repository } from "typeorm";
import { CountryResponseDTO } from "./dto/country-response.dto";
import { CreateCountryDTO } from "./dto/create-country.dto";

@Injectable()
export class CountryService {
    constructor(
        @InjectRepository(CountryEntity)
        private readonly countryRepository: Repository<CountryEntity>
    ) { }

    async create(country: CreateCountryDTO) {
        const countryEntity = country as CountryEntity;

        const savedCountry = await this.countryRepository.save(countryEntity);

        const countryResponse = new CountryResponseDTO(
            savedCountry.id,
            savedCountry.code,
            savedCountry.name
        );

        return countryResponse;
    }

    async findAll() {
        const registeredCountries = await this.countryRepository.find();

        const countriesList = registeredCountries.map(
            (country) => new CountryResponseDTO(
                country.id,
                country.code,
                country.name
            )
        )

        return countriesList;
    }

    async update(countryId: string, countryEntity: CreateCountryDTO) {
        await this.countryRepository.update(countryId, countryEntity);
    }

    async remove(countryId: string) {
        await this.countryRepository.delete(countryId);
    }
}