import { useState } from "react";
import Timer from "./Timer";
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import FreeBreakfastOutlinedIcon from '@mui/icons-material/FreeBreakfastOutlined';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
// …既存の定数・Propsなどはそのまま…

const SetUpCard = styled('div')({
  position: 'relative',
  backgroundColor: '#fff',
  borderRadius: '14px',
  boxShadow: '0 10px 24px rgba(2, 6, 23, 0.06)',
  boxSizing: 'border-box',
  padding: '20px 24px',
  minHeight: 260,
  transition: 'box-shadow 160ms ease, transform 160ms ease',
  // アクセントバー（左）
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderTopLeftRadius: '14px',
    borderBottomLeftRadius: '14px',
    background:
      'linear-gradient(180deg, rgba(14,165,233,1) 0%, rgba(59,130,246,1) 100%)',
  },
  '&:hover': {
    boxShadow: '0 14px 30px rgba(2, 6, 23, 0.10)',
    transform: 'translateY(-1px)',
  },
});

const CardHeader = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  marginBottom: 8,
});

const CardFooter = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  marginTop: 12,
  marginBottom: 8,
});

const Title = styled('h3')({
  margin: 0,
  fontSize: 'clamp(16px, 1.6vw, 18px)',
  fontWeight: 700,
  color: '#0f172a',
});

const Sub = styled('p')({
  margin: '2px 0 14px',
  fontSize: 12,
  color: '#6b7280',
});

const Stat = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto',
  alignItems: 'center',
  gap: 12,
  padding: '12px 0',
  borderTop: '1px solid rgba(15,23,42,0.06)',
});

const LabelPill = styled('button')({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  fontSize: 12,
  fontWeight: 600,
  color: '#0ea5e9',
  background: 'rgba(14,165,233,0.10)',
  border: '1px solid rgba(14,165,233,0.25)',
  padding: '6px 10px',
  borderRadius: 999,
  cursor: 'pointer',
  transition: 'background 0.2s ease, transform 0.1s ease',
  '&:hover': {
    background: 'rgba(14,165,233,0.20)',
    transform: 'translateY(-1px)', // ちょっと浮く
  },
  '&:active': {
    transform: 'translateY(0)', // クリックしたら戻る
  },
});

const LabelPillRest = styled('button')({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  fontSize: 12,
  fontWeight: 600,
  color: '#22c55e',
  background: 'rgba(34,197,94,0.10)',
  border: '1px solid rgba(34,197,94,0.25)',
  padding: '6px 10px',
  borderRadius: 999,
  cursor: 'pointer',
  '&:hover': {
    background: 'rgba(34,197,94,0.20)',
    transform: 'translateY(-1px)',
  },
  '&:active': {
    transform: 'translateY(0)',
  }
});

const TimeText = styled('div')({
  justifySelf: 'end',
  fontVariantNumeric: 'tabular-nums',
  fontWeight: 700,
  letterSpacing: '0.02em',
  fontSize: 'clamp(22px, 4vw, 36px)',
  color: '#0f172a',
});

const MusicText = styled('div')({
  justifySelf: 'end',
  fontVariantNumeric: 'tabular-nums',
  fontWeight: 700,
  letterSpacing: '0.02em',
  fontSize: 'clamp(22px, 4vw, 36px)',
  color: '#0f172a',
});

const MusicIcon = styled('div')({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
});

const MusicIconPlay = styled('button')({
  background: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  borderRadius: '50%',
  cursor: 'pointer',
  transition: 'transform 0.1s ease',
  '&:hover': {
    background: 'rgba(14, 164, 233, 0.08)',
    transform: 'scale(1.05)',
  },
  '&:active': {
    transform: 'scale(0.95)',
  },
})


const Hint = styled('div')({
  gridColumn: '1 / -1',
  textAlign: 'right',
  fontSize: 11,
  color: '#9ca3af',
});




const ONE_SECONDS = 1000;
const ONE_MINUTES = 60000;
const ONE_HOURS = 3600000;

type Props = {
  studyTime: number
  restTime: number
  onOpenStudy: () => void
  onOpenRest: () => void
  onOpenRecordConfirmModal: () => void
}


const Container = styled('div')({
  minHeight: '90vh',
  display: 'flex',
  backgroundColor: '#fff',
})

const TimeCard = styled('div')({
  backgroundColor: '#fff',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  boxSizing: 'border-box',
  height: '100%'
})

// const SetUpCard = styled('div')({
//   backgroundColor: '#fff',
//   borderRadius: '10px',
//   boxShadow: '0 0 10px rgba(0,0,0,0.1)',
//   boxSizing: 'border-box',
//   height: '100%'
// })

export default function Study({studyTime, restTime, onOpenStudy, onOpenRest, onOpenRecordConfirmModal}:Props){
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
  const handle = () => {
    console.log('作業時間が押されました')
  }

  return(
    <div style={{display: 'flex', minHeight: '92vh', width: '100%'}}>
      <div className="LeftContainer" style={{flex: '1 1 60%'}}>
        <div className="LeftDisplay" style={{height: '100%', padding: '25px 25px 30px 25px'}}>
          <TimeCard className='DisplayTimerCard'>
            <Timer 
              timeData={{ studyTime: studyTime, restTime: restTime}}
              totalTime={totalTime}
              storeTotal={storeTotal}
            />
          </TimeCard>
        </div>
      </div>
      <div className="SetUpDisplay" style={{flex: '1 1 40%'}}>
        <div className="SetUpDisplayCard" style={{height: '100%', padding: '25px 25px 30px 5px'}}>
        <SetUpCard>
          <CardHeader>
            <Title>プリセット時間</Title>
          </CardHeader>
          <Sub>このセッションで使われる作業・休憩の長さです。</Sub>

          <Stat style={{ borderTop: 'none' }}>
            <LabelPill type="button" onClick={() => onOpenStudy()}>
              <AccessTimeOutlinedIcon style={{ fontSize: 16 }} />
              作業時間
            </LabelPill>
            <div />
            <TimeText>{formatTime(studyTime)}</TimeText>
            <Hint>開始後は一時停止/停止から変更できます</Hint>
          </Stat>

          <Stat>
            <LabelPillRest type="button" onClick={() => onOpenRest()}>
              <FreeBreakfastOutlinedIcon style={{ fontSize: 16 }} />
              休憩時間
            </LabelPillRest>
            <div />
            <TimeText>{formatTime(restTime)}</TimeText>
          </Stat>

          <CardFooter>
            <Title>音楽設定</Title>
          </CardFooter>
          <Sub>このセッションで使われる音楽を設定してください。</Sub>

          <Stat style={{borderTop: 'none'}}>
            <LabelPill>
              <MusicNoteOutlinedIcon style={{ fontSize: 16 }} />
              音楽 (作業開始)
            </LabelPill>
            <div />
            <div>
              <MusicText>
                <MusicIcon>
                  <MusicIconPlay type="button" onClick={handle}>
                    <PlayCircleFilledWhiteIcon style={{ fontSize: 32, color: '#0ea5e9'}} />
                  </MusicIconPlay>
                  チャイム
                </MusicIcon>
              </MusicText>
              <Hint>作業終了時にチャイムが鳴ります</Hint>
            </div>
          </Stat>
        </SetUpCard>
        </div>
      </div>
    </div>
  )
}