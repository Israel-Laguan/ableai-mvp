import { Request, Response } from 'express';

import { registerService } from '../services';
import { Errors } from '@shared';

export const register = async (req: Request, res: Response) => {
  const { email, password, fullName, phoneNumber } = req.body;

  try {
    const result = await registerService({
      email,
      password,
      fullName,
      phoneNumber: phoneNumber || null,
    });

    return res.status(201).json({ success: result.success });
  } catch (error) {
    const { statusCode, message } = error as Errors.ObjectError;
    return res.status(statusCode).json({ message });
  }
};
