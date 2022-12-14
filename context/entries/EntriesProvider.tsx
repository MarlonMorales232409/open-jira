import { FC, useEffect, useReducer, useState } from 'react'
import { Entry } from '../../interfaces';
import { EntriesContext } from './'
import { entriesReducer } from './entriesReducer';
import { v4 as uuidv4 } from 'uuid';
import { NewEntry } from '../../components/ui/NewEntry';
import { entriesApi } from '../../apis';
import { useSnackbar } from 'notistack';

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

    const { enqueueSnackbar } = useSnackbar()

    const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE)


    const [isUpdatingEntry, setIsUpdatingEntry] = useState(false)

    // * Initial data load [load entries array from the db]
    // * function refreshApi only will be called inside if useEffect

    const refreshEntries = async () => {
        const { data } = await entriesApi.get<Entry[]>('/entries')
        dispatch({ type: '[Entry] - Refresh Entries', payload: data })
    }

    const addNewEntry = async (description: string) => {

        const { data } = await entriesApi.post('/entries', {
            description
        })
        dispatch({
            type: "[Entry] - New Entry",
            payload: data
        })

    }

    const updateEntry = async ({ _id, description, status }: Entry, showSnackbar = false) => {

        try {
            setIsUpdatingEntry(true)
            const { data } = await entriesApi.put(`/entries/${_id}`, {
                description,
                status
            })
            dispatch({ type: "[Entry] - Update Entry Status", payload: data })
            setIsUpdatingEntry(false)

            if (showSnackbar) {
                enqueueSnackbar('Entry has been updated', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                })
            }


        } catch (error) {
            console.log(error)
        }
    }

    const deleteEntry = async (id: string) => {
        const { data } = await entriesApi.delete(`/entries/${id}`)
        // dispatch()
    }


    // * useEffect to make the initial data load 

    useEffect(() => {
        refreshEntries()
    }, [])

    return (
        <EntriesContext.Provider value={{
            ...state,
            isUpdatingEntry,
            addNewEntry,
            updateEntry,
        }}>
            {children}
        </EntriesContext.Provider>
    )
}