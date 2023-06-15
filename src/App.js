import React, { useState, useEffect } from 'react';

function App() {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const urlList = urlParams.getAll('url');

      const promises = urlList.map(async (url) => {
        try {
          const response = await fetch(url);
          const data = await response.json();
          return data.numbers;
        } catch (error) {
          console.error(`Failed to fetch data from ${url}`, error);
          return [];
        }
      });

      Promise.all(promises)
        .then((results) => {
          const mergedNumbers = results.flat().filter((number, index, array) => array.indexOf(number) === index);
          const sortedNumbers = mergedNumbers.sort((a, b) => a - b);
          setNumbers(sortedNumbers);
        })
        .catch((error) => {
          console.error('Failed to fetch data from one or more URLs', error);
        });
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Number Management Service</h1>
      <h2>Numbers:</h2>
      <ul>
        {numbers.map((number) => (
          <li key={number}>{number}</li>
        ))}
      </ul>

      <h2>Test Server APIs:</h2>
      <ul>
        <li>
          <a href="http://104.211.219.98/numbers/primes" target="_blank" rel="noopener noreferrer">
            http://104.211.219.98/numbers/primes
          </a>
        </li>
        <li>
          <a href="http://104.211.219.98/numbers/fibo" target="_blank" rel="noopener noreferrer">
            http://104.211.219.98/numbers/fibo
          </a>
        </li>
        <li>
          <a href="http://104.211.219.98/numbers/odd" target="_blank" rel="noopener noreferrer">
            http://104.211.219.98/numbers/odd
          </a>
        </li>
        <li>
          <a href="http://104.211.219.98/numbers/rand" target="_blank" rel="noopener noreferrer">
            http://104.211.219.98/numbers/rand
          </a>
        </li>
      </ul>
    </div>
  );
}

export default App;
