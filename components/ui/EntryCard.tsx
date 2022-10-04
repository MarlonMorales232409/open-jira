import { FC, DragEvent, useContext } from "react";
import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material";
import { Entry } from "../../interfaces";
import { UIContext } from "../../context/ui";

interface Props {
    entry: Entry
}

export const EntryCard: FC<Props> = ({ entry }) => {

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
    );
}

