import React, { useState } from 'react';
import axios from 'axios';

const ClockInComponent = () => {
    const [location, setLocation] = useState({ lat: null, long: null });

    const handleClockIn = async () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    long: position.coords.longitude
                });

                try {
                    const res = await axios.post('/api/punches/in', {
                        employeeId: 'employeeIdHere', // This should be dynamically set
                        lat: position.coords.latitude,
                        long: position.coords.longitude
                    });
                    alert('Clocked in successfully!');
                } catch (error) {
                    alert(error.response.data.message);
                }
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    return (
        <button onClick={handleClockIn}>Clock In</button>
    );
};

export default ClockInComponent;