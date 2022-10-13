import { Layout } from "../../components/layouts";
import { EntiesStatus, Entry } from '../../interfaces/entry';
import { Button, capitalize, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField } from "@mui/material";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutline';
import { ChangeEvent, useState } from "react";

const options: EntiesStatus[] = ['pending', 'in-progress', 'finished']

const EntryPage = () => {


    const [inputValue, setInputValue] = useState("")
    const [status, setStatus] = useState<EntiesStatus>('pending')
    const [touched, setTouched] = useState(false)

    const onInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(event.target.value)
    }

    const onStatusChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setStatus(event.target.value as EntiesStatus)

    }

    const onSave = () => {
        console.log({
            inputValue,
            status
        })
    }

    return (
        <Layout>
            <Grid
                container
                justifyContent={'center'}
                sx={{ marginTop: 2 }}
            >
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader
                            title='.....'
                            subheader='made it .... ago'
                        />

                        <CardContent>
                            <TextField
                                sx={{ marginTop: 2, marginBottom: 1 }}
                                fullWidth
                                placeholder="Enter entry"
                                autoFocus
                                multiline
                                label={"New entry"}
                                value={inputValue}
                                onChange={onInputChange}
                            // onBlur={() => setTouched(true)}
                            />
                        </CardContent>

                        <FormControl sx={{ margin: 3 }}>
                            <FormLabel>Status: </FormLabel>
                            <RadioGroup
                                row
                                value={status}
                                onChange={onStatusChange}

                            >
                                {
                                    options.map(option => (
                                        <FormControlLabel
                                            key={option}
                                            value={option}
                                            control={<Radio />}
                                            label={capitalize(option)}
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                        <CardActions>
                            <Button
                                fullWidth
                                variant="contained"
                                startIcon={<SaveOutlinedIcon />}
                                onClick={onSave}
                            >
                                Save
                            </Button>
                        </CardActions>

                    </Card>
                </Grid>

            </Grid>

            <IconButton
                sx={{
                    position: 'fixed',
                    bottom: 30,
                    right: 30,
                    background: 'red'
                }}
            >

                <DeleteOutlinedIcon />
            </IconButton>
        </Layout>
    );
}

export default EntryPage;