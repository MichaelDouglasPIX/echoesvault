import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlatformEntity } from "./platform.entity";
import { platformController } from "./platform.controller";
import { PlatformService } from "./platform.service";

@Module({
    imports: [TypeOrmModule.forFeature([PlatformEntity])],
    controllers: [platformController],
    providers: [PlatformService]
})

export class PlatformModule { }