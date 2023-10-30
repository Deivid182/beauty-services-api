import colors from 'colors';
import app from './app';
import { PORT } from './config';
import { connectDB } from './db';

connectDB()

app.listen(PORT, () => {
  console.log( colors.yellow(`Listening on port ${PORT}`));
})