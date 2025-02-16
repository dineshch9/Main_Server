const express =require('express');
const router = express.Router();

// Define routes
router.get('/', (req, res) => {
  res.redirect(301, 'https://dineshch9.netlify.app/');
});


module.exports = router;
