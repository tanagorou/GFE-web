import { useEffect, useState } from 'react'
import CircularProgress from './CircularProgress'
import { IconButton } from '@mui/material';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import RotateLeftOutlinedIcon from '@mui/icons-material/RotateLeftOutlined';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { useStudyTime } from '../context/StudyContext';


const TimerContainer = styled('div')({
  display: 'flex',
  minHeight: '92vh',
  flexDirection: 'column'
})

const TimerCircle = styled('div')({
  flex: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '20px'
})


const ONE_SECONDS = 1000;
const ONE_MINUTES = 60000;
const ONE_HOURS = 3600000;


type timerProps = {
  timeData: Record<string, number>,
  totalTime: Record<string, number>,
  storeTotal: (v:any) => void
}

let completedTermsStudy = 0
let completedTermsRest = 0

export default function Timer({timeData, totalTime, storeTotal}: timerProps){

  const { studyTime, restTime, restState, setRestState,setNextTimeState, timerCount, setTimerCount} = useStudyTime()


  const start = () => {
    if(studyTime !== 0){
      setNextTimeState('active')
    }
  }

  const stop = () => {
    setNextTimeState('standby')
    // storeTotal(eachTotalTime())
  }

  const reset = () => {
    console.log('rest', restState)
    setNextTimeState('standby')
    // setRestState(restState ? false : true) //リセットときに休憩かどうかの判定が逆転してしまうので修正
    if(restState){
      setTimerCount(restTime)
    } else {
      setTimerCount(studyTime)
    }
  }

  return(
    <TimerContainer>
      <TimerCircle>
        <CircularProgress 
          totalMs={ restState ? restTime : studyTime } 
          remainingMs={ timerCount }
          />
      </TimerCircle>
        <Grid container direction='row' sx={{  flex: '1',justifyContent: 'center', alignItems: 'flex-start', gap: 6}}>
          <IconButton onClick={() => start()} >
            <PlayCircleFilledWhiteOutlinedIcon sx={{fontSize: 100}}/>
          </IconButton>
          <IconButton onClick={() => stop()}>
            <StopCircleOutlinedIcon sx={{fontSize: 100}}/>
          </IconButton>
          <IconButton onClick={() => reset()}>
            <RotateLeftOutlinedIcon sx={{fontSize: 100}}/>
          </IconButton>
      </Grid>
    </TimerContainer>
  )
}