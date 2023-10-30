import colors from 'colors';
import { connect, set } from 'mongoose';
import { MONGO_URI } from './config';

export const connectDB = async () => {
  try {
    set('strictQuery', false);
    const conn = await connect(MONGO_URI!);
    console.log(colors.green(`MongoDB Connected: ${conn.connection.host}`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
