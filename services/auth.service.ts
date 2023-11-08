import { DocumentType } from '@typegoose/typegoose';
import { omit } from 'lodash';
import { signJwt } from '../lib/jwt';
import SessionModel from '../models/session.model';
import { User, privateFields } from '../models/user.model';

export const createSession = ({ userId }: { userId: string }) => {
  const session = SessionModel.create({ user: userId });
  return session
};

export const findSessionById = (sessionId: string) => {
  return SessionModel.findById(sessionId);
};

export const signAccessToken = (user: DocumentType<User>) => {
  const payload = omit(user.toJSON(), privateFields);

  const accessToken = signJwt(payload, 'accessTokenPrivateKey', {
    expiresIn: '15m',
  });

  return accessToken;
};

export const signRefreshToken = async ({ userId }: { userId: string }) => {
  const session = await createSession({ userId });
  
  const refreshToken = signJwt(
    { session: session._id },
    'refreshTokenPrivateKey',
    {
      expiresIn: '1y',
    }
  )

  return refreshToken
};
