// src/App.js
import React from 'react';
import WeatherList from './components/Weather';
import { CssBaseline, Container } from '@mui/material';

const App = () => {
    return (
        <>
            <CssBaseline />
            <Container>
                <WeatherList />
            </Container>
        </>
    );
};

export default App;
