import { Router } from 'express';

const router = Router();

router.get('/health', (req, res) => {
  res.status(200).json({
    server: 'up',
    timestamp: new Date().toISOString(),
  });
});

export default router as Router;
