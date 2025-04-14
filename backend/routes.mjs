import express from 'express';

export const router = express.Router();

router.get('/', async (req, res) => {
  res.json({ status: 'OK' });
});

router.get('/location', async (req, res) => {
  console.log('here is location');
});
