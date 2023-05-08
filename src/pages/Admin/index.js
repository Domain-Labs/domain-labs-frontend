import './index.scss';

import { Box, Typography } from '@mui/material';
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import React, { useState } from 'react';

import { Line } from 'react-chartjs-2';
import { useTheme } from '../../contexts/theme';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  Tooltip,
  Legend,
);

const Admin = () => {
  const { theme } = useTheme();
  const [timePeriod, setTimePeriod] = useState(1);

  const color = theme === 'dark-theme' ? 'white' : '#2A2A2A';
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'center',
      },
      subtitle: {
        display: false,
      },
      title: {
        display: true,
        text: 'Revenue',
        color: color,
        font: {
          size: 24,
        },
      },
    },
    layout: {
      padding: 10,
    },
    scales: {
      y: {
        grid: {
          drawBorder: true,
          color: color,
        },
        ticks: {
          color: color,
          font: {
            size: 14,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: color,
          beginAtZero: true,
          font: {
            size: 14,
          },
        },
      },
    },
  };

  const labels = [
    'Jan 07',
    'Jan 08',
    'Jan 09',
    'Jan 10',
    'Jan 11',
    'Jan 12',
    'Jan 13',
    'Jan 14',
    'Jan 15',
    'Jan 16',
    'Jan 17',
    'Jan 18',
    'Jan 19',
    'Jan 20',
    'Jan 21',
    'Jan 22',
    'Jan 23',
    'Jan 24',
    'Jan 25',
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'Revenue',
        data: labels.map(() => Math.random() * 1000),
        borderWidth: 1,
        borderColor: '#1366A7',
        backgroundColor: '#1366A7FF',
      },
    ],
  };

  const numberofAccess = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Number Of Access',
        data: labels.map(() => Math.random() * 1000),
        borderWidth: 1,
        borderColor: '#1366A7',
        backgroundColor: '#1366A744',
      },
    ],
  };

  const domainsPurchased = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Number of Domains Purchased',
        data: labels.map(() => Math.random() * 1000),
        borderWidth: 1,
        borderColor: '#1366A7',
        backgroundColor: '#1366A744',
      },
    ],
  };
  return (
    <Box
      mt={'100px'}
      px={'50px'}
      style={{
        backgroundColor: theme === 'dark-theme' ? '#2A2A2A' : 'white',
      }}
    >
      <div className="statistics-header">
        <Typography
          color={theme === 'dark-theme' ? 'white' : 'black'}
          fontSize={{ md: '2.999vw', xs: '2.5707vw' }}
        >
          Domain Buy Statistics
        </Typography>

        <Box className="period-wrapper">
          <Typography
            color={theme === 'dark-theme' ? 'white' : 'black'}
            fontSize={{ md: '1.499vw', xs: '1.0707vw' }}
            border={
              theme === 'dark-theme' ? '1px solid white' : '1px solid black'
            }
            px={'20px'}
            py={'5px'}
            borderRadius={'15px'}
            onClick={() => setTimePeriod(2)}
          >
            Month
          </Typography>

          <Typography
            color={theme === 'dark-theme' ? 'white' : 'black'}
            fontSize={{ md: '1.499vw', xs: '1.0707vw' }}
            border={
              theme === 'dark-theme' ? '1px solid white' : '1px solid black'
            }
            px={'20px'}
            py={'5px'}
            borderRadius={'15px'}
            onClick={() => setTimePeriod(1)}
          >
            Day
          </Typography>

          <Typography
            color={theme === 'dark-theme' ? 'white' : 'black'}
            fontSize={{ md: '1.499vw', xs: '1.0707vw' }}
            border={
              theme === 'dark-theme' ? '1px solid white' : '1px solid black'
            }
            px={'20px'}
            py={'5px'}
            borderRadius={'15px'}
            onClick={() => setTimePeriod(0)}
          >
            Hour
          </Typography>
        </Box>
      </div>

      {/* <Box className="access-count-chart" mb={"100px"}>
        <CanvasJSChart options={accessChartOptions} />
      </Box>

      <Box className="purchased-count-chart" mb={"100px"}>
        <CanvasJSChart options={purchasedChartOptions} />
      </Box>

      <Box className="revenue-chart" mb={"100px"}>
        <CanvasJSChart options={reveuneChartOptions} />
      </Box> */}
      <Box
        sx={{
          width: '100%',
          height: '400px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Line options={options} data={data} />
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '400px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Line
          options={{
            ...options,
            plugins: {
              ...options.plugins,
              title: { ...options.plugins.title, text: 'Number Of Access' },
            },
          }}
          data={numberofAccess}
        />
      </Box>

      <Box
        sx={{
          width: '100%',
          height: '400px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Line
          options={{
            ...options,
            plugins: {
              ...options.plugins,
              title: {
                ...options.plugins.title,
                text: 'Number Of Domains Purchased',
              },
            },
          }}
          data={domainsPurchased}
        />
      </Box>
    </Box>
  );
};

export default Admin;
