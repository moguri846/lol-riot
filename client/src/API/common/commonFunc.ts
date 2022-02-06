const makeQueryString = (obj: any) => {
  let url = "";

  for (let prop in obj) {
    url += `${prop}=${obj[prop]}&`;
  }

  url = url.substring(0, url.length - 1);

  return url;
};

export { makeQueryString };
