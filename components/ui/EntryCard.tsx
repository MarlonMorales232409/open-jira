import { FC, DragEvent, useContext } from "react";
import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material";
import { Entry } from "../../interfaces";
import { UIContext } from "../../context/ui";
import { EntriesContext } from "../../context/entries";
import { useRouter } from "next/router";
import { dateFunctions } from '../../utils';

interface Props {
    entry: Entry
}

export const EntryCard: FC<Props> = ({ entry }) => {

    const router = useRouter()

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

    const onCLick = () => {
        router.push(`/entries/${entry._id}`)
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
                        onClick={onCLick}
                    >
                        <CardActionArea >

                            <CardContent>
                                <Typography sx={{ whiteSpace: "pre-line" }}>{description}</Typography>
                            </CardContent>

                            <CardActions sx={{ display: "flex", justifyContent: "end", paddingRight: 2 }}>
                                <Typography sx={{ fontSize: 11 }}>{dateFunctions.getDistanceFromNow(entry.createdAt)}</Typography>
                            </CardActions>

                        </CardActionArea>
                    </Card>
                )
            }
        </>
    );
}

