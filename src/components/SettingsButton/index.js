import cls from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import settingsBtn from '../../images/Vector.svg';

import classes from './index.module.scss';

export default function SettingsButton({ disabled, ...rest }) {
  return (
    <button
      className={cls(classes.btn, { 'btn--disabled': disabled })}
      {...rest}
    >
      <img src={settingsBtn} alt={'settings'} />
    </button>
  );
}

SettingsButton.propTypes = {
  disabled: PropTypes.bool,
};

SettingsButton.defaultProps = {
  disabled: false,
};
