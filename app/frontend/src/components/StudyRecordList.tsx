import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { api } from "../api/api";

import { styled } from '@mui/material/styles';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import FormatterDemo from "./GraphStudy"
import LoadingProgress from "./LoadingProgress"

const Container = styled('div')({
  padding: 20,
  minHeight: '92vh',
  width: '100%',
  margin: 0
})

const Header = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  marginBottom: 12,
})

const TitleWrap = styled('div')({
  display: 'flex',
  alignItems: 'baseline',
  gap: 12,
})

const TitleIcon = styled('div')({
  width: 'clamp(30px, 2.6vw, 35px)',
})

const CommonTitle = styled('h3')({
  margin: 0,
  fontSize: 'clamp(16px, 1.6vw, 18px)',
  fontWeight: 800,
  color: '#696969',
  letterSpacing: '.02em',
})

 const Title = styled('h3')({
  margin: 0,
  fontSize: 'clamp(18px, 2.3vw, 24px)',
  fontWeight: 800,
  color: '#000000',
  letterSpacing: '.02em',
  marginBottom: 12,
 })

const Card = styled('div')({
  width: '100%',
  padding: 20,
  borderRadius: 10,
  boxShadow: '0 10px 24px rgba(2, 6, 23, 0.06)',
  border: '1px solid rgba(15, 23, 42, .08)',
})

const DisplayRecord = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: 12,
  marginBottom: 25,
})

const RecordItem = styled('div')({
  width: '100%',
  padding: 12,
  borderRadius: 10,
  boxShadow: '0 3px 6px rgba(2, 6, 23, 0.06)',
  border: '1px solid rgba(15, 23, 42, .08)',
})

const ItemTitle = styled('div')({
  fontSize: 12,
  color: '#0f172a',
  fontWeight: 600,
  marginBottom: 4,
})

const ItemValue = styled('div')({
  marginTop: 12,
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'center',
  fontSize: 'clamp(18px, 2.2vw, 26px)',
  color: '#0f172a',
  fontWeight: 650,
  marginBottom: 8,
  '& p': {
    fontSize: 'clamp(12px, 1.2vw, 14px)',
  }
})


const GraphContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  borderRadius: 10,
  boxShadow: '0 3px 6px rgba(2, 6, 23, 0.06)',
  border: '1px solid rgba(15, 23, 42, .08)',
  transition: 'box-shadow 160ms ease, transform 160ms ease',
  '&:hover': {
    boxShadow: '0 14px 30px rgba(2, 6, 23, 0.10)',
    transform: 'translateY(-1px)',
  }
})

const GraphItem = styled('div')({
  width: '70%',
  padding: '20px 0px 4px 0px',
})

const TransactionList = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: 18,
})

const GraphBtn = styled('button')({
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  fontSize: 20,
  color: '#0f172a',
  fontWeight: 600,
  '&:hover': {
    color: '#0ea5e9',
    textDecoration: 'underline',
  }
})

const ONE_HOURS = 60; // 60分

const formatTime = (minutes: number) => {
  const hour = Math.floor(minutes / ONE_HOURS)
  const minute = Math.floor((minutes % ONE_HOURS))
  const display: {hour: string, minute: string} = {hour: '', minute: ''}
  if(hour > 0) display.hour = (`${hour}`)
  if(minute > 0) display.minute = (`${minute}`)
  return display
}

type Time = {
  hour: string,
  minute: string
}

type GraphData = {
  time: number,
  date: string
}

type Display = {
  day: Time,
  week: Time,
  month: Time,
  total: Time,
  each: GraphData[]
}

const formatTimeToDisplay = (time: Time) => {
  return (
    <>
      {time.hour && <span>{time.hour}</span>}
      {time.hour && <p>時間</p>}
      {time.minute && <span>{time.minute}</span>}
      {time.minute && <p>分</p>}

      {!time.hour && !time.minute && <span>0</span>}
      {!time.hour && !time.minute && <p>時間</p>}
    </>
  )
}

const week = ['月', '火', '水', '木', '金', '土', '日']

