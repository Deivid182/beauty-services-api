require('dotenv').config();
import colors from 'colors';
import config from 'config';
import app from './app';
import { connectDB } from './db';

connectDB()

const PORT = config.get('PORT') as number;

app.listen(PORT, () => {
  console.log( colors.yellow(`Listening on port ${PORT}`) );
})