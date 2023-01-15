import { IUser } from "./User";

export interface IPost {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    htmlContent: string;
    user: IUser;
    postLikes: IPostLike[];
    postComments: IPostComment[];
    postAttachments: IPostAttachment[];
}
  
  interface IPostLike {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    user: IUser;
    post: IPost;
    userId: number;
    postId: number;
  }
  
  interface IPostComment {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    user: IUser;
    post: IPost;
    userId: number;
    postId: number;
    text: string;
  }
  
  interface IPostAttachment {
    id: number;
    post: IPost;
    postId: number;
    type: DocumentType;
    s3Key: string;
  }
  

  
  