import React, { useMemo } from 'react';
import Typography from '@mui/material/Typography';
import UIBox from '../UIBox';

const UITooltip = (prop) => {
  const data = useMemo(() => prop.api.getDisplayedRowAtIndex(prop.rowIndex).data, []);
  return (
    <UIBox bgColor={'white'} padding={'5px 0 5px 5px'} border={'1px solid cornflowerblue;'}>
      <Typography sx={{ whiteSpace: 'nowrap', padding: 0, margin: 0 }} fontSize={'12px'} fontWeight={'bold'}>
        {data.subject}
      </Typography>
    </UIBox>
  );
};

export default UITooltip;
