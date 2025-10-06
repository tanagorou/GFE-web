import { useState } from 'react'
import "./SetupStudyTime.css";
import { styled } from "@mui/material/styles";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import FreeBreakfastOutlinedIcon from '@mui/icons-material/FreeBreakfastOutlined';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import { Overlay, Card, Header, TitleWrap, Title, Subtitle, Display, UnitHints, Grid, ControlButton, Actions, Primary, ResetBtn, IconGhostBtn, DisplayText, Column } from "./SetUpPageStyle";


const ONE_SECONDS = 1000
const ONE_MINUTES = 60000
const ONE_HOURS = 3600000
const MAX_COUNT = 86400000
const MIN_COUNT = 0

// const Overlay = styled("div")({
//   zIndex: 999,
//   background: "rgba(2, 6, 23, .55)", // slate-950 55%
//   backdropFilter: "blur(6px)",
//   position: "fixed",
//   inset: 0,
//   display: "grid",
//   placeItems: "center",
//   padding: 16,
// });

// const Card = styled("div")({
//   width: 'min(880px, 100%)',
//   background: 'linear-gradient(180deg, rgba(255,255,255,.92), rgba(255,255,255,.86))',
//   borderRadius: 20,
//   padding: '28px clamp(16px, 3vw, 40px)',
//   border: '1px solid rgba(15, 23, 42, .08)',
//   boxShadow: '0 10px 30px rgba(2,6,23,.25), 0 1px 0 rgba(255,255,255,.6) inset'
// })

// const Header = styled("div")({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'space-between',
// })

// const TitleWrap = styled("div")({
//   display: 'flex',
//   alignItems: 'baseline',
//   gap: 8,
// })

// const Title = styled("h3")({
//   margin: 0,
//   fontSize: 'clamp(18px, 2.6vw, 28px)',
//   fontWeight: 800,
//   color: '#0f172a',
//   letterSpacing: '.02em',
// })

// const Subtitle = styled("p")({
//   margin: 0,
//   fontSize: 'clamp(11px, 1.2vw, 13px)',
//   color: 'rgba(15, 23, 42, .65)',
// })

// const IconGhostBtn = styled("button")({
//   display: 'grid',
//   placeItems: 'center',
//   width: 36,
//   height: 36,
//   borderRadius: 10,
//   border: '1px solid rgba(15, 23, 42, .08)',
//   background: 'rgba(255,255,255,.7)',
//   cursor: 'pointer',
//   transition: 'transform .12s ease, background .2s ease, box-shadow .2s ease',
//   boxShadow: '0 1px 0 rgba(255,255,255,.7) inset',
//   '&:hover': { 
//     boxShadow: '0 1px 2px rgba(2,6,23,.10)',
//     background: 'rgba(248,250,252,.9)',
//   },
// })

// const Display = styled("div")({
//   marginTop: 10,
//   marginBottom: 6,
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   gap: 14,
//   padding: "18px clamp(8px, 2vw, 16px)",
//   borderRadius: 16,
//   background: "rgba(2,6,23,.04)",
//   border: "1px solid rgba(15,23,42,.06)",
//   fontVariantNumeric: "tabular-nums",
//   fontWeight: 700,
//   lineHeight: 1,
//   color: "#0f172a",
// });

// const DisplayText = styled("div")({
//   fontSize: 'clamp(28px, 7vw, 68px)',
//   letterSpacing: "0.03em",
// })

// const UnitHints = styled("div")({
//   display: 'grid',
//   gridTemplateColumns: 'repeat(3, 1fr)',
//   marginTop: 6,
//   gap: 16,
//   fontSize: 12,
//   textAlign: 'center',
// })

// const Grid = styled('div')({
//   display: 'grid',
//   gridTemplateColumns: 'repeat(3, minmax(0,1fr))',
//   marginTop: 16,
//   gap: 18,
// })

// const Column = styled('div')({
//   display: 'grid',
//   gridTemplateRows: 'auto auto',
//   justifyContent: 'center',
//   gap: 6,
// })

