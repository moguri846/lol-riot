const getDataDragonImg = (key: "champion" | "spell" | "item" | "profileicon", value: string | number) => {
  return (
    <img key={value} src={`https://ddragon.leagueoflegends.com/cdn/12.4.1/img/${key}/${value}.png`} alt={`${value}`} />
  );
};

const toLocaleString = (number: number) => {
  return number.toLocaleString(navigator.language);
};

export { getDataDragonImg, toLocaleString };
