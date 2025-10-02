import { useState } from "react";
import "./SetupStudyTime.css";
import { styled } from "@mui/material/styles";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const ONE_SECONDS = 1000;
const ONE_MINUTES = 60000;
const ONE_HOURS = 3600000;
const MAX_COUNT = 86400000;
const MIN_COUNT = 0;

// type studeTimerProps = {
//   show?: boolean;
//   setShow?: React.Dispatch<React.SetStateAction<boolean>>;
// };

type Props = {
  onChangeTime: (v:number) => void
  onNext: () => void
  onClose: () => void
}

const CardHeader = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  marginBottom: 8,
})

const Title = styled('h3')({
  margin: 0,
  fontSize: 'clamp(16px, 1.6vw, 24px)',
  fontWeight: 700,
  color: '#0f172a',
})

const ControlsGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 30,
  '& .MuiSvgIcon-root': {
    
  }
})

const ControlButton = styled('button')({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '50%',
  transition: 'transform 0.1s ease',
  '&:hover': {
    background: 'rgba(14, 164, 233, 0.08)',
    transform: 'scale(1.05)',
  },
  '&:active': {
    transform: 'scale(0.95)',
  }
})


const TimerPanel = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontVariantNumeric: 'tabular-nums',
  fontWeight: 700,
  letterSpacing: '0.02em',
  fontSize: 'clamp(22px, 6vw, 56px)',
  color: '#0f172a',
  lineHeight: 1,
})

export default function SetupStudyTime({ onChangeTime, onNext, onClose}:Props) {
  const [restShow, setRestShow] = useState<boolean>(false);
  const [timerCount, setTimerCount] = useState(0);

  const plus = (plusCount: number) => {
    if (timerCount + plusCount <= MAX_COUNT) {
      setTimerCount((preTimeCount) => preTimeCount + plusCount);
    }
  };

  const minus = (minusCount: number) => {
    if (timerCount - minusCount >= MIN_COUNT) {
      setTimerCount((preTimeCount) => preTimeCount - minusCount);
    }
  };

  const reset = () => setTimerCount(0);

  const formatTime = (msSeconds: number) => {
    const hour = Math.floor(msSeconds / ONE_HOURS);
    const minute = Math.floor((msSeconds % ONE_HOURS) / ONE_MINUTES);
    const second = Math.floor((msSeconds % ONE_MINUTES) / ONE_SECONDS);
    return [hour, minute, second]
      .map((val: any) => String(val).padStart(2, "0"))
      .join(":");
  };

  const handleChange = () => {
    onChangeTime(timerCount)
    onNext()
  }
    return (
      <div className="overlay">
        <div className="modalContent">
          <CardHeader>
            <Title>作業時間を設定してください</Title>
          </CardHeader>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <ControlsGrid>
              <ControlButton type="button" onClick={() => plus(ONE_HOURS)}>
                <ArrowDropUpIcon style={{fontSize: 'clamp(22px, 6vw, 55px)' }}/>
              </ControlButton>
              <ControlButton type="button" onClick={() => plus(ONE_MINUTES)}>
                <ArrowDropUpIcon style={{fontSize: 'clamp(22px, 6vw, 55px)'}}/>
              </ControlButton>
              <ControlButton type="button" onClick={() => plus(ONE_SECONDS)}>
                <ArrowDropUpIcon style={{fontSize: 'clamp(22px, 6vw, 55px)'}}/>
              </ControlButton>
            </ControlsGrid>
          </div>
          <TimerPanel>
            <TimerPanel>{formatTime(timerCount)}</TimerPanel>
          </TimerPanel>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <ControlsGrid style={{transform: 'translateY(4px)'}}>
              <ControlButton type="button" onClick={() => minus(ONE_HOURS)}>
                <ArrowDropDownIcon style={{fontSize: 'clamp(22px, 6vw, 55px)'}}/>
              </ControlButton>
              <ControlButton type="button" onClick={() => minus(ONE_MINUTES)}>
                <ArrowDropDownIcon style={{fontSize: 'clamp(22px, 6vw, 55px)'}}/>
              </ControlButton>
              <ControlButton type="button" onClick={() => minus(ONE_SECONDS)}>
                <ArrowDropDownIcon style={{fontSize: 'clamp(22px, 6vw, 55px)'}}/>
              </ControlButton>
            </ControlsGrid>
          </div>
          <div />
          <button onClick={() => plus(ONE_SECONDS)}>+1秒</button>
          <button onClick={() => minus(ONE_SECONDS)}>-1秒</button>
          <button onClick={() => plus(ONE_MINUTES)}>+1分</button>
          <button onClick={() => minus(ONE_MINUTES)}>-1分</button>
          <button onClick={() => plus(ONE_HOURS)}>+1時間</button>
          <button onClick={() => minus(ONE_HOURS)}>-1時間</button>
          <button onClick={() => reset()}>リセット</button>
          <button onClick={handleChange}>次へ</button>
          <button onClick={onClose} >close</button>
        </div>
      </div>
    );
}
