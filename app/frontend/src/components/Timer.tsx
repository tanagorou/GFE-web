import { useEffect, useState, useRef } from 'react'

const ONE_SECONDS = 1000;
const ONE_MINUTES = 60000;
const ONE_HOURS = 3600000;


type timerProps = {
  time: number
  timeData: Record<string, number>
}

export default function Timer({time,timeData}: timerProps){

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
      setTimerCount(timeData.restTime)
    } else {
      setTimerCount(timeData.studyTime)
    }
  }

  const start = () => {
    setTimerState('active')
  }

  const stop = () => {
    setTimerState('standby')
  }

  const reset = () => {
    setTimerState('standby')
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

  return(
    <div>
      <h1>タイマー</h1>
      {formatTime(timerCount)}
      <button onClick={() => start()}>スタート</button>
      <button onClick={() => stop()}>ストップ</button>
      <button onClick={() => reset()}>リセット</button>
    </div>
  )
}