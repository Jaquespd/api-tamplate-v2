import axios from "axios";
import { verify, decode } from "jsonwebtoken";
import { unauthorized, invalid, failure } from "./response";

export const firebaseAuth = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const { idToken } = req.body;
  try {
    const response = await axios.get(process.env.FIREBASE_CERT_URL);
    const certs = Object.values(response.data);

    for (const cert of certs) {
      const bufferCert = Buffer.from(cert.toString(), "utf-8");
      try {
        const accessToken: any = verify(token, bufferCert);
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
      } catch (err) {
        if (err) console.log("Error", err.message);
        continue;
      }
    }
    return unauthorized(res);
  } catch (err) {
    return failure(res, { error: err.message });
  }
};
