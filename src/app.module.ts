import { Module } from '@nestjs/common';
import { PlayerModule } from './modules/players/player.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './infra/database/postgres.config.service';
import { ConfigModule } from '@nestjs/config';
import { GameModule } from './modules/games/game.module';
import { PlatformModule } from './modules/platforms/platform.module';

@Module({
  imports: [
    PlayerModule,
    GameModule,
    PlatformModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService]
    })],
})
export class AppModule {}
