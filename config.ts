import config from 'config';
import { CorsOptions } from 'cors';

const ORIGIN = config.get<string>('ORIGIN');

const whiteList = [ORIGIN];

export const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(ORIGIN) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}