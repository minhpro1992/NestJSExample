import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesEntity } from './messages/messages.entity';
import { MessagesModule } from './messages/messages.module';
import { ReportsEntity } from './reports/reports.entity';
import { ReportsModule } from './reports/reports.module';
import { UsersEntity } from './users/users.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db_copy.sqlite',
      entities: [MessagesEntity, UsersEntity, ReportsEntity],
      synchronize: true,
      autoLoadEntities: true,
    }),
    MessagesModule,
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
