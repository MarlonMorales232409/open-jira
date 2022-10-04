import { useContext, useState } from "react";
import { Box, Button } from "@mui/material";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { NewEntryForm } from "./NewEntryForm";
import { UIContext } from "../../context/ui";

export const NewEntry = () => {

    const { isAddingEntry, setIsAddingEntry } = useContext(UIContext)



    return (
        <Box paddingX={2} paddingY={1}>

            {
                isAddingEntry
                    ? <NewEntryForm setIsAddingEntry={setIsAddingEntry} />
                    : (
                        <Button
                            startIcon={<AddCircleOutlineOutlinedIcon />}
                            variant="outlined"
                            fullWidth
                            onClick={setIsAddingEntry}
                        >
                            Add Task
                        </Button>
                    )
            }


        </Box>
    );
}
