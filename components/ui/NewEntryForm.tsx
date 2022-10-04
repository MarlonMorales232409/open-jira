import { TextField, Box, Button } from "@mui/material";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { ChangeEvent, Dispatch, FC, SetStateAction, useContext, useState } from "react";
import { EntriesContext } from '../../context/entries';

interface Props {
    setIsAddingEntry: (arg0: boolean) => void
}

export const NewEntryForm: FC<Props> = ({ setIsAddingEntry }) => {

    const [inputValue, setInputValue] = useState("")
    const [touched, setTouched] = useState(false)

    const { addNewEntry } = useContext(EntriesContext)



    const onInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(event.target.value)
    }

    const onSave = () => {

        if (inputValue.length <= 0) return;

        addNewEntry(inputValue)
        setTouched(false)
        setInputValue("")
        setIsAddingEntry(false)

    }

    const onCancel = () => {
        setIsAddingEntry(false),
            setTouched(false)
        setInputValue("")
    }


    return (
        <>
            <TextField
                fullWidth
                autoFocus
                multiline
                placeholder="New Entry"
                label="New Entry"
                helperText={inputValue.length <= 0 && touched && "Write a new entry!"}
                sx={{ marginTop: 2, marginBottom: 1 }}
                error={inputValue.length <= 0 && touched}
                value={inputValue}
                onChange={onInputChange}
                onBlur={() => setTouched(true)}

            />

            <Box display={'flex'} justifyContent={'space-between'}>
                <Button variant="text" onClick={onCancel}>
                    Cancel
                </Button>

                <Button
                    variant="outlined"
                    color="secondary"
                    endIcon={<SaveOutlinedIcon />}
                    onClick={onSave}
                >
                    Save
                </Button>
            </Box>
        </>
    );
}

