import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { Express } from 'express';

@Injectable()
export class ImagesService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getImage(imageName: string, Bucket: string) {
    const client = await this.supabaseService.getClient();

    console.log(client);
  }

  async saveImage(
    folder: string,
    fileName: string,
    file: Express.Multer.File,
  ): Promise<any> {
    const client = await this.supabaseService.getClient();

    const { data, error } = await client.storage
      .from('Images')
      .upload(`${folder}/${fileName}`, file.buffer, { upsert: true });

    console.log(data);
    console.log(error);

    return 'success';
  }
}
