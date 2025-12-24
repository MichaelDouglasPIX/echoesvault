import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PlatformEntity } from "./platform.entity";
import { Repository } from "typeorm";
import { PlatformResponseDTO } from "./dto/platform-response.dto";
import { CreatePlatformDTO } from "./dto/create-platform.dto";

@Injectable()
export class PlatformService {
    constructor(
        @InjectRepository(PlatformEntity)
        private readonly platformRepository: Repository<PlatformEntity>
    ) { }

    async createPlatform(platformEntity: PlatformEntity) {
        const savedPlatform = await this.platformRepository.save(platformEntity);
        return savedPlatform;
    }

    async listPlatform() {
        const registeredPlatforms = await this.platformRepository.find();
        const platformList = registeredPlatforms.map(
            (platform) => new PlatformResponseDTO(platform.id, platform.name)
        )

        return platformList;
    }

    async updatePlatform(platformId: string, platformEntity: CreatePlatformDTO) {
        const platform = await this.platformRepository.update(platformId, platformEntity);
    }

    async deletePlatform(platformId: string) {
        const platform = await this.platformRepository.delete(platformId);
    }
}