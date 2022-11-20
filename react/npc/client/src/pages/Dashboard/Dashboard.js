import React from 'react';
import InfoCard from './components/InfoCard/InfoCard';
import infoCardData from './components/InfoCard/data';
import UIBox from '../../components/UI/UIBox';
import Layout from '../../components/Layout/Layout';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import StatisticCard from './components/StatisticCard/StatisticCard';
import statisticCardData from './components/StatisticCard/data';

const Dashboard = () => {
  return (
    <Layout>
      <Container maxWidth='xl' sx={{ py: '30px' }}>
        <Grid container display={'flex'} direction={'column'} justifyContent={'space-between'} minHeight={'100%'}>
          <Grid item mb={2}>
            <UIBox>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}>
                {statisticCardData.map((card, index) => (
                  <Grid item xs={4} sm={8} md={4} lg={4} key={card.id} width={'100%'}>
                    <StatisticCard card={card} timeout={(index + 1) * 500} />
                  </Grid>
                ))}
              </Grid>
            </UIBox>
          </Grid>
          <Grid item>
            <UIBox>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}>
                {infoCardData.map((card, index) => (
                  <Grid item xs={4} sm={4} md={4} lg={2} key={card.id}>
                    <InfoCard card={card} timeout={(index + 1) * 300} />
                  </Grid>
                ))}
              </Grid>
            </UIBox>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Dashboard;
