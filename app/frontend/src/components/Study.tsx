import { useState } from "react";
import './Study.css'
import Timer from "./Timer";

const ONE_SECONDS = 1000;
const ONE_MINUTES = 60000;
const ONE_HOURS = 3600000;
const MAX_COUNT = 86400000;
const MIN_COUNT = 0;

type Props = {
  studyTime: number
  restTime: number
  onOpenStudy: () => void
}

export default function Study({studyTime, restTime, onOpenStudy}:Props){
  const [ totalTime, setTotalTime ] = useState({'study':0, 'rest':0})

  const storeTotal = (data: any) => {
    setTotalTime(data)
    console.log(totalTime)
  }

  const formatTime = (msSeconds: number) => {
    const hour = Math.floor(msSeconds / ONE_HOURS);
    const minute = Math.floor((msSeconds % ONE_HOURS) / ONE_MINUTES);
    const second = Math.floor((msSeconds % ONE_MINUTES) / ONE_SECONDS);
    return [hour, minute, second]
      .map((val: any) => String(val).padStart(2, "0"))
      .join(":");
  };

  return(
    <>
      <div className="study">
        <div className="timerLayout">
        <Timer 
          timeData={{ studyTime: studyTime, restTime: restTime}}
          totalTime={totalTime}
          storeTotal={storeTotal}
          />
        </div>
        <div className="setupDetailLayout">
            <div className="setupStudy">
              <h2>作業時間</h2>
              <div className="studyTime">
                {formatTime(studyTime)}
              </div>
            </div>
            <div className="setupRest">
              <h2>休憩時間</h2>
              <div className="restTime">
                {formatTime(restTime)}
              </div>
            </div>
            <div className="button">
              <button onClick={onOpenStudy}>詳細設定</button>
            </div>
        </div>
      </div>
    </>
  )
}