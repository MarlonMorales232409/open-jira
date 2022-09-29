import { FC, useReducer } from "react"
import { UIContext } from "./"
import { uiReducer } from './uiReducer';


export interface UiState {
    sideMenuOpen: boolean
}

const UI_INITIAL_STATE: UiState = {
    sideMenuOpen: false
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

    return (
        <UIContext.Provider value={{
            ...state,
            openSideMenu,
            closeSideMenu,
        }}>
            {children}
        </UIContext.Provider>
    )
}
