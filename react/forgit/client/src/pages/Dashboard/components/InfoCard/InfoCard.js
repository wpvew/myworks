import React, { useEffect, useState } from 'react';
import UIButton from '../../../../components/UI/UIButton';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Grow from '@mui/material/Grow';

const InfoCard = ({ card, timeout }) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(!checked);
  }, []);

  return (
    <Grow in={checked} {...(checked ? { timeout } : {})}>
      <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '15px' }}>
        <CardContent sx={{ padding: 0 }}>
          <Typography mb={1} variant='h5' fontSize={'16px'} fontWeight={'bold'} component='div'>
            {card.icon}
            {card.title}
          </Typography>
          <Typography fontSize={'14px'} color='text.secondary'>
            {card.description}
          </Typography>
        </CardContent>
        <CardActions sx={{ marginTop: 'auto', padding: 0 }}>
          <UIButton size='small'>Перейти</UIButton>
        </CardActions>
      </Card>
    </Grow>
  );
};

InfoCard.propTypes = {
  card: PropTypes.object.isRequired,
  timeout: PropTypes.number,
};

export default InfoCard;
