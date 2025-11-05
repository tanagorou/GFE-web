import { useEffect, useState, useCallback } from "react"

export const useNotification = () => {
  const [permission, setPermission] = useState<NotificationPermission | 'unsupported'>('default')
  const [swRegistration, setSwRegistration] = useState<ServiceWorkerRegistration | null>(null)
  const [isEnabled, setIsEnabled] = useState<boolean>(true)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!('Notification' in window) || !('serviceWorker' in navigator)) {
      setPermission('unsupported')
      return
    }
    setPermission(Notification.permission)
    try {
      const storedIsEnabled = localStorage.getItem('notificationEnabled')
      if (storedIsEnabled !== null) {
        setIsEnabled(storedIsEnabled === 'true')
      }
    } catch (error) {
      console.error('Error checking notification settings:', error)
    }

    const registerSW = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js')
        setSwRegistration(registration)
      } catch (error) {
        console.error('Error registering Service Worker:', error)
      }
    }

    registerSW()
  }, [])

  const requestPermission = async (): Promise<NotificationPermission> => {
    if(typeof window === 'undefined' || permission === 'unsupported') return 'denied'
    try {
      const result = await Notification.requestPermission()
      setPermission(result)
      return result
    } catch (error) {
      console.error('Error requesting notification permission:', error)
      return 'denied'
    }
  }

  const toggleNotifications = useCallback(() => {
    const newState = !isEnabled
    console.log('toggleNotifications called with newState:', newState)
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('notificationEnabled', newState.toString())
      } catch (error) {
        console.error('Error toggling notifications:', error)
      }
    }
    setIsEnabled(newState)
    return newState
  }, [isEnabled])

  const showNotification = async (
    options: NotificationOptions
  ): Promise<boolean> => {
    console.log('showNotification called with isEnabled:', isEnabled)
    console.log('showNotification called with permission:', permission)

    if (typeof window === 'undefined' || permission === 'unsupported') {
      console.log('Notification not supported or window undefined')
      return false
    }

    if (isEnabled !== true) {
      console.log('Notifications are disabled, returning false')
      return false
    }

    if (permission !== 'granted') {
      const newPermission = await requestPermission()
      if(newPermission !== 'granted') {
        return false
      }
    }

    try {
      if(swRegistration){
        await swRegistration.showNotification(options.data, {
          body: options.body,
          data: options.data,
        })
        return true
      }else{
        new Notification(options.data, {
          body: options.body,
          data: options.data,
        })
        return true
      }
    } catch (error) {
      console.error('Error showing notification:', error)
      return false
    }
  }
  return {
    permission,
    isEnabled,
    requestPermission,
    toggleNotifications,
    showNotification,
  }
}