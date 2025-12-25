import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { PlatformService } from "./platform.service";
import { CreatePlatformDTO } from "./dto/create-platform.dto";
import { PlatformEntity } from "./platform.entity";
import { PlatformResponseDTO } from "./dto/platform-response.dto";

@Controller('/platforms')
export class PlatformController {
    constructor(
        private platformService: PlatformService
    ) { }

    @Post()
    async createPlatform(@Body() platform: CreatePlatformDTO) {
        const platformEntity = platform as PlatformEntity;

        const savedPlatform = await this.platformService.create(platformEntity);

        const platformResponse = new PlatformResponseDTO(
            savedPlatform.id,
            savedPlatform.name
        );

        return { platform: platformResponse, status: 'game created' }
    }

    @Get()
    async listPlatforms() {
        const registeredPlatforms = await this.platformService.findAll();
        return registeredPlatforms;
    }

    @Put('/:id')
    async updatePlatform(
        @Param('id') platformId: string,
        @Body() newData: CreatePlatformDTO
    ) {
        await this.platformService.update(platformId, newData);

        return {
            message: `platform ${platformId} updated successfully`
        }
    }

    @Delete('/:id')
    async deletePlatform(@Param('id') platformId: string) {
        await this.platformService.remove(platformId);

        return {
            message: `platform ${platformId} deleted successfully`
        }
    }
}