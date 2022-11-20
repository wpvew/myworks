import React from 'react';
// import Layout from '../../examples/Layout/Layout';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Layout from '../../components/Layout/Layout';
import UIBox from '../../components/UI/UIBox';
// import UIBox from '../../components/UIBox';

const ErrorPage = () => {
  return (
    <Layout>
      <Container maxWidth='xl' sx={{ py: '30px' }}>
        <UIBox display={'flex'} flexDirection={'column'} alignItems={'center'} sx={{ width: '100%' }}>
          <Typography variant='h1' fontSize={'48px'} gutterBottom>
            Error 404
          </Typography>
          <Typography variant='p' gutterBottom>
            Страница не найдена
          </Typography>
        </UIBox>
      </Container>
    </Layout>
  );
};

export default ErrorPage;
