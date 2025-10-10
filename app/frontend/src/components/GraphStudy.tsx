import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme } from '@mui/material/styles';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';


const Card = styled('div')({
  backgroundColor: '#fff',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  width: '100%',
  boxSizing: 'content-box'
})


const otherSetting = {
  // height: 400,
  yAxis: [{ label: 'rainfall (mm)', width: 60 }],
  grid: { horizontal: true },
};

const dataset = [
  {
    london: 59,
    paris: 57,
    newYork: 86,
    seoul: 21,
    month: 'January',
  },
  {
    london: 50,
    paris: 52,
    newYork: 78,
    seoul: 28,
    month: 'February',
  },
  {
    london: 47,
    paris: 53,
    newYork: 106,
    seoul: 41,
    month: 'March',
  },
  {
    london: 54,
    paris: 56,
    newYork: 92,
    seoul: 73,
    month: 'April',
  },
  {
    london: 57,
    paris: 69,
    newYork: 92,
    seoul: 99,
    month: 'May',
  },
  {
    london: 60,
    paris: 63,
    newYork: 103,
    seoul: 144,
    month: 'June',
  },
  {
    london: 59,
    paris: 60,
    newYork: 105,
    seoul: 319,
    month: 'July',
  },
  {
    london: 65,
    paris: 60,
    newYork: 106,
    seoul: 249,
    month: 'August',
  },
  {
    london: 51,
    paris: 51,
    newYork: 95,
    seoul: 131,
    month: 'September',
  },
  {
    london: 60,
    paris: 65,
    newYork: 97,
    seoul: 55,
    month: 'October',
  },
  {
    london: 67,
    paris: 64,
    newYork: 76,
    seoul: 48,
    month: 'November',
  },
  {
    london: 61,
    paris: 70,
    newYork: 103,
    seoul: 25,
    month: 'December',
  },
];

const theme = createTheme({
  breakpoints: {
    values: {
      xl: 1536,
      lg: 1200,
      md: 900,
      sm: 600,
      xs: 300,
  }
}
});

const valueFormatter = (value: number | null) => `${value}mm`;

export default function FormatterDemo() {
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.down('xs')) // 300
  const isSm = useMediaQuery(theme.breakpoints.between('sm','md')) // 600 ~ 900
  const isMd = useMediaQuery(theme.breakpoints.between('md','lg')) // 900 ~ 1200
  const isLg = useMediaQuery(theme.breakpoints.between('lg','xl')) // 1200 ~ 1536
  const isXl = useMediaQuery(theme.breakpoints.up('xl')) // 1536 ~

  const height = isXl ? 700 : isLg ? 550 : isMd ? 450 : isSm ? 400 : isXs ? 300 : 250;
  const width = isXl ? 1000 : isLg ? 850 : isMd ? 750 : isSm ? 700 : isXs ? 600 : 500;

  console.log(height, width)

  return (
      <BarChart
      height={height}
      width={width}
      dataset={dataset}
      xAxis={[
        {
          scaleType: 'band',
          dataKey: 'month',
          valueFormatter: (month, context) =>
            context.location === 'tick'
              ? `${month.slice(0, 3)} \n2023`
              : `${month} 2023`,
          height: 40,
        },
      ]}
      series={[{ dataKey: 'seoul', label: 'Seoul rainfall', valueFormatter }]}
        {...otherSetting}
      />
  );
}