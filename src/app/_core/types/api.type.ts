export interface UserApiResponse<T> {
  message: string;
  user: T;
}

export interface PostUserResponse {
  acknowledged: boolean;
  insertedId: string;
}
