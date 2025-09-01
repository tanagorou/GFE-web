import { useState } from "react";
import './Study.css'

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

  const formatTime = (msSeconds: number) => {
    const hour = Math.floor(msSeconds / ONE_HOURS);
    const minute = Math.floor((msSeconds % ONE_HOURS) / ONE_MINUTES);
    const second = Math.floor((msSeconds % ONE_MINUTES) / ONE_SECONDS);
    return [hour, minute, second]
      .map((val: any) => String(val).padStart(2, "0"))
      .join(":");
  };

  return(
    <div>
      <h1>今日も一日頑張りましょう</h1>
      <div>
        <p>作業時間</p>
        {formatTime(studyTime)}
      </div>
      <div>
        <p>休憩時間</p>
        {formatTime(restTime)}
      </div>
      <button onClick={onOpenStudy}>詳細設定</button>
    </div>
  )
}