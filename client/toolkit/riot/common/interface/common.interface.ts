export type IInitialStateType<T> = T | Failed;

export interface Failed {
  status: number;
  message: string;
}
