import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { validateId } from '../helpers';
import sendEmail from '../lib/mailer';
import { CreateUserInput, ForgotPasswordInput, ResetPasswordInput, VerifyUserInput } from '../schemas/user.schema';
import { createUser, findUserByEmail, findUserById } from '../services/user.service';

export const newUser = async (req: Request<{}, {}, CreateUserInput>, res: Response) => {
  const body = req.body;

  try {
    const user = createUser(body);

    await user.save();

    await sendEmail({
      from: 'test@example.com',
      to: user.email,
      subject: 'Please confirm your email',
      text: `verification code ${user.verificationCode}. Id: ${user._id}`,
    })

    return res.status(201).json({ message: 'User created successfully', user });
  } catch (error: any) {
    console.log(error, 'ERROR_NEW_USER');
    if (error.code === 11000) {
      return res.status(409).json({
        message: 'User already exists'
      })
    }
  }
}

export const verifyUser = async (req: Request<VerifyUserInput>, res: Response) => {
  const id = req.params.id;
  const vCode = req.params.verificationCode;

  //find the user

  try {

    if (!validateId(id)) {
      return res.status(400).json({
        message: 'Invalid ID'
      })
    }

    const user = await findUserById(id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      })
    }

    if (user.verified) {
      return res.status(409).json({
        message: 'User already verified'
      })
    }

    if (user.verificationCode === vCode) {
      user.verified = true;

      await user.save();

      return res.status(200).json({
        message: 'User verified successfully',
      })
    }
  } catch (error) {
    console.log(error, 'ERROR_VERIFY_USER');
    return res.status(500).json({
      message: 'Error verifying user'
    })
  }
}

export const forgotPassword = async (req: Request<{}, {}, ForgotPasswordInput>, res: Response) => {
  const { email } = req.body;

  try {

    const user = await findUserByEmail(email);

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

    user.passwordResetCode = uuid();

    await user.save();

    await sendEmail({
      from: 'test@example.com',
      to: user.email,
      subject: 'Please reset your password',
      text: `Password reset code ${user.passwordResetCode}. Id: ${user._id}`,
    })
    
    return res.status(200).json({
      message: `Password reset code sent to ${user.email}`
    })

  } catch (error) {
    console.log(error, 'ERROR_FORGOT_PASSWORD');
    return res.status(500).json({
      message: 'Error sending email'
    })
  }
}

export const resetPassword = async (req: Request<ResetPasswordInput['params'], {}, ResetPasswordInput['body']>, res: Response) => {

  try {

    if (!validateId(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid ID'
      })
    }

    const user = await findUserById(req.params.id);

    if (!user || !user.passwordResetCode || user.passwordResetCode !== req.params.passwordResetCode) {
      return res.status(404).json({
        message: 'Could not reser user password'
      })
    }
    
    user.passwordResetCode = null;
    user.password = req.body.password;

    await user.save();

    return res.status(200).json({
      message: 'Password reset successfully'
    })

  } catch (error) {
    console.log(error, 'ERROR_RESET_PASSWORD');
    res.status(500).json({
      message: 'Error resetting password'
    })
  }
}

export const getCurrentUser = async (req: Request, res: Response) => {
  return res.status(200).json({ user: res.locals.user });
}
