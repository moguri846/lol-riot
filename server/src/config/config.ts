import dotenv from "dotenv";

dotenv.config();

const mongoDBConfig = {
  mongoDBUri: process.env.MONGODB_URI as string,
};

const riotConfig = {
  apiKey: process.env.RIOT_API_KEY as string,
};

const kakaoConfig = {
  clientId: process.env.KAKAO_CLIENT_ID as string,
  secret: process.env.KAKAO_SECRET as string,
  redirectUri: process.env.KAKAO_REDIRECT_URI as string,
};

const naverConfig = {
  clientId: process.env.NAVER_CLIENT_ID as string,
  secret: process.env.NAVER_SECRET as string,
  redirectUri: process.env.NAVER_REDIRECT_URI as string,
};

export { mongoDBConfig, riotConfig, kakaoConfig, naverConfig };
