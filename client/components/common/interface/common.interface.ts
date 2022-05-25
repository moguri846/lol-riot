export interface IGetDataDragonImgParameter {
  width: number;
  height: number;
  key: "champion" | "spell" | "item" | "profileicon";
  value: string | number;
}
