import express from 'express';
const router = express.Router();

// Define routes
router.get('/', (req, res) => {
  res.json({ message: 'hi from bin' });
});


export default router;
