export interface Post_Image {
  url: string;
  name: string;
  id: string;
}

export interface getPostDto {
  id: string;
  content: string;
  createDate: Date;
  updateDate: Date;
  userId: string;
  images: Post_Image[];
  user: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
  };
}
