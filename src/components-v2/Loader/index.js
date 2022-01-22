import cls from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import classes from './index.module.scss';

export default function Loader({ className }) {
  return (
    <div className={cls(classes.loader, className)}>

      <div></div>
      <div></div>
      <div></div>
      <div></div>

    </div>
  );
}

Loader.propTypes = {
  className: PropTypes.bool,
};

Loader.defaultProps = {
  className: null,
};
