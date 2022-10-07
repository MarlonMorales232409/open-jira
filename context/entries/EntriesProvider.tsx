import { FC, useEffect, useReducer } from 'react'
import { Entry } from '../../interfaces';
import { EntriesContext } from './'
import { entriesReducer } from './entriesReducer';
import { v4 as uuidv4 } from 'uuid';
import { NewEntry } from '../../components/ui/NewEntry';
import { entriesApi } from '../../apis';

// * Local Interfaces
export interface EntriesState {
    entries: Entry[]
}

interface Props {
    children: React.ReactNode
}


// * Initial state 
const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: []
}


export const EntriesProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE)

    // * Initial data load [load entries array from the db]
    // * function refreshApi only will be called inside if useEffect

    const refreshEntries = async () => {
        const { data } = await entriesApi.get<Entry[]>('/entries')
        dispatch({ type: '[Entry] - Refresh Entries', payload: data })
    }

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


    // * useEffect to make the initial data load 

    useEffect(() => {
        refreshEntries()
    }, [])

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