const express = require('express');
const flightController = require('../controllers/flightController');
const router = express.Router();

// GET /api/flights/search?origin=JFK&destination=LAX&departureDate=2024-08-15&passengers=1
router.get('/search', flightController.searchFlights);

module.exports = router;
