import { useEffect, useState, useRef } from 'react'
import CircularProgress from './CircularProgress'
import { IconButton } from '@mui/material';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import RotateLeftOutlinedIcon from '@mui/icons-material/RotateLeftOutlined';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

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
  const [ timerState, setTimerState ] = useState<string>('standby')
  const [ timerCount, setTimerCount] = useState<number>(timeData.studyTime)
  const [ restState, setRestState ] = useState<boolean>(false)

  const timerIdRef = useRef<NodeJS.Timeout | undefined>(undefined)

  const formatTime = (msSeconds: number) => {
    const msSafe = Math.max(msSeconds, 0)
    const hour = Math.floor(msSafe / ONE_HOURS);
    const minute = Math.floor((msSafe % ONE_HOURS) / ONE_MINUTES);
    const second = Math.floor((msSafe % ONE_MINUTES) / ONE_SECONDS);
    return [hour, minute, second]
      .map((val: any) => String(val).padStart(2, "0"))
      .join(":");
  };

  const handleState = () => {
    console.log(restState)
    const next = !restState
    setRestState(next)
    if(next){
      completedTermsStudy = completedTermsStudy + 1
      setTimerCount(timeData.restTime)
    } else {
      completedTermsRest = completedTermsRest + 1
      setTimerCount(timeData.studyTime)
    }
  }

  const start = () => {
    if(timeData.studyTime !== 0){
      setTimerState('active')
    }
  }

  const stop = () => {
    setTimerState('standby')
    storeTotal(eachTotalTime())
  }

  const reset = () => {
    setTimerState('standby')
    setRestState(restState ? false : true) //リセットときに休憩かどうかの判定が逆転してしまうので修正
    setTimerCount(0)
  }

  //親から渡された時間をセット
  useEffect(() => {
    setTimerCount(timeData.studyTime)
  },[timeData])

  useEffect(() => {
    if(timerState !== 'active'){
      return
    }
    if(timerCount >= 0){
      timerIdRef.current = setInterval(() => {
        setTimerCount((prev) => prev - 1000)
      }, 1000);
    } else {
      handleState()
    }

    return() => {
      clearInterval(timerIdRef.current)
    }
  },[timerState, timerCount])

  const eachTotalTime = () => {
    totalTime.study = timeData.studyTime * completedTermsStudy
    totalTime.rest = timeData.restTime * completedTermsRest
    if(!restState){
      totalTime.study = totalTime.study + timeData.studyTime - timerCount
    } else {
      totalTime.rest  = totalTime.rest + timeData.restTime - timerCount
    }
    return totalTime
  }

  

  return(
    <TimerContainer>
      <TimerCircle>
        <CircularProgress 
          totalMs={ restState ? timeData.restTime : timeData.studyTime } 
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