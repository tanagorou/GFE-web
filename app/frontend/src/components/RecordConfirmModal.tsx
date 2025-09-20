import { useStudyTime } from "../context/StudyContext"
import axios from "axios"
import axiosCaseConverter from "simple-axios-case-converter"
import { useAuth } from "../context/AuthContext"
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
  const {culcurateTotalTime} = useStudyTime()
  const totalTime = culcurateTotalTime()

  const {authToken} = useAuth()

  async function regsterRecord() {
    const totalTime = culcurateTotalTime()
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
      console.log('response:',response)
    } catch (error) {
      console.log('error:',error)
    }
  }

  const handleSubmit = () => {
    regsterRecord()
    closeModal()
  }

  const workTime = formatTime(totalTime.record.work_time)
  const restTime = formatTime(totalTime.record.rest_time)
  console.log('totalTime:',totalTime)
  return (
    <div className="overlay">
      <div className="modalContent">
        <h1>RecordConfirmModal</h1>
        <p>{workTime}</p>
        <p>{restTime}</p>
        <button onClick={closeModal}>close</button>
        <button onClick={() =>handleSubmit()}>登録する</button>
      </div>
    </div>
  )
}