import { FC, useContext, useMemo, DragEvent } from "react";
import { List, Paper } from "@mui/material";
import { EntiesStatus, Entry } from "../../interfaces";
import { EntryCard } from "./";
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '../../context/ui/UIContext';
import styles from "../../styles/isDragging.module.css"


interface Props {
    status: EntiesStatus
}

export const EntryList: FC<Props> = ({ status }) => {

    const { entries } = useContext(EntriesContext)
    const { isDragging, onToggleDragging } = useContext(UIContext)
    const { updateEntry } = useContext(EntriesContext)

    const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries])

    const allowDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
    }

    const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
        const id = event.dataTransfer.getData('text')

        const entry = entries.find(entry => entry._id === id)!

        entry.status = status

        updateEntry(entry)
        onToggleDragging(false)


    }

    return (
        <div
            onDrop={onDropEntry}
            onDragOver={allowDrop}
            className={isDragging ? styles.isDragging : ''}
        >
            <Paper sx={{ height: "calc(100vh - 250px)", overflow: "scroll", backgroundColor: "transparent", padding: "3px 5px" }}>
                <List sx={{ opacity: isDragging ? 0.2 : 1, transition: "all 0.3s" }}>
                    {
                        entriesByStatus.map(entry => <EntryCard key={entry._id} entry={entry} />)
                    }
                </List>
            </Paper>
        </div>
    );
}

