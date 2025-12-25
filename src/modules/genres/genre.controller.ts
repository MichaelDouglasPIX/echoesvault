import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { GenreService } from "./genre.service";
import { CreateGenreDTO } from "./dto/create-genre.dto";
import { GenreEntity } from "./genre.entity";
import { GenreResponseDTO } from "./dto/genre-response.dto";

@Controller('/genres')
export class GenreController {
    constructor(
        private genreService: GenreService
    ) { }

    @Post()
    async create(@Body() genre: CreateGenreDTO) {
        const genreEntity = genre as GenreEntity;

        const savedGenre = await this.genreService.create(genreEntity);

        const genreResponse = new GenreResponseDTO(
            savedGenre.id,
            savedGenre.name
        );

        return { genre: genreResponse, status: 'Genre created' };
    }

    @Get()
    async findAll() {
        const registeredGenres = await this.genreService.findAll();
        return registeredGenres;
    }

    @Put('/:id')
    async update(
        @Param('id') genreId: string,
        @Body() dto: CreateGenreDTO
    ) {
        await this.genreService.update(genreId, dto);

        return {
            message: `genre ${genreId} updated successfully`
        }
    }

    @Delete('/:id')
    async remove(@Param('id') genreId: string) {
        await this.genreService.remove(genreId);

        return {
            message: `genre ${genreId} deleted successfully`
        }
    }
}