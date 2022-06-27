import Image from "next/image";
import { IGetDataDragonImgParameter } from "../interface/common.interface";

const getDataDragonImg = ({ width, height, key, value }: IGetDataDragonImgParameter) => {
  return (
    <Image
      width={width}
      height={height}
      key={value}
      src={`https://ddragon.leagueoflegends.com/cdn/12.12.1/img/${key}/${value}.png`}
      alt={`${value}`}
    />
  );
};

const toLocaleString = (number: number) => {
  return number.toLocaleString(navigator.language);
};

export { getDataDragonImg, toLocaleString };
