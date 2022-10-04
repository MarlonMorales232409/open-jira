import { FC, useReducer } from 'react'
import { Entry } from '../../interfaces';
import { EntriesContext } from './'
import { entriesReducer } from './entriesReducer';
import { v4 as uuidv4 } from 'uuid';
import { NewEntry } from '../../components/ui/NewEntry';

// * Local Interfaces
export interface EntriesState {
    entries: Entry[]
}

interface Props {
    children: React.ReactNode
}


// * Initial state 
const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: "Pending: Work in make my own Bussnise",
            createdAt: Date.now(),
            status: 'pending'
        },
        {
            _id: uuidv4(),
            description: "In-Progress: Work in make my own Bussnise",
            createdAt: Date.now() + 1000000,
            status: 'in-progress'
        },
        {
            _id: uuidv4(),
            description: "Finished: Work in make my own Bussnise",
            createdAt: Date.now() * 25,
            status: 'finished'
        }
    ]
}


export const EntriesProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE)

    const addNewEntry = (description: string) => {

        const newEntry: Entry = {
            _id: uuidv4(),
            description,
            createdAt: Date.now(),
            status: 'pending'
        }

        dispatch({
            type: "[Entry] - New Entry",
            payload: newEntry
        })

    }

    const updateEntry = (entry: Entry) => {
        dispatch({ type: "[Entry] - Update Entry Status", payload: entry })
    }

    return (
        <EntriesContext.Provider value={{
            ...state,
            addNewEntry,
            updateEntry
        }}>
            {children}
        </EntriesContext.Provider>
    )
}