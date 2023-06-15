import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TrainList = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://104.211.219.98/train/trains', {
          headers: {
            Authorization: 'Bearer MOJPAT'
          }
        });
        setTrains(response.data);
      } catch (error) {
        console.error('Error fetching train data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>All Trains</h1>
      <ul>
        {trains.map((train) => (
          <li key={train.trainNumber}>
            <Link to={`/trains/${train.trainNumber}`}>{train.trainName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrainList;
