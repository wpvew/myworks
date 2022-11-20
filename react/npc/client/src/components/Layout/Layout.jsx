import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import SideBar from '../SideBar/SideBar';
import UIBox from '../UI/UIBox';

function Layout({ children }) {
  return (
    <UIBox height={'100vh'}>
      <Grid container flexWrap={'nowrap'} width={'100%'}>
        <Grid item minHeight={'100vh'}>
          <SideBar />
        </Grid>
        <Grid item width={'100%'}>
          {children}
        </Grid>
      </Grid>
    </UIBox>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
