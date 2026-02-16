import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RoomsModule } from './rooms/rooms.module';
import { SessionsModule } from './sessions/sessions.module';
import { RealtimeModule } from './realtime/realtime.module';
import { StatsModule } from './stats/stats.module';
import { InfraModule } from './infra/infra.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [HealthModule, AuthModule, RoomsModule, SessionsModule, RealtimeModule, StatsModule, InfraModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
