import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export default styled(Box)(({ theme, ownerState }) => {
  const { padding } = theme;
  const { width, height, bgColor, color, opacity, borderRadius, shadow, coloredShadow } = ownerState;

  return {
    padding,
    opacity,
    width,
    height,
    background: bgColor,
    color: color,
    borderRadius: borderRadius,
    boxShadow: shadow === 'none' ? 'none' : shadow + coloredShadow,
  };
});
