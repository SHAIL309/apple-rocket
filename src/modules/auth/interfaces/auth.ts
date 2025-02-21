export interface IUser {
  username: string;
  email: string;
  password: string;
  confirm_Password?: string;
}

export interface IPayload<T> {
  data: T;
  cb?: (response?: any) => void;
}
