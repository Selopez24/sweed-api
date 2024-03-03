import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { Express } from 'express';
import { CreateSignedUrlDTO } from './dto/CreateSignedUrlDTO';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async postImage(@UploadedFile() file: Express.Multer.File) {
    await this.imagesService.saveImage('avatar', file.originalname, file);
    return 'Image saved successfully';
  }
  @Post('upload-url')
  async crerteSignedUrl(@Body() createSignedUrlDTO: CreateSignedUrlDTO) {
    return await this.imagesService.createSignedUrl(
      createSignedUrlDTO.bucket,
      createSignedUrlDTO.path,
    );
  }
}
