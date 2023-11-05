import config from 'config';
import jwt from 'jsonwebtoken';

export const signJwt = (
  object: Object,
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options?: jwt.SignOptions | undefined
) => {
  const signingKey = Buffer.from(
    config.get<string>(keyName),
    'base64'
  ).toString('ascii');

  return jwt.sign(object, signingKey, {
    ...(options && options),
    algorithm: 'RS256'
  })
};


export const verifyJwt = <T>(token: string, keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey'): T | null => {
  const publicKey = Buffer.from(
    config.get<string>(keyName),
    'base64'
  ).toString('ascii');

  try {
    const decoded = jwt.verify(token, publicKey);
    return decoded as T
  } catch (error) {
    console.log(error);
    return null
  }
}