import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import UIButtonRoot from './UIButtonRoot';

const UIButton = forwardRef(({ color, variant, fontSize, padding, size, bgColor, bgHover, children, ...rest }, ref) => {
  return (
    <UIButtonRoot
      {...rest}
      ref={ref}
      fullWidth={true}
      variant={variant === 'gradient' ? 'contained' : variant}
      size={size}
      ownerState={{ color, bgColor, bgHover, fontSize, padding }}
    >
      {children}
    </UIButtonRoot>
  );
});

UIButton.displayName = 'UIButton';

UIButton.defaultProps = {
  padding: '8px 12px',
  size: 'medium',
  fontSize: 14,
  variant: 'contained',
  color: 'white',
  bgColor: 'primary',
  bgHover: '#0062cc',
};

UIButton.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['text', 'contained', 'outlined', 'gradient']),
  color: PropTypes.oneOf(['white', 'primary', 'secondary', 'info', 'success', 'warning', 'error', 'light', 'dark']),
  bgColor: PropTypes.string,
  bgHover: PropTypes.string,
  fontSize: PropTypes.number,
  padding: PropTypes.string,
  circular: PropTypes.bool,
  iconOnly: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default UIButton;
