import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoomsModule } from './chat-rooms/chat-rooms.module';
import { AuthModule } from './auth/auth.module';
import config from 'ormconfig';

@Module({
  imports: [ChatRoomsModule, UsersModule, TypeOrmModule.forRoot(config), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
