import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import UIBoxRoot from './UIBoxRoot';

const UIBox = forwardRef(
  ({ width, height, children, bgColor, color, opacity, borderRadius, shadow, coloredShadow, ...rest }, ref) => (
    <UIBoxRoot
      {...rest}
      ref={ref}
      ownerState={{ bgColor, color, opacity, borderRadius, shadow, coloredShadow, width, height }}
    >
      {children}
    </UIBoxRoot>
  )
);

UIBox.displayName = 'UIBox';

UIBox.defaultProps = {
  bgColor: 'transparent',
  color: '',
  opacity: 1,
  borderRadius: '0',
  shadow: 'none',
  coloredShadow: 'none',
  width: '100%',
  height: '100%',
};

UIBox.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  bgColor: PropTypes.string,
  color: PropTypes.string,
  opacity: PropTypes.number,
  borderRadius: PropTypes.string,
  shadow: PropTypes.string,
  coloredShadow: PropTypes.oneOf([
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'light',
    'dark',
    'none',
  ]),
};

export default UIBox;
