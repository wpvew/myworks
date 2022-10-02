import LoadingButton from '@mui/lab/LoadingButton';
import { styled } from '@mui/material/styles';

export const ButtonSubLoading = styled(LoadingButton)({
  fontSize: '30px',
  lineHeight: 1,
  fontWeight: 900,
  padding: '18px 20px',
  alignSelf: 'center',
  fontFamily: 'Nekst',
  color: '#fff',
  backgroundColor: '#FF9514',
  borderRadius: '40px',
  transition: 'background-color .3s ease-in-out',
  textTransform: 'none',
  letterSpacing: 0,
  '& .MuiCircularProgress-svg': {
    color: '#fff',
  },
  '&:hover': {
    backgroundColor: '#111',
  },
  '&:focus': {
    backgroundColor: '#575757',
  },
  '& .MuiCircularProgress-root': {
    width: 30,
  },
  ['@media (max-width: 420px)']: {
    fontSize: 22,
  },
});
