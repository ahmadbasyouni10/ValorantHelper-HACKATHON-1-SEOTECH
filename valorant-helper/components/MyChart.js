import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const LineChart = () => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  const [tiersData, setTiersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/competitive_tiers');
        // Filter out tiers with the name 'retrieved'
        const filteredTiers = response.data.filter(tier => tier[2] !== 'retrieved');
        // Randomly select 10 tiers from the filtered list
        let selectedTiers = [];
        for (let i = 0; i < 10; i++) {
          const randomIndex = Math.floor(Math.random() * filteredTiers.length);
          selectedTiers.push(filteredTiers[randomIndex]);
          // Remove the selected tier to avoid duplicates
          filteredTiers.splice(randomIndex, 1);
        }
        setTiersData(selectedTiers);
      } catch (error) {
        console.error('Error fetching competitive tiers data:', error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    if (chartContainer.current && tiersData.length > 0) {
      const ctx = chartContainer.current.getContext('2d');
  
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Destroy existing instance if any
      }
  
      const labels = tiersData.map(tier => tier[2]); // Tier names as x-axis labels
      
      // Randomize data: Generate random values for demonstration
      // This replaces the direct use of tier[1] with a randomized value
      // Adjust the randomization logic as needed to fit your data structure and requirements
      const data = tiersData.map(tier => Math.floor(Math.random() * 100)); // Example randomization
  
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Competitive Tiers',
            data: data,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Competitive Tiers Chart',
                    font: {
                    size: 20
                    }
                }
                },
                legend: {
                    labels: {
                        font: {
                            size: 14
                        }
                    }
                },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Tier Name',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Tier Number',
              },
              beginAtZero: true,
            }
          }
        }
      });
    }
  }, [tiersData]);

  return (
    <div>
      <canvas ref={chartContainer}></canvas>
    </div>
  );
};

export default LineChart;
