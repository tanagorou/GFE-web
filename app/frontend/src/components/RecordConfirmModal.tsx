import { useStudyTime } from "../context/StudyContext"
import axios from "axios"
import axiosCaseConverter from "simple-axios-case-converter"
import { useAuth } from "../context/AuthContext"
import { Overlay, Card } from "./SetUpPageStyle";
import { styled } from "@mui/material/styles";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useState } from "react"
import { useSnackbar } from "notistack";

const Header = styled("div")({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 12,
})

const Title = styled("h3")({
  fontSize: "clamp(18px, 2.6vw, 28px)",
  fontWeight: 700,
  color: "#0f172a",
  letterSpacing: ".02em",
})

const ErrorMessage = styled('div')({
  color: 'rgba(220, 38, 38, 0.76)',
  fontSize: '14px',
  fontWeight: 600,
  letterSpacing: '.02em',
  marginTop: '12px',
  textAlign: 'center',
})

const CloseIcon = styled(CloseRoundedIcon)({
  position: "absolute",
  right: 0,
  top: 0,
})

const StatWrap = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const Stat = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto',
  alignItems: 'center',
  gap: '24px',
  padding: '12px 0',
  borderTop: '1px solid rgba(15,23,42,0.06)',
  width: '60%',       // ← 幅を調整（例: カードの60%）
  minWidth: '280px',  // ← 狭すぎ防止
  margin: '0 auto',            // 中央に寄せる
})

const Label = styled('div')({
  fontSize: 'clamp(14px, 1.6vw, 18px)',
  fontWeight: 600,
  color: '#0f172a',
  letterSpacing: '.02em',
})

const TimeText = styled('div')({
  justifySelf: 'end',
  fontVariantNumeric: 'tabular-nums',
  fontWeight: 700,
  letterSpacing: '0.02em',
  fontSize: 'clamp(22px, 4vw, 36px)',
  color: '#0f172a',
})

const Hint = styled('div')({
  gridColumn: '1 / -1',
  textAlign: 'right',
  fontSize: 11,
  color: '#9ca3af',
})

const BtnWrap = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '12px',
  marginBottom: '12px',
  padding: '0 24px',
})

const SubmitBtn = styled('button')({
  backgroundColor: 'rgb(0, 0, 0)',
  color: '#fff',
  padding: '12px 24px',
  fontSize: 'clamp(12px, 2.4vw, 16px)',
  fontWeight: 700,
  border: 'none',
  borderRadius: 999,
  cursor: 'pointer',
  transition: 'transform .12s ease',
  '&:hover': {
    transform: 'scale(1.02)',
  },
  '&:active': {
    transform: 'scale(0.98)',
  },
})

axiosCaseConverter(axios)

const ONE_SECONDS = 1000;
const ONE_MINUTES = 60000;
const ONE_HOURS = 3600000;

type RecordConfirmModalProps = {
  closeModal: () => void
}

// 時間をh,m,sに変換する
const formatTime = (msSeconds: number) => {
  const hour = Math.floor(msSeconds / ONE_HOURS);
  const minute = Math.floor((msSeconds % ONE_HOURS) / ONE_MINUTES);
  const second = Math.floor((msSeconds % ONE_MINUTES) / ONE_SECONDS)
  const displayTime = []
  if(hour > 0 ) displayTime.push(`${hour}h`)
  if(minute > 0 ) displayTime.push(`${minute}m`)
  if(second > 0 || displayTime.length === 0) displayTime.push(`${second}s`)
  return displayTime.join('')
}


// 勉強時間、作業時間を保存
export const RecordConfirmModal = ({closeModal}: RecordConfirmModalProps) => {
  const {culcurateTotalTime, resetRecords} = useStudyTime()
  const {authToken} = useAuth()
  const {enqueueSnackbar} = useSnackbar()
  
  const [error, setError] = useState(false)
  const totalTime = culcurateTotalTime()

  async function regsterRecord() {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/study_records',
        {study_record: {work_seconds: totalTime.record.work_time, rest_seconds: totalTime.record.rest_time}},
        {
          withCredentials: true,
          headers: {
            "Authorization": `Bearer ${authToken.auth.token}`,
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json",
          },
        }
      )
      enqueueSnackbar('記録が保存されました', {variant: 'success'})
      resetRecords()
      closeModal()
    } catch (error) {
      setError(true)
    }
  }
  const handleSubmit = () => {
    regsterRecord()
  }
  const handleCloseModal = () => {
    closeModal()
  }
  return (
    <Overlay>
      <Card style={{width: 'min(560px, 92vw)'}}>
        <Header>
          <Title>現在の記録</Title>
          <CloseIcon onClick={() => handleCloseModal()}>
            <CloseRoundedIcon />
          </CloseIcon>
        </Header>
        <Stat style={{borderTop: 'none'}}>
          <Label>勉強時間</Label>
          <TimeText>{formatTime(totalTime.record.work_time)}</TimeText>
        </Stat>
        <Stat>
          <Label>休憩時間</Label>
          <TimeText>{formatTime(totalTime.record.rest_time)}</TimeText>
        </Stat>
        {error && <ErrorMessage>作業時間0秒では保存できません</ErrorMessage>}
        <BtnWrap>
          <SubmitBtn onClick={() => handleSubmit()}>保存する</SubmitBtn>
        </BtnWrap>
        <Hint>ページを閉じても記録は破棄されません</Hint>
      </Card>
    </Overlay>
  )
}