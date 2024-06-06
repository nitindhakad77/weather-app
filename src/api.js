// src/api.js
import axios from 'axios';

const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '20ca77e43d142d5df5bbeb8edd1c53bc';

const cities = [
    { name: 'New York', lat: 40.7128, lon: -74.0060 },
    { name: 'Los Angeles', lat: 34.0522, lon: -118.2437 },
    { name: 'Chicago', lat: 41.8781, lon: -87.6298 },
    { name: 'Houston', lat: 29.7604, lon: -95.3698 },
    { name: 'Phoenix', lat: 33.4484, lon: -112.0740 },
    { name: 'Philadelphia', lat: 39.9526, lon: -75.1652 },
    { name: 'San Antonio', lat: 29.4241, lon: -98.4936 },
    { name: 'San Diego', lat: 32.7157, lon: -117.1611 },
    { name: 'Dallas', lat: 32.7767, lon: -96.7970 },
    { name: 'San Jose', lat: 37.3382, lon: -121.8863 },
    { name: 'Austin', lat: 30.2672, lon: -97.7431 },
    { name: 'Jacksonville', lat: 30.3322, lon: -81.6557 },
    { name: 'Fort Worth', lat: 32.7555, lon: -97.3308 },
    { name: 'Columbus', lat: 39.9612, lon: -82.9988 },
    { name: 'Charlotte', lat: 35.2271, lon: -80.8431 },
    { name: 'San Francisco', lat: 37.7749, lon: -122.4194 },
    { name: 'Indianapolis', lat: 39.7684, lon: -86.1581 },
    { name: 'Seattle', lat: 47.6062, lon: -122.3321 },
    { name: 'Denver', lat: 39.7392, lon: -104.9903 },
    { name: 'Washington', lat: 38.9072, lon: -77.0369 },
    { name: 'Boston', lat: 42.3601, lon: -71.0589 },
    { name: 'El Paso', lat: 31.7619, lon: -106.4850 },
];

export const fetchWeatherForCities = async () => {
    try {
        const promises = cities.map(city =>
            axios.get(API_URL, {
                params: {
                    lat: city.lat,
                    lon: city.lon,
                    appid: API_KEY,
                    units: 'metric'
                }
            })
        );
        const responses = await Promise.all(promises);
        return responses.map((response, index) => ({
            ...response.data,
            name: cities[index].name
        }));
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};
