import { useState, useEffect } from 'react'
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

  // キーボード操作（↑↓で分、左右で秒、Shiftで時間）
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const shift = e.shiftKey;
      if(e.key === "ArrowUp") plus(shift ?ONE_HOURS : ONE_MINUTES)
      if(e.key === "ArrowDown") minus(shift ?ONE_HOURS : ONE_MINUTES)
      if(e.key === "ArrowRight") plus(ONE_SECONDS)
      if(e.key === "ArrowLeft") minus(ONE_SECONDS)

      // 2025/10/06][追記]  コンポーネントの再描画で、Enter（Escape）キー一発で戻らない。
      // 今後は使いやすくしたいので、この操作を入れれるようになりたいね

      // if(e.key === "Enter") handleChange()
      // if(e.key === "Escape") onClose()
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

    return (
      <Overlay>
        <Card>
          <Header>
            <TitleWrap>
              <FreeBreakfastOutlinedIcon style={{ fontSize: 22, color: 'rgba(7, 83, 21, 0.31)'}} />
              <Title>休憩時間</Title>
              <Subtitle>↑↓で分（Shift+↑↓で時間）／←→で秒</Subtitle>
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