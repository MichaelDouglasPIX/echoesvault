import { Module } from '@nestjs/common';
import { PlayerModule } from './modules/players/player.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './infra/database/postgres.config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PlayerModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService]
    })],
})
export class AppModule {}
