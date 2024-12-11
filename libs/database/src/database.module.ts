import { Module } from '@nestjs/common';
import { DatabaseService } from '@app/database/database.service';

@Module({
  imports: [],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
