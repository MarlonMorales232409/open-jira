import { ChangeEvent, useMemo, useState, FC, useContext } from 'react';
import { EntiesStatus, Entry } from '../../interfaces/entry';
import { dbEntries } from "../../database";
import { GetServerSideProps } from "next";
import { EntriesContext } from '../../context/entries';
import { dateFunctions } from '../../utils';

import { Layout } from "../../components/layouts";
import { Button, capitalize, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField } from "@mui/material";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutline';




const options: EntiesStatus[] = ['pending', 'in-progress', 'finished']

interface Props {
    entry: Entry
}

const EntryPage: FC<Props> = ({ entry }) => {

    const { updateEntry } = useContext(EntriesContext)

    const [inputValue, setInputValue] = useState(entry.description)
    const [status, setStatus] = useState<EntiesStatus>(entry.status)
    const [touched, setTouched] = useState(false)

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])



    const onInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(event.target.value)
    }

    const onStatusChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setStatus(event.target.value as EntiesStatus)

    }

    const onSave = () => {

        if (inputValue.trim().length === 0) return

        updateEntry({
            ...entry,
            status,
            description: inputValue
        }, true)
    }

    const onDelete = () => {
        console.log('deleting object')
    }

    return (
        <Layout title={'Editing Entry' + entry._id}>
            <Grid
                container
                justifyContent={'center'}
                sx={{ marginTop: 2 }}
            >
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader
                            title={`${entry.description.substring(0, 10)}...`}
                            subheader={`made it ${dateFunctions.getDistanceFromNow(entry.createdAt)} ago`}
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
                                onBlur={() => setTouched(true)}
                                helperText={isNotValid && 'Enter a value'}
                                error={isNotValid}
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
                                disabled={inputValue.length <= 0}
                            >
                                Save
                            </Button>
                        </CardActions>

                    </Card>
                </Grid>

            </Grid>

            <IconButton
                onClick={onDelete}
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



export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { id } = params as { id: string }

    const entry = await dbEntries.getEntryById(id);

    if (!entry) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            entry: entry
        }
    }
}

export default EntryPage;

