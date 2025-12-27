import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CountryService } from "./contry.service";
import { CreateCountryDTO } from "./dto/create-country.dto";

@Controller('/countries')
export class CountryController {
    constructor(
        private countryService: CountryService
    ) { }

    @Post()
    async create(@Body() dto: CreateCountryDTO) {
        const savedCountry = await this.countryService.create(dto);
        return savedCountry;
    }

    @Get()
    async findAll() {
        const registeredCountries = await this.countryService.findAll();
        return registeredCountries;
    }

    @Put('/:id')
    async update(
        @Param('id') countryId: string,
        @Body() dto: CreateCountryDTO
    ) {
        await this.countryService.update(countryId, dto);

        return {
            message: `country ${countryId} updated successfully`
        }
    }

    @Delete('/:id')
    async delete(@Param('id') countryId: string) {
        await this.countryService.remove(countryId);

        return {
            message: `country ${countryId} deleted successfully`
        }
    }
}