
import React, { useState, useEffect } from 'react';
import { fetchWeatherForCities } from '../api';
import {
    Container,
    Typography,
    TextField,
    List,
    ListItem,
    ListItemText,
    Card,
    CardContent,
    Alert
} from '@mui/material';

// WeatherList component to display weather data and handle filtering

const WeatherList = () => {
    const [weatherData, setWeatherData] = useState([]); // State to store weather data
    const [searchTerm, setSearchTerm] = useState('');  // State to store search term
    const [error, setError] = useState(null); // State to store error

    // Fetch weather data for cities when component mounts
    useEffect(() => {
        const getWeatherData = async () => {
            try {
                const data = await fetchWeatherForCities(); // Fetch weather data for cities
                setWeatherData(data); // Update state with fetched data
                setError(null); // Clear error state
            } catch (error) {
                console.error('Error fetching weather data:', error); // Log error to console
                setError('Could not fetch weather data. Please try again.'); // Set error state
            }
        };

        getWeatherData(); // Call function to fetch weather data
    }, []);

    // Filter weather data based on search term
    const filteredWeatherData = weatherData.filter(weather =>
        weather.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Weather App
            </Typography>
            <TextField
                label="Search City"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {error && (
                <Alert severity="error" style={{ marginTop: '20px' }}>
                    {error}
                </Alert>
            )}
            <List>
                {filteredWeatherData.map(weather => (
                    <Card style={{ marginTop: '20px' }} key={weather.id}>
                        <CardContent>
                            <ListItem>
                                <ListItemText
                                    primary={`${weather.name}, ${weather.sys.country}`}
                                    secondary={
                                        <>
                                            <Typography variant="body1">
                                                Temperature: {weather.main.temp} °C
                                            </Typography>
                                            <Typography variant="body1">
                                                Weather: {weather.weather[0].description}
                                            </Typography>
                                            <Typography variant="body1">
                                                Humidity: {weather.main.humidity}%
                                            </Typography>
                                            <Typography variant="body1">
                                                Wind Speed: {weather.wind.speed} m/s
                                            </Typography>
                                        </>
                                    }
                                />
                            </ListItem>
                        </CardContent>
                    </Card>
                ))}
            </List>
        </Container>
    );
};

export default WeatherList;
