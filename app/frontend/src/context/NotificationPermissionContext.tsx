import { createContext, useContext, useEffect, useState } from 'react'
import { useNotification } from '../hooks/useNotification'

type NotificationContextType = {
  showAlert: boolean
  localEnabled: boolean
  handlePermission: () => Promise<void>
  handleToggle: () => Promise<void>
  showNotification: (options: NotificationOptions) => Promise<boolean>
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const NotificationPermissionProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const { permission, isEnabled, requestPermission, toggleNotifications, showNotification } = useNotification()
  const [ showAlert, setShowAlert ] = useState(false)
  const [ localEnabled, setLocalEnabled ] = useState(isEnabled)

  useEffect(() => {
    setLocalEnabled(isEnabled)
  },[isEnabled])

  useEffect(() => {
    if(typeof window === 'undefined') return
    if(permission === 'unsupported') return
    if(permission === 'default'){
      setShowAlert(true)
    }
  },[permission])

  const handlePermission = async () => {
    const result = await requestPermission()
    if(result === 'granted'){
      setShowAlert(false)
    }else{
      setShowAlert(true)
    }
  }

  const handleToggle = async () => {
    const newState = await toggleNotifications()
    setLocalEnabled(newState)
  }

  return (
    <NotificationContext.Provider value={{ showAlert, localEnabled, handlePermission, handleToggle, showNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationPermission = () => {
  const context = useContext(NotificationContext)
  if(!context){
    throw new Error('useNotificationPermission must be used within a NotificationProvider')
  }
  return context
}


