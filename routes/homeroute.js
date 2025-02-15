const express =require('express');
const router = express.Router();

// Define routes
router.get('/', (req, res) => {
  res.json({ message: 'hi from main server' });
});


module.exports = router;
