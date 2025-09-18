// ページ遷移が行われても、設定した勉強時間がリセットされないように
// する

import React, { createContext, ReactNode, useContext, useEffect, useState, useRef } from "react"

const StudyTimeContext = createContext<any>(undefined)

export const StudyTimeProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [studyTime, setStudyTime] = useState(0)
  const [restTime, setRestTime] = useState(0)
  const [timerCount, setTimerCount] = useState(0)
  const [nextTimeState, setNextTimeState] = useState('standby')
  const [restState, setRestState] = useState(false)
  const timerIdRef = useRef<NodeJS.Timeout | undefined>(undefined)

  // タイマーをContext内で管理
  // ページ遷移が行われてもタイマーが停止しないように改良
  const handleState = () => {
    const next = !restState
    setRestState(next)
    if(restState){
      setTimerCount(studyTime)
    }else{
      setTimerCount(restTime)
    }
  }

  useEffect(() => {
    setTimerCount(studyTime)
  },[studyTime])


  useEffect(() => {
    if(nextTimeState !== 'active'){
      return
    }
    if(timerCount >= 0){
      console.log('timerCount:',timerCount)
      timerIdRef.current = setInterval(() => {
        setTimerCount((prev) => prev - 1000)
      }, 1000)
    } else {
      console.log('タイマー終了')
      handleState()
    }
    return() => {
      clearInterval(timerIdRef.current)
    }
  },[nextTimeState, timerCount])

  return (
    <StudyTimeContext.Provider value={{studyTime, setStudyTime, restTime, setRestTime, nextTimeState, setNextTimeState, timerCount, setTimerCount, restState, setRestState}}>
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