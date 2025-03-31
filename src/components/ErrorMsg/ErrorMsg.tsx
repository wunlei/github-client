import * as React from 'react';
import { memo } from 'react';
import Typography from 'components/Typography';
import { ErrorMsgProps } from './ErrorMsg.types';
import s from './ErrorMsg.module.scss';

const ErrorMsg: React.FC<ErrorMsgProps> = ({ message }) => {
  return (
    <div className={s.container}>
      <Typography tag="h2" weight="medium">
        Something went wrong!
      </Typography>
      {message && <Typography>{message}</Typography>}
    </div>
  );
};

export default memo(ErrorMsg);
