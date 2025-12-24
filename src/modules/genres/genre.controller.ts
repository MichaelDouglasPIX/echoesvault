import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { GenreService } from "./genre.service";
import { CreateGenreDTO } from "./dto/create-genre.dto";
import { GenreEntity } from "./genre.entity";
import { GenreResponseDTO } from "./dto/genre-response.dto";

@Controller('/genres')
export class genreController {
    constructor(
        private genreService: GenreService
    ) { }

    @Post()
    async createGenre(@Body() genre: CreateGenreDTO) {
        const genreEntity = genre as GenreEntity;

        const savedGenre = await this.genreService.createGenre(genreEntity);

        const genreResponse = new GenreResponseDTO(
            savedGenre.id,
            savedGenre.name
        );

        return { genre: genreResponse, status: 'Genre created' };
    }

    @Get()
    async listGenres() {
        const registeredGenres = await this.genreService.listGenres();
        return registeredGenres;
    }

    @Put('/:id')
    async updateGenre(
        @Param('id') genreId: string,
        @Body() newData: CreateGenreDTO
    ) {
        await this.genreService.updateGenre(genreId, newData);

        return {
            message: `genre ${genreId} updated successfully`
        }
    }

    @Delete('/:id')
    async deleteGenre(@Param('id') genreId: string) {
        await this.genreService.deleteGenre(genreId);

        return {
            message: `genre ${genreId} deleted successfully`
        }
    }
}