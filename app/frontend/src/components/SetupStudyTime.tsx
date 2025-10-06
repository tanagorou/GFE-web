import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { Overlay, Card, Header, TitleWrap, Title, Subtitle, Display, UnitHints, Grid, ControlButton, Actions, Primary, ResetBtn, IconGhostBtn, DisplayText, Column } from "./SetUpPageStyle";
const ONE_SECONDS = 1000;
const ONE_MINUTES = 60000;
const ONE_HOURS = 3600000;
const MAX_COUNT = 86400000;
const MIN_COUNT = 0;

type Props = {
  onChangeTime: (v: number) => void;
  onNext: () => void;
  onClose: () => void;
};



export default function SetupStudyTime({ onChangeTime, onNext, onClose }: Props) {
  const [timerCount, setTimerCount] = useState(0);

  const plus = (c: number) => {
    setTimerCount((v) => Math.min(v + c, MAX_COUNT));
  };
  const minus = (c: number) => {
    setTimerCount((v) => Math.max(v - c, MIN_COUNT));
  };
  const reset = () => setTimerCount(0);

  const formatTime = (ms: number) => {
    const h = Math.floor(ms / ONE_HOURS);
    const m = Math.floor((ms % ONE_HOURS) / ONE_MINUTES);
    const s = Math.floor((ms % ONE_MINUTES) / ONE_SECONDS);
    return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
  };

  const handleChange = () => {
    onChangeTime(timerCount);
    onClose();
  };

  const handleNext = () => {
    onChangeTime(timerCount);
    onNext();
  };

  // ちょい便利：キーボード操作（↑↓で分、左右で秒、Shiftで時間）
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const shift = e.shiftKey;
      if (e.key === "ArrowUp") plus(shift ? ONE_HOURS : ONE_MINUTES);
      if (e.key === "ArrowDown") minus(shift ? ONE_HOURS : ONE_MINUTES);
      if (e.key === "ArrowRight") plus(ONE_SECONDS);
      if (e.key === "ArrowLeft") minus(ONE_SECONDS);
      if (e.key.toLowerCase() === "r") reset();
      if (e.key === "Enter") handleChange();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <Overlay>
      <Card>
        <Header>
          <TitleWrap>
            <AccessTimeOutlinedIcon style={{ fontSize: 22, color: 'rgba(13, 56, 136, 0.31)'}} />
            <Title>作業時間</Title>
            <Subtitle>↑↓で分（Shift+↑↓で時間）／←→で秒　Enterで決定</Subtitle>
          </TitleWrap>
          <IconGhostBtn onClick={onClose} aria-label="閉じる">
            <CloseRoundedIcon />
          </IconGhostBtn>
        </Header>

        <Display>
          <DisplayText>{formatTime(timerCount)}</DisplayText>
        </Display>
        <UnitHints>
          <span>時間</span>
          <span>分</span>
          <span>秒</span>
        </UnitHints>

        <Grid>
          <Column>
            <ControlButton onClick={() => plus(ONE_HOURS)} aria-label="時間を増やす">
              <ArrowDropUpIcon />
            </ControlButton>
            <ControlButton onClick={() => minus(ONE_HOURS)} aria-label="時間を減らす">
              <ArrowDropDownIcon />
            </ControlButton>
          </Column>

          <Column>
            <ControlButton onClick={() => plus(ONE_MINUTES)} aria-label="分を増やす">
              <ArrowDropUpIcon />
            </ControlButton>
            <ControlButton onClick={() => minus(ONE_MINUTES)} aria-label="分を減らす">
              <ArrowDropDownIcon />
            </ControlButton>
          </Column>

          <Column>
            <ControlButton onClick={() => plus(ONE_SECONDS)} aria-label="秒を増やす">
              <ArrowDropUpIcon />
            </ControlButton>
            <ControlButton onClick={() => minus(ONE_SECONDS)} aria-label="秒を減らす">
              <ArrowDropDownIcon />
            </ControlButton>
          </Column>
        </Grid>

        <Actions>
          <ResetBtn onClick={reset} aria-label="リセット">
            <RestartAltRoundedIcon />
          </ResetBtn>
          {/* <Secondary onClick={onClose}>閉じる</Secondary> */}
          
          <Primary onClick={() => handleNext()}>
            次へ
          </Primary>
          <Primary onClick={() => handleChange()}>
            設定する
          </Primary>

        </Actions>
      </Card>
    </Overlay>
  );
}
