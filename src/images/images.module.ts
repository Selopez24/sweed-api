import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './image.entity';
import { ImagesService } from './images.service';
import { SupabaseModule } from '../supabase/supabase.module';
import { ImagesController } from './images.controller';

@Module({
  imports: [SupabaseModule, TypeOrmModule.forFeature([Image])],
  providers: [ImagesService],
  controllers: [ImagesController],
})
export class ImagesModule {}
