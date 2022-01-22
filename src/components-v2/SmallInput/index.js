import { Stack } from '@mui/material';
import { FormHelperText } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import { iconGenerator } from '../../iconGenerator';

import classes from './index.module.scss';

export default function SmallInput({
  error,
  helperText,
  label,
  name,
  onBlur,
  onChange,
  token,
  touched,
  value,
}) {
  return (
    <Stack direction="column" spacing={1} sx={{ marginBottom: '3%' }}>
      <div>{label}</div>
      <div className={classes.orders__icon_box}>
        <input
          name={name}
          type="number"
          autoComplete="false"
          className={classes.orders__input}
          placeholder="0"
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          style={{
            borderColor:
              touched && error ? 'var(--error)' : 'var(--input-border-color)',
          }}
        />
        {token && (
          <div className="input-select">
            <img
              src={iconGenerator(token.symbol)}
              alt={token.symbol}
              className="input-token-img"
            />
            <span>{token.symbol}</span>
          </div>
        )}
      </div>
      {helperText && (
        <FormHelperText error={error} className={classes.helper_text}>
          {helperText}
        </FormHelperText>
      )}
    </Stack>
  );
}

SmallInput.propTypes = {
  error: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSetToMarket: PropTypes.func.isRequired,
  token: PropTypes.exact({
    balance: PropTypes.number.isRequired,
    decimals: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    owner_address: PropTypes.string.isRequired,
    rootAddress: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    tokenName: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    walletAddress: PropTypes.string.isRequired,
  }),
  touched: PropTypes.bool,
  value: PropTypes.number.isRequired,
};

SmallInput.defaultProps = {
  error: false,
  helperText: 'Type numeric value',
  touched: false,
};
