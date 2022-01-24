import { ClickAwayListener, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import PropTypes from 'prop-types';
import React from 'react';
import NumberFormat from 'react-number-format';

import classes from './index.module.scss';

export default function SlippagePopup({
  anchorEl,
  id,
  onChange,
  onClose,
  value,
}) {
  return (
    <ClickAwayListener onClickAway={onClose}>
      <Popper
        id={id}
        open
        anchorEl={anchorEl}
        placement="bottom-start"
        style={{ zIndex: 1 }}
      >
        <Paper variant="outlined" className={classes.paper}>
          <div className={classes.container}>
            <div className={classes.slippageContainer}>
              <div className={classes.title}>Slippage tolerance:</div>
              <PercentageTextField
                placeholder="2%"
                value={value}
                onValueChange={onChange}
                sx={{
                  maxHeight: '45px',
                  maxWidth: '165px',
                }}
              />
            </div>
            <Box sx={{ maxWidth: '236px' }} className={classes.paragraph}>
              Your transaction will revert if the price changes unfavorably by
              more than this percentage
            </Box>
          </div>
        </Paper>
      </Popper>
    </ClickAwayListener>
  );
}

SlippagePopup.propTypes = {
  anchorEl: PropTypes.element.isRequired,
  id: PropTypes.string,
  inputName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  value: PropTypes.number.isRequired,
};

SlippagePopup.defaultProps = {
  id: null,
  open: false,
};

function PercentageTextField(props) {
  return (
    <NumberFormat
      allowNegative={false}
      allowLeadingZeros={false}
      customInput={TextField}
      decimalScale={2}
      decimalSeparator="."
      fixedDecimalScale
      displayType="input"
      type="text"
      isAllowed={({ floatValue }) => floatValue <= 100}
      suffix="%"
      {...props}
    />
  );
}
