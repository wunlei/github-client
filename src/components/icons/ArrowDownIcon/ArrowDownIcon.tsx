import * as React from 'react';
import { memo } from 'react';
import Icon, { IconProps } from '../Icon';

const ArrowDownIcon: React.FC<IconProps> = (props) => (
  <Icon {...props} viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m2.336 8.747 1.328-1.494L12 14.662l8.336-7.41 1.328 1.495L12 17.338l-9.664-8.59Z"
      fill="currentColor"
    />
  </Icon>
);

export default memo(ArrowDownIcon);
