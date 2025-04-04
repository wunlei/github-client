import * as React from 'react';
import { memo } from 'react';
import Icon, { IconProps } from '../Icon';

const ChainIcon: React.FC<IconProps> = (props) => (
  <Icon width={16} height={17} {...props} viewBox="0 0 16 17">
    <path
      d="M9.862 11.402a3.5 3.5 0 0 1-2.502-1.061.743.743 0 0 1 0-1.052.72.72 0 0 1 1.028 0c.407.417.93.625 1.474.625a2.07 2.07 0 0 0 1.473-.625l2.6-2.66a2.168 2.168 0 0 0 0-3.016 2.054 2.054 0 0 0-2.949 0l-1.299 1.33a.72.72 0 0 1-1.028 0 .743.743 0 0 1 0-1.052l1.3-1.33A3.46 3.46 0 0 1 12.46 1.5a3.46 3.46 0 0 1 2.501 1.062A3.65 3.65 0 0 1 16 5.122c0 .923-.35 1.855-1.038 2.56l-2.598 2.659a3.5 3.5 0 0 1-2.502 1.062Z"
      fill="currentColor"
    />
    <path
      d="M8.64 6.66a.76.76 0 0 1 0 1.05.703.703 0 0 1-1.028 0 2.054 2.054 0 0 0-2.948 0l-2.598 2.66a2.169 2.169 0 0 0 0 3.017c.407.416.93.625 1.473.625a2.07 2.07 0 0 0 1.474-.625l1.3-1.33a.72.72 0 0 1 1.028 0 .76.76 0 0 1 0 1.052l-1.3 1.33A3.46 3.46 0 0 1 3.54 15.5a3.444 3.444 0 0 1-2.501-1.062A3.65 3.65 0 0 1 0 11.878c0-.923.34-1.855 1.038-2.56L3.636 6.66a3.5 3.5 0 0 1 2.502-1.061c.902 0 1.814.357 2.502 1.061Z"
      fill="currentColor"
    />
  </Icon>
);

export default memo(ChainIcon);
