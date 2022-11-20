import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';
import Grow from '@mui/material/Grow';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

const colors = {
  0.5: 'red',
  1: 'red',
  1.5: 'red',
  2: 'orange',
  2.5: 'orange',
  3: 'yellow',
  3.5: 'yellow',
  4: 'lightgreen',
  4.5: 'lightgreen',
  5: 'green',
};

const getColor = (value) => {
  return colors[value];
};

const StatisticCard = ({ card, timeout }) => {
  const [checked, setChecked] = useState(false);
  const rating = Math.round(card.complitedOn / 20 / 0.5) * 0.5;
  useEffect(() => {
    setChecked(!checked);
  }, []);
  return (
    <Grow in={checked} {...(checked ? { timeout } : {})}>
      <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 0 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', padding: '15px', height: '100%' }}>
          <Typography mb={1} variant='h5' fontSize={'20px'} fontWeight={'bold'} textAlign={'center'} component='h5'>
            {card.title}
          </Typography>
          <List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 'auto' }}>
            {card.data.map((item) => (
              <ListItem sx={{ width: 'unset', padding: 0 }} key={item.id}>
                <ListItemText sx={{ marginRight: '10px' }} primary={item.name} />
                <ListItemText primary={item.value} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <Typography fontSize={'64px'} color={getColor(rating)} component='legend'>
            {card.complitedOn}%
          </Typography>
          <Rating
            name='half-rating-read'
            defaultValue={rating}
            precision={0.5}
            readOnly
            emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize='inherit' />}
          />
        </CardContent>
      </Card>
    </Grow>
  );
};

StatisticCard.propTypes = {
  card: PropTypes.object.isRequired,
  timeout: PropTypes.number,
};

export default StatisticCard;
