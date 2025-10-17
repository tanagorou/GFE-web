import { useEffect, useState, useRef } from 'react'
import CircularProgress from './CircularProgress'
import { IconButton } from '@mui/material';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import RotateLeftOutlinedIcon from '@mui/icons-material/RotateLeftOutlined';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { useStudyTime } from '../context/StudyContext';


const TimerContainer = styled('div')({
  height: '100%',
  display: 'flex',
  // height: '100%',
  // width: '100%',
  // backgroundColor: 'red',
  flexDirection: 'column'
})

const TimerCircle = styled('div')({
  display: 'flex',
  flex: '1 1 70%',
  // width: '100%',
  // height: '60%',
  // backgroundColor: 'blue',
  // alignItems: 'center',
  // justifyContent: 'center',
  // paddingTop: '5%'
})

const TimerButton = styled('div')({
  flex: 1,
  // backgroundColor: 'green',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})



const ONE_SECONDS = 1000;
const ONE_MINUTES = 60000;
const ONE_HOURS = 3600000;


type timerProps = {
  onOpenRecordConfirmModal: () => void
}

export default function Timer({onOpenRecordConfirmModal}: timerProps){
  const { studyTime,
          restTime, 
          restState, 
          setNextTimeState, 
          timerCount, 
          setTimerCount } = useStudyTime()

  const start = () => {
    if(studyTime !== 0){
      setNextTimeState('active')
    }
  }

  const stop = () => {
    setNextTimeState('standby')
    onOpenRecordConfirmModal()
  }

  const reset = () => {
    console.log('rest', restState)
    setNextTimeState('standby')
    if(restState){
      setTimerCount(restTime)
    } else {
      setTimerCount(studyTime)
    }
  }

  return(
    <TimerContainer className='TimerContainer'>
      <TimerCircle className='TimerCircle'>
        <CircularProgress totalMs={restState ? restTime : studyTime} remainingMs={timerCount} />
      </TimerCircle>
      <div className='TimerButtonContainer' style={{flex: '1 1 30%'}}>
        <TimerButton className='TimerButton'>
          <IconButton onClick={() => start()}><PlayCircleFilledWhiteOutlinedIcon sx={{fontSize: 'clamp(30px, 7vw, 80px)'}}/></IconButton>
          <IconButton onClick={() => stop()}><StopCircleOutlinedIcon sx={{fontSize: 'clamp(30px, 7vw, 80px)'}}/></IconButton>
          <IconButton onClick={() => reset()}><RotateLeftOutlinedIcon sx={{fontSize: 'clamp(30px, 7vw, 80px)'}}/></IconButton>
        </TimerButton>
      </div>
    </TimerContainer>
  )
}