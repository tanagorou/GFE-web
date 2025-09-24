import axios from "axios"
import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { Card } from "./Card"
import { styled } from '@mui/material/styles';

const ContainerLeft = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flex: '0 0 60%',
})

const ContainerRight = styled('div')({
  flex: '0 0 40%',
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
    <div style={{display: 'flex'}}>
      <ContainerLeft>
        <Card title='今日' time={{...displayTime.day}}/>
        <Card title='週' time={{...displayTime.week}}/>
        <Card title='月' time={{...displayTime.month}}/>
        <Card title='合計' time={{...displayTime.total}}/>
      </ContainerLeft>
      <ContainerRight>
        <h1>Study Record List</h1>
      </ContainerRight>
    </div>
  )
}