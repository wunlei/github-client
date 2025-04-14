import * as React from 'react';
import { memo } from 'react';
import Icon, { IconProps } from '../Icon';

const CrossIcon: React.FC<IconProps> = (props) => (
  <Icon {...props} viewBox="0 0 24 24">
    <path d="M5.21826 18.3027L18.6533 4.86771" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M5.21826 5.30273L18.6533 18.7378" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </Icon>
);

export default memo(CrossIcon);
