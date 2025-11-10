import { createContext, ReactNode, useContext, useEffect, useState, useRef } from "react"
import { useNotificationPermission } from "./NotificationPermissionContext"

const StudyTimeContext = createContext<any>(undefined)
// ページ遷移が行われても、設定した勉強時間がリセットされないようにするためのContext
export const StudyTimeProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [studyTime, setStudyTime] = useState(0)
  const [restTime, setRestTime] = useState(0)
  const [timerCount, setTimerCount] = useState(0)
  const [totalTime, setTotalTime] = useState({study: 0, rest: 0})
  const [nextTimeState, setNextTimeState] = useState('standby')
  const [restState, setRestState] = useState(false)
  const [pomodoreCount, setPomodoreCount] = useState({study: 0, rest: 0})
  const [playMusic, setPlayMusic] = useState<any>({title: 'オフ', path: null})
  const { showNotification } = useNotificationPermission()

  const timerIdRef = useRef<NodeJS.Timeout | undefined>(undefined)

  // タイマーをContext内で管理、ページ遷移が行われてもタイマーが停止しないように改良
  const handleState = () => {
    const next = !restState
    setRestState(next)
    // console.log('next:',next)
    if(next){
      setTimerCount(restTime)
      // 休憩時間に入ったので、勉強ポモドーロカウントを＋１増加させる
      setPomodoreCount((prev) => ({...prev, study: prev.study + 1}))
      if(typeof window !== 'undefined'){
        showNotification({
          body: '休憩時間に入りました',
          data: 'rest_start',
        })
      }
      // 音楽再生
      if(playMusic.path !== null){
        playMusic.path.play()
      }
    }else{
      setTimerCount(studyTime)
      // 勉強時間に入ったので、休憩ポモドーロカウントを＋１増加させる
      setPomodoreCount((prev) => ({...prev, rest: prev.rest + 1}))
      if(typeof window !== 'undefined'){
        showNotification({
          body: '勉強時間に入りました',
          data: 'study_start',
        })
      }
      // 音楽再生
      if(playMusic.path !== null){
        playMusic.path.play()
      }
    }
  }

  const culcurateTotalTime = () => {
    // 必ずスタンバイ状態で計算
    setNextTimeState('standby')
    if(restState){
      const study = pomodoreCount.study * studyTime
      const rest = pomodoreCount.rest * restTime + (restTime - timerCount)
      setTotalTime({study: study, rest: rest })
      return {record: {work_time: study, rest_time: rest}}
    }else{
      const study = pomodoreCount.study * studyTime + (studyTime - timerCount)
      const rest = pomodoreCount.rest * restTime
      setTotalTime({study: study, rest: rest })
      return {record: {work_time: study, rest_time: rest}}
    }
  }

  const resetRecords = () => {
    setPomodoreCount({study: 0, rest: 0})
    setRestState(false)
    setNextTimeState('standby')
    setTimerCount(studyTime)
  }

  // 初期値にstudyTimerをセット。
  useEffect(() => {
    setTimerCount(studyTime)
  },[studyTime])


  useEffect(() => {
    if(nextTimeState !== 'active'){
      return
    }
    if(timerCount >= 0){
      timerIdRef.current = setInterval(() => {
        setTimerCount((prev) => prev - 1000)
      }, 1000)
    } else {
      // console.log('タイマー終了')
      handleState()
    }
    return() => {
      clearInterval(timerIdRef.current)
    }
  },[nextTimeState, timerCount])

  return (
    <StudyTimeContext.Provider 
      value={{studyTime,
              setStudyTime,
              restTime,
              setRestTime,
              totalTime,
              nextTimeState,
              setNextTimeState,
              timerCount,
              setTimerCount,
              restState,
              setRestState,
              culcurateTotalTime,
              resetRecords,
              playMusic,
              setPlayMusic
              }}>
      {children}
    </StudyTimeContext.Provider>
  )
}

export const useStudyTime = () => {
  const context = useContext(StudyTimeContext)
  if (!context) {
    throw new Error('useStudyTime must be used within a StudyProvider')
  }
  return context
}