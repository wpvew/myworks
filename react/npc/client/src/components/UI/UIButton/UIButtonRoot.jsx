import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export default styled(Button)(({ ownerState }) => {
  const { color, bgColor, bgHover, fontSize, padding } = ownerState;
  return {
    padding,
    fontSize,
    color,
    backgroundColor: bgColor,
    borderColor: bgColor,
    boxShadow: 'none',
    textTransform: 'none',
    border: '1px solid',
    lineHeight: 1,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: bgHover,
      borderColor: bgHover,
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: bgHover,
      borderColor: bgHover,
    },
  };
});
