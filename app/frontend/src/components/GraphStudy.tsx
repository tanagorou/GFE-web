import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme } from '@mui/material/styles';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import { data } from 'react-router-dom';



// const valueFormatter = (value: number | null) => `${value}mm`;
const valueFormatter = (value: number | null) => {
  if(value === null) return '0分'
  const hour = Math.floor(value / 60)
  const minute = value % 60
  return `${hour}時間${minute}分`
}

const valueFormatterForYAxis = (value: number | null) => {
  if(value === null) return '0分'
  const hour = Math.floor(value / 60)
  if(hour > 0) return `${hour}時間`
  return `${value}分`
}

type Time = {
  time: number,
  date: string
}

type DatasetProps = {
  dataset?: Time[]
}

// Xラベルで月/日を表示
const getMonthAndDay = (date: string) => {
  const data = date.split('/')
  data[1].replace('0', '')
  data[2].replace('0', '')
  const data1 = data[1] + '/' + data[2]
  return data1
}

export default function FormatterDemo({dataset}: DatasetProps) {
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.down('xs')) // 300
  const isSm = useMediaQuery(theme.breakpoints.between('sm','md')) // 600 ~ 900
  const isMd = useMediaQuery(theme.breakpoints.between('md','lg')) // 900 ~ 1200
  const isLg = useMediaQuery(theme.breakpoints.between('lg','xl')) // 1200 ~ 1536
  const isXl = useMediaQuery(theme.breakpoints.up('xl')) // 1536 ~

  const height = isXl ? 700 : isLg ? 400 : isMd ? 300 : isSm ? 250 : isXs ? 200 : 150;  
  const width = isXl ? 1000 : isLg ? 850 : isMd ? 600 : isSm ? 500 : isXs ? 400 : 300;

  return (
      <BarChart
      height={height}
      width={width}
      dataset={dataset}
      xAxis={[
        {
          scaleType: 'band',
          dataKey: 'date',
          valueFormatter: (date, context) =>
            context.location === 'tick'
              ? `${getMonthAndDay(date)} \n${date.slice(-1)}`
              : `${date}`,
          height: 40,
        },
      ]}
      yAxis={[
        {
          width: 60,
          dataKey: 'time',
          valueFormatter: valueFormatterForYAxis,
        }
      ]}
      series={[{ dataKey: 'time', label: '作業時間', valueFormatter }]}
      />
  );
}

