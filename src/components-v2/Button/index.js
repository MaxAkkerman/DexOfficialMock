import cls from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

export default function Button({ className, ...rest }) {
  return (
    <button
      className={cls('btn', className, {
        'btn--disabled': rest.disabled,
      })}
      {...rest}
    />
  );
}

Button.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  className: null,
  disabled: null,
};
