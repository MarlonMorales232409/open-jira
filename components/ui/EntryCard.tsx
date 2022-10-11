import { FC, DragEvent, useContext } from "react";
import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material";
import { Entry } from "../../interfaces";
import { UIContext } from "../../context/ui";
import { EntriesContext } from "../../context/entries";

interface Props {
    entry: Entry
}

export const EntryCard: FC<Props> = ({ entry }) => {

    const { isUpdatingEntry } = useContext(EntriesContext)

    const { status, description, createdAt } = entry
    const { onToggleDragging } = useContext(UIContext)


    const onDragEntry = (event: DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData("text", entry._id)
        onToggleDragging(true)
    }

    const onDragEntryEnd = (event: DragEvent<HTMLDivElement>) => {
        onToggleDragging(false)
    }

    return (
        <>
            {
                isUpdatingEntry ? (
                    <h2>Updating...</h2>
                ) : (
                    <Card sx={{ marginBottom: 1 }}
                        draggable
                        onDragStart={onDragEntry}
                        onDragEnd={onDragEntryEnd}
                    >
                        <CardActionArea >

                            <CardContent>
                                <Typography sx={{ whiteSpace: "pre-line" }}>{description}</Typography>
                            </CardContent>

                            <CardActions sx={{ display: "flex", justifyContent: "end", paddingRight: 2 }}>
                                <Typography>30 min ago</Typography>
                            </CardActions>

                        </CardActionArea>
                    </Card>
                )
            }
        </>
    );
}

