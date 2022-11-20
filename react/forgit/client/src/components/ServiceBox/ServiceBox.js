import React from 'react';
import UIBox from '../UI/UIBox';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

const ServiceBox = ({ title, description }) => {
  return (
    <UIBox>
      <Typography aria-level={'1'} fontSize={'20px'} fontWeight={'bold'} component={'h1'}>
        {title}
      </Typography>
      <Typography fontSize={'14px'} component={'p'}>
        {description}
      </Typography>
    </UIBox>
  );
};

ServiceBox.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default ServiceBox;
