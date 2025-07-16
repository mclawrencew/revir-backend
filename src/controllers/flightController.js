const express = require('express');

class FlightController {
  async searchFlights(req, res) {
    try {
      const { origin, destination, departureDate, passengers = 1 } = req.query;

      if (!origin || !destination || !departureDate) {
        return res.status(400).json({
          error: 'Missing required parameters: origin, destination, departureDate'
        });
      }

      const mockFlights = [
        {
          id: 'FL001',
          airline: 'REVIR Airways',
          flightNumber: 'RV101',
          origin: origin.toUpperCase(),
          destination: destination.toUpperCase(),
          departureTime: departureDate + 'T08:00:00Z',
          arrivalTime: departureDate + 'T12:00:00Z',
          duration: '4h 00m',
          price: {
            total: Math.floor(Math.random() * 500) + 200,
            currency: 'USD'
          },
          stops: 0,
          class: 'Economy'
        },
        {
          id: 'FL002',
          airline: 'Sky Connect',
          flightNumber: 'SC202',
          origin: origin.toUpperCase(),
          destination: destination.toUpperCase(),
          departureTime: departureDate + 'T14:30:00Z',
          arrivalTime: departureDate + 'T18:45:00Z',
          duration: '4h 15m',
          price: {
            total: Math.floor(Math.random() * 400) + 150,
            currency: 'USD'
          },
          stops: 0,
          class: 'Economy'
        }
      ];

      res.json({
        success: true,
        searchParams: { origin, destination, departureDate, passengers },
        flights: mockFlights,
        meta: {
          total: mockFlights.length,
          searchTime: '1.2s',
          providers: ['REVIR Airways', 'Sky Connect']
        }
      });

    } catch (error) {
      res.status(500).json({
        error: 'Flight search failed',
        message: error.message
      });
    }
  }
}

module.exports = new FlightController();
