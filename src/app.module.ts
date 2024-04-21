import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoomsModule } from './chat-rooms/chat-rooms.module';
import { AuthModule } from './auth/auth.module';
import config from 'ormconfig';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ChatRoomsModule, 
    UsersModule, 
    TypeOrmModule.forRoot(config), 
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
