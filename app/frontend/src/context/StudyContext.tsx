// ページ遷移が行われても、設定した勉強時間がリセットされないように
// する

import React, { createContext, ReactNode, useContext, useEffect, useState } from "react"

const StudyTimeContext = createContext<any>(undefined)

export const StudyTimeProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [studyTime, setStudyTime] = useState(0)
  const [restTime, setRestTime] = useState(0)

  return (
    <StudyTimeContext.Provider value={{studyTime, setStudyTime, restTime, setRestTime}}>
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