const express = require('express');
const hotelController = require('../controllers/hotelController');
const router = express.Router();

// GET /api/hotels/search?city=Paris&checkIn=2024-08-15&checkOut=2024-08-17&guests=2
router.get('/search', hotelController.searchHotels);

module.exports = router;