const getGraphData = (data: {studyTime: number, date: string}[]) => {
  const graphData: {time: number, date: string}[] = []
  data.forEach((item, index) => {
    const dataDetail = {time:item.studyTime, date: item.date.split('-').join('/') + '/' + week[index]}
    graphData.push(dataDetail)
  })
  // console.log('graphData', graphData)
  return graphData
}

export const StudyRecordList = () => {
  const [displayTime, setDisplayTime] = useState<Display | null>(null)
  const [weekOffset, setWeekOffset] = useState<number>(0)
  const [ready, setReady] = useState<boolean>(false)
  const { authToken } = useAuth()
  const userName = authToken.user.current.name  

  const handleWeekOffsetRight = () => {
    setWeekOffset(weekOffset + 1)
    const nextWeekOffset = weekOffset + 1
    graphRecord(nextWeekOffset)
  }

  const handleWeekOffsetLeft = () => {
    setWeekOffset(weekOffset - 1)
    const nextWeekOffset = weekOffset - 1
    graphRecord(nextWeekOffset)
  }

  const graphRecord = async (weekOffset: number) => {
    const response = await api.get(
      `/study_records/search?week_offset=${weekOffset}`,
      {
        withCredentials: true,
        headers: {
          "Authorization": `Bearer ${authToken.auth.token}`,
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/json",
        },
      }
    )
    // console.log(response)
    setDisplayTime((prev) => {
      if(!prev) return null
      return {
        ...prev,
        each: getGraphData(response.data.record.each)
      }
    })
  }

  useEffect(() => {
    if(!authToken.auth.token) return
    const getStudyRecord = async () => {
      try {
        const response = await api.get(
          "/study_records",
          {
            withCredentials: true,
            headers: {
              "Authorization": `Bearer ${authToken.auth.token}`,
              "X-Requested-With": "XMLHttpRequest",
              "Content-Type": "application/json",
            },
          }
        )
        // console.log(response)
        const d: Display = {
          day: formatTime(response.data.record.day),
          week: formatTime(response.data.record.week),
          month: formatTime(response.data.record.month),
          total: formatTime(response.data.record.all),
          each: getGraphData(response.data.record.each)
        }
        setDisplayTime(d)
        setReady(true)
      } catch (err: any) {
        // console.log(err)
      }
    }
    getStudyRecord()
  }, [authToken])


  if(!ready || !displayTime) return <LoadingProgress />

  return (
      <Container>
        <Header>
          <TitleWrap>
            <WavingHandIcon style={{ color: 'rgba(7, 83, 21, 0.31)'}} />
            <CommonTitle>お疲れ様です{userName}さん！</CommonTitle>
          </TitleWrap>
        </Header>
        <Card>
          <TitleWrap>
            <AutoStoriesIcon style={{ color: 'rgba(14, 164, 233, 0.8)'}} />
            <Title>勉強記録</Title>
          </TitleWrap>
          <DisplayRecord>
            <RecordItem>
              <ItemTitle>今日</ItemTitle>
              <ItemValue>
                  {formatTimeToDisplay(displayTime.day)}
              </ItemValue>
            </RecordItem>
            <RecordItem>
              <ItemTitle>今週</ItemTitle>
              <ItemValue>{formatTimeToDisplay(displayTime.week)}</ItemValue>
            </RecordItem>
            <RecordItem>
              <ItemTitle>今月</ItemTitle>
              <ItemValue>{formatTimeToDisplay(displayTime.month)}</ItemValue>
            </RecordItem>
            <RecordItem>
              <ItemTitle>合計</ItemTitle>
              <ItemValue>{formatTimeToDisplay(displayTime.total)}</ItemValue>
            </RecordItem>
          </DisplayRecord>
          <div />
          
          <TitleWrap>
            <EqualizerIcon style={{ color: 'rgba(14, 164, 233, 0.8)'}} />
            <Title>記録グラフ</Title>
          </TitleWrap>
          <GraphContainer>
            <GraphItem>
              <FormatterDemo dataset={displayTime.each}/>
              <TransactionList>
                <GraphBtn onClick={()=>handleWeekOffsetRight()}>
                  前へ
                </GraphBtn>
                <GraphBtn onClick={()=>handleWeekOffsetLeft()}>
                  次へ
                </GraphBtn>
              </TransactionList>
            </GraphItem>
          </GraphContainer>
        </Card>
      </Container>
  )
}