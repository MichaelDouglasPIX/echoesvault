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

    async create(platformEntity: PlatformEntity) {
        const savedPlatform = await this.platformRepository.save(platformEntity);
        return savedPlatform;
    }

    async findAll() {
        const registeredPlatforms = await this.platformRepository.find();
        const platformList = registeredPlatforms.map(
            (platform) => new PlatformResponseDTO(platform.id, platform.name)
        )

        return platformList;
    }

    async update(platformId: string, platformEntity: CreatePlatformDTO) {
        await this.platformRepository.update(platformId, platformEntity);
    }

    async remove(platformId: string) {
        await this.platformRepository.delete(platformId);
    }
}