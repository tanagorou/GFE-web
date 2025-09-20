import { useState } from "react";
import './Study.css'
import Timer from "./Timer";
import { styled } from '@mui/material/styles';
import TimeField from "./TimeField";
import { useNavigate } from "react-router-dom";

const ONE_SECONDS = 1000;
const ONE_MINUTES = 60000;
const ONE_HOURS = 3600000;
const MAX_COUNT = 86400000;
const MIN_COUNT = 0;

type Props = {
  studyTime: number
  restTime: number
  onOpenStudy: () => void
  onOpenRecordConfirmModal: () => void
}

const Container = styled('div')({
  minHeight: '92vh',
  display: 'flex',
  backgroundColor: '#f5f5f5',
})

const TimeCard = styled('div')({
  flexDirection:'column',
  flexBasis: '50%'
})

const SetUpCard = styled('div')({
  flexDirection: 'column',
  flexBasis: '50%'
})

const SetUpStudy = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  height: '60%',
  marginLeft: '10%'
})

export default function Study({studyTime, restTime, onOpenStudy, onOpenRecordConfirmModal}:Props){
  const [ totalTime, setTotalTime ] = useState({'study':0, 'rest':0})
  const navigate = useNavigate()

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
    <Container>
      <TimeCard>
        <Timer 
            timeData={{ studyTime: studyTime, restTime: restTime}}
            totalTime={totalTime}
            storeTotal={storeTotal}
            />
      </TimeCard>
      <SetUpCard>
        <SetUpStudy>
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
        {/* <div>
          <h3>ポモドーロ回数</h3>
        </div> */}
        <div className="button">
          <button onClick={onOpenStudy}>詳細設定</button>
          <button onClick={onOpenRecordConfirmModal}>終了</button>
        </div>
        </SetUpStudy>
      </SetUpCard>
    </Container>  
  )
}