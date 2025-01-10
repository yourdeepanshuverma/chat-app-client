import { createContext, useContext, useMemo } from 'react'
import io from 'socket.io-client'
import { socketServer } from './components/constants/config'

const SocketContext = createContext()

const getSocket = () => useContext(SocketContext)

const SocketProvider = ({ children }) => {
    const socket = useMemo(() => io(socketServer, { withCredentials: true }), [])

    return <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>
}

export { SocketProvider, getSocket }