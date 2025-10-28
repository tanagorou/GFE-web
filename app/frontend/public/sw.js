self.addEventListener('install', (e) => {
  console.log('Service Worker installed')
  self.skipWaiting()
})

self.addEventListener('activate', (e) => {
  console.log('Service Worker activated')
  self.clients.claim()
})

self.addEventListener('notificationclick', (e) => {
  console.log('Service Worker notification clicked', e)
  const notification = e.notification
  notification.close()

  e.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if (client.url && 'focus' in client) {
          return client.focus()
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/')
      }
    })
  )
})

self.addEventListener('message', (e) => {
  console.log('Service Worker message received', e.data)
  if (e.data && e.data.type === 'SHOW_NOTIFICATION') {
    const { title, options } = e.data
    self.registration.showNotification(title, options)
  }
})