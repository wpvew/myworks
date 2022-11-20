import React from 'react';
import { useAppSelector } from '../../store/hooks';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import UIBox from '../UI/UIBox/';

const ErrorBox = () => {
  const error = useAppSelector((state) => state.supplyBloodReducer.error);
  return (
    <UIBox height={'unset'} display={'flex'} alignItems={'center'}>
      <Typography aria-level={'1'} fontSize={'14px'} component={'span'}>
        Произошла ошибка при сохранении таблицы:{' '}
      </Typography>
      <List row sx={{ display: 'inline-flex' }}>
        {error.message.map((item, i) => (
          <ListItem padding={0} key={i}>
            <ListItemText primary={<Typography fontSize={'14px'}>{item}</Typography>} />
          </ListItem>
        ))}
      </List>
    </UIBox>
  );
};

export default ErrorBox;
