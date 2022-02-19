import Joi from "joi";
import { success, invalid, failure, notFound } from "../../services/response";
import { Sessions } from "../../repositories/sessions";

export default async (req, res) => {
  const { refreshToken } = req.body;
  const schema = Joi.object({
    refreshToken: Joi.string().min(3).max(36).required(),
  });

  try {
    await schema.validateAsync({ refreshToken });
  } catch (err) {
    console.log("***Error:", err.message);
    return invalid(res, { error: err.message });
  }
  try {
    const oldRefreshToken = await Sessions.findRefreshToken({ refreshToken });
    if (!oldRefreshToken) {
      return notFound(res, { error: "Refresh token not exist." });
    }
    const date = new Date();
    const now = date.getTime();
    const expiredToken = oldRefreshToken.expiresIn < Math.round(now / 1000);
    if (expiredToken) {
      return invalid(res, { error: "Refresh token expired!" });
    }

    const newToken = await Sessions.createAccessToken({
      userId: oldRefreshToken.userId,
    });

    const newRefreshToken = await Sessions.createRefreshToken({
      userId: oldRefreshToken.userId,
    });

    const credentials = {
      token: newToken,
      refreshToken: newRefreshToken,
      provider: "beiramar.com",
    };

    return success(res, {
      credentials,
    });
  } catch (err) {
    console.log("***Error:", err.message);
    return failure(res, { error: err.message });
  }
};
