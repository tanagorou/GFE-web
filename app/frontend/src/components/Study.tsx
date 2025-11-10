import { useState } from "react";
import Timer from "./Timer";
import { useNotificationPermission } from "../context/NotificationPermissionContext";
import { useStudyTime } from "../context/StudyContext";
import { sounds } from "./assets/sounds/sound";

import { styled } from '@mui/material/styles';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import FreeBreakfastOutlinedIcon from '@mui/icons-material/FreeBreakfastOutlined';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useSnackbar } from "notistack";
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

const LabelPillMusic = styled('div')({
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

const Wrapper = styled('div')({
  position: 'relative',
  display: 'inline-block',
});

const SelectMenu = styled('select')({
  position: 'absolute',
  top: '100%',
  left: 0,
  display: 'none',
  background: '#fff',
  border: '1px solid rgba(0,0,0,0.15)',
  borderRadius: 8,
  padding: '4px 6px',
  fontSize: 12,
  zIndex: 10,
});

const WrapperHover = styled(Wrapper)({
  '&:hover select': {
    display: 'block',
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

export const Toggle = styled('button')({
  cursor: 'pointer',
  background: 'rgba(235, 235, 235, 0.91)',
  padding: '2px',
  width: '40px',
  height: '20px',
  border: 'none',
  borderRadius: '10px',
  display: 'grid',
  gridTemplateColumns: '0fr 1fr 1fr',
  position: 'relative',
  transition: '.2s',

  // 丸い「nub」
  '&::after': {
    content: '""',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.82)',
    gridColumn: '2',
    transition: 'background .2s',
  },

  // チェック状態（.activeクラスなど）で動かす
  '&.active': {
    gridTemplateColumns: '1fr 1fr 0fr',
  },

  '&.active::after': {
    backgroundColor: 'rgb(25, 233, 14)',
  },
});

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

const TimeCard = styled('div')({
  backgroundColor: '#fff',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  boxSizing: 'border-box',
  height: '100%'
})

export default function Study({studyTime, restTime, onOpenStudy, onOpenRest, onOpenRecordConfirmModal}:Props){
  const { handleToggle, localEnabled } = useNotificationPermission()
  const { totalTime, nextTimeState, playMusic, setPlayMusic } = useStudyTime()
  const [ active, setActive ] = useState(localEnabled)
  const { enqueueSnackbar } = useSnackbar()

  const formatTime = (msSeconds: number) => {
    const hour = Math.floor(msSeconds / ONE_HOURS);
    const minute = Math.floor((msSeconds % ONE_HOURS) / ONE_MINUTES);
    const second = Math.floor((msSeconds % ONE_MINUTES) / ONE_SECONDS);
    return [hour, minute, second]
      .map((val: any) => String(val).padStart(2, "0"))
      .join(":");
  };

  const handle = (p: boolean) => {
    handleToggle()
    setActive(!p)
    // console.log(active)
  }

  const handleOpenStudySettingsPage = () => {
    // タイマー作動中、もしくは記録を保存していないときは作業・休憩時間の変更は不可
    if(nextTimeState === 'active') return
    if(totalTime.study || totalTime.rest !== 0){
      enqueueSnackbar('記録を保存してください', {variant: 'error'})
      return
    }
    onOpenStudy()
  }

  const handleOpenRestSettingsPage = () => {
    if(nextTimeState === 'active') return
    if(totalTime.study || totalTime.rest !== 0){
      enqueueSnackbar('記録を保存してください', {variant: 'error'})
      return
    }
    onOpenRest()
  }
  

  const selectItems = sounds.map((item: any) => (
    <option key={item.id} value={item.id}>{item.name}</option>
  ))

  const handleMusicChange = (e: any) => {
    if(e.target.value === '1'){
      setPlayMusic({title: 'オフ', path: null})
      return
    }
    const audioTitle = sounds[e.target.value - 1].name
    const audioPath = new Audio(sounds[e.target.value - 1].path)
    setPlayMusic({title: audioTitle, path: audioPath})
    // console.log(playMusic)
  }

  const clickPlayMusic = () => {
    if(nextTimeState !== 'standby') return
    if(playMusic.path !== null){
      playMusic.path.play()
    }
    return
  }

  return(
    <div style={{display: 'flex', minHeight: '92vh', width: '100%'}}>
      <div className="LeftContainer" style={{flex: '1 1 60%'}}>
        <div className="LeftDisplay" style={{height: '100%', padding: '25px 25px 20px 20px'}}>
          <TimeCard className='DisplayTimerCard'>
            <Timer 
              onOpenRecordConfirmModal={onOpenRecordConfirmModal}
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
            <LabelPill type="button" onClick={() => handleOpenStudySettingsPage()}>
              <AccessTimeOutlinedIcon style={{ fontSize: 16 }} />
              作業時間
            </LabelPill>
            <div />
            <TimeText>{formatTime(studyTime)}</TimeText>
          </Stat>

          <Stat style={{ borderTop: 'none' }}>
            <LabelPillRest type="button" onClick={() => handleOpenRestSettingsPage()}>
              <FreeBreakfastOutlinedIcon style={{ fontSize: 16 }} />
              休憩時間
            </LabelPillRest>
            <div />
            <TimeText>{formatTime(restTime)}</TimeText>
            <Hint>タイマー停止後、設定を変更してください</Hint>
          </Stat>

          <div style={{ borderTop: '1px solid rgba(15,23,42,0.06)' }}>
          </div>

          <CardFooter>
            <Title>音楽設定</Title>
          </CardFooter>
          <Sub>このセッションで使われる音楽を設定してください。</Sub>

          <Stat style={{ borderTop: 'none' }}> 
            <WrapperHover>
              <LabelPillMusic>
                <MusicNoteOutlinedIcon style={{ fontSize: 16 }} />
                音楽 (作業開始)
              </LabelPillMusic>
              <SelectMenu onChange={(e) => handleMusicChange(e)}>
                {selectItems}
              </SelectMenu>
            </WrapperHover>
            <div />
            <div>
              <MusicText>
                <MusicIcon>
                  <MusicIconPlay type="button" onClick={() => clickPlayMusic()}>
                    <PlayCircleFilledWhiteIcon style={{ fontSize: 32, color: '#0ea5e9'}} />
                  </MusicIconPlay>
                  {playMusic.title}
                </MusicIcon>
              </MusicText>
              { playMusic.title !== 'オフ' &&  <Hint>作業終了時にチャイムが鳴ります</Hint>}
            </div>
          </Stat>
          <Stat>
            <div style={{ display: 'grid', alignItems: 'center'}}>
              <NotificationsNoneIcon style={{ fontSize: 16 }} />
            </div>
            <Title>通知</Title>
            {/* ローカルに保存した通知状態を取ってくる */}
            <Toggle 
                className={active ? "active" : ""}
                onClick={() => handle(localEnabled)}
              />
              <Hint>タイマー作動中でも通知許可の変更ができます</Hint>
          </Stat> 
        </SetUpCard>
        </div>
      </div>
    </div>
  )
}