import { ExtractJwt } from "passport-jwt";
import { getSeconds } from "../utils/getSeconds";

const JWTConfig = {
  TTL: getSeconds(process.env.ACCESS_TOKEN_SECRET), // 15min
  TTL2: getSeconds(process.env.REFRESH_TOKEN_SECRET), // 7days
  Options: {
    audience: "example.com",
    issuer: "api.example.com",
    secretOrKey: process.env.SECRET_KEY  || "123",
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
} as const;

export default JWTConfig;

// export function verify(token: string, ACCESS_TOKEN_SECRET: string | undefined) {
//   throw new Error("Function not implemented.");
// }
