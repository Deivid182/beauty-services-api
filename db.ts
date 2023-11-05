import colors from 'colors';
import config from 'config';
import { connect, set } from 'mongoose';

export const connectDB = async () => {
  try {
    const MONGO_URI = config.get<string>('MONGO_URI');
    set('strictQuery', false);
    const conn = await connect(MONGO_URI!);
    console.log(colors.green(`MongoDB Connected: ${conn.connection.host}`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
