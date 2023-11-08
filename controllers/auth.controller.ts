import { Request, Response } from 'express';
import { get } from 'lodash';
import { verifyJwt } from '../lib/jwt';
import { CreateSessionInput } from '../schemas/user.schema';
import { findSessionById, signAccessToken, signRefreshToken } from '../services/auth.service';
import { findUserByEmail, findUserById } from '../services/user.service';

export const createSession = async (req: Request<{}, {}, CreateSessionInput>, res: Response) => {

  try {

    const user = await findUserByEmail(req.body.email);

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      })
    }
    

    if (!user.verified) {
      return res.status(409).json({
        message: 'User not verified'
      })
    }

    const isValidPassword = await user.validatePassword(req.body.password);

    if (!isValidPassword) {
      return res.status(401).json({
        message: 'Invalid credentials'
      })
    }

    //console.log(isValidPassword, 'IS_VALID_PASSWORD');

    //sign an access token
    const accesToken = signAccessToken(user);

    //sign a refresh token
    const refreshToken = await signRefreshToken({ userId: String(user._id) });

    //send the tokens
    return res.status(200).json({
      accesToken,
      refreshToken
    })
    
  } catch (error) {
    console.log(error, 'ERROR_CREATE_SESSION');
    res.status(500).json({
      message: 'Error creating session'
    })
  } 
}

export const refreshAccessToken = async (req: Request, res: Response) => {
  let refreshToken = get(req, 'headers.x-refresh');

  if(Array.isArray(refreshToken)) {
    refreshToken = refreshToken[0];
  }

  if(!refreshToken) {
    return res.status(401).send("Could not refresh access token");
  }

  const decoded = verifyJwt<{ session: string }>(refreshToken, 'refreshTokenPublicKey');
  

  console.log(decoded);

  if (!decoded) {
    console.log("decoded not found");
    return res.status(401).send("Could not refresh access token");
  }

  const session = await findSessionById(decoded.session);

  if (!session || !session.valid) {
    console.log("session not found or invalid");
    return res.status(401).json("Could not refresh access token");
  }

  const user = await findUserById(String(session.user));

  if (!user) {
    console.log("user not found");
    return res.status(401).json("Could not refresh access token");
  }

  const accessToken = signAccessToken(user);

  return res.send({ accessToken });
}

