import { createContext } from 'react'
import { Entry } from '../../interfaces';


interface ContextProps {
    entries: Entry[],
    isUpdatingEntry: boolean,
    addNewEntry: (description: string) => void,
    updateEntry: (payload: Entry, showSnackbar?: boolean) => void
}


export const EntriesContext = createContext({} as ContextProps)