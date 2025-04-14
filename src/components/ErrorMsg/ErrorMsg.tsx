import c from 'classnames';
import * as React from 'react';
import { memo } from 'react';
import Typography from 'components/Typography';
import { ErrorMsgProps } from './ErrorMsg.types';
import s from './ErrorMsg.module.scss';

const ErrorMsg: React.FC<ErrorMsgProps> = ({ message, classname }) => {
  return (
    <div className={c(s.container, classname)}>
      <Typography tag="h2" weight="medium">
        {message || 'Something went wrong!'}
      </Typography>
    </div>
  );
};

export default memo(ErrorMsg);
