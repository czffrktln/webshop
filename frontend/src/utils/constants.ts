const googleLink = "https://accounts.google.com/o/oauth2/v2/auth";
const clientId =
  "792684856006-ss8nuq7c2rokb0vu9cadmjnb2pnkohig.apps.googleusercontent.com";
const redirectUri = "http://localhost:5173/callback";
const scope = "openid%20email%20profile";
const responseType = "code";

export const googleLoginUrl = `${googleLink}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}&prompt=consent`;
