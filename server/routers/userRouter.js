import bcrypt from "bcryptjs";
import jwt, { decode } from "jsonwebtoken";
import express from "express";
import User from "../db/userModel.js";
import Token from "../db/tokenModel.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { email, password, confrimPassword, firstName, lastName } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist)
      return res.status(400).json({
        message: "There is a user with this email",
      });

    if (password !== confrimPassword)
      return res.status(400).json({
        message: "Passwords do not match",
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      name: `${firstName} ${lastName}`,
      password: hashedPassword,
    });

    const accessToken = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "3m" }
    );

    const refreshToken = jwt.sign(
      { email: user.email, id: user._id },
      process.env.REFRESH_TOKEN_SECRET
    );

    await Token.create({
      userId: user._id,
      refreshToken: refreshToken,
    });

    res.cookie("token", refreshToken, { httpOnly: true, sameSite: "strict" });


    res.status(200).json({ user, accessToken });
  } catch (error) {
    console.log(error);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found",
      });

    const isPasswordCorrect = await bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect)
      return res.status(404).json({
        message: "Wrong password",
      });

    const accessToken = jwt.sign(
      { email: user.email, id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15s" }
    );

    const refreshToken = jwt.sign(
      { email: user.email, id: user._id },
      process.env.REFRESH_TOKEN_SECRET
    );

    await Token.findOneAndUpdate(
      { userId: user._id },
      { refreshToken: refreshToken },
      { new: true }
    );
    res.cookie("token", refreshToken, { httpOnly: true, sameSite: "strict" });
    res.status(200).json({ user, accessToken });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/logout/:id", async (req, res) => {
  try {
    const { id } = req.params;

    res.clearCookie("token")
    await Token.findOneAndUpdate(
      {
        userID: id,
      },
      { refreshToken: null },
      { new: true }
    );

    res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/refresh/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { refreshToken } = await Token.findOne({ userId: id });
    if (!refreshToken) return res.sendStatus(401);

    const cookie = req.cookies.token;

    if(!cookie) res.sendStatus(403)


    if(cookie !== refreshToken) res.sendStatus(401)

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decodedRefreshToken) => {
        if (err) return res.status(403).json(err);
        const accessToken = jwt.sign(
          { email: decodedRefreshToken.email, id: decodedRefreshToken.id },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15s" }
        );
        res.status(200).json(accessToken);
      }
    );
  } catch (error) {
    console.log(error.message);
  }
});

export default router;
