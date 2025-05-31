import type { Request, Response } from 'express';

import { Repositories } from '../dependency-injection';

const { userRepository } = Repositories;

export const getUserById = async (req: Request, res: Response) => {
  try {
    const response = await userRepository.getById(req.params.id);
    res.json(response);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const sort = req.query.sort as 'asc' | 'desc' | undefined;
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const offset = req.query.offset ? Number(req.query.offset) : undefined;
    const where = req.query.where ? JSON.parse(req.query.where as string) : undefined;

    const response = await userRepository.getAll({ sort, limit, offset, where });
    res.json(response);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const response = await userRepository.create(req.body);
    res.json(response);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateUserById = async (req: Request, res: Response) => {
  try {
    const response = await userRepository.updateById(req.params.id, req.body);
    res.json(response);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const response = await userRepository.deleteById(req.params.id);
    res.json(response);
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
