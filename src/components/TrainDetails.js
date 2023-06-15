import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TrainDetails = () => {
  const { trainNumber } = useParams();
  const [train, setTrain] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://104.211.219.98/train/trains/${trainNumber}`,
          {
            headers: {
              Authorization: 'Bearer MOJPAT'
            }
          }
        );
        setTrain(response.data);
      } catch (error) {
        console.error('Error fetching train data:', error);
      }
    };

    fetchData();
  }, [trainNumber]);

  if (!train) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Train Details</h1>
      <h2>Train Name: {train.trainName}</h2>
      <h2>Train Number: {train.trainNumber}</h2>
      <h2>Departure Time: {train.departureTime.Hours}:{train.departureTime.Minutes}</h2>
      <h2>Seats Available (Sleeper): {train.seatsAvailable.sleeper}</h2>
      <h2>Seats Available (AC): {train.seatsAvailable.AC}</h2>
      <h2>Price (Sleeper): {train.price.sleeper}</h2>
      <h2>Price (AC): {train.price.AC}</h2>
      <h2>Delayed By: {train.delayedBy}</h2>
    </div>
  );
};

export default TrainDetails;
