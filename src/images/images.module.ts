import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { ImagesController } from './images.controller';

@Module({
  imports: [SupabaseModule],
  providers: [ImagesService],
  controllers: [ImagesController],
  exports: [ImagesService],
})
export class ImagesModule {}
