export interface IRequestResponse<T> {
  status: number;
  data: {
    data: T
  };
}
