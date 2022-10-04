import { createContext } from "react"


interface ContextProps {
    sideMenuOpen: boolean,
    isAddingEntry: boolean,
    isDragging: boolean,
    openSideMenu: () => void,
    closeSideMenu: () => void,
    setIsAddingEntry: () => void,
    onToggleDragging: (payload?: boolean) => void,
}


export const UIContext = createContext({} as ContextProps)
