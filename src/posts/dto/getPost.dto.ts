import { Image } from 'src/images/image.entity';

export interface getPostDto {
  id: string;
  content: string;
  createDate: Date;
  updateDate: Date;
  userId: string;
  images: Image[];
  user: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
  };
}
