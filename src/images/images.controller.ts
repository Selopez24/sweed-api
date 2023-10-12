import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { Express } from 'express';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get()
  getImage() {
    this.imagesService.getImage('ast', 'ast');

    return 'test';
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  postImage(@UploadedFile() file: Express.Multer.File) {
    console.log(file);

    this.imagesService.saveImage('avatar', file.originalname, file);
  }
}
