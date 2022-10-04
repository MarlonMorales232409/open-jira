import { FC, useReducer } from "react"
import { UIContext } from "./"
import { uiReducer } from './uiReducer';


export interface UiState {
    sideMenuOpen: boolean,
    isAddingEntry: boolean,
    isDragging: boolean,
}

const UI_INITIAL_STATE: UiState = {
    sideMenuOpen: false,
    isAddingEntry: false,
    isDragging: false,
}

interface Props {
    children: React.ReactNode
}
export const UIProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

    const openSideMenu = () => {
        dispatch({ type: "UI - Open Menu" })
    }

    const closeSideMenu = () => {
        dispatch({ type: "UI - Close Menu" })
    }

    const setIsAddingEntry = (payload = false) => {
        dispatch({ type: "UI - Set Adding New Entry", payload })
    }

    const onToggleDragging = (payload = false) => {
        dispatch({ type: "UI - Is Dragging", payload })
    }


    return (
        <UIContext.Provider value={{
            ...state,
            openSideMenu,
            closeSideMenu,
            setIsAddingEntry,
            onToggleDragging,
        }}>
            {children}
        </UIContext.Provider>
    )
}
