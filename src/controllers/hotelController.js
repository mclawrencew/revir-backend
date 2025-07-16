class HotelController {
  async searchHotels(req, res) {
    try {
      const { city, checkIn, checkOut, guests = 1 } = req.query;

      if (!city || !checkIn || !checkOut) {
        return res.status(400).json({
          error: 'Missing required parameters: city, checkIn, checkOut'
        });
      }

      const mockHotels = [
        {
          id: 'HTL001',
          name: 'REVIR Grand Hotel',
          city: city,
          rating: 4.8,
          stars: 5,
          pricePerNight: Math.floor(Math.random() * 200) + 100,
          currency: 'USD',
          amenities: ['WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant'],
          description: 'Luxury hotel in the heart of ' + city,
          images: ['hotel1.jpg'],
          availability: true
        },
        {
          id: 'HTL002',
          name: 'Budget Inn ' + city,
          city: city,
          rating: 4.2,
          stars: 3,
          pricePerNight: Math.floor(Math.random() * 80) + 40,
          currency: 'USD',
          amenities: ['WiFi', 'Breakfast', 'Parking'],
          description: 'Affordable comfort in ' + city,
          images: ['hotel2.jpg'],
          availability: true
        },
        {
          id: 'HTL003',
          name: 'Business Suites ' + city,
          city: city,
          rating: 4.5,
          stars: 4,
          pricePerNight: Math.floor(Math.random() * 150) + 80,
          currency: 'USD',
          amenities: ['WiFi', 'Business Center', 'Gym', 'Airport Shuttle'],
          description: 'Perfect for business travelers',
          images: ['hotel3.jpg'],
          availability: true
        }
      ];

      const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));

      res.json({
        success: true,
        searchParams: { city, checkIn, checkOut, guests, nights },
        hotels: mockHotels.map(hotel => ({
          ...hotel,
          totalPrice: hotel.pricePerNight * nights
        })),
        meta: {
          total: mockHotels.length,
          searchTime: '0.8s',
          providers: ['REVIR Hotels', 'Partner Networks']
        }
      });

    } catch (error) {
      res.status(500).json({
        error: 'Hotel search failed',
        message: error.message
      });
    }
  }
}

module.exports = new HotelController();
