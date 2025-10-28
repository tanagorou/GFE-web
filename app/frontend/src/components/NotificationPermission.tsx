import { useNotification } from "../hooks/useNotification"
import { useEffect, useState } from "react"
import { useNotificationPermission } from "../context/NotificationPermissionContext"
export const NotificationPermission = () => {
  // const { permission, isEnabled, requestPermission, toggleNotifications, showNotification } = useNotification()
  // const [showAlert, setShowAlert] = useState(false)
  // const [localEnabed, setLocalEnabed] = useState(isEnabled)

  // useEffect(() =>{
  //   setLocalEnabed(isEnabled)  
  // }, [isEnabled])

  // useEffect(() => {
  //   if(typeof window === 'undefined') return
  //   if(permission === 'unsupported') return
  //   if(permission === 'default'){
  //     setShowAlert(true)
  //   }
  // }, [permission])

  // const handlePermission = async () => {
  //   const result = await requestPermission()
  //   if(result === 'granted'){
  //     setShowAlert(false)
  //     console.log('Notification permission granted')
  //   }else{
  //     console.log('Notification permission denied')
  //   }
  // }

  // const handleToggle = async () => {
  //   const newState = await toggleNotifications()
  //   setLocalEnabed(newState)
  //   console.log('Notification permission toggled:', newState)
  // }

  // const testNotification = async () => {
  //   const result = await showNotification({
  //     title: 'テスト通知',
  //     body: 'これは通知のテストです',
  //     data: 'test_notification',
  //   })
  //   console.log('Test notification result:', result)
  // }

  const { showAlert, localEnabled, handlePermission, handleToggle, testNotification } = useNotificationPermission()

  return (
    <div>
      <p>Notification permission: {localEnabled ? 'Enabled' : 'Disabled'}</p>
      <button onClick={handlePermission}>Request Permission</button>
      <button onClick={handleToggle}>Toggle Notifications</button>
      <button onClick={testNotification}>Test Notification</button>
    </div>
  )
}