// const ControlButton = styled('button')({
//   width: 'clamp(56px, 8vw, 72px)',
//   height: 'clamp(56px, 8vw, 72px)',
//   borderRadius: 16,
//   border: '1px solid rgba(3, 10, 27, 0.08)',
//   background: 'linear-gradient(180deg, rgba(255,255,255), rgba(248,250,252,.9))',
//   cursor: 'pointer',
//   transition: 'transform .12s ease',
//   boxShadow: '0 2px 8px rgba(2,6,23,.08), 0 1px 0 rgba(255,255,255,.8) inset',
//   display: 'grid',
//   placeItems: 'center',
//   '& svg': {
//     fontSize: 'clamp(28px, 6vw, 44px)',
//     transition: 'transform .12s ease',
//   },
//   '&:hover svg': { transform: 'scale(1.10)' },
//   '&:active svg': {transform: 'scale(.96)' },
// })

// const Actions = styled('div')({
//   marginTop: 22,
//   display: 'flex',
//   flexWrap: 'wrap',
//   justifyContent: 'flex-end',
//   gap: 10,
// })

// const Primary = styled('button')({
//   display: 'inline-flex',
//   alignItems: 'center',
//   padding: '12px 16px',
//   borderRadius: 12,
//   border:'none',
//   background:
//     "linear-gradient(90deg, #99FFCC 0%, #99FF66 50%, 	#99FF00 100%)",
//   boxShadow: '0 3px 7px rgba(0, 0, 0, 0.10)',
//   transition: 'filter .2s ease',
//   '&:hover': {
//     filter: 'brightness(1.12)',
//     transform: 'translateY(-0.5px)',
//   },
//   '&:active': {
//     transform: 'translateY(0)',
//   }
// })

// const ResetBtn = styled('button')({
//   padding: '0px 12px',
//   display: 'inline-flex',
//   alignItems: 'center',
//   border: 'none',
//   borderRadius: 999,
//   background: 'none',
//   cursor: 'pointer',
//   transition: 'transform .12s ease',
//   '& svg': {
//     fontSize: 24,
//     transition: 'transform .12s ease',
//   },
//   '&:hover svg': { transform: 'scale(1.10)' },
//   '&:active svg': {transform: 'scale(.96)' },
// })

type props = {
  onChangeTime:(v:number) => void
  onClose: () => void
  onBack: () => void
}

export default function SetupRestTime({onChangeTime,onClose,onBack}:props) {
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

  const handleBack = () => {
    onChangeTime(timerCount)
    onBack()
  }

    return (
      <Overlay>
        <Card>
          <Header>
            <TitleWrap>
              <FreeBreakfastOutlinedIcon style={{ fontSize: 22, color: 'rgba(7, 83, 21, 0.31)'}} />
              <Title>休憩時間</Title>
              <Subtitle>↑↓で分（Shift+↑↓で時間）／←→で秒　Enterで決定</Subtitle>
            </TitleWrap>
            <IconGhostBtn onClick={onClose}>
              <CloseRoundedIcon/>
            </IconGhostBtn>
          </Header>
          <Display>
            <DisplayText>
              {formatTime(timerCount)}
            </DisplayText>
          </Display>
          <UnitHints>
            <div>時間</div>
            <div>分</div>
            <div>秒</div>
          </UnitHints>
          <Grid>
            <Column>
              <ControlButton onClick={() => plus(ONE_HOURS)}>
                <ArrowDropUpIcon/>
              </ControlButton>
              <ControlButton onClick={() => minus(ONE_HOURS)}>
                <ArrowDropDownIcon/>
              </ControlButton>
            </Column>
            <Column>
              <ControlButton onClick={() => plus(ONE_MINUTES)}>
                <ArrowDropUpIcon/>
              </ControlButton>
              <ControlButton onClick={() => minus(ONE_MINUTES)}>
                <ArrowDropDownIcon/>
              </ControlButton>
            </Column>
            <Column>
              <ControlButton onClick={() => plus(ONE_SECONDS)}>
                <ArrowDropUpIcon/>
              </ControlButton>
              <ControlButton onClick={() => minus(ONE_SECONDS)}>
                <ArrowDropDownIcon/>
              </ControlButton>
            </Column>
          </Grid>
          <Actions>
            <ResetBtn onClick={reset} aria-label="リセット">
              <RestartAltRoundedIcon/>
            </ResetBtn>
            <Primary onClick={() => handleBack()}>戻る</Primary>
            <Primary onClick={handleChange}>設定する</Primary>          
          </Actions>
        </Card>
      </Overlay>
    );
}