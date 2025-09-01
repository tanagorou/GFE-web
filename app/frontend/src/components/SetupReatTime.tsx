import { useState } from 'react'
import "./SetupStudyTime.css";

const ONE_SECONDS = 1000
const ONE_MINUTES = 60000
const ONE_HOURS = 3600000
const MAX_COUNT = 86400000
const MIN_COUNT = 0

type props = {
  onChangeTime:(v:number) => void
  onClose: () => void
}

export default function SetupRestTime({onChangeTime,onClose}:props) {
  const [timerCount, setTimerCount] = useState(0)

  const plus = (plusCount: number) => {
    if(timerCount + plusCount <= MAX_COUNT){
      setTimerCount((preTimeCount) => preTimeCount + plusCount )
    }
  }

  const minus = (minusCount: number) => {
    if(timerCount - minusCount >= MIN_COUNT){
      setTimerCount((preTimeCount) => preTimeCount - minusCount )
    }
  }

  const reset = () => setTimerCount(0)

  const formatTime = (msSeconds: number) => {
    const hour = Math.floor(msSeconds / ONE_HOURS);
    const minute = Math.floor((msSeconds % ONE_HOURS) / ONE_MINUTES)
    const second = Math.floor((msSeconds % ONE_MINUTES) / ONE_SECONDS)
    return [hour, minute, second].map((val: any) => String(val).padStart(2,'0')).join(':') 
  }

  const handleChange = () => {
    onChangeTime(timerCount)
    onClose()
  }

    return (
      <div className="overlay">
        <div className="content">
          <h4>休憩時間を設定してください</h4>
          <div className='displayTimer'>
            {formatTime(timerCount)}
          </div>
          <button onClick={() => plus(ONE_SECONDS)}>+1秒</button>
          <button onClick={() => minus(ONE_SECONDS)}>-1秒</button>
          <button onClick={() => plus(ONE_MINUTES)}>+1分</button>
          <button onClick={() => minus(ONE_MINUTES)}>-1分</button>
          <button onClick={() => plus(ONE_HOURS)}>+1時間</button>
          <button onClick={() => minus(ONE_HOURS)}>-1時間</button>
          <button onClick={() => reset()}>リセット</button>
          <button onClick={handleChange}>close</button>
        </div>
      </div>
    );
}