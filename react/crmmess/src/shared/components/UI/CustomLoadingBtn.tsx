import LoadingButton from '@mui/lab/LoadingButton';
import { styled } from '@mui/material/styles';

export const CustomLoadingBtn = styled(LoadingButton)({
  color: '#333',
  marginRight: '20px',
  padding: '8px 30px',
  alignSelf: 'center',
  border: '1px solid',
  borderRadius: 0,
  textTransform: 'none',
  letterSpacing: '0',
  fontSize: 16,
  lineHeight: 1,
  '&:hover': {
    backgroundColor: '#9873FF',
    borderColor: '#9873FF',
  },
});
