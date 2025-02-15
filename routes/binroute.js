const express =require('express');
const router = express.Router();

// Define routes
router.get('/', (req, res) => {
  res.json({ message: 'hi from bin' });
});


module.exports = router;
