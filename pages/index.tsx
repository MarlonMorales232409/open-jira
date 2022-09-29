import { Typography } from '@mui/material';
import type { NextPage } from 'next'
import { Layout } from '../components/layouts';


const HomePage: NextPage = () => {
  return (
    <div>
      <Layout>
        <Typography variant='h1' color={'primary'}>Hello World</Typography>
      </Layout>
    </div>
  )
}

export default HomePage;
