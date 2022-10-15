import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import type { NextPage } from 'next'
import { useContext } from 'react';
import { EntryList, NewEntry } from '../components/ui';
import { EntriesContext } from '../context/entries/EntriesContext';
import { Layout } from '../components/layouts';

const HomePage: NextPage = () => {

  const { entries } = useContext(EntriesContext)

  return (
    <div>
      <Layout>
        <Grid container spacing={2}>

          <Grid item xs={12} sm={4}>
            <NewEntry />
            <Card sx={{ height: "calc(100vh - 100px)" }}>
              <CardHeader title={'Pending'} />
              <CardContent>
                <EntryList status={'pending'} />
              </CardContent>
            </Card>
          </Grid>


          <Grid item xs={12} sm={4}>
            <Card sx={{ height: "calc(100vh - 100px)" }}>
              <CardHeader title={'In Progress'} />
              <CardContent>
                <EntryList status={'in-progress'} />
              </CardContent>
            </Card>
          </Grid>


          <Grid item xs={12} sm={4}>
            <Card sx={{ height: "calc(100vh - 100px)" }}>
              <CardHeader title={'Done'} />
              <CardContent>
                <EntryList status={'finished'} />
              </CardContent>
            </Card>
          </Grid>

        </Grid>

      </Layout>
    </div>
  )
}

export default HomePage;
