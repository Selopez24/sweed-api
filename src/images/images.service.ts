import { Injectable } from '@nestjs/common';
import { POST_IMGAGES } from 'src/consts/bucket';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class ImagesService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async createSignedUrl(path: string): Promise<any> {
    const client = await this.supabaseService.getClient();

    const { data, error } = await client.storage
      .from(POST_IMGAGES)
      .createSignedUploadUrl(path);

    console.log(data, error);

    return data;
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

    return { data, error };
  }

  async deleteImages(paths: string[]): Promise<void> {
    const client = await this.supabaseService.getClient();

    const { error } = await client.storage.from(POST_IMGAGES).remove(paths);

    if (error) {
      throw error;
    }
  }
}
