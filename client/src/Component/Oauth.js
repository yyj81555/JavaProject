const REST_API_KEY = "3a80fea018fc149a49837a8d88094df5";
const REDIRECT_URI =  "http://localhost:3000/KakaoCode";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;