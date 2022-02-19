import axios from "axios";
import { verify } from "jsonwebtoken";
import fs from "fs";

export const downloadAuthProviderCert = async () => {
  try {
    const response = await axios.get(process.env.FIREBASE_CERT_URL);
    const certs = Object.values(response.data);
    const tokenTest =
      "eyJhbGciOiJSUzI1NiIsImtpZCI6ImY0YmIyMjBjZDA5NGIwYWU5MGRkNzNlMTBjMTBlN2RiNTRiODkyODAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjQwODc0MjA4NDQtb2I3Z3ZqOHVvYzVtN21sZG1mZ2UxZWt2MmRjdjRucnMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2NDA4NzQyMDg0NC1vYjdndmo4dW9jNW03bWxkbWZnZTFla3YyZGN2NG5ycy5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExNjAzNDk5MTMxNTQ3Njk2NTc2OCIsImVtYWlsIjoiamFxdWVzcGRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJqOVExTUdreEtnSTBKZ1JDdEphUUZnIiwiaWF0IjoxNjQ1Mjg1NjMzLCJleHAiOjE2NDUyODkyMzN9.SokD5lvZjq0U4BC3T4whHMoQ8QDYYr_Fzn0VqVJQzeYaLlXm4VSNq7_HUv0MITIe11HFmR7m0c6iRSZGKJBpmL_VfZuAgReliZ5RroS7hPT6_IKuMM6utGNBNO0z57vAqxJcq-9SP9QmN75AQI7HzgmfOfEOzkWymlY7QEM0lf4r4yUIAPvf3LgbRge6G8mjxSOchTmDZPkw12l7hb0q77nYjqHBjWyBiqQ7m2aC5eWsC79-Lqg05BsbXfpEV6pq-zGGyYO7P0i3u_C6Mun9Avv5Qvw_sL6SPNNx64tZqkSNfw1yknqXv_uXBQgLGFk-hWI3XD9m4qgbnrsNeXTKTA";
    for (const cert of certs) {
      const bufferCert = Buffer.from(cert.toString(), "utf-8");
      try {
        verify(tokenTest, bufferCert);
        // The goal is to fall into error because the token is expired.
        // And save only the valid certificate.
      } catch (err) {
        if (err.message.includes("signature")) continue;
        fs.writeFileSync("./firebaseCertToken.pem", bufferCert);
      }
    }
  } catch (err) {
    if (err) console.log("ERROR", err);
    return false;
  }
  return true;
};
