import { SvgIcon } from '@mui/material';
import React from 'react';

import SvgCopy from '../../images/icons/copyNew.inline.svg';

export default function IconEdit(props) {
  return (
    <SvgIcon
      component={SvgCopy}
      viewBox="0 0 14 14"
      sx={{ display: 'block' }}
      {...props}
    />
  );
}
