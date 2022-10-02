import { Slider } from '@mui/material';
import { styled } from '@mui/material/styles';

export const RangeSlider = styled(Slider)({
  color: '#FF9514',
  padding: '0px',
  height: 2,
  width: '92%',
  transform: 'translateX(4%) translateY(-3px)',

  '& .MuiSlider-rail': {
    color: '#e1e1e1',
    opacity: 1,
  },
  '& .MuiSlider-thumb': {
    width: 20,
    height: 20,
    transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
    '&:hover, &.Mui-focusVisible': {
      boxShadow: `0px 0px 0px 0px`,
    },
    '&.Mui-active': {
      width: 24,
      height: 24,
    },
  },
  ['@media (max-width: 420px)']: {
    '& .MuiSlider-thumb': {
      width: 14,
      height: 14,
      '&.Mui-active': {
        width: 18,
        height: 18,
      },
    },
  },
  ['@media (pointer: coarse)']: {
    padding: 0,
  },
});
