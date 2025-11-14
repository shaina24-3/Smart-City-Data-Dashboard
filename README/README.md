 API Testing Contribution - Weather APIs

 Overview
This directory contains the Postman API testing suite for validating the three weather APIs integrated by my teammate:
- fetchWeather (GET weather by city)
- fetchForecast (GET weather forecast by coordinates)
- fetchAirQuality (GET air quality by coordinates)

Files
- `Weather_API_Testing.postman_collection.json` - Complete Postman collection with 3 endpoints and 27 tests
- `Weather_API_Environment.postman_environment.json` - Environment variables (API_KEY)

Test Coverage

fetchWeather Tests (8 tests)
✓ Status code validation
✓ Response format (JSON)
✓ Required fields: name, sys, main, weather, wind, coord
✓ Main object structure: temp, feels_like, humidity, pressure
✓ Data type validation (temperature is number)
✓ Weather array not empty
✓ Coordinates validation (lat, lon)
✓ Performance < 2 seconds

fetchForecast Tests (9 tests)
✓ Status code validation
✓ Response format (JSON)
✓ List field exists
✓ List is array
✓ List not empty
✓ Each item has: dt, main, weather
✓ Temperature data present and is number
✓ Weather description present
✓ Performance < 2 seconds

fetchAirQuality Tests (10 tests)
✓ Status code validation
✓ Response format (JSON)
✓ List field exists
✓ List not empty
✓ AQI data exists
✓ AQI is valid number (0-5)
✓ Components field exists
✓ All pollutants present: co, no2, o3, pm2_5, pm10
✓ All pollutants are numbers
✓ Performance < 2 seconds

 How to Run Tests
1. Import the Postman collection
2. Set your OpenWeather API key in environment
3. Click "Run" to execute all tests
4. View results: All 27 tests should pass

 Why This Testing Matters
- Validates API responses match frontend expectations
- Catches missing fields before frontend crashes
- Ensures data types are correct (prevents type errors)
- Monitors API performance
- Provides early error detection

Test Results
- Total Tests: 27
- Expected Pass Rate: 100%
- Average Response Time: ~500-1000ms (well under 2s limit)

 My Contribution
As the API Testing Lead, I:
- Designed 27 comprehensive test cases
- Validated response structures and data types
- Implemented performance monitoring
- Created automated test suite that integrates with team workflow
- Provided documentation for team reference
