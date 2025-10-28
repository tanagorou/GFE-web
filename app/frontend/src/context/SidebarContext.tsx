import { createContext, useContext, useState } from "react"

type SidebarOpenContextProps = {
  sidebarOpen: boolean
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const sidebarOpenContext = createContext<SidebarOpenContextProps | undefined>(undefined)

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  return (
    <sidebarOpenContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      {children}
    </sidebarOpenContext.Provider>
  )
}

export const useSidebarOpen = () => {
  const context = useContext(sidebarOpenContext)
  if(!context){
    throw new Error('useSidebarOpen must be used within a SidebarProvider')
  }
  return context
}