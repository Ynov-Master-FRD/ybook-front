export interface IUser {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  firstname: string;
  lastname: string;
  email: string;
  avatarS3Key: string | null;
  coverPicS3Key: string | null;
  config: any;
  blockedByUsers: Array<{ id: number }>;
}
