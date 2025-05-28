import type { Request, Response } from 'express';

import { PrivateGig } from '../db';

const { privateDataUserRepository } = PrivateGig;

export const getPrivateDataUserById = async (req: Request, res: Response) => {
  try {
    const response = await privateDataUserRepository.getById(req.params.id);
    res.json(response);
  } catch (error) {
    console.error('Error fetching private data user by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getPrivateDataUsers = async (req: Request, res: Response) => {
  try {
    const sort = req.query.sort as 'asc' | 'desc' | undefined;
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const offset = req.query.offset ? Number(req.query.offset) : undefined;
    const where = req.query.where ? JSON.parse(req.query.where as string) : undefined;

    const response = await privateDataUserRepository.getAll({ sort, limit, offset, where });
    res.json(response);
  } catch (error) {
    console.error('Error fetching private data users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createPrivateDataUser = async (req: Request, res: Response) => {
  try {
    const response = await privateDataUserRepository.create(req.body);
    res.json(response);
  } catch (error) {
    console.error('Error creating private data user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updatePrivateDataUserById = async (req: Request, res: Response) => {
  try {
    const response = await privateDataUserRepository.updateById(req.params.id, req.body);
    res.json(response);
  } catch (error) {
    console.error('Error updating private data user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deletePrivateDataUserById = async (req: Request, res: Response) => {
  try {
    const response = await privateDataUserRepository.deleteById(req.params.id);
    res.json(response);
  } catch (error) {
    console.error('Error deleting private data user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
