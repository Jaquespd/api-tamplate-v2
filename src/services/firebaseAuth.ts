import { verify, decode } from "jsonwebtoken";
import { unauthorized, invalid, failure } from "./response";
import fs from "fs";

export const firebaseAuth = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const { idToken } = req.body;
  try {
    const buffer = fs.readFileSync("./firebaseCertToken.pem");
    const accessToken: any = verify(token, buffer);

    if (accessToken) {
      const idTokenDecoded: any = decode(idToken);
      if (accessToken.email !== idTokenDecoded.email) return invalid(res);

      const { name, picture, sub, email, email_verified } = idTokenDecoded;
      const sign_in_provider = idTokenDecoded.firebase.sign_in_provider;
      req.user = {
        firstName: name.split(" ")[0],
        lastName: name.split(" ")[1],
        picture,
        authId: sub,
        email,
        emailVerified: email_verified,
        signInProvider: sign_in_provider,
      };
      return next();
    }
    return unauthorized(res);
  } catch (err) {
    return failure(res, { error: err.message });
  }
};
