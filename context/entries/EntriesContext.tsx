import { createContext } from 'react'
import { Entry } from '../../interfaces';


interface ContextProps {
    entries: Entry[],
    addNewEntry: (description: string) => void,
    updateEntry: (payload: Entry) => void
}


export const EntriesContext = createContext({} as ContextProps)