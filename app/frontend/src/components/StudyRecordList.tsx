import axios from "axios"
import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { Card } from "./Card"
import { styled } from '@mui/material/styles';
import FormatterDemo from "./GraphStudy"

const ContainerLeft = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flex: '0 0 60%',
})

const CardContainer = styled('div')({
  flexWrap: 'wrap',
  flexDirection: 'row',
  flex: '0 0 40%',
})

const ContainerRight = styled('div')({
  flex: '0 0 40%',
})

const ChartContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flex: '0 0 60%',
})

const ONE_HOURS = 60; // 60分
const ONE_MINUTES = 1; // 1分


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

type Display = {
  day: Time,
  week: Time,
  month: Time,
  total: Time
}

export const StudyRecordList = () => {
  const [displayTime, setDisplayTime] = useState<Display | null>(null)
  const [ready, setReady] = useState<boolean>(false)
  const { authToken } = useAuth()
  useEffect(() => {
    const getStudyRecord = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/study_records",
          {
            withCredentials: true,
            headers: {
              "Authorization": `Bearer ${authToken.auth.token}`,
              "X-Requested-With": "XMLHttpRequest",
              "Content-Type": "application/json",
            },
          }
        )
        console.log(response)
        const d: Display = {
          day: formatTime(response.data.studyRecords.dayRecords),
          week: formatTime(response.data.studyRecords.weekRecords),
          month: formatTime(response.data.studyRecords.monthRecords),
          total: formatTime(response.data.studyRecords.allRecords)
        }
        setDisplayTime(d)
        setReady(true)
        console.log(d.total)
      } catch (err: any) {
        console.log(err.response.data)
      }
    }
    getStudyRecord()
  }, [])


  if(!ready || !displayTime) return <div>Loading...</div>

  return (
    <div style={{display: 'flex', minHeight: '92vh'}}>
      <div style={{display: 'flex', flex: '0 0 60%'}}>
        <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
          <div style={{display: 'flex', flexDirection: 'row', padding: '23px 20px 0 20px'}}>
            <Card title="今日の勉強時間" time={displayTime.day.hour + displayTime.day.minute} />
            <Card title="今週の勉強時間" time={displayTime.week.hour + displayTime.week.minute} />
            <Card title="今月の勉強時間" time={displayTime.month.hour + displayTime.month.minute} />
            <Card title="合計勉強時間" time={displayTime.total.hour + displayTime.total.minute} />
          </div>
          <div style={{padding: '10px 23px 8px 23px'}}>
            <FormatterDemo />
          </div>
        </div>
      </div>          
      <div style={{flex: '0 0 40%'}}>
        <FormatterDemo />
      </div>
    </div>
  )
}