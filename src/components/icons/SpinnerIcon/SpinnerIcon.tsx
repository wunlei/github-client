import * as React from 'react';
import { memo } from 'react';
import Icon, { IconProps } from '../Icon';

const SpinnerIcon: React.FC<IconProps> = (props) => (
  <Icon {...props} viewBox="0 0 40 40">
    <path
      d="M20 35c-8.284 0-15-6.716-15-15 0-8.284 6.716-15 15-15 8.284 0 15 6.716 15 15h5C40 8.954 31.046 0 20 0S0 8.954 0 20s8.954 20 20 20v-5Z"
      fill="currentColor"
    />
  </Icon>
);

export default memo(SpinnerIcon);
