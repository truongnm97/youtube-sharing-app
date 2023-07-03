import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { getStorage } from '../utils'

export const socket = io(import.meta.env.VITE_API_ENDPOINT, {
  autoConnect: false,
  extraHeaders: {
    authorization: getStorage('access_token') || '',
  },
})

socket.connect()

socket.on('events', (data) => {
  console.log('data', data)
})

export const useWebSocket = (event: string, autoConnect = true) => {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [message, setMessage] = useState<any>()
  const [error, setError] = useState<any>()

  const connect = () => {
    console.log('socket.connected', socket.connected)
    if (socket.connected) return

    socket.connect()
  }

  const disconnect = () => {
    if (socket.disconnected) return

    socket.disconnect()
  }

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    function onError(error: any) {
      console.log('error', error)
      setError(error)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('error', onError)

    if (autoConnect) {
      connect()
    }

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('error', onError)
    }
  }, [])

  useEffect(() => {
    function onEvent(value: any) {
      setMessage(value)
    }

    socket.on(event, onEvent)

    return () => {
      socket.off(event, onEvent)
    }
  }, [event])

  return { message, isConnected, error, connect, disconnect }
}
