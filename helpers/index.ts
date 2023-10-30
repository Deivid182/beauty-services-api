import mongoose from 'mongoose';

export const validateId = (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return false
  } else {
    return true;
  }
}