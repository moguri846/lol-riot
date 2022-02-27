const getDataDragonImg = (key: string, value: string | number) => {
  return (
    <img key={value} src={`https://ddragon.leagueoflegends.com/cdn/12.3.1/img/${key}/${value}.png`} alt={`${value}`} />
  );
};

export { getDataDragonImg };